// A local evidence helper: send UTF-8 file bodies to the existing Kimi session.
import { randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error('Usage: node browser-command.mjs input.json output.json');
const commands = JSON.parse(await readFile(input, 'utf8'));
await mkdir('outputs/samples-browser', { recursive: true });
const results = [];
for (const command of commands) {
  const requestPath = resolve(`outputs/samples-browser/request-${randomUUID()}.json`);
  try {
    await writeFile(requestPath, JSON.stringify({ ...command, session: 'aihero-local-delivery' }), 'utf8');
    const raw = execFileSync('curl.exe', ['-sS', '--max-time', '45', '-X', 'POST', 'http://127.0.0.1:10086/command', '-H', 'Content-Type: application/json', '--data-binary', `@${requestPath}`], { encoding: 'utf8', windowsHide: true });
    const result = JSON.parse(raw);
    results.push({ action: command.action, args: command.args ?? {}, checkedAt: new Date().toISOString(), result });
    if (!result.ok) break;
  } finally { await rm(requestPath, { force: true }); }
}
await writeFile(output, `${JSON.stringify(results, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(results));
