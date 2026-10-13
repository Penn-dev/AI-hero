---
title: "用 Vercel AI SDK 灵活切换 AI 模型"
slug: "swap-ai-models-with-vercel-ai-sdk"
type: "post"
description: "学习通过 Vercel AI SDK 切换模型，让应用代码与具体模型解耦。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-05T20:19:28.607Z"
---

我想展示一下，Vercel AI SDK 在模型选择上究竟有多灵活。

译注：本篇模型标识和接口来自固定原文，未确认这些历史模型当前可用，也未实际调用。运行还需要安装相应提供商软件包并配置可用的访问方式。

<Scrollycoding>

# !!steps

这里有一个 `ask` 函数，接收提示词，以及一个类型为 `LanguageModel` 的模型。

调用它时，可以传入 AI SDK 提供的任何模型。

```ts ! example.ts
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

# !!steps

例如，可以传入 Anthropic 的模型：

```ts ! example.ts
import { anthropic } from "@ai-sdk/anthropic";
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

const prompt = `Tell me a story about your grandmother.`;

const anthropicResult = await ask(
  prompt,
  anthropic("claude-3-5-haiku-latest"),
);

console.log(anthropicResult);
```

中文 Prompt（译注）：

```text
讲一个关于你祖母的故事。
```

# !!steps

也可以传入 OpenAI 的模型：

```ts ! example.ts
import { openai } from "@ai-sdk/openai";
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

const prompt = `Tell me a story about your grandmother.`;

const openaiResult = await ask(
  prompt,
  openai("gpt-4o-mini-2024-07-18"),
);

console.log(openaiResult);
```

中文 Prompt（译注）：

```text
讲一个关于你祖母的故事。
```

</Scrollycoding>

这让你在设计应用时有很大的灵活性。

`ask` 函数完全不依赖某个具体模型。

AI SDK 提供的 `LanguageModel` 类型，可以让你使用依赖注入。换句话说，你可以把任何模型从外部传入系统。

译注：依赖注入就是让调用方提供所需对象，而不是把它固定写死在函数里面。这里的两个故事请求只是同一条提示词的对比示例，不表示模型有真实的祖母或经历。

对我来说，这是 AI SDK 最重要的卖点之一。

下一篇，我们会介绍聊天历史，以及怎样在持续对话中保留历史消息。
