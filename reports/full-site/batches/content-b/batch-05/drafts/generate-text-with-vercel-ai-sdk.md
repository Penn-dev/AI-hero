---
title: "用 Vercel AI SDK 生成文本"
slug: "generate-text-with-vercel-ai-sdk"
type: "post"
description: "学习使用 Vercel AI SDK 和 Anthropic 的 Claude 模型，在 TypeScript 中生成文本回复。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-03T13:33:50.114Z"
---

我们来看 AI SDK 支持的最简单用法：生成文本。

译注：本篇按固定原文保留历史模型标识与接口，未安装依赖或调用模型。实际运行还需要可用的模型访问配置和项目环境；各步代码是逐步补齐的示例，不是每一步都能单独运行。

<Scrollycoding>

# !!steps

取出 `generateText` 函数，它从 `ai` 导入，传入提示词和模型，就会得到一个包含文本的对象。

```ts ! example.ts
import { generateText } from "ai";

export const answerMyQuestion = async (
  prompt: string,
) => {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
};
```

# !!steps

这里使用 Anthropic 的 `claude-3.5-haiku`，通过 Vercel 的 `@ai-sdk/anthropic` 获取。

```ts ! example.ts
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const model = anthropic("claude-3-5-haiku-latest");

export const answerMyQuestion = async (
  prompt: string,
) => {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
};
```

# !!steps

如果愿意，也可以指定其他模型，比如改用 `claude-3.5-sonnet`。

```ts ! example.ts
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const model = anthropic("claude-3-5-sonnet-latest");

export const answerMyQuestion = async (
  prompt: string,
) => {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
};
```

# !!steps

接着，调用刚刚创建的 `answerMyQuestion` 函数。

假设问它：“what is the chemical formula for dihydrogen monoxide?”

运行这段代码时，它会把问题发给 Anthropic，再取得答案。

```ts ! example.ts
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const model = anthropic("claude-3-5-sonnet-latest");

export const answerMyQuestion = async (
  prompt: string,
) => {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
};

const answer = await answerMyQuestion(
  "what is the chemical formula for dihydrogen monoxide?",
);

console.log(answer);
```

中文 Prompt（译注）：

```text
一氧化二氢的化学式是什么？
```

</Scrollycoding>

译注：一氧化二氢是水的化学名称。这里保留原问题及完整中文版，没有补造这次调用实际返回的答案。原文正文中的模型简称与代码中的完整标识按原样保留。

返回的对象中还有许多其他内容，我们会在别的例子中介绍。

```ts
// Lots of other properties on
// this returned object!
const { text } = await generateText({
  model,
  prompt,
});

return text;
```
