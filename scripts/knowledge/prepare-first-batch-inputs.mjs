import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const articleId = '/a-complete-guide-to-agents-md';
const knowledgePath = 'content/learning/shared/knowledge.json';
const learningMapPath = 'content/learning/shared/learning-map.json';
const outputPath = 'content/learning/agents-md/input.json';

const readBytes = path => readFile(resolve(root, path));
const readText = async path => (await readBytes(path)).toString('utf8');
const readJson = async path => JSON.parse(await readText(path));
const sha256 = value => createHash('sha256').update(value).digest('hex');
const serialize = value => `${JSON.stringify(value, null, 2)}\n`;
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

async function checkedAsset(path, expectedHash) {
  const bytes = await readBytes(path);
  const actualHash = sha256(bytes);
  assert(actualHash === expectedHash, `Hash drift: ${path}; expected ${expectedHash}; got ${actualHash}`);
  return { path, sha256: actualHash };
}

function uniqueBy(values, keyOf) {
  return [...new Map(values.map(value => [keyOf(value), value])).values()];
}

async function validateRange(location) {
  if (location.sha256) await checkedAsset(location.path, location.sha256);
  const lines = (await readText(location.path)).split(/\r?\n/);
  assert(location.start >= 1 && location.end >= location.start && location.end <= lines.length,
    `Invalid line range: ${location.path}:${location.start}-${location.end}`);
  assert(lines.slice(location.start - 1, location.end).some(line => line.trim()),
    `Empty evidence range: ${location.path}:${location.start}-${location.end}`);
}

