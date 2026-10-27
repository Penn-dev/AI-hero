---
title: "v1.1：/wayfinder、/to-spec、/to-tickets、/grilling 改进，以及更多变化"
slug: "skills-changelog-v1-1-wayfinder-to-spec-to-tickets-grilling-improvements"
type: "page"
updatedAt: "2026-07-08T14:13:51.609Z"
---

[AI Skills 更新日志](/skills)

# v1.1：/wayfinder、/to-spec、/to-tickets、/grilling 改进，以及更多变化

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

分享

经过一段较长的开发，Skills 仓库的 1.1 版终于准备好合入了。这次改动多得惊人：全新的追问方式、一批现有 Skills 更新，以及两个主流程 Skill 的改名。

与其试着在开头概括所有内容，我们直接看变化。

## [如何迁移](#how-to-migrate)

这次有 Skill 改名和合并，需要更新安装。Skills 安装器不会自动识别并处理这些变化。

运行命令获取所有新 Skills：

```shellscript
npx skills add mattpocock/skills
```

你可以自由选择要哪些。完成后检查 Skills 文件夹，确认没有旧 Skills 残留。

新的公开文档在：

- `docs/engineering/to-spec.md`
- `docs/engineering/to-tickets.md`

## [主要改名：`/to-spec` 与 `/to-tickets`](#major-renames-to-spec-and-to-tickets)

最可能让人觉得麻烦的两项变化是改名，但它们确实有充分理由。旧名称困扰我很久了，因为没有准确反映我们实际在做什么。

### [从 `/to-prd` 到 `/to-spec`](#from-to-prd-to-to-spec)

`/to-prd` 改名为 `/to-spec`。关键在于，我们生成的其实不是 PRD，也就是产品需求文档。PRD 描述产品本身，而我们允许不少非产品内容混进来。我们真正写的是 specification，即规格：范围宽得多，可以是技术内容、非技术内容，或两者兼有。

现在，“spec”是贯穿整套 Skills 的统一术语。你可能仍习惯把这份文档叫 PRD，但今后我们统一使用“spec”。

### [从 `/to-plan`、`/to-issues` 到 `/to-tickets`](#from-to-plan-and-to-issues-to-to-tickets)

两个 Skills 合并成一个：`/to-plan` 和 `/to-issues` 现在统一为 `/to-tickets`。旧名称偏向 GitHub 和 Linear，因为这两个平台叫它们“issues”。实际概念更通用：你有一份规格，规格下面是一组任务单，描述如何把规格一步步变成现实。

`/to-tickets` 把计划、规格或对话拆成一组**任务单**，每张都是曳光弹式的纵向切片，并声明自己的**阻塞依赖关系**。根据任务系统的设置，同一份产物有两种用法：

- **本地文件** `tickets.md`：用文字写依赖，你按从上到下的顺序手动推进。
- **实际任务系统**：依赖成为原生阻塞链接；前置任务都完成的任务进入可领取前沿，多名智能体可以并行工作。

这些年一直盼着名称能准确，如今终于清楚了，我很开心。

译注：纵向切片贯穿实现所需的各层，形成一个可以端到端验证的小增量；“前沿”指当前未被阻塞、可以开始的任务集合。

## [Grilling Skill 的改进](#grilling-skill-improvements)

接下来的变化修复了大家使用 `/grill-me` 和 `/grill-with-docs` 时遇到的问题。它们都依赖一份核心 grilling 参考 Skill，指导大语言模型怎样有效追问人。

### [三项关键修复](#three-key-fixes)

**1. 更清楚地指导如何提问**

原先的指导是“asking multiple questions at once is bewildering”。即使有这句话，模型偶尔仍忽略要求，一次问好几个。所以我更明确地解释了*为什么*不要同时问多个问题。

中文 Prompt（译注，对应原指导语）：

```text
一次提出多个问题会让人不知所措。
```

**2. 实现之前设置确认关口**

