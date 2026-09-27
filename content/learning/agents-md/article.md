---
title: "AGENTS.md 完整指南"
slug: "a-complete-guide-to-agents-md"
type: "post"
description: "了解如何为 AI 编码智能体优化 AGENTS.md 文件。掌握渐进式披露，让指令保持聚焦，并充分发挥智能体的能力。"
tags:
  - set-up-your-agent
  - code-with-ai-agents
updatedAt: "2026-01-18T15:01:44.364Z"
---

你是否担心过自己的 `AGENTS.md` 文件太大？

或许你确实该担心。写得不好的 `AGENTS.md` 会让智能体无所适从，给维护带来麻烦，而且每次请求都会额外消耗 Token。

所以，你最好了解该怎样解决这些问题。

## 什么是 AGENTS.md？

`AGENTS.md` 是一个提交到 Git 仓库的 Markdown 文件，用来定制 AI 编码[智能体](/ai-coding-dictionary/agent)在代码库中的行为。按照作者描述的工具语境，它位于对话历史的开头，紧接在[系统提示词](/ai-coding-dictionary/system-prompt)之后。

> **中文学习辅助：先认识三个名字。** Git 是记录和管理文件版本变化的工具；Markdown 是用简单文字标记表示标题、列表和链接等格式的写法；智能体是由模型和配套软件等组成、可以接收任务并使用工具开展工作的 AI 助手。

> **中文学习辅助：这里说的“位置”有范围。** 系统提示词（system prompt）是随一次模型请求提供的基础指令，用来约定角色和行为等要求。负责组织输入、提供工具并管理交互的软件称为智能体执行框架（harness）。原文描述的是作者所用工具组织输入的方式；输入中的先后位置不等于一条适用于所有产品的固定优先级结论。

你可以把它理解为一层配置，连接智能体的基础指令和你的实际代码库。文件里可以包含两类指引：

- **个人范围**：你偏好的提交风格和编码模式
- **项目范围**：项目的用途、使用的包管理器和架构决策

作者把 `AGENTS.md` 称为一项开放标准，并说明许多工具支持它，但并非所有工具都支持。具体工具是否支持、怎样查找和加载文件，仍要以相应工具及版本的说明为准。

<details>
  <summary>CLAUDE.md</summary>

作者特别指出，Claude Code 使用 `CLAUDE.md`，而不是 `AGENTS.md`；并给出用符号链接让两个文件名指向同一份内容的做法：

```bash
# Create a symlink from AGENTS.md to CLAUDE.md
ln -s AGENTS.md CLAUDE.md
```

> **中文学习辅助：如何理解这段命令。** 它的意图是创建一个名为 `CLAUDE.md` 的符号链接，目标为 `AGENTS.md`，从而避免维护两份相同内容。它采用类 Unix 环境的 `ln -s` 写法；在 Windows 或其他命令环境中，需要使用相应的创建方式，并确认所用工具会读取对应文件。

</details>

## 为什么超大的 `AGENTS.md` 文件是个问题

`AGENTS.md` 往往会在一种自然形成的反馈循环中越写越大，最终膨胀到危险的程度：

1. 智能体做了你不喜欢的事
2. 你添加一条规则，防止它再这样做
3. 几个月里重复数百次
4. 文件变成难以维护的“大杂烩”

不同的开发者会加入彼此冲突的意见，却没有人从头到尾统一梳理文件风格。最终得到的不是一份好用的说明，而是一堆难以维护、甚至会降低智能体表现的混乱内容。

作者还把自动生成的 `AGENTS.md` 视为一大原因，并强烈建议不要用初始化脚本自动生成它。这类脚本容易把“对大多数场景可能有用”的内容一股脑塞进文件，而这些内容更适合在需要时逐步提供。自动生成的文件往往追求面面俱到，却缺少必要的克制。

### 指令预算

Humanlayer 的 Kyle 在原文引用的文章中提出了“指令预算”这个概念：

> 具备推理能力的前沿大语言模型（LLM），通常能较为稳定地遵循约 150～200 条指令。小模型能兼顾的指令通常少于大模型；不进行显式推理的模型，能兼顾的指令也通常少于推理模型。

> **中文学习辅助：这是一项引用估计。** “约 150～200 条”不是所有模型都适用的固定上限。它在这里用来说明：规则越多，彼此竞争注意力或发生冲突的机会通常越大。

