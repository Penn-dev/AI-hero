import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const agents = [
  { sample: 'dictionary-batch-8', kind: 'dictionary-batch', stage: 'terra-medium', id: '01a0a0af-5d92-7b52-b1ee-cefcfbb0f3e4', freshContext: true },
  { sample: 'workshop-generating-objects', kind: 'workshop-lesson', stage: 'terra-medium', id: '01a0a0af-5e23-72e2-ab1a-0a3e9ecce451', freshContext: true },
  { sample: 'dictionary-batch-8', kind: 'dictionary-batch', stage: 'sol-medium', id: '01a0a0b4-f4ca-7352-a9bd-b73cb4138231', freshContext: true },
  { sample: 'workshop-generating-objects', kind: 'workshop-lesson', stage: 'sol-medium', id: '01a0a0b4-f588-7981-9275-462c4c29e735', freshContext: true },
];

const sessionsRoot = 'C:/Users/Administrator/.codex/sessions';
const price = {
  'terra-medium': { input: 2, cached: 0.2, output: 12 },
  'sol-medium': { input: 4, cached: 0.4, output: 20 },
};

async function findRollout(dir, id) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      const found = await findRollout(path, id);
      if (found) return found;
    } else if (entry.name.includes(id) && entry.name.endsWith('.jsonl')) return path;
  }
  return null;
}

function finalUsage(jsonl) {
  let usage = null;
  for (const line of jsonl.split('\n')) {
    if (!line.includes('"type":"token_count"')) continue;
    try {
      const event = JSON.parse(line);
      usage = event.payload?.info?.total_token_usage || usage;
    } catch {}
  }
  return usage;
}

const rows = [];
for (const agent of agents) {
  const rolloutPath = await findRollout(sessionsRoot, agent.id);
  if (!rolloutPath) {
    rows.push({ ...agent, status: 'rollout-not-found' });
    continue;
  }
  const usage = finalUsage(await readFile(rolloutPath, 'utf8'));
  if (!usage) {
    rows.push({ ...agent, status: 'usage-not-found', rolloutPath });
    continue;
  }
  const rates = price[agent.stage];
  const uncached = usage.input_tokens - usage.cached_input_tokens;
  const apiUsdEquivalent = (uncached * rates.input + usage.cached_input_tokens * rates.cached + usage.output_tokens * rates.output) / 1_000_000;
  rows.push({ ...agent, status: 'measured', usage, uncachedInputTokens: uncached, apiUsdEquivalent, rolloutPath });
}

const measured = rows.filter((row) => row.status === 'measured');
const totals = measured.reduce((sum, row) => {
  sum.inputTokens += row.usage.input_tokens;
  sum.cachedInputTokens += row.usage.cached_input_tokens;
  sum.outputTokens += row.usage.output_tokens;
  sum.reasoningOutputTokens += row.usage.reasoning_output_tokens || 0;
  sum.apiUsdEquivalent += row.apiUsdEquivalent;
  return sum;
}, { inputTokens: 0, cachedInputTokens: 0, outputTokens: 0, reasoningOutputTokens: 0, apiUsdEquivalent: 0 });

const report = { generatedAt: new Date().toISOString(), pricingPerMillionTokens: price, rows, totals };
await writeFile(resolve('reports/special-agent-token-usage.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ measured: measured.length, missing: rows.length - measured.length, totals }, null, 2));
if (measured.length !== agents.length) process.exitCode = 1;
