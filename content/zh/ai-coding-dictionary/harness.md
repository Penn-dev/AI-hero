---
title: "智能体执行框架"
slug: "harness"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 智能体执行框架

围绕模型、让它成为智能体的一整套东西：工具、系统提示词、上下文窗口管理、权限和钩子。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

围绕[模型](/ai-coding-dictionary/model)、让它成为[智能体](/ai-coding-dictionary/agent)的一整套东西：[工具](/ai-coding-dictionary/tool)、[系统提示词](/ai-coding-dictionary/system-prompt)、[上下文窗口管理](/ai-coding-dictionary/context-window)、权限和钩子。这就是智能体执行框架（harness）。**Claude.ai** 和 **Claude Code** 使用同一个模型，表现却不同，原因就在于它们的执行框架不同。

> **译注：这里的工具和钩子。** 工具是软件提供的具体功能，例如读取文件或运行命令；钩子是特定事件发生时触发的处理步骤。系统提示词提供基础工作指令，上下文窗口则容纳模型在一次请求中收到的信息。

模型本身只做一件事：接收文本，再输出文本。它不能读取文件、运行命令，也不能记住上一个[工作轮次](/ai-coding-dictionary/turn)。这些都由执行框架提供。它为每次[模型提供商请求](/ai-coding-dictionary/model-provider-request)组织[上下文](/ai-coding-dictionary/context)，执行模型提出的[工具调用](/ai-coding-dictionary/tool-call)，把[工具结果](/ai-coding-dictionary/tool-result)送回模型，保存[会话](/ai-coding-dictionary/session)记录，在有风险的操作前征求你的许可，并决定何时[压缩上下文](/ai-coding-dictionary/compaction)。智能体的循环，也就是模型提出操作、执行框架执行、再重复这一过程，由执行框架运行。

这对诊断问题很重要。当两个产品的行为不同，或者同一产品今天和昨天的行为不同时，变化的往往不是模型，而是执行框架。不同的系统提示词、不同的工具集、变化的默认权限，或者新的上下文管理策略，都能在模型不变的情况下改变行为。这也意味着，大多数配置都在执行框架这一层：[AGENTS.md](/ai-coding-dictionary/agents-md) 文件、权限设置和钩子，都是给执行框架的指令，而不是给模型的指令。

例如 Claude Code、Cursor、Codex CLI，还有 Claude.ai。Claude.ai 是聊天类执行框架，而不是编程类执行框架。

_用法：_

**英文原例**

> Same model, why is Claude Code editing files and Claude.ai just answering questions?

**中文理解**

“同一个模型，为什么 Claude Code 会编辑文件，Claude.ai 却只回答问题？”

**英文原例**

> Different harnesses — Claude Code has [filesystem](/ai-coding-dictionary/filesystem) tools, a different system prompt, and a permission layer. The model isn't the variable here.

**中文理解**

“因为执行框架不同。Claude Code 有[文件系统](/ai-coding-dictionary/filesystem)工具、不同的系统提示词，还有一层权限控制。这里的变量不是模型。”

> **译注：理解本文的分工。** 文件系统是保存和组织文件的位置；工具让软件能够访问它。一个工作轮次从你发来一条消息开始，到智能体交回本次结果为止，期间可能包含多次模型请求。执行框架负责加载 AGENTS.md 等规则，其中的文字仍可能随请求交给模型；本文是在区分谁负责组织和执行这些机制。

[上一个词条：模型提供商](/ai-coding-dictionary/model-provider) · [下一个词条：模型提供商请求](/ai-coding-dictionary/model-provider-request)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/harness)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FharnessHarness%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Harness%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fharness) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/harness?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/harness)复制地址。
