---
title: "用 Vercel AI SDK 添加系统提示词"
slug: "system-prompts-with-vercel-ai-sdk"
type: "post"
description: "学习通过 Vercel AI SDK 的系统提示词定制 LLM 行为。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-05T20:16:29.413Z"
---

有时，你希望 AI 无论收到什么提示词，都按某种方式行动。

在这个例子里，我们想让 AI 总结收到的文本。

我们要给它一个角色，也要给它一些指令。

而且，这些内容都要在用户提示词到达之前交给它。

译注：系统提示词用于规定模型的基本任务和行为。下面保留原文接口与完整英文指令，另附可复制的中文版。本次没有调用模型；model、input、依赖版本和访问配置需要由实际项目提供。

<Scrollycoding>

# !!steps

可以用系统提示词完成这件事。

在 Vercel AI SDK 中，只要传入一个 `system` 属性即可。

```ts ! example.ts
const { text } = await generateText({
  model,
  prompt: input,
  system:
    `You are a text summarizer. ` +
    `Summarize the text you receive. ` +
    `Be concise. ` +
    `Return only the summary. ` +
    `Do not use the phrase "here is a summary". ` +
    `Highlight relevant phrases in bold. ` +
    `The summary should be two sentences long. `,
});
```

中文 Prompt（译注）：

```text
你是一个文本摘要工具。
总结你收到的文本。
保持简洁。
只返回摘要。
不要使用“here is a summary”（“下面是摘要”）这句话。
把相关的重要短语加粗。
摘要应当只有两句话。
```

# !!steps

在内部，它会在消息列表前面添加一条特殊消息，角色是“system”，内容就是我们的系统提示词。

如果愿意，也可以自己这样写。给 AI SDK 传入 `messages` 属性，其中放一个消息数组即可。

```ts ! example.ts
const { text } = await generateText({
  model,
  messages: [
    {
      role: "system",
      content:
        `You are a text summarizer. ` +
        `Summarize the text you receive. ` +
        `Be concise. ` +
        `Return only the summary. ` +
        `Do not use the phrase "here is a summary". ` +
        `Highlight relevant phrases in bold. ` +
        `The summary should be two sentences long. `,
    },
    {
      role: "user",
      content: input,
    },
  ],
});
```

中文 Prompt（译注）：

```text
你是一个文本摘要工具。
总结你收到的文本。
保持简洁。
只返回摘要。
不要使用“here is a summary”（“下面是摘要”）这句话。
把相关的重要短语加粗。
摘要应当只有两句话。
```

`generateText`、`streamText`，以及其他与 LLM 和生成式 AI 通信的 API，都可以使用这种方式。

</Scrollycoding>

译注：两个例子使用相同指令，只是传递方式不同。消息数组就是按顺序排列的消息列表，其中 system 表示系统角色，user 表示用户角色。中文块是完整提示词文本，不是替换整段程序的代码。

系统提示词是使用 LLM 的关键部分之一，AI SDK 把它做得这么简单，确实很方便。

下一篇，我们会看看需要的时候，怎样轻松切换模型。