接下来，作者按其工具语境说明：无论内容与当前任务是否相关，`AGENTS.md` 中的 Token 都会在**每一次请求**时加载，因此会形成预算压力：

| 情况 | 影响 |
| --- | --- |
| 小而聚焦的 `AGENTS.md` | 能为当前任务的专属指令留出更多 Token |
| 大而臃肿的 `AGENTS.md` | 真正用于工作的 Token 更少，智能体也更容易困惑 |
| 无关指令 | 浪费 Token，又分散智能体注意力，表现因而变差 |

作者据此认为，**理想的 `AGENTS.md` 应当尽可能精简。**

> **中文学习辅助：这里的“每次请求”指模型请求。** 一次用户操作可能触发一次或多次模型请求；不同工具和版本加载项目规则的时机、范围和方式也可能不同。实际使用时，应以所用工具的当前说明为准。

### 过时的文档会污染上下文

大型 `AGENTS.md` 还有一个问题：内容容易过时。

文档很快就可能跟不上实际情况。对人类开发者来说，过时的文档固然麻烦，但人通常能凭经验察觉其中的问题，不会全盘照信。按作者描述，会反复读取这类文档的 AI 智能体可能把过时信息带进当前上下文，因而受到直接干扰。

记录文件系统结构时尤其危险，因为文件路径经常变化。如果 `AGENTS.md` 写着“认证逻辑位于 `src/auth/handlers.ts`”，而这个文件后来改了名或换了位置，智能体仍可能信心十足地去错误的位置查找。

与其详细记录目录结构，作者建议描述项目具备哪些能力，提示相关内容可能在哪里，并说明项目的大致组织方式。至于当前的准确结构，可以让智能体在规划任务时按需查看并整理。

领域概念（例如“organization”“group”和“workspace”之间的区别）通常比文件路径稳定，因此更适合写进文档。不过，在快速迭代、由 AI 辅助开发的代码库中，就连这些概念也可能变化。记录时不要写得过细、过死。

## 缩减庞大的 `AGENTS.md` 文件

作者建议严格筛选哪些内容值得放在这里，并把下面几项视为最精简的起点：

- **一句话的项目说明**（作用类似于为智能体设定角色的提示词）
- **包管理器**（如果使用的不是 npm；也可以用 `corepack` 自动给出警告）
- **构建/类型检查命令**（如果不是常见的标准命令）

按作者的做法，这些通常就够了，其他内容应放到别处。

### 一句话项目说明

这一句话能让智能体明白自己*为什么*要在这个仓库里工作，并为它后续的决定提供基本方向。

示例：

```markdown
This is a React component library for accessible data visualization.
```

> **中文理解（学习辅助）**：这是一个用于无障碍数据可视化的 React 组件库。

这就是最基本的背景。有了它，智能体便知道自己的工作范围。

### 指定包管理器

如果你在 JavaScript 项目中使用的不是 npm，作者建议明确告诉智能体：

```markdown
This project uses pnpm workspaces.
```

> **中文理解（学习辅助）**：本项目使用 pnpm workspaces。

如果没有这条说明，智能体可能会默认使用 `npm`，从而生成不适用于当前项目的命令。

<details>
  <summary>Corepack 也很好用</summary>

作者还建议使用 `corepack`，让系统自动发出相关警告，从而节省指令预算。`corepack` 是否可用、怎样启用，取决于本机 Node.js 与项目配置。

</details>

### 使用渐进式披露

不要把所有内容都塞进 `AGENTS.md`。作者建议采用[**渐进式披露**](/ai-coding-dictionary/progressive-disclosure)：先只提供眼下需要的信息，再通过清晰的入口告诉智能体去哪里查找细节。

在作者的经验中，智能体能够快速浏览按层次组织的文档，并根据上下文寻找所需内容。实际效果仍取决于工具是否能读取这些文件，以及入口是否清楚、路径是否有效。

#### 把特定编程语言的规则移到单独文件中

如果你的 `AGENTS.md` 目前写着：

```markdown
Always use const instead of let.
Never use var.
Use interface instead of type when possible.
Use strict null checks.
...
```

> **中文理解（学习辅助）**：上面四条分别表示：始终使用 `const`，而不要使用 `let`；绝不使用 `var`；只要条件允许，就使用 `interface` 而不是 `type`；使用严格的空值检查。这些是作者展示的“待迁移规则”示例，用来说明专用规则不宜长期塞在根文件里，并不是本教程要求所有项目普遍采用的编码规范。

