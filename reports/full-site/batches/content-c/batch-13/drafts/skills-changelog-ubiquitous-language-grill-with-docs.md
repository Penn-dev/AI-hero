---
title: "Skills 更新日志：从统一领域语言到 /grill-with-docs"
slug: "skills-changelog-ubiquitous-language-grill-with-docs"
type: "post"
description: "Skills 仓库更新：/grill-with-docs、架构决策记录、架构语言改进、多任务系统支持和新调试 Skills。"
updatedAt: "2026-04-30T10:36:43.176Z"
---

我的 [Skills 仓库](https://github.com/mattpocock/skills)已经有超过 46.6k 星标，逐渐成为我对工程方法思考的精华集合。现在，我会定期发布 Skills 变化的视频，用更新日志的方式帮助你跟上变化。

这些 Skills 可以下载到自己的环境中，立即开始使用。它们体现了我日常工作中的方法和技巧。

译注：46.6k 约为 4.66 万。本文是 2026 年 4 月 30 日的更新日志，下文文件名、调用名与开发中状态均保留当时版本，不静默替换为后来名称。

## 仓库结构调整

第一项大变化是仓库结构。Skills 现在按不同类别组织：

| 类别 | 用途 |
| --- | --- |
| [**效率 Skills**](https://github.com/mattpocock/skills/tree/main/skills/productivity) | 适用于一般工作流程，不限于代码 |
| [**工程 Skills**](https://github.com/mattpocock/skills/tree/main/skills/engineering) | 主要集合，我每天使用，建议认真学会 |
| [**杂项 Skills**](https://github.com/mattpocock/skills/tree/main/skills/misc) | 偶尔使用，尚不确定是否长期保留 |
| [**弃用 Skills**](https://github.com/mattpocock/skills/tree/main/skills/deprecated) | 正逐步淘汰，或由新方案替代 |
| [**个人 Skills**](https://github.com/mattpocock/skills/tree/main/skills/personal) | 我个人使用，分享给大家参考，并非核心用法 |

目前可以放心忽略 `misc` 和 `deprecated` 文件夹。

## 主要变化与新功能

### `/ubiquitous-language` 改为 `/grill-with-docs`

[`/ubiquitous-language`](https://github.com/mattpocock/skills/tree/main/skills/deprecated/ubiquitous-language) 已弃用，合入功能更强的新 Skill [`/grill-with-docs`](https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs)。

**变化包括：**

- 不再创建 `ubiquitous-language.md`，改为创建 `context.md`
- 追问讨论和文档记录合为一个阶段
- 支持多个限界上下文，这是领域驱动设计（DDD）的常见模式

这意味着你可以：

- 为系统不同部分分别设定上下文，例如下单与计费
- 各自有 `context.md` 和共同语言
- 无需让整个应用共用一套领域语言

译注：限界上下文是词语和规则有明确适用范围的一块领域。例如“账户”在登录系统与财务系统中不必指同一件事。

**对比两种 Skill：**

[`/grill-with-docs`](https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs) 与 [`/grill-me`](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me)：

| 特点 | `/grill-with-docs` | `/grill-me` |
| --- | --- | --- |
| **最适合** | 代码库 | 通用场景，生活、工作、创作项目 |
| **输出** | `context.md`、ADR | 灵活的文档形式 |
| **位置** | 工程文件夹 | 效率文件夹 |

[`/grill-me`](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me) 完全没有改动，只是换了分类。甚至有人用它为母亲写悼词，效果非常好。

### `/grill-with-docs`：架构决策记录（ADR）

[`/grill-with-docs`](https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs) 现在加入架构决策记录（ADR）。以下三项全部成立时，应创建 ADR：

1. 难以逆转
2. 没有背景时会让人意外
3. 源于真实取舍

把这些不显而易见的决定与你的 AI 说清并达成一致，能避免它反复提出同一个糟糕建议。

### `/improve-codebase-architecture`：新增 `LANGUAGE.md`

[`/improve-codebase-architecture`](https://github.com/mattpocock/skills/tree/main/skills/engineering/improve-codebase-architecture) 迎来较大更新，加入一套完整的语言定义，用来讨论代码库改进。

现在用准确术语描述架构概念，例如：

```md
**`Module`**

Anything with an interface and an implementation. Deliberately scale-agnostic - applies equally to a function, class, package, or tier-spanning slice.

**`Interface`**

Everything a caller must know to use the module correctly. Includes the type signature, but also invariants, ordering constraints, error modes, required configuration, and performance characteristics.

**`Implementation`**

What's inside a module - its body of code. Distinct from Adapter: a thing can be a small adapter with a large implementation (a Postgres repo) or a large adapter with a small implementation (an in-memory fake).
```

中文理解（学习辅助）：

```md
**`Module`，模块**

任何同时具有接口和实现的事物。刻意不限定规模，同样适用于函数、类、软件包或跨技术层的一段功能。

**`Interface`，接口**

调用方正确使用模块所必须知道的一切。包括类型签名，也包括不变量、调用顺序限制、错误模式、必要配置和性能特征。

**`Implementation`，实现**

模块内部的代码。与 Adapter（适配器）不同：一个东西可以是小适配器配大实现，例如 Postgres 数据存储；也可以是大适配器配小实现，例如内存测试替身。
```

这套共同语言能避免冗长讨论，让你和 AI 对好的代码库应该是什么样达成一致。

### `/setup-matt-pocock-skills`：灵活选择任务跟踪系统

Skills 现在适用于**任何**任务跟踪系统，不再只限 GitHub Issues。

**以前：** [`/to-issues`](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-issues) 等工程 Skills 专门针对 GitHub Issues 调整。

**现在：** Skills 会说“publish the issues to the issue tracker”，但怎么知道是哪个系统？

中文 Prompt（译注）：

```text
把这些 issue 发布到任务跟踪系统。
```

答案是新的 [`/setup-matt-pocock-skills`](https://github.com/mattpocock/skills/tree/main/skills/engineering/setup-matt-pocock-skills)。

它创建一个 `CLAUDE.md`，为每个仓库建立配置，包括：

- 任务跟踪系统的位置
- 分流标签
- 领域文档路径

**自定义系统：** 因为执行者是 LLM 驱动的智能体，你可以接入任意自定义任务系统，甚至尚未受支持的工具。

设置过程如下：

```
Set up Matt Pocock Skills
→ Install all engineering skills
→ Pick the skills you want
→ Run: matt-pocock set-up-matt-pocock-skills
```

中文 Prompt（译注）：

```text
设置 Matt Pocock Skills
→ 安装全部工程 Skills
→ 选择想要的 Skills
→ 运行：matt-pocock set-up-matt-pocock-skills
```

生成的 `CLAUDE.md` 很精简：

```
issues live at: github/issues at mattpocock.sandcastle
issue tracker: logged in here
```

中文理解（学习辅助）：

```text
issue 位置：github/issues at mattpocock.sandcastle
任务跟踪系统：已在此登录
```

这里采用渐进式披露，智能体只在需要时读取配置。

译注：上述配置和设置步骤按原例保留，并非当前环境已经登录的证明，也没有在这里执行命令。

## 新实验性 Skills

### `/diagnose`

[`/diagnose`](https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnose) 用于修复棘手 bug。每次调试时都运行它。

**流程：**

1. 建立反馈循环
2. 在循环中复现 bug
3. 提出假设，并按优先级展示
4. 添加观测，例如日志，查看行为
5. 修复

**注意：** AI 目前在这些阶段之间仍然太急着往前跳，这个 Skill 还在调整。

### `/triage`

[`/triage`](https://github.com/mattpocock/skills/tree/main/skills/engineering/triage) 分流不是你创建的 issue，通常就是积压任务。

**使用场景：** 产品经理随手写了模糊的功能需求，triage 帮忙整理。

**工作方式：** 使用状态机，分为类别角色和状态角色。

**类别角色：**

- `bug`：某处坏了
- `enhancement`：新功能或改进

**状态角色：**

- `needs-triage`：维护者需要评估
- `needs-info`：等待报告者提供更多信息
- `ready-for-agent`：规格完整，可以交给 AFK 智能体
- `ready-for-human`：需要人来实现
- `wontfix`：不处理

分流后的每个 issue 都恰有一个类别角色和一个状态角色。我在开源仓库中使用，效果很好。我可以先加模糊消息，再生成评论澄清，最后把 issue 准备成 AI 可以接手的状态。

译注：状态机规定任务有哪些状态及如何切换。AFK 指人离开键盘后，让智能体在限定范围内自行工作。

## 获取更多更新

所有 Skills 更新和更好使用智能体的技巧，都发布在 [aihero.dev/skills](https://aihero.dev/skills)。这是专门围绕 Skills 的邮件通讯。

谢谢持续关注。希望你喜欢看这些更新，就像我喜欢制作它们一样。下次见！

译注：相关中文词条：[Skill](/ai-coding-dictionary/skill)、[渐进式披露](/ai-coding-dictionary/progressive-disclosure)、[AFK](/ai-coding-dictionary/afk)。中文页未接入时会回到原站英文页。
