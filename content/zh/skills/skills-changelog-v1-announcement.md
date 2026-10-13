---
title: "v1：Token 减少 63%、/ask-matt、/writing-great-skills"
slug: "skills-changelog-v1-announcement"
type: "page"
updatedAt: "2026-06-18T11:43:30.135Z"
---

[AI Skills 更新日志](/skills)

# v1：Token 减少 63%、/ask-matt、/writing-great-skills

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

分享

[Skills 目录](https://github.com/mattpocock/skills)迎来了 v1 这个重要里程碑。在累计超过 420 万次下载、13.5 万 GitHub 星标之后，这次发布带来关键调整：大幅减少 Token 消耗，按调用方式重新组织 Skills，并开放强大的新能力。

## [开始使用最新版 Skills](#getting-started-with-the-latest-skills)

安装或更新都很简单，运行下面的命令：

```shellscript
npx skills add mattpocock/skills
```

![终端中的交互式 Skill 选择界面，列出 Matt Pocock Skills 及其他类别](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_3840/f_auto/q_auto/v1781782533/ai-hero-images/kqe2yzwxhsx1gtkcqki6?_a=BAVMn6DY0)

无论第一次使用，还是从旧版升级，现在都是体验这些改进的好时机。

## [有哪些变化](#the-changes)

### [`disable-model-invocation`：Token 减少 63%](#disable-model-invocation-a-63-token-reduction)

v1 最大的结构调整，是在许多 Skills 中采用 `disable-model-invocation: true`。设置这个标记后，模型判断该调用哪个 Skill 时查看的上下文窗口里，就不再包含这个 Skill 的描述。

这项简单改动让 Skill 描述的 **Token 成本降低 63%**。对使用上下文受限模型的人来说，是很大的改善。

译注：63% 指原文所述的 Skill 描述 Token 成本，不是所有任务的总 Token 消耗，也不是本页重新测得的结果。

#### Skills 因此怎样重新组织

过去，`/grill-with-docs` 等 Skills 中包含共享内容，导致同样的信息在多个地方重复。现在，这些内容被抽出来了。

`/grilling` 包含此前嵌在其他 Skills 里的核心访谈循环：

```txt
Interview me relentlessly about every aspect of this plan
until we reach a shared understanding.
```

中文 Prompt（译注，可完整复制）：

```text
围绕这个计划的每个方面持续追问我，
直到我们达成共同理解。
```

`/grilling` **没有**禁止模型调用，因此智能体仍能自行调用。其他 Skills 可以自由复用它，不必把描述越写越长。

`/grill-with-docs` 的前置元数据和正文现在简单得多：

```markdown
---
name: grill-with-docs
description: A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.
disable-model-invocation: true
---

Run a `/grilling` session, using the `/domain-modeling` skill.
```

中文 Prompt（译注，保留机器字段及 Skill 名称，完整翻译描述和指令）：

```markdown
---
name: grill-with-docs
description: 通过持续追问磨清计划或设计，并在过程中同步创建文档（ADR 和词汇表）。
disable-model-invocation: true
---

运行一次 `/grilling` 会话，同时使用 `/domain-modeling` Skill。
```

其他重构后的 Skills 也遵循同样原则：

- **`/domain-modeling`**：成为独立 Skill，与 `/grill-with-docs` 解耦。
- **`/codebase-design`**：抽成独立 Skill，提供深层模块词汇。
- **`/diagnosing-bugs`**：原名 `/diagnose`，现在引用设计原则，不再重复其内容。

### [用户调用与模型调用的 Skills](#user-invoked-vs-model-invoked-skills)

v1 引入了更清楚的分类：**用户调用型**与**模型调用型**。

| 类型 | 用途 | 何时使用 |
| --- | --- | --- |
| **用户调用型** | 编排工作流，只有你明确输入时才运行 | 你明确要求时 |
| **模型调用型** | 执行聚焦的任务，模型可以自行选用 | 模型选择使用时 |

查看表格

这种划分让模型能在必要时选用特定 Skills，例如诊断难解的 bug、采用测试驱动开发或建立领域概念模型，同时不让多余选项挤满界面。

工程目录的 README 中，模型可自行调用的 Skills 只有少数几个：

- `/diagnosing-bugs`：复杂调试场景。
- `/tdd`：适合测试驱动开发时。
- `/domain-modeling`：领域模型工作。
- `/codebase-design`：架构指导。
- `/grilling`：可复用的访谈循环。

你编排工作的主要方式，仍然是用户调用型 Skills。

## [新 Skills 与重大重写](#new-skills-and-major-rewrites)

### [深入了解 Writing Great Skills](#writing-great-skills-a-deep-dive)

这次重点推出的新 Skill 之一是 `/writing-great-skills`。Matt 花了六到七小时打磨它，其中有一份详尽的 `GLOSSARY.md`，为每个术语都写了词条。

词汇表涵盖这些概念：

- **No-op**：没有实际作用、应删除的段落。
- **Sprawl**：不必要的扩张或重复。
- **Sediment**：积累并沉淀在 Skill 中的冗余旧内容。
- **Premature completion**：还没有充分理解就过早结束。
- **Leading words**：模型在预训练中已经学过、表达紧凑的概念。

调用 `/writing-great-skills` 后，它会寻找重构 Skills 的机会，并运用 leading words：高效、语言模型已经熟悉的术语。

光这个 Skill 就包含了足够多有用的模式，接下来会有一部专门的视频深入讲解。

### [/ask-matt：帮你找到方向的路由 Skill](#ask-matt-a-router-skill-for-navigation)

用户调用型 Skills 越来越多，记住它们会增加认知负担。新的 `/ask-matt` 充当路由，解决这个问题：给你一个统一入口，列出其他所有 Skills，并解释分别什么时候用。

`/ask-matt` 说明了：

- 如何使用目录里的所有其他 Skills。
- 主工作流是什么、如何编排。
- 交接模式，以及在交接期间制作原型。
- 如何判断跨多次会话的构建是否需要 PRD。
- 如何保持上下文整洁。
- 启动工作的不同入口。
- 如何用 `/improve-codebase-architecture` 改善代码库健康状况。

不用去 Discord 提问，也不用在文档里翻找，这个 Skill 自己就会教你如何使用整套 Skills。这就是大家一直想要的完整指南。

译注：PRD 是产品需求文档；这里保留 v1 发布时的工作流称呼。

### [新增与改名](#new-and-renamed-skills)

v1 还包括这些变化：

- **`/writing-great-skills`**：替代 `/write-a-skill`，提供深入得多的参考内容。
- **`/diagnosing-bugs`**：原名 `/diagnose`，名称更清楚。
- **`/resolving-merge-conflicts`**：新独立 Skill，处理 Git merge 和 rebase 冲突。
- **`/codebase-design`**：新的共享 Skill，提供深层模块词汇。
- **`/domain-modeling`**：新的共享 Skill，用于建立项目领域模型。
- **移除**：`/caveman` 与 `/zoom-out` 已弃用。

## [我为什么做这些改动](#why-i-made-these-changes)

这些改进体现了一条核心原则：**掌握控制权的是用户，不是智能体**。模型是由你编排的工具，不是反过来。

没错，决定该用哪个 Skill 时，你需要承担更多认知工作。这也正是 `/ask-matt` 存在的原因：让指路这件事不再费劲。

大幅减少 Token 消耗、区分用户调用与模型调用后，你就能获得更好的能力：设计更好的代码库、修复更棘手的 bug、编写更好的 Skills，同时不再把上下文浪费在不必要的描述上。

AI Hero · 免费邮件课程

### 面向真正工程师的 AI Skills

为编程智能体建立可重复的工作流，同时守住你的工程标准。

译注：冻结原文在此只提供课程介绍，没有报名按钮目标或表单字段，因此本页不补造报名表单。文中的下载量、星标、版本和视频预告均按原文保留，未当作当前数据重新核实。

**分享**

[X 分享](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-v1-announcementv1%3A%2063%25%20Token%20Reduction%2C%20%2Fask-matt%2C%20%2Fwriting-great-skills%20%20by%20%40mattpocockuk) · [Bluesky 分享](https://bsky.app/intent/compose?text=v1%3A%2063%25%20Token%20Reduction%2C%20%2Fask-matt%2C%20%2Fwriting-great-skills%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-v1-announcement) · [LinkedIn 分享](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/skills/skills-changelog-v1-announcement?author=Matt Pocock>)

复制网址

译注：相关中文词条：[Token](/ai-coding-dictionary/token)、[上下文](/ai-coding-dictionary/context)、[Skill](/ai-coding-dictionary/skill)。中文页未接入时会回到原站英文页。