我在最后加了一步确认：“Do not enact the plan until I confirm we've reached a shared understanding.” 很多人反映，追问一结束，模型就直接开始实现。这个关口是为阻止这种情况。

中文 Prompt（译注）：

```text
在我确认我们已经达成共同理解之前，不要执行这个计划。
```

**3. 防止自问自答**

有些奇怪的情况下，模型会自己追问自己，探索代码库后，根本不让人参与就继续访谈。这在 Fable 上尤其常见。为了解决它，我加入模型已熟悉的概念词，区分两类信息：

| 类型 | 定义 | 例子 |
| --- | --- | --- |
| **事实** | 探索代码库可以发现的东西 | 代码模式、现有实现 |
| **决定** | 需要用户决定的东西 | 架构选择、功能范围 |

查看表格

只添了几句话、调了几处顺序，Skill 就稳定得多。这些微调显著减少了大家报告的怪问题。

## [完整开发生命周期流程](#complete-development-lifecycle-flow)

我新增了几个 Skills，把追问从主要用于规划的活动，变成完整软件开发生命周期的一部分。很多人问：“What's the main flow I'm supposed to use with the skills?” 也就是“这套 Skills 的主流程究竟怎么走？”答案在这里：

![完整开发工作流示意图](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_3840/f_auto/q_auto/v1783519442/ai-hero-images/dswt0zd86eyaztzabvci?_a=BAVMn6DY0)

### [流程：从追问到部署](#the-flow-from-grilling-to-deployment)

**1. 从追问开始**

不是直接使用 plan mode，而是让智能体围绕你的目标提问。过程中使用两类辅助文档：

- 词汇表，帮助智能体更好地理解你的领域。
- 架构决策记录（ADR），记下那些不显而易见的内容。

**2. 生成规格**

把追问产出写进规格，定义目的地：这个功能或项目最终要走到哪里。

**3. 拆成任务单**

接着用 `/to-tickets` 把规格变成独立任务，让开发分散到多次智能体会话中，每次专注一张。

**4. 实现每张任务单**

使用 `/implement`，它简单得让人轻松：

```txt
Implement the work described by the user in the spec or tickets.
Use TDD where possible at pre-agreed seams.
Run type checking regularly.
Single test files regularly.
Full test sweep once at the end.
```

中文 Prompt（译注，可完整复制）：

```text
实现用户在规格或任务单中描述的工作。
在事先约定的边界处，尽可能使用 TDD。
定期运行类型检查。
定期运行单个测试文件。
最后进行一次完整测试。
```

`/implement` 主要依赖智能体已有的知识和 `agents.md` 中的教导。因为实在简单，我差点没有专门写这个 Skill。但大家一直问“what's the flow?”，也就是“流程是什么？”，所以现在你有了清楚的终点：有任务单后，在各自独立的编程会话中逐项实现。

**5. 代码审阅**

实现完成后，`/implement` 调用 `/code-review`，提交之前先审阅。

### [结合重构坏味道做代码审阅](#code-review-with-refactoring-smells)

代码审阅 Skill 沿两个方向检查，各自使用一个子智能体：

| 方向 | 目的 | 具体做法 |
| --- | --- | --- |
| **标准** | 是否符合编码标准 | 读取仓库的 `codingstandards.md` 或类似文件 |
| **规格** | 是否正确满足需求 | 代码是否忠实实现最初规格或任务单？ |

查看表格

两个子智能体并行，逐部分检查代码。

这个 Skill 很有意思的新变化是：我最近重读 Martin Fowler 的《重构》，意识到智能体在训练中已经深入学过代码坏味道。你只需要唤起这个概念。例如：

