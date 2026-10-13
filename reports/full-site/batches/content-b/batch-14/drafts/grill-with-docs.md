---
title: "grill-with-docs：先达成共识，再动手构建"
slug: "grill-with-docs"
type: "post"
description: "了解 /grill-with-docs：把 AI 访谈与领域驱动设计结合起来，建立共同语言、减少重复讨论，构建更好的代码库。"
tags:
  - get-better-results
  - phase-2
updatedAt: "2026-05-05T11:03:14.382Z"
---

## 它会做什么

`grill-with-docs` 会围绕计划或设计采访你，直到你与[智能体（中文）](/ai-coding-dictionary/agent)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/agent)）形成一致理解，并在过程中把术语和重要决策写进仓库。它采用与 [grill-me（中文）](/skills-grill-me)（[英文原文](https://aihero.dev/skills-grill-me)） 相同的访谈方式：问一轮、等待回答，再问下一轮，只是把讨论对象指向代码库。

它是[有状态的（中文）](/ai-coding-dictionary/stateful)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/stateful)）。其他深入追问技能把[会话（中文）](/ai-coding-dictionary/session)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/session)）留在你的脑中，而它会在磁盘上留下文件。一个术语确定后，技能立即写进 `GLOSSARY.md`，不会等到最后再批量整理。一项决策同时满足三个条件后，技能会把它写成 ADR。这就是全部区别，也正是许多使用问题的来源。产物是真实仓库里的真实文件，所以你以为它会生成时，它可能没有生成；多人共同修改时，内容也可能发生偏差。

> 译注：ADR 是架构决策记录，用来保存重要决策的背景与取舍。本文按固定来源保留技能行为和已知问题的描述，没有重新核验版本、问题单状态或实际运行效果。

## 什么时候用

输入 `/grill-with-docs` 才会调用它，智能体不会自行使用。

适合在仓库中开始一项改动时使用：计划还模糊，相关概念的用词也没确定。它面向单次会话。该选哪个深入追问技能，取决于你面对的情况：

