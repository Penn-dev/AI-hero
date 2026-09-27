---
title: "上下文窗口"
slug: "context-window"
type: "dictionary"
description: "模型每次处理请求时能看到的全部内容。容量有限、大小因模型而异，也是模型获取信息的唯一入口。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
上下文窗口就是[模型](/ai-coding-dictionary/model)每次处理一项[模型提供商请求](/ai-coding-dictionary/model-provider-request)时能看到的全部内容。它的容量有限，大小因模型而异，而且是模型获取任何信息的_唯一_入口。

上下文窗口是一段连续的 [Token](/ai-coding-dictionary/token) 序列，其中包括[系统提示词](/ai-coding-dictionary/system-prompt)、截至目前的对话，以及每一项[工具结果](/ai-coding-dictionary/tool-result)，也就是[执行框架](/ai-coding-dictionary/harness)送回模型的信息。某项内容在这段序列里，模型才能使用；不在里面，模型就不知道它存在。无论是你的代码库、昨天编辑的文件，还是三个会话前给出的指令，都是如此。窗口外的内容必须先被带进来，通常需要通过一次[工具调用](/ai-coding-dictionary/tool-call)，才能影响模型接下来的工作。

“容量有限”意味着窗口终究会被装满。每个工作轮次都会增加内容，包括你的消息、模型的回复和工具结果。很长的[会话](/ai-coding-dictionary/session)最终会触及上限，此时只能进行[压缩](/ai-coding-dictionary/compaction)或[清空](/ai-coding-dictionary/clearing)。窗口内的内容还会彼此争夺空间和注意力：每加载一个 Token，留给其他内容的空间就少一点；即使某些内容并非当前所需，也仍会占用模型的[注意力](/ai-coding-dictionary/attention-budget)。实际使用时，应该把上下文窗口看作一笔有限的预算：只加载任务需要的内容，其余内容留在窗口外，等需要时再读取。

_避免使用：_“记忆”——上下文窗口只是当前工作的临时状态，无法跨会话保留。[记忆](/ai-coding-dictionary/memory-system)是建立在它之上的另一套机制。

_用法：_

“我能把整个大型代码仓库直接粘贴进提示词吗？”

“上下文窗口有 20 万 Token，大概只能容纳这个仓库的五分之一。挑出任务会涉及的文件，其他文件等需要时再通过工具调用读取。”

## 中文学习辅助：术语小词典

- **context window**：上下文窗口，模型在一次请求中能够读取和参考的全部文字与工具信息。
- **Token**：模型读取和生成文本时使用的计量单位，并不严格等于一个汉字或一个英文单词。
- **tool call**：工具调用，模型请求执行框架读取文件、运行命令或完成其他操作的结构化指令。
- **compaction**：压缩，把较长的对话整理成较短的摘要，为后续工作腾出上下文空间。
