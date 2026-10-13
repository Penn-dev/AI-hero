import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import * as filesystem from 'node:fs/promises';
import { assemblePage, recoverAssembly } from './assemble-page.mjs';
import { validateContent } from './validate-content.mjs';

const hash = text => createHash('sha256').update(text).digest('hex');
const source = '---\ntitle: "Guide"\nslug: "guide"\ntype: "post"\nupdatedAt: "2026-10-13"\n---\n## Start\n\nUse `npm test`.\n';
const chinese = source.replace('"Guide"', '"指南"').replace('## Start', '## 开始').replace('Use ', '使用 ');
const jsonText = value => `${JSON.stringify(value, null, 2)}\n`;
async function unchangedOnReject(f, pattern) {
  const paths = ['content/zh/index.json', 'content/zh/manifest.json', 'content/learning/pilot-knowledge.json'];
  const before = await Promise.all(paths.map(path => readFile(join(f.root, path), 'utf8')));
  for (const mode of ['preview', 'apply']) {
    await assert.rejects(assemblePage({ root: f.root, config: f.config, mode }), pattern);
    assert.deepEqual(await Promise.all(paths.map(path => readFile(join(f.root, path), 'utf8'))), before);
    await assert.rejects(readFile(join(f.root, 'content/zh/guide.md')), { code: 'ENOENT' });
  }
}
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'aihero-assembly-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const put = async (path, value) => {
    await mkdir(dirname(join(root, path)), { recursive: true });
    await writeFile(join(root, path), typeof value === 'string' ? value : jsonText(value));
  };
  const get = async path => JSON.parse(await readFile(join(root, path), 'utf8'));
  await put('content/source/guide.md', source);
  await put('content/source/manifest.json', { version: 1, pages: [{ route: '/guide', url: 'https://www.aihero.dev/guide', status: 'downloaded', sourcePath: 'content/source/guide.md', sourceHash: hash(source) }] });
  await put('draft.md', chinese);
  await put('content/zh/index.json', { version: 1, generatedAt: 'old', pages: {} });
  await put('content/zh/manifest.json', { version: 1, generatedAt: 'old', pages: [] });
  await put('content/learning/pilot-knowledge.json', { version: 1, scope: 'existing', sources: {}, concepts: {}, templates: {}, pages: {} });
  const config = { route: '/guide', source: { path: 'content/source/guide.md', sha256: hash(source) }, chineseFile: 'draft.md' };
  return { root, put, get, config };
}

const outputRoute = '/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k';
const relativeSolution = 'generating-objects-via-output~dkm2k/solution';
const absoluteSolution = 'https://www.aihero.dev/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k/solution';
async function outputResourceFixture(t, solutionHref) {
  const f = await fixture(t);
  const manifest = JSON.parse(await readFile(new URL('../content/source/manifest.json', import.meta.url), 'utf8'));
  const original = manifest.pages.find(page => page.route === outputRoute);
  const text = await readFile(new URL(`../${original.sourcePath}`, import.meta.url), 'utf8');
  assert.equal(hash(text), original.sourceHash);
  assert.ok(text.includes(`](${relativeSolution})`));
  await f.put(original.sourcePath, text);
  await f.put('content/source/manifest.json', { version: 1, pages: [original] });
  const draft = text.replace('title: "Generating Objects via Output"', 'title: "通过 Output 生成对象"')
    .replace(`](${relativeSolution})`, `](${solutionHref})`);
  await f.put('draft.md', draft);
  await f.put('content/zh/other.md', chinese);
  await f.put('content/zh/index.json', { version: 1, pages: { '/other': { title: '其他页面', markdown: '保留正文' } } });
  await f.put('content/zh/manifest.json', { version: 1, pages: [{ route: '/other', status: 'translated', translationPath: 'content/zh/other.md', translationHash: hash(chinese) }] });
  f.config = {
    route: outputRoute, source: { path: original.sourcePath, sha256: original.sourceHash }, chineseFile: 'draft.md',
    linkTargets: ['/workshops/ai-sdk-v6-crash-course', `${outputRoute}/solution`, '/login'].map(route => ({ route, state: 'planned-chinese', reason: '测试中保留英文资源入口' })),
  };
  return { ...f, originalText: text };
}

