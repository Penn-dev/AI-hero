---
title: "注意力预算"
slug: "attention-budget"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

失败模式

# 注意力预算

每个 Token 能分配给其余上下文的影响力有限。这是每个 Token 各自的预算，不会随着上下文变长而增加。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

每个 [Token](/ai-coding-dictionary/token) 能分配给其余[上下文](/ai-coding-dictionary/context)的影响力有限。给[某一种关系](/ai-coding-dictionary/attention-relationship)较多影响力，留给其他关系的就少了。这份预算属于每个 Token，不会随着上下文变长而增加，所以长[会话](/ai-coding-dictionary/session)会稀释信息的影响。

可以把它想成信号和噪声。你的指令是音量固定的信号，[上下文窗口](/ai-coding-dictionary/context-window)里的其他每个 Token，都是与它竞争的声音。指令从未变小声，它还在那里，一个字也没变；但上下文越长，周围房间里的声音就越响，信噪比就越低。上下文只有一万个 Token 时最响亮的指令，到十五万个 Token 时就成了背景嗡鸣。这就是[注意力衰减](/ai-coding-dictionary/attention-degradation)背后的机制：模型没有忘记，信号只是淹没在噪声中了。

症状看起来像不服从：智能体一开始答应遵守某项限制，后来却逐渐偏离，再粘贴一次限制也只能短暂起效。原因不在指令本身，而在窗口里其他所有与它竞争的内容。

你能控制的是哪些内容进入上下文。对任务没有帮助的内容并非中立，它会给所有有用内容增加噪声。让窗口保持精简；积累的上下文不再值得保留时，就[清空](/ai-coding-dictionary/clearing)；重新说明重要限制，而不是相信早先提过一次就会一直有效。

> **译注：信噪比。** 有用信号相对于干扰的强弱。这里用声音比喻解释信息竞争；一万和十五万 Token 是作者的示例，不是本页测得的统一阈值。

_用法：_

**英文原例**

> Why does it keep ignoring the schema I pasted at the top?

**中文理解**

“为什么它总是忽略我一开始粘贴的数据结构定义？”

**英文原例**

> We're well into the [dumb zone](/ai-coding-dictionary/smart-zone) — every token's attention budget is fixed, but the context kept growing. The signal on the schema is now competing with thousands of newer tokens.

**中文理解**

“我们已经深入[低效区](/ai-coding-dictionary/smart-zone)了。每个 Token 的注意力预算固定，但上下文一直在增长。数据结构定义的信号现在要与成千上万个新 Token 竞争。”

[上一个词条：注意力关系](/ai-coding-dictionary/attention-relationship) · [下一个词条：注意力衰减](/ai-coding-dictionary/attention-degradation)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/attention-budget)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fattention-budgetAttention%20budget%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Attention%20budget%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fattention-budget) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/attention-budget?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/attention-budget)复制地址。
