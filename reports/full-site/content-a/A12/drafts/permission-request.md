---
title: "权限请求"
slug: "permission-request"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工具与环境

# 权限请求

执行框架执行未经预先批准的工具调用前，向用户展示的请求。它让人参与操作决策。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[智能体执行框架](/ai-coding-dictionary/harness)执行未经预先批准的[工具调用](/ai-coding-dictionary/tool-call)前，向用户展示的请求。[模型](/ai-coding-dictionary/model)生成工具调用后，执行框架不立即运行，而是暂停并询问。批准就运行；拒绝时，执行框架把拒绝作为[工具结果](/ai-coding-dictionary/tool-result)返回模型。这就是执行框架在高风险或敏感操作中，让人参与[决策循环](/ai-coding-dictionary/human-in-the-loop)的机制。

一次权限请求的完整过程：

| 步骤 | 谁来做 | 发生什么 |
| --- | --- | --- |
| 1 | 模型 | 生成工具调用 |
| 2 | 执行框架 | 对照[权限模式](/ai-coding-dictionary/permission-mode)和已保存的批准进行检查 |
| 3 | 执行框架 | 已预先批准则立即执行；否则暂停并展示请求 |
| 4 | 用户 | 批准一次、批准本[会话](/ai-coding-dictionary/session)余下时间内的操作，或者拒绝 |
| 5 | 执行框架 | 执行调用，或者把拒绝作为工具结果返回 |

> **译注：表格范围。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。这是原文描述的通用流程，某次批准实际覆盖哪些操作和多长时间，要看具体请求。

拒绝请求也能引导智能体。模型像读取其他工具结果一样读取拒绝，并作出反应，尝试其他方法，或者问你希望怎么做。多数执行框架允许你在拒绝时附带消息，让这次请求成为引导方向的时机。下面这句话恰好会在模型决定下一步时送达：

**英文 Prompt**

> not like that, use the migration script instead

**中文版 Prompt**

> 不要这样做，改用迁移脚本

代价是每次请求都要同步等你。[智能体](/ai-coding-dictionary/agent)会一直受阻，直到你回答。你看着时没有问题，不在场时就成了问题；不断触发请求的智能体，无法留下来独自 [AFK](/ai-coding-dictionary/afk) 工作。权限模式就是调节方式：哪些调用可以直接运行，哪些先询问。理想情况下，用[沙箱](/ai-coding-dictionary/sandbox)提供保护，再扩大可以直接运行的范围。

_用法：_

**英文原例**

> It's been blocked on a permission request for ten minutes — I was in a meeting.

**中文理解**

“它已经等权限请求十分钟了，我刚才在开会。”

**英文原例**

> That's the cost of human-in-the-loop. Pre-approve the safe [tools](/ai-coding-dictionary/tool) so the request only fires on the actually-risky calls.

**中文理解**

“这就是人工参与的成本。提前批准安全[工具](/ai-coding-dictionary/tool)，让请求只在真正有风险的调用上触发。”

> **译注：迁移脚本。** 用于把数据或代码结构调整到另一版本的程序。示例表达的是拒绝当前方式并指定替代方式，不是忽略拒绝。

[上一个词条：MCP](/ai-coding-dictionary/mcp) · [下一个词条：权限模式](/ai-coding-dictionary/permission-mode)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/permission-request)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fpermission-requestPermission%20request%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Permission%20request%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fpermission-request) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/permission-request?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/permission-request)复制地址。
