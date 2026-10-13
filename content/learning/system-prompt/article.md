---
title: "系统提示词"
slug: "system-prompt"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

# 系统提示词

[AI 编码词典](/ai-coding-dictionary)

会话、上下文窗口与工作轮次

执行框架在每次模型提供商请求的开头加入的指令——智能体的长期工作说明。通常在一次会话中保持稳定。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[智能体执行框架（harness）](/ai-coding-dictionary/harness)在每次[模型提供商请求](/ai-coding-dictionary/model-provider-request)的开头加入的指令，就是[智能体](/ai-coding-dictionary/agent)的长期工作说明：它是谁、应该怎样做事、可以调用哪些[工具](/ai-coding-dictionary/tool)，以及需要遵守哪些约定。通常在一次[会话](/ai-coding-dictionary/session)中保持稳定。

系统提示词由执行框架的开发商编写，而不是由你编写。在编程类执行框架中，它的篇幅很大——行为规则、工具说明和特殊情况的处理要求加起来，经常达到数万个 [Token](/ai-coding-dictionary/token)，每个[工作轮次](/ai-coding-dictionary/turn)都作为[输入 Token](/ai-coding-dictionary/input-tokens)计费。你自己的长期指令也会一同加入：[AGENTS.md](/ai-coding-dictionary/agents-md) 等文件会在会话开始时加载到系统提示词旁边，因此，[模型](/ai-coding-dictionary/model)在看到你的消息之前，就会一起读到开发商的工作说明和你的规则。

由于系统提示词在每次请求中都相同，它会构成[前缀缓存](/ai-coding-dictionary/prefix-cache)的开头。这也是执行框架通常在整个会话中保持它不变，而不会边用边改的部分原因。

模型经过训练，会优先遵循系统提示词，而不是用户消息。所以，如果智能体坚持某种你从未要求过的约定，或者总用一种你怎么也改不掉的格式输出，它通常是在遵循自己的系统提示词——你的消息没能说服它。有些执行框架允许自定义：你可以完整查看系统提示词，了解智能体实际收到的指令，也可以修改它。

_用法：_

**英文原例**

> Two harnesses, same model, totally different behavior on the same prompt.

**中文理解**

“两个执行框架使用同一个模型，面对同一条提示词，表现却完全不同。”

**英文原例**

> Different system prompts. One's tuned for terse code edits, the other for explaining — that's where the divergence lives, before your message even arrives.

**中文理解**

“因为系统提示词不同。一个侧重简洁地修改代码，另一个侧重解释——差别就在这里，在你的消息到来之前就已经存在。”

> **译注：理解这里的输入与计费。** “看到消息之前”描述的是请求中规则与消息的排列关系。一个工作轮次可能包含多次模型请求；实际计费、缓存是否命中，以及项目规则的加载方式，都取决于具体服务和执行框架。开头保持相同并不保证缓存命中或固定折扣。“由开发商编写”描述的是这里讨论的默认工作说明；末段已说明，有些执行框架也允许你修改它。

[上一个词条：智能体](/ai-coding-dictionary/agent) · [下一个词条：会话](/ai-coding-dictionary/session)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/system-prompt)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsystem-promptSystem%20prompt%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=System%20prompt%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsystem-prompt) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/system-prompt?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/system-prompt)复制地址。

## 中文学习辅助：术语小词典

- **系统提示词**：随模型请求提供的基础指令，用来约定角色和行为等要求。
- **智能体执行框架**：围绕模型运行的软件，负责组织输入、提供工具、执行调用并管理交互过程。
- **Token**：模型读取和生成文本时使用的基本单位，不等同于一个汉字或一个英文单词。
- **前缀缓存**：复用多次请求中相同开头的已处理结果；不保证命中或固定折扣。
