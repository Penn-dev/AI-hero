---
title: "用 Vercel AI SDK 管理消息历史"
slug: "vercel-ai-sdk-messages-array"
type: "post"
description: "通过 CoreMessage 数组管理聊天历史，学习 Vercel AI SDK 的 TypeScript 客户端与服务器示例。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-05T20:20:34.559Z"
---

构建聊天机器人时，通常需要保存对话历史。

这样，LLM 才能了解你们之前说过什么。

你也就可以继续追问，不必每次重新完整描述问题。

此外，理解对话怎样保存，对于通过网络与 LLM 通信也很重要。

这个例子会展示怎样用 Vercel AI SDK 完成它。

译注：本篇保留原代码与历史接口，没有启动服务器或调用模型。它是逐步讲解的代码片段，依赖、model 和完整项目未给全；下文还有原例中需要注意的缺项。

## `CoreMessage` 类型

先看看一段对话历史可能是什么结构。

AI SDK 提供了 `CoreMessage` 类型，用一个对象表示对话中的一条消息。

理解这个类型，就能理解对话历史，我保证。

<Scrollycoding>

# !!steps

先试着写一写，看看它包含什么。创建一个 messages 数组，并把类型设为 CoreMessage 数组。

```ts ! example.ts
import { type CoreMessage } from "ai";

const messages: CoreMessage[] = [];
```

# !!steps

每条消息都必须有 role 属性，它是一个字符串，可以是 user、system、assistant 或 tool。

```ts ! example.ts
import { type CoreMessage } from "ai";

const messages: CoreMessage[] = [
  {
    role: "user", // user | system | assistant | tool
  },
];
```

# !!steps

还必须有 `content` 属性，用来放消息内容。

这个例子的历史里只有一条用户消息：“Hello, you!”

```ts ! example.ts
import { type CoreMessage } from "ai";

const messages: CoreMessage[] = [
  {
    role: "user",
    content: "Hello, you!",
  },
];
```

中文 Prompt（译注）：

```text
你好呀！
```

# !!steps

用“assistant”角色表示 LLM 的回复：

```ts ! example.ts
import { type CoreMessage } from "ai";

const messages: CoreMessage[] = [
  {
    role: "user",
    content: "Hello, you!",
  },
  {
    role: "assistant",
    content: "Hi there!",
  },
];
```

中文理解（学习辅助）：

```text
用户：你好呀！
助手：你好！
```

# !!steps

前面简单介绍过系统提示词，它在消息历史中用 `system` 角色表示。

这里，我们要求 LLM 向每个与它说话的人打招呼。

```ts ! example.ts
import { type CoreMessage } from "ai";

const messages: CoreMessage[] = [
  {
    role: "system",
    content: "You are a friendly greeter.",
  },
  {
    role: "user",
    content: "Hello, you!",
  },
  {
    role: "assistant",
    content: "Hi there!",
  },
];
```

中文版消息（中文 Prompt，译注）：

```text
系统：你是一个友善的问候者。
用户：你好呀！
助手：你好！
```

</Scrollycoding>

工具角色会在讲工具调用时再介绍。

对话越来越长，这个数组也会不断加入新的 `user` 和 `assistant` 消息。

现在理解消息数组了，我们来做一个接近真实场景的例子。

## 建立服务器

这次，我们第一次要启动一个服务器。

<Scrollycoding>

# !!steps

把它放进 `startServer` 函数：

```ts ! example.ts
export const startServer = async () => {};
```

# !!steps

使用 Hono 软件包创建服务器：

```ts ! example.ts
import { Hono } from "hono";

export const startServer = async () => {
  const app = new Hono();
};
```

# !!steps

给服务器添加一条路由：

```ts ! example.ts
import { Hono } from "hono";

export const startServer = async () => {
  const app = new Hono();

  app.post("/api/get-completions", (ctx) => {
    // We'll implement this later!
  });
};
```

# !!steps

然后使用 `serve` 启动它，该函数来自 `@hono/node-server`：

```ts ! example.ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";

export const startServer = async () => {
  const app = new Hono();

  app.post("/api/get-completions", (ctx) => {
    // We'll implement this later!
  });

  const server = serve({
    fetch: app.fetch,
    port: 4317,
    hostname: "0.0.0.0",
  });
};
```

# !!steps

最后，用 `node:events` 等待服务器启动，再返回 `server`：

```ts ! example.ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { once } from "node:events";

export const startServer = async () => {
  const app = new Hono();

  app.post("/api/get-completions", (ctx) => {
    // We'll implement this later!
  });

  const server = serve({
    fetch: app.fetch,
    port: 4317,
    hostname: "0.0.0.0",
  });

  // Wait for the "listening" event to fire
  await once(server, "listening");

  return server;
};
```

