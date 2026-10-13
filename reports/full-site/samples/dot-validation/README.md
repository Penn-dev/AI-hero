# 三样本接续验证

2026-10-13。整合提交为 `dcd38bd6e0f7dfa31af8841e1fff7f63bf8e9b54`，父提交分别是实施入口 `4adfca71cff3f2b2d4d13e34532f260dcc361e74` 和样本 `2861de1a7afcfafe4ec29044abbab7d51d052974`。样本分支及原有正文、来源、检查和六张截图均保留。

## 这次实际完成的检查

- 三份配置的 `chineseFile` 改为交接计划指定的 `content/**` 正文路径。源文和中文正文字节没有变化。每份配置已实际运行 preview/apply，日志在本目录，manifest 仅更新本次装配事实。
- 42 项现有接页与组件测试通过，见 `page-tests.log`。
- 学习辅助来源检查通过，见 `learning-validation.log`。
- 构建通过，见 `build.log`。环境为 dot 云电脑，Node 24.19.0。首次依赖安装因默认缓存目录不可写而失败，改用 `/tmp/aihero-npm-cache` 后安装成功；两次真实日志均保留。
- 内容检查仍有 8 篇非样本旧稿的来源哈希差异，名单见 `content-validation.log`。这 8 页属于固定 195 页范围，由 #5 逐篇对照后修订，未改哈希掩盖差异。
- 已实际查看原先未查看的 `../screenshots/agents-md-390-details.png` 与 `../screenshots/agents-md-390-prompt.png`：折叠正文、说明、代码框与底部工具栏可读；长行限制在代码框内横向滚动，没有页面整体横向溢出。截图所对应的历史实际交互证据仍见原检查点。

## 当前仍待完成

浏览器三样本验收尚未通过。沿用已成功的 Actions 执行方式，只扩展为三样本剩余验收，没有另建 CI 平台。`.github/workflows/dot-sample-acceptance.yml` 对候选提交构建，使用真实 Chromium 点击、真实系统剪贴板读取、独立术语跳转和深链刷新，并输出桌面/窄屏截图和逐步结果。它不替代逐节语义审查、人工看图或 Windows 现场验收。

浏览器结果和独立审查完成前，#3/#4 保持开放。#1/#6 与 PR #7 的草稿状态继续保留，未合并或部署。
