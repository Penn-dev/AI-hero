---
title: "模型提供商请求"
slug: "model-provider-request"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 模型提供商请求

执行框架与模型提供商之间的一次往返。执行框架发送上下文，提供商返回一个回应。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[智能体执行框架](/ai-coding-dictionary/harness)与[模型提供商](/ai-coding-dictionary/model-provider)之间的一次往返。执行框架发送当前[上下文](/ai-coding-dictionary/context)，提供商返回一个回应，可以是[工具调用](/ai-coding-dictionary/tool-call)，也可以是最终回答。如果[智能体](/ai-coding-dictionary/agent)调用[工具](/ai-coding-dictionary/tool)，一条用户消息就可能引发许多次模型提供商请求，因为每项[工具结果](/ai-coding-dictionary/tool-result)都会触发下一次请求。

每次请求都携带全部内容：[系统提示词](/ai-coding-dictionary/system-prompt)、到目前为止的完整对话、每一项工具结果。[模型](/ai-coding-dictionary/model)是[无状态的](/ai-coding-dictionary/stateless)，因此提供商不会在请求之间保留任何内容。第 40 次请求会重新发送第 39 次请求里的内容，再加上一项工具结果。[前缀缓存](/ai-coding-dictionary/prefix-cache)就是为了让这种重复的费用能够承受。

请求也是计费单位。[输入 Token](/ai-coding-dictionary/input-tokens)、[输出 Token](/ai-coding-dictionary/output-tokens)和缓存折扣，都按每次请求计算。这就是为什么一个看起来不起眼的问题，可能花掉出乎意料的费用：成本并不与你那条消息的长度成正比，而是与请求次数乘上每次所带上下文的大小成正比。

有必要区分请求和[工作轮次](/ai-coding-dictionary/turn)。一轮是与你的一次交互，而一个工作轮次，例如“修复失败的测试”，会展开为一串请求。

**英文 Prompt**

> fix the failing test

**中文版 Prompt**

> 修复失败的测试

| 请求 | 模型返回 | 执行框架接着做什么 |
| --- | --- | --- |
| 1 | 工具调用：运行测试 | 执行测试，加入失败输出 |
| 2 | 工具调用：读取测试文件 | 加入文件内容 |
| 3 | 工具调用：读取源文件 | 加入文件内容 |
| 4 | 工具调用：编辑源文件 | 应用修改，加入结果 |
| 5 | 工具调用：再次运行测试 | 执行测试，加入通过输出 |
| 6 | 最终回答：“fixed, tests pass”。中文理解：“已修复，测试通过” | 把回答展示给你 |

> **译注：表格与计费范围。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。Token 是输入、输出内容的基本单位。上文的“请求间不保留”描述模型不凭自身状态记住上一轮，并不表示服务商没有日志或其他数据保留；实际费用还取决于模型、输出量及缓存情况。

一个工作轮次用了六次请求，每次都重新发送整个上下文。想知道 [Token](/ai-coding-dictionary/token) 都花到哪里去了，应该数请求，不是数工作轮次。

_用法：_

**英文原例**

> One question burned forty thousand tokens?

**中文理解**

“一个问题就用了四万个 Token？”

**英文原例**

> Look at the tool calls — twelve grep, eight read, four edits. Each tool result spawns another model provider request, and the whole [session](/ai-coding-dictionary/session) prefix re-sends every time.

**中文理解**

“看看工具调用：十二次 grep、八次读取、四次编辑。每项工具结果都会引发下一次模型提供商请求，整个[会话](/ai-coding-dictionary/session)的已有前缀每次都会重新发送。”

> **译注：grep。** 一种在文本中查找匹配内容的命令行工具。

[上一个词条：智能体执行框架](/ai-coding-dictionary/harness) · [下一个词条：输入 Token](/ai-coding-dictionary/input-tokens)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/model-provider-request)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmodel-provider-requestModel%20provider%20request%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Model%20provider%20request%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmodel-provider-request) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/model-provider-request?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/model-provider-request)复制地址。
