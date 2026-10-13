import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gunzipSync } from 'node:zlib';
import test from 'node:test';

const script = fileURLToPath(new URL('./sync-content.mjs', import.meta.url));
const sitemap = '<urlset><url><loc>https://www.aihero.dev/article</loc><lastmod>2026-01-01</lastmod></url><url><loc>https://www.aihero.dev/login</loc></url></urlset>';

async function fixture(t, responses, previous = { pages: [] }) {
  const cwd = await mkdtemp(join(tmpdir(), 'aihero-source-test-'));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  await mkdir(join(cwd, 'content/source'), { recursive: true });
  await writeFile(join(cwd, 'content/source/manifest.json'), JSON.stringify(previous));
  const preload = join(cwd, 'fetch.mjs');
  await writeFile(preload, `const responses = ${JSON.stringify(responses)};
globalThis.fetch = async (url) => {
  const item = responses[url];
  if (!item) throw new Error('Unexpected test URL: ' + url);
  if (item.error) throw new TypeError(item.error, { cause: { code: 'TEST_NETWORK_ERROR' } });
  return new Response(item.body, { status: item.status ?? 200, headers: { 'content-type': item.type ?? 'text/markdown' } });
};`);
  const run = (...args) => spawnSync(process.execPath, ['--import', pathToFileURL(preload).href, script, ...args], { cwd, encoding: 'utf8', timeout: 15000 });
  const json = async (path) => JSON.parse(await readFile(join(cwd, path), 'utf8'));
  return { cwd, run, json };
}

test('forced snapshot records fresh acquisition, sitemap and exclusions instead of reusing old cache', async (t) => {
  const f = await fixture(t, {
    'https://www.aihero.dev/sitemap.xml': { body: sitemap, type: 'application/xml' },
    'https://www.aihero.dev/article.md': { body: '# Fresh article\n\nCurrent public body.\n' },
  }, { pages: [{ route: '/article', url: 'https://www.aihero.dev/article', lastmod: '2026-01-01', status: 'downloaded', sourceHash: 'old-cache' }] });
  const result = f.run('--force', '--report', 'reports/run.json');
  assert.equal(result.status, 0, result.stderr);
  const report = await f.json('reports/run.json');
  assert.equal(report.pages.find(p => p.route === '/article').status, 'downloaded');
  assert.notEqual(report.pages.find(p => p.route === '/article').sourceHash, 'old-cache');
  assert.equal(report.pages.find(p => p.route === '/login').status, 'excluded');
  assert.equal(report.sitemap.url, 'https://www.aihero.dev/sitemap.xml');
  assert.equal(report.sitemap.encoding, 'gzip');
  assert.equal(gunzipSync(await readFile(join(f.cwd, report.sitemap.path))).toString('utf8'), sitemap);
  assert.equal(report.pages.find(p => p.route === '/article').attempts[0].httpStatus, 200);
});

test('one request error still allows the public Markdown fallback and keeps the actual error cause', async (t) => {
  const f = await fixture(t, {
    'https://www.aihero.dev/sitemap.xml': { body: sitemap, type: 'application/xml' },
    'https://www.aihero.dev/article.md': { error: 'fetch failed' },
    'https://www.aihero.dev/article': { body: '# Fallback\n\nPublic text.\n' },
  });
  const result = f.run('--force', '--report', 'reports/run.json');
  assert.equal(result.status, 0, result.stderr);
  const page = (await f.json('reports/run.json')).pages.find(p => p.route === '/article');
  assert.equal(page.status, 'downloaded');
  assert.equal(page.sourceUrl, 'https://www.aihero.dev/article');
  assert.equal(page.attempts[0].errorCode, 'TEST_NETWORK_ERROR');
  assert.equal(page.attempts[1].httpStatus, 200);
});

