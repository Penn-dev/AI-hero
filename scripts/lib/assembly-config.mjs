import assert from 'node:assert/strict';
import { relative, resolve, sep } from 'node:path';

export const nonempty = value => typeof value === 'string' && Boolean(value.trim());
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const strings = value => Array.isArray(value) && value.every(nonempty);
export function validRoute(route) {
  return typeof route === 'string' && (route === '/' || /^\/[\w~-]+(?:\/[\w~-]+)*$/.test(route));
}
export function within(root, path) {
  const rel = relative(resolve(root), resolve(path));
  return rel !== '' && rel !== '..' && !rel.startsWith(`..${sep}`) && !resolve(path).startsWith(`${sep}${sep}`) && !rel.includes(':');
}
export function validateConfig(config, mode) {
  assert.ok(['preview', 'apply'].includes(mode), 'Usage: assemble-page.mjs <preview|apply> <config.json>');
  assert.ok(object(config), 'Invalid config');
  const allowed = ['route', 'source', 'chineseFile', 'translationPath', 'learning', 'linkTargets'];
  for (const key of Object.keys(config)) assert.ok(allowed.includes(key), `Unknown config field: ${key}`);
  assert.ok(validRoute(config.route), 'Invalid route');
  assert.ok(object(config.source) && nonempty(config.source.path) && /^[a-f\d]{64}$/.test(config.source.sha256), 'Invalid source config');
  assert.ok(nonempty(config.chineseFile), 'Invalid Chinese file');
  if (config.translationPath !== undefined) assert.ok(nonempty(config.translationPath), 'Unsafe translation path');
}

export function validateLearning(profile, knowledge) {
  const ok = (condition, field) => assert.ok(condition, `Invalid learning ${field}`);
  ok(object(profile) && ['guide', 'workshop-lesson', 'dictionary'].includes(profile.kind), 'kind');
  for (const key of ['sourceIds', 'conceptIds', 'prerequisiteIds']) ok(strings(profile[key]), key);
  ok(object(profile.start) && nonempty(profile.start.title) && Array.isArray(profile.start.cards), 'start');
  for (const card of profile.start.cards) ok(object(card) && nonempty(card.title) && nonempty(card.text), 'card');
  if (profile.start.summary !== undefined) ok(nonempty(profile.start.summary), 'summary');
  if (profile.start.example !== undefined) ok(nonempty(profile.start.example?.text) && nonempty(profile.start.example?.explanation), 'example');
  if (profile.bodyTitle !== undefined) ok(nonempty(profile.bodyTitle), 'bodyTitle');
  ok(Array.isArray(profile.related), 'related');
  for (const link of profile.related) ok(['title', 'description', 'href', 'format'].every(key => nonempty(link?.[key])), 'related link');
  if (profile.check !== undefined) {
    ok(nonempty(profile.check?.title) && strings(profile.check?.items), 'check');
    if (profile.check.questions !== undefined) ok(Array.isArray(profile.check.questions) && profile.check.questions.every(item => nonempty(item.question) && nonempty(item.answer)), 'questions');
  }
  if (profile.originalExamplesInline !== undefined) ok(typeof profile.originalExamplesInline === 'boolean', 'originalExamplesInline');
  if (profile.originalExamples !== undefined) ok(Array.isArray(profile.originalExamples) && profile.originalExamples.every(item => nonempty(item.sourceId) && nonempty(item.text)), 'originalExamples');
  if (profile.glossary !== undefined) {
    ok(Array.isArray(profile.glossary) && profile.glossary.every(item => nonempty(item.id) && nonempty(item.term) && nonempty(item.definition) && (item.aliases === undefined || strings(item.aliases))), 'glossary');
    ok(new Set(profile.glossary.map(item => item.id)).size === profile.glossary.length, 'duplicate glossary IDs');
  }
  for (const id of profile.conceptIds) {
    if (profile.glossary) ok(profile.glossary.some(item => item.id === `term-${id}`), `glossary concept: ${id}`);
    else ok(nonempty(knowledge.concepts[id]?.term) && nonempty(knowledge.concepts[id]?.definition) && strings(knowledge.concepts[id]?.aliases), `concept: ${id}`);
  }
  for (const id of profile.prerequisiteIds) ok(profile.conceptIds.includes(id), `prerequisite: ${id}`);
  for (const id of profile.sourceIds) ok(object(knowledge.sources[id]), `source: ${id}`);
}
