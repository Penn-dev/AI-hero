---
title: "/grill-me Skill"
slug: "skills-grill-me"
type: "post"
description: "在决定投入之前，先把一个想法讨论清楚。"
tags:
  - get-better-results
  - phase-1
updatedAt: "2026-08-24T09:14:47.195Z"
---

## 它能做什么

`grill-me` 从一个**还不成形的想法**开始，持续向你提问，直到你能决定投入其中。开始时不需要完善的计划，因为这次[会话](https://www.aihero.dev/ai-coding-dictionary/session)就是为了形成计划。它按**轮次**提问。每一轮覆盖当下完整的**可提问范围（frontier）**：所有前置问题已经解决、现在可以问的问题。因此，它不会问一个必须等你回答前一道问题才能决定的问题。

它是[无状态的](https://www.aihero.dev/ai-coding-dictionary/stateless)。不写文件，也不留下工作区。唯一的结果，是你脑中的想法更清楚了。

## 什么时候该用它

输入 `/grill-me` 来调用；[智能体](https://www.aihero.dev/ai-coding-dictionary/agent)不会自行选用它。请在**新对话**中开始，不要接在智能体已经替你写好的一份计划后面。

只要有一个值得认真考虑的想法，就可以用它：一项功能、产品方向、商业决定或一篇文章。此时离想清楚具体工作还可以很远。模糊不是继续等待的理由，因为这次会话就是用来消除模糊的。如果已经能准确描述要做什么，就不需要再追问一遍。

选择三个追问类 Skills 中的哪一个，取决于眼前的情况：

- **任何主题，任何地方。** 用 `grill-me`。不需要仓库，不写文件，话题也不一定与代码有关。
- **需要结合现有代码库。** 用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。提问方式相同，但它[保留状态](https://www.aihero.dev/ai-coding-dictionary/stateful)：会读取代码，把学到的内容存入 `GLOSSARY.md` 和架构决策记录（ADR）。
- **一次会话做不完。** 用 [wayfinder](https://aihero.dev/skills-wayfinder)。它先把整个工作画成路线图，再在其中开展追问会话。

不要开启[计划模式](https://www.aihero.dev/ai-coding-dictionary/agent-mode)。计划模式会让智能体急于产出计划，而你此时要的是继续提问。

译注：这里的“状态”指讨论结果有没有保存成可供后续读取的文件。`GLOSSARY.md` 记录项目术语，ADR 记录重要设计决定及理由。

## 这是双方对话，不是被动受访

Skill 负责提问，但范围由**你**决定。人们常常忽略这一点。正是这一点，决定会话最终产出的是经过思考的决定，还是听起来笃定的胡话。

常见失败方式是**被动应答**：连续四十个问题都回答“同意、同意、同意”，最后得到智能体自己写、你只点了头的一份计划。因为过程很长，看上去很有成效；实际上你没有作出任何决定，而结果显得比实际更确定。

原文对话示例：“agreed, agreed, agreed”。

中文理解：同意、同意、同意。

主动参与就是掌握方向。问题不够深入，就要求问得更细；范围开始跑偏，就指出来。不知道时，认真地说“I don't know”。这个 Skill 帮助工程师，不会取代工程师。结果的质量取决于回答的质量，而非问题的数量。

中文理解：“I don't know”就是“我不知道”。

相反的错误也确实存在，只是较少见：一直讨论，迟迟不开始写代码。

## 能靠追问回答的，与不能的

有些问题可以谈出答案，有些不行，追问再多也无济于事。

“One long form or three pages?”和“how should this interaction feel?”就是**不能只靠追问回答**的问题。你需要先看到一个可以试用、可以回应的东西，才能作答。碰到这种问题，就停止追问。用 [prototype](https://aihero.dev/skills-prototype) 做一个用完即可丢弃的版本，看过之后，再回来用一句话回答。

中文理解：前一个问题是“做成一张长表单，还是分成三页？”，后一个是“这个交互用起来应该是什么感觉？”

会话过长，往往是因为试图靠讨论解决这种问题。智能体反复换个问法，你反复猜测，范围随着不确定性不断扩大。

## 出现这些迹象，就说明它在发挥作用

- 你反对了某个观点。一次完全没有你提出异议的会话，往往本就没必要进行。
- 问题分成几轮提出，而不是长时间一次问一个；后面的轮次明显建立在前面的回答上。
- 最后走到了意想不到的方向，因为某个问题让你看见了自己一直在无意识作出的决定。
- 结束时，你能向没参加讨论的人解释并捍卫每一个选择。

## 常见问题

**大概会问多少问题？怎样知道结束了？**

数轮次，不要数问题。四轮共四十六个问题，是很普通的一次会话。当可提问范围为空时就结束：所有分支都已讨论，没有剩下未经说明的假设。

**它问了我两百个问题，哪里出了问题？**

通常是范围太大。先让智能体把工作拆小，再逐项追问。会话太长也会进入[迟钝区](https://www.aihero.dev/ai-coding-dictionary/smart-zone)：[上下文窗口](https://www.aihero.dev/ai-coding-dictionary/context-window)变得太满，问题质量就会下降。

**能改回一次只问一个问题吗？**

可以。把这条指令加到全局 `CLAUDE.md` 中：

```
When grilling, ask one question at a time.
```

中文 Prompt（译注）：

```text
追问时，一次只问一个问题。
```

**真的不知道答案怎么办？**

直说。“I don't know”是有效的回答。答不上来通常说明该做原型，而不是继续猜。

中文理解：“I don't know”就是“我不知道”。

**写规格前，要另开一次会话吗？**

不要。当前会话的价值，就在于刚刚积累的[上下文](https://www.aihero.dev/ai-coding-dictionary/context)。把同一段对话直接交给 [to-spec](https://aihero.dev/skills-to-spec)。

**模型的选择重要吗？**

比大多数 Skills 更重要。追问依赖[模型](https://www.aihero.dev/ai-coding-dictionary/model)自身对系统会怎样出问题的认识，所以用你最好的模型。实现阶段主要依照上下文执行，用便宜一些的模型就可以。

## 它处在什么位置

`grill-me` 是一个**任何地方、任何主题都能使用的独立 Skill**。无状态让它容易迁移，不需要仓库、工作区或预先设置，也不假定想法与软件有关。人们用它讨论商业决定、写作或接下来做什么，凡是自己想不清楚的事都可以。

可迁移性是它与 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 的唯一区别。后者开展相同的访谈，但会读取代码库作为依据，并把学到的内容记录为 `GLOSSARY.md` 和 ADR。两者底层都使用 [grilling](https://aihero.dev/skills-grilling)。`grill-me` 是不保存状态、由用户主动调用的入口。

如果讨论的事情最后确实与软件有关，可以把同一段对话交给 [to-spec](https://aihero.dev/skills-to-spec)，接着进入开发流程。这是一个选项，不是这个 Skill 的唯一目的。不确定哪条流程适合时，可以让 [ask-matt](https://aihero.dev/skills-ask-matt) 帮你选择。

译注：本页相关中文词条：[无状态](/ai-coding-dictionary/stateless)、[有状态](/ai-coding-dictionary/stateful)、[上下文窗口](/ai-coding-dictionary/context-window)。链接优先打开已接入的中文页；尚未接入时会回到原站英文页。