test('invalid sitemap cannot erase the previous source manifest', async (t) => {
  const previous = { pages: [{ route: '/article', status: 'downloaded', sourceHash: 'preserve-me' }] };
  const f = await fixture(t, { 'https://www.aihero.dev/sitemap.xml': { body: '<html>Unavailable</html>', type: 'text/html' } }, previous);
  const result = f.run('--force', '--report', 'reports/run.json');
  assert.notEqual(result.status, 0);
  assert.deepEqual(await f.json('content/source/manifest.json'), previous);
});

test('HTML is retained as acquisition evidence, never labelled as a downloaded Markdown body', async (t) => {
  const html = '<!doctype html><html><body><h1>Sign in</h1></body></html>';
  const f = await fixture(t, {
    'https://www.aihero.dev/sitemap.xml': { body: sitemap, type: 'application/xml' },
    'https://www.aihero.dev/article.md': { body: html, type: 'text/plain' },
    'https://www.aihero.dev/article': { body: html, type: 'text/html' },
  });
  await writeFile(join(f.cwd, 'content/source/article.md'), '# Historical source\n');
  const result = f.run('--force', '--report', 'reports/run.json');
  assert.equal(result.status, 0, result.stderr);
  const page = (await f.json('reports/run.json')).pages.find(p => p.route === '/article');
  assert.equal(page.status, 'no-markdown');
  assert.equal(page.acquiredThisRun, false);
  assert.equal(await readFile(join(f.cwd, page.attempts.at(-1).bodyPath), 'utf8'), html);
  assert.equal(await readFile(join(f.cwd, 'content/source/article.md'), 'utf8'), '# Historical source\n');
});

test('HTML supplementation requests only missing bodies and does not mark the source manifest completed', async (t) => {
  const f = await fixture(t, { 'https://www.aihero.dev/article': { body: '<html><main><h1>Public article</h1><p>Body</p></main></html>', type: 'text/html' } });
  await mkdir(join(f.cwd, 'reports'), { recursive: true });
  await writeFile(join(f.cwd, 'reports/sync.json'), JSON.stringify({ pages: [
    { route: '/article', url: 'https://www.aihero.dev/article', status: 'no-markdown' },
    { route: '/already', url: 'https://www.aihero.dev/already', status: 'downloaded' },
  ] }));
  const supplement = fileURLToPath(new URL('./sync-source-html.mjs', import.meta.url));
  const result = spawnSync(process.execPath, ['--import', pathToFileURL(join(f.cwd, 'fetch.mjs')).href, supplement, '--input', 'reports/sync.json', '--report', 'reports/html.json'], { cwd: f.cwd, encoding: 'utf8', timeout: 15000 });
  assert.equal(result.status, 0, result.stderr);
  const report = await f.json('reports/html.json');
  assert.deepEqual(report.pages.map(p => p.route), ['/article']);
  assert.equal(report.pages[0].httpStatus, 200);
  assert.equal(report.pages[0].status, 'html-acquired');
  assert.equal(report.pages[0].bodyEncoding, 'gzip');
  assert.equal(gunzipSync(await readFile(join(f.cwd, report.pages[0].bodyPath))).toString('utf8'), '<html><main><h1>Public article</h1><p>Body</p></main></html>');
  assert.deepEqual((await f.json('content/source/manifest.json')).pages, []);
});

test('an unchanged page from an older acquired run is explicitly reported as cached', async (t) => {
  const previous = { pages: [{ route: '/article', url: 'https://www.aihero.dev/article', lastmod: '2026-01-01', status: 'downloaded', acquiredThisRun: true, sourceHash: 'old-cache' }] };
  const f = await fixture(t, { 'https://www.aihero.dev/sitemap.xml': { body: sitemap, type: 'application/xml' } }, previous);
  const result = f.run('--report', 'reports/run.json');
  assert.equal(result.status, 0, result.stderr);
  const page = (await f.json('reports/run.json')).pages.find(p => p.route === '/article');
  assert.equal(page.status, 'cached');
  assert.equal(page.acquiredThisRun, false);
  assert.equal((await f.json('content/source/manifest.json')).pages[0].status, 'downloaded');
});
