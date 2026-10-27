---
title: "改进 LLM 应用的 17 种技巧"
slug: "how-to-improve-your-llm-powered-app"
type: "post"
description: "一份帮助你改进 LLM 应用的技巧目录。"
tags:
  - build-ai-apps
updatedAt: "2026-05-20T21:34:07.199Z"
---

当你已经明确成功标准、选好模型，并写出一些基础评估，就该开始改进系统了。

改进系统归根结底有两件事：

- 改进**反馈循环**，也就是评估
- 改进系统自身的**表现**

我们已经讨论过怎样改进评估。这篇文章会带你了解改进系统的主要方法。

不过，先聊聊做这件事需要什么心态。

> 译注：本文依据固定原文完整翻译，保留其模型、API 和文档状态所对应的历史时点，没有重新核验当前产品支持情况。标题写“17 种”，正文还列出第 18 项“下一个热门技术”，此处保留原有编号和标题层级。代码是原文片段，未提供完整依赖、模型配置或可运行工程；本次未调用模型验证效果。

## 先试最简单的办法

我们已经知道，改进 AI 系统是一个[不断实验的过程（中文）](/the-ai-engineer-mindset)（[英文原文](https://www.aihero.dev/the-ai-engineer-mindset)）：尝试不同办法，观察什么有效，再继续迭代。

改进系统的技巧有的简单便宜，有的复杂昂贵。改一改 Prompt？很便宜。从头训练模型？贵得惊人。

我把这称为“通往复杂度地狱的阶梯”：

![题为“通往优化地狱的阶梯”的图，台阶向下延伸，复杂度与成本逐步增加。从上到下依次为：零样本、少样本、思维链、温度、工作流、评估器、智能体循环、LLM 路由器、微调、采样。背景从青绿色渐变为红色，表示费用越来越高。](https://res.cloudinary.com/total-typescript/image/upload/v1742913291/aihero.dev/ai-roadmap/what-are-llms-useful-for/light/The_Staircase_To_Optimization_Hell_miqhxk.svg)

[查看原图深色版本](https://res.cloudinary.com/total-typescript/image/upload/v1742913151/aihero.dev/ai-roadmap/what-are-llms-useful-for/dark/The_Staircase_To_Optimization_Hell_wyqa9o.svg)。原图尺寸为 738 × 427。

关键是从阶梯最上方开始。只有更简单的办法都试过了，才往下走。简单技巧往往只需一点投入，就能带来很大改善。

## 可以尝试的技巧

下面按从简单到复杂的顺序排列。从最上面开始，逐步往下尝试。每项都附了进一步阅读的资料，方便你深入了解。

### 1. 第一个 Prompt

**问题**：总得找个起点。

**解决办法**：改进 Prompt 时，可以先遵循这些基本建议：

- 表达清楚、直接、具体。
- 把 LLM 当成一位非常聪明、但刚入职的员工。
- 记住，它并不了解你的惯例、风格或准则。

#### 参考资料

- [Anthropic 的建议](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct)有助于理解怎样写出好的 Prompt。
- [Anthropic Prompt 库](https://docs.anthropic.com/en/prompt-library/library)很适合用来寻找适合你场景的优秀 Prompt。
- [OpenAI 关于清晰指令的文档](https://platform.openai.com/docs/guides/prompt-engineering#strategy-write-clear-instructions)。

### 2. 角色设定提示

**问题**：不管输入是什么，你都希望 LLM 按某种方式行事。

**解决办法**：通过角色设定提示，让 LLM 扮演一个角色。

用途很多，比如调整说话语气：

```text
You are a friendly support engineer. Answer in short, plain sentences.
```

中文 Prompt（学习辅助）：

```text
你是一名友善的技术支持工程师。请用简短、朴实的句子回答。
```

甚至可以调整口音：

```text
You are a concise British copy editor. Keep the answer dry and understated.
```

中文 Prompt（学习辅助）：

```text
你是一名言简意赅的英式文字编辑。回答要克制、不夸张。
```

也可以预先设定讨论的主题：

```text
You are an AI engineering coach. Explain tradeoffs in terms of evals, latency, and cost.
```

中文 Prompt（学习辅助）：

```text
你是一名 AI 工程教练。请从评估、延迟和成本的角度解释各种取舍。
```

这种技巧非常常见，实现成本也很低，通常放在系统提示中。

> 译注：原文把第二个例子称为调整“口音”，但它实际给出的是英式编辑角色与文字风格要求，并不是语音口音配置。

#### 参考资料

- 我讲解 Vercel AI SDK [系统提示的视频原文](https://www.aihero.dev/system-prompts-with-vercel-ai-sdk)，也可阅读[中文教程](/system-prompts-with-vercel-ai-sdk)
- [Anthropic 关于角色设定提示的文档](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts)
- [OpenAI 关于要求模型扮演角色的文档](https://platform.openai.com/docs/guides/prompt-engineering#tactic-ask-the-model-to-adopt-a-persona)

### 3. XML 标签

#### 在输入中使用 XML 标签

**问题**：你想在一个 Prompt 中向 LLM 传入多份信息。

**解决办法**：使用 XML 标签。

XML 标签可以作为分隔符，把 Prompt 中的不同部分分开。

下面是原文引用的 Anthropic 文档中的财务报告示例：

```xml
<documents>
  <document index="1">
    <source>2025 annual report</source>
    <document_content>Revenue increased 18% year over year...</document_content>
  </document>
  <document index="2">
    <source>Q1 investor update</source>
    <document_content>Gross margin improved after infrastructure costs fell...</document_content>
  </document>
</documents>

Using only the documents above, summarize the main business risks.
```

中文 Prompt（学习辅助，保留 XML 标签与索引）：

```text
<documents>
  <document index="1">
    <source>2025 年年度报告</source>
    <document_content>营收同比增长 18%……</document_content>
  </document>
  <document index="2">
    <source>第一季度投资者简报</source>
    <document_content>基础设施成本下降后，毛利率有所改善……</document_content>
  </document>
</documents>

仅依据上面的文档，总结主要业务风险。
```

#### 在输出中使用 XML 标签

**问题**：你希望 LLM 在一次回答中给出几种不同的输出。

**解决办法**：要求 LLM 根据 XML 标签分别组织输出。

你还可以通过 Prompt 中的 XML 标签，告诉 LLM 应该输出哪些不同部分，从而更好地控制回答结构。

例如，让 LLM 审阅文章时，你可能希望它提供 `<summary>`、`<critique>` 和 `<recommended_changes>` 三部分。

```xml
Review this article and respond using this exact structure:

<summary>One paragraph summary</summary>
<critique>What is unclear or unsupported</critique>
<recommended_changes>Concrete edits to make next</recommended_changes>
```

中文 Prompt（学习辅助，保留输出标签）：

```text
审阅这篇文章，并严格按照以下结构回答：

<summary>用一段话概括文章</summary>
<critique>哪些地方不清楚，或缺乏依据</critique>
<recommended_changes>接下来应做的具体修改</recommended_changes>
```

这种技巧由 Anthropic 推广开来，不过大多数模型也支持。

#### 参考资料

- [Anthropic 关于在 Prompt 中使用 XML 标签的文档](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)
- [OpenAI 的文档](https://platform.openai.com/docs/guides/prompt-engineering#tactic-use-delimiters-to-clearly-indicate-distinct-parts-of-the-input)也提到，可以用 XML 标签作分隔符

#### 4. 限制 LLM 的回答格式

**问题**：你想严格限制 LLM 返回的文本，比如要求它只返回 JSON 或一个单词。

**解决办法**：使用结构化输出，或明确的格式指令。

较早版本的 Claude 支持通过“预填”助手消息来引导回答格式。按原文的产品时点，从 Claude 4.6 开始，预填会返回 400 错误。作者认为，现在有更好的替代办法：

**结构化输出（推荐）**：大多数 LLM 提供商已经支持结构化输出 Schema，保证回答符合指定的 JSON 结构。在 Vercel AI SDK 中，可以使用 `generateObject` 或 `streamObject`：

```ts
const result = await generateObject({
  model,
  schema: z.object({
    sentiment: z.enum(['positive', 'neutral', 'negative']),
    summary: z.string(),
  }),
  prompt: 'Classify this customer feedback...',
})
```

中文 Prompt（学习辅助，对应代码中的完整提示片段；省略号来自原文）：

```text
对这条客户反馈进行分类……
```

> 译注：Schema 中的 sentiment 枚举值 positive、neutral、negative 分别表示正面、中立、负面，summary 表示摘要。原文未给出实际客户反馈。结构化格式约束不等于内容一定正确；具体支持方式应以所用模型及 SDK 版本为准。

**系统提示指令**：对于较简单的限制，直接在系统提示里说明期望格式：

```text
Reply with exactly one of these labels: bug, feature-request, billing, or other.
Do not include any explanation.
```

中文 Prompt（学习辅助，保留机器读取的标签值）：

```text
回答必须且只能是以下标签之一：bug、feature-request、billing 或 other。
不要附带任何解释。
```

这两种办法都比预填更可靠。结构化输出能提供类型安全、经过校验的回答。如果你需要灵活的文本内容，同时要求它遵循特定形式，系统提示指令就能派上用场。

**参考资料**：

- [Anthropic：结构化输出](https://docs.anthropic.com/en/docs/build-with-claude/structured-outputs)
- [Vercel AI SDK：generateObject](https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-object)

### 5. 结构化输出

**问题**：你希望 LLM 返回结构化数据，而不是普通文本。

**解决办法**：使用结构化输出。

结构化输出让 LLM 以 JSON 等结构化格式返回数据。大多数 LLM 提供商允许你用 JSON Schema 描述期望的输出。

[Vercel AI SDK 原文教程](https://www.aihero.dev/structured-outputs-with-vercel-ai-sdk?list=vercel-ai-sdk-tutorial)介绍了一套尤其适合这件事的工具，也可阅读[中文教程](/structured-outputs-with-vercel-ai-sdk?list=vercel-ai-sdk-tutorial)。

#### 参考资料

- [Anthropic 关于 JSON 模式的文档](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/increase-consistency)

### 6. 推理

**问题**：LLM 在编程、数学题等复杂的多步推理任务上，表现还不够好。

**解决办法**：用思维链（Chain of Thought，CoT）提示，让 LLM 逐步推理问题。

思维链提示鼓励 LLM 一步一步拆解问题，从而得到更准确、更细致的输出。对需要复杂推理、分析或问题求解的任务，这种技巧尤其有效。

思维链提示主要有三种做法，按从简单到复杂排列：

1. **基础 CoT**：只需在 Prompt 中加入英文指令 “Think step-by-step”（中文：请一步一步思考）。这种做法很简单，但没有指导模型具体该怎么想。
2. **引导式 CoT**：列出明确的步骤，让 LLM 在思考时遵循。
3. **结构化 CoT**：用 `<thinking>` 和 `<answer>` 等 XML 标签，把推理与最终答案分开。

中文版 Prompt（学习辅助，对应上面基础 CoT 的完整英文指令）：

```text
请一步一步思考。
```

思维链提示以速度换质量。LLM 需要处理并输出推理步骤，所以响应时间会变长。对实时应用来说，这个取舍尤其重要：聊天机器人需要快速回答，代码审查工具则可以花更长时间进行细致分析。

> 译注：本节介绍原文中的提示方法，不表示所有模型都会公开内部推理。显式生成的分析文字与模型内部隐藏推理并非同一事物，具体可见输出和延迟取决于所用模型。

#### 参考资料

- [Anthropic 关于思维链提示的文档](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought)
- [OpenAI 关于给模型留出思考时间再下结论的建议](https://platform.openai.com/docs/guides/prompt-engineering#tactic-instruct-the-model-to-work-out-its-own-solution-before-rushing-to-a-conclusion)

### 7. 多样本提示

**问题**：LLM 需要理解某种特定模式或格式，但一个例子还不足以让它掌握。

**解决办法**：提供多个示例，帮助 LLM 理解模式。

多样本提示可以取得类似微调的效果，却不必承担训练新模型的成本和复杂度。它的做法是向模型展示你期望它完成任务的示例。

过程很直接：给出几个输入与输出的例子，模型就能从中学到模式。不需要训练数据或用于训练的计算资源。

下面是写产品描述的实用例子：

```text
Write product descriptions in this style.

Input: Noise-canceling headphones
Output: Sink into your work with soft over-ear cushions and active noise cancellation that quiets the room around you. Great for deep focus, travel, and calls that need fewer distractions.

Input: Standing desk
Output: Move from sitting to standing in seconds with a sturdy desk that keeps your monitor, keyboard, and coffee exactly where you need them. Built for long workdays without locking you into one posture.

Input: Running shoes
Output: Light foam, breathable mesh, and a grippy sole make these shoes feel quick without beating up your feet. Perfect for daily miles, recovery runs, and the walk home after.

Input: Coffee maker
Output:
```

中文 Prompt（学习辅助，完整保留三组示例和最后待补的输出）：

```text
按照以下风格撰写产品描述。

输入：降噪耳机
输出：柔软的包耳式耳垫，加上能让周围安静下来的主动降噪，让你沉浸于工作。无论是深度专注、外出旅行，还是希望减少干扰的通话，都很合适。

输入：升降桌
输出：几秒钟就能从坐姿切换为站姿。稳固的桌面让显示器、键盘和咖啡始终待在顺手的位置。专为漫长的工作日打造，不必一直保持同一个姿势。

输入：跑鞋
输出：轻盈泡棉、透气网面和抓地鞋底，让步伐轻快，同时减轻双脚负担。日常跑量、恢复跑，以及跑完后走回家的路，都能轻松应对。

输入：咖啡机
输出：
```

看到这些示例后，模型会学着使用富有感官细节、突出使用好处的语言来写产品描述。接着给它 “Input: Coffee maker”（中文：输入：咖啡机），它就会生成风格相似的描述。

多样本提示与零样本提示相对。后者只描述要求，不提供例子。

> 译注：这里的“学到模式”指模型根据当前上下文作答，并不意味着通过这些示例更新了模型参数。“不需要计算资源”在原文语境中指不需要另做训练；推理本身仍会消耗资源。

#### 参考资料

- [Anthropic 关于多样本提示的文档](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting)
- [OpenAI 关于提供示例的文档](https://platform.openai.com/docs/guides/prompt-engineering#few-shot-learning)

### 8. 温度

**问题**：LLM 的输出要么过于固定、显得无聊，要么太随机、不可靠。

**解决办法**：调整温度参数，控制输出的随机性。

你可以向 LLM 传入温度参数，它会控制输出有多随机或多确定。

把温度想成创意旋钮就好。写代码或需要准确事实时，可以设为 0.0–0.3，让模型更倾向于选择概率最高的输出。一般聊天或创意写作，0.4–0.7 的中间档能取得不错的平衡。头脑风暴或需要新点子时，则可以提高到 0.8–1.2。

温度越高，输出可能越有趣，但也可能产生更多幻觉。我的一般建议是先保守一点，只有需要更多变化时才往上调。

无论如何，这是一种尝试成本较低的技巧。

> 译注：这些范围是作者的经验建议，并非所有模型通用的有效取值或准确率保证；有些模型不支持调整该参数。

#### 参考资料

- [OpenAI API 参考](https://platform.openai.com/docs/api-reference/chat/create)解释了温度怎样影响 Token 采样

### 9. 工具调用

**问题**：LLM 只能生成文本，无法直接与外部系统交互，也无法在现实环境中执行操作。

**解决办法**：让 LLM 能够调用指定函数或工具，把能力扩展到文本生成之外。

工具调用把 LLM 的内部能力与外部世界连接起来，让它能够发起 API 调用、访问数据库或操作文件。LLM 描述自己想做什么，再由系统用指定参数执行相应工具。

当你需要 LLM 与外部服务交互、执行系统操作，或者访问训练数据中没有的信息时，这种模式特别有用。它是构建更强大 AI 应用的基础组成部分。

你可以通过[我的原文教程](https://www.aihero.dev/tool-calls-with-vercel-ai-sdk?list=vercel-ai-sdk-tutorial)学习怎样用 Vercel AI SDK 实现这种模式，也可阅读[中文教程](/tool-calls-with-vercel-ai-sdk?list=vercel-ai-sdk-tutorial)。

#### 参考资料

- [Anthropic 关于工具调用的文档](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview)
- [OpenAI 关于函数调用的文档](https://platform.openai.com/docs/guides/function-calling)

### 10. 串联 LLM 调用

**问题**：一次 LLM 调用不足以完成复杂任务。

**解决办法**：把任务拆成多次前后衔接的 LLM 调用。

当你需要对同一份输入执行多种专门操作时，把所有事情塞进一个 Prompt，结果往往不理想。每项操作可能都需要不同的专长和关注点。

这时就可以串联 LLM 调用。不要让一个 Prompt 包办一切，而是拆成几个专门步骤。每个 Prompt 只关注任务的一方面，它的输出再成为下一个 Prompt 的输入。

![多个 LLM 调用按顺序连接：前一步的输出传给下一步，最后到达预先固定的停止点。](https://res.cloudinary.com/total-typescript/image/upload/v1742909864/aihero.dev/ai-roadmap/what-are-llms-useful-for/light/Workflows_fsublh.svg)

[查看原图深色版本](https://res.cloudinary.com/total-typescript/image/upload/v1742909848/aihero.dev/ai-roadmap/what-are-llms-useful-for/dark/Workflows_mf982s.svg)。原图尺寸为 798 × 168。

以代码分析和生成修复为例。第一个 Prompt 充当代码分析员，识别代码中的问题并分类，为每个问题提供背景，形成结构化分析。

第二个 Prompt 再利用分析结果，生成有针对性的修复。这样把职责分开，每个 Prompt 都能针对自己的任务单独优化，比把两项操作塞进一个 Prompt 更容易得到好结果。

这种模式还适用于很多场景：

- 先分析文档结构，再生成摘要
- 先找出辩论的关键观点，再组织平衡的回应
- 先从研究资料中提取事实，再写成普通人能理解的说明
- 先识别代码中的缺陷，再分别生成修复

#### 参考资料

- [Anthropic 关于串联 Prompt 的文档](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts)
- 原文更新：**OpenAI 已删除其关于使用内心独白的指南**

### 11. RAG

**问题**：LLM 无法访问所需的信息，因此开始编造事实。

**解决办法**：通过检索增强生成，让它能接触真实数据。

RAG 是一种有效技巧，可以让 LLM 的回答以实际数据为依据，减少幻觉。每个 LLM 的训练数据都有截止时间，它无法仅凭训练数据得知之后发生的事件或出现的信息。与其只依赖训练时学到的内容，不如在需要时查找新信息。

![数据库把外部信息提供给 LLM 的 Prompt，从而丰富输出。](https://res.cloudinary.com/total-typescript/image/upload/v1742909869/aihero.dev/ai-roadmap/what-are-llms-useful-for/light/RAG_rnyqtx.svg)

[查看原图深色版本](https://res.cloudinary.com/total-typescript/image/upload/v1742909849/aihero.dev/ai-roadmap/what-are-llms-useful-for/dark/RAG_qpsuew.svg)。原图尺寸为 841 × 206。

向 LLM 提供数据主要有两条途径。网页搜索可以获得当前信息和公开知识；公司数据库与文档则能提供私有、领域专用的信息。当你需要回答公司内部流程的问题，或希望 LLM 的回答跟得上最新情况时，这尤其有用。

构建 LLM 应用时，不应一开始就上 RAG。它会显著增加系统复杂度：你需要管理数据源、处理检索，还要保证内容不超出上下文窗口限制。

#### 参考资料

- [OpenAI 关于 RAG 和语义搜索的文章](https://help.openai.com/en/articles/8868588-retrieval-augmented-generation-rag-and-semantic-search-for-gpts)，其官方文档也有[相关章节](https://platform.openai.com/docs/guides/optimizing-llm-accuracy#retrieval-augmented-generation-rag)

### 12. 分块

**问题**：你想检索的信息太大，放不进上下文窗口。

**解决办法**：把信息拆成更小、更容易处理的块。

分块是 RAG 系统的一项基础技巧，它把大文档拆成较小的片段。目标是让每块既有完整的语义，又足够小，能放进模型的上下文窗口。

分块的复杂之处，在于内容可以按很多方式拆分。主要方法有：

- **按 Token**：按 Token 数量切分，确保不超出模型限制
- **按字符**：按字符数切分，适合处理原始文本
- **按句子**：保留自然语言的边界
- **按段落**：保留较大的语义单元
- **按语义边界**：用嵌入向量寻找自然的分界点
- **按文档结构**：遵循标题、章节等文档格式

分块后，还需要为每个查询找出最相关的块。主要方法有：

- **BM25**：传统搜索算法，通过词语精确匹配查找内容，很适合技术术语和错误代码
- **嵌入向量**：把文本转换成向量，寻找语义相近的块
- **混合搜索**：结合 BM25 与嵌入向量，争取更好的结果
- **LLM 重排**：使用另一个 LLM 仔细阅读各块，并按相关性重新排序

各种方法各有长处：BM25 擅长精确匹配，嵌入向量擅长捕捉含义。许多系统会组合多种方法，以获得最好的结果。

#### 参考资料

- [Pinecone 的分块策略指南](https://www.pinecone.io/learn/chunking-strategies/)
- [Anthropic 关于上下文检索的研究](https://www.anthropic.com/news/contextual-retrieval)
- [评估分块策略的研究论文](https://research.trychroma.com/evaluating-chunking)

### 13. 智能体循环

**问题**：串联 LLM 调用对复杂任务来说太死板。它要求预先确定步骤和停止点，不适合步骤数量无法预测的开放式问题。

**解决办法**：把控制权交给自主智能体，让它能够规划、执行，并根据环境反馈调整。

串联调用采用预定步骤和停止点，限制了它处理不可预测任务的能力。智能体循环把更多控制权交给 LLM，让它根据任务进展决定何时停止。智能体通过真实环境的反馈判断什么时候该结束。

![LLM 在循环中与 API 交互，把执行结果再次放入 Prompt，直到它决定停止。](https://res.cloudinary.com/total-typescript/image/upload/v1742909863/aihero.dev/ai-roadmap/what-are-llms-useful-for/light/Agentic_Loop_qsdugl.svg)

[查看原图深色版本](https://res.cloudinary.com/total-typescript/image/upload/v1742909843/aihero.dev/ai-roadmap/what-are-llms-useful-for/dark/Agentic_Loop_hzdnou.svg)。原图尺寸为 783 × 278。

这样的系统更强大，因为它能适应不可预测的执行路径。它不必只遵循预定步骤，而是根据每次交互学习和调整，因此适合解决那些事先不知道解法的复杂问题。

自主性也有代价：每一步都要决策，会增加延迟。LLM 必须评估当前状态，选择接下来最合适的路径。因此，智能体循环比串联 LLM 调用更慢，但也更能应对复杂任务。

这种模式适合：

- 跨多个文件进行复杂代码修改
- 需要多个信息来源的研究任务
- 处理路径无法预测的客户支持场景
- 需要多个处理步骤的数据分析

> 译注：此处“学习和调整”描述运行时依据反馈作出决策，不表示每次交互都在训练模型或更新权重。

#### 参考资料

- [Anthropic 关于构建有效智能体的文章](https://www.anthropic.com/engineering/building-effective-agents)

### 14. 并行执行 LLM 调用

**问题**：LLM 系统一次只处理一项任务，产生不必要的等待，导致整体太慢。

**解决办法**：同时运行多个 LLM 调用，让独立任务并行完成，显著缩短总处理时间。

让系统更快只有两种办法：少做一些工作，或同时做更多工作。当多个任务彼此独立时，并行执行 LLM 调用能大幅改善性能。

任务相互独立、不依赖彼此结果时，就可以并行：

- 分析多份文档
- 生成内容的不同版本
- 同时处理多个用户查询

必须按顺序执行的任务则不能并行：

- 每一步都依赖上一步的输出
- 严格顺序对最终结果至关重要

性能收益可能很大。一个系统逐份处理 10 份文档可能需要 10 秒，而并行处理可能只需 2–3 秒。你应该始终寻找并行的机会：即使系统表面上必须顺序执行，也可能存在能够并发处理的独立部分。

> 译注：上述秒数是原文的说明性例子，并非本次测量结果。

#### 参考资料

- [Anthropic 关于构建有效智能体的文章](https://www.anthropic.com/engineering/building-effective-agents)提到了并行 LLM 调用
- [OpenAI 文档](https://platform.openai.com/docs/guides/latency-optimization#parallelize)也有专门介绍并行 LLM 调用的章节

### 15. 评估器—优化器

**问题**：即使试了多次，LLM 的回答仍然达不到你需要的质量标准。

**解决办法**：建立自动循环：一个 LLM 生成回答，另一个评估回答，并提供改进反馈。

评估器—优化器工作流让两个 LLM 协作，形成能够持续改进的系统。第一个 LLM 生成回答，第二个按具体标准评估，再把评估结果反馈给生成过程，构成持续改进的循环。

当你有明确的评估标准，而且反复打磨确实能带来可测量的价值时，这种模式尤其有效。如果人的反馈能明显改善 LLM 的回答，而 LLM 又能提供质量相近的反馈，就很适合使用它。

这种模式特别擅长文学翻译等场景：评估 LLM 可以发现翻译模型一开始漏掉的细微含义。对需要多轮搜索与分析的复杂搜索任务，它也很有效；评估器可以决定是否需要继续搜索。

#### 参考资料

- [Anthropic 关于构建有效智能体的文章](https://www.anthropic.com/engineering/building-effective-agents)介绍了评估器—优化器模式

### 16. LLM 路由器

**问题**：不同类型的查询，需要不同的处理策略。

**解决办法**：用一个 LLM 把查询转交给最合适的处理器。

LLM 路由器就像智能调度员：分析每个查询，再把它交给合适的专门处理器。

路由器首先分析查询，判断类型与复杂程度。例如，客服系统可能把查询分为以下几类：

> 译注：固定原文在这里留白，没有给出类别清单；此处不补造示例。

根据分类结果，路由器把查询交给相应处理器。每个处理器有自己的一套指令与能力。

这种路由方式有几个重要优点。它确保每个查询都由最合适的专用系统处理，从而提高准确性；也让每个专用 LLM 能专注于自己的领域，类似于把复杂任务拆成专门步骤的 LLM 调用链。

它还解决了 LLM 的一个基础限制：大多数模型只能处理有限数量的工具，通常不超过 30 个。将查询路由到专门的处理器后，每个处理器只需访问相关的一小部分工具，整个系统就能有效处理数量不受这一单模型限制的工具。

> 译注：原文将系统可处理的工具数量称为“无限”，并给出“通常 30 个或更少”的经验判断。这不是所有模型统一的硬性上限，也不是系统容量真的无穷；此处保留其通过分组路由扩展工具规模的原意，具体限制未在本文验证。

不过，加入 LLM 路由器也会增加一个串行步骤。每个查询都必须先分析，再转交给合适的处理器，因此延迟会上升。

#### 参考资料

- [Anthropic 关于构建有效智能体的文章](https://www.anthropic.com/engineering/building-effective-agents)提到了 LLM 路由器
- 原文更新：**OpenAI 已删除其关于意图分类的文档**

### 17. 微调

**问题**：你对 LLM 输出有具体的质量要求，而简单技巧无法满足。

**解决办法**：用自己的特定数据微调基础模型，改善它在目标场景中的表现。

微调能让现有模型更适合你的需求。你可以从规模较小的高质量示例集开始，明确展示所需输出，无论是贴合品牌口吻、处理专门术语，还是保持格式一致。在特定任务上，经过微调的小模型往往能胜过更大、更贵的模型。

从成本和复杂度来看，微调介于预训练与提示工程之间。虽然比从头训练模型便宜一个数量级，但每次微调仍会产生额外费用。此外，还可能过度适配特定模型版本，使将来迁移到更新、更好的模型变得困难。

考虑微调的最佳时机，是你已经有了一个能工作的系统，并且用过较简单的技巧。此时，你已经验证了使用场景，积累了真实数据，也找到了模型表现需要改善的具体部分。微调便成了进一步提升系统表现的优化步骤。

#### 参考资料

- OpenAI 文档有介绍微调的[专门章节](https://platform.openai.com/docs/guides/optimizing-llm-accuracy#fine-tuning)
- Anthropic 的[微调指南](https://docs.anthropic.com/en/docs/fine-tuning)提供了详细要求与最佳实践

### 18. 下一个热门技术

AI 工程发展得非常快。每周都有新模型、新技巧、新工具出现，宣称要彻底改变构建 AI 系统的方式。你不可能跟上所有变化，也没有这个必要。

每项 AI 新进展都得证明自己值得进入你的系统。问问自己：“它让事情更简单，还是更复杂？它解决了一个真实问题吗？”最有价值的进展能够降低成本、改善表现，或让系统更容易维护。

AI 的下一个热门技术会来，也会过去，但简单始终是可靠的方向。用你自己的评估来试验新技巧，按照具体使用场景和成功标准检验它们。把注意力放在那些能让系统更有效、同时减少复杂度的进展上。
