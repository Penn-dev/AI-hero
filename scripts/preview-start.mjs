import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.dirname(scriptDir);
const runtimeRoot = path.join(projectRoot, ".sites-runtime");
const statePath = path.join(runtimeRoot, "local-preview.json");
const startErrorPath = path.join(runtimeRoot, "preview-start-error.log");
const stdoutPath = path.join(runtimeRoot, "preview-output.log");
const stderrPath = path.join(runtimeRoot, "preview-error.log");
const previewUrl = "http://127.0.0.1:4321/a-complete-guide-to-agents-md";
const commandShell = process.env.ComSpec ?? "C:\\Windows\\System32\\cmd.exe";
const npmCliPath = path.join(path.dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js");
const localServerPath = path.join(scriptDir, "local-preview-server.mjs");
let serverPid;

function runNpm(args) {
  const result = spawnSync(process.execPath, [npmCliPath, ...args], {
    cwd: projectRoot,
    stdio: "inherit",
    windowsHide: true,
  });
  if (result.status !== 0) {
    throw new Error(`命令执行失败：npm ${args.join(" ")}`);
  }
}

function isProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

async function isPreviewReady() {
  try {
    const response = await fetch(previewUrl, { signal: AbortSignal.timeout(5000) });
    return response.ok && (await response.text()).includes("AI Hero");
  } catch {
    return false;
  }
}

function openPreview() {
  const child = spawn(commandShell, ["/d", "/s", "/c", "start", "", previewUrl], {
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  });
  child.unref();
}

function stopFailedServer() {
  if (!serverPid || !isProcessAlive(serverPid)) return;
  spawnSync("taskkill.exe", ["/PID", String(serverPid), "/T", "/F"], {
    stdio: "ignore",
    windowsHide: true,
  });
}

async function main() {
  fs.mkdirSync(runtimeRoot, { recursive: true });

  if (await isPreviewReady()) {
    console.log(`AI Hero 中文预览已经在运行：${previewUrl}`);
    openPreview();
    return;
  }

  if (fs.existsSync(statePath)) {
    const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
    if (state.processId && isProcessAlive(state.processId)) {
      throw new Error("端口 4321 已被现有预览进程占用，但页面未能正常响应。请先运行“停止中文预览”。");
    }
    fs.rmSync(statePath, { force: true });
  }

  console.log("正在生成固定预览版本……");
  runNpm(["run", "learning:validate"]);
  runNpm(["run", "build"]);

  for (const logPath of [stdoutPath, stderrPath, startErrorPath]) {
    fs.rmSync(logPath, { force: true });
  }

  console.log("正在启动本地预览……");
  const stdout = fs.openSync(stdoutPath, "a");
  const stderr = fs.openSync(stderrPath, "a");
  const child = spawn(
    process.execPath,
    [localServerPath],
    {
      cwd: projectRoot,
      detached: true,
      stdio: ["ignore", stdout, stderr],
      windowsHide: true,
    },
  );
  serverPid = child.pid;
  child.unref();
  fs.closeSync(stdout);
  fs.closeSync(stderr);

  fs.writeFileSync(
    statePath,
    JSON.stringify(
      {
        version: 2,
        projectRoot,
        processId: serverPid,
        port: 4321,
        previewUrl,
        startedAt: new Date().toISOString(),
        stdoutLog: stdoutPath,
        stderrLog: stderrPath,
      },
      null,
      2,
    ),
    "utf8",
  );

  let ready = false;
  for (let attempt = 0; attempt < 60 && isProcessAlive(serverPid); attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    ready = await isPreviewReady();
    if (ready) break;
  }

  if (!ready) {
    const details = fs.existsSync(stderrPath)
      ? fs.readFileSync(stderrPath, "utf8").split(/\r?\n/).slice(-30).join("\n")
      : "没有生成错误日志。";
    throw new Error(`预览服务未能在 30 秒内就绪。\n${details}`);
  }

  console.log(`预览已在后台运行：${previewUrl}`);
  console.log("现在可以关闭此窗口。需要停止时，请双击“停止中文预览.cmd”。");
  openPreview();
}

main().catch((error) => {
  stopFailedServer();
  fs.rmSync(statePath, { force: true });
  fs.mkdirSync(runtimeRoot, { recursive: true });
  fs.writeFileSync(startErrorPath, `${error.stack ?? error}\n`, "utf8");
  console.error(error.message);
  console.error(`启动失败，错误记录已保存到：${startErrorPath}`);
  process.exitCode = 1;
});
