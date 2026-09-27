---
title: "工具调用"
slug: "tool-call"
type: "dictionary"
description: "模型输出的工具名称和参数——本质上只是一段结构化文本。执行框架读取并执行后，它才会真正产生效果。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
工具调用是[模型](/ai-coding-dictionary/model)输出的[工具](/ai-coding-dictionary/tool)名称和参数——本质上只是一段结构化文本。它本身不会做任何事，必须由[执行框架](/ai-coding-dictionary/harness)读取并执行。模型会在一次[模型提供商请求](/ai-coding-dictionary/model-provider-request)中生成工具调用。

一次工具调用的完整过程如下：

| 步骤 | 谁来做 | 发生什么 |
| --- | --- | --- |
| 1 | 模型 | 从[系统提示词](/ai-coding-dictionary/system-prompt)中的说明得知有哪些工具可用 |
| 2 | 模型 | 输出一次调用，也就是工具名称和参数（通常采用 JSON 格式），然后暂停生成 |
| 3 | 执行框架 | 解析这次调用，并根据[权限模式](/ai-coding-dictionary/permission-mode)进行检查 |
| 4 | 执行框架 | 如果操作获准，就执行它 |
| 5 | 执行框架 | 在下一次请求中，把执行结果作为[工具结果](/ai-coding-dictionary/tool-result)发回模型 |

一个[工作轮次](/ai-coding-dictionary/turn)中，[智能体](/ai-coding-dictionary/agent)通常需要连续进行许多次这样的往返。

工具调用和模型生成的其他内容一样，都来自[下一个 Token 预测](/ai-coding-dictionary/next-token-prediction)，所以也会像其他模型输出一样出错。例如，模型可能写出不存在的路径、命令并不支持的选项，或者看似合理、实际却不正确的参数。执行框架执行的是模型实际写出的内容，而不是模型原本想表达的意思——路径打错时，它不会体贴地理解原意，而会照着错误路径改错文件。

_用法：_

“它说已经运行了测试，但文件的修改时间没有变化。”

“查看操作记录：它真的发出了工具调用，还是只用文字说自己运行了测试？模型负责生成调用，但执行框架没有执行的话，实际上什么也不会发生。”

## 中文学习辅助：术语小词典

- **tool call**：工具调用，模型发给执行框架的一条结构化操作请求，只有被实际执行后才会产生效果。
- **JSON**：一种常见的文本数据格式，常用来清楚写明参数名称及其取值。
- **permission mode**：权限模式，执行框架用来判断某项操作能否执行的一组规则。
- **tool result**：工具结果，执行框架完成操作后返回给模型的信息。
