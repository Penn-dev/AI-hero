---
title: "什么是上下文窗口？"
slug: "what-is-the-context-window"
type: "post"
description: "了解 AI 的上下文窗口：输入与输出 Token、长度限制，以及“信息淹没在中间”问题。学会更高效地使用 Token，获得更好的模型表现。"
tags:
  - learn-how-llms-think
  - understand-the-basics
updatedAt: "2025-09-30T13:27:28.739Z"
---

上下文窗口由输入 Token 和输出 Token 组成。输入 Token 可能包括系统提示词（system prompt）和用户提示词（也就是用户发出的消息）；输出 Token 则是助手返回的内容：

![Input/Output Tokens](https://res.cloudinary.com/total-typescript/image/upload/v1759238354/ai-hero-images/nyjlgxjqmdmtqs0xdpvj.png)

上下文窗口指的是输入 Token 和输出 Token 的总和。

随着对话变长、消息不断加入对话，已使用的 Token 数量也会持续增加。

![Long Conversations](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/fwyqrzkkfbssgsccdkbw.png)

显然，这不可能无限持续下去。每个模型都预先设定了一个硬性上限：它在任意时刻最多能看到多少 Token。

## 上下文窗口的限制

设想一段特别长的对话，最终一定会碰到这个上限。如果你把整段超长对话发送给大语言模型（LLM）查询，并且超过限制，API 很可能会返回某种错误。

![Context Window Limits](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/ajvif8zc1xngsfw9kkll.png)

你甚至可能在生成一条回复的过程中触及上限。也就是说，一条回复刚开始生成时还没有超出上下文窗口，但随着内容不断生成，最终会达到这个限制。

![Output Limits](https://res.cloudinary.com/total-typescript/image/upload/v1759238357/ai-hero-images/ya7z2gxgzloavsm8vxmv.png)

模型本身并不擅长主动绕开自己的上下文窗口限制，因此你有时会遇到这类问题。

## “信息淹没在中间”（Lost in the Middle）问题

不过，上下文窗口更大的一个主要问题是：窗口越大，越容易出现“信息淹没在中间”（lost in the middle）的现象。

想象一段很长的对话：图中的每个圆环代表一条消息。历史开头的消息会对输出产生较大影响，结尾的消息也是如此；但位于中间的内容，LLM 往往会少关注一些。

![Lost in the Middle](https://res.cloudinary.com/total-typescript/image/upload/v1759238358/ai-hero-images/g7dxrlbemjmc7prdipci.png)

这是一个广为人知的现象，而且上下文窗口越大，问题通常越明显。

因此，评估一个模型时，不要只想着：“哇，它的上下文窗口上限这么大，太厉害了，我可以把很多内容都塞进去。”

这个模型仍然很可能遇到“信息淹没在中间”的问题，甚至可能难以从自己的上下文窗口中找回某些信息。

所以，即使一个模型支持很大的上下文窗口，减少放入上下文的 Token 数量，通常仍能得到更好的结果。

## 中文学习辅助：术语小词典

- **上下文窗口（context window）**：模型在一次处理里能同时读取和参考的信息总量，包含你给它的内容和它正在生成的回复。
- **Token**：模型切分和计算文字的基本单位；它不完全等同于一个汉字、英文单词或字符。
- **系统提示词（system prompt）**：用于规定 AI 角色、规则和工作方式的后台指令，用户通常不会直接看到。
- **用户提示词（user prompt）**：用户发送给 AI 的问题、要求或补充信息。
- **大语言模型（LLM）**：能够理解和生成自然语言的 AI 模型，例如聊天助手背后的核心模型。
- **API**：让一个程序向另一个服务发出请求并获得结果的接口；这里指把对话提交给模型服务的方式。
- **“信息淹没在中间”（lost in the middle）**：长上下文里，模型更容易关注开头和结尾，而遗漏中间部分关键信息的现象。
