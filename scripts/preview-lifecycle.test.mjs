import assert from 'node:assert/strict';
import { execFile, spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { access, cp, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'node:http';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function alive(pid) {
  try { process.kill(pid, 0); return true; } catch { return false; }
}

void test('stopping a stale preview state leaves the unrelated live process untouched', { skip: process.platform !== 'win32' }, async () => {
  const fixture = await mkdtemp(path.join(projectRoot, '.preview-test-'));
  const child = spawn(process.execPath, ['-e', 'setInterval(() => {}, 1000)'], { stdio: 'ignore' });
  await once(child, 'spawn');
  try {
    await mkdir(path.join(fixture, 'scripts'));
    await mkdir(path.join(fixture, '.sites-runtime'));
    await cp(path.join(projectRoot, 'scripts', 'preview-stop.ps1'), path.join(fixture, 'scripts', 'preview-stop.ps1'));
    await writeFile(path.join(fixture, '.sites-runtime', 'local-preview.json'), JSON.stringify({
      version: 2, projectRoot: fixture, processId: child.pid, port: 4321,
    }));
    const result = spawnSync('pwsh.exe', ['-NoLogo', '-NoProfile', '-File', path.join(fixture, 'scripts', 'preview-stop.ps1')], { encoding: 'utf8', timeout: 20000 });
    console.log(JSON.stringify({ stopExitCode: result.status, stdout: result.stdout, stderr: result.stderr, survivor: alive(child.pid) }));
    assert.ok(alive(child.pid), `The stale PID belongs to our unrelated fixture process and must survive.\n${result.stdout}\n${result.stderr}`);
    assert.notEqual(result.status, 0, 'Identity mismatch must be reported, not accepted as a successful stop');
    assert.match(result.stderr, /身份|identity/i, 'Rejection must specifically explain a process identity mismatch, not an unrelated script error');
  } finally {
    if (alive(child.pid)) child.kill();
    await rm(fixture, { recursive: true, force: true });
  }
});

void test('starting preview refuses an unrelated AI Hero response on port 4321', { skip: process.platform !== 'win32' }, async () => {
  const fixture = await mkdtemp(path.join(projectRoot, '.preview-test-'));
  const foreign = createServer((_request, response) => response.end('AI Hero unrelated fixture service'));
  await new Promise((resolve, reject) => { foreign.once('error', reject); foreign.listen(4321, '127.0.0.1', resolve); });
  try {
    await mkdir(path.join(fixture, 'scripts'));
    await cp(path.join(projectRoot, 'scripts', 'preview-start.mjs'), path.join(fixture, 'scripts', 'preview-start.mjs'));
    await cp(path.join(projectRoot, 'scripts', 'preview-stop.ps1'), path.join(fixture, 'scripts', 'preview-stop.ps1'));
    let result;
    try {
      result = { status: 0, ...await promisify(execFile)(process.execPath, [path.join(fixture, 'scripts', 'preview-start.mjs')], { timeout: 20000 }) };
    } catch (error) {
      result = { status: error.code, stdout: error.stdout, stderr: error.stderr };
    }
    console.log(JSON.stringify({ startExitCode: result.status, stdout: result.stdout, stderr: result.stderr }));
    assert.notEqual(result.status, 0, 'A matching page name is not proof that this project owns the listener');
    assert.match(result.stdout + result.stderr, /4321/, 'Refusal identifies the occupied port');
    assert.equal(await (await fetch('http://127.0.0.1:4321/')).text(), 'AI Hero unrelated fixture service');
    await assert.rejects(access(path.join(fixture, '.sites-runtime', 'local-preview.json')), 'Do not adopt the unrelated service');
  } finally {
    await new Promise(resolve => foreign.close(resolve));
    await rm(fixture, { recursive: true, force: true });
  }
});
