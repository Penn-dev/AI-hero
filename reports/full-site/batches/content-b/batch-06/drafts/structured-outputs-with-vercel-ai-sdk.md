---
title: "用 Vercel AI SDK 生成结构化输出"
slug: "structured-outputs-with-vercel-ai-sdk"
type: "post"
description: "学习通过 Vercel AI SDK 和 OpenAI 按预先规定的格式取得结构化数据。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-05T20:23:27.354Z"
---

你希望 LLM 返回的，往往不是一段文本，而是某种对象。

比如，你可能想从银行对账单中找出账户号码、余额等多项信息。

最有效的做法是使用结构化输出。

你向 LLM 提问，同时告诉它希望答案采用什么格式，它就会按那个格式返回信息。

这个例子里，我们要向 LLM 要一份食谱，其中包含食谱名称、食材数组，以及厨师制作时需要遵循的步骤数组。

```json
{
  "recipe": {
    "name": "Chocolate Cake",
    "ingredients": [
      {
        "name": "flour",
        "amount": "2 cups"
      },
      {
        "name": "sugar",
        "amount": "2 cups"
      }
      // ...
    ],
    "steps": [
      "Preheat the oven to 350 degrees F.",
      "Mix the flour, sugar, cocoa powder, baking powder, baking soda, and salt in a large bowl."
      // ...
    ]
  }
}
```

中文理解：这是一个巧克力蛋糕食谱的结构示例。食材包括 2 杯面粉和 2 杯糖；步骤包括把烤箱预热到华氏 350 度，以及在大碗中混合面粉、糖、可可粉、泡打粉、小苏打和盐。

译注：对象按字段组织信息，数组则是一组按顺序排列的内容。上面保留原文含注释和省略部分的 JSON 示意，不是完整食谱或可直接解析的完整 JSON。本次没有读取银行资料或运行代码；model、依赖版本和模型访问环境未在本页给全。

<Scrollycoding>

# !!steps

第一步，创建一个 `zod` Schema，描述希望 LLM 返回的数据类型。

如果你没接触过 `zod`，我在另一个网站 Total TypeScript 上有一套[免费教程](https://www.totaltypescript.com/tutorials/zod)。

要描述这里的食谱结构，`zod` Schema 可以这样写：

```ts ! example.ts
import { z } from "zod";

const schema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
      }),
    ),
    steps: z.array(z.string()),
  }),
});
```

# !!steps

把这个 Schema 直接传给 AI SDK 的 `generateObject` 函数即可。

```ts ! example.ts
import { z } from "zod";
import { generateObject } from "ai";

const schema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
      }),
    ),
    steps: z.array(z.string()),
  }),
});

export const createRecipe = async (prompt: string) => {
  const { object } = await generateObject({
    model,
    schema,
    prompt,
  });

  return object.recipe;
};
```

# !!steps

我还加了一段简单的系统提示词，让 AI 知道我们在做什么。

返回结果中有一个 `object` 属性，里面装着食谱。

TypeScript 也能识别类型，让我们安全地访问 `name`、`ingredients` 和 `steps`。

```ts ! example.ts
import { z } from "zod";
import { generateObject } from "ai";

const schema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
      }),
    ),
    steps: z.array(z.string()),
  }),
});

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

</Scrollycoding>

译注：类型安全访问，是指开发工具可以根据预先定义的结构，检查字段名和数据类型。它不等于保证模型生成的食谱在现实中一定正确。

### 为字段添加说明

还没有结束，我们应该进一步告诉 AI，每个字段具体是什么意思。

目前，它只能根据 `name`、`ingredients` 和 `steps` 这些名称来判断。

可以给每个字段加上 `zod` 的 `describe` 函数。

```ts
const schema = z.object({
  recipe: z.object({
    name: z
      .string()
      .describe("The title of the recipe"),
    ingredients: z
      .array(
        z.object({
          name: z.string(),
          amount: z.string(),
        }),
      )
      .describe(
        "The ingredients needed for the recipe",
      ),
    steps: z
      .array(z.string())
      .describe("The steps to make the recipe"),
  }),
});
```

这样，AI 就更清楚每个字段应该提供什么了，尤其是在字段名本身不够清晰时。

译注：这三段英文说明分别是“食谱标题”“制作食谱所需的食材”和“制作食谱的步骤”。程序代码中的字段和说明保留原样。

最后，还可以把 `schemaName` 属性传给 `generateObject`：

```ts
const { object } = await generateObject({
  model,
  system:
    `You are helping a user create a recipe. ` +
    `Use British English variants of ingredient names, like Coriander over Cilantro.`,
  schemaName: "Recipe",
  schema,
  prompt,
});
```

中文 Prompt（译注）：

```text
你正在帮助用户制作食谱。
食材名称使用英式英语写法，例如使用 Coriander 而不是 Cilantro。
```

来试试看会得到什么。我们问它怎样制作 Baba Ganoush。

```ts
const recipe = await createRecipe(
  "How to make baba ganoush?",
);

console.dir(recipe, { depth: null });
```

中文 Prompt（译注）：

```text
怎样制作 Baba Ganoush 茄子泥？
```

运行后，会返回一份 Baba Ganoush 的食谱。

```bash
pnpm run example v 08

{
  "name": "Baba Ganoush",
  "ingredients": [
    { "name": "Aubergine", "amount": "2 large" },
    { "name": "Tahini", "amount": "3 tablespoons" }
    // ...
  ],
  "steps": [
    "Preheat the oven to 200°C (400°F).",
    "Pierce the aubergines several times with a fork."
    // ...
  ]
}
```

中文理解：原输出示例的名称是 Baba Ganoush，列出的食材是 2 个大茄子、3 汤匙芝麻酱；列出的步骤是把烤箱预热到 200°C（400°F），再用叉子在茄子上扎几下。后续食材和步骤在原文中已省略，这里不补造。

译注：上面的命令和结果来自原作者示例，不是本次实际运行所得。本页也没有提供该命令依赖的完整项目配置。

这就是通过 AI SDK 获得结构化输出的方法。
