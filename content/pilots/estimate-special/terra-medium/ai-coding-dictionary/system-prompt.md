---
title: "系统提示词"
slug: "system-prompt"
type: "dictionary"
description: "执行框架在每次向模型提供商发请求前附加的指令——相当于智能体始终遵循的工作简报。通常在一次会话中保持不变。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
智能体执行框架（[harness](/ai-coding-dictionary/harness)）在每次向[模型提供商发起请求](/ai-coding-dictionary/model-provider-request)前附加的指令，也就是[智能体](/ai-coding-dictionary/agent)始终遵循的工作简报：它是谁、该怎样做事、能调用哪些[工具](/ai-coding-dictionary/tool)，以及要遵守哪些约定。它通常在一次[会话](/ai-coding-dictionary/session)中保持不变。

系统提示词由执行框架的供应商编写，不是由你编写。在用于编程的执行框架中，它往往很长：可能包含数万枚 [Token](/ai-coding-dictionary/token) 的行为规则、工具说明和边界情况处理方式；每次[对话轮次](/ai-coding-dictionary/turn)都会把它们作为[输入 Token](/ai-coding-dictionary/input-tokens)计费。你自己的长期规则也会随它一同发送：例如，会话开始时会在系统提示词旁加载 [AGENTS.md](/ai-coding-dictionary/agents-md)。因此，[模型](/ai-coding-dictionary/model)在看到你的消息前，会同时读到供应商的工作简报和你的规则。

因为它在每次请求中都相同，所以它构成了[前缀缓存](/ai-coding-dictionary/prefix-cache)的开头。这也是执行框架通常会让它在整个会话中固定不变、而不是边用边改的原因之一。

模型在训练时被要求优先遵循系统提示词，而不是用户消息。因此，如果智能体坚持某种你从未要求过的约定，或总用一种你难以改变的格式输出，通常是因为它在遵循系统提示词——而你的消息没能压过它。一些执行框架允许自定义系统提示词：你可以完整查看智能体实际收到的指令，并进行修改。

_用法：_

“两个执行框架使用同一个模型，对同一条提示词的表现却完全不同。”

“因为系统提示词不同。一个针对简短的代码修改做了优化，另一个更侧重解释——差异在你的消息到达之前就已经产生了。”

## 中文学习辅助：术语小词典

- **harness**：智能体执行框架，负责把模型、规则和工具组合起来，让模型能完成实际任务的软件环境。
- **system prompt**：系统提示词，智能体每次开始回答前都会先收到的一组高优先级规则。
- **Token**：模型处理文本时使用的计量单位，不完全等同于一个汉字或一个英文单词。
- **prefix cache**：前缀缓存，服务商复用多次请求中相同开头内容的处理结果，以减少成本和等待时间的机制。
