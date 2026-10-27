import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

export const parseMarkdown = text => unified().use(remarkParse).use(remarkGfm).use(remarkMdx).parse(text);
export function nodes(tree, type) {
  const result = [];
  function visit(node) {
    if (type(node)) result.push(node);
    node.children?.forEach(visit);
  }
  visit(tree);
  return result;
}

export const sha256 = value => createHash('sha256').update(value).digest('hex');
export const normalize = value => value.replaceAll('\r\n', '\n').trim();
export function containsSequence(actual, expected) {
  let position = 0;
  for (const value of actual) if (value === expected[position]) position += 1;
  return position === expected.length;
}
export function assertOriginalBlocks(source, candidate) {
  const strip = text => text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').replaceAll('\r\n', '\n');
  const body = strip(candidate);
  const original = strip(source);
  const raw = (text, node) => text.slice(node.position.start.offset, node.position.end.offset);
  const expected = nodes(parseMarkdown(original), node => node.type === 'code').map(node => raw(original, node));
  const tree = parseMarkdown(body);
  const code = nodes(tree, node => node.type === 'code');
  assert.ok(containsSequence(code.map(node => raw(body, node)), expected), 'Original fenced block altered or missing');
  let position = 0;
  for (const node of code) {
    if (raw(body, node) === expected[position]) { position += 1; continue; }
    const before = body.slice(0, node.position.start.offset).trimEnd().split(/\n\s*\n/).at(-1);
    assert.ok(/中文\s*(?:版\s*)?(?:Prompt|提示词)|中文理解.*学习辅助/iu.test(before), 'Added fenced block must be labelled as a Chinese Prompt');
    assert.ok(/[\p{Script=Han}]/u.test(node.value) && ['text', 'plaintext', 'md', 'markdown', null, undefined].includes(node.lang), 'Added fenced block must be a Chinese Prompt, not source code');
  }
}

export function markdownResources(tree) {
  const result = nodes(tree, node => ['link', 'image', 'definition'].includes(node.type)).map(node => node.url);
  for (const node of nodes(tree, node => node.type.startsWith('mdxJsx'))) {
    for (const attr of node.attributes ?? []) if (typeof attr.value === 'string' && /^(?:href|src|url)$/.test(attr.name)) result.push(attr.value);
  }
  return result;
}
export function localRoute(href, baseUrl = 'https://www.aihero.dev') {
  const url = new URL(href, baseUrl);
  return ['http:', 'https:'].includes(url.protocol) && ['aihero.dev', 'www.aihero.dev'].includes(url.hostname) ? decodeURIComponent(url.pathname) : undefined;
}
export function validateArticle(source, candidate, sourceUrl) {
  const article = articleParts(candidate);
  assert.ok(article.title?.trim() && article.markdown.trim(), 'Chinese article title/body missing');
  const sourceBody = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const original = parseMarkdown(sourceBody);
  const tree = parseMarkdown(article.markdown);
  for (const node of nodes(tree, node => node.type.startsWith('mdx'))) {
    assert.ok(['mdxJsxFlowElement', 'mdxJsxTextElement'].includes(node.type), 'Unsupported MDX expression or import');
    assert.ok(['SkillsCta', 'SkillsNewsletterCta', 'Scrollycoding', 'details', 'summary'].includes(node.name), `Unsupported MDX component: ${String(node.name)}`);
    if (['details', 'summary'].includes(node.name)) assert.equal(node.attributes.length, 0, 'Unsupported MDX HTML attributes');
    else if (node.name !== 'Scrollycoding') assert.ok(node.attributes.every(attr => attr.type === 'mdxJsxAttribute' && typeof attr.value === 'string'), 'Unsupported MDX dynamic attribute');
  }
  assertOriginalBlocks(source, candidate);
  const values = (parsed, type) => nodes(parsed, node => node.type === type).map(node => node.value);
  assert.ok(containsSequence(values(tree, 'inlineCode'), values(original, 'inlineCode')), 'Inline code altered or missing');
  const levels = parsed => nodes(parsed, node => node.type === 'heading').map(node => node.depth);
  assert.ok(containsSequence(levels(tree), levels(original)), 'Heading structure missing or reordered');
  assert.ok(nodes(tree, node => node.type === 'table').length >= nodes(original, node => node.type === 'table').length, 'Table structure missing');
  const canonical = href => {
    const route = localRoute(href, sourceUrl);
    const url = new URL(href, sourceUrl);
    return route === undefined ? href : `${route}${url.search}${url.hash}`;
  };
  const candidateResources = markdownResources(tree);
  for (const href of candidateResources) {
    assert.ok(/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(href), `Bare relative resource URL: ${href}. Use an absolute URL, a root-relative path, or an anchor; resolve source URLs against ${sourceUrl}.`);
  }
  const resources = candidateResources.map(canonical);
  for (const href of markdownResources(original)) {
    const index = resources.indexOf(canonical(href));
    assert.ok(index !== -1, `Source resource missing: ${href}`);
    resources.splice(index, 1);
  }
  const meta = text => text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)?.[1];
  if (meta(source)) {
    const preserved = block => block.split(/\r?\n/).filter(line => !/^(?:title|description):/.test(line)).join('\n');
    assert.equal(preserved(meta(candidate)), preserved(meta(source)), 'Source frontmatter fields altered');
  }
  return { article, tree };
}

// The same frontmatter/body split used by the original AGENTS.md assembler.
export function articleParts(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  assert.ok(match, 'Article frontmatter missing');
  const scalar = name => match[1].split(/\r?\n/).find(line => line.startsWith(`${name}:`))?.slice(name.length + 1).trim().replace(/^"|"$/g, '');
  return { title: scalar('title'), description: scalar('description'), updatedAt: scalar('updatedAt'), markdown: match[2].trim() };
}

export function updateIndexedPage(index, route, article, metadata) {
  const next = structuredClone(index);
  next.pages[route] = {
    ...next.pages[route], title: article.title, description: article.description,
    markdown: article.markdown, sourceUpdatedAt: article.updatedAt, ...metadata,
  };
  return next;
}