| 手头的情况 | 使用什么 |
| --- | --- |
| 根本不在工作目录里做事 | [grill-me](https://aihero.dev/skills-grill-me) |
| 有仓库，一次会话就能讨论清楚一项改动 | `grill-with-docs` |
| 工作太大，一次会话装不下，例如从零开发或大型功能 | [wayfinder（中文）](/skills-wayfinder)（[英文原文](https://aihero.dev/skills-wayfinder)） |
| 有仓库，但没有任何领域文档，也没有特定功能目标 | `grill-with-docs`，让它面向整个仓库，而非某项改动 |
| 一项决策被别人掌握的知识卡住 | [to-questionnaire（中文）](/skills-to-questionnaire)（[英文原文](https://aihero.dev/skills-to-questionnaire)） |

与 wayfinder 的区别，归根结底是会话数量：`/grill-with-docs` 用于单会话规划，`/wayfinder` 用于多会话规划。

## 使用前提

技能会写入仓库，所以当前位置必须适合安全写入。确定的术语放进根目录的 `GLOSSARY.md`，或者相关上下文自己的 `GLOSSARY.md`，后一种情况适用于根目录的 `GLOSSARY-MAP.md` 已将仓库标为多上下文结构。决策写入 `docs/adr/`。两者都只在需要时创建。第一个术语或决策确定之前，不会有任何文件，因此无需提前搭好目录。

此外，还必须有另外两个技能，因为它自己的 `SKILL.md` 只有一行，把任务委托给它们。[grilling（中文）](/skills-grilling)（[英文原文](https://aihero.dev/skills-grilling)） 负责访谈，[domain-modeling（中文）](/skills-domain-modeling)（[英文原文](https://aihero.dev/skills-domain-modeling)） 负责写入。只安装 `grill-with-docs`，得到的技能无法正常工作。

> 译注：上一段的文件顺序保留原文技术标识，实际关系是：先由根目录映射判断是否多上下文，再选择相应词汇表。没有在本次工作中创建这些领域文件。

## 留下哪些记录

一次会话有三类结果，但待遇并不相同。

| 确定了什么 | 记录在哪里 |
| --- | --- |
| 一个术语：项目对某个事物的专门叫法 | `GLOSSARY.md`，确定后立即写入 |
| 一项同时具备难以逆转、缺少背景就令人意外、确实存在取舍的决策 | `docs/adr/` 下的一份 ADR |
| 其他所有决定 | 只留在对话中 |

第三行最容易让人意外。`GLOSSARY.md` 只是词汇表，不存实现细节、[规格说明（中文）](/ai-coding-dictionary/spec)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/spec)）或临时笔记。ADR 要同时满足三个条件，所以大多数决策都不够格，大多数会话也不会生成 ADR。会话让词汇表更准确、却没有任何 ADR，完全符合设计预期。但这意味着，你们达成的大部分共识，只存在于当时的[上下文窗口（中文）](/ai-coding-dictionary/context-window)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/context-window)）里。应把同一场对话交给 [to-spec（中文）](/skills-to-spec)（[英文原文](https://aihero.dev/skills-to-spec)），而不是直接[清空（中文）](/ai-coding-dictionary/clearing)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/clearing)）。

词汇表是主要产物。这个技能建立领域语言：把项目自己的用词一次约定好，你、智能体和同事就不必反复重新商量。不过，并非所有人都认同这能改善智能体表现。最有力的反对意见是：一个术语和它的普通英语解释，对[模型（中文）](/ai-coding-dictionary/model)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/model)）来说会产生相同结果；词汇表主要是缩短了共享这些术语的人之间的沟通。按这个观点，词汇表仍有价值，只是受益者主要是人。

## 常见问题

**该用它，还是 `/wayfinder`？**

看范围。一次会话能讨论清楚的事，用它；大到一次会话装不下的工作，用 [wayfinder](https://aihero.dev/skills-wayfinder)，先把工作画成由决策[任务单（中文）](/ai-coding-dictionary/ticket)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/ticket)）组成的地图。Wayfinder 更慢、信息更密。常见错误是把范围本来就清楚的功能也交给它。它并不替代本技能，还可以针对地图中合适的部分，启动一次深入追问会话。

**运行了，但没有出现 `GLOSSARY.md`，也没有 ADR。**

有两个已知原因。第一，没有内容达到记录条件。ADR 必须同时满足三个门槛；如果这次改动没有新术语，也就没有东西可写。第二，确实有缺陷。技能运行在其他编排层里面时，例如规格驱动开发包装层、多智能体框架，或者别的流程中调用它的一条规则，用户报告访谈照常进行，写文件的部分却悄悄没有执行。原文说这个问题已经提交，但尚未修复。处于这种环境时，应先检查工作目录，再信任会话产物。

**它一次问完所有问题，没有推荐答案，也从没提到 `GLOSSARY.md`。**

这是两个依赖技能没有加载成功。由于 `SKILL.md` 只做一行委托，如果智能体没加载 [grilling](https://aihero.dev/skills-grilling) 和 [domain-modeling](https://aihero.dev/skills-domain-modeling)，就会自行猜测“深入追问”是什么意思，于是一次抛出全部问题，毫无结构。部分加载更容易让人困惑：`grilling` 加载了，`domain-modeling` 没加载，你会得到一场不错的访谈，却没有任何文件记录。发生频率取决于模型和[推理投入级别（中文）](/ai-coding-dictionary/effort)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/effort)），这也是该技能被报告最多的问题。如果怀疑这一点，直接问智能体加载了哪些技能。

**我其他那些决定去哪了？**

只在对话里。这是关于该技能最严重、尚未解决的抱怨。词汇表不是规格说明，大部分回答又达不到 ADR 的标准，也没有记录把每个已解决的回答，与规格、任务单和测试逐一关联。后续步骤可能把精确答案，例如顺序保证、禁止行为、数值默认值，改写成更弱的表述。最终材料看着完整，却漏掉你真正决定的内容。目前的办法是保留会话，直接交给 [to-spec](https://aihero.dev/skills-to-spec)，然后拿自己的回答逐项对照规格，而不是默认它都记全了。

**能让它处理完全没有文档的既有仓库吗？**

可以。如果代码库没有 ADR、领域语言或设计原则，这正是合适的技能。调用后说 “help me document my repo”。

中文版 Prompt（学习辅助，完整对应上面的调用示例）：

```text
帮我为这个仓库编写文档。
```

用户经常把它与 [improve-codebase-architecture（中文）](/skills-improve-codebase-architecture)（[英文原文](https://aihero.dev/skills-improve-codebase-architecture)） 配合使用，建立或修整 `GLOSSARY.md`。你需要主动引导：它会读代码，就发现的内容提问，再由你判断代码库中现有的哪些用词才合适。

**会话结束后该做什么？**

技能的结束语往往没有明确下一步，这是已知问题。在主流程中，下一步是在同一场对话里调用 [to-spec](https://aihero.dev/skills-to-spec)。如果改动小到可以立即实现，就直接用 [implement（中文）](/skills-implement)（[英文原文](https://aihero.dev/skills-implement)）。

**为什么叫这个名字？**

没人对这个名称满意。目前有一个尚未落实的建议，想把它改成 `grill-domain-model`，更准确地描述行为，但还没有进展。如果将来改名，文档页面会随之迁移，URL 也会变化。

## 怎样判断它在正常工作

- `GLOSSARY.md` 在会话过程中逐个术语更新，不是最后突然生成一大份。
- 词汇表只包含术语，即项目用词和简明定义，没有实现细节或类似规格说明的段落。
- 代码库能回答的问题，由读取代码来回答，而不是拿来问你。
- ADR 很少，甚至没有；生成的那些，都是你不想日后再争论一遍的决策。
- 当你的用词与既有词汇表定义不同，它会指出来。

## 在流程中的位置

`grill-with-docs` 位于主要构建链条的开头：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

它发生在任何内容被写成规格说明之前。它产出的共同理解与已确定术语，会交给 [to-spec](https://aihero.dev/skills-to-spec)整理，不再重新采访你。与它最接近的是 [grill-me](https://aihero.dev/skills-grill-me)，同样访谈，但不涉及仓库和文件；以及 [domain-modeling](https://aihero.dev/skills-domain-modeling)，负责它所推动的词汇表与 ADR 记录规范。两者都使用 [grilling](https://aihero.dev/skills-grilling) 作为基础访谈方法。上游的 [wayfinder](https://aihero.dev/skills-wayfinder)负责规划大到单次会话装不下的工作，并能把地图中的部分再交回这里。不确定该用什么技能或流程时，可以让 [ask-matt（中文）](/skills-ask-matt)（[英文原文](https://aihero.dev/skills-ask-matt)）帮你选择。
