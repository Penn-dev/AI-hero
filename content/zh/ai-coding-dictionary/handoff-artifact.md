---
title: "交接材料"
slug: "handoff-artifact"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

交接

# 交接材料

用于承载交接内容的文档，由一个会话写下，供另一个会话读取。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

用于承载[交接](/ai-coding-dictionary/handoff)内容的文档，由一个[会话](/ai-coding-dictionary/session)写入[环境](/ai-coding-dictionary/environment)，供另一个会话读取。[规格](/ai-coding-dictionary/spec)、[工单](/ai-coding-dictionary/ticket)和计划文档，都是交接材料。

为什么要写：因为[模型](/ai-coding-dictionary/model)是[无状态的](/ai-coding-dictionary/stateless)，会话[清空](/ai-coding-dictionary/clearing)后，其中的东西都不会留下。决定、限制、做了一半的计划，会随承载它们的[上下文](/ai-coding-dictionary/context)一起消失。环境会保留。把重要状态写进文件，就是把它移到下一会话能够读回的地方。

交接材料是[二手来源](/ai-coding-dictionary/secondary-source)，是对会话工作的描述，不是工作本身。因此，它才足够精简，可以让新会话了解情况；但也因此可能误导新会话。它记录的是撰写它的会话所相信的东西，遗漏或弄错的内容，对读者都是不可见的。重要的判断，下一会话应该对照[一手来源](/ai-coding-dictionary/primary-source)，例如代码、测试，进行验证，而不是直接继承。

好的交接材料要面向零上下文会话撰写。写具体文件路径，不要写“我们讨论过的那个文件”；写决定了什么，以及为什么，免得新会话重新争论；写清哪些做完了、哪些还没做。告诉撰写方这份材料要交给谁，会有帮助：

**英文 Prompt**

> write a handoff doc for a fresh session that knows nothing about this work

**中文版 Prompt**

> 为一个完全不了解这项工作的新会话，写一份交接文档

另一种承载方式是[压缩](/ai-coding-dictionary/compaction)，在内存中进行总结。文档有两个优势：它保存在磁盘上，你可以在其他工作依赖它之前阅读和纠正；而且它能重复使用，同一份规格可以让五个并行会话了解任务。

> **译注：材料与证据。** 交接材料记录进展，一手来源则是支持这些结论的原始代码、测试或记录。给出准确路径和验证结果的位置，有助于接手者核对。

_用法：_

**英文原例**

> How do I split this between the planning [agent](/ai-coding-dictionary/agent) and the implementing one?

**中文理解**

“我该怎么把工作分给规划[智能体](/ai-coding-dictionary/agent)和实施智能体？”

**英文原例**

> Have the planner write a handoff artifact — file paths, decisions, constraints. The implementer's session opens with a pointer to the artifact and works from it as its brief.

**中文理解**

“让规划者写交接材料，包括文件路径、决定和限制。实施者的会话一开始就指向这份材料，并把它作为工作说明。”

[上一个词条：二手来源](/ai-coding-dictionary/secondary-source) · [下一个词条：规格](/ai-coding-dictionary/spec)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/handoff-artifact)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhandoff-artifactHandoff%20artifact%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Handoff%20artifact%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhandoff-artifact) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/handoff-artifact?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/handoff-artifact)复制地址。
