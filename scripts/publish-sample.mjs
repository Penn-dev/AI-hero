import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const route = '/a-complete-guide-to-agents-md';
const sourceUrl = 'https://www.aihero.dev/a-complete-guide-to-agents-md';
const sourcePath = resolve('content/source/a-complete-guide-to-agents-md.md');
const pilotPath = resolve('content/pilots/v2/sol-medium/a-complete-guide-to-agents-md.md');
const translationPath = resolve('content/zh/a-complete-guide-to-agents-md.md');
const indexPath = resolve('content/zh/index.json');
const manifestPath = resolve('content/zh/manifest.json');

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function splitFrontmatter(markdown) {
  if (!markdown.startsWith('---')) throw new Error('Translated sample is missing frontmatter');
  const end = markdown.indexOf('\n---', 3);
  if (end < 0) throw new Error('Translated sample has invalid frontmatter');
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

const [source, translation] = await Promise.all([
  readFile(sourcePath, 'utf8'),
  readFile(pilotPath, 'utf8'),
]);
const parsed = splitFrontmatter(translation);
const generatedAt = new Date().toISOString();
const sourceHash = sha256(source);
const translationHash = sha256(translation);

await mkdir(dirname(translationPath), { recursive: true });
await writeFile(translationPath, translation, 'utf8');
await writeFile(
  indexPath,
  `${JSON.stringify({
    version: 1,
    generatedAt,
    pages: {
      [route]: {
        title: parsed.attributes.title,
        description: parsed.attributes.description,
        markdown: parsed.body,
        sourceUrl,
        sourceHash,
        sourceUpdatedAt: parsed.attributes.updatedAt,
        translatedAt: generatedAt,
      },
    },
  }, null, 2)}\n`,
  'utf8',
);
await writeFile(
  manifestPath,
  `${JSON.stringify({
    version: 1,
    generatedAt,
    pages: [{
      route,
      sourceUrl,
      sourceHash,
      translationPath: 'content/zh/a-complete-guide-to-agents-md.md',
      translationHash,
      status: 'translated',
      translatedAt: generatedAt,
      workflow: 'Terra/medium initial translation; Sol/medium editorial review',
    }],
  }, null, 2)}\n`,
  'utf8',
);

console.log(JSON.stringify({ route, translationPath, indexPath, manifestPath }, null, 2));
