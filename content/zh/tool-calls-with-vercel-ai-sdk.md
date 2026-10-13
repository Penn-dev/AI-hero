---
title: "用 Vercel AI SDK 调用工具"
slug: "tool-calls-with-vercel-ai-sdk"
type: "post"
description: "从最简单的例子开始，学习用 Vercel AI SDK 在 TypeScript 中实现工具调用。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-07T11:40:24.873Z"
---

到目前为止，我们已经让 LLM 回答问题、查看文档和提取数据。

但它们能做的远不止这些，还能与外部世界交互。

方法就是调用我们提供的工具或函数。

Vercel AI SDK 对此提供了直接支持。

我们先创建一个能想到的最简单工具，再从这里继续。

译注：工具调用是模型请求应用执行某个函数。实际动作由应用代码完成，不是模型仅输出一句话就改变了计算机。本次未运行示例；model、依赖、调用入口和访问环境需要由实际项目提供，历史接口按固定原文保留。

<Scrollycoding>

# !!steps

这个工具只向控制台打印内容。先导入 `tool` 来创建它，它来自 `ai`。

```ts ! example.ts
import { tool } from "ai";

const logToConsoleTool = tool({});
```

# !!steps

每个工具首先都需要描述，它会接收什么参数。

在工具上指定 parameters 即可。

和前面的结构化输出一样，我们用 Zod Schema 来描述。

```ts ! example.ts
import { tool } from "ai";
import { z } from "zod";

const logToConsoleTool = tool({
  parameters: z.object({
    message: z.string(),
  }),
});
```

# !!steps

再用 `describe` 向 LLM 解释各个参数。

```ts ! example.ts
import { tool } from "ai";
import { z } from "zod";

const logToConsoleTool = tool({
  parameters: z.object({
    message: z
      .string()
      .describe("The message to log to the console"),
  }),
});
```

译注：参数 message 是文本，英文说明的意思是“要输出到控制台的消息”。

# !!steps

接着，说明工具具体要做什么。

为此，要提供一个 `execute` 函数。

这个 `execute` 函数可以是异步的，因此几乎可以做任何事情，比如调用 API、写数据库等。

我们这里只打印到控制台。

```ts ! example.ts
import { tool } from "ai";
import { z } from "zod";

const logToConsoleTool = tool({
  parameters: z.object({
    message: z
      .string()
      .describe("The message to log to the console"),
  }),
  execute: async ({ message }) => {
    console.log(message);
  },
});
```

# !!steps

然后，为工具本身添加 `description` 字段。

它告诉 LLM 应该拿这个工具做什么。

```ts ! example.ts
import { tool } from "ai";
import { z } from "zod";

const logToConsoleTool = tool({
  description: "Log a message to the console",
  parameters: z.object({
    message: z
      .string()
      .describe("The message to log to the console"),
  }),
  execute: async ({ message }) => {
    console.log(message);
  },
});
```

译注：工具的英文说明是“把一条消息输出到控制台”。这里只描述函数能力，是否允许执行某种外部操作，仍由应用自身的权限控制决定。

</Scrollycoding>

工具创建好了，接下来把它用在一次 `generateText` 调用中。

<Scrollycoding>

# !!steps

创建一个叫 `logToConsole` 的函数，在调用中传入模型和提示词。

```ts ! example.ts
import { generateText } from "ai";

const logToConsole = async (prompt: string) => {
  await generateText({
    model,
    prompt,
  });
};
```

# !!steps

给它一段系统提示词，鼓励它使用这个工具。

```ts ! example.ts
import { generateText } from "ai";

const logToConsole = async (prompt: string) => {
  await generateText({
    model,
    prompt,
    system:
      `Your only role in life is to log ` +
      `messages to the console. ` +
      `Use the tool provided to log the ` +
      `prompt to the console.`,
  });
};
```

中文 Prompt（译注）：

```text
你唯一的职责是把消息输出到控制台。
使用提供的工具，把提示词输出到控制台。
```

# !!steps

最后，把工具传进去。

```ts ! example.ts
import { generateText } from "ai";

const logToConsole = async (prompt: string) => {
  await generateText({
    model,
    prompt,
    system:
      `Your only role in life is to log ` +
      `messages to the console. ` +
      `Use the tool provided to log the ` +
      `prompt to the console.`,
    tools: {
      logToConsole: logToConsoleTool,
    },
  });
};
```

中文 Prompt（译注）：

```text
你唯一的职责是把消息输出到控制台。
使用提供的工具，把提示词输出到控制台。
```

</Scrollycoding>

回顾一下，我们创建了工具，把它交给 `generateText`，还配了一段简单的系统提示词。

看看运行时会发生什么。

```bash
Hello, world!
```

成功了！控制台上打印出了“hello world”。

中文理解：原输出 “Hello, world!” 是“你好，世界！”。这是原作者提供的示例结果，本次没有运行它。

## 调试

这不错，但过程不太透明。怎样进去调试呢？

<Scrollycoding>

# !!steps

解构出 `steps` 属性，它在 `generateText` 的返回结果中。

`steps` 是一个数组，包含 LLM 执行的每个步骤。

我们稍后还会讨论 `steps`，因为它涉及智能体行为和推理等有意思的内容。

```ts ! example.ts
import { generateText } from "ai";

const logToConsole = async (prompt: string) => {
  const { steps } = await generateText({
    model,
    prompt,
    system:
      `Your only role in life is to log ` +
      `messages to the console. ` +
      `Use the tool provided to log the ` +
      `prompt to the console.`,
    tools: {
      logToConsole: logToConsoleTool,
    },
  });
};
```

中文 Prompt（译注）：

```text
你唯一的职责是把消息输出到控制台。
使用提供的工具，把提示词输出到控制台。
```

# !!steps

现在，先从第一个步骤中取出 tool calls 属性。

它会告诉你，这一步调用了哪些工具。

```ts ! example.ts
import { generateText } from "ai";

const logToConsole = async (prompt: string) => {
  const { steps } = await generateText({
    model,
    prompt,
    system:
      `Your only role in life is to log ` +
      `messages to the console. ` +
      `Use the tool provided to log the ` +
      `prompt to the console.`,
    tools: {
      logToConsole: logToConsoleTool,
    },
  });

  console.dir(steps[0]?.toolCalls, { depth: null });
};
```

中文 Prompt（译注）：

```text
你唯一的职责是把消息输出到控制台。
使用提供的工具，把提示词输出到控制台。
```

</Scrollycoding>

运行后，可以看到名为 `logToConsole` 的工具被调用了。

也能看到传给它的参数。

```bash
[
  {
    type: 'tool-call',
    toolCallId: 'toolu_012hbsiE2sXvPrAwAvE3kgxM',
    toolName: 'logToConsole',
    args: { message: 'Hello, world!' }
  }
]
```

如果改为打印 `toolResults`……

```ts
console.dir(steps[0]?.toolResults, { depth: null });
```

……就能看到工具调用的结果。这里的函数没有返回任何内容，所以结果是 `undefined`。

```bash
[
  {
    toolCallId: 'toolu_012hbsiE2sXvPrAwAvE3kgxM',
    toolName: 'logToConsole',
    args: { message: 'Hello, world!' },
    result: undefined
  }
]
```

译注：toolCallId 是一次调用的编号，toolName 是工具名，args 是参数。两段原结果都保留了 “Hello, world!” 消息。undefined 表示没有返回值，并不表示工具没有执行。

这些 `toolResults` 可以再交给 LLM，让它获得更多信息，在多步骤运行时尤其有用。

因此，通过 `steps` 调试，就能更清楚地了解工具调用中发生了什么。
