---
title: "用 Vercel AI SDK 创建嵌入向量"
slug: "create-embeddings-with-vercel-ai-sdk"
type: "post"
description: "学习用 Vercel AI SDK 为词语和数据创建嵌入向量，并进行相似度搜索。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-08T09:48:51.812Z"
---

Vercel AI SDK 提供了一种很简单的方法来创建嵌入向量。

嵌入是一种把词语、图片或数据表示成高维空间中位置的方法。

想判断两个东西有多相似时，它非常有用。

因此，嵌入向量是搜索、分类等任务的重要基础。

译注：可以先把向量理解为一长串数字，用来描述某个对象的特征。本页保留原接口和示例分数，未调用嵌入模型或重算结果；依赖版本与模型访问准备未验证。

## 创建嵌入向量

<Scrollycoding>

# !!steps

第一步，取得嵌入模型。这里使用 OpenAI 的模型。

```ts ! example.ts
import { openai } from "@ai-sdk/openai";

const model = openai.embedding(
  "text-embedding-3-small",
);
```

# !!steps

我们只处理几个词：dog、cat、car 和 bike，也就是狗、猫、汽车和自行车，把它们放进数组。

```ts ! example.ts
import { openai } from "@ai-sdk/openai";

const model = openai.embedding(
  "text-embedding-3-small",
);

const values = ["Dog", "Cat", "Car", "Bike"];
```

# !!steps

然后调用 AI SDK 的 `embedMany`，传入模型和这些值。

```ts ! example.ts
import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";

const model = openai.embedding(
  "text-embedding-3-small",
);

const values = ["Dog", "Cat", "Car", "Bike"];

const { embeddings } = await embedMany({
  model,
  values,
});

console.dir(embeddings, { depth: null });
```

</Scrollycoding>

打印出来，看看创建了什么。

可以看到，结果是一组数组，每个里面都有很多数字。这些就是向量，表示多维空间中的位置。

根据模型不同，每个数组可能包含几千个数字。这组数字，也就是向量，表示模型对那个词的理解。

## 创建向量数据库

现在，把这些向量与它们所代表的值配对，放进向量数据库。

```ts
const vectorDatabase = embeddings.map(
  (embedding, index) => ({
    value: values[index],
    embedding,
  }),
);
```

这是一个极简的向量数据库，只是一份向量列表，每条向量附上对应的值。

实际项目中，可以使用 Postgres，再通过 `pgvector` 这样的扩展加入向量查询能力。

译注：数据库是组织和查询数据的系统。这里的“数据库”只是保存在程序中的数组，没有安装或启动独立数据库服务。

## 搜索相似的嵌入向量

接下来使用这个数据库，找出与搜索词最相似的条目。

还需要为搜索词再生成一份嵌入。

为此，可以调用 AI SDK 的 `embed`：

```ts
import { embed } from "ai";

const searchTerm = await embed({
  model,
  value: "Canine",
});
```

我们要找与 “Canine” 最相似的词。

译注：Canine 表示犬或犬类相关含义；这里保留原词，方便对照搜索结果。

现在，所需向量都齐了。做相似度搜索需要的信息已经全部具备，不必再查询 LLM。

接下来，计算搜索词与数据库中每条向量的余弦相似度。

<Scrollycoding>

# !!steps

好在 AI SDK 提供了 `cosineSimilarity` 函数。

遍历数据库里的每个条目，计算它与搜索词的相似度。

```ts ! example.ts
import { cosineSimilarity } from "ai";

const entries = vectorDatabase.map((entry) => {
  return {
    value: entry.value,
    similarity: cosineSimilarity(
      entry.embedding,
      searchTerm.embedding,
    ),
  };
});
```

# !!steps

然后按相似度排序。

```ts ! example.ts
import { cosineSimilarity } from "ai";

const entries = vectorDatabase.map((entry) => {
  return {
    value: entry.value,
    similarity: cosineSimilarity(
      entry.embedding,
      searchTerm.embedding,
    ),
  };
});

const sortedEntries = entries.sort(
  (a, b) => b.similarity - a.similarity,
);

console.dir(sortedEntries, { depth: null });
```

</Scrollycoding>

打印出来，会发现相似度是 0 到 1 之间、带有很多小数位的数字。

```bash
[
  { "value": "Dog", "similarity": 0.8918085834539862 },
  { "value": "Cat", "similarity": 0.5911997598415127 },
  { "value": "Car", "similarity": 0.5564415138726317 },
  { "value": "Bike", "similarity": 0.5002829969392777 }
]
```

译注：上句按原文保留，描述的是给出的示例值；余弦相似度的一般范围是 -1 到 1。两个方向相反的单位向量，点积就是 -1，因此不能把本例的 0 到 1 当作所有向量的通用范围。本次没有重新计算这些模型输出分数。

可以看到，`Dog` 排在最前面，因为它与 `Canine` 最相似。

这么简单的配置，就能支持搜索和分类等许多有用的功能。

AI SDK 提供了 `embed`、`embedMany`、`cosineSimilarity`，还能调用嵌入模型，确实很方便。
