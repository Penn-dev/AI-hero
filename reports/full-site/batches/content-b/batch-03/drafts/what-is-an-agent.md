---
title: "什么是智能体？"
slug: "what-is-an-agent"
type: "post"
description: "了解 LLM 系统中智能体与工作流的区别：智能体可以临场决定步骤，工作流则适合明确、可重复的任务。"
tags:
  - learn-how-llms-think
  - understand-the-basics
updatedAt: "2025-09-30T13:28:38.873Z"
---

自从 Anthropic 发布[《构建有效的智能体》](https://www.anthropic.com/research/building-effective-agents)，大家就一直在讨论智能体和工作流。它们都是用 LLM 构建更强大系统的方法，也都涉及组织多次 LLM 调用。

译注：一次 LLM 调用，就是应用向模型发送输入，并取得一轮输出。这里讨论的系统会把多次调用及其结果连接起来。

## 什么是工作流？

工作流通过预先确定的步骤组织调用：一次 LLM 调用接着另一次，再接着下一次。这些步骤由开发者写在代码里。

![工作流示意图](https://res.cloudinary.com/total-typescript/image/upload/v1759238361/ai-hero-images/v2mivewubig8dr4i33y2.png)

什么时候停止程序，什么时候调用下一个 LLM，都由代码决定，规则事先写好了。

## 什么是智能体？

智能体则不使用预先固定的步骤。它调用 LLM，并提供一组工具，让模型有不同的下一步可选。LLM 自己决定调用哪个工具，然后根据工具返回的结果作出反应。

![智能体示意图](https://res.cloudinary.com/total-typescript/image/upload/v1759238362/ai-hero-images/ca7dpsp72hqizufpeaxc.png)

LLM 认为任务完成时，也由它自己决定停止程序。换句话说，它是一边走一边决定怎么做。这给了 LLM 更多自主权，当然也让结果更难预测。

译注：这里的“工具”是应用允许模型请求执行的操作，例如读取文件或搜索资料。模型选择下一步，与应用实际执行操作，是两个环节；本篇是在区分控制流程的方式。

## 比较智能体与工作流

智能体和工作流都涉及多次 LLM 调用。如果只调用一次模型，严格来说就不属于这里讨论的任一类。

关键区别在于，谁决定什么时候停止：

![智能体与工作流对比](https://res.cloudinary.com/total-typescript/image/upload/v1759238363/ai-hero-images/aeurhj5uzlcy4rkng3w0.png)

如果完成任务的步骤还不明确，需要临场应变才能解决难题，智能体就很合适。

如果事情需要一遍又一遍按相同方式完成，工作流就很合适。工作流经常受到不公平的贬低，只因为它没有智能体那么令人兴奋、那么吸引眼球。

只要任务定义清楚，工作流往往会比智能体带来更好的结果。

## 并行工作流示例

例如，可以用工作流并行处理任务。假设收到一段文本，我们把它分成两部分，分别独立总结，最后再总结这些摘要。

![并行工作流](https://res.cloudinary.com/total-typescript/image/upload/v1759238364/ai-hero-images/l9gjjbzjqjxhxylvbjdy.png)

译注：并行是让互不依赖的工作同时进行。这个例子先分别处理两段内容，再把结果汇总；执行顺序仍然是预先设计好的。

这就是智能体与工作流的区别。不知道是不是我年纪大、变得无趣了，比起智能体，我其实更喜欢工作流。
