---
title: "/wait-what Skill"
slug: "skills-wait-what"
type: "post"
description: "让智能体用直白的英语再解释一遍。"
updatedAt: "2026-08-24T09:14:47.195Z"
---

## 它能做什么

当你没看懂一条消息时，输入 `wait-what`，[智能体](https://www.aihero.dev/ai-coding-dictionary/agent)就会换一种方式重新说明刚才的内容。它会补上你缺少的背景，用直白的英语表达，并采用项目 `GLOSSARY.md` 中的词汇。

译注：`GLOSSARY.md` 是项目词汇表，用来记录大家对同一个词达成的共同定义。此 Skill 原文针对英语表达，本页按原意介绍它。

这个 Skill 只有三行。这是有意为之，并非还没写完。用来抑制啰嗦的 Skill 经常失败，原因恰恰是它们自身越写越长。一个长达四百行的“简洁表达”Skill 仍会让[模型](https://www.aihero.dev/ai-coding-dictionary/model)啰嗦，因为模型模仿的是 Skill 的篇幅，而不是其中要求简洁的指令。这个 Skill 只用一个准确的引导词，不再堆叠别的内容。

## 什么时候该用它

输入 `/wait-what` 来调用。智能体不会自行使用，也不应该自行使用。只有你自己知道从哪里开始没跟上。

一发现自己开始草草扫读，就可以用它。例如，智能体开始使用自创术语，在一句话里塞进五个缩写，或解释一个你连前提都没听过的决定。它修复的是已经发生的对话。如果想从一开始就避免这些术语问题，可以用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，先建立共同语言。

## 名字本身就是方法

引导词是 **wait，也就是“等等”**。“Be concise”要求智能体改变输出，模型往往通过硬删词语来遵从，结果你更难理解。

英文 Prompt：Be concise

中文 Prompt（译注）：

```text
简洁一点。
```

**Wait** 说的是*你的状态*：你在这里开始没听懂了。智能体听到“be brief”时，会写出省略过多的短句；听到“wait, you lost me”时，才会回过头来解释。

英文 Prompt：be brief

中文 Prompt（译注）：

```text
简短一点。
```

英文 Prompt：wait, you lost me

中文 Prompt（译注）：

```text
等等，我没跟上你的意思。
```

整个 Skill 就建立在这点差别上。常见的反啰嗦指令都在描述*输出*，例如 `/tldr`、`/no-fluff`、`/talk-normal`。模型矫枉过正，写出更短却并不更清楚的零碎句子。点明*听的人*出了什么状况，就能同时提出两项要求：减少字数，**并且**补上缺失的背景。

Skill 要求重新说明的是 **that，也就是“那件事”**，而非“that last message，也就是‘上一条消息’”。让你没听懂的内容通常不止一个段落，因此由智能体判断需要往回追溯多远。

## 沿用你已有的语言

正文复用了全局 `CLAUDE.md` 和项目 `GLOSSARY.md` 中已有的引导词。ASD-STE100 简化技术英语决定表达风格，共同的领域语言提供名词。Skill、`CLAUDE.md` 和 `GLOSSARY.md` 使用相同的 [Token](https://www.aihero.dev/ai-coding-dictionary/token)，因此调用它并非给出新指令，而是提醒智能体遵守已经接受的要求。

译注：`CLAUDE.md` 是 Claude Code 会读取的项目或用户指令文件。ASD-STE100 是一套受控技术英语规范，限制词汇与句式，目的是减少歧义；这里保留原文对该规范的引用，没有宣称中文版符合这套英语规范。

如果没有 `GLOSSARY.md`，也没有 `GLOSSARY-MAP.md` 指向适用于当前上下文的词汇表，这个 Skill 仍然能用。你失去的只是领域词汇这一部分。

## 出现这些迹象，就说明它在发挥作用

- 重新说明的内容**更短，也更清楚**，而不是更短、更生硬。
- 它补上了你缺少的前提，而不只是删词。
- 项目已有的名词取代了自创词汇，`GLOSSARY.md` 中的术语重新出现。
- 连续用两次，也不会退化成过度简略的表达。

## 它处在什么位置

任何时候、任何对话里，包括运行其他 Skill 时，都可以用 `wait-what`。它在事后修复一条消息。真正的解决办法，是事先商定共同语言，这正是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 的用途：它在[追问讨论](https://www.aihero.dev/ai-coding-dictionary/grilling)的过程中运行 [domain-modeling](https://aihero.dev/skills-domain-modeling)，把双方共同使用的词记录在 `GLOSSARY.md` 中。不确定此刻应该用哪个 Skill 时，可以让 [ask-matt](https://aihero.dev/skills-ask-matt) 帮你选择。

译注：本页相关中文词条：[智能体](/ai-coding-dictionary/agent)、[模型](/ai-coding-dictionary/model)、[Token](/ai-coding-dictionary/token)。链接优先打开已接入的中文页；尚未接入时会回到原站英文页。
