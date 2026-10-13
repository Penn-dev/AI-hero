---
title: "用 Vercel AI SDK 流式提供下一步问题建议"
slug: "streaming-in-next-question-suggestions-with-the-ai-sdk"
type: "post"
description: "使用 AI SDK，把 AI 生成的下一步问题建议实时传给用户。"
updatedAt: "2025-08-24T12:17:16.084Z"
---

AI 应用很常见的一种做法，是给用户推荐接下来可以问什么。这能帮助不熟悉这类界面的人快速开始。

我们来看一个基础实现：发起对话后，根据用户的请求，流式给出下一步问题建议。

译注：流式传输让结果一部分一部分到达，不必等全部完成。本篇未实际运行，mainModel、suggestionsModel、完整路由、导入、前端 ChatInput 组件及项目环境没有在原文里给全。所有代码按固定来源保留。

## 整体过程

客户端向 `/api/chat` 发送 POST 请求，请求体包含界面消息。正式处理前，先把这些界面消息转换成模型消息。

整个过程将两条数据流合成一条父流：

1. 第一条流传回初始回复。
2. 第二条流传回后续问题建议。

用 `createUIMessageStream` 创建父流，它会提供一个 writer，用来把两条流组合起来：

```typescript
const stream = createUIMessageStream<MyMessage>({
  execute: async ({ writer }) => {
    // Stream initial response
    const messagesFromResponse = await streamInitialResponse(modelMessages, writer);

    // Generate follow-up suggestions
    const followupSuggestions = generateFollowupSuggestions([
      ...modelMessages,
      ...messagesFromResponse,
    ]);

    // Stream the suggestions to frontend
    await streamFollowupSuggestionsToFrontend(followupSuggestions, writer);
  },
});
```

译注：界面消息可能包含应用自定义的显示数据，模型消息则是发给模型的对话格式。Writer 是往父流写入内容的对象。

## 流式输出初始回复

初始回复这样处理：

```typescript
const streamInitialResponse = async (
  modelMessages: ModelMessage[],
  writer: UIMessageStreamWriter<MyMessage>,
) => {
  // 1. Stream the initial response - can be any
  // streamText call with tool calls, etc.
  const streamTextResult = streamText({
    model: mainModel,
    messages: modelMessages,
  });

  // 2. Merge the stream into the UIMessageStream
  writer.merge(streamTextResult.toUIMessageStream());

  // 3. Consume the stream - this waits until the
  // stream is complete
  await streamTextResult.consumeStream();

  // 4. Return the messages from the response, to
  // be used in the followup suggestions
  return (await streamTextResult.response).messages;
};
```

这个函数用 Gemini 2.0 Flash 调用 `streamText`，当然，也可以换成 AI SDK 支持的其他模型。通过 `writer.merge` 把结果合入界面消息流，再用 `streamTextResult.consumeStream()` 等待这条流结束。

最后，返回这次调用产生的消息，供下一个函数使用。

译注：Gemini 2.0 Flash 是原文描述的模型，代码中只出现 mainModel 变量，没有给出其定义，本次没有据此补写模型配置。

## 生成后续建议

取得初始回复后，把原始消息与回复消息一起传给 `generateFollowupSuggestions`：

```typescript
const generateFollowupSuggestions = (
  modelMessages: ModelMessage[],
) =>
  // 1. Call streamObject, which allows us to stream
  // structured outputs to the frontend
  streamObject({
    model: suggestionsModel,
    // 2. Pass in the full message history
    messages: [
      ...modelMessages,
      // 3. And append a request for followup suggestions
      {
        role: 'user',
        content:
          'What question should I ask next? Return an array of suggested questions.',
      },
    ],
    // 4. These suggestions are made type-safe by
    // this Zod schema
    schema: z.object({
      suggestions: z.array(z.string()),
    }),
  });
```

中文 Prompt（译注）：

```text
我接下来应该问什么问题？返回一个建议问题的数组。
```

这个函数使用 `streamObject`，并用 Zod Schema 规定 suggestions 是字符串数组。这里也可以加入系统提示词或更多上下文处理，不过这个简单做法已经够用了。

## 把建议流式传给前端

后续建议会交给 `streamFollowupSuggestionsToFrontend`：

```typescript
const streamFollowupSuggestionsToFrontend = async (
  // 1. This receives the streamObject result from
  // generateFollowupSuggestions
  followupSuggestionsResult: ReturnType<
    typeof generateFollowupSuggestions
  >,
  writer: UIMessageStreamWriter<MyMessage>,
) => {
  // 2. Create a data part ID for the suggestions - this
  // ensures that only ONE data-suggestions part will
  // be visible in the frontend
  const dataPartId = crypto.randomUUID();

  // 3. Read the suggestions from the stream
  for await (const chunk of followupSuggestionsResult.partialObjectStream) {
    // 4. Write the suggestions to the UIMessageStream
    writer.write({
      id: dataPartId,
      type: 'data-suggestions',
      data:
        chunk.suggestions?.filter(
          // 5. Because of some AI SDK type weirdness,
          // we need to filter out undefined suggestions
          (suggestion) => suggestion !== undefined,
        ) ?? [],
    });
  }
};
```

建议作为消息中的一个自定义部分处理。我们用 `UIMessage` 定义消息类型，第一个参数传入 `never`，第二个参数指定 `suggestions: string[]`。

译注：代码给建议数据分配一个固定 ID，后续更新沿用它，前端就会更新同一个建议部分，而不是不断新增多个部分。它还会过滤流式中间数据里尚未生成的 undefined 值。

## 自定义消息部分的类型安全

声明自定义消息类型，让代码接受类型检查：

```typescript
export type MyMessage = UIMessage<
  never,
  {
    suggestions: string[];
  }
>;
```

这样，写入流时，`data-suggestions` 部分就只允许接收字符串数组。

## 前端实现

前端使用 `useChat` 钩子，并传入我们的自定义消息类型：

```tsx
const { messages, sendMessage } = useChat<MyMessage>({});

const [input, setInput] = useState(``);

const latestSuggestions = messages[
  messages.length - 1
]?.parts.find(
  (part) => part.type === 'data-suggestions',
)?.data;
```

从最近一条消息的 parts 中取出最新建议。如果还没有消息，或建议尚未开始传输，这个值可能是 undefined。

然后，把建议渲染成按钮：

```tsx
<ChatInput
  suggestions={
    messages.length === 0
      ? [
          'What is the capital of France?',
          'What is the capital of Germany?',
        ]
      : latestSuggestions
  }
  input={input}
  onChange={(text) => setInput(text)}
  onSubmit={(e) => {
    e.preventDefault();
    sendMessage({
      text: input,
    });
    setInput('');
  }}
/>
```

第一个默认问题的中文 Prompt（译注）：

```text
法国的首都是哪里？
```

第二个默认问题的中文 Prompt（译注）：

```text
德国的首都是哪里？
```

没有消息时，我们还会提供默认建议。用户点击建议按钮，就会把对应问题填进输入框。

译注：这段原例只展示 ChatInput 的调用，没有给出按钮点击逻辑或组件定义，因此本次不能据此宣称已经实现并验证了可用界面。

## 总结

这种方式让建议和其他内容共用一个 API 入口流式返回，给用户连贯的体验。建议生成后实时更新，帮助用户更容易继续对话。

关键部分包括：

- 将初始回复和建议合在一条流中。
- 用类型安全的消息部分传递结构化数据。
- 实时把建议传给前端。

这样，AI 对话就更有引导性，也更容易使用。
