---
title: "v1.2：/wait-what、/writing-for-agents、Claude Code 插件，以及更多变化"
slug: "skills-changelog-v12-wait-what-writing-for-agents-claude-code-plugin-and-more"
type: "page"
updatedAt: "2026-08-05T15:43:10.190Z"
---

[AI Skills 更新日志](/skills)

# v1.2：/wait-what、/writing-for-agents、Claude Code 插件，以及更多变化

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

分享

我的 Skills 1.2 版发布了。这次以 Claude Code 插件形式提供 Skills，为每个 Skill 添加 Codex 元数据，并为整套内容建立了文档站 [aihero.dev/skills](/skills)。插件新增三个 Skills，一个改名，六个移除。

完整改动见 [v1.2.0 发布说明](https://github.com/mattpocock/skills/releases/tag/v1.2.0)。这里讲与你的使用有关的变化。

## [每个 Skill 都有 Codex 元数据](#codex-metadata-on-every-skill)

现在每个 `SKILL.md` 旁边都有 `agents/openai.yaml`。这个配套文件携带 Codex 界面元数据，包括 `interface.display_name`、`interface.short_description`，同一套 Skills 因而能在两个运行环境中使用，不必生成两份副本。

其中最重要的一行是 `policy.allow_implicit_invocation: false`，相当于 Codex 版的 `disable-model-invocation: true`。每个用户调用型 Skill 现在都带这个设置，因此在你输入 `$skill` 之前，Codex 不会把它放入智能体上下文。发布之前，用户调用与模型调用的划分在 Claude Code 中成立，在 Codex 中却不成立。

`AGENTS.md` 是指向 `CLAUDE.md` 的符号链接，因此 Codex 读取相同的仓库指令。

## [aihero.dev/skills 文档站](#documentation-at-aiherodevskills)

![新的 aihero.dev/skills 文档站](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_3840/f_auto/q_auto/v1785944102/ai-hero-images/dj54xx1bhly29e6vwibz?_a=BAVMn6DY0)

从 `/skills` 开始，先看分组。主流程是 `/grill-with-docs` → `/to-spec` → `/to-tickets` → `/implement` → `/code-review`。左侧面板是所有 Skills 的完整参考目录。

每页都有**常见问题**和**出现这些迹象，就说明它在发挥作用**两节。问题来自我的问答 wiki，都是人们真实问过的。术语首次出现时链接到 AI Coding Dictionary，例如 ticket 的链接就指向我对任务单的定义。你既可以用这些文档学习 Skills，也可以借此了解 AI 编程怎样运作。

## [破坏性变更：`/writing-great-skills` → `/writing-for-agents`](#breaking-writing-great-skills-writing-for-agents)

请按新名称重新安装。没有别名，旧名称已移除。

改名是因为适用范围扩大了。现在这份参考资料涵盖智能体会读取的任何文档，不只有 Skills，还包括 `AGENTS.md`、`CLAUDE.md` 以及通过指针找到的文档。可以用它把过载的 `AGENTS.md` 拆成 Skills，避免一开始就把全部内容塞进上下文。

同时有三项结构变化：

- `GLOSSARY.md` 合并进 `SKILL.md`，每个术语只保留一处权威说明。
- 仅适用于 Skills 的机制，例如前置元数据、模型调用与用户调用、路由 Skill、调用前后内容的分界，移到 `SKILL-MECHANICS.md`。
- 该 Skill 允许模型调用。创建或编辑 Skill，或修改 `AGENTS.md` / `CLAUDE.md` 时会触发。

删减内容的章节新增了一个术语：**缓存（cache）**。环境本身就是事实来源，例如 `package.json` 脚本、配置文件、目录布局和 `--help` 输出。文档若只是复述它们，就相当于缓存了一次查询；只有查询成本较高时，加载这份缓存才值得。应该缓存的是智能体光靠查看也找不到的东西：没写下来的惯例、选择背后的理由、配置没有透露的边界情况。只需查一个文件、跑一条命令就能知道的信息，留在环境里，才不会因为另抄一份而过时。

## [新增：`/wait-what`](#new-wait-what)

用一个词纠正模型的啰嗦。某条消息没说到你能理解的程度，马上输入它。智能体会重新讲：补一点背景，使用 ASD-STE100 简化技术英语，并采用 `CONTEXT.md` 中的统一语言。用户调用，只有三行。

机制就在名字里。让表达简洁的 Skills 常因自己越长越长而失败，写到 400 行，模型还是啰嗦。因此这里仅用一个精确、能唤起已有概念的词。按*输出*命名，例如 `/tldr`、`/no-fluff`，会让模型机械删字，使你更跟不上。按*听者的状态*命名，才能同时要求两件事：少说些，**并且**补上你缺的背景。

它修复一条消息，不会预防下一条。术语困扰的根本办法，是提前用 `/grill-with-docs` 建立共同语言。还没有共同语言时，用 `/wait-what`。

译注：wait, what? 是“等等，什么意思？”的口语表达。原文采用简化技术英语标准作为表达提示，此处保留该标准名，并未把它当作中文写作规范。

## [新增：`/wizard`](#new-wizard)

![终端运行交互式 Bash 向导，显示准备开始的提示](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_3840/f_auto/q_auto/v1785944103/ai-hero-images/tjf1n5eaksf50ujr3smh?_a=BAVMn6DY0)

`/wizard` 从 `in-progress/` 转正，进入**工程**分类，并允许模型调用。

它生成交互式 Bash 脚本，带人完成手动流程，例如第三方设置、一次性迁移，或从 A 状态切换到 B 状态。脚本逐个打开网址，说明点哪里，接收你粘贴的值，写入 `.env` 文件或 GitHub Actions secrets。它是确定性脚本，因此按原文的设计，你输入的秘密不会传给智能体。

附带的 `template.sh` 已经处理了交互体验：带剩余时间的进度、确认关口、跨平台打开网址（含 WSL）、隐藏的秘密输入、幂等的 `.env` 更新、可平稳降级的 `gh secret` / `gh variable` 写入，以及最后的跳过项目摘要。`STAGES` 标记之前是固定库，绝不手工修改。Skill 只负责界定流程并编写各阶段。

允许模型调用意味着，智能体碰到只有人能做的步骤，就会使用 `/wizard`，而不是在聊天中丢给你一长串编号指令。手动输入 `/wizard` 的方式不变。描述列出四类触发场景：开通基础设施、设置凭据或 CI secrets、在不熟悉的第三方控制台操作、一次性迁移或切换。也明确列出一个不应触发的情况：智能体自己能做的步骤，不要用它。能由智能体做的，就该由智能体做。`/wizard` 留给那些你不会交给智能体的点击、批准和控制台操作。

译注：幂等更新指重复运行仍得到预期结果，不重复堆入相同配置。本页只翻译脚本设计说明，没有执行脚本或审计具体运行环境；秘密是否确实不被记录仍取决于实际脚本与运行方式，不能仅凭这段介绍认定安全。

## [新增：`/to-questionnaire`](#new-to-questionnaire)

`/to-questionnaire` 从 `in-progress/` 转正，进入**生产力**分类。

遇到无法独自回答的决定，它会写一份 Markdown 问卷，交给真正能回答的那个人。可以异步填写，也可以在会议中一起完成。我是在一次规划花园办公室的 `/wayfinder` 会话里做出它的：智能体一直追问我，但该问的是我妻子。问卷放进 Google 文档，我们一起填，再把答案交回智能体。

它的关键是围绕**发给谁、要回什么**追问你，不是追问主题本身。普通追问深入主题，而这里恰恰是你回答不了主题。所以访谈只问收件人是谁、你需要对方提供什么，再让每个问题对准这两者之间的信息缺口。

`/ask-matt` 把它定位为 `/grill-me` 的反向版本：从别人那里挖信息，不是从你自己这里挖。

## [变化：`/grilling` 改为逐轮提问](#changed-grilling-asks-in-rounds)

`/grilling` 从一次一问改成一轮一轮。同样 13 个问题，大约三轮即可，不必往返 13 次。

Skill 把工作画成一棵**设计树**，每个决定分出依赖它的后续决定。**前沿**就是所有前提已经确定的决定，也就是现在能问、无需猜测尚未听到的答案的问题。它把整个前沿编成一轮编号问题，收到你的答案后重新计算前沿，再问下一轮。某个问题的答案若依赖另一个尚未解决的问题，就留待以后。前沿为空，会话结束。

环境可以回答的事实交给子智能体，因此研究不会阻塞整轮。仍在进行的探索是一项未满足的前提，只有下游问题需要等待，其余前沿现在就问。决定权仍在你手里。

一轮中的每个问题都采用固定格式：

```txt
❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

中文 Prompt（译注，可完整复制，保留格式和编号）：

```text
❓ **Q1** - **<问题标题>**：<问题正文，可以有多个段落，也可以包含多个选项>

➡️ <你推荐的答案>
```

整轮是一份便于扫读的编号列表，每条建议与问题分开。你按编号回答，例如“Q1 agree, Q2 agree, Q3 change this”，很适合口述。

中文 Prompt（译注，对应编号回答示例）：

```text
Q1 同意，Q2 同意，Q3 这里要改。
```

`/grill-me`、`/grill-with-docs`、`/triage` 也逐轮处理前沿。想退出这种方式、恢复一次一问，做法没变：在全局 `CLAUDE.md` 加一句要求。

`/grilling` 也换成更通用的措辞：“This plan”改为“this”，“enact the plan”改为“act on it”，“exploring the codebase”改为“exploring the environment”。方法没有变，只是现在读起来适用于检验任何计划、决定或想法。

中文理解：三处分别从“这个计划”变为“这件事”，从“执行计划”变为“就此采取行动”，从“探索代码库”变为“探索环境”。

## [变化：`/prototype` 产出一个可分享的 HTML 文件](#changed-prototype-produces-one-shareable-html-file)

逻辑原型分支不再生成终端应用，而是生成单个自包含文件，用普通 HTML、CSS 和 JS，无需构建，也无需服务器。非开发者双击打开，便能用自己的领域语言操作：有标签的状态面板、随时可用的自由尝试按钮，以及分标签页的**引导式演练**，每个场景下按顺序排列按钮。可移植的纯逻辑模块仍能提取到正式代码里；可丢弃的是 HTML 外壳。

“可丢弃”不再意味着删除。`/prototype` 的产出保存在从 main 分出的 `prototype/<name>` 分支，成为可运行的证据，并在实现 issue 中留下上下文指针。main 只保留验证后的决定，探索过程仍然可找。答案，也就是结论连同它回答的问题，依旧记录到 issue、ADR 或提交中。

## [变化：`/wayfinder` 的任务单明确称为决策任务单](#changed-wayfinder-tickets-are-decision-tickets)

人们把 `/wayfinder` 任务单读成普通实现任务，以为是一块要执行的构建工作。`/wayfinder` 实际用的是**决策任务单**：解决后得到一项决定的问题。Skill 描述、开头、README 简介和文档页现在都先介绍这个术语。概念建立后，日常仍简称“任务单”；`CONTEXT.md` 将 **Decision ticket** 记为领域术语。

研究任务不再搁置到另一次会话。它仍是正式任务类型，因为确实是多个后续决定共同依赖的阻塞项。变的是解决方式：研究是 AFK 工作，绘图会话不必停下来自己读资料。创建任务后，为每张研究任务启动一个 `/research` 子智能体，并行处理，把发现保存在 `research/<name>` 分支，并留下上下文指针。研究任务是“一次会话一张任务单”的唯一例外。

## [变化：`/ask-matt` 的路由](#changed-ask-matt-routing)

路由新增了**阶段边界**。阶段是一次会话中的一段工作，例如追问、实现或质量检查；阶段交界处，就是决定如何处理已积累上下文的地方。旧的两个要点变成决策树，按顺序列出五种选择：**继续当前会话**、`/clear`、`/handoff`、**子智能体**、`/compact`。理由写在 `PHASE-BOUNDARIES.md`。同时修复三点：

- **之前把 `/handoff` 说得太万能了。** 它适用范围很窄。只有内容要*搬到别处*才需要：另一个运行环境、另一个目录、同事那里，或阶段中途分出的支线任务。
- **`/compact` 是默认兜底，不是第一选择。** 它在决策树最底部。从它开始，会让会话对摘要压平或抹掉的内容产生自信却错误的认识。
- **此前少了两个分支。** 先判断能否**继续**，因为只有继续才能保留对话这一手来源，而不是对话摘要。范围足够明确、可以 AFK 运行的工作交给**子智能体**。

上下文管理的退出手段现在写成 `/compact`，不再是 `/handoff`；高效工作区的参考值从约 120k 改成约 150k Token。

`/wayfinder` 的路由纠正了使用这个最重流程时最常见的两种错误。**用得太多**：`/wayfinder` 比一次追问更慢、更繁重，应留给确实装不进一次会话的想法；范围明确的功能用 `/grill-with-docs`。**交接时走错路**：地图上的待决问题都厘清后，`/wayfinder` 交接，不构建。在 `/to-spec` 汇入主流程，把地图上相互链接的决定收拢成可实施的计划。只有实际工作确实很小时，才直接进入 `/implement`。

过去路由里漏掉的 `/grilling` 和 `/resolving-merge-conflicts` 现在补上了。`/grill-me` 与 `/grill-with-docs` 按是否处在工作目录中区分。

译注：这里的约 150k 是该版本原文给出的参考经验值，并非所有模型都适用的硬阈值或质量保证。

## [变化：其他较小调整](#changed-smaller-items)

- **`/improve-codebase-architecture`** 的探索步骤增加 YAGNI 范围过滤，不再平均扫描整个仓库。你给方向就按方向走；没给则读取最近约 20 条提交说明，优先看活跃开发路径。没人碰的代码里即便有深化模块的机会，重构收益也兑现不了，所以报告不再专门整理沉睡角落。
- **`/setup-matt-pocock-skills`** 更友好了。只有装了 `/triage` 才问分流标签，而且整合成一个建议选“是”的问题。不再询问是否把外部 PR 当作请求入口，该开关默认关闭。领域文档默认单一上下文，除非仓库显示出 monorepo 特征。本地 Markdown 任务是一项一文件，放在 `.scratch/<feature>/issues/<NN>-<slug>.md`，规格文件为 `spec.md`。
- **`/to-prd` → `/to-spec` 的改名完成。** 发布文本只使用“spec”。`/to-spec` 去掉“你可能把它叫 PRD”的开场白，`/code-review` 改说来源 issue/规格，GitHub 与 GitLab 任务模板不再往每个经手仓库写入“PRDs”。

译注：YAGNI 是“你不会需要它”的缩写，这里用于提醒先关注真实需要和活跃工作；monorepo 指在同一仓库管理多个项目或包。

## [移除：六个 Skills](#removed-six-skills)

这六个都不曾在 Claude Code 插件里，但都能通过 [skills.sh](https://skills.sh/mattpocock/skills) 安装，因为该站提供仓库里的每个 Skill。其中四个被能更好完成相同工作的 Skill 吸收：

- **`/ubiquitous-language`** → **`/domain-modeling`**，维护完整领域模型，而不是从一场对话导出一份词汇表就结束。
- **`/design-an-interface`** → **`/codebase-design`**，没有丢失内容，“设计两次”技术随该 Skill 的 `DESIGN-IT-TWICE.md` 提供。
- **`/qa`** → **`/triage`** 与 **`/to-tickets`**。
- **`/request-refactor-plan`** → **`/to-spec`** 与 **`/improve-codebase-architecture`**。

另外两个始终只供我自己使用，与我的电脑绑定。`personal/` 分类随它们一并移除：**`/edit-article`** 与 **`/obsidian-vault`**。

`skills/deprecated/` 保留为空分类。`skills/in-progress/` 没有变化，现在明确说清它的定位：一个有意公开的测试版渠道，可以通过 skills.sh 逐个安装其中的 Skill。

AI Hero · 免费邮件课程

### 面向真正工程师的 AI Skills

为编程智能体建立可重复的工作流，同时守住你的工程标准。

译注：冻结原文此处未含报名按钮目标或表单字段，本页不补造；所有发布状态和产品行为按原文历史版本保留，未声称当前平台仍完全如此。

**分享**

[X 分享](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-v12-wait-what-writing-for-agents-claude-code-plugin-and-morev1.2%3A%20%2Fwait-what%2C%20%2Fwriting-for-agents%2C%20Claude%20Code%20Plugin%2C%20and%20more%20%20by%20%40mattpocockuk) · [Bluesky 分享](https://bsky.app/intent/compose?text=v1.2%3A%20%2Fwait-what%2C%20%2Fwriting-for-agents%2C%20Claude%20Code%20Plugin%2C%20and%20more%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-v12-wait-what-writing-for-agents-claude-code-plugin-and-more) · [LinkedIn 分享](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/skills/skills-changelog-v12-wait-what-writing-for-agents-claude-code-plugin-and-more?author=Matt Pocock>)

复制网址

译注：相关中文词条：[Skill](/ai-coding-dictionary/skill)、[上下文](/ai-coding-dictionary/context)、[AFK](/ai-coding-dictionary/afk)、[子智能体](/ai-coding-dictionary/subagent)、[任务单](/ai-coding-dictionary/ticket)。中文页未接入时会回到原站英文页。
