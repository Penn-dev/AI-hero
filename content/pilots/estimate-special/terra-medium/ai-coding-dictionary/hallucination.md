---
title: "幻觉"
slug: "hallucination"
type: "dictionary"
description: "模型自信却错误的输出。分为两类：事实性问题（编造事实）和忠实性问题（偏离已加载的上下文）。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
[模型](/ai-coding-dictionary/model)自信却错误的输出。它有两种类型，成因和处理方法不同：

| 类型 | 出了什么问题 | 原因 | 处理方法 |
| --- | --- | --- | --- |
| _事实性（Factuality）_ | 编造或说错了现实世界中的事实——例如不存在的函数、错误的 API 签名、虚假的引用来源 | [参数化知识](/ai-coding-dictionary/parametric-knowledge)存在空缺，尤其是超过[知识截止日期](/ai-coding-dictionary/knowledge-cutoff)的信息 | 加载正确的[上下文知识](/ai-coding-dictionary/contextual-knowledge) |
| _忠实性（Faithfulness）_ | 输出偏离了已加载的上下文知识、用户指令，或模型自己此前的推理 | [注意力衰减](/ai-coding-dictionary/attention-degradation)；在[低效区](/ai-coding-dictionary/smart-zone)会更严重 | [清空](/ai-coding-dictionary/clearing)或[压缩](/ai-coding-dictionary/compaction) |

[下一个 Token 预测](/ai-coding-dictionary/next-token-prediction)无论背后的事实是否真实，都会生成流畅的输出——模型没有一个内部信号能告诉自己“我不知道这件事”，因此编造的方法名和正确的方法名一样，会以很肯定的语气出现。产生幻觉的代码天生就很像真的：如果这个 API 真的存在，它大概就会长成那样；也正因如此，它很容易躲过只粗看一遍的审查，直到实际运行时才失败。

你需要先分清遇到的是哪一类，因为解决其中一类的方法会让另一类更糟。事实性问题表示知识缺失：应补充上下文，例如文档、类型定义或文件。忠实性问题表示正确知识已经在上下文中，却在争夺注意力时落败：应减少上下文。若把忠实性问题误判为事实性问题，就会粘贴更多文档，增加上下文，反而让偏离更严重。智能体出错时，在决定问题类别前，先检查正确的信息是否已经在上下文中。

_避免使用：_把“幻觉”不加区分地当作“错误”的同义词——不说明类型，这个词就没有诊断价值。

_用法：_

“它凭空说 schema 上有一个 `parseAsync` 方法。”

“是事实性问题，还是忠实性问题？”

“这个方法就在我粘贴的文档里——只是到第 40 [对话轮次](/ai-coding-dictionary/turn)后，它不再读那些文档了。”

“那就是忠实性问题。压缩后重新加载，不用再补更多文档。”

## 中文学习辅助：术语小词典

- **hallucination**：幻觉，模型用很肯定的语气给出错误或凭空编造内容的现象。
- **API**：应用程序接口，一套让不同软件按约定互相调用功能的规则。
- **Factuality**：事实性，指输出中的事实本身是否真实、正确。
- **Faithfulness**：忠实性，指输出是否忠于已经给它的资料、指令和推理过程。
