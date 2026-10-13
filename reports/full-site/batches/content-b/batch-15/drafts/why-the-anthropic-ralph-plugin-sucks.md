---
title: "为什么 Anthropic 的 Ralph 插件不好用：改用 Bash 循环"
slug: "why-the-anthropic-ralph-plugin-sucks"
type: "post"
description: "了解作者为什么认为 Ralph 插件会因上下文累积而降低表现，以及为什么更推荐每轮重新开始的 Bash 循环。"
tags:
  - build-a-software-factory
updatedAt: "2026-01-22T14:50:25.825Z"
---

Ralph 是一种以 AI 智能体持续循环为基础的开发方法：用简单的 Bash 脚本，反复把 Prompt 文件交给 Claude，让它不断改进工作，直到完成。

想看完整实现过程，可以阅读[Ralph 入门指南（中文）](/getting-started-with-ralph)（[英文原文](https://www.aihero.dev/getting-started-with-ralph)）。

> 译注：本文保留作者对当时插件设计的批评，未重新检查插件版本或运行效果。下文关于上下文阈值、性能与“保证退化”的说法都属于原文论断，不是本次测量或所有模型通用结论。

## Anthropic 的插件是什么

Anthropic 为 Claude Code 发布了官方 Ralph 插件，目标是替你自动执行循环。

不必手动多次运行脚本，只需用类似下面的命令启动一次插件：

```bash
/ralph-loop "Build a REST API for todos. Requirements: CRUD operations, input validation, tests. Output <promise>COMPLETE</promise> when done." --completion-promise "COMPLETE" --max-iterations 50
```

中文版 Prompt（学习辅助，完整对应命令中的英文任务，完成标记保持原样）：

```text
为待办事项构建一个 REST API。要求：增删改查操作、输入校验、测试。完成后输出 <promise>COMPLETE</promise>。
```

插件会自动处理循环，不用写 Bash 脚本，也不用反复运行命令。它位于 Claude Code 内部，拦截退出尝试，再自动把 Prompt 送回当前会话。

表面上很完美：Ralph 自动运行，你不必操心。

但它的构建方式存在一个根本问题。

## Anthropic Ralph 插件的问题

要理解插件为什么失败，先要理解 LLM 在负载下怎样工作。

LLM 接收的 Token 越多，Token 之间的关系就按平方规模增长。原文接着说，这意味着提供的 Token 越多，LLM 就越呈指数式过载。每增加一个 Token，模型处理信息、作出好决策就更困难。

> 译注：原文把“平方增长”接着称为“指数式过载”，两者在数学上并不等同。此处保留并指出这个表述问题，不能由关系数量直接推出所有模型的决策质量曲线。

从实际表现来看，每个 LLM 都有一个**聪明区**和一个**迟钝区**。

| 区域 | 位置 | 表现 |
| --- | --- | --- |
| 聪明区 | 上下文前 40% | 敏锐、有能力、决策良好 |
| 迟钝区 | 上下文后 60% | 困惑、犯错、表现下降 |

大约用到上下文的 40% 时，LLM 就开始进入迟钝区。人们会争论具体分界在哪里，但都承认有这条边界。

> 译注：上表及“都承认”按作者原意保留。原文没有提供适用于所有模型的测量数据，40% 不能作为通用硬阈值。

## 为什么 Bash 循环有效

Ralph 让 AI 保持在聪明区。怎么做到？**每轮迭代都使用一个全新的上下文窗口**。

运行 Bash 循环时，Claude 从空上下文开始，读入 PRD 和进度文件，处理一项任务，然后脚本退出。

再运行时，又得到一个全新窗口，再次读入 PRD 和进度文件。Claude 通过 Git 历史和文件改动了解之前完成了什么，选择下一项任务并实现。

上下文不会被杂乱历史填满，AI 始终在聪明区工作，不会退化。

![Bash 循环：每个阶段重新建立上下文。](https://res.cloudinary.com/total-typescript/image/upload/v1769159503/ai-hero-images/hfobysqhrpwxnyec7evb.png)

每个阶段都重置上下文，让 LLM 在表现最好的聪明区工作。

> 译注：“始终”“不会退化”是原文的强断言。新会话仍可能载入很长的 PRD、文件或工具结果，重置本身不保证小上下文或正确输出；本次没有验证此保证。

## 插件怎样破坏了这一点

Anthropic 插件把一切留在同一个 Claude Code 会话里。

它不会退出再重新启动，而是用 stop hook 拦截 Claude 的退出尝试，再把相同 Prompt 送回会话。整个循环发生在同一会话中。

这意味着：

- **第 1 轮**：Claude 读取 PRD，实现任务 1，上下文约用了 20%
- **第 2 轮**：Claude 看到之前的工作，实现任务 2，上下文约用了 35%
- **第 3 轮**：Claude 看到此前工作和上一轮内容，实现任务 3，上下文约用了 50%，进入迟钝区

每一轮，上下文都在增加。插件不断积累会话历史、先前尝试及其他上下文。三四轮之后，AI 就完全在迟钝区工作了。

换句话说，插件**必然**会填满聪明区，让你进入迟钝区，从根本上破坏 Ralph 原本有效的原因。

![Anthropic Ralph 插件：多轮迭代留在同一个会话中。](https://res.cloudinary.com/total-typescript/image/upload/v1769159504/ai-hero-images/jpze5uvgxnvfugf53sgl.png)

插件把所有迭代保存在一个会话中，导致上下文逐渐填满，表现随之下降。

> 译注：20%、35%、50% 与三四轮是作者的说明性例子，不是本文提供的实验数据；具体情况还取决于任务、上下文管理方式和插件版本。

## 解决办法：坚持用 Bash 循环

想让 Ralph 真正有效，就用 Bash 循环，不要用插件。可以从这些资源开始：

1. 阅读[入门指南](https://www.aihero.dev/getting-started-with-ralph)，了解具体实现
2. 继续学习这 [11 条建议（中文）](/tips-for-ai-coding-with-ralph-wiggum)（[英文原文](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum)）
3. 在[这里（中文）](/heres-how-to-stream-claude-code-with-afk-ralph)（[英文原文](https://www.aihero.dev/heres-how-to-stream-claude-code-with-afk-ralph)）了解怎样查看 Claude Code 的 AFK 流式结果

Ralph 有效，就是因为它足够简单。让它保持简单。
