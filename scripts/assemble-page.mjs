import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { localRoute, nodes, sha256, updateIndexedPage, validateArticle } from './lib/page-content.mjs';
import { nonempty, validRoute, validateConfig, validateLearning, within } from './lib/assembly-config.mjs';
import { readOptional, recoverAssembly, safeOutputPath, safePath, writeAssembly } from './lib/assembly-files.mjs';
import { indexedTranslationErrors } from './validate-content.mjs';

export { recoverAssembly };

export async function assemblePage({ root = process.cwd(), config, mode = 'preview', fs }) {
  validateConfig(config, mode);
  config = structuredClone(config);
  assert.equal(await readOptional(await safeOutputPath(root, 'content/zh/.assembly-journal.json')), null, 'Pending assembly; run assemble-page.mjs recover first');
  const inputs = new Map();
  const read = async path => {
    const absolute = await safePath(root, path);
    const bytes = await readFile(absolute);
    inputs.set(absolute, sha256(bytes));
    return bytes.toString('utf8');
  };
  const json = async path => JSON.parse(await read(path));
  const [text, index, manifest, sources] = await Promise.all([
    read(config.chineseFile), json('content/zh/index.json'), json('content/zh/manifest.json'), json('content/source/manifest.json'),
  ]);
  assert.ok(config.linkTargets === undefined || Array.isArray(config.linkTargets), 'Invalid linkTargets');
  for (const target of config.linkTargets ?? []) {
    assert.ok(validRoute(target.route) && ['available-chinese', 'planned-chinese'].includes(target.state), 'Invalid link target');
    if (target.state === 'planned-chinese') assert.ok(nonempty(target.reason), 'Planned Chinese target needs a reason');
  }
  assert.equal(new Set((config.linkTargets ?? []).map(target => target.route)).size, (config.linkTargets ?? []).length, 'Duplicate link target');
  const plannedChineseTargets = (config.linkTargets ?? []).filter(target => target.state === 'planned-chinese');
  const source = sources.pages.find(page => page.route === config.route);
  assert.equal(sources.pages.filter(page => page.route === config.route).length, 1, 'Duplicate or missing source route');
  assert.ok(new Set(manifest.pages.map(page => page.route)).size === manifest.pages.length, 'Duplicate translation manifest route');
  assert.ok(source?.status === 'downloaded', 'Source route is not downloaded');
  assert.equal(resolve(root, config.source.path), resolve(root, source.sourcePath), 'Source path does not match route');
  assert.equal(resolve(root, source.sourcePath), resolve(root, config.route === '/' ? 'content/source/index.md' : `content/source${config.route}.md`), 'Source path does not match route');
  const sourceText = await read(config.source.path);
  assert.equal(sha256(sourceText), config.source.sha256, 'Source hash mismatch: supplied hash');
  assert.equal(sha256(sourceText), source.sourceHash, 'Source hash mismatch: manifest hash');
  const { article, tree } = validateArticle(sourceText, text);
  const previousRecord = manifest.pages.find(page => page.route === config.route);
  const requestedPath = config.translationPath ?? previousRecord?.translationPath ?? (config.route === '/' ? 'content/zh/home.md' : `content/zh${config.route}.md`);
  const translationPath = relative(resolve(root), resolve(root, requestedPath)).replaceAll('\\', '/');
  assert.ok(['content/zh', 'content/learning'].some(path => within(resolve(root, path), resolve(root, translationPath))) && translationPath.endsWith('.md'), 'Unsafe translation path');
  await safeOutputPath(root, translationPath);
  for (const page of manifest.pages) if (page.route !== config.route && page.translationPath) assert.notEqual(resolve(root, translationPath), resolve(root, page.translationPath), 'Translation path belongs to another page');
  const assembledAt = new Date().toISOString();
  const metadata = { sourceUrl: source.url, sourceHash: source.sourceHash };
  const nextIndex = updateIndexedPage(index, config.route, article, metadata);
  if (manifest.pages.find(page => page.route === config.route)?.translationHash !== sha256(text)) delete nextIndex.pages[config.route].translatedAt;
  const nextManifest = structuredClone(manifest);
  const record = { route: config.route, ...metadata, translationPath, translationHash: sha256(text), status: 'assembled', assembledAt, assembly: { configHash: sha256(JSON.stringify(config)), checkedAt: assembledAt, checks: ['source-hash', 'config', 'content-structure', 'original-blocks', 'inline-code', 'source-resources', 'chinese-targets'], plannedChineseTargets } };
  const at = nextManifest.pages.findIndex(page => page.route === config.route);
  if (at < 0) nextManifest.pages.push(record);
  else nextManifest.pages[at] = record;
  const stringify = value => `${JSON.stringify(value, null, 2)}\n`;
  const outputs = [
    { path: translationPath, text },
    { path: 'content/zh/index.json', text: stringify(nextIndex) },
    { path: 'content/zh/manifest.json', text: stringify(nextManifest) },
  ];
  const knowledge = await json('content/learning/pilot-knowledge.json');
  const previousKnowledge = JSON.stringify(knowledge);
  const sharedSource = id => Object.entries(knowledge.pages).some(([route, page]) => route !== config.route && page.sourceIds?.includes(id)) || Object.values(knowledge.concepts).some(concept => concept.evidence?.some(item => item.sourceId === id));
  for (const [id, source] of Object.entries(knowledge.sources)) if ((resolve(root, source.path) === resolve(root, translationPath)
    || (previousRecord?.translationPath && resolve(root, source.path) === resolve(root, previousRecord.translationPath))) && (source.sha256 !== sha256(text) || source.path !== translationPath)) {
    assert.ok(!sharedSource(id), `Shared learning source cannot change: ${id}`);
    source.path = translationPath;
    source.sha256 = sha256(text);
  }
  if (config.learning) {
    assert.ok(config.learning.profile && typeof config.learning === 'object', 'Invalid learning config');
    for (const [id, source] of Object.entries(config.learning.sources ?? {})) {
      assert.ok(nonempty(source.path) && /^[a-f\d]{64}$/.test(source.sha256), 'Invalid learning source');
      if (knowledge.sources[id] && JSON.stringify(source) !== JSON.stringify(knowledge.sources[id])) assert.ok(!sharedSource(id), `Shared learning source cannot change: ${id}`);
      const bytes = resolve(root, source.path) === resolve(root, translationPath) ? text : await read(source.path);
      assert.equal(sha256(bytes), source.sha256, `Learning source hash mismatch: ${id}`);
    }
    knowledge.pages[config.route] = config.learning.profile;
    Object.assign(knowledge.sources, config.learning.sources ?? {});
  }
  const profile = knowledge.pages[config.route];
  if (profile) {
    validateLearning(profile, knowledge);
    for (const id of profile.sourceIds) {
      const source = knowledge.sources[id];
      const bytes = resolve(root, source.path) === resolve(root, translationPath) ? text : await read(source.path);
      assert.equal(sha256(bytes), source.sha256, `Learning source hash mismatch: ${id}`);
    }
    for (const example of profile.originalExamples ?? []) assert.ok((await read(knowledge.sources[example.sourceId]?.path)).includes(example.text), 'Learning original example not in source');
  }
  const requiredTargets = new Set((config.linkTargets ?? []).filter(target => target.state === 'available-chinese').map(target => target.route));
  for (const link of nodes(tree, node => ['link', 'definition'].includes(node.type))) {
    if (!link.url.startsWith('#') && !link.url.startsWith('http')) {
      const route = localRoute(link.url);
      if (route && (nextIndex.pages[route] || !plannedChineseTargets.some(target => target.route === route))) requiredTargets.add(route);
    }
  }
  for (const link of profile?.related ?? []) {
    const route = localRoute(link.href);
    if (route) requiredTargets.add(route);
  }
  for (const route of requiredTargets) {
    const errors = await indexedTranslationErrors({ root, route, index: nextIndex, manifest: nextManifest, text: route === config.route ? text : undefined });
    const original = sources.pages.find(page => page.route === route);
    if (!original || original.sourceHash !== nextManifest.pages.find(page => page.route === route)?.sourceHash) errors.push('Source route/hash mismatch');
    assert.equal(errors.length, 0, `Unavailable Chinese target: ${route}: ${errors.join('; ')}`);
  }
  if (JSON.stringify(knowledge) !== previousKnowledge) outputs.push({ path: 'content/learning/pilot-knowledge.json', text: stringify(knowledge) });
  for (const item of outputs) await safeOutputPath(root, item.path);
  if (mode === 'apply') await writeAssembly(root, config.route, outputs, fs, inputs);
  return { mode, route: config.route, page: nextIndex.pages[config.route], learning: profile, manifest: record, plannedChineseTargets, outputs: outputs.map(item => ({ path: item.path, sha256: sha256(item.text) })) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [mode, configPath] = process.argv.slice(2);
  assert.ok(['preview', 'apply', 'recover'].includes(mode) && (mode === 'recover' || configPath), 'Usage: assemble-page.mjs <preview|apply> <config.json> | recover');
  if (mode === 'recover') console.log(JSON.stringify(await recoverAssembly(), null, 2));
  else {
    const config = JSON.parse(await readFile(await safePath(process.cwd(), configPath), 'utf8'));
    console.log(JSON.stringify(await assemblePage({ config, mode }), null, 2));
  }
}
