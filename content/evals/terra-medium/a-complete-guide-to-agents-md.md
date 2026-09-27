---
title: "AGENTS.md 完整指南"
slug: "a-complete-guide-to-agents-md"
type: "post"
description: "了解如何为 AI 编码智能体优化 AGENTS.md 文件。掌握渐进式披露，让指令保持聚焦，并最大化智能体性能。"
tags:
  - set-up-your-agent
  - code-with-ai-agents
updatedAt: "2026-01-18T15:01:44.364Z"
---

你是否曾担心过 `AGENTS.md` 文件的大小？

也许你确实应该担心。糟糕的 `AGENTS.md` 文件会让你的智能体（Agent）困惑，变成维护噩梦，并在每次请求中消耗你的 Token。

所以你最好知道如何修复它。

## 什么是 AGENTS.md？

`AGENTS.md` 文件是一个提交到 Git 的 Markdown 文件，用于自定义 AI 编码智能体在你的仓库中的行为。它位于对话历史的顶部，紧接在系统提示词之下。

可以把它看作智能体基础指令和实际代码库之间的一层配置。该文件可包含两类指导：

- **个人范围**：你的提交风格偏好、你偏爱的编码模式。
- **项目范围**：项目的用途、你使用的包管理器、你的架构决策。

`AGENTS.md` 文件是一项开放标准，受到许多（但并非全部）工具支持。

<details>
  <summary>CLAUDE.md</summary>

值得注意的是，Claude Code 不使用 `AGENTS.md`，而是使用 `CLAUDE.md`。你可以在两者之间创建符号链接，使所有工具以相同方式工作：

```bash
# Create a symlink from AGENTS.md to CLAUDE.md
ln -s AGENTS.md CLAUDE.md
```

</details>

## 为什么巨大的 `AGENTS.md` 文件是问题

有一种自然的反馈循环，会导致 `AGENTS.md` 文件危险地膨胀：

1. 智能体做了你不喜欢的事。
2. 你添加一条规则来防止它。
3. 数月间重复数百次。
4. 文件变成“一团泥球”。

不同的开发者加入互相冲突的观点。没有人做完整的风格审查。结果呢？一团难以维护的混乱，实际上还会损害智能体性能。

另一个罪魁祸首是自动生成的 `AGENTS.md` 文件。绝不要使用初始化脚本自动生成 `AGENTS.md`。它们会向文件中灌入“对大多数场景都有用”的内容，但这些内容更适合通过渐进式披露提供。生成的文件优先考虑全面性而非克制。

### 指令预算

