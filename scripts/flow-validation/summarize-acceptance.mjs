import { readFile, writeFile, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
const root = resolve(import.meta.dirname, '../..');
const base = 'reports/flow-validation/acceptance/';
const read = async p => JSON.parse(await readFile(resolve(root, p), 'utf8'));
const write = (p, v) => writeFile(resolve(root, base + p), JSON.stringify(v, null, 2) + '\n', 'utf8');
const digest = b => createHash('sha256').update(b).digest('hex');
const usage = await read('reports/flow-validation/preparation/usage-evidence.json');
const rows = usage.sessions.flatMap(s => s.rows.map(({ requests, ...r }) => ({ ...r, requestCount: requests.length })));
const maps = [];
for (const row of rows.filter(r => r.route)) {
  const stage = row.stage.endsWith('draft') ? 'draft' : 'edited';
  const path = `content/pilots/flow-validation/${row.route}/${stage}/stage.json`;
  const original = await read(path);
  const inputHashes = [];
  for (const [key, expected] of Object.entries(original.inputHashes)) {
    const resolvedPath = key.startsWith('inputs/') ? `content/pilots/flow-validation/${key}` : key;
    if (/^[A-Za-z]:/.test(key)) {
      inputHashes.push({ originalKey: key, resolvedPath, expected, status: 'SELF_REPORTED_EXTERNAL_MEMORY_HASH_NOT_REOPENED' });
      continue;
    }
    const actual = digest(await readFile(resolve(root, resolvedPath)));
    inputHashes.push({ originalKey: key, resolvedPath, expected, actual, status: actual === expected.toLowerCase() ? 'PASS' : 'MISMATCH' });
  }
  maps.push({ stage: row.stage, stagePath: path, reportedTaskId: original.taskId, threadId: row.threadId, turnId: row.turnId,
    reportedUsageTurnIds: original.usage.turnIds, inputHashes,
    note: row.stage === 'A-draft' ? 'Only entry hash was recorded; this does not prove a complete read manifest.' :
      row.stage === 'B-edited' ? 'Original usage.turnIds contains thread ID; telemetry turn ID is mapped here without changing stage.json.' :
      row.stage === 'B-draft' ? 'inputs/* keys resolved against flow-validation root; scripts/* against project root.' : 'Task ID unknown is mapped separately; producer artifact unchanged.' });
}
await write('producer-mapping.json', { checkedAt: new Date().toISOString(), maps, evidenceBoundary: 'Hash matches verify current bytes, not which bytes were read by a request.' });
await write('cost-summary.json', {
  checkedAt: usage.checkedAt, unit: 'tokens; not currency or subscription quota', rows,
  historicalKnowledgeTotal: rows.filter(r => r.stage.startsWith('knowledge-foundation')).reduce((s, r) => s + r.usage.total_tokens, 0),
  routeTotals: Object.fromEntries(['A', 'B'].map(route => [route, rows.filter(r => r.route === route).reduce((s, r) => s + r.usage.total_tokens, 0)])),
  governance: { total: null, status: 'UNKNOWN', reason: 'Source governance log was not found in the authorized 2026/09/22 file lookup; no reliable trial turn boundary. No wider chat scan performed.' },
  method: 'Per-response metered usage, responseId dedupe, cumulative counters used for reconciliation only. Cached input is part of input; reasoning is part of output. Do not add subsets twice.',
  limitations: ['Active assembly turn is PARTIAL and excludes later requests, final response and handoff; governance can refresh read-only after task completion.', 'Failures/retries remain null, including unmetered transport failures.', 'Costs belong to whole stage turns including HOLD handling, not a precisely isolated article operation.', 'Current snapshot linkage is retrospective, not proof of per-request source access.', 'No winner, equal-quality claim, generalization or savings conclusion.']
});
await write('exceptions.json', {
  status: 'DISCLOSED_LIMITATIONS', strictIndependence: false,
  producerReports: [
    { stage: 'A-draft', report: 'No exception reported; input hash manifest only includes entry file.' },
    { stage: 'B-draft', report: 'Handoff disclosed MEMORY.md keyword search. Original stage.json did not include this disclosure; preserved unchanged.' },
    { stage: 'A-edited', report: 'stage.json discloses project-history memory-index search and reported memory hash. Claimed no old sample translation or answer read/used.' },
    { stage: 'B-edited', report: 'stage.json reports no off-whitelist reads.' }
  ],
  assessment: 'Self-reports and telemetry do not independently prove absence of influence. Do not describe the experiment as strictly independent.',
  pageFindings: ['X has 4 supplied glossary terms but 0 inline body term buttons; Y has 13 supplied terms and 1 inline body term button. Generic identical own-term entry sections retain access to supplied definitions.', 'Mobile TOC hash updates, but actual scroll landing remained outside viewport in observed X/Y runs; PARTIAL, root cause not established.', 'Captured browser errors report [vinext] RSC prefetch setup error: TypeError: f is not a function. Direct page loads and tested glossary interactions worked; prefetch behavior is not accepted.', 'Full-page and one body screenshot timed out; only listed clear clips count as screenshot evidence.'],
  authority: 'Final semantic and teaching evaluation remains with governance; Workshop HOLD unchanged.'
});
const keep = ['X-desktop-1280-top.jpg', 'X-desktop-1280-body.jpg', 'Y-desktop-1280-top.jpg', 'X-mobile-390-top.jpg', 'X-mobile-390-term.jpg', 'Y-mobile-390-search.jpg'];
const remove = ['X-desktop-term.png', 'X-desktop-top.png', 'Y-desktop-1280-term.jpg', 'Y-desktop-full.png', 'Y-desktop-term.png', 'Y-mobile-390-term.jpg'];
for (const name of remove) { try { await unlink(resolve(root, base, 'screenshots', name)); } catch (e) { if (e.code !== 'ENOENT') throw e; } }
await write('screenshot-manifest.json', { method: 'Browser-produced JPEG viewport/document-coordinate clips; no image editing.', files: await Promise.all(keep.map(async name => ({ path: base + 'screenshots/' + name, sha256: digest(await readFile(resolve(root, base, 'screenshots', name))) }))), limitation: 'Not complete full-page raster captures. Full rendered DOM records supplement key-area images. Sticky element position reflects actual scroll position during capture.' });
console.log(JSON.stringify({ status: 'PASS', inputHashMismatches: maps.flatMap(m => m.inputHashes).filter(h => h.status === 'MISMATCH').length, costs: rows.map(r => ({ stage: r.stage, total: r.usage.total_tokens, requests: r.requestCount, status: r.status })) }, null, 2));
