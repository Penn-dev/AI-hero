---
title: "用 Vercel AI SDK 流式输出文本"
slug: "streaming-text-with-vercel-ai-sdk"
type: "post"
description: "学习通过 Vercel AI SDK 逐步输出文本，大幅改善用户等待回复时的体验。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-05T20:15:55.465Z"
---

译注：流式输出是在内容还没有生成完时，就把已生成的部分陆续交给用户。本篇保留原代码，本次未运行；model、依赖与模型访问环境没有在本页给全。

<Scrollycoding>

# !!steps

在[前一个例子](/generate-text-with-vercel-ai-sdk)（[英文原文](https://www.aihero.dev/generate-text-with-vercel-ai-sdk)）中，我们看到了怎样用 AI SDK 生成文本。

但那种方式会等到最后才一次性输出全文。**如果想逐个 Token 地流式输出，该怎么办？**

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

可以使用 AI SDK 的 **`streamText` 函数**。

它同样接收模型和提示词，但返回的是 `textStream`，而不只是文本。

```ts ! example.ts
import { streamText } from "ai";

export const answerMyQuestion = async (
  prompt: string,
) => {
  const { textStream } = await streamText({
    model,
    prompt,
  });
  return textStream;
};
```

# !!steps

`textStream` 是一个异步可迭代对象，所以可以把它逐步写入文件，或通过网络连接发出去。

这个例子里，我们先把它写到 `stdout`。

下面的 `for` 循环会等待 `textStream` 的每个片段，再把它写到 `stdout`。

```ts ! example.ts
import { streamText } from "ai";

export const answerMyQuestion = async (
  prompt: string,
) => {
  const { textStream } = await streamText({
    model,
    prompt,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }

  return textStream;
};
```

译注：异步可迭代对象允许程序一边等待、一边逐个取得陆续到来的内容；stdout 是标准输出，通常显示在终端里。

# !!steps

假设我们问它：“what is the color of the sun?”

运行下面的代码，就会看到内容在控制台逐步出现。

接下来也不难想象，可以把它接到网络请求上，再流式传给用户界面。

```ts ! example.ts
import { streamText } from "ai";

export const answerMyQuestion = async (
  prompt: string,
) => {
  const { textStream } = await streamText({
    model,
    prompt,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }

  return textStream;
};

await answerMyQuestion(
  "What is the color of the sun?",
);
```

中文 Prompt（译注）：

```text
太阳是什么颜色的？
```

# !!steps

流式文本函数还会返回一个 **`text` Promise**。

如果你最终还是想等到整段文本生成完，只要 await 这个 Promise 即可。

```ts ! example.ts
import { streamText } from "ai";

export const answerMyQuestion = async (
  prompt: string,
) => {
  const { text } = await streamText({
    model,
    prompt,
  });

  const finalText = await text;

  return text;
};
```

译注：Promise 表示一个稍后才会得到的结果，await 用来等待它完成。上面保留了原代码中的 finalText 和 return text 写法；本次没有运行它，也没有补造流式输出截图或响应内容。

</Scrollycoding>
