---
title: "消息、系统提示词与推理 Token"
slug: "messages-system-prompts-and-reasoning-tokens"
type: "post"
description: "了解与 AI 对话时底层的消息结构，包括用户消息、系统提示词、推理 Token 和工具调用。"
tags:
  - learn-how-llms-think
updatedAt: "2025-09-30T13:26:05.479Z"
---

理解 LLM 的第一步，是理解与它们交流的规则，也就是组成对话的那些消息。

什么是用户消息？什么是系统提示词？什么是工具调用？什么是推理 Token？我们逐个来看。

## 用户消息与助手消息

与 LLM 进行简单对话时，结构可能像下图这样。你发出的消息叫用户消息，LLM 发出的消息叫助手消息。

![简单对话](https://res.cloudinary.com/total-typescript/image/upload/v1759237356/ai-hero-images/aovt6xmhs2av24q1zzzv.png)

这种情况下，我们只是在和模型提供商给出的基础模型对话。如果想定制 LLM 的行为，就可以使用系统提示词。

## 系统提示词

系统提示词位于对话历史的最前面。LLM 能看到它，用户通常看不到。

它的作用也很强。当用户要求与系统提示词冲突时，LLM 通常会遵循系统提示词。例如，我们可以要求它用摩尔斯电码回答。这样，即使用户叫它别再用摩尔斯电码，它仍然会用摩尔斯电码回复。

![系统提示词](https://res.cloudinary.com/total-typescript/image/upload/v1759237357/ai-hero-images/dcmloydcwhmhneyqybgs.png)

当然，这并非总能奏效，有许多绕过系统提示词限制的例子，但至少原理是这样。

译注：摩尔斯电码用点、划等信号表示字符。这里的例子说明不同角色的消息可能有不同优先级，不是让你实际修改当前助手的规则。

## 推理 Token

很多模型能够返回推理 Token，表现得像是在正式回复之前先思考输出内容。这些推理 Token 也是助手消息的一部分。

![推理 Token](https://res.cloudinary.com/total-typescript/image/upload/v1759237358/ai-hero-images/pr2deu4owgqdygndbkrx.png)

这里有个重要概念：一条消息可以包含多个部分。文件也能作为其中一部分。你可以给 LLM 发送文件；在图像生成等场景中，也可以收到它返回的文件。

![文件](https://res.cloudinary.com/total-typescript/image/upload/v1759237359/ai-hero-images/wgx9n1uobwgugln1xg0d.png)

例如，这里我们向 LLM 发送一个文件，要求 “summarize this PDF”，它就返回一份摘要。

中文 Prompt（译注）：

```text
总结这份 PDF。
```

译注：本段保留原文对消息结构的说明。可见推理文本、推理摘要和内部推理不是同一个概念，具体接口提供哪些内容要以相应服务为准；本次没有读取模型的内部推理过程。

## 工具

有了工具，你就可以告诉 LLM，它能够使用一个写文件工具。这个工具可以把文件写入我们的文件系统。

![工具](https://res.cloudinary.com/total-typescript/image/upload/v1759237360/ai-hero-images/at8gx2zr54m1ff1bbxyf.png)

接着，用户会说，write a `todo.md` file。助手随后生成一条工具调用消息，其中带有一个 `id`，以及一条指令：创建一个名为 `todo.md`、内容为空的文件。

中文 Prompt（译注）：

```text
创建一个 todo.md 文件。
```

现在，我们的应用取出这条工具调用并执行，再向 LLM 发回工具结果。这个结果使用与工具调用相同的 `id`，并说明执行时发生了什么，通常以字符串形式表示。

随后，助手返回结果摘要：“wrote a todo.md file successfully”。

中文理解：已成功写入一个 todo.md 文件。

译注：文件系统就是计算机组织和保存文件的方式。id 是用来配对请求与结果的编号；字符串就是文本。工具调用是模型提出的操作请求，实际执行由应用负责，这里的文件创建是原文示例，不是本次发生的操作。

所以，工具有点像 LLM 与我们的系统之间的一段对话：

1. 工具调用是 LLM 向我们提出请求。
2. 工具结果是我们把它需要的信息交还给它。

Claude Code 和 Cursor 这类 AI 应用，就是这样在你的系统上执行操作的。我们后面会更深入地介绍工具。
