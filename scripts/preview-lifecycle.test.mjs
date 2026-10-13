import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { cp, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function alive(pid) {
  try { process.kill(pid, 0); return true; } catch { return false; }
}

void test('stopping a stale preview state leaves the unrelated live process untouched', { skip: process.platform !== 'win32' }, async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), 'aihero-preview-'));
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
    assert.ok(alive(child.pid), `The stale PID belongs to our unrelated fixture process and must survive.\n${result.stdout}\n${result.stderr}`);
    assert.notEqual(result.status, 0, 'Identity mismatch must be reported, not accepted as a successful stop');
  } finally {
    if (alive(child.pid)) child.kill();
    await rm(fixture, { recursive: true, force: true });
  }
});
