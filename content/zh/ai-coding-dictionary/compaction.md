---
title: "压缩"
slug: "compaction"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

交接

# 压缩

在内存中完成的交接：把上个会话的历史总结成摘要，用它开启新会话。这是有损的，用细节换取空间。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

在内存中完成的一次[交接](/ai-coding-dictionary/handoff)：把上个[会话](/ai-coding-dictionary/session)的历史总结成摘要，用摘要开启新会话。它从设计上就是有损的：对话记录是[一手来源](/ai-coding-dictionary/primary-source)，摘要是[二手来源](/ai-coding-dictionary/secondary-source)，用细节换取空间。可以由用户手动触发，也可以通过[自动压缩](/ai-coding-dictionary/autocompact)触发。

机制是这样的：[上下文窗口](/ai-coding-dictionary/context-window)有限，长会话会把它装满，每项[工具结果](/ai-coding-dictionary/tool-result)、每个读过的文件、每次走错的路都留在历史中。负担变重时，[智能体执行框架](/ai-coding-dictionary/harness)请[模型](/ai-coding-dictionary/model)总结会话，丢弃原始历史，再用摘要开启新会话。没有进入摘要的东西，就从上下文里消失了。有些执行框架会缓和这个问题：把旧对话记录留在磁盘上，并在摘要中留下指向它的[上下文指针](/ai-coding-dictionary/context-pointer)。二手来源链接回一手来源，因此摘要丢失的细节，可以通过重读原始记录找回。

摘要由模型撰写，因此可以通过提示词来引导。例如，下面这句可以让生成的材料更有针对性。

**英文 Prompt**

> Preserve the schema decisions

**中文版 Prompt**

> 保留关于数据结构定义的决定

时机也很重要。在阶段边界、计划已经确定之后压缩，不要在任务进行到一半时压缩。

与丢弃所有内容、从头开始的[清空](/ai-coding-dictionary/clearing)相比，压缩试图把关键内容带过去；清空则相信这些内容已经写在更合适的地方。

> **译注：有损摘要。** 有损表示不能保留全部细节。schema 是数据结构的定义；摘要中记录了什么，应由实际内容确认，不能只因压缩完成就认为所有决定都保住了。

_用法：_

**英文原例**

> [Context](/ai-coding-dictionary/context)'s getting heavy and I still have the test pass to do.

**中文理解**

“[上下文](/ai-coding-dictionary/context)已经很重了，我还要做一轮测试检查。”

**英文原例**

> Compact before you start — write what must survive into the summary prompt so the new session keeps the schema decisions and drops the exploration.

**中文理解**

“开始前先压缩。把必须保留的内容写进摘要提示词，让新会话留下关于数据结构的决定，丢掉探索过程。”

[上一个词条：工单](/ai-coding-dictionary/ticket) · [下一个词条：自动压缩](/ai-coding-dictionary/autocompact)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/compaction)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FcompactionCompaction%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Compaction%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcompaction) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/compaction?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/compaction)复制地址。
