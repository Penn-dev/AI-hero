---
title: "/code-review Skill"
slug: "skills-code-review"
type: "post"
description: "对照仓库规范与规格，审阅代码差异。"
updatedAt: "2026-08-24T09:14:47.195Z"
---

## 它能做什么

`code-review` 审阅 `HEAD` 与你指定固定起点之间的 diff。起点可以是提交、分支、标签、`main` 或 `HEAD~5`。它分两个维度：**Standards，规范**，检查代码是否符合本仓库的写法；**Spec，规格**，检查代码是否满足原始 issue 或[规格](https://www.aihero.dev/ai-coding-dictionary/spec)。每个维度由独立[子智能体](https://www.aihero.dev/ai-coding-dictionary/subagent)执行，互相看不到对方的推理。

Skill 不会合并这两个维度，也不重新排列它们的优先级。最后分别指出*各维度*最严重的问题，不选一个跨维度的总冠军。修改可以一项通过、另一项失败。完全符合惯例，却实现错了东西，规范通过、规格失败；完全满足[任务单](https://www.aihero.dev/ai-coding-dictionary/ticket)，却违背仓库惯例，则相反。混成一个结论，就可能让通过的维度掩盖失败的维度。

译注：HEAD 是当前检出的提交位置；`HEAD~5` 表示沿历史往前五次的祖先提交。diff 是两个版本间的差异。

## 什么时候该用它

输入 `/code-review`；要求审阅分支、PR、正在进行的工作，或“从 X 之后的修改”时，智能体也会自动使用。

| 你的情况 | 使用什么 |
| --- | --- |
| 已有 diff，想知道实现方式是否正确，*而且*实现的是否是正确需求 | `code-review` |
| 想在 diff 中找 bug，例如空值路径、竞态、偏一错误 | Claude Code 自带审阅，不是这个 Skill，见下方命名冲突说明 |
| 还没写代码，希望测试先行 | [tdd](https://aihero.dev/skills-tdd) |
| 要实现一份完整规格，并包括审阅 | [implement](https://aihero.dev/skills-implement)，它会自行调用本 Skill |
| 整个代码库逐渐失去结构，而非某个 diff | [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) |
| 某处坏了，不知道为什么 | [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs) |

必须提供固定起点。没有提供，它会问，不会猜。启动子智能体前，先确认引用有效、diff 非空。因此，分支名打错会当场暴露，而不是进入两个子智能体后才失败。

## 使用前提

规范维度没有前置要求。它读取仓库已有说明，例如 `CODING_STANDARDS.md`、`CONTRIBUTING.md`；没有规范时，用内置基线。

规格维度需要一份存在且找得到的规格，按这个顺序寻找：

1. 提交说明中的 issue 引用，例如 `#123`、`Closes #45` 或 GitLab 的 `!67`，通过任务跟踪文档取得。
2. 你作为参数传入的路径。
3. `docs/`、`specs/` 或 `.scratch/` 下，与分支或功能名称对应的规格文件。
4. 询问你。

第一步依赖 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 写出的任务跟踪说明。没有说明，直接给路径也能运行。完全没有规格时，跳过规格子智能体，并在报告中说明“no spec available”，即没有可用规格，不会编造需求。

## 两个审阅维度

| | Standards，规范 | Spec，规格 |
| --- | --- | --- |
| 问题 | 实现方式正确吗？ | 实现的是正确需求吗？ |
| 读取 | 仓库记录的规范，加上代码异味基线 | 原始 issue 或规格 |
| 报告 | 违反书面规范的地方，可能是硬性问题；以及始终依赖判断的代码异味 | 遗漏或只完成部分的需求、范围扩张、实现错误的需求 |
| 每项发现引用 | 规范文件与具体规则，或异味名称及 diff 片段 | 规格中的具体行 |

这样设计是为了避免通用审阅工具不懂仓库标准，把有意的设计报成问题，却漏掉仓库依赖的不变量。因此，规范维度以仓库自己的文档为[第一手来源](https://www.aihero.dev/ai-coding-dictionary/primary-source)，**始终以仓库规则为准**。

**代码异味基线**位于仓库规范之下，来自 Fowler《重构》第三章的十二种异味：Mysterious Name，含糊名称；Duplicated Code，重复代码；Feature Envy，依恋其他模块的数据；Data Clumps，总是一起出现的数据组；Primitive Obsession，过度使用基础类型；Repeated Switches，重复条件分支；Shotgun Surgery，一项修改散布到多处；Divergent Change，一个模块因多种原因变化；Speculative Generality，为假想需求泛化；Message Chains，过长的调用链；Middle Man，多余中间层；Refused Bequest，不需要却继承来的功能。每项都只是有标签的启发式判断，例如“possible Feature Envy”，即“可能存在 Feature Envy”，绝不是硬性违规。每项都说明是什么、怎样修，因此发现会附带修法，不只抱怨。两个维度都会跳过 linter 已强制检查的内容。

译注：“代码异味”是值得进一步判断的设计迹象，不等于已经证实的 bug。linter 是自动静态检查工具。

## 常见问题

**它与 Claude Code 自带 `/code-review` 冲突，怎么办？**

这是反馈最多且尚未修复的问题。Claude Code 自带 `/code-review` 做的是另一件事：在 diff 中找 bug，而本 Skill 检查规格符合度和仓库规范。安装这套库后，会有一个名称优先，具体取决于安装方式：

- **插件市场**：每个 Skill 带 `mattpocock-skills:` 前缀，而内置版本反而很难再通过不带前缀的名字访问。
- **普通 Skills 安装**：本地文件优先，本 Skill 遮蔽内置版本。

一个办法是彻底移除 Claude Code 内置 Skills。这样能节省大量[上下文](https://www.aihero.dev/ai-coding-dictionary/context)，冲突也不再重要。遮蔽问题本身可以视为 Claude Code [执行框架](https://www.aihero.dev/ai-coding-dictionary/harness)的 bug，Skill 作者应该有命名自由，因此另一个办法是给本地副本改名。但 `npx skills update` 会撤销对 frontmatter 或目录名的修改。用户报告较持久的办法是，复制分支到新名称，并从受管理集合中移除 `code-review`。记下复制时的提交，以后手动同步。

**它的子智能体又调用 `/code-review`，不断启动更多智能体。**

这是多个框架中都有人复现的开放 bug。规范与规格的任务说明没有禁止委派，因此子智能体可能再次发现该 Skill，再扩出一批。有报告达到五十多个智能体。用户在自己的分支中，给两份子智能体说明都追加了一句：“Do not invoke `/code-review` or spawn additional agents: perform this review directly.”

中文 Prompt（译注）：

```text
不要调用 /code-review，也不要启动其他智能体；直接完成这次审阅。
```

有人更愿意在执行框架层统一限制，让所有 Skills 都继承。这两种办法都还没进入已发布 Skill。无人看管地运行时，请留意智能体数量。

**应该在写代码的同一个[会话](https://www.aihero.dev/ai-coding-dictionary/session)里审阅吗？**

优先新会话。一位读者说：“Same context reviewing itself isn't review, it's confirmation bias with a slash command.”

中文理解：同一上下文审阅自己不叫审阅，只是给确认偏误套了条斜杠命令。

在编写会话中审阅，智能体带着塑造代码的全部假设，而独立审阅者不会有这些背景。这也是有人要求 [implement](https://aihero.dev/skills-implement) 去掉内置审阅的原因，它会在刚写出 diff 的同一会话里审阅。独立方式是在干净会话里自己调用 `/code-review`。

**每张任务后审，还是最后一次审？**

都可以，Skill 不替你决定。逐张审让 diff 足够小，规格维度有一份明确规格可对照，这是 `implement` 的模式。等整条分支完成再审，能捕捉逐张审时看不到的任务间交互。不确定时，逐张审，再以分支起点作一次最终审阅。

**发现可以直接信吗？**

不能不核实。子智能体输出是假设，不是证据。有团队报告，基于文字的审阅漏掉了十多项破坏性变化。Skill 只是原样或略作整理地汇总两份报告，不会逐项回文件复核，因此位置可能引用错、影响可能被夸大。行动前读每项引用。它要求每项带证据位置，包括规范规则、异味与 diff 片段，或规格行，正是为了可核查。

**为什么每次运行都发现新问题？**

每次修复都增加新代码，而规范维度里依赖主观判断的部分，每次结果不同。一位读者描述：“/code-review and /improve-code-architecture always find new stuff every time. I implement fixes, rerun these skills, and again and again.”

中文理解：每次运行 /code-review 和 /improve-code-architecture 都会发现新东西。我修完重跑，又来一遍，没完没了。

没有保证一定收敛。把一轮结果当作线索清单，处理有具体规则引用支持的项，然后停止。不要循环到完全没发现为止，因为不会有那一天。

**它审阅未提交的工作吗？**

不。它比较 `<fixed-point>...HEAD`。三点形式从共同祖先开始，不包含暂存区和工作树修改。如果 `implement` 没有做中间提交，审阅就看不到即将进入下一次提交的工作。先提交，再审，再 amend 或追加修复提交。

## 出现这些迹象，就说明它在发挥作用

- 在启动任何子智能体前，就拒绝无效引用或空 diff。
- 报告分成 `## Standards` 和 `## Spec` 两块，而不是混合清单。
- 每项规范发现指向仓库规则或十二种异味之一，并引用 diff 片段；每项规格发现引用规格具体行。
- 结尾分别给出各维度最严重的问题，不选总冠军。
- 没有规格时，规格部分明确说明，不从代码推断一套需求。

## 它处在什么位置

`code-review` 是开发链靠近结尾的审阅步骤：`grill-with-docs → to-spec → to-tickets → implement → code-review → retro`。也可以独立审阅你指定的任意分支或 PR。

- [implement](https://aihero.dev/skills-implement) 最相近。它驱动开发，提交前调用本 Skill 作最终审阅。[implement-spec](https://aihero.dev/skills-implement-spec) 则对整个整合分支运行一次。
- [retro](https://aihero.dev/skills-retro) 在后面，负责改进流程。如果会话表明审阅漏掉某类错误，`retro` 会建议增加检查或 `CODING_STANDARDS.md` 规则，随后供规范维度读取。
- [pr](https://aihero.dev/skills-pr) 在已审阅工作发布时，撰写 PR 正文。
- [to-spec](https://aihero.dev/skills-to-spec) 和 [to-tickets](https://aihero.dev/skills-to-tickets) 产出规格维度所依据的文档，所以规格含糊，审阅也会含糊。
- [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 是面向整个代码库的对应工具，本 Skill 只看一个 diff。

不确定选哪个时，[ask-matt](https://aihero.dev/skills-ask-matt) 可以帮你选择。

译注：相关中文词条：[子智能体](/ai-coding-dictionary/subagent)、[规格](/ai-coding-dictionary/spec)、[第一手来源](/ai-coding-dictionary/primary-source)。中文页未接入时会回到原站英文页。
