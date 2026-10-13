import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { articleSections, firstGlossaryMatch, glossaryEntries, prepareArticle, splitGlossary } from '../lib/article-structure.ts';
import { learningGlossary, learningKnowledge, learningProfile } from '../lib/article-learning.ts';
import { articleLink } from '../lib/article-links.ts';
import { assertOriginalBlocks } from './lib/page-content.mjs';

const sha256 = (text) => createHash('sha256').update(text).digest('hex');
const sources = new Map();
for (const [id, source] of Object.entries(learningKnowledge.sources)) {
  const text = await readFile(source.path, 'utf8');
  assert.equal(sha256(text), source.sha256, `Knowledge source changed: ${source.path}`);
  sources.set(id, text);
}
for (const [id, concept] of Object.entries(learningKnowledge.concepts)) {
  assert.ok(concept.term && concept.definition && concept.aliases.length && concept.evidence.length, `Incomplete concept: ${id}`);
  for (const evidence of concept.evidence) {
    assert.ok(sources.has(evidence.sourceId), `Unknown evidence: ${evidence.sourceId}`);
    const lineCount = sources.get(evidence.sourceId).split('\n').length;
    assert.ok(evidence.lines.split(/[-,]/).every((line) => Number(line) > 0 && Number(line) <= lineCount), `Invalid evidence lines: ${id}`);
  }
}
function checkDependencies(id, path = []) {
  assert.ok(learningKnowledge.concepts[id], `Unknown prerequisite: ${id}`);
  assert.ok(!path.includes(id), `Prerequisite cycle: ${[...path, id].join(' -> ')}`);
  for (const dependency of learningKnowledge.concepts[id].dependsOn) checkDependencies(dependency, [...path, id]);
}
Object.keys(learningKnowledge.concepts).forEach((id) => checkDependencies(id));

// Regression cases: formatting variations, code containing headings, and aliases.
assert.equal(glossaryEntries('## 中文学习辅助：术语小词典\n\n- **LLM**：模型\n- schema: 结构规则').length, 2);
assert.throws(() => glossaryEntries('- missing definition'), /缺少/);
const fixture = '```md\n## Not a heading\n## 中文学习辅助：术语小词典\n```\n\n#### Same\n## Same\n## [Step](#stable-step)';
assert.equal(splitGlossary(fixture).articleMarkdown, fixture);
assert.deepEqual(articleSections(fixture).map((item) => item.id), ['same-2', 'stable-step']);
const entry = { id: 'term-stream', term: '流式输出（stream）', aliases: ['stream', '流式输出'], definition: '逐步显示' };
assert.equal(firstGlossaryMatch('upstream', [entry], new Set()), undefined);
assert.equal(firstGlossaryMatch('使用STREAM输出', [entry], new Set()).text, 'STREAM');
assert.equal(firstGlossaryMatch('流式输出到终端', [entry], new Set()).text, '流式输出');
assert.equal(firstGlossaryMatch('stream', [entry], new Set(['term-stream'])), undefined);
const promptTerms = [{id:'system',term:'系统提示词',definition:'基础规则'}, {id:'prompt',term:'提示词',definition:'任务说明'}];
assert.equal(firstGlossaryMatch('系统提示词', promptTerms, new Set(['system'])), undefined);
assert.equal(firstGlossaryMatch('系统提示词与提示词', promptTerms, new Set(['system'])).index, 6);
const localRoutes = new Set(['/', '/ai-coding-dictionary/system-prompt']);
assert.equal(articleLink('/ai-coding-dictionary/harness', localRoutes).href, 'https://www.aihero.dev/ai-coding-dictionary/harness');
assert.equal(articleLink('/ai-coding-dictionary/harness', localRoutes).untranslated, true);
assert.equal(articleLink('https://www.aihero.dev/ai-coding-dictionary/system-prompt', localRoutes).href, 'https://www.aihero.dev/ai-coding-dictionary/system-prompt');
assert.equal(articleLink('/', localRoutes).href, '/');
assert.equal(articleLink('#steps-to-complete', localRoutes).href, '#steps-to-complete');
assert.equal(articleLink('https://ai-sdk.dev/docs/introduction', localRoutes).untranslated, false);
assert.equal(prepareArticle('```md\n# Title\n```', 'Title').markdown, '```md\n# Title\n```');
assert.deepEqual(prepareArticle('### 视频文字稿\n\n确有文字稿。', 'Title').emptySections, []);

