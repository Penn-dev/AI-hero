# 全站中文化实施进度

更新：2026-10-13。工作区：[AIHero](E:/dev/projects/AIHero)。

## 当前入口

- 规格：[GitHub #1](https://github.com/Penn-dev/AI-hero/issues/1)、[本地规格](E:/dev/projects/AIHero/docs/specs/full-site-chinese.md)。
- 任务：[任务入口](E:/dev/projects/AIHero/docs/specs/full-site-chinese-tickets.md)。依赖：#2、#3 → #4 → #5 → #6。
- 实施分支：`codex/full-site-chinese`；起点：`f61f0d5`（原 `main`）。
- 当前已整合实现：`c192ec9`；[草稿 PR #7](https://github.com/Penn-dev/AI-hero/pull/7)，未合并、未部署。
- 已核对并原样保留初始未提交文件：`CONTEXT.md`、`docs/specs/full-site-chinese.md`、`docs/specs/full-site-chinese-tickets.md`、`reports/knowledge-foundation/work-order-review.md`。
- GitHub 组件已成功读取 #1–#6，均开放且无评论；继续使用组件，不依赖失效的 gh 登录。

## 实际状态

| 任务 | 状态 | 下一步 |
| --- | --- | --- |
| #2 来源与规范 | 离线修正已完成并整合 | `aaeebfe` → `c192ec9`；77 个完整 URL 修正，195 份字节哈希一致 |
| #3 安全接页 | 定向返修中，已重开 | `b3a268c` 已合入，33 项测试/构建通过；新 Output 相对资源校验问题见下文 |
| #4 三类样本 | 内容 A 执行中 | 从 `81cc249` 开始，逐节核对三篇，修订、接页并真实检查页面 |
| #5 全站制作 | 等待 #4 | 按固定来源分配完整文章批次，保存每篇五项检查 |
| #6 本地交付 | 等待 #5 | 覆盖核对、启动/停止/再启动、使用说明 |

初始清单仍是历史快照：186 份已取得源文、17 个可渲染中文页，不代表当前来源范围或全站验收。`node scripts/validate-content.mjs` 初始运行通过；该脚本只检查 `translated` 状态，而现有 17 页使用其他译稿状态，覆盖缺陷由 #3 修复。

初始 lint 实际失败记录见[基线日志](E:/dev/projects/AIHero/reports/full-site/lint-baseline.log)，仅要求修复本次新增问题。Git 推送 dry-run 已成功，PR 可使用 Git 推送与 GitHub 组件创建。

主代理已补充 `.gitattributes` 的 `content/** -text`，保留记录哈希的内容文件字节。实测此前 `git cat-file --filters HEAD:content/source/index.md` 会因系统 `core.autocrlf=true` 转成 CRLF，哈希从 `47866d18…` 变为 `3f6e77ba…`；补充规则后对首页源文、AGENTS.md 源文及既有中文稿逐一验证，Git 取出字节均与原文件一致。此修正避免工作树合并和后续 checkout 破坏哈希。

当前固定范围为 195 页：113 页直接 Markdown、82 页公开 HTML（含首页）；[范围与缺口](E:/dev/projects/AIHero/reports/full-site/source-scope-2026-10-13.md)和[规范](E:/dev/projects/AIHero/docs/localization.md)已交付。来源与原始响应哈希、6 项 CLI 测试、4 项提取测试通过。主代理真实浏览器抽查系统提示词正文与 11 个术语链接，和恢复稿对应正文一致；[来源页面抽查](E:/dev/projects/AIHero/reports/full-site/source-browser-system-prompt.json)不是译稿或全站验收。

整合后已有 17 页均保留；当前内容校验退出码 1，仅有 10 项旧译稿来源哈希不匹配（codebase-design、8 个词条、Output），没有来源文件哈希错误或其他错误。这些实际版本差异由 #4/#5 对照修订，不能只改哈希伪通过。邮件课程正文、报名后材料、Output 文字稿及运行验证缺项保留至交付。

主代理在固定范围盘点到唯一裸相对资源：Output 的 `generating-objects-via-output~dkm2k/solution`。正确地址是原页目录下的 `/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k/solution`；入口原先以站点根地址校验，会误拒绝正确绝对地址。工程代理已恢复，按原页 URL 进行资源等价校验，并要求译稿明确相对地址；只做定向回归，不改冻结来源或取得答案。#3 重开待修复，#4 正文制作继续。

样本三篇正文与逐节语义检查已落盘，见样本树 `reports/full-site/samples/`。真实接页还发现：旧版但仍可渲染的中文目标被当前源 hash 检查挡住；独立 glossary 隐藏外部入口；显式原站绝对地址被重写为本地；冻结 HTML→Markdown 对含空格 LinkedIn 地址的表示不正确。前者由工程区分“可链接”与“按新快照制作完成”，保留旧 hash/待复核状态，全站校验继续报告差异；显式绝对 URL 保留原站，根路径用于中文概念。来源链接修正由内容 A 使用已保存 HTML 离线处理，保持取得时间和 195 页范围，更新受影响派生 hash，并单独提交。

工程返修已有提交 `1fcf51c`（尚未整合）：原页相对资源、公开页外部入口、共享来源同哈希迁址已通过 39 项测试；工程继续完成旧中文目标与显式原站 URL 两个已确认场景。内容 A 保留旧 `dictionary-source` 的原字节归档与 hash，当前样本 profile 用新 source ID。

浏览器连接：Kimi Browser Extension 已启动并连通，地址 `127.0.0.1:10086`，本任务 session `aihero-local-delivery`、标签组「AI Hero 本地交付」。已打开官方 system-prompt 原页。按需复用，不自动升级；用户未要求关闭标签组。

待后续处理的已确认点：`app/page.tsx` 使用固定展示文案，没有读取中文索引；#5 应制作固定来源的 `/` 页面，#6 核对首页实际渲染与全站入口。旧本地预览状态指向 2026-09-22 的 PID 24812；本次检查无该进程及 4321/5173 监听，不据此终止任何程序。

2026-10-13 闪退恢复：主分支、来源提交和两个工作树未提交成果全部保留；同三名代理已恢复，模型/职责授权不变。来源修正已无冲突整合为 `c192ec9`，合并树与目标提交相同，195 来源字节哈希通过；5 项提取回归、77 个完整 URL 解析、14 个代码原块未变。来源分配清单已刷新 manifest 哈希。工程新增两项修复在其工作树待提交；三篇样本正文已检查，接页和真实页面检查继续。

## 子代理方案与授权

用户已明确批准完整方案，并将前三名推理强度指定为 xhigh。共 4 名，最多同时运行 3 名：内容 A（#2、#4、#5 词条/指南），内容 B（#5 其余文章/教程），工程（#3、#6 与相关返修），合并（整合工作树和冲突核对）。前三名 `gpt-6.1-sol / xhigh`，合并 `gpt-6.1-sol / medium`。主代理负责协调、验收核对、最终 code-review 与 GitHub 更新。复用上述人员返修，不递归委派；变化须另获批准。

- 内容 A：`01a13350-d890-7923-9685-7d0e4222814b`（Galileo）；#4 活动[工作树](E:/dev/projects/AIHero/work/full-site-samples)，分支 `codex/full-site-samples`。#2 树 `work/full-site-source` 已提交且干净。曾遇 429，已用同一代理续接并完成 #2。
- 工程：`01a13350-da7c-7603-b6df-12e2ef76ddb1`（Confucius）；已在 #3 树 `work/full-site-assembly` 恢复，先合入 `03bedbd` 后处理上述相对资源返修；未来 #6 复用同一代理。
- 合并：`01a13372-83fa-7a23-8edc-f47e7ead3459`（Hooke）；在主目录整合 #3、#2 后已关闭，后续恢复复用。
- 内容 B：尚未启动；#4 完成后承担 #5 其余文章/教程。

[后续页面分工](E:/dev/projects/AIHero/reports/full-site/production-assignment.json)仅登记路由归属：除三篇样本外，内容 A 负责词条及 Skills 栏目 110 页，内容 B 负责其余 82 页；总计 195 个地址不重不漏。实际小批次须读完具体文章后安排，该清单不表示已制作或已验收。

## 持续执行边界

- 保留合格既有成果；首轮通过 Codex 小批次制作，不启用 API 翻译器。
- 工程行为使用 TDD 验证关键风险；内容以逐节语义检查、结构校验和真实页面检查验收。
- 内容完成才关闭对应任务。首批合入后开草稿 PR，全部验收后改为待审，PR 不自动合并。
- 本轮为本地交付；在线部署另行安排。#2/#3 定向返修中、草稿 PR 已创建，#4/#5/#6 与规格总览仍未完成。
- 续接先核对本文件、当前 Git 状态、GitHub 任务和代理授权；每批更新完成页面、具体缺口与下一步，避免重做有效检查。
