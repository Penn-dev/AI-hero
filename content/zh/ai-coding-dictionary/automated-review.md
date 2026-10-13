---
title: "自动审查"
slug: "automated-review"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# 自动审查

一个智能体审查另一个智能体的工作，通常使用不同模型或系统提示词。它会作判断，因此具有非确定性。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

一个[智能体](/ai-coding-dictionary/agent)审查另一个智能体的工作，通常使用不同的[模型](/ai-coding-dictionary/model)或[系统提示词](/ai-coding-dictionary/system-prompt)。它具有非确定性，因为它要作判断。可以在任何阶段进行：合并 PR 之前、事后查看提交历史，或者会话中途作为[子智能体](/ai-coding-dictionary/subagent)运行。CI 中让大语言模型作评判，也属于自动审查，不是[自动检查](/ai-coding-dictionary/automated-check)。分类取决于断言实际 _做什么_ ，而不是它在哪里运行。

与工作智能体分开，才让审查起作用。让写代码的智能体审查自己的工作，收效很小：产生缺陷的那个[会话](/ai-coding-dictionary/session)里，也装着产生缺陷的推理，智能体会把自己的结论重新读回来，当作确认。拥有新[上下文窗口](/ai-coding-dictionary/context-window)的审查者，没有这种执着；它像陌生人一样看改动差异，而这正是审查所需要的。不同模型或审查专用系统提示词，可以进一步加强这一点：不同的盲点，以及聚焦你真正关心内容的系统提示词，例如安全、API 约定、性能，而不是含糊的一句“找找问题”。

**英文 Prompt（泛泛的反例）**

> look for problems

**中文版 Prompt（泛泛的反例）**

> 找找问题

它处于其他审查层之间。自动检查是确定性的，抓能够机械断言的问题；[人工审查](/ai-coding-dictionary/human-review)成本高，最难扩展规模。自动审查居中：用机器成本抓需要判断的问题，例如误导性的函数名、遗漏的边缘情况。因为它具有非确定性，所以会漏报，也会把没有问题的地方标出来。把它当作人工查看之前提高最低质量的过滤层，不要当作取代人工的关卡。

_避免使用：_“AI review”，AI 审查，或“agent review”，智能体审查。它们太含糊，无法与工作智能体本身区分。

> **译注：CI 与 API 约定。** CI 是提交改动后自动运行验证的持续集成流程；API 约定说明接口接受什么、返回什么、怎样报错。放进 CI 的模型判断，仍不是确定性检查。

_用法：_

**英文原例**

> We're getting too many bad PRs from the [AFK](/ai-coding-dictionary/afk) runs.

**中文理解**

“[AFK](/ai-coding-dictionary/afk) 工作交来的糟糕 PR 太多了。”

**英文原例**

> Add an automated review step before merge — different model, separate system prompt, scoped to security and contract changes.

**中文理解**

“在合并前加一步自动审查，用不同模型、独立系统提示词，范围限定在安全和接口约定变更。”

[上一个词条：自动检查](/ai-coding-dictionary/automated-check) · [下一个词条：人工审查](/ai-coding-dictionary/human-review)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/automated-review)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fautomated-reviewAutomated%20review%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Automated%20review%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fautomated-review) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/automated-review?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/automated-review)复制地址。
