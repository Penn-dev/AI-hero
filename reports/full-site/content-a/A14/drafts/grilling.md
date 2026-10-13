---
title: "追问"
slug: "grilling"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# 追问

与智能体完善设计构想的方法：智能体用苏格拉底式访谈，一次讨论一个决定。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

与[智能体](/ai-coding-dictionary/agent)一起完善[设计构想](/ai-coding-dictionary/design-concept)的方法：智能体用苏格拉底式访谈向用户提问，一次讨论一个决定，并为每个问题给出推荐答案。这会减缓急着写出最终计划的冲动，在构想稳定之前，不撰写[交接材料](/ai-coding-dictionary/handoff-artifact)。

需要这种方法，是因为智能体会悄悄填补空白。要求它根据两行提示词写[规格](/ai-coding-dictionary/spec)，它不会在你尚未决定的地方停下，而会选择默认答案并写进去。结果看起来完整，猜测与真正做出的选择却无法区分。你因此很晚才发现问题，可能是在审查时，也可能是功能做出来后，发现它用你从未选择的方式处理边缘情况。追问把这个过程倒过来：智能体必须问，而不是猜。

这是一种[人工参与](/ai-coding-dictionary/human-in-the-loop)的方法，你的回答就是输入。如果某个问题无法靠对话回答，你必须看见实物才能判断，就转向[原型制作](/ai-coding-dictionary/prototyping)。

> **译注：苏格拉底式访谈。** 通过连续提问，澄清想法、理由和隐藏假设。这里不是一次抛出一大串问题，而是一次处理一个决定。边缘情况是不常发生但会影响行为的特殊情形。

_用法：_

**英文原例**

> It went straight to writing the spec and got the cancellation logic wrong.

**中文理解**

“它直接开始写规格，结果把取消逻辑弄错了。”

**英文原例**

> Grill it first — make it ask you about partial cancels, refunds, and timing before it commits anything to the doc. Cheaper to resolve in conversation than in code.

**中文理解**

“先追问清楚。让它在把任何内容写进文档之前，问你部分取消、退款和时机。对话里解决，比写成代码后再改便宜。”

[上一个词条：设计构想](/ai-coding-dictionary/design-concept) · [下一个词条：原型制作](/ai-coding-dictionary/prototyping)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/grilling)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FgrillingGrilling%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Grilling%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fgrilling) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/grilling?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/grilling)复制地址。
