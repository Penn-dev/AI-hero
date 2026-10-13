---
title: "用 Vercel AI SDK 构建第一个智能体"
slug: "agents-with-vercel-ai-sdk"
type: "post"
description: "学习用 Vercel AI SDK 让 LLM 根据工具调用结果继续行动，构建一个 AI 智能体。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-15T11:51:43.315Z"
---

前一个例子中，我们看到了 LLM 怎样通过工具在外部世界执行操作。

它们还能根据工具返回的信息作出反应。

这会形成一个很有用的反馈循环，让 LLM 不断根据现实世界的信息调整自己。

包括 Anthropic 在内的许多人，把这样的反馈循环称为智能体。

Vercel AI SDK 用“步骤”这个概念，让实现变得很简单。

我们要做一个智能体，查询指定城市的当前天气。

译注：下面是原作者的教学示例，实际天气工具固定返回 25°C 和晴天，没有连接真实天气 API。本次也没有运行代码。model、完整项目、访问配置以及历史 maxSteps 接口的当前兼容性尚未验证。

<Scrollycoding>

# !!steps

先创建一个 `getWeather` 工具。

从工具说明和参数开始。

```ts ! example.ts
import { tool } from "ai";
import { z } from "zod";

const getWeatherTool = tool({
  description:
    "Get the current weather in the specified city",
  parameters: z.object({
    city: z
      .string()
      .describe("The city to get the weather for"),
  }),
});
```

译注：工具说明是“获取指定城市的当前天气”，city 参数说明是“要查询天气的城市”。

# !!steps

接着，实现 `execute` 函数。

这里先用一个占位实现，直接说这个城市气温是 25 度。

如果需要，可以改为调用天气 API，取得真实天气。

```ts ! example.ts
import { tool } from "ai";
import { z } from "zod";

const getWeatherTool = tool({
  description:
    "Get the current weather in the specified city",
  parameters: z.object({
    city: z
      .string()
      .describe("The city to get the weather for"),
  }),
  execute: async ({ city }) => {
    return `The weather in ${city} is 25°C and sunny.`;
  },
});
```

</Scrollycoding>

然后，把工具接到一个叫 `askAQuestion` 的函数上。

<Scrollycoding>

# !!steps

调用 `streamText`，传入模型、提示词，以及 `getWeather` 工具。

```ts ! example.ts
import { streamText } from "ai";

const askAQuestion = async (prompt: string) => {
  await streamText({
    model,
    prompt,
    tools: {
      getWeather: getWeatherTool,
    },
  });
};
```

# !!steps

遍历文本流，把文字打印到 `stdout`。

```ts ! example.ts
import { streamText } from "ai";

const askAQuestion = async (prompt: string) => {
  const { textStream } = await streamText({
    model,
    prompt,
    tools: {
      getWeather: getWeatherTool,
    },
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }
};
```

# !!steps

最后，问问伦敦的天气。

```ts ! example.ts
import { streamText } from "ai";

const askAQuestion = async (prompt: string) => {
  const { textStream } = await streamText({
    model,
    prompt,
    tools: {
      getWeather: getWeatherTool,
    },
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }
};

await askAQuestion(`What's the weather in London?`);
```

中文 Prompt（译注）：

```text
伦敦的天气怎么样？
```

</Scrollycoding>

运行时，我们会发现一个有意思的现象。

```bash
I'll help you check the current weather in London right away.
```

中文理解：我马上帮你查看伦敦当前的天气。

没有得到想要的信息，它只是说：“I'll help you.”

中文理解：我会帮你。

为什么会这样？

## 调试 `steps`

沿用上次的方法，看看 `steps` 属性，它由 `streamText` 返回。

```ts
import { streamText } from "ai";

const askAQuestion = async (prompt: string) => {
  const { steps } = await streamText({
    model,
    prompt,
    tools: {
      getWeather: getWeatherTool,
    },
  });

  console.dir(await steps, { depth: null });
};

await askAQuestion(`What's the weather in London?`);
```

中文 Prompt（译注）：

```text
伦敦的天气怎么样？
```

因为使用的是 `streamText`，所以需要 `await` `steps` 的结果。

[这里是原作者输出的完整记录](https://gist.github.com/mattpocock/c6146afc3e910538eccbbefd4ee5df0f)。

这大段 JSON 中，有几件事值得注意。

首先，它只有一个步骤，LLM 只执行了一步。

从 `toolCalls` 和 `toolResults` 可以看出，它调用了一个工具，也得到了结果。

```bash
toolCalls: [
  {
    type: 'tool-call',
    toolCallId: 'toolu_011n3T6TJnwZLyR4G8h1ZcMz',
    toolName: 'getWeather',
    args: { city: 'London' }
  }
],
toolResults: [
  {
    type: 'tool-result',
    toolCallId: 'toolu_011n3T6TJnwZLyR4G8h1ZcMz',
    toolName: 'getWeather',
    args: { city: 'London' },
    result: 'The weather in London is 25°C and sunny.'
  }
],
```

所以，`LLM` 用伦敦作为参数调用了 `getWeather`，得到了“伦敦 25°C，晴天”的结果。

但随后就停了。

看起来 `LLM` 做对了，它确实调用了工具，只是不知道为什么停止了。怎样让它执行不止一步？

## `maxSteps`

默认情况下，AI SDK 只允许 LLM 执行一步。

想让它多执行几步，可以把 `maxSteps` 传给 `streamText`。

```ts ! example.ts
import { streamText } from "ai";

const askAQuestion = async (prompt: string) => {
  const { textStream } = await streamText({
    model,
    prompt,
    tools: {
      getWeather: getWeatherTool,
    },
    maxSteps: 2,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }
};

await askAQuestion(`What's the weather in London?`);
```

中文 Prompt（译注）：

```text
伦敦的天气怎么样？
```

这样会让循环最多执行两步就停止。

运行后，会得到很有意思的输出：

```bash
I'll help you check the current weather in London right away.

It looks like London is experiencing a pleasant day with sunny conditions and a temperature of 25°C (which is about 77°F). It sounds like a great day to be outside and enjoy the nice weather!
```

中文理解（学习辅助）：

```text
我马上帮你查看伦敦当前的天气。

看起来伦敦今天阳光明媚，气温为 25°C，大约是 77°F，天气宜人。听起来很适合出门享受好天气！
```

现在，LLM 会根据工具提供的信息作出回应。

再次打印步骤，还能看到它[执行了两步](https://gist.github.com/mattpocock/5f1bfb6edabad7249fccbb9ee61fdae9)。

## 停止信号

如果设定超过两步，会怎样？试着把 `maxSteps` 提高到 10。

结果[几乎相同](https://gist.github.com/mattpocock/0095de3f5ff1ceed130db9e950ca35cd)。

LLM 在两步之后停了下来。

第二步的 `finishReason` 是 `stop`：

```bash
finishReason: 'stop'
```

这是因为，LLM 有一个内置机制，可以在完成任务后停止。

所以，这个循环有两种结束方式：模型自己停止，或者达到 `maxSteps` 上限。

把 `maxSteps` 设成 `Infinity` 不太好，因为模型有时就是不会自己停下来。

译注：stdout 是标准输出，通常显示在终端里。停止原因与步数上限是两个不同条件。原例的次数和天气结果都按原样保留，没有变成真实天气报告或本次运行记录。

## 总结

我们看到了怎样用 Vercel AI SDK 创建一个简单的智能体循环。

使用 `maxSteps`，就能让 LLM 执行多步，并根据自己的工具结果继续回应。

这样构建的系统能让 LLM 根据现实信息工作，变得更有用。
