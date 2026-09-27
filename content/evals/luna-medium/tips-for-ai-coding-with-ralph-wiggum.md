---
title: "使用 Ralph Wiggum 进行 AI 编码的 11 条建议"
slug: "tips-for-ai-coding-with-ralph-wiggum"
type: "post"
description: "使用 Ralph Wiggum 让 AI 编码工具在自主循环中运行。AFK 编码的 11 条建议：范围、进度跟踪、反馈循环，以及在你睡觉时交付代码。"
tags:
  - build-a-software-factory
updatedAt: "2026-01-08T12:25:29.414Z"
---

如果你正在使用 [Claude Code](https://code.claude.com/docs/en/overview)、[Copilot CLI](https://github.com/features/copilot/cli)、[OpenCode](https://opencode.ai/) 和 [Codex](https://openai.com/codex/) 之类的 AI 编码 CLI，那么本文就是为你准备的。

大多数开发者会交互式地使用这些工具。你给它一个任务，看着它工作，并在它偏离轨道时介入。这就是“人在回路”（HITL）编码。

但现在有一种叫作 [Ralph Wiggum](https://ghuntley.com/ralph/) 的新方法。Ralph 会让你的 AI 编码 CLI 循环运行，使它能够自主处理任务列表。你定义需要完成的事情，Ralph 找出实现方式，并持续运行直到完成。换句话说，这是长时间运行、自主且无人监督的 AFK 编码。

这不是一份快速入门指南。如果你想快速开始运行，请阅读 [Getting Started With Ralph](https://www.aihero.dev/getting-started-with-ralph)。

### 11 条建议

| #   | 建议                                                                         | 摘要                                  |
| --- | --------------------------------------------------------------------------- | ---------------------------------------- |
| 1   | [Ralph 是一个循环](#1-ralph-is-a-loop)                                       | Ralph 是什么，以及它为何有效           |
| 2   | [先从 HITL 开始，再转为 AFK](#2-start-with-hitl-then-go-afk)              | 运行 Ralph 的两种模式                  |
| 3   | [定义范围](#3-define-the-scope)                                     | 如何明确“完成”是什么样子    |
| 4   | [跟踪 Ralph 的进度](#4-track-ralphs-progress)                          | 在迭代之间使用进度文件  |
| 5   | [使用反馈循环](#5-use-feedback-loops)                                 | 将类型、测试和 lint 作为护栏  |
| 6   | [采取小步迭代](#6-take-small-steps)                                     | 为什么较小的任务能产出更好的代码    |
| 7   | [优先处理高风险任务](#7-prioritize-risky-tasks)                         | 先解决困难的问题               |
| 8   | [明确软件质量](#8-explicitly-define-software-quality) | 不要让 Ralph 偷工减料              |
| 9   | [使用 Docker 沙箱](#9-use-docker-sandboxes)                             | 为安全起见隔离 AFK Ralph             |
| 10  | [一分钱一分货](#10-pay-to-play)                                              | 成本方面的考量与权衡        |
| 11  | [打造属于你自己的方式](#11-make-it-your-own)                                    | 其他循环类型与定制方式         |

## 1. Ralph 是一个循环

过去一年左右，AI 编码经历了几个不同的发展阶段。我们先简单定义一下：

**氛围编程（Vibe Coding）**是指你让 AI 编写代码，却不真正检查代码。你和 AI “一起凭感觉”，不加审查地接受它的建议。这很快，但代码质量会下降。

**规划**是指你要求 AI 在编码前先进行规划。在 [Claude Code](https://code.claude.com/docs/en/overview) 中，你可以进入[规划模式](https://code.claude.com/docs/en/common-workflows#use-plan-mode-for-safe-code-analysis)，让 AI 浏览你的代码库，并在写代码前创建计划。这能提升质量，但你仍然受限于一个上下文窗口所能容纳的内容。

**多阶段计划**将大型功能拆成多个阶段，每个阶段在单独的上下文窗口中处理。你会为每个阶段编写不同的提示词：“实现数据库模式”，然后“添加 API 端点”，再然后“构建 UI”。这种方式扩展性更好，但需要人类持续编写每个提示词。

**Ralph** 把一切都简化了。你不必为每个阶段编写新的提示词，而是让同一个提示词循环运行：

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
3. 决定下一步做什么
4. 探索代码库
5. 实现功能
6. 运行反馈循环（类型、lint、测试）
7. 提交代码

这里最关键的改进是：**由智能体选择任务，而不是由你选择**。

在多阶段计划中，人类会在每个阶段开始时编写新的提示词。而使用 Ralph 时，智能体会从你的 PRD 中选择下一项任务。你定义最终状态，Ralph 负责抵达那里。

我曾用 Ralph 为 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 添加测试，并为我的[课程视频管理器](https://github.com/mattpocock/course-video-manager) 构建功能。其他人还用它[构建了完整的编程语言](https://github.com/ghuntley/ralph-lang)。

## 2. 先从 HITL 开始，再转为 AFK

运行 Ralph 有两种方式：

| 模式                         | 工作方式                          | 最适合                    | 脚本          |
| ---------------------------- | --------------------------------- | ------------------------- | ------------- |
| **HITL**（人在回路） | 运行一次、观察并介入        | 学习、完善提示词 | `ralph-once.sh` |
| **AFK**（离开键盘） | 以最大迭代次数循环运行 | 批量工作、低风险任务   | `afk-ralph.sh`  |

对于 HITL Ralph，要保留一个运行单次迭代的 `ralph-once.sh`。你可以观察它所做的一切，并在需要时介入。

对于 AFK Ralph，始终限制迭代次数。无限循环对于随机性系统来说很危险。对于小任务，我通常使用 5-10 次迭代；较大的任务则使用 30-50 次。

HITL Ralph 类似结对编程。你和 AI 一起工作，在代码创建过程中进行审查。你可以实时引导它、贡献想法并分享项目理解。

这也是学习 Ralph 的最佳方式。你会理解它做什么，在放手之前完善你的提示词并建立信心。

提示词稳定后，AFK Ralph 就能发挥真正的杠杆作用。让它运行起来，去做其他事情，完成后再回来。

我构建了一个小型 CLI，在 Ralph 完成时通过 WhatsApp 提醒我。这大幅减少了上下文切换，让我可以全身心投入另一个任务。我的循环通常需要 30-45 分钟，但也可能运行数小时。

这个过程很简单：

1. 先用 HITL 学习并完善
2. 信任你的提示词后转为 AFK
3. 回来后审查提交记录

## 3. 定义范围

在让 Ralph 运行之前，你需要定义“完成”是什么样子。这是从规划转向需求收集。你不再规定每一步，而是描述期望的最终状态，让智能体找出抵达那里的方法。

### 定义范围的格式

有很多方式可以定义 Ralph 的范围：

- 用户故事的 Markdown 列表
- GitHub issue 或 [Linear 任务](https://linear.app)（稍后会详细介绍）
- 使用 [beads](https://github.com/steveyegge/beads)

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

完成后，Ralph 会将 `passes` 标记为 `true`。PRD 同时成为范围定义和进度跟踪器——它是一份持续更新的 TODO 列表，而不是瀑布式文档。

### 范围为何重要

你_不必_使用结构化 TODO 列表。你可以给 Ralph 一个模糊的任务——“改进这个代码库”，让它跟踪自己的进度。

但任务越模糊，风险就越大。Ralph 可能会无限循环，不断寻找改进之处；也可能走捷径，在你认为工作完成之前就宣布胜利：

我曾运行 Ralph 来提高 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 的测试覆盖率。这个代码库有一些内部命令——虽然标记为内部命令，但仍然面向用户（我自己会用）。我想为所有内容编写测试。

三次迭代后，Ralph 报告：“所有面向用户的命令都完成了。”但它完全跳过了那些内部命令。它认定这些命令不面向用户，于是将它们标记为不纳入覆盖率。

修复方法是：明确规定你希望覆盖什么：

| 要指定的内容   | 防止走捷径的原因                           |
| -------------- | ------------------------------------------ |
| 要包含的文件   | Ralph 不会忽略“边缘情况”文件                |
| 停止条件       | Ralph 知道“完成”到底意味着什么              |
| 边缘情况       | Ralph 不会自行决定某些内容不算               |

### 中途调整 PRD

这种方法的一个好处是：Ralph 运行时你仍然可以调整。

- 已经实现但实现错误？将 `passes` 改回 `false`，添加备注，然后重新运行。
- 缺少某项功能？即使在循环中途，也可以添加新的 PRD 条目。

你不是在编辑一个线性的多阶段计划，而是在描述一个不同的最终状态。Ralph 会抵达那里。

只要范围和停止条件明确，Ralph 就会知道何时输出 `<promise>COMPLETE</promise>`。

### 试试看

使用规划模式，为下一项功能创建一个 `prd.json` 文件。使用下面的提示词生成结构化 PRD 条目：

```txt
Convert my feature requirements into structured PRD items.
Each item should have: category, description, steps to verify, and passes: false.
Format as JSON. Be specific about acceptance criteria.
```

## 4. 跟踪 Ralph 的进度

我运行的每个 Ralph 循环都会生成一个 `progress.txt` 文件，并直接提交到代码库。这一灵感来自 Anthropic 关于[长时间运行智能体执行框架](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)的文章。

这解决了一个核心挑战：AI 智能体就像记性很差的超级聪明专家，每次任务之间都会忘记一切。每个新的上下文窗口都会从头开始。没有进度文件，Ralph 就必须探索整个代码库，才能理解当前状态。

进度文件可以缩短这段探索过程。Ralph 读取它，看到已经完成的内容，然后直接进入下一项任务。

### 进度文件中放什么

保持简单、简洁：

- 本次会话中完成的任务
- 做出的决定及其原因
- 遇到的阻塞事项
- 修改的文件

你也可以加入刚刚完成的 PRD 条目、架构决策，以及给下一次迭代的备注。

### 提交为何重要

Ralph 应该在每项功能完成后提交。这会为后续迭代提供：

- 清晰的 `git log`，展示发生了什么变化
- 可以与之前的工作进行比较的 `git diff`
- 发生问题时的回滚点

进度文件与 Git 历史结合起来，就能在不消耗 Token 探索代码库的情况下，为 Ralph 提供完整上下文。

### 清理

不要永远保留 `progress.txt`。冲刺完成后将其删除。它是特定于会话的文件，不是永久文档。

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
	heading="11 条建议，一个系统"
	subtitle="真正需要交付时，将 Ralph 循环串联起来的 Skill。"
	cta="查看 Skill 集合"
/>

## 5. 使用反馈循环

Ralph 的成功取决于反馈循环。你提供的循环越多，它产出的代码质量就越高。

### 反馈循环的类型

| 反馈循环                                                                | 能发现的问题                |
| ------------------------------------------------------------------------ | --------------------------- |
| [TypeScript](https://www.typescriptlang.org) 类型                           | 类型不匹配、缺少属性        |
| 单元测试                                                                   | 逻辑错误、回归              |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) 服务器         | UI 错误、交互损坏           |
| [ESLint](https://eslint.org) / 代码检查                                       | 代码风格、潜在错误          |
| [Pre-commit hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) | 完全阻止错误提交            |

最好的设置是在所有检查通过之前阻止提交。如果测试是红色的，Ralph 就不能宣布胜利。

### 反馈循环为何重要

优秀的程序员不信任自己写的代码。他们不信任外部库，尤其不信任同事。相反，他们会构建自动化和检查机制，验证自己交付的内容。

这种谦逊会带来更好的软件。对 AI 智能体也是如此。

本文中的每条建议同样适用于人类开发者。反馈循环、小步迭代、明确范围——这些并不是 AI 专属技术，而只是良好的工程实践。Ralph 让它们变得不可妥协。

### 试试看

在 Ralph 提示词中加入明确的反馈循环要求：

```txt
Before committing, run ALL feedback loops:
1. TypeScript: npm run typecheck (must pass with no errors)
2. Tests: npm run test (must pass)
3. Lint: npm run lint (must pass)
Do NOT commit if any feedback loop fails. Fix issues first.
```

## 6. 采取小步迭代

你获得反馈的速度就是你的速度上限。永远不要超出车灯照亮的范围。

人类进行大型重构时，可能会一口气承担很大一块工作然后一路推进。测试、类型和 lint 可能数小时保持红色。将工作拆成更小的块，就意味着更紧密的反馈循环——在获得反馈前需要完成的工作更少。

这同样适用于 Ralph，但还有一个额外约束：上下文窗口有限，而 LLM 会随着上下文填满而表现变差。这叫作[上下文腐化](https://research.trychroma.com/context-rot)——持续时间越长，输出就越愚蠢。

### 权衡

每次 Ralph 迭代都有启动成本。Ralph 必须选择任务、探索代码库并收集上下文。这些 Token 每个循环都会消耗。

如果你在进行大型重构，就不希望 Ralph 每次迭代只重命名一个变量。但：

- 任务越大，反馈频率越低
- 上下文越多，代码质量越低
- 任务越小，质量越高，但进度越慢

### 设定 PRD 条目大小

对于 AFK Ralph，让 PRD 条目保持较小。你希望智能体在无人监督时也处于最佳状态。

对于 HITL Ralph，可以把条目设置得稍大一些，以更快看到进展。但即便如此，也应倾向于小条目。

一个重构条目可以简单到：“修改一个函数的参数。验证测试和类型检查通过。”

在提示词中指导 Ralph 控制步长。我的倾向是小步迭代。代码质量高于速度——尤其是在 AFK 模式下，因为这时速度反正没那么重要。

### 试试看

在 Ralph 提示词中加入步长指导：

```txt
Keep changes small and focused:
- One logical change per commit
- If a task feels too large, break it into subtasks
- Prefer multiple small commits over one large commit
- Run feedback loops after each change, not at the end
Quality over speed. Small steps compound into big progress.
```

## 7. 优先处理高风险任务

Ralph 会自行选择任务。如果没有明确指导，它通常会选择列表中的第一项，或者看起来最容易实现的内容。

这与人类的行为相似。开发者喜欢快速取得成果。但经验丰富的工程师知道，应该先解决困难的事情，避免简单工作把你埋进技术债务中。

### 探索与集成

专注于探索性工作——那些你不知道结果会如何的事情。端到端地构建功能，而不是一层一层地构建。尽早集成。

如果有一些模块需要协同工作，就告诉 Ralph 先集成它们。不要等到冲刺结束时才发现它们无法配合。

| 任务类型       | 优先级 | 原因                               |
| -------------- | ------ | ---------------------------------- |
| 架构工作       | 高     | 决策会影响整个代码库               |
| 集成点         | 高     | 尽早暴露不兼容问题                 |
| 未知的未知     | 高     | 尽早失败好过晚些失败               |
| UI 润色        | 低     | 之后可以并行处理                   |
| 快速成果       | 低     | 随时都容易插入                     |

### 高风险任务使用 HITL

高风险任务需要更多人类参与。对于早期架构决策，使用 HITL Ralph——这些任务产生的代码会永久存在，在这里采取的任何捷径都会波及整个项目。

等基础稳固后再使用 AFK Ralph。架构得到验证、高风险集成能够正常工作后，就可以让 Ralph 在低风险任务上无人监督地运行。

### 试试看

在 Ralph 提示词中加入优先级指导：

```txt
When choosing the next task, prioritize in this order:
1. Architectural decisions and core abstractions
2. Integration points between modules
3. Unknown unknowns and spike work
4. Standard features and implementation
5. Polish, cleanup, and quick wins
Fail fast on risky work. Save easy wins for later.
```

## 8. 明确软件质量

并非所有代码库都一样。很多代码其实是原型代码——演示、短期实验、客户提案。不同代码库对质量有不同的标准。

智能体不知道自己处于什么类型的代码库中。它不知道这是一个用完即弃的原型，还是需要维护多年的生产代码。你需要明确告诉它。

### 要沟通什么

| 代码库类型 | 要说的话                                      | 预期行为                  |
| ---------- | --------------------------------------------- | ------------------------- |
| 原型       | “这是一个原型。速度高于完美。”                | 走捷径，跳过边缘情况      |
| 生产       | “这是生产代码。必须可维护。”                  | 遵循最佳实践，添加测试    |
| 库         | “这是公共 API。向后兼容很重要。”              | 谨慎对待破坏性变更        |

把这些内容放进你的 [AGENTS.md](https://agents.md) 文件、Skill，或直接放进提示词。

### 代码库胜出

你的指令会与代码库竞争。当 Ralph 探索代码库时，它会看到两个真相来源：你告诉它要做什么，以及你实际做了什么。一个只有几行指令，另一个则是数千行证据。

你可以在提示词中写“绝不要使用 `any` 类型”。但如果 Ralph 在现有代码中到处看到 `any`，它会遵循代码库，而不是你的指令。

智能体会放大它所看到的东西。糟糕的代码会带来更糟糕的代码。低质量测试会产生不可靠的反馈循环。

这就是软件熵——代码库随时间恶化的趋势。Ralph 会加速这一过程。人类可能每天提交一两次代码，而 Ralph 可以在数小时内向代码库堆入几十次提交。如果这些提交质量低下，熵就会快速累积。

这意味着你需要：

- 在让 Ralph 放手工作前保持代码库整洁
- 使用反馈循环（lint、类型、测试）来执行标准
- 让质量预期明确且可见

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

AFK Ralph 需要权限来编辑文件、运行命令和提交代码。是什么阻止它运行 `rm -rf ~`？你不在键盘前，因此无法介入。

[Docker 沙箱](https://docs.docker.com/ai/sandboxes/) 是最简单的解决方案：

```bash
docker sandbox run claude
```

这会在容器中运行 [Claude Code](https://code.claude.com/docs/en/overview)。当前目录会被挂载，但其他内容不会。Ralph 可以编辑项目文件并提交代码——但无法触碰你的主目录、SSH 密钥或系统文件。

代价是：你的全局 [AGENTS.md](https://agents.md) 和用户 Skill 不会被加载。对于大多数 Ralph 循环来说，这没有问题。

对于 HITL Ralph，沙箱是可选的——因为你正在观察。对于 AFK Ralph，尤其是通宵运行的循环，沙箱是防止智能体失控的必要保险。

## 10. 一分钱一分货

我经常被问到一个问题：“这要花多少钱？”在 AFK Ralph 上运行一整晚，肯定会带来巨额账单吗？

我从来不愿意给出财务建议，尤其不愿意给低收入国家的人提供财务建议。但 Ralph 的花费完全可以根据你愿意支出的金额进行配置。

### HITL 仍然值得

即使你从不运行 AFK Ralph，HITL Ralph 相比多阶段规划仍然有很大的优势。反复运行同一个提示词，比为每个阶段指定不同的提示词更轻松。

| 方法             | 每阶段投入       | 最适合                 |
| ---------------- | ---------------- | ---------------------- |
| 多阶段计划       | 编写新提示词     | 一次性大型任务         |
| HITL Ralph       | 重新运行同一提示词 | 学习、完善             |
| AFK Ralph        | 设置后不再操心   | 批量工作、自动化       |

我使用 Anthropic 5x Max 计划，每月大约 90 英镑。我运行过几次 AFK Ralph，但大部分使用时间都花在 HITL 上。

### 为什么不用本地模型？

我认为目前可以在笔记本电脑上运行的开源模型还不够好，无法胜任 Ralph。它们需要强大的 GPU，输出质量也还不到位。在 AI 编码中，你得付费才能参与。

### 黄金时代

但我们需要结合背景来看待这件事。在接下来的几年里，我们正处于一个黄金时代：借助 AI，你可以比人类更快地完成神奇的事情——但市场仍然支付人类的工资。市场还没有适应这样一个事实：我们所有人都可以使用极其强大的 AI 编码工具。

是的，你必须付费。但只要你愿意争取，回报就在眼前。

## 11. 打造属于你自己的方式

Ralph 只是一个循环。这种简单性让它拥有无限的可配置空间。下面是一些打造自己用法的方式：

### 更换任务来源

本文的示例使用本地 `prd.json`。但 Ralph 可以从任何地方获取任务：

| 任务来源                                      | 工作方式                         |
| --------------------------------------------- | -------------------------------- |
| GitHub Issues                                 | Ralph 选择一个 issue 并实现它    |
| [Linear](https://linear.app)                  | Ralph 从你的冲刺中获取任务       |
| [Beads](https://github.com/steveyegge/beads)  | Ralph 处理 beadfile               |

核心洞见不变：由智能体选择任务，而不是你选择。你只是改变了列表存放的位置。

### 改变输出

每次 Ralph 迭代都可以执行以下操作，而不是直接提交到 main：

- 创建分支并打开 PR
- 为现有 issue 添加评论
- 更新变更日志或发行说明

当你有一批需要转化为 PR 的 issue 时，这很有用。Ralph 负责分类、实现并打开 PR。你准备好后再进行审查。

### 其他循环类型

Ralph 不必处理功能积压。我一直在尝试一些循环：

**测试覆盖率循环**：将 Ralph 指向覆盖率指标。它找到未覆盖的行，编写测试，并不断迭代直到覆盖率达到目标。我曾用它将 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 的覆盖率从 16% 提升到 100%。

**重复代码循环**：将 Ralph 接入 [`jscpd`](https://github.com/kucherenko/jscpd) 来查找重复代码。Ralph 识别克隆代码，将其重构为共享工具，并报告发生了什么变化。

**Lint 循环**：将 lint 错误提供给 Ralph。它逐个修复，并在迭代之间运行代码检查器，验证每个修复。

**熵循环**：Ralph 扫描代码异味——未使用的导出、死代码、不一致的模式——并清理它们。这是软件熵的逆过程。

任何可以描述为“查看代码库、改进某项内容、报告发现”的任务，都适合 Ralph 模式。循环相同，只有提示词会变化。

### 试试看

尝试下面这些替代循环提示词中的一个：

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
	heading="更多 Ralph 建议，直接送到你的收件箱"
	subtitle="当 Matt 逐步完善这个循环时，获取 Skill 文章和变更日志说明。"
/>

我期待看到你自己的 Ralph Wiggum——手指伸进鼻孔、飞过窗户、吃浆糊，然后交付代码。

---

想进一步了解 Ralph？我会在我的[通讯](https://aihero.dev/newsletter)中发布更多关于自主 AI 编码的内容。注册即可在新文章发布时收到通知。
