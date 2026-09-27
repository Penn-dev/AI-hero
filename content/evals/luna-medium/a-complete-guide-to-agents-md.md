---
title: "AGENTS.md 完整指南"
slug: "a-complete-guide-to-agents-md"
type: "post"
description: "了解如何为 AI 编码智能体优化 AGENTS.md 文件。掌握渐进式披露，保持指令聚焦，并最大限度提升智能体性能。"
tags:
  - set-up-your-agent
  - code-with-ai-agents
updatedAt: "2026-01-18T15:01:44.364Z"
---

你是否曾担心过自己的 `AGENTS.md` 文件太大？

也许你确实应该担心。糟糕的 `AGENTS.md` 文件会让你的智能体困惑，成为维护噩梦，并让你在每次请求中都付出 Token 代价。

所以，你最好知道该如何修复它。

## 什么是 AGENTS.md？

`AGENTS.md` 文件是一种 Markdown 文件，你可以将它提交到 Git 中，用来定制 AI 编码智能体在代码库中的行为。它位于对话历史的顶部，就在系统提示词下方。

你可以把它看成智能体基础指令与实际代码库之间的配置层。文件可以包含两类指导：

- **个人范围**：你的提交风格偏好、你偏好的编码模式
- **项目范围**：项目的用途、使用的包管理器、架构决策

`AGENTS.md` 文件是一项开放标准，许多工具都支持它，但并非全部支持。

<details>
  <summary>CLAUDE.md</summary>

值得注意的是，Claude Code 不使用 `AGENTS.md`，而是使用 `CLAUDE.md`。你可以在两者之间创建符号链接，让所有工具以相同方式工作：

```bash
# Create a symlink from AGENTS.md to CLAUDE.md
ln -s AGENTS.md CLAUDE.md
```

</details>

## 为什么巨大的 `AGENTS.md` 文件会带来问题

有一种自然的反馈循环，会导致 `AGENTS.md` 文件危险地膨胀：

1. 智能体做了你不喜欢的事情
2. 你添加一条规则来阻止它
3. 数月间重复数百次
4. 文件变成一团“泥球”

不同开发者会添加相互冲突的意见。没有人会完整地检查风格。结果就是一团难以维护的混乱，反而会损害智能体性能。

另一个罪魁祸首是自动生成的 `AGENTS.md` 文件。绝不要使用初始化脚本自动生成你的 `AGENTS.md`。它们会用“对大多数场景有用”的内容填满文件，而这些内容更适合通过渐进式披露来提供。生成的文件优先追求全面，而不是克制。

### 指令预算

