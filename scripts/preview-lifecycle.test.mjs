import assert from 'node:assert/strict';
import { execFile, spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { access, cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
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

void test('an existing startup lock is refused and preserved byte for byte', { skip: process.platform !== 'win32' }, async () => {
  const fixture = await mkdtemp(path.join(projectRoot, '.preview-test-'));
  const finished = spawn(process.execPath, ['-e', ''], { stdio: 'ignore' });
  await once(finished, 'exit');
  try {
    await mkdir(path.join(fixture, 'scripts'));
    await mkdir(path.join(fixture, '.sites-runtime'));
    for (const name of ['preview-start.mjs', 'preview-stop.ps1']) await cp(path.join(projectRoot, 'scripts', name), path.join(fixture, 'scripts', name));
    const lock = path.join(fixture, '.sites-runtime', 'preview-start.lock');
    const original = JSON.stringify({ processId: finished.pid, projectRoot: fixture });
    await writeFile(lock, original);
    let result;
    try { result = { status: 0, ...await promisify(execFile)(process.execPath, [path.join(fixture, 'scripts', 'preview-start.mjs'), '--no-open'], { timeout: 20000 }) }; }
    catch (error) { result = { status: error.code, stdout: error.stdout, stderr: error.stderr }; }
    console.log(JSON.stringify({ existingLockExitCode: result.status, stdout: result.stdout, stderr: result.stderr }));
    assert.notEqual(result.status, 0);
    assert.equal(await readFile(lock, 'utf8'), original, 'Never remove a preexisting lock while another launch may be acquiring it');
    assert.match(result.stdout + result.stderr, /启动锁/);
  } finally { await rm(fixture, { recursive: true, force: true }); }
});

void test('the real Windows project starts, reuses its own instance, stops, restarts and stops again', { skip: process.platform !== 'win32', timeout: 240000 }, async () => {
  const statePath = path.join(projectRoot, '.sites-runtime', 'local-preview.json');
  await assert.rejects(access(statePath), 'Lifecycle test requires a fresh isolated runner, never an existing user service');
  const invoke = async (file, args) => {
    const result = await promisify(execFile)(file, args, { cwd: projectRoot, timeout: 120000, maxBuffer: 8 * 1024 * 1024 });
    console.log(JSON.stringify({ command: path.basename(file), args, stdout: result.stdout, stderr: result.stderr }));
    return result;
  };
  const start = () => invoke(process.execPath, [path.join(projectRoot, 'scripts', 'preview-start.mjs'), '--no-open']);
  const stop = () => invoke('pwsh.exe', ['-NoLogo', '-NoProfile', '-File', path.join(projectRoot, 'scripts', 'preview-stop.ps1')]);
  const expected = JSON.parse(await readFile(path.join(projectRoot, 'content', 'zh', 'index.json'), 'utf8')).pages;
  const routes = ['/', '/ai-coding-dictionary/system-prompt', '/a-complete-guide-to-agents-md', '/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k'];
  const readRoutes = async () => {
    for (const route of routes) {
      for (let refresh = 0; refresh < 2; refresh++) {
        const response = await fetch('http://127.0.0.1:4321' + route, { signal: AbortSignal.timeout(10000) });
        assert.equal(response.status, 200);
        assert.ok((await response.text()).includes(expected[route].title), `Chinese route and repeated request: ${route}`);
      }
    }
  };
  try {
    await start();
    const first = await readFile(statePath, 'utf8');
    await readRoutes();
    await start();
    assert.equal(await readFile(statePath, 'utf8'), first, 'A second start reuses only the verified own instance');
    const inspection = JSON.parse((await invoke('pwsh.exe', ['-NoLogo', '-NoProfile', '-File', path.join(projectRoot, 'scripts', 'preview-stop.ps1'), '-Inspect'])).stdout);
    assert.equal(inspection.processId, JSON.parse(first).processId);
    assert.equal(inspection.ownsPort, true);
    await stop();
    await assert.rejects(access(statePath));
    await assert.rejects(fetch('http://127.0.0.1:4321/', { signal: AbortSignal.timeout(2000) }));
    await stop();
    await start();
    await readRoutes();
    await stop();
    await assert.rejects(access(statePath));
    await assert.rejects(fetch('http://127.0.0.1:4321/', { signal: AbortSignal.timeout(2000) }));
  } finally {
    try { await access(statePath); await stop(); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
});
