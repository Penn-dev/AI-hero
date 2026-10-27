---
title: "环境"
slug: "environment"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工具与环境

# 环境

智能体采取行动的世界，也就是执行框架之外、智能体通过工具结果感知并通过工具调用改变的东西。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[智能体](/ai-coding-dictionary/agent)采取行动的世界，也就是[智能体执行框架](/ai-coding-dictionary/harness)之外，智能体通过[工具结果](/ai-coding-dictionary/tool-result)感知、通过[工具调用](/ai-coding-dictionary/tool-call)改变的东西。执行框架 _运行_ 智能体，环境则是智能体 _工作的地方_ 。像 [`AGENTS.md`](/ai-coding-dictionary/agents-md) 这样的文件保存在环境里，由执行框架把它加载到[上下文窗口](/ai-coding-dictionary/context-window)中。[文件系统](/ai-coding-dictionary/filesystem)是最常见的环境类型，但不是唯一类型；数据库、远程 API、浏览器会话都可以是环境。

智能体只有去查看时，才能看到环境。它知道的所有环境信息，都来自工具结果，所以它对环境的认识是一组快照，每张快照只在取得的那一刻准确。如果智能体读完文件后，文件又发生了变化，例如你手动编辑了它，或者构建步骤重新生成了它，智能体仍会根据过时副本推理，直到某件事促使它重新读取。智能体非常肯定地描述一个早已变样的文件，通常就是这种情况：环境变了，快照没变。

环境也是持久保留信息的那一层，而且是唯一始终[有状态](/ai-coding-dictionary/stateful)的层次。[会话](/ai-coding-dictionary/session)结束时，其中的上下文就消失了；但写进环境的文件仍会保留，下一个会话可以读取。这正是[记忆系统](/ai-coding-dictionary/memory-system)、[交接材料](/ai-coding-dictionary/handoff-artifact)和 `AGENTS.md` 所依赖的机制。你希望智能体明天仍然知道的东西，都必须最终保存到环境里。

环境有多大，由你决定。[沙箱](/ai-coding-dictionary/sandbox)会缩小它，限制智能体能访问的范围；增加一个[工具](/ai-coding-dictionary/tool)会扩展它，让智能体能够访问某个数据库或 API。边界之内，是智能体能感知和改变的东西；边界之外的所有内容，对智能体来说都不存在。环境对智能体工作的支持程度，就是代码库的 [AX](/ai-coding-dictionary/ax)。

> **译注：几个环境名称。** API 是供程序调用的软件接口；沙箱限定程序可以访问和操作的范围；构建是把代码处理成可运行或可发布成果的过程。AX 指智能体体验，也就是环境是否方便智能体完成任务。

 _避免使用：_ 不要用“环境”指代运行时或执行框架本身。执行框架负责围绕模型运行，环境则是工作空间。

_用法：_

**英文原例**

> The agent can't see the staging DB schema.

**中文理解**

“智能体看不到预发布数据库的数据结构。”

**英文原例**

> Wire it into the environment — give it a `psql` tool scoped to read-only on staging. The harness is fine, it just has nothing to act on.

**中文理解**

“把它接入环境，提供一个只读访问预发布环境的 `psql` 工具。执行框架没问题，它只是没有可以操作的对象。”

> **译注：示例中的接入。** 预发布环境用于上线前检查；`psql` 是访问 PostgreSQL 数据库的命令行工具。“只读”限制保留在示例中，表示不能修改数据。

[上一个词条：工作轮次](/ai-coding-dictionary/turn) · [下一个词条：文件系统](/ai-coding-dictionary/filesystem)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/environment)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FenvironmentEnvironment%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Environment%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fenvironment) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/environment?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/environment)复制地址。
