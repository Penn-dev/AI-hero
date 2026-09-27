# 公共能力工作单：共享资料到生产输入、页面配置

2026-09-27。状态：接口梳理完成，实施待安排。本轮仅新增本工作单；以下接口与字段为建议，尚未实现。

当前阶段遵循[阶段入口](E:/dev/projects/AIHero/reports/knowledge-foundation/current-stage.md)。完成本工作单不表示公共基础已完成，更不切换到内容生产。实施目标是用同一套逻辑切换已有指南、词典配置，取得所需知识和展示数据，明确报告缺项，并限制写入范围。

## 1. 已核实的连接与断点

| 环节 | 已有能力与依据 | 需要补齐的连接 |
| --- | --- | --- |
| 共享资料 | [knowledge.json](E:/dev/projects/AIHero/content/learning/shared/knowledge.json)提供29个概念、3篇教学配置、类型模板、证据和规则；[learning-map.json](E:/dev/projects/AIHero/content/learning/shared/learning-map.json)补充10个概念、边界及粗定位；两层概念ID目前无重名 | 共同读取两层；粗地图、firstBatch历史提示与已确认文章配置分开使用 |
| 基础输入 | [foundation.mjs](E:/dev/projects/AIHero/scripts/knowledge/foundation.mjs:96)的 packages、executionView、checkExecution 已有依赖闭包、证据去重、审计引用与精简投影 | 只读基础层；packageIds及输出名称绑定旧练习/词典；证据定位仅支持sourceId；执行视图含特定finding ID分支 |
| 指南输入 | [prepare-first-batch-inputs.mjs](E:/dev/projects/AIHero/scripts/knowledge/prepare-first-batch-inputs.mjs)已有双层取用、两种证据形式、原例提取和现行文档引用 | articleId、输出路径、概念总数、额外概念、边界、示例行号、治理决定和清洗候选均写在脚本中；还强制要求firstBatch记录 |
| 页面装配 | [assemble-agents-md-page.mjs](E:/dev/projects/AIHero/scripts/assemble-agents-md-page.mjs)已有frontmatter拆分、正文接入及三份JSON更新 | route、路径、glossary、profile、时间和阅读时长固定；部分来源和相关阅读校验发生在写入之后；workflow写死浏览器验收结论 |
| 页面读取 | [article-learning.ts](E:/dev/projects/AIHero/lib/article-learning.ts:29)按route读取pilot配置；glossary存在时优先使用，否则取pilot全局concepts | 共享知识不会自动生效。可输出现有LearningProfile，无需切换页面数据源或重建组件 |
| 既有验证 | [validate-system-prompt.mjs](E:/dev/projects/AIHero/scripts/validate-system-prompt.mjs)可核对定义、别名、证据、原例；[validate-learning-pages.mjs](E:/dev/projects/AIHero/scripts/validate-learning-pages.mjs)检查现有页面结构 | 提取适合目标文章的断言；旧输入锁定的整文件哈希不能直接充当新公共接口验收 |

生产知识集合与页面词条集合不是同一集合。指南页面13个词条中，symbolic-link不在共享池；token、context、progressive-disclosure、monorepo、package-manager、skill的现有页面定义与共享定义不相同。这是字符串比较结果，不是六项内容错误判定。系统提示词现有glossary定义均与对应共享定义相同，可作为低干扰的跨类型样本。

## 2. 最小实施范围与顺序

### A. 收口现行规则及取用关系

修改位置限定为[展示约定](E:/dev/projects/AIHero/content/learning/shared/display-conventions.md)、[分工说明](E:/dev/projects/AIHero/reports/knowledge-foundation/astra-exit-plan.md)、[共享入口](E:/dev/projects/AIHero/content/learning/shared/README.md)，以及knowledge.json中直接冲突的规则字段；[阶段入口](E:/dev/projects/AIHero/reports/knowledge-foundation/current-stage.md)仅同步“转述问题待处理”的分层决定。

