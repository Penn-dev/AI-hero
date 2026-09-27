---
title: "通过 Output 生成对象"
slug: "generating-objects-via-output~dkm2k"
type: "workshop-lesson"
description: "使用 AI SDK 生成结构化输出：借助 Zod schema（数据结构规则）生成符合类型要求的对象、验证 LLM 的回答，并可靠地提取数据。"
updatedAt: "2025-09-09T14:47:27.928Z"
---

# 通过 Output 生成对象

大多数时候，你希望大语言模型（LLM）返回的不只是一段文字，还要让这些文字按照明确的结构排列。比如，可以先让模型编一个发生在虚构星球上的故事，再从故事中提取事实，整理成清晰的字符串数组。

[AI SDK](https://ai-sdk.dev/docs/introduction) 让这件事变得非常简单。你不必先让模型生成文字，然后自己解析内容（或者使用 [Zod](https://zod.dev) 之类的库验证结果），而是可以直接使用框架内置的结构化输出功能。

在 AI SDK 中，这件事其实有两种实现方式：一种更符合第 5 版的用法，另一种更符合第 6 版的用法，但两种都可以在第 6 版中运行。本练习需要你实现结构化输出。

## [需要完成的步骤](#steps-to-complete)

- 使用 [`streamText()`](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text) 将文字流式输出到终端

第一步，让模型写出一个虚构星球故事的第一段，并在生成过程中将文字逐步显示在终端中。

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

中文理解版（学习辅助）：这段英文提示词要求模型“写出一个虚构星球故事的第一段”。故事不会等到全部生成完才一次性显示，而是生成一小段就显示一小段；最后，程序还会保存完整的故事文本，供下一步使用。

- 调用支持结构化输出的 [`generateText()`](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-text)

第二步，等故事文字全部输出完后，调用 `generateText()`，通过提示词让模型列出这颗星球的事实，并把上一步保存的 `finalText` 作为故事内容传入。

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

中文理解版（学习辅助）：把占位内容 TODO 替换为一次函数调用。调用时需要传入与上一步相同的模型、要求模型总结虚构星球事实的提示词，以及上一步得到的完整故事。还要通过指定的数据结构规则，要求结果中包含一组事实，并让这些事实采用科学家的写作口吻。

你还需要从 AI SDK 导入 [`Output`](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data)，并与 `generateText` 配合使用。

- 使用 [`Output.object()`](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) 方法定义结构化输出

第三步，向这个方法传入一个带有 `schema` 属性的对象。这里的 schema 是一份“结果格式说明”：它应当是一个 [Zod](https://zod.dev) 对象，并规定 `facts` 字段必须是字符串数组，也就是由多段文字组成的一组数据。

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

中文理解版（学习辅助）：这里的英文描述是在告诉模型：“写出这个虚构星球的事实，行文要像科学家一样。”生成的多条事实会放在 facts 数组中。

记得在字段上使用 [`.describe()`](https://zod.dev/metadata)，用文字说明字段应当包含什么，从而引导模型生成更符合要求的结果。

- 输出结构化结果

第四步，从结果对象中取得结构化输出，并将它显示在终端中。

```typescript
console.log(factsResult.output);
```

- 运行你的解决方案

最后，使用 `pnpm run dev` 运行代码，并确认：

1. 虚构星球的故事会在生成过程中逐步显示在终端中。
2. 返回的事实是一个结构化对象，其中包含一个字符串数组。
3. 这些事实采用了科学家的写作口吻。

- （可选）尝试另一种做法

完成练习后，可以再试着用 [`generateObject()`](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object) 实现第 6 版方案，而不使用 `generateText()` 与 `Output.object()` 的组合。两种方式都能使用，不过其中一种是较新的模式。

### 视频文字稿

## 中文学习辅助：术语小词典

- LLM：Large Language Model（大语言模型）的简称，指能够理解和生成文字的 AI 模型。
- structured output：结构化输出，指让模型按照预先规定的格式返回信息，而不是只返回一段自由文本。
- stream：流式输出，指内容生成一点就显示一点，不必等到全部生成完成。
- terminal：终端，用来输入命令和查看程序输出的文字窗口。
- object：对象，一种按字段组织数据的形式；这里的结果对象中会有专门存放事实的字段。
- array：数组，一种把多项数据按顺序放在一起的形式。
- string：字符串，程序中用来表示文字的数据类型。
- schema：数据结构规则，用来规定结果中应当有哪些字段，以及每个字段的数据形式。
- Zod：JavaScript 和 TypeScript 常用的数据验证库，可以用来描述并检查数据是否符合规则。
