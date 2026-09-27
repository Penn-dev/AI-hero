import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '../..');
const read = path => readFile(resolve(root, path));
const json = async path => JSON.parse(await read(path));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const assert = (ok, message) => { if (!ok) throw new Error(message); };

export async function validateLearningMap(outline) {
  const bytes = new Map();
  async function verifyFile(ref) {
    assert(typeof ref.path === 'string' && ref.path.startsWith('content/') && !ref.path.includes('..') && !ref.path.includes('\\'), `Unsafe path: ${ref.path}`);
    if (!bytes.has(ref.path)) bytes.set(ref.path, await read(ref.path));
    assert(hash(bytes.get(ref.path)) === ref.sha256, `Changed source: ${ref.path}`);
    return bytes.get(ref.path).toString('utf8');
  }
  await verifyFile(outline.base.map);
  await verifyFile(outline.base.knowledge);
  const map = await json(outline.base.map.path);
  const knowledge = await json(outline.base.knowledge.path);
  const pages = new Map(map.pages.map(p => [p.id, p]));
  const seen = new Set();
  for (const article of outline.articles) {
    assert(pages.has(article.id) && !seen.has(article.id), `Unknown or duplicate article: ${article.id}`);
    seen.add(article.id);
    assert(outline.topics[article.topic] && outline.kinds[article.kind], `Missing classification: ${article.id}`);
    assert(['lookup', 'optional', 'orientation', 'branch', 'core-candidate'].includes(article.learningRole), `Invalid role: ${article.id}`);
    assert(article.classificationStatus === 'coarse-editorial-reviewed' && article.productionStatus === 'not-cleared', `Classification promoted to production: ${article.id}`);
    assert(article.classificationBasis.inventoryId === article.id, `Wrong inventory reference: ${article.id}`);
    assert(article.deferredChecks.length || knowledge.articles[article.id], `Untracked article gap: ${article.id}`);
    await verifyFile(pages.get(article.id));
  }
  assert(seen.size === pages.size, 'Incomplete article coverage');
  const concepts = { ...knowledge.concepts, ...outline.concepts };
  assert(Object.keys(outline.concepts).every(id => !knowledge.concepts[id]), 'Supplement silently overrides base concept');
  const visiting = new Set(), done = new Set();
  function visit(id) {
    assert(concepts[id], `Missing concept: ${id}`);
    assert(!visiting.has(id), `Cyclic concept: ${id}`);
    if (done.has(id)) return;
    visiting.add(id);
    concepts[id].dependsOn.forEach(visit);
    visiting.delete(id);
    done.add(id);
  }
  Object.keys(concepts).forEach(visit);
  async function evidence(ref) {
    const page = pages.get(ref.articleId);
    assert(page && page.path === ref.path && page.sha256 === ref.sha256, `Wrong evidence source: ${ref.articleId}`);
    const lines = (await verifyFile(ref)).split(/\r?\n/);
    assert(Number.isInteger(ref.start) && Number.isInteger(ref.end) && ref.start >= 1 && ref.end >= ref.start && ref.end <= lines.length, `Invalid evidence range: ${ref.path}`);
    assert(outline.reads.some(r => r.articleId === ref.articleId && r.start <= ref.start && r.end >= ref.end), `Evidence outside recorded reading: ${ref.path}:${ref.start}`);
  }
  for (const r of outline.reads) await evidence(r);
  for (const c of Object.values(outline.concepts)) {
    assert(c.definition && c.scope && c.dependencyRationale && c.evidence.length, 'Incomplete definition');
    for (const r of c.evidence) await evidence(r);
  }
  for (const boundary of outline.boundaries) {
    boundary.conceptIds.forEach(visit);
    boundary.articleIds.forEach(id => assert(pages.has(id), `Unknown boundary article: ${id}`));
    for (const r of boundary.evidence) await evidence(r);
  }
  for (const topic of Object.values(outline.topics)) topic.coreConceptIds.forEach(visit);
  const stages = new Map();
  for (const stage of outline.learningPath.stages) {
    assert(!stages.has(stage.id), `Duplicate stage: ${stage.id}`);
    const available = new Set();
    for (const prior of stage.after) {
      assert(stages.has(prior), `Forward or missing learning stage: ${prior}`);
      stages.get(prior).forEach(id => available.add(id));
    }
    for (const id of stage.conceptIds) {
      visit(id);
      for (const dep of concepts[id].dependsOn) assert(available.has(dep), `Unintroduced prerequisite: ${stage.id}/${id}/${dep}`);
      available.add(id);
    }
    stage.articleIds.forEach(id => assert(pages.has(id), `Unknown reading: ${id}`));
    stages.set(stage.id, available);
  }
  const batchIds = new Set();
  for (const batch of outline.firstBatch) {
    assert(!batchIds.has(batch.articleId), `Duplicate batch article: ${batch.articleId}`);
    batchIds.add(batch.articleId);
    const profile = knowledge.articles[batch.articleId];
    assert(profile && ['PARTIAL', 'HOLD'].includes(batch.status) && batch.blockers.length, `Unjustified batch clearance: ${batch.articleId}`);
    assert(batch.profileRef === '/articles/' + batch.articleId.replaceAll('~', '~0').replaceAll('/', '~1'), 'Wrong profile pointer');
    [...profile.conceptIds, ...profile.prerequisiteIds, ...batch.supplementalConceptIds].forEach(visit);
    const expected = knowledge.findings.filter(f => f.articleIds.includes(batch.articleId)).map(f => f.id).sort();
    assert(JSON.stringify([...batch.baseFindingIds].sort()) === JSON.stringify(expected), `Lost unresolved finding: ${batch.articleId}`);
    if (expected.includes('F-version')) assert(batch.status === 'HOLD', 'Version blocker lost HOLD');
    if (batch.executionView) await verifyFile(batch.executionView);
  }
  assert(Object.keys(knowledge.articles).every(id => batchIds.has(id)), 'Missing existing sample');
  return { status: 'PASS-mechanical-only', articles: seen.size, originalUnclassifiedLocated: outline.articles.filter(a => pages.get(a.id).kind === 'article-unclassified').length, baseConcepts: Object.keys(knowledge.concepts).length, addedConcepts: Object.keys(outline.concepts).length, stages: stages.size, firstBatch: outline.firstBatch.map(b => ({ id: b.articleId, status: b.status })), checkedFiles: bytes.size, semanticAcceptance: 'producer-scoped; not independent or beginner acceptance' };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  console.log(JSON.stringify(await validateLearningMap(await json('content/learning/shared/learning-map.json')), null, 2));
}
