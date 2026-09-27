---
title: "什么是上下文窗口？"
slug: "what-is-the-context-window"
type: "post"
description: "了解 AI 中的上下文窗口：输入/输出 Token、限制以及“迷失在中间”问题。优化 Token 使用，以获得更好的模型表现。"
tags:
  - learn-how-llms-think
  - understand-the-basics
updatedAt: "2025-09-30T13:27:28.739Z"
---

上下文窗口由输入和输出 Token 组成。输入 Token 可能包括系统提示词和用户提示词（即用户发送的消息）。输出 Token 则是助手返回的内容：

![输入/输出 Token](https://res.cloudinary.com/total-typescript/image/upload/v1759238354/ai-hero-images/nyjlgxjqmdmtqs0xdpvj.png)

上下文窗口是输入 Token 和输出 Token 的总和。

随着对话变长，越来越多的消息被放入对话中，已使用的 Token 数量也会增长。

![长对话](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/fwyqrzkkfbssgsccdkbw.png)

正如你可以想象的那样，这无法无限持续。每个模型对它在任意时刻能够看到的 Token 数量都有一个硬编码限制。

## 上下文窗口限制

假如有一段极长的对话，我们最终会触及限制。如果你尝试用这段极长对话查询 LLM 并触及限制，那么 API 很可能会返回某种错误。

![上下文窗口限制](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/ajvif8zc1xngsfw9kkll.png)

你甚至可能在生成消息的过程中触及限制。因此，这条消息可能在上下文窗口限制之外开始，但会持续生成，直到触及上下文窗口限制。

![输出限制](https://res.cloudinary.com/total-typescript/image/upload/v1759238357/ai-hero-images/ya7z2gxgzloavsm8vxmv.png)

模型本身并不够聪明，无法绕开自己的上下文窗口限制。因此，你有时会遇到这样的问题。

## “迷失在中间”问题

但上下文窗口最大的一个问题是：它越大，就越容易出现“迷失在中间”问题。

假如有一段巨大的对话，其中这些环代表各条消息：历史开头的消息对输出有相当大的影响，结尾的消息也是如此，但位于中间的内容，LLM 会少关注一些。

![迷失在中间](https://res.cloudinary.com/total-typescript/image/upload/v1759238358/ai-hero-images/g7dxrlbemjmc7prdipci.png)

这是一个广为人知的现象，而且上下文窗口越大，这一现象越明显。

因此，在评估模型时，你不应只想着：“哇，这个上下文窗口限制好大，太不可思议了，我能往里面放这么多内容。”

该模型仍很可能有“迷失在中间”问题。它甚至可能难以从自己的上下文窗口中检索信息。

所以，即使该模型支持很大的上下文窗口，在上下文中使用更少 Token 仍然肯定会得到更好的结果。
