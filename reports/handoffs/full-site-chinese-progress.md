# 全站中文化实施进度

**状态：本机实施暂停；已按用户授权发布 Dot 接续材料，尚未发起 Dot 执行。** 最近实施断点仍为三篇样本完成接入、浏览器验收部分完成；#5/#6 未开始。用户发送任务说明后由 Dot 接续，本机只保留本地成果送出和最终最小现场验收。

更新：2026-10-13。工作区：[AIHero](E:/dev/projects/AIHero)。

现行接续以[远端入口](./dot-remote-entry.md)和[交接分工与最小现场验收](./dot-handoff-plan.md)为准。样本分支 `codex/full-site-samples` 已发布，准确提交 `2861de1a7afcfafe4ec29044abbab7d51d052974`；尚未合入实施分支、尚未完成 #4，由 Dot 整合和补验。下方本机代理 ID、会话、端口及旧恢复安排仅供历史追溯，不作为 Dot 的执行配置。

## 当前入口

- 规格：[GitHub #1](https://github.com/Penn-dev/AI-hero/issues/1)、[本地规格](E:/dev/projects/AIHero/docs/specs/full-site-chinese.md)。依赖：#2、#3 → #4 → #5 → #6。
- 实施分支：codex/full-site-chinese；起点 f61f0d5，已整合实现 b9b70a6；主分支包含其后的证据和暂停记录提交；[草稿 PR #7](https://github.com/Penn-dev/AI-hero/pull/7)。
- 初始未提交的 CONTEXT.md、两份规格入口、work-order-review.md 已原样提交保存。
- GitHub 组件读写正常，Git push 正常；不用失效的 gh 登录。2026-10-13 闪退后已核对所有工作树，保留草稿和未提交修复，恢复原代理。

## 实际状态

| 任务 | 状态 | 下一步 |
| --- | --- | --- |
| #2 来源与规范 | 完成并关闭 | 固定195页；链接提取离线修正 aaeebfe 已合入 c192ec9 |
| #3 安全接页 | 工程与返修已整合 | 公共渲染真实页面证据随 #4 补齐后关闭 |
| #4 三类样本 | 暂停：三篇正文、逐节检查、接页、构建已完成 | 浏览器验收部分完成；未全通过，恢复后按检查点补齐 |
| #5 全站制作 | 等待 #4 | 内容A 110页、内容B 82页；三篇样本另计 |
| #6 本地交付 | 等待 #5 | 全站覆盖、首页接入、启动/停止/再启动、交付说明 |

## 来源与已通过验证

- [固定范围与缺口](E:/dev/projects/AIHero/reports/full-site/source-scope-2026-10-13.md)：195个唯一公开页面，113页Markdown、82页HTML；取得时间及范围固定，不重新全量取源。
- [现行制作规范](E:/dev/projects/AIHero/docs/localization.md)：完整忠实中文、保留作者语气/结构/原代码，英文Prompt另附完整中文；明确译注和来源缺口。只用Codex小批次制作，不用API翻译器。
- 来源195份与HTML原始响应hash已核验。离线修正77个含空格href，5项提取回归通过，14个原代码块不变。分配清单中的sourceManifestSha256已刷新。
- 工程 b3a268c、1fcf51c、655437a 已整合 c7f791a。通用接页、隔离写入/失败恢复、上下文相对资源、外部入口、同hash共享证据迁址、旧中文目标/原站绝对URL修复通过相关回归。33项初版测试与build、39项返修回归、5项新增定向测试、scoped lint及真实AGENTS preview证据见[工程记录](E:/dev/projects/AIHero/reports/full-site/assembly/README.md)。
- 原17个中文页保留；当前内容校验仅10处旧译稿sourceHash差异，由#4/#5逐篇对照后更新，不只改hash。旧目标可链接不代表按新来源制作完成。历史lint31项、新增0。
- content/** -text 保持Git检出原字节，避免core.autocrlf改变受hash保护内容。合并时保留此规则。

## 本机历史执行与当前接续

本机原批准方案共4名、最多同时3名；内容A/B与工程 gpt-6.1-sol / xhigh，合并 gpt-6.1-sol / medium。此方案仅记录本机历史授权；Dot 启动子代理前须集中提出数量、角色/职责、模型、推理强度、并发及理由，与用户确认完整方案后执行，不直接沿用本机配置。

| 角色 | ID | 当前工作树/状态 |
| --- | --- | --- |
| 内容A Galileo | 01a13350-d890-7923-9685-7d0e4222814b | [样本树](E:/dev/projects/AIHero/work/full-site-samples)，codex/full-site-samples；WIP 2861de1，干净，已关闭 |
| 工程 Confucius | 01a13350-da7c-7603-b6df-12e2ef76ddb1 | work/full-site-assembly；655437a，干净，暂关闭，后续#6复用 |
| 合并 Hooke | 01a13372-83fa-7a23-8edc-f47e7ead3459 | 主目录；暂关闭，后续批次复用 |
| 内容B | 尚未启动 | #4完成后启动既定第四名，承担#5其余82页 |

- 内容A样本文件在其树 reports/full-site/samples/；三篇为system-prompt、AGENTS.md指南、Output。稿件、接页结果、检查、配置和shared/source-snapshots已在WIP 2861de1提交，工作树干净，保留不清理；尚未合入主分支或作为#4完成提交。来源修正 aaeebfe 已独立整合。
- [样本暂停检查点](E:/dev/projects/AIHero/work/full-site-samples/reports/full-site/samples/checkpoint.md)与progress.json保存剩余项。AGENTS窄屏及Output桌面部分通过；系统提示词、其余视口/交互、Output最新修复后补检未完成。样本树的学习校验/最新构建通过，内容校验剩8篇非样本旧稿来源差异（属于后续#5范围）。
- 所有本机已启动子代理已关闭；没有后台验收继续运行。Dot 按远端入口整合样本，仅补齐未验证或新修订影响的项；#4 完成才推进 #5，样本未验收前不能关闭 #3/#4。本机不恢复旧代理方案。
- [生产路由分配](E:/dev/projects/AIHero/reports/full-site/production-assignment.json)：A110、B82、样本3，总195，无重漏。只表示归属；按实际文章长度分完整小批次，逐页保存五项检查，不以机械计数代替语义/页面验收。
- 两内容树并行时共享index/manifest冲突由合并代理按各目标配置整合，保留其他路由，不用ours/theirs整份覆盖。
- Kimi地址127.0.0.1:10086，session aihero-local-delivery，标签组“AI Hero 本地交付”；恢复浏览器验收时由内容A使用。本次4322测试服务已核实身份后用所属会话Ctrl+C停止，剩余监听0；浏览器标签保留，不按旧PID终止程序。

## 剩余边界

- #6需让app/page.tsx实际读取已制作首页内容，并保证全站入口可达；现状是固定展示文案。旧预览状态的PID24812已确认不存在，不据此结束程序。
- 邮件课程正文、报名后材料、Output视频/文字稿/运行环境/解答等取得缺口按来源报告及具体页面披露；不补答案、不声称课程代码已运行。
- Dot 负责最终内容/整合验收、code-review、相关返修、交付文档和 GitHub 收尾。本机只取得指定候选并完成交接计划中的最小现场验收，把证据交回 Dot；现场未通过前 #6/#1 保持开放，PR 保持草稿。不自动合并、不在线部署。本次发布保留本机工作树、原分支和必要证据。

主代理补充修复：1fe2dc7/4da28cf 修正旧学习检查，并识别解答标题前的空文字稿；b9b70a6 避免中文Prompt框被标成原代码。完整学习检查和4项渲染测试通过；定向lint仅原基线表格tabindex项、新增0。样本树已合入并重建这些改动，但最新Output页面补检尚未全部完成。
