---
title: "MCP"
slug: "mcp"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工具与环境

# MCP

把外部工具服务器接入执行框架的协议，让智能体获得框架自带工具之外的工具。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

**Model Context Protocol，模型上下文协议。** 把外部工具服务器接入[智能体执行框架](/ai-coding-dictionary/harness)的协议，让[智能体](/ai-coding-dictionary/agent)获得框架自带工具之外的[工具](/ai-coding-dictionary/tool)。智能体从不“调用 MCP”，它调用的是工具，而执行框架恰好从 MCP 服务器取得了那个工具。MCP 也提供资源，也就是只读数据，以及提示词，也就是可复用模板，但主要用途是提供工具。

这个协议解决的是集成问题。没有标准时，每个执行框架都需要自己实现 Linear 集成、Slack 集成和数据库集成，各自编写、各自维护。有了 MCP，集成只需写成一台服务器，任何兼容 MCP 的执行框架都能使用。执行框架连接服务器，服务器声明自己提供哪些工具，这些工具就会与内置工具一起，供智能体使用。

代价体现在[上下文](/ai-coding-dictionary/context)中。服务器声明的每个工具，都带来一份定义，包括名称、描述和参数格式；[模型](/ai-coding-dictionary/model)只能调用自己知道的工具。最直接的做法，是一开始就把每份定义加载进[上下文窗口](/ai-coding-dictionary/context-window)。装上几个提供大量工具的服务器后，你还没输入任何内容，[会话](/ai-coding-dictionary/session)就已经有数千个 [Token](/ai-coding-dictionary/token) 的工具参数定义，把[注意力预算](/ai-coding-dictionary/attention-budget)花在任务根本不会使用的工具上。

许多执行框架现在通过工具搜索缓解这个问题。上下文不保存完整定义，而是保存指向可用工具的[上下文指针](/ai-coding-dictionary/context-pointer)；智能体按名称或用途搜索工具，需要时才加载定义。如果你的执行框架没有这样做，前期成本仍然存在，因此值得只启用项目真正需要的服务器。

> **译注：协议与服务器。** 协议约定软件之间如何交换信息；这里的服务器是提供工具和数据的程序。Linear 是工单管理服务，Slack 是协作沟通服务。MCP 接入并不自动说明某项操作已获授权。

_用法：_

**英文原例**

> The agent needs to read tickets from Linear.

**中文理解**

“智能体需要读取 Linear 中的工单。”

**英文原例**

> Configure the harness to use the Linear MCP server — it exposes the Linear API as tools the agent can call. Saves you writing custom tool wrappers.

**中文理解**

“把执行框架配置为使用 Linear MCP 服务器。它会把 Linear API 提供成智能体能调用的工具，省去你编写专用工具封装的工作。”

[上一个词条：工具结果](/ai-coding-dictionary/tool-result) · [下一个词条：权限请求](/ai-coding-dictionary/permission-request)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/mcp)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FmcpMCP%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=MCP%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmcp) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/mcp?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/mcp)复制地址。
