---
title: "/pr Skill"
slug: "skills-pr"
type: "post"
description: "Pull request 正文应该怎样组织。"
updatedAt: "2026-10-05T08:28:22.543Z"
---

## 它能做什么

`pr` 定义 pull request 正文的结构：用 **Summary，改动摘要** 展示变化，用 **Evidence，验证证据** 证明有效，再用 **Merge Danger，合并风险** 判断落地的风险。它是格式参考，不是工作流程。不会推送分支、创建 PR，也不会决定 PR 包含哪些内容。它告诉[智能体](https://www.aihero.dev/ai-coding-dictionary/agent)，撰写 PR 正文时应该写成什么样。

摘要应当是可视化表达，而非一段文字。普通 PR 正文会用文字描述 diff；本 Skill 会选择能把重点讲清楚的**最小视图**，例如伪代码、调用树、组件树、文件树、Mermaid 图或经过整理的 diff，再配少量说明。审阅者已经打开了 diff，正文要让他们在阅读细节之前先看懂整体结构。

译注：PR 是请求把一个分支的修改合入另一个分支，供他人审阅；diff 是修改前后的差异。Mermaid 是用文字描述关系、再渲染成图的格式。

## 什么时候该用它

输入 `/pr`；智能体撰写任何 PR 正文时，也会自动使用它。

| 你的情况 | 使用什么 |
| --- | --- |
| 分支已准备好，需要一份便于审阅者快速浏览的正文 | `pr` |
| 代码已写好，但还没人审阅 | 先用 [code-review](https://aihero.dev/skills-code-review)，再用 `pr` |
| PR 已创建，开始收到审阅意见 | 这套 Skills 暂时没有对应功能；`pr` 只写正文 |

## 模板

按以下顺序分三节：

- **Summary，改动摘要**：一个或几个小型视图，每个紧邻它所支持的简短说明。通常选一个，有时选几个，很少全部都用。只保留审阅者需要了解的调用、文件、属性和边界。
- **Evidence，验证证据**：展示前后对比。如果修改的是视觉效果，而且[环境](https://www.aihero.dev/ai-coding-dictionary/environment)能截图，截图就是最有力的证据。否则，用伪代码写出此前失败、如今通过的那个确切测试，或展示发生变化的控制台输出。
- **Merge Danger，合并风险**：说明这次修改是**单向门**还是**双向门**，以及它的**影响范围**。双向门容易撤销；单向门则不然，例如会破坏数据的迁移、移除公开 API，或难以逆转的决定。影响范围说明改错了可能破坏什么，例如布局位移、API 调用方或移动端适配。

单向门与双向门的判断，是这里的核心概念。它把“能安全合并吗”从直觉变成一项明确主张，审阅者可以反驳，也知道应把[人工审阅](https://www.aihero.dev/ai-coding-dictionary/human-review)精力花在哪里。影响范围小的双向门可以快速查看；单向门则要仔细读。

## 常见问题

**能相信智能体自己对单向门、双向门的判断吗？**

不能盲信，这也正是要把判断写出来的原因。写代码的智能体也在给自己的工作评级，所以它说“two-way, small blast radius”时，尤其要留心。

中文理解：容易撤销，影响范围小。

diff 本身也常看不出修改是否可逆。正如一位用户所说，“rolling back a commit won't unsend a batch of emails”。

中文理解：回滚一次提交，不能把已经发出去的一批邮件收回来。

用功能开关控制的发布，也只在第一次以新格式写入数据之前，才仍是双向门。Skill 给智能体的是定义，即破坏性操作和难以逆转的决定属于单向门，而非检查清单，因此应最仔细检查 Merge Danger 这一节。有两件事能帮忙：确保智能体能看到[任务单](https://www.aihero.dev/ai-coding-dictionary/ticket)或[规格](https://www.aihero.dev/ai-coding-dictionary/spec)，而非只有 diff；把仓库里一律视为单向门的修改写在智能体作判断前会读的位置，例如数据库结构迁移、向外发送内容或删除操作。

**它会帮我创建 PR 吗？**

不会。`pr` 只负责正文。[implement](https://aihero.dev/skills-implement) 最后会把修改提交到当前分支。创建 PR 的 Skill 或选项，例如 `/to-pr`，或让 `implement` 创建 PR 而非只提交，仍是未关闭的提案。一位用户的办法是用一句本地规则覆盖 `implement`，要求它创建 PR。[implement-spec](https://aihero.dev/skills-implement-spec) 是例外：任务跟踪系统通过 PR 关闭工作，或你明确要求 PR 时，它会创建草稿 PR。因为 `pr` 可由模型调用，只要你让智能体创建 PR，它就会按这个结构写正文。

**它不会又写出一大堵文字和图吗？**

这个 Skill 就是为了避免那种情况，但仍可能发生。用户对智能体 PR 正文的抱怨很一致：“a long summary but all I need to know is what changed, how it was verified, what could break, and whether it's safe to merge.”

中文理解：摘要很长，但我只需要知道改了什么、怎么验证的、可能坏在哪里，以及能否安全合并。

Skill 要求跳过开场白、简短叙述、选择最小视图，通常一个，很少全部都用。如果仍出现一堆图，就是智能体没遵守。如果正文庞大是因为 diff 庞大，问题在于 PR 太大，`pr` 不会替你拆分。

**仓库已经有 PR 模板，谁优先？**

默认情况下，谁都没有明确优先级。`pr` 有自己的模板，不会寻找 `.github/pull_request_template.md` 或类似文件。多位用户要求它使用仓库模板。如果不处理，智能体就同时面对两份互相竞争的指令。应在仓库的智能体说明文档里解决，例如先填写仓库模板，再把 Summary、Evidence 和 Merge Danger 放在下面。

**输出是 HTML 吗？为什么 Mermaid 图没渲染？**

输出是 Markdown PR 正文，不是 HTML 页面。GitHub 和 GitLab 可以在 PR 描述中渲染 Mermaid，但终端不能，所以智能体在本地展示时，图还是原始文字。使用命令行框架的用户，有的用 ASCII Mermaid 渲染器，有的让智能体给 PR 附上 HTML 版本。Mermaid 只是六种视图之一；调用树、文件树或整理后的 diff，在各处读起来都一样。

**它能筛选后续收到的审阅意见吗？**

不能。它写完正文就结束。用户不止一次要求分流其他开发者或审阅机器人的意见，区分哪些值得处理、哪些不是问题。本 Skill 不做这件事。

**PR 后续变化时，它会持续更新正文吗？**

不会。它只写某个时点的正文，PR 在审阅中变化，正文就会过时。大幅修改后，请智能体重写正文。它又在写 PR 正文，因此会沿用同样的结构。

**改动没有界面，Evidence 写什么？**

除了截图，其余证据都适用。只有视觉变化时，截图才最有力。迁移、后台任务或重构，应展示此前失败、现在通过的确切测试，或变化后的控制台输出。仅说“Tests are green”，也就是“测试都通过了”，只是一项主张，不是前后对比。

**能标明正文由 LLM 撰写吗？**

它自身不会这样做。一位用户在仓库智能体说明中写了长期要求：智能体撰写的每个 issue、评论和 PR 都以披露声明结尾。这样的规则应属于仓库，覆盖智能体发布的一切，而非放进某一类文档的模板。

## 出现这些迹象，就说明它在发挥作用

- 还没打开 diff，只看 Summary 的视图，就知道 PR 改了什么。
- 正文没有开场白，直接从 Summary 标题开始。
- Evidence 展示前后对比，而不是声称测试通过。
- 每个 PR 都说明单向门或双向门，以及影响范围；遇到单向门，你会放慢审阅速度。

## 它处在什么位置

以 PR 交付时，`pr` 位于审阅和复盘之间：`to-spec → to-tickets → implement → code-review → pr → retro`。它可由模型调用，所以即使不在这条链上，只要智能体写 PR 正文，也会自行使用。

- [code-review](https://aihero.dev/skills-code-review) 在前，因为 PR 正文应该描述已经审阅过的 diff。
- [implement](https://aihero.dev/skills-implement) 产出正文所描述的提交。

不确定眼下适合哪个 Skill 时，[ask-matt](https://aihero.dev/skills-ask-matt) 可以帮你从整套 Skills 中选择。

译注：本页相关中文词条：[人工审阅](/ai-coding-dictionary/human-review)、[规格](/ai-coding-dictionary/spec)、[任务单](/ai-coding-dictionary/ticket)。链接优先打开已接入的中文页；尚未接入时会回到原站英文页。
