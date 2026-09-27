# 小样本流程验证：共同准备

**总状态 HOLD：词典 READY，Workshop HOLD。输入隔离、冻结清单和计量方法 PASS。** 尚未开始任何翻译、编校或页面装配。词典可由治理决定独立启动；两篇完整比较须先解决 Workshop 历史版本范围，不能换样本或降低标准。

## 交付入口与归属

- [冻结输入和完整白名单](E:/dev/projects/AIHero/reports/flow-validation/preparation/frozen-inputs.json)：原文、治理金标准、规范、旧术语表、共享资产、必要展示依赖、试验输入和脚本的路径/SHA-256。金标准和原共享资产只供治理/准备者，不在执行任务白名单。
- [共同输出合同](E:/dev/projects/AIHero/content/pilots/flow-validation/inputs/common/contract.json) · [辅助字段 schema](E:/dev/projects/AIHero/content/pilots/flow-validation/inputs/common/learning.schema.json) · [阶段记录 schema](E:/dev/projects/AIHero/content/pilots/flow-validation/inputs/common/stage.schema.json) · [同一事实疑点说明](E:/dev/projects/AIHero/content/pilots/flow-validation/inputs/common/issues.json)。共同内容约定结果和格式，不提供样本译文或新概念定义。

| 任务 | 可直接交给执行者的说明 | 唯一结果写入目录 |
| --- | --- | --- |
| A 初译，Terra/medium | [A/draft](E:/dev/projects/AIHero/content/pilots/flow-validation/inputs/A/draft.md) | [A/draft](E:/dev/projects/AIHero/content/pilots/flow-validation/A/draft) |
| A 编校，Sol/medium | [A/edited](E:/dev/projects/AIHero/content/pilots/flow-validation/inputs/A/edited.md) | [A/edited](E:/dev/projects/AIHero/content/pilots/flow-validation/A/edited) |
| B 初译，Terra/medium | [B/draft](E:/dev/projects/AIHero/content/pilots/flow-validation/inputs/B/draft.md) | [B/draft](E:/dev/projects/AIHero/content/pilots/flow-validation/B/draft) |
| B 编校，Sol/medium | [B/edited](E:/dev/projects/AIHero/content/pilots/flow-validation/inputs/B/edited.md) | [B/edited](E:/dev/projects/AIHero/content/pilots/flow-validation/B/edited) |

每路初译完成后才交同路编校；每个任务独立新上下文，不复制历史聊天。相同顺序为 dictionary → workshop；当前 Workshop 只在 stage.json 记 HOLD，不创建对应正文/辅助。每个任务只写自己目录内的 `<key>.md`、`<key>.learning.json` 和 `stage.json`。共同输入/报告/脚本由本准备任务唯一维护；生产任务不改它们。治理尚未提供四个任务 ID，计量注册待创建后补入，不在此处自动创建。

A 仅使用共同原文、原规范、原术语表和共同合同；B 额外使用已过滤的 [dictionary 知识输入](E:/dev/projects/AIHero/content/pilots/flow-validation/inputs/B/dictionary.json)与 [workshop 知识输入](E:/dev/projects/AIHero/content/pilots/flow-validation/inputs/B/workshop.json)。B 不携带 referenceTranslation、审计入口、原中文证据及金标准中文原句；保留共享定义、适用范围和教学 profile。字段检查已拦截残留的旧译稿引用字段并完成修正。

两路白名单相同的公共部分逐字共用文件；对方输入和产物均不允许读取。隔离依赖任务白名单和新上下文，不是操作系统级权限隔离。B 的知识资产曾参考这两篇旧译稿，已披露；这验证已知样本的流程重用，不是未知文章泛化，也不是严格独立或具有统计显著性的试验。

## Workshop 判定

