---
title: "工具"
slug: "tool"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工具与环境

# 工具

执行框架提供给智能体调用的函数，例如 Read、Write、Bash、Search。智能体通过工具感知环境，并对环境采取行动。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[智能体执行框架](/ai-coding-dictionary/harness)提供给[智能体](/ai-coding-dictionary/agent)调用的函数，例如 Read、Write、Bash、Search。工具让智能体能够感知[环境](/ai-coding-dictionary/environment)，并对环境采取行动：它只能通过[工具结果](/ai-coding-dictionary/tool-result)看到环境，只能通过[工具调用](/ai-coding-dictionary/tool-call)改变环境。每次工具调用都会多用一次[模型提供商请求](/ai-coding-dictionary/model-provider-request)，因为结果必须先返回模型，模型才能决定下一步做什么。

多数编程智能体自带的工具：

| 工具 | 作用 |
| --- | --- |
| Read | 读取文件内容，并作为工具结果返回 |
| Write | 在[文件系统](/ai-coding-dictionary/filesystem)中创建或编辑文件 |
| Bash | 运行 shell 命令，并返回输出 |
| Search | 在整个代码库中查找符合某种模式的文件或文本 |

> **译注：表格与名称。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。这些是原文举出的工具名。函数是一段可调用的程序功能；shell 是接收并执行命令的程序；文件系统负责保存和组织文件。

一个工具由三样东西定义：名称、说明它能做什么的描述，以及规定参数格式的数据结构。执行框架会在每次请求中把这些定义发送给[模型](/ai-coding-dictionary/model)。模型选择工具的方式与生成其他内容一样，都是写出 [Token](/ai-coding-dictionary/token)，只不过这次写出的是一条带参数的结构化调用。模型从不亲自执行操作。执行框架读取调用、运行函数，再把结果送回来。

工具列表决定了智能体能做什么。再强的模型，如果工具集有限，组成的智能体能力范围也有限：它会把所有事都交给手头能用的工具。这就是智能体如此依赖 Bash 的原因，一个 shell 工具就能触及系统的大部分功能。要清楚地给智能体增加一项能力，就为它添加对应工具。[MCP](/ai-coding-dictionary/mcp) 是从执行框架外部接入工具的标准。

工具定义在每次请求中都会占用[上下文](/ai-coding-dictionary/context)。因此，工具集很大时，还没调用任何工具，就已经有了固定成本；许多工具的描述过于相似，也会让模型更难选对工具。

_用法：_

**英文原例**

> Can the agent query staging directly?

**中文理解**

“智能体能直接查询预发布环境吗？”

**英文原例**

> Add a `psql` tool to the harness, scoped read-only on staging. Without a tool for it, the agent's blind to anything outside the filesystem.

**中文理解**

“给执行框架增加一个 `psql` 工具，权限限定为只读访问预发布环境。没有对应工具，智能体就看不到文件系统之外的东西。”

> **译注：示例的环境。** 预发布环境是软件正式上线前用于检查的环境；`psql` 是访问 PostgreSQL 数据库的命令行工具。“只读”表示只能查询，不能修改数据。这段话是工具配置的例子，并不是在本页为你建立数据库连接。

[上一个词条：文件系统](/ai-coding-dictionary/filesystem) · [下一个词条：工具调用](/ai-coding-dictionary/tool-call)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/tool)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FtoolTool%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Tool%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ftool) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/tool?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/tool)复制地址。
