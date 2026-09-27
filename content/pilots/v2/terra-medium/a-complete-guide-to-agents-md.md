---
title: "AGENTS.md 完整指南"
slug: "a-complete-guide-to-agents-md"
type: "post"
description: "了解如何为 AI 编码智能体优化 AGENTS.md 文件。掌握渐进式披露，让指令保持聚焦，并充分提升智能体表现。"
tags:
  - set-up-your-agent
  - code-with-ai-agents
updatedAt: "2026-01-18T15:01:44.364Z"
---

你是否担心过自己的 `AGENTS.md` 文件太大？

你或许确实该担心。糟糕的 `AGENTS.md` 文件会让智能体感到困惑，变成维护噩梦，并且每次请求都会消耗你的 Token。

因此，你最好知道如何解决这个问题。

## 什么是 AGENTS.md？

`AGENTS.md` 是一种会提交到 Git 的 Markdown 文件，用来定制 AI 编码智能体在你的代码库中的行为。它位于对话历史的最前面，紧接在系统提示词之后。

可以把它理解成智能体基础指令与实际代码库之间的一层配置。文件中可以包含两类指引：

- **个人范围**：你偏好的提交风格、编码模式
- **项目范围**：项目的用途、所用的包管理器、架构决策

`AGENTS.md` 是开放标准，许多工具都支持它，不过并非全部。

<details>
  <summary>CLAUDE.md</summary>

值得注意的是，Claude Code 不使用 `AGENTS.md`，而是使用 `CLAUDE.md`。你可以在两者之间创建符号链接，让所有工具以相同方式工作：

```bash
# Create a symlink from AGENTS.md to CLAUDE.md
ln -s AGENTS.md CLAUDE.md
```

中文学习辅助：这条命令会让 `CLAUDE.md` 指向同一份 `AGENTS.md` 内容，从而避免维护两份独立说明。

</details>

## 为什么超大的 `AGENTS.md` 文件是个问题

有一种自然形成的反馈循环，会让 `AGENTS.md` 文件膨胀到危险的程度：

1. 智能体做了你不喜欢的事
2. 你添加一条规则来阻止它
3. 几个月里重复数百次
4. 文件变成难以维护的“大杂烩”

不同开发者会加入互相冲突的看法，也没有人完整地梳理一遍风格。结果是什么？一份无法维护的混乱说明，反而损害了智能体的表现。

另一个原因是自动生成的 `AGENTS.md` 文件。不要使用初始化脚本自动生成 `AGENTS.md`。这类脚本会把“对大多数场景有用”的内容一股脑塞进文件，但这些内容更适合按需渐进式披露。生成文件优先追求面面俱到，而不是克制。

### 指令预算