Humanlayer 的 Kyle 在其[文章](https://www.humanlayer.dev/blog/writing-a-good-claude-md)中提到了“指令预算”的概念：

> 前沿推理型 LLM 能够以合理的一致性遵循约 150–200 条指令。较小模型能关注的指令少于较大模型，非推理模型能关注的指令也少于推理模型。

`AGENTS.md` 文件中的每个 Token 都会在**每一次请求**中加载，无论是否相关。这造成了一个严苛的预算问题：

| 场景 | 影响 |
| --- | --- |
| 小而聚焦的 `AGENTS.md` | 有更多 Token 可用于任务特定指令 |
| 大而臃肿的 `AGENTS.md` | 实际工作可用的 Token 更少；智能体会困惑 |
| 无关指令 | Token 浪费 + 智能体分心 = 更差的性能 |

综合而言，这意味着**理想的 `AGENTS.md` 文件应该尽可能小。**

### 过时文档会污染上下文

大型 `AGENTS.md` 文件的另一个问题是过时。

文档很快会过时。对于人类开发者，过时文档很烦人，但人通常有足够的内置记忆，会对糟糕文档保持怀疑。对于每次请求都读取文档的 AI 智能体，过时信息会主动_污染_上下文。

当你记录文件系统结构时，这尤其危险。文件路径不断变化。如果你的 `AGENTS.md` 写着“认证逻辑位于 `src/auth/handlers.ts`”，而该文件后来被重命名或移动，智能体就会自信地在错误位置查找。

与其记录结构，不如描述能力。提示内容_可能_在哪里以及项目的整体形态。让智能体在规划期间自行生成即时文档。

领域概念（例如“organization”与“group”与“workspace”）比文件路径更稳定，因此记录它们更安全。但即便这些概念在快速演进的 AI 辅助代码库中也可能漂移。保持轻量。

## 缩减大型 `AGENTS.md` 文件

要无情地筛选此处应放的内容。可以将以下视为绝对最低限度：

- **一句话项目描述**（充当基于角色的提示词）
- **包管理器**（若不是 npm；或者使用 `corepack` 来显示警告）
- **构建/类型检查命令**（如果是非标准的）

说真的，就这些。其他所有内容都应放在别处。

### 一句话项目描述

这一句话让智能体了解自己_为何_在这个仓库中工作。它锚定了智能体做出的每一个决策。

示例：

```markdown
This is a React component library for accessible data visualization.
```

这就是基础。智能体现在理解了自己的范围。

### 包管理器说明

如果你在 JavaScript 项目中使用 npm 以外的包管理器，请明确告诉智能体：

```markdown
This project uses pnpm workspaces.
```

否则，智能体可能默认使用 `npm`，并生成错误的命令。

<details>
  <summary>Corepack 也很棒</summary>
你也可以使用 [`corepack`](https://github.com/nodejs/corepack)，让系统自动处理警告，从而节省宝贵的指令预算。
</details>

### 使用渐进式披露

不要把所有内容都塞进 `AGENTS.md`，而应使用**渐进式披露**：只给智能体当前所需的信息，并在需要时将其指向其他资源。

智能体能够快速浏览文档层级。它们对上下文的理解足以让它们找到所需内容。

#### 将特定语言的规则移到单独文件

如果你的 `AGENTS.md` 当前写着：

```markdown
Always use const instead of let.
Never use var.
Use interface instead of type when possible.
Use strict null checks.
...
```

请把它移到单独的文件中。在根 `AGENTS.md` 中写：

```markdown
For TypeScript conventions, see docs/TYPESCRIPT.md
```

请注意这种轻量方式：没有“始终”，没有全大写的强制语气，只是一次对话式引用。

好处如下：

- 只有在智能体编写 TypeScript 时，TypeScript 规则才会加载。
- 其他任务（CSS 调试、依赖管理）不会浪费 Token。
- 文件保持聚焦，并能跨模型变化保持可移植性。

#### 嵌套渐进式披露

你甚至可以再深入一层。你的 `docs/TYPESCRIPT.md` 可以引用 `docs/TESTING.md`。创建一棵可发现的资源树：

```
docs/
├── TYPESCRIPT.md
│   └── references TESTING.md
├── TESTING.md
│   └── references specific test runners
└── BUILD.md
    └── references esbuild configuration
```

你甚至可以链接到外部资源、Prisma 文档、Next.js 文档等。智能体会高效地浏览这些层级。

#### 使用 Agent Skills

许多工具支持“Agent Skills”——智能体可调用的命令或工作流，用于学习如何完成特定任务。这是渐进式披露的另一种形式：智能体只在需要时才获取知识。

我们会在另一篇文章中深入介绍 Agent Skills。


<SkillsCta
	heading="优秀的 AGENTS.md 是第一步"
	subtitle="看看我在其上运行的 Skills，如何把那个文件变成已交付的工作。"
	cta="查看 Skill 集合"
/>

## 单体仓库中的 `AGENTS.md`

你不局限于根目录中的单个 `AGENTS.md`。可以在子目录中放置 `AGENTS.md` 文件，它们会**与根级别合并**。

这对单体仓库非常有用：

### 各层应放什么

| 层级 | 内容 |
| --- | --- |
| **根目录** | 单体仓库的用途、如何浏览包、共享工具（pnpm workspaces） |
| **包** | 包的用途、具体技术栈、包特定约定 |

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

**不要让任何层级过载。**智能体会在其上下文中看到所有合并的 `AGENTS.md` 文件。让每一层都聚焦于该范围内相关的内容。

## 用此提示词修复损坏的 `AGENTS.md`

如果你开始对仓库中的 `AGENTS.md` 文件感到不安，并希望将其重构为使用渐进式披露，请尝试将以下提示词复制粘贴到你的编码智能体中：

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
	subtitle="当 Matt 打磨其智能体阅读的内容时，获取有关 Skill 帖文和更新日志的通知。"
/>

## 不要构建一团泥球

当你准备向 `AGENTS.md` 添加内容时，问问自己它应该放在哪里：

| 位置 | 何时使用 |
| --- | --- |
| 根 `AGENTS.md` | 与仓库中的每一个任务都相关 |
| 单独文件 | 与某个领域相关（TypeScript、测试等） |
| 嵌套文档树 | 可按层级组织 |

理想的 `AGENTS.md` 小巧、聚焦，并指向别处。它为智能体提供刚好足够的上下文以开始工作，同时为更详细的指导留下线索。

其他所有内容都通过渐进式披露提供：单独文件、嵌套的 `AGENTS.md` 文件或 Skills。

这样可以让你的指令预算保持高效、智能体保持聚焦，并让你的设置随着工具和最佳实践演变而经得起未来考验。
