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

我做工程师快十年了。如今，流程比以往任何时候都更重要。

你随时都能调用一支能力从一般到不错的工程师队伍。但这些工程师有一个致命缺陷：没有记忆。他们不记得自己以前做过什么。

因此，要让他们真正完成有用的工作，你必须提供非常严格、定义清晰的流程。作为开发者，你需要不断引导智能体，确保它们没有偏离方向。

我的解决办法是创建大量 Agent Skill。每个 Skill 都把我的工作流程固化下来，让 AI 每次执行任务时都有一条明确的路径可循：

![工程 Skill 与流程的仓库](https://res.cloudinary.com/total-typescript/image/upload/v1773675111/ai-hero-images/pgyy6kr82bhjliy774jx.png)

结果呢？AI 产出的代码质量大幅提升。


**这一套工具：** [grill-me](/skills-grill-me) · [to-spec](/skills-to-spec) · [to-tickets](/skills-to-tickets) · [tdd](/skills-tdd) · improve-codebase-architecture · [查看全部 Skill →](/skills)

## 1. `/grill-me`：把想法问清楚

[阅读指南](/skills-grill-me) · [GitHub](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me)

```bash
npx skills@latest add mattpocock/skills
```

这是我最喜欢的 Skill。它只有三句话，却非常管用。

**Grill Me Skill：**

> Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one by one. And finally, if a question can be answered by exploring the code base, explore the code base instead.

中文理解版（学习辅助）：请不断追问这个计划的每一个方面，直到我们形成共同理解。沿着“设计树”的每条分支逐一深入，依次理清不同决策之间的依赖关系。最后，如果查看代码库就能回答某个问题，那就直接查看代码库，不要再问我。

“设计树（design tree）”这个概念来自 Frederick P. Brooks 的 _The Design of Design_。它表达的是：设计一项事物时，需要沿着设计树的各条分支逐一探索。

例如，你正在设计一个搜索页面，需要在“高级搜索界面”和“简单文本框”之间做选择。如果选择高级搜索，还要确定全部筛选条件和排序方式。你会沿着这棵树继续向下推演，直到充分理解整个设计，然后才开始写代码。

![Claude 就某项功能提出澄清问题](https://res.cloudinary.com/total-typescript/image/upload/v1773675112/ai-hero-images/p1coswbfzivaglbxkose.png)

调用这个 Skill 时，我希望和 LLM 达成共识。Claude Code 在规划模式下往往很早就直接给出方案，在双方还没有真正理解彼此时便创建文档；而 grill-me Skill 会迫使这场对话继续深入。

有一次，我和 Claude 讨论如何给课程视频编辑器增加一项功能，它问了我 16 个问题。这还只是一次比较短的追问。面对真正复杂的功能，我经历过接近半小时的对话，期间会有 30、40，甚至 50 个问题。

![对话中显示的 16 个访谈问题](https://res.cloudinary.com/total-typescript/image/upload/v1773675113/ai-hero-images/a0vvhui4lkubi5b2aqq9.png)

**关键结论：Skill 不必写得很长，也能发挥很大作用。你只需要在恰当的时机说对的话。**

## 2. `/to-spec`：把对话变成文档

[阅读指南](/skills-to-spec) · [GitHub](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-spec)

```bash
npx skills@latest add mattpocock/skills
```

_（这个 Skill 以前叫 `/to-prd`。做的事没变，只是新名称更清楚。）_

当我和 LLM 达成共识后，就会调用下一个 Skill：`/to-spec`。

这个 Skill 会要求 LLM 把双方的共识整理成一份规格说明（spec），也就是你可能听过的 PRD。关键在于，它**不会**再向你提问。前面的深入追问已经结束，`/to-spec` 只负责汇总对话中已有的信息。

工作流程如下：

- 浏览代码仓库，确保规格说明以代码的当前状态为依据
- 初步划分功能接受测试的接口或模块边界，并确认这些边界符合你的预期
- 根据模板写出规格说明，再发布到项目的 Issue 追踪系统

任何规格说明中最重要的部分都是用户故事（user stories）。它源自敏捷开发（Agile）方法论，用自然语言描述系统应该表现出的行为。

![规格说明中的用户故事部分](https://res.cloudinary.com/total-typescript/image/upload/v1773675114/ai-hero-images/mpombfwy8uz2rr1xy1yi.png)

## 3. `/to-tickets`：把终点拆成一段旅程

[阅读指南](/skills-to-tickets) · [GitHub](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-tickets)

```bash
npx skills@latest add mattpocock/skills
```

_（以前叫 `/to-issues`。）_

规格说明描述了你的目的地，但你真正需要的是一条抵达那里的路线。

这正是 `/to-tickets` Skill 的作用。它会把一份规格说明转成一个看板（Kanban board），其中每张任务卡都能由一个人或智能体独立领取并推进。

流程如下：

1. 收集上下文：可以是你刚刚完成的对话，也可以是你指定的一份规格说明
2. 浏览代码库
3. **拟定垂直切片（vertical slices）**：把规格说明拆成多张任务卡，尽快暴露那些目前甚至还没有意识到的未知问题

这里可以借用 [曳光弹式实现（Tracer Bullet）](https://www.aihero.dev/tracer-bullets) 的比喻。每张任务卡都是一条贯穿所有集成层的细小“垂直切片”，而不是只处理某一层的“水平切片”。

这个 Skill 还会明确任务卡之间的阻塞关系。例如，某张任务卡可能没有任何前置依赖，因此可以被单独领取。这对于并行运行多个智能体、让它们同时工作非常有用。

![以垂直切片形式创建的四个 GitHub Issue](https://res.cloudinary.com/total-typescript/image/upload/v1773675116/ai-hero-images/qaodyngpkcdpfwdvi1do.png)


[关联阅读：查看完整 Skill 集，包括 grill-with-docs、domain-modeling 和 triage](/skills)

## 4. `/tdd`：提升代码质量

[阅读指南](/skills-tdd) · [GitHub](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd)

```bash
npx skills@latest add mattpocock/skills
```

如何用 Skill 推动实际开发？怎样才能让实现足够可靠，并提高代码质量？

你可以使用 TDD Skill。TDD 是测试驱动开发（Test-Driven Development）的缩写，它会强制——或者更准确地说，鼓励——智能体遵循“红—绿—重构（red-green-refactor）”循环。

这个 Skill 内容相当丰富，涵盖重构、模拟（mocking）和深模块（deep modules）等理念。**认真做好 TDD，是我见过的提升智能体输出质量最稳定的方法。**

工作流程先从确认需要怎样改动接口开始。AI 面对一个结构糟糕的代码库时，会看到许多细小、彼此没有明显区别的模块；但如果把它重组为功能更完整的大模块，并在其上层提供精简的接口，AI 就能更轻松地理解和浏览代码库。

接下来，这个 Skill 会：

- 确认需要测试哪些行为
- 设计便于测试的接口
- 每次只写一个测试，而且先写测试
- 编写代码，让测试通过
- 寻找可以重构的部分

让智能体遵循红—绿—重构非常有效。这个循环会一直持续，直到工作完成。

![展示红—绿—重构循环的 TDD 工作流程图](https://res.cloudinary.com/total-typescript/image/upload/v1773675117/ai-hero-images/lz08tqnibbua15wpkq2n.png)

## 5. `/improve-codebase-architecture`：让代码库更适合智能体

[在 GitHub 上查看](https://github.com/mattpocock/skills/tree/main/skills/engineering/improve-codebase-architecture)

```bash
npx skills@latest add mattpocock/skills
```

TDD 对代码库有很高的要求。代码库结构不佳时，测试边界就会模糊：应该测试什么位置？在哪一层测试？

代码库拥有清晰的模块边界后，测试会容易得多。

`/improve-codebase-architecture` Skill 会像平时理解项目那样浏览代码库，寻找容易引起混乱的地方：

- 为什么理解一个概念需要在许多小文件之间来回跳转？
- 是否只为了方便测试而提取了纯函数，但真正的 bug 却藏在这些函数的调用方式中？
- 高度耦合的模块是否带来了集成风险？

然后，它会列出一些可能的“深化机会（deepening opportunities）”，也就是把功能单薄、接口负担较重的模块改造成内部能力更完整、对外接口更简洁的深模块。

![并排展示的三种不同接口设计](https://res.cloudinary.com/total-typescript/image/upload/v1773675118/ai-hero-images/xcsyngiu3zdojvugipqz.png)

每周做一次，或者在一轮密集开发之后做一次。随着代码库不断得到改进，你会发现智能体的输出质量也在提高。

**如果代码库本身一团糟，AI 在里面写出来的代码也只会一团糟。**


以上是七个 Skill 中的五个。其余的 grill-with-docs、domain-modeling 和 triage，以及持续更新的变更记录，都可以在 [Skill 页面](/skills) 找到。

## 为什么这很重要：把 AI 当作工程师来对待

要提高智能体产出的代码质量，最有效的办法是把它们当成人来对待。当然，是有着奇怪限制的人——没有记忆、可以被复制，而且一投入工作就立刻开干。但无论如何，它们仍然是“人”。

[查看 Skills 仓库](https://github.com/mattpocock/skills)，开始使用。

## 中文学习辅助：术语小词典

- **Agent Skill**：为 AI 智能体准备的可复用工作说明，让它在特定任务中按照固定流程做事。
- **LLM**：Large Language Model（大语言模型），一种能够理解和生成自然语言的 AI 模型。
- **Claude Code**：Anthropic 提供的 AI 编码智能体产品，可以协助理解、修改和编写代码。
- **规格说明（spec）**：开发前用于写清目标、范围、预期行为和验收方式的文档。
- **PRD**：Product Requirements Document（产品需求文档），记录一个产品或功能要解决的问题和预期表现。
- **用户故事（user story）**：从用户视角描述需求的简短写法，常用于说明谁需要什么功能，以及为什么需要它。
- **Kanban board**：看板，用任务卡直观展示待办、进行中和已完成的工作。
- **垂直切片（vertical slice）**：一小块能够贯穿界面、业务逻辑和数据等多个系统层次的功能，用来尽早验证整体链路。
- **曳光弹式实现（Tracer Bullet）**：先实现一条贯穿整个系统的最小可用路径，以便尽早验证方向并发现问题。
- **TDD**：Test-Driven Development（测试驱动开发），先写测试，再编写让测试通过的代码，然后持续重构。
- **red-green-refactor**：TDD 的循环：先让测试失败（红），再让测试通过（绿），最后整理代码（重构）。
- **模拟（mocking）**：在测试中用可控的替代品代替真实依赖，例如网络服务或数据库。
- **代码库（codebase）**：一个软件项目的全部源代码及相关文件。
- **模块边界**：用来界定一个模块负责什么、不负责什么，以及它如何与其他模块交互。
- **深模块（deep module）**：内部提供较丰富的功能，但只暴露少量、简单接口的模块；它能降低使用者理解系统的负担。
