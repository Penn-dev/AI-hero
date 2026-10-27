---
title: "自动压缩"
slug: "autocompact"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

交接

# 自动压缩

上下文窗口接近装满时，由执行框架自动触发的压缩。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[上下文窗口](/ai-coding-dictionary/context-window)接近装满时，由[智能体执行框架](/ai-coding-dictionary/harness)自动触发的[压缩](/ai-coding-dictionary/compaction)。

执行框架监测上下文窗口装了多少内容。超过某个阈值时，往往在 80% 左右，它会暂停，请[模型](/ai-coding-dictionary/model)总结到当前为止的[会话](/ai-coding-dictionary/session)，再用摘要开启新会话。之后工作继续，好像什么都没发生。

但其实发生了变化。压缩是有损的，而自动压缩会在并非由你选择的时刻丢失细节。手动压缩发生在阶段边界，你可以告诉模型要保留什么；自动压缩则会在任务中途、任何达到阈值的时候触发。它可能发生在重构到一半时，由摘要自行决定哪些决定值得保留。典型症状是：[智能体](/ai-coding-dictionary/agent)继续自信地工作，却悄悄忘了你一小时前确立的限制，直到它的工作开始与限制矛盾，你才发现。

防范办法是别让它触发。留意上下文指示器，在自然边界手动压缩；或者把决定写进磁盘上的计划文档或[交接材料](/ai-coding-dictionary/handoff-artifact)，这样摘要就无法把它们丢掉。多数执行框架也允许你自定义缓冲空间，把阈值提前、推后，或者完全关闭自动压缩，从而调整触发前还剩多少余量。

> **译注：阈值与功能。** 80% 是原文中的常见值描述，不是每个产品的固定值。是否可调整阈值或关闭自动压缩，要看使用的工具。保存在文件里的决定仍需要由后续会话读取。

_用法：_

**英文原例**

> It doesn't seem to remember what we decided about the schema earlier.

**中文理解**

“它好像不记得我们之前关于数据结构做的决定了。”

**英文原例**

> Autocompact fired between [turns](/ai-coding-dictionary/turn) — the early decisions got summarised and we must have lost something. Reload the plan doc, or compact manually next time so you control what gets kept.

**中文理解**

“自动压缩在两个[工作轮次](/ai-coding-dictionary/turn)之间触发了。早期决定被总结，我们肯定丢了些内容。重新加载计划文档，或者下次手动压缩，好让你控制保留什么。”

[上一个词条：压缩](/ai-coding-dictionary/compaction) · [下一个词条：记忆系统](/ai-coding-dictionary/memory-system)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/autocompact)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FautocompactAutocompact%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Autocompact%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fautocompact) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/autocompact?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/autocompact)复制地址。
