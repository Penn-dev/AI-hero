---
title: "用 Vercel AI SDK 流式输出对象"
slug: "streaming-objects-with-vercel-ai-sdk"
type: "post"
description: "学习用 Vercel AI SDK 逐步接收 LLM 生成的结构化输出。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-07T14:57:33.952Z"
---

译注：本页沿用前篇的模型和食谱 Schema，没有提供完整项目、依赖版本或访问环境。本次未运行代码；原作者的演示叙述与输出预期按原意保留。

<Scrollycoding>

# !!steps

前一个例子展示了怎样从 LLM 取得结构化输出，但它是在生成完后一次性返回全部内容。

我们先等一会儿，然后才看到完整结果。

```ts ! example.ts
export const createRecipe = async (prompt: string) => {
  const { object } = await generateObject({
    model,
    schema,
    prompt,
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names,` +
      `like Coriander over Cilantro.`,
  });

  return object.recipe;
};
```

中文 Prompt（译注）：

```text
你正在帮助用户制作食谱。
食材名称使用英式英语写法，例如使用 Coriander 而不是 Cilantro。
```

# !!steps

如果想在内容生成时就看到它呢？换句话说，怎样流式输出一个对象？

把 `generateObject` 换成 `streamObject` 即可。

```ts ! example.ts
export const createRecipe = async (prompt: string) => {
  const result = await streamObject({
    model,
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names,` +
      `like Coriander over Cilantro.`,
    schemaName: "Recipe",
    schema,
    prompt,
  });

  const finalObject = await result.object;

  return finalObject.recipe;
};
```

中文 Prompt（译注）：

```text
你正在帮助用户制作食谱。
食材名称使用英式英语写法，例如使用 Coriander 而不是 Cilantro。
```

</Scrollycoding>

你会发现，它与前一个例子有几处不同。

首先，需要等待最终完整对象，做法是 await `result.object`。

这是因为，`streamObject` 在收到第一个片段时就会返回结果对象；await `result.object` 才能等到最终对象。

## 取得尚未完整的对象

如果想在对象生成过程中看到它当前的部分内容，可以使用 `result.partialObjectStream`。

```ts
export const createRecipe = async (prompt: string) => {
  const result = await streamObject({
    model,
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names,` +
      `like Coriander over Cilantro.`,
    schemaName: "Recipe",
    schema,
    prompt,
  });

  for await (const obj of result.partialObjectStream) {
    console.clear();
    console.dir(obj, { depth: null });
  }

  const finalObject = await result.object;

  return finalObject.recipe;
};
```

中文 Prompt（译注）：

```text
你正在帮助用户制作食谱。
食材名称使用英式英语写法，例如使用 Coriander 而不是 Cilantro。
```

它是一个异步可迭代对象，所以可以用 `for await...of` 循环，在每次收到更新时打印当前对象。

我们先清空控制台，再输出对象，应该就能看到内容实时出现。

译注：异步可迭代对象会陆续提供结果，循环会等待每一份新内容。此时对象还在生成，不能把中间状态当成最终完整数据。

试试看会得到什么。我们问它怎样制作鹰嘴豆泥：

```ts
const recipe = await createRecipe(
  "How to make hummus?",
);
```

中文 Prompt（译注）：

```text
怎样制作鹰嘴豆泥？
```

可以看到，对象在生成的过程中不断传回来，内容逐渐补全。

最后一个片段包含完整对象。

## 使用场景

在真正的应用里，你不会只是把对象打印到控制台，而是会通过网络把这些片段发给用户。

这样，用户就能实时看到对象逐渐生成。与一直等待、最后突然出现全部内容相比，看到进度总是更舒服。

这就是 AI SDK 中 `streamObject` 的作用。