- 展示约定作为人称规则的正文来源：保留原文人称、语气、条件和直接教学关系；事实范围需要限定时，使用少量、明确标识的译注。原文引用别人时保留引用关系。已知错误登记处理，增加“作者认为”不能代替核查。
- 分工说明引用该规则；后续精简任务书直接带规则入口与适用要求。已有指南转述稿的修复放到内容阶段，届时定点修订再更新页面。
- shared README的取用步骤指向新公共入口；将旧固定模型分工、旧包状态标为历史，不把旧包描述当现行执行指令。无需润色全文或重写历史报告。
- knowledge.productionRules.compatibility中“试验时选择旧固定分工”的表述改为引用现行分工；templates.workshop-lesson.omit中的“缺少环境只能认定阅读版就绪”改为报告缺项并保留HOLD，改变教学目标须由用户决定。
- 现行规则引用至少包含阶段、分工、展示约定；类型模板继续取knowledge.templates[kind]。规则和模板分属不同文件，但入口明确，不强制合并。

停止：入口优先关系清楚，三个下述片段足以分辨直接教学、译注和真实引用；不修整篇指南。

### B. 从现有装配器提取按文章取用的公共逻辑

以foundation.mjs为主复用依赖、证据和执行视图逻辑，从指南输入脚本吸收双层概念和直接路径证据支持。允许新增一个小型可导入模块，把CLI与纯装配逻辑分开；不另建调度平台。旧脚本及旧产物保留历史用途，新流程不调用它们批量重生成。

建议公共调用接收articleId及文章内容配置，默认只返回结果。输入结构沿用已有profile、concepts、source、evidence、template和规则引用，不创建第三套知识库。

| 内容归属 | 最小处理 |
| --- | --- |
| knowledge.articles[articleId] | 继续存教学类型、必要概念、先修、文章特定判断；按类型required验证，缺profile即报告，不能凭粗地图自动生产 |
| 文章内容配置 | 从已有脚本/页面迁出articlePath、参考译文、linkTargetsPath、额外概念ID、示例范围、治理决定、清洗候选和页面教学字段；建议一个按文章ID索引的小配置文件，实施时命名。只迁移两个验证样本需要的现有值 |
| 双层concepts | 按所需ID取依赖闭包，复用循环检测；取消29/10/39等固定数量断言；同ID冲突明确报告，不用对象展开静默覆盖 |
| 证据 | 将sourceId引用与path/sha256引用归一定位，按路径和范围去重；检查哈希、整数行号及非空范围；保留scope、confidence和来源，不将证据片段当成新定义 |
| boundaries | 以articleIds命中或所取conceptIds命中形成候选；文章配置可记录适用/排除及理由。边界提示不自动增加先修，也不因命中一个条件性HOLD就判整篇HOLD |
| findings / firstBatch | 保留来源和历史状态；当前已处理项用明确决定及证据引用说明，不自动抹除、不把历史nextInputStep当命令。firstBatch不是必需的文章注册表 |
| 原例、执行视图 | 原例范围取配置，不写进通用代码；复用审计引用和按需阅读。移除特定finding ID决定证据展开的分支，改用显式配置选择必要上下文 |

装配成功仅表示资料可解析。建议诊断至少带articleId、字段/概念ID、来源位置、原因及阻断范围，区分结构失败、待内容判断、运行HOLD；不生成固定G0 PASS，也不自动放行内容或发布。

停止：指南及词典同一入口都能获得各自依赖、证据、规则和展示选择；换配置无需复制脚本，缺项能定位。不写新的逐篇生产包。

### C. 生成兼容现有页面的目标文章更新

复用指南装配器的正文解析和目标记录更新，输出仍为现有index、manifest、pilot-knowledge结构；lib/article-learning.ts保留读取方式。首先提供内存预览或临时副本验证，不直接覆盖正式页面。

- 页面共享词条按显式显示ID取共享定义与别名；标题格式集中按展示约定处理。依赖闭包服务生产理解，不自动把全部依赖显示成页面词条。
- 现有start、check、questions、related、originalExamplesInline等教学字段由内容配置提供，脚本不编写教学文案。原例从已验证来源范围取得。
- 文章专属词条及确有语境差异的定义，迁移为带来源、理由、状态的显式局部配置。指南六项差异先报告；symbolic-link保留现有内容并标明共享池缺项及来源待核对，不临时补共享概念来凑通过。
- 共享定义差异需要取舍时，输出待判断的变更，不自动覆盖。系统提示词可验证无此差异时的完整投影；指南可验证差异报告和局部值保留。
- 相关阅读仅允许目标清单中已有中文页，且核对index中存在正文；待建目标留制作元数据，不生成英文或404跳转。
- 正式写入接口只允许目标route在index.pages、pilot.pages及manifest对应记录变化，以及目标独有来源记录。全局concepts和其他页面保持不变；共享sourceId若被其他页面使用，报告影响，不能静默改动。
- 全部来源、链接及配置校验在任何写入之前完成。写入三文件前保留本次原值，失败恢复；写入前再确认读入后目标文件未被别人改动。manifest只记装配事实，不能写入未发生的浏览器/内容验收。