const index = JSON.parse(await readFile('content/zh/index.json', 'utf8'));
const manifest = JSON.parse(await readFile('content/zh/manifest.json', 'utf8'));
const body = (markdown) => markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
const normalize = (text) => text.replaceAll('\r\n', '\n').trim();
const reports = [];
for (const [route, profile] of Object.entries(learningKnowledge.pages)) {
  assert.equal(learningProfile(route), profile);
  const page = index.pages[route];
  assert.ok(page, `Missing indexed page: ${route}`);
  const template = learningKnowledge.templates[profile.kind];
  assert.ok(template, `Unknown template: ${profile.kind}`);
  for (const field of template.required) assert.ok(profile[field], `Missing ${field}: ${route}`);
  assert.ok(profile.start.cards.length && profile.related.length, `Incomplete learning entry: ${route}`);
  for (const id of profile.sourceIds) assert.ok(sources.has(id), `Unknown source: ${id}`);
  for (const id of profile.prerequisiteIds) assert.ok(profile.conceptIds.includes(id), `Prerequisite unavailable in glossary: ${id}`);
  const sourceId = profile.sourceIds.find((id) => id.endsWith('-source'));
  const translationPath = manifest.pages.find((page) => page.route === route)?.translationPath;
  const translationId = profile.sourceIds.find((id) => learningKnowledge.sources[id].path === translationPath)
    ?? profile.sourceIds.find((id) => id.endsWith('-translation'));
  assert.ok(translationId, `Translation source missing: ${route}`);
  const source = sources.get(sourceId);
  const translation = sources.get(translationId);
  assert.equal(normalize(page.markdown), normalize(body(translation)), `Indexed translation differs: ${route}`);
  const expectedType = profile.kind === 'guide' ? 'post' : profile.kind;
  assert.ok(source.includes(`type: "${expectedType}"`), `Content type mismatch: ${route}`);
  const split = splitGlossary(page.markdown);
  const parsed = glossaryEntries(split.glossaryMarkdown);
  const glossary = learningGlossary(profile, parsed);
  if (profile.glossary) {
    for (const id of profile.conceptIds) assert.ok(glossary.some(g => g.id === `term-${id}`), `Missing page concept: ${id}`);
    for (const entry of glossary) assert.ok(entry.term && entry.definition && entry.aliases.length, `Incomplete page term: ${entry.id}`);
  }
  const article = prepareArticle(split.articleMarkdown, page.title);
  assertOriginalBlocks(source, article.markdown);
  assert.equal(new Set(glossary.map((item) => item.id)).size, glossary.length, `Duplicate glossary IDs: ${route}`);
  for (const link of profile.related) {
    if (link.href.startsWith('/')) assert.ok(index.pages[link.href], `Unavailable local related page: ${link.href}`);
  }
  for (const example of profile.originalExamples ?? []) assert.ok(sources.get(example.sourceId).includes(example.text), `Original example not found: ${route}`);
  if (profile.kind === 'workshop-lesson') {
    assert.equal(parsed.length, 9);
    assert.ok(!article.markdown.startsWith('# '));
    assert.deepEqual(article.emptySections, ['视频文字稿']);
    assert.ok(article.markdown.includes('const factsResult = TODO;'), 'Exercise answer leaked or placeholder removed');
  }
  if (profile.kind === 'dictionary') assert.equal(profile.originalExamples.length, 2);
  reports.push({ route, kind: profile.kind, parsedTerms: parsed.length, usableTerms: glossary.length, bodySections: articleSections(article.markdown).length, disclosedEmptySections: article.emptySections });
}
console.log(JSON.stringify({ passed: true, sourceFiles: sources.size, sharedConcepts: Object.keys(learningKnowledge.concepts).length, pages: reports }, null, 2));
