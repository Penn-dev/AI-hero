---
title: "AGENTS.md 完整指南"
slug: "a-complete-guide-to-agents-md"
type: "post"
description: "学习如何为 AI 编码智能体优化 AGENTS.md 文件。掌握渐进式披露，保持指令聚焦，并最大化智能体表现。"
tags:
  - set-up-your-agent
  - code-with-ai-agents
updatedAt: "2026-01-18T15:01:44.364Z"
---

你是否曾对 `AGENTS.md` 文件的大小感到担忧？

也许你应该担忧。糟糕的 `AGENTS.md` 文件会让智能体困惑，成为维护噩梦，并在每次请求中消耗你的 Token。

所以你最好知道如何修复它。

## 什么是 AGENTS.md？

`AGENTS.md` 文件是你提交到 Git 的 Markdown 文件，用来定制 AI 编码智能体在你的仓库中的行为。它位于对话历史的顶部，在系统提示词正下方。

把它看作智能体基础指令与实际代码库之间的配置层。该文件可以包含两类指导：

- **个人范围**：你的提交风格偏好、你偏好的编码模式。
- **项目范围**：项目的作用、使用的包管理器、你的架构决策。

`AGENTS.md` 文件是一项开放标准，许多（但并非所有）工具都支持它。

<details>
  <summary>CLAUDE.md</summary>

值得注意的是，Claude Code 不使用 `AGENTS.md`，而是使用 `CLAUDE.md`。你可以在两者之间创建符号链接，使所有工具以相同方式工作：

```bash
# Create a symlink from AGENTS.md to CLAUDE.md
ln -s AGENTS.md CLAUDE.md
```

</details>

## 为什么庞大的 `AGENTS.md` 文件是问题

有一个自然的反馈循环会使 `AGENTS.md` 文件危险地膨胀：

1. 智能体做了你不喜欢的事。
2. 你添加一条规则来阻止它。
3. 数月间重复数百次。
4. 文件变成“一团泥”。

不同开发者加入相互冲突的观点。没人做完整的风格梳理。结果呢？一个不可维护的混乱文件，实际上会伤害智能体表现。

另一个罪魁祸首是自动生成的 `AGENTS.md` 文件。绝不要使用初始化脚本自动生成 `AGENTS.md`。它们会用“对大多数场景有用”的内容淹没文件，但这些内容更适合渐进式披露。生成的文件优先考虑全面性，而非克制。

### 指令预算

