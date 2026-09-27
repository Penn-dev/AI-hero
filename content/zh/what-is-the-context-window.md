---
title: "什么是上下文窗口？"
slug: "what-is-the-context-window"
type: "post"
description: "了解 AI 的上下文窗口：输入与输出 Token、容量限制，以及“中间信息丢失”问题。合理控制 Token 用量，让模型表现得更好。"
tags:
  - learn-how-llms-think
  - understand-the-basics
updatedAt: "2025-09-30T13:27:28.739Z"
---

上下文窗口里既有输入 Token，也有输出 Token。输入 Token 可能包括系统提示词（system prompt）和用户提示词（也就是用户发来的消息）；输出 Token 则是助手生成的回复：

![Input/Output Tokens](https://res.cloudinary.com/total-typescript/image/upload/v1759238354/ai-hero-images/nyjlgxjqmdmtqs0xdpvj.png)

两者加在一起，就是这次交互占用的上下文窗口。

随着对话越来越长、其中累积的消息越来越多，占用的 Token 也会不断增加。

![Long Conversations](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/fwyqrzkkfbssgsccdkbw.png)

当然，这种增长不可能一直持续。每个模型都有一个固定的硬性上限，限制它在同一时间最多能看到多少 Token。

## 上下文窗口的容量限制

设想一段特别长的对话：它迟早会达到这个上限。如果你把这样一段超长对话提交给大语言模型（LLM），总 Token 数又超过了限制，API 很可能会返回错误。

![Context Window Limits](https://res.cloudinary.com/total-typescript/image/upload/v1759238355/ai-hero-images/ajvif8zc1xngsfw9kkll.png)

回复生成到一半时，也可能触及上限。换句话说，开始生成回复时，总量可能还在上下文窗口的限制以内；但随着回复越来越长，最终就会达到上限。

![Output Limits](https://res.cloudinary.com/total-typescript/image/upload/v1759238357/ai-hero-images/ya7z2gxgzloavsm8vxmv.png)

模型不会自动妥善处理自己的上下文窗口限制，因此你有时会碰到这类问题。

## “中间信息丢失”（Lost in the Middle）问题

不过，上下文窗口变大还会带来一个更重要的问题：窗口越大，越容易出现“中间信息丢失”（Lost in the Middle）。

想象一段很长的对话，图中的每个圆环分别代表一条消息。对话开头和结尾的消息往往会对输出产生较大影响，而中间部分得到的关注通常会少一些。

![Lost in the Middle](https://res.cloudinary.com/total-typescript/image/upload/v1759238358/ai-hero-images/g7dxrlbemjmc7prdipci.png)

这是一个已知现象，而且上下文窗口越大，通常越明显。

所以，评估一个模型时，不要只看到很大的上下文窗口上限，就觉得：“太厉害了，这下我可以塞进海量内容了。”

即便窗口很大，模型仍然可能遇到“中间信息丢失”，甚至无法从自己已经读入的上下文中准确找回某些信息。

因此，就算模型支持很大的上下文窗口，少放一些 Token，通常还是能得到更好的结果。

## 中文学习辅助：术语小词典

- **上下文窗口（context window）**：模型在一次处理过程中能同时读取和参考的信息范围，其中既包括输入内容，也包括模型生成的输出。
- **Token**：模型切分和处理文本时使用的基本单位；一个 Token 不一定正好对应一个汉字、字符或英文单词。
- **系统提示词（system prompt）**：用来规定 AI 的角色、规则和工作方式的指令，通常由系统或应用提供。
- **用户提示词（user prompt）**：用户发给 AI 的问题、要求或补充信息。
- **大语言模型（LLM）**：能够理解并生成自然语言的 AI 模型，是聊天助手等应用背后的核心技术。
- **API**：让一个程序向另一个程序或服务发送请求并接收结果的接口；本文中指应用向模型服务提交对话的方式。
- **中间信息丢失（Lost in the Middle）**：面对很长的上下文时，模型往往更关注开头和结尾，因而较容易忽略中间关键信息的现象。
