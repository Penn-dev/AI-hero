---
title: "系统提示词"
slug: "system-prompt"
type: "dictionary"
description: "执行框架会在每次向模型提供商发送请求前附加的指令——也就是智能体持续遵循的工作说明。它通常会在一次会话中保持稳定。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
执行框架（[harness](/ai-coding-dictionary/harness)）会在每次向[模型提供商发送请求](/ai-coding-dictionary/model-provider-request)前附加这组指令；它是[智能体](/ai-coding-dictionary/agent)持续遵循的工作说明：智能体是谁、应如何行动、可以调用哪些[工具](/ai-coding-dictionary/tool)，以及要遵守什么约定。它通常会在一次[会话](/ai-coding-dictionary/session)中保持稳定。

系统提示词由执行框架的供应商编写，而不是由你编写。对于编码执行框架来说，它往往很长——常常包含数万 [Token](/ai-coding-dictionary/token) 的行为规则、工具说明和边缘情况处理；在每个[轮次](/ai-coding-dictionary/turn)中，这些内容都会作为[输入 Token](/ai-coding-dictionary/input-tokens)计费。你自己的固定指令也会一同送入模型：会话开始时，像 [AGENTS.md](/ai-coding-dictionary/agents-md) 这样的文件会和系统提示词一起加载。因此，[模型](/ai-coding-dictionary/model)在看到你的消息之前，会同时读到供应商的工作说明和你的工作说明。

由于系统提示词在每次请求中都完全相同，它会成为[前缀缓存](/ai-coding-dictionary/prefix-cache)的开头。这也是执行框架通常会让它在整个会话中保持不变、而不是在过程中不断修改的原因之一。

模型经训练会优先遵循系统提示词，而不是用户消息。因此，如果智能体坚持遵循你从未要求过的约定，或者总是以你怎么要求也改变不了的方式排版输出，通常是因为它正在服从系统提示词——发生冲突时，你的消息没有占上风。一些执行框架可以自定义：它们会让你完整查看系统提示词，因此你能读到智能体实际收到的指令，也可以修改它。

_用法：_

"Two harnesses, same model, totally different behavior on the same prompt."

"Different system prompts. One's tuned for terse code edits, the other for explaining — that's where the divergence lives, before your message even arrives."