Humanlayer 的 Kyle 在他的[文章](https://www.humanlayer.dev/blog/writing-a-good-claude-md)中提到了“指令预算”的概念：

> 前沿思维 LLM 可以相当稳定地遵循约 150-200 条指令。较小的模型能够关注的指令少于较大的模型，而非思考模型能够关注的指令少于思考模型。

`AGENTS.md` 文件中的每一个 Token 都会在**每一次请求中**加载，不论它是否相关。这造成了一个严格的预算问题：

| 场景                       | 影响                                             |
| -------------------------- | ------------------------------------------------ |
| 小而聚焦的 `AGENTS.md`     | 有更多 Token 可用于特定任务的指令                 |
| 大而臃肿的 `AGENTS.md`     | 实际工作的 Token 变少；智能体会感到困惑          |
| 不相关的指令               | Token 浪费 + 智能体分心 = 更差的性能              |

综合来看，这意味着**理想的 `AGENTS.md` 文件应该尽可能小**。

### 过时的文档会污染上下文

大型 `AGENTS.md` 文件的另一个问题是过时。

文档很快就会过时。对人类开发者来说，过时的文档令人烦恼，但人类通常有足够的内在记忆，能对错误文档保持怀疑。对于每次请求都会读取文档的 AI 智能体来说，过时信息会主动地_污染_上下文。

当你记录文件系统结构时，这尤其危险。文件路径经常变化。如果你的 `AGENTS.md` 写着“身份验证逻辑位于 `src/auth/handlers.ts`”，而该文件后来被重命名或移动，智能体就会自信地查找错误的位置。

与其记录结构，不如描述能力。提示事物_可能_位于哪里，以及项目的整体形态。让智能体在规划期间生成自己的即时文档。

领域概念（比如“组织”与“群组”与“工作区”）比文件路径更稳定，因此记录它们更安全。但即使这些概念也可能在快速发展的 AI 辅助代码库中发生变化。保持适度即可。

## 精简大型 `AGENTS.md` 文件

要无情地筛选放在这里的内容。把下面这些视为绝对最小集合：

- **一句话的项目描述**（起到基于角色的提示词作用）
- **包管理器**（如果不是 npm；或者使用 `corepack` 处理警告）
- **构建/类型检查命令**（如果不常规）

说实话，就这些。其他内容都应该放到别处。

### 一句话项目描述

这句话为智能体提供了它为什么要在此代码库中工作的背景。它会锚定智能体做出的每一个决定。

示例：

```markdown
This is a React component library for accessible data visualization.
```

这是基础。智能体现在理解自己的范围了。

### 包管理器说明

如果你在 JavaScript 项目中使用的不是 npm，请明确告诉智能体：

```markdown
This project uses pnpm workspaces.
```

否则，智能体可能会默认使用 `npm`，并生成错误的命令。

<details>
  <summary>Corepack 也很棒</summary>
你也可以使用 [`corepack`](https://github.com/nodejs/corepack)，让系统自动处理警告，节省宝贵的指令预算。
</details>

### 使用渐进式披露

不要把所有内容都塞进 `AGENTS.md`，而应使用**渐进式披露**：只给智能体当前所需的内容，并在需要时指向其他资源。

智能体很擅长浏览文档层级。它们对上下文的理解足以找到所需内容。

#### 将特定语言的规则移到单独文件

如果你的 `AGENTS.md` 目前写着：

```markdown
Always use const instead of let.
Never use var.
Use interface instead of type when possible.
Use strict null checks.
...
```

请改为将其移到单独的文件中。在根目录的 `AGENTS.md` 中写：

```markdown
For TypeScript conventions, see docs/TYPESCRIPT.md
```

注意这种轻描淡写的方式，没有“始终”、没有全大写的强制语气。只是一个对话式的引用。

好处包括：

- 智能体只有在编写 TypeScript 时才会加载 TypeScript 规则
- 其他任务（CSS 调试、依赖管理）不会浪费 Token
- 文件保持聚焦，并且能在模型变化时继续移植

#### 嵌套渐进式披露

你还可以更进一步。`docs/TYPESCRIPT.md` 可以引用 `docs/TESTING.md`。创建一棵可发现的资源树：

```
docs/
├── TYPESCRIPT.md
│   └── references TESTING.md
├── TESTING.md
│   └── references specific test runners
└── BUILD.md
    └── references esbuild configuration
```

你甚至可以链接到外部资源，例如 Prisma 文档、Next.js 文档等。智能体会高效地浏览这些层级。

#### 使用 Agent Skill

许多工具都支持“Agent Skill”——智能体可以调用的命令或工作流，用来学习如何完成某件具体事情。这些也是渐进式披露的一种形式：智能体只在需要时才获取知识。

我们会在另一篇文章中深入介绍 Agent Skill。


<SkillsCta
	heading="出色的 AGENTS.md 是第一步"
	subtitle="看看我在自己的 AGENTS.md 之上运行的 Skill，了解如何把它变成已交付的工作。"
	cta="查看 Skill 集合"
/>

## Monorepo 中的 `AGENTS.md`

你不受限于根目录中的单个 `AGENTS.md`。你可以将 `AGENTS.md` 文件放在子目录中，它们会**与根层级合并**。

这对 Monorepo 非常有用：

### 各层级放什么

| 层级       | 内容                                                      |
| ---------- | --------------------------------------------------------- |
| **根目录** | Monorepo 用途、如何浏览包、共享工具（pnpm workspaces）     |
| **包**     | 包的用途、具体技术栈、包特定的约定                         |

根目录的 `AGENTS.md`：

```markdown
This is a monorepo containing web services and CLI tools.
Use pnpm workspaces to manage dependencies.
See each package's AGENTS.md for specific guidelines.
```

包级别的 `AGENTS.md`（位于 `packages/api/AGENTS.md`）：

```markdown
This package is a Node.js GraphQL API using Prisma.
Follow docs/API_CONVENTIONS.md for API design patterns.
```

**不要让任何层级超载。**智能体会在上下文中看到所有合并后的 `AGENTS.md` 文件。让每一层都聚焦于该范围内相关的内容。

## 使用此提示词修复损坏的 `AGENTS.md`

如果你开始对代码库中的 `AGENTS.md` 感到不安，并且想重构它以使用渐进式披露，可以尝试将下面的提示词复制到你的编码智能体中：

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
	heading="Get the next AGENTS.md upgrade in your inbox"
	subtitle="Skill posts and changelog notes when Matt sharpens what his agents read."
/>

## 不要构建一团泥球

当你准备向 `AGENTS.md` 添加内容时，问问自己它应该放在哪里：

| 位置                 | 使用时机                                     |
| -------------------- | -------------------------------------------- |
| 根目录 `AGENTS.md`   | 与代码库中的每一项任务都相关                   |
| 单独的文件           | 与某个领域相关（TypeScript、测试等）           |
| 嵌套文档树           | 可以按层级组织                               |

理想的 `AGENTS.md` 应该小巧、聚焦，并指向其他地方。它只提供智能体开始工作所需的足够上下文，并留下通往更详细指导的线索。

其他内容都通过渐进式披露来承载：单独的文件、嵌套的 `AGENTS.md` 文件或 Skill。

这样可以让你的指令预算保持高效，让智能体保持专注，并让你的配置面向未来，能够适应工具变化。
