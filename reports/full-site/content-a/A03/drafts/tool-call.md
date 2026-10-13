---
title: "工具调用"
slug: "tool-call"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工具与环境

# 工具调用

模型输出的工具名称和参数，本质上只是一段结构化文本。执行框架必须读取并执行，它才会产生效果。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

工具调用是[模型](/ai-coding-dictionary/model)输出的[工具](/ai-coding-dictionary/tool)名称和参数，本质上只是一段结构化文本。它本身不会做任何事，必须由[智能体执行框架](/ai-coding-dictionary/harness)读取并执行。模型会在一次[模型提供商请求](/ai-coding-dictionary/model-provider-request)中生成工具调用。

一次工具调用的完整过程如下：

| 步骤 | 谁来做 | 发生什么 |
| --- | --- | --- |
| 1 | 模型 | 从[系统提示词](/ai-coding-dictionary/system-prompt)中的说明得知有哪些工具可用 |
| 2 | 模型 | 输出一次调用，也就是工具名称和参数，通常采用 JSON 格式，然后停止生成 |
| 3 | 执行框架 | 解析这次调用，并根据[权限模式](/ai-coding-dictionary/permission-mode)进行检查 |
| 4 | 执行框架 | 如果操作获准，就执行它 |
| 5 | 执行框架 | 在下一次请求中，把执行结果作为[工具结果](/ai-coding-dictionary/tool-result)发回模型 |

> **译注：表格与参数。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。参数说明这次操作具体处理什么，例如要读取哪个文件。JSON 是常见的文本数据格式，可以写出参数名及其取值。权限模式是一组判断操作能否执行的规则。

一个[工作轮次](/ai-coding-dictionary/turn)中，[智能体](/ai-coding-dictionary/agent)通常需要连续进行许多次这样的往返。

工具调用和模型生成的其他内容一样，都来自[下一个 Token 预测](/ai-coding-dictionary/next-token-prediction)，所以也会像其他模型输出一样出错。例如，模型可能写出不存在的路径、命令并不支持的选项，或者看似合理、实际却不正确的参数。执行框架执行的是模型实际写出的内容，而不是模型原本想表达的意思。路径打错时，它不会妥善报错，而是会改错文件。

_用法：_

**英文原例**

> It said it ran the tests but the file timestamps haven't changed.

**中文理解**

“它说已经运行了测试，但文件的修改时间没有变化。”

**英文原例**

> Look at the transcript — did it actually emit a tool call, or just describe running them? The model produces the call, but if the harness didn't execute it, nothing happened.

**中文理解**

“查看操作记录：它真的发出了工具调用，还是只用文字描述自己运行了测试？模型负责生成调用，但执行框架没有执行的话，实际上什么也不会发生。”

> **译注：区分请求和结果。** 上文用错误路径强调“软件按实际参数执行”的风险；具体操作也可能因路径无效而报错。是否真正运行以及结果如何，要看工具返回的实际信息，不能只看智能体说了什么。

[上一个词条：工具](/ai-coding-dictionary/tool) · [下一个词条：工具结果](/ai-coding-dictionary/tool-result)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/tool-call)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ftool-callTool%20call%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Tool%20call%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ftool-call) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/tool-call?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/tool-call)复制地址。
