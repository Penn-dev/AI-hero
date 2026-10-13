# #4 暂停检查点（WIP，未完成）

2026-10-13，用户明确要求在最近安全节点暂停。本记录为当前事实状态；不宣称 #4 完成，#5/#6 未开始。

工作树：`E:/dev/projects/AIHero/work/full-site-samples`；分支：`codex/full-site-samples`。三篇正文、配置、旧来源字节归档均已保留。已合入工程修复至 `b9b70a6`，提交检查点前再合入仅更新说明的 `1cdffe5`。源码提取修正 `aaeebfe` 已由主代理整合，本阶段未重新取源。

## 已完成

- 三篇逐节对照与通读已经完成；保留合格旧稿，恢复原段落/CTA、完整英文原例和可复制中文版 Prompt，Output 明确材料和环境缺口。
- 三篇均实际执行统一入口 preview/apply 成功，见各页 `*-preview-final.log` 与 `*-apply-final.log`。实际正文、索引、manifest 和必要 profile 已更新；历史共享来源保留旧 ID/hash，仅迁入同 hash 字节归档。
- 全站内容检查：195 来源、17 可渲染中文页；仅剩范围外 8 页旧 sourceHash 差异，见[内容校验](E:/dev/projects/AIHero/reports/full-site/samples/content-validation-final.log)。这 8 页仍待 #5 语义复核。
- 合入 `4da28cf` 后完整 learning 校验通过，核对 10 份辅助来源，见[辅助校验](E:/dev/projects/AIHero/reports/full-site/samples/learning-validation-final.log)。
- 合入 `b9b70a6` 后本树构建成功，见[最终构建](E:/dev/projects/AIHero/reports/full-site/samples/build-final.log)。本树未重跑工程全部测试或全仓 lint；不能写成测试/lint 全过。

## 五项状态

| 页面 | 信息完整准确 | 中文自然 | 必要概念讲清 | 代码链接保真 | 页面正常显示 |
| --- | --- | --- | --- | --- | --- |
| 系统提示词 | 已逐段核对 | 已通读 | 已核对 | 原文/配置检查与接页通过；0 代码块，11 正文术语入口保留 | **未验证**：尚未打开本地样本页进行浏览器验收 |
| AGENTS.md | 已逐节核对 | 已通读 | 已核对 | 9 原围栏保留；7 中文指令/Prompt 块；资源接页通过 | **部分验证**：390 见下；1440 与章节深链未完成 |
| Output | 已逐节核对 | 已通读 | 已核对 | 2 原代码块保留；正确 Solution URL 与原站入口实测存在 | **部分验证**：1440 见下；390、复制和修复后补检未完成 |

具体记录：[系统提示词](E:/dev/projects/AIHero/reports/full-site/samples/system-prompt-check.md)、[AGENTS.md](E:/dev/projects/AIHero/reports/full-site/samples/agents-md-check.md)、[Output](E:/dev/projects/AIHero/reports/full-site/samples/output-check.md)。

## 浏览器实际证据

使用真实 Kimi 会话 `aihero-local-delivery`，本树构建服务端口 4322。浏览器调用、DOM 结果和截图保存在本目录；失败/未完成调用也保留，不能视作通过。