void test('Output source-relative Solution accepts the correct absolute URL without changing sources or other pages', async t => {
  const f = await outputResourceFixture(t, absoluteSolution);
  const index = await f.get('content/zh/index.json');
  const manifest = await f.get('content/zh/manifest.json');
  const sourceManifest = await readFile(join(f.root, 'content/source/manifest.json'), 'utf8');
  await assemblePage({ root: f.root, config: f.config, mode: 'preview' });
  assert.deepEqual(await f.get('content/zh/index.json'), index);
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  const nextIndex = await f.get('content/zh/index.json');
  assert.ok(nextIndex.pages[outputRoute].markdown.includes(`](${absoluteSolution})`));
  assert.deepEqual(nextIndex.pages['/other'], index.pages['/other']);
  assert.deepEqual((await f.get('content/zh/manifest.json')).pages[0], manifest.pages[0]);
  assert.equal(await readFile(join(f.root, 'content/zh/other.md'), 'utf8'), chinese);
  assert.equal(await readFile(join(f.root, f.config.source.path), 'utf8'), f.originalText);
  assert.equal(await readFile(join(f.root, 'content/source/manifest.json'), 'utf8'), sourceManifest);
});

async function unchangedOutputOnReject(f, pattern) {
  const before = await filesystem.readdir(f.root, { recursive: true });
  const files = [];
  for (const path of before) if ((await filesystem.stat(join(f.root, path))).isFile()) files.push(path);
  const bytes = await Promise.all(files.map(path => readFile(join(f.root, path))));
  for (const mode of ['preview', 'apply']) {
    await assert.rejects(assemblePage({ root: f.root, config: f.config, mode }), pattern);
    assert.deepEqual(await filesystem.readdir(f.root, { recursive: true }), before);
    assert.deepEqual(await Promise.all(files.map(path => readFile(join(f.root, path)))), bytes);
  }
}

void test('Output rejects a wrong root Solution even when its later correct link remains, without writing', async t => {
  const f = await outputResourceFixture(t, `https://www.aihero.dev/${relativeSolution}`);
  await unchangedOutputOnReject(f, /Source resource missing/);
});

void test('Output rejects bare relative URLs with an actionable message before writing', async t => {
  const f = await outputResourceFixture(t, relativeSolution);
  await unchangedOutputOnReject(f, /Bare relative resource URL.*Use an absolute URL, a root-relative path, or an anchor/s);
});

void test('ordinary article previews without writing, then assembles through the existing index', async t => {
  const f = await fixture(t);
  const before = await readFile(join(f.root, 'content/zh/index.json'), 'utf8');
  const preview = await assemblePage({ root: f.root, config: f.config, mode: 'preview' });
  assert.equal(preview.route, '/guide');
  assert.equal(preview.mode, 'preview');
  assert.ok(preview.outputs.some(item => item.path === 'content/zh/guide.md'));
  assert.equal(await readFile(join(f.root, 'content/zh/index.json'), 'utf8'), before);
  await assert.rejects(readFile(join(f.root, 'content/zh/guide.md')), { code: 'ENOENT' });
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  const page = (await f.get('content/zh/index.json')).pages['/guide'];
  assert.equal(page.title, '指南');
  assert.equal(page.markdown, '## 开始\n\n使用 `npm test`.');
  assert.equal(await readFile(join(f.root, 'content/zh/guide.md'), 'utf8'), chinese);
  const record = (await f.get('content/zh/manifest.json')).pages[0];
  assert.equal(record.translationHash, hash(chinese));
  assert.equal(record.status, 'assembled');
  assert.equal(record.workflow, undefined);
  assert.equal(record.browserAcceptance, undefined);
  assert.deepEqual((await f.get('content/learning/pilot-knowledge.json')).pages, {});
});

