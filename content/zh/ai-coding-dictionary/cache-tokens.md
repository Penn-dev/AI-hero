---
title: "缓存 Token"
slug: "cache-tokens"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 缓存 Token

提供商通过前缀缓存保留的上次请求输入 Token，以低得多的费率计费。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[提供商](/ai-coding-dictionary/model-provider)从上一次[模型提供商请求](/ai-coding-dictionary/model-provider-request)中缓存的[输入 Token](/ai-coding-dictionary/input-tokens)，因此不必重新处理。当连续请求有相同前缀时，提供商通过[前缀缓存](/ai-coding-dictionary/prefix-cache)复用已经完成的工作，并以低得多的费率计算缓存部分。这让长[会话](/ai-coding-dictionary/session)的费用变得能够承受；没有缓存，每个[工作轮次](/ai-coding-dictionary/turn)都要重新为整个历史付费。

这件事之所以重要，要从会话的计费方式说起。[模型](/ai-coding-dictionary/model)是[无状态的](/ai-coding-dictionary/stateless)，所以每次请求都会把完整对话作为输入 Token 重新发送，包括[系统提示词](/ai-coding-dictionary/system-prompt)、每条消息、每项[工具结果](/ai-coding-dictionary/tool-result)。到第 50 轮，每次请求都携带 50 轮历史，你原本得每次为所有内容支付全价。缓存改变了计算方式：提供商已经处理过、处于完全相同前缀中的 Token，会作为缓存 Token 计费，费率往往是输入费率的十分之一，甚至更低。长会话中，你发送的大部分内容都是缓存 Token，账单也就仍在合理范围内。

下面的例子说明 Token 何时能缓存，何时不能。每个字母代表一块对话内容，每次请求发送到当前为止的对话：

| 请求发送 | 已缓存 | 按全价计费 | 原因 |
| --- | --- | --- | --- |
| `AB` | 没有 | `AB` | 第一次请求，没有可匹配的内容 |
| `ABC` | `AB` | `C` | `AB` 与上次请求的前缀完全相同 |
| `ABCD` | `ABC` | `D` | 前缀仍保持完整 |
| `AXCD` | `A` | `XCD` | 一次修改把 `B` 变成了 `X`，匹配在这里失败 |

> **译注：表格与缓存条件。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。前缀指从开头连续相同的内容。表中的字母只是示意，“十分之一”等费率和后文有效期是原文概括，实际以所用服务的规则为准。

缓存有一个具体的脆弱之处：它匹配的是完全相同的前缀。如果对话前面任何内容改变，例如[执行框架](/ai-coding-dictionary/harness)重新排列内容、时间戳更新、文件的表示方式变化，从那个位置开始就无法命中缓存，后面的所有内容都会按全价输入计费。闲置几分钟后，缓存也会过期，所以长时间暂停后再继续会话，就得重新为历史记录付一次费。会话费用突然上涨，却看不出原因时，就比较用量报告中的缓存 Token 和输入 Token，缓存失效会先在那里显现。

_用法：_

**英文原例**

> Cost on long sessions is brutal — eight bucks for a refactor.

**中文理解**

“长会话的费用太高了，重构一次就花了八美元。”

**英文原例**

> Check the cache tokens. If the harness is reordering the system prompt or files between turns, the prefix breaks and you re-pay full input rate every request.

**中文理解**

“看看缓存 Token。如果执行框架在不同轮次之间重新排列系统提示词或文件，前缀就会断开，每次请求都要重新按全价输入计费。”

[上一个词条：前缀缓存](/ai-coding-dictionary/prefix-cache) · [下一个词条：无状态](/ai-coding-dictionary/stateless)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/cache-tokens)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcache-tokensCache%20tokens%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Cache%20tokens%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcache-tokens) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/cache-tokens?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/cache-tokens)复制地址。
