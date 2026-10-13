---
title: "高效区"
slug: "smart-zone"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

失败模式

# 高效区

会话早期，智能体敏锐而专注；随着会话变长，它逐渐进入低效区，变得粗心、健忘、错误更多。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

在[会话](/ai-coding-dictionary/session)早期，[智能体](/ai-coding-dictionary/agent)处于“高效区”，敏锐、专注，能很好地回想已有信息。随着会话变长，它会逐渐进入“低效区”：更粗心、更健忘、错误更多，也更容易出现忠实性[幻觉](/ai-coding-dictionary/hallucination)。同一个[模型](/ai-coding-dictionary/model)、同一个[执行框架](/ai-coding-dictionary/harness)，只是[上下文](/ai-coding-dictionary/context)更多了。这是[注意力衰减](/ai-coding-dictionary/attention-degradation)给人的实际感受。在最前沿模型上，低效区通常从大约 12.5 万到 15 万个 [Token](/ai-coding-dictionary/token) 开始，不过对此仍有争议。会话膨胀时就[清空](/ai-coding-dictionary/clearing)或[压缩](/ai-coding-dictionary/compaction)，别硬撑着继续。

能力下降是渐进的，因此很容易被忽略。没有报错信息，也没有可见边界，智能体只是先表现得略差一点，然后差得明显。常见迹象包括：忘记二十轮之前给出的指令，重复已经纠正过的错误，或者自信地说出与上下文相矛盾的内容。因为变化平滑，人们通常会继续推进、重新解释，而这又增加了上下文，让问题更严重。

这两个区域与[上下文窗口](/ai-coding-dictionary/context-window)的容量上限并不一致。即使窗口大部分还空着，会话也可能已经深入低效区。容量上限是执行框架拒绝继续的位置，质量却早在那之前就下降了。围绕高效区规划，不要围绕窗口容量规划。任务实际可用的预算，是智能体还能表现良好时的 Token 数，而不是技术上最多能装下多少 Token。

高效区也是一份预算，无关工作会消耗它。会话中的每个任务都会用掉 Token，因此在同一会话中开始第二个任务，就意味着离低效区更近。每个会话只做一个任务，可以让每项任务都用到会话最敏锐的那一段。如果一个任务大于一个高效区，就把它拆开：在自然的边界处[交接](/ai-coding-dictionary/handoff)或压缩，让新会话完成下一部分。

> **译注：两个称呼的范围。** 高效区和低效区对应原文 smart zone 与 dumb zone，是作者描述工作表现的说法，不是产品里的固定开关。12.5 万到 15 万是原文带有争议说明的估计，不应当作所有模型的保证值。忠实性幻觉指输出偏离了已经提供的信息。

_用法：_

**英文原例**

> It nailed the first three components and just butchered the fourth.

**中文理解**

“前三个组件它都做得很好，第四个却弄得一团糟。”

**英文原例**

> You're out of the smart zone — same model, just deep into the dumb zone now. Compact and reload the plan, the next component will land.

**中文理解**

“你已经出了高效区。同一个模型，现在只是深入低效区了。压缩后重新加载计划，下一个组件就能做好。”

[上一个词条：注意力衰减](/ai-coding-dictionary/attention-degradation) · [下一个词条：清空](/ai-coding-dictionary/clearing)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/smart-zone)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsmart-zoneSmart%20zone%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Smart%20zone%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsmart-zone) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/smart-zone?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/smart-zone)复制地址。