[官方核对记录](E:/dev/projects/AIHero/reports/flow-validation/preparation/official-version-evidence.json)只涉及两个官方 URL：[SDK 6 发布记录](https://vercel.com/blog/ai-sdk-6)可读，[6 迁移指南](https://ai-sdk.dev/docs/migration-guides/migration-guide-6)通过当前网页工具两次不可读。

发布记录日期为 2025-12-22，展示了 SDK 6 的 `generateText` 配合 `Output.object` 方向。本地课程 frontmatter 却标注 2025-09-09；这个字段不能证明下载正文对应当时版本，也不能据此认定其内容错误。现有证据仍无法确定课程锁定依赖、预发布范围或结尾版本说法，故 **Workshop HOLD**。最小未决输入是课程的版本锁定信息或可追溯的历史内容/版本依据；本轮不查第三个页面。原文完整保留，运行验收独立标记 NOT_RUN，没有运行课程、模型或收费请求。

## 计量方法与真实验证

[只读采集器](E:/dev/projects/AIHero/scripts/flow-validation/measure.mjs)沿用旧计量脚本的本地日志来源，增加 `token_usage_record` 的 response ID 去重和 turn 边界。仅保留 usage、任务/请求 ID、model/effort、起止事件等计量字段，不输出消息或工具正文。按请求 usage 求和，逐步与 turn 累计核对，再核对 thread 累计；缺记录、冲突重复或计数异常返回 HOLD，不能跨重置取差。

[真实记录](E:/dev/projects/AIHero/reports/flow-validation/preparation/usage-evidence.json) · [方法测试](E:/dev/projects/AIHero/reports/flow-validation/preparation/method-validation.json)已验证本任务两个有完成边界的历史阶段：

| 已完成阶段 | input | cached input | output | reasoning | total |
| --- | ---: | ---: | ---: | ---: | ---: |
| 知识基础生产，17 请求 | 1,253,757 | 1,151,360 | 23,057 | 3,223 | 1,276,814 |
| 验收修正，8 请求 | 909,971 | 786,432 | 10,361 | 1,699 | 920,332 |

两者均记录为 gpt-6-astra / medium；已知一次性历史投入合计 **2,197,146 total tokens**，不含更早公共辅助、历史 UI 返工和治理成本，后者仍 unknown。cached 已在 input 内，reasoning 已在 output 内。记录只证明本地遥测量，不等同账单核对；来源/资产关联是阶段回溯关联，遥测本身不证明每个请求读了哪些文件。

当前共同准备是新增投入，单列为活跃轮次 PARTIAL，运行采集器时的记录只是截至该时点的已观察量，不是本轮最终成本。收尾消息与通知仍会计量，最终值须在 task_complete 后读取。未来每篇保留阶段记录，但同一任务内无法精确分摊时只报批次成本，失败/重试无证据则 null。任务/轮次数只是工作量限额，没有平台 Token/美元硬上限。

准备者刷新记录：`node scripts/flow-validation/measure.mjs --write`。治理仅需只读查看时省略 `--write`（`--full` 输出去除正文后的请求明细）；生产任务不运行这个共同目录写入命令。后续仅向[注册清单](E:/dev/projects/AIHero/reports/flow-validation/preparation/telemetry-registry.json)加入实际获授权的四个任务及精确日志路径，不扫描无关会话。

## 页面装配接口（仅设计，尚未实施）

每篇正文是完整 Markdown/MDX，辅助独立 JSON。字典的 start.summary 是一句话理解，check 为 null；练习的 start/cards/check 表达目标、准备、边界和完成条件。双方自行生产 glossary、prerequisiteIds、related、sourceGaps；explanations 用原文完整原例的行号定位，英文原例保留在正文，中文理解装配到其后。原规范“文末词典”改为独立字段交付，由同一适配器展示，不由准备者代写。

后续仅在预定的 `E:/dev/projects/AIHero/app/review/flow-validation/` 新增同一薄适配器和匿名对照入口（目录当前尚未创建）。直接复用 ArticleLearningGuide、ArticleLearningTools、LocalizedMarkdown、复制按钮、现有样式及结构解析器；glossary/profile 显式由各自 learning.json 构造，`term-` ID 与 prerequisiteIds 对齐。正文解释插入只做确定性装配，锚点缺失/歧义即报错，不补写解释。

不直接调用现有 LocalizedArticle/learningGlossary/learningProfile：它们会读取旧 pilot-knowledge 或全局内容索引，且有金标准对比入口。底层展示组件不需这些旧内容；ArticleLearningGuide 对 LearningProfile 只是 type import。链接传空 availableRoutes，双方原站链接一致回英文页，不进入已有中文答案。空源文说明由各路 sourceGaps 显示，缺辅助时显式缺失，不用旧 profile 或共享库回填。

当前目录允许以上局部适配，尚未发现必须扩大写入范围。只有编校交付并收到治理通知后才实施。最小后续验证：先两路结构/原例/元数据/锚点检查；确认页面无旧辅助数据入口；按需类型检查和一次构建；同视口桌面与窄屏查目录、单项术语/搜索切换、代码滚动、原例与中文理解相邻、链接和缺项说明，再由治理同12维度比较完整成品。构建/浏览器和课程运行分别记录，不互相替代。当前没有运行构建、服务或浏览器。

## 放行和停止

每版本一次初译、一次编校，最多一次治理安排的实质问题局部修正；仍不合格记失败，不重译整篇、不加模型、不扩大到全站。G1中间可停止不等于G2等质量放行；最终先看完整成品质量再看包括一次性、逐篇、异常返工、装配验收与治理的总成本。当前准备完成并停在上述 HOLD 边界。
