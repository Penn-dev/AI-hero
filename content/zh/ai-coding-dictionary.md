---
title: "用通俗语言讲清 AI 编码词汇"
slug: "ai-coding-dictionary"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

AI Hero · 词典

# 用通俗语言讲清 AI 编码词汇

用便于速读的定义，讲清帮助你理解智能体编程的术语。可以搜索下面的 71 个词条，也可以直接跳到某个分类。

[5,054 · mattpocock/dictionary-of-ai-coding](https://github.com/mattpocock/dictionary-of-ai-coding)

> **译注：原站快照。** 上面的仓库名和数字来自冻结的原页内容，不代表实时数值。以下简短定义沿用原词典的术语范围；具体用法、例子和适用边界见各词条。

- [#模型](#the-model)
- [#会话、上下文窗口与工作轮次](#sessions-context-windows-turns)
- [#工具与环境](#tools-environment)
- [#失败模式](#failure-modes)
- [#交接](#handoffs)
- [#记忆与行为引导](#memory-and-steering)
- [#工作模式](#patterns-of-work)

搜索词典……

> **译注：搜索入口。** 原站在桌面和移动布局各提供一个标为“搜索词典……”的搜索框。本页列出完整词条，方便按分类阅读或使用浏览器的页面查找；需要原站的词典筛选时，请打开[原站词典](https://www.aihero.dev/ai-coding-dictionary)。本页这段文字不是可输入的搜索框。

分类

- [#模型，16 个词条](#the-model)
- [#会话、上下文窗口与工作轮次，8 个词条](#sessions-context-windows-turns)
- [#工具与环境，10 个词条](#tools-environment)
- [#失败模式，9 个词条](#failure-modes)
- [#交接，9 个词条](#handoffs)
- [#记忆与行为引导，6 个词条](#memory-and-steering)
- [#工作模式，13 个词条](#patterns-of-work)

## [模型](#the-model)

16 个词条

- [AI](/ai-coding-dictionary/ai)：一个不断变化的标签，不是一种技术。它指向计算机新近能做到、令人印象深刻的事情，眼下指的是大语言模型。

- [模型（Model）](/ai-coding-dictionary/model)：模型就是参数。它是无状态的，只做下一个 Token 预测，除此之外什么也不做。模型本身无法像智能体那样采取行动。

- [参数（Parameters）](/ai-coding-dictionary/parameters)：模型内部的数值，通常有数十亿个，在训练中调整。模型掌握的一切都保存在这些数值里，也叫权重。

- [训练（Training）](/ai-coding-dictionary/training)：让模型接触大量文本，调整参数来改善下一个 Token 预测，并由此确定模型参数的过程。

- [推理（Inference）](/ai-coding-dictionary/inference)：运行已经训练好的模型来生成输出。每次模型提供商请求都会进行推理，参数保持不变。

- [推理投入程度（Effort）](/ai-coding-dictionary/effort)：控制模型回答前进行多少推理的设置。投入更多，会消耗更多输出 Token，以提高解决困难问题的机会。

- [Token](/ai-coding-dictionary/token)：模型读取和写出的最小单位。大小大致相当于一个词，但并不完全相同。上下文窗口大小、费用和延迟都与 Token 数量有关。

- [下一个 Token 预测（Next-token prediction）](/ai-coding-dictionary/next-token-prediction)：模型实际做的事：根据上下文抽取下一个 Token，把它接到后面，再运行一次。这是它唯一的工作方式。

- [非确定性（Non-determinism）](/ai-coding-dictionary/non-determinism)：相同输入也可能产生不同输出。这是模型生成文本和提供商处理请求的方式所带来的性质。

- [模型提供商（Model provider）](/ai-coding-dictionary/model-provider)：提供模型推理服务的一方。通常是 Anthropic、OpenAI、Google 这样的远程服务，也可以是 Ollama、llama.cpp 这样的本地服务。

- [智能体执行框架（Harness）](/ai-coding-dictionary/harness)：围绕模型、让它成为智能体的一整套东西：工具、系统提示词、上下文窗口管理、权限和钩子。

- [模型提供商请求（Model provider request）](/ai-coding-dictionary/model-provider-request)：执行框架与模型提供商之间的一次往返。执行框架发送上下文，提供商返回一个回应。

- [输入 Token（Input tokens）](/ai-coding-dictionary/input-tokens)：执行框架在每次模型提供商请求中发送的 Token，计费单价低于输出 Token。

- [输出 Token（Output tokens）](/ai-coding-dictionary/output-tokens)：模型生成并返回的 Token。因为生成它们需要更多计算，所以单价高于输入 Token。

- [前缀缓存（Prefix cache）](/ai-coding-dictionary/prefix-cache)：模型提供商一侧的存储机制，让连续请求跳过相同开头的重复处理，并以更低费率计算这部分 Token。

- [缓存 Token（Cache tokens）](/ai-coding-dictionary/cache-tokens)：提供商通过前缀缓存保留的上次请求输入 Token，以低得多的费率计费。

## [会话、上下文窗口与工作轮次](#sessions-context-windows-turns)

8 个词条

- [无状态（Stateless）](/ai-coding-dictionary/stateless)：不把信息延续到后面。模型在请求之间无状态；默认情况下，智能体在会话之间也无状态。

- [上下文（Context）](/ai-coding-dictionary/context)：智能体眼下能够访问、与当前任务有关的信息，也就是它所掌握的任务相关知识。

- [上下文窗口（Context window）](/ai-coding-dictionary/context-window)：模型每次收到模型提供商请求时能看到的全部内容。容量有限，大小因模型而异，也是模型感知任何信息的唯一入口。

- [有状态（Stateful）](/ai-coding-dictionary/stateful)：把信息延续到后面。会话在工作轮次之间有状态；通过记忆系统，也可以让智能体在会话之间有状态。

- [智能体（Agent）](/ai-coding-dictionary/agent)：把模型接入执行框架，配上工具、系统提示词和上下文窗口，让它与用户一轮轮协作。这就是实际运行起来的模型。

- [系统提示词（System prompt）](/ai-coding-dictionary/system-prompt)：执行框架在每次模型提供商请求的开头加入的指令，是智能体的长期工作说明。通常在一次会话中保持稳定。

- [会话（Session）](/ai-coding-dictionary/session)：与智能体进行的一段有起点和终点的交互。从空白开始，不断积累内容，在清空、关闭，或压缩后转入新会话时结束。

- [工作轮次（Turn）](/ai-coding-dictionary/turn)：一条用户消息，加上智能体为回应这条消息所做的一切，直到它把控制权交回用户。包含一次或多次提供商请求。

## [工具与环境](#tools-environment)

10 个词条

- [环境（Environment）](/ai-coding-dictionary/environment)：智能体采取行动的世界，也就是执行框架之外、智能体通过工具结果感知并通过工具调用改变的东西。

- [文件系统（Filesystem）](/ai-coding-dictionary/filesystem)：由文件和目录组成的树形结构，智能体在其中读取、写入和执行操作。它是编程智能体默认使用的环境。

- [工具（Tool）](/ai-coding-dictionary/tool)：执行框架提供给智能体调用的函数，例如 Read、Write、Bash、Search。智能体通过工具感知环境，并对环境采取行动。

- [工具调用（Tool call）](/ai-coding-dictionary/tool-call)：模型输出的工具名称和参数，本质上只是一段结构化文本。执行框架必须读取并执行，它才会产生效果。

- [工具结果（Tool result）](/ai-coding-dictionary/tool-result)：执行框架执行工具调用后返回的内容，例如文件内容、输出或错误。这是智能体观察环境的唯一途径。

- [MCP](/ai-coding-dictionary/mcp)：把外部工具服务器接入执行框架的协议，让智能体获得框架自带工具之外的工具。

- [权限请求（Permission request）](/ai-coding-dictionary/permission-request)：执行框架执行未经预先批准的工具调用前，向用户展示的请求。它让人参与操作决策。

- [权限模式（Permission mode）](/ai-coding-dictionary/permission-mode)：智能体模式中负责权限控制的部分，决定哪些工具调用触发权限请求，哪些自动运行。

- [智能体模式（Agent mode）](/ai-coding-dictionary/agent-mode)：把权限模式和注入系统提示词的行为指令打包在一起的预设，可以在会话中途切换。

- [沙箱（Sandbox）](/ai-coding-dictionary/sandbox)：智能体在其中运行的隔离环境，例如容器、虚拟机或受限 shell。它限制智能体操作造成的影响范围。

## [失败模式](#failure-modes)

9 个词条

- [迎合（Sycophancy）](/ai-coding-dictionary/sycophancy)：模型自信地表示赞同。成因在于训练让模型偏向人类喜欢的回答，其中也包括同意人类。

- [幻觉（Hallucination）](/ai-coding-dictionary/hallucination)：模型以肯定语气给出的错误内容。分为两类：事实准确性问题，也就是编造事实；忠实性问题，也就是偏离已加载的上下文。

- [参数知识（Parametric knowledge）](/ai-coding-dictionary/parametric-knowledge)：模型从训练中获得、保存在参数里的知识，在训练时固定。与上下文知识相对。

- [知识截止时间（Knowledge cutoff）](/ai-coding-dictionary/knowledge-cutoff)：模型的参数知识所止于的日期。截止之后的库和 API，如果没有加载文档，就容易让模型编造内容。

- [上下文知识（Contextual knowledge）](/ai-coding-dictionary/contextual-knowledge)：智能体眼下能直接从上下文中读取的事实，与参数知识相对。

- [注意力关系（Attention relationship）](/ai-coding-dictionary/attention-relationship)：两个 Token 之间的配对关系。有意义的配对比无关配对更能相互影响。含 N 个 Token 的上下文，大约有 N² 个这样的关系。

- [注意力预算（Attention budget）](/ai-coding-dictionary/attention-budget)：每个 Token 能分配给其余上下文的影响力有限。这是每个 Token 各自的预算，不会随着上下文变长而增加。

- [注意力衰减（Attention degradation）](/ai-coding-dictionary/attention-degradation)：会话变长时，每个 Token 的注意力预算要分给更多竞争者，有意义关系上的信号会减弱。

- [高效区（Smart zone）](/ai-coding-dictionary/smart-zone)：会话早期，智能体敏锐而专注；随着会话变长，它逐渐进入低效区，变得粗心、健忘、错误更多。

## [交接](#handoffs)

9 个词条

- [清空（Clearing）](/ai-coding-dictionary/clearing)：结束当前会话，开启新会话。下一条消息从空白会话和空白上下文窗口开始。

- [交接（Handoff）](/ai-coding-dictionary/handoff)：把智能体的上下文从一个会话转移到另一个会话，后者不能回头追问。承载方式可以是文档、压缩等。

- [一手来源（Primary source）](/ai-coding-dictionary/primary-source)：对象本身，例如代码、对话记录和原始数据。完整、权威，但加载进上下文的成本较高。

- [二手来源（Secondary source）](/ai-coding-dictionary/secondary-source)：对一手来源的描述，隔了一层，例如摘要、文档和压缩摘要。加载便宜，但必然丢失部分信息。

- [交接材料（Handoff artifact）](/ai-coding-dictionary/handoff-artifact)：用于承载交接内容的文档，由一个会话写下，供另一个会话读取。

- [规格（Spec）](/ai-coding-dictionary/spec)：描述一项跨会话工作的交接材料，说明要构建什么，而不是每个会话怎样完成自己的部分。由工单组成。

- [工单（Ticket）](/ai-coding-dictionary/ticket)：限定一个会话工作范围的交接材料，可以独立存在，也可以属于一份规格。工单之间可以相互形成前置依赖。

- [压缩（Compaction）](/ai-coding-dictionary/compaction)：在内存中完成的交接：把上个会话的历史总结成摘要，用它开启新会话。这是有损的，用细节换取空间。

- [自动压缩（Autocompact）](/ai-coding-dictionary/autocompact)：上下文窗口接近装满时，由执行框架自动触发的压缩。

## [记忆与行为引导](#memory-and-steering)

6 个词条

- [记忆系统（Memory system）](/ai-coding-dictionary/memory-system)：一种尝试让智能体跨会话保持状态的系统：把信息持久保存到环境中，再在会话开始时重新加载。

- [AGENTS.md](/ai-coding-dictionary/agents-md)：保存在环境中的文件，执行框架在会话开始时把它加载到上下文窗口。它是项目交给智能体的长期工作说明。

- [渐进式披露（Progressive disclosure）](/ai-coding-dictionary/progressive-disclosure)：只加载智能体眼下需要的上下文，其余内容用上下文指针标明位置。这个思路借鉴自界面设计。

- [上下文指针（Context pointer）](/ai-coding-dictionary/context-pointer)：一份文档中指向另一份文档的说明，让智能体只在任务需要时才把后者加载进上下文。

- [Skill](/ai-coding-dictionary/skill)：把一种可传授的能力打包成一个整体。在当前任务需要、由上下文指针引入之前，它留在上下文窗口之外。

- [子智能体（Subagent）](/ai-coding-dictionary/subagent)：由另一个智能体通过工具调用启动的智能体。它在自己的会话中运行，返回一项工具结果，不能继续启动更下层子智能体。

## [工作模式](#patterns-of-work)

13 个词条

- [人工参与（Human-in-the-loop）](/ai-coding-dictionary/human-in-the-loop)：一种工作方式：一名或多名人类在会话中与智能体配合，实时审查、调整方向或协作。

- [AFK](/ai-coding-dictionary/afk)：Away from keyboard，离开键盘。用户启动会话后，留下智能体无人看管地运行的一种工作方式。

- [自动检查（Automated check）](/ai-coding-dictionary/automated-check)：在环境中运行的确定性验证，例如测试、类型检查、静态检查、构建和提交前钩子。只有通过或失败，不作主观判断。

- [自动审查（Automated review）](/ai-coding-dictionary/automated-review)：一个智能体审查另一个智能体的工作，通常使用不同模型或系统提示词。它会作判断，因此具有非确定性。

- [人工审查（Human review）](/ai-coding-dictionary/human-review)：用户阅读智能体生成的代码，并作出判断。读改动差异算，读摘要不算。

- [Vibe coding](/ai-coding-dictionary/vibe-coding)：用户不进行人工审查，就接受智能体代码的工作方式。代码改动差异被当作不打开查看的东西。

- [设计构想（Design concept）](/ai-coding-dictionary/design-concept)：用户与智能体对正在构建什么的共同理解。双方共享它，但它独立于任何具体文档或成果。

- [追问（Grilling）](/ai-coding-dictionary/grilling)：与智能体完善设计构想的方法：智能体用苏格拉底式访谈，一次讨论一个决定。

- [原型制作（Prototyping）](/ai-coding-dictionary/prototyping)：让智能体快速做出一个粗略版本。对话不够具体时，需要真实成果作为讨论对象。

- [DX：开发者体验](/ai-coding-dictionary/dx)：Developer experience，代码库和工具链让人做好工作有多容易，包括文档、反馈速度和错误信息。

- [AX：智能体体验](/ai-coding-dictionary/ax)：Agent experience，环境对智能体做好工作的支持程度，体现在检查、架构和可用上下文空间等方面。

- [软件工厂（Software factory）](/ai-coding-dictionary/software-factory)：由触发器而非人来启动智能体会话的工作系统，让更多工作以 AFK 方式运行，把人的注意力留给确实需要参与的决定。

- [黑灯工厂（Dark factory）](/ai-coding-dictionary/dark-factory)：整个代码库或其中一部分由软件工厂编写代码，并且从来没有人进行人工审查。

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的词条内容。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary)使用其表单；本页不提供订阅服务。
