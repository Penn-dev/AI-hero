import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const slug = 'a-complete-guide-to-agents-md';
const root = resolve('content/pilots/v2');
const sourcePath = resolve('content/source', `${slug}.md`);
const terraPath = resolve(root, 'terra-medium', `${slug}.md`);
const finalPath = resolve(root, 'sol-medium', `${slug}.md`);
const outputPath = resolve(root, 'index.json');

function splitFrontmatter(markdown) {
  if (!markdown.startsWith('---')) return { attributes: {}, body: markdown };
  const end = markdown.indexOf('\n---', 3);
  if (end < 0) return { attributes: {}, body: markdown };
  const raw = markdown.slice(3, end);
  const attributes = Object.fromEntries(
    raw
      .split('\n')
      .map((line) => line.match(/^([A-Za-z][\w-]*):\s*["']?(.*?)["']?\s*$/))
      .filter(Boolean)
      .map((match) => [match[1], match[2]]),
  );
  return { attributes, body: markdown.slice(end + 4).trimStart() };
}

function sections(markdown) {
  const lines = markdown.split('\n');
  const result = [];
  let current = { heading: '开篇', markdown: [] };
  let inFence = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (!inFence && /^##\s+/.test(line)) {
      result.push({ heading: current.heading, markdown: current.markdown.join('\n').trim() });
      current = { heading: line.replace(/^##\s+/, ''), markdown: [line] };
    } else {
      current.markdown.push(line);
    }
  }
  result.push({ heading: current.heading, markdown: current.markdown.join('\n').trim() });
  return result.filter((section) => section.markdown);
}

async function optionalPage(path) {
  try {
    const raw = await readFile(path, 'utf8');
    const parsed = splitFrontmatter(raw);
    return {
      title: parsed.attributes.title ?? slug,
      description: parsed.attributes.description ?? '',
      sourceUpdatedAt: parsed.attributes.updatedAt ?? '',
      markdown: parsed.body,
      sections: sections(parsed.body),
    };
  } catch (error) {
    if (error?.code === 'ENOENT') return null;
    throw error;
  }
}

const source = await optionalPage(sourcePath);
const terra = await optionalPage(terraPath);
const final = await optionalPage(finalPath);
const generatedAt = new Date().toISOString();

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  `${JSON.stringify({
    version: 1,
    generatedAt,
    sourceUrl: 'https://www.aihero.dev/a-complete-guide-to-agents-md',
    sourceHash: 'eea031fa3bb5804320bd25fcd0b89035ef503b2afeb1c69aeade63e1d05b5ee5',
    source,
    terra,
    final,
  }, null, 2)}\n`,
  'utf8',
);

console.log(JSON.stringify({ outputPath, hasTerra: Boolean(terra), hasFinal: Boolean(final) }, null, 2));
