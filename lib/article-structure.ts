import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

export type ArticleSection = { id: string; label: string; level: 2 | 3 };
export type GlossaryEntry = { id: string; term: string; definition: string; aliases?: string[] };
type ContentNode = {
  type: string;
  value?: string;
  depth?: number;
  url?: string;
  children?: ContentNode[];
  position?: { start: { offset?: number }; end: { offset?: number } };
};
// Use the renderer's Markdown dialect: code fences are not headings.
const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMdx);
function parse(markdown: string): ContentNode { return parser.parse(markdown); }
function nodeText(node: ContentNode): string { return node.value ?? (node.children ?? []).map(nodeText).join(''); }

export function plainHeading(value: string) {
  return value.replace(/`([^`]+)`/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_~]/g, '').trim();
}
export function headingId(value: string) {
  return plainHeading(value).toLocaleLowerCase('zh-CN').replace(/[^\p{Letter}\p{Number}]+/gu, '-').replace(/^-+|-+$/g, '');
}
export function splitGlossary(markdown: string) {
  const marker = parse(markdown).children?.find((node) => node.type === 'heading' && node.depth === 2 && nodeText(node) === '中文学习辅助：术语小词典');
  const offset = marker?.position?.start.offset;
  if (offset === undefined) return { articleMarkdown: markdown, glossaryMarkdown: '' };
  return { articleMarkdown: markdown.slice(0, offset).trimEnd(), glossaryMarkdown: markdown.slice(offset).trim() };
}
function linkedId(node: ContentNode): string | undefined {
  if (node.type === 'link' && node.url?.startsWith('#')) return node.url.slice(1);
  for (const child of node.children ?? []) { const id = linkedId(child); if (id) return id; }
}
export function articleSections(markdown: string): ArticleSection[] {
  const counts = new Map<string, number>();
  const sections: ArticleSection[] = [];
  function visit(node: ContentNode) {
    if (node.type === 'heading' && node.depth && node.depth >= 2 && node.depth <= 4) {
      const label = nodeText(node);
      const baseId = linkedId(node) || headingId(label);
      const count = (counts.get(baseId) ?? 0) + 1;
      counts.set(baseId, count);
      if (node.depth <= 3) sections.push({ id: count === 1 ? baseId : `${baseId}-${count}`, label, level: node.depth as 2 | 3 });
    }
    node.children?.forEach(visit);
  }
  visit(parse(markdown));
  return sections;
}
export function glossaryEntries(markdown: string): GlossaryEntry[] {
  const entries: GlossaryEntry[] = [];
  for (const list of parse(markdown).children ?? []) {
    if (list.type !== 'list') continue;
    for (const item of list.children ?? []) {
      const value = (item.children ?? []).map(nodeText).join(' ').trim();
      const match = value.match(/^(.+?)[：:]\s*(.+)$/);
      if (!match) throw new Error(`术语条目缺少名称或解释：${value}`);
      entries.push({ id: `term-${headingId(match[1])}`, term: match[1].trim(), definition: match[2].trim() });
    }
  }
  return entries;
}
export function prepareArticle(markdown: string, title: string) {
  const nodes = parse(markdown).children ?? [];
  const removals: ContentNode[] = [];
  const emptySections: string[] = [];
  const first = nodes[0];
  if (first?.type === 'heading' && first.depth === 1 && nodeText(first).trim() === title.trim()) removals.push(first);
  nodes.forEach((node, index) => {
    // Disclose an empty source transcript rather than inventing its contents.
    if (node.type === 'heading' && /^(视频文字稿|Video Transcript)$/i.test(nodeText(node)) && index === nodes.length - 1) {
      removals.push(node);
      emptySections.push(nodeText(node));
    }
  });
  let body = markdown;
  for (const node of removals.reverse()) {
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    if (start !== undefined && end !== undefined) body = body.slice(0, start) + body.slice(end);
  }
  return { markdown: body.trim(), emptySections };
}
export function firstGlossaryMatch(text: string, entries: GlossaryEntry[], seen: Set<string>) {
  const matches: { entry: GlossaryEntry; index: number; text: string }[] = [];
  for (const entry of entries) {
    for (const alias of new Set([entry.term, ...(entry.aliases ?? [])])) {
      if (!alias) continue;
      const haystack = text.toLowerCase();
      const needle = alias.toLowerCase();
      let index = haystack.indexOf(needle);
      while (index >= 0) {
        const before = text[index - 1] ?? '';
        const after = text[index + alias.length] ?? '';
        const insideWord = (/[a-z0-9_]/i.test(alias[0]) && /[a-z0-9_]/i.test(before)) || (/[a-z0-9_]/i.test(alias.at(-1) ?? '') && /[a-z0-9_]/i.test(after));
        if (!insideWord) matches.push({ entry, index, text: text.slice(index, index + alias.length) });
        index = haystack.indexOf(needle, index + 1);
      }
    }
  }
  let end = 0;
  for (const match of matches.sort((a, b) => a.index - b.index || b.text.length - a.text.length)) {
    if (match.index < end) continue;
    end = match.index + match.text.length;
    // A repeated long term still protects its span from a shorter alias.
    if (!seen.has(match.entry.id)) return match;
  }
}
