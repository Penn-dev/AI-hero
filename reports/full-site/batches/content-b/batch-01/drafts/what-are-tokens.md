---
title: "什么是 Token？"
slug: "what-are-tokens"
type: "post"
description: "了解 Token 如何帮助 LLM 处理文本、影响成本与效率，以及编码、解码和词表大小的作用。"
tags:
  - learn-how-llms-think
  - understand-the-basics
updatedAt: "2025-09-30T09:47:04.967Z"
---

Token 是大语言模型（LLM）处理文本时使用的基本单位。理解它们很重要，尤其是因为模型会按你的 Token 用量收费。

## 什么是 Token？

简单来说，Token 就是一些数字，用来表示 LLM 如何“看待”你提供的文本。把文本转换成 Token 的过程叫作**编码**。

分词过程分两步：

1. 分词器把文本切分成自己认识的 Token。
2. 再把这些 Token 转换成数字。

![编码](https://res.cloudinary.com/total-typescript/image/upload/v1759238445/ai-hero-images/vqsgrg2rv79rqgxhvsmc.png)

译注：本篇有时用 Token 指文本片段，有时指该片段对应的数字编号。分词器负责在两者之间转换；一个 Token 不一定对应一个完整单词或一个汉字。

解码则是反过来的过程：

1. 把数字转换回文本 Token。
2. 将这些 Token 拼接起来，形成输出。

![解码](https://res.cloudinary.com/total-typescript/image/upload/v1759238446/ai-hero-images/t4k9fszkfkcbm1mrthwj.png)

## LLM 的处理流程

完整的 LLM 处理过程如下：

1. 分词器把你输入的文本编码成 Token。
2. LLM 处理这些 Token。
3. LLM 生成输出 Token。
4. 输出 Token 被解码回可读的文本。

![LLM 的处理流程](https://res.cloudinary.com/total-typescript/image/upload/v1759238447/ai-hero-images/hs0gx3ozagimhl5xunxn.png)

说得具体一些，输入 Token 包括：

- 你与 LLM 的对话历史。
- 系统提示词。
- 工具定义。

输出 Token 则是 LLM 返回给你的回复。

译注：系统提示词用于约定模型的角色和行为；工具定义告诉模型有哪些外部操作可用，以及调用它们需要哪些信息。即使不是你刚输入的那句话，它们也可能占用输入 Token。

输入和输出 Token 都会计费，两者的单价通常不同。节省费用的一种方法，是设计提示词，让模型少生成一些输出 Token。

## Token 是怎样产生的？

分词过程首先需要大量文本，类似于训练 LLM 本身时使用的文本。我们先设想一个极小的语料库，里面只有一句话：“the cat sat on the mat.”

译注：语料库就是用于分析或训练的一批文本。这句英文的意思是“猫坐在垫子上”。下面保留英文，是为了让你能对照原文观察字母如何组合。

![分词过程](https://res.cloudinary.com/total-typescript/image/upload/v1759238448/ai-hero-images/ekv9gq9bvk9efycqow1p.png)

首先，提取出所有单独的字符：

```
T H E space C A T space S A T space O N space T H E space M A T
```

译注：原例中的 space 表示空格。

每个字符都成为词表中的一个 Token。

接下来，识别常见的字符组合：

- “TH” 在 “the” 中出现，共两次。
- “HE” 在 “the” 中出现，共两次。
- “AT” 出现在 “cat”“sat” 和 “mat” 中。

每种组合也会获得自己的 Token。

然后，再找出这些组合之间的组合。例如，原文用 “TH” + “HE” 组成 “THE”（也就是单词 “the”），并为它分配一个 Token。

译注：原文这个例子里的两组字母都有 H，直接拼接会重复 H。因此，这里保留原例并指出疑点，不能把它当作精确的字符合并步骤；本段想说明的是，常见的更长组合也会进入词表。

## 词表大小很重要

目标是建立一个较大的 Token 词表。词表越大，单词就可能被切成更少的 Token，处理也就更高效。

![词表大小](https://res.cloudinary.com/total-typescript/image/upload/v1759238449/ai-hero-images/mcsd9qzjf4cz1ulsrblz.png)

例如，只有 1,000 个 Token 的词表，可能会把 “understanding” 切成 5 个 Token。50,000 个 Token 的词表可能把它切成 3 个，200,000 个 Token 的词表可能把它切成 2 个。

译注：“understanding” 在这里是用来演示分词的英文单词，意思是“理解”。这些数字是原文的说明性例子，没有指定某个实际分词器。

词表更大，就能把单词切成更少的 Token，从而提高处理效率。

## 怎样处理不常见的词？

分词器不太擅长处理少见的词。例如，Lewis Carroll 诗中的 “O Frabjous Day” 会被切成很多个 Token，因为 “Frabjous” 是一个自创词，在训练语料中不常出现。

![不常见的词](https://res.cloudinary.com/total-typescript/image/upload/v1759238450/ai-hero-images/pcnihurikeetpfh01xss.png)

译注：这句诗大意是“啊，多么美妙的一天！”这里保留原文，方便对照这个自创词的拼写与分词结果。

可以看到，它被切成了 7 个 Token。仅有 15 个字符，却用了比我们预想更多的 Token。

## 最后说几句

希望这些说明能帮你更好地理解 Token。我觉得 [tiktokenizer 交互工具](https://tiktokenizer.vercel.app/) 对理解这些概念很有帮助。

有问题就告诉我。你还希望我接下来讲什么？

Matt
