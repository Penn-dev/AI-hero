---
title: "记忆系统"
slug: "memory-system"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

记忆与行为引导

# 记忆系统

一种尝试让智能体跨会话保持状态的系统：把信息持久保存到环境中，再在会话开始时重新加载。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

记忆系统尝试让[智能体](/ai-coding-dictionary/agent)变得[有状态](/ai-coding-dictionary/stateful)，并把这种状态延续到不同[会话](/ai-coding-dictionary/session)。它会在会话期间把信息保存到[任务环境](/ai-coding-dictionary/environment)中，再在以后的会话开始时，把这些信息重新加载进[上下文窗口](/ai-coding-dictionary/context-window)。这样，即使用户[清空](/ai-coding-dictionary/clearing)了当前会话，智能体也能延续之前的信息。

记忆系统分为两部分。第一部分是写入：会话进行时，智能体把学到的内容，例如你说过的偏好、项目中的某项事实，记录为任务环境中的文件。第二部分是读取：新会话开始时，[智能体执行框架](/ai-coding-dictionary/harness)把这些文件或文件索引重新加载进上下文窗口。许多执行框架自带记忆系统，Claude Code 的 `/memory` 就是一例。你也可以自己搭建一套简单的记忆系统：创建一个存放笔记的目录，再在 [AGENTS.md](/ai-coding-dictionary/agents-md) 中要求智能体查阅它。

和其他每次都会加载的内容一样，记忆也需要在完整程度与上下文占用之间取舍。记忆会不断积累，所以多数系统只加载一行行简短索引，并用[上下文指针](/ai-coding-dictionary/context-pointer)指向完整内容，而不会把所有正文一次性塞进上下文窗口。记忆还是[二手来源](/ai-coding-dictionary/secondary-source)，因此可能随时间变得不准确：3 月记录的一项事实，到 6 月仍可能以同样肯定的语气被加载，但项目早已发生变化。记忆系统需要定期整理和删除过时内容，AGENTS.md 也一样。

> **译注：状态与资料来源。** “有状态”指能保留并继续使用之前的信息；“无状态”指模型本身不保留上次请求的工作状态。上下文指针告诉智能体完整资料放在哪里；二手来源是对原始信息的转述或整理，内容可能已经过时。

_用法：_

**英文原例**

> I keep having to re-tell it I'm on Postgres, not MySQL.

**中文理解**

“我总得重新告诉它：我用的是 Postgres，不是 MySQL。”

**英文原例**

> Wire up a memory system — write what it learns to the [filesystem](/ai-coding-dictionary/filesystem) on the first [turn](/ai-coding-dictionary/turn), reload it at session start. The [model](/ai-coding-dictionary/model) itself is [stateless](/ai-coding-dictionary/stateless); the memory layer fakes continuity.

**中文理解**

“接入一套记忆系统：在第一个[工作轮次](/ai-coding-dictionary/turn)，把它学到的内容写入[文件系统](/ai-coding-dictionary/filesystem)；每次会话开始时再加载。[模型](/ai-coding-dictionary/model)本身是[无状态的](/ai-coding-dictionary/stateless)，记忆层模拟出了连续性。”

> **译注：示例里的两个名字。** Postgres 和 MySQL 都是数据库系统。

[上一个词条：自动压缩](/ai-coding-dictionary/autocompact) · [下一个词条：AGENTS.md](/ai-coding-dictionary/agents-md)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/memory-system)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmemory-systemMemory%20system%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Memory%20system%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmemory-system) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/memory-system?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/memory-system)复制地址。
