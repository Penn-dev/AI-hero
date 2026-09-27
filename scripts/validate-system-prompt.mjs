import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { learningKnowledge, learningGlossary, learningProfile } from '../lib/article-learning.ts';
import { firstGlossaryMatch } from '../lib/article-structure.ts';

const json = async p => JSON.parse(await readFile(p, 'utf8'));
const hash = data => createHash('sha256').update(data).digest('hex');
const input = await json('content/learning/system-prompt/input.json');
const profile = learningProfile(input.articleId);
assert.ok(profile?.glossary);
assert.equal(hash(await readFile(input.source.path)), input.source.sha256);
assert.equal(input.source.text, await readFile(input.source.path, 'utf8'));
assert.equal(hash(await readFile('content/learning/shared/knowledge.json')), input.assembly.knowledgeSha256);
assert.equal(hash(await readFile('content/learning/shared/learning-map.json')), input.assembly.learningMapSha256);
const glossary = learningGlossary(profile, []);
for (const [id, concept] of Object.entries(input.concepts)) {
  const term = glossary.find(g => g.id === `term-${id}`);
  assert.ok(term, `Missing assembled definition: ${id}`);
  assert.equal(term.definition, concept.definition);
  assert.deepEqual(term.aliases, concept.aliases);
  for (const alias of [concept.zh, concept.en]) assert.equal(firstGlossaryMatch(alias, glossary, new Set())?.entry.id, term.id, `Alias unavailable: ${alias}`);
  for (const ref of concept.evidence) {
    const source = ref.sourceId ? input.sourceRegistry[ref.sourceId] : ref;
    assert.ok(source, `Missing source: ${ref.sourceId}`);
    const bytes = await readFile(source.path);
    assert.equal(hash(bytes), source.sha256, `Changed concept source: ${source.path}`);
    assert.ok(ref.start > 0 && ref.end >= ref.start && ref.end <= bytes.toString('utf8').split(/\r?\n/).length);
  }
}
function dependency(id, ancestors = []) {
  assert.ok(input.concepts[id], `Missing dependency: ${id}`);
  assert.ok(!ancestors.includes(id), `Dependency cycle: ${id}`);
  input.concepts[id].dependsOn.forEach(dep => dependency(dep, [...ancestors, id]));
}
Object.keys(input.concepts).forEach(id => dependency(id));
const translation = await readFile(learningKnowledge.sources['dictionary-revised-translation'].path, 'utf8');
if (profile.originalExamplesInline) {
  let previous = -1;
  for (const example of profile.originalExamples) {
    const offset = translation.indexOf(example.text);
    assert.ok(offset > previous && offset < translation.indexOf('## 中文学习辅助：避免三个误解'), 'Example separated from its translation');
    assert.equal(translation.split(example.text).length, 2, 'Example duplicated or missing');
    previous = offset;
  }
}
const links = text => new Set([...text.matchAll(/\]\((\/ai-coding-dictionary\/[^)]+)\)/g)].map(m => m[1]));
for (const link of links(input.source.text)) {
  assert.ok(links(translation).has(link), `Lost original concept link: ${link}`);
  assert.ok(glossary.some(term => term.id === `term-${link.split('/').pop()}`), `Source concept has no local explanation: ${link}`);
}
for (const item of profile.check.questions ?? []) assert.ok(item.question.trim() && item.answer.trim(), 'Incomplete question/answer');
for (const example of profile.originalExamples) assert.ok(input.source.text.includes(example.text), 'Original example changed');
const manifest = await json('content/zh/manifest.json');
const record = manifest.pages.find(p => p.route === input.articleId);
assert.equal(record.translationPath, learningKnowledge.sources['dictionary-revised-translation'].path);
assert.equal(record.translationHash, hash(Buffer.from(translation)));
console.log(JSON.stringify({ passed: true, assembledConcepts: glossary.length, preservedSourceLinks: links(input.source.text).size, originalExamples: profile.originalExamples.length, checks: ['source and concept evidence hashes', 'dependency closure', 'Chinese and English aliases', 'rendered glossary matches input', 'translation manifest'], semanticAcceptance: 'not established by this script' }, null, 2));
