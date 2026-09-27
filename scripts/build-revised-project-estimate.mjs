import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const oldEstimate = JSON.parse(await readFile(resolve('reports/full-project-estimate.json'), 'utf8'));
const usage = JSON.parse(await readFile(resolve('reports/special-agent-token-usage.json'), 'utf8'));
const plan = JSON.parse(await readFile(resolve('reports/translation-batch-plan.json'), 'utf8'));
const manifest = JSON.parse(await readFile(resolve('content/pilots/estimate-special/sample-manifest.json'), 'utf8'));

const sourceCharsByKind = {};
for (const sample of manifest.samples) {
  const source = await readFile(resolve(sample.sourcePath), 'utf8');
  sourceCharsByKind[sample.kind] = (sourceCharsByKind[sample.kind] || 0) + source.length;
}

const rowsByKind = Object.groupBy(usage.rows.filter((row) => row.status === 'measured'), (row) => row.kind);
function observed(kind, field) {
  const rows = rowsByKind[kind] || [];
  if (field === 'totalTokens') return rows.reduce((sum, row) => sum + row.usage.input_tokens + row.usage.output_tokens, 0);
  if (field === 'apiUsdEquivalent') return rows.reduce((sum, row) => sum + row.apiUsdEquivalent, 0);
  const usageField = {
    inputTokens: 'input_tokens',
    cachedInputTokens: 'cached_input_tokens',
    outputTokens: 'output_tokens',
    reasoningOutputTokens: 'reasoning_output_tokens',
  }[field];
  return rows.reduce((sum, row) => sum + (row.usage[usageField] || 0), 0);
}
function oldBatchValue(batch, field) {
  const modelField = field === 'totalTokens' ? null : field;
  if (field === 'totalTokens') return oldBatchValue(batch, 'inputTokens') + oldBatchValue(batch, 'outputTokens');
  const model = oldEstimate.regressionModels[modelField];
  return model.intercept + model.perSourceChar * batch.sourceChars;
}
function scaledSpecialValue(category, kind, field) {
  const sampleChars = sourceCharsByKind[kind];
  return plan.batches
    .filter((batch) => batch.category === category)
    .reduce((sum, batch) => sum + observed(kind, field) * batch.sourceChars / sampleChars, 0);
}

const replacedCategories = new Set(['dictionary', 'workshop']);
const unchangedBatches = plan.batches.filter((batch) => !replacedCategories.has(batch.category));
const point = {};
for (const field of ['inputTokens', 'cachedInputTokens', 'outputTokens', 'reasoningOutputTokens', 'apiUsdEquivalent']) {
  const unchanged = unchangedBatches.reduce((sum, batch) => sum + oldBatchValue(batch, field), 0);
  const dictionary = scaledSpecialValue('dictionary', 'dictionary-batch', field);
  const workshop = scaledSpecialValue('workshop', 'workshop-lesson', field);
  point[field] = unchanged + dictionary + workshop;
}
point.totalTokens = point.inputTokens + point.outputTokens;

function range(field) {
  const unchanged = unchangedBatches.reduce((sum, batch) => sum + oldBatchValue(batch, field), 0);
  const dictionary = scaledSpecialValue('dictionary', 'dictionary-batch', field);
  const workshop = scaledSpecialValue('workshop', 'workshop-lesson', field);
  return {
    low: unchanged * 0.75 + dictionary * 0.8 + workshop * 0.65,
    point: unchanged + dictionary + workshop,
    high: unchanged * 1.3 + dictionary * 1.2 + workshop * 1.35,
  };
}

const dictionaryBatches = plan.batches.filter((batch) => batch.category === 'dictionary');
const workshopBatches = plan.batches.filter((batch) => batch.category === 'workshop');
const report = {
  generatedAt: new Date().toISOString(),
  basis: {
    sitePages: plan.totals.pages,
    siteSourceChars: plan.totals.sourceChars,
    previousArticleSamples: oldEstimate.basis.samplePages,
    freshContextSupplement: {
      agentTasks: usage.rows.filter((row) => row.status === 'measured').length,
      dictionaryEntries: manifest.samples.filter((sample) => sample.kind === 'dictionary-batch').length,
      dictionarySourceChars: sourceCharsByKind['dictionary-batch'],
      workshopLessons: manifest.samples.filter((sample) => sample.kind === 'workshop-lesson').length,
      workshopSourceChars: sourceCharsByKind['workshop-lesson'],
    },
    method: 'Keep the prior regression for articles, changelogs, and home. Replace all dictionary and workshop estimates with fresh-context, same-workflow measurements scaled by category source characters.',
    caveat: 'One measured batch per replaced category cannot estimate fixed per-task overhead separately. The range therefore keeps broader uncertainty for workshops and the previous broad range for unchanged categories.',
  },
  observedFreshContextSupplement: usage.totals,
  categoryProjection: {
    dictionary: {
      batches: dictionaryBatches.length,
      pages: dictionaryBatches.reduce((sum, batch) => sum + batch.pages.length, 0),
      sourceChars: dictionaryBatches.reduce((sum, batch) => sum + batch.sourceChars, 0),
      totalTokens: scaledSpecialValue('dictionary', 'dictionary-batch', 'totalTokens'),
      apiUsdEquivalent: scaledSpecialValue('dictionary', 'dictionary-batch', 'apiUsdEquivalent'),
    },
    workshop: {
      batches: workshopBatches.length,
      pages: workshopBatches.reduce((sum, batch) => sum + batch.pages.length, 0),
      sourceChars: workshopBatches.reduce((sum, batch) => sum + batch.sourceChars, 0),
      totalTokens: scaledSpecialValue('workshop', 'workshop-lesson', 'totalTokens'),
      apiUsdEquivalent: scaledSpecialValue('workshop', 'workshop-lesson', 'apiUsdEquivalent'),
    },
  },
  revisedPointEstimate: point,
  planningRange: {
    totalTokens: Object.fromEntries(Object.entries(range('totalTokens')).map(([key, value]) => [key, Math.round(value)])),
    apiUsdEquivalent: range('apiUsdEquivalent'),
  },
  previousEstimate: {
    totalTokens: oldEstimate.optimizedBatchPointEstimate.totalTokens,
    apiUsdEquivalent: oldEstimate.optimizedBatchPointEstimate.apiUsdEquivalent,
  },
  pricingSource: oldEstimate.pricingSource,
};

await writeFile(resolve('reports/revised-full-project-estimate.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
