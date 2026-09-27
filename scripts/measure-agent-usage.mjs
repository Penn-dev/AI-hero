import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const agents = [
  { slug: 'a-complete-guide-to-agents-md', stage: 'terra-medium', id: '01a04f73-e498-7441-9fae-1947469b39f7', forked: false, historical: true },
  { slug: 'a-complete-guide-to-agents-md', stage: 'sol-medium', id: '01a04f79-25a4-7ec0-bcf4-a85c0eb849bb', forked: false, historical: true },
  { slug: 'anthropics-new-model-context-protocol-in-2-minutes~hc0tx', stage: 'terra-medium', id: '01a09f5e-ca84-7bc3-8ec0-ca334f2adec8', forked: true },
  { slug: 'what-is-the-context-window', stage: 'terra-medium', id: '01a09f5e-cb20-7613-bdfd-1f0d9035e2f0', forked: true },
  { slug: 'what-is-an-llm', stage: 'terra-medium', id: '01a09f5e-cbc3-70f2-89e7-dd8616a7eabd', forked: true },
  { slug: 'structured-data-from-pdfs-with-vercel-ai-sdk', stage: 'terra-medium', id: '01a09f5e-cc84-7990-b892-7d6586b2253b', forked: true },
  { slug: '5-agent-skills-i-use-every-day', stage: 'terra-medium', id: '01a09f5e-cd44-7391-8da5-24d5c4f93932', forked: true },
  { slug: 'skills-codebase-design', stage: 'terra-medium', id: '01a09f5e-ce0a-7213-b968-206ac726225b', forked: true },
  { slug: 'tips-for-ai-coding-with-ralph-wiggum', stage: 'terra-medium', id: '01a09f67-33ff-7933-9f40-16ebd629ce84', forked: true },
  { slug: 'anthropics-new-model-context-protocol-in-2-minutes~hc0tx', stage: 'sol-medium', id: '01a09f6b-64f9-7dd0-ba26-2893cafbd3e4', forked: true },
  { slug: 'what-is-the-context-window', stage: 'sol-medium', id: '01a09f6b-65d5-7f32-a055-3824a9820892', forked: true },
  { slug: 'what-is-an-llm', stage: 'sol-medium', id: '01a09f6b-669c-7bb3-8bb0-d0cca211e9d2', forked: true },
  { slug: 'structured-data-from-pdfs-with-vercel-ai-sdk', stage: 'sol-medium', id: '01a09f6b-6765-7b53-bc4d-8d333481bb05', forked: true },
  { slug: '5-agent-skills-i-use-every-day', stage: 'sol-medium', id: '01a09f6b-6844-7633-ae16-b5122cfe5dc2', forked: true },
  { slug: 'skills-codebase-design', stage: 'sol-medium', id: '01a09f6b-6948-7ce1-b496-4d466a4cf335', forked: true },
  { slug: 'tips-for-ai-coding-with-ralph-wiggum', stage: 'sol-medium', id: '01a09f6c-b968-72c2-9b16-2c9c96ceeb04', forked: false },
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
await writeFile(resolve('reports/agent-token-usage.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ measured: measured.length, missing: rows.length - measured.length, totals }, null, 2));
