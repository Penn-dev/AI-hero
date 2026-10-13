---
title: "工单"
slug: "ticket"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

交接

# 工单

限定一个会话工作范围的交接材料，可以独立存在，也可以属于一份规格。工单之间可以相互形成前置依赖。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

限定一个[会话](/ai-coding-dictionary/session)工作范围的[交接材料](/ai-coding-dictionary/handoff-artifact)。它可以独立存在，也可以作为[规格](/ai-coding-dictionary/spec)下的子项。工单可以阻塞同级其他工单，也可以被它们阻塞，因此工作顺序来自依赖图，而不是一份线性计划。

定义它的关键限制是大小：一个会话。工单应该在会话离开[高效区](/ai-coding-dictionary/smart-zone)之前做完，而且这个限制可以检验。如果你的工单经常还没完成，会话就已经开始变差，工单就太大，应当拆分。如果每个会话都把大部分[上下文](/ai-coding-dictionary/context)花在准备上，之后只工作五分钟，工单就太小，应当合并。

好的工单要写给没有其他上下文的读者。目标、验收标准、指向相关文件和决定的[上下文指针](/ai-coding-dictionary/context-pointer)，这些信息应足够让会话开始工作，不必重新推导上一会话已经知道的事情。

依赖图也让并行成为可能。相互独立的工单，也就是图的叶节点，可以同时在各自会话中运行。这是同时运行多个智能体的有效方式。在[软件工厂](/ai-coding-dictionary/software-factory)中，一张工单被标为就绪，本身就是启动对应会话的触发器。

> **译注：依赖与阻塞。** 如果任务 B 必须等任务 A 完成，A 就是 B 的前置依赖。所谓阻塞，是前置条件尚未满足。判断哪张工单现在可以做，要看它的前置条件是否已经满足。

_用法：_

**英文原例**

> Where do I start on the migration spec?

**中文理解**

“迁移规格应该从哪里开始？”

**英文原例**

> Look at the ticket graph — the schema change blocks the backfill, the backfill blocks the API switch. Pick a leaf and run a session on it.

**中文理解**

“看工单依赖图。数据结构变更阻塞数据回填，数据回填阻塞 API 切换。挑一个叶节点，开会话处理它。”

> **译注：回填。** 为已有数据补上新结构需要的字段或内容。这里先改结构、再回填、再切换接口的顺序来自原例。

[上一个词条：规格](/ai-coding-dictionary/spec) · [下一个词条：压缩](/ai-coding-dictionary/compaction)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/ticket)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FticketTicket%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Ticket%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fticket) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/ticket?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/ticket)复制地址。
