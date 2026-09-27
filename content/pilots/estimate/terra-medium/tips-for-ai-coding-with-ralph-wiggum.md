---
title: "用 Ralph Wiggum 进行 AI 编码的 11 条建议"
slug: "tips-for-ai-coding-with-ralph-wiggum"
type: "post"
description: "用 Ralph Wiggum 让 AI 编码工具在自主循环中工作：涵盖范围界定、进度追踪、反馈循环，以及在你离开键盘时仍能持续交付代码的 11 条建议。"
tags:
  - build-a-software-factory
updatedAt: "2026-01-08T12:25:29.414Z"
---

如果你正在使用 [Claude Code](https://code.claude.com/docs/en/overview)、[Copilot CLI](https://github.com/features/copilot/cli)、[OpenCode](https://opencode.ai/) 或 [Codex](https://openai.com/codex/) 这类 AI 编码命令行工具，这篇文章就是为你写的。

大多数开发者会以交互方式使用它们：给工具一项任务，看着它工作，发现它偏离方向时再介入。这就是“人在回路”（human-in-the-loop，HITL）式编码。

但现在有一种名为 [Ralph Wiggum](https://ghuntley.com/ralph/) 的新做法。Ralph 会在循环中运行你的 AI 编码 CLI，让它自主处理一组任务。你负责定义要完成什么；Ralph 负责想办法完成，并持续推进直到结束。换句话说，这是一种可长期运行、自主执行、无人看守的离开键盘（AFK）编码方式。

这不是一篇快速上手指南。如果你想尽快跑起来，请阅读 [Ralph 入门](https://www.aihero.dev/getting-started-with-ralph)。

### 11 条建议

| #   | 建议                                                                         | 摘要                                  |
| --- | --------------------------------------------------------------------------- | ---------------------------------------- |
| 1   | [Ralph 本质上是一个循环](#1-ralph-is-a-loop)                                       | Ralph 是什么，以及它为何有效           |
| 2   | [先用 HITL，再转 AFK](#2-start-with-hitl-then-go-afk)              | 运行 Ralph 的两种模式           |
| 3   | [界定范围](#3-define-the-scope)                                     | 如何说明“完成”应当是什么样子    |
| 4   | [追踪 Ralph 的进度](#4-track-ralphs-progress)                          | 在各轮迭代之间使用进度文件       |
| 5   | [使用反馈循环](#5-use-feedback-loops)                                 | 用类型、测试和 lint 作为护栏     |
| 6   | [小步推进](#6-take-small-steps)                                     | 为什么较小的任务会产出更好的代码 |
| 7   | [优先处理高风险任务](#7-prioritize-risky-tasks)                         | 先解决难题                        |
| 8   | [明确软件质量标准](#8-explicitly-define-software-quality) | 不要让 Ralph 为赶进度而走捷径    |
| 9   | [使用 Docker 沙箱](#9-use-docker-sandboxes)                             | 隔离 AFK Ralph，提升安全性       |
| 10  | [为能力付费](#10-pay-to-play)                                              | 成本考量与取舍                    |
| 11  | [按自己的方式改造](#11-make-it-your-own)                                    | 其他循环类型与定制方法            |

## 1. Ralph 本质上是一个循环

过去一年左右，AI 编码经历了几个不同阶段。先快速说明一下：

**氛围编程（Vibe Coding）**，是让 AI 写代码却几乎不检查的做法。你凭感觉接受 AI 的建议，不作严格审查。它很快，但代码质量会受影响。

**规划**，是让 AI 在写代码前先制定计划。在 [Claude Code](https://code.claude.com/docs/en/overview) 中，你可以进入 [计划模式](https://code.claude.com/docs/en/common-workflows#use-plan-mode-for-safe-code-analysis)，让 AI 探索你的代码库并在动手前创建计划。这样质量更好，但仍受限于单个上下文窗口能容纳的内容。

**多阶段计划**，会把大型功能拆成多个阶段，每个阶段在独立的上下文窗口中完成。你要为每个阶段写不同的提示词：先“实现数据库结构”，再“添加 API 端点”，然后“构建 UI”。这种方式扩展性更好，但需要人不断介入并写下一条提示词。

**Ralph** 把事情简化了。你不必为每个阶段写新提示词，而是把同一个提示词放进循环里反复运行：

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

中文理解版（学习辅助）：这个脚本会重复启动 Claude Code。每一轮都读取计划文件和进度文件，由 AI 自己挑选优先级最高的一项工作、检查测试等反馈、记录进度并提交一次代码。若它确认全部完成，就输出 `COMPLETE` 并退出循环。

每一轮迭代会：

1. 查看计划文件，了解还要做什么
2. 查看进度文件，了解已经完成什么
3. 决定下一步做什么
4. 探索代码库
5. 实现功能
6. 运行反馈循环（类型检查、lint、测试）
7. 提交代码

这里最关键的改进是：**由智能体选择任务，而不是由你选择**。

在多阶段计划中，人需要在每个阶段开始时写一条新提示词。使用 Ralph 时，智能体会从你的产品需求文档（PRD）中挑选下一项工作。你定义最终状态，Ralph 负责抵达那里。

我曾用 Ralph 为 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 添加测试，也用它为我的 [课程视频管理器](https://github.com/mattpocock/course-video-manager) 开发功能。还有人用它 [构建了完整的编程语言](https://github.com/ghuntley/ralph-lang)。

## 2. 先用 HITL，再转 AFK

运行 Ralph 有两种方式：

| 模式                         | 工作方式                      | 最适合的场景                    | 脚本          |
| ---------------------------- | --------------------------------- | --------------------------- | --------------- |
| **HITL**（人在回路） | 只运行一轮，观察并介入        | 学习、打磨提示词 | `ralph-once.sh` |
| **AFK**（离开键盘） | 在设定最大轮数的循环中运行 | 批量工作、低风险任务   | `afk-ralph.sh`  |

对于 HITL Ralph，保留一个只跑一轮的 `ralph-once.sh`。你可以观察它的每个动作，并在需要时接手干预。

对于 AFK Ralph，一定要限制迭代次数。面对带随机性的系统，无限循环很危险。小任务我通常设为 5–10 轮，大任务设为 30–50 轮。

HITL Ralph 很像结对编程：你和 AI 一起工作，随着代码生成不断审阅。你可以实时引导、补充信息，并分享自己对项目的理解。

它也是学习 Ralph 的最好方式。你会理解它在做什么，逐步完善提示词，并在真正放手前建立信心。

当你的提示词已经可靠，AFK Ralph 就能真正放大你的产出：启动它，去做别的事，完成后再回来查看。

我写过一个小型 CLI，在 Ralph 完成时通过 WhatsApp 提醒我。这样能明显减少任务切换。我可以完全投入另一件事。我的循环通常持续 30–45 分钟，也可能运行数小时。

推荐的过程很简单：

1. 先用 HITL 学习和打磨
2. 信任提示词后再转为 AFK
3. 回来后审阅提交记录

## 3. 界定范围

让 Ralph 开始运行前，你需要定义“完成”究竟是什么样子。这是从“规划步骤”转向“收集需求”的变化：你不再指定每一步怎么做，而是描述希望达到的最终状态，让智能体自己找出路径。

### 定义范围的格式

你可以用许多方式为 Ralph 界定范围：

- 用 Markdown 写用户故事清单
- 使用 GitHub issue 或 [Linear 任务](https://linear.app)（稍后还会提到）
- 使用 [beads](https://github.com/steveyegge/beads)

我喜欢的一种做法来自 [Anthropic 关于长时间运行智能体的研究](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)。它把 PRD 条目组织成带有 `passes` 字段的 JSON：

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

中文理解版（学习辅助）：这是一条功能需求。它要求“新建聊天”按钮创建一个新的对话，并列出三步验收动作。`passes: false` 表示尚未通过；完成并验证后，Ralph 会把它改为 `true`。

Ralph 完成后会把 `passes` 设为 `true`。这样 PRD 既是范围定义，也是进度追踪器——它是会持续更新的待办清单，而不是一份写完就不动的瀑布式文档。

### 为什么范围很重要

你**不一定**要准备结构化待办清单。你可以给 Ralph 一个模糊任务，例如“改进这个代码库”，让它自行追踪进度。

但任务越模糊，风险越大。Ralph 可能永远循环下去，不断找到无穷无尽的改进点；也可能抄近路，在你认为工作还没结束时就宣布胜利：

我曾让 Ralph 提升 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 的测试覆盖率。仓库中有一些内部命令——虽然标记为内部命令，但我仍在使用它们，因此它们也是面向用户的。我希望所有内容都有测试。

三轮之后，Ralph 报告：“所有面向用户的命令均已完成。”但它完全跳过了内部命令，把它们判定为不面向用户，并在覆盖范围里忽略了它们。

解决办法？精确说明你希望覆盖什么：

| 要说明的内容  | 为什么能防止走捷径                           |
| ---------------- | --------------------------------------------------- |
| 要包含的文件 | Ralph 不会忽略“边缘情况”文件                |
| 停止条件   | Ralph 知道“完成”真正意味着什么 |
| 边缘情况       | Ralph 不会自行判定某些事情不算数       |

### 运行中调整 PRD

这种方式有一个好处：Ralph 运行期间你仍可调整。

- 已经实现但实现错了？把 `passes` 改回 `false`，补充说明，然后重新运行。
- 少了一个功能？即使循环已经开始，也可以加入新的 PRD 条目。

你不是在编辑一份线性的多阶段计划，而是在描述一个不同的最终状态。Ralph 会设法抵达那里。

只要范围和停止条件足够明确，Ralph 就知道何时应输出 `<promise>COMPLETE</promise>`。

### 动手试试

使用计划模式，为下一个功能创建 `prd.json` 文件。用下面这段提示词生成结构化 PRD 条目：

```txt
Convert my feature requirements into structured PRD items.
Each item should have: category, description, steps to verify, and passes: false.
Format as JSON. Be specific about acceptance criteria.
```

中文理解版（学习辅助）：把我的功能需求转换成结构化 PRD 条目。每个条目应包含：类别、描述、验证步骤，以及 `passes: false`。请用 JSON 格式，并明确写出验收标准。

## 4. 追踪 Ralph 的进度

我运行的每个 Ralph 循环都会生成 `progress.txt` 文件，并直接提交到仓库。这一做法受 Anthropic 关于[长时间运行智能体执行框架](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)的文章启发。

它解决了一个核心难题：AI 智能体像非常聪明的专家，但会在任务之间忘掉所有事情。每个新的上下文窗口都是重新开始。如果没有进度文件，Ralph 必须探索整个仓库，才能理解当前状态。

进度文件能缩短这段探索。Ralph 读取它，知道已完成什么，然后直接跳到下一项任务。

### 进度文件应包含什么

保持简单、简短：

- 本次会话完成的任务
- 已作出的决定及其原因
- 遇到的阻塞问题
- 已修改的文件

你还可以加入刚完成的 PRD 条目、架构决策，以及写给下一轮迭代的说明。

### 为什么提交记录很重要

Ralph 应在每个功能完成后提交一次。这能给后续迭代提供：

- 清晰的 `git log`，用来查看改动了什么
- 可以对比先前工作的 `git diff`
- 出问题时可回退的节点

进度文件和 Git 历史配合，能让 Ralph 获得完整上下文，而不必把大量 Token 花在探索上。

### 清理

不要永久保留 `progress.txt`。一次冲刺结束后就删除它。它属于一次会话，而不是长期文档。

### 动手试试

把进度追踪加入你的 Ralph 提示词：

```txt
After completing each task, append to progress.txt:
- Task completed and PRD item reference
- Key decisions made and reasoning
- Files changed
- Any blockers or notes for next iteration
Keep entries concise. Sacrifice grammar for the sake of concision. This file helps future iterations skip exploration.
```

中文理解版（学习辅助）：每完成一项任务，就往 `progress.txt` 追加：完成的任务及对应 PRD 条目、关键决定和理由、改动过的文件，以及下一轮需要知道的阻塞或备注。内容应尽量简短；为了简洁，可以牺牲语法完整性。这个文件能帮助后续迭代跳过重复探索。

## 5. 使用反馈循环

Ralph 能否成功取决于反馈循环。你为它提供的循环越多，产出的代码质量通常越高。

### 反馈循环的类型

| 反馈循环                                                                | 能发现的问题                |
| ---------------------------------------------------------------------------- | ------------------------------ |
| [TypeScript](https://www.typescriptlang.org) 类型                           | 类型不匹配、缺少属性 |
| 单元测试                                                                   | 逻辑损坏、回归问题      |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) 服务器         | UI 缺陷、交互失效     |
| [ESLint](https://eslint.org) / linting                                       | 代码风格、潜在缺陷     |
| [提交前钩子](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) | 直接阻止不合格的提交    |

最好的设置是：任何检查未通过就禁止提交。测试仍然失败时，Ralph 就不能宣布任务完成。

### 为什么反馈循环很重要

优秀的程序员不会盲信自己的代码，也不会盲信外部库，更不会尤其盲信同事。他们会建立自动化和检查，验证自己交付的东西。

这种谦逊会带来更好的软件，对 AI 智能体也是一样。

本文每条建议同样适用于人类开发者。反馈循环、小步推进、明确范围，这些并不是 AI 专属技巧，而是优秀工程实践。Ralph 只是让它们变得不可回避。

### 动手试试

在 Ralph 提示词中加入明确的反馈循环要求：

```txt
Before committing, run ALL feedback loops:
1. TypeScript: npm run typecheck (must pass with no errors)
2. Tests: npm run test (must pass)
3. Lint: npm run lint (must pass)
Do NOT commit if any feedback loop fails. Fix issues first.
```

中文理解版（学习辅助）：提交前必须运行全部反馈循环：TypeScript 类型检查、测试和 lint，且都必须无错误通过。只要有任何一项失败，就不要提交；先修复问题。

## 6. 小步推进

你获得反馈的速度，就是你的速度上限。不要让自己在看不清前路时开得太快。

人类做大型重构时，可能会一次接下很大一块工作并持续推进，测试、类型检查和 lint 可能连续数小时都是红的。把工作拆成更小的块，意味着反馈循环更紧密——你能在投入较少工作后更快收到反馈。

Ralph 也一样，但还有一个额外限制：上下文窗口有限，LLM 填得越满，表现越差。这叫作[上下文退化（context rot）](https://research.trychroma.com/context-rot)：上下文越长，输出就越不可靠。

### 取舍

每一轮 Ralph 迭代都有启动成本。Ralph 必须选择任务、探索仓库并收集上下文；这些 Token 都会在每一轮重复消耗。

如果你正在做大型重构，当然不希望 Ralph 每轮只重命名一个变量。但同时：

- 任务越大，收到反馈越不频繁
- 上下文越多，代码质量越容易下降
- 任务越小，质量越高，但进度更慢

### 设定 PRD 条目的大小

对于 AFK Ralph，请把 PRD 条目保持得小一些。没有人在旁边看时，你更希望智能体始终处于最佳状态。

对于 HITL Ralph，可以把条目稍微放大一点，以便更快看到进度。但即使如此，也应倾向于小任务。

一个重构条目可以简单到：“修改一个函数的参数，并确认测试和类型检查通过。”

在提示词中引导 Ralph 控制步幅。我的倾向是：小步推进。代码质量优先于速度——尤其在 AFK 场景中，速度本来也没那么重要。

### 动手试试

在 Ralph 提示词中加入步幅指引：

```txt
Keep changes small and focused:
- One logical change per commit
- If a task feels too large, break it into subtasks
- Prefer multiple small commits over one large commit
- Run feedback loops after each change, not at the end
Quality over speed. Small steps compound into big progress.
```

中文理解版（学习辅助）：让改动小而聚焦：每次提交只做一个逻辑改动；任务太大就拆成子任务；多个小提交优于一个大提交；每次改动后就运行反馈循环，不要等到最后。质量优先于速度，小步骤会累积成大进展。

## 7. 优先处理高风险任务

Ralph 会自行选择任务。没有明确指引时，它常常会挑列表第一项，或挑看起来最容易实现的项目。

这和人类行为很像：开发者喜欢快速取胜。但有经验的工程师知道，应先解决最难的部分，别让简单工作把真正的技术债掩盖起来。

### Spike 与集成

优先做 Spike（探索性验证）：即那些你还不知道结果会怎样的事情。应端到端构建功能，而不是逐层堆砌；要尽早集成。

如果一些模块需要协同工作，就让 Ralph 先把它们集成起来。不要等到冲刺末尾才发现它们彼此不兼容。

| 任务类型          | 优先级 | 原因                                       |
| ------------------ | -------- | ----------------------------------------- |
| 架构工作 | 高     | 决策会影响整个代码库 |
| 集成点 | 高     | 能尽早暴露不兼容问题           |
| 未知的未知因素   | 高     | 早失败胜过晚失败        |
| 常规功能实现          | 低      | 可以稍后并行处理                 |
| 快速取胜项         | 低      | 随时都容易插入                   |

### 用 HITL 处理高风险任务

高风险任务需要更多人工参与。对于早期架构决策，应使用 HITL Ralph——这些任务写下的代码会长期存在，任何捷径都会在项目中层层传递。

当基础稳固、风险集成已经验证后，再让 AFK Ralph 无人看守地处理风险较低的任务。

### 动手试试

在 Ralph 提示词中加入优先级指引：

```txt
When choosing the next task, prioritize in this order:
1. Architectural decisions and core abstractions
2. Integration points between modules
3. Unknown unknowns and spike work
4. Standard features and implementation
5. Polish, cleanup, and quick wins
Fail fast on risky work. Save easy wins for later.
```

中文理解版（学习辅助）：选择下一项任务时，请依次优先处理：架构决策和核心抽象、模块间集成点、未知问题和探索性验证、常规功能实现、打磨清理和快速取胜项。高风险工作要尽早暴露失败，容易的工作留到以后。

## 8. 明确软件质量标准

不同仓库的目标并不相同。许多代码只是原型：演示、短期实验或客户提案。不同仓库对质量有不同要求。

智能体并不知道它所在的仓库属于哪一种。它不知道这是一次性原型，还是要维护多年的生产代码。你需要明确告诉它。

### 需要说明什么

| 仓库类型  | 应该怎么说                                   | 预期行为                  |
| ---------- | --------------------------------------------- | ---------------------------------- |
| 原型  | “这是原型，速度优先于完美。” | 允许走捷径，跳过边缘情况  |
| 生产环境 | “这是生产代码，必须易于维护。”      | 遵循最佳实践，补充测试 |
| 库    | “这是公开 API，向后兼容很重要。” | 谨慎对待破坏性变更     |

把这些写进 [AGENTS.md](https://agents.md) 文件、你的 Skill，或直接写进提示词中。

### 仓库会赢

你的指令会与代码库本身竞争。当 Ralph 探索仓库时，它会看到两种事实来源：你告诉它要做什么，以及你实际已经怎么做。一边是几行指令，另一边是数千行证据。

你可以在提示词里写“永远不要使用 `any` 类型”。但如果 Ralph 在现有代码中到处看到 `any`，它会遵循代码库，而不是你的指令。

智能体会放大它看到的模式。糟糕的代码会带来更糟的代码，低质量测试会带来不可靠的反馈循环。

这就是软件熵：代码库会随时间逐渐劣化的倾向。Ralph 会加速这一过程。人类每天可能只提交一两次，Ralph 几小时内就能向仓库堆入数十次提交。如果那些提交质量不高，熵会快速累积。

因此你需要：

- 放手让 Ralph 工作前，先保持代码库整洁
- 使用反馈循环（lint、类型检查、测试）来落实标准
- 让质量预期明确且随处可见

### 动手试试

在 `AGENTS.md` 或 Ralph 提示词中加入质量预期：

```txt
This codebase will outlive you. Every shortcut you take becomes
someone else's burden. Every hack compounds into technical debt
that slows the whole team down.

You are not just writing code. You are shaping the future of this
project. The patterns you establish will be copied. The corners
you cut will be cut again.

Fight entropy. Leave the codebase better than you found it.
```

中文理解版（学习辅助）：这个代码库会比你存在得更久。每次走捷径都会成为别人的负担，每个临时补丁都会累积为拖慢团队的技术债。你不只是在写代码，也是在塑造项目未来；你建立的模式会被复制，今天省略的细节会再次被省略。请对抗熵，让代码库比你接手时更好。

## 9. 使用 Docker 沙箱

AFK Ralph 需要有编辑文件、运行命令和提交代码的权限。那如果它运行 `rm -rf ~` 呢？你已经离开键盘，无法及时干预。

[Docker 沙箱](https://docs.docker.com/ai/sandboxes/)是最简单的解决方案：

```bash
docker sandbox run claude
```

这会在容器内运行 [Claude Code](https://code.claude.com/docs/en/overview)。当前目录会被挂载进去，但不会挂载其他内容。Ralph 可以编辑项目文件和提交代码，却无法接触你的主目录、SSH 密钥或系统文件。

代价是：你的全局 [AGENTS.md](https://agents.md) 和用户级 Skill 不会被加载。对大多数 Ralph 循环来说，这并无大碍。

对于 HITL Ralph，沙箱是可选项，因为你正在看着它。对于 AFK Ralph，尤其是夜间运行的循环，它是避免失控智能体造成意外的重要保险。

## 10. 为能力付费

我经常被问：“这要花多少钱？让 AFK Ralph 整夜运行，岂不是会累积巨额账单？”

我从不觉得自己适合提供财务建议，尤其面对低收入国家的朋友。但 Ralph 完全可以按你的预算配置。

### HITL 仍然值得

即便你从不运行 AFK Ralph，HITL Ralph 相比多阶段规划仍有很大优势：反复运行同一条提示词，比每个阶段都重新指定一条提示词更顺手。

| 方式          | 每阶段需要的投入  | 最适合的场景              |
| ----------------- | --------------------- | --------------------- |
| 多阶段计划 | 写一条新提示词  | 一次性大型任务   |
| HITL Ralph        | 重跑同一条提示词 | 学习、打磨        |
| AFK Ralph         | 设置后等待完成    | 批量工作、自动化   |

我使用的是 Anthropic 5x Max 计划，每月大约 £90。我确实运行过几次 AFK Ralph，但我的大部分使用仍是 HITL。

### 为什么不用本地模型？

我认为，目前能在笔记本电脑上运行的开源模型还不足以胜任 Ralph。它们需要强大的 GPU，输出质量也还不够好。在 AI 编码中，你确实需要为能力付费。

### 黄金时代

不过也要放到更大的背景中看。未来几年，我们正处于一个黄金时代：你可以借助 AI 比人类更快地完成一些近乎神奇的事情，但市场仍按人类工资来付费。市场尚未适应这样一个事实：我们每个人都能使用非常强大的 AI 编码工具。

是的，你需要付费；但只要愿意把握，回报也在那里。

## 11. 按自己的方式改造

Ralph 只是一个循环。正因如此简单，它可以被无限定制。下面是几种按自己需求改造它的方法。

### 替换任务来源

本文示例使用本地 `prd.json`，但 Ralph 可以从任何地方获取任务：

| 任务来源                                  | 工作方式                        |
| -------------------------------------------- | ----------------------------------- |
| GitHub Issues                                | Ralph 选择一个 issue 并实现它 |
| [Linear](https://linear.app)                 | Ralph 从你的冲刺中获取任务        |
| [Beads](https://github.com/steveyegge/beads) | Ralph 处理 beadfile 中的工作      |

关键洞见不变：由智能体选择任务，而不是由你选择。你只是改变了任务清单存放的位置。

### 改变输出方式

与其直接提交到 main，每轮 Ralph 迭代还可以：

- 创建分支并开启 PR
- 给已有 issue 添加评论
- 更新变更日志或发布说明

当你有一批需要变成 PR 的 issue 时，这会很有用。Ralph 负责分类、实现并打开 PR；你准备好时再审阅。

### 其他循环类型

Ralph 不必处理功能待办列表。以下是我一直在尝试的一些循环：

**测试覆盖率循环**：让 Ralph 查看覆盖率指标。它寻找未覆盖的代码行、编写测试，并持续迭代直到覆盖率达到目标。我曾用它把 [AI Hero CLI](https://github.com/mattpocock/ai-hero-cli) 的覆盖率从 16% 提升到 100%。

**重复代码循环**：将 Ralph 接到 [`jscpd`](https://github.com/kucherenko/jscpd)，查找重复代码。Ralph 找出相似片段，重构成共享工具，并报告改了什么。

**Lint 循环**：把 lint 报错交给 Ralph。它逐个修复，并在每轮之间运行 linter 验证修复结果。

**熵循环**：Ralph 扫描代码坏味道，例如未使用的导出、死代码和不一致的模式，并进行清理。这是反向的软件熵。

任何能描述成“查看仓库、改进某件事、报告发现”的工作，都适合 Ralph 模式。循环是一样的，变化的只有提示词。

### 动手试试

试试下面任意一种替代循环提示词：

```txt
# Test Coverage Loop
@coverage-report.txt
Find uncovered lines in the coverage report.
Write tests for the most critical uncovered code paths.
Run coverage again and update coverage-report.txt.
Target: 80% coverage minimum.
```

中文理解版（学习辅助）：读取 `coverage-report.txt` 中的覆盖率报告，找出未覆盖的代码行；为最关键的未覆盖路径写测试；再次运行覆盖率并更新报告。目标是至少 80% 覆盖率。

```txt
# Linting Loop
Run: npm run lint
Fix ONE linting error at a time.
Run lint again to verify the fix.
Repeat until no errors remain.
```

中文理解版（学习辅助）：运行 `npm run lint`，每次只修复一个 lint 错误；再次运行 lint 验证修复；重复直到没有错误。

```txt
# Entropy Loop
Scan for code smells: unused exports, dead code, inconsistent patterns.
Fix ONE issue per iteration.
Document what you changed in progress.txt.
```

中文理解版（学习辅助）：扫描代码坏味道：未使用的导出、死代码和不一致的模式。每轮只修复一个问题，并把改动记录在 `progress.txt` 中。

我期待看到你自己的 Ralph Wiggum：抠着鼻子、飞出窗外、吃着胶水，却还能持续交付代码。

---

中文学习辅助：术语小词典

- **AFK（away from keyboard）**：离开键盘、暂时无人盯着电脑时运行的自动化工作模式。
- **AGENTS.md**：给 AI 编码智能体阅读的项目说明文件，通常写有规则、结构和质量要求。
- **CLI（command-line interface）**：命令行工具；通过输入文字命令而非点击图形界面来使用。
- **Docker 沙箱**：把程序放进受限容器中运行的隔离环境，可减少它误碰系统其他文件的风险。
- **HITL（human-in-the-loop）**：人在回路；AI 工作时由人持续观察、审核和必要时介入。
- **LLM（large language model）**：大语言模型，能理解和生成文本、代码等内容的 AI 模型。
- **lint / linter**：按规则检查代码风格和常见错误的工具或过程。
- **PRD（product requirements document）**：产品需求文档，用来明确功能目标和验收条件。
- **PR（pull request）**：代码合并请求，供他人在合并改动前审阅。
- **Token**：模型处理文本时使用的计量单位；上下文越长，通常消耗的 Token 越多。
- **上下文窗口（context window）**：模型单次能同时读取和记住的内容范围。
- **反馈循环（feedback loop）**：通过测试、类型检查等不断发现问题并验证修复结果的机制。
- **氛围编程（Vibe Coding）**：主要凭感觉接受 AI 生成代码、缺少严格检查的编程方式。
