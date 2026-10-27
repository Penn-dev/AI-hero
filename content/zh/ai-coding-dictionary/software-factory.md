---
title: "软件工厂"
slug: "software-factory"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# 软件工厂

由触发器而非人来启动智能体会话的工作系统，让更多工作以 AFK 方式运行，把人的注意力留给确实需要参与的决定。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

由触发器启动[智能体](/ai-coding-dictionary/agent)[会话](/ai-coding-dictionary/session)，而不是由人启动的工作系统。触发器可以是创建 issue、定时安排、CI 失败、另一个会话完成。这样，更多工作以 [AFK](/ai-coding-dictionary/afk) 方式运行，人的注意力留给仍然需要[人工参与](/ai-coding-dictionary/human-in-the-loop)的决定。

没有工厂，每个会话都要有人发起。即使工作全程 AFK，也得等一个人打开会话、指向[工单](/ai-coding-dictionary/ticket)、让它开始。团队希望交付量超过这种方式能支持的程度。工厂把人从启动会话这一步移开，但不一定从其他任何步骤移开。

常见触发器与它们启动的会话：

| 触发器 | 启动什么会话 | 例子 |
| --- | --- | --- |
| 创建 issue 或添加标签 | 探索、修复缺陷、实施 | 带 `ready-for-agent` 标签的 issue 启动一个会创建 PR 的会话 |
| 定时安排，cron | 定期维护 | 每晚修一条 lint 规则 |
| CI 失败或监控告警 | 诊断、尝试修复 | 主分支构建失败后，启动会话找出导致问题的提交，并提出修复 |
| 另一个会话完成 | 后续工作 | 一个智能体创建 PR，触发[自动审查](/ai-coding-dictionary/automated-review)，审查意见再触发返修会话 |

> **译注：表格与流程。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。cron 是按时间安排程序运行的机制；CI 是自动验证流程；PR 是供审查的改动请求；lint 检查代码规则。`ready-for-agent` 是原文举出的标签名。

工厂不必覆盖整个软件流程。一个 cron 任务，只运行一种会话、创建一个可审查 PR，也算工厂。从这么小的范围开始有用：范围窄的循环会生成小而相似的 PR，审查它们，可以看出这个循环在扩大之前值得信任到什么程度。

人可以参与工厂的任何位置，例如撰写并标记会触发会话的 issue，在实施前批准计划，在合并前进行[人工审查](/ai-coding-dictionary/human-review)。决定哪些判断仍由人负责，是主要设计问题。整个代码库或其中一部分，如果没有人审查工厂的产出，就是[黑灯工厂](/ai-coding-dictionary/dark-factory)。

_用法：_

**英文原例**

> Who fixed all the `no-floating-promises` violations?

**中文理解**

“谁修好了所有违反 `no-floating-promises` 的地方？”

**英文原例**

> The factory. Cron job picks one lint rule a night, opens a PR. I just review it in the morning.

**中文理解**

“工厂。定时任务每晚挑一条 lint 规则，创建一个 PR。我只需要早上审查。”

> **译注：规则名。** `no-floating-promises` 是检查未妥善处理 Promise 的规则。Promise 表示一个之后才会完成的操作；这里保留名称用于对照原例。

[上一个词条：AX](/ai-coding-dictionary/ax) · [下一个词条：黑灯工厂](/ai-coding-dictionary/dark-factory)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/software-factory)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsoftware-factorySoftware%20factory%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Software%20factory%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsoftware-factory) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/software-factory?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/software-factory)复制地址。
