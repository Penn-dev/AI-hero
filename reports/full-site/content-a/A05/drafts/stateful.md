---
title: "有状态"
slug: "stateful"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

会话、上下文窗口与工作轮次

# 有状态

把信息延续到后面。会话在工作轮次之间有状态；通过记忆系统，也可以让智能体在会话之间有状态。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

把信息延续到后面。[会话](/ai-coding-dictionary/session)在[工作轮次](/ai-coding-dictionary/turn)之间是有状态的：随着会话进行，[上下文](/ai-coding-dictionary/context)会不断积累，这也是长会话逐渐进入[低效区](/ai-coding-dictionary/smart-zone)的原因。给[智能体](/ai-coding-dictionary/agent)添加[记忆系统](/ai-coding-dictionary/memory-system)，把信息持久保存到[环境](/ai-coding-dictionary/environment)中，再在后续会话开始时重新加载，就能让它在**会话之间**有状态。[模型](/ai-coding-dictionary/model)从来不是有状态的；看起来连续的表现，都是[智能体执行框架](/ai-coding-dictionary/harness)重新提供上下文的结果。与[无状态](/ai-coding-dictionary/stateless)相对。

各层的状态存在哪里：

| 层次 | 是否有状态 | 如何实现 |
| --- | --- | --- |
| 模型 | 从来没有 | [参数](/ai-coding-dictionary/parameters)固定不变；它只能看到每次请求中的内容 |
| 会话 | 在工作轮次之间有状态 | 执行框架把每条消息和[工具结果](/ai-coding-dictionary/tool-result)加入上下文 |
| 执行框架 | 在会话之间有状态 | 记忆文件、[AGENTS.md](/ai-coding-dictionary/agents-md)、[交接材料](/ai-coding-dictionary/handoff-artifact)，先写下来，之后重新加载 |
| 环境 | 始终有状态 | 无论是否有会话正在运行，文件都会保留 |

> **译注：表格与状态。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。“状态”指工作中需要延续的信息；这里讨论的是正常使用已训练模型时的会话状态。交接材料是给后续工作读取的进展、决定和下一步记录。

每一层的有状态表现，都靠重新读取下一层保存的内容来实现。会话让人感觉连续，是因为执行框架把消息记录重新发送给无状态的模型；智能体能跨会话记住信息，是因为执行框架从环境中重新加载文件。状态从来没有保存在模型自身之中。

状态不总是好事。保留下来的一切，都会影响接下来发生的事，因此会话早期产生的错误假设也会被一路保留。[清空](/ai-coding-dictionary/clearing)就是主动丢弃会话状态，从已经写下来的内容重新开始。

_用法：_

**英文原例**

> It remembered my preferences from yesterday — does that mean the model learned them?

**中文理解**

“它记得我昨天的偏好，这说明模型学会了这些偏好吗？”

**英文原例**

> No, the agent's stateful because the harness wrote them to a memory file and reloaded them at session start. The model itself saw nothing of yesterday.

**中文理解**

“不是。智能体之所以有状态，是因为执行框架把偏好写进了记忆文件，并在会话开始时重新加载。模型本身没有看到昨天的任何事情。”

[上一个词条：上下文窗口](/ai-coding-dictionary/context-window) · [下一个词条：智能体](/ai-coding-dictionary/agent)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/stateful)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FstatefulStateful%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Stateful%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fstateful) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/stateful?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/stateful)复制地址。