- 神秘命名（Mysterious name）
- 重复代码（Duplicated code）
- 依恋情结（Feature envy，过度依赖其他模块的数据）
- 数据泥团（Data clumps，总是一起出现的一组数据）
- 基本类型偏执（Primitive obsession）
- 重复的 switch（Repeated switches）
- 发散式变化（Divergent change，一个模块因多种不同原因而改）
- 夸夸其谈的通用性（Speculative generality，为假想需求增加泛化）
- 过长的消息链（Message chains）
- 中间人（Middleman，只转交工作而没提供多少价值）

提到这些，智能体会接住术语，说：“Yes, I found message chains. I need to remove them. I found a middleman situation. I need to fix that.” 中文理解：“是的，我发现了消息链，需要移除；也发现了中间人问题，需要修好。”

我试了几周，对改善代码质量好用得惊人。最好的是，添加成本很低，只需要大约十行指导。

## [为大型计划引入 Wayfinder](#introducing-wayfinder-for-large-plans)

接下来是我特别兴奋的 Skill：一种全新的启动、塑造规格的方法，叫 `/wayfinder`，设计上会在许多场景里替代 `/grill-with-docs`。

![GitHub issue 中的 Wayfinder 地图，展示各项阻塞关系](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_3840/f_auto/q_auto/v1783519443/ai-hero-images/hrjyn3a1hjruevbd1kyp?_a=BAVMn6DY0)

### [什么时候用 Wayfinder](#when-to-use-wayfinder)

要规划的内容多到一次会话装不下时，用 `/wayfinder`。否则会超出智能体的高效工作区，甚至撞上上下文窗口上限。你需要拆成多部分，才能弄清该去哪里。

它的思路如下，保留原英文：

> A loose idea has arrived, too big for one agent session and wrapped in fog. The way from here to the destination isn't visible yet. This skill charts the way as a shared map on the repo's issue tracker, then works its tickets one at a time until the route is clear.

中文 Prompt（译注，完整翻译这段 Skill 描述）：

```text
现在有一个模糊的想法，大到一次智能体会话装不下，也笼罩在迷雾中。从这里通往目的地的路线还看不清。这个 Skill 在仓库的任务系统上把路线画成共享地图，再一次处理一张任务单，直到路线清楚。
```

译注：高效工作区对应原文 smart zone，指模型在上下文尚未过度膨胀时较能可靠工作的区间，不是一个保证正确的固定数值。

### [Wayfinder 如何工作](#how-wayfinder-works)

Wayfinder 创建一张以 GitHub issues 保存的地图，每项决定的范围控制在一次智能体会话内。决定之间通过阻塞关系连接，前置问题未解决，依赖它的决定就不能先做。

这里是 Sandcastle 仓库中的一个例子，调查是否应把 AI SDK 引入为依赖。

**任务类型：**

- **Research**：AFK 任务，由智能体研究并报告发现。
- **Grilling**：通过追问会话做出决定。
- **Prototype**：快速原型，提高讨论的具体程度。
- **Task**：配置、资源开通或其他不需要追问的工作。

### [为什么原型很重要](#why-prototyping-matters)

我一直提倡，在写规格之前多做原型。用低成本、粗糙但具体的产物让人作出反应，提高讨论的清晰度：可以是大纲、粗稿、桩实现，或 UI 逻辑代码。

**这些情况适合原型：**

- “应该长什么样？”是关键问题。
- “应该怎样运行？”是关键问题。

几乎所有涉及前端代码的工作都少不了这一点。任何前端工作，我都会明确推荐使用 `/wayfinder`。

### [Wayfinder 完成之后](#after-wayfinder-completes)

全部任务关闭后，信息汇总到地图上，原任务单作为一手来源。接着就能照常把地图变成规格。

Wayfinder 的好处是，不必再用 `/grill-with-docs` 时自己应付会话焦虑，担心交接和高效工作区，它替你管理这些。关掉一次会话，打开下一张 Wayfinder 任务单就行。内容全部保存在 GitHub，团队可以协作、共享。

## [辅助 Skills：Research 与 Prototype](#supporting-skills-research-and-prototype)

