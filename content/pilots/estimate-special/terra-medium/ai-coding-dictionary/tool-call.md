---
title: "工具调用"
slug: "tool-call"
type: "dictionary"
description: "模型输出的工具名称和参数——本质上只是结构化文本。执行框架必须读取并执行它。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
[模型](/ai-coding-dictionary/model)输出的[工具](/ai-coding-dictionary/tool)名称和参数——本质上只是结构化文本。它本身不会做任何事；必须由[执行框架](/ai-coding-dictionary/harness)读取并执行。模型会在一次[向模型提供商发起请求](/ai-coding-dictionary/model-provider-request)中生成它。

一次工具调用的生命周期：

| 步骤 | 谁来做 | 发生什么 |
| --- | --- | --- |
| 1 | 模型 | 从[系统提示词](/ai-coding-dictionary/system-prompt)中的说明得知有哪些工具可用 |
| 2 | 模型 | 输出一次调用——工具名称加参数，通常为 JSON——然后停止 |
| 3 | 执行框架 | 解析这次调用，并根据[权限模式](/ai-coding-dictionary/permission-mode)检查它 |
| 4 | 执行框架 | 如果获准，就执行它 |
| 5 | 执行框架 | 在下一次请求中，将结果作为[工具结果](/ai-coding-dictionary/tool-result)发送回模型 |

[智能体](/ai-coding-dictionary/agent)完成一个[对话轮次](/ai-coding-dictionary/turn)的工作，通常会连续进行许多这样的来回交互。

工具调用和其他内容一样，都是通过[下一个 Token 预测](/ai-coding-dictionary/next-token-prediction)生成的，因此也可能出错：路径并不存在、命令没有这个参数，或参数看起来合理却不正确。执行框架执行的是写出来的内容，不是模型本来想表达的意思——路径拼错时，结果不会只是优雅地报错，而可能修改了错误的文件。

_用法：_

“它说已经运行了测试，但文件修改时间没有变化。”

“查看记录：它真的发出了工具调用，还是只描述了要运行测试？模型负责生成调用，但如果执行框架没有执行，实际上就什么也没有发生。”

## 中文学习辅助：术语小词典

- **tool call**：工具调用，模型发给执行框架的一条结构化操作请求；只有框架实际执行后才会产生效果。
- **JSON**：一种常见的文本数据格式，常用来清楚地写出“参数叫什么、值是什么”。
- **permission mode**：权限模式，执行框架用来判断某项操作是否允许执行的规则。
- **tool result**：工具结果，执行框架完成操作后返回给模型的信息。
