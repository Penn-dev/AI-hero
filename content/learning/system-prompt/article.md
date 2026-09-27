---
title: "系统提示词"
slug: "system-prompt"
type: "dictionary"
description: "系统提示词是随请求交给模型的基础工作说明。了解它与用户消息、项目规则的区别，以及它为什么会影响回答。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
系统提示词（system prompt），是智能体执行框架（[harness](/ai-coding-dictionary/harness)）在每次向模型提供商发送请求时附带的一组基础指令。它相当于[智能体](/ai-coding-dictionary/agent)的工作说明：它是谁、应当如何做事、可以调用哪些[工具](/ai-coding-dictionary/tool)，以及需要遵守哪些约定。在一次[会话](/ai-coding-dictionary/session)中，这些指令通常保持稳定。

## 谁提供这些规则？

原文主要讨论由执行框架开发商提供的系统提示词。在编程类框架中，这份说明可能很长：作者以数万枚 [Token](/ai-coding-dictionary/token)为例，其中包含行为规则、工具说明和特殊情况的处理要求。它们会随请求作为[输入 Token](/ai-coding-dictionary/input-tokens)（input tokens）交给模型，因此也会影响输入成本。

你自己的长期规则也可以一同加入。例如，原文描述的框架会在会话开始时加载 [AGENTS.md](/ai-coding-dictionary/agents-md) 等项目说明文件，再把这些规则和系统提示词一起放入发送给[模型](/ai-coding-dictionary/model)的输入中。

## 为什么通常保持稳定？

多次请求如果具有相同的开头，模型服务就可能复用这部分内容的处理结果，这称为[前缀缓存](/ai-coding-dictionary/prefix-cache)（prefix cache）。原文把保持不变的系统提示词作为这一开头的例子，并用它解释框架为何通常在会话内保持系统提示词稳定。

## 它和用户消息有什么不同？

系统提示词约定基础行为；用户消息提出这次要完成的任务。原文指出，模型经过训练，会优先遵循系统提示词。因此，智能体如果坚持某种你没要求过的约定，或总用一种你改不掉的格式回答，可能是在遵循系统提示词，而你的要求没能覆盖它。

不过，这不意味着系统提示词永远只能由开发商编写。有些执行框架允许你查看和修改它，从而了解并调整模型收到的基础指令。

## 用法示例

**英文原例**

> Two harnesses, same model, totally different behavior on the same prompt.

**中文理解**

“两个执行框架使用同一个模型，面对同一条提示词，表现却完全不同。”

**英文原例**

> Different system prompts. One's tuned for terse code edits, the other for explaining — that's where the divergence lives, before your message even arrives.

**中文理解**

“因为系统提示词不同。一个侧重简洁地修改代码，另一个侧重解释——差别来自它们预设的工作说明，在你发出这条消息之前就已经存在。”

## 中文学习辅助：避免三个误解

- **输入顺序不等于时间顺序。** 系统提示词通常被放在请求输入的前面，但这不意味着你还没发言，模型就已经单独处理过这些规则。框架会组织本次需要的规则和消息，再发出请求。
- **一轮对话不一定只有一次请求。** 一个[工作轮次](/ai-coding-dictionary/turn)中，助手可能调用工具、读取结果，再发出新的[模型提供商请求](/ai-coding-dictionary/model-provider-request)。输入量按实际请求计算，不能把一轮对话简单等同于一次请求。
- **稳定不保证缓存命中或固定折扣。** 前缀缓存与服务实现有关；不同产品的计费、规则加载和自定义方式也不同。本文帮助你理解这些概念，不规定所有产品的具体行为。

## 中文学习辅助：术语小词典

- **系统提示词**：随模型请求提供的基础指令，用来约定角色和行为等要求。
- **执行框架**：围绕模型运行的软件，负责组织输入、提供工具、执行调用并管理交互过程。
- **Token**：模型读取和生成文本时使用的基本单位，不等同于一个汉字或一个英文单词。
- **前缀缓存**：复用多次请求中相同开头的已处理结果；不保证命中或固定折扣。
