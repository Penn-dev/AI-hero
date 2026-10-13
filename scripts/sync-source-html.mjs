// Supplement the fixed Markdown run; never resync already acquired article bodies.
import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { gzipSync, gunzipSync } from 'node:zlib';

const valueAfter = (name) => process.argv[process.argv.indexOf(name) + 1];
if (!process.argv.includes('--input') || !process.argv.includes('--report')) throw new Error('Use --input <sync-report> --report <html-report> [--probes <probe-report>]');
const input = JSON.parse(await readFile(resolve(valueAfter('--input')), 'utf8'));
const reportPath = resolve(valueAfter('--report'));
const hash = (value) => createHash('sha256').update(value).digest('hex');
const repoPath = (path) => relative(resolve('.'), path).replaceAll('\\', '/');
const probes = process.argv.includes('--probes') ? JSON.parse(await readFile(resolve(valueAfter('--probes')), 'utf8')) : [];
const report = { version: 1, inputPath: valueAfter('--input'), startedAt: new Date().toISOString(), pages: [] };
const queue = input.pages.filter(page => ['no-markdown', 'failed'].includes(page.status) || page.route === '/');
await mkdir(dirname(reportPath), { recursive: true });
for (const [index, page] of queue.entries()) {
  const url = new URL(page.url);
  if (url.origin !== 'https://www.aihero.dev') throw new Error(`Unsupported public origin: ${url.origin}`);
  let observed;
  try {
    const probe = probes.find(entry => entry.route === page.route);
    if (probe) {
      const archived = await readFile(resolve(probe.path));
      const body = probe.bodyEncoding === 'gzip' ? gunzipSync(archived) : archived;
      if (probe.bodyHash && hash(body) !== probe.bodyHash) throw new Error(`Probe evidence hash mismatch: ${page.route}`);
      observed = { ...page, status: probe.status === 200 ? 'html-acquired' : 'html-unavailable', acquiredThisRun: probe.status === 200, httpStatus: probe.status, finalUrl: probe.url, contentType: probe.type, bodyPath: probe.path, bodyHash: hash(body), bodyEncoding: probe.bodyEncoding ?? 'utf8', archiveHash: hash(archived), checkedAt: probe.checkedAt ?? (await stat(resolve(probe.path))).mtime.toISOString(), reusedCurrentRunProbe: true };
    } else {
      const response = await fetch(url, { headers: { Accept: 'text/html', 'User-Agent': 'AIHeroChineseLearningMirror/1.0 (authorized local mirror)' }, redirect: 'follow', signal: AbortSignal.timeout(20000) });
      const body = await response.text();
      const bodyPath = `${reportPath}.responses/${hash(page.url)}.html.gz`;
      await mkdir(dirname(bodyPath), { recursive: true });
      const archived = gzipSync(Buffer.from(body, 'utf8'));
      await writeFile(bodyPath, archived);
      observed = { ...page, status: response.ok && response.headers.get('content-type')?.includes('text/html') ? 'html-acquired' : 'html-unavailable', acquiredThisRun: response.ok, httpStatus: response.status, finalUrl: response.url || page.url, contentType: response.headers.get('content-type'), bodyPath: repoPath(bodyPath), bodyHash: hash(body), bodyEncoding: 'gzip', archiveHash: hash(archived), checkedAt: new Date().toISOString() };
    }
  } catch (error) {
    observed = { ...page, status: 'failed', error: error.message, errorCode: error.cause?.code ?? error.code ?? null, cause: error.cause?.message ?? null, checkedAt: new Date().toISOString() };
  }
  report.pages.push(observed);
  // Keep request evidence recoverable if a later request or the process fails.
  report.completedAt = new Date().toISOString();
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(`[${index + 1}/${queue.length}] ${observed.status} ${page.route}`);
  if (index < queue.length - 1) await new Promise(done => setTimeout(done, 200));
}