请把这些内容移到单独的文件中。然后在根目录的 `AGENTS.md` 里写：

```markdown
For TypeScript conventions, see docs/TYPESCRIPT.md
```

> **中文理解（学习辅助）**：TypeScript 编码约定请参阅 `docs/TYPESCRIPT.md`。

注意，这句话写得很克制：没有使用“always”，也没有用全大写来强调命令，只是自然地告诉智能体去哪里查阅规则。

作者总结了这样做的好处：

- 在编写 TypeScript 时，智能体才需要查阅 TypeScript 规则
- 处理其他任务时，例如调试 CSS 或管理依赖，不必让这些规则占据当前上下文
- 根文件保持聚焦，也更容易适配模型变化

这些好处以工具能够按入口读取相应文件为前提，并不保证所有执行框架都会自动按需加载。

#### 嵌套渐进式披露

你还可以把文档分得更细。例如，`docs/TYPESCRIPT.md` 可以再引用 `docs/TESTING.md`，由此形成一棵容易查找的资源树：

```
docs/
├── TYPESCRIPT.md
│   └── references TESTING.md
├── TESTING.md
│   └── references specific test runners
└── BUILD.md
    └── references esbuild configuration
```

> **中文学习辅助：如何读这幅图。** `references` 表示相应文档还会引导智能体继续查阅另一份资料；图中展示的是文档之间的指向关系，并不是要求你创建名为 `references` 的目录。

作者还建议链接到 Prisma、Next.js 等项目的外部文档，让智能体沿着这些层级查找资料。实际使用时，应确认链接仍有效，且当前工具允许访问目标资料。

#### 使用智能体 Skill

许多工具支持“智能体 Skill”：可供智能体调用的命令或工作流，帮助它了解怎样完成一项具体任务。作者把它视为渐进式披露的另一种形式，因为相关知识只在需要时进入工作过程。

> **中文学习辅助：Skill 不是所有工具共有的固定功能。** 不同产品可能使用不同名称、文件格式和加载机制，使用时应查看对应工具的说明。

原文说会在另一篇文章中深入介绍智能体 Skill。

## 多项目单仓库中的 `AGENTS.md`

作者说明，`AGENTS.md` 不必只放在仓库根目录；在其讨论的工具行为中，子目录里的 `AGENTS.md` 会**与根目录文件合并**。

这对多项目单仓库（monorepo，也就是把多个相关项目或软件包放在同一个仓库中管理）尤其有用：

> **中文学习辅助：合并规则取决于具体工具。** 哪些文件会被发现、按什么顺序组合、冲突时谁生效，都可能随工具和版本变化。以下分层方法可以帮助组织内容，实际加载行为应以所用工具的说明为准。

### 各层分别放什么

| 层级 | 内容 |
| --- | --- |
| **根目录** | 整个多项目单仓库的用途、如何找到各个包、共用工具（pnpm workspaces） |
| **包** | 该软件包的用途、具体技术栈和专属约定 |

根目录的 `AGENTS.md`：

```markdown
This is a monorepo containing web services and CLI tools.
Use pnpm workspaces to manage dependencies.
See each package's AGENTS.md for specific guidelines.
```

> **中文理解（学习辅助）**：这是一个包含 Web 服务和 CLI 工具的多项目单仓库。项目使用 pnpm workspaces 管理依赖；每个软件包的具体规范，请查看该包自己的 `AGENTS.md`。

包级的 `AGENTS.md`（位于 `packages/api/AGENTS.md`）：

```markdown
This package is a Node.js GraphQL API using Prisma.
Follow docs/API_CONVENTIONS.md for API design patterns.
```

> **中文理解（学习辅助）**：这个包提供一个使用 Prisma 的 Node.js GraphQL API。API 设计请遵循 `docs/API_CONVENTIONS.md` 中的规范。

作者强调，**任何一层都不要塞入过多内容。** 在会组合这些文件的工具中，智能体会在上下文里看到相应范围的多份 `AGENTS.md`；因此每个层级只应保留与该范围直接相关的内容。

## 用这个提示词（Prompt）修复有问题的 `AGENTS.md`

