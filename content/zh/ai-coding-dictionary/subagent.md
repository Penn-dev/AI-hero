---
title: "子智能体"
slug: "subagent"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

记忆与行为引导

# 子智能体

由另一个智能体通过工具调用启动的智能体。它在自己的会话中运行，返回一项工具结果，不能继续启动更下层子智能体。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

由另一个智能体通过[工具调用](/ai-coding-dictionary/tool-call)启动的[智能体](/ai-coding-dictionary/agent)。它在自己的[会话](/ai-coding-dictionary/session)和[上下文窗口](/ai-coding-dictionary/context-window)中运行，并返回一项[工具结果](/ai-coding-dictionary/tool-result)。它区别于[交接](/ai-coding-dictionary/handoff)：父智能体明确期待它返回，而交接没有返回路径。**子智能体不能继续启动更下层的子智能体**，这棵树只有一层。子智能体存在的目的是隔离[上下文](/ai-coding-dictionary/context)，不是搭建多级结构。

重点是把嘈杂工作留在父智能体上下文之外。广泛搜索或长时间读取文件，会产生一页页工具结果，大部分内容只在找到答案前的短时间内有用。如果在父智能体里进行，它们会在之后整个会话中继续占据父上下文；如果放进子智能体，噪声就填进一个可丢弃的窗口，只有最终报告进入父上下文。报告是[二手来源](/ai-coding-dictionary/secondary-source)：父智能体得到的是子智能体对发现内容的描述，不是原始结果，所以报告遗漏的东西，对父智能体不可见。

子智能体也可以并发运行，父智能体能同时派出多个子智能体，处理相互独立的工作。

> **译注：这里的结构约束。** 本文描述只允许一层子智能体的模式。使用具体执行框架时，需要查看它对子智能体的支持和限制。并发表示多个任务在同一时段推进；二手报告仍需在重要结论上回查原始材料。

_用法：_

**英文原例**

> The grep results are blowing out my context.

**中文理解**

“grep 结果快把我的上下文撑满了。”

**英文原例**

> Spawn a subagent to do the search — it'll burn its own context window on the noise and report back the two file paths you actually need.

**中文理解**

“启动一个子智能体负责搜索。让它用自己的上下文窗口处理噪声，只返回你真正需要的那两个文件路径。”

[上一个词条：Skill](/ai-coding-dictionary/skill) · [下一个词条：人工参与](/ai-coding-dictionary/human-in-the-loop)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/subagent)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FsubagentSubagent%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Subagent%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsubagent) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/subagent?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/subagent)复制地址。
