---
title: "这是 2024 年最好的提示词工程资料"
slug: "the-prompt-report"
type: "post"
description: "了解 2025 年的顶尖提示词工程资料，其中包含细致的术语分类，以及延伸研究链接。"
tags:
  - learn-how-llms-think
updatedAt: "2024-12-28T14:01:32.322Z"
---

[《提示词报告》](https://arxiv.org/abs/2406.06608)是一项出色的工作，它对提示词工程的整个文献领域进行了综合分析。Latent Space 团队把它列为[2025 年推荐读物](https://x.com/latentspacepod/status/1872719928618565646)之一。

译注：原标题写的是 2024 年，简介和推荐阅读写的是 2025 年，这里按原文保留。综合分析是汇总已有研究，而不是本页重新执行论文实验。

我最喜欢的是，它很仔细地梳理了不同术语的分类：

```txt
📁 Prompting Techniques
├── 📁 Zero-Shot
│   ├── 📄 Emotion Prompting
│   ├── 📄 Role Prompting
│   ├── 📄 Style Prompting
│   └── 📄 Self-Ask
│
├── 📁 Few-Shot
│   ├── 📄 Exemplar Generation
│   ├── 📄 Exemplar Ordering
│   └── 📄 Exemplar Selection
│
├── 📁 Thought Generation
│   └── 📁 Chain of Thought
│       ├── 📁 Zero-Shot CoT
│       │   ├── 📄 Analogical Prompting
│       │   ├── 📄 Step-Back Prompting
│       │   └── 📄 Thread-of-Thought
│       │
│       └── 📁 Few-Shot CoT
│           ├── 📄 Active-Prompt
│           ├── 📄 Auto-CoT
│           ├── 📄 Memory-of-Thought
│           └── 📄 Prompt Mining
│
├── 📄 Ensembling
├── 📄 Self-Criticism
└── 📄 Decomposition
```

中文理解（学习辅助）：

```text
提示词技术
├── 零样本（Zero-Shot）
│   ├── 情绪提示（Emotion Prompting）
│   ├── 角色提示（Role Prompting）
│   ├── 风格提示（Style Prompting）
│   └── 自我提问（Self-Ask）
├── 少样本（Few-Shot）
│   ├── 示例生成（Exemplar Generation）
│   ├── 示例排序（Exemplar Ordering）
│   └── 示例选择（Exemplar Selection）
├── 思考生成（Thought Generation）
│   └── 思维链（Chain of Thought）
│       ├── 零样本思维链（Zero-Shot CoT）
│       │   ├── 类比提示（Analogical Prompting）
│       │   ├── 后退一步提示（Step-Back Prompting）
│       │   └── 思考线索（Thread-of-Thought）
│       └── 少样本思维链（Few-Shot CoT）
│           ├── 主动提示（Active-Prompt）
│           ├── 自动思维链（Auto-CoT）
│           ├── 思考记忆（Memory-of-Thought）
│           └── 提示词挖掘（Prompt Mining）
├── 集成（Ensembling）
├── 自我批评（Self-Criticism）
└── 分解（Decomposition）
```

译注：零样本是不给示例，少样本是提供少量示例。这里的树状图只列出方法名称，不是要求模型输出内部思考的指令；各方法的细节应查看报告对应章节。

没错，上面甚至还不是报告提到的全部技术。它还讨论了多模态、多语言和安全相关方法。

每节都有进一步阅读的论文链接。如果你想更深入了解这个领域，这会是一个理想的起点。
