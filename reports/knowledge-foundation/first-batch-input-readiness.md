# 首批文章生产输入就绪情况

2026-09-24。范围仅为 G0 生产输入准备与定点校验；不翻译正文、不修改页面或渲染、不处理旧试验包。学习地图的 `firstBatch` 是历史交接状态，系统提示词以单篇验收和 2026-09-24 核心概念收口记录为准。

## 输入结论

| 文章 | 输入状态 | 依据与边界 |
| --- | --- | --- |
| `/a-complete-guide-to-agents-md` | **G0 PASS，可交受限生产/审核** | 新输入锁定完整英文原文及哈希，含 profile、17 项实际概念依赖闭包、9 组原例、26 处去重证据位置、现行规则和未决项。补入正文明确需要的 `system-prompt` 与 `context`；历史粗提示中的 `tool-call`、`tool-result` 不属于本篇理解依赖，未机械加入。旧译文第 20 行的“最高优先级”绝对化、工具实现相关断言、后加辅助归属和促销清洗候选均保留为生产审核项。此结论不代表译文、辅助或整页通过。 |
| `/ai-coding-dictionary/system-prompt` | **G0 已闭合，可继续使用现有输入** | 现有输入已有完整原文、17 项概念及依赖、文章别名增强、原例和规则；核心概念收口已确认新增 10 项补充概念没有改变本篇上游记录或依赖。定点校验再次通过，因此没有证据支持修改 `input.json`。单篇最新结论仍是 G1 编辑自检通过、G2 页面交互通过、真实零基础试读待确认。 |

G0 允许显式携带未决项流转到生产或审核；它不批准发布，也不把未做的语义、读者或页面验收记为 PASS。

## Output 练习

`/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k` 保持 **HOLD**。最小解锁材料：

1. 明确目标版本的官方 API 依据，能判定原文第 15、89–93 行中 AI SDK 5/6、`generateObject` 与 Output 用法的关系；仅更新旧哈希不算解决。
2. 对应课程快照的最小完整运行材料：`package.json` 与锁文件、完整 imports、模型/提供商配置方式（不含凭据）、起始文件和 TODO 所在文件、实际启动命令。若要求“可运行教学”，另需一次成功运行的输入输出证据；若只生产阅读版，须明确标为不可独立运行。
3. 空 `Video Transcript` 沿用“来源未提供文字稿”的显式空态；该处理已确定，不再作为待用户确认的阻塞。未来取得真实文字稿后才补充，不得虚构。
4. 锁定本次会装配的正文和新增辅助版本，供同一轮语义审核，不能继承旧辅助未覆盖的审校结论。

## 实际修改

- `content/learning/agents-md/input.json`
- `scripts/knowledge/prepare-first-batch-inputs.mjs`
- `reports/knowledge-foundation/first-batch-input-readiness.md`

`content/learning/system-prompt/input.json` 未修改；共享知识、学习地图、源文、参考译文、页面配置和旧试验资产均未修改。当前目录没有 `.git`，因此本轮以写入白名单、生成前存在性/时间戳检查、来源哈希及确定性重生成校验保护现有内容。

## 校验

- `node scripts/knowledge/prepare-first-batch-inputs.mjs check`：PASS。核对 29+10 个共享概念池、17 项本篇闭包、来源与证据哈希/行号、9 组原例、规则和未决项，并确认输入可确定性重生成。
- `node scripts/knowledge/check-learning-map.mjs`：`PASS-mechanical-only`；186 篇、29 个基础概念、10 个补充概念、190 个引用文件。该结果不等于独立语义或零基础验收。
- `node scripts/validate-system-prompt.mjs`：通过；17 个概念、11 个来源链接、2 个英文原例。脚本明确不建立语义验收。
- `npm run learning:validate`：通过；现有 3 篇教学配置均可解析。

未运行旧 `foundation.mjs check`：它在本任务前已因 `content/learning/pilot-knowledge.json` 只读输入漂移失败，本轮既未更新旧哈希，也未改旧包掩盖该问题。

## 治理复核与下一步

2026-09-24，治理已核对指南原文与参考译文第20行，并复跑输入确定性校验。接受指南 G0 就绪结论；下列决定已写入装配器及指南输入的 `governanceDecisions`，执行状态仍为待正文编校落实。

- 指南下一轮编校应移除旧译文第20行新增的“最高优先级”绝对化解释。如有入门解释需要，采用共享定义并标明中文学习辅助；不能把原文的位置描述解释为普遍优先级保证。
- 工具行为先保留作者语境并明确适用范围，不为指南一次性开展全部工具核查。将某条表述变成具体工具的当前操作指导时，再定点取得官方依据；已知错误仍须处理，不能仅靠范围免责声明保留。原始命令保持原样，不宣称适合所有Windows环境。
- 原报告把 Output 空文字稿再次列为待确认事项过重：沿用现有“来源未提供文字稿”的显式缺失处理，不补造内容，也不为这一点再次询问用户。
- Output继续HOLD。本轮不选新SDK版本，也不把练习降为阅读版来绕开运行材料缺失；后续先核对课程目标版本和对应材料，再判断可运行教学如何恢复。

当时建议的下一节点为指南正文及新增辅助的受限编校，该单篇工作随后已执行。此安排不再作为当前下一步；用户纠偏后的阶段与工作单见[公共基础收口](E:/dev/projects/AIHero/reports/knowledge-foundation/current-stage.md)。输入就绪不触发单篇生产自动续行。
