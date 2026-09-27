import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';

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
  }).filter((item) => item.url.startsWith(BASE_URL));
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
  try { return JSON.parse(await readFile(MANIFEST_PATH, 'utf8')); }
  catch { return { pages: [] }; }
}

async function fetchText(url, headers = {}) {
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT, ...headers }, redirect: 'follow' });
  return { response, text: await response.text() };
}

async function fetchMarkdown(url) {
  const route = routeFromUrl(url);
  const markdownUrl = route === '/' ? null : `${BASE_URL}${route}.md`;
  const attempts = markdownUrl
    ? [{ url: markdownUrl, headers: {} }, { url, headers: { Accept: 'text/markdown' } }]
    : [{ url, headers: { Accept: 'text/markdown' } }];

  for (const attempt of attempts) {
    const { response, text } = await fetchText(attempt.url, attempt.headers);
    const contentType = response.headers.get('content-type') ?? '';
    if (response.ok && (contentType.includes('markdown') || contentType.includes('text/plain')) && text.trim()) {
      return { markdown: text.replaceAll('\r\n', '\n'), sourceUrl: attempt.url, contentType };
    }
  }
  return null;
}

const { response: sitemapResponse, text: sitemapXml } = await fetchText(SITEMAP_URL);
if (!sitemapResponse.ok) throw new Error(`Sitemap request failed: HTTP ${sitemapResponse.status}`);

const sitemapEntries = parseSitemap(sitemapXml);
const previous = await readPreviousManifest();
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
    results.push(old);
    console.log(`[${index + 1}/${queue.length}] unchanged ${entry.route}`);
    continue;
  }

  try {
    const fetched = await fetchMarkdown(entry.url);
    if (!fetched) {
      results.push({ ...entry, status: 'no-markdown', checkedAt: new Date().toISOString() });
      console.log(`[${index + 1}/${queue.length}] no-markdown ${entry.route}`);
    } else {
      const outputPath = routeFile(entry.route);
      await atomicWrite(outputPath, fetched.markdown);
      results.push({
        ...entry,
        status: 'downloaded',
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
    results.push({ ...entry, status: 'failed', error: error instanceof Error ? error.message : String(error), checkedAt: new Date().toISOString() });
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
console.log(JSON.stringify({ sitemapUrlCount: manifest.sitemapUrlCount, selectedCount: queue.length, counts: manifest.counts }, null, 2));
