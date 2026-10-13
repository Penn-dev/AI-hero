---
title: "Evalite 早期预览"
slug: "evalite-an-early-preview"
type: "post"
description: "Evalite 的早期预览：基于 Vitest、以本地运行为先的 TypeScript 原生 LLM 应用测试工具。"
tags:
  - evalite
updatedAt: "2024-12-02T12:24:31.963Z"
---

居然没有一个以本地运行为先、原生支持 TypeScript 的 LLM 应用测试工具，这让我觉得很不可思议。

我想要一个简单的测试执行器，能够：

- 用监视脚本持续运行我的评估。
- 提供界面，查看调用轨迹、分数、输入和输出。
- 不要求我为它注册 API 密钥。

所以，我正在自己做一个。

它基于 Vitest，叫 Evalite。

这里先给你看一个早期预览。

还不知道评估是什么？可以[在这里了解](/what-are-evals)（[英文原文](https://www.aihero.dev/what-are-evals)）。

译注：这是 2024 年原文的预览介绍。监视脚本会在变化发生时重新运行检查，调用轨迹记录任务经过了哪些步骤。固定文字来源没有附独立视频地址或预览演示内容；本页没有补造。执行器本身不要求注册密钥，也不表示评估中使用的外部模型无需访问配置或费用。
