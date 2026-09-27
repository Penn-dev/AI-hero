---
title: "使用 Ralph Wiggum 进行 AI 编码的 11 条技巧"
slug: "tips-for-ai-coding-with-ralph-wiggum"
type: "post"
description: "使用 Ralph Wiggum 在自主循环中运行 AI 编码工具。11 条 AFK 编码技巧：界定范围、跟踪进度、建立反馈循环，以及在睡觉时交付代码。"
tags:
  - build-a-software-factory
updatedAt: "2026-01-08T12:25:29.414Z"
---

如果你正在使用 [Claude Code](https://code.claude.com/docs/en/overview)、[Copilot CLI](https://github.com/features/copilot/cli)、[OpenCode](https://opencode.ai/) 和 [Codex](https://openai.com/codex/) 之类的 AI 编码 CLI，那么这篇文章就是为你准备的。

大多数开发者以交互方式使用这些工具。你交给它一项任务，看着它工作，并在它偏离轨道时介入。这就是“人在回路（Human-in-the-loop）”（HITL）编码。

但现在出现了一种名为 [Ralph Wiggum](https://ghuntley.com/ralph/) 的新方法。Ralph 在循环中运行你的 AI 编码 CLI，让它围绕一系列任务自主工作。你定义需要完成的事情。Ralph 自己找出方法——并持续运行，直至完成。换句话说，这是一种长时间运行、自主且无人监督的 AFK 编码。

这不是快速入门指南。如果你想快速开始，请阅读 [Ralph 入门](https://www.aihero.dev/getting-started-with-ralph)。

### 11 条技巧

| #   | 技巧                                                                        | 摘要                               |
| --- | --------------------------------------------------------------------------- | ---------------------------------- |
| 1   | [Ralph 是一个循环](#1-ralph-is-a-loop)                                      | Ralph 是什么以及它为何有效         |
| 2   | [先从 HITL 开始，再转为 AFK](#2-start-with-hitl-then-go-afk)                | 运行 Ralph 的两种模式              |
| 3   | [界定范围](#3-define-the-scope)                                             | 如何明确“完成”是什么样子           |
| 4   | [跟踪 Ralph 的进度](#4-track-ralphs-progress)                               | 在迭代之间使用进度文件             |
| 5   | [使用反馈循环](#5-use-feedback-loops)                                       | 以类型、测试和 linting 作为护栏     |
| 6   | [采取小步推进](#6-take-small-steps)                                         | 为什么较小的任务会产出更好的代码   |
| 7   | [优先处理高风险任务](#7-prioritize-risky-tasks)                             | 首先解决困难问题                   |
| 8   | [明确定义软件质量](#8-explicitly-define-software-quality)                   | 不要让 Ralph 偷工减料              |
| 9   | [使用 Docker 沙盒](#9-use-docker-sandboxes)                                 | 隔离 AFK Ralph 以确保安全          |
| 10  | [付费才能参与](#10-pay-to-play)                                             | 成本考量与权衡                     |
| 11  | [打造你自己的方式](#11-make-it-your-own)                                    | 其他循环类型与自定义               |

## 1. Ralph 是一个循环

在过去一年左右的时间里，AI 编码经历了几个截然不同的阶段。我们来简要定义它们：

**氛围编程（Vibe Coding）**是指你让 AI 编写代码，却不真正检查它。你与 AI 一起“凭感觉走”，不加审视地接受它的建议。这样很快，但代码质量会受到影响。

**规划**是指你要求 AI 在编码前先制定计划。在 [Claude Code](https://code.claude.com/docs/en/overview) 中，你可以进入[计划模式](https://code.claude.com/docs/en/common-workflows#use-plan-mode-for-safe-code-analysis)，让 AI 在编写代码前探索代码库并创建计划。这可以提高质量，但你仍然受限于单个上下文窗口能够容纳的内容。

**多阶段计划**将大型功能拆分成多个阶段，每个阶段在单独的上下文窗口中处理。你为每个阶段编写不同的提示词：“实现数据库 schema”，然后“添加 API 端点”，再然后“构建 UI”。这种方式的扩展性更好，但需要人不断参与，为每个阶段编写提示词。

**Ralph** 简化了这一切。你不必为每个阶段编写新提示词，而是在循环中反复运行同一个提示词：

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

每次迭代都会：

1. 查看计划文件，了解需要完成什么
2. 查看进度文件，了解已经完成什么
3. 决定接下来做什么
4. 探索代码库
5. 实现功能
6. 运行反馈循环（类型、linting、测试）
7. 提交代码

这里的关键改进是：**由智能体选择任务，而不是你**。

在多阶段计划中，人会在每个阶段开始时编写新的提示词。使用 Ralph 时，智能体会从你的 PRD 中选择接下来要处理的内容。你定义最终状态，Ralph 负责抵达那里。

我曾用 Ralph 为我的 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 添加测试，并为我的[课程视频管理器](https://github.com/mattpocock/course-video-manager)构建功能。还有人用它[构建了完整的编程语言](https://github.com/ghuntley/ralph-lang)。

## 2. 先从 HITL 开始，再转为 AFK

运行 Ralph 有两种方式：

| 模式                         | 工作方式                     | 最适合                     | 脚本            |
| ---------------------------- | ---------------------------- | -------------------------- | --------------- |
| **HITL** (human-in-the-loop) | 运行一次、观察并介入         | 学习、优化提示词           | `ralph-once.sh` |
| **AFK** (away from keyboard) | 在设有最大迭代次数的循环中运行 | 批量工作、低风险任务     | `afk-ralph.sh`  |

对于 HITL Ralph，保留一个运行单次迭代的 `ralph-once.sh`。你观察它做的所有事情，并在需要时介入。

对于 AFK Ralph，始终要限制迭代次数。对于随机系统，无限循环很危险。我通常对小型任务使用 5-10 次迭代，对较大任务使用 30-50 次。

HITL Ralph 类似结对编程。你和 AI 一起工作，在代码创建时进行审查。你可以引导、贡献，并实时分享对项目的理解。

这也是学习 Ralph 的最佳方式。你会了解它的行为，优化提示词，并在转为无人值守之前建立信心。

一旦你的提示词足够可靠，AFK Ralph 就能释放真正的杠杆效应。启动它，去做别的事，完成后再回来。

我构建了一个小型 CLI，在 Ralph 完成时通过 WhatsApp 提醒我。这大大减少了上下文切换。我可以全身心投入另一项任务。我的循环通常需要 30-45 分钟，不过也可能运行数小时。

这个过程很简单：

1. 从 HITL 开始，学习并优化
2. 信任你的提示词后转为 AFK
3. 返回后审查提交

## 3. 界定范围

在让 Ralph 运行之前，你需要定义“完成”是什么样子。这意味着从规划转向需求收集。你不再指定每一个步骤，而是描述期望的最终状态，让智能体自己找出抵达那里的方法。

### 界定范围的格式

可以用多种方式为 Ralph 界定范围：

- markdown 格式的用户故事列表
- GitHub issues 或 [Linear tasks](https://linear.app)（稍后详述）
- 使用 [beads](https://github.com/steveyegge/beads)

我喜欢的一种方法来自 [Anthropic 对长时间运行智能体的研究](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)。他们把 PRD 条目组织为带有 `passes` 字段的 JSON：

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

Ralph 完成条目后会将 `passes` 标记为 `true`。PRD 因而既是范围定义，也是进度跟踪器——它是一份持续更新的 TODO 列表，而不是瀑布式文档。

### 为什么范围很重要

你并非_必须_使用结构化 TODO 列表。你可以给 Ralph 一个含糊的任务——“改进这个代码库”——让它自行跟踪进度。

但任务越含糊，风险就越大。Ralph 可能会无限循环，不断寻找可改进之处。或者，它可能走捷径，在你认为工作尚未完成时便宣布胜利：

我曾运行 Ralph 来提高 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 的测试覆盖率。这个仓库有一些内部命令——它们被标记为内部命令，但仍然面向用户（我会使用它们）。我想测试所有内容。

三次迭代后，Ralph 报告：“所有面向用户的命令均已完成。”但它完全跳过了内部命令。它自行认定这些命令并不面向用户，并将其标记为在覆盖率统计中忽略。

如何修复？明确定义你想覆盖的内容：

| 要指定的内容   | 为什么能防止走捷径                         |
| -------------- | ------------------------------------------ |
| 要包含的文件   | Ralph 不会忽略“边缘情况”文件               |
| 停止条件       | Ralph 知道“完成”究竟意味着什么             |
| 边缘情况       | Ralph 不会自行认定某些内容不算数           |

### 在运行中调整 PRD

这种方法的一个好处是：你可以在 Ralph 运行时进行调整。

- 已实现但实现错误？将 `passes` 改回 `false`，添加注释，然后重新运行。
- 缺少某个功能？即使在循环运行中，也可以添加新的 PRD 条目。

你不是在编辑线性的多阶段计划，而是在描述一个不同的最终状态。Ralph 会抵达那里。

只要范围和停止条件足够明确，Ralph 就会知道何时输出 `<promise>COMPLETE</promise>`。

### 试试看

使用计划模式，并为你的下一个功能创建 `prd.json` 文件。使用以下提示词生成结构化 PRD 条目：

```txt
Convert my feature requirements into structured PRD items.
Each item should have: category, description, steps to verify, and passes: false.
Format as JSON. Be specific about acceptance criteria.
```

## 4. 跟踪 Ralph 的进度

我运行的每个 Ralph 循环都会生成一个 `progress.txt` 文件，并将其直接提交到仓库。我从 Anthropic 关于[长时间运行智能体执行框架](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)的文章中获得了这个灵感。

这解决了一个核心挑战：AI 智能体就像非常聪明、但会在任务之间忘记一切的专家。每个新的上下文窗口都会从空白开始。如果没有进度文件，Ralph 就必须探索整个仓库才能理解当前状态。

进度文件可以绕过这次探索。Ralph 读取文件、看到已完成的内容，然后直接进入下一项任务。

### 进度文件中应包含什么

保持简单、简洁：

- 本次会话中完成的任务
- 做出的决策及原因
- 遇到的阻碍
- 更改的文件

你还可以加入刚刚完成的 PRD 条目、任何架构决策，以及留给下一次迭代的注释。

### 为什么提交很重要

Ralph 应该在完成每个功能后提交。这会为未来的迭代提供：

- 清晰的 `git log`，展示发生了什么变化
- 对比先前工作的 `git diff` 能力
- 在出现故障时可以回滚的节点

进度文件与 Git 历史相结合，能为 Ralph 提供完整上下文，而不必把 Token 消耗在探索上。

### 清理

不要永远保留 `progress.txt`。冲刺结束后就删除它。它只与本次会话相关，不是永久文档。

### 试试看

在你的 Ralph 提示词中加入进度跟踪：

```txt
After completing each task, append to progress.txt:
- Task completed and PRD item reference
- Key decisions made and reasoning
- Files changed
- Any blockers or notes for next iteration
Keep entries concise. Sacrifice grammar for the sake of concision. This file helps future iterations skip exploration.
```


<SkillsCta
	heading="11 条技巧，一套系统"
	subtitle="看看当 Ralph 循环真正需要交付时，哪些 Skill 将它维系在一起。"
	cta="查看 Skill 集"
/>

## 5. 使用反馈循环

Ralph 的成功取决于反馈循环。你为它提供的循环越多，它产出的代码质量就越高。

### 反馈循环的类型

| 反馈循环                                                                      | 能发现什么                   |
| ----------------------------------------------------------------------------- | ---------------------------- |
| [TypeScript](https://www.typescriptlang.org) 类型                             | 类型不匹配、缺少 props       |
| 单元测试                                                                      | 逻辑错误、回归               |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) server           | UI 缺陷、交互失效            |
| [ESLint](https://eslint.org) / linting                                         | 代码风格、潜在缺陷           |
| [Pre-commit hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)   | 完全阻止不良提交             |

最佳设置会阻止提交，除非所有检查都通过。如果测试处于红色状态，Ralph 就不能宣布胜利。

### 为什么反馈循环很重要

优秀的程序员不相信自己写的代码。他们不相信外部库，尤其不相信同事。相反，他们会构建自动化和检查来验证要交付的内容。

这种谦逊会造就更好的软件。同样的道理也适用于 AI 智能体。

本文中的每条技巧也都适用于人类开发者。反馈循环、小步推进、明确范围——这些并不是 AI 特有的技术，而只是良好的工程实践。Ralph 让它们变得不可妥协。

### 试试看

在你的 Ralph 提示词中加入明确的反馈循环要求：

```txt
Before committing, run ALL feedback loops:
1. TypeScript: npm run typecheck (must pass with no errors)
2. Tests: npm run test (must pass)
3. Lint: npm run lint (must pass)
Do NOT commit if any feedback loop fails. Fix issues first.
```

## 6. 采取小步推进

获得反馈的速度就是你的速度上限。绝不要开得比车灯照亮的范围更快。

人类进行大型重构时，可能会一口吞下大块工作并一路推进。测试、类型和 linting 会连续数小时保持红色状态。把工作拆成更小的块意味着更紧密的反馈循环——在收到反馈之前完成的工作更少。

同样的道理也适用于 Ralph，但还多了一项限制：上下文窗口是有限的，而且随着窗口被填满，LLM 的表现会变差。这称为[上下文腐化](https://research.trychroma.com/context-rot)——运行得越久，输出就越笨。

### 权衡

每次 Ralph 迭代都有启动成本。Ralph 必须选择任务、探索仓库并收集上下文。这些 Token 每轮都会消耗一次。

如果你正在进行大型重构，就不会希望 Ralph 每次迭代只重命名一个变量。但是：

- 任务越大，反馈频率越低
- 上下文越多，代码质量越低
- 任务越小，质量越高，但进度越慢

### 确定 PRD 条目的大小

对于 AFK Ralph，让 PRD 条目保持较小。你不在旁边观察时，会希望智能体处于最佳状态。

对于 HITL Ralph，可以把条目稍微做大一些，以便更快看到进展。但即使这样，也应偏向较小的条目。

一个重构条目可以简单到：“更改一个函数的参数。验证测试和类型检查通过。”

在提示词中指导 Ralph 控制步幅。我的倾向是：小步推进。代码质量高于速度——尤其在 AFK 时，因为此时速度本就没那么重要。

### 试试看

在你的 Ralph 提示词中加入步幅指导：

```txt
Keep changes small and focused:
- One logical change per commit
- If a task feels too large, break it into subtasks
- Prefer multiple small commits over one large commit
- Run feedback loops after each change, not at the end
Quality over speed. Small steps compound into big progress.
```

## 7. 优先处理高风险任务

Ralph 会自行选择任务。如果没有明确指导，它通常会选择列表中的第一个条目，或看起来最容易实现的内容。

这与人类行为如出一辙。开发者喜欢快速胜利。但经验丰富的工程师知道，应该先攻克难题，以免简单工作将你埋进技术债务。

### 探索性实现与集成

专注于探索性实现——那些你不知道结果会如何的事情。端到端地构建功能，而不是逐层构建。尽早集成。

如果有多个模块需要协同工作，就让 Ralph 先集成它们。不要等到冲刺结束时才发现它们无法契合。

| 任务类型       | 优先级 | 原因                                     |
| -------------- | ------ | ---------------------------------------- |
| 架构工作       | 高     | 决策会影响整个代码库                     |
| 集成点         | 高     | 尽早暴露不兼容问题                       |
| 未知的未知     | 高     | 早失败胜过晚失败                         |
| UI 打磨        | 低     | 稍后可以并行处理                         |
| 快速胜利       | 低     | 随时都容易插入                           |

### 对高风险任务使用 HITL

高风险任务需要更多人工参与。对于早期架构决策，应使用 HITL Ralph——这些任务产出的代码会永久保留，而这里的任何捷径都会影响整个项目。

在基础稳固后再使用 AFK Ralph。一旦架构得到验证、风险较高的集成也能正常运行，你就可以让 Ralph 在无人监督的情况下处理风险较低的任务。

### 试试看

加入优先级指导：

```txt
When choosing the next task, prioritize in this order:
1. Architectural decisions and core abstractions
2. Integration points between modules
3. Unknown unknowns and spike work
4. Standard features and implementation
5. Polish, cleanup, and quick wins
Fail fast on risky work. Save easy wins for later.
```

## 8. 明确定义软件质量

并非所有仓库都一样。许多代码都是原型代码——演示、短期实验、客户提案。不同仓库有不同的质量标准。

智能体不知道自己身处哪种仓库。它不知道这是一次性原型，还是会维护多年的生产代码。你需要明确告诉它。

### 要传达什么

| 仓库类型 | 要说什么                                      | 预期行为                       |
| -------- | --------------------------------------------- | ------------------------------ |
| 原型     | “这是原型。速度优先于完美。”                  | 走捷径、跳过边缘情况           |
| 生产     | “生产代码。必须可维护。”                      | 遵循最佳实践、添加测试         |
| 库       | “公共 API。向后兼容很重要。”                  | 谨慎对待破坏性变更             |

把这些内容放进你的 [AGENTS.md](https://agents.md) 文件、Skill，或直接放进提示词。

### 仓库会胜出

你的指令会与代码库竞争。当 Ralph 探索仓库时，它会看到两个事实来源：你告诉它要怎么做，以及你实际上是怎么做的。一个是寥寥数行指令，另一个是数千行证据。

你可以在提示词中写“绝不要使用 `any` 类型”。但如果 Ralph 在现有代码中到处看到 `any`，它就会遵循代码库，而不是你的指令。

智能体会放大它看到的一切。糟糕的代码会带来更糟的代码。低质量测试会产生不可靠的反馈循环。

这就是软件熵——代码库随时间退化的趋势。Ralph 会加速这个过程。人类可能每天只提交一两次，而 Ralph 可以在几小时内向仓库堆入数十个提交。如果这些提交质量低下，熵就会快速复合增长。

这意味着你需要：

- 在放任 Ralph 运行之前保持代码库整洁
- 使用反馈循环（linting、类型、测试）强制执行标准
- 让质量期望明确且可见

### 试试看

将质量期望添加到你的 `AGENTS.md` 或 Ralph 提示词中：

```txt
This codebase will outlive you. Every shortcut you take becomes
someone else's burden. Every hack compounds into technical debt
that slows the whole team down.

You are not just writing code. You are shaping the future of this
project. The patterns you establish will be copied. The corners
you cut will be cut again.

Fight entropy. Leave the codebase better than you found it.
```

## 9. 使用 Docker 沙盒

AFK Ralph 需要编辑文件、运行命令和提交代码的权限。有什么能阻止它运行 `rm -rf ~`？你不在键盘旁，因此无法介入。

[Docker sandboxes](https://docs.docker.com/ai/sandboxes/) 是最简单的解决方案：

```bash
docker sandbox run claude
```

这会在容器中运行 [Claude Code](https://code.claude.com/docs/en/overview)。你的当前目录会被挂载，但其他任何内容都不会。Ralph 可以编辑项目文件并提交——但无法接触你的主目录、SSH 密钥或系统文件。

代价是：你的全局 [AGENTS.md](https://agents.md) 和用户 Skill 不会被加载。对于大多数 Ralph 循环来说，这没问题。

对于 HITL Ralph，沙盒是可选的——你正在观察。对于 AFK Ralph，尤其是通宵循环，沙盒是防范失控智能体的必要保险。

## 10. 付费才能参与

我经常被问到的一个问题是：“这要花多少钱？”让 AFK Ralph 通宵运行，肯定很容易产生巨额账单吧？

我从不愿意提供财务建议，尤其是对低收入国家的人。不过，你完全可以根据自己的预算配置 Ralph。

### HITL 仍然值得

即使你从不运行 AFK Ralph，HITL Ralph 相比多阶段规划仍然有很大优势。反复运行同一个提示词，比为每个阶段指定不同提示词更省心。

| 方法           | 每阶段投入       | 最适合                   |
| -------------- | ---------------- | ------------------------ |
| 多阶段计划     | 编写新提示词     | 一次性大型任务           |
| HITL Ralph     | 重复运行同一提示词 | 学习、优化             |
| AFK Ralph      | 设置后不管       | 批量工作、自动化         |

我使用 Anthropic 5x Max 方案，每月约 £90。我运行过几次 AFK Ralph，但大部分使用量都来自 HITL。

### 为什么不用本地模型？

我认为目前可以在笔记本电脑上运行的开源模型还不足以胜任 Ralph。它们需要强大的 GPU，而且输出质量也不够。在 AI 编码中，付费才能参与。

### 黄金时代

但我们需要把这件事放进时代背景中看。未来几年将是一个黄金时代：你可以借助 AI，以比人类更快的速度完成神奇的事情——但市场仍然支付人类水平的薪酬。市场还没有根据人人都能使用极其强大的 AI 编码工具这一事实进行调整。

没错，你必须付费。但如果你愿意抓住机会，回报就在那里。

## 11. 打造你自己的方式

Ralph 只是一个循环。这种简单性使它拥有无限的可配置空间。下面是一些打造你自己方式的方法：

### 更换任务来源

本文的示例使用本地 `prd.json`。但 Ralph 可以从任何地方拉取任务：

| 任务来源                                      | 工作方式                         |
| --------------------------------------------- | -------------------------------- |
| GitHub Issues                                 | Ralph 选择 issue 并实现          |
| [Linear](https://linear.app)                  | Ralph 从你的 sprint 中拉取       |
| [Beads](https://github.com/steveyegge/beads)  | Ralph 按 beadfile 逐项处理       |

关键洞见保持不变：由智能体选择任务，而不是你。你只是改变了列表所在的位置。

### 更改输出

每次 Ralph 迭代不必直接提交到 main，也可以：

- 创建分支并开启 PR
- 为现有 issue 添加评论
- 更新 changelog 或 release notes

当你有一批需要转化为 PR 的 issue 时，这很有用。Ralph 进行分类、实现并开启 PR。你准备好时再审查。

### 其他循环类型

Ralph 不必只能处理功能待办列表。我一直在试验的一些循环包括：

**测试覆盖率循环**：让 Ralph 查看覆盖率指标。它查找未覆盖的行、编写测试并反复迭代，直到覆盖率达到目标。我用它将 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 的覆盖率从 16% 提高到了 100%。

**重复代码循环**：将 Ralph 连接到 [`jscpd`](https://github.com/kucherenko/jscpd) 来查找重复代码。Ralph 识别克隆代码，将其重构为共享工具函数，并报告更改内容。

**Linting 循环**：向 Ralph 提供 linting 错误。它逐个修复错误，并在迭代之间运行 linter 来验证每次修复。

**熵循环**：Ralph 扫描代码异味——未使用的导出、死代码、不一致的模式——并进行清理。这是逆向的软件熵。

任何能描述为“查看仓库、改进某些内容、报告发现”的任务，都适合 Ralph 模式。循环保持不变，只有提示词不同。

### 试试看

试试下面这些其他循环提示词中的一个：

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
	heading="将更多 Ralph 技巧直接发送到你的收件箱"
	subtitle="随着 Matt 不断改进循环，接收 Skill 文章和更新日志注释。"
/>

我期待看到你自己的 Ralph Wiggum——手指插着鼻孔，飞出窗外，吃着浆糊，同时交付代码。

---

想进一步了解 Ralph？我将在我的[时事通讯](https://aihero.dev/newsletter)上发布更多关于自主 AI 编码的内容。订阅后即可在新文章发布时收到通知。
