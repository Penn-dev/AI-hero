import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

const BASE_URL = 'https://www.aihero.dev';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const SOURCE_ROOT = resolve('content/source');
const MANIFEST_PATH = join(SOURCE_ROOT, 'manifest.json');
const USER_AGENT = 'AIHeroChineseLearningMirror/1.0 (authorized local mirror)';
const EXCLUDED_PREFIXES = ['/api', '/login', '/confirm', '/confirmed', '/redirect', '/unsubscribed', '/answer', '/team', '/error', '/thanks', '/welcome', '/progress'];

const args = new Set(process.argv.slice(2));
const valueAfter = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};
const limit = Number(valueAfter('--limit') ?? 0);
const selectedUrl = valueAfter('--url');
const force = args.has('--force');
const reportPath = valueAfter('--report') ? resolve(valueAfter('--report')) : null;
const startedAt = new Date().toISOString();

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function decodeXml(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&apos;', "'");
}

function parseSitemap(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
    const block = match[1];
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? null;
    return { url: decodeXml(loc ?? ''), lastmod };
  }).filter((item) => new URL(item.url).origin === BASE_URL);
}

function routeFromUrl(url) {
  const route = new URL(url).pathname.replace(/\/$/, '') || '/';
  return route;
}

function isAllowedRoute(route) {
  return !EXCLUDED_PREFIXES.some((prefix) => route === prefix || route.startsWith(`${prefix}/`));
}

function routeFile(route) {
  const clean = route === '/' ? 'index' : route.slice(1);
  const segments = clean.split('/').filter(Boolean).map((segment) => encodeURIComponent(segment));
  const file = resolve(SOURCE_ROOT, ...segments.slice(0, -1), `${segments.at(-1)}.md`);
  if (file !== SOURCE_ROOT && !file.startsWith(`${SOURCE_ROOT}${sep}`)) throw new Error(`Unsafe output path: ${route}`);
  return file;
}

async function atomicWrite(path, value) {
  await mkdir(dirname(path), { recursive: true });
  const temp = `${path}.tmp`;
  await writeFile(temp, value, 'utf8');
  await rename(temp, path);
}

async function readPreviousManifest() {
  try {
    const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
    if (!Array.isArray(manifest.pages)) throw new Error('Source manifest must contain a pages array');
    return manifest;
  } catch (error) {
    if (error.code === 'ENOENT') return { pages: [] };
    throw error;
  }
}

async function fetchText(url, headers = {}) {
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT, ...headers }, redirect: 'follow', signal: AbortSignal.timeout(20000) });
  return { response, text: await response.text() };
}

async function fetchMarkdown(url) {
  const route = routeFromUrl(url);
  const markdownUrl = route === '/' ? null : `${BASE_URL}${route}.md`;
  const attempts = markdownUrl
    ? [{ url: markdownUrl, headers: {} }, { url, headers: { Accept: 'text/markdown' } }]
    : [{ url, headers: { Accept: 'text/markdown' } }];

  const evidence = [];
  for (const attempt of attempts) {
    try {
      const { response, text } = await fetchText(attempt.url, attempt.headers);
      const contentType = response.headers.get('content-type') ?? '';
      const observed = { url: attempt.url, finalUrl: response.url || attempt.url, httpStatus: response.status, contentType, checkedAt: new Date().toISOString() };
      const isHtml = contentType.includes('text/html') || /^\s*(?:<!doctype html|<html(?:\s|>))/i.test(text);
      if (reportPath && response.ok && isHtml && attempt.url === url) {
        const bodyPath = `${reportPath}.responses/${sha256(attempt.url)}.html`;
        await atomicWrite(bodyPath, text);
        observed.bodyPath = relative(resolve('.'), bodyPath).replaceAll('\\', '/');
        observed.bodyHash = sha256(text);
      }
      evidence.push(observed);
      const finalUrl = new URL(observed.finalUrl);
      if (response.ok && finalUrl.origin === BASE_URL && isAllowedRoute(routeFromUrl(finalUrl.href)) && !isHtml && (contentType.includes('markdown') || contentType.includes('text/plain')) && text.trim()) {
        return { markdown: text.replaceAll('\r\n', '\n'), sourceUrl: attempt.url, contentType, attempts: evidence };
      }
    } catch (error) {
      evidence.push({ url: attempt.url, error: error instanceof Error ? error.message : String(error), errorCode: error.cause?.code ?? error.code ?? null, cause: error.cause?.message ?? null, checkedAt: new Date().toISOString() });
    }
  }
  return { markdown: null, attempts: evidence };
}

const { response: sitemapResponse, text: sitemapXml } = await fetchText(SITEMAP_URL);
if (!sitemapResponse.ok) throw new Error(`Sitemap request failed: HTTP ${sitemapResponse.status}`);

