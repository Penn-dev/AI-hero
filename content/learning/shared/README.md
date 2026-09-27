# 共享知识基础 v1

当前阶段以[公共基础收口](E:/dev/projects/AIHero/reports/knowledge-foundation/current-stage.md)为准。旧单篇报告中的“下一步”不自动续行；已有样本用于验证明确的公共问题，不继续滚入逐篇生产。

后续文章的术语中英文、示例与新增辅助排列遵循[展示规范](E:/dev/projects/AIHero/content/learning/shared/display-conventions.md)，避免重新逐篇决定同类问题。

后续单篇进展：[系统提示词修订与整页检查](E:/dev/projects/AIHero/reports/knowledge-foundation/system-prompt-acceptance.md)已完成本轮编辑及页面交互检查，真实零基础试读仍待确认。学习地图 firstBatch 保留第一层交接时的状态；该词条的最新处理状态以此单篇记录为准，旧A/B页面不随之通过。

2026-09-22 补充：全站第一层粗地图、核心先修骨架和首批输入缺口已整理到[学习地图](E:/dev/projects/AIHero/content/learning/shared/learning-map.json)，阅读入口见[第一层结果](E:/dev/projects/AIHero/reports/knowledge-foundation/first-layer.md)。186 篇均有粗定位，原 108 篇未分类文章已在补充层定位；旧清单的正文审读与分类字段保留历史状态，不用粗分类覆盖。核心定义沿用 29 项，补充 7 项。此完成范围不代表全站正文已审、文章可生产或网站质量通过。

以下旧阶段说明中的“尚未运行实际任务”“成本未知”等描述是当时记录；后续 A/B 已发生，但两版均未通过最终整页质量，不能认定等质量省 Token。当前首批阻塞见学习地图的 `firstBatch`。

这是供小样本生产验证使用的独立资产，不是当前页面的数据源，也不是全站翻译或教学质量通过证明。既有页面仍读取旧 `pilot-knowledge.json`。本阶段不接入生产调度。

## 入口

- [内容地图与覆盖清单](E:/dev/projects/AIHero/content/learning/shared/content-map.json)：186 篇本地原文，稳定 ID 使用 manifest 的完整 route；保留源 URL、实际 SHA-256、标题、原始类型、主题标签、章节、链接、代码及版本风险信号。
- [共享概念、教学规则和质量门](E:/dev/projects/AIHero/content/learning/shared/knowledge.json)：29 个概念、三类样本 profile、三阶段质量门及审读证据。
- 完整审计包：[练习](E:/dev/projects/AIHero/content/learning/shared/task-input-workshop.json) · [词典](E:/dev/projects/AIHero/content/learning/shared/task-input-dictionary.json)。保留完整依据及治理规则，供核对和追溯。
- G1 精简执行视图：[练习](E:/dev/projects/AIHero/content/learning/shared/task-execution-workshop.json) · [词典](E:/dev/projects/AIHero/content/learning/shared/task-execution-dictionary.json)。供后续正文与辅助生产/审核按需取用，尚未运行实际任务或接入页面。
- [交接与限制](E:/dev/projects/AIHero/reports/knowledge-foundation/handoff.md) · [机械校验](E:/dev/projects/AIHero/reports/knowledge-foundation/validation.json) · [历史用量证据](E:/dev/projects/AIHero/reports/knowledge-foundation/cost-evidence.json)。

## 如何取得一篇文章的输入

先读 `learning-map.json → articles` 中的本篇粗定位、`firstBatch` 中适用的阻塞项，以及 `boundaries` 中按 articleIds 或 conceptIds 命中的边界。概念查找先查学习地图的补充 `concepts`，再查下述 `knowledge.json`；已有定义不复制。主题的核心概念和学习路径只用于导航，不自动变成每篇文章的必要先修。两个旧执行包没有嵌入这次补充，后续任务必须同时携带适用补充，不能只给旧执行包。指南当前只有 profile，尚无精简执行包。

1. 以完整文章 ID 查 `knowledge.json → articles[id]`。没有 profile 的文章仍需先确认类型和必要概念；不能只凭索引批量生产。
2. 取 `conceptIds`、`prerequisiteIds` 及 `dependsOn` 的闭包。每个定义含中英文名称、别名、适用范围、证据行号、置信度和教学依赖理由。
3. 优先使用对应 G1 执行视图：包含完整本篇英文原文、全部必要概念及适用范围、类型要求、G1 门、G2 放行边界与本篇全部未决项。现有译文以路径和哈希引用，供后续编校按需读取。
4. 按 `outputContract` 交付正文、独立标注的辅助、清洗记录、质量门结论与用量。这里的示例只演示输入装配，不生成译文。

通用定义在 `concepts`，文章特定解释在 `articles[id].articleSpecific`。`relatedNotPrerequisite` 只指相关阅读，不表示先修关系。依赖是零基础读者的理解顺序，不是软件安装依赖，也不是所有概念间的知识图谱。

执行视图的 `audit.path/sha256` 锁定审计包；`auditRef`、`onDemand` 是该包内的 JSON Pointer，例如 `/concepts/schema` 指向 schema 的完整记录。重复本篇原文的证据通过 `within: source.text` 加行号定位；外部证据以路径、哈希和行号定位。定义的完整证据上下文、依赖理由及通用治理说明按需读取，不在执行视图中重复铺开。

涉及未决判断时保留判断所需证据：Output 版本疑点可直接定位本包原文第 15、89–93 行；词典的优先级范围疑点除本包原文外，仍直接附带金标准译文第 20 行。辅助归属记录可按需追溯，不能因未嵌入整份记录而省略后加辅助审核。

