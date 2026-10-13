---
title: "推理"
slug: "inference"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 推理

运行已经训练好的模型来生成输出。每次模型提供商请求都会进行推理，参数保持不变。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

运行已经训练好的[模型](/ai-coding-dictionary/model)来生成输出，每次[模型提供商请求](/ai-coding-dictionary/model-provider-request)都会发生。[参数](/ai-coding-dictionary/parameters)保持不变，模型只根据收到的[上下文](/ai-coding-dictionary/context)做[下一个 Token 预测](/ai-coding-dictionary/next-token-prediction)。相对于[训练](/ai-coding-dictionary/training)，推理更便宜，但它按 [Token](/ai-coding-dictionary/token) 计费，是使用模型时的主要成本。

模型的生命周期分为两个阶段：

| 阶段 | 何时发生 | 做什么 | 参数 |
| --- | --- | --- | --- |
| 训练 | 发布之前，进行一次 | 从训练语料中生成参数 | 正在写入 |
| 推理 | 每次有人使用模型时 | 使用固定参数处理你的上下文，生成 Token | 只读 |

> **译注：表格与“推理”。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。这里的推理对应 inference，指运行模型生成结果，不能只理解为回答里展示的逻辑推导。训练语料就是训练所使用的材料。

推理时你做的任何事，都不会写回参数。这就是你今天给出的纠正，明天不会留在模型里的原因。你认真解释了如何修正，模型在下个[会话](/ai-coding-dictionary/session)仍犯同样的错误，并不是它忽略了你，而是它无法从这次交互中学习。模型是[无状态的](/ai-coding-dictionary/stateless)，连续性必须来自它外部，例如[上下文窗口](/ai-coding-dictionary/context-window)或[记忆系统](/ai-coding-dictionary/memory-system)。

这个机制也解释了计费方式。每次请求都会让模型处理完整上下文，因此成本随[输入 Token](/ai-coding-dictionary/input-tokens) 和[输出 Token](/ai-coding-dictionary/output-tokens)数量变化。智能体调用几十次[工具](/ai-coding-dictionary/tool)，每次往返都要支付推理费用。所以，上下文大小既是质量问题，也是成本问题。

_用法：_

**英文原例**

> Why does the bill scale with usage instead of being a flat license?

**中文理解**

“为什么费用随着用量增加，而不是收取固定的许可证费用？”

**英文原例**

> You're paying for inference — every model provider request runs the model on the provider's hardware. Training already happened, but inference costs accrue per request, and a single [turn](/ai-coding-dictionary/turn) can expand into many requests when tools are called.

**中文理解**

“你付的是推理费用。每次模型提供商请求，都要在提供商的硬件上运行模型。训练早已完成，但推理成本按请求累积；调用工具时，一个[工作轮次](/ai-coding-dictionary/turn)可以展开成许多次请求。”

[上一个词条：训练](/ai-coding-dictionary/training) · [下一个词条：推理投入程度](/ai-coding-dictionary/effort)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/inference)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FinferenceInference%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Inference%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Finference) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/inference?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/inference)复制地址。
