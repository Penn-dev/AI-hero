---
title: "AFK"
slug: "afk"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# AFK

Away from keyboard，离开键盘。用户启动会话后，留下智能体无人看管地运行的一种工作方式。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Away from keyboard，离开键盘。一种工作方式：用户启动[会话](/ai-coding-dictionary/session)后，留下[智能体](/ai-coding-dictionary/agent)无人看管地运行。它能成倍增加 [AI](/ai-coding-dictionary/ai) 编程的产出量，你睡觉、吃饭或做别的事情时，许多个 AFK 会话可以并行运行。要安全地这样做，通常需要较宽松的[权限模式](/ai-coding-dictionary/permission-mode)，再加上[沙箱隔离](/ai-coding-dictionary/sandbox)。

你不在场时，智能体处理歧义的方式会不同。你看着时，含糊的决定会变成问题，由你回答；你走开后，智能体会选择一个默认答案继续，而此后的每个决定都建立在那个猜测上。典型失败是：你回来看到几小时已经完成、自信满满的工作，却全建立在前十分钟的一次错误决定上。工作并不粗糙，它逻辑连贯，只是连贯地做错了方向。

既然运行期间不能提供输入，就在前后提供。运行前，先解决歧义，通过一次[追问](/ai-coding-dictionary/grilling)会话或写下来的[规格](/ai-coding-dictionary/spec)，减少智能体独自填补的空白。运行中，用[自动检查](/ai-coding-dictionary/automated-check)和[自动审查](/ai-coding-dictionary/automated-review)代替你没有投入的注意力，能机械发现的问题尽早失败。运行后，产出应该是可以审查的东西，例如 PR，而不是已经合并的改动。AFK 没有取消[人工审查](/ai-coding-dictionary/human-review)，只是把它全部延后到最后，所以最后交来的成果必须值得审查。这也是 [AX](/ai-coding-dictionary/ax) 在 AFK 工作中最重要的原因，无人看管时，环境是智能体唯一的支持。

_避免使用：_“background agent”，后台智能体。它围绕机器描述“在后台运行”，而不是围绕人的工作方式描述“用户已经走开”。AFK 说清了真正重要的事实：用户没有看着。

_用法：_

**英文原例**

> I'm running this AFK — three sandboxed agents on the refactor, reviewing the PRs in the morning.

**中文理解**

“我要让这件事 AFK 运行。三个沙箱里的智能体做重构，早上再审查 PR。”

**英文原例**

> [Bypass permissions](/ai-coding-dictionary/agent-mode)?

**中文理解**

“[跳过权限询问](/ai-coding-dictionary/agent-mode)？”

**英文原例**

> Yeah, read-only [filesystem](/ai-coding-dictionary/filesystem), no network.

**中文理解**

“是的，只读[文件系统](/ai-coding-dictionary/filesystem)，没有网络。”

> **译注：示例的限制。** PR 是供审查的改动请求，合并是把改动正式并入目标版本。原对话同时提到重构与只读文件系统，这里如实保留；只读会限制写入，实际任务如何产生可交付改动仍需核对环境，不能把示例当作已验证的可运行配置。

[上一个词条：人工参与](/ai-coding-dictionary/human-in-the-loop) · [下一个词条：自动检查](/ai-coding-dictionary/automated-check)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/afk)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FafkAFK%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=AFK%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fafk) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/afk?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/afk)复制地址。
