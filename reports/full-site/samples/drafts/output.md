---
title: "通过 Output 生成对象"
slug: "generating-objects-via-output~dkm2k"
type: "page"
updatedAt: "2025-09-09T14:47:27.928Z"
---

# 通过 Output 生成对象

[获取完整课程访问权限（原站）](https://www.aihero.dev/workshops/ai-sdk-v6-crash-course)

[解答入口（原站，未取得正文）](https://www.aihero.dev/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k/solution)

大多数时候，你希望大语言模型（LLM）返回的不只是一段文字，还要让这些文字按照明确的结构排列。比如，可以先生成一个发生在虚构星球上的故事，再从故事中提取事实，整理成清晰的字符串数组。

[AI SDK](https://ai-sdk.dev/docs/introduction) 让这件事变得非常简单。你不必先让模型生成文字，再自己解析内容（或者使用 [Zod](https://zod.dev) 之类的库验证结果），而是可以直接使用框架内置的结构化输出功能。

在 AI SDK 中，这件事其实有两种实现方式：一种更符合第 5 版的用法，另一种更符合第 6 版的用法，但两种都可以在第 6 版中运行。你的任务是实现结构化输出。

> **译注：本页取得了什么。** 2026-10-13 固定的公开来源包含以下练习说明、两个代码片段和课程、解答入口。没有取得课程视频、项目准备材料或解答正文，也没有取得视频文字稿内容。动手需要已有课程项目、可用的模型配置，以及运行项目命令的基础；本页没有提供安装、导入、模型初始化、依赖锁定版本或完整运行环境。以下片段不是可独立运行的程序，本次也未运行课程代码。

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

中文版 Prompt（译注）：

```text
请写出一个发生在虚构星球上的故事的第一段。
```

> **译注：这段代码做什么。** 故事生成一点，就在终端显示一点；结束后，程序把完整文字保存到 `finalText`，供下一步提取事实时使用。英文 Prompt 保留在原代码中，上面另附完整中文版。

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

中文理解（学习辅助，译注）：把 `TODO` 替换为一次 `generateText` 调用。传入与上一步相同的模型、要求提取虚构星球事实的提示词，并把 `finalText` 作为故事传入。`output` 使用 `Output.object({})`，其中的 `schema` 使用注释中给出的 Zod 对象规则：`facts` 是字符串数组。这里保留的是待你完成的练习，没有补写函数调用或答案。

中文版 Prompt（译注，对应 `.describe()` 中的完整英文指令）：

```text
关于这个虚构星球的事实。请用科学家的口吻写。
```

你还需要从 AI SDK 导入 [`Output`](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data)，并与 `generateText` 配合使用。

- 使用 [`Output.object()`](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) 方法定义结构化输出

第三步，向这个方法传入一个带有 `schema` 属性的对象。这里的 schema 是一份结果格式说明：它应当是一个 [Zod](https://zod.dev) 对象，并规定 `facts` 字段必须是字符串数组。

记得在字段上使用 [`.describe()`](https://zod.dev/metadata)，用文字说明字段应当包含什么，从而引导模型生成更符合要求的结果。

- 输出结构化结果

第四步，从结果对象中取得结构化输出，并将它显示在终端中。

- 运行你的解决方案

最后，使用 `pnpm run dev` 运行代码，并确认：

1. 虚构星球的故事会在生成过程中逐步显示在终端中。
2. 返回的事实是一个结构化对象，其中包含一个字符串数组。
3. 这些事实采用了科学家的写作口吻。

- （可选）尝试另一种做法

完成练习后，看看你能否用 [`generateObject()`](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object) 实现第 6 版方案，而不使用 `generateText()` 与 `Output.object()` 的组合。两种方式都能使用，不过其中一种是较新的模式。

> **更新说明（2026-10-13）：版本表述有差异。** 上一段保留了原文对“第 6 版方案”的说法。AI SDK 官方的 [5.x → 6.0 迁移指南](https://ai-sdk.dev/docs/migration-guides/migration-guide-6-0)说明：第 6 版已弃用 `generateObject` 和 `streamObject`，建议改用带 `output` 设置的 `generateText` 或 `streamText`。因此，不能把上一段理解为“`generateObject()` 是第 6 版较新的推荐模式”。“弃用”表示不再推荐继续采用，并不等于在第 6 版立即不可用。这里没有替换原例，也没有补写解答；实际练习仍需核对课程项目的依赖版本。

### 视频文字稿

## 查看 Matt 的解答：

- [通过 Output 生成对象：解答入口（原站）](https://www.aihero.dev/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k/solution)

[登录原站](https://www.aihero.dev/login)以保存课程进度。

> **译注：材料缺口。** 本次来源只有“视频文字稿”标题，没有取得文字稿内容；不据此判断原站是否另有文字稿。以上课程访问、解答和登录均为原站入口，本地页不提供视频、答案或保存学习进度的功能。

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
