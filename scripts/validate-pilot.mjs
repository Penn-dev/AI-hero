import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const sourcePath = resolve('content/source/a-complete-guide-to-agents-md.md');
const candidatePath = resolve(process.argv[2] ?? 'content/pilots/v2/sol-medium/a-complete-guide-to-agents-md.md');

const source = await readFile(sourcePath, 'utf8');
const candidate = await readFile(candidatePath, 'utf8');

function fencedCode(markdown) {
  return [...markdown.matchAll(/^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```[ \t]*$/gm)].map((match) => match[0]);
}

function inlineCode(markdown) {
  const withoutFences = markdown.replace(/^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```[ \t]*$/gm, '');
  return [...withoutFences.matchAll(/(?<!`)`([^`\n]+)`(?!`)/g)].map((match) => match[1]);
}

function containsSequence(actual, expected) {
  let position = 0;
  for (const value of actual) {
    if (value === expected[position]) position += 1;
  }
  return position === expected.length;
}

function urls(markdown) {
  return [...markdown.matchAll(/https?:\/\/[^\s)>\]"']+/g)].map((match) => match[0]);
}

function headings(markdown) {
  return [...markdown.matchAll(/^(#{1,6})\s+/gm)].map((match) => match[1].length);
}

function sections(markdown) {
  const result = [];
  let current = [];
  let inFence = false;
  for (const line of markdown.split('\n')) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (!inFence && /^##\s+/.test(line)) {
      if (current.length) result.push(current.join('\n'));
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length) result.push(current.join('\n'));
  return result;
}

function tables(markdown) {
  return [...markdown.matchAll(/^\|.+\|\r?\n\|(?:\s*:?-+:?\s*\|)+/gm)].length;
}

function details(markdown) {
  return [...markdown.matchAll(/<details>[\s\S]*?<summary>[\s\S]*?<\/summary>[\s\S]*?<\/details>/g)].length;
}

function mdxComponents(markdown) {
  return [...markdown.matchAll(/<([A-Z][A-Za-z0-9]*)\b([\s\S]*?)\/>/g)].map((match) => ({
    name: match[1],
    structuralAttributes: [...match[2].matchAll(/\b([A-Za-z][A-Za-z0-9]*)=/g)]
      .map((attribute) => attribute[1])
      .sort(),
  }));
}

function frontmatter(markdown) {
  const block = markdown.startsWith('---') ? markdown.split('---', 3)[1] : '';
  return Object.fromEntries(
    block
      .split('\n')
      .map((line) => line.match(/^([A-Za-z][\w-]*):\s*(.*)$/))
      .filter(Boolean)
      .map((match) => [match[1], match[2]]),
  );
}

const checks = [];
function check(name, actual, expected) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  checks.push({ name, passed });
  if (!passed) console.error(`FAIL ${name}`);
}

check('fenced code preserved', fencedCode(candidate), fencedCode(source));
checks.push({
  name: 'source inline code preserved in order',
  passed: containsSequence(inlineCode(candidate), inlineCode(source)),
});
checks.push({
  name: 'source URLs preserved in order',
  passed: containsSequence(urls(candidate), urls(source)),
});
const candidateMain = candidate.split('\n## 中文学习辅助：术语小词典')[0];
check('main heading levels preserved', headings(candidateMain), headings(source));
check('table count preserved', tables(candidateMain), tables(source));
check('details blocks preserved', details(candidateMain), details(source));
checks.push({
  name: 'promotional MDX removed from localized copy',
  passed: mdxComponents(candidate).every((component) => !['SkillsCta', 'SkillsNewsletterCta'].includes(component.name)),
});

const sourceSections = sections(source);
const candidateSections = sections(candidateMain);
check('main section count preserved', candidateSections.length, sourceSections.length);
checks.push({
  name: 'each translated section has substantial content',
  passed: sourceSections.every((section, index) => {
    const candidateSection = candidateSections[index] ?? '';
    return candidateSection.length >= Math.max(80, section.length * 0.35);
  }),
});

const sourceFrontmatter = frontmatter(source);
const candidateFrontmatter = frontmatter(candidate);
for (const key of ['slug', 'type', 'tags', 'updatedAt']) {
  check(`frontmatter ${key} preserved`, candidateFrontmatter[key], sourceFrontmatter[key]);
}

const requiredLearningSections = [
  '术语小词典',
  '中文理解版（学习辅助）',
  '**Prompt**：',
  '**monorepo**：',
  '**React**：',
  '**TypeScript**：',
  '**Node.js**：',
  'https://www.aihero.dev/ai-coding-dictionary/system-prompt',
  'https://www.aihero.dev/ai-coding-dictionary/progressive-disclosure',
  '上面四条分别表示',
];
for (const section of requiredLearningSections) {
  checks.push({ name: `contains ${section}`, passed: candidate.includes(section) });
}

const failed = checks.filter((item) => !item.passed);
console.log(JSON.stringify({ candidate: candidatePath, checks, failed: failed.length }, null, 2));
if (failed.length) process.exitCode = 1;
