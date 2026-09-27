---
title: "2 分钟了解 Anthropic 新发布的模型上下文协议"
slug: "anthropics-new-model-context-protocol-in-2-minutes~hc0tx"
type: "post"
description: "通过基于 JSON-RPC 的开放协议，以及 TypeScript 和 Python SDK，将 AI 助手轻松连接到数据系统。"
updatedAt: "2024-11-25T19:29:39.269Z"
---

Anthropic [发布了一项新的开放标准](https://www.anthropic.com/news/model-context-protocol)，用于连接“AI 助手与存放数据的系统”。这项标准名为模型上下文协议（Model Context Protocol，MCP）。

MCP 是一种基于 JSON-RPC 的协议，可以让大语言模型（LLM；本文指 Claude）与持续运行的服务器通信。Claude 可以先询问服务器提供了哪些工具，再选择并调用所需的工具。

官方还提供了 TypeScript 和 Python SDK，方便你创建自己的 MCP 服务器，将 AI 助手接入自己的数据源，或让它执行自定义操作。

## 中文学习辅助：术语小词典

- **模型上下文协议（Model Context Protocol，MCP）**：一套开放的通用规则，让 AI 助手能够以统一方式连接外部系统，并使用其中的数据和工具。
- **JSON-RPC**：一种用 JSON 格式传递请求和响应的通信规范，可以简单理解为两个程序之间“互相发指令、回结果”的约定。
- **大语言模型（LLM）**：能够理解和生成自然语言的 AI 模型，Claude 就是其中一种。
- **服务器（server）**：持续运行并等待请求的程序，可以向其他程序提供数据或功能。
- **SDK**：软件开发工具包，通常包含现成代码和使用说明，帮助开发者更快接入某项技术。
- **TypeScript**：一种在 JavaScript 基础上加入类型检查的编程语言，常用于开发网页和服务端程序。
- **Python**：一种语法相对易读的编程语言，广泛用于 AI、数据处理和服务端开发。
