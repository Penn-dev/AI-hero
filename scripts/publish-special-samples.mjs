import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const manifest = JSON.parse(await readFile(resolve('content/pilots/estimate-special/sample-manifest.json'), 'utf8'));
const sourceManifest = JSON.parse(await readFile(resolve('content/source/manifest.json'), 'utf8'));
const indexPath = resolve('content/zh/index.json');
const zhManifestPath = resolve('content/zh/manifest.json');
const index = JSON.parse(await readFile(indexPath, 'utf8'));
const zhManifest = JSON.parse(await readFile(zhManifestPath, 'utf8'));
const generatedAt = new Date().toISOString();

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}
function splitFrontmatter(markdown) {
  if (!markdown.startsWith('---')) throw new Error('Translation is missing frontmatter');
  const end = markdown.indexOf('\n---', 3);
  if (end < 0) throw new Error('Translation has invalid frontmatter');
  const raw = markdown.slice(3, end);
  const attributes = {};
  for (const line of raw.split('\n')) {
    const match = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (match) attributes[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
  return { attributes, body: markdown.slice(end + 4).trimStart() };
}

for (const sample of manifest.samples) {
  const sourceEntry = sourceManifest.pages.find((page) => page.route === sample.route);
  if (!sourceEntry?.sourcePath) throw new Error(`Source manifest entry missing for ${sample.route}`);
  const relative = sample.sourcePath.replace(/^content\/source\//, '');
  const source = await readFile(resolve(sample.sourcePath), 'utf8');
  const pilotPath = resolve('content/pilots/estimate-special/sol-medium', relative);
  const translation = await readFile(pilotPath, 'utf8');
  const parsed = splitFrontmatter(translation);
  const translationPath = resolve('content/zh', relative);
  await mkdir(dirname(translationPath), { recursive: true });
  await writeFile(translationPath, translation, 'utf8');
  const visibleChars = parsed.body.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '').length;
  index.pages[sample.route] = {
    title: parsed.attributes.title || parsed.attributes.slug,
    description: parsed.attributes.description || '',
    markdown: parsed.body,
    sourceUrl: sourceEntry.url,
    sourceHash: sha256(source),
    sourceUpdatedAt: parsed.attributes.updatedAt || sourceEntry.lastmod,
    translatedAt: generatedAt,
    readingTime: `${Math.max(1, Math.ceil(visibleChars / 500))} 分钟`,
  };
  const pageRecord = {
    route: sample.route,
    sourceUrl: sourceEntry.url,
    sourceHash: sha256(source),
    translationPath: `content/zh/${relative}`,
    translationHash: sha256(translation),
    status: 'translated-estimate-special-sample',
    translatedAt: generatedAt,
    workflow: manifest.workflow,
  };
  const existingIndex = zhManifest.pages.findIndex((page) => page.route === sample.route);
  if (existingIndex >= 0) zhManifest.pages[existingIndex] = pageRecord;
  else zhManifest.pages.push(pageRecord);
}

index.generatedAt = generatedAt;
zhManifest.generatedAt = generatedAt;
await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
await writeFile(zhManifestPath, `${JSON.stringify(zhManifest, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ published: manifest.samples.length, routes: manifest.samples.map((sample) => sample.route), totalRoutes: Object.keys(index.pages).length }, null, 2));
