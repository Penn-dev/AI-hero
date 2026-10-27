---
title: "用 Vercel AI SDK 生成数组"
slug: "generate-arrays-with-vercel-ai-sdk"
type: "post"
description: "学习用 Vercel AI SDK 和 Zod Schema 生成对象数组，以虚构用户数据为例。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-13T15:14:14.472Z"
---

前面，我们看过怎样让 LLM 返回对象或枚举值，而不只是文本。

但如果想返回多个对象，也就是一个对象数组，该怎么办？

比如，你可能想让 LLM 生成大量虚构数据。

译注：数组是一组按顺序组织的值。这里生成的是测试用的虚构用户，不是真实用户资料。本次未执行代码，model、项目依赖和访问配置需要另行准备。

## Zod Schema

<Scrollycoding>

# !!steps

先创建一个 Zod Schema，前面的结构化输出例子里已经见过它。

如果还不熟悉，我在 Total TypeScript 上有一套[免费的 Zod 课程](https://www.totaltypescript.com/tutorials/zod)。

```ts ! example.ts
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});
```

# !!steps

还应该给 Schema 的字段添加说明，让 AI 获得更多背景。和前面一样，可以使用 `.describe`。

```ts ! example.ts
import { z } from "zod";

const schema = z.object({
  name: z.string().describe("The name of the user"),
  age: z.number().describe("The user's age"),
  email: z
    .string()
    .email()
    .describe(
      "The user's email address, @example.com",
    ),
});
```

译注：三个字段分别是用户姓名、年龄和邮箱。英文说明还指定邮箱使用 @example.com；这个约束作为原说明保留，不添加真实个人资料。

</Scrollycoding>

## 把 Schema 传给 `generateObject`

接着，将 Schema 传给 `generateObject`，同时把输出类型设为数组。

```ts
import { generateObject } from "ai";

export const createFakeUsers = async (
  input: string,
) => {
  const { object } = await generateObject({
    model,
    prompt: input,
    system: `You are generating fake user data.`,
    output: "array",
    schema,
  });

  return object;
};
```

中文 Prompt（译注）：

```text
你正在生成虚构的用户数据。
```

现在，`generateObject` 返回的 object 就会是一个用户数组。

它很有用的一点是，我们可以预先指定用户的各种信息。这个例子里，他们会像我一样来自英国。

试试看，生成一些虚构用户：

```ts
const fakeUsers = await createFakeUsers(
  "Generate 5 fake users from the UK.",
);

console.dir(fakeUsers, { depth: null });
```

中文 Prompt（译注）：

```text
生成 5 个来自英国的虚构用户。
```

这样，我们就得到了这些用户。

配合 `streamObject` 也很有意思，可以在用户数据生成的同时陆续接收它们。

这就是用 AI SDK 生成结构化对象数组的方法。

译注：上面的结果叙述属于原作者示例，本次没有生成或验证任何用户记录。
