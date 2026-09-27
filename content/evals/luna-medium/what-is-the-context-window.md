---
title: "什么是上下文窗口？"
slug: "what-is-the-context-window"
type: "post"
description: '了解 AI 中的上下文窗口：输入/输出 Token、限制，以及“中间迷失”问题。优化 Token 使用，以获得更好的模型性能。'
tags:
  - learn-how-llms-think
  - understand-the-basics
updatedAt: "2025-09-30T13:27:28.739Z"
---

上下文窗口由输入和输出 Token 组成。输入 Token 可能包括系统提示词和用户提示词（用户发送的消息）。输出 Token 则是助手返回的内容：

![Input/Output Tokens](https://res.cloudinary.com/total-typescript/image/upload/v1759238354/ai-hero-images/nyjlgxjqmdmtqs0xdpvj.png)

上下文窗口就是输入 Token 与输出 Token 的总和。

随着对话变长，越来越多的消息被加入对话，所使用的 Token 数量也会增长。

![Long Conversations](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/fwyqrzkkfbssgsccdkbw.png)

而且你可以想象，这不可能永远持续下去。每个模型都设有硬编码的限制，规定它一次最多能看到多少 Token。

## 上下文窗口限制

假设我们有一段非常长的对话，最终会触及限制。如果你尝试用这段超长对话查询 LLM，并且触及了限制，那么 API 可能会返回某种错误。

![Context Window Limits](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/ajvif8zc1xngsfw9kkll.png)

你甚至可能在消息生成过程中触及限制。因此，这条消息可能在上下文窗口限制之外开始生成，但随着生成继续，它会触及上下文窗口限制。

![Output Limits](https://res.cloudinary.com/total-typescript/image/upload/v1759238357/ai-hero-images/ya7z2gxgzloavsm8vxmv.png)

模型本身还不够聪明，无法绕开自己的上下文窗口限制。因此，你有时会遇到这样的问题。

## “中间迷失”问题

但上下文窗口最大的问题是，它们越大，“中间迷失”问题就越多。

假设有一段巨大的对话，其中这些圆环代表一条条消息。历史记录开头的消息对输出有相当大的影响，末尾的消息也一样，但对于中间的内容，LLM 会少关注一些。

![Lost in the Middle](https://res.cloudinary.com/total-typescript/image/upload/v1759238358/ai-hero-images/g7dxrlbemjmc7prdipci.png)

这是一个众所周知的现象，而且上下文窗口越大，这种现象就越明显。

所以在评估模型时，不应该只想：“哇，这个上下文窗口限制真大，太不可思议了，我可以把这么多东西放进去。”

这个模型仍然很可能存在“中间迷失”问题。它甚至可能难以从自己的上下文窗口中检索信息。

因此，即使模型支持很大的上下文窗口，在上下文中使用更少的 Token 仍然一定能得到更好的结果。
