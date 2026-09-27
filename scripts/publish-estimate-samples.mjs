import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const sampleManifest = JSON.parse(await readFile(resolve('content/pilots/estimate/sample-manifest.json'), 'utf8'));
const sourceManifest = JSON.parse(await readFile(resolve('content/source/manifest.json'), 'utf8'));
const slugs = [sampleManifest.currentSample, ...sampleManifest.newSamples];
const generatedAt = new Date().toISOString();
const pages = {};
const manifestPages = [];

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

for (const slug of slugs) {
  const route = `/${slug}`;
  const sourceEntry = sourceManifest.pages.find((page) => page.route === route);
  if (!sourceEntry?.sourcePath) throw new Error(`Source manifest entry missing for ${route}`);
  const source = await readFile(resolve(sourceEntry.sourcePath), 'utf8');
  const pilotPath = slug === sampleManifest.currentSample
    ? resolve('content/pilots/v2/sol-medium', `${slug}.md`)
    : resolve('content/pilots/estimate/sol-medium', `${slug}.md`);
  const translation = await readFile(pilotPath, 'utf8');
  const parsed = splitFrontmatter(translation);
  const translationPath = resolve('content/zh', `${slug}.md`);
  await mkdir(dirname(translationPath), { recursive: true });
  await writeFile(translationPath, translation, 'utf8');
  const visibleChars = parsed.body.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '').length;
  pages[route] = {
    title: parsed.attributes.title || slug,
    description: parsed.attributes.description || '',
    markdown: parsed.body,
    sourceUrl: sourceEntry.url,
    sourceHash: sha256(source),
    sourceUpdatedAt: parsed.attributes.updatedAt || sourceEntry.lastmod,
    translatedAt: generatedAt,
    readingTime: `${Math.max(1, Math.ceil(visibleChars / 500))} 分钟`,
  };
  manifestPages.push({
    route,
    sourceUrl: sourceEntry.url,
    sourceHash: sha256(source),
    translationPath: `content/zh/${slug}.md`,
    translationHash: sha256(translation),
    status: 'translated-estimate-sample',
    translatedAt: generatedAt,
    workflow: sampleManifest.workflow,
  });
}

await writeFile(resolve('content/zh/index.json'), `${JSON.stringify({ version: 1, generatedAt, pages }, null, 2)}\n`, 'utf8');
await writeFile(resolve('content/zh/manifest.json'), `${JSON.stringify({ version: 1, generatedAt, pages: manifestPages }, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ published: slugs.length, routes: Object.keys(pages) }, null, 2));
