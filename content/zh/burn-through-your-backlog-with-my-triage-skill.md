---
title: "triage：把混乱的待办变成智能体可接手的工作"
slug: "burn-through-your-backlog-with-my-triage-skill"
type: "post"
description: "使用 Triage 技能整理 GitHub Issue，把零散报告转成 AI 智能体可执行的任务，并高效管理积压工作。"
tags:
  - phase-7
  - build-the-right-thing
updatedAt: "2026-05-05T09:57:22.826Z"
---

## 它会做什么

`triage` 会处理项目追踪器里的 Issue，让每一项经过一个由**分诊角色**组成的小型状态机，角色分为类别与状态。每个 Issue 最终都会变成智能体可接手的任务简报、向报告者提出的具体问题，或附有关闭原因的已关闭 Issue。

它只处理**不是你创建的 Issue**。包括原始缺陷报告、新收到的功能请求，或者未经预告提交的外部 PR：也就是别人以各种形式送进追踪器的工作。由 [to-tickets（中文）](/skills-to-tickets)（[英文原文](https://aihero.dev/skills-to-tickets)） 生成的[任务单（中文）](/ai-coding-dictionary/ticket)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/ticket)）已经能交给智能体，再跑 `triage` 只是在重复劳动。规则很简单：`/triage` 只处理外部新收到的 Issue，不处理你自己创建的 Issue。

它与手工打标签也不同：会先推荐，再等待。它说明建议的类别、状态和理由，以及在代码库里发现了什么，在你明确要求之前，不会应用任何变更。

> 译注：本文完整保留固定来源中的工作流和已知问题，没有连接追踪器、创建标签、发布评论或关闭任何 Issue。下文的“尚未修复”“尚未发布”都是原文时点的状态，未重新核验。

## 什么时候用

输入 `/triage`，再用普通语言描述需求，即可调用。[智能体（中文）](/ai-coding-dictionary/agent)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/agent)）不会自行使用。示例如下：

- “Show me anything that needs my attention”
- “let's look at #42”
- “move #42 to ready-for-agent”

中文版 Prompt（学习辅助，第一个示例）：

```text
列出需要我关注的事项。
```

中文版 Prompt（学习辅助，第二个示例）：

```text
我们来看看 #42。
```

中文版 Prompt（学习辅助，第三个示例）：

```text
把 #42 移到 ready-for-agent 状态。
```

