---
title: "权限模式"
slug: "permission-mode"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工具与环境

# 权限模式

智能体模式中负责权限控制的部分，决定哪些工具调用触发权限请求，哪些自动运行。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[智能体模式](/ai-coding-dictionary/agent-mode)中负责权限控制的部分：哪些[工具调用](/ai-coding-dictionary/tool-call)触发[权限请求](/ai-coding-dictionary/permission-request)，哪些自动运行。在[执行框架](/ai-coding-dictionary/harness)开始把行为指令也打包进去之前，这就是模式系统最初的用途。

执行框架通常提供一系列不同宽松程度的模式：

| 模式 | 读取 | 写入与 shell | 典型用途 |
| --- | --- | --- | --- |
| Read-only / plan，只读或规划 | 自动 | 阻止 | 研究、规划、审查 |
| Default，默认 | 自动 | 询问 | 日常有人监督的工作 |
| Auto-edit，自动编辑 | 自动 | 编辑自动，shell 询问 | 可信代码库、机械性修改 |
| “Yolo” / full-auto，完全自动 | 自动 | 自动 | [沙箱](/ai-coding-dictionary/sandbox)、[AFK](/ai-coding-dictionary/afk) 工作 |

> **译注：模式表。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。英文名称保留便于对照；shell 是执行命令的程序。具体产品的模式名称和允许范围可能不同，应以实际权限说明为准。

选择哪一级，是安全与打断之间的取舍，两种失败都会带来实际感受。太严格，你就成了瓶颈：[智能体](/ai-coding-dictionary/agent)每隔几秒就为了无害的读取停下来，你机械地点批准，批准就不再有意义。走过场式批准兼具两种最坏结果，所有打断都在，保护却没有。太宽松，智能体又会编辑文件、运行那些你本来想先看一眼的命令。

最宽松的设置，在沙箱内最有理由采用，因为错误[工具](/ai-coding-dictionary/tool)调用的影响范围受到限制。沙箱外，多数人会选择自动批准读取，并对任何不可逆操作保持[人工参与](/ai-coding-dictionary/human-in-the-loop)。

_用法：_

**英文原例**

> It paused on every grep — totally killed the AFK run.

**中文理解**

“每次 grep 都暂停，彻底打断了 AFK 工作。”

**英文原例**

> Loosen the permission mode for read-only tools, keep prompting on writes and shell. Most permission requests on a research [session](/ai-coding-dictionary/session) are noise.

**中文理解**

“只读工具的权限模式放宽些，写入和 shell 仍保留询问。研究[会话](/ai-coding-dictionary/session)中的多数权限请求都是噪声。”

> **译注：示例中的 grep。** 一种搜索文本的命令。这里是在说明作者的权限取舍，没有为当前工具或账户更改权限。

[上一个词条：权限请求](/ai-coding-dictionary/permission-request) · [下一个词条：智能体模式](/ai-coding-dictionary/agent-mode)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/permission-mode)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fpermission-modePermission%20mode%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Permission%20mode%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fpermission-mode) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/permission-mode?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/permission-mode)复制地址。
