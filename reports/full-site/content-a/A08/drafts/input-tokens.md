---
title: "输入 Token"
slug: "input-tokens"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 输入 Token

执行框架在每次模型提供商请求中发送的 Token，计费单价低于输出 Token。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[智能体执行框架](/ai-coding-dictionary/harness)在每次[模型提供商请求](/ai-coding-dictionary/model-provider-request)中发送的 [Token](/ai-coding-dictionary/token)，包括[系统提示词](/ai-coding-dictionary/system-prompt)、对话记录、[工具结果](/ai-coding-dictionary/tool-result)，以及[模型](/ai-coding-dictionary/model)写出内容之前读取的一切。它们的计费单价低于[输出 Token](/ai-coding-dictionary/output-tokens)，因为处理它们比生成输出 Token 的成本低。

进行 [AI](/ai-coding-dictionary/ai) 编程时，输入 Token 构成账单的大部分。模型是[无状态的](/ai-coding-dictionary/stateless)，所以每个[工作轮次](/ai-coding-dictionary/turn)都会把整个[会话](/ai-coding-dictionary/session)作为输入重新发送：你的第一条消息，以及此后的每个回答、每项工具结果。第 50 轮的输入包含此前 49 轮。一次模型提供商请求可能只生成几百个输出 Token，却重新发送十万个积累下来的历史输入 Token。

[前缀缓存](/ai-coding-dictionary/prefix-cache)能降低费用：与之前请求完全相同的历史部分，会按便宜的[缓存 Token](/ai-coding-dictionary/cache-tokens)计费，而不是按全价输入计费。如果输入费用仍让人吃不消，就应该减少重新发送的内容，在任务之间[清空](/ai-coding-dictionary/clearing)或[压缩](/ai-coding-dictionary/compaction)。

> **译注：轮次与账单。** 一个工作轮次可能包含多次模型请求。本文通过整段记录反复发送解释输入成本；实际发送量、缓存命中和计价取决于使用的执行框架与服务。Token 不是汉字或单词的固定换算单位。

_用法：_

**英文原例**

> Bill's high but the [agent](/ai-coding-dictionary/agent)'s barely writing anything.

**中文理解**

“账单很高，可[智能体](/ai-coding-dictionary/agent)几乎没写什么。”

**英文原例**

> It's the input tokens — every turn re-sends the whole session. Without the prefix cache you re-pay for the history each request.

**中文理解**

“是输入 Token 的费用。每个工作轮次都会重新发送整个会话。没有前缀缓存，每次请求都得重新为历史记录付费。”

[上一个词条：模型提供商请求](/ai-coding-dictionary/model-provider-request) · [下一个词条：输出 Token](/ai-coding-dictionary/output-tokens)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/input-tokens)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Finput-tokensInput%20tokens%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Input%20tokens%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Finput-tokens) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/input-tokens?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/input-tokens)复制地址。
