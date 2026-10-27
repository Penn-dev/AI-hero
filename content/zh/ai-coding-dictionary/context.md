---
title: "上下文"
slug: "context"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

会话、上下文窗口与工作轮次

# 上下文

智能体眼下能够访问、与当前任务有关的信息，也就是它所掌握的任务相关知识。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[智能体](/ai-coding-dictionary/agent)眼下能够访问、与当前任务有关的信息。这是一个抽象概念，不是模型看到的原始输入，那叫[上下文窗口](/ai-coding-dictionary/context-window)；也不是不断累积的对话记录，那叫[会话](/ai-coding-dictionary/session)。上下文指的是：_智能体掌握了哪些与任务有关的信息_。“把某项内容加载到上下文中”，就是把它加入这组信息；“上下文工程”则是组织和筛选这组信息的方法。

这三个词可以清楚地区分：

| 术语 | 指什么 |
| --- | --- |
| 上下文 | 智能体目前掌握的任务相关信息 |
| 上下文窗口 | 模型每次请求实际看到的 [Token](/ai-coding-dictionary/token) 序列 |
| 会话 | [智能体执行框架](/ai-coding-dictionary/harness)保存、持续累积的对话 |

> **译注：表格展示。** 原页面的“查看表格”控件用于展示上表。本页直接显示完整表格。Token 是模型读取内容的基本单位，不等于一个字或一个单词；执行框架是负责组织输入、工具和交互的软件。

这个区分很重要，因为上下文衡量的是质量，不是数量。上下文窗口可以几乎装满，上下文却依然很差：里面有成千上万个 Token 的过时工具输出，没有任何内容与眼前任务有关。窗口也可以几乎是空的，上下文却很好：里面恰好有任务所依赖的那一个类型定义。

多数日常失败都能追溯到上下文。智能体编造 API、违背已有决定，或者猜测数据结构时，首先要问的是：它这么做的时候，上下文里有什么？通常，要么相关事实从未加载，要么它被埋在大量信息里，受到[注意力衰减](/ai-coding-dictionary/attention-degradation)的影响。解决办法是筛选和组织：加载任务需要的信息，排除不需要的信息。

> **译注：代码里的定义。** 类型定义说明一项数据允许有哪些内容和格式；API 是软件提供给其他程序使用的接口。这里的“注意力衰减”指模型对上下文中重要信息的利用变差，不能只靠加入更多文字来解决。

_用法：_

**英文原例**

> It keeps inventing fields that aren't in the type.

**中文理解**

“它总在编造类型定义里没有的字段。”

**英文原例**

> The type file isn't in context — it's reading the call sites and guessing. Read the definition in first.

**中文理解**

“类型文件没有放进上下文。它是在读调用这些数据的代码，然后靠猜。先把定义读进来。”

[上一个词条：无状态](/ai-coding-dictionary/stateless) · [下一个词条：上下文窗口](/ai-coding-dictionary/context-window)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/context)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FcontextContext%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Context%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontext) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/context?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/context)复制地址。