如果你开始担心仓库里的 `AGENTS.md`，并想按照渐进式披露原则重构它，作者建议把下面这段提示词直接复制到编码智能体中。提示词就是交给 AI 的任务说明、指令或输入文本。

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

**中文理解（学习辅助）**

> 我希望你重构我的 AGENTS.md 文件，使它遵循渐进式披露原则。
>
> 请按以下步骤操作：
>
> 1. **找出冲突**：找出所有相互冲突的指令。每发现一处冲突，都询问我想保留哪个版本。
>
> 2. **找出核心内容**：只提取适合放在根目录 AGENTS.md 中的内容：
>    - 一句话的项目说明
>    - 包管理器（如果使用的不是 npm）
>    - 非标准的构建/类型检查命令
>    - 确实与每一项任务都相关的内容
>
> 3. **归类其余内容**：把剩余指令按合理的类别整理（例如 TypeScript 约定、测试模式、API 设计、Git 工作流），并为每个类别创建一份单独的 Markdown 文件。
>
> 4. **创建文件结构**：输出以下内容：
>    - 一份精简的根目录 AGENTS.md，其中包含指向各个独立文件的 Markdown 链接
>    - 每份独立文件，以及属于该文件的相关指令
>    - 建议采用的 `docs/` 文件夹结构
>
> 5. **标记建议删除的内容**：找出以下几类指令：
>    - 重复多余（智能体本来就知道）
>    - 太模糊，无法实际执行
>    - 过于显而易见（例如“写干净的代码”）

## 别让 AGENTS.md 变成难以维护的“大杂烩”

每当你准备向 `AGENTS.md` 添加内容时，先问问自己：它究竟应该放在哪里？

| 位置 | 适用时机 |
| --- | --- |
| 根目录 `AGENTS.md` | 与仓库中的每一项任务都相关 |
| 单独文件 | 只与某个领域相关（TypeScript、测试等） |
| 嵌套文档树 | 内容可以按层级组织 |

理想的 `AGENTS.md` 应该小而专注，并把智能体引向其他资料。它只提供足够智能体开始工作的上下文，同时留下线索，方便智能体继续查找更详细的指引。

其他内容通过渐进式披露来提供：可以放在单独的文件、嵌套的 `AGENTS.md`，也可以做成 Skill。

这样可以更有效地利用指令预算，让智能体专注于当前任务。即使工具和最佳实践不断演进，这套配置也更容易随之调整。

## 中文学习辅助：做一次放置判断

读完后，可以拿自己仓库里的一条规则问两个问题：

1. 它是否与仓库中的每一项任务都直接相关？如果是，它可能适合留在根目录 `AGENTS.md`。
2. 它是否只在某种语言、测试、API 或发布任务中有用？如果是，把它放进对应文档，并在根文件留下清楚、有效的入口。

判断的关键不是把根文件删到某个固定行数，而是让通用规则常驻，让专用规则在需要时仍然找得到。

## 中文学习辅助：本篇必要术语

- **Git**：记录和管理文件版本变化的工具。
- **Markdown**：用简单文字标记表示标题、列表和链接等格式的写法。
- **智能体（agent）**：由模型和执行框架等组合而成、可以接收任务并使用工具开展工作的 AI 助手。
- **智能体执行框架（harness）**：围绕模型运行的软件，负责组织输入、提供工具、执行调用并管理交互过程。
- **系统提示词（system prompt）**：随模型请求提供的基础指令，用来约定角色和行为等要求。
- **提示词（Prompt）**：交给 AI 的任务说明、指令或输入文本。
- **Token**：模型读取和生成文本时使用的基本计量单位，不等同于一个汉字或一个英文单词。
- **上下文（context）**：广义上指当前任务已提供给助手使用的信息；本文讨论 Token 和“每次请求”时，特指某一次模型请求中实际附带的信息。
- **渐进式披露**：先提供完成当前步骤所需的信息，再通过清楚的入口按需展开细节。
- **多项目单仓库（monorepo）**：把多个相关项目或软件包放在同一个代码仓库中统一管理的方式。
- **包管理器**：安装、更新并记录项目依赖的工具；npm 和 pnpm 是 JavaScript 生态中的例子。
- **Skill**：部分智能体工具提供的专用指令或工作流单元；名称和加载方式取决于具体产品。
- **符号链接**：让一个路径指向另一个文件或目录的文件系统机制；创建方式受操作系统、权限和命令环境影响。
