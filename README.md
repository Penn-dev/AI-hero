# AI Hero 中文学习版

以固定公开来源制作的本地中文阅读版本，保留原作者归属、原站 URL 层级、代码、英文示例和资源入口。当前固定 195 页已完成中文制作与逐页检查；不作未经核实的原作者授权声明。

## 使用与交付状态

先读[准确候选和证据入口](reports/handoffs/dot-delivery-candidate.md)，再按 [Windows 使用说明](docs/local-preview.md)启动和停止。当前只剩目标 Windows 机器的最小现场验收，#1/#6 保持开放，PR #7 保持草稿。

依赖已准备后，在项目根目录：

```powershell
node scripts/preview-start.mjs
pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File scripts/preview-stop.ps1
```

第一条启动并打开 `http://127.0.0.1:4321/`；第二条在阅读结束后停止本项目。需要 Windows、Node.js ≥22.13、PowerShell 7。首次安装、取得候选、端口占用和遗留状态处理都见使用说明。

## 内容、检查与维护

- [固定来源范围](reports/full-site/source-scope-2026-10-13.md)与[未取得材料](reports/full-site/delivery/source-gaps.md)
- [195 页五项验收](reports/full-site/acceptance-status.json)
- [制作规范](docs/localization.md)与[安全接页 preview/apply](docs/full-site-assembly.md)
- `content/source/manifest.json`：固定来源及哈希
- `content/zh/manifest.json`：当前译稿及来源绑定
- `content/zh/index.json`：实际页面索引

常用离线检查：

```powershell
npm run page:test
npm run sync:validate
npm run learning:validate
npm run build
```

本轮不重新全量同步，也不使用 API 翻译器覆盖人工核对的195页。历史同步/翻译脚本保留供追溯，不是当前交付启动流程。后续只按明确变更的页面核对源文差异、重新接页和检查；教程运行、登录与报名等缺口不宣称已完成。
