---
title: "我每天都在用的 5 个 Agent Skill"
slug: "5-agent-skills-i-use-every-day"
type: "post"
description: "用经过验证的工程类 Skill 提升 AI 代码质量：从提示技巧、测试驱动开发，到架构设计与规格说明工作流。适用于 Claude Code 等智能体。"
tags:
  - score-first-wins
  - code-with-ai-agents
updatedAt: "2026-03-16T15:38:31.720Z"
---

我做工程师快十年了。现在，我比以往任何时候都更重视流程。

你随时都能调用一群能力中等到不错的工程师；但他们有一个致命缺陷：没有记忆。他们不会记得自己以前做过什么。

因此，要让他们真正产出有用成果，你得提供非常严格、定义清晰的流程。作为开发者，你需要持续引导智能体，让它们始终走在正确的路上。

我的解决方式，是制作大量的 Agent Skill。每个 Skill 都把我的工作方法编码进去，让 AI 每次都有一条明确的路径可以遵循：

![工程 Skill 与流程的仓库](https://res.cloudinary.com/total-typescript/image/upload/v1773675111/ai-hero-images/pgyy6kr82bhjliy774jx.png)

结果如何？AI 产出代码的质量显著提升了。


**这一套工具：** [grill-me](/skills-grill-me) · [to-spec](/skills-to-spec) · [to-tickets](/skills-to-tickets) · [tdd](/skills-tdd) · improve-codebase-architecture · [查看全部 Skill →](/skills)

## 1. `/grill-me`：把想法问清楚

[阅读指南](/skills-grill-me) · [GitHub](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me)

```bash
npx skills@latest add mattpocock/skills
```

这是我最喜欢的 Skill。它只有三句话，却非常有影响力。

**Grill Me Skill：**

> Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one by one. And finally, if a question can be answered by exploring the code base, explore the code base instead.

中文理解版（学习辅助）：请不断追问这个计划的每一个方面，直到我们形成共同理解。沿着“设计树”的每条分支逐一深入，逐个解决决策之间的依赖关系。最后，如果某个问题能通过查看代码库得到答案，就直接去查看代码库，而不是问我。

“设计树（design tree）”这个概念来自 Frederick P. Brooks 的 _The Design of Design_。它指的是：设计某件事时，你需要逐步走遍设计树的每一条分支。

例如，你正在设计一个搜索页面，需要在“高级搜索界面”和“简单文本框”之间做选择。如果选高级搜索，就还要确定所有筛选条件和排序方式。你会持续沿着这棵树往下推演，直到完全理解设计方案，再开始写代码。

![Claude 就某项功能提出澄清问题](https://res.cloudinary.com/total-typescript/image/upload/v1773675112/ai-hero-images/p1coswbfzivaglbxkose.png)

调用这个 Skill 时，我希望和 LLM 达成共同理解。Claude Code 在规划模式下很容易过早地抛出一个方案，在双方还没真正理解彼此前就创建文档；而 grill-me Skill 会强制把这场对话继续下去。

有一次，我和 Claude 讨论给课程视频编辑器新增功能，它问了我 16 个问题。这已经算是比较短的一次“追问”了。对于真正复杂的功能，我经历过接近半小时、提出 30、40，甚至 50 个问题的对话。

![对话中展示的 16 个访谈问题](https://res.cloudinary.com/total-typescript/image/upload/v1773675113/ai-hero-images/a0vvhui4lkubi5b2aqq9.png)

**关键结论：Skill 不必很长，也能产生很大影响。关键在于，恰好在需要的时候用对措辞。**

## 2. `/to-spec`：把对话变成文档

[阅读指南](/skills-to-spec) · [GitHub](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-spec)

```bash
npx skills@latest add mattpocock/skills
```

_（这个 Skill 以前叫 `/to-prd`。职责不变，只是新名称更清晰。）_

当我和 LLM 达成共同理解后，就会调用下一个 Skill：`/to-spec`。

它会要求 LLM 把这份共识整理成一份规格说明（spec），也就是你可能听过的 PRD。关键是，它**不会**再访谈你：前面的追问已经完成了，所以 `/to-spec` 只负责综合对话中已有的内容。

工作流程：

- 浏览代码仓库，依据代码当前状态编写规格说明
- 勾勒功能将在哪些边界接受测试，并确认这些边界是否符合你的预期
- 根据模板写出规格说明，并发布到项目的 Issue 追踪系统

任何规格说明中最重要的部分，都是用户故事（user stories）。它用自然语言描述系统应该呈现的行为，源自敏捷开发（Agile）方法论。

![规格说明中的用户故事部分](https://res.cloudinary.com/total-typescript/image/upload/v1773675114/ai-hero-images/mpombfwy8uz2rr1xy1yi.png)

## 3. `/to-tickets`：把终点拆成一段旅程

[阅读指南](/skills-to-tickets) · [GitHub](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-tickets)

```bash
npx skills@latest add mattpocock/skills
```

_（以前叫 `/to-issues`。）_

规格说明描述的是终点；但你真正需要的，是抵达终点的路径。

这正是 `/to-tickets` Skill 的作用。它会接收一份规格说明，并将其拆成一个看板（Kanban board）：里面的每个任务卡都可以被独立认领和推进。

流程如下：

1. 收集上下文：刚才的对话，或你指定的一份规格说明
2. 浏览代码库
3. **拟定垂直切片（vertical slices）**：把规格说明拆成任务卡，让未知风险尽早暴露

这里适用 [曳光弹式实现（Tracer Bullet）](https://www.aihero.dev/tracer-bullets) 的比喻。每张任务卡都是贯穿所有集成层的一条细小“垂直切片”，而不是只处理某一层的“水平切片”。

这个 Skill 还会建立任务卡之间的阻塞关系。例如，某张任务卡可能不受任何前置任务阻塞，因此可以被独立领取。这在并行运行多个智能体、让它们同时工作时很有用。

![以垂直切片形式创建的四个 GitHub Issue](https://res.cloudinary.com/total-typescript/image/upload/v1773675116/ai-hero-images/qaodyngpkcdpfwdvi1do.png)


## 4. `/tdd`：提升代码质量

[阅读指南](/skills-tdd) · [GitHub](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd)

```bash
npx skills@latest add mattpocock/skills
```

怎样把一个 Skill 真正落地？怎样让实现足够可靠，并提升代码质量？

你可以使用 TDD Skill。TDD 是测试驱动开发（Test-Driven Development）的缩写，它会强制——或者更准确地说，是促使——智能体遵循“红—绿—重构（red-green-refactor）”循环。

这个 Skill 内容很扎实，包含重构、模拟（mocking）以及什么是深模块（deep modules）等理念。**做好 TDD，是我看到的提升智能体输出质量最稳定的方法。**

工作流程从确认需要哪些接口变更开始。AI 面对一个糟糕的代码库时，会看到许多细小、彼此没有清晰区别的模块；但如果你把它重组为“底层功能更完整、上层接口更薄”的大模块，AI 就能更容易理解和导航。

接下来，这个 Skill 会：

- 确认要测试哪些行为
- 为便于测试而设计接口
- 一次只写一个测试（先写测试）
- 编写代码，使测试通过
- 寻找适合重构的部分

将红—绿—重构用于智能体非常有效。它形成一个持续运转的反馈循环，直到工作真正完成。

![展示红—绿—重构循环的 TDD 工作流程图](https://res.cloudinary.com/total-typescript/image/upload/v1773675117/ai-hero-images/lz08tqnibbua15wpkq2n.png)

## 5. `/improve-codebase-architecture`：让代码库更适合智能体

[在 GitHub 上查看](https://github.com/mattpocock/skills/tree/main/skills/engineering/improve-codebase-architecture)

```bash
npx skills@latest add mattpocock/skills
```

TDD 对代码库有不少要求。代码库结构不好时，测试边界就不清晰：应该测哪里？该在哪一层测？

当代码库的模块边界清楚时，测试会容易得多。

`/improve-codebase-architecture` Skill 会自然地探索你的代码库，寻找容易让人困惑的地方：

- 理解一个概念时，是否必须在许多小文件之间来回跳转？
- 是否为了便于测试而提取了纯函数，但真正的 bug 却藏在调用方式里？
- 紧密耦合的模块是否带来了集成风险？

随后，它会给出一些“深化机会（deepening opportunities）”候选项：也就是把功能单薄的模块深化成职责更完整模块的机会。

![并排展示的三种不同接口设计](https://res.cloudinary.com/total-typescript/image/upload/v1773675118/ai-hero-images/xcsyngiu3zdojvugipqz.png)

每周做一次，或在一段密集开发之后做一次。当你持续打磨代码库，会发现智能体产出质量也会随之提高。

**如果代码库本身是一团糟，AI 也只能在这团糟里继续产出糟糕的代码。**


以上是七个 Skill 中的五个。其余的 grill-with-docs、domain-modeling、triage，以及持续更新的变更记录，都在 [Skill 页面](/skills)。

## 为什么这很重要：把 AI 当作工程师来对待

想要让智能体提升代码质量，最有效的方法是把它们当成人来协作。当然，它们是带着奇怪限制的人：没有记忆、可以被复制、并且一启动就会开始工作。但归根结底，仍然需要像对待工程师一样，为它们提供清楚的目标、上下文与流程。

[查看 Skills 仓库](https://github.com/mattpocock/skills)，开始使用。

## 中文学习辅助：术语小词典

- **Agent Skill**：为 AI 智能体写好的可复用工作说明，让它在特定任务中按固定流程做事。
- **LLM**：Large Language Model（大语言模型），能理解和生成自然语言的 AI 模型。
- **Claude Code**：Anthropic 提供的 AI 编码智能体产品，可协助理解、修改和编写代码。
- **规格说明（spec）**：在开发前写清目标、范围、行为和验收方式的文档。
- **PRD**：Product Requirements Document（产品需求文档），记录一个产品或功能要解决什么问题、应如何表现。
- **用户故事（user story）**：从用户视角描述需求的一种简短写法，常用来说明“谁要完成什么、为什么要完成”。
- **Kanban board**：看板，用卡片可视化展示待办、进行中和已完成的工作。
- **曳光弹式实现（Tracer Bullet）**：先做一条能贯穿整个系统的最小路径，用它尽早验证方向和发现问题的开发方式。
- **TDD**：Test-Driven Development（测试驱动开发），先写测试，再写让测试通过的代码，并持续重构。
- **red-green-refactor**：TDD 的循环：先让测试失败（红），再让它通过（绿），最后整理代码（重构）。
- **代码库（codebase）**：一个软件项目的全部源代码及其相关文件。
- **模块边界**：模块负责什么、不负责什么，以及它如何与其他模块交互的清晰界线。
