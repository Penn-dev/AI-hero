---
title: "下一个 Token 预测"
slug: "next-token-prediction"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 下一个 Token 预测

模型实际做的事：根据上下文抽取下一个 Token，把它接到后面，再运行一次。这是它唯一的工作方式。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[模型](/ai-coding-dictionary/model)实际做的事。给定[上下文](/ai-coding-dictionary/context)，它抽取下一个 [Token](/ai-coding-dictionary/token)，把它接到后面，再运行一次。每一种输出，无论一句话、一次[工具调用](/ai-coding-dictionary/tool-call)，还是一个有一千行的文件，都是一次一个 Token 地构成的。模型没有其他工作方式。

每一步的机制都相同：[上下文窗口](/ai-coding-dictionary/context-window)中的 Token 经过[参数](/ai-coding-dictionary/parameters)运算，为词表里的每个 Token 产生一个概率，表示这个很可能接在后面，那个可能性较低。根据这些概率抽取一个 Token，把它追加进去，再以稍长一点的上下文运行下一次循环。正是这个抽样步骤，让同一条提示词在不同次运行中产生不同输出：[非确定性](/ai-coding-dictionary/non-determinism)是机制内置的，不是后来叠上去的缺陷。

记住这个机制，就能解释那些原本看起来奇怪的行为。模型输出一个 Token 之前，从不检查它是否 _真实_ ，只看它是否 _可能_ ，这就是[幻觉](/ai-coding-dictionary/hallucination)的根源。它会边生成边确定每个 Token，所以一句听起来很自信的开场白，可能把后面的回答带偏。而且，[输出 Token](/ai-coding-dictionary/output-tokens)严格地一次生成一个，因此生成速度限制了任何[智能体](/ai-coding-dictionary/agent)最快能做到什么程度。

> **译注：概率与抽样。** 概率描述某个候选出现的可能性；抽样是按这些可能性选出一个候选。Token 是模型生成内容的基本单位，不等于一个完整单词。

_用法：_

**英文原例**

> How does the agent 'decide' to call a tool?

**中文理解**

“智能体是怎么“决定”调用工具的？”

**英文原例**

> It doesn't — it's next-token prediction all the way down. The tool call is just a structured string the [harness](/ai-coding-dictionary/harness) parses out of the output stream.

**中文理解**

“它并没有这样做，从头到尾都是下一个 Token 预测。工具调用只是一段结构化字符串，由[执行框架](/ai-coding-dictionary/harness)从输出流中解析出来。”

[上一个词条：Token](/ai-coding-dictionary/token) · [下一个词条：非确定性](/ai-coding-dictionary/non-determinism)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/next-token-prediction)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fnext-token-predictionNext-token%20prediction%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Next-token%20prediction%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fnext-token-prediction) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/next-token-prediction?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/next-token-prediction)复制地址。