为支持 Wayfinder 工作流，新增了两个 Skills。

### [`/research` Skill](#the-research-skill)

`/research` 小巧，但很实用：

- 启动后台智能体研究，它读资料时你可以继续工作。
- 依据一手来源调查问题。
- 把发现写成简单的 Markdown 文件。
- 按仓库已有惯例，保存到通常存放这类笔记的地方。

需要研究、又不想打断工作时，就可以用。

### [`/prototype` Skill](#the-prototype-skill)

`/prototype` 现在允许模型调用，Wayfinder 因而能自行使用。它给你两种选择：

| 类型 | 目的 | 用途 |
| --- | --- | --- |
| **逻辑原型** | 测试行为与逻辑 | 后端 API、业务逻辑 |
| **UI 原型** | 测试外观与交互 | 前端组件、用户流程 |

查看表格

两类原型带来的反馈很不一样，都能帮助你在敲定规格前探索设计空间。

## [TDD Skill 更新](#tdd-skill-updates)

最后一项变化回应了大家的要求：把 `/tdd` 交给 AFK 智能体，就能让它直接工作。

### [以前的方式](#previous-approach)

旧 `/tdd` 会推荐一组步骤，让你逐项确认。这很别扭，因为与多数人实际使用 TDD 的方式不符，大家希望智能体自主完成。

### [新的方式](#new-approach)

`/tdd` 现在只作参考材料，不规定具体执行步骤，只保留关键顺序：

```txt
1. Red - Write failing tests
2. Green - Make tests pass
3. Refactor - Improve code (moved out of the loop)
```

中文 Prompt（译注，可完整复制）：

```text
1. 红灯：写出会失败的测试。
2. 绿灯：让测试通过。
3. 重构：改善代码（已移到循环之外）。
```

关键变化是，重构不再属于 TDD 循环，而由代码审阅阶段处理，让实现阶段更聚焦、更干净，不必让实现会话同时背负过多重构事项。

## [需要留意什么](#what-to-watch-for)

- **`/to-spec` 替代 `/to-prd`**：更新相关流程或文档。
- **`/to-tickets` 替代 `/to-plan` 与 `/to-issues`**：它们现在合并了。
- **新工作流**：考虑采用“追问 → 规格 → 任务单 → 实现 → 代码审阅”。
- **多试 Wayfinder**：较大型规划任务，试着用 `/wayfinder` 代替 `/grill-with-docs`。

AI Hero · 免费邮件课程

### 面向真正工程师的 AI Skills

为编程智能体建立可重复的工作流，同时守住你的工程标准。

译注：课程介绍之后，冻结原文未提供报名按钮目标或表单字段，本页不补造。发布状态、效果判断和适用建议保留作者当时的说法；本页不替你执行安装、迁移或调用 Skills。

**分享**

[X 分享](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-v1-1-wayfinder-to-spec-to-tickets-grilling-improvementsv1.1%3A%20%2Fwayfinder%2C%20%2Fto-spec%2C%20%2Fto-tickets%2C%20%2Fgrilling%20improvements%2C%20and%20much%20more%20%20by%20%40mattpocockuk) · [Bluesky 分享](https://bsky.app/intent/compose?text=v1.1%3A%20%2Fwayfinder%2C%20%2Fto-spec%2C%20%2Fto-tickets%2C%20%2Fgrilling%20improvements%2C%20and%20much%20more%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-v1-1-wayfinder-to-spec-to-tickets-grilling-improvements) · [LinkedIn 分享](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/skills/skills-changelog-v1-1-wayfinder-to-spec-to-tickets-grilling-improvements?author=Matt Pocock>)

复制网址

译注：相关中文词条：[规格](/ai-coding-dictionary/spec)、[任务单](/ai-coding-dictionary/ticket)、[AFK](/ai-coding-dictionary/afk)、[上下文](/ai-coding-dictionary/context)。中文页未接入时会回到原站英文页。
