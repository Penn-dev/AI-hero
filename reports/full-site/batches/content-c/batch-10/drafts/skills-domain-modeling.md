---
title: "/domain-modeling Skill"
slug: "skills-domain-modeling"
type: "post"
description: "把项目使用的词语定义清楚，并记录下来。"
updatedAt: "2026-08-24T09:14:47.195Z"
---

## 它能做什么

`domain-modeling` 在设计过程中建立并完善项目的**统一领域语言**。它会质疑与词汇表冲突的用词，要求把含糊词换成准确词，并用具体场景检验关系，直到边界清晰。

它是一种**主动约束**，而非被动参考。任何 Skill 都能读取 `GLOSSARY.md`，借用其中词汇；本 Skill 用于你正在*修改*模型时，所以会打断你。术语一确定，它就立刻在对话中写入 `GLOSSARY.md`，不会等到最后再整理出一份漂亮词汇表。最后才写的词汇表只是[会话](https://www.aihero.dev/ai-coding-dictionary/session)摘要，边讨论边写的版本才是会话真正的产出。

译注：领域模型是对项目所处理的事物、规则和关系的共同理解。例如“客户”与“登录用户”是不是同一概念，就需要明确定义。

## 什么时候该用它

输入 `/domain-modeling`；任务合适时，智能体也会自动调用。不过，自动调用恰好是最薄弱的部分。`grill-with-docs` 或 `wayfinder` 要求加载它时，[模型](https://www.aihero.dev/ai-coding-dictionary/model)常常只加载 `grilling`，跳过本 Skill。如果一场[追问讨论](https://www.aihero.dev/ai-coding-dictionary/grilling)结束后，`GLOSSARY.md` 一点没变，发生的就是这种情况。请在调用另一 Skill 时，也明确写出它的名字。

问题出在*词语*上时使用：

| 情况 | 做法 |
| --- | --- |
| 两个人对“取消”的理解不同 | 用 `domain-modeling` 选定标准词，把另一种叫法列在 `_Avoid_` 下 |
| “Account”在三个文件中承担三种含义 | 用 `domain-modeling` 拆成 Customer 和 User，即客户与用户 |
| 刚作出一个难以逆转的架构选择 | 若达到门槛，`domain-modeling` 会建议写一条 ADR |
| 问题是模块的*形状*，例如接缝位置、接口深度 | 用 [codebase-design](https://aihero.dev/skills-codebase-design) |
| 开发前希望完整质疑整个计划 | 用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，由它在底层驱动本 Skill |
| 只想查词，不想改定义 | 不需要 Skill，直接读 `GLOSSARY.md`，它就是一个文件 |

## 使用前提

开始前没有要求。Skill 会写两个位置，但只在真正需要时才创建：

- 仓库根目录的 **`GLOSSARY.md`**。确定第一个术语时创建。如果根目录有 `GLOSSARY-MAP.md`，则写到映射文件为当前领域指定的 `GLOSSARY.md` 中。
- **`docs/adr/`**。第一项决定达到 ADR 门槛时创建。

开始前不必准备这些位置，Skill 也不会提前创建。

## 两种产物，两种门槛

词汇表与 ADR 的门槛不同。大部分问题来自混淆两者。

| | `GLOSSARY.md` | `docs/adr/NNNN-slug.md` |
| --- | --- | --- |
| 保存什么 | 术语，用一两句话定义某个东西**是什么**，在 `_Avoid_` 下列出弃用同义词 | 一项决定，用一到三句话说明背景、选择和理由 |
| 何时写入 | 一个含糊术语已确定标准含义 | **三项全部满足**：难以逆转；缺少背景时会让人意外；源于真实的取舍 |
| 怎样写入 | 术语确定的当下，随讨论写入 | 提议记录，而不擅自认定要写 |
| 绝不放什么 | 实现细节、[规格](https://www.aihero.dev/ai-coding-dictionary/spec)、随手笔记、通用编程概念 | 本次会话每一个选择的流水账 |

ADR 三项条件缺一，就不写。容易逆转的决定，改回去即可；毫不意外的决定，没人会问为什么；没有真正替代方案的决定，只是在记录你做了显而易见的事。

`GLOSSARY.md` 的规则最重要，因为实际最容易违背。**它只能是词汇表。** 如果不约束，模型会把“写入 `GLOSSARY.md`”理解成可以保存你的每个回答，最终文件变成不断增长的规格。这是多个模型上都最常见的反馈。

## 相互核对，以及核对到哪里为止

当你说某个东西怎样运作时，Skill 会检查代码，指出矛盾。例如：*“Your code cancels entire Orders, but you just said partial cancellation is possible, which is right?”*

中文理解：代码会取消整张订单，但你刚说可以部分取消，到底哪一个正确？

修改语言或代码之前，它先把矛盾明确说出来，让两者达成一致。

它只交叉核对**代码**和已提交的 `GLOSSARY.md`、ADR，不查其他东西，也不搜索任务系统。如果团队几个月前已在一个关闭的 issue 中解决命名冲突，它仍会当新问题重新提出。[改进请求仍开放](https://github.com/mattpocock/skills/issues/717)。在此之前，可以把指令写进自己的 `docs/agents/domain.md`，这些 Skills 本来就会读取它。

## 常见问题

**我的 `GLOSSARY.md` 已经 500 行、1,000 行、3,000 行了，怎么办？**

篇幅是症状，原因是文件混入了本不属于词汇表的实现细节和决定。直接给这条指令：`/grill-with-docs make my GLOSSARY.md more concise and remove any implementation details from it`。

中文 Prompt（译注）：

```text
/grill-with-docs 把我的 GLOSSARY.md 写得更简洁，并移除其中所有实现细节。
```

对膨胀的文件运行，大部分内容都会删掉。只有文件已经精简，仍覆盖两个读者不想同时记住的领域时，才用 `GLOSSARY-MAP.md` 拆分。拆分臃肿文件，只会得到多个臃肿文件。Skill 当前的规则还不足以从源头阻止增长，对应 issue 仍开放。

**为什么叫 `GLOSSARY.md`，而不叫 `GLOSSARY.md`？**

这是整套 Skills 中争论最多的命名问题，尚无定论。反对现名的理由很充分：如果它“只能是词汇表”，`GLOSSARY.md` 就说得很明确。正如一位读者所说，“with ai agents everything is [context](https://www.aihero.dev/ai-coding-dictionary/context)”。

中文理解：对 AI 智能体来说，一切都是上下文。

支持现名的理由是映射：用 `GLOSSARY-MAP.md` 指向多个 `GLOSSARY.md` 文件，读起来很自然，而 `GLOSSARY-MAP.md` 做不到这种效果；此外，`context` 是领域驱动设计（DDD）中对模型内一个有界区域的惯用词。至少有一位用户只为了改文件名，就一直维护自己的分支。你也可以，但其他每个 Skill 都查找 `GLOSSARY.md`，因此改名意味着全部一起修。

译注：固定来源在这个问答中，把对比双方都写成了相同文件名，连映射文件名也重复。这使部分论证无法按文字区分。这里如实保留，没有推测原先想写哪个名字，也未据此提供重命名操作建议。

**`/ubiquitous-language` 去哪里了？**

它已被移除，并非仅标记弃用。工作转入 `domain-modeling`，持续维护整个模型，而不是从一次对话中导出词汇表。词汇约束现在更重要，不是更不重要。它在追问、分流和绘制路线图时于底层运行，不再是需要你记得单独做的一步。

**代码库没有词汇表，怎样建立一份？**

明确提出，不要等它慢慢积累。文档给出的方式是 `/grill-with-docs help me scaffold my existing repo with a GLOSSARY.md`。

中文 Prompt（译注）：

```text
/grill-with-docs 帮我为现有仓库建立一份 GLOSSARY.md。
```

准备好接受长时间追问。有用户报告，问了五十多个问题，文件才成形。对已有代码库来说，顺手积累远远太慢。

**能保留领域模型，同时使用自己的 ADR 格式吗？**

现在还不能干净地做到。词汇表与 ADR 两部分放在一个 Skill 中，因此已有 ADR 约定的团队，如果模板、位置或命名不同，会遇到与内部规范冲突的指令。目前只能复制到本地修改，或在仓库智能体说明中覆盖 ADR 约定。把两部分拆开仍是[开放请求](https://github.com/mattpocock/skills/issues/557)。

**词汇表真值得维护吗？它又多了一份要审阅、可能过时的文件。**

有时不值得。DDD 越接近实现，作用越小。收益在上游的命名与概念对齐，而非聚合结构和层次仪式。同义词控制在命名边界上重要，例如模块名、表名、状态枚举、issue 标题和 CLI 命令；普通行文中就没那么重要。

还有一种反对意见：领域术语缩短的是已经理解这些词的*人与人之间*的沟通，智能体面对直白英语描述也会作出同样反应。这样看，词汇表的价值是让你和审阅者理解智能体在做什么，而不是让智能体更聪明。一天就能完成的开发，可以跳过。未经审阅、由智能体自行写的词汇表，比没有更糟：它会充满自信断言，后来的会话却把它们当事实。

**它能把我含糊的提示词自动变成领域语言吗？**

不能，也没有计划做这样的 Skill。你自己不理解的领域语言，写下来也没有意义。这个 Skill 在你已经理解之后要求精确，不会替你发明自己尚未掌握的词汇。另一个陷阱是只用领域词，却没有真正建模。错误概念上套着正确名词，产出会看起来正确，实际上并不正确。

## 出现这些迹象，就说明它在发挥作用

- 它在你说话时停下来，问你到底指两件事中的哪一件，而不是擅自选一个继续。
- `GLOSSARY.md` 在对话**过程中**变化，而非最后突然写一大段。
- 对明天就能撤销的决定，它拒绝写 ADR，并说明哪条条件不满足。
- 新词条用一两句说明东西*是什么*，并在 `_Avoid_` 下列出不再使用的词。
- 你的话与代码不一致时，它会引用代码指出矛盾。
- `GLOSSARY.md` 变短和变长一样常见。

## 它处在什么位置

`domain-modeling` 是**可由模型调用的参考 Skill**，通常在其他 Skills *底下*运行，而非单独运行。[grill-with-docs](https://aihero.dev/skills-grill-with-docs) 在追问会话中驱动它；[wayfinder](https://aihero.dev/skills-wayfinder) 绘制路线图时加载它；[triage](https://aihero.dev/skills-triage) 用它保证[任务单](https://www.aihero.dev/ai-coding-dictionary/ticket)使用项目语言；[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 在决定确定时调用它。最相近的是 [codebase-design](https://aihero.dev/skills-codebase-design)。二者共同构成底层词汇资料：本 Skill 关注*领域*，后者关注模块*形状*。不想进入其他 Skill 的完整流程，只想使用这种约束时，也可以直接调用。不确定选哪个时，用 [ask-matt](https://aihero.dev/skills-ask-matt)。

译注：相关中文词条：[会话](/ai-coding-dictionary/session)、[上下文](/ai-coding-dictionary/context)、[规格](/ai-coding-dictionary/spec)。中文页未接入时会回到原站英文页。
