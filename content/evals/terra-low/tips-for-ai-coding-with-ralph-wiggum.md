---
title: "使用 Ralph Wiggum 进行 AI 编码的 11 条建议"
slug: "tips-for-ai-coding-with-ralph-wiggum"
type: "post"
description: "使用 Ralph Wiggum 在自主循环中运行 AI 编码工具。关于 AFK 编码的 11 条建议：范围、进度跟踪、反馈循环，以及在睡觉时交付代码。"
tags:
  - build-a-software-factory
updatedAt: "2026-01-08T12:25:29.414Z"
---

如果你在使用 [Claude Code](https://code.claude.com/docs/en/overview)、[Copilot CLI](https://github.com/features/copilot/cli)、[OpenCode](https://opencode.ai/) 和 [Codex](https://openai.com/codex/) 等 AI 编码 CLI，本文适合你。

大多数开发者以交互方式使用这些工具：给它任务、观察其工作，并在它偏离方向时干预。这就是“人在回路（Human-in-the-loop）”（HITL）编码。

但有一种称为 [Ralph Wiggum](https://ghuntley.com/ralph/) 的新方法。Ralph 在循环中运行你的 AI 编码 CLI，让它在任务列表上自主工作。你定义需要完成什么；Ralph 找出方法，并持续工作直到完成。换言之，这是长时间运行、自主且无人监督的 AFK 编码。

这不是快速入门指南。若想快速上手，请阅读 [Getting Started With Ralph](https://www.aihero.dev/getting-started-with-ralph)。

### 11 条建议

| # | 建议 | 概要 |
| --- | --- | --- |
| 1 | [Ralph 是一个循环](#1-ralph-is-a-loop) | Ralph 是什么，以及为何有效 |
| 2 | [先从 HITL 开始，再转为 AFK](#2-start-with-hitl-then-go-afk) | 运行 Ralph 的两种模式 |
| 3 | [定义范围](#3-define-the-scope) | 如何说明“完成”的样子 |
| 4 | [跟踪 Ralph 的进度](#4-track-ralphs-progress) | 在迭代之间使用进度文件 |
| 5 | [使用反馈循环](#5-use-feedback-loops) | 类型、测试和 lint 作为护栏 |
| 6 | [小步前进](#6-take-small-steps) | 较小任务为何产生更好代码 |
| 7 | [优先处理高风险任务](#7-prioritize-risky-tasks) | 先解决困难问题 |
| 8 | [明确界定软件质量](#8-explicitly-define-software-quality) | 不让 Ralph 偷工减料 |
| 9 | [使用 Docker 沙箱](#9-use-docker-sandboxes) | 为 AFK Ralph 做安全隔离 |
| 10 | [付费才能参与](#10-pay-to-play) | 成本考量与权衡 |
| 11 | [按自己的方式使用](#11-make-it-your-own) | 替代循环类型和定制 |

## 1. Ralph 是一个循环

过去一年左右，AI 编码经历了几个不同阶段，简要定义如下。

**氛围编程（Vibe Coding）**是让 AI 写代码而不真正检查。你和 AI “凭感觉”协作，不加审视地接受它的建议。它很快，但代码质量会受损。

**规划**是要求 AI 在编码前先规划。在 [Claude Code](https://code.claude.com/docs/en/overview) 中，你可以进入[计划模式](https://code.claude.com/docs/en/common-workflows#use-plan-mode-for-safe-code-analysis)，让 AI 探索代码库并在写代码前创建计划。质量会提高，但你仍受限于单个上下文窗口能容纳的内容。

**多阶段计划**将大型功能拆成多个阶段，每个阶段在独立上下文窗口中处理。你为每个阶段写不同提示词：“实现数据库模式”，然后“添加 API 端点”，再“构建 UI”。它扩展性更好，但需要持续的人类参与来编写每个提示词。

**Ralph** 简化了一切。你不再为每个阶段写新提示词，而是在循环中运行同一个提示词：

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

每次迭代会：

1. 查看计划文件，了解要完成什么。
2. 查看进度文件，了解已经完成什么。
3. 决定下一步。
4. 探索代码库。
5. 实现功能。
6. 运行反馈循环（类型、lint、测试）。
7. 提交代码。

关键改进是：**由智能体选择任务，而不是你。**

多阶段计划中，人类会在每个阶段开始时写新提示词。使用 Ralph 时，智能体从你的 PRD 中选择下一项工作。你定义最终状态，Ralph 到达那里。

我曾用 Ralph 为 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 添加测试，并为[课程视频管理器](https://github.com/mattpocock/course-video-manager)构建功能。其他人曾用它[构建完整的编程语言](https://github.com/ghuntley/ralph-lang)。

## 2. 先从 HITL 开始，再转为 AFK

运行 Ralph 有两种方式：

| 模式 | 工作方式 | 最适合 | 脚本 |
| --- | --- | --- | --- |
| **HITL**（人在回路） | 运行一次、观察、干预 | 学习、打磨提示词 | `ralph-once.sh` |
| **AFK**（离开键盘） | 在有最大迭代次数的循环中运行 | 批量工作、低风险任务 | `afk-ralph.sh` |

对于 HITL Ralph，保留一个运行单次迭代的 `ralph-once.sh`。观察它的全部操作，并在需要时介入。

对于 AFK Ralph，始终限制迭代次数。随机系统中的无限循环很危险。小任务通常用 5–10 次迭代，较大任务用 30–50 次。

HITL Ralph 类似结对编程。你和 AI 共同工作，在代码生成时审阅它。你可以实时引导、贡献并分享项目理解。

它也是学习 Ralph 的最佳方式。你会理解它的工作方式、打磨提示词，并在放手前建立信心。

一旦提示词稳固，AFK Ralph 就能带来真正的杠杆。让它运行，去做别的事，完成后再回来。

我构建了一个小型 CLI，在 Ralph 完成时通过 WhatsApp 通知我。这大幅减少了上下文切换。我可以完全投入另一项任务。我的循环通常需要 30–45 分钟，但也可能运行数小时。

步骤很简单：

1. 用 HITL 开始学习和打磨。
2. 信任提示词后转为 AFK。
3. 返回后审阅提交。

## 3. 定义范围

让 Ralph 运行前，你需要定义“完成”的样子。这是从规划转向需求收集：不要规定每一步，而是描述所需的最终状态，让智能体找出方法。

### 定义范围的格式

有许多方式可为 Ralph 定义范围：

- 用户故事的 Markdown 列表。
- GitHub issues 或 [Linear tasks](https://linear.app)（后文详述）。
- 使用 [beads](https://github.com/steveyegge/beads)。

我喜欢的一种方法来自 Anthropic 关于[长时间运行智能体](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)的研究。它们将 PRD 项表示为带有 `passes` 字段的 JSON：

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

完成时 Ralph 将 `passes` 标为 `true`。PRD 既是范围定义也是进度跟踪器——是动态 TODO 列表，而不是瀑布式文档。

### 范围为何重要

你并_不需要_结构化 TODO 列表。可以给 Ralph 一个模糊任务——“改进这个代码库”——让它自己跟踪进度。

但任务越模糊，风险越大。Ralph 可能不断发现无穷改进而永远循环；也可能走捷径，在你认为完成之前宣告胜利。

我曾让 Ralph 提升 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 的测试覆盖率。仓库有内部命令——标为内部但仍面向用户（我在使用它们）。我希望一切都有测试。

三次迭代后，Ralph 报告：“已完成所有面向用户的命令。”但它完全跳过了内部命令，认定它们不面向用户并将其标为不计入覆盖率。

修复方法？精确定义要覆盖的内容：

| 要指定什么 | 为何能防止走捷径 |
| --- | --- |
| 要包含的文件 | Ralph 不会忽略“边缘情况”文件 |
| 停止条件 | Ralph 知道“完成”真正意味着完成 |
| 边缘情况 | Ralph 不会自行判断某些内容不算 |

### 在运行中调整 PRD

此方法的一个好处是：Ralph 运行时可以调整。

- 已实现但错误？将 `passes` 改回 `false`，添加说明并重跑。
- 漏了功能？即使在循环中也可新增 PRD 项。

你不是在编辑线性的多阶段计划，而是在描述不同的最终状态。Ralph 会到达那里。

只要范围和停止条件明确，Ralph 就会知道何时输出 `<promise>COMPLETE</promise>`。

### 试试看

使用计划模式，并为下一个功能创建 `prd.json` 文件。用此提示词生成结构化 PRD 项：

```txt
Convert my feature requirements into structured PRD items.
Each item should have: category, description, steps to verify, and passes: false.
Format as JSON. Be specific about acceptance criteria.
```

## 4. 跟踪 Ralph 的进度

我运行的每个 Ralph 循环都会生成一个直接提交到仓库的 `progress.txt` 文件。这一灵感来自 Anthropic 关于[长时间运行智能体执行框架](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)的文章。

它解决了一个核心挑战：AI 智能体像极聪明的专家，却会在任务之间忘记一切。每个新上下文窗口都从头开始。没有进度文件，Ralph 必须探索整个仓库才能理解当前状态。

进度文件缩短了这一探索。Ralph 读取它、看到已完成的内容，并直接跳到下一项任务。

### 进度文件包含什么

保持简单简洁：

- 本次会话中完成的任务。
- 做出的决策及原因。
- 遇到的阻塞项。
- 修改的文件。

还可包含刚完成的 PRD 项、任何架构决策以及下一次迭代的说明。

### 提交为何重要

Ralph 应在每个功能后提交。这会为未来迭代提供：

- 显示变更的清晰 `git log`。
- 针对先前工作执行 `git diff` 的能力。
- 出现问题时的回滚点。

进度文件与 Git 历史的组合为 Ralph 提供完整上下文，无需在探索中消耗 Token。

### 清理

不要永远保留 `progress.txt`。冲刺完成后删除它。它是会话特定的，不是永久文档。

### 试试看

为 Ralph 提示词添加进度跟踪：

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
	subtitle="当它真正必须交付时，支撑 Ralph 循环的 Skills。"
	cta="查看 Skill 集合"
/>

## 5. 使用反馈循环

Ralph 的成功取决于反馈循环。提供的循环越多，它产出的代码质量越高。

### 反馈循环类型

| 反馈循环 | 能捕获什么 |
| --- | --- |
| [TypeScript](https://www.typescriptlang.org) 类型 | 类型不匹配、缺失 props |
| 单元测试 | 损坏逻辑、回归 |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) server | UI bug、损坏交互 |
| [ESLint](https://eslint.org) / linting | 代码风格、潜在 bug |
| [Pre-commit hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) | 完全阻止不良提交 |

最佳设置是在一切通过前阻止提交。测试为红时，Ralph 无法宣告胜利。

### 反馈循环为何重要

优秀程序员不信任自己的代码，也不信任外部库，尤其不信任同事。相反，他们构建自动化和检查来验证交付物。

这种谦逊造就更好的软件，同样适用于 AI 智能体。

本文所有建议对人类开发者也适用。反馈循环、小步前进、明确范围并非 AI 专属技巧，只是良好的工程实践；Ralph 让它们不可协商。

### 试试看

为 Ralph 提示词添加明确反馈循环要求：

```txt
Before committing, run ALL feedback loops:
1. TypeScript: npm run typecheck (must pass with no errors)
2. Tests: npm run test (must pass)
3. Lint: npm run lint (must pass)
Do NOT commit if any feedback loop fails. Fix issues first.
```

## 6. 小步前进

获得反馈的速度就是你的速度上限。永远不要让速度超过车灯照明范围。

人类进行大型重构时可能会啃下一大块并一路推进，测试、类型和 lint 数小时保持红色。把工作拆成更小块意味着更紧的反馈循环——获得反馈前做的工作更少。

这同样适用于 Ralph，但还有一个约束：上下文窗口有限，LLM 随着填满而变差。这称为[上下文腐化](https://research.trychroma.com/context-rot)——持续越久，输出越愚蠢。

### 权衡

每次 Ralph 迭代都有启动成本。Ralph 必须选择任务、探索仓库并收集上下文；这些 Token 按循环消耗。

若在做大型重构，你不想 Ralph 每次迭代只重命名一个变量。但：

- 更大任务意味着更少反馈。
- 更多上下文意味着更低质量代码。
- 更小任务意味着更高质量，但进展更慢。

### 确定 PRD 项大小

对于 AFK Ralph，保持 PRD 项小。无人看管时，你希望智能体状态最佳。

对于 HITL Ralph，可让项目稍大以更快看到进展，但即便如此也应偏向小。

一个重构项可以简单到：“更改一个函数的参数。验证测试和类型通过。”

在提示词中引导 Ralph 的步长。我的倾向是小步：代码质量优于速度，尤其在 AFK 时，速度本就不那么重要。

### 试试看

为 Ralph 提示词添加步长指导：

```txt
Keep changes small and focused:
- One logical change per commit
- If a task feels too large, break it into subtasks
- Prefer multiple small commits over one large commit
- Run feedback loops after each change, not at the end
Quality over speed. Small steps compound into big progress.
```

## 7. 优先处理高风险任务

Ralph 自己选择任务。没有明确指导时，它通常会选择列表第一项或看起来最容易实现的内容。

这反映人类行为：开发者喜欢快速胜利。但经验丰富的工程师知道，应先敲定困难的事，以免简单工作让你陷入技术债。

### 探索与集成

专注于探索性工作——你不知道结果会怎样的事情。端到端构建功能，而不是逐层构建；及早集成。

若有需要协同的模块，告诉 Ralph 先集成它们。不要等到冲刺结束才发现它们无法配合。

| 任务类型 | 优先级 | 原因 |
| --- | --- | --- |
| 架构工作 | 高 | 决策会级联影响整个代码库 |
| 集成点 | 高 | 尽早暴露不兼容 |
| 未知的未知 | 高 | 早失败优于晚失败 |
| UI 润色 | 低 | 可在以后并行处理 |
| 快速胜利 | 低 | 随时都容易插入 |

### 高风险任务使用 HITL

高风险任务需要更多人类参与。早期架构决策使用 HITL Ralph——这些任务的代码会永久存在，任何捷径都会级联穿过整个项目。

将 AFK Ralph 留到基础稳固时。架构经过验证且高风险集成可用后，可让它在低风险任务上无人监督运行。

### 试试看

为 Ralph 提示词添加优先级指导：

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

并非所有仓库都一样。大量代码是原型代码——演示、短期实验、客户提案。不同仓库有不同质量门槛。

智能体不知道它身处哪种仓库；不知道是一次性原型，还是会维护多年的生产代码。你需要明确告诉它。

### 要传达什么

| 仓库类型 | 要说什么 | 预期行为 |
| --- | --- | --- |
| 原型 | “这是原型。速度优于完美。” | 走捷径，跳过边缘情况 |
| 生产 | “生产代码。必须可维护。” | 遵循最佳实践，添加测试 |
| 库 | “公共 API。向后兼容很重要。” | 谨慎处理破坏性变更 |

将此放在你的 [AGENTS.md](https://agents.md) 文件、Skills 或直接放进提示词。

### 仓库会胜出

你的指令与代码库竞争。当 Ralph 探索仓库时，它看到两个事实来源：你告诉它做什么，以及你实际做了什么。一个是几行指令，另一个是数千行证据。

你可以在提示词中写“绝不使用 `any` 类型”。但如果 Ralph 看到现有代码到处是 `any`，它会遵循代码库，而不是你的指令。

智能体会放大所见：糟糕代码导致更糟代码；低质量测试产生不可靠的反馈循环。

这就是软件熵——代码库随时间劣化的趋势。Ralph 会加速它：人类每天可能提交一两次，Ralph 可在数小时内堆入数十个提交。若这些提交质量低，熵会快速累积。

这意味着你需要：

- 在放开 Ralph 前保持代码库干净。
- 用反馈循环（lint、类型、测试）强制标准。
- 使质量预期明确且可见。

### 试试看

在 `AGENTS.md` 或 Ralph 提示词中添加质量预期：

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

AFK Ralph 需要编辑文件、运行命令和提交代码的权限。什么能阻止它运行 `rm -rf ~`？你离开键盘后无法干预。

[Docker sandboxes](https://docs.docker.com/ai/sandboxes/) 是最简单的解决方案：

```bash
docker sandbox run claude
```

这会在容器内运行 [Claude Code](https://code.claude.com/docs/en/overview)。当前目录被挂载，但没有别的内容。Ralph 可编辑项目文件并提交，却不能触及你的主目录、SSH 密钥或系统文件。

权衡是：全局 [AGENTS.md](https://agents.md) 和用户 Skills 不会被加载。对多数 Ralph 循环而言，这没问题。

对于 HITL Ralph，沙箱可选，因为你在观察；对于 AFK Ralph，特别是夜间循环，沙箱是防止失控智能体的必要保险。

## 10. 付费才能参与

我经常被问：“这要花多少钱？”整夜运行 AFK Ralph 当然可能积累巨额账单？

我从不愿提供财务建议，尤其面向低收入国家的人。但 Ralph 可以完全按你愿意支出的金额配置。

### HITL 仍然值得

即使从不运行 AFK Ralph，HITL Ralph 相比多阶段规划仍有很大好处。反复运行同一提示词，比每阶段指定不同提示词感觉更好。

| 方法 | 每阶段投入 | 最适合 |
| --- | --- | --- |
| 多阶段计划 | 编写新提示词 | 一次性大型任务 |
| HITL Ralph | 重跑同一提示词 | 学习、打磨 |
| AFK Ralph | 设置后放手 | 批量工作、自动化 |

我使用 Anthropic 5x Max 套餐，每月约 £90。我运行过几次 AFK Ralph，但大多数使用是 HITL。

### 为什么不用本地模型？

我认为你可在笔记本电脑上运行的开源模型目前还不足以胜任 Ralph。它们需要强大的 GPU，输出质量也达不到。在 AI 编码中，你得付费才能参与。

### 黄金时代

但需要放在背景中看：未来几年我们处于黄金时代，可以比人类更快地用 AI 做神奇的事，但市场仍支付人类工资。市场尚未适应我们都拥有极强 AI 编码工具这一事实。

是的，你必须付费；但只要愿意争取，回报就在那里。

## 11. 按自己的方式使用

Ralph 只是一个循环。这种简单性使其能无限配置。以下是一些按自己方式使用它的方法。

### 替换任务来源

本文示例使用本地 `prd.json`，但 Ralph 可以从任何地方拉取任务：

| 任务来源 | 工作方式 |
| --- | --- |
| GitHub Issues | Ralph 选择一个 issue 并实现它 |
| [Linear](https://linear.app) | Ralph 从你的冲刺中拉取任务 |
| [Beads](https://github.com/steveyegge/beads) | Ralph 处理 beadfile |

关键洞见不变：智能体选择任务，而不是你。你只是改变该列表所在的位置。

### 改变输出

每次 Ralph 迭代不必直接提交到 main，它可以：

- 创建分支并打开 PR。
- 向已有 issue 添加评论。
- 更新变更日志或发布说明。

当你有一批需要变成 PR 的 issue 时，这很有用。Ralph 分类、实现并打开 PR；你准备好时再审阅。

### 替代循环类型

Ralph 不必处理功能积压。我一直在试验一些循环：

**测试覆盖率循环**：让 Ralph 查看覆盖率指标。它找出未覆盖行、编写测试，并迭代到覆盖率达到目标。我曾用此将 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 从 16% 覆盖率提升到 100%。

**重复循环**：将 Ralph 接到 [`jscpd`](https://github.com/kucherenko/jscpd)，查找重复代码。Ralph 识别克隆、重构为共享工具，并报告变更。

**Lint 循环**：将 lint 错误交给 Ralph。它逐一修复，并在迭代间运行 linter 验证每项修复。

**熵循环**：Ralph 扫描代码异味——未使用导出、死代码、不一致模式——并清理它们。这是反向的软件熵。

任何可描述为“查看仓库、改进某些内容、报告发现”的任务都适合 Ralph 模式。循环相同，变化的只有提示词。

### 试试看

试试以下替代循环提示词之一：

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
	heading="更多 Ralph 建议，直接送达你的收件箱"
	subtitle="随着 Matt 打磨循环而发布的 Skill 文章和变更日志说明。"
/>

我期待看到你自己的 Ralph Wiggum——手指插鼻、飞出窗外、吃胶水、同时交付代码。

---

想进一步了解 Ralph？我会在[我的 newsletter](https://aihero.dev/newsletter)中发布更多关于自主 AI 编码的内容。订阅即可在新文章发布时收到通知。