Humanlayer 的 Kyle 在其[文章](https://www.humanlayer.dev/blog/writing-a-good-claude-md)中提到了“指令预算”这一概念：

> 前沿推理 LLM 能以合理的一致性遵循约 150–200 条指令。较小模型能关注的指令少于较大模型，非推理模型能关注的指令少于推理模型。

无论是否相关，你的 `AGENTS.md` 文件中的每个 Token 都会在**每一次请求**中被加载。这造成了严格的预算问题：

| 场景 | 影响 |
| --- | --- |
| 小而聚焦的 `AGENTS.md` | 有更多 Token 可用于任务特定指令 |
| 大而臃肿的 `AGENTS.md` | 实际工作可用 Token 更少；智能体会困惑 |
| 无关指令 | Token 浪费 + 智能体分心 = 更差表现 |

综合来看，**理想的 `AGENTS.md` 文件应尽可能小。**

### 过时文档会污染上下文

大型 `AGENTS.md` 文件的另一个问题是过时。

文档很快会过时。对人类开发者而言，过时文档令人烦恼，但人类通常有足够的内在记忆来怀疑不可靠的文档。对于每次请求都会阅读文档的 AI 智能体，过时信息会积极地_污染_上下文。

当你记录文件系统结构时，这尤其危险。文件路径总在变化。若 `AGENTS.md` 写着“认证逻辑位于 `src/auth/handlers.ts`”，而该文件改名或移动，智能体会自信地去错误位置查找。

与其记录结构，不如描述能力。提示内容_可能_在哪，以及项目的整体形态。让智能体在规划时生成自己的即时文档。

领域概念（如“organization”与“group”与“workspace”）比文件路径稳定，因此记录起来更安全。但即便这些概念，在快速演进、AI 辅助的代码库中也可能漂移。保持轻量。

## 精简大型 `AGENTS.md` 文件

对放在这里的内容要毫不留情。把以下视为绝对最小集：

- **一句话项目描述**（充当基于角色的提示词）。
- **包管理器**（如果不是 npm；或使用 `corepack` 获取警告）。
- **构建/类型检查命令**（如果不是标准命令）。

确实就这些。其他所有内容都应放到别处。

### 一句话项目描述

这一句话向智能体提供它为何在此仓库中工作的上下文。它锚定其做出的每项决策。

示例：

```markdown
This is a React component library for accessible data visualization.
```

这就是基础。智能体现在理解了其范围。

### 包管理器说明

如果你在 JavaScript 项目中使用 npm 以外的包管理器，请明确告诉智能体：

```markdown
This project uses pnpm workspaces.
```

否则，智能体可能默认使用 `npm` 并生成错误命令。

<details>
  <summary>Corepack 也很棒</summary>
你也可以使用 [`corepack`](https://github.com/nodejs/corepack)，让系统自动处理警告，从而节省宝贵的指令预算。
</details>

### 使用渐进式披露

不要将所有内容塞进 `AGENTS.md`，而要使用**渐进式披露**：只给智能体当前需要的内容，需要时再指向其他资源。

智能体很擅长浏览文档层级。它们对上下文的理解足以找到所需内容。

#### 将语言特定规则移到独立文件

如果你的 `AGENTS.md` 当前写着：

```markdown
Always use const instead of let.
Never use var.
Use interface instead of type when possible.
Use strict null checks.
...
```

请将其移到独立文件。在根 `AGENTS.md` 中写：

```markdown
For TypeScript conventions, see docs/TYPESCRIPT.md
```

注意这种轻量方式：没有“总是”，没有全大写强制语，只是对话式引用。

其好处是：

- 仅当智能体编写 TypeScript 时才加载 TypeScript 规则。
- 其他任务（CSS 调试、依赖管理）不会浪费 Token。
- 文件保持聚焦，并能跨模型变化移植。

#### 嵌套渐进式披露

还可以更深入。`docs/TYPESCRIPT.md` 可以引用 `docs/TESTING.md`。创建可发现的资源树：

```
docs/
├── TYPESCRIPT.md
│   └── references TESTING.md
├── TESTING.md
│   └── references specific test runners
└── BUILD.md
    └── references esbuild configuration
```

你甚至可以链接到外部资源、Prisma 文档、Next.js 文档等。智能体会高效浏览这些层级。

#### 使用 Agent Skills

许多工具支持“agent skills”——智能体可以调用的命令或工作流，用于了解如何完成某项具体工作。这也是渐进式披露的一种形式：智能体仅在需要时载入知识。

我们会在另一篇文章中深入介绍 agent skills。

<SkillsCta
	heading="出色的 AGENTS.md 只是第一步"
	subtitle="看看我在其上运行的 Skills，如何将那个文件变成已交付的工作。"
	cta="查看 Skill 集合"
/>

## Monorepo 中的 `AGENTS.md`

你并不局限于根目录中的单个 `AGENTS.md`。你可以在子目录中放置 `AGENTS.md` 文件，它们会**与根级文件合并**。

这对 monorepo 很强大：

### 每一层放什么

| 层级 | 内容 |
| --- | --- |
| **根** | Monorepo 的用途、如何浏览包、共享工具（pnpm workspaces） |
| **包** | 包的用途、特定技术栈、包特定约定 |

根 `AGENTS.md`：

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

**不要让任何一层过载。**智能体会在上下文中看到所有合并后的 `AGENTS.md` 文件。每一层只聚焦于该范围相关的内容。

## 用这个提示词修复损坏的 `AGENTS.md`

如果你开始对仓库中的 `AGENTS.md` 感到紧张，并且希望重构它以使用渐进式披露，试着将以下提示词复制粘贴到你的编码智能体中：

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
	subtitle="Matt 打磨智能体所读内容时发布的 Skill 文章与更新说明。"
/>

## 不要构建一团泥

当你准备向 `AGENTS.md` 添加内容时，问问自己它属于哪里：

| 位置 | 何时使用 |
| --- | --- |
| 根 `AGENTS.md` | 与仓库中的每一个任务都相关 |
| 独立文件 | 与一个领域相关（TypeScript、测试等） |
| 嵌套文档树 | 可以按层级组织 |

理想的 `AGENTS.md` 小而聚焦，并指向其他位置。它给智能体刚好足够的上下文来开始工作，并提供通往更详细指导的线索。

其他所有内容都放在渐进式披露中：独立文件、嵌套 `AGENTS.md` 文件或 Skills。

这样，随着工具和最佳实践不断演变，你的指令预算保持高效、智能体保持聚焦、配置也面向未来。
