---
title: "使用 Ralph Wiggum 进行 AI 编码的 11 个技巧"
slug: "tips-for-ai-coding-with-ralph-wiggum"
type: "post"
description: "使用 Ralph Wiggum 在自主循环中运行 AI 编码工具。提供 11 个 AFK 编码技巧：范围、进度跟踪、反馈循环，以及在你睡觉时交付代码。"
tags:
  - build-a-software-factory
updatedAt: "2026-01-08T12:25:29.414Z"
---

如果你在使用 [Claude Code](https://code.claude.com/docs/en/overview)、[Copilot CLI](https://github.com/features/copilot/cli)、[OpenCode](https://opencode.ai/) 和 [Codex](https://openai.com/codex/) 等 AI 编码 CLI，本文就是为你准备的。

大多数开发者以交互方式使用这些工具。你给它一个任务，看着它工作，并在它偏离轨道时介入。这就是“人在回路”（HITL）编码。

但有一种名为 [Ralph Wiggum](https://ghuntley.com/ralph/) 的新方法。Ralph 在循环中运行你的 AI 编码 CLI，让它针对一份任务清单自主工作。你定义需要完成的内容。Ralph 负责弄清如何完成——并持续执行，直到完成为止。换句话说，这是一种长时间运行、自主且无需监督的 AFK 编码。

这不是快速入门指南。如果你想快速上手，请阅读 [Ralph 入门](https://www.aihero.dev/getting-started-with-ralph)。

### 11 个技巧

| # | 技巧 | 概述 |
| --- | --- | --- |
| 1 | [Ralph 是一个循环](#1-ralph-is-a-loop) | Ralph 是什么，以及它为何有效 |
| 2 | [先从 HITL 开始，再转为 AFK](#2-start-with-hitl-then-go-afk) | 运行 Ralph 的两种模式 |
| 3 | [定义范围](#3-define-the-scope) | 如何说明“完成”的样子 |
| 4 | [跟踪 Ralph 的进度](#4-track-ralphs-progress) | 在迭代之间使用进度文件 |
| 5 | [使用反馈循环](#5-use-feedback-loops) | 类型、测试与 linting 作为护栏 |
| 6 | [迈出小步](#6-take-small-steps) | 为什么较小任务能产生更好的代码 |
| 7 | [优先处理高风险任务](#7-prioritize-risky-tasks) | 先解决困难问题 |
| 8 | [明确界定软件质量](#8-explicitly-define-software-quality) | 不要让 Ralph 偷工减料 |
| 9 | [使用 Docker 沙箱](#9-use-docker-sandboxes) | 为 AFK Ralph 提供安全隔离 |
| 10 | [付费才能参与](#10-pay-to-play) | 成本考量与权衡 |
| 11 | [打造属于你自己的方式](#11-make-it-your-own) | 替代循环类型和定制 |

## 1. Ralph 是一个循环

过去一年左右，AI 编码经历了几个不同阶段。让我们简要定义它们：

**氛围编程（Vibe Coding）**是指让 AI 编写代码，却并不真正检查它。你和 AI “凭感觉”协作，不加审查地接受其建议。它很快，但代码质量会受影响。

**规划**是指在编码前要求 AI 先规划。在 [Claude Code](https://code.claude.com/docs/en/overview) 中，你可以进入[计划模式](https://code.claude.com/docs/en/common-workflows#use-plan-mode-for-safe-code-analysis)，让 AI 探索代码库并在写代码前创建计划。这会提高质量，但你仍受限于一个上下文窗口能容纳的内容。

**多阶段计划**将大型功能拆分为多个阶段，每个阶段在独立的上下文窗口中处理。你为每个阶段编写不同的提示词：“实现数据库 schema”，然后是“添加 API 端点”，再然后是“构建 UI”。它扩展性更好，但需要人持续参与，为每个提示词撰写内容。

**Ralph** 简化了一切。你不必为每个阶段编写新提示词，而是在循环中运行同一个提示词：

```bash
# ralph.sh
# Usage: ./ralph.sh <iterations>

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

# For each iteration, run Claude Code with the following prompt.
# This prompt is basic, we'll expand it later.
for ((i=1; i<=$1; i++)); do
  result=$(docker sandbox run claude -p \
"@some-plan-file.md @progress.txt \
1. Decide which task to work on next. \
This should be the one YOU decide has the highest priority, \
- not necessarily the first in the list. \
2. Check any feedback loops, such as types and tests. \
3. Append your progress to the progress.txt file. \
4. Make a git commit of that feature. \
ONLY WORK ON A SINGLE FEATURE. \
If, while implementing the feature, you notice that all work \
is complete, output <promise>COMPLETE</promise>. \
")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "PRD complete, exiting."
    exit 0
  fi
done

```

每次迭代：

1. 查看计划文件，了解需要完成什么。
2. 查看进度文件，了解已经完成什么。
3. 决定接下来做什么。
4. 探索代码库。
5. 实现功能。
6. 运行反馈循环（类型、linting、测试）。
7. 提交代码。

这里的关键改进是：**由智能体（Agent）选择任务，而不是由你选择。**

在多阶段计划中，人类在每个阶段开始时编写新的提示词。使用 Ralph 时，智能体从你的 PRD 中选择接下来要做的工作。你定义最终状态，Ralph 会抵达那里。

我曾使用 Ralph 为 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 添加测试，并为我的[课程视频管理器](https://github.com/mattpocock/course-video-manager)构建功能。其他人已经使用它[构建了完整的编程语言](https://github.com/ghuntley/ralph-lang)。

## 2. 先从 HITL 开始，再转为 AFK

运行 Ralph 有两种方式：

| 模式 | 工作方式 | 最适合 | 脚本 |
| --- | --- | --- | --- |
| **HITL**（人在回路） | 运行一次、观察、介入 | 学习、提示词优化 | `ralph-once.sh` |
| **AFK**（离开键盘） | 在带最大迭代次数的循环中运行 | 批量工作、低风险任务 | `afk-ralph.sh` |

对于 HITL Ralph，请保留一个 `ralph-once.sh`，用于运行单次迭代。你观察它所做的一切，并在需要时介入。

对于 AFK Ralph，始终要限制迭代次数。无限循环对随机系统很危险。对于小任务，我通常使用 5–10 次迭代；对于较大任务则使用 30–50 次。

HITL Ralph 类似于结对编程。你和 AI 一起工作，在代码创建过程中审查它。你可以实时引导、贡献并分享项目理解。

这也是学习 Ralph 的最佳方式。你会理解它的工作方式、优化提示词，并在离开监督前建立信心。

一旦提示词足够可靠，AFK Ralph 就能释放真正的杠杆作用。让它运行，去做别的事，完成后再回来。

我构建了一个小型 CLI，在 Ralph 完成时通过 WhatsApp 提醒我。这意味着更少的上下文切换。我可以完全投入另一项任务。我的循环通常耗时 30–45 分钟，也可能持续数小时。

这个过程很简单：

1. 从 HITL 开始，学习并优化。
2. 在信任提示词后转为 AFK。
3. 返回时审查提交。

## 3. 定义范围

在让 Ralph 运行之前，你需要定义“完成”是什么样子。这是从规划到需求收集的转变。你不再规定每个步骤，而是描述期望的最终状态，让智能体自己弄清如何到达那里。

### 定义范围的格式

有很多方式可以为 Ralph 定义范围：

- 一份 Markdown 用户故事列表。
- GitHub issues 或 [Linear tasks](https://linear.app)（稍后会详细介绍）。
- 使用 [beads](https://github.com/steveyegge/beads)。

我喜欢的一种方法来自 [Anthropic 关于长时间运行智能体的研究](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)。他们将 PRD 条目构造为带有 `passes` 字段的 JSON：

```json
{
  "category": "functional",
  "description": "New chat button creates a fresh conversation",
  "steps": [
    "Click the 'New Chat' button",
    "Verify a new conversation is created",
    "Check that chat area shows welcome state"
  ],
  "passes": false
}
```

Ralph 在完成时将 `passes` 标记为 `true`。PRD 同时成为范围定义和进度跟踪器——它是一份活的 TODO 列表，而不是瀑布式文档。

### 为什么范围很重要

你并不_需要_一份结构化 TODO 列表。你可以给 Ralph 一个模糊任务——“改进这个代码库”——并让它自行跟踪进度。

但任务越模糊，风险越大。Ralph 可能会不断循环，找到无穷无尽的改进。或者它可能走捷径，在你认为工作尚未完成之前就宣布胜利：

我曾让 Ralph 提高 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 的测试覆盖率。这个仓库有内部命令——被标记为内部，但仍面向用户（我会使用它们）。我想为所有内容编写测试。

三次迭代后，Ralph 报告：“已完成所有面向用户的命令。”但它完全跳过了内部命令。它认定这些命令不面向用户，并将其标记为不纳入覆盖率。

解决方案？准确定义你希望覆盖的内容：

| 要指定什么 | 为什么能防止走捷径 |
| --- | --- |
| 要包含的文件 | Ralph 不会忽略“边缘情况”文件 |
| 停止条件 | Ralph 知道“完成”真正意味着完成 |
| 边缘情况 | Ralph 不会自行认定某些事情不算数 |

### 在运行中调整 PRD

这种方法的一个好处是：你可以在 Ralph 运行时调整。

- 已实现但不正确？将 `passes` 改回 `false`，添加注释，然后重新运行。
- 缺少功能？即使在循环中也可以添加新的 PRD 条目。

你并不是在编辑线性的多阶段计划，而是在描述一个不同的最终状态。Ralph 会到达那里。

只要范围和停止条件明确，Ralph 就会知道何时输出 `<promise>COMPLETE</promise>`。

### 试试看

使用计划模式，并为下一个功能创建 `prd.json` 文件。使用以下提示词生成结构化 PRD 条目：

```txt
Convert my feature requirements into structured PRD items.
Each item should have: category, description, steps to verify, and passes: false.
Format as JSON. Be specific about acceptance criteria.
```

## 4. 跟踪 Ralph 的进度

我运行的每个 Ralph 循环都会产生一个 `progress.txt` 文件，并直接提交到仓库。我从 Anthropic 的[长时间运行智能体执行框架文章](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)中获得了这个灵感。

这解决了一个核心挑战：AI 智能体就像极聪明的专家，但会在任务之间忘记一切。每个新的上下文窗口都重新开始。没有进度文件，Ralph 必须探索整个仓库，才能理解当前状态。

进度文件会缩短这种探索。Ralph 读取它，看到已完成的内容，并直接跳到下一个任务。

### 进度文件中应包含什么

保持简单且简洁：

- 本次会话中完成的任务。
- 做出的决策及其原因。
- 遇到的阻塞因素。
- 已修改的文件。

你还可以包括刚完成的 PRD 条目、任何架构决策，以及下一次迭代的备注。

### 为什么提交很重要

Ralph 应在每个功能之后提交。这为未来迭代提供：

- 一份清晰的 `git log`，展示发生了什么变化。
- 能够针对先前工作运行 `git diff`。
- 出现问题时的回滚点。

进度文件与 Git 历史的组合，让 Ralph 获得完整上下文，同时不因探索而耗尽 Token。

### 清理

不要永久保留 `progress.txt`。当 sprint 结束后，删除它。这是会话专用内容，不是永久文档。

### 试试看

将进度跟踪添加到你的 Ralph 提示词中：

```txt
After completing each task, append to progress.txt:
- Task completed and PRD item reference
- Key decisions made and reasoning
- Files changed
- Any blockers or notes for next iteration
Keep entries concise. Sacrifice grammar for the sake of concision. This file helps future iterations skip exploration.
```


<SkillsCta
	heading="11 个技巧，一套系统"
	subtitle="当它实际需要交付时，支撑 Ralph 循环的 Skills。"
	cta="查看 Skill 集合"
/>

## 5. 使用反馈循环

Ralph 的成功依赖于反馈循环。你提供的循环越多，它产出的代码质量就越高。

### 反馈循环的类型

| 反馈循环 | 能捕获什么 |
| --- | --- |
| [TypeScript](https://www.typescriptlang.org) 类型 | 类型不匹配、缺少 props |
| 单元测试 | 损坏的逻辑、回归 |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) server | UI bug、损坏的交互 |
| [ESLint](https://eslint.org) / linting | 代码风格、潜在 bug |
| [Pre-commit hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) | 完全阻止不良提交 |

最好的设置会在所有检查通过前阻止提交。如果测试是红的，Ralph 就不能宣布胜利。

### 为什么反馈循环很重要

优秀的程序员不信任自己的代码。他们不信任外部库。他们尤其不信任同事。相反，他们构建自动化和检查来验证交付的内容。

这种谦逊能产出更好的软件。对 AI 智能体同样如此。

本文中的每个技巧对人类开发者也有效。反馈循环、小步前进、明确范围——这些不是 AI 专属技术，而是好的工程实践。Ralph 让它们变得不可协商。

### 试试看

将明确的反馈循环要求添加到你的 Ralph 提示词中：

```txt
Before committing, run ALL feedback loops:
1. TypeScript: npm run typecheck (must pass with no errors)
2. Tests: npm run test (must pass)
3. Lint: npm run lint (must pass)
Do NOT commit if any feedback loop fails. Fix issues first.
```

## 6. 迈出小步

你获得反馈的速度就是你的速度上限。永远不要让前进速度超过车灯照亮的范围。

人类进行大规模重构时，可能会一口吃下很大一块并持续推进。测试、类型和 linting 会连续数小时保持红色。将工作拆分成更小的块意味着更紧密的反馈循环——在收到反馈前需要完成的工作更少。

这同样适用于 Ralph，但多了一个限制：上下文窗口有限，而且 LLM 在上下文填满时表现会变差。这被称为[上下文腐化](https://research.trychroma.com/context-rot)——持续时间越长，输出就越愚蠢。

### 权衡

每次 Ralph 迭代都有启动成本。Ralph 必须选择任务、探索仓库并收集上下文。这些 Token 会在每轮循环中消耗。

如果你在进行大型重构，不会希望 Ralph 每次迭代只重命名一个变量。但：

- 任务越大，反馈越不频繁。
- 上下文越多，代码质量越低。
- 任务越小，质量越高，但进展越慢。

### 确定 PRD 条目的大小

对于 AFK Ralph，保持 PRD 条目小。你希望在无人观察时，智能体保持最佳状态。

对于 HITL Ralph，你可以把条目稍微做大一些，以便更快看到进展。但即使如此，也应偏向小任务。

一个重构条目可以简单到：“修改一个函数的参数。验证测试和类型通过。”

在提示词中，指导 Ralph 采用怎样的步长。我的倾向是：小步。代码质量优先于速度——特别是在 AFK 时，速度本来就不那么重要。

### 试试看

将步长指导添加到你的 Ralph 提示词中：

```txt
Keep changes small and focused:
- One logical change per commit
- If a task feels too large, break it into subtasks
- Prefer multiple small commits over one large commit
- Run feedback loops after each change, not at the end
Quality over speed. Small steps compound into big progress.
```

## 7. 优先处理高风险任务

Ralph 会自行选择任务。没有明确指导时，它通常会选择列表中的第一项，或看起来最容易实现的内容。

这与人类行为相似。开发者喜欢快速获胜。但有经验的工程师知道，应该先解决难题，以免简单工作让你埋没在技术债中。

### 探索性试验与集成

专注于探索性试验——那些你不知道最终会如何发展的事情。端到端构建功能，而不是逐层构建。尽早集成。

如果有需要协同工作的模块，告诉 Ralph 先集成它们。不要等到 sprint 末尾才发现它们无法契合。

| 任务类型 | 优先级 | 原因 |
| --- | --- | --- |
| 架构工作 | 高 | 决策会级联影响整个代码库 |
| 集成点 | 高 | 尽早揭示不兼容性 |
| 未知的未知 | 高 | 早失败优于晚失败 |
| UI 打磨 | 低 | 之后可以并行处理 |
| 快速获胜 | 低 | 随时都容易插入 |

### 针对高风险任务使用 HITL

高风险任务需要更多人类参与。对于早期架构决策使用 HITL Ralph——这些任务产生的代码会永久存在，任何捷径都会在此处级联。

当基础稳固后再将 AFK Ralph 用于后续工作。一旦架构得到验证且高风险集成正常工作，你就可以让它在低风险任务上无人监督地运行。

### 试试看

将优先级指导添加到你的 Ralph 提示词中：

```txt
When choosing the next task, prioritize in this order:
1. Architectural decisions and core abstractions
2. Integration points between modules
3. Unknown unknowns and spike work
4. Standard features and implementation
5. Polish, cleanup, and quick wins
Fail fast on risky work. Save easy wins for later.
```

## 8. 明确界定软件质量

并非所有仓库都一样。很多代码是原型代码——演示、短期实验、客户提案。不同仓库对质量有不同的要求。

智能体不知道自己身处哪种仓库。它不知道这是一份一次性原型，还是将维护多年的生产代码。你需要明确告诉它。

### 要沟通什么

| 仓库类型 | 要说什么 | 预期行为 |
| --- | --- | --- |
| 原型 | “这是原型。速度优先于完美。” | 走捷径，跳过边缘情况 |
| 生产 | “生产代码。必须可维护。” | 遵循最佳实践，添加测试 |
| 库 | “公共 API。向后兼容很重要。” | 谨慎对待破坏性变更 |

将此写入你的 [AGENTS.md](https://agents.md) 文件、Skills 中，或直接写进提示词。

### 仓库会胜出

你的指令会与你的代码库竞争。当 Ralph 探索仓库时，它会看到两个事实来源：你告诉它该做什么，以及你实际上做了什么。一个是几行指令，另一个是数千行证据。

你可以在提示词中写“永远不要使用 `any` 类型”。但如果 Ralph 在现有代码中到处看到 `any`，它会遵循代码库，而不是你的指令。

智能体会放大它们所见的内容。糟糕的代码会产生更糟糕的代码。低质量测试会产生不可靠的反馈循环。

这就是软件熵——代码库随时间退化的倾向。Ralph 会加速这一过程。人类每天可能提交一两次。Ralph 可以在数小时内向仓库堆入数十次提交。如果这些提交质量低，熵会迅速累积。

这意味着你需要：

- 在放手让 Ralph 工作之前保持代码库整洁。
- 使用反馈循环（linting、类型、测试）来执行标准。
- 让质量预期明确且可见。

### 试试看

将质量预期添加到你的 `AGENTS.md` 或 Ralph 提示词中：

```txt
This codebase will outlive you. Every shortcut you take becomes
someone else's burden. Every hack compounds into technical debt
that slows the whole team down.

You are not just writing code. You are shaping the future of this
project. The patterns you establish will be copied. The corners
you cut will be cut again.

Fight entropy. Leave the codebase better than you found it.
```

## 9. 使用 Docker 沙箱

AFK Ralph 需要获得编辑文件、运行命令和提交代码的权限。什么能阻止它运行 `rm -rf ~`？你离开了键盘，无法进行干预。

[Docker 沙箱](https://docs.docker.com/ai/sandboxes/)是最简单的解决方案：

```bash
docker sandbox run claude
```

这会在容器中运行 [Claude Code](https://code.claude.com/docs/en/overview)。你的当前目录会被挂载，但其他内容不会。Ralph 可以编辑项目文件并提交——但无法接触你的主目录、SSH 密钥或系统文件。

权衡是：你的全局 [AGENTS.md](https://agents.md) 和用户 Skills 不会被加载。对于大多数 Ralph 循环，这没问题。

对于 HITL Ralph，沙箱是可选的——你正在观察。对于 AFK Ralph，尤其是夜间循环，它们是防范失控智能体的必要保障。

## 10. 付费才能参与

我经常被问到：“这要花多少钱？”通宵运行 AFK Ralph 肯定是累积巨额账单的一种方式？

我从不觉得自己适合给出财务建议，特别是对低收入国家的人。但 Ralph 可以完全根据你愿意花费的金额进行配置。

### HITL 仍然值得

即使你从不运行 AFK Ralph，HITL Ralph 相对于多阶段规划仍有很大好处。反复运行同一个提示词，比为每个阶段指定不同提示词感觉更好。

| 方法 | 每阶段投入 | 最适合 |
| --- | --- | --- |
| 多阶段计划 | 编写新提示词 | 一次性的大任务 |
| HITL Ralph | 重新运行相同提示词 | 学习、优化 |
| AFK Ralph | 设置后无需关注 | 批量工作、自动化 |

我使用 Anthropic 5x Max 套餐，每月约 £90。我曾运行过几次 AFK Ralph，但我的大多数使用都是 HITL。

### 为什么不用本地模型？

我认为你可以在笔记本电脑上运行的开源模型还不足以胜任 Ralph。它们需要强大的 GPU，输出质量也不够。在 AI 编码中，你必须付费才能参与。

### 黄金时代

但我们需要把这放在背景中看待。未来几年，我们处于一个黄金时代：你能以比人类更快的速度借助 AI 完成神奇的事——但市场仍支付人类工资。市场尚未适应这样一个事实：我们都能使用极其强大的 AI 编码工具。

是的，你必须付费。但如果你愿意争取，回报就在那里。

## 11. 打造属于你自己的方式

Ralph 只是一个循环。正是这种简单性使其可无限配置。以下是一些打造你自己的方式：

### 替换任务来源

本文中的示例使用本地 `prd.json`。但 Ralph 可以从任何地方拉取任务：

| 任务来源 | 工作方式 |
| --- | --- |
| GitHub Issues | Ralph 选择一个 issue 并实现它 |
| [Linear](https://linear.app) | Ralph 从你的 sprint 中拉取 |
| [Beads](https://github.com/steveyegge/beads) | Ralph 处理一个 beadfile |

关键洞见不变：由智能体选择任务，而不是你。你只是更换这份列表所在的位置。

### 改变输出

每次 Ralph 迭代不直接提交到 main，而是可以：

- 创建分支并打开 PR。
- 向现有 issues 添加评论。
- 更新 changelog 或 release notes。

当你有一批需要变成 PR 的 issues 时，这很有用。Ralph 进行分类、实现并打开 PR。你准备好时再审查。

### 替代循环类型

Ralph 不一定要处理功能待办列表。我正在尝试的一些循环：

**测试覆盖率循环**：让 Ralph 查看你的覆盖率指标。它找到未覆盖的行、编写测试，并不断迭代，直到覆盖率达到目标。我曾用这个方法将 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 的覆盖率从 16% 提高到 100%。

**重复代码循环**：将 Ralph 与 [`jscpd`](https://github.com/kucherenko/jscpd) 连接，用于发现重复代码。Ralph 识别克隆、重构为共享工具，并报告发生的变化。

**Linting 循环**：将 linting 错误交给 Ralph。它逐个修复，并在迭代之间运行 linter 来验证每个修复。

**熵循环**：Ralph 扫描代码异味——未使用的导出、死代码、不一致模式——并清理它们。反向的软件熵。

任何可以描述为“查看仓库、改进某些内容、报告发现”的任务都符合 Ralph 模式。循环是一样的，只有提示词会变化。

### 试试看

尝试以下替代循环提示词之一：

```txt
# Test Coverage Loop
@coverage-report.txt
Find uncovered lines in the coverage report.
Write tests for the most critical uncovered code paths.
Run coverage again and update coverage-report.txt.
Target: 80% coverage minimum.
```

```txt
# Linting Loop
Run: npm run lint
Fix ONE linting error at a time.
Run lint again to verify the fix.
Repeat until no errors remain.
```

```txt
# Entropy Loop
Scan for code smells: unused exports, dead code, inconsistent patterns.
Fix ONE issue per iteration.
Document what you changed in progress.txt.
```


<SkillsNewsletterCta
	heading="更多 Ralph 技巧，直接发送到你的收件箱"
	subtitle="当 Matt 打磨循环时，获取有关 Skills 帖文和更新日志的通知。"
/>

我期待看到你自己的 Ralph Wiggum——手指抠着鼻子、飞出窗外、吃着浆糊，同时交付代码。

---

想进一步了解 Ralph？我会在我的[newsletter](https://aihero.dev/newsletter)中发布更多有关自主 AI 编码的内容。订阅即可在新内容发布时收到通知。