void test('optional learning profile uses the current knowledge file without replacing shared records', async t => {
  const f = await fixture(t);
  const knowledge = await f.get('content/learning/pilot-knowledge.json');
  knowledge.scope = 'keep shared metadata';
  knowledge.concepts.prompt = { term: '提示词', aliases: ['Prompt'], definition: '工作说明', dependsOn: [], evidence: [] };
  knowledge.pages['/other'] = { marker: 'keep other profile' };
  await f.put('content/learning/pilot-knowledge.json', knowledge);
  f.config.learning = {
    sources: { 'guide-source': { path: f.config.source.path, sha256: hash(source) }, 'guide-translation': { path: 'content/zh/guide.md', sha256: hash(chinese) } },
    profile: { kind: 'guide', sourceIds: ['guide-source', 'guide-translation'], conceptIds: ['prompt'], prerequisiteIds: [], start: { title: '开始前', cards: [{ title: '准备', text: '阅读正文' }] }, related: [], check: { title: '检查', items: ['理解原文'] } },
  };
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  const next = await f.get('content/learning/pilot-knowledge.json');
  assert.deepEqual(next.pages['/guide'], f.config.learning.profile);
  assert.deepEqual(next.pages['/other'], knowledge.pages['/other']);
  assert.deepEqual(next.concepts, knowledge.concepts);
  assert.equal(next.scope, knowledge.scope);
  assert.deepEqual(next.sources, f.config.learning.sources);
});

void test('incorrect source hash fails before any write in preview and apply', async t => {
  const f = await fixture(t);
  f.config.source.sha256 = '0'.repeat(64);
  await unchangedOnReject(f, /Source hash mismatch/);
});

void test('invalid route, source path, output path and learning config fail without writes', async t => {
  const cases = [
    ['source route mismatch', f => { f.config.source.path = 'content/source/other.md'; }, /Source path does not match route/],
    ['unsafe route', f => { f.config.route = '/../guide'; }, /Invalid route/],
    ['unsafe output', f => { f.config.translationPath = '../outside.md'; }, /Unsafe translation path/],
    ['unknown config field', f => { f.config.profle = {}; }, /Unknown config field/],
    ['invalid learning kind', f => { f.config.learning = { profile: { kind: 'unknown' } }; }, /Invalid learning/],
    ['invalid learning cards', f => { f.config.learning = { profile: { kind: 'guide', sourceIds: [], conceptIds: [], prerequisiteIds: [], start: { title: '起点', cards: 'wrong' }, related: [] } }; }, /Invalid learning/],
  ];
  for (const [name, change, pattern] of cases) await t.test(name, async child => {
    const f = await fixture(child);
    await f.put('content/source/other.md', source);
    change(f);
    await unchangedOnReject(f, pattern);
  });
});

void test('an available Chinese link whose indexed body is empty is rejected before writing', async t => {
  const f = await fixture(t);
  await f.put('draft.md', `${chinese}\n[词条](/dictionary/agent)\n`);
  await f.put('content/zh/index.json', { version: 1, pages: { '/dictionary/agent': { title: '智能体', markdown: '' } } });
  f.config.linkTargets = [{ route: '/dictionary/agent', state: 'available-chinese' }];
  await unchangedOnReject(f, /Unavailable Chinese target/);
});

void test('unfinished batch targets are explicitly recorded while available targets must still be valid', async t => {
  const f = await fixture(t);
  await f.put('draft.md', `${chinese}\n[尚未制作的词条](/dictionary/token)\n`);
  f.config.linkTargets = [{ route: '/dictionary/token', state: 'planned-chinese', reason: '下一批制作；当前跳转英文原页' }];
  const preview = await assemblePage({ root: f.root, config: f.config, mode: 'preview' });
  assert.deepEqual(preview.plannedChineseTargets, f.config.linkTargets);
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  assert.deepEqual((await f.get('content/zh/manifest.json')).pages[0].assembly.plannedChineseTargets, f.config.linkTargets);
});