Humanlayer 的 Kyle 在他的[文章](https://www.humanlayer.dev/blog/writing-a-good-claude-md)中提到“指令预算”这个概念：

> 前沿思考型 LLM 大致能以较合理的一致性遵循约 150 至 200 条指令。较小模型能关注的指令少于较大模型；非思考型模型能关注的指令少于思考型模型。

无论某条内容是否相关，你的 `AGENTS.md` 文件中的每个 Token 都会在**每一次请求**中加载。这带来了一个硬性的预算问题：

| 情况                       | 影响                                      |
| -------------------------- | ----------------------------------------- |
| 小而聚焦的 `AGENTS.md`     | 有更多 Token 可用于任务专属指令            |
| 大而臃肿的 `AGENTS.md`     | 真正工作可用的 Token 更少；智能体容易困惑  |
| 无关指令                   | 浪费 Token + 分散智能体注意力 = 表现更差   |

综合来看，**理想的 `AGENTS.md` 文件应当尽可能小。**

### 过时的文档会污染上下文

大型 `AGENTS.md` 文件的另一个问题是内容过时。

文档很快就会落后于实际情况。对人类开发者来说，过时文档很烦人，但人通常有足够的既有记忆，会对不可靠的文档保持怀疑。AI 智能体则会在每次请求中读取文档，因此过时信息会主动*污染*上下文。

在你记录文件系统结构时，这一点尤其危险。文件路径会不断变化。如果你的 `AGENTS.md` 写着“认证逻辑位于 `src/auth/handlers.ts`”，而那个文件后来被重命名或移动，智能体就会很有把握地去错误的位置查找。

与其记录结构，不如描述能力。提示内容可能在哪里，以及项目的大致形态。让智能体在规划过程中自行生成恰到好处的即时文档。

领域概念（例如“organization”“group”“workspace”之间的区别）比文件路径稳定，因此记录它们更安全。但即使这些概念，在快速迭代、由 AI 辅助的代码库中也可能漂移。措辞要轻一些。

## 缩减庞大的 `AGENTS.md` 文件

要严格筛选这里该放什么。可以把它视为绝对最低限度：

- **一句话的项目说明**（作用类似基于角色的提示词）
- **包管理器**（如果不是 npm；或者用 `corepack` 获得警告）
- **构建/类型检查命令**（如果这些命令不是标准写法）

说实话，就这些。其余内容都应该放到别处。

### 一句话项目说明

这一句话让智能体明白自己*为什么*要在这个代码库中工作。它会锚定智能体之后做出的每一个决定。

示例：

```markdown
This is a React component library for accessible data visualization.
```

中文理解版（学习辅助）：

> 这是一个用于构建无障碍数据可视化的 React 组件库。

这就是基础。智能体现在理解了自己的工作范围。

### 指定包管理器

如果你在 JavaScript 项目中使用了 npm 以外的包管理器，请明确告诉智能体：

```markdown
This project uses pnpm workspaces.
```

中文理解版（学习辅助）：

> 本项目使用 pnpm workspaces。

如果没有这条说明，智能体可能默认使用 `npm`，并生成不正确的命令。

<details>
  <summary>Corepack 也很好用</summary>
你也可以使用 [`corepack`](https://github.com/nodejs/corepack)，让系统自动处理警告，从而节省宝贵的指令预算。
</details>

### 使用渐进式披露

不要把所有内容都塞进 `AGENTS.md`，而要使用**渐进式披露**：只给智能体当前需要的信息，并在需要时指向其他资源。

智能体能快速浏览文档层级，也足够理解上下文，能够找到所需内容。

#### 把语言专属规则移到单独文件中

如果你的 `AGENTS.md` 目前写着：

```markdown
Always use const instead of let.
Never use var.
Use interface instead of type when possible.
Use strict null checks.
...
```

把它移到单独的文件里。在根目录的 `AGENTS.md` 中写：

```markdown
For TypeScript conventions, see docs/TYPESCRIPT.md
```

中文理解版（学习辅助）：

> 如需了解 TypeScript 约定，请查看 docs/TYPESCRIPT.md。

注意这种轻量的写法：没有“always”，没有全大写的强制要求，只是一句自然的参考提示。

好处如下：

- 只有当智能体编写 TypeScript 时，才会加载 TypeScript 规则
- 其他任务（CSS 调试、依赖管理）不会浪费 Token
- 文件保持聚焦，并且在不同模型变化时仍便于迁移

#### 嵌套渐进式披露

你还可以继续深入。你的 `docs/TYPESCRIPT.md` 可以引用 `docs/TESTING.md`。创建一棵容易发现的资源树：

```
docs/
├── TYPESCRIPT.md
│   └── references TESTING.md
├── TESTING.md
│   └── references specific test runners
└── BUILD.md
    └── references esbuild configuration
```

中文学习辅助：上面的目录示意中，`references` 表示该文档会引导智能体继续查阅另一个文档。

你甚至可以链接到外部资源，例如 Prisma 文档、Next.js 文档等。智能体会高效地浏览这些层级。

#### 使用智能体 Skill

许多工具支持“智能体 Skill”——智能体可以调用的命令或工作流，用于学习如何完成某个具体任务。这也是渐进式披露的一种形式：智能体只在需要时才引入相关知识。

我们会在另一篇文章中深入介绍智能体 Skill。


<SkillsCta
	heading="优秀的 AGENTS.md 只是第一步"
	subtitle="看看我在它之上使用哪些 Skill，把这份文件变成已经交付的成果。"
	cta="查看这套 Skill"
/>

## 单体仓库中的 `AGENTS.md`

你并不局限于在根目录放置一份 `AGENTS.md`。你可以在子目录中放置 `AGENTS.md` 文件，它们会**与根级文件合并**。

这对单体仓库很有用：

### 各层分别放什么

| 层级        | 内容                                                                 |
| ----------- | -------------------------------------------------------------------- |
| **根目录**  | 单体仓库的目的、如何浏览各包、共享工具（pnpm workspaces）            |
| **包**      | 包的目的、具体技术栈、该包专属的约定                                |

根目录的 `AGENTS.md`：

```markdown
This is a monorepo containing web services and CLI tools.
Use pnpm workspaces to manage dependencies.
See each package's AGENTS.md for specific guidelines.
```

中文理解版（学习辅助）：

> 这是一个包含 Web 服务和 CLI 工具的单体仓库。使用 pnpm workspaces 管理依赖。具体规范请查看各个包中的 AGENTS.md。

包级的 `AGENTS.md`（位于 `packages/api/AGENTS.md`）：

```markdown
This package is a Node.js GraphQL API using Prisma.
Follow docs/API_CONVENTIONS.md for API design patterns.
```

中文理解版（学习辅助）：

> 这个包是一个使用 Prisma 的 Node.js GraphQL API。请遵循 docs/API_CONVENTIONS.md 中的 API 设计模式。

**不要让任何一层承载过多内容。**智能体会在上下文中看到所有合并后的 `AGENTS.md` 文件。每一层都应聚焦于该范围真正相关的内容。

## 用这个 Prompt 修复损坏的 `AGENTS.md`

如果你开始为仓库中的 `AGENTS.md` 文件感到不安，并希望将其重构为使用渐进式披露，可以尝试把下面这个 Prompt 复制粘贴到你的编码智能体中：

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

中文理解版（学习辅助）：

> 我希望你重构我的 AGENTS.md 文件，让它遵循渐进式披露原则。
>
> 请按以下步骤操作：
>
> 1. **找出冲突**：找出彼此冲突的任何指令。对于每一处冲突，询问我想保留哪个版本。
>
> 2. **识别核心内容**：只提取应放在根目录 AGENTS.md 中的内容：
>    - 一句话项目说明
>    - 包管理器（如果不是 npm）
>    - 非标准的构建/类型检查命令
>    - 确实与每一项任务都相关的内容
>
> 3. **归类其余内容**：把剩余指令组织为逻辑类别（例如 TypeScript 约定、测试模式、API 设计、Git 工作流）。为每个类别创建单独的 Markdown 文件。
>
> 4. **创建文件结构**：输出：
>    - 一份精简的根目录 AGENTS.md，其中包含指向单独文件的 Markdown 链接
>    - 每份单独文件及其相关指令
>    - 建议的 docs/ 文件夹结构
>
> 5. **标记待删除内容**：找出以下类型的指令：
>    - 冗余（智能体已经知道）
>    - 太模糊，无法落实
>    - 过于显而易见（例如“写干净的代码”）


<SkillsNewsletterCta
	heading="在收件箱中获取下一次 AGENTS.md 升级"
	subtitle="当 Matt 打磨智能体所读内容时，获取 Skill 文章和变更日志说明。"
/>

## 别让它变成难以维护的“大杂烩”

当你准备往 `AGENTS.md` 中添加内容时，先问问自己它该放在哪里：

| 位置                        | 适用时机                                      |
| --------------------------- | --------------------------------------------- |
| 根目录 `AGENTS.md`          | 与仓库中的每一项任务都相关                      |
| 单独文件                    | 与某个领域相关（TypeScript、测试等）            |
| 嵌套文档树                  | 可以按层级组织                                  |

理想的 `AGENTS.md` 很小、很聚焦，并且会指向其他地方。它给智能体刚好足够的上下文来开始工作，同时留下通往更详细指引的线索。

其余内容都放在渐进式披露中：单独文件、嵌套的 `AGENTS.md` 文件或 Skill。

这样能让你的指令预算更高效，智能体保持聚焦，并随着工具和最佳实践的发展，让整套设置经得起未来变化。

## 中文学习辅助：术语小词典

- **Token**：模型处理文本时使用的计量单位；文本越长，通常需要的 Token 越多。
- **LLM**：Large Language Model 的缩写，指能够理解和生成语言的大语言模型。
- **Markdown**：一种用简单符号编写标题、列表、链接等格式的轻量级标记语言。
- **Git**：用于记录和管理文件版本变化的工具。
- **npm**：JavaScript 常用的包管理器。
- **pnpm workspaces**：pnpm 用来统一管理多个相关软件包的一种工作区机制。
- **corepack**：帮助管理 JavaScript 包管理器版本的工具。
- **TypeScript**：在 JavaScript 基础上增加类型检查的编程语言。
- **Skill**：智能体按需调用的一组专门指令、命令或工作流程。
- **CLI**：Command-Line Interface 的缩写，指通过输入命令操作的命令行界面。
- **GraphQL**：一种用于 API 的查询语言和运行时。
- **API**：Application Programming Interface 的缩写，指不同软件之间约定的交互接口。
- **Prisma**：用于操作数据库的开发工具。
