---
title: "Anthropic 新发布的模型上下文协议：2 分钟快速了解"
slug: "anthropics-new-model-context-protocol-in-2-minutes~hc0tx"
type: "post"
description: "借助 JSON-RPC 以及 TypeScript 和 Python SDK，让 AI 助手顺畅连接到数据所在的系统。"
updatedAt: "2024-11-25T19:29:39.269Z"
---

Anthropic [发布了一项新的开放标准](https://www.anthropic.com/news/model-context-protocol)，用于把“AI 助手连接到存放数据的系统”。

它是一种基于 JSON-RPC 的协议，让大语言模型（LLM；这里指 Claude）能够与持续运行的服务器通信。Claude 可以先查询有哪些工具可用，再调用其中的工具。

它同时提供 TypeScript 和 Python SDK，这意味着你可以比较方便地创建自己的 MCP 服务器：把它连接到你的数据源，或让它执行自定义操作。

## 中文学习辅助：术语小词典

- **Model Context Protocol（MCP，模型上下文协议）**：一套通用规则，让 AI 助手能以统一方式了解并使用外部系统提供的工具和数据。
- **JSON-RPC**：一种用 JSON 格式传递请求和结果的通信约定，常用于让两个程序互相调用功能。
- **LLM（大语言模型）**：能够理解和生成自然语言的 AI 模型；Claude 就属于这一类。
- **服务器（server）**：持续运行、等待其他程序请求并提供数据或功能的程序。
- **SDK**：软件开发工具包，通常包含现成的代码和说明，帮助开发者更快接入某项技术。
- **TypeScript**：常用于网页和服务端开发的编程语言，在 JavaScript 的基础上增加了类型检查。
- **Python**：语法相对易读、在 AI 和数据处理领域广泛使用的编程语言。