void test('an actual renderable Chinese target with a stale source version permits assembly and retains the version difference', async t => {
  const f = await fixture(t);
  const target = JSON.parse(await readFile(new URL('./fixtures/stale-agent.json', import.meta.url), 'utf8'));
  const route = target.record.route;
  const fixedSources = JSON.parse(await readFile(new URL('../content/source/manifest.json', import.meta.url), 'utf8'));
  const currentSource = fixedSources.pages.find(page => page.route === route);
  const sources = await f.get('content/source/manifest.json');
  sources.pages.push(currentSource);
  await f.put(currentSource.sourcePath, await readFile(new URL(`../${currentSource.sourcePath}`, import.meta.url), 'utf8'));
  await f.put('content/source/manifest.json', sources);
  await f.put(target.record.translationPath, target.text);
  const index = { version: 1, pages: { [route]: target.page } };
  const manifest = { version: 1, pages: [target.record] };
  await f.put('content/zh/index.json', index);
  await f.put('content/zh/manifest.json', manifest);
  await f.put('draft.md', `${chinese}\n[智能体](${route})\n`);
  f.config.learning = { profile: { kind: 'guide', sourceIds: [], conceptIds: [], prerequisiteIds: [], start: { title: '开始', cards: [] }, related: [{ title: '智能体', description: '已有中文词条', href: route, format: '词条' }] } };
  f.config.learning.profile.related.push({ title: '原站课程', description: '显式原资源不要求中文目标', href: 'https://www.aihero.dev/workshops/ai-sdk-v6-crash-course', format: '原站' });
  const versionErrors = [`Translation source hash mismatch: ${route}`];
  assert.deepEqual((await validateContent({ root: f.root })).errors, versionErrors);
  const stale = [{ route, sourceHash: target.record.sourceHash, currentSourceHash: currentSource.sourceHash }];
  const preview = await assemblePage({ root: f.root, config: f.config, mode: 'preview' });
  assert.deepEqual(preview.manifest.assembly.staleChineseTargets, stale);
  assert.deepEqual(await f.get('content/zh/index.json'), index);
  assert.deepEqual(await f.get('content/zh/manifest.json'), manifest);
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  const nextManifest = await f.get('content/zh/manifest.json');
  assert.deepEqual(nextManifest.pages.find(page => page.route === '/guide').assembly.staleChineseTargets, stale);
  assert.deepEqual(nextManifest.pages[0], target.record);
  assert.deepEqual((await f.get('content/zh/index.json')).pages[route], target.page);
  assert.equal(await readFile(join(f.root, target.record.translationPath), 'utf8'), target.text);
  assert.deepEqual(await f.get('content/source/manifest.json'), sources);
  assert.deepEqual((await validateContent({ root: f.root })).errors, versionErrors);
});

void test('Chinese Prompt can be appended, but changing the English Prompt is rejected without writes', async t => {
  const f = await fixture(t);
  const englishPrompt = '\n```text\nExplain this repository.\n```\n';
  const english = source + englishPrompt;
  const translated = chinese + englishPrompt + '\n中文 Prompt（译注）：\n\n```text\n请解释这个代码仓库。\n```\n';
  await f.put('content/source/guide.md', english);
  const manifest = await f.get('content/source/manifest.json');
  manifest.pages[0].sourceHash = hash(english);
  await f.put('content/source/manifest.json', manifest);
  f.config.source.sha256 = hash(english);
  await f.put('draft.md', translated.replace('Explain this repository.', 'Changed original.'));
  await unchangedOnReject(f, /Original fenced block/);
  await f.put('draft.md', translated);
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  assert.ok((await f.get('content/zh/index.json')).pages['/guide'].markdown.includes('请解释这个代码仓库。'));
});

