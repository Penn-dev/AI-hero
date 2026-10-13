---
title: "无状态"
slug: "stateless"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

会话、上下文窗口与工作轮次

# 无状态

不把信息延续到后面。模型在请求之间无状态；默认情况下，智能体在会话之间也无状态。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

不把信息延续到后面。[模型](/ai-coding-dictionary/model)在不同[模型提供商请求](/ai-coding-dictionary/model-provider-request)之间是无状态的。每次请求都会重新发送完整的[上下文窗口](/ai-coding-dictionary/context-window)，因为模型没有途径看到其他东西。默认情况下，[智能体](/ai-coding-dictionary/agent)在[会话](/ai-coding-dictionary/session)之间也是无状态的：新会话从空白开始，没有此前会话留下的痕迹。与[有状态](/ai-coding-dictionary/stateful)相对。

模型本身始终是无状态的：[训练](/ai-coding-dictionary/training)结束后，它的[参数](/ai-coding-dictionary/parameters)固定下来，你在[推理](/ai-coding-dictionary/inference)阶段做的任何事都不会改变它们。模型不会从你的纠正中学习，不会记得昨天也被告知过同一件事，也不是正在逐渐了解你，无论对话的感觉多像如此。会话中的连续感是[智能体执行框架](/ai-coding-dictionary/harness)制造出来的：它保存对话记录，并在每次请求时重新发送。模型不是在回忆对话，而是在重新阅读对话。

实际影响是：如果你希望某件事能被跨会话记住，就必须把它写到智能体之后会读到的地方。[AGENTS.md](/ai-coding-dictionary/agents-md) 文件、[记忆系统](/ai-coding-dictionary/memory-system)和[交接材料](/ai-coding-dictionary/handoff-artifact)正是这样的东西。它们是会被加载进后续会话[上下文](/ai-coding-dictionary/context)中的文件，用来弥补模型自身没有的记忆。智能体反复犯你之前已经纠正过的错误时，该问的不是它为什么没有学会，因为它本来就学不会，而是该把这条纠正写到哪里，让之后每个会话都能读到。

> **译注：训练与推理。** 训练会调整模型参数，也就是用于计算的数值；推理是在使用已经训练好的模型处理输入。这里讨论正常使用中的请求，不是在说明另外训练或更新模型的过程。模型不保存对话状态，也不等于应用不会保存聊天记录。

_用法：_

**英文原例**

> Why does it forget the convention every time I [clear](/ai-coding-dictionary/clearing)?

**中文理解**

“为什么每次我[清空](/ai-coding-dictionary/clearing)会话，它就忘了那条约定？”

**英文原例**

> The model's stateless — the new session starts empty. If you want it carried, write it to AGENTS.md or a memory file the harness loads at session start.

**中文理解**

“模型是无状态的，新会话从空白开始。如果你想把约定保留下来，就写进 AGENTS.md，或者写进执行框架在会话开始时会加载的记忆文件。”

[上一个词条：缓存 Token](/ai-coding-dictionary/cache-tokens) · [下一个词条：上下文](/ai-coding-dictionary/context)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/stateless)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FstatelessStateless%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Stateless%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fstateless) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/stateless?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/stateless)复制地址。
