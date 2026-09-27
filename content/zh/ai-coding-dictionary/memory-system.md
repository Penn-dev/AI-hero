---
title: "记忆系统"
slug: "memory-system"
type: "dictionary"
description: "把信息保存到任务环境中，并在后续会话开始时重新加载，让智能体能够跨会话延续状态的系统。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
记忆系统尝试让[智能体](/ai-coding-dictionary/agent)变得[有状态](/ai-coding-dictionary/stateful)，并把这种状态延续到不同[会话](/ai-coding-dictionary/session)。它会在会话期间把信息保存到[任务环境](/ai-coding-dictionary/environment)中，再在以后的会话开始时，把这些信息重新加载进[上下文窗口](/ai-coding-dictionary/context-window)。这样，即使用户[清空](/ai-coding-dictionary/clearing)了当前会话，智能体也能延续之前的信息。

记忆系统分为两部分。第一部分是写入：会话进行时，智能体把学到的内容——例如你说过的偏好、项目中的某项事实——记录为任务环境中的文件。第二部分是读取：新会话开始时，[执行框架](/ai-coding-dictionary/harness)把这些文件或文件索引重新加载进上下文窗口。许多执行框架自带记忆系统，Claude Code 的 `/memory` 就是一例。你也可以自己搭建一套简单的记忆系统：创建一个存放笔记的目录，再在 [AGENTS.md](/ai-coding-dictionary/agents-md) 中要求智能体查阅它。

和其他每次都会加载的内容一样，记忆也需要在完整程度与上下文占用之间取舍。记忆会不断积累，所以多数系统只加载一行行简短索引，并用[上下文指针](/ai-coding-dictionary/context-pointer)指向完整内容，而不会把所有正文一次性塞进上下文窗口。记忆还是[二手来源](/ai-coding-dictionary/secondary-source)，因此可能随时间变得不准确：3 月记录的一项事实，到 6 月仍可能以同样肯定的语气被加载，但项目早已发生变化。记忆系统需要定期整理和删除过时内容，AGENTS.md 也一样。

_用法：_

“我总得重新告诉它：我用的是 Postgres，不是 MySQL。”

“接入一套记忆系统：把它学到的内容写入[文件系统](/ai-coding-dictionary/filesystem)，这项工作可以从第一个[工作轮次](/ai-coding-dictionary/turn)开始；以后每次会话开始时再加载。[模型](/ai-coding-dictionary/model)本身是[无状态的](/ai-coding-dictionary/stateless)，记忆层只是模拟出了跨会话的连续性。”

## 中文学习辅助：术语小词典

- **memory system**：记忆系统，把需要延续的信息保存到文件等任务环境中，供后续会话重新读取的机制。
- **stateful / stateless**：有状态表示能保留并继续使用此前的信息；无状态表示每次都从当前输入开始，本身不会记住上次会话。
- **context window**：上下文窗口，模型在一次请求中能够读取和参考的全部文字与工具信息。
- **context pointer**：上下文指针，一段告诉智能体详细资料存放在哪里、需要时可以怎样读取的简短说明或链接。
