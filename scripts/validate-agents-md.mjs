import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';

const read = path => readFile(path, 'utf8');
const json = async path => JSON.parse(await read(path));
const sha256 = text => createHash('sha256').update(text).digest('hex');

const input = await json('content/learning/agents-md/input.json');
const article = await read('content/learning/agents-md/article.md');
const source = await read(input.source.path);
const reference = await read(input.referenceTranslation.path);
const links = await json('content/learning/agents-md/link-targets.json');
const chineseIndex = await json('content/zh/index.json');

const frontmatter = text => {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, 'Frontmatter missing');
  const lines = match[1].split(/\r?\n/);
  const scalar = name => lines.find(line => line.startsWith(`${name}:`))?.slice(name.length + 1).trim().replace(/^"|"$/g, '');
  const tagsAt = lines.findIndex(line => line === 'tags:');
  const tags = tagsAt < 0 ? [] : lines.slice(tagsAt + 1).filter(line => /^\s+-\s+/.test(line)).map(line => line.replace(/^\s+-\s+/, ''));
  return { slug: scalar('slug'), type: scalar('type'), updatedAt: scalar('updatedAt'), tags };
};

const sourceMeta = frontmatter(source);
const articleMeta = frontmatter(article);
assert.equal(articleMeta.slug, sourceMeta.slug, 'Frontmatter slug changed');
assert.equal(articleMeta.type, sourceMeta.type, 'Frontmatter type changed');
assert.equal(articleMeta.updatedAt, sourceMeta.updatedAt, 'Frontmatter updatedAt changed');
assert.deepEqual(articleMeta.tags, sourceMeta.tags, 'Frontmatter tags changed');

const body = article.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
const tree = unified().use(remarkParse).use(remarkGfm).use(remarkMdx).parse(body);
assert.equal(tree.type, 'root', 'Markdown/MDX parse did not produce a document root');
const parsedLinks = [];
const parsedCode = [];
const visit = node => {
  if (node.type === 'link') parsedLinks.push(node.url);
  if (node.type === 'code') parsedCode.push(node.value);
  node.children?.forEach(visit);
};
visit(tree);
assert.ok(parsedCode.length >= input.originalExamples.length, 'Markdown/MDX parser lost code examples');

assert.equal(input.articleId, '/a-complete-guide-to-agents-md');
assert.equal(source, input.source.text, 'Input source text no longer matches source file');
assert.equal(sha256(source), input.source.sha256, 'Source hash changed');
assert.equal(sha256(reference), input.referenceTranslation.sha256, 'Reference translation hash changed');

let previous = -1;
for (const example of input.originalExamples) {
  assert.ok(source.includes(example.text), `Source example missing: ${example.id}`);
  const position = article.indexOf(example.text);
  assert.ok(position > previous, `Output example missing or out of order: ${example.id}`);
  assert.equal(article.split(example.text).length, 2, `Output example duplicated: ${example.id}`);
  previous = position;
}

const withoutFences = source.replace(/```[\s\S]*?```/g, '');
const inlineCode = [...new Set([...withoutFences.matchAll(/`([^`\r\n]+)`/g)].map(match => match[1]))];
for (const code of inlineCode) assert.ok(article.includes(`\`${code}\``), `Inline code lost: ${code}`);

assert.ok(!article.includes('最高优先级'), 'Removed absolute priority wording returned');
assert.ok(!article.includes('<SkillsCta') && !article.includes('<SkillsNewsletterCta'), 'Promotional CTA retained');
assert.ok(article.includes('中文学习辅助') && article.includes('中文理解（学习辅助）'), 'Learning-aid identity missing');

assert.equal(links.policy, 'Chinese learning destinations only; original English source retained in source metadata');
assert.ok(Array.isArray(links.targets) && links.targets.length > 0, 'Link target list missing');
for (const target of links.targets) {
  assert.ok(['available-chinese', 'planned-chinese'].includes(target.state), `Unknown link state: ${target.route}`);
  if (target.state === 'available-chinese') {
    const page = chineseIndex.pages[target.route];
    assert.ok(page, `Chinese target absent from index: ${target.route}`);
    assert.ok(typeof page.title === 'string' && page.title.trim(), `Chinese target title missing: ${target.route}`);
    assert.ok(typeof page.markdown === 'string' && page.markdown.trim(), `Chinese target page data missing: ${target.route}`);
  }
  if (target.state === 'planned-chinese') assert.ok(!article.includes(`](${target.route})`), `Planned target is clickable: ${target.route}`);
}
const articleRoutes = parsedLinks.filter(route => route.startsWith('/'));
for (const route of articleRoutes) {
  const target = links.targets.find(item => item.route === route);
  assert.equal(target?.state, 'available-chinese', `Article link is not an available Chinese target: ${route}`);
  assert.ok(chineseIndex.pages[route]?.markdown?.trim(), `Article route has no current Chinese page data: ${route}`);
}

console.log(JSON.stringify({
  passed: true,
  sourceSha256: input.source.sha256,
  referenceTranslationSha256: input.referenceTranslation.sha256,
  originalExamplesPreserved: input.originalExamples.length,
  inlineCodeTokensPreserved: inlineCode.length,
  frontmatterPreserved: ['slug', 'type', 'tags', 'updatedAt'],
  markdownMdxParsed: true,
  articleChineseLinks: articleRoutes.length,
  plannedTargetsNotLinked: links.targets.filter(item => item.state === 'planned-chinese').length,
  semanticAcceptance: 'editor self-check only; independent review and G2 page acceptance not established'
}, null, 2));
