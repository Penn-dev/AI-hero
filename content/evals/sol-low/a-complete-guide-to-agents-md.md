---
title: "AGENTS.md 完全指南"
slug: "a-complete-guide-to-agents-md"
type: "post"
description: "了解如何为 AI 编码智能体优化 AGENTS.md 文件。掌握渐进式披露、保持指令聚焦，并最大限度提升智能体表现。"
tags:
  - set-up-your-agent
  - code-with-ai-agents
updatedAt: "2026-01-18T15:01:44.364Z"
---

你是否曾担心过自己的 `AGENTS.md` 文件太大？

也许你确实应该担心。糟糕的 `AGENTS.md` 文件会让智能体（Agent）困惑，成为维护噩梦，还会在每次请求中消耗你的 Token。

所以，你最好知道该如何修复它。

## 什么是 AGENTS.md？

`AGENTS.md` 文件是一个提交到 Git 的 markdown 文件，用于自定义 AI 编码智能体在你的仓库中的行为。它位于对话历史的顶部，紧接在系统提示词之后。

可以把它看作智能体基础指令与你的实际代码库之间的配置层。这个文件可以包含两类指导：

- **个人范围**：你偏好的提交风格、你喜欢的编码模式
- **项目范围**：项目的用途、使用的包管理器、你的架构决策

`AGENTS.md` 文件是一项受到许多工具支持的开放标准——但并非所有工具都支持。

<details>
  <summary>CLAUDE.md</summary>

值得注意的是，Claude Code 不使用 `AGENTS.md`，而是使用 `CLAUDE.md`。你可以在两者之间创建符号链接，让所有工具以相同方式工作：

```bash
# Create a symlink from AGENTS.md to CLAUDE.md
ln -s AGENTS.md CLAUDE.md
```

</details>

## 为什么庞大的 `AGENTS.md` 文件会成为问题

存在一种自然的反馈循环，会导致 `AGENTS.md` 文件增长到危险的规模：

1. 智能体做了你不喜欢的事
2. 你添加一条规则来阻止它
3. 几个月里重复数百次
4. 文件变成一团“泥球”

不同开发者加入相互冲突的观点。没有人进行全面的风格梳理。结果呢？一团无法维护的混乱，实际上还会损害智能体的表现。

另一个罪魁祸首是自动生成的 `AGENTS.md` 文件。绝不要使用初始化脚本自动生成你的 `AGENTS.md`。它们会用那些“对大多数场景有用”、但更适合渐进式披露的内容淹没文件。生成的文件优先追求全面，而不是克制。

### 指令预算