- **AGENTS.md / 390×844**：页面整体 `scrollWidth=clientWidth=390`；Markdown 术语弹层可打开/关闭；CLAUDE.md、Corepack 两处实际可展开和收起；完整中文五步 Prompt 按真实按钮复制后与系统剪贴板严格相符，514 字符。见[窄屏 DOM](E:/dev/projects/AIHero/reports/full-site/samples/browser-agents-mobile.json)、[术语](E:/dev/projects/AIHero/reports/full-site/samples/browser-agents-mobile-term.json)、[折叠与复制](E:/dev/projects/AIHero/reports/full-site/samples/browser-agents-mobile-fold-copy.json)、[剪贴板比较](E:/dev/projects/AIHero/reports/full-site/samples/clipboard-agents-390.json)。Humanlayer、Corepack 和 CTA 原入口在实际 DOM 中保留。术语独立跳转和章节深链尚未验完。
- **AGENTS.md / 1440**：仅切换了视口；下一条 DOM 检查语句出现 `SyntaxError: Unexpected end of input`，后续桌面截图/复制/折叠未执行。见[中断调用](E:/dev/projects/AIHero/reports/full-site/samples/browser-agents-desktop.json)。这属于验收语句错误，未据此认定网页失败。
- **Output / 1440×1000**：旧构建下整体 `scrollWidth=clientWidth=1425`（含桌面滚动条差值）；可见正确课程、Solution、登录及官方文档绝对 URL；终端术语面板正常。实际 DOM 的 `id=steps-to-complete` 对应中文标题；刷新后 URL 保留该片段，标题距视口顶部约 29.5px，`scrollY=1688`。见[初始 DOM](E:/dev/projects/AIHero/reports/full-site/samples/browser-output-initial.json)、[刷新后的定位](E:/dev/projects/AIHero/reports/full-site/samples/browser-output-ready.json)、[术语面板](E:/dev/projects/AIHero/reports/full-site/samples/browser-output-copy-position.json)。
- Output 最初发现中文 Prompt 框误标“原文代码片段”；主代理以 `b9b70a6` 修复中性标签。空文字稿识别由 `4da28cf` 修复。两项已合入并重建，**尚未补查修复后的 Output 浏览器显示**。
- Output 复制尚未验收通过：初次合成点击未获得复制状态；带用户手势的后续调用在浏览器读取剪贴板时超时，没有保存完整结果。后续可沿用已成功的“真实按钮复制 + 系统剪贴板比较”，不要重复等待浏览器读权限。Output 390 尚未检查。
- 已实际查看的截图只有：[AGENTS 390 页首](E:/dev/projects/AIHero/reports/full-site/samples/screenshots/agents-md-390-top.png)、[AGENTS 390 术语](E:/dev/projects/AIHero/reports/full-site/samples/screenshots/agents-md-390-term.png)、[Output 1440 页首](E:/dev/projects/AIHero/reports/full-site/samples/screenshots/output-1440-top.png)、[Output 1440 原例与中文 Prompt](E:/dev/projects/AIHero/reports/full-site/samples/screenshots/output-1440-code.png)。AGENTS 390 折叠与 Prompt 截图虽已保存，**尚未看图**，不计视觉通过。

## 服务与恢复

已先核对 4322 监听进程的命令行、创建时间和本次 retained exec session，再向本次会话发送 Ctrl+C。停止后监听数为 0，见[服务停止记录](E:/dev/projects/AIHero/reports/full-site/samples/preview-service-stop.json)。未关闭用户浏览器标签组。

恢复时先读取本检查点和逐页记录。沿用已完成正文，不重新取源/重做已通过语义核对。仅完成系统提示词双视口、AGENTS 桌面及深链/独立跳转、Output 窄屏和修复后的提示/解答入口/锚点/复制；实际看过剩余截图后更新第五项。无需重跑已有效构建和其他检查，除非后续改动影响它们。

本次 WIP 保留 `reports/full-site/samples/drafts/` 及以其为输入的配置。当前活动正文在 `content/**`，受 `-text` 属性保护；报告目录草稿将来 checkout 时可能受全局 autocrlf 影响。最终交付前可将配置输入切到已接入正文，通过统一入口重新记录配置，不要仅换 hash。来源或正文若无新改动，不需重新生产。

Output 仍缺视频、文字稿正文、准备项目、锁定依赖/运行环境及 Solution 正文；未运行课程代码。AGENTS CTA 源组件未提供具体按钮 href，保留完整文案和明确标识的原文章入口。这些缺口与验收剩余项分别记录。
