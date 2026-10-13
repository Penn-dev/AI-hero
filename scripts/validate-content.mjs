import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { articleParts, normalize, sha256 } from './lib/page-content.mjs';
import { safePath } from './lib/assembly-files.mjs';

export const renderableStatus = status => status === 'assembled' || /^translated(?:-|$)/.test(status);
export async function indexedTranslationErrors({ root, route, index, manifest, text }) {
  const errors = [];
  const record = manifest.pages.find(page => page.route === route);
  const page = index.pages[route];
  if (!record) return [`Indexed route missing from translation manifest: ${route}`];
  if (!renderableStatus(record.status)) errors.push(`Indexed translation is not renderable (${String(record.status)}): ${route}`);
  if (!page?.title?.trim() || !page?.markdown?.trim()) errors.push(`Indexed page title/body missing: ${route}`);
  try {
    const translation = text ?? await readFile(await safePath(root, record.translationPath), 'utf8');
    if (sha256(translation) !== record.translationHash) errors.push(`Translation hash mismatch: ${route}`);
    const article = translation.startsWith('---') ? articleParts(translation) : { markdown: translation };
    if (!page) errors.push(`Translated page missing from site index: ${route}`);
    else {
      if (normalize(page.markdown ?? '') !== normalize(article.markdown)) errors.push(`Indexed translation differs: ${route}`);
      for (const [key, value] of [['title', article.title], ['description', article.description], ['sourceUpdatedAt', article.updatedAt], ['sourceHash', record.sourceHash], ['sourceUrl', record.sourceUrl]]) {
        if (value !== undefined && page[key] !== value) errors.push(`Indexed ${key} differs: ${route}`);
      }
    }
  } catch (error) { errors.push(`Unreadable translation file: ${route}: ${error.message}`); }
  return errors;
}

export async function validateContent({ root = process.cwd() } = {}) {
  const json = async path => JSON.parse(await readFile(resolve(root, path), 'utf8'));
  const [source, translated, index] = await Promise.all([json('content/source/manifest.json'), json('content/zh/manifest.json'), json('content/zh/index.json')]);
  const errors = [];
  const duplicates = (pages, name) => {
    const seen = new Set();
    for (const page of pages) { if (seen.has(page.route)) errors.push(`Duplicate ${name} route: ${page.route}`); seen.add(page.route); }
  };
  duplicates(source.pages, 'source');
  duplicates(translated.pages, 'translation');
  for (const page of source.pages.filter(page => page.status === 'downloaded')) {
    try {
      if (sha256(await readFile(await safePath(root, page.sourcePath))) !== page.sourceHash) errors.push(`Source hash mismatch: ${page.route}`);
    } catch (error) { errors.push(`Unreadable source file: ${page.route}: ${error.message}`); }
  }
  const routes = new Set([...Object.keys(index.pages), ...translated.pages.filter(page => renderableStatus(page.status)).map(page => page.route)]);
  for (const route of routes) {
    errors.push(...await indexedTranslationErrors({ root, route, index, manifest: translated }));
    const record = translated.pages.find(page => page.route === route);
    const original = source.pages.find(page => page.route === route);
    if (!original || original.status !== 'downloaded') errors.push(`Translation source route unavailable: ${route}`);
    else if (record?.sourceHash !== original.sourceHash) errors.push(`Translation source hash mismatch: ${route}`);
  }
  return {
    sitemapCandidates: source.sitemapUrlCount,
    uniqueSourceRoutes: source.pages.length,
    downloaded: source.pages.filter(page => page.status === 'downloaded').length,
    noMarkdown: source.pages.filter(page => page.status === 'no-markdown').length,
    translated: translated.pages.filter(page => renderableStatus(page.status)).length,
    renderable: Object.keys(index.pages).length,
    errors,
  };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const summary = await validateContent();
  console.log(JSON.stringify(summary, null, 2));
  if (summary.errors.length) process.exitCode = 1;
}
