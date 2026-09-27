---
title: "通过 Output 生成对象"
slug: "generating-objects-via-output~dkm2k"
type: "workshop-lesson"
description: "使用 AI SDK 生成结构化输出。借助 Zod schema 生成带类型的对象，验证 LLM 响应，并可靠地提取数据。"
updatedAt: "2025-09-09T14:47:27.928Z"
---

# 通过 Output 生成对象

大多数时候，你不只是想从 LLM 得到一段文字，而是希望文字以结构化的格式返回。比如，你可以先生成一个关于虚构星球的故事，再从中提取事实，整理成一个干净的字符串数组。

[AI SDK](https://ai-sdk.dev/docs/introduction) 让这件事变得非常简单。你不必要求模型先输出文字，再自行解析（或用 [Zod](https://zod.dev) 这类库验证），而是可以直接使用框架内置的结构化输出功能。

AI SDK 实际上提供了两种做法：一种更接近第 5 版的方式，另一种更接近第 6 版；不过它们都能在第 6 版中使用。本练习的任务是实现结构化输出的生成。

## [需要完成的步骤](#steps-to-complete)

- 使用 [`streamText()`](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text) 将文字流式输出到终端

先把一段关于虚构星球的故事，以流式方式输出到终端。

```typescript
const stream = streamText({
  model,
  prompt:
    'Give me the first paragraph of a story about an imaginary planet.',
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}

const finalText = await stream.text;
```

中文理解版（学习辅助）：这里的英文提示词是在让模型“给出一个关于虚构星球的故事的第一段”。程序会一小段一小段地把生成内容显示在终端，最后再把完整文字保存到 finalText。

- 调用带有结构化输出支持的 [`generateText()`](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-text)

文字流式输出结束后，调用 `generateText()`，并用提示词要求它列出这颗星球的事实。把上一步得到的 `finalText` 传入。

```typescript
// TODO: Replace this with a call to generateText, passing:
// - The model, same as above
// - The prompt, asking for facts about the imaginary planet,
//   passing in the finalText as the story
// - The output, which should be Output.object({}), passing
//   the schema: z.object({
//     facts: z.array(z.string()).describe('The facts about the imaginary planet. Write as if you are a scientist.'),
//   })
const factsResult = TODO;
```

中文理解版（学习辅助）：把 TODO 替换成对 generateText() 的调用。它需要使用前面的模型和故事文本，并要求模型列出虚构星球的事实；返回结果应通过 Output.object({}) 按指定的 schema 整理。代码注释中的英文说明要求这些事实“像科学家写的一样”。

你还需要从 AI SDK 导入 [`Output`](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data)，并和 `generateText` 一起使用。

- 使用 [`Output.object()`](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) 方法定义结构化输出

传入一个带有 `schema` 属性的对象。这个 schema 应该是一个 [Zod](https://zod.dev) 对象，其中的 `facts` 字段包含一个字符串数组。

```typescript
output: Output.object({
  schema: z.object({
    facts: z
      .array(z.string())
      .describe(
        'The facts about the imaginary planet. Write as if you are a scientist.',
      ),
  }),
});
```

中文理解版（学习辅助）：这里的英文描述是在告诉模型：“写出关于虚构星球的事实，并把自己当作科学家。”facts 的内容必须是一个由多条文字组成的数组。

记得在字段上使用 [`.describe()`](https://zod.dev/metadata)，帮助模型生成更符合要求的结果。

- 输出结构化结果

从结果对象中取得输出内容，并把它打印到终端。

```typescript
console.log(factsResult.output);
```

- 运行你的解决方案

用 `pnpm run dev` 执行代码，并确认：

1. 星球故事会流式输出到终端。
2. 返回的事实是一个结构化对象，里面包含字符串数组。
3. 这些事实读起来像是由科学家写的。

- （可选）尝试另一种做法

完成练习后，试着看看能否使用 [`generateObject()`](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object)，而不是先用 `generateText()` 再搭配 `Output.object()`，来实现第 6 版的方案。两种做法都能使用，但其中一种是更新的模式。

### 视频文字稿

## 中文学习辅助：术语小词典

- LLM：Large Language Model（大语言模型）的简称，指能理解和生成文字的 AI 模型。
- structured output：结构化输出，指让模型按预先规定的格式返回信息，而不只是随意的一段文字。
- stream：流式输出，指内容生成一点就显示一点，不必等全部内容生成完。
- terminal：终端，用来输入命令和查看程序输出的文字窗口。
- schema：数据结构规则，用来规定结果里应有哪些内容、每项内容是什么形式。
- Zod：JavaScript 和 TypeScript 常用的数据验证库，可用来描述并检查数据是否符合规则。
