import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const daemonUrl = 'http://127.0.0.1:10086/command';
const session = 'aihero-source-recovery';
const manifestPath = resolve('content/source/manifest.json');
const reportPath = resolve('reports/source-recovery.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const excludedRoutes = new Map([
  ['/newsletter', '纯 Newsletter 订阅推广页，不属于学习内容'],
  ['/skills/subscribe', '纯 Skills 订阅/销售页，不属于学习内容'],
]);
const recoverable = manifest.pages.filter((page) =>
  page.status === 'no-markdown' &&
  (page.route.startsWith('/ai-coding-dictionary') || page.route.startsWith('/skills/skills-changelog-')),
);

const browserCode = String.raw`async (pages) => {
  const tick = String.fromCharCode(96);
  const escapeYaml = (value) => JSON.stringify(String(value || ''));
  const inline = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent.replace(/\s+/g, ' ');
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const tag = node.tagName.toLowerCase();
    if (tag === 'br') return '  \n';
    if (tag === 'img') return '![' + (node.getAttribute('alt') || '') + '](' + (node.getAttribute('src') || '') + ')';
    if (tag === 'code' && node.parentElement?.tagName !== 'PRE') return tick + node.textContent + tick;
    const body = [...node.childNodes].map(inline).join('');
    if (tag === 'a') return '[' + body.trim() + '](' + (node.getAttribute('href') || '') + ')';
    if (tag === 'strong' || tag === 'b') return '**' + body.trim() + '**';
    if (tag === 'em' || tag === 'i') return '_' + body.trim() + '_';
    if (tag === 'del' || tag === 's') return '~~' + body.trim() + '~~';
    return body;
  };
  const block = (node, depth = 0) => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim() ? node.textContent.trim() + '\n\n' : '';
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const tag = node.tagName.toLowerCase();
    if (['script','style','button','svg','template','form'].includes(tag)) return '';
    if (tag === 'pre') {
      const code = node.querySelector('code') || node;
      const lang = node.getAttribute('data-lang') || code.getAttribute('data-language') || (code.className.match(/language-([\w-]+)/) || [])[1] || '';
      return tick.repeat(3) + lang + '\n' + code.textContent.replace(/^\n|\n$/g, '') + '\n' + tick.repeat(3) + '\n\n';
    }
    if (/^h[1-6]$/.test(tag)) return '#'.repeat(Number(tag[1])) + ' ' + inline(node).trim() + '\n\n';
    if (tag === 'p') return inline(node).trim() + '\n\n';
    if (tag === 'blockquote') return blockChildren(node, depth).trim().split('\n').map(x => '> ' + x).join('\n') + '\n\n';
    if (tag === 'hr') return '---\n\n';
    if (tag === 'ul' || tag === 'ol') {
      return [...node.children].filter(x => x.tagName === 'LI').map((li, i) => {
        const prefix = tag === 'ol' ? (i + 1) + '. ' : '- ';
        const own = [...li.childNodes].filter(x => !(x.nodeType === Node.ELEMENT_NODE && ['UL','OL'].includes(x.tagName))).map(inline).join('').trim();
        const nested = [...li.children].filter(x => ['UL','OL'].includes(x.tagName)).map(x => block(x, depth + 1).trimEnd()).join('\n');
        return prefix + own + (nested ? '\n' + nested.split('\n').map(x => '  ' + x).join('\n') : '');
      }).join('\n') + '\n\n';
    }
    if (tag === 'table') {
      const rows = [...node.querySelectorAll('tr')].map(row => [...row.children].map(cell => inline(cell).trim().replace(/\|/g, '\\|')));
      if (!rows.length) return '';
      const width = Math.max(...rows.map(x => x.length));
      const normalized = rows.map(row => [...row, ...Array(width - row.length).fill('')]);
      return '| ' + normalized[0].join(' | ') + ' |\n| ' + Array(width).fill('---').join(' | ') + ' |\n' + normalized.slice(1).map(row => '| ' + row.join(' | ') + ' |').join('\n') + '\n\n';
    }
    if (tag === 'details') return '<details>\n' + blockChildren(node, depth).trim() + '\n</details>\n\n';
    if (tag === 'summary') return '<summary>' + inline(node).trim() + '</summary>\n\n';
    if (tag === 'img') return inline(node) + '\n\n';
    return blockChildren(node, depth);
  };
  function blockChildren(node, depth = 0) { return [...node.childNodes].map(child => block(child, depth)).join(''); }
  const tidy = (value) => value.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';

  const output = [];
  for (const page of pages) {
    const response = await fetch(page.url, { credentials: 'include' });
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const jsonLd = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(x => { try { return JSON.parse(x.textContent); } catch { return null; } }).filter(Boolean);
    const graph = jsonLd.flatMap(x => x['@graph'] || [x]);
    const articleData = graph.find(x => x['@type'] === 'Article') || {};
    const termData = graph.find(x => x['@type'] === 'DefinedTerm') || {};
    const title = doc.querySelector('h1')?.textContent?.trim() || articleData.headline || termData.name || doc.title;
    const description = termData.description || articleData.description || doc.querySelector('meta[name="description"]')?.content || '';
    let contentNode;
    if (page.route === '/ai-coding-dictionary') {
      contentNode = [...doc.querySelectorAll('main > section')].find(x => x.id !== 'dictionary-newsletter-cta');
    } else {
      const candidates = [...doc.querySelectorAll('article')].filter(x => !x.querySelector('article'));
      contentNode = candidates.sort((a, b) => (b.textContent?.length || 0) - (a.textContent?.length || 0))[0];
    }
    if (!response.ok || !contentNode) throw new Error(page.route + ': content not found (HTTP ' + response.status + ')');
    const slug = page.route.split('/').filter(Boolean).at(-1);
    const type = page.route.startsWith('/ai-coding-dictionary') ? 'dictionary' : 'post';
    const frontmatter = ['---', 'title: ' + escapeYaml(title), 'slug: ' + escapeYaml(slug), 'type: ' + escapeYaml(type), 'description: ' + escapeYaml(description), 'updatedAt: ' + escapeYaml(page.lastmod || ''), '---', ''].join('\n');
    output.push({ route: page.route, url: page.url, markdown: frontmatter + tidy(block(contentNode)), title, description });
  }
  return output;
}`;

