---
title: "工具结果"
slug: "tool-result"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工具与环境

# 工具结果

执行框架执行工具调用后返回的内容，例如文件内容、输出或错误。这是智能体观察环境的唯一途径。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[智能体执行框架](/ai-coding-dictionary/harness)执行[工具调用](/ai-coding-dictionary/tool-call)后返回的内容，例如文件内容、命令输出或错误。这是[智能体](/ai-coding-dictionary/agent)观察[环境](/ai-coding-dictionary/environment)的唯一途径。结果会在 _下一次_ [模型提供商请求](/ai-coding-dictionary/model-provider-request)中送回[模型](/ai-coding-dictionary/model)，由模型决定如何处理。工具调用与工具结果是同一次交互的两端，都发生在一个[工作轮次](/ai-coding-dictionary/turn)之内。

一次工具结果的完整过程如下：

| 步骤 | 谁来做 | 发生什么 |
| --- | --- | --- |
| 1 | 执行框架 | 执行工具调用，运行命令或读取文件 |
| 2 | 执行框架 | 取得操作结果：输出、内容或错误 |
| 3 | 执行框架 | 把结果作为一条消息加入[上下文](/ai-coding-dictionary/context) |
| 4 | 执行框架 | 在下一次模型提供商请求中，将整个上下文发送给提供商 |
| 5 | 模型 | 读取结果，决定再次调用工具，还是给出最终回答 |

> **译注：表格与请求。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。一次模型请求是向模型服务发送输入并取得回应；一个工作轮次则从用户发来消息到智能体交回结果，可能包含多次这样的请求。

结果会在当前[会话](/ai-coding-dictionary/session)剩余的时间里留在上下文中。工具结果通常占据编程会话上下文的大部分：每次读取文件、运行测试、进行搜索，结果都会完整进入上下文，早已不再有用后，仍然继续占用 [Token](/ai-coding-dictionary/token)。几个体积很大的结果，例如冗长的测试日志、被完整读入的自动生成文件，就能比对话本身更快地把会话推向[上下文窗口](/ai-coding-dictionary/context-window)的容量边缘。

模型看到的只有结果，无法核查结果背后的真实环境。如果输出被截断、命令无声地失败，或者执行框架返回的不是内容而是错误，模型只能根据收到的信息推理。当智能体对你系统的理解看起来不对时，就应该查看工具结果：操作记录里的某一条结果，一定说了与你知道的实际情况不同的内容。

> **译注：为什么长结果占空间。** Token 是模型读取内容的基本单位。工具输出进入对话记录后，会占用可供模型读取的空间；框架如何截断、保留或压缩它们，会影响之后实际提供给模型的内容。原文在这里强调工具结果对判断的影响。

_用法：_

**英文原例**

> It's reasoning about the file like it's empty.

**中文理解**

“它分析这个文件时，好像把文件当成空的了。”

**英文原例**

> The tool result came back as a permission denial, not the contents. The model only saw the error string — it has no other way to see the file.

**中文理解**

“工具结果返回的是权限拒绝，而不是文件内容。模型只看到了那段错误文字，没有其他途径看到这个文件。”

[上一个词条：工具调用](/ai-coding-dictionary/tool-call) · [下一个词条：MCP](/ai-coding-dictionary/mcp)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/tool-result)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ftool-resultTool%20result%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Tool%20result%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ftool-result) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/tool-result?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/tool-result)复制地址。
