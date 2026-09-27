import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';
import OpenAI from 'openai';

const SOURCE_MANIFEST = resolve('content/source/manifest.json');
const ZH_ROOT = resolve('content/zh');
const ZH_MANIFEST = resolve(ZH_ROOT, 'manifest.json');
const ZH_INDEX = resolve(ZH_ROOT, 'index.json');
const GLOSSARY_PATH = resolve('content/glossary.json');
const dryRun = process.argv.includes('--dry-run');
const force = process.argv.includes('--force');
const valueAfter = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};
const limit = Number(valueAfter('--limit') ?? 0);
const selectedRoute = valueAfter('--route');

function sha256(value) { return createHash('sha256').update(value).digest('hex'); }
function extractCode(markdown) {
  const fenced = [...markdown.matchAll(/```[^\n]*\n[\s\S]*?```|~~~[^\n]*\n[\s\S]*?~~~/g)].map((match) => match[0]);
  const inline = [...markdown.matchAll(/(?<!`)`[^`\n]+`(?!`)/g)].map((match) => match[0]);
  return { fenced, inline };
}
function extractUrls(markdown) { return [...markdown.matchAll(/https?:\/\/[^\s)>"']+/g)].map((match) => match[0]).sort((a, b) => a.localeCompare(b)); }
function arraysEqual(a, b) { return a.length === b.length && a.every((value, index) => value === b[index]); }

function splitMarkdown(markdown, maxChars = 24000) {
  const lines = markdown.split('\n');
  const chunks = [];
  let current = [];
  let inFence = false;
  for (const line of lines) {
    if (/^(```|~~~)/.test(line)) inFence = !inFence;
    const boundary = !inFence && /^#{1,2}\s/.test(line) && current.join('\n').length > maxChars / 2;
    if (boundary || current.join('\n').length + line.length + 1 > maxChars) {
      chunks.push(current.join('\n'));
      current = [];
    }
    current.push(line);
  }
  if (current.length) chunks.push(current.join('\n'));
  return chunks.filter((chunk) => chunk.trim());
}

async function atomicWrite(path, value) {
  await mkdir(dirname(path), { recursive: true });
  const temp = `${path}.tmp`;
  await writeFile(temp, value, 'utf8');
  await rename(temp, path);
}

async function readJson(path, fallback) {
  try { return JSON.parse(await readFile(path, 'utf8')); }
  catch { return fallback; }
}

function outputPathFor(sourcePath) {
  const relativeSource = relative(resolve('content/source'), resolve(sourcePath));
  const target = resolve(ZH_ROOT, relativeSource);
  if (!target.startsWith(`${ZH_ROOT}${sep}`) && target !== ZH_ROOT) throw new Error(`Unsafe translation path: ${sourcePath}`);
  return target;
}

const sourceManifest = await readJson(SOURCE_MANIFEST, { pages: [] });
const zhManifest = await readJson(ZH_MANIFEST, { pages: [] });
const glossary = await readJson(GLOSSARY_PATH, {});
const previousByRoute = new Map(zhManifest.pages.map((page) => [page.route, page]));

let pending = sourceManifest.pages.filter((page) => page.status === 'downloaded' && page.sourcePath);
if (selectedRoute) pending = pending.filter((page) => page.route === selectedRoute);
pending = pending.filter((page) => force || previousByRoute.get(page.route)?.sourceHash !== page.sourceHash);
if (limit > 0) pending = pending.slice(0, limit);

console.log(JSON.stringify({ downloaded: sourceManifest.pages.filter((page) => page.status === 'downloaded').length, pending: pending.length, model: process.env.AIHERO_TRANSLATION_MODEL ?? null, dryRun }, null, 2));
if (dryRun || pending.length === 0) process.exit(0);

if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is required. Provide it through the environment; never write it to this repository.');
if (!process.env.AIHERO_TRANSLATION_MODEL) throw new Error('AIHERO_TRANSLATION_MODEL is required so a bulk translation model is never selected implicitly.');

const client = new OpenAI();
const translatedPages = [];
for (const [pageIndex, page] of pending.entries()) {
  const source = await readFile(resolve(page.sourcePath), 'utf8');
  const chunks = splitMarkdown(source);
  const translatedChunks = [];

  for (const [chunkIndex, chunk] of chunks.entries()) {
    const response = await client.responses.create({
      model: process.env.AIHERO_TRANSLATION_MODEL,
      store: false,
      input: [
        {
          role: 'developer',
          content: `Translate AI engineering educational Markdown from English to Simplified Chinese. Return only translated Markdown, without an outer code fence. Preserve structure, frontmatter keys, heading levels, fenced and inline code byte-for-byte, URLs, filenames, commands, API names, product names, skill names, and identifiers. Translate prose faithfully and naturally. Add the English term in parentheses only where the glossary explicitly does so. Do not summarize, omit, expand, or add commentary. Glossary:\n${JSON.stringify(glossary, null, 2)}`,
        },
        {
          role: 'user',
          content: `Page: ${page.route}\nChunk ${chunkIndex + 1} of ${chunks.length}\n\n${chunk}`,
        },
      ],
    });
    if (!response.output_text?.trim()) throw new Error(`Empty translation for ${page.route} chunk ${chunkIndex + 1}`);
    translatedChunks.push(response.output_text.trim());
  }

  const translated = `${translatedChunks.join('\n\n')}\n`;
  const sourceCode = extractCode(source);
  const translatedCode = extractCode(translated);
  if (!arraysEqual(sourceCode.fenced, translatedCode.fenced) || !arraysEqual(sourceCode.inline, translatedCode.inline)) {
    throw new Error(`Code preservation check failed for ${page.route}; translation was not written.`);
  }
  if (!arraysEqual(extractUrls(source), extractUrls(translated))) {
    throw new Error(`URL preservation check failed for ${page.route}; translation was not written.`);
  }

  const outputPath = outputPathFor(page.sourcePath);
  await atomicWrite(outputPath, translated);
  translatedPages.push({
    route: page.route,
    sourceUrl: page.url,
    sourceHash: page.sourceHash,
    translationHash: sha256(translated),
    translationPath: relative(resolve('.'), outputPath).replaceAll('\\', '/'),
    model: process.env.AIHERO_TRANSLATION_MODEL,
    translatedAt: new Date().toISOString(),
    status: 'translated',
  });
  console.log(`[${pageIndex + 1}/${pending.length}] translated ${page.route}`);
}

const updatedRoutes = new Set(translatedPages.map((page) => page.route));
const merged = [...zhManifest.pages.filter((page) => !updatedRoutes.has(page.route)), ...translatedPages].sort((a, b) => a.route.localeCompare(b.route));
const sitePages = {};
for (const page of merged.filter((entry) => entry.status === 'translated')) {
  const markdown = await readFile(resolve(page.translationPath), 'utf8');
  const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.replace(/[*_`]/g, '') ?? page.route.split('/').filter(Boolean).at(-1) ?? 'AI Hero';
  sitePages[page.route] = { title, markdown, sourceUrl: page.sourceUrl, sourceHash: page.sourceHash, translatedAt: page.translatedAt };
}

const generatedAt = new Date().toISOString();
await atomicWrite(ZH_MANIFEST, `${JSON.stringify({ version: 1, generatedAt, pages: merged }, null, 2)}\n`);
await atomicWrite(ZH_INDEX, `${JSON.stringify({ version: 1, generatedAt, pages: sitePages }, null, 2)}\n`);
console.log(JSON.stringify({ translatedNow: translatedPages.length, renderablePages: Object.keys(sitePages).length }, null, 2));
