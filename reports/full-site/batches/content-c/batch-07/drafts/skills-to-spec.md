---
title: "/to-spec Skill"
slug: "skills-to-spec"
type: "post"
description: "把已经达成一致的对话整理成书面规格。"
tags:
  - build-the-right-thing
  - phase-4
updatedAt: "2026-08-24T09:14:47.195Z"
---

## 它能做什么

`to-spec` 把刚刚的对话整理成一份[规格](https://www.aihero.dev/ai-coding-dictionary/spec)，并以一条 issue 发布到任务跟踪系统。

它不会采访你。调用时，决定应该已经作完。因此，它综合已知信息，包括对话、代码库、`GLOSSARY.md` 和架构决策记录（ADR），不会另开一轮问题。规格记录你已经作出的决定，不是用来作新决定的地方。

## 什么时候该用它

输入 `/to-spec`；[智能体](https://www.aihero.dev/ai-coding-dictionary/agent)不会自行调用。

当开发工作大到一次智能体[会话](https://www.aihero.dev/ai-coding-dictionary/session)装不下，必须拆成几次时使用。这就是完整的触发条件：

| 当前情况 | 运行什么 |
| --- | --- |
| 还没作出任何决定 | 先用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| 已决定，且工作能放进一个[上下文窗口](https://www.aihero.dev/ai-coding-dictionary/context-window) | 用 [implement](https://aihero.dev/skills-implement)，跳过规格 |
| 已决定，且工作跨越多次会话 | `/to-spec`，然后 [to-tickets](https://aihero.dev/skills-to-tickets) |
| [wayfinder](https://aihero.dev/skills-wayfinder) 路线图上的未决项已解决 | `/to-spec #<map_issue>` |

## 使用前提

`to-spec` 会把规格发布成 issue，因此先要用 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 为仓库配置任务跟踪系统和分流标签词汇。两种系统都行：GitHub 等真实跟踪系统，或 `.scratch/` 下的本地 Markdown 文件，后者不需要额外设置。

译注：任务跟踪系统保存工作项及其状态；这里的 issue 可以是一份完整规格，不一定是软件缺陷。`GLOSSARY.md` 保存术语，ADR 保存重要设计决定与理由。

## 规格是决定的记录

需要规格，是因为上下文窗口会用完。在[追问讨论](https://www.aihero.dev/ai-coding-dictionary/grilling)中，你已经确定了很多事：方案形状、争论过的选择，以及有意拒绝的方向。这些都在一段即将清空的对话中，规格把它们保留下来。

所以规格不验证、不作决定。它用项目自己的词汇记录你已决定的内容，让新会话不必听你重讲背景，就能接手。如果规格写了你从没说过的内容，那就是缺陷。

## 先确认测试接缝，再写正文

动笔前，`to-spec` 会先画出验证这项功能的**接缝**，与你确认。优先利用已有接缝，而非新建；选择尽可能上层的接缝。一次改动，理想情况只需要一条接缝。

译注：接缝是可以替换行为或隔离依赖的接口位置。这里讨论的是从哪里测试功能；“更上层”通常意味着接近调用方能观察到的完整行为，而不是测试内部小步骤。

其他 Skills 随后会使用这些约定好的接缝。[tdd](https://aihero.dev/skills-tdd) 只在预先确认的接缝上工作；[code-review](https://aihero.dev/skills-code-review) 根据规格审阅 diff，因此未经同意的接缝会成为审阅发现。两者通过这份文档连接起来。这就是为什么要在这里认真讨论接缝，不要拖到实现时再说。

## 常见问题

**`/to-prd` 去哪里了？**

就是这个 Skill，v1.1 时改名了。现在统一使用“spec”这个词，旧的 `to-prd` 标识不再有效，需要按新名称重新安装。旧词汇被 *spec* 与 *tickets* 这对概念替代：规格描述终点及确定终点的决定；[任务单](https://www.aihero.dev/ai-coding-dictionary/ticket)描述到达终点的步骤。如果改变方向，就删除尚未完成的任务单，保留规格。

**为什么给规格加 `ready-for-agent` 标签？我不希望智能体直接照它实现。**

这个标签表示“不需要再分流”，即文档已经完整到可以供智能体使用。它标记的是输入，不是工作指令。但轮询 `ready-for-agent` 的 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) 智能体分不清这一点，会试着一次实现整份规格，而非领取拆分后的任务。这是该 Skill 最常被报告的问题。在机制改变之前，请在 AFK 智能体提示词中明确排除父规格，或在运行 `/to-tickets` 后移除该标签。

**为什么不从追问直接进入 `/to-tickets`，跳过规格？**

很多时候就应该省略规格。只有跨会话的工作，这一步才值得。价值在于任务单可丢弃，而规格不可：每张任务单按一个新上下文窗口的容量设计，之后删除或关闭；规格则保留为记录背后理由的唯一位置。一次会话内就能完成的修改，从中得不到什么，反而增加一次信息综合，让[模型](https://www.aihero.dev/ai-coding-dictionary/model)有机会偏离原意。直接从追问进入 `/implement`。

**刚完成 wayfinder 路线图，应该给它什么？**

给主路线图 issue，即 `/to-spec #<map_issue>`，不要给各张决策任务单。[wayfinder](https://aihero.dev/skills-wayfinder) 产出的是分散在地图上的决定，不是交付项。`to-spec` 把它们汇成一份可以据以开发的文档。如果直接把路线图交给 `/implement`，就丢掉了这一步。

**规格是给我审阅，还是只给智能体？**

主要给智能体，所以写法也如此：完整、密集、引用很多。请重点读测试接缝和不在范围内的事项。这两处的错误，现在发现成本最低，以后发现成本最高。确实有人抱怨全文难读，而且没有摘要模式。但如果规格让你意外，是前面的追问不够深入，不是规格太长。

**开始拆任务后，应该冻结规格，还是让智能体改写？**

没有任何机制负责保持同步。实际使用中，它只是当时认知的快照；实现中第一次学到新东西，它就开始过时。工作交付后，可以把它视为可丢弃材料。`GLOSSARY.md` 和 ADR 才是要长期保留的文件。实现过程中学到应当长期保存的内容，放在那里，不要通过修改规格来保存。

**做的是重构或模块边界，不是功能，这个模板适合吗？**

没那么适合，这是已知限制。模板很依赖用户故事，而用户故事并不适合架构工作。最终会为接口与不变量方面的决定，编出没人要求的用户故事。改用实现决定和测试决定章节。长期架构决定应通过 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 记录为 ADR，而不是留在规格中。

**它会查找相关任务，或引用自己遵循的 ADR 吗？**

两者都不会。它会读取并遵守涉及区域的 ADR，但不会链接它们；动笔前也不会在跟踪系统搜索重叠 issue。因此规格可能重复别人已经提交的工作，却没有任何提醒。如果该区域工作很多，先自己查一下任务系统。

**`/to-tickets` 读不了我的规格，一直被截断。**

任务系统的 issue 可能无法完整返回很长的规格，又没有本地副本可替代。解决办法是，不要在 `/to-spec` 与 `/to-tickets` 之间[清空](https://www.aihero.dev/ai-coding-dictionary/clearing)或[压缩](https://www.aihero.dev/ai-coding-dictionary/compaction)上下文。在同一个窗口中连续运行，`/to-tickets` 就不必再次取得规格。

## 出现这些迹象，就说明它在发挥作用

- 它开始写作，而不是重新问一轮问题。
- 动笔前展示接缝，并尽可能少地提出接缝。
- 使用项目自己的名词，而非通用产品管理套话。
- 每个决定你都记得是自己作的，没有为了填满章节而凭空编造。
- 范围外事项写的都是真实内容。你明确拒绝的事，通常是页面中最有用的几行。

## 它处在什么位置

`to-spec` 是主要开发流程的一步，但只用于跨会话的分支：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

译注：这些是 Skill 名称组成的流程图，从左向右依次为追问、写规格、拆任务、实现、审阅和复盘，不是 shell 命令。

上游的 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 负责作决定，本 Skill 只负责记录；完成的 [wayfinder](https://aihero.dev/skills-wayfinder) 路线图也从这里接入。下游的 [to-tickets](https://aihero.dev/skills-to-tickets) 把规格拆成能打通端到端路径的小任务，交给 [implement](https://aihero.dev/skills-implement) 开发。不确定哪个 Skill 或流程适合时，[ask-matt](https://aihero.dev/skills-ask-matt) 可以帮你选择。

译注：本页相关中文词条：[规格](/ai-coding-dictionary/spec)、[任务单](/ai-coding-dictionary/ticket)、[上下文窗口](/ai-coding-dictionary/context-window)。链接优先打开已接入的中文页；尚未接入时会回到原站英文页。
