# 中文网站本地使用与最小现场验收

代码候选：`1e86ac0caad08a7da54d57a9a473a5b6ef909450`，分支 `codex/full-site-chinese`。交付状态、最终文档提交和证据见[候选入口](../reports/handoffs/dot-delivery-candidate.md)。#1、#6 在目标 Windows 现场通过前保持开放，PR #7 保持草稿。

## 范围与前提

本轮完成固定来源清单的 195 个公开文字页面，不追赶原站后续更新。未取得的课程、视频、邮件课、个人进度与 Solution 详见[材料缺口](../reports/full-site/delivery/source-gaps.md)。浏览器复制通过不表示教程代码或外部服务已运行。

需要 Windows、Node.js 至少 22.13、PowerShell 7。先在 PowerShell 中记录：

```powershell
node --version
pwsh -NoLogo -NoProfile -Command '$PSVersionTable.PSVersion.ToString()'
git status --short
```

有本机改动时保留，不执行 `reset --hard`、`clean` 或覆盖整个目录。可以从现有仓库为本次候选创建独立工作树；以下目标文件夹必须尚不存在：

```powershell
git fetch origin codex/full-site-chinese
git worktree add --detach ..\AI-hero-onsite-1e86ac0 1e86ac0caad08a7da54d57a9a473a5b6ef909450
Set-Location ..\AI-hero-onsite-1e86ac0
git rev-parse HEAD
npm ci --no-audit --no-fund
```

依赖只在缺失或锁文件变化时安装。已有干净且已签收候选的目录可以直接使用；记录实际 SHA。不复制其他目录的 `node_modules`、构建缓存或 `.sites-runtime` 服务状态。Node、PowerShell 缺失或命令失败时，保留错误并返回结果，无需现场排查全站内容。

## 启动与停止

在候选项目根目录执行：

```powershell
node scripts/preview-start.mjs
```

启动入口先核对本项目实例及端口身份；第一次会校验学习页、构建，再在后台监听 `127.0.0.1:4321` 并打开浏览器。完成后可以关闭命令窗口。若不希望自动打开浏览器，加 `--no-open`，再手动打开首页。再次启动会复用已核实的本项目实例。

停止同一项目目录的实例：

```powershell
pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File scripts/preview-stop.ps1
```

这里的执行策略参数只作用于这一次 PowerShell 进程，与已有停止快捷入口一致，不更改系统持久设置。重复停止是安全的。停止入口只允许命令行、项目绝对路径、Node 可执行文件和已持有进程句柄一致的本项目服务；身份不符会拒绝，不能按历史 PID 结束其他程序。

也可双击仓库中的 `启动中文预览.cmd`、`停止中文预览.cmd`。启动快捷文件沿用 `C:\Program Files\nodejs\node.exe`；Node 安装在其他位置时用上面的终端命令。停止快捷文件需要 `pwsh.exe` 在 PATH 中。

## 最小现场检查

1. 启动后打开[中文首页](http://127.0.0.1:4321/)，展开“全部中文页面”，进入一个条目。确认中文正文能读，头部“首页”和品牌可返回首页。
2. 分别打开三个代表页，阅读一小段正文、代码和原站资源入口：
   - [系统提示词词条](http://127.0.0.1:4321/ai-coding-dictionary/system-prompt)
   - [AGENTS.md 长文](http://127.0.0.1:4321/a-complete-guide-to-agents-md)
   - [Output 深层代码练习](http://127.0.0.1:4321/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k)
3. 在新标签直接粘贴深层练习地址，刷新，确认仍是对应中文页。
4. 执行停止命令，确认本项目监听已释放。用新请求访问首页；不以旧标签仍显示缓存内容判断未停止。
5. 再启动一次，确认首页与深层地址可访问、刷新，再停止。记录最终状态“已停止”。

不用重做 195 页全文核对、完整桌面/窄屏验收或已有有效检查。隔离 Windows runner 的正向启停和安全反例是远端证据，不能替代这一次目标机器实际使用。

## 遗留状态与失败处理

- 4321 被其他服务占用：启动会拒绝，不接管、不终止它。在原项目目录用其正规入口停止自己确认的旧预览；不认识的监听只报告，不按端口杀进程。
- 状态中的 PID 已属于其他进程、项目路径不符或状态损坏：启动/停止会拒绝。保留 `.sites-runtime/local-preview.json` 和错误日志，返回 Dot 诊断，不手动 taskkill。
- 遗留 `preview-start.lock`：任何已存在的锁都保留并拒绝，不自动回收。先确认所有启动窗口/启动命令均已结束，且没有另一个人或进程正在启动此目录。无法确认时停止操作并返回锁文件与日志。确认后可将旧锁改名备份，再重试：

```powershell
Rename-Item .sites-runtime\preview-start.lock ("preview-start.lock.backup-" + (Get-Date -Format yyyyMMdd-HHmmss))
```

- 确认无活进程的旧服务状态，在端口空闲检查后会归档为 `local-preview-stale-*.json`；不会据此停止别的进程。
- 启动失败查看 `.sites-runtime/preview-start-error.log`、`preview-error.log` 和 `preview-output.log`。失败清理只作用于当次自行创建的子进程及仍与当次字节相同的状态。

只检查现场实际遇到的遗留状态。没发生的写“未验证”，不要为验收随意改真实 PID 或终止无关进程。

## 返回结果

填写[现场结果模板](../reports/full-site/delivery/onsite-result-template.md)，附必要截图和失败日志：准确 SHA、Windows/Node/PowerShell 版本、实际命令、首次启动、首页/三类页、深链刷新、停止、再次启动、最终停止及遗留状态是否发生。发回前排除不相关的个人数据和凭据。

Dot 收到结果后保存证据、处理必要返修，再按完成标准更新 #1/#6 和 PR；仅重测受影响步骤。PR 不自动合并，在线部署另行安排。

## 后续内容更新

保留本轮来源、译稿和证据。明确选择新增或变更页面，对照该页源文差异，再用 `page:assemble` 的 preview/apply 接入并检查受影响内容。不要重新全量同步或启用 API 翻译器覆盖这 195 页。