const sitemapEntries = parseSitemap(sitemapXml);
if (!/<urlset(?:\s|>)/.test(sitemapXml) || !sitemapEntries.length) throw new Error('Sitemap has no supported public URL entries; sources were not changed');
const previous = await readPreviousManifest();
if (reportPath) {
  await atomicWrite(`${reportPath}.sitemap.xml.gz`, gzipSync(Buffer.from(sitemapXml, 'utf8')));
  await atomicWrite(`${reportPath}.previous-manifest.json`, `${JSON.stringify(previous, null, 2)}\n`);
}
const previousByRoute = new Map(previous.pages.map((page) => [page.route, page]));
let queue = [...new Map(
  sitemapEntries
    .map((entry) => ({ ...entry, route: routeFromUrl(entry.url) }))
    .filter((entry) => isAllowedRoute(entry.route))
    .map((entry) => [entry.route, entry]),
).values()];

if (selectedUrl) {
  const normalized = new URL(selectedUrl, BASE_URL).href;
  queue = queue.filter((entry) => entry.url === normalized || entry.route === routeFromUrl(normalized));
  if (!queue.length) queue = [{ url: normalized, route: routeFromUrl(normalized), lastmod: null }];
}
if (limit > 0) queue = queue.slice(0, limit);

const results = [];
for (const [index, entry] of queue.entries()) {
  const old = previousByRoute.get(entry.route);
  if (!force && old?.lastmod && entry.lastmod && old.lastmod === entry.lastmod && old.status !== 'failed') {
    results.push({ ...old, acquiredThisRun: false, syncStatus: 'cached' });
    console.log(`[${index + 1}/${queue.length}] unchanged ${entry.route}`);
    continue;
  }

  try {
    const fetched = await fetchMarkdown(entry.url);
    if (!fetched.markdown) {
      results.push({ ...entry, status: fetched.attempts.every(attempt => attempt.error) ? 'failed' : 'no-markdown', acquiredThisRun: false, attempts: fetched.attempts, checkedAt: new Date().toISOString() });
      console.log(`[${index + 1}/${queue.length}] no-markdown ${entry.route}`);
    } else {
      const outputPath = routeFile(entry.route);
      await atomicWrite(outputPath, fetched.markdown);
      results.push({
        ...entry,
        status: 'downloaded',
        acquiredThisRun: true,
        attempts: fetched.attempts,
        sourceUrl: fetched.sourceUrl,
        contentType: fetched.contentType,
        sourcePath: relative(resolve('.'), outputPath).replaceAll('\\', '/'),
        sourceHash: sha256(fetched.markdown),
        sourceLength: fetched.markdown.length,
        checkedAt: new Date().toISOString(),
      });
      console.log(`[${index + 1}/${queue.length}] downloaded ${entry.route}`);
    }
  } catch (error) {
    results.push({ ...entry, status: 'failed', acquiredThisRun: false, error: error instanceof Error ? error.message : String(error), checkedAt: new Date().toISOString() });
    console.error(`[${index + 1}/${queue.length}] failed ${entry.route}`);
  }

  if (index < queue.length - 1) await new Promise((resolveDelay) => setTimeout(resolveDelay, 200));
}

const merged = selectedUrl || limit > 0
  ? [...previous.pages.filter((page) => !new Set(results.map((result) => result.route)).has(page.route)), ...results]
  : results;
const uniqueMerged = [...new Map(merged.map((page) => [page.route, page])).values()];
uniqueMerged.sort((a, b) => a.route.localeCompare(b.route));

const manifest = {
  version: 1,
  baseUrl: BASE_URL,
  generatedAt: new Date().toISOString(),
  sitemapUrlCount: sitemapEntries.length,
  selectedCount: queue.length,
  counts: uniqueMerged.reduce((counts, page) => ({ ...counts, [page.status]: (counts[page.status] ?? 0) + 1 }), {}),
  pages: uniqueMerged,
};
await atomicWrite(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
if (reportPath) {
  const pathInRepo = (path) => relative(resolve('.'), path).replaceAll('\\', '/');
  const excluded = sitemapEntries.map(entry => ({ ...entry, route: routeFromUrl(entry.url) }))
    .filter(entry => !isAllowedRoute(entry.route))
    .map(entry => ({ ...entry, status: 'excluded', acquiredThisRun: false, reason: 'non-content route (EXCLUDED_PREFIXES)' }));
  await atomicWrite(reportPath, `${JSON.stringify({
    version: 1, startedAt, completedAt: manifest.generatedAt, force, selectedUrl: selectedUrl ?? null, limit,
    sitemap: { url: SITEMAP_URL, path: pathInRepo(`${reportPath}.sitemap.xml.gz`), encoding: 'gzip', hash: sha256(sitemapXml), httpStatus: sitemapResponse.status, entries: sitemapEntries },
    previousManifestPath: pathInRepo(`${reportPath}.previous-manifest.json`),
    manifestPath: pathInRepo(MANIFEST_PATH),
    removedPages: previous.pages.filter(page => !sitemapEntries.some(entry => routeFromUrl(entry.url) === page.route)),
    pages: [...results.map(page => page.syncStatus === 'cached' ? { ...page, status: 'cached', previousStatus: page.status } : page), ...excluded],
  }, null, 2)}\n`);
}
console.log(JSON.stringify({ sitemapUrlCount: manifest.sitemapUrlCount, selectedCount: queue.length, counts: manifest.counts }, null, 2));
