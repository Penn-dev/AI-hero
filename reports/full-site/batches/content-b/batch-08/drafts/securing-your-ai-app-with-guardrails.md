---
title: "用防护检查保护 AI 应用"
slug: "securing-your-ai-app-with-guardrails"
type: "post"
description: "用 TypeScript 和 AI SDK，通过快速模型回复检查 AI 应用收到的请求。"
tags:
  - build-ai-apps
updatedAt: "2025-09-11T11:24:45.165Z"
---

这里介绍一种检查 LLM 应用输入请求、确认它们是否安全的方法。我们使用 TypeScript 和 AI SDK。

译注：防护检查是应用在处理请求前加入的判断。本篇只取得了输出格式片段，没有完整的安全判断规则，也没有完整路由与运行环境；本次未运行或验证防护效果，不能把示例判断当作安全保证。

## 使用快速模型

最值得看的部分在 `checkIsRequestSafe` 函数里。思路是使用非常快的模型，这里选择 Gemini 2.0 Flash Lite。

```ts
const checkIsRequestSafe = async (
  modelMessages: ModelMessage[],
) => {
  const guardrailResult = await generateText({
    model: google('gemini-2.0-flash-lite'),
    system: GUARDRAIL_SYSTEM,
    messages: modelMessages,
  });

  // The text will either be '0' or '1'
  const text = guardrailResult.text.trim();

  // If text is exactly '1', the request is safe.

  if (text === '1') {
    return true;
  }

  return false;
};
```

我们把截至当前的整段对话历史传给它，并要求只返回一个 Token，以便尽快执行。这个要求写在防护检查的系统提示词中。

```ts
## Response Format

Respond with just the number:

1

or

0
```

中文 Prompt（译注）：

```text
## 回复格式

只回复这个数字：

1

或者

0
```

译注：原块虽然标记为 ts，里面实际是自然语言的回复格式要求，不是可执行 TypeScript。完整的 GUARDRAIL_SYSTEM 内容未提供，不能自行补造它如何判断安全。

因为只返回一个 Token，执行会非常快。这样，我们就能写明确的判断逻辑：文本恰好是 `1` 时，认定请求安全并返回 `true`。

## 其他做法

评论里很多人指出，不一定要用 `0` 或 `1`，也可以用一个单词。因为 LLM 底层实际生成的是 Token，也就是数字表示。

所以，生成 “safe” 和生成 “one” 所需时间一样。不过，我最后采用了上面的实现，它的效果相当不错。

译注：“safe” 是“安全”，“one” 是“一”。关于单个 Token 和相同耗时的说明按原文保留，本次没有对指定分词器或模型测速；不要把它当成所有词和模型都成立的性能保证。

## 把文本流式传给前端

接下来看看 `streamTextToWriter`。任何需要向前端流式发送一段文本的时候，它都很有用。

```ts
const streamTextToWriter = (
  writer: UIMessageStreamWriter,
  message: string,
) => {
  const id = crypto.randomUUID();
  writer.write({
    type: 'text-start',
    id,
  });

  writer.write({
    type: 'text-delta',
    id,
    delta: message,
  });

  writer.write({
    type: 'text-end',
    id,
  });
};
```

这里发送三个部分：`textStart`、`textDelta` 和 `textEnd`，都使用同一个 `id`。说实话，这有点啰嗦。我希望 AI SDK 能把它做得简单些，毕竟我们只是想把这段消息传到前端。

译注：三个部分依次表示文本开始、文本内容和文本结束。正文使用驼峰写法，原代码的 type 值则是 text-start、text-delta、text-end；这里各自按原样保留，不把正文名称当作可直接替换的标识符。

## 继续正常的流式回复

最后，使用 writer 和模型消息继续流式输出。

```ts
const continueStreaming = (
  writer: UIMessageStreamWriter,
  modelMessages: ModelMessage[],
) => {
  const streamTextResult = streamText({
    model: google('gemini-2.0-flash'),
    messages: modelMessages,
  });

  writer.merge(streamTextResult.toUIMessageStream());
};
```

这就是普通的 `streamText` 调用，再把结果合入 writer。

## 快速模型回复还能用在哪里？

让 LLM 极快地返回一个结果，再交给后续逻辑处理，这种方法还适合许多场景：

- 用作路由器，把某些请求交给更聪明的 LLM。
- 把简单请求交给速度极快、能力较弱的 LLM，这样可以大幅节省成本。

译注：路由器在这里负责选择后续处理路径。原文未给出当前费用或性能实测，本次也没有据此选择或购买模型服务。
