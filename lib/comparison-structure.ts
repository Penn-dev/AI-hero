import { plainHeading } from '@/lib/article-structure';

export type ComparisonChunk = {
  heading: string;
  markdown: string;
};

export function comparisonChunks(markdown: string | undefined, fallbackHeading: string): ComparisonChunk[] {
  if (!markdown) return [];
  const lines = markdown.trim().split(/\r?\n/);
  if (/^##\s+/.test(lines[0] ?? '')) lines.shift();

  const chunks: ComparisonChunk[] = [];
  let heading = fallbackHeading;
  let body: string[] = [];
  const flush = () => {
    const content = body.join('\n').trim();
    if (content) chunks.push({ heading: plainHeading(heading), markdown: content });
    body = [];
  };

  for (const line of lines) {
    const match = line.match(/^#{3,4}\s+(.+)$/);
    if (match) {
      flush();
      heading = match[1];
    } else {
      body.push(line);
    }
  }
  flush();
  return chunks.length ? chunks : [{ heading: plainHeading(fallbackHeading), markdown: '' }];
}