void test('content structure, original inline code, resources and renderer support are checked before writes', async t => {
  const cases = [
    ['missing heading', text => text.replace('## 开始\n', ''), /Heading structure/],
    ['missing inline code', text => text.replace('`npm test`', '测试'), /Inline code/],
    ['missing resource', text => text.replace('[视频](https://example.com/video)', ''), /Source resource/],
    ['unknown MDX', text => text + '\n<Callout>说明</Callout>\n', /Unsupported MDX/],
    ['JavaScript expression', text => text + '\n{unknownVariable}\n', /Unsupported MDX/],
    ['unmarked new code', text => text + '\n```js\nnewCode();\n```\n', /Added fenced block/],
  ];
  for (const [name, change, pattern] of cases) await t.test(name, async child => {
    const f = await fixture(child);
    const english = source + '\n[Video](https://example.com/video)\n';
    await f.put('content/source/guide.md', english);
    const manifest = await f.get('content/source/manifest.json');
    manifest.pages[0].sourceHash = hash(english);
    await f.put('content/source/manifest.json', manifest);
    f.config.source.sha256 = hash(english);
    await f.put('draft.md', change(chinese + '\n[视频](https://example.com/video)\n'));
    await unchangedOnReject(f, pattern);
  });
});

void test('a filesystem failure after target replacement restores every file, including the previous translation', async t => {
  const f = await fixture(t);
  await f.put('content/zh/guide.md', 'previous translation bytes');
  const paths = ['content/zh/guide.md', 'content/zh/index.json', 'content/zh/manifest.json', 'content/learning/pilot-knowledge.json'];
  const before = await Promise.all(paths.map(path => readFile(join(f.root, path), 'utf8')));
  let replacements = 0;
  const fs = { ...filesystem, rename: async (from, to) => {
    if (++replacements === 2) throw new Error('Simulated disk failure');
    await filesystem.rename(from, to);
  } };
  await assert.rejects(assemblePage({ root: f.root, config: f.config, mode: 'apply', fs }), /Simulated disk failure/);
  assert.deepEqual(await Promise.all(paths.map(path => readFile(join(f.root, path), 'utf8'))), before);
  await assert.rejects(readFile(join(f.root, 'content/zh/.assembly-journal.json')), { code: 'ENOENT' });
});

void test('a target cannot overwrite another page translation or shared knowledge source', async t => {
  const f = await fixture(t);
  await f.put('content/zh/other.md', chinese);
  await f.put('content/zh/manifest.json', { version: 1, pages: [{ route: '/other', translationPath: 'content/zh/other.md', translationHash: hash(chinese), status: 'translated' }] });
  f.config.translationPath = 'content/zh/other.md';
  await unchangedOnReject(f, /Translation path belongs to another page/);
  assert.equal(await readFile(join(f.root, 'content/zh/other.md'), 'utf8'), chinese);
});

void test('updating one of seventeen pages preserves the other sixteen pages and refreshes only its translation source', async t => {
  const f = await fixture(t);
  const index = await f.get('content/zh/index.json');
  const manifest = await f.get('content/zh/manifest.json');
  const knowledge = await f.get('content/learning/pilot-knowledge.json');
  for (let n = 0; n < 17; n++) {
    const route = n === 0 ? '/guide' : `/existing-${n}`;
    const path = `content/zh${route}.md`;
    await f.put(path, chinese);
    index.pages[route] = { title: '原页面', markdown: '旧正文', untouched: n };
    manifest.pages.push({ route, translationPath: path, translationHash: hash(chinese), status: 'translated-estimate-sample', marker: n });
  }
  knowledge.sources['guide-translation'] = { path: 'content/zh/guide.md', sha256: hash(chinese) };
  knowledge.pages['/guide'] = { kind: 'guide', sourceIds: ['guide-translation'], conceptIds: [], prerequisiteIds: [], start: { title: '起点', cards: [] }, related: [] };
  await f.put('content/zh/index.json', index);
  await f.put('content/zh/manifest.json', manifest);
  await f.put('content/learning/pilot-knowledge.json', knowledge);
  const revised = chinese + '\n译注：这只是临时隔离测试。\n';
  await f.put('draft.md', revised);
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  const nextIndex = await f.get('content/zh/index.json');
  const nextManifest = await f.get('content/zh/manifest.json');
  const nextKnowledge = await f.get('content/learning/pilot-knowledge.json');
  assert.equal(Object.keys(nextIndex.pages).length, 17);
  for (const route of Object.keys(index.pages).filter(route => route !== '/guide')) assert.deepEqual(nextIndex.pages[route], index.pages[route]);
  assert.deepEqual(nextManifest.pages.slice(1), manifest.pages.slice(1));
  assert.equal(nextKnowledge.sources['guide-translation'].sha256, hash(revised));
  assert.deepEqual(nextKnowledge.pages, knowledge.pages);
  assert.equal(nextIndex.generatedAt, index.generatedAt);
});

