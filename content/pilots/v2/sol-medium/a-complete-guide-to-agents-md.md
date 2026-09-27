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

`AGENTS.md` 是一个提交到 Git 仓库的 Markdown 文件，用来定制 AI 编码智能体在代码库中的行为。它位于对话历史的开头，紧接在[系统提示词](https://www.aihero.dev/ai-coding-dictionary/system-prompt)之后。系统提示词可以理解为工具在每次对话开始前，自动交给 AI 的最高优先级基础说明。

你可以把它理解为一层配置，连接智能体的基础指令和你的实际代码库。文件里可以包含两类指引：

- **个人范围**：你偏好的提交风格和编码模式
- **项目范围**：项目的用途、使用的包管理器和架构决策

`AGENTS.md` 是一项开放标准，许多工具都支持，但并非所有工具都支持。

<details>
  <summary>CLAUDE.md</summary>

需要特别说明的是，Claude Code 不使用 `AGENTS.md`，而是使用 `CLAUDE.md`。你可以在二者之间创建符号链接，让各个工具读取同一份内容：

```bash
# Create a symlink from AGENTS.md to CLAUDE.md
ln -s AGENTS.md CLAUDE.md
```

中文学习辅助：这条命令会让 `CLAUDE.md` 指向 `AGENTS.md`，这样就不必分别维护两份内容相同的说明文件。

</details>

## 为什么超大的 `AGENTS.md` 文件是个问题

`AGENTS.md` 往往会在一种自然形成的反馈循环中越写越大，最终膨胀到危险的程度：

1. 智能体做了你不喜欢的事
2. 你添加一条规则，防止它再这样做
3. 几个月里重复数百次
4. 文件变成难以维护的“大杂烩”

不同的开发者会加入彼此冲突的意见，却没有人从头到尾统一梳理文件风格。最终得到的不是一份好用的说明，而是一堆难以维护、甚至会降低智能体表现的混乱内容。

自动生成的 `AGENTS.md` 也是一大原因。千万不要用初始化脚本自动生成 `AGENTS.md`。这类脚本会把“对大多数场景可能有用”的内容一股脑塞进文件，而这些内容更适合在需要时逐步提供。自动生成的文件追求面面俱到，却缺少必要的克制。

### 指令预算

Humanlayer 的 Kyle 在[这篇文章](https://www.humanlayer.dev/blog/writing-a-good-claude-md)中提到“指令预算”这个概念：

> 具备推理能力的前沿大语言模型（LLM），通常能较为稳定地遵循约 150～200 条指令。小模型能兼顾的指令通常少于大模型；不进行显式推理的模型，能兼顾的指令也通常少于推理模型。

不管内容与当前任务是否相关，`AGENTS.md` 中的每个 Token 都会在**每一次请求**时加载。这就带来了严格的预算限制：

| 情况                       | 影响                                      |
| -------------------------- | ----------------------------------------- |
| 小而聚焦的 `AGENTS.md`     | 能为当前任务的专属指令留出更多 Token       |
| 大而臃肿的 `AGENTS.md`     | 真正用于工作的 Token 更少，智能体也更容易困惑 |
| 无关指令                   | 浪费 Token，又分散智能体注意力，表现因而变差 |

综合来看，**理想的 `AGENTS.md` 应当尽可能精简。**

### 过时的文档会污染上下文

大型 `AGENTS.md` 还有一个问题：内容容易过时。

文档很快就可能跟不上实际情况。对人类开发者来说，过时的文档固然麻烦，但人通常能凭经验察觉其中的问题，不会全盘照信。AI 智能体却会在每次请求时读取文档，因此过时的信息会直接*污染*它的上下文。

记录文件系统结构时尤其危险，因为文件路径经常变化。如果 `AGENTS.md` 写着“认证逻辑位于 `src/auth/handlers.ts`”，而这个文件后来改了名或换了位置，智能体仍可能信心十足地去错误的位置查找。

与其详细记录目录结构，不如描述项目具备哪些能力。你可以提示相关内容可能在哪里，并说明项目的大致组织方式。至于当前的准确结构，可以让智能体在规划任务时按需查看并整理。

领域概念（例如“organization”“group”和“workspace”之间的区别）通常比文件路径稳定，因此更适合写进文档。不过，在快速迭代、由 AI 辅助开发的代码库中，就连这些概念也可能变化。记录时不要写得过细、过死。

## 缩减庞大的 `AGENTS.md` 文件

要严格筛选哪些内容值得放在这里。可以把下面几项视为绝对最低限度：

- **一句话的项目说明**（作用类似于为智能体设定角色的提示词）
- **包管理器**（如果使用的不是 npm；也可以用 `corepack` 自动给出警告）
- **构建/类型检查命令**（如果不是常见的标准命令）

说真的，这些就够了。其他内容都应该放到别处。

### 一句话项目说明

这一句话能让智能体明白自己*为什么*要在这个仓库里工作，并为它后续的每个决定提供基本方向。

示例：

```markdown
This is a React component library for accessible data visualization.
```

中文理解版（学习辅助）：

> 这是一个用于无障碍数据可视化的 React 组件库。

这就是最基本的背景。有了它，智能体便知道自己的工作范围。

### 指定包管理器

如果你在 JavaScript 项目中使用的不是 npm，请明确告诉智能体：

```markdown
This project uses pnpm workspaces.
```

中文理解版（学习辅助）：

> 本项目使用 pnpm workspaces。

如果没有这条说明，智能体可能会默认使用 `npm`，从而生成错误的命令。

<details>
  <summary>Corepack 也很好用</summary>
你也可以使用 [`corepack`](https://github.com/nodejs/corepack)，让系统自动发出相关警告，从而省下宝贵的指令预算。
</details>

### 使用渐进式披露

不要把所有内容都塞进 `AGENTS.md`。应该采用[**渐进式披露**](https://www.aihero.dev/ai-coding-dictionary/progressive-disclosure)：先只提供眼下需要的信息，再通过链接告诉智能体去哪里查找细节。

智能体很擅长快速浏览层层组织的文档，也能根据上下文找到自己需要的内容。

#### 把特定编程语言的规则移到单独文件中

如果你的 `AGENTS.md` 目前写着：

```markdown
Always use const instead of let.
Never use var.
Use interface instead of type when possible.
Use strict null checks.
...
```

中文理解版（学习辅助）：

> 上面四条分别表示：优先使用 `const` 声明不会重新赋值的变量；不要使用旧式的 `var`；在合适时优先使用 TypeScript 的 `interface`；开启严格的空值检查。它们都是只在编写 TypeScript 时才有用的细节，因此不适合长期占据根目录说明。

请把这些内容移到单独的文件中。然后在根目录的 `AGENTS.md` 里写：

```markdown
For TypeScript conventions, see docs/TYPESCRIPT.md
```

中文理解版（学习辅助）：

> TypeScript 编码约定请参阅 docs/TYPESCRIPT.md。

注意，这句话写得很克制：没有使用“always”，也没有用全大写来强调命令，只是自然地告诉智能体去哪里查阅规则。

这样做有几个好处：

- 只有在智能体编写 TypeScript 时，才需要加载 TypeScript 规则
- 处理其他任务时，例如调试 CSS 或管理依赖，不会为这些规则浪费 Token
- 文件始终保持聚焦，也更容易适配不同模型

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

中文学习辅助：在这幅目录示意图中，`references` 表示相应文档还会引导智能体继续查阅另一份资料。

你甚至可以链接到 Prisma、Next.js 等项目的外部文档。智能体能够高效地沿着这些层级查找资料。

#### 使用智能体 Skill

许多工具都支持“智能体 Skill”：智能体可以调用某个命令或工作流，了解怎样完成一项具体任务。这也是渐进式披露的一种形式，因为智能体只会在需要时加载相关知识。

我们会在另一篇文章中深入介绍智能体 Skill。


## 多项目单仓库中的 `AGENTS.md`

`AGENTS.md` 不必只放在仓库根目录。你还可以在子目录中放置 `AGENTS.md` 文件，它们会**与根目录文件合并**。

这对 monorepo（把多个相关项目或软件包放在同一个仓库中管理）尤其有用：

### 各层分别放什么

| 层级        | 内容                                                                 |
| ----------- | -------------------------------------------------------------------- |
| **根目录**  | 整个 monorepo 的用途、如何找到各个包、共用工具（pnpm workspaces）     |
| **包**      | 该软件包的用途、具体技术栈和专属约定                                 |

根目录的 `AGENTS.md`：

```markdown
This is a monorepo containing web services and CLI tools.
Use pnpm workspaces to manage dependencies.
See each package's AGENTS.md for specific guidelines.
```

中文理解版（学习辅助）：

> 这是一个包含 Web 服务和 CLI 工具的多项目单仓库。项目使用 pnpm workspaces 管理依赖；每个软件包的具体规范，请查看该包自己的 AGENTS.md。

包级的 `AGENTS.md`（位于 `packages/api/AGENTS.md`）：

```markdown
This package is a Node.js GraphQL API using Prisma.
Follow docs/API_CONVENTIONS.md for API design patterns.
```

中文理解版（学习辅助）：

> 这个包提供一个使用 Prisma 的 Node.js GraphQL API。API 设计请遵循 docs/API_CONVENTIONS.md 中的规范。

**任何一层都不要塞入过多内容。** 智能体会在上下文中看到所有合并后的 `AGENTS.md`。每个层级只需保留与该范围直接相关的内容。

## 用这个 Prompt 修复有问题的 `AGENTS.md`

如果你开始担心仓库里的 `AGENTS.md`，并想按照渐进式披露原则重构它，可以把下面这段 Prompt 直接复制到你的编码智能体中：

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
>    - 建议采用的 docs/ 文件夹结构
>
> 5. **标记建议删除的内容**：找出以下几类指令：
>    - 重复多余（智能体本来就知道）
>    - 太模糊，无法实际执行
>    - 过于显而易见（例如“写干净的代码”）


## 别让 AGENTS.md 变成难以维护的“大杂烩”

每当你准备向 `AGENTS.md` 添加内容时，先问问自己：它究竟应该放在哪里？

| 位置                        | 适用时机                                      |
| --------------------------- | --------------------------------------------- |
| 根目录 `AGENTS.md`          | 与仓库中的每一项任务都相关                    |
| 单独文件                    | 只与某个领域相关（TypeScript、测试等）        |
| 嵌套文档树                  | 内容可以按层级组织                            |

理想的 `AGENTS.md` 应该小而专注，并把智能体引向其他资料。它只提供足够智能体开始工作的上下文，同时留下线索，方便智能体继续查找更详细的指引。

其他内容都通过渐进式披露来提供：可以放在单独的文件、嵌套的 `AGENTS.md`，也可以做成 Skill。

这样可以更有效地利用指令预算，让智能体专注于当前任务。即使工具和最佳实践不断演进，这套配置也更容易随之调整。

## 中文学习辅助：术语小词典

- **Token**：大语言模型读取和生成文本时使用的基本计量单位。一段文字通常会被拆成多个 Token。
- **LLM**：Large Language Model 的缩写，即“大语言模型”，是一类能够理解和生成文本的 AI 模型。
- **Markdown**：一种轻量级标记语言，可以用简单符号表示标题、列表、链接等格式。
- **Git**：记录和管理文件版本变化的工具，常用于多人协作开发。
- **npm**：JavaScript 生态中常用的包管理器，用来安装和管理项目依赖。
- **pnpm workspaces**：pnpm 提供的工作区功能，可在同一个仓库中统一管理多个相关软件包。
- **corepack**：随部分 Node.js 版本提供的包管理器管理工具，可帮助项目使用指定版本的包管理器。
- **Skill**：供智能体按需加载的一组专门指令或工作流程。
- **CLI**：Command-Line Interface 的缩写，即“命令行界面”，用户通过输入文字命令来操作程序。
- **API**：Application Programming Interface 的缩写，即“应用程序编程接口”，是不同软件之间进行交互的一套约定。
- **GraphQL**：一种 API 查询语言及其运行机制，客户端可以明确指定自己需要的数据。
- **Prisma**：帮助 Node.js 和 TypeScript 应用访问数据库的开发工具。
- **Prompt**：你交给 AI 的任务说明或指令文本，中文常译为“提示词”。
- **monorepo**：把多个相关项目或软件包放在同一个代码仓库中统一管理的方式，中文常称“多项目单仓库”。
- **React**：用于构建网页界面的 JavaScript 工具库。
- **TypeScript**：在 JavaScript 基础上增加类型检查的编程语言，常用于大型 Web 项目。
- **Node.js**：让 JavaScript 可以在浏览器之外运行的环境，常用于开发工具和服务器程序。
