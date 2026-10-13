---
title: "v1.3：/implement-spec、/pr、/retro，以及 GLOSSARY.md"
slug: "skills-changelog-v13-implement-spec-pr-retro-and-glossary-md"
type: "page"
updatedAt: "2026-10-05T10:57:45.922Z"
---

[AI Skills 更新日志](/skills)

# v1.3：/implement-spec、/pr、/retro，以及 GLOSSARY.md

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

分享

我的 Skills 1.3 版发布了。写代码便宜了，读代码却没有。所以这次发布关注代码周边：三个 Skills 从 `in-progress/` 进入正式**工程**分类，删除一个 Skill，还有一次文件改名需要你处理。

完整改动见 [v1.3.1 发布记录](https://github.com/mattpocock/skills/releases/tag/v1.3.1)。本页讲这些变化对你意味着什么。

## [怎样更新](#how-to-update)

通过 `/plugin install` 安装的，会自动更新。其他方式运行：

```shellscript
npx skills update
```

然后查看 Skills 文件夹。如果 `resolving-merge-conflicts` 还在，删除它。以前的更新不总能移除已删除的 Skills。

## [不兼容变更：`CONTEXT.md` 改为 `GLOSSARY.md`](#breaking-contextmd-glossarymd)

Skills 读取和写入领域文档的位置全部改名：`CONTEXT.md` 改为 `GLOSSARY.md`，`CONTEXT-MAP.md` 改为 `GLOSSARY-MAP.md`。只认新名字。如果 `/grill-with-docs` 或 `/domain-modeling` 已为你创建过文件，请移动：

```shellscript
git mv CONTEXT.md GLOSSARY.md
git mv CONTEXT-MAP.md GLOSSARY-MAP.md
```

团队中应在同一次提交里完成，让所有人拉取。如果某人在文件移动前先更新 Skills，智能体就会在旧文件旁新建一个空的 `GLOSSARY.md`。

旧名来自 DDD 的**限界上下文**。我实际仍在做 DDD，只是不再用这个名称；但 `CONTEXT.md` 太含糊，没让智能体在恰当时机读取，也让人困惑。文件后来不断缩减，最终只剩词汇表。因此现在名字直接说明它是什么。行为没变，只改文件名。

涉及的 Skills 是：`domain-modeling`、`grill-with-docs`、`improve-codebase-architecture`、`setup-matt-pocock-skills`、`triage`、`tdd`、`diagnosing-bugs`、`ask-matt`、`codebase-design`、`wait-what` 和 `pr`。

译注：DDD 是领域驱动设计，强调用一致语言描述业务。这里给出的 git mv 会把文件重命名并记录到 Git 暂存区。本页保留原命令，没有在你的项目中执行。

## [整个循环](#the-loop)

主要流程前半段不变：`/grill-with-docs` → `/to-spec` → `/to-tickets`，产出一份**规格**和一组**任务单**。三个新 Skills 接上后半段：

- `/implement-spec` 接收规格和任务，实现全部内容。
- `/pr` 接收结果，写出人能快速审阅的 PR 正文。
- `/retro` 回顾会话、改进仓库，让下一次更好。

## [新增：`/implement-spec`](#new-implement-spec)

`/implement` 还在，一次做一张任务，由你调度。`/implement-spec` 由用户调用，一轮在一条**整合分支**上实现整份规格。每张任务依次合入这条分支，之后才考虑进入 main。

执行一组任务有三种方式：

1. **人工循环。** 说“implement ticket one”，等待，清空上下文，再说“implement ticket two”。你自己就是 for 循环，没什么意思。
2. **确定性循环。** 脚本读取每张任务，逐张运行 `/implement`。这是我推荐给多数人的方式，每次运行方式一样，可靠又便宜；但设置和调整需要耐心。[Sandcastle](https://github.com/mattpocock/sandcastle) 就是其中一种。
3. **智能体循环。** 由智能体代替人盯进度，这就是 `/implement-spec`。

中文 Prompt（译注，对应人工循环的两条原指令，分别使用）：

```text
实现第一张任务单。
```

中文 Prompt（译注）：

```text
实现第二张任务单。
```

智能体循环比确定性循环差。但在软件工厂尚未调好之前，它是开始 AFK 工作的好办法，我用得比预想中多得多。现在能这样做，是因为子智能体可以启动自己的子智能体。

任务不是步骤清单，而是**带阻塞关系的任务图**。关系由 `/to-tickets` 写出。因此始终存在一组**已就绪任务（frontier）**，没有任务阻塞它们。执行过程：

1. 读取规格和任务，在自己的子智能体中探索代码库。
2. 创建整合分支。
3. 每张已就绪任务启动一个实现子智能体，各自使用独立 worktree，用 `/tdd` 实现。
4. 合并子智能体把已完成任务合入整合分支。已就绪范围变化，新任务获得实现者。
5. 整张图完成后，对完整整合分支调用 `/code-review`，并启动修复者。

目标是整合分支，不是 PR。只有任务系统通过 PR 关闭工作，或你要求时，才创建草稿 PR。

还存在两处粗糙之处。最终是**一条很大的分支**，目前没好办法。可以用堆叠 PR，但我不想让它只适用于 GitHub。另外 worktree 不消除冲突，只把冲突挪到合并时：两张任务可能用两个名字增加同一个字段。

把它视为实现规格的一种基础版本，再在其上建立自己的方法。

译注：worktree 是同一仓库的独立工作目录；AFK 指人离开键盘后让智能体自行工作。以上是原文对工作流的介绍，不代表每种宿主都支持相同并行方式。

## [新增：`/pr`](#new-pr)

工作进入 main 的主要瓶颈仍是 PR。`/pr` 可由模型调用，让人工审阅尽可能快速、简单。它只给智能体一份 PR 正文模板，共三节。

**Summary，摘要**用图示而非一段文字：选择能讲清改动的最小视图，例如伪代码、调用树、文件树、Mermaid 或 diff 草图。可视化方法来自 Dex Horthy 的 `show-me` Skill，来源写在 `CREDITS.md`。

**Evidence，证据**展示**之前**和**之后**：某项测试过去失败，现在通过。不要求硬证据，智能体很容易说“that probably works, I read the code”。

中文理解：我读过代码了，这大概能用。

你要求证据后，它往往会多跑一个测试、多截一张图。你正是通过证据，逐渐学会信任智能体的输出。

**Merge Danger，合并风险**回答两个问题：

- **单向门还是双向门？** 双向门可以退回，撤销提交就回到起点。单向门会对外部世界产生影响：迁移删除了一列数据；回滚无法收回已经发出的邮件。
- **影响范围。** 错了会坏多少东西？一个按钮，还是你的库的所有使用者？

合并风险告诉你审阅时间该花在哪里。影响小的双向门，快速看；单向门，慢慢读。给智能体规格，别只给 diff，它才能准确判断。

[v1.3 发布 PR](https://github.com/mattpocock/skills/pull/1120) 就是用它写的。

这是我见过最可靠的模型调用型 Skills 之一。在 Opus 5.5 上，每次智能体写 PR 正文都会加载，你不用记着。如果已有自己的 PR 正文 Skill，从这里取用喜欢的部分即可。

## [新增：`/retro`](#new-retro)

我的 Skills 对你要求很多。长期以来，需要你自己改进仓库：保持 `AGENTS.md` 精简、Skills 好用，增加好的 lint 规则，让代码易于导航。我在自己的仓库中一直手动做，于是把它打包成 Skill。

`/retro` 由用户调用，名字来自 retrospective，复盘。对当前或历史编码会话运行，会提出针对智能体**环境**而非代码的改进。它读取真实会话，因此能看到智能体没告诉你的问题。智能体抱怨得远远不够，总是硬着头皮推进，功能也照样做出来了。

它看七个方面：

- 代码库容易找到路吗？
- 能用**自动检查**发现吗？
- 有供审阅者执行的**编码规范**吗？
- 全局 `AGENTS.md` 状态好吗？
- 工具的投入产出合适吗，还是浪费 Token？
- 指令与引导文件中有没有 **no-op，无效指令**？“Write clean, readable code”不改变任何行为，删掉它。
- 智能体掌握所有需要的信息了吗？

中文 Prompt（译注，对应被批评的无效指令）：

```text
编写干净、易读的代码。
```

最重要的是检查和规范。**机械性违规**就用确定性检查，没有例外：自定义 lint 规则、提交前 hook 或 CI 任务。`CODING_STANDARDS.md` 只保留**需要判断力**的事项。检查能失败，Markdown 中的一句话不能。仓库完全没有保护措施，本身就是发现。

因此循环是：发现错误，运行 `/retro`，让下次不可能再犯。`AGENTS.md` 应越来越短，不是越来越长。

`/retro` 需要人工参与。你从按严重程度排序的清单中选项之前，它不改任何东西。运用你的判断，有些发现对你无关紧要。多数人问怎么自动化，不要这样做。自动复盘会找出误报，反复“修复”，把仓库带向不该去的方向。相反，有空时抽样复盘一些会话，或在智能体行为古怪时回顾那次会话。

`/ask-matt` 现在把 `/retro` 放在主要流程最后，位于 `/code-review` 之后。也会引导你运行 `/retro`，接在 `/diagnosing-bugs` 之后，追问怎样本可避免这个 bug。

## [移除：`/resolving-merge-conflicts`](#removed-resolving-merge-conflicts)

合并冲突解决属于执行框架职责，不属于 Skill。没人会选择不解决冲突，而智能体无需专用 Skill 就能处理正在进行的 merge 或 rebase。没有替代 Skill。它从 Claude Code 插件、README 和 `/ask-matt` 中移除。

较弱模型上，你可能仍需要它。[归档文档页](/skills-resolving-merge-conflicts)仍保留，可以把 Skill 复制进仓库。

## [调整：Skills 调用 Skill 工具](#changed-skills-call-the-skill-tool)

一个 Skill 使用另一个时，现在写 `Call the Skill tool with "grilling"`，不再写“run the `/grilling` skill”。只在文字中提名字，不保证真正加载。这是 `/grill-with-docs` 最常被报告问题的原因。新写法也不依赖宿主，不假定 Claude Code 的 `/` 语法。

中文 Prompt（译注，对应新写法）：

```text
调用 Skill 工具，参数为 "grilling"。
```

中文 Prompt（译注，对应旧写法）：

```text
运行 /grilling Skill。
```

Skill 不能调用用户触发型 Skill。因此，需要 `/setup-matt-pocock-skills` 时，现在会告诉你去运行。

## [其他小调整](#changed-smaller-items)

- **六个 Skills 恢复安装。** `description` 中未加引号的冒号影响了 `to-spec`、`code-review`、`setup-matt-pocock-skills`、`writing-fragments`、`writing-shape` 和 `wait-what`，导致 YAML 无效，`npx skills` 跳过了它们。已修复。
- **不再使用长破折号。** 仓库每个长破折号都经过人工改写。
- `/grilling` 在同轮问题之间加水平分隔线。
- `/domain-modeling` 会在讨论代码库术语，或编辑 `GLOSSARY.md`、ADR 时触发。
- `/diagnosing-bugs` 不再在结尾交给 `/improve-codebase-architecture`，那一步很少被触发。第六阶段现在只做清理。
- `/wait-what` 在多领域仓库中沿 `GLOSSARY-MAP.md` 找到正确的 `GLOSSARY.md`。

AI Hero · 免费邮件课程

### 为认真做工程的人准备的 AI Skills

建立可重复使用的编码智能体工作流程，同时坚持你的工程标准。

译注：这处固定来源只有课程推广文案，没有课程入口。

**分享**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-v13-implement-spec-pr-retro-and-glossary-mdv1.3%3A%20%2Fimplement-spec%2C%20%2Fpr%2C%20%2Fretro%2C%20and%20GLOSSARY.md%20%20by%20%40mattpocockuk)[分享到 Bluesky](https://bsky.app/intent/compose?text=v1.3%3A%20%2Fimplement-spec%2C%20%2Fpr%2C%20%2Fretro%2C%20and%20GLOSSARY.md%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-v13-implement-spec-pr-retro-and-glossary-md)[分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/skills/skills-changelog-v13-implement-spec-pr-retro-and-glossary-md?author=Matt Pocock>)

复制网址：[原站文章地址](https://www.aihero.dev/skills/skills-changelog-v13-implement-spec-pr-retro-and-glossary-md)

译注：相关中文词条：[子智能体](/ai-coding-dictionary/subagent)、[自动检查](/ai-coding-dictionary/automated-check)、[人工参与](/ai-coding-dictionary/human-in-the-loop)。中文页未接入时会回到原站英文页。本页未执行升级、重命名或删除，也未验证文中模型的当前表现。
