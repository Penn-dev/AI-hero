---
title: "Evalite v1 预览：快速评估与内置评分器"
slug: "evalite-v1-preview"
type: "post"
description: "Evalite v1 提供 10 个面向生产使用的评分器，覆盖字符串、RAG 和智能体评估，并默认使用内存存储，目前仍为 beta 版。"
tags:
  - test-and-evaluate
updatedAt: "2025-11-28T10:00:39.836Z"
---

如果写过评估，你一定知道这种麻烦：每次想确认 LLM 的输出是否正确，就又要写一个自定义评分器。SQL 有效吗？有没有幻觉？JSON 格式正确吗？

Evalite v1 仍处于 beta 阶段，但已经用 10 个可供生产使用的评分器解决了这个问题，并进行了大幅架构升级，让上手变得很简单。

完整文档在 [v1.evalite.dev](https://v1.evalite.dev)。

译注：这里保留 2025 年 11 月原文的版本状态与功能介绍，没有核实当前发行状态。“可供生产使用”是作者对评分器的描述，不是本次验证结论；本次也没有安装或运行 Evalite。

## 10 个内置评分器

Evalite v1 为最常见的评估场景提供了评分器，不必反复自己写。

### 字符串评分器

这些是用于简单文本校验的确定性评分器：

- **exactMatch**：检查输出是否与预期字符串完全相同。
- **contains**：检查输出是否包含某段子字符串。
- **levenshtein**：使用 Levenshtein 距离进行模糊匹配。

**levenshtein 评分器**特别适合 SQL 或代码生成，因为轻微的格式差异不应该让评估直接失败：

```ts
scorers: [
  {
    scorer: ({ output }) =>
      levenshtein({
        actual: output,
        expected: "SELECT * FROM users WHERE id = 1",
      }),
  },
];
```

译注：SQL 是查询数据库的语言。Levenshtein 距离通过比较两段文本需要多少次字符编辑来衡量差异；字符串就是文本。

### RAG 评分器

这些评分器让 LLM 充当评委，评估 RAG 流程：

- **faithfulness**：检查输出是否有上下文依据，以发现幻觉。
- **answerSimilarity**：比较输出与预期答案在语义上的相似程度。
- **answerCorrectness**：根据参考事实评估内容是否正确。
- **answerRelevancy**：检查输出是否真正回答了问题。
- **contextRecall**：衡量是否检索到了全部相关上下文。

例如，用 faithfulness 检查幻觉：

```ts
scorers: [
  {
    scorer: ({ output, input }) =>
      faithfulness({
        question: input.question,
        answer: output,
        groundTruth: input.context, // Retrieved context
        model: yourModel,
      }),
  },
];
```

译注：RAG 是先检索相关资料，再让模型依据资料回答。评委模型的评分同样需要校验，不是内容永远正确的保证。

### 进阶评分器

还有面向特定场景的评分器：

- **toolCallAccuracy**：评估智能体是否调用了正确工具，并使用正确参数。
- **noiseSensitivity**：加入干扰信息并检查结果一致性，测试提示词的稳健性。

工具调用准确性对智能体评估很重要：

```ts
scorers: [
  {
    scorer: ({ output }) =>
      toolCallAccuracy({
        actualCalls: output.toolCalls,
        expectedCalls: [{ toolName: "search", input: { query: "..." } }],
      }),
  },
];
```

## 组合使用评分器

把评分器组合起来，才更能发挥作用。一套完整的 RAG 评估可能这样写：

```ts
scorers: [
  {
    scorer: (opts) => faithfulness({ ...opts, model: yourModel }),
  },
  {
    scorer: (opts) => answerRelevancy({ ...opts, model: yourModel }),
  },
  {
    scorer: (opts) => contextRecall({ ...opts, model: yourModel }),
  },
];
```

每个评分器返回 0 到 1 的分数，Evalite 会汇总它们，形成整体评估分数。

## 默认使用内存存储

最大的架构变化是，**Evalite v1 默认使用内存存储**。

以前需要先配置 SQLite，这增加了新用户上手的负担。现在运行 `npx evalite` 就能开始评估。

如果想长期保存结果，可以在配置中改用 SQLite：

```ts
// evalite.config.ts
import { defineConfig } from "evalite/config";

export default defineConfig({
  storage: {
    type: "sqlite",
    path: "./evalite.db",
  },
});
```

不过，对大多数开发流程来说，内存存储更简单，也少了一项准备步骤。

译注：内存中的结果通常不会在程序退出后继续保留，SQLite 则可以把数据保存在文件里。上面的路径是原配置示例，本次没有创建数据库。

## 深入集成 Vercel AI SDK

Evalite v1 围绕 [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction) 构建。用 `wrapAISDKModel()` 包装任意 AI SDK 模型，就能自动跟踪调用并缓存结果。

### 缓存整个流程

不只是评分器，整个评估流程都能缓存。任务函数里用到的模型、评分器里的模型，以及其他位置，都可以包装：

```ts
import { wrapAISDKModel } from "evalite/ai-sdk";
import { openai } from "@ai-sdk/openai";

const model = wrapAISDKModel(openai("gpt-4"));

evalite("RAG Eval", {
  data: [...],
  task: async (input) => {
    // Cached automatically
    const result = await generateText({
      model,
      prompt: input.question,
    });
    return result.text;
  },
  scorers: [
    {
      // Also cached automatically
      scorer: (opts) => faithfulness({ ...opts, model }),
    },
  ],
});
```

这改变了监视模式的使用体验。修改评分逻辑、调整阈值、重组评估结构时，昂贵的 LLM 调用结果仍保留在缓存里，只运行发生变化的部分。

```bash
evalite watch
```

包装器支持 AI SDK 的各个方法：`generateText()`、`streamText()`、`generateObject()` 和 `streamObject()`。

**生产环境中没有额外开销**：在 Evalite 上下文之外调用 `wrapAISDKModel()` 时，它不做额外操作，生产代码的运行方式保持不变。

译注：缓存是保存已经取得的结果，避免相同工作重复执行。上面的零开销和缓存行为属于原文描述，本次没有性能测量；示例中的数据省略号、模型变量和评分器导入也不构成完整可运行项目。

## 开发体验改进

最大的开发体验改进是**自动支持 .env 文件**，环境变量会自动载入。

Evalite 界面也有几项升级：

- **深色模式**：切换浅色或深色主题。
- **表格显示**：对象和数组显示为 Markdown 表格，不再是 JSON 树。
- **重新运行按钮**：在监视模式下重新执行评估，不必重启。
- **AI SDK 消息界面**：直接传入 AI SDK 消息，获得专门的显示方式。

## 开始使用

Evalite v1 仍在积极开发中，处于 beta 阶段。功能还在变化，因此目前没有正式迁移指南。

想试用，可以运行：

```bash
pnpm install evalite@beta
```

完整文档在 [v1.evalite.dev](https://v1.evalite.dev)。

## 欢迎反馈

v1 仍是 beta，你的反馈会影响最终版本。发现问题了？希望添加某个尚未提供的评分器？

可以在 [Discord](https://aihero.dev/discord) 参与讨论，或到 [GitHub](https://github.com/mattpocock/evalite) 提交 Issue。
