---
title: "记忆系统"
slug: "memory-system"
type: "dictionary"
description: "一种通过把信息保存到环境中、并在后续会话开始时重新加载，尝试让智能体跨会话保有状态的系统。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
一种尝试让[智能体](/ai-coding-dictionary/agent)跨[会话](/ai-coding-dictionary/session)保有[状态](/ai-coding-dictionary/stateful)的系统。它在一次会话中把信息保存到[环境](/ai-coding-dictionary/environment)，并在未来会话开始时重新加载到[上下文窗口](/ai-coding-dictionary/context-window)中。这样，即使用户[清空](/ai-coding-dictionary/clearing)了会话，智能体仍能延续此前的信息。

记忆系统有两部分。写入路径：会话进行时，智能体把学到的内容——例如你说过的偏好、项目中的某项事实——记录为环境中的文件。读取路径：会话开始时，[执行框架](/ai-coding-dictionary/harness)把这些文件，或这些文件的索引，重新加载到上下文窗口中。许多执行框架自带记忆系统——Claude Code 的 `/memory` 就是一个例子——你也可以自己搭建：建一个存放笔记的目录，再在 [AGENTS.md](/ai-coding-dictionary/agents-md) 中写明需要查阅它。

这和任何始终加载的内容一样，需要权衡取舍。记忆会不断累积，因此多数系统只加载一行索引，把正文放在[上下文指针](/ai-coding-dictionary/context-pointer)之后，而不是把所有内容都直接塞进窗口。记忆也是[二手来源](/ai-coding-dictionary/secondary-source)，所以会过时：3 月记录的一条事实，到 6 月加载时仍会以同样的可信程度出现，但项目可能早已变化。记忆系统需要定期清理，AGENTS.md 也是如此。

_用法：_

“我总得重新告诉它：我用的是 Postgres，不是 MySQL。”

“接入一个记忆系统：第一[对话轮次](/ai-coding-dictionary/turn)时把它学到的内容写到[文件系统](/ai-coding-dictionary/filesystem)，会话开始时再加载。[模型](/ai-coding-dictionary/model)本身是[无状态的](/ai-coding-dictionary/stateless)；记忆层只是模拟出了连续性。”

## 中文学习辅助：术语小词典

- **memory system**：记忆系统，把需要延续的信息保存到文件等环境中，以便下次会话再读取的机制。
- **context window**：上下文窗口，模型当前一次能读到和参考的所有文字与工具信息的范围。
- **stateful**：有状态，能够保留并继续使用先前信息的特性。
- **AGENTS.md**：常用于写明 AI 编码智能体在某个项目中应遵守的规则的文件。
