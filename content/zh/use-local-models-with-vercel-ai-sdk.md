---
title: "用 Vercel AI SDK 连接本地模型"
slug: "use-local-models-with-vercel-ai-sdk"
type: "post"
description: "通过兼容 OpenAI 的 API，把 Vercel AI SDK 连接到本地或远程模型，以 localhost 上的 LM Studio 为例。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-05T20:21:34.790Z"
---

你可以用 Vercel AI SDK 连接本地运行的模型。实际上，不只是本地模型，只要模型运行在可访问的 URL 上，也可以连接。

译注：下文要求目标服务提供兼容 OpenAI 的接口。这里保留原文用法，本次没有安装 LM Studio、下载模型或启动本地服务；历史接口和默认重试次数也未重新验证。

<Scrollycoding>

# !!steps

AI SDK 有个叫 `createOpenAICompatible` 的函数，可以与提供 OpenAI 兼容 API 的模型通信。

```ts ! example.ts
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
```

# !!steps

这里我使用 LM Studio，它在 `localhost:1234` 提供这个 API。

所以，可以安装 `ai-sdk/openai-compatible`，然后创建一个 LM Studio 提供商对象。

```ts ! example.ts
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: `http://localhost:1234/v1`,
});
```

译注：正文中的包名没有 @，而原导入代码使用 @ai-sdk/openai-compatible，两者不一致。这里保留并指出差异，没有把未给出的安装流程写成已验证步骤。localhost 指执行程序的这台计算机。

# !!steps

然后，通过这个提供商对象取得模型。

这里传入空字符串，因为空字符串会默认选择你已在 LM Studio 中加载的模型。

```ts ! example.ts
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: `http://localhost:1234/v1`,
});

const model = lmstudio("");
```

# !!steps

把这个模型传给 `generateText`，就能使用它。

这里把 `maxRetries` 设为零。默认情况下，SDK 会重试查询三次，提高稳健性并应对网络问题。

但模型就在本地网络中，如果连接不上，我们希望它立即失败。

```ts ! example.ts
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: `http://localhost:1234/v1`,
});

const model = lmstudio("");

export const askLocalLLMQuestion = async (
  input: string,
) => {
  const { text } = await generateText({
    model,
    prompt: input,
    maxRetries: 0,
  });

  return text;
};
```

译注：重试是请求失败后再次尝试。原例未导入 generateText，也没有给出 LM Studio 版本或模型准备步骤，不能把这段内容视为独立可运行的完整项目。上面的默认次数是原文说法。

# !!steps

来试试看。我们让 LLM 讲一个关于它祖母的故事：

```ts ! example.ts
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: `http://localhost:1234/v1`,
});

const model = lmstudio("");

export const askLocalLLMQuestion = async (
  input: string,
) => {
  const { text } = await generateText({
    model,
    prompt: input,
    maxRetries: 0,
  });

  return text;
};

const input = `Tell me a story about your grandmother.`;

const localLLMResult =
  await askLocalLLMQuestion(input);

console.log(localLLMResult);
```

中文 Prompt（译注）：

```text
讲一个关于你祖母的故事。
```

运行后，就会得到一个关于 LLM 祖母的故事。

译注：这是原作者的故事生成示例，不代表模型有真实家人，也不是本次运行结果。

</Scrollycoding>

这样，就能通过一套简单配置，把 Vercel AI SDK 连接到本地模型。