void test('content validation checks every renderable translation status, file hash and indexed body', async t => {
  const f = await fixture(t);
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  assert.deepEqual((await validateContent({ root: f.root })).errors, []);
  const manifest = await f.get('content/zh/manifest.json');
  for (const status of ['assembled', 'translated', 'translated-estimate-sample', 'translated-estimate-special-sample', 'translated-revised-learning-page']) {
    manifest.pages[0].status = status;
    manifest.pages[0].translationHash = '0'.repeat(64);
    await f.put('content/zh/manifest.json', manifest);
    assert.ok((await validateContent({ root: f.root })).errors.some(error => error.includes('Translation hash mismatch')));
  }
  manifest.pages[0].translationHash = hash(chinese);
  await f.put('content/zh/manifest.json', manifest);
  const index = await f.get('content/zh/index.json');
  index.pages['/guide'].markdown = 'stale indexed body';
  await f.put('content/zh/index.json', index);
  assert.ok((await validateContent({ root: f.root })).errors.some(error => error.includes('Indexed translation differs')));
});

void test('available Chinese targets are checked against their files and manifest, not just a nonempty index', async t => {
  const f = await fixture(t);
  await f.put('draft.md', `${chinese}\n[智能体](/dictionary/agent)\n`);
  await f.put('content/zh/index.json', { version: 1, pages: { '/dictionary/agent': { title: '智能体', markdown: '陈旧正文' } } });
  await f.put('content/zh/manifest.json', { version: 1, pages: [{ route: '/dictionary/agent', status: 'translated-estimate-special-sample', translationPath: 'content/zh/missing.md', translationHash: hash(chinese) }] });
  f.config.linkTargets = [{ route: '/dictionary/agent', state: 'available-chinese' }];
  await unchangedOnReject(f, /Unavailable Chinese target/);
});

void test('unsafe symlink destinations fail during preview as well as apply', async t => {
  const f = await fixture(t);
  const outside = await mkdtemp(join(tmpdir(), 'aihero-outside-'));
  t.after(() => rm(outside, { recursive: true, force: true }));
  await filesystem.symlink(outside, join(f.root, 'content/zh/escape'), 'junction');
  f.config.translationPath = 'content/zh/escape/guide.md';
  await unchangedOnReject(f, /Path escapes workspace through symlink/);
  await assert.rejects(readFile(join(outside, 'guide.md')), { code: 'ENOENT' });
});

void test('invalid auxiliary source hashes and changes to another page source are refused', async t => {
  const f = await fixture(t);
  f.config.learning = { sources: { 'guide-source': { path: f.config.source.path, sha256: '0'.repeat(64) } }, profile: { kind: 'guide', sourceIds: ['guide-source'], conceptIds: [], prerequisiteIds: [], start: { title: '开始', cards: [] }, related: [] } };
  await unchangedOnReject(f, /Learning source hash mismatch/);
});

