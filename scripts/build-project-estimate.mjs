import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const usage = JSON.parse(await readFile(resolve('reports/agent-token-usage.json'), 'utf8'));
const batches = JSON.parse(await readFile(resolve('reports/translation-batch-plan.json'), 'utf8'));
const sampleManifest = JSON.parse(await readFile(resolve('content/pilots/estimate/sample-manifest.json'), 'utf8'));
const slugs = [sampleManifest.currentSample, ...sampleManifest.newSamples];

const points = [];
for (const slug of slugs) {
  const source = await readFile(resolve('content/source', `${slug}.md`), 'utf8');
  const rows = usage.rows.filter((row) => row.slug === slug && row.status === 'measured');
  points.push({
    slug,
    sourceChars: source.length,
    inputTokens: rows.reduce((sum, row) => sum + row.usage.input_tokens, 0),
    cachedInputTokens: rows.reduce((sum, row) => sum + row.usage.cached_input_tokens, 0),
    outputTokens: rows.reduce((sum, row) => sum + row.usage.output_tokens, 0),
    reasoningOutputTokens: rows.reduce((sum, row) => sum + (row.usage.reasoning_output_tokens || 0), 0),
    apiUsdEquivalent: rows.reduce((sum, row) => sum + row.apiUsdEquivalent, 0),
    forkedStages: rows.filter((row) => row.forked).map((row) => row.stage),
  });
}

function regression(field) {
  const n = points.length;
  const meanX = points.reduce((sum, point) => sum + point.sourceChars, 0) / n;
  const meanY = points.reduce((sum, point) => sum + point[field], 0) / n;
  const numerator = points.reduce((sum, point) => sum + (point.sourceChars - meanX) * (point[field] - meanY), 0);
  const denominator = points.reduce((sum, point) => sum + (point.sourceChars - meanX) ** 2, 0);
  const slope = numerator / denominator;
  const intercept = Math.max(0, meanY - slope * meanX);
  return { intercept, perSourceChar: Math.max(0, slope) };
}

const models = Object.fromEntries(['inputTokens', 'cachedInputTokens', 'outputTokens', 'reasoningOutputTokens', 'apiUsdEquivalent'].map((field) => [field, regression(field)]));
const estimate = {};
for (const field of Object.keys(models)) {
  const model = models[field];
  estimate[field] = batches.batches.reduce((sum, batch) => sum + model.intercept + model.perSourceChar * batch.sourceChars, 0);
}

const tokenPoint = estimate.inputTokens + estimate.outputTokens;
const report = {
  generatedAt: new Date().toISOString(),
  basis: {
    samplePages: points.length,
    sampleSourceChars: points.reduce((sum, point) => sum + point.sourceChars, 0),
    sitePages: batches.totals.pages,
    siteSourceChars: batches.totals.sourceChars,
    batchesPerStage: batches.totals.batchesPerStage,
    agentTasksBothStages: batches.totals.agentTasksBothStages,
    caveat: '13 of 16 measured sample tasks inherited orchestration context. Full-run plan uses fresh context, so the API-equivalent estimate is intentionally reported as a broad engineering range.',
  },
  observedSample: usage.totals,
  regressionModels: models,
  optimizedBatchPointEstimate: {
    ...estimate,
    totalTokens: tokenPoint,
  },
  planningRange: {
    totalTokens: { low: Math.round(tokenPoint * 0.75), point: Math.round(tokenPoint), high: Math.round(tokenPoint * 1.3) },
    apiUsdEquivalent: { low: estimate.apiUsdEquivalent * 0.75, point: estimate.apiUsdEquivalent, high: estimate.apiUsdEquivalent * 1.3 },
  },
  samplePoints: points,
  pricingSource: 'https://developers.openai.com/api/docs/models/compare',
};

await writeFile(resolve('reports/full-project-estimate.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ basis: report.basis, observedSample: report.observedSample, optimizedBatchPointEstimate: report.optimizedBatchPointEstimate, planningRange: report.planningRange }, null, 2));
