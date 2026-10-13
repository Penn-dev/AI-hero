---
title: "上下文窗口"
slug: "context-window"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

会话、上下文窗口与工作轮次

# 上下文窗口

模型每次收到模型提供商请求时能看到的全部内容。容量有限，大小因模型而异，也是模型感知任何信息的唯一入口。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

上下文窗口就是[模型](/ai-coding-dictionary/model)每次处理一项[模型提供商请求](/ai-coding-dictionary/model-provider-request)时能看到的全部内容。它的容量有限，大小因模型而异，而且是模型感知任何信息的_唯一_入口。

上下文窗口是一段连续的 [Token](/ai-coding-dictionary/token) 序列，其中包括[系统提示词](/ai-coding-dictionary/system-prompt)、截至目前的对话，以及[智能体执行框架](/ai-coding-dictionary/harness)送回模型的每一项[工具结果](/ai-coding-dictionary/tool-result)。某项内容在这段序列里，模型才能使用；不在里面，模型就不知道它存在。无论是你的代码库、昨天编辑的文件，还是三个会话前给出的指令，都是如此。窗口外的内容必须先被带进来，通常需要通过一次[工具调用](/ai-coding-dictionary/tool-call)，才能影响接下来的工作。

“容量有限”意味着窗口终究会被装满。每个工作轮次都会增加内容，包括你的消息、模型的回复和工具结果。很长的[会话](/ai-coding-dictionary/session)最终会触及上限，迫使你进行[压缩](/ai-coding-dictionary/compaction)或[清空](/ai-coding-dictionary/clearing)。窗口内的内容还会彼此争夺空间和注意力：每加载一个 Token，留给其他内容的空间就少一点；即使某些内容并非当前所需，也仍会占用模型的[注意力](/ai-coding-dictionary/attention-budget)。实际使用时，应该把上下文窗口看作一笔有限的预算：只加载任务需要的内容，其余内容留在外面。

> **译注：这里说的临时工作空间。** 一次模型提供商请求，就是软件向模型服务发送输入并取得回应的过程。Token 是输入、输出的基本单位。工具调用是请求软件执行操作，工具结果是软件返回的信息。压缩把较长记录整理得更短，清空则开始一份新的对话记录。

_避免使用：_“记忆”。上下文窗口是当前工作的状态，不能跨会话保留。[记忆](/ai-coding-dictionary/memory-system)是在它之上另加的一套机制。

_用法：_

**英文原例**

> Can I just paste the whole monorepo into the prompt?

**中文理解**

“我能把整个 monorepo 直接粘贴进提示词吗？”

**英文原例**

> The context window's 200k tokens — that's maybe a fifth of the repo. Pick the files the task touches, leave the rest behind a tool call.

**中文理解**

“上下文窗口有 20 万 Token，大概只能容纳这个仓库的五分之一。挑出任务会涉及的文件，其他文件留到需要时再通过工具调用读取。”

> **译注：示例的范围。** monorepo 是把多个相关项目或软件包放在同一代码仓库中的做法。20 万 Token 和“五分之一”是此处对话的例子，不是所有模型或所有代码仓库的固定数值。

[上一个词条：上下文](/ai-coding-dictionary/context) · [下一个词条：有状态](/ai-coding-dictionary/stateful)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/context-window)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontext-windowContext%20window%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Context%20window%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontext-window) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/context-window?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/context-window)复制地址。