停止：两个类型经同一投影取得兼容数据；对临时副本更新后，其他route和全局概念未变；失败路径不留下半份结果。正式页面接入不属于本工作单规划轮。

## 3. 已有样本、最小内容与停止观察

下表先定义样本边界，再用于实施验证。本轮只做静态读取与字段比较，未运行新公共接口。

| 公共能力 | 使用的现有内容 | 观察到什么即停止 |
| --- | --- | --- |
| 人称规则 | [指南英文](E:/dev/projects/AIHero/content/source/a-complete-guide-to-agents-md.md:52)的自动生成建议及[中文](E:/dev/projects/AIHero/content/learning/agents-md/article.md:58)；英文18–22行与中文20–24行的位置说明；英文56–58行与中文62–66行的Humanlayer引用 | 第一组保留直接建议，第二组只把必要限定放明确译注，第三组保留真实引用关系；不续读并改整篇 |
| 双层取用、局部定义 | 指南profile、脚本中的system-prompt/context选择、现有13词条；原文20行和一段已有示例范围 | 基础层与补充层均可解析，来源可定位；六项定义差异和symbolic-link缺项明确报告；不逐条重编定义 |
| 换文章类型 | 系统提示词profile、现有页面教学字段及原文18、20行两个原例 | 同一入口选择dictionary模板，保留原例和questions字段；共享定义取值一致，未套入指南专属卡片和路径 |
| HOLD传递 | Output的environmentBoundary、exerciseBoundary及firstBatch中版本、运行材料、文字稿缺项 | 缺项可读、HOLD保留；不加载完整课程、不查SDK、不降为阅读版、不生成页面 |
| 目标隔离与明确失败 | 指南/词典配置和index、manifest、pilot的临时副本；仅在内存构造未知概念、依赖环、缺来源、无效范围、重复ID冲突、失效中文目标 | 诊断定位文章及字段；校验失败无写入，成功时仅目标允许字段改变；一次相同输入重复投影结果一致 |

若实现只改装配和配置，先跑上述聚焦检查以及受影响的现有结构检查。没有展示组件改动时不启动浏览器；确有渲染改动才检查受影响区域。技术结果不代替内容忠实度或零基础试读。

## 4. 历史校验与实施交付

foundation.mjs的check/check-views会写验证报告，generate会写旧包，不能当只读探测执行。readonlyInputs含旧pilot及index快照；learning-map.base也锁定knowledge哈希。实施时把历史快照检查保留在旧流程，新的目标文章检查只验证实际读取的资料及证据。规则修改影响被引用哈希时，先核对具体变化，再更新当前依赖引用；不刷新历史快照来制造PASS，不为规则变化重生成所有旧包。

当前目录无.git。实施前记录拟改文件原内容/哈希，实施后核对文件及JSON路径范围；本轮不能用git diff证明变更。

实施交付限于：上述规则修正、一个可复用取用/投影入口、两个现有样本的最小配置迁移、聚焦验证结果及尚待内容判断的差异。公共疑点解决即回报，不延伸成单篇生产、发布、全站配置补齐或A/B实验。

建议下一次委派方案：1名Sol、medium，负责B/C的候选字段整理、实现和聚焦检查；主治理负责A中的规则判断、定义差异取舍及最终核验。理由是机械取用和装配已有明确依据，关键语义判断集中处理。此为待用户批准的方案，本轮未启动代理；任务书仅携带本工作单和相关文件入口，不继承旧治理历史。

本轮证据范围：读取现行入口、相关脚本及JSON指定字段，定点核对3组指南片段，比较现有页面与共享定义；没有运行构建、浏览器、生产装配或完整基础校验，也没有测量Token节省。公共基础尚未宣称完成。
