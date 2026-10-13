---
title: "前缀缓存"
slug: "prefix-cache"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 前缀缓存

模型提供商一侧的存储机制，让连续请求跳过相同开头的重复处理，并以更低费率计算这部分 Token。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

前缀缓存是[模型提供商](/ai-coding-dictionary/model-provider)一侧的存储机制，可以让连续的[模型提供商请求](/ai-coding-dictionary/model-provider-request)跳过对相同开头的重复处理。如果一项请求的开头与近期请求相同，例如[系统提示词](/ai-coding-dictionary/system-prompt)相同，并且此前的对话记录在某个位置之前也完全相同，提供商就会复用上次的处理结果，并把这部分 [Token](/ai-coding-dictionary/token)作为[缓存 Token](/ai-coding-dictionary/cache-tokens)，按低得多的费率计费。

缓存之所以能节省费用，是因为会话记录通常只在末尾增加新内容。每次请求都会把完整记录作为[输入 Token](/ai-coding-dictionary/input-tokens)重新发送（具体原因见“输入 Token”词条）。在普通[会话](/ai-coding-dictionary/session)中，只有记录末尾发生变化：每次请求都是在上一次请求后面再加几条新消息。提供商只需处理一次前面大段相同的内容，保存处理结果，下次再从相同前缀的结尾继续。没有缓存的话，一个包含 50 个[工作轮次](/ai-coding-dictionary/turn)的会话，就要为第一轮内容被重复处理 50 次付费。

缓存也会过期。一份缓存能保持可用多久，取决于模型提供商，通常是几分钟，而不是几小时。如果会话闲置时间超过了有效期，下一次请求就需要按全价重新处理一次相同前缀，之后缓存才会继续生效。这主要是[智能体执行框架](/ai-coding-dictionary/harness)开发者需要关心的问题。对普通用户来说，最直接的表现是：长时间暂停后的请求，比暂停前的请求更贵。

> **译注：前缀和输入。** 前缀就是请求开头连续相同的部分。输入 Token 是交给模型读取的内容；缓存 Token 是其中复用了已有处理结果的部分。原文讨论提供商支持前缀缓存的情形，具体有效期、缓存命中及费率以所用服务为准。

_用法：_

**英文原例**

> Why did the bill spike halfway through the session?

**中文理解**

“为什么会话进行到一半，账单突然增加了？”

**英文原例**

> Harness started injecting the current time into the system prompt every turn. Prefix cache breaks at the first changed token, so every request after that billed at full rate.

**中文理解**

“执行框架开始在每个工作轮次的系统提示词中插入当前时间。前缀缓存会在第一个变化的 Token 处断开，所以之后的每项请求都按全价计费了。”

[上一个词条：输出 Token](/ai-coding-dictionary/output-tokens) · [下一个词条：缓存 Token](/ai-coding-dictionary/cache-tokens)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/prefix-cache)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fprefix-cachePrefix%20cache%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Prefix%20cache%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fprefix-cache) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/prefix-cache?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/prefix-cache)复制地址。