## 覆盖字段怎么读

| 字段 | 含义 |
| --- | --- |
| `scriptCovered` | 本地脚本已提取该文件；不表示全文进过模型或语义审核 |
| `bodyReviewed` | 本轮为制作基础资产读过完整正文；不表示逐句翻译审校通过 |
| `reviewedRanges` | 人工实际用于判断的来源范围，区分全文与局部片段 |
| `semanticRelationsConfirmed` | 该文章的教学依赖 profile 已由生产者核对；仅三篇样本，不是整篇质量认证 |
| `candidateConcepts`、`riskSignals`、`topicSignals` | 词法、结构或来源标签候选；须按语境判断，不能当作已审定义或事实 |
| `classificationStatus` | 区分结构分类和正文核对；未确认的普通文章保留 `article-unclassified` |

正文审读覆盖三个样本原文及三个对应译稿；另读取 14 个词条的必要概念片段。清单的源文覆盖因此是 3 篇全文、14 篇片段、169 篇未作正文语义审读。依赖判断和概念定义目前都是本轮生产者审核，尚无独立语义或零基础读者验收。

提取复用现有 unified / remark Markdown、GFM、MDX 解析器，代码内标题不计作章节。显式 Markdown 链接、图片、链接定义和静态 JSX href/src 被提取；裸网址、动态 JSX 属性不保证穷尽。概念候选最多保留每篇 80 项，达到上限时单独标记；这不是完整的全站概念提取。版本与促销信号是筛查线索，不自动判错或删除。全站学习路径和课程先后关系未做语义确认。

## 三阶段、同一组 12 个维度

- G0 输入与共享依据：来源和 ID 有效，类型与必要先备明确，缺失和冲突入包。到此可交给生产或审核，不能批准发布。
- G1 正文与新增辅助：解决实质事实、遗漏和教学问题后，可按“不妨碍理解”结束本轮中间处理并转交 G2；这不代表最终等质量通过。后来新增辅助必须重新审，不继承先前译文的审核状态。
- G2 最终整页：对照冻结的金标准质量水平，用同一 12 维度判断完整成品，并完成适用的桌面/窄屏阅读交互、运行及零基础理解验收。中文自然度和零基础可理解性不能仅因机械通过或基本看懂就自动 PASS。适用但未验证或有实质差距时保持 PARTIAL/HOLD，不适用项说明原因。

金标准以 `G2.qualityReference` 的路径和哈希冻结，是质量水平参照，不代表其中每条事实正确；来源疑点仍需核对。词典、练习和指南沿用各自教学结构，不机械套用同一版式。复用未受影响证据，只处理实质差距，不为 12 个维度分别增加模型或无限润色。

固定名称和阶段责任详见 `qualityDimensions` 与 `gates`，没有拆成 12 套生产链。源文、正文译文、中文辅助、展示层各负其责，详见 `productionRules.layers`。

只有措辞变化时检查句子及上下文；定义、别名或依赖变化时沿概念依赖和文章引用找受影响内容，重生成输入包。源哈希变化先审差异，不能只换哈希。模板及展示公共能力变化要检查其全部受影响引用。已通过而未受影响的证据可以复用。

旧翻译规范固定 Terra→Sol；此资产仅提出按实际风险选择流程的候选，不自动替换旧规范。具体模型组合、试验预算及既有页面的修改由治理决定。

## 本地命令

校验新补充层（只读，不重建原清单或旧输入包）：

```powershell
node scripts/knowledge/check-learning-map.mjs
```

此检查验证全站覆盖、源哈希、证据范围、概念及阶段先修、首批阻塞保留；不替代语义审读。补充层锁定旧清单和知识文件的哈希，来源变化时需先复核差异再更新引用。

在项目根目录运行 [轻量脚本](E:/dev/projects/AIHero/scripts/knowledge/foundation.mjs)：

```powershell
node scripts/knowledge/foundation.mjs generate-views
node scripts/knowledge/foundation.mjs check-views
```

以上是本次修正的范围内命令：复用原内容地图，更新两个审计包和两个 G1 执行视图；校验源文、概念和未决项不丢失、引用可解析、确定性生成，并把字符量和阶段门文字复核记录写入现有验证报告的 `viewRevision`。本次修正前的字段/证据哈希保存在[基线记录](E:/dev/projects/AIHero/reports/knowledge-foundation/view-revision-baseline.json)，用于确认无关内容没有变化。

原 `generate/check` 命令仍用于后续真正影响全基础资产的改动：生成覆盖注记及两种视图，全面检查来源、依赖、类型等并运行原错误样例。本轮只执行视图校验，没有重跑全站清点和旧依赖负例。

字符量统一以 `JSON.stringify(value).length` 记录，即去缩进 JSON 的 UTF-16 代码单元数；完整原文使用原始 `source.text.length`。这是输入规模诊断，不是 Token 或费用估计。两种视图的最新数字见验证报告，实际模型是否正确使用执行视图、最终质量和 Token 节省仍未知。

仅在需要重新清点本地源文时运行 `node scripts/knowledge/foundation.mjs inventory`，然后审查变化并执行完整的 `generate/check`。`inventory` 会重建结构清单；来源改变后旧概念不应直接继续使用，后续 `generate/check` 会因证据哈希失配而停止。`check-views` 的修正基线只适用于本轮，不替代后来概念或来源改动的完整验证。
