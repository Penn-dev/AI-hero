import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const manifest = JSON.parse(await readFile(resolve('content/source/manifest.json'), 'utf8'));
const pages = manifest.pages.filter((page) => page.status === 'downloaded');

function category(route) {
  if (route === '/') return 'home';
  if (route.startsWith('/ai-coding-dictionary')) return 'dictionary';
  if (route.startsWith('/skills/skills-changelog-')) return 'skill-changelog';
  if (route.startsWith('/workshops/')) return 'workshop';
  return 'article';
}

function pack(items, { maxChars, maxPages }) {
  const bins = [];
  for (const item of [...items].sort((a, b) => b.sourceLength - a.sourceLength)) {
    let bin = bins.find((candidate) => candidate.pages.length < maxPages && candidate.sourceChars + item.sourceLength <= maxChars);
    if (!bin) {
      bin = { pages: [], sourceChars: 0 };
      bins.push(bin);
    }
    bin.pages.push({ route: item.route, sourcePath: item.sourcePath, sourceChars: item.sourceLength });
    bin.sourceChars += item.sourceLength;
  }
  return bins;
}

const groups = Object.groupBy(pages, (page) => category(page.route));
const batches = [
  ...pack(groups.article || [], { maxChars: 14_000, maxPages: 3 }).map((batch) => ({ category: 'article', ...batch })),
  ...pack(groups.dictionary || [], { maxChars: 18_000, maxPages: 8 }).map((batch) => ({ category: 'dictionary', ...batch })),
  ...(groups['skill-changelog'] || []).map((page) => ({ category: 'skill-changelog', sourceChars: page.sourceLength, pages: [{ route: page.route, sourcePath: page.sourcePath, sourceChars: page.sourceLength }] })),
  ...(groups.workshop || []).map((page) => ({ category: 'workshop', sourceChars: page.sourceLength, pages: [{ route: page.route, sourcePath: page.sourcePath, sourceChars: page.sourceLength }] })),
  ...(groups.home || []).map((page) => ({ category: 'home', sourceChars: page.sourceLength, pages: [{ route: page.route, sourcePath: page.sourcePath, sourceChars: page.sourceLength }] })),
].map((batch, index) => ({ id: `batch-${String(index + 1).padStart(3, '0')}`, ...batch }));

const report = {
  generatedAt: new Date().toISOString(),
  policy: {
    concurrency: 6,
    agentContext: 'fresh context; never fork the orchestration thread',
    article: 'up to 14,000 source characters and 3 pages',
    dictionary: 'up to 18,000 source characters and 8 entries',
    special: 'one changelog, workshop, or home page per task',
    stages: ['Terra/medium initial translation', 'Sol/medium editorial review'],
  },
  totals: {
    pages: pages.length,
    sourceChars: pages.reduce((sum, page) => sum + page.sourceLength, 0),
    batchesPerStage: batches.length,
    agentTasksBothStages: batches.length * 2,
  },
  batches,
};

await writeFile(resolve('reports/translation-batch-plan.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ totals: report.totals, byCategory: Object.entries(Object.groupBy(batches, (batch) => batch.category)).map(([name, items]) => ({ category: name, batches: items.length, pages: items.reduce((sum, item) => sum + item.pages.length, 0) })) }, null, 2));