</Scrollycoding>

这样就有了一个方便调用的函数，可以在 `localhost:4317` 启动服务。

译注：路由规定某个请求地址应交给什么代码处理。原例实际监听地址为 0.0.0.0，可能允许其他网络接口上的连接，并不只限定本机回环；本次没有运行或改变任何网络设置。

接下来，实现 API 调用：

<Scrollycoding>

# !!steps

`/api/get-completions` 路由会接收一个 `CoreMessage` 对象数组。

```ts ! example.ts
import { type CoreMessage } from "ai";

app.post("/api/get-completions", (ctx) => {
  const messages: CoreMessage[] = await ctx.req.json();
});
```

# !!steps

将整段对话历史传给 `generateText`。

```ts ! example.ts
import { type CoreMessage, generateText } from "ai";

app.post("/api/get-completions", (ctx) => {
  const messages: CoreMessage[] = await ctx.req.json();

  const result = await generateText({
    model,
    messages,
  });
});
```

# !!steps

LLM 根据历史判断接下来应该说什么。

生成的消息会放进 `result.response.messages`。

用 `ctx.json` 把它们作为 JSON 返回即可。

```ts ! example.ts
import { type CoreMessage, generateText } from "ai";

app.post("/api/get-completions", (ctx) => {
  const messages: CoreMessage[] = await ctx.req.json();

  const result = await generateText({
    model,
    messages,
  });

  return ctx.json(result.response.messages);
});
```

</Scrollycoding>

译注：这三段原路由回调中使用了 await，但函数没有写 async，直接照抄可能产生语法错误。这里保留原例并指出问题，没有静默更改代码，也没有声称它们已经通过构建。

总结一下，我们构建了一个 API 入口，接收对话历史，再返回 LLM 的下一条消息。

这是一种很常见的做法，服务器本身完全不保存对话状态。

跟踪对话的责任在客户端。

也有其他方式，比如把对话保存在服务器上，但这是一个简单的起点。

## 调用服务器

现在服务器有了，可以从客户端调用。我这里在 Node 中运行，不过客户端也很容易放到浏览器中。

<Scrollycoding>

# !!steps

创建一个新消息数组，并启动服务器：

```ts ! example.ts
import { type CoreMessage } from "ai";
import { startServer } from "./server.ts";

const messagesToSend: CoreMessage[] = [
  {
    role: "user",
    content: "What's the capital of Wales?",
  },
];

await startServer();
```

中文 Prompt（译注）：

```text
威尔士的首都是哪里？
```

# !!steps

使用 `fetch` 把消息发给服务器，再用 `res.json()` 将回复转成 JavaScript 对象。

```ts ! example.ts
import { type CoreMessage } from "ai";

const messagesToSend: CoreMessage[] = [
  // ...
];

const response = await fetch(
  "http://localhost:4317/api/get-completions",
  {
    method: "POST",
    body: JSON.stringify(messagesToSend),
    headers: {
      "Content-Type": "application/json",
    },
  },
);

const newMessages =
  (await response.json()) as CoreMessage[];
```

# !!steps

最后，把新消息追加到对话历史，并打印出来。

```ts ! example.ts
import { type CoreMessage } from "ai";

const messagesToSend: CoreMessage[] = [
  // ...
];

const response = await fetch(
  "http://localhost:4317/api/get-completions",
  // ...
);

const newMessages =
  (await response.json()) as CoreMessage[];

const allMessages = [
  ...messagesToSend,
  ...newMessages,
];

console.dir(allMessages, { depth: null });
```

</Scrollycoding>

最终输出类似这样：

```bash
[
  {
    "role": "user",
    "content": "What's the capital of Wales?"
  },
  {
    "role": "assistant",
    "content": [
      {
        "type": "text",
        "text": "The capital of Wales is Cardiff."
      }
    ]
  }
]
```

中文理解（学习辅助）：

```text
用户：威尔士的首都是哪里？
助手：威尔士的首都是加的夫。
```

接下来，数组可以再加入一条角色为 `user` 的消息，重复这个过程。

译注：原文说明使用 res.json()，代码里的变量实际叫 response，执行的是 response.json()；两者按原文各自保留。输出记录是原作者的例子，不是本次请求所得。

## 总结

这个例子展示了怎样通过 Vercel AI SDK 跟踪对话历史。

我们了解了消息数组和各种角色。

我们看到了怎样搭建一个接收对话历史并追加新消息的服务器。

译注：这句沿用作者的总结措辞；具体代码中，服务器返回新消息，真正合并历史数组的操作发生在客户端。

也看到了怎样从客户端调用它。
