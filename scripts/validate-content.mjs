import { createHash } from 'node:crypto';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

function sha256(value) { return createHash('sha256').update(value).digest('hex'); }
async function readJson(path) { return JSON.parse(await readFile(resolve(path), 'utf8')); }

const source = await readJson('content/source/manifest.json');
const translated = await readJson('content/zh/manifest.json');
const index = await readJson('content/zh/index.json');
const errors = [];

const sourceRoutes = source.pages.map((page) => page.route);
const duplicateSourceRoutes = sourceRoutes.filter((route, position) => sourceRoutes.indexOf(route) !== position);
if (duplicateSourceRoutes.length) errors.push(`Duplicate source routes: ${[...new Set(duplicateSourceRoutes)].join(', ')}`);

for (const page of source.pages.filter((entry) => entry.status === 'downloaded')) {
  try {
    await access(resolve(page.sourcePath));
    const markdown = await readFile(resolve(page.sourcePath), 'utf8');
    if (sha256(markdown) !== page.sourceHash) errors.push(`Source hash mismatch: ${page.route}`);
  } catch {
    errors.push(`Missing source file: ${page.route}`);
  }
}

const translatedRoutes = translated.pages.map((page) => page.route);
const duplicateTranslatedRoutes = translatedRoutes.filter((route, position) => translatedRoutes.indexOf(route) !== position);
if (duplicateTranslatedRoutes.length) errors.push(`Duplicate translation routes: ${[...new Set(duplicateTranslatedRoutes)].join(', ')}`);

for (const page of translated.pages.filter((entry) => entry.status === 'translated')) {
  try {
    const markdown = await readFile(resolve(page.translationPath), 'utf8');
    if (sha256(markdown) !== page.translationHash) errors.push(`Translation hash mismatch: ${page.route}`);
    if (!index.pages[page.route]) errors.push(`Translated page missing from site index: ${page.route}`);
  } catch {
    errors.push(`Missing translation file: ${page.route}`);
  }
}

const indexedRoutes = Object.keys(index.pages);
for (const route of indexedRoutes) {
  if (!translatedRoutes.includes(route)) errors.push(`Indexed route missing from translation manifest: ${route}`);
}

const summary = {
  sitemapCandidates: source.sitemapUrlCount,
  uniqueSourceRoutes: source.pages.length,
  downloaded: source.pages.filter((page) => page.status === 'downloaded').length,
  noMarkdown: source.pages.filter((page) => page.status === 'no-markdown').length,
  translated: translated.pages.filter((page) => page.status === 'translated').length,
  renderable: indexedRoutes.length,
  errors,
};
console.log(JSON.stringify(summary, null, 2));
if (errors.length) process.exitCode = 1;
