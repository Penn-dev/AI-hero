import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = fs.realpathSync(path.dirname(scriptDir));
const runtimeRoot = path.join(projectRoot, '.sites-runtime');
const statePath = path.join(runtimeRoot, 'local-preview.json');
const lockPath = path.join(runtimeRoot, 'preview-start.lock');
const startErrorPath = path.join(runtimeRoot, 'preview-start-error.log');
const stdoutPath = path.join(runtimeRoot, 'preview-output.log');
const stderrPath = path.join(runtimeRoot, 'preview-error.log');
const previewUrl = 'http://127.0.0.1:4321/';
const commandShell = process.env.ComSpec ?? 'C:\\Windows\\System32\\cmd.exe';
const npmCliPath = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');
const localServerPath = path.join(projectRoot, 'scripts', 'local-preview-server.mjs');
const stopScriptPath = path.join(projectRoot, 'scripts', 'preview-stop.ps1');
const lockText = JSON.stringify({ processId: process.pid, projectRoot });
let ownsLock = false;
let serverChild;
let stateText;

function runNpm(args) {
  const result = spawnSync(process.execPath, [npmCliPath, ...args], { cwd: projectRoot, stdio: 'inherit', windowsHide: true });
  if (result.error || result.status !== 0) throw new Error(`命令执行失败：npm ${args.join(' ')}`);
}

function acquireStartLock() {
  try {
    fs.writeFileSync(lockPath, lockText, { flag: 'wx' });
  } catch (error) {
    if (error.code === 'EEXIST') throw new Error('已存在启动锁，未修改它。请确认其他启动窗口已结束，再按使用说明将旧锁改名保留后重试。');
    throw error;
  }
  ownsLock = true;
}

function inspectPreview() {
  const result = spawnSync('pwsh.exe', ['-NoLogo', '-NoProfile', '-File', stopScriptPath, '-Inspect'], { encoding: 'utf8', windowsHide: true });
  if (result.error) throw new Error(`无法查询本项目服务身份，需要 PowerShell 7：${result.error.message}`);
  if (result.status !== 0) throw new Error(`无法确认预览进程身份，保留现有状态，未停止其他程序。\n${result.stderr}`);
  return JSON.parse(result.stdout);
}

async function requireFreePort() {
  await new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', error => reject(new Error(`端口 4321 已被其他程序占用或不能使用；不会采用或停止它。${error.code ?? ''}`)));
    probe.listen({ host: '127.0.0.1', port: 4321, exclusive: true }, () => probe.close(resolve));
  });
}

async function isPreviewReady() {
  try {
    const response = await fetch(previewUrl, { signal: AbortSignal.timeout(5000) });
    return response.ok && (await response.text()).includes('AI Hero');
  } catch { return false; }
}

function openPreview() {
  if (process.argv.includes('--no-open')) return;
  const child = spawn(commandShell, ['/d', '/s', '/c', 'start', '', previewUrl], { detached: true, stdio: 'ignore', windowsHide: true });
  child.on('error', error => console.error(`无法自动打开浏览器，请手动打开 ${previewUrl}：${error.message}`));
  child.unref();
}

async function main() {
  if (process.platform !== 'win32') throw new Error('此启动入口面向 Windows；其他环境请按项目开发说明运行。');
  const [major, minor] = process.versions.node.split('.').map(Number);
  if (major < 22 || (major === 22 && minor < 13)) throw new Error('需要 Node.js 22.13 或更高版本。');
  fs.mkdirSync(runtimeRoot, { recursive: true });
  acquireStartLock();

  if (fs.existsSync(statePath)) {
    const current = inspectPreview();
    if (current.running) {
      if (!current.ownsPort || !await isPreviewReady()) throw new Error('本项目进程仍在，但端口 4321 或页面未正常响应。请先运行“停止中文预览”。');
      console.log(`已核对本项目正在运行的服务：${previewUrl}`);
      openPreview();
      return;
    }
  }
  await requireFreePort();
  if (fs.existsSync(statePath)) fs.renameSync(statePath, path.join(runtimeRoot, `local-preview-stale-${Date.now()}.json`));

  console.log('正在生成固定预览版本……');
  runNpm(['run', 'learning:validate']);
  runNpm(['run', 'build']);
  for (const logPath of [stdoutPath, stderrPath, startErrorPath]) fs.rmSync(logPath, { force: true });

  const stdout = fs.openSync(stdoutPath, 'a');
  const stderr = fs.openSync(stderrPath, 'a');
  try {
    serverChild = spawn(process.execPath, [localServerPath], {
      cwd: projectRoot, detached: true, stdio: ['ignore', stdout, stderr], windowsHide: true,
      env: { ...process.env, AIHERO_PREVIEW_PORT: '4321' },
    });
    await once(serverChild, 'spawn');
  } finally {
    fs.closeSync(stdout);
    fs.closeSync(stderr);
  }
  stateText = JSON.stringify({
    version: 3, projectRoot, processId: serverChild.pid, port: 4321, previewUrl,
    startedAt: new Date().toISOString(), stdoutLog: stdoutPath, stderrLog: stderrPath,
  }, null, 2);
  fs.writeFileSync(statePath, stateText, 'utf8');

  let ready = false;
  for (let attempt = 0; attempt < 60 && serverChild.exitCode === null; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (await isPreviewReady()) {
      const current = inspectPreview();
      ready = current.running && current.ownsPort && current.processId === serverChild.pid;
      break;
    }
  }
  if (!ready) {
    const details = fs.existsSync(stderrPath) ? fs.readFileSync(stderrPath, 'utf8').split(/\r?\n/).slice(-30).join('\n') : '没有生成错误日志。';
    throw new Error(`本项目预览未能正常就绪。\n${details}`);
  }
  serverChild.unref();
  console.log(`已核对本项目服务身份，预览在后台运行：${previewUrl}`);
  console.log('现在可以关闭此窗口。需要停止时，请双击“停止中文预览.cmd”。');
  openPreview();
}

main().catch(error => {
  // Only the process object created by this invocation is eligible for cleanup.
  if (serverChild?.pid && serverChild.exitCode === null) serverChild.kill();
  if (stateText && fs.existsSync(statePath) && fs.readFileSync(statePath, 'utf8') === stateText) fs.rmSync(statePath);
  fs.mkdirSync(runtimeRoot, { recursive: true });
  fs.writeFileSync(startErrorPath, `${error.stack ?? error}\n`, 'utf8');
  console.error(error.message);
  console.error(`启动失败，错误记录已保存到：${startErrorPath}`);
  process.exitCode = 1;
}).finally(() => {
  if (ownsLock && fs.existsSync(lockPath) && fs.readFileSync(lockPath, 'utf8') === lockText) fs.rmSync(lockPath);
});
