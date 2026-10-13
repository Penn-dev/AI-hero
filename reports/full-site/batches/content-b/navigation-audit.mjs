import fs from 'node:fs';
import { parseMarkdown, nodes } from '../../../../scripts/lib/page-content.mjs';

const manifest = JSON.parse(fs.readFileSync('content/source/manifest.json', 'utf8'));
const known = new Set(manifest.pages.map(page => page.route));
const root = 'reports/full-site/batches/content-b';
const findings = [];
const canonicalPath = url => url.pathname === '/' ? '/' : url.pathname.replace(/\/+$/, '');
const isChineseHref = href => href.startsWith('/') && !href.startsWith('//');

for (const batch of fs.readdirSync(root).filter(name => /^batch-\d+$/.test(name)).sort()) {
  for (const file of fs.readdirSync(`${root}/${batch}/configs`).sort()) {
    const configPath = `${root}/${batch}/configs/${file}`;
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const tree = parseMarkdown(fs.readFileSync(config.chineseFile, 'utf8'));
    const links = nodes(tree, node => node.type === 'link');
    const localLinks = links.filter(node => isChineseHref(node.url));
    const local = new Set(localLinks.map(node => canonicalPath(new URL(node.url, 'https://www.aihero.dev'))));
    const nonCanonicalChineseHrefs = [];
    for (const node of localLinks) {
      const url = new URL(node.url, 'https://www.aihero.dev');
      const route = canonicalPath(url);
      if (known.has(route) && route !== url.pathname) {
        nonCanonicalChineseHrefs.push({ href: node.url, canonicalHref: route + url.search + url.hash });
      }
    }

    const missing = new Map();
    for (const node of links) {
      let url;
      try { url = new URL(node.url); } catch { continue; }
      if (!['aihero.dev', 'www.aihero.dev'].includes(url.hostname)) continue;
      const route = canonicalPath(url);
      if (route === config.route || !known.has(route) || local.has(route) || missing.has(route)) continue;
      missing.set(route, {
        route,
        url: node.url,
        localUrl: route + url.search + url.hash,
        label: nodes(node, child => child.type === 'text' || child.type === 'inlineCode').map(child => child.value).join(''),
      });
    }
    if (missing.size || nonCanonicalChineseHrefs.length) {
      findings.push({ batch, route: config.route, configPath, draft: config.chineseFile, missing: [...missing.values()], nonCanonicalChineseHrefs });
    }
  }
}
console.log(JSON.stringify(findings, null, 2));
