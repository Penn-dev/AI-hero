---
title: "什么是上下文窗口？"
slug: "what-is-the-context-window"
type: "post"
description: "了解 AI 中的上下文窗口：输入/输出 Token、限制以及“迷失在中间”问题。优化 Token 使用以提升模型表现。"
tags:
  - learn-how-llms-think
  - understand-the-basics
updatedAt: "2025-09-30T13:27:28.739Z"
---

上下文窗口由输入 Token 和输出 Token 构成。输入 Token 可能包括系统提示词和用户提示词（来自用户的消息）。而输出 Token 则是助手返回的任何内容：

![输入/输出 Token](https://res.cloudinary.com/total-typescript/image/upload/v1759238354/ai-hero-images/nyjlgxjqmdmtqs0xdpvj.png)

上下文窗口是输入 Token _与_ 输出 Token 的总和。

随着对话变长，越来越多的消息被加入对话，使用的 Token 数量也会增加。

![长对话](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/fwyqrzkkfbssgsccdkbw.png)

你可以想象，这不可能无限持续下去。每个模型对于它在任一时刻能够看到的 Token 数量都有一个硬编码限制。

## 上下文窗口限制

如果我们设想一段超长对话，最终会触及限制。如果你尝试带着这段超长对话查询 LLM 并触及限制，那么 API 很可能会返回某种错误。

![上下文窗口限制](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/ajvif8zc1xngsfw9kkll.png)

你甚至可能在生成消息的过程中触及限制。因此，这条消息开始生成时可能尚未超出上下文窗口限制，但随着生成继续，它最终会触及上下文窗口限制。

![输出限制](https://res.cloudinary.com/total-typescript/image/upload/v1759238357/ai-hero-images/ya7z2gxgzloavsm8vxmv.png)

模型本身还没有聪明到足以绕开自身的上下文窗口限制。因此，你有时会遇到这类问题。

## “迷失在中间”问题

但上下文窗口最大的问题在于，它们越大，“迷失在中间”问题就越多。

如果我们设想一段庞大的对话，其中这些圆环代表一条条消息，那么历史记录开头的消息对输出有相当大的影响，末尾的消息也是如此，但 LLM 对中间内容的关注会少一些。

![迷失在中间](https://res.cloudinary.com/total-typescript/image/upload/v1759238358/ai-hero-images/g7dxrlbemjmc7prdipci.png)

这是一个众所周知的现象，而且上下文窗口越大，这种现象就越明显。

所以，在评估模型时，你不应该只想着：“哇，这个上下文窗口限制真大，太不可思议了，我可以往里面放这么多东西。”

那个模型很可能仍然会有迷失在中间的问题。它甚至可能难以从自己的上下文窗口中检索信息。

因此，即使那个模型支持很大的上下文窗口，在上下文中使用更少的 Token 也一定会得到更好的结果。
