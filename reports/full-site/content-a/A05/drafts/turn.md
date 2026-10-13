---
title: "工作轮次"
slug: "turn"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

会话、上下文窗口与工作轮次

# 工作轮次

一条用户消息，加上智能体为回应这条消息所做的一切，直到它把控制权交回用户。包含一次或多次提供商请求。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

一条用户消息，加上[智能体](/ai-coding-dictionary/agent)为回应这条消息所做的一切，直到它把控制权交回用户。一个工作轮次包含一次或多次[模型提供商请求](/ai-coding-dictionary/model-provider-request)；如果智能体调用[工具](/ai-coding-dictionary/tool)，请求就可能有很多次。智能体提出澄清问题时，这一轮结束；你的回答会开启下一轮。包含关系是：[会话](/ai-coding-dictionary/session) **> 工作轮次 > 模型提供商请求**。

工作轮次值得单独命名，是因为它有多长由智能体决定，而不是由你决定。你发出一条消息，智能体决定在交回控制权之前，要连续进行多少次工具调用。一轮可以只是一句话的回答，也可以是二十分钟的阅读、编辑和运行测试。这是同一个特点的两面：长工作轮次让[离开键盘的工作方式](/ai-coding-dictionary/afk)成为可能，也可能让事情在无人监督时出错。等到智能体交回控制权，它可能已经偏离你的本意很远了。

工作轮次也是引导智能体的自然单位。一轮之内的事情无需你参与；轮次之间的间隙，是你改变方向的时机。多数[智能体执行框架](/ai-coding-dictionary/harness)会让这种限制缓和一些：你可以在一轮中途打断智能体、让它停下来改换方向，也可以在它工作时输入消息，等这轮结束后再由它读取。如果你反复不满意每轮最后走到哪里，通常应该要求缩小每轮的范围，例如先给计划、一次只做一步。这样做牺牲了一些自主性，换来了更多可以引导它的间隙。

> **译注：这里的层级。** 会话容纳连续对话；一个工作轮次回应一条用户消息；一次模型请求则是软件与模型服务的一次输入、输出往返。AFK 是 Away From Keyboard 的缩写，意思是人离开键盘，让智能体继续工作。

_用法：_

**英文原例**

> One turn took two minutes?

**中文理解**

“一个工作轮次花了两分钟？”

**英文原例**

> It made fourteen [tool calls](/ai-coding-dictionary/tool-call) inside that turn — each one is a separate model provider request. Latency stacks up before the agent finally yields back to you.

**中文理解**

“那一轮里面进行了十四次[工具调用](/ai-coding-dictionary/tool-call)，每次都是一次独立的模型提供商请求。等智能体最终把控制权交回你时，延迟已经累积起来了。”

[上一个词条：会话](/ai-coding-dictionary/session) · [下一个词条：环境](/ai-coding-dictionary/environment)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/turn)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FturnTurn%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Turn%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fturn) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/turn?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/turn)复制地址。