async function command(action, args) {
  const response = await fetch(daemonUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ action, args, session }),
  });
  const result = await response.json();
  if (!result.ok) throw new Error(JSON.stringify(result));
  return result.data;
}

const recovered = [];
for (let offset = 0; offset < recoverable.length; offset += 5) {
  const batch = recoverable.slice(offset, offset + 5).map(({ route, url, lastmod }) => ({ route, url, lastmod }));
  const data = await command('evaluate', { code: `(${browserCode})(${JSON.stringify(batch)})` });
  const pages = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
  for (const page of pages) {
    const relativePath = `content/source${page.route}.md`;
    const target = resolve(relativePath);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, page.markdown, 'utf8');
    const entry = manifest.pages.find((item) => item.route === page.route);
    entry.status = 'downloaded';
    entry.sourceUrl = page.url;
    entry.contentType = 'text/markdown; recovered-from-rendered-html';
    entry.sourcePath = relativePath.replaceAll('\\', '/');
    entry.sourceHash = createHash('sha256').update(page.markdown).digest('hex');
    entry.sourceLength = page.markdown.length;
    entry.checkedAt = new Date().toISOString();
    entry.recoveryMethod = 'authenticated browser semantic HTML extraction';
    recovered.push({ route: page.route, sourcePath: entry.sourcePath, sourceLength: entry.sourceLength });
  }
  console.log(`Recovered ${Math.min(offset + 5, recoverable.length)}/${recoverable.length}`);
}

for (const [route, reason] of excludedRoutes) {
  const entry = manifest.pages.find((item) => item.route === route);
  if (entry) {
    entry.status = 'excluded';
    entry.exclusionReason = reason;
    entry.checkedAt = new Date().toISOString();
  }
}

manifest.counts = manifest.pages.reduce((counts, page) => {
  counts[page.status] = (counts[page.status] || 0) + 1;
  return counts;
}, {});
manifest.generatedAt = new Date().toISOString();
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
await mkdir(dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify({ generatedAt: manifest.generatedAt, recovered, excluded: [...excludedRoutes].map(([route, reason]) => ({ route, reason })), pending: manifest.pages.filter(x => x.status === 'no-markdown').map(x => x.route) }, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ recovered: recovered.length, excluded: excludedRoutes.size, pending: manifest.pages.filter(x => x.status === 'no-markdown').length, reportPath }, null, 2));
