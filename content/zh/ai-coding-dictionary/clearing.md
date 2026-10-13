---
title: "清空"
slug: "clearing"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

交接

# 清空

结束当前会话，开启新会话。下一条消息从空白会话和空白上下文窗口开始。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

结束当前[会话](/ai-coding-dictionary/session)，开启新会话。下一条消息从空白会话和空白[上下文窗口](/ai-coding-dictionary/context-window)开始。通常由用户主动进行。

清空能解决上下文受污染的问题。会话会积累一切：失败的尝试、走错的方向、过时的[工具结果](/ai-coding-dictionary/tool-result)、废弃的计划。[模型](/ai-coding-dictionary/model)在每个[工作轮次](/ai-coding-dictionary/turn)都会重新阅读它们，不好的历史会拖累新工作。长会话进行到后面，[智能体](/ai-coding-dictionary/agent)会变得含糊、更不遵守指令。你明确给出的要求被忽略，质量下滑，催它做得更好也没用，因为它需要穿过的噪声仍在[上下文](/ai-coding-dictionary/context)中。清空会移除这些噪声。

清空不会抹掉对话。多数[智能体执行框架](/ai-coding-dictionary/harness)会把会话历史保存在你的电脑上，因此对话记录仍然可以读取或恢复。消失的是智能体的工作状态：模型是[无状态的](/ai-coding-dictionary/stateless)，新会话不知道旧会话所知道的东西。如果会话里有下一轮工作需要的决定或进展，先让智能体写一份[交接材料](/ai-coding-dictionary/handoff-artifact)，再在新会话开始时指向它。

可以与[压缩](/ai-coding-dictionary/compaction)比较：压缩把会话总结后放进新上下文，而不是从空白开始。清空更直接，什么也不带过去，垃圾信息也一样。

> **译注：先保留需要的记录。** 本文区分当前工作状态与保存下来的历史记录。不同产品的清空、恢复和保存方式可能不同；重要决定应先写到后续能读取的文件中。

_用法：_

**英文原例**

> It's stuck looping on the failing test.

**中文理解**

“它卡在那个失败的测试上，来回打转。”

**英文原例**

> Just clear it — start a fresh session with the plan doc and the test file. No point fighting the existing context.

**中文理解**

“直接清空吧。带上计划文档和测试文件，开启一个新会话。没必要继续对抗现有上下文。”

[上一个词条：高效区](/ai-coding-dictionary/smart-zone) · [下一个词条：交接](/ai-coding-dictionary/handoff)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/clearing)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FclearingClearing%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Clearing%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fclearing) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/clearing?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/clearing)复制地址。
