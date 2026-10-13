import assert from 'node:assert/strict';
import * as filesystem from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { dirname, relative, resolve } from 'node:path';
import { within } from './assembly-config.mjs';
import { sha256 } from './page-content.mjs';

const journalPath = root => resolve(root, 'content/zh/.assembly-journal.json');
export async function readOptional(path, fs = filesystem) {
  try { return await fs.readFile(path); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}
export async function safePath(root, path, fs = filesystem) {
  const absolute = resolve(root, path);
  assert.ok(within(root, absolute), `Path escapes workspace: ${path}`);
  let ancestor = absolute;
  while (true) {
    try {
      const physical = await fs.realpath(ancestor);
      const physicalRoot = await fs.realpath(root);
      assert.ok(physical === physicalRoot || within(physicalRoot, physical), `Path escapes workspace through symlink: ${path}`);
      break;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      ancestor = dirname(ancestor);
    }
  }
  return absolute;
}
export async function safeOutputPath(root, path, fs = filesystem) {
  const absolute = await safePath(root, path, fs);
  const name = relative(resolve(root), absolute).replaceAll('\\', '/');
  assert.ok(['content/zh/index.json', 'content/zh/manifest.json', 'content/zh/.assembly-journal.json', 'content/learning/pilot-knowledge.json'].includes(name) || /^content\/(?:zh|learning)\/.+\.md$/.test(name), `Unsafe output path: ${name}`);
  let ancestor = absolute;
  while (ancestor !== resolve(root)) {
    try { assert.ok(!(await fs.lstat(ancestor)).isSymbolicLink(), `Unsafe physical output path: ${path}`); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    ancestor = dirname(ancestor);
  }
  return absolute;
}
async function replace(path, bytes, temporary, fs) {
  const file = await fs.open(temporary, 'wx');
  try { await file.writeFile(bytes); await file.sync(); }
  finally { await file.close(); }
  await fs.rename(temporary, path);
}

export async function recoverAssembly({ root = process.cwd(), fs = filesystem } = {}) {
  const path = await safeOutputPath(root, journalPath(root), fs);
  const bytes = await readOptional(path, fs);
  if (!bytes) return { recovered: false };
  const journal = JSON.parse(bytes.toString('utf8'));
  assert.ok(journal.version === 1 && Array.isArray(journal.files) && Array.isArray(journal.directories), 'Invalid assembly recovery journal');
  for (const item of journal.files) {
    const target = await safeOutputPath(root, item.path, fs);
    assert.ok(item.temporary.startsWith(`${item.path}.`) && /^\.[a-f\d-]{36}\.tmp$/.test(item.temporary.slice(item.path.length)), 'Invalid recovery temporary path');
    await safePath(root, item.temporary, fs);
    const current = await readOptional(target, fs);
    assert.ok(current === null ? item.before === null : sha256(current) === item.afterHash || sha256(current) === item.beforeHash, `Recovery conflict; preserve journal and inspect: ${item.path}`);
  }
  for (const item of [...journal.files].reverse()) {
    const target = resolve(root, item.path);
    await fs.rm(resolve(root, item.temporary), { force: true });
    const current = await readOptional(target, fs);
    if (current !== null && sha256(current) === item.beforeHash) continue;
    if (item.before === null) await fs.rm(target, { force: true });
    else await replace(target, Buffer.from(item.before, 'base64'), resolve(root, item.temporary), fs);
  }
  for (const directory of [...journal.directories].reverse()) {
    await safePath(root, directory, fs);
    try { await fs.rmdir(resolve(root, directory)); }
    catch (error) { if (!['ENOENT', 'ENOTEMPTY'].includes(error.code)) throw error; }
  }
  await fs.rm(path);
  return { recovered: true, route: journal.route };
}

export async function writeAssembly(root, route, outputs, fs = filesystem, inputs = new Map()) {
  const id = randomUUID();
  const files = [];
  const directories = new Set();
  for (const item of outputs) {
    const path = await safeOutputPath(root, item.path, fs);
    const before = await readOptional(path, fs);
    files.push({ path: item.path, before: before?.toString('base64') ?? null, beforeHash: before === null ? null : sha256(before), afterHash: sha256(item.text), temporary: `${item.path}.${id}.tmp` });
    let directory = dirname(path);
    const missing = [];
    while (await readOptionalDirectory(directory, fs) === false) { missing.unshift(directory); directory = dirname(directory); }
    for (const entry of missing) directories.add(entry);
  }
  const journal = await fs.open(await safeOutputPath(root, journalPath(root), fs), 'wx');
  let journalSaved = false;
  try { await journal.writeFile(JSON.stringify({ version: 1, route, files, directories: [...directories] })); await journal.sync(); journalSaved = true; }
  finally { await journal.close(); if (!journalSaved) await fs.rm(journalPath(root)); }
  let started = false;
  try {
    for (const [path, hash] of inputs) {
      const current = await readOptional(await safePath(root, path, fs), fs);
      assert.equal(current === null ? null : sha256(current), hash, `Input changed during assembly: ${path}`);
    }
    started = true;
    for (const directory of directories) await fs.mkdir(directory);
    for (const [i, item] of outputs.entries()) await replace(resolve(root, item.path), item.text, resolve(root, files[i].temporary), fs);
    await fs.rm(journalPath(root));
  } catch (error) {
    if (!started) { await fs.rm(journalPath(root)); throw error; }
    try { await recoverAssembly({ root, fs }); }
    catch (recoveryError) { throw new AggregateError([error, recoveryError], 'Assembly failed; recovery journal retained. Run assemble-page.mjs recover.'); }
    throw error;
  }
}
async function readOptionalDirectory(path, fs) {
  try { assert.ok((await fs.stat(path)).isDirectory(), `Not a directory: ${path}`); return true; }
  catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}
