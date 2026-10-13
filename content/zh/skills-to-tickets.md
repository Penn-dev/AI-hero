---
title: "/to-tickets Skill"
slug: "skills-to-tickets"
type: "post"
description: "把规格拆成智能体能够实现的小任务。"
tags:
  - build-the-right-thing
  - phase-5
updatedAt: "2026-08-24T09:14:47.195Z"
---

## 它能做什么

`to-tickets` 接收计划、[规格](https://www.aihero.dev/ai-coding-dictionary/spec)或当前对话，把它拆成任务跟踪系统中的一组[任务单](https://www.aihero.dev/ai-coding-dictionary/ticket)。每张任务单都声明**阻塞关系**，也就是开始前必须先完成哪些其他任务。

每张任务都是一颗**曳光弹（tracer bullet）**：一条窄小但完整的路径，贯通此次修改涉及的所有层，包括数据库结构、API、界面和测试，完成后可以立即独立演示。这与直觉上的分法不同，后者往往每次只做一层，最后再整合。它还会把任务控制在一个全新[上下文窗口](https://www.aihero.dev/ai-coding-dictionary/context-window)内能完成的大小，因为接手的[会话](https://www.aihero.dev/ai-coding-dictionary/session)从未见过整份规格。

译注：“曳光弹”在这里指先打通一小段端到端功能，让你尽早验证方向，不是把各个技术层分别做完再拼起来。

## 什么时候该用它

输入 `/to-tickets`；[智能体](https://www.aihero.dev/ai-coding-dictionary/agent)不会自行选用。

| 当前情况 | 运行什么 |
| --- | --- |
| 已有规格 issue，工作跨越多次会话 | `/to-tickets`，或 `/to-tickets #<spec_issue>` |
| 计划只在对话中，从未写成文件 | `/to-tickets` 直接读取对话，不必先有规格 |
| 整项修改能放进一个上下文窗口 | 用 [implement](https://aihero.dev/skills-implement)，跳过任务拆分 |
| 还没决定任何事情 | 先用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，再用 [to-spec](https://aihero.dev/skills-to-spec) |
| [wayfinder](https://aihero.dev/skills-wayfinder) 路线图上的未决项已经解决 | 先用 [to-spec](https://aihero.dev/skills-to-spec) 汇总路线图，再 `/to-tickets` |

`to-tickets` 生成的任务从一开始就适合智能体执行，不要再用 [triage](https://aihero.dev/skills-triage) 处理。triage 用于别人带来的工作。

## 使用前提

`to-tickets` 会发布到任务跟踪系统，因此 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 必须已为仓库配置跟踪系统和分流标签。GitHub、Linear 等真实系统可以，`.scratch/` 下的本地 Markdown 文件也可以，后者不需要额外设置。

## 按完整小功能拆分，而非按技术层

**水平切片**一次只交付一层。所有层都落地前，什么也用不了，而且每张任务的验收标准都要依赖另一张任务的工作。**纵向切片**就是曳光弹，一次交付穿过所有层的一条细路径，因此可以独立验证，验收的内容也全由自己负责。

这是最常被违反的规则。有团队做了一组按层拆分的 26 张任务，分为语料库、生产器、聚合器和选择器。平均每关闭一张任务，要运行智能体约二十次，其中约四分之三是返工。他们自己的复盘把每类失败都追溯到了水平拆分，而非实现质量。

发布前有两件事。`to-tickets` 先寻找预备性重构，遵循“先让修改变容易，再做容易的修改”的原则，并把这些工作排在前面。然后把拆分结果写成编号清单，逐项与你确认：粒度合适吗，阻塞关系真实吗，有没有该合并或拆开的？你批准前，不会发布到任务系统。这个确认环节就是提出异议的时候。

## 阻塞关系

任务产物的重点就在这些依赖边。它们根据任务系统分两种方式运作：

| 跟踪系统 | 依赖关系存在哪里 | 怎样执行 |
| --- | --- | --- |
| 本地 Markdown | `.scratch/<feature>/issues/<NN>-<slug>.md` 下每张任务一个文件，用文字记录，按阻塞者在前编号 | 手动从上往下做 |
| 真实跟踪系统，例如 GitHub、Linear | 原生阻塞链接，或系统支持的子 issue | 前置任务都完成的任务进入**已就绪范围（frontier）**，可以领取 |

无论哪种，依赖关系都在任务单中。跟踪系统只决定能否有工具根据关系并行执行。`to-tickets` 负责产出任务；一次一个会话执行，还是让一批智能体执行，由你负责，不由本 Skill 负责。

## 大范围重构的例外

有一种情况不能遵守曳光弹规则。**大范围重构**只做一项机械性修改，例如重命名一列、修改共享符号的类型，但**影响范围**覆盖整个代码库。改一处就破坏上千个调用位置，所以任何纵向切片都无法独立通过检查。

`to-tickets` 会改按**扩展、迁移、收缩**（expand–contract）安排：

- **扩展**：在旧形式旁边增加新形式，保证现有代码不坏。
- **迁移**：按影响范围分批迁移调用位置，例如按软件包或目录；一批一张任务，每批都依赖扩展任务。旧形式仍在，所以 CI 保持通过。
- **收缩**：所有调用方都迁走后，再用一张依赖全部迁移批次的任务，删除旧形式。

如果连各批也不能单独通过检查，就共用整合分支，并让它们全部成为最终“整合并验证”任务的前置条件。CI 只需在最后这张任务上通过。

译注：CI 是持续集成检查，通常会自动构建和运行测试。这里说明的是原文对大范围重构的特殊安排，不代表可以省略最终验证。

## 常见问题

**改三行代码，它拆出了十二张任务。**

过度拆分是反馈最多的问题，很多用户遇到过。[模型](https://www.aihero.dev/ai-coding-dictionary/model)默认拆成原子单位，却丢掉了让工作有意义的组合。应在确认环节修正，要求合并任务，它就会合并。也有一个下限：整个修改一个上下文窗口就能完成，根本不需要这个 Skill，直接用 [implement](https://aihero.dev/skills-implement)。

**结果是一层一张，数据库结构一张，API 另一张。**

纵向切片规则就是防这种失败的，但 Skill 有时仍会这么拆。在确认环节逐张问：“what can I demo when this is done?”

中文 Prompt（译注）：

```text
这张任务完成后，我能演示什么？
```

答不上来的就是水平切片。有人因此给每张任务加一行“演示路径”，并报告这能推动模型按纵向拆分。

**GitHub 上的任务没有成为规格 issue 的子 issue。**

多个模型、十几轮执行都报告过这个问题，[issue #554](https://github.com/mattpocock/skills/issues/554) 记录最完整。现在已修复：`to-tickets` 会把每张任务设为来源 issue 的子 issue，GitHub 模板也给出命令 `gh issue create --parent <n>`，需要 `gh` 2.94 及以上。重新运行 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills)，更新旧的 `docs/agents/issue-tracker.md`。

**“Blocked by”只写在正文里，没有真实阻塞链接。**

这是同类问题，[issue #513](https://github.com/mattpocock/skills/issues/513) 曾报告，智能体甚至断言 GitHub 完全没有原生阻塞关系。实际上有：`gh issue create --blocked-by 12,15`。因为 Skill 先发布前置任务，创建后续任务时，总能拿到它们的编号。正文文字只是没有原生依赖关系时的后备方案，不是默认方式。使用原生依赖时，任务模板现在会省略 `## Blocked by`。

**本地任务存哪里？v1.1 说明写的是根目录 `tickets.md`。**

当时确实这么写，这是个 bug。多个并行智能体写同一个共享文件，也引发了竞态问题。现在本地模式按依赖顺序写到 `.scratch/<feature-slug>/issues/<NN>-<slug>.md`，每张任务一个文件，与本地跟踪模板原先的布局一致。`NN` 前缀是真正的任务 ID，因此可以用 `/implement 03`，不用重输长标题。

**读取规格时一直被截断。**

规格过长，可能超出任务系统能完整返回的范围。又没有本地副本后备，智能体就不断发起[工具调用](https://www.aihero.dev/ai-coding-dictionary/tool-call)，分块重取，始终读不到结尾。不要在 `/to-spec` 与 `/to-tickets` 之间[清空](https://www.aihero.dev/ai-coding-dictionary/clearing)或[压缩](https://www.aihero.dev/ai-coding-dictionary/compaction)上下文。同一窗口连续运行，就不需要重新获取规格。

**验收标准根本检验不了什么，有些还没做就已经通过。**

模板只要求验收标准，没要求它必须存在失败的可能，于是会发生这种事。常见三种：起始提交时就已经满足；只有另一张任务的工作才能满足；只是重复需求，没有从交付物推导。纵向切片能避免多数问题，因为交付新行为的切片，在起始提交上理应失败。不过仍值得人工检查。对每条标准，指出什么可观察结果意味着它不成立，并确认在实现者开始的提交上它确实失败。

**任务已经发布，怎样真正运行？**

Skill 止于产物，没有自动派发模式。你要手动查看看板，数出没有未关闭阻塞项的任务，再开相同数量的智能体会话。每张任务使用新上下文，任务之间清空。[implement](https://aihero.dev/skills-implement) 完成后，无论在 GitHub 还是本地 Markdown，都不会可靠地关闭任务或勾选清单，因此需要你自行更新状态。

## 出现这些迹象，就说明它在发挥作用

- 每张任务都能回答“what can I demo when this is done?”，即“完成后能演示什么”，答案是一种行为，而不是某个技术层。
- 发布前，先给你编号清单，每项带有“Blocked by”，即前置阻塞任务说明。
- 最上面的任务没有阻塞项，可以立即开始。
- 除原型产出的代码片段外，任务正文不含文件路径或行号。
- 每张任务都像是新会话不需要你在场也能完成的工作。
- 如果发现预备性重构，它排在最前面，而非混入功能任务。

## 它处在什么位置

`to-tickets` 是主要开发流程的一步：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

上游 [to-spec](https://aihero.dev/skills-to-spec) 提供已确定的规格，供它拆分。两者放在同一个上下文窗口，中间不要清空。下游 [implement](https://aihero.dev/skills-implement) 每个新会话做一张任务，内部用 [tdd](https://aihero.dev/skills-tdd) 写测试，结束时用 [code-review](https://aihero.dev/skills-code-review) 审阅。另一个下游是 [implement-spec](https://aihero.dev/skills-implement-spec)，它把相同的阻塞关系读成任务图，在一条整合分支上并行完成所有已就绪任务。不确定哪个 Skill 或流程适合时，用 [ask-matt](https://aihero.dev/skills-ask-matt)。

译注：命令、版本门槛、问题修复状态及 26 张任务案例均沿用固定来源；本页未运行 gh 命令，也未确认各跟踪系统当前支持情况。

译注：本页相关中文词条：[任务单](/ai-coding-dictionary/ticket)、[规格](/ai-coding-dictionary/spec)、[上下文窗口](/ai-coding-dictionary/context-window)。链接优先打开已接入的中文页；尚未接入时会回到原站英文页。
