import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { articleParts, updateIndexedPage } from './lib/page-content.mjs';

const apply = process.argv[2] === 'apply';
assert.ok(apply || process.argv[2] === 'check', 'Usage: node scripts/assemble-agents-md-page.mjs <apply|check>');

const route = '/a-complete-guide-to-agents-md';
const articlePath = 'content/learning/agents-md/article.md';
const indexPath = 'content/zh/index.json';
const manifestPath = 'content/zh/manifest.json';
const knowledgePath = 'content/learning/pilot-knowledge.json';
const linkTargetsPath = 'content/learning/agents-md/link-targets.json';
const inputPath = 'content/learning/agents-md/input.json';
const read = path => readFile(path, 'utf8');
const json = async path => JSON.parse(await read(path));
const hash = value => createHash('sha256').update(value).digest('hex');
const normalize = value => value.replaceAll('\r\n', '\n').trim();

const [articleText, index, manifest, knowledge, targets, input] = await Promise.all([
  read(articlePath), json(indexPath), json(manifestPath), json(knowledgePath), json(linkTargetsPath), json(inputPath),
]);
const article = articleParts(articleText);
const articleHash = hash(articleText);
const availableTargets = new Set(targets.targets.filter(item => item.state === 'available-chinese').map(item => item.route));
for (const target of availableTargets) assert.ok(index.pages[target]?.markdown?.trim(), `Missing Chinese target: ${String(target)}`);

const glossary = [
  ['git', 'Git', ['Git'], '记录和管理文件版本变化的工具。'],
  ['markdown', 'Markdown', ['Markdown'], '用简单文字标记表示标题、列表和链接等格式的写法。'],
  ['agent', '智能体（agent）', ['智能体', 'agent', 'AI 编码智能体', 'AI coding agent'], '由模型和执行框架等组合而成、可以接收任务并使用工具开展工作的 AI 助手。'],
  ['harness', '智能体执行框架（harness）', ['智能体执行框架', 'harness', '执行框架'], '围绕模型运行的软件，负责组织输入、提供工具、执行调用并管理交互过程。'],
  ['system-prompt', '系统提示词（system prompt）', ['系统提示词', 'system prompt'], '随模型请求提供的基础指令，用来约定角色和行为等要求。'],
  ['prompt', '提示词（Prompt）', ['提示词', 'prompt', 'Prompt 文本'], '交给 AI 的任务说明、指令或输入文本。'],
  ['token', 'Token', ['Token', 'token', '词元'], '模型读取和生成文本时使用的基本计量单位，不等同于一个汉字或一个英文单词。'],
  ['context', '上下文（context）', ['上下文', 'context'], '广义上指当前任务已提供给助手使用的信息；本文讨论 Token 和“每次请求”时，特指某一次模型请求中实际附带的信息。'],
  ['progressive-disclosure', '渐进式披露', ['渐进式披露', 'progressive disclosure', '按需展开信息'], '先提供完成当前步骤所需的信息，再通过清楚的入口按需展开细节。'],
  ['monorepo', '多项目单仓库（monorepo）', ['多项目单仓库', 'monorepo'], '把多个相关项目或软件包放在同一个代码仓库中统一管理的方式。'],
  ['package-manager', '包管理器', ['包管理器', 'package manager'], '安装、更新并记录项目依赖的工具；npm 和 pnpm 是 JavaScript 生态中的例子。'],
  ['skill', 'Skill', ['Skill', 'skill', '智能体技能', 'Agent Skill'], '部分智能体工具提供的专用指令或工作流单元；名称和加载方式取决于具体产品。'],
  ['symbolic-link', '符号链接', ['符号链接', 'symlink'], '让一个路径指向另一个文件或目录的文件系统机制；创建方式受操作系统、权限和命令环境影响。'],
].map(([id, term, aliases, definition]) => ({ id: 'term-' + String(id), term, aliases, definition }));

const profile = {
  kind: 'guide',
  sourceIds: ['guide-source', 'guide-revised-translation', 'guide-translation'],
  conceptIds: glossary.map(item => item.id.replace(/^term-/, '')),
  prerequisiteIds: ['markdown', 'agent'],
  start: {
    title: '开始前，先知道三件事',
    cards: [
      { title: '学完能做什么', text: '判断哪些规则该留在根目录，并写出一份简洁、不会拖累 AI 的 AGENTS.md。' },
      { title: '需要准备什么', text: '无需编程基础。只要能找到项目文件夹，并能用文本编辑器或 AI 编码工具创建文件即可。' },
      { title: '遇到陌生词怎么办', text: '点击正文中带虚线的术语，或随时使用右侧／底部的术语速查。' },
    ],
    example: {
      text: 'This project is a web application.\nUse npm for dependencies.\nRun npm test before submitting changes.',
      explanation: '中文学习辅助：它依次说明这是什么项目、使用什么依赖管理工具、提交前运行什么检查。它不是英文原文中的示例，也不要求你现在执行这些命令。',
    },
  },
  check: {
    title: '学完后，用一分钟自检',
    items: [
      '我能解释为什么 AGENTS.md 不是越长越好。',
      '我能找出只在特定任务中使用的规则，并把它们移到单独文档。',
      '我能写出一份包含项目说明、必要工具和检查命令的最小文件。',
    ],
  },
  originalExamples: input.originalExamples.map(example => ({ sourceId: 'guide-source', text: example.text })),
  originalExamplesInline: true,
  related: [
    { format: '中文词条', title: '智能体（agent）', description: '先理解是谁读取项目规则、调用工具并完成任务。', href: '/ai-coding-dictionary/agent' },
    { format: '中文词条', title: '渐进式披露', description: '继续理解怎样只在需要时提供专用规则与资料。', href: '/ai-coding-dictionary/progressive-disclosure' },
  ],
  glossary,
};

const nextIndex = updateIndexedPage(index, route, article, {
  translatedAt: '2026-09-24T00:00:00.000Z',
  readingTime: '18 分钟',
});
const nextKnowledge = structuredClone(knowledge);
nextKnowledge.sources['guide-revised-translation'] = { path: articlePath, sha256: articleHash };
nextKnowledge.pages[route] = profile;
const nextManifest = structuredClone(manifest);
const record = nextManifest.pages.find(item => item.route === route);
assert.ok(record, 'Guide manifest record missing');
Object.assign(record, {
  translationPath: articlePath,
  translationHash: articleHash,
  status: 'translated-revised-learning-page',
  workflow: 'Sol/medium edited revision; governance spot-check; deterministic page assembly and local browser acceptance',
  revisedAt: '2026-09-24',
});

const outputs = [[indexPath, nextIndex], [manifestPath, nextManifest], [knowledgePath, nextKnowledge]];
if (apply) {
  for (const [path, value] of outputs) await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
} else {
  for (const [path, value] of outputs) assert.deepEqual(await json(path), value, `Assembly drift: ${path}`);
}

assert.equal(hash(await read(input.source.path)), input.source.sha256, 'English source changed');
assert.equal(hash(await read(input.referenceTranslation.path)), input.referenceTranslation.sha256, 'Historical translation changed');
assert.ok(profile.related.every(item => availableTargets.has(item.href)), 'Related reading includes a non-Chinese target');
assert.equal(normalize(nextIndex.pages[route].markdown), normalize(article.markdown), 'Indexed article differs from revised article');
console.log(JSON.stringify({ passed: true, mode: apply ? 'apply' : 'check', route, articleHash, glossaryTerms: glossary.length, inlineOriginalExamples: profile.originalExamples.length, relatedChinesePages: profile.related.map(item => item.href) }, null, 2));
