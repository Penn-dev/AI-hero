---
title: "注意力关系"
slug: "attention-relationship"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

失败模式

# 注意力关系

两个 Token 之间的配对关系。有意义的配对比无关配对更能相互影响。含 N 个 Token 的上下文，大约有 N² 个这样的关系。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

预测每个 [Token](/ai-coding-dictionary/token) 时，[模型](/ai-coding-dictionary/model)会把[上下文](/ai-coding-dictionary/context)中的其他每个 Token 都纳入考虑，有的影响很大，有的几乎没有影响。两个 Token 之间的配对就是**注意力关系**。有意义的配对，例如“her”与“Sarah”，或者一次 `getUser()` 调用与它的 `function getUser` 定义，比无关配对更能相互影响。含 N 个 Token 的上下文，关系数量大致是 N² 的量级。

模型看起来拥有的理解能力，就体现在这些配对中。它能知道代词指谁，是因为“her”和“Sarah”之间的注意力关系很强；它能用正确参数调用函数，是因为调用位置与之前读过的定义之间的关系在起作用。这些都不是查表得到的，而是在每次[模型提供商请求](/ai-coding-dictionary/model-provider-request)中，针对每一对重新计算。

N² 这个数量值得认真想一想，因为它增长得比直觉更快：

| 上下文大小 | 配对数量，约 N² |
| --- | --- |
| 1,000 个 Token | 约 100 万 |
| 10,000 个 Token | 约 1 亿 |
| 100,000 个 Token | 约 100 亿 |

> **译注：表格与平方。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。N² 是 N 乘以 N，上表数字是原文的数量级示意。“her”是指代女性的代词，“Sarah”是人名；`getUser()` 和 `function getUser` 分别展示调用与定义的名字。

每个配对还不只计算一次。模型有多个注意力头。最前沿模型的确切数量没有公开，但五十到一百个是合理的猜测；每个头都会计算自己版本的每一种关系。因此，上表的每一组配对，都会在每个注意力头中重复。这是非常多的配对。

对任何具体任务，只有少数关系真正重要。你的指令与它约束的代码之间的配对，就是为数不多的关键关系之一；整个集合中的其他绝大部分都是噪声。而且，两者的增长速度不同：重要关系的数量大致不变，总关系数却随上下文大小呈平方增长。在一千个 Token 时，你关心的配对是百万分之一；到十万个 Token 时，它就是百亿分之一。这是[注意力预算](/ai-coding-dictionary/attention-budget)背后的算术；重要关系分到的份额太少时，人的感受就是[注意力衰减](/ai-coding-dictionary/attention-degradation)。

> **译注：注意力头。** 可以理解为模型中分别计算 Token 关系的不同部分。“五十到一百”是作者明确标为猜测的数字，不是已经公开或实测的模型配置。

_用法：_

**英文原例**

> It keeps confusing the two `user` symbols across the diff — sounds like we're in the [dumb zone](/ai-coding-dictionary/smart-zone).

**中文理解**

“它总把这次改动里的两个 `user` 符号搞混，看来我们进入[低效区](/ai-coding-dictionary/smart-zone)了。”

**英文原例**

> Yeah, the attention relationship between each call site and its declaration is fighting the other one — same token shape, different bindings. Rename one and the pairings sharpen.

**中文理解**

“是的，每个调用位置与自身声明之间的注意力关系，都在和另一个竞争。Token 长得一样，却对应不同对象。把其中一个改名，配对就更清楚了。”

[上一个词条：上下文知识](/ai-coding-dictionary/contextual-knowledge) · [下一个词条：注意力预算](/ai-coding-dictionary/attention-budget)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/attention-relationship)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fattention-relationshipAttention%20relationship%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Attention%20relationship%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fattention-relationship) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/attention-relationship?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/attention-relationship)复制地址。
