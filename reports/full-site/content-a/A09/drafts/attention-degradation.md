---
title: "注意力衰减"
slug: "attention-degradation"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

失败模式

# 注意力衰减

会话变长时，每个 Token 的注意力预算要分给更多竞争者，有意义关系上的信号会减弱。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

随着[会话](/ai-coding-dictionary/session)变长，每个 [Token](/ai-coding-dictionary/token) 的[注意力预算](/ai-coding-dictionary/attention-budget)要分给更多竞争者。任何一个[有意义关系](/ai-coding-dictionary/attention-relationship)上的信号都会减弱，无关[上下文](/ai-coding-dictionary/context)的噪声则不断挤进来。同一个[模型](/ai-coding-dictionary/model)、同一组[参数](/ai-coding-dictionary/parameters)，只是同一盘食物要分给更多张嘴。这就是高效区与低效区[现象](/ai-coding-dictionary/smart-zone)的原因。

它表现为模型在会话中途变差：已经遵守了一小时的限制开始漏掉，重新询问早已告诉过它的事情，写代码时忽略之前读过的文件。模型本身没有任何变化，唯一变化的是它现在要关注的上下文有多少。

这种变化是渐进的，所以人在会话中很难察觉。没有报错，也没有明确阈值；每个[工作轮次](/ai-coding-dictionary/turn)只比上一轮差一点。等到失误已经很明显时，你其实早已在低效区待了一阵子。

恢复的方法是减少上下文，而不是继续添加。把被忽略的指令重新粘贴一遍，只是在同一个拥挤窗口里再加一名竞争者，作用也很短暂。有效做法是：[清空](/ai-coding-dictionary/clearing)，只重新加载任务需要的内容；或者[压缩](/ai-coding-dictionary/compaction)；或者[交接](/ai-coding-dictionary/handoff)给新会话。把遵循指令的能力下降，看作关于上下文长度的信号，而不是关于模型的信号。

> **译注：三种处理方式。** 清空丢弃当前对话记录；压缩保留较短摘要；交接把当前进展和下一步写给新会话读取。此处保留作者对注意力衰减的解释，具体症状仍需结合实际输入检查。

_用法：_

**英文原例**

> It's deep in the dumb zone — inventing generics that aren't in the type file.

**中文理解**

“它已经深入低效区了，在编造类型文件里没有的泛型。”

**英文原例**

> Attention degradation. The type definitions are still in context, but the signal on them is buried under everything we've added since. Clear and reload.

**中文理解**

“是注意力衰减。类型定义还在上下文中，只是它们的信号被后来加进来的内容埋住了。清空，再重新加载。”

> **译注：泛型。** 让一段代码可以处理不同类型、同时保留类型约束的写法。这里的例子是智能体没有遵循真实类型定义。

[上一个词条：注意力预算](/ai-coding-dictionary/attention-budget) · [下一个词条：高效区](/ai-coding-dictionary/smart-zone)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/attention-degradation)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fattention-degradationAttention%20degradation%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Attention%20degradation%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fattention-degradation) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/attention-degradation?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/attention-degradation)复制地址。
