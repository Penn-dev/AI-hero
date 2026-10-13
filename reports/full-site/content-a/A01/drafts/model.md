---
title: "模型"
slug: "model"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 模型

模型就是参数。它是无状态的，只做下一个 Token 预测，除此之外什么也不做。模型本身无法像智能体那样采取行动。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

模型就是[参数](/ai-coding-dictionary/parameters)。它是[无状态的](/ai-coding-dictionary/stateless)，只做[下一个 Token 预测](/ai-coding-dictionary/next-token-prediction)，除此之外什么也不做。“Claude Opus 4.x”和“GPT-5.x”都是模型。模型本身无法像智能体那样采取行动，必须接入[智能体执行框架](/ai-coding-dictionary/harness)。

> **译注：先理解这几个词。** 参数是模型经过训练得到、用于计算的数值。Token 是模型读取和生成内容的基本单位，不等于一个汉字或一个英文单词。“无状态”在这里指模型不会自行保存上一次请求的工作状态；执行框架可以把对话记录重新提供给它。

模型不能读取文件、运行命令、浏览网页，也不能记住昨天发生了什么。它接收 [Token](/ai-coding-dictionary/token)，再预测接下来输出的 Token，每次[模型提供商请求](/ai-coding-dictionary/model-provider-request)都是这样。你感觉到的[智能体](/ai-coding-dictionary/agent)在工作，例如选择[工具](/ai-coding-dictionary/tool)、读取结果、循环执行直到任务完成，其实都是执行框架把许多次这样的预测串联起来的结果。

[模型提供商](/ai-coding-dictionary/model-provider)会推出不同档次的模型：大型模型最聪明，但速度慢、价格高；较小的模型更快、更便宜，但能力较弱。选择哪一档确实需要考虑：规划和困难的调试任务用重型模型，机械性的修改用轻型模型。执行框架允许你在[会话](/ai-coding-dictionary/session)中途切换模型。

严格使用“模型”这个词，也有助于更准确地诊断问题。“这个模型不擅长做这件事”是一项具体判断。同一个模型换一个执行框架，或者换一份[上下文](/ai-coding-dictionary/context)，表现往往会完全不同。责怪模型之前，先检查它收到了什么：多数令人失望的输出，原因都能追溯到上下文或执行框架，而不是参数。

> **译注：请求、会话与上下文。** 模型提供商请求，是软件向模型服务发送一次输入并取得回应的过程；会话是持续积累消息的一段对话；上下文是当前任务有关、已提供给智能体的信息。这里的“重型”和“轻型”是对模型档次的描述，不是固定的产品名称。

_用法：_

**英文原例**

> Should we switch the model from Sonnet to Opus for the planning step?

**中文理解**

“在规划这一步，要不要把模型从 Sonnet 换成 Opus？”

**英文原例**

> Try it — but the harness is doing most of the lifting on this task. The model swap won't help if the [system prompt](/ai-coding-dictionary/system-prompt) and tools are wrong.

**中文理解**

“可以试试。不过，这项任务主要靠执行框架。如果[系统提示词](/ai-coding-dictionary/system-prompt)和工具配得不对，换模型也没用。”

[上一个词条：AI](/ai-coding-dictionary/ai) · [下一个词条：参数](/ai-coding-dictionary/parameters)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/model)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FmodelModel%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Model%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmodel) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/model?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/model)复制地址。
