---
title: "什么是上下文窗口？"
slug: "what-is-the-context-window"
type: "post"
description: "了解 AI 中的上下文窗口：输入/输出 Token、限制，以及“中间遗忘”问题。优化 Token 使用，提升模型性能。"
tags:
  - learn-how-llms-think
  - understand-the-basics
updatedAt: "2025-09-30T13:27:28.739Z"
---

上下文窗口由输入和输出 Token 组成。输入 Token 可能包括系统提示词和用户提示词（来自用户的消息）。而输出 Token 则是助手返回的内容：

![输入/输出 Token](https://res.cloudinary.com/total-typescript/image/upload/v1759238354/ai-hero-images/nyjlgxjqmdmtqs0xdpvj.png)

上下文窗口是输入 _和_ 输出 Token 的总和。

随着对话变长，随着越来越多消息被放入对话中，所使用的 Token 数量也会增长。

![长对话](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/fwyqrzkkfbssgsccdkbw.png)

正如你可以想象的那样，这无法无限持续。每个模型对于其任一时刻能够看到的 Token 数量都有硬编码的限制。

## 上下文窗口限制

如果我们设想一段超级长的对话，最终会触及限制。如果你尝试用这段超级长的对话查询 LLM 并触及限制，那么 API 可能会返回某种错误。

![上下文窗口限制](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/ajvif8zc1xngsfw9kkll.png)

你甚至可能在生成消息的过程中触及限制。因此，这条消息可能开始时仍在上下文窗口限制以内，但随着它不断生成，最终会触及上下文窗口限制。

![输出限制](https://res.cloudinary.com/total-typescript/image/upload/v1759238357/ai-hero-images/ya7z2gxgzloavsm8vxmv.png)

模型本身并不足够聪明，无法绕开自己的上下文窗口限制。因此，你有时会遇到这样的问题。

## “中间遗忘”问题

但上下文窗口最大的一个问题是：窗口越大，“中间遗忘”问题就越多。

如果我们设想一段巨大的对话，其中这些圆环代表各条消息，那么历史开头的消息对输出有相当大的影响，结尾的消息也是如此，但 LLM 对中间的内容关注会少一些。

![中间遗忘](https://res.cloudinary.com/total-typescript/image/upload/v1759238358/ai-hero-images/g7dxrlbemjmc7prdipci.png)

这是一种众所周知的现象，而且上下文窗口越大，这种现象就越明显。

所以，在评估一个模型时，你不应该只想着：“哇，这个上下文窗口限制真大，太不可思议了，我能往里面放这么多东西。”

那个模型仍然很可能会有中间遗忘问题。它甚至可能难以从自己的上下文窗口中检索信息。

因此，即便那个模型支持很大的上下文窗口，减少上下文中的 Token 数量依然肯定会带来更好的结果。
