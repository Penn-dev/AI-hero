import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const stage = process.argv[2] || 'terra-medium';
const manifest = JSON.parse(await readFile(resolve('content/pilots/estimate-special/sample-manifest.json'), 'utf8'));
const requestedRoutes = process.argv.slice(3);
const samples = requestedRoutes.length
  ? manifest.samples.filter((sample) => requestedRoutes.includes(sample.route))
  : manifest.samples;

function fences(markdown) {
  return [...markdown.matchAll(/^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```[ \t]*$/gm)].map((match) => match[0]);
}
function withoutFences(markdown) {
  return markdown.replace(/^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```[ \t]*$/gm, '');
}
function inlineCode(markdown) {
  return [...withoutFences(markdown).matchAll(/(?<!`)`([^`\n]+)`(?!`)/g)].map((match) => match[1]);
}
function urls(markdown) {
  return [...markdown.matchAll(/https?:\/\/[^\s)>\]"']+/g)].map((match) => match[0]);
}
function headingLevels(markdown) {
  return [...markdown.matchAll(/^(#{1,6})\s+/gm)].map((match) => match[1].length);
}
function containsSequence(actual, expected) {
  let index = 0;
  for (const value of actual) if (value === expected[index]) index += 1;
  return index === expected.length;
}
function frontmatter(markdown) {
  const end = markdown.indexOf('\n---', 3);
  if (!markdown.startsWith('---') || end < 0) return {};
  const lines = markdown.slice(3, end).split('\n');
  const result = {};
  let key = null;
  for (const line of lines) {
    const match = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (match) {
      key = match[1];
      result[key] = match[2];
    } else if (key && /^\s+-\s+/.test(line)) result[key] += `\n${line}`;
  }
  return result;
}
function mainTranslation(markdown) {
  return markdown.split(/\n##\s+中文学习辅助：术语小词典/)[0];
}

const reports = [];
for (const sample of samples) {
  const relative = sample.sourcePath.replace(/^content\/source\//, '');
  const candidatePath = resolve('content/pilots/estimate-special', stage, relative);
  const [source, candidate] = await Promise.all([
    readFile(resolve(sample.sourcePath), 'utf8'),
    readFile(candidatePath, 'utf8'),
  ]);
  const main = mainTranslation(candidate);
  const sourceFm = frontmatter(source);
  const candidateFm = frontmatter(candidate);
  const checks = {
    'frontmatter present': Object.keys(candidateFm).length > 0,
    'slug preserved': candidateFm.slug === sourceFm.slug,
    'type preserved': candidateFm.type === sourceFm.type,
    'updatedAt preserved': candidateFm.updatedAt === sourceFm.updatedAt,
    'fenced code byte-identical': JSON.stringify(fences(candidate)) === JSON.stringify(fences(source)),
    'inline code preserved in order': containsSequence(inlineCode(candidate), inlineCode(source)),
    'URLs preserved in order': containsSequence(urls(candidate), urls(source)),
    'heading levels preserved': JSON.stringify(headingLevels(main)) === JSON.stringify(headingLevels(source)),
    'glossary present': /##\s+中文学习辅助：术语小词典/.test(candidate),
    'no promotional MDX': !/<Skills(?:Cta|NewsletterCta)\b/.test(candidate),
    'substantial output': candidate.length >= Math.max(400, source.length * 0.35),
  };
  const failed = Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name);
  reports.push({ route: sample.route, kind: sample.kind, sourceChars: source.length, candidateChars: candidate.length, checks, failed });
}

const failed = reports.filter((report) => report.failed.length);
console.log(JSON.stringify({ stage, samples: reports, failedSamples: failed.length }, null, 2));
if (failed.length) process.exitCode = 1;