void test('interrupted writes keep a recovery journal and can restore the original files explicitly', async t => {
  const f = await fixture(t);
  await f.put('content/zh/guide.md', 'previous bytes');
  const before = await readFile(join(f.root, 'content/zh/index.json'), 'utf8');
  let calls = 0;
  const fs = { ...filesystem, rename: async (from, to) => {
    if (++calls > 1) throw new Error('Disk unavailable');
    await filesystem.rename(from, to);
  } };
  await assert.rejects(assemblePage({ root: f.root, config: f.config, mode: 'apply', fs }), /recovery journal retained/);
  await assert.rejects(assemblePage({ root: f.root, config: f.config, mode: 'preview' }), /Pending assembly/);
  assert.equal((await recoverAssembly({ root: f.root })).recovered, true);
  assert.equal(await readFile(join(f.root, 'content/zh/guide.md'), 'utf8'), 'previous bytes');
  assert.equal(await readFile(join(f.root, 'content/zh/index.json'), 'utf8'), before);
  assert.equal((await recoverAssembly({ root: f.root })).recovered, false);
});

void test('a symlink within the workspace cannot redirect translation writes into source files', async t => {
  const f = await fixture(t);
  await filesystem.symlink(join(f.root, 'content/source'), join(f.root, 'content/zh/source-alias'), 'junction');
  f.config.translationPath = 'content/zh/source-alias/guide.md';
  await unchangedOnReject(f, /Unsafe physical output path/);
  assert.equal(await readFile(join(f.root, 'content/source/guide.md'), 'utf8'), source);
});

void test('the actual existing site index and all seventeen manifest records survive adding an ordinary fixture page', async t => {
  const f = await fixture(t);
  const index = JSON.parse(await readFile(new URL('../content/zh/index.json', import.meta.url), 'utf8'));
  const manifest = JSON.parse(await readFile(new URL('../content/zh/manifest.json', import.meta.url), 'utf8'));
  await f.put('content/zh/index.json', index);
  await f.put('content/zh/manifest.json', manifest);
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  const next = await f.get('content/zh/index.json');
  assert.equal(Object.keys(next.pages).length, Object.keys(index.pages).length + 1);
  for (const route of Object.keys(index.pages)) assert.deepEqual(next.pages[route], index.pages[route]);
  assert.deepEqual((await f.get('content/zh/manifest.json')).pages.slice(0, manifest.pages.length), manifest.pages);
});

void test('shared records changed during preparation are preserved instead of overwritten by a stale plan', async t => {
  const f = await fixture(t);
  const concurrent = { version: 1, pages: { '/concurrent': { title: '并行页面', markdown: '必须保留' } } };
  const fs = { ...filesystem, open: async (path, flags) => {
    if (path.endsWith('.assembly-journal.json')) await f.put('content/zh/index.json', concurrent);
    return filesystem.open(path, flags);
  } };
  await assert.rejects(assemblePage({ root: f.root, config: f.config, mode: 'apply', fs }), /Input changed during assembly/);
  assert.deepEqual(await f.get('content/zh/index.json'), concurrent);
  await assert.rejects(readFile(join(f.root, 'content/zh/guide.md')), { code: 'ENOENT' });
});

void test('an auxiliary source used by another page cannot be silently replaced', async t => {
  const f = await fixture(t);
  const knowledge = await f.get('content/learning/pilot-knowledge.json');
  knowledge.sources.shared = { path: 'shared-old.md', sha256: hash('original shared record') };
  knowledge.pages['/other'] = { sourceIds: ['shared'] };
  await f.put('shared-old.md', 'original shared record');
  await f.put('content/learning/pilot-knowledge.json', knowledge);
  f.config.learning = { sources: { shared: { path: f.config.source.path, sha256: hash(source) } }, profile: { kind: 'guide', sourceIds: ['shared'], conceptIds: [], prerequisiteIds: [], start: { title: '起点', cards: [] }, related: [] } };
  await unchangedOnReject(f, /Shared learning source cannot change/);
});

