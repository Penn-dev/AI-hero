---
title: "系统提示词"
slug: "system-prompt"
type: "dictionary"
description: "智能体执行框架在每次模型提供商请求前附加的指令，是智能体持续遵循的工作简报；通常会在一次会话中保持稳定。"
updatedAt: "2026-07-01T08:46:18.000Z"
---

[智能体执行框架](/ai-coding-dictionary/harness)会在每次[模型提供商请求](/ai-coding-dictionary/model-provider-request)前附加的一组指令，就是[智能体](/ai-coding-dictionary/agent)的长期工作简报：它是谁、该如何行动、能调用哪些[工具](/ai-coding-dictionary/tool)，以及要遵循什么约定。它通常会在一次[会话](/ai-coding-dictionary/session)中保持稳定。

系统提示词由执行框架的供应商编写，不是由你编写。在编程智能体执行框架里，它的篇幅很大，常常包含数万[Token](/ai-coding-dictionary/token)的行为规则、工具说明和边界情况处理；在每个[工作轮次](/ai-coding-dictionary/turn)中，这些都会作为[输入 Token](/ai-coding-dictionary/input-tokens)计入请求。你自己的长期指令也会随它一起提供：像 [AGENTS.md](/ai-coding-dictionary/agents-md) 这样的文件会在会话开始时与系统提示词一同加载，因此[模型](/ai-coding-dictionary/model)会在看到你的消息之前，同时读取供应商的工作简报和你的工作简报。

因为系统提示词在每次请求中都相同，它会构成[前缀缓存](/ai-coding-dictionary/prefix-cache)的开头。这也是执行框架往往让它在整个会话中保持不变、而不是边进行边修改的原因之一。

模型训练时会优先处理系统提示词，而不是用户消息。因此，当智能体坚持某个你从未提出的约定，或反复用你难以改变的方式排版输出时，它通常是在遵循自己的系统提示词——而你的消息在这场分歧中处于下风。一些执行框架可以自定义：它们会让你完整查看系统提示词，从而了解智能体实际收到的指令，并对其进行修改。

_用法：_

"Two harnesses, same model, totally different behavior on the same prompt."

"Different system prompts. One's tuned for terse code edits, the other for explaining — that's where the divergence lives, before your message even arrives."