| 手头的情况 | 使用什么 |
| --- | --- |
| 追踪器里有大量别人提交的原始报告 | `/triage` |
| 自己有个粗略想法，还没写下来 | [grill-with-docs（中文）](/skills-grill-with-docs)（[英文原文](https://aihero.dev/skills-grill-with-docs)） |
| 对话已经达成共识，需要整理成[规格说明（中文）](/ai-coding-dictionary/spec)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/spec)） | [to-spec（中文）](/skills-to-spec)（[英文原文](https://aihero.dev/skills-to-spec)） |
| 规格已写好，需要拆成智能体可接手的任务单 | [to-tickets](https://aihero.dev/skills-to-tickets) |
| 缺陷已确认，需要找根因，而不只是打标签 | [diagnosing-bugs（中文）](/skills-diagnosing-bugs)（[英文原文](https://aihero.dev/skills-diagnosing-bugs)） |

## 使用前提

`triage` 会读写 Issue 追踪器，所以必须先由 [setup-matt-pocock-skills（中文）](/skills-setup-matt-pocock-skills)（[英文原文](https://aihero.dev/skills-setup-matt-pocock-skills)）配置追踪器及标签词汇。下面的角色名是标准名称，追踪器中的实际标签字符串可能不同，setup 会提供映射。如果标签已经与标准名称完全一致，就不需要映射，也无需设置这一部分。

追踪器配置还决定是否把外部 PR 作为请求入口，以及哪些人算外部提交者。这个开关默认关闭，setup 现在也不再询问。要把 PR 纳入范围，需要在 `docs/agents/issue-tracker.md` 中打开它。

## 状态机

每个完成分诊的事项，都必须恰好有一个类别角色和一个状态角色。类别只有两个：`bug` 表示某处出了问题，`enhancement` 表示新增功能或改进。状态有五个：

| 状态 | 含义 |
| --- | --- |
| `needs-triage` | 需要你评估。没有标签的 Issue 通常先进入这里。 |
| `needs-info` | 等待报告者补充信息。收到回复后回到 `needs-triage`。 |
| `ready-for-agent` | 规格完整，并附有任务简报。[AFK（中文）](/ai-coding-dictionary/afk)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/afk)） 智能体可以接手。 |
| `ready-for-human` | 同样有简报，还说明了智能体不能处理的原因，例如需要人的判断、外部访问或人工测试。 |
| `wontfix` | 已关闭，且记录了原因。 |

全部词汇就是这些。每项只有一个状态角色，让查询保持简单。状态也是这个[技能（中文）](/ai-coding-dictionary/skill)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/skill)）最常被要求改进的部分。有人希望增加“规格已明确，但被其他 Issue 阻塞”的状态，用 `deferred` 表示等待未来触发条件的工作，以及用终态 `implemented` 表示已实现。这些都还没有发布，后面会详细说明。

`wontfix` 有三种情况，区别很重要，因为只有其中一种会写入知识库：

| 关闭原因 | 处理方式 |
| --- | --- |
| 已经实现 | 评论说明功能现在在哪里，不写入 `.out-of-scope/`。它是已构建的功能，不是被拒绝的功能，写进该目录会破坏去重检查。 |
| 拒绝缺陷报告 | 礼貌解释，然后关闭。 |
| 拒绝功能增强请求 | 在 `.out-of-scope/` 创建文件，在关闭评论中链接它，然后关闭。 |

`.out-of-scope/` 按被拒绝的概念保存 Markdown 文件，不是每个 Issue 一份。每个文件是一份简短设计文档，不是数据库行，说明拒绝了什么、为什么拒绝，并列出所有提出该需求的 Issue。评估任何事项前，`triage` 都会读取整个目录。匹配依据是概念，不是关键词，所以 “night theme”（夜间主题）会匹配 `dark-mode.md`。找到匹配项后，它会展示旧决定，询问你是否仍同意，而不是从头再争论一遍。

## 先验证，再写简报

开展任何[深入追问（中文）](/ai-coding-dictionary/grilling)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/grilling)）之前，`triage` 先检查报告是否属实。缺陷按照报告者步骤复现；PR 则检出分支，运行相关测试，然后报告以下三种结果之一：

- 已确认，并指出对应代码路径
- 无法复现
- 细节不足，连尝试都做不了。这是最明确的 `needs-info` 信号

同一轮还会对照代码库做两项检查。**重复功能检查**判断功能是否已经实现，按领域概念搜索，而不是照抄报告者用词。**历史拒绝检查**查看 `.out-of-scope/` 是否已经拒绝过。两项成本都很低，任一命中就会得到 `wontfix`。

这些工作最终服务于一份重要产物：**智能体任务简报**。这是 `triage` 在 Issue 转入 `ready-for-agent` 时发布的结构化评论。`triage` 发布后，简报成为工作约定，原报告只作为背景。简报追求持久有效，而不是绑死在当下精确位置，因为 Issue 可能在 `ready-for-agent` 中放几周，代码却持续变化。因此，它描述类型、签名和行为约定，不写文件路径或行号。经过确认的复现，比猜测能支撑更可靠的简报。

## PR 就是附带代码的 Issue

如果追踪器把外部 PR 视为请求入口，它们也走同一状态机，使用相同的类别、状态和转换。状态针对的是这份代码差异。`ready-for-agent` 表示已有简报，应由智能体继续处理代码；`ready-for-human` 表示可以由人合并。PR 简报描述的是现有差异还需要做什么，不是怎样从零构建功能。

发现列表只显示外部 PR，因为协作者正在开发的分支不属于分诊工作。但这个筛选只作用于自动发现；如果你明确点名一个 PR，`triage` 会处理它，无论是谁写的。

> 译注：原文开头限定外部新收到的事项，这里又明确给出“点名 PR”时的例外，两处都保留。状态表达适合由谁接手，不等于已授权实际合并。

## 常见问题

**运行 `/to-spec` 和 `/to-tickets` 后，任务单还没分诊，要再跑 `/triage` 吗？**

不要。它们已经能交给智能体。`to-tickets` 发布时会加上 `ready-for-agent` 标签，AFK 执行器不必再处理一遍就能领取。曾有用户跑完规格流程，发现输出带着 `needs-triage`，结果 AFK 执行器什么都没领。`triage` 是外部工作进入系统的入口，规格流程是你自己发起工作的路径，两条路在 `ready-for-agent` 处汇合，不是在更早的地方。

**`triage` 在已有 `to-spec` → `to-tickets` → `implement` 流程的情况下，还有用吗？**

只有存在外部新工作时才有用。`triage` 比那条流程更早出现，职责也不同：处理别人提交的报告。如果追踪器里全是你自己规划的工作，几乎用不到它。如果维护公开项目，或团队会向你提交缺陷，它就是这些工作的起点。主要场景是接收外部贡献者 Issue 的开源仓库。

**智能体想加 `ready-for-agent`，但 `gh` 说标签不存在。**

这是已知未解决的问题 [#616](https://github.com/mattpocock/skills/issues/616)。`setup-matt-pocock-skills` 会把标签词汇写进 `docs/agents/triage-labels.md`，却不会在追踪器里真正创建标签。用 `gh label create` 或追踪器界面，手动创建五个状态标签和两个类别标签，一次即可，之后就不会再出现这个错误。该 Issue 链接了一份社区修复分支，但尚未合并。

**五个状态不够，阻塞、延期或已实现怎么办？**

这是关于该技能被报告最多的缺口，有三种形式：

- 规格完整，但必须等另一个 Issue 关闭才能开始，[#139](https://github.com/mattpocock/skills/issues/139)。报告者认为，此时 `ready-for-agent` “技术上没错”，却会误导智能体领任务后卡住。
- 明确要做，但要等未来某个触发条件，眼下还不能执行，[#297](https://github.com/mattpocock/skills/issues/297)。
- 表示“已经实现，等待验证”的终态。没有它，AFK 执行器可能把完成的任务重新排进队列。

阻塞场景已被认可，但名称还没定，是 `blocked` 还是 `paused`。这些功能都没发布。临时做法是在类别之外，加一个仓库自己的额外标签，让状态位仍保留准确值；但技能并不理解额外标签。一份社区分支做得更多，加入了 `needs-slicing`、`tracking` 和工作量标签。可以用，但那属于该分支，不是技能本身已有的功能。

**它和 `/diagnosing-bugs` 有什么区别？**

这里的验证故意做得浅，只回答“问题是否真实，以及大致在哪”，不查根因。几分钟内无法按报告步骤复现，就用 `needs-info`；如果想立刻深入调查，则用 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)。两个技能的正文目前还没互相提到对方，已有用户报告这个缺口，但尚未解决。

**能把整个积压队列交给它，放着跑吗？**

可以这样要求，但要留意它实际读了什么。“列出需要关注的事项”只是用于选择目标的低成本列表。你选中一个 Issue 后，`triage` 才为它收集完整[上下文（中文）](/ai-coding-dictionary/context)（[英文原文](https://www.aihero.dev/ai-coding-dictionary/context)）。如果一次处理 20 个，智能体可能不告诉你，就把这份简单列表当成全部证据。列表包含 Issue 正文，却不包含评论。有用户真的遇到了：三个 Issue 的评论里已经写了 “already fixed, recommend closing”（已修复，建议关闭），它却又给三项都写了新简报。批量处理时，要明确要求逐项读取评论。

**支持 Linear 或 GitHub Issue 之外的系统吗？**

支持。追踪器由配置决定，不是写死的假设。有人通过 `linear` CLI 连接 Linear，也有人使用 GitLab，或 `.scratch/` 下的普通 Markdown 文件。常见分工是：Linear 管 Issue 和规划，GitHub 管代码和 PR。技能说“追踪器”时映射到 Linear，说“PR”时映射到 GitHub。本地 Markdown 追踪器还有一个未解决的模板问题：生成文件可能把验收标准写两遍，一次在顶层，一次在任务简报内，见 [#200](https://github.com/mattpocock/skills/issues/200)。

## 怎样判断它在正常工作

- 每个处理过的事项最终恰好有一个类别角色、一个状态角色，不会缺失，也不会同时有两个冲突状态。
- 给出有理由的建议后就停下来，不会擅自重新打标签再处理下一项。
- 进入 `ready-for-agent` 前，已经复现缺陷，或检出并运行了 PR。
- 简报描述类型和行为，不含文件路径或行号。
- 六个月前拒绝的需求又出现时，它会告诉你，并引用旧原因，而不是重新分诊一遍。
- 每条发布的评论都以 `> *This was generated by AI during triage.*` 开头。

中文理解（学习辅助，对应上面完整的评论归属声明；实际英文前缀保留原样）：

```markdown
> *此内容由 AI 在分诊过程中生成。*
```

## 在流程中的位置

`triage` 是外部工作进入流程的入口，不是主链条中的一步。主流程始于你自己的想法：追问、规格、任务单、实现、审查。`triage` 则处理别人带来的工作。两条路最后都通向同一个地方：带有 `ready-for-agent` 标签、附着任务简报的 Issue。[implement（中文）](/skills-implement)（[英文原文](https://aihero.dev/skills-implement)）会像领取 [to-tickets](https://aihero.dev/skills-to-tickets) 生成的任务一样领取它。请求还需要更多细节、`triage` 无法写简报时，`triage` 会一起运行 [grilling（中文）](/skills-grilling)（[英文原文](https://aihero.dev/skills-grilling)） 与 [domain-modeling（中文）](/skills-domain-modeling)（[英文原文](https://aihero.dev/skills-domain-modeling)），一轮一轮地提问，并在作出决定的过程中写入 `GLOSSARY.md` 和 ADR。不确定自己该走哪条路时，可以用 [ask-matt（中文）](/skills-ask-matt)（[英文原文](https://aihero.dev/skills-ask-matt)）帮助选择。
