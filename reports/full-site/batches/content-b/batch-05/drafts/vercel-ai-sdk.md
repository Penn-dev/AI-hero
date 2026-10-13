---
title: "用 Vercel AI SDK，让 AI 应用更容易跟上模型变化"
slug: "vercel-ai-sdk"
type: "post"
description: "用 Vercel AI SDK 构建 AI 功能，以统一代码连接 OpenAI、Anthropic 和其他 LLM 提供商，减少未来切换的负担。"
updatedAt: "2025-01-02T08:47:06.972Z"
---

AI 领域每周都在变，你的代码不应该也必须每周跟着变。

因此，用 TypeScript 构建 AI 功能时，[Vercel AI SDK](https://sdk.vercel.ai/docs/introduction) 是我**最先想到的工具之一**。它很好用，我计划把它作为 **AI Hero 的基础工具之一**。

译注：本篇保留固定原文里的模型名称、API 和提供商清单。这些是原文示例，不是本次核实的当前支持矩阵；所有代码均未执行。

## 被一家提供商绑住很难受

**每个 LLM 提供商都有自己的 API**，功能和细节略有不同。如果应用直接构建在其中一个 API 上，往往会依赖得太深，不容易切换。

这些 API 和 SDK 表面看起来相近，**切换起来却很麻烦**，常常需要大量包装代码来处理差异。

下面是处理不同提供商时常见的一种包装代码：

```ts
// This example is BAD - what code looks like without
// Vercel's AI SDK.

import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

// 1. Initialize both clients
const openai = new OpenAI({
  apiKey: "my_api_key",
});
const anthropic = new Anthropic({
  apiKey: "my_api_key",
});

// 2. Switch between them based on the client
const ask = async (
  question: string,
  client: "openai" | "anthropic",
) => {
  // If we're using OpenAI, use their SDK
  if (client === "openai") {
    return await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-4o",
    });
  } else {
    // If we're using Anthropic, use their SDK
    return await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: question }],
    });
  }
};
```

译注：包装代码是在已有接口外再加一层统一调用方式。这里的 my_api_key 是原文占位符，不是真实密钥；本次没有配置或传输凭据。

提供商越多，问题就越严重，尤其是每家还有自己的细节和特性时。新模型出现后，**切换模型会特别困难**，应用很快就可能陷入无法轻易离开某家提供商的局面。

文末附录还有一个更麻烦的例子：流式输出。

## 一个统一的 API

Vercel AI SDK 用**一个统一的 API** 包装主要 LLM 提供商，解决这个问题。同样的功能，用它写出来是这样：

```ts
import { generateText, type LanguageModel } from "ai";

export const ask = async (
  prompt: string,
  model: LanguageModel,
) => {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
};
```

现在，AI SDK 支持的任何模型，都可以传给 `ask`：

```ts
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";

const prompt = `Tell me a story about your grandmother.`;

const anthropicResult = await ask(
  prompt,
  anthropic("claude-3-5-haiku-latest"),
);

const openaiResult = await ask(
  prompt,
  openai("gpt-4o-mini-2024-07-18"),
);
```

中文 Prompt（译注）：

```text
讲一个关于你祖母的故事。
```

译注：上面是原示例 “Tell me a story about your grandmother.” 的完整中文版本。它是生成故事的示例请求，不代表模型真的有祖母或亲身经历。

这让**切换模型容易了很多**。整个应用都可以建立在 AI SDK 上，用一行代码就能换模型。

你也只需要**学习一次 API**，就能把它用到不同项目中。尤其是需要构建许多 AI 功能时，这会提高效率。

## 附录

### 支持的提供商

AI SDK 目前支持下面这些提供商，而且[还在不断增加](https://sdk.vercel.ai/providers/ai-sdk-providers)：

| 提供商 | 模型 |
| -------------------- | ------------------------------------------------------------------------------------------ |
| OpenAI               | `gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gpt-4`, `o1`, `o1-mini`, `o1-preview`             |
| Anthropic            | `claude-3-5-sonnet-20241022`, `claude-3-5-sonnet-20240620`, `claude-3-5-haiku-20241022`    |
| Mistral              | `pixtral-large-latest`, `mistral-large-latest`, `mistral-small-latest`, `pixtral-12b-2409` |
| Google Generative AI | `gemini-2.0-flash-exp`, `gemini-1.5-flash`, `gemini-1.5-pro`                               |
| Google Vertex        | `gemini-2.0-flash-exp`, `gemini-1.5-flash`, `gemini-1.5-pro`                               |
| xAI Grok             | `grok-2-1212`, `grok-2-vision-1212`, `grok-beta`, `grok-vision-beta`                       |
| Groq                 | `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`, `mixtral-8x7b-32768`, `gemma2-9b-it`    |

译注：上表的“目前”指原文时点。型号和日期标识完整保留，没有把旧模型静默换成新模型。

### 一个更麻烦的例子

再看一个提供商差异的例子：流式补全。OpenAI 的流式回复是这样处理的：

```ts
const stream = await openai.chat.completions.create({
  messages: [{ role: "user", content: prompt }],
  model: "gpt-4",
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    // Each chunk contains a delta of new content
    process.stdout.write(content);
  }
}
```

Anthropic 则是这样：

```ts
const stream = await anthropic.messages.create({
  messages: [{ role: "user", content: prompt }],
  model: "claude-3-sonnet",
  stream: true,
});

for await (const chunk of stream) {
  if (chunk.type === "content_block_delta") {
    // Anthropic uses a different structure with content blocks
    process.stdout.write(chunk.delta.text);
  }
}
```

而使用 Vercel AI SDK，只需要这样写：

```ts
const ask = async (
  prompt: string,
  model: LanguageModel,
) => {
  const { textStream } = await streamText({
    model,
    prompt,
  });

  // The textStream is the same for all providers!
  for await (const chunk of textStream) {
    process.stdout.write(chunk);
  }
};
```

很棒。

译注：流式输出会分多次返回内容；这些例子展示各家返回片段的结构不同，而 AI SDK 把读取方式统一起来。原附录片段不是完整项目，模型访问、依赖版本和运行准备没有在本次验证。

### 链接

- [OpenAI Node SDK](https://github.com/openai/openai-node)
- [Anthropic Node SDK](https://github.com/anthropics/anthropic-sdk-typescript)
- [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction)
