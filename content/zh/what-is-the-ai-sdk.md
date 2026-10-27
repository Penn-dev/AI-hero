---
title: "什么是 Vercel AI SDK？"
slug: "what-is-the-ai-sdk"
type: "post"
description: "了解 Vercel AI SDK 怎样通过统一 API 连接不同 LLM 提供商，简化 AI 应用开发。"
tags:
  - build-ai-apps
  - Vercel AI SDK
updatedAt: "2025-01-17T11:53:39.759Z"
---

构建 AI 应用时，经常会碰到一个问题。

假设你选择 OpenAI 作为 LLM 提供商。

你写了一大堆代码，和 OpenAI 的 API 通信。

但有一天你想：“要不试试 Anthropic？”

问题来了，Anthropic 的 API 有点不一样。

流式输出、结构化输出和工具调用等功能，尤其如此。

结果只是想试一个新模型，就得额外写很多衔接代码。

AI SDK 可以帮你处理这些差异。

它是一个你可以调用的软件库，负责你与 LLM 之间的交互。

这样，应用可以改为调用 AI SDK，由这个库去处理不同提供商的通信。

它还为常见用途提供了一些很好用的辅助功能。

比如流式文本、结构化输出、工具调用，甚至智能体流程，都能通过它来处理。

译注：SDK 是软件开发工具包；API 是程序调用服务的接口。流式输出让内容逐步出现，结构化输出则让结果按规定字段组织。本篇保留固定原文的接口与版本，未运行安装或代码示例。

## 必须部署到 Vercel 才能使用 AI SDK 吗？

AI SDK 由 Vercel 维护，但使用它并不要求使用 Vercel 平台。

你不需要为这个 SDK 向 Vercel 付费，它是免费的开源软件。

译注：SDK 本身免费，不等于它连接的模型服务或托管资源也免费。

## AI SDK 有哪些部分？

AI SDK 分为三部分。

AI SDK Core 用于后端，可以在 Node、Deno、Bun 等环境中运行。

AI SDK UI 提供一组前端钩子和组件，用来连接使用 AI SDK 的后端。

还有 AI SDK RSC，用于基于 React Server Components 构建应用。

译注：后端负责应用的数据和业务处理，前端是用户操作的界面；React Server Components 是在服务器上运行的 React 组件。这里的三部分划分来自原文，本次未核实当前产品结构。

## 可以用 AI SDK 构建什么？

如果应用需要与 LLM 交互，而且要做的事不止是取得一次纯文本回复，AI SDK 就很有用。

常见的基础能力包括：

- 把文本流式传回界面。
- 请求结构化输出。
- 让模型调用工具。
- 不重写整个应用就能切换模型提供商。
- 构建允许模型执行多步的智能体式流程。

因此，AI SDK 很适合聊天界面、编程工具、工作流助手、文档工具和内部智能体。

想在概览之外继续深入，可以查看 [AI SDK v6 速成课](/workshops/ai-sdk-v6-crash-course)（[原站课程入口](https://www.aihero.dev/workshops/ai-sdk-v6-crash-course)），它会在一个能工作的应用中讲解这些部分。

## 这套教程讲什么？

本教程只介绍 AI SDK 的核心部分。

你会了解基本用法，并打下足以构建几乎任何应用的基础。

## 怎样安装？

它的软件包名字可能是 NPM 史上最好的名字：`ai`。

```bash
pnpm add ai
```

所有核心功能都在 `ai` 软件包下：

```ts
import {
  generateText,
  streamText,
  generateObject,
  streamObject,
} from "ai";
```

安装各提供商专用的软件包，就能接入它们。

以 OpenAI 为例：

```bash
pnpm add @ai-sdk/openai
```

然后这样使用：

```ts
import { openai } from "@ai-sdk/openai";

const model = openai("gpt-4");
```

译注：pnpm 是安装项目依赖的工具。原文没有给出完整项目环境、锁定依赖或模型访问配置；模型名称保留原样，不保证这些历史标识当前仍可用。

## 总结

这就是基本情况。

你得到一个统一的 API，可以换入、换出不同模型。

你可以流式输出和生成文本、处理结构化输出、调用工具，还能构建智能体循环。

我们先从最基础的文本生成开始。下一篇见！
