import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const route = '/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k';
const session = 'aihero-source-recovery';
const daemonUrl = 'http://127.0.0.1:10086/command';
const code = String.raw`(() => {
  const tick = String.fromCharCode(96);
  const inline = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent.replace(/\s+/g, ' ');
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const tag = node.tagName.toLowerCase();
    if (tag === 'br') return '  \n';
    if (tag === 'code' && node.parentElement?.tagName !== 'PRE') return tick + node.textContent + tick;
    const body = [...node.childNodes].map(inline).join('');
    if (tag === 'a') return '[' + body.trim() + '](' + (node.getAttribute('href') || '') + ')';
    if (tag === 'strong' || tag === 'b') return '**' + body.trim() + '**';
    if (tag === 'em' || tag === 'i') return '_' + body.trim() + '_';
    return body;
  };
  const block = (node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const tag = node.tagName.toLowerCase();
    if (['script','style','button','svg','template','form','video'].includes(tag)) return '';
    if (tag === 'pre') {
      const c = node.querySelector('code') || node;
      const lang = node.getAttribute('data-lang') || (c.className.match(/language-([\w-]+)/) || [])[1] || '';
      return tick.repeat(3) + lang + '\n' + c.textContent.replace(/^\n|\n$/g, '') + '\n' + tick.repeat(3) + '\n\n';
    }
    if (/^h[1-6]$/.test(tag)) return '#'.repeat(Number(tag[1])) + ' ' + inline(node).trim() + '\n\n';
    if (tag === 'p') return inline(node).trim() + '\n\n';
    if (tag === 'ul' || tag === 'ol') return [...node.children].filter(x => x.tagName === 'LI').map((li,i) => (tag === 'ol' ? (i+1)+'. ' : '- ') + [...li.childNodes].filter(x => !(x.nodeType === Node.ELEMENT_NODE && ['UL','OL'].includes(x.tagName))).map(inline).join('').trim()).join('\n') + '\n\n';
    return [...node.childNodes].map(block).join('');
  };
  const article = document.querySelector('main article');
  if (!article) throw new Error('Loaded workshop article not found');
  return JSON.stringify({
    url: location.href,
    title: article.querySelector('h1')?.textContent?.trim() || document.title,
    description: document.querySelector('meta[name="description"]')?.content || '',
    markdown: block(article).replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim() + '\n'
  });
})()`;

const response = await fetch(daemonUrl, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'evaluate', args: { code }, session }),
});
const envelope = await response.json();
if (!envelope.ok) throw new Error(JSON.stringify(envelope));
const page = JSON.parse(envelope.data.value);
const manifestPath = resolve('content/source/manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const entry = manifest.pages.find((item) => item.route === route);
if (!entry) throw new Error('Workshop route missing from manifest');
const slug = route.split('/').at(-1);
const document = `---\ntitle: ${JSON.stringify(page.title)}\nslug: ${JSON.stringify(slug)}\ntype: "workshop-lesson"\ndescription: ${JSON.stringify(page.description)}\nupdatedAt: ${JSON.stringify(entry.lastmod || '')}\n---\n\n${page.markdown}`;
const relativePath = `content/source${route}.md`;
const target = resolve(relativePath);
await mkdir(dirname(target), { recursive: true });
await writeFile(target, document, 'utf8');
entry.status = 'downloaded';
entry.sourceUrl = page.url;
entry.contentType = 'text/markdown; recovered-from-live-rendered-html';
entry.sourcePath = relativePath;
entry.sourceHash = createHash('sha256').update(document).digest('hex');
entry.sourceLength = document.length;
entry.checkedAt = new Date().toISOString();
entry.recoveryMethod = 'authenticated browser live DOM extraction';
manifest.counts = manifest.pages.reduce((counts, item) => {
  counts[item.status] = (counts[item.status] || 0) + 1;
  return counts;
}, {});
manifest.generatedAt = new Date().toISOString();
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

const reportPath = resolve('reports/source-recovery.json');
const report = JSON.parse(await readFile(reportPath, 'utf8'));
report.generatedAt = manifest.generatedAt;
report.recovered.push({ route, sourcePath: relativePath, sourceLength: document.length });
report.pending = [];
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ route, sourcePath: relativePath, sourceLength: document.length }, null, 2));
