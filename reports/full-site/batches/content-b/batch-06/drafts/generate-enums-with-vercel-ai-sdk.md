---
title: "用 Vercel AI SDK 生成枚举值"
slug: "generate-enums-with-vercel-ai-sdk"
type: "post"
description: "用枚举与 AI SDK 构建情感分类示例，将文本归为积极、消极或中性。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-08T08:30:33.859Z"
---

LLM 的另一个经典用途是分类。

假设我们把一条用户评论交给 LLM，让它判断是 `positive`、`negative` 还是 `neutral`。

我们希望最终只得到一个字符串，而且只能是 `positive`、`negative` 或 `neutral` 之一。

在传统软件术语中，这叫枚举，也就是预先列出的一组可选值。

我们可以用 AI SDK 生成这样的枚举结果。

译注：这三个英文值分别表示积极、消极、中性。代码中的输出标识必须保留英文，不能随意翻译成其他值。本次没有运行分类；模型配置、依赖版本和访问环境尚未验证。

<Scrollycoding>

# !!steps

我们再次使用 `generateObject`，不过这次把输出类型设为 `enum`。

```ts ! example.ts
import { generateObject } from "ai";

export const classifySentiment = async (
  text: string,
) => {
  await generateObject({
    model,
    output: "enum",
    prompt: text,
    system:
      `Classify the sentiment of the text as either ` +
      `positive, negative, or neutral.`,
  });
};
```

中文 Prompt（译注）：

```text
将文本的情感归类为 positive、negative 或 neutral 之一。
```

# !!steps

还要传入一个 `enum` 属性，数组中列出允许返回的字符串。

```ts ! example.ts
import { generateObject } from "ai";

export const classifySentiment = async (
  text: string,
) => {
  await generateObject({
    model,
    output: "enum",
    enum: ["positive", "negative", "neutral"],
    prompt: text,
    system:
      `Classify the sentiment of the text as either ` +
      `positive, negative, or neutral.`,
  });
};
```

中文 Prompt（译注）：

```text
将文本的情感归类为 positive、negative 或 neutral 之一。
```

# !!steps

`generateObject` 的结果中有一个 `object` 属性，它就是我们要的枚举值。

```ts ! example.ts
import { generateObject } from "ai";

export const classifySentiment = async (
  text: string,
) => {
  const { object } = await generateObject({
    model,
    output: "enum",
    enum: ["positive", "negative", "neutral"],
    prompt: text,
    system:
      `Classify the sentiment of the text as either ` +
      `positive, negative, or neutral.`,
  });

  return object;
};
```

中文 Prompt（译注）：

```text
将文本的情感归类为 positive、negative 或 neutral 之一。
```

</Scrollycoding>

用几句不同的话来试试：

<Scrollycoding>

# !!steps

`I'm not sure how I feel` 的结果是 `neutral`。

```ts ! example.ts
const result = await classifySentiment(
  `I'm not sure how I feel`,
);

console.log(result); // neutral
```

中文输入（中文 Prompt，译注）：

```text
我不太确定自己是什么感受。
```

中文理解：原示例返回中性。

# !!steps

`This is terrible` 的结果是 `negative`。

```ts ! example.ts
const result = await classifySentiment(
  `This is terrible`,
);

console.log(result); // negative
```

中文输入（中文 Prompt，译注）：

```text
这太糟糕了。
```

中文理解：原示例返回消极。

# !!steps

`I love this so much` 的结果是 `positive`。

```ts ! example.ts
const result = await classifySentiment(
  `I love this so much`,
);

console.log(result); // positive
```

中文输入（中文 Prompt，译注）：

```text
我太喜欢这个了。
```

中文理解：原示例返回积极。

</Scrollycoding>

这样，我们就有了一个情感分析系统。这是枚举值很有用的一种用途，AI SDK 让它变得如此简单，确实不错。

译注：这三个结果来自原作者示例，不是本次测试成绩，也不能说明所有输入都会被正确分类。