Humanlayer 的 Kyle 在其[文章](https://www.humanlayer.dev/blog/writing-a-good-claude-md)中提到了“指令预算”的概念：

> 前沿推理 LLM 能够以合理的一致性遵循约 150-200 条指令。较小的模型能关注的指令少于较大的模型，非推理模型能关注的指令少于推理模型。

无论是否相关，你的 `AGENTS.md` 文件中的每个 Token 都会在**每一次请求**中加载。这会造成一个严格的预算问题：

| 场景                       | 影响                                              |
| -------------------------- | ------------------------------------------------- |
| 小而聚焦的 `AGENTS.md`     | 有更多 Token 可用于任务特定的指令                 |
| 庞大臃肿的 `AGENTS.md`     | 留给实际工作的 Token 更少；智能体会感到困惑       |
| 无关指令                   | 浪费 Token + 分散智能体注意力 = 表现更差          |

综合来看，这意味着 **理想的 `AGENTS.md` 文件应该尽可能小。**

### 过时文档会毒害上下文

大型 `AGENTS.md` 文件的另一个问题是内容会过时。

文档很快就会过时。对人类开发者来说，过时文档很烦人，但人通常拥有足够的内在记忆，会对糟糕的文档保持怀疑。对于每次请求都会阅读文档的 AI 智能体，过时信息会主动_毒害_上下文。

记录文件系统结构时尤其危险。文件路径经常变化。如果你的 `AGENTS.md` 写着“身份验证逻辑位于 `src/auth/handlers.ts`”，而该文件后来被重命名或移动，智能体就会自信地去错误的位置查找。

与其记录结构，不如描述能力。给出线索，说明内容_可能_位于哪里以及项目的大致形态。让智能体在规划期间即时生成自己的文档。

领域概念（例如“organization”“group”和“workspace”的区别）比文件路径更稳定，因此记录它们更安全。但即使是这些概念，在快速变化的 AI 辅助代码库中也可能发生漂移。务必点到为止。

## 精简大型 `AGENTS.md` 文件

对放入这里的内容要毫不留情。可以将以下内容视为绝对最低限度：

- **一句话项目描述**（作用类似基于角色的提示词）
- **包管理器**（如果不是 npm；或者使用 `corepack` 发出警告）
- **构建/类型检查命令**（如果不是标准命令）

说真的，仅此而已。其他所有内容都应该放到别处。

### 一句话项目描述

这一句话为智能体提供了它_为什么_要在这个仓库中工作的上下文。它为智能体做出的每个决策提供锚点。

示例：

```markdown
This is a React component library for accessible data visualization.
```

这就是基础。智能体现在理解了自己的工作范围。

### 指定包管理器

如果你在 JavaScript 项目中使用 npm 以外的工具，请明确告诉智能体：

```markdown
This project uses pnpm workspaces.
```

否则，智能体可能默认使用 `npm`，并生成错误的命令。

<details>
  <summary>Corepack 也很棒</summary>
你也可以使用 [`corepack`](https://github.com/nodejs/corepack)，让系统自动处理警告，从而节省宝贵的指令预算。
</details>

### 使用渐进式披露

不要把所有内容都塞进 `AGENTS.md`，而要使用**渐进式披露**：只向智能体提供它当前需要的内容，并在必要时将其指向其他资源。

智能体能够快速浏览文档层级。它们对上下文的理解足以找到所需内容。

#### 将语言特定规则移到单独文件

如果你的 `AGENTS.md` 目前写着：

```markdown
Always use const instead of let.
Never use var.
Use interface instead of type when possible.
Use strict null checks.
...
```

请把这些内容移到单独的文件中。在根目录的 `AGENTS.md` 中写：

```markdown
For TypeScript conventions, see docs/TYPESCRIPT.md
```

注意这种克制：没有“always”，没有用全大写来强迫执行。只是一条对话式的引用。

好处包括：

- 只有当智能体编写 TypeScript 时才加载 TypeScript 规则
- 其他任务（CSS 调试、依赖管理）不会浪费 Token
- 文件保持聚焦，并可跨模型变更移植

#### 嵌套渐进式披露

你还可以进一步深入。你的 `docs/TYPESCRIPT.md` 可以引用 `docs/TESTING.md`。创建一个可发现的资源树：

```
docs/
├── TYPESCRIPT.md
│   └── references TESTING.md
├── TESTING.md
│   └── references specific test runners
└── BUILD.md
    └── references esbuild configuration
```

你甚至可以链接到外部资源，例如 Prisma 文档、Next.js 文档等。智能体会高效浏览这些层级。

#### 使用 Agent Skills

许多工具支持“agent skills”——智能体可以调用命令或工作流，以了解如何完成某项特定工作。它们也是渐进式披露的一种形式：智能体只在需要时拉取知识。

我们将在另一篇文章中深入介绍 agent skills。


<SkillsCta
	heading="优秀的 AGENTS.md 是第一步"
	subtitle="看看我在它之上运行了哪些 Skill，把这个文件转化为真正交付的工作。"
	cta="查看 Skill 集"
/>

## Monorepo 中的 `AGENTS.md`

你并非只能在根目录使用一个 `AGENTS.md`。你可以在子目录中放置 `AGENTS.md` 文件，它们会**与根目录层级合并**。

这对 monorepo 非常有用：

### 什么内容放在哪里

| 层级         | 内容                                                               |
| ------------ | ------------------------------------------------------------------ |
| **根目录**   | Monorepo 的用途、如何浏览各包、共享工具（pnpm workspaces）         |
| **包**       | 包的用途、特定技术栈、包特定约定                                   |

根目录 `AGENTS.md`：

```markdown
This is a monorepo containing web services and CLI tools.
Use pnpm workspaces to manage dependencies.
See each package's AGENTS.md for specific guidelines.
```

包级 `AGENTS.md`（位于 `packages/api/AGENTS.md`）：

```markdown
This package is a Node.js GraphQL API using Prisma.
Follow docs/API_CONVENTIONS.md for API design patterns.
```

**不要让任何层级超载。** 智能体会在上下文中看到所有合并后的 `AGENTS.md` 文件。让每一层都聚焦于该范围内的相关内容。

## 用这个提示词修复损坏的 `AGENTS.md`

如果你开始对仓库中的 `AGENTS.md` 文件感到不安，并想重构它以使用渐进式披露，可以尝试将以下提示词复制粘贴到你的编码智能体中：

```txt
I want you to refactor my AGENTS.md file to follow progressive disclosure principles.

Follow these steps:

1. **Find contradictions**: Identify any instructions that conflict with each other. For each contradiction, ask me which version I want to keep.

2. **Identify the essentials**: Extract only what belongs in the root AGENTS.md:
   - One-sentence project description
   - Package manager (if not npm)
   - Non-standard build/typecheck commands
   - Anything truly relevant to every single task

3. **Group the rest**: Organize remaining instructions into logical categories (e.g., TypeScript conventions, testing patterns, API design, Git workflow). For each group, create a separate markdown file.

4. **Create the file structure**: Output:
   - A minimal root AGENTS.md with markdown links to the separate files
   - Each separate file with its relevant instructions
   - A suggested docs/ folder structure

5. **Flag for deletion**: Identify any instructions that are:
   - Redundant (the agent already knows this)
   - Too vague to be actionable
   - Overly obvious (like "write clean code")
```


<SkillsNewsletterCta
	heading="在收件箱中获取下一次 AGENTS.md 升级"
	subtitle="当 Matt 改进其智能体读取的内容时，接收 Skill 文章和更新日志注释。"
/>

## 不要构建一团泥球

当你准备向 `AGENTS.md` 添加内容时，问问自己它应该放在哪里：

| 位置                      | 何时使用                                          |
| ------------------------- | ------------------------------------------------- |
| 根目录 `AGENTS.md`        | 与仓库中的每一项任务都相关                        |
| 单独文件                  | 与某一个领域相关（TypeScript、测试等）            |
| 嵌套文档树                | 可以按层级组织                                    |

理想的 `AGENTS.md` 小而聚焦，并指向其他位置。它为智能体提供刚好足以开始工作的上下文，同时留下通向更详细指导的线索。

其他所有内容都存在于渐进式披露中：单独文件、嵌套的 `AGENTS.md` 文件或 Skill。

这样可以让你的指令预算保持高效，让智能体保持专注，并使你的设置能够适应未来的工具和最佳实践演变。
