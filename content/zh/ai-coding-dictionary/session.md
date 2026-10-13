---
title: "会话"
slug: "session"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

会话、上下文窗口与工作轮次

# 会话

与智能体进行的一段有起点和终点的交互。从空白开始，不断积累内容，在清空、关闭，或压缩后转入新会话时结束。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

与[智能体](/ai-coding-dictionary/agent)进行的一段有起点和终点的交互。从空白开始，逐步积累消息、[工具结果](/ai-coding-dictionary/tool-result)和读过的文件，在[清空](/ai-coding-dictionary/clearing)、关闭，或[压缩](/ai-coding-dictionary/compaction)后转入新会话时结束。会话就是不断 _填入_ [上下文窗口](/ai-coding-dictionary/context-window)的内容：如果上下文窗口是一个盒子，会话就是慢慢把盒子装满的东西。一个上下文窗口装不下的工作，必须分到多个会话里完成。

会话中的消息记录就是智能体的工作记忆。[模型](/ai-coding-dictionary/model)是[无状态的](/ai-coding-dictionary/stateless)，所以它看起来记住的一切，例如你提出的要求、测试返回的结果、三个工作轮次之前做出的决定，其实都在消息记录里，并在每次[模型提供商请求](/ai-coding-dictionary/model-provider-request)时重新发送。没有进入会话的东西，对智能体来说就不存在。

这份记忆随会话一起结束。新会话从零开始：昨天会话结束时已经很熟悉你代码库的智能体，今天早上对此一无所知。留下来的是[文件系统](/ai-coding-dictionary/filesystem)：一个会话中写下的文件，下一个会话可以再读。这正是[交接](/ai-coding-dictionary/handoff)、[记忆系统](/ai-coding-dictionary/memory-system)和 [AGENTS.md](/ai-coding-dictionary/agents-md) 所依赖的机制。

你来决定会话在哪里结束。会话里的所有内容都会影响之后的每个[工作轮次](/ai-coding-dictionary/turn)，所以在同一会话中处理无关任务，会留下影响下一次回答的残余信息。每个会话只做一个任务，能让上下文保持相关；完成任务就是清空会话的自然时机。

> **译注：记录与重新加载。** 一次模型请求是向模型服务发送输入并取得回应；一个工作轮次可以包含多次请求。清空会话会丢弃这段对话记录，压缩则把重要内容缩短后继续使用。本文所说的新会话从零开始，需要结合后面的文件机制理解：执行框架仍可以重新加载项目规则或已保存的记忆。

_用法：_

**英文原例**

> How long can one session run before it falls apart?

**中文理解**

“一个会话能运行多久，才开始出问题？”

**英文原例**

> Depends on the work — a focused refactor stays sharp longer than open-ended research. Once the session bloats, hand off or compact, don't push through.

**中文理解**

“取决于工作内容。范围集中的重构，比开放式研究更能长时间保持清晰。会话一旦膨胀，就交接或压缩，别硬撑着继续。”

> **译注：重构。** 在尽量保持软件已有行为的前提下，调整代码的组织和实现方式。

[上一个词条：系统提示词](/ai-coding-dictionary/system-prompt) · [下一个词条：工作轮次](/ai-coding-dictionary/turn)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/session)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FsessionSession%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Session%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsession) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/session?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/session)复制地址。
