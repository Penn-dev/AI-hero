---
title: "规格"
slug: "spec"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

交接

# 规格

描述一项跨会话工作的交接材料，说明要构建什么，而不是每个会话怎样完成自己的部分。由工单组成。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

描述一项跨[会话](/ai-coding-dictionary/session)工作的[交接材料](/ai-coding-dictionary/handoff-artifact)，说明要构建什么，而不是每个会话怎样完成自己的部分。它随着工作进展而变化，由[工单](/ai-coding-dictionary/ticket)组成。

规格存在，是因为会话可以丢弃，大型工作却不行。凡是超过一个[上下文窗口](/ai-coding-dictionary/context-window)能承担的工作，都需要在[上下文](/ai-coding-dictionary/context)之外有个保存之处：放在智能体[环境](/ai-coding-dictionary/environment)中，能够在[清空](/ai-coding-dictionary/clearing)后保留的位置，可以是仓库文件、GitHub issue，或者智能体能访问的工单系统。规格就是这个位置，存放目标、限制、已经做出的决定，以及带状态的工单列表。任何新会话读完，就能知道进展，而不用继承上一会话积累的噪声。

规格有几种常见形式，大多来自团队原本记录事情的方式。_产品需求文档_，PRD，侧重面向用户的“是什么”和“为什么”，包括功能、行为、验收标准。 _设计文档_ 或 _RFC_ 更偏技术，记录选定方法、被否决的替代方案和取舍。较小的跨会话功能，用一个普通的 `plan.md` 加上工单检查清单，也能完成同样工作。形式不如职责重要。对[智能体](/ai-coding-dictionary/agent)来说，它们都是同一样东西：每个会话开始时读取、持久保存的意图说明。

> **译注：几种文档。** 验收标准说明做到什么才算完成；RFC 是征求意见或讨论方案的文档；GitHub issue 是仓库里的问题或任务记录。文件名 `plan.md` 是原文示例。

_用法：_

**英文原例**

> Should this all be one session?

**中文理解**

“这些工作应该全放在一个会话里吗？”

**英文原例**

> No, write it up as a spec — break it into tickets, run each one in its own session. Trying to do the whole thing in a single context will hit the [dumb zone](/ai-coding-dictionary/smart-zone) before you're halfway.

**中文理解**

“不，写成规格，拆成工单，每个工单在自己的会话里运行。想在一个上下文里做完全部，还没到一半就会进入[低效区](/ai-coding-dictionary/smart-zone)。”

[上一个词条：交接材料](/ai-coding-dictionary/handoff-artifact) · [下一个词条：工单](/ai-coding-dictionary/ticket)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/spec)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FspecSpec%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Spec%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fspec) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/spec?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/spec)复制地址。
