import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

// Compile the real TSX components with the same next/link shim used by vinext.
const root = fileURLToPath(new URL('../', import.meta.url));
const server = await createServer({
  root, configFile: false, appType: 'custom',
  resolve: { alias: { '@': root, 'next/link': fileURLToPath(import.meta.resolve('vinext/shims/link')) } },
  server: { middlewareMode: true, hmr: false, watch: null },
});
after(() => server.close());
const { LocalizedArticle } = await server.ssrLoadModule('/components/localized-article.tsx');
const { LocalizedMarkdown } = await server.ssrLoadModule('/components/localized-markdown.tsx');

void test('workshop text prompts are not labelled as original code', () => {
  const markdown = ['中文版 Prompt（译注）：', '```text\n请写出一个故事。\n```', '```typescript\nconst value = 1;\n```', '```typescript\nconst factsResult = TODO;\n```'].join('\n\n');
  const html = renderToStaticMarkup(createElement(LocalizedMarkdown, { markdown, exercise: true }));
  const frames = html.match(/<figure\b[^>]*>[\s\S]*?<\/figure>/g);
  assert.match(frames[0], /<figcaption><span>文本片段<\/span>/);
  assert.ok(!frames[0].includes('原文代码片段'));
  assert.match(frames[1], /<figcaption><span>原文代码片段<\/span>/);
  assert.match(frames[2], /<figcaption><span>待你完成的片段<\/span>/);
});

const sourceUrl = 'https://www.aihero.dev/a-complete-guide-to-agents-md';
const conceptRoute = '/ai-coding-dictionary/agent';
const props = {
  title: '带独立术语表的中文页', sourceUrl, sourceHash: 'a'.repeat(64),
  markdown: `## 正文\n\n[智能体](${conceptRoute})、[Zod](https://zod.dev)、[API 文档](https://ai-sdk.dev/docs/introduction)、[尚未接入的课程](/workshops/not-yet-assembled)。`,
  learning: {
    kind: 'guide', sourceIds: [], conceptIds: [], prerequisiteIds: [],
    glossary: [
      { id: 'term-agent', term: '智能体', definition: '能够使用工具完成任务的系统。', aliases: [] },
      { id: 'term-zod', term: 'Zod', definition: '用于校验数据结构的库。', aliases: [] },
    ],
    start: { title: '开始前', cards: [] },
    related: [
      { title: '资源延伸', description: '保留外部入口', href: 'https://example.com/resource', format: '原资源' },
      { title: '概念延伸', description: '继续阅读', href: conceptRoute, format: '中文词条' },
    ],
  },
};

void test('public articles with an independent glossary retain original resources and Chinese term controls', () => {
  const html = renderToStaticMarkup(createElement(LocalizedArticle, props));
  const anchors = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) ?? [];
  assert.equal(anchors.filter(anchor => anchor.includes(`href="${sourceUrl}"`)).length, 3, 'header, navigation and footer retain the English source');
  for (const href of ['https://zod.dev', 'https://ai-sdk.dev/docs/introduction', 'https://www.aihero.dev/workshops/not-yet-assembled', 'https://example.com/resource']) {
    assert.ok(anchors.some(anchor => anchor.includes(`href="${href}"`) && anchor.includes('target="_blank"')), `resource remains clickable: ${href}`);
  }
  assert.match(html, /<button[^>]*class="glossary-term"[^>]*data-glossary-id="term-agent"[^>]*>智能体<\/button>/);
  assert.match(html, /<button[^>]*class="glossary-term"[^>]*data-glossary-id="term-zod"[^>]*>Zod<\/button>/);
  assert.ok(anchors.some(anchor => anchor.includes('class="term-source-link"') && anchor.includes(`href="${conceptRoute}"`) && !anchor.includes('target=')), 'Chinese concept keeps its existing local source control');
  assert.ok(anchors.some(anchor => anchor.includes('概念延伸') && anchor.includes(`href="${conceptRoute}"`) && !anchor.includes('target=')), 'related concepts still resolve to the available Chinese page');
});

void test('explicit historical review keeps Chinese-only links and its term controls', () => {
  const html = renderToStaticMarkup(createElement(LocalizedArticle, { ...props, review: true }));
  for (const href of [sourceUrl, 'https://zod.dev', 'https://ai-sdk.dev/docs/introduction', 'https://example.com/resource']) {
    assert.ok(!html.includes(`href="${href}"`));
  }
  assert.ok(html.includes(`href="${conceptRoute}"`));
  assert.match(html, /<button[^>]*data-glossary-id="term-zod"[^>]*>Zod<\/button>/);
});

void test('explicit original-site URLs stay external while root paths prefer Chinese pages or fall back to English', () => {
  const html = renderToStaticMarkup(createElement(LocalizedArticle, {
    ...props,
    markdown: `## 原资源\n\n[原站订阅](${sourceUrl})、[中文同页](/a-complete-guide-to-agents-md)、[未制作课程](/workshops/not-yet-assembled)。`,
    relatedReading: [
      { title: '原站页面', description: '保留原入口', href: sourceUrl, format: '原站' },
      { title: '中文词条', description: '阅读中文', href: conceptRoute, format: '词条' },
    ],
  }));
  const anchors = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) ?? [];
  for (const label of ['原站订阅', '原站页面']) {
    assert.ok(anchors.some(anchor => anchor.includes(label) && anchor.includes(`href="${sourceUrl}"`) && anchor.includes('target="_blank"')), `${label} retains the explicit original URL`);
  }
  for (const [label, route] of [['中文同页', '/a-complete-guide-to-agents-md'], ['中文词条', conceptRoute]]) {
    assert.ok(anchors.some(anchor => anchor.includes(label) && anchor.includes(`href="${route}"`) && !anchor.includes('target=')), `${label} stays local`);
  }
  assert.ok(anchors.some(anchor => anchor.includes('未制作课程') && anchor.includes('href="https://www.aihero.dev/workshops/not-yet-assembled"') && anchor.includes('target="_blank"')));
});
