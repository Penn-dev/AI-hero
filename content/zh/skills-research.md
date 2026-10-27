---
title: "/research Skill"
slug: "skills-research"
type: "post"
description: "读取第一手来源，得到带出处的答案。"
updatedAt: "2026-08-24T09:14:47.195Z"
---

## 它能做什么

`research` 通过读取最直接掌握答案的来源来回答问题，随后在仓库中留下一份带引用的 Markdown 文件。它只使用[第一手来源](https://www.aihero.dev/ai-coding-dictionary/primary-source)：官方文档、源代码、规格和第一方 API。每个主张都追溯到直接来源，因此只要 API 自己的文档可访问，就不会转述某篇博客对 API 的介绍。

它不会直接在对话里回答。输出是文件，放在仓库原本存放这类笔记的位置，每个主张带一个链接。你得到一份可以回应、交给另一个智能体或丢弃的文档，而非一条随[会话](https://www.aihero.dev/ai-coding-dictionary/session)结束就消失的回答。

## 什么时候该用它

输入 `/research`；任务变成需要实际查阅资料时，[智能体](https://www.aihero.dev/ai-coding-dictionary/agent)也会自动选用。

下一步需要从工作目录以外*查明事实*时使用，例如第三方 API 怎样工作、规格说了什么、某个版本声明是否成立，而且你不想让自己的主对话停下来做阅读。具体需求决定选哪个 Skill：

| 需要什么 | 使用什么 |
| --- | --- |
| 某项决定等待的外部事实 | `research` |
| 通过访谈与你一起作决定 | [grilling](https://aihero.dev/skills-grilling) |
| 写入 `GLOSSARY.md` 和 ADR、长期保留的架构决定 | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| 查明某种方法在当前代码库是否有效 | [prototype](https://aihero.dev/skills-prototype) |
| 一次会话容纳不了的大计划 | [wayfinder](https://aihero.dev/skills-wayfinder) |

`research` 与 `grill-with-docs` 的分界，是**结果的有效期**。研究产出短期事实，例如截至本周，某个库的认证机制如何工作。ADR 记录要保留的决定。如果产出的是决定而非事实，你在做的是[追问讨论](https://www.aihero.dev/ai-coding-dictionary/grilling)，不是研究。

译注：ADR 是架构决策记录，保存选择及其理由；`GLOSSARY.md` 保存项目共同使用的术语。

## 把资料查阅交出去

阅读由**后台智能体**完成。它逐项追溯第一手来源，写一个 Markdown 文件，再回来报告；你继续自己的工作。委派出去的是查阅，不是把思考也外包。你会拿到一份可以据以追问、规划或设计的文档，决定仍由你作。

没有任何规则阻止后台智能体再启动自己的后台智能体。这是本 Skill 记录最充分的问题。

文件位置由仓库决定，不由 Skill 固定。它遵循已有笔记约定；没有约定，就选一个合理位置并告诉你。每次运行写一个文件。

## 常见问题

**它又启动了第二个研究智能体，这是预期行为吗？**

不是。这是尚未关闭的 bug，[issue #530](https://github.com/mattpocock/skills/issues/530)。Skill 要求调用方启动后台智能体，却没有限制智能体类型。于是调用方启动 `general-purpose` 智能体，后者也有 `Agent` 工具和同样的指令，又执行了一遍。有报告者测得，一项研究任务在三个重叠执行中总共花了约 450k [Token](https://www.aihero.dev/ai-coding-dictionary/token)，重复任务晚半小时才结束，而且用户看不到。Claude Code 之外也发生过，用户确认 Codex 配合 GPT-5.6-sol 同样会嵌套。

尚无已发布的修复。有用户在已安装副本里加一行，要求如果自己已经是[子智能体](https://www.aihero.dev/ai-coding-dictionary/subagent)，就自己做研究。这有所帮助，但只是指令，不是结构性修复。调用后请查看后台任务清单，停止重复任务。

相反的失败也会发生：如果你的全局指令禁止再次委派，后台智能体会拒绝任务，Skill 什么也没做，却不告诉你。

**文件放哪里，要提交到 Git 吗？**

Skill 把文件放在仓库原本存笔记的地方，没有进一步意见。社区看法大体一致：保留 ADR，不保留研究文件。Discord 一段讨论说得最清楚：“ADRs yes. Everything else archive or delete after done. It otherwise becomes cruft of work and can poison future repo reads if you've drifted away from the spec/research.”

中文理解：ADR 要保留，其他内容完成后归档或删除。不然它们会积成工作残留；如果项目已经偏离当初的规格或研究，后续读取仓库时还会被误导。

研究文件记录的是撰写当日的事实，过时文件比没有更糟。综合来看，它们不应进入 Git，也没有统一的存放位置。有人改用 Obsidian、独立知识仓库或任务跟踪系统。

**怎样算高可信度第一手来源，谁决定？**

[模型](https://www.aihero.dev/ai-coding-dictionary/model)决定。Skill 只列出合格来源的*类型*，例如官方文档、源码、规格和第一方 API，没有白名单、域名限制或验证步骤。这在最初提案时就引来最强烈质疑，至今无人公开回答：“Five research subagents pointed at junk just gives you five confident wrong answers faster. How are you gating what counts as high-trust sources?”

中文理解：五个研究子智能体去读垃圾资料，只会更快给出五个自信的错误答案。你们怎样把关，判断什么算高可信度来源？

唯一保障是每个主张上的引用。点开两三个看看。如果指向的是别人对原材料的总结，而非材料本身，这次研究就失败了。

**后来的会话会复用先前研究吗？**

不会。没有机制自动加载旧研究文件。文件会留在仓库里，直到某个人或 Skill 指向它。早期对设计最强的质疑是：“the value's the markdown becoming context the agent re-reads later, not the fetch itself. A write-once dead file is just a fancy search.”

中文理解：价值在于 Markdown 成为智能体以后会重读的上下文，不在于取回资料。写完再也没人看的文件，不过是包装复杂一点的搜索。

已发布的 Skill 没解决这个问题。实际使用中，只有你把文件送进下一步，它才有用：附到规格中，引用进追问会话，或让[任务单](https://www.aihero.dev/ai-coding-dictionary/ticket)指向它。

**为什么不直接让智能体去读文档？**

可以，这个 Skill 替代的本来就是两行这样的提示词。Skill 提供两点：后台运行，让你的会话[上下文](https://www.aihero.dev/ai-coding-dictionary/context)保持干净；每次都使用第一手来源限制和带引用文件输出，不取决于你怎样措辞。与[智能体执行框架](https://www.aihero.dev/ai-coding-dictionary/harness)自带的深度研究模式相比，区别在于文件和第一手来源规则，不是搜索本身。小问题两行提示词就能解决，就用两行提示词。

**什么时候停止阅读？**

Skill 没有停止标准。因此出现两种看似相反、根源相同的抱怨：智能体钻得过深，或范围铺得很广，却漏掉真正重要的细节。一位使用者说：“deep-research skills are a bit too deep sometimes. And telling an agent to research usually results in missing crucial details.”

中文理解：深度研究 Skills 有时挖得过深，而让智能体研究又常常漏掉关键细节。

你必须自己限定范围。一个狭窄、可回答的问题，例如一个 API、一种行为或一个版本声明，结果远好于“research X”。

中文 Prompt（译注）：

```text
研究 X。
```

**`/wayfinder` 创建了研究任务，要我自己处理吗？**

不，现在它会替你启动。在 v1.1 之后尚未发布的改动中，绘图会话会为每张研究任务启动一个 `/research` 子智能体，并行运行。每个子智能体把发现记录到可丢弃的 `research/<name>` 分支，任务单通过[上下文指针](https://www.aihero.dev/ai-coding-dictionary/context-pointer)引用。研究任务是 wayfinder“一次会话只做一张任务”规则的唯一例外，因为它们是 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) 工作，不需要等待你。一个已知问题是，之后删掉分支，任务中的指针就会失效。

## 出现这些迹象，就说明它在发挥作用

- 你的会话继续推进。如果你只能坐着看它读资料，说明并没有完成委派。
- 只出现一个新后台任务。出现名字几乎相同的第二个，就是嵌套 bug。
- 仓库惯用笔记目录中出现一个新 Markdown 文件，智能体告诉你路径。
- 每个主张都有链接，随机点两个，会到达官方文档、规格或源码文件本身，而非别人的转述。
- 只凭文件就能作出原先卡住的决定，不必再自己回头查来源。

## 它处在什么位置

`research` 是随时可用的独立 Skill，为思考类 Skills 提供材料，不属于开发链的一步。你把它的文件*带入*流程。[grilling](https://aihero.dev/skills-grilling) 和 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 已掌握事实时，问题会更准确；[to-spec](https://aihero.dev/skills-to-spec) 也能据此综合规格。[wayfinder](https://aihero.dev/skills-wayfinder) 是唯一直接调用它的 Skill，会用 `/research` 子智能体解决路线图中的每张研究任务。完整路线见 [ask-matt](https://aihero.dev/skills-ask-matt)。

译注：未发布改动、bug 状态、模型名称与消耗数字均按固定来源保留，不代表本次已运行、已验证或已使用相同模型。

译注：本页相关中文词条：[第一手来源](/ai-coding-dictionary/primary-source)、[第二手来源](/ai-coding-dictionary/secondary-source)、[上下文指针](/ai-coding-dictionary/context-pointer)。链接优先打开已接入的中文页；尚未接入时会回到原站英文页。