async function assemble() {
  const [knowledgeBytes, learningMapBytes, knowledge, learningMap] = await Promise.all([
    readBytes(knowledgePath),
    readBytes(learningMapPath),
    readJson(knowledgePath),
    readJson(learningMapPath),
  ]);

  const profile = knowledge.articles[articleId];
  const mapArticle = learningMap.articles.find(article => article.id === articleId);
  const firstBatch = learningMap.firstBatch.find(article => article.articleId === articleId);
  assert(profile, `Missing profile: ${articleId}`);
  assert(mapArticle, `Missing learning-map article: ${articleId}`);
  assert(firstBatch, `Missing first-batch record: ${articleId}`);

  const source = knowledge.sources[profile.sourceReading.sourceId];
  const referenceTranslation = knowledge.sources[profile.translationSourceId];
  assert(source && referenceTranslation, 'Missing source or reference translation');
  await Promise.all([
    checkedAsset(source.path, source.sha256),
    checkedAsset(referenceTranslation.path, referenceTranslation.sha256),
  ]);

  // The historical firstBatch record listed tool-call and tool-result. The article does
  // not teach the tool protocol, so they are not production prerequisites. Context is
  // used throughout, while system-prompt is needed to scope the explicit claim at line 20.
  const articleRequiredConceptIds = ['system-prompt', 'context'];
  const conceptPool = { ...knowledge.concepts, ...learningMap.concepts };
  assert(Object.keys(knowledge.concepts).length === 29, 'Expected 29 base concepts');
  assert(Object.keys(learningMap.concepts).length === 10, 'Expected 10 supplemental concepts');
  assert(Object.keys(conceptPool).length === 39, 'Expected 39 unique shared concepts');
  const conceptIds = [];
  const visited = new Set();
  function addConcept(id) {
    assert(conceptPool[id], `Unknown concept: ${id}`);
    if (visited.has(id)) return;
    visited.add(id);
    for (const dependency of conceptPool[id].dependsOn) addConcept(dependency);
    conceptIds.push(id);
  }
  for (const id of [...profile.conceptIds, ...profile.prerequisiteIds, ...articleRequiredConceptIds]) addConcept(id);
  const concepts = Object.fromEntries(conceptIds.map(id => [id, conceptPool[id]]));

  const unresolved = knowledge.findings.filter(finding => finding.articleIds.includes(articleId));
  const applicableBoundaryIds = new Set(['agent-scope', 'context-scope']);
  const applicableBoundaries = learningMap.boundaries.filter(boundary => applicableBoundaryIds.has(boundary.id));
  assert(applicableBoundaries.length === applicableBoundaryIds.size, 'Missing an applicable guide boundary');

  const sourceRegistryIds = new Set();
  const directLocations = [];
  function collectEvidence(evidence) {
    for (const item of evidence ?? []) {
      if (item.sourceId) sourceRegistryIds.add(item.sourceId);
      else if (item.path) directLocations.push(item);
    }
  }
  for (const concept of Object.values(concepts)) collectEvidence(concept.evidence);
  collectEvidence([profile.sourceReading, ...profile.articleSpecific]);
  for (const finding of unresolved) collectEvidence(finding.evidence);
  for (const boundary of applicableBoundaries) collectEvidence(boundary.evidence);
  sourceRegistryIds.add(profile.translationSourceId);

  const sourceRegistry = {};
  for (const sourceId of [...sourceRegistryIds].sort()) {
    const entry = knowledge.sources[sourceId];
    assert(entry, `Unknown source registry ID: ${sourceId}`);
    await checkedAsset(entry.path, entry.sha256);
    sourceRegistry[sourceId] = entry;
  }

  const sourceLocations = [];
  function normalizeEvidence(evidence) {
    for (const item of evidence ?? []) {
      if (item.sourceId) {
        const entry = knowledge.sources[item.sourceId];
        sourceLocations.push({ sourceId: item.sourceId, path: entry.path, sha256: entry.sha256, start: item.start, end: item.end });
      } else if (item.path) {
        sourceLocations.push(item);
      }
    }
  }
  for (const concept of Object.values(concepts)) normalizeEvidence(concept.evidence);
  normalizeEvidence([profile.sourceReading, ...profile.articleSpecific]);
  for (const finding of unresolved) normalizeEvidence(finding.evidence);
  for (const boundary of applicableBoundaries) normalizeEvidence(boundary.evidence);
  const evidenceLocations = uniqueBy([...sourceLocations, ...directLocations],
    item => `${item.path}:${item.start}-${item.end}`);
  await Promise.all(evidenceLocations.map(validateRange));

  const sourceText = await readText(source.path);
  const sourceLines = sourceText.split(/\r?\n/);
  const exampleSpecs = [
    ['claude-md-symlink', 'shell', 34, 37],
    ['project-one-liner', 'markdown', 98, 100],
    ['package-manager', 'markdown', 108, 110],
    ['typescript-rules-before', 'markdown', 129, 135],
    ['typescript-pointer-after', 'markdown', 139, 140],
    ['nested-documentation-tree', 'text', 155, 163],
    ['monorepo-root-agents-md', 'markdown', 195, 199],
    ['package-level-agents-md', 'markdown', 203, 206],
    ['refactor-prompt', 'prompt', 214, 238],
  ];
  const originalExamples = exampleSpecs.map(([id, kind, start, end]) => ({
    id,
    kind,
    source: { path: source.path, sha256: source.sha256, start, end },
    text: sourceLines.slice(start - 1, end).join('\n'),
  }));
  assert(originalExamples.every(example => example.text.trim()), 'An original example is empty');

  const displayConventionPath = 'content/learning/shared/display-conventions.md';
  const governancePath = 'reports/knowledge-foundation/astra-exit-plan.md';
  const displayConvention = { path: displayConventionPath, sha256: sha256(await readBytes(displayConventionPath)) };
  const governance = { path: governancePath, sha256: sha256(await readBytes(governancePath)) };

  const input = {
    version: 1,
    articleId,
    readiness: {
      gate: 'G0',
      status: 'PASS',
      meaning: 'Input is ready for bounded article production or review. This does not approve the translation, learning aids, rendered page, or publication.',
    },
    source: { path: source.path, sha256: source.sha256, text: sourceText },
    referenceTranslation,
    profile,
    conceptSelection: {
      profileConceptIds: profile.conceptIds,
      profilePrerequisiteIds: profile.prerequisiteIds,
      articleRequiredConceptIds,
      resolvedDependencyClosure: conceptIds,
      historicalSupplementalNotSelected: [
        {
          conceptId: 'tool-call',
          reason: 'The source mentions skills and commands but does not teach the request/execution/result protocol; this concept is not needed to understand the article.',
        },
        {
          conceptId: 'tool-result',
          reason: 'The source does not explain tool-result handling; including it would turn a historical coarse hint into an unnecessary prerequisite.',
        },
      ],
    },
    concepts,
    originalExamples,
    evidenceLocations,
    sourceRegistry,
    currentRules: {
      template: knowledge.templates[profile.kind],
      gates: knowledge.gates,
      qualityDimensions: knowledge.qualityDimensions,
      productionRules: knowledge.productionRules,
      outputContract: knowledge.outputContract,
      displayConvention,
      governance,
      chineseLinkRule: 'Only existing Chinese pages may be linked for readers. Keep local explanations for worthwhile untranslated targets; do not default to English or 404 targets.',
    },
    applicableBoundaries,
    unresolved,
    inheritedBlockers: [
      'The reference translation line 20 adds an absolute "highest priority" explanation that the source does not establish. Production must keep this as a review item and must not reuse it as a shared fact.',
      'Claims about file loading position, tool support, automatic per-request loading, skill invocation, and nested AGENTS.md merging remain author/tool-scope claims. Do not turn them into universal product guarantees without implementation-specific evidence.',
      'The reference translation contains later-added learning aids outside the earlier Sol editing scope. Review the translation and every aid actually assembled for this production version together.',
      'Final page quality, beginner comprehension, links, and desktop/narrow-screen behavior remain G2 work; G0 readiness does not establish them.',
    ],
    governanceDecisions: [
      {
        id: 'guide-system-priority',
        status: 'decided; production-application-pending',
        decision: '下一轮指南编校应移除旧译文第20行新增的“最高优先级”绝对化解释；如需解释系统提示词，采用输入中的共享定义并标为中文学习辅助。原文第20行的位置描述与新增的优先级解释分开处理，不改写英文来源。',
        evidence: { source: { path: source.path, line: 20 }, referenceTranslation: { path: referenceTranslation.path, line: 20 } },
      },
      {
        id: 'guide-tool-scope',
        status: 'decided; production-application-pending',
        decision: '本轮指南按原作者语境忠实编校，并在相关段落附近明确工具和版本范围。加载顺序、每次请求加载、子目录合并、工具支持列表及符号链接命令不作为所有产品或Windows环境的通用保证。只有将某条内容变成目标工具的当前操作指导时，才定点核验其官方实现依据；不能用一句范围说明掩盖已知错误。',
      },
    ],
    scopedSourceClaims: [
      { start: 18, end: 39, reason: 'AGENTS.md loading order, tool support, CLAUDE.md behavior, and symlink advice are tool/platform scoped.' },
      { start: 54, end: 68, reason: 'The 150-200 instruction figure is an attributed estimate and is not a quality gate or budget.' },
      { start: 70, end: 80, reason: 'Context poisoning and filesystem guidance are author recommendations, not universal runtime guarantees.' },
      { start: 119, end: 171, reason: 'Progressive disclosure and skill behavior are teaching recommendations whose concrete loading behavior depends on the tool.' },
      { start: 180, end: 208, reason: 'Subdirectory merging is implementation specific and must remain in the author/tool scope.' },
    ].map(item => ({ ...item, source: { path: source.path, sha256: source.sha256 } })),
    contentCleaningCandidates: [
      { start: 174, end: 178, kind: 'promotional-cta', action: 'Producer must record whether it is removed; removal must not erase adjacent learning content.' },
      { start: 241, end: 244, kind: 'newsletter-cta', action: 'Producer must record whether it is removed; removal must not erase adjacent learning content.' },
    ].map(item => ({ ...item, source: { path: source.path, sha256: source.sha256 } })),
    assembly: {
      date: '2026-09-24',
      knowledgeSha256: sha256(knowledgeBytes),
      learningMapSha256: sha256(learningMapBytes),
      mapArticle,
      historicalFirstBatch: firstBatch,
      decision: 'Use the current 39-concept pool but include only the article-specific dependency closure. Add system-prompt and context; do not carry historical tool-call/tool-result hints into this guide input.',
    },
  };

  return input;
}

const command = process.argv[2];
assert(['write', 'check'].includes(command), 'Usage: node scripts/knowledge/prepare-first-batch-inputs.mjs write|check');
const input = await assemble();
const serialized = serialize(input);
if (command === 'write') {
  await mkdir(dirname(resolve(root, outputPath)), { recursive: true });
  await writeFile(resolve(root, outputPath), serialized, 'utf8');
  console.log(`Wrote ${outputPath}: ${Object.keys(input.concepts).length} concepts, ${input.originalExamples.length} original examples.`);
} else {
  const stored = await readText(outputPath);
  assert(stored === serialized, `Stale or nondeterministic input: ${outputPath}`);
  console.log(`PASS ${outputPath}: source/hash, 39-concept lookup, 17-concept dependency closure, evidence ranges, original examples, rules, and unresolved items.`);
}
