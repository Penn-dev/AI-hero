# AI Hero：Dot 远端接续入口

> 2026-10-13 更新：Dot 已接续并完成固定195页和远端验收。当前状态、准确代码候选与最小 Windows 现场说明见[交付候选入口](./dot-delivery-candidate.md)。以下保留交接时历史快照；“尚未启动/暂停/未验”不代表当前进度。

2026-10-13。用户已授权发布本地独有成果，现以 GitHub 仓库内材料交接。**Dot 尚未启动；用户把任务说明发给 Dot 后，由 Dot 接续。三篇样本仍是未完成验收的 WIP，不是全站完成。**

核心原则：能在 Dot 上完成的全部在 Dot 上完成。本机只负责送出本地独有成果，以及最终在目标 Windows 机器上执行[最小现场验收](./dot-handoff-plan.md#本机必须完成的最小现场验收)。

## 先签收两个分支

| 材料 | 分支及准确定位 | 用途 |
| --- | --- | --- |
| 实施成果和本次交接文档 | `codex/full-site-chinese`；交接前源码基线为 [`ef79e9951c5caf43858f4333879ce759f323b1a2`](https://github.com/Penn-dev/AI-hero/commit/ef79e9951c5caf43858f4333879ce759f323b1a2) | 以本文件首次发布所在提交为接续起点；发布后完整 SHA 记在 [PR #7](https://github.com/Penn-dev/AI-hero/pull/7) 的交接发布回执及用户任务说明中。本次文档提交不改代码或内容。旧源码基线不是本次分支头。 |
| 本地独有三篇样本 | `codex/full-site-samples`，[`2861de1a7afcfafe4ec29044abbab7d51d052974`](https://github.com/Penn-dev/AI-hero/commit/2861de1a7afcfafe4ec29044abbab7d51d052974) | 已发布完整正文、索引/manifest、配置、旧来源归档、逐页检查、浏览器记录及 6 张截图；由 Dot 整合到实施分支，保留样本分支。 |

核对用户任务说明中的实施分支准确提交及样本 SHA。先确认[样本检查点](https://github.com/Penn-dev/AI-hero/blob/2861de1a7afcfafe4ec29044abbab7d51d052974/reports/full-site/samples/checkpoint.md)、[逐页进度](https://github.com/Penn-dev/AI-hero/blob/2861de1a7afcfafe4ec29044abbab7d51d052974/reports/full-site/samples/progress.json)和[截图目录](https://github.com/Penn-dev/AI-hero/tree/2861de1a7afcfafe4ec29044abbab7d51d052974/reports/full-site/samples/screenshots)可读取，再整合并记录新提交。缺材料就报告具体缺项，不重做已完成正文、不重新取得来源、不用整份覆盖处理共享索引冲突。

本机旧工作树和 Dot 可有不同换行设置。保留 `.gitattributes` 的 `content/** -text`；来源哈希不可为消除错误而改写。报告目录草稿可能因检出换行发生字节变化，样本配置按[交接计划](./dot-handoff-plan.md)切到已接入正文并实际 preview/apply，而不是只换 hash。旧报告中的 `E:/...`、localhost、端口、PID、Kimi 会话和本机代理 ID 只作历史证据；按本入口对应的仓库文件读取，Dot 使用自己的运行实例。

## 现行材料与依赖

先读[总规格 #1](https://github.com/Penn-dev/AI-hero/issues/1)及[任务入口](../../docs/specs/full-site-chinese-tickets.md)，再读 [CONTEXT.md](../../CONTEXT.md)、[制作规范](../../docs/localization.md)、[接页入口](../../docs/full-site-assembly.md)、[交接计划](./dot-handoff-plan.md)和样本检查点。初始未提交的规格与访谈/决策材料已保存；完整规格在 Issue 中，不需要重新运行 to-spec/to-tickets。

固定首版为 **195 个唯一公开文字页面：113 Markdown、82 HTML**。使用[来源 manifest](../../content/source/manifest.json)、[范围与缺口](../full-site/source-scope-2026-10-13.md)、[范围清单](../full-site/source-scope-2026-10-13.json)和[页面分组](../full-site/production-assignment.json)。不重新全量取源，不追赶原站新增。分组为样本 3、词条/Skills 110、其余文章/教程 82，只表示分组，不是完成数量或代理配置。

| 任务 | 发布时实际状态 | Dot 下一步 |
| --- | --- | --- |
| [#2 来源与规范](https://github.com/Penn-dev/AI-hero/issues/2) | 已完成并关闭，固定范围及离线链接修正已验证 | 复用来源和规则。 |
| [#3 安全接页](https://github.com/Penn-dev/AI-hero/issues/3) | 工程及返修已整合，等待公共渲染真实页面证据 | 随样本补验，符合完成标准后关闭。 |
| [#4 三类样本](https://github.com/Penn-dev/AI-hero/issues/4) | 三篇正文、逐节检查、接页完成，浏览器只部分通过 | 整合 WIP，补齐下列未验项，记录结果后关闭。 |
| [#5 全站制作](https://github.com/Penn-dev/AI-hero/issues/5) | 未开始，依赖 #4 | 按固定范围小批次完整制作，每页保存五项检查，保留合格旧稿。 |
| [#6 本地交付](https://github.com/Penn-dev/AI-hero/issues/6) | 未开始，依赖 #5 | Dot 完成全站对账、首页/导航、构建、浏览器、审阅和交付文档，仅返交最小现场验收。 |

原本机暂停记录仍保留；本任务说明送达后的现行分工以本入口和交接计划为准，不恢复本机代理。Dot 的角色、模型和推理强度与用户确认：启动前集中提交数量、角色/职责、模型、推理强度、并发及理由，完整方案获批后执行；方案变化再确认。

## 第一轮只补齐这些样本验收

- 系统提示词：1440/390、实际正文/原例、术语弹层及独立跳转、原站入口、横向溢出。
- AGENTS.md：1440、章节深链和刷新、术语独立跳转；查看已经保存但尚未查看的折叠/Prompt 截图。390 宽度、术语弹层、两处折叠和完整中文 Prompt 的真实复制比对已有证据。
- Output：390 和真实复制比对；最新修复后的代码框标签、空文字稿说明、解答入口；确认锚点及刷新。旧构建桌面部分证据有效，但不能替代最新修复后的页面检查。

AGENTS 桌面验收语句报错、Output 剪贴板读取超时均是未完成结果，不据此宣称页面通过或网页失败。样本树学习校验及最新构建已有通过记录；内容校验剩 8 篇非样本旧稿来源差异，由 #5 对照复核，不只改 hash。

具体记录位于样本提交的 `reports/full-site/samples/`：`*-check.md`、`*-preview-final.log`、`*-apply-final.log`、`build-final.log`、`learning-validation-final.log`、`content-validation-final.log`、`browser-*.json` 和 `screenshots/`。整合后用仓库相对路径读取。[工程记录](../full-site/assembly/README.md)保留已有相关测试/构建及 lint 基线；已有结果符合当前修订和环境时复用，修改影响的部分才补检，不把历史结果写成当前全套通过。

## 制作、返交和收尾

完整中文化、原代码/命令/配置及英文 Prompt 保留、完整可复制中文 Prompt、明确译注、来源缺口和五项实际检查均按规格执行。构建、接页和计数不代替语义与真实页面验收。不使用 API 翻译器，不重建课程/聊天/CI/知识平台，不虚构 Output 缺失的视频、文字稿、环境或解答，不声称未验证教程可独立运行。

首页当前仍是固定展示文案，Dot 在 #6 接入实际完整中文首页。由 Dot 完成整合、代码审阅及范围内返修，每批提交简短进度：准确提交、已完成页、证据位置、具体未决项和下一步。交付说明和证据保存在仓库，不能只留 Dot 内部临时路径。

Dot 返交准确候选提交与使用说明，本机只执行：取得候选 → 启动 → 首页和三类代表页实际阅读、深层地址直接访问及刷新 → 停止 → 再次启动及必要遗留状态检查 → 返回实际证据。代码、配置和文档返修继续由 Dot 承担，本机只重测受影响步骤。

现场尚未通过前，#6/#1 保持开放，PR #7 保持草稿。收到本机证据后，由 Dot 核对全部完成标准、保存证据、关闭已完成任务并把 PR 转待审。**不自动合并，不在线部署。**无法继续时报告具体阻塞、已保存提交和最小所需输入。
