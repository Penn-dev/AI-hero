---
title: "上下文窗口"
slug: "context-window"
type: "dictionary"
description: "模型在每次向模型提供商发请求时能看到的全部内容。它有长度上限、因模型而异，也是模型感知信息的唯一入口。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
[模型](/ai-coding-dictionary/model)在每次[向模型提供商发起请求](/ai-coding-dictionary/model-provider-request)时能看到的全部内容。它有长度上限，具体大小取决于模型，而且是模型感知任何信息的_唯一_入口。

它是一段连续的 [Token](/ai-coding-dictionary/token) 序列：包括[系统提示词](/ai-coding-dictionary/system-prompt)、到目前为止的对话，以及[执行框架](/ai-coding-dictionary/harness)反馈回来的每一项[工具结果](/ai-coding-dictionary/tool-result)。内容在这段序列里，模型就能使用；不在里面，模型就不知道它存在——无论是你的代码库、你昨天编辑的文件，还是你在三次会话前给出的指令。窗口外的内容必须先被带进来，通常要通过一次[工具调用](/ai-coding-dictionary/tool-call)，才能产生影响。

“有长度上限”意味着它会被填满。每一轮都会追加新内容：你的消息、模型的回复、工具结果；很长的[会话](/ai-coding-dictionary/session)最终会碰到上限，迫使系统进行[压缩](/ai-coding-dictionary/compaction)或[清空](/ai-coding-dictionary/clearing)。这也意味着窗口内的内容彼此竞争：你加载的每个 Token，都会少给其他内容留一个位置；即使某些内容并不需要，仍会占用模型的[注意力](/ai-coding-dictionary/attention-budget)。实际使用时，应把窗口看成一笔预算：加载任务所需的内容，其余内容先不放进来。

_避免使用：_“记忆”——上下文窗口只是当前工作的临时状态，不能跨会话保留。[记忆](/ai-coding-dictionary/memory-system)是叠加在它之上的另一套概念。

_用法：_

“我能把整个单体仓库直接粘到提示词里吗？”

“上下文窗口有 20 万 Token，大概只够放这个仓库的五分之一。挑出这项任务会碰到的文件，其余内容等需要时再通过工具调用读取。”

## 中文学习辅助：术语小词典

- **context window**：上下文窗口，模型当前一次能读到和参考的所有文字与工具信息的范围。
- **Token**：模型处理文本时使用的计量单位，不完全等同于一个汉字或一个英文单词。
- **tool call**：工具调用，模型请求执行框架去读取文件、运行命令等操作的结构化指令。
- **compaction**：压缩，把长对话浓缩成较短摘要，为后续任务腾出上下文空间。