void test('shared evidence can move to a verified same-hash snapshot while other records and pages stay unchanged', async t => {
  const f = await fixture(t);
  const oldText = 'Historical source evidence\n';
  const snapshot = 'content/learning/shared/source-snapshots/guide-old.md';
  const knowledge = await f.get('content/learning/pilot-knowledge.json');
  knowledge.sources.shared = { path: f.config.source.path, sha256: hash(oldText) };
  knowledge.sources.unrelated = { path: 'content/zh/other.md', sha256: hash(chinese) };
  for (const id of ['first', 'second', 'third']) knowledge.concepts[id] = { term: id, definition: '保留定义', aliases: [], dependsOn: [], evidence: [{ sourceId: 'shared', lines: '1' }] };
  knowledge.pages['/other'] = { sourceIds: ['unrelated'], marker: '保留其他页辅助' };
  const index = { version: 1, pages: { '/other': { title: '其他页', markdown: '保留索引正文' } } };
  const manifest = { version: 1, pages: [{ route: '/other', translationPath: 'content/zh/other.md', translationHash: hash(chinese), status: 'translated' }] };
  await f.put('content/learning/pilot-knowledge.json', knowledge);
  await f.put('content/zh/index.json', index);
  await f.put('content/zh/manifest.json', manifest);
  await f.put('content/zh/other.md', chinese);
  await f.put(snapshot, oldText);
  f.config.learning = {
    sources: { shared: { path: snapshot, sha256: hash(oldText) }, current: { path: f.config.source.path, sha256: hash(source) } },
    profile: { kind: 'guide', sourceIds: ['current'], conceptIds: [], prerequisiteIds: [], start: { title: '起点', cards: [] }, related: [] },
  };
  await assemblePage({ root: f.root, config: f.config, mode: 'preview' });
  assert.deepEqual(await f.get('content/learning/pilot-knowledge.json'), knowledge);
  assert.deepEqual(await f.get('content/zh/index.json'), index);
  assert.deepEqual(await f.get('content/zh/manifest.json'), manifest);
  await f.put(snapshot, 'Different content cannot claim the historical hash');
  await unchangedOnReject(f, /Learning source hash mismatch: shared/);
  await f.put(snapshot, oldText);
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  assert.deepEqual(await f.get('content/learning/pilot-knowledge.json'), {
    ...knowledge,
    sources: { ...knowledge.sources, ...f.config.learning.sources },
    pages: { ...knowledge.pages, '/guide': f.config.learning.profile },
  });
  assert.deepEqual((await f.get('content/zh/index.json')).pages['/other'], index.pages['/other']);
  assert.deepEqual((await f.get('content/zh/manifest.json')).pages[0], manifest.pages[0]);
  assert.equal(await readFile(join(f.root, 'content/zh/other.md'), 'utf8'), chinese);
  assert.equal(await readFile(join(f.root, f.config.source.path), 'utf8'), source);
  assert.equal(await readFile(join(f.root, snapshot), 'utf8'), oldText);
});

void test('changing the target translation path keeps its existing profile pointed at the newly assembled file', async t => {
  const f = await fixture(t);
  f.config.learning = { sources: { 'guide-translation': { path: 'content/zh/guide.md', sha256: hash(chinese) } }, profile: { kind: 'guide', sourceIds: ['guide-translation'], conceptIds: [], prerequisiteIds: [], start: { title: '起点', cards: [] }, related: [] } };
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  delete f.config.learning;
  f.config.translationPath = 'content/learning/guide/article.md';
  const revised = chinese + '\n译注：局部修订。\n';
  await f.put('draft.md', revised);
  await assemblePage({ root: f.root, config: f.config, mode: 'apply' });
  const knowledge = await f.get('content/learning/pilot-knowledge.json');
  assert.deepEqual(knowledge.sources['guide-translation'], { path: 'content/learning/guide/article.md', sha256: hash(revised) });
  assert.equal(await readFile(join(f.root, 'content/zh/guide.md'), 'utf8'), chinese);
  assert.deepEqual((await validateContent({ root: f.root })).errors, []);
});
