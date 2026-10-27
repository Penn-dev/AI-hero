---
title: "交接"
slug: "handoff"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

交接

# 交接

把智能体的上下文从一个会话转移到另一个会话，后者不能回头追问。承载方式可以是文档、压缩等。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

把[智能体](/ai-coding-dictionary/agent)的[上下文](/ai-coding-dictionary/context)从一个[会话](/ai-coding-dictionary/session)转移到另一个会话。承载方式各不相同，可以是写下来的[交接材料](/ai-coding-dictionary/handoff-artifact)，也可以是内存中的摘要，也就是[压缩](/ai-coding-dictionary/compaction)，还可以有其他方式。它与[清空](/ai-coding-dictionary/clearing)不同，清空完全不转移内容。交接的原因也很多：切换角色，从规划者转为实施者；启动一次 [AFK](/ai-coding-dictionary/afk) 工作；把任务分给并行会话；或者释放[上下文窗口](/ai-coding-dictionary/context-window)空间。

接收方会话从零上下文开始。[模型](/ai-coding-dictionary/model)是[无状态的](/ai-coding-dictionary/stateless)，新会话看不到旧会话的任何内容。下一会话需要的一切都必须明确带过去，其余内容则消失。“不能回头追问”这个限制决定了该怎样准备交接内容：新会话无法问旧会话某句话是什么意思，因此带过去的材料必须能独立看懂。

| 机制 | 形式 | 特点 |
| --- | --- | --- |
| 交接材料 | [环境](/ai-coding-dictionary/environment)中的文件 | 在其他工作依赖它之前，你可以阅读并纠正；能在多个会话中重复使用 |
| 压缩 | 上下文窗口中的摘要 | 自动、便宜；较难检查；供一个后续会话使用 |

> **译注：表格与 AFK。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。AFK 表示人离开键盘后让智能体继续工作。这里“不能回头追问”是作者对这类交接的约束，不是对所有多智能体通信方式的定义。

交接不好的明显后果，是重新争论已经定下的事情：新会话重新打开旧会话已经解决的决定，因为交接内容只记了决定是什么，没记为什么。判断交接好不好，要看一个零上下文的会话拿到它能做什么。

_用法：_

**英文原例**

> Planning session is getting heavy — should I just keep going?

**中文理解**

“规划会话越来越重了，我应该就这样继续吗？”

**英文原例**

> Do a handoff. Write the decisions to a doc, clear, start the implementation in a fresh session reading from it.

**中文理解**

“做一次交接。把决定写进文档，清空，再开启新会话读取文档、开始实施。”

[上一个词条：清空](/ai-coding-dictionary/clearing) · [下一个词条：一手来源](/ai-coding-dictionary/primary-source)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/handoff)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FhandoffHandoff%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Handoff%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhandoff) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/handoff?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/handoff)复制地址。
