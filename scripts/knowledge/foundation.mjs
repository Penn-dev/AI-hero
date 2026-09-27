import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

const root = resolve(import.meta.dirname, '../..');
const shared = 'content/learning/shared/';
const reports = 'reports/knowledge-foundation/';
const hash = data => createHash('sha256').update(data).digest('hex');
const read = p => readFile(resolve(root, p), 'utf8');
const json = async p => JSON.parse(await read(p));
const serial = data => JSON.stringify(data, null, 2) + '\n';
async function save(p, data) {
  if (![shared, reports].some(prefix => p.startsWith(prefix)) || p.includes('..')) throw Error('Output outside owned paths');
  await mkdir(resolve(root, p, '..'), { recursive: true });
  await writeFile(resolve(root, p), serial(data), 'utf8');
}
function assert(ok, message) { if (!ok) throw Error(message); }
function sourcePath(p) { assert(typeof p === 'string' && p.startsWith('content/source/') && !p.includes('..'), `Unsafe source path: ${p}`); return p; }
async function walk(dir) {
  const result = [];
  for (const e of await readdir(resolve(root, dir), { withFileTypes: true })) {
    if (e.isDirectory()) result.push(...await walk(`${dir}/${e.name}`));
    else result.push(`${dir}/${e.name}`);
  }
  return result.sort();
}
const textOf = n => n.value ?? (n.children ?? []).map(textOf).join('');
function extract(text) {
  const lines = text.split(/\r?\n/);
  const fmEnd = lines[0] === '---' ? lines.indexOf('---', 1) : -1;
  const frontmatter = fmEnd > 0 ? lines.slice(1, fmEnd).join('\n') : '';
  const field = name => frontmatter.match(new RegExp(`^${name}:\\s*["']?(.*?)["']?\\s*$`, 'm'))?.[1] ?? null;
  const body = lines.map((line, i) => i <= fmEnd ? '' : line).join('\n');
  let tree, parseStatus = 'mdx';
  try { tree = unified().use(remarkParse).use(remarkGfm).use(remarkMdx).parse(body); }
  catch { tree = unified().use(remarkParse).use(remarkGfm).parse(body); parseStatus = 'markdown-fallback'; }
  const headings = [], links = [], code = [], inlineCode = [], components = [];
  function visit(n) {
    const line = n.position?.start.line;
    if (n.type === 'heading') headings.push({ depth: n.depth, title: textOf(n), line });
    if (['link', 'image', 'definition'].includes(n.type)) links.push({ url: n.url, line, kind: n.type });
    if (n.type === 'code') code.push({ language: n.lang ?? '', start: line, end: n.position.end.line, sha256: hash(n.value) });
    if (n.type === 'inlineCode') inlineCode.push({ value: n.value, line });
    if (n.type.startsWith('mdxJsx')) {
      components.push({ name: n.name, line });
      for (const a of n.attributes ?? []) if (['href', 'src'].includes(a.name) && typeof a.value === 'string') links.push({ url: a.value, line, kind: 'jsx-attribute' });
    }
    n.children?.forEach(visit);
  }
  visit(tree);
  const versionSignals = lines.flatMap((value, i) => /\b(?:version\s+\d|v\d+|\d+\.\d+(?:\.\d+)?|deprecated|newer pattern)\b/i.test(value) ? [{ line: i + 1, excerpt: value.slice(0, 400) }] : []);
  const riskSignals = [];
  if (code.length) riskSignals.push('code-examples');
  if (/\bTODO\b/.test(body)) riskSignals.push('exercise-TODO');
  if (versionSignals.length) riskSignals.push('version-sensitive');
  if (components.length || /<\/?[A-Za-z]/.test(body)) riskSignals.push('mdx-or-html');
  if (/CTA|Newsletter|subscribe|\$\d|pricing/i.test(body)) riskSignals.push('promotion-or-price-candidate');
  if (/###? Video Transcript\s*$/.test(body)) riskSignals.push('empty-final-transcript');
  if (parseStatus !== 'mdx') riskSignals.push('mdx-parse-fallback');
  const lexical = [...new Set([...links.map(l => l.url?.match(/\/ai-coding-dictionary\/([^/#?]+)/)?.[1]).filter(Boolean), ...inlineCode.map(c => c.value)])].slice(0, 80);
  return { title: field('title') ?? headings[0]?.title ?? null, declaredType: field('type'), frontmatter, headings, links, code, inlineCode, components, versionSignals, riskSignals, candidateConcepts: lexical, parseStatus };
}
async function inventory() {
  const manifestText = await read('content/source/manifest.json');
  const manifest = JSON.parse(manifestText);
  const downloaded = manifest.pages.filter(p => p.status === 'downloaded');
  const files = await walk('content/source');
  const pages = [], issues = [];
  for (const p of downloaded) {
    sourcePath(p.sourcePath);
    if (!files.includes(p.sourcePath)) { issues.push({ kind: 'missing', path: p.sourcePath, route: p.route }); continue; }
    const bytes = await readFile(resolve(root, p.sourcePath));
    const text = bytes.toString('utf8');
    const data = extract(text);
    const kind = p.route === '/' || p.route === '/ai-coding-dictionary' ? 'index' : p.route.startsWith('/ai-coding-dictionary/') ? 'dictionary' : p.route.startsWith('/skills/skills-changelog-') ? 'skill-changelog' : data.declaredType === 'workshop-lesson' ? 'workshop-lesson' : 'article-unclassified';
    const sha256 = hash(bytes);
    if (sha256 !== p.sourceHash) issues.push({ kind: 'manifest-hash-mismatch', route: p.route, expected: p.sourceHash, actual: sha256 });
    pages.push({ id: p.route, path: p.sourcePath, sourceUrl: p.sourceUrl ?? p.url, sha256, manifestSha256: p.sourceHash, bytes: bytes.length, chars: text.length, lineCount: text.split(/\r?\n/).length, kind, classificationStatus: 'structural-only', grouping: p.route.startsWith('/workshops/') ? p.route.split('/').slice(0, 3).join('/') : kind, scriptCovered: true, bodyReviewed: false, semanticRelationsConfirmed: false, ...data });
  }
  for (const key of ['id', 'path']) {
    const seen = new Set();
    for (const p of pages) { if (seen.has(p[key])) issues.push({ kind: `duplicate-${key}`, value: p[key] }); seen.add(p[key]); }
  }
  const unlisted = files.filter(p => p.endsWith('.md') && !downloaded.some(d => d.sourcePath === p));
  for (const p of unlisted) { const bytes = await readFile(resolve(root, p)); pages.push({ id: `unlisted:${p}`, path: p, sourceUrl: null, sha256: hash(bytes), bytes: bytes.length, chars: bytes.toString('utf8').length, lineCount: bytes.toString('utf8').split(/\r?\n/).length, kind: 'unknown', classificationStatus: 'unlisted', grouping: 'unknown', scriptCovered: true, bodyReviewed: false, semanticRelationsConfirmed: false, ...extract(bytes.toString('utf8')) }); issues.push({ kind: 'unlisted', path: p }); }
  const byType = {};
  for (const p of pages) byType[p.kind] = (byType[p.kind] ?? 0) + 1;
  const result = { version: 1, manifest: { path: 'content/source/manifest.json', sha256: hash(manifestText), declaredCounts: manifest.counts }, method: 'Full local source inventory; AST headings/links/code; lexical concepts and risk signals are candidates only. Bare URLs, dynamic JSX attributes and semantic dependencies are not exhaustively inferred. Human coverage is in knowledge.json/reviews.', totals: { manifestEntries: manifest.pages.length, downloaded: downloaded.length, extracted: pages.length, localMarkdown: files.filter(p => p.endsWith('.md')).length, byType }, excludedOrOther: manifest.pages.filter(p => p.status !== 'downloaded'), nonMarkdownFiles: files.filter(p => !p.endsWith('.md')), issues, pages: pages.sort((a, b) => a.id.localeCompare(b.id, 'en')) };
  await save(shared + 'content-map.json', result);
  console.log(JSON.stringify({ totals: result.totals, issues, fallback: pages.filter(p => p.parseStatus !== 'mdx').map(p => p.id) }));
}
async function packages(k, map) {
  const result = [];
  for (const id of k.packageIds) {
    const profile = k.articles[id];
    const article = map.pages.find(p => p.id === id);
    assert(article, `Unknown article: ${id}`);
    const ids = new Set();
    function add(cid) { assert(k.concepts[cid], `Unknown concept ${cid}`); if (ids.has(cid)) return; ids.add(cid); k.concepts[cid].dependsOn.forEach(add); }
    [...profile.conceptIds, ...profile.prerequisiteIds].forEach(add);
    const concepts = Object.fromEntries([...ids].sort().map(cid => [cid, k.concepts[cid]]));
    const supplementalRefs = [...profile.articleSpecific, ...(profile.originalExampleRefs ?? []), ...k.findings.filter(f => f.articleIds.includes(id)).flatMap(f => f.evidence)];
    const allRefs = [...Object.values(concepts).flatMap(c => c.evidence), ...supplementalRefs];
    const evidenceIds = new Set(allRefs.map(e => e.sourceId));
    const evidence = [];
    for (const sid of [...evidenceIds].sort()) {
      const source = k.sources[sid];
      const lines = (await read(source.path)).split(/\r?\n/);
      const ranges = [...new Map(allRefs.filter(e => e.sourceId === sid).map(e => [`${e.start}-${e.end}`, e])).values()];
      evidence.push({ sourceId: sid, ...source, excerpts: ranges.map(e => ({ start: e.start, end: e.end, text: lines.slice(e.start - 1, e.end).join('\n') })) });
    }
    result.push({ version: 1, articleId: id, integrationStatus: 'static-input-only; not connected to translation or UI', knowledgeSha256: hash(serial(k)), mapSha256: hash(serial(map)), source: { path: article.path, sha256: article.sha256, text: await read(article.path) }, referenceTranslation: k.sources[profile.translationSourceId], profile, concepts, evidence, template: k.templates[profile.kind], gates: k.gates, qualityDimensions: k.qualityDimensions, productionRules: k.productionRules, riskPolicy: k.riskPolicy, unresolved: k.findings.filter(f => f.articleIds.includes(id)), outputContract: k.outputContract });
  }
  return result;
}
const pointerKey = s => s.replaceAll('~', '~0').replaceAll('/', '~1');
function atPointer(value, pointer) {
  assert(pointer.startsWith('/'), `Invalid audit pointer ${pointer}`);
  for (const part of pointer.slice(1).split('/')) {
    value = value?.[part.replaceAll('~1', '/').replaceAll('~0', '~')];
    assert(value !== undefined, `Unresolved audit pointer ${pointer}`);
  }
  return value;
}
async function executionView(audit, auditPath, k) {
  const locate = e => {
    const source = k.sources[e.sourceId];
    assert(source, `Unknown execution evidence ${e.sourceId}`);
    return source.path === audit.source.path
      ? { within: 'source.text', start: e.start, end: e.end }
      : { path: source.path, sha256: source.sha256, start: e.start, end: e.end };
  };
  const profile = structuredClone(audit.profile);
  profile.sourceReading = locate(profile.sourceReading);
  profile.articleSpecific = profile.articleSpecific.map(({ conceptId, text, ...e }) => ({ conceptId, text, evidence: locate(e) }));
  if (profile.originalExampleRefs) profile.originalExampleRefs = profile.originalExampleRefs.map(locate);
  const concepts = Object.fromEntries(Object.entries(audit.concepts).map(([id, c]) => [id, {
    zh: c.zh, en: c.en, aliases: c.aliases, definition: c.definition, scope: c.scope,
    dependsOn: c.dependsOn, confidence: c.confidence, auditRef: `/concepts/${pointerKey(id)}`,
  }]));
  const unresolved = [];
  for (const [index, finding] of audit.unresolved.entries()) {
    const evidence = [];
    for (const e of finding.evidence) {
      const ref = locate(e);
      // Retain external context for the unresolved scope judgment. Local evidence
      // is already present in full source.text and must not be copied again.
      if (finding.id === 'F-system-scope' && ref.path) {
        ref.text = (await read(ref.path)).split(/\r?\n/).slice(ref.start - 1, ref.end).join('\n');
      }
      evidence.push(ref);
    }
    unresolved.push({ id: finding.id, status: finding.status, observation: finding.observation, action: finding.action, evidence, auditRef: `/unresolved/${index}` });
  }
  const finalGate = k.gates.find(g => g.id === 'G2');
  return {
    version: 1, articleId: audit.articleId, stage: 'G1', status: 'static execution view; no production run',
    audit: { path: auditPath, sha256: hash(serial(audit)) },
    source: audit.source, referenceTranslation: audit.referenceTranslation, profile, concepts,
    template: audit.template, qualityDimensions: audit.qualityDimensions,
    stageGate: k.gates.find(g => g.id === 'G1'),
    finalRelease: { stop: finalGate.stop, qualityReference: finalGate.qualityReference, typeBoundary: finalGate.minimum.at(-1), auditRef: '/gates/2' },
    writingLayers: audit.productionRules.layers, unresolved,
    outputRequired: audit.outputContract.required,
    onDemand: { inputGate: '/gates/0', fullEvidence: '/evidence', governance: '/productionRules', riskPolicy: '/riskPolicy', outputContract: '/outputContract' },
    readingRule: 'auditRef/onDemand 是 audit.path 中的 JSON Pointer；定义的依赖理由、来源行号与完整上下文按需读取。within 指本包完整原文行号；外部证据按路径/哈希/行号定位。已嵌入的未决语义证据须直接审读。概念仅生产者核对，非独立语义批准。',
  };
}
async function checkExecution(view, audit, k) {
  assert(hash(await read(view.audit.path)) === view.audit.sha256, 'Audit hash drift');
  assert(view.source.text === await read(view.source.path) && hash(view.source.text) === view.source.sha256, 'Execution source changed');
  assert(JSON.stringify(Object.keys(view.concepts)) === JSON.stringify(Object.keys(audit.concepts)), 'Execution concept omitted');
  for (const [id, c] of Object.entries(view.concepts)) {
    for (const field of ['zh', 'en', 'aliases', 'definition', 'scope', 'dependsOn', 'confidence']) assert(JSON.stringify(c[field]) === JSON.stringify(audit.concepts[id][field]), `Execution concept changed ${id}:${field}`);
  }
  assert(JSON.stringify(view.template) === JSON.stringify(audit.template), 'Execution template changed');
  assert(JSON.stringify(view.stageGate) === JSON.stringify(k.gates.find(g => g.id === 'G1')), 'G1 drift');
  assert(view.finalRelease.stop === k.gates.find(g => g.id === 'G2').stop, 'G2 drift');
  assert(JSON.stringify(view.qualityDimensions) === JSON.stringify(audit.qualityDimensions), 'Execution dimensions changed');
  assert(view.unresolved.length === audit.unresolved.length, 'Execution finding omitted');
  for (const [index, f] of view.unresolved.entries()) {
    for (const field of ['id', 'status', 'observation', 'action']) assert(f[field] === audit.unresolved[index][field], `Execution finding changed ${field}`);
    assert(f.evidence.length === audit.unresolved[index].evidence.length, 'Finding evidence omitted');
    for (const [i, e] of f.evidence.entries()) {
      const original = audit.unresolved[index].evidence[i];
      assert(e.start === original.start && e.end === original.end, 'Finding evidence range changed');
      assert((e.path ?? view.source.path) === k.sources[original.sourceId].path, 'Finding evidence source changed');
      if (f.id === 'F-system-scope' && e.path) assert(typeof e.text === 'string' && e.text.length > 0, 'Unresolved external context omitted');
    }
  }
  const referencedFiles = new Set();
  async function refs(value) {
    if (!value || typeof value !== 'object') return;
    if (value.auditRef) atPointer(audit, value.auditRef);
    if (value.path && value.sha256) {
      assert(hash(await readFile(resolve(root, value.path))) === value.sha256, `Reference hash drift ${value.path}`);
      referencedFiles.add(value.path);
    }
    if (value.start !== undefined) {
      const lines = (value.within === 'source.text' ? view.source.text : await read(value.path)).split(/\r?\n/);
      assert(value.start >= 1 && value.end >= value.start && value.end <= lines.length, 'Execution evidence range invalid');
      if (value.text !== undefined) assert(value.text === lines.slice(value.start - 1, value.end).join('\n'), 'Execution excerpt changed');
    }
    for (const child of Object.values(value)) await refs(child);
  }
  await refs(view);
  for (const pointer of Object.values(view.onDemand)) atPointer(audit, pointer);
  // Resolve audit evidence too: deferred context remains readable at its frozen source.
  for (const e of audit.evidence) {
    assert(hash(await readFile(resolve(root, e.path))) === e.sha256, `Deferred evidence drift ${e.path}`);
    const lines = (await read(e.path)).split(/\r?\n/);
    for (const range of e.excerpts) assert(range.text === lines.slice(range.start - 1, range.end).join('\n'), 'Deferred excerpt drift');
    referencedFiles.add(e.path);
  }
  return referencedFiles.size;
}
function enrich(map, k) {
  for (const p of map.pages) {
    const sids = Object.keys(k.sources).filter(id => k.sources[id].path === p.path);
    p.reviewedRanges = k.reviews.filter(r => sids.includes(r.sourceId));
    p.bodyReviewed = p.reviewedRanges.some(r => r.coverage.startsWith('full-body'));
    p.semanticRelationsConfirmed = Boolean(k.articles[p.id]);
    p.semanticScope = k.articles[p.id] ? 'sample teaching dependencies reviewed by producer; not full translation approval' : 'no article dependency profile approved';
    if (k.articles[p.id]) { p.kind = k.articles[p.id].kind; p.classificationStatus = 'producer-body-reviewed'; }
    const tags = p.frontmatter.match(/^tags:\s*\n((?:\s+-[^\n]+\n?)*)/m)?.[1] ?? '';
    p.topicSignals = { tags: tags.split('\n').map(t => t.replace(/^\s*-\s*/, '').trim()).filter(Boolean), title: p.title, status: 'source labels, not semantic cluster approval' };
    p.candidateConceptLimit = 80;
    p.candidateConceptLimitReached = p.candidateConcepts.length === 80;
    p.confirmedConceptIds = k.articles[p.id]?.conceptIds ?? [];
  }
  map.totals.byType = {};
  for (const p of map.pages) map.totals.byType[p.kind] = (map.totals.byType[p.kind] ?? 0) + 1;
  map.totals.fullBodyReviewed = map.pages.filter(p => p.bodyReviewed).length;
  map.totals.excerptReviewed = map.pages.filter(p => !p.bodyReviewed && p.reviewedRanges.length).length;
  map.totals.articleDependencyProfiles = Object.keys(k.articles).length;
  return map;
}
async function validate(k, map) {
  assert(map.issues.length === 0, 'Inventory has unresolved structural issues');
  assert(hash(await read(map.manifest.path)) === map.manifest.sha256, 'Manifest drift');
  const files = (await walk('content/source')).filter(p => p.endsWith('.md'));
  assert(files.length === map.pages.length && files.every(p => map.pages.some(a => a.path === p)), 'Source coverage drift');
  for (const p of map.pages) assert(hash(await readFile(resolve(root, sourcePath(p.path)))) === p.sha256, `Source drift ${p.path}`);
  for (const [id, s] of Object.entries(k.sources)) assert(hash(await readFile(resolve(root, s.path))) === s.sha256, `Evidence drift ${id}`);
  for (const s of k.readonlyInputs ?? []) assert(hash(await readFile(resolve(root, s.path))) === s.sha256, `Read-only input drift ${s.path}`);
  async function checkRef(e) {
    const source = k.sources[e.sourceId]; assert(source, `Unknown source reference ${e.sourceId}`);
    const lines = (await read(source.path)).split(/\r?\n/);
    assert(Number.isInteger(e.start) && Number.isInteger(e.end) && e.start >= 1 && e.end >= e.start && e.end <= lines.length, `Invalid reference range ${e.sourceId}`);
  }
  for (const r of k.reviews) await checkRef(r);
  for (const f of k.findings) {
    assert(f.articleIds.every(id => k.articles[id]), `Unknown finding article ${f.id}`);
    for (const e of f.evidence) await checkRef(e);
  }
  const aliases = new Map();
  const active = new Set(), done = new Set();
  function visit(id) { assert(k.concepts[id], `Missing dependency ${id}`); assert(!active.has(id), `Dependency cycle ${id}`); if (done.has(id)) return; active.add(id); k.concepts[id].dependsOn.forEach(visit); active.delete(id); done.add(id); }
  for (const [id, c] of Object.entries(k.concepts)) {
    assert(c.zh && c.en && c.definition && c.scope && c.dependencyRationale && c.evidence.length && c.confidence, `Incomplete concept ${id}`);
    visit(id);
    for (const alias of new Set([c.zh, c.en, ...c.aliases].map(a => a.toLowerCase()))) { assert(!aliases.has(alias) || aliases.get(alias) === id, `Alias conflict ${alias}`); aliases.set(alias, id); }
    for (const e of c.evidence) {
      const source = k.sources[e.sourceId]; assert(source, `Unknown evidence ${id}`);
      const lines = (await read(source.path)).split(/\r?\n/);
      assert(e.start >= 1 && e.end >= e.start && e.end <= lines.length && lines.slice(e.start - 1, e.end).some(s => s.trim()), `Invalid evidence range ${id}`);
      assert(k.reviews.some(r => r.sourceId === e.sourceId && r.start <= e.start && r.end >= e.end), `Unreviewed evidence ${id}`);
    }
  }
  const dimensions = ['忠实度：事实、条件、语气','完整性与结构','中文自然度','零基础可理解性','教学组织','原始示例保真','示例解释与练习边界','术语一致性与可用性','内容清洗与来源边界','页面阅读体验','内容类型适配','辅助内容准确性'];
  assert(JSON.stringify(k.qualityDimensions) === JSON.stringify(dimensions), 'Quality dimensions changed');
  assert(dimensions.every(d => k.gates.some(g => g.dimensions.includes(d))), 'Unassigned quality dimension');
  for (const [id, a] of Object.entries(k.articles)) {
    assert(map.pages.some(p => p.id === id), `Unknown profile ${id}`);
    const t = k.templates[a.kind]; assert(t, `Unknown template ${a.kind}`);
    for (const f of t.required) {
      assert(a[f] !== undefined && a[f] !== null && a[f] !== '', `Missing ${id}:${f}`);
      if (Array.isArray(a[f]) && f !== 'prerequisiteIds') assert(a[f].length > 0, `Empty ${id}:${f}`);
    }
    for (const c of [...a.conceptIds, ...a.prerequisiteIds]) assert(k.concepts[c], `Missing article concept ${c}`);
    assert(k.sources[a.translationSourceId], 'Missing translation reference');
    for (const e of [a.sourceReading, ...a.articleSpecific, ...(a.originalExampleRefs ?? [])]) await checkRef(e);
    const source = k.sources[a.sourceReading.sourceId];
    assert(source.path === map.pages.find(p => p.id === id).path, `Wrong article source ${id}`);
  }
  return { status: 'PASS', semanticApproval: false, counts: { sources: map.pages.length, concepts: Object.keys(k.concepts).length, profiles: Object.keys(k.articles).length, packages: k.packageIds.length }, checks: ['manifest and all local source hashes', 'local markdown/manifest coverage', 'source and concept IDs', 'evidence hashes and reviewed line ranges', 'case-insensitive alias collisions', 'dependency cycles', 'type/template required fields', 'exact 12 dimensions and stage assignment', 'deterministic package regeneration'], limits: ['No full-site semantic review', 'No model or SDK execution', 'No browser acceptance', 'No measured cost advantage'] };
}
const command = process.argv[2];
if (command === 'inventory') await inventory();
else if (['generate', 'check', 'generate-views', 'check-views'].includes(command)) {
  const viewsOnly = command.endsWith('-views');
  const generating = command.startsWith('generate');
  const k = await json(shared + 'knowledge.json');
  const storedMap = await json(shared + 'content-map.json');
  const map = viewsOnly ? storedMap : enrich(structuredClone(storedMap), k);
  if (!viewsOnly && generating) await save(shared + 'content-map.json', map);
  else assert(serial(map) === serial(storedMap), 'Stale semantic coverage overlay');
  const result = viewsOnly ? await json(reports + 'validation.json') : await validate(k, map);
  const packs = await packages(k, map);
  const rows = [];
  for (let i = 0; i < packs.length; i++) {
    const name = i === 0 ? 'workshop' : 'dictionary';
    const path = shared + `task-input-${name}.json`;
    if (generating) await save(path, packs[i]);
    else assert(await read(path) === serial(packs[i]), `Stale or nondeterministic package ${path}`);
    const viewPath = shared + `task-execution-${name}.json`;
    const view = await executionView(packs[i], path, k);
    if (generating) await save(viewPath, view);
    else {
      assert(await read(viewPath) === serial(view), `Stale or nondeterministic execution view ${viewPath}`);
      const referencedFiles = await checkExecution(view, packs[i], k);
      rows.push({ articleId: view.articleId, auditPath: path, executionPath: viewPath, auditSha256: hash(serial(packs[i])), executionSha256: hash(serial(view)), sourceCharacters: view.source.text.length, auditCompactCharacters: JSON.stringify(packs[i]).length, executionCompactCharacters: JSON.stringify(view).length, referencedFiles });
    }
  }
  if (!generating) {
    if (viewsOnly) {
      const baseline = await json(reports + 'view-revision-baseline.json');
      for (const [key, expected] of Object.entries(baseline.unchangedSections)) assert(hash(JSON.stringify(k[key])) === expected, `Out-of-revision asset change ${key}`);
      assert(hash(await read(shared + 'content-map.json')) === baseline.mapSha256, 'Content map changed during view revision');
      for (const [i, pack] of packs.entries()) {
        const b = baseline.auditEvidence[i === 0 ? 'workshop' : 'dictionary'];
        assert(hash(pack.source.text) === b.sourceSha256 && hash(JSON.stringify(pack.evidence)) === b.evidenceSha256, 'Audit evidence changed during view revision');
      }
    }
    result.viewRevision = {
      status: 'PASS', scope: 'execution projection, audit references, affected gates and deterministic generation only; previous full inventory evidence reused',
      characterMetric: 'JSON.stringify(value).length (UTF-16 code units); source uses exact source.text.length; no Token estimate', rows,
      checks: ['exact source text and hash', 'complete concept closure, definitions and scope', 'unchanged type requirements and all finding observations/actions/evidence', 'local-source line references and external unresolved scope excerpt', 'audit JSON Pointers, frozen file hashes and deferred evidence resolution', 'saved audit and execution bytes equal deterministic generation', ...(viewsOnly ? ['prior audit evidence and unrelated knowledge/map sections unchanged'] : [])],
      gateReview: { status: 'producer-reviewed wording; not final content approval', G1: 'intermediate stopping only, never equal-quality release', G2: 'frozen gold-standard quality and same 12 dimensions; naturalness and beginner comprehension require actual quality evidence', limits: 'Gold standard is not factual authority or a universal layout. Reuse unaffected evidence, repair material gaps; no per-dimension models or endless polish.' },
      tokenUsage: null, actualDownstreamUse: 'not tested', fullSiteSemanticAcceptance: false,
    };
    if (viewsOnly) { await save(reports + 'validation.json', result); console.log(serial(result.viewRevision)); }
  }
  if (command === 'check') {
    const rejectedFixtures = [];
    for (const [name, mutate, expected] of [
      ['dependency-cycle', x => { x.concepts.model.dependsOn = ['agent']; }, /Dependency cycle/],
      ['alias-conflict', x => { x.concepts.prompt.aliases.push('Token'); }, /Alias conflict/],
      ['missing-workshop-boundary', x => { delete x.articles[x.packageIds[0]].environmentBoundary; }, /Missing .*environmentBoundary/],
      ['unknown-evidence-source', x => { x.concepts.prompt.evidence[0].sourceId = 'missing'; }, /Unknown evidence/],
      ['source-hash-drift', x => { x.sources['dictionary-source'].sha256 = '0'.repeat(64); }, /Evidence drift/],
    ]) {
      const fixture = structuredClone(k); mutate(fixture);
      let error;
      try { await validate(fixture, map); } catch (e) { error = e; }
      assert(error && expected.test(error.message), `Negative fixture failed: ${name}`);
      rejectedFixtures.push(name);
    }
    result.rejectedInMemoryFixtures = rejectedFixtures;
    await save(reports + 'validation.json', result); console.log(serial(result));
  }
  else if (generating) console.log('Generated two audit packages and two G1 execution views. Run check-views for scoped verification, or check for full foundation verification.');
} else throw Error('Usage: node scripts/knowledge/foundation.mjs inventory|generate|check|generate-views|check-views');
