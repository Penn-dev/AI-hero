---
title: "`/codebase-design` Skill"
slug: "skills-codebase-design"
type: "post"
description: "用于设计深层模块的一套词汇。"
updatedAt: "2026-08-24T09:14:47.195Z"
---

## 它能做什么

`codebase-design` 固定了你在设计模块时使用的词：**模块（module）**、**接口（interface）**、**深度（depth）**、**接缝（seam）**、**适配器（adapter）**、**杠杆效应（leverage）**、**局部性（locality）**。它会精确定义每个词，避免使用含义宽泛的替代词（如“组件”“服务”“API”“边界”），并说明由这些定义推导出的几条核心原则。

它是一份参考资料，不是一套流程。它没有可执行的循环，不会生成某个产物，也不会在检查点向你提问。所有涉及设计的其他 Skill 都会借用它的词汇；单独使用时，它只提供这套语言，到此为止。在调用它之前必须知道这一点：如果你把一个 [会话](https://www.aihero.dev/ai-coding-dictionary/session) 交给一个既没有流程、也没有停止规则的 Skill，然后只说“开始”，它就可能自行编出一套流程。下文的常见问题会展示实际会发生什么。

## 什么时候该用它

输入 `/codebase-design`；当设计任务合适时，智能体也可能自动调用它。

当你已经知道要重新设计哪段代码，只是需要思考它的结构时，就该使用它：接缝该放在哪里、接口能缩小到什么程度、一次提取是否真的值得。它也适合用来解决“某个词到底是什么意思”的争论。

有几个 Skill 与它很接近。该选哪一个，取决于你实际面对的问题：

| 问题 | Skill |
|---|---|
| 一个模块的形状：它的接口、接缝和深度 | `codebase-design` |
| *业务领域里的词*：“账户”指三种东西，两个人对“取消”的理解不同 | [domain-modeling](https://aihero.dev/skills-domain-modeling) |
| 你还不知道*该重新设计哪个*模块 | [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture)（用于找候选对象的调研） |
| 你希望有人质疑和推敲这个设计，而不只是给它命名 | [grilling](https://aihero.dev/skills-grilling) |
| 有一个明确行为要实现，并且想要经得起重构的测试 | [tdd](https://aihero.dev/skills-tdd) |

## 这套词汇

词汇表就是这个 Skill 的主体。每个术语都要结合其他术语理解，并且都说明了它要替代的说法。

| 术语 | 含义 | 不要说 |
|---|---|---|
| **模块（Module）** | 任何同时拥有接口和实现的东西。它刻意不限定规模：可以是函数、类、包，或跨越多个层次的一段功能。 | 单元、组件、服务 |
| **接口（Interface）** | 调用方要正确使用它必须知道的一切：类型签名，以及不变量、调用顺序限制、错误模式、所需配置和性能特征。 | API、签名 |
| **深度（Depth）** | 接口带来的杠杆效应：调用方或测试每学习一单位接口，能触达多少行为。**深层（Deep）**：小接口背后封装了很多行为。**浅层（Shallow）**：接口几乎和实现一样复杂。 | 无 |
| **接缝（Seam）** | Michael Feathers 提出的术语：无需在某处直接修改代码，就能改变该处行为的位置。它是接口所在的*位置*；接缝放在哪里，是与接口背后放什么内容分开的独立决策。 | 边界 |
| **适配器（Adapter）** | 在某个接缝处满足接口的具体实现。它描述的是角色，不是物质形态：内存中的假实现和 Postgres 仓库都可以是适配器。 | 无 |
| **杠杆效应（Leverage）** | 调用方从深度中获得的收益：学习同样多的接口，就能得到更多能力。 | 无 |
| **局部性（Locality）** | 维护者从深度中获得的收益：修改、缺陷和验证都集中在一个地方。修一次，处处生效。 | 无 |

这里刻意**不**把深度定义为“实现代码行数与接口代码行数之比”，尽管这是 Ousterhout 自己的定义。那个指标会鼓励人为把实现写得冗长。这里改用“作为杠杆效应的深度”。

## 四条原则

- **深度是接口的属性，不是实现的属性。** 深层模块的内部可以由可替换的小部件组成，只是不能把这些部件暴露给调用方。模块内部可以有供自身测试使用的接缝，对外则在接口处保留一个接缝。
- **删除测试。** 想象把这个模块删除。如果复杂性随之消失，它只是一个透传层；如果复杂性又分散出现在 N 个调用方中，它就在发挥价值。
- **接口就是测试表面。** 调用方和测试跨越的是同一条接缝。如果你想测试*越过*接口之后的内容，说明这个模块的形状不对。
- **一个适配器意味着假设中的接缝；两个适配器才意味着真实的接缝。** 在某个位置确实发生变化之前，不要切出接缝。只有一个适配器的接缝，只是多了一层间接性。

还有两个配套文件会继续展开。这个 Skill 会在需要时读取它们，而不是一开始就全部读入。[DEEPENING.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/DEEPENING.md) 会把候选对象的依赖分为四类（进程内、本地可替换、远程但自有、真正外部），因为类别决定了如何跨接缝测试加深后的模块。[DESIGN-IT-TWICE.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/DESIGN-IT-TWICE.md) 会并行启动 [子智能体](https://www.aihero.dev/ai-coding-dictionary/subagent)，为同一个模块提出三种或更多截然不同的接口，再从深度、局部性和接缝位置三个角度比较它们。

## 常见问题

**我到底怎样在 TypeScript 中构建一个深层模块？**

这是关于这个 Skill 最常见的问题，但这个 Skill 不回答。它定义深层模块*是什么*；却没有说明如何阻止零散的 import 越过接口直接访问内部。[Issue #458](https://github.com/mattpocock/skills/issues/458) 说得很直白："let's say we're happy with the interface, it hides the details, etc. But how do we enforce it? I think without linting or clear guardrails, humans and LLMs alike will start making it messy over time." 

中文理解版（学习辅助）：假设我们已经满意这个接口，它隐藏了实现细节，等等；但怎样强制大家遵守它？如果没有 lint（代码静态检查）或明确护栏，人和 LLM 都会随着时间推移把它弄乱。

Matt 在该讨论中给出三种选择：把它包进一个类或 IIFE，并接受这个类会变得很大；在 monorepo 中把它做成一个包，并接受相应的 monorepo 工具链；或者使用 [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) 这类 linter，禁止绕过接口的 import。他另外认为 Effect 是最佳机制，dependency-cruiser 则是第二选择。仓库的 `in-progress/` 目录里有一个 `setup-ts-deep-modules` Skill，约定使用 `src/packages/<name>/index.ts`；但它属于 beta 渠道，没有文档页面，也没有随附 lint 规则。

**我把一个会话交给它，它花了 100k [Token](https://www.aihero.dev/ai-coding-dictionary/token)，重新设计了一堆我根本没让它碰的东西。**

已知问题，记录在 [issue #449](https://github.com/mattpocock/skills/issues/449)。这个 Skill 由模型调用，自我描述为词汇参考；但其中没有明确阻止智能体把它当成可运行流程的规则。当你对智能体说 `resume in /codebase-design and drive the open decisions` 时，它会从最像“动作”的内容入手：`DESIGN-IT-TWICE.md` 中的并行子智能体。它可能重新探索此前会话已经梳理过的代码，并持续推进很久才提问。这里没有驱动型 Skill 所拥有的护栏（检查点、一次只问一个问题、不自动进入下一步），因为参考资料本来就不该有这些。解决办法是明确指定一个驱动型 Skill，并让这个 Skill 在底层提供词汇：`/grill-with-docs`、`/improve-codebase-architecture`，或以 `codebase-design` 作为词汇基础的 `/tdd`。该 issue 仍未关闭。

中文理解版（学习辅助）：`resume in /codebase-design and drive the open decisions` 的意思是“回到 `/codebase-design`，推进尚未决定的问题”。这是一句会让智能体主动继续工作的英文指令，不是普通说明文字。

**`design-an-interface` 去哪里了？有 `/interface-design` 这个 Skill 吗？**

`design-an-interface` 已被移除并合并进这个 Skill。没有丢失内容：它的“设计两次”技巧（源于 Ousterhout，让并行子智能体提出明显不同的设计）已收录在 `DESIGN-IT-TWICE.md`。另外，曾有多人要求单独提供一个遵循“深层模块、薄接口”理念的 `/interface-design` Skill；这套理念已经在这里，因此暂时没有单独规划。如果你是为这两个名字之一而来，这就是对应页面。

**这不就是一种文件结构约定吗，例如文件夹、barrel file、功能切片？**

不是。面对反复的质疑，这个 Skill 一直坚持这一点。[Issue #95](https://github.com/mattpocock/skills/issues/95) 曾建议用正式的分形树文件结构作为深层模块的具体实现；回复指出两者相互独立：“深层模块讨论的是接口的设计，以及无论文件系统是什么样，都要通过严格接口来访问。即使采用这种方式，也完全可能得到浅层模块。”同样的问题也出现在 #458 中：“我觉得你可能把模块这一概念和文件系统绑得过紧。文件系统当然可以为模块形状提供有用线索，但构建深层模块时并不需要依赖文件系统。”词汇表故意把 **模块（module）** 定义为不限定规模。

**`tdd` 真的使用这套词汇吗？**

现在使用了，过去很长一段时间没有。以前写在 `tdd` 内部的深层模块说明，在 v1.0 中被移除，改为共享这个 Skill；但替代它的链接当时没有加上，因此 `tdd` 自己定义了“接缝”，却没有引用任何内容。这个缺口现在已补上：当开放问题是接口的形状、而不是测试时，可以从该 Skill 跳转到这里。`tdd` 仍负责把“接缝”理解为*测试时跨越的边界*；本 Skill 则负责接口背后的模块形状。

**“设计两次”模式能在 Claude Code 之外工作吗？**

不太顺畅。`DESIGN-IT-TWICE.md` 要求“使用 Agent 工具并行启动 3 个以上子智能体”，其中 Agent 是 Claude Code 对其 [工具](https://www.aihero.dev/ai-coding-dictionary/tool) 的名称。该仓库也为其他 [智能体执行框架](https://www.aihero.dev/ai-coding-dictionary/harness)（包括 Codex）提供了元数据，但这些框架未必暴露同名能力，因此并行设计阶段的可移植性不如该 Skill 的元数据暗示得那么好。这个问题记录在仍未关闭的 [issue #564](https://github.com/mattpocock/skills/issues/564)。

**我能把自己的概念加进词汇表吗，例如 connascence、模块秘密、[渐进式披露](https://www.aihero.dev/ai-coding-dictionary/progressive-disclosure)？**

有人提出过完全相同的建议。[Issue #180](https://github.com/mattpocock/skills/issues/180) 引入了 Parnas 的模块秘密和 Page-Jones 的 connascence，作为描述*什么*内容正从接缝泄漏出去的一层命名，并附带了可用的 diff；[issue #303](https://github.com/mattpocock/skills/issues/303) 建议在实现内部采用渐进式披露，使得一个在公开接口上很深的模块，内部不会变成一整块难以辨认的大杂烩。两项提议都仍处于开放、未合并状态。当前发布的词汇表刻意保持精简，原因正如 Skill 本身所说：统一语言就是全部目的；一个没人能一致使用的术语，比没有术语更糟。

## 满足这些现象，就说明它在发挥作用

- 设计讨论不再频繁使用“组件”“服务”和“边界”，而开始使用“模块”“接口”和“接缝”。
- 面对一个拟议的提取，任何人都能明确判断它是否通过删除测试，而不需要含糊其辞。
- 一条拟议接缝会同时说出第二个适配器，而不只是第一个。
- 讨论接口时会覆盖不变量、调用顺序和错误模式，而不只看类型签名。
- 调用它本身不会启动一个会话。如果智能体只因 `/codebase-design` 就开始读文件、提出重构建议，说明它把参考资料误当成驱动型 Skill 了。

## 它处在什么位置

`codebase-design` 是一个**可在任何时候独立调用的参考 Skill**，也是工程类 Skill 底层的词汇层，而不是某条链路中的一步。它最接近的邻居是 [domain-modeling](https://aihero.dev/skills-domain-modeling)：后者同样是参考资料，但处理的是*问题领域*中的词，而不是模块的形状。两者通常需要一起使用，因为给深层模块恰当地命名，既需要理解模块设计，也需要理解业务领域。[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 是另一个相关 Skill：它在代码库中调研可加深的候选对象，并完全用这套词汇描述它们；它负责找到模块，而这个 Skill 则是你设计模块时使用的工作台。当你不确定该选哪个 Skill 或流程时，[ask-matt](https://aihero.dev/skills-ask-matt) 会帮你分流。

## 中文学习辅助：术语小词典

- **Skill**：一组给 AI 编码智能体的专门工作说明，让它按某个方法完成任务。
- **代码库（codebase）**：一个项目中全部源代码、配置和相关文件的集合。
- **模块（module）**：把一部分功能封装起来、并通过明确接口供其他代码使用的单位。
- **接口（interface）**：其他代码如何正确使用一个模块的约定，包括能调用什么、需要满足什么条件。
- **深层模块（deep module）**：用很小的接口隐藏大量内部复杂性的模块，让使用者少记细节也能完成更多事。
- **接缝（seam）**：不直接改动某处代码，也能替换或改变该处行为的位置，常用于测试和替换依赖。
- **适配器（adapter）**：在接缝处实现同一接口的具体方案，例如测试用假数据库和实际数据库实现。
- **monorepo**：把多个相关项目或软件包放在同一个代码仓库中统一管理的方式。
- **IIFE**：立即调用函数表达式；定义函数后立刻执行，常用来限制变量可见范围。
- **linter**：静态检查工具，用于在运行前发现不符合约定或可能出错的代码。
- **Token**：大语言模型处理文字时使用的计量单位；文本越长，通常消耗的 Token 越多。
- **智能体执行框架（harness）**：为 AI 智能体提供工具、上下文和运行方式的软件环境。
