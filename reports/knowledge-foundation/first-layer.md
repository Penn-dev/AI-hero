# 第一层最小公共资料

2026-09-22。状态：**最小粗地图与核心骨架已完成；逐篇生产仍需 G0，网站最终质量未验收。**

[机器可读学习地图](E:/dev/projects/AIHero/content/learning/shared/learning-map.json) · [使用说明](E:/dev/projects/AIHero/content/learning/shared/README.md) · [检查结果](E:/dev/projects/AIHero/reports/knowledge-foundation/first-layer-validation.json)

## 已完成及其用途

186篇均有主题、用途、学习位置和后续缺口入口，原来108篇未分类文章已在补充层完成粗定位。沿用旧清单，不重新抓取或重建来源；没有把粗分类写成正文语义通过。旧清单中的3篇全文、14篇局部是历史阶段覆盖；本轮阅读范围单独记录于 learning-map.json 的 reads，不将两轮数字直接相加。

共享定义沿用29项，新增上下文、工具调用请求、工具结果、工作流、MCP、AI SDK、评估7项。新定义按本地材料限定范围，来源可追溯；没有进行外部官方版本核验或独立语义验收。

| 主题 | 篇数 | 用途 |
| --- | ---: | --- |
| 模型与交互基础 | 50 | 理解模型、消息、上下文和工具之间的关系 |
| 用 AI 协作开发 | 43 | 规划、规则、反馈与受控执行 |
| Skills 与任务方法 | 43 | 把任务指导按需组织和复用 |
| 用代码构建 AI 应用 | 23 | 从文本生成到结构化输出与工具循环 |
| MCP 与外部能力连接 | 12 | 理解连接角色，再按任务读实现与部署 |
| 评估与改进 | 4 | 用明确目标和样例判断输出质量 |
| 应用选择与经验 | 9 | 了解适用场景、取舍及作者经验 |
| 导航与资料入口 | 2 | 查找资料，不作为必修正文 |

## 最小理解顺序

先认识模型、提示词和Token → 理解上下文、执行框架与一次模型请求 → 区分基础指令、调用请求和执行结果。随后按目标选择协作开发、编程构建应用、MCP连接或评估改进分支，不要求依次学完所有分支。

这是概念顺序，不能直接视作已验收课程。学习地图列出的文章只是来源和生产候选；对零编程基础读者，终端、项目、包管理器及JavaScript/TypeScript实操仍须在相关篇目前补齐。

| 阶段 | 能说明什么才算理解 |
| --- | --- |
| 认识模型与文字输入 | 能区分模型、给模型的任务说明与文本计量单位。 |
| 理解信息如何进入模型 | 能区分保存着的聊天记录与本次实际送入模型的信息。 |
| 理解指令、调用和结果 | 能说明模型提出动作后，还需要软件执行并返回结果。 |
| 分支：用 AI 完成开发任务 | 能解释项目规则和按需指导的区别；实际操作前另补项目环境。 |
| 分支：用代码调用模型 | 能说明输入、输出和数据格式；运行前必须补 JavaScript/TypeScript 基础及版本准备。 |
| 分支：连接外部工具 | 能区分协议、工具和执行框架；实现服务前再补编程与部署知识。 |
| 分支：判断应用是否改善 | 能为具体任务写出成功标准并选择有代表性的检查样例。 |

## 共享范围与实质阻塞

- “智能体”在词典中指模型与框架的组合；agent/workflow文章另讨论谁决定步骤。两种语境已分开，不能强行替换。
- 区分任务相关信息、会话存储和单次处理窗口；不把某篇的窗口描述直接套成所有服务的容量公式。
- 工具调用请求不等于动作已执行。消息角色、工具定义注入位置须按具体接口核验。
- LLM文章中的压缩包类比和参数量/速度断言未提升为通用定义，进入该篇生产时另核对。
- 销售页、更新日志、产品预告、视频简介和导航入口已与教学正文区分；只按现有本地文字确认用途，不虚构缺失视频内容。

## 既有首批三篇输入

首批沿用指南、词典、练习三个已存在样本，不增设实验。精简执行包只覆盖词典和练习；指南可复用profile，真正进入生产时再由已有装配器生成输入。

### A Complete Guide To AGENTS.md：PARTIAL

- 已有 profile，但未生成本篇精简执行包；需要生产时复用装配器生成。
- F-system-scope 涉及旧译文，需局部复核；不能照搬金标准事实。
- 正文与实际新增辅助需一并审核。

### Generating Objects via Output：HOLD

- F-version 未决；版本相关断言与运行教学不得放行。
- 示例项目、导入、模型配置不全，不能证明独立运行。
- F-transcript 缺失须明示，不能补写虚构文字稿。

### System prompt：PARTIAL

- 已有B辅助时序歪曲，进入后续生产或审核前处理；本轮不修译文。
- 术语别名及链接匹配存在已知遗漏，自动匹配不能代表概念全覆盖。
- 正文与实际新增辅助需一并审核；最终整页尚未通过。

后续取用时同时读取旧执行包/profile、本篇原文、概念依赖闭包、旧 findings、补充层适用 boundaries 和 firstBatch blockers。旧包没有自动包含本轮补充，不能单独交给生产；主题核心概念也不能全部机械塞进每篇先修。已知B辅助时序问题、术语别名/链接匹配和移动目录落点问题仅保留，未在本轮修复。

## 到这里可以停止

全站先做的粗定位、公共核心词义及关键先修、已有首批输入缺口已落实。非核心概念、完整单篇依赖、版本与运行准备在文章进入生产时定点补齐，无须先精读186篇。

事实错误、关键遗漏、错误先修和运行缺口是实质门；不影响理解的措辞和展示细化可以后调。脚本已检查186篇覆盖与源哈希、引用范围、36个概念的依赖和7阶段顺序、3篇阻塞保留；5个故意损坏样例均被拒绝。语义判断是本任务的范围内判断，尚无独立审核或零基础读者验收。

未建立新翻译链、未测得等质量省Token结论。本轮不修改译文或页面，不启动生产。

## 全站粗地图

每行只说明粗用途与学习位置。正文审读证据、生产前缺口及来源哈希见机器可读记录。

### 模型与交互基础

| 原文 | 用途 | 学习位置 |
| --- | --- | --- |
| [Agent](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/agent.md) | 词条 | 按需查阅 |
| [AI](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/ai.md) | 词条 | 按需查阅 |
| [Attention budget](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/attention-budget.md) | 词条 | 按需查阅 |
| [Attention degradation](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/attention-degradation.md) | 词条 | 按需查阅 |
| [Attention relationship](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/attention-relationship.md) | 词条 | 按需查阅 |
| [Autocompact](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/autocompact.md) | 词条 | 按需查阅 |
| [Cache tokens](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/cache-tokens.md) | 词条 | 按需查阅 |
| [Clearing](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/clearing.md) | 词条 | 按需查阅 |
| [Compaction](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/compaction.md) | 词条 | 按需查阅 |
| [Context](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/context.md) | 词条 | 按需查阅 |
| [Context pointer](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/context-pointer.md) | 词条 | 按需查阅 |
| [Context window](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/context-window.md) | 词条 | 按需查阅 |
| [Contextual knowledge](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/contextual-knowledge.md) | 词条 | 按需查阅 |
| [Effort](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/effort.md) | 词条 | 按需查阅 |
| [Hallucination](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/hallucination.md) | 词条 | 按需查阅 |
| [Harness](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/harness.md) | 词条 | 按需查阅 |
| [Inference](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/inference.md) | 词条 | 按需查阅 |
| [Input tokens](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/input-tokens.md) | 词条 | 按需查阅 |
| [Knowledge cutoff](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/knowledge-cutoff.md) | 词条 | 按需查阅 |
| [Memory system](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/memory-system.md) | 词条 | 按需查阅 |
| [Model](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/model.md) | 词条 | 按需查阅 |
| [Model provider](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/model-provider.md) | 词条 | 按需查阅 |
| [Model provider request](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/model-provider-request.md) | 词条 | 按需查阅 |
| [Next-token prediction](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/next-token-prediction.md) | 词条 | 按需查阅 |
| [Non-determinism](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/non-determinism.md) | 词条 | 按需查阅 |
| [Output tokens](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/output-tokens.md) | 词条 | 按需查阅 |
| [Parameters](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/parameters.md) | 词条 | 按需查阅 |
| [Parametric knowledge](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/parametric-knowledge.md) | 词条 | 按需查阅 |
| [Prefix cache](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/prefix-cache.md) | 词条 | 按需查阅 |
| [Session](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/session.md) | 词条 | 按需查阅 |
| [Smart zone](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/smart-zone.md) | 词条 | 按需查阅 |
| [Sycophancy](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/sycophancy.md) | 词条 | 按需查阅 |
| [System prompt](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/system-prompt.md) | 词条 | 按需查阅 |
| [Token](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/token.md) | 词条 | 按需查阅 |
| [Tool](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/tool.md) | 词条 | 按需查阅 |
| [Tool call](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/tool-call.md) | 词条 | 按需查阅 |
| [Tool result](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/tool-result.md) | 词条 | 按需查阅 |
| [Training](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/training.md) | 词条 | 按需查阅 |
| [Turn](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/turn.md) | 词条 | 按需查阅 |
| [Anthropic thinks you should build agents like this](E:/dev/projects/AIHero/content/source/building-effective-agents.md) | 概念解释 | 基础正文候选 |
| [Google's Introduction To Agents Is GREAT](E:/dev/projects/AIHero/content/source/google-agents-whitepaper-review.md) | 外部资源介绍 | 可选背景 |
| [LLM Fundamentals](E:/dev/projects/AIHero/content/source/llm-fundamentals.md) | 系列介绍 | 主题入口 |
| [Messages, System Prompts and Reasoning Tokens](E:/dev/projects/AIHero/content/source/messages-system-prompts-and-reasoning-tokens.md) | 概念解释 | 基础正文候选 |
| [STORM: Generate High-Quality Articles Based On Real Research](E:/dev/projects/AIHero/content/source/storm-generate-high-quality-articles-based-on-real-research.md) | 外部资源介绍 | 可选背景 |
| [Here's 2024's best resource on prompt engineering](E:/dev/projects/AIHero/content/source/the-prompt-report.md) | 外部资源介绍 | 可选背景 |
| [What Are Tokens?](E:/dev/projects/AIHero/content/source/what-are-tokens.md) | 概念解释 | 基础正文候选 |
| [What Are Tools?](E:/dev/projects/AIHero/content/source/what-are-tools.md) | 概念解释 | 基础正文候选 |
| [What Is An Agent?](E:/dev/projects/AIHero/content/source/what-is-an-agent.md) | 概念解释 | 基础正文候选 |
| [What Is An LLM?](E:/dev/projects/AIHero/content/source/what-is-an-llm.md) | 概念解释 | 基础正文候选 |
| [What Is The Context Window?](E:/dev/projects/AIHero/content/source/what-is-the-context-window.md) | 概念解释 | 基础正文候选 |

### 用 AI 协作开发

| 原文 | 用途 | 学习位置 |
| --- | --- | --- |
| [A Complete Guide To AGENTS.md](E:/dev/projects/AIHero/content/source/a-complete-guide-to-agents-md.md) | 操作或方法指南 | 分支学习 |
| [AFK](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/afk.md) | 词条 | 按需查阅 |
| [Agent mode](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/agent-mode.md) | 词条 | 按需查阅 |
| [AGENTS.md](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/agents-md.md) | 词条 | 按需查阅 |
| [Automated check](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/automated-check.md) | 词条 | 按需查阅 |
| [Automated review](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/automated-review.md) | 词条 | 按需查阅 |
| [AX](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/ax.md) | 词条 | 按需查阅 |
| [Design concept](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/design-concept.md) | 词条 | 按需查阅 |
| [DX](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/dx.md) | 词条 | 按需查阅 |
| [Environment](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/environment.md) | 词条 | 按需查阅 |
| [Filesystem](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/filesystem.md) | 词条 | 按需查阅 |
| [Handoff](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/handoff.md) | 词条 | 按需查阅 |
| [Handoff artifact](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/handoff-artifact.md) | 词条 | 按需查阅 |
| [Human-in-the-loop](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/human-in-the-loop.md) | 词条 | 按需查阅 |
| [Human review](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/human-review.md) | 词条 | 按需查阅 |
| [Permission mode](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/permission-mode.md) | 词条 | 按需查阅 |
| [Permission request](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/permission-request.md) | 词条 | 按需查阅 |
| [Primary source](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/primary-source.md) | 词条 | 按需查阅 |
| [Prototyping](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/prototyping.md) | 词条 | 按需查阅 |
| [Sandbox](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/sandbox.md) | 词条 | 按需查阅 |
| [Secondary source](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/secondary-source.md) | 词条 | 按需查阅 |
| [Spec](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/spec.md) | 词条 | 按需查阅 |
| [Subagent](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/subagent.md) | 词条 | 按需查阅 |
| [Ticket](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/ticket.md) | 词条 | 按需查阅 |
| [Vibe coding](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/vibe-coding.md) | 词条 | 按需查阅 |
| [Creating The Perfect Claude Code Status Line](E:/dev/projects/AIHero/content/source/creating-the-perfect-claude-code-status-line.md) | 操作或方法指南 | 分支学习 |
| [Essential AI Coding Feedback Loops For TypeScript Projects](E:/dev/projects/AIHero/content/source/essential-ai-coding-feedback-loops-for-type-script-projects.md) | 操作或方法指南 | 分支学习 |
| [Getting Started With Ralph](E:/dev/projects/AIHero/content/source/getting-started-with-ralph.md) | 操作或方法指南 | 分支学习 |
| [Here's How To Stream Claude Code With AFK Ralph](E:/dev/projects/AIHero/content/source/heres-how-to-stream-claude-code-with-afk-ralph.md) | 操作或方法指南 | 分支学习 |
| [How To Kill The Bloat In Claude Code's System Prompt](E:/dev/projects/AIHero/content/source/how-to-kill-the-bloat-in-claude-codes-system-prompt.md) | 操作或方法指南 | 分支学习 |
| [How To Make Codebases AI Agents Love](E:/dev/projects/AIHero/content/source/how-to-make-codebases-ai-agents-love.md) | 操作或方法指南 | 分支学习 |
| [How To Use Claude Code Hooks To Enforce The Right CLI](E:/dev/projects/AIHero/content/source/how-to-use-claude-code-hooks-to-enforce-the-right-cli.md) | 操作或方法指南 | 分支学习 |
| [My 7 Phases Of AI Development](E:/dev/projects/AIHero/content/source/my-7-phases-of-ai-development.md) | 操作或方法指南 | 分支学习 |
| [My AGENTS.md file for building plans you actually read](E:/dev/projects/AIHero/content/source/my-agents-md-file-for-building-plans-you-actually-read.md) | 操作或方法指南 | 分支学习 |
| [My Claude Code Cohort - A Teaser](E:/dev/projects/AIHero/content/source/my-claude-code-cohort-a-teaser.md) | 课程销售介绍 | 可选背景 |
| [Never Run Claude /init](E:/dev/projects/AIHero/content/source/never-run-claude-init.md) | 操作或方法指南 | 分支学习 |
| [An Introduction To Plan Mode](E:/dev/projects/AIHero/content/source/plan-mode-introduction.md) | 操作或方法指南 | 分支学习 |
| [Real-world feature build with Claude Code: every step explained](E:/dev/projects/AIHero/content/source/real-world-feature-build-with-claude-code.md) | 视频简介 | 可选背景 |
| [This Hook Stops Claude Code Running Dangerous Git Commands](E:/dev/projects/AIHero/content/source/this-hook-stops-claude-code-running-dangerous-git-commands.md) | 操作或方法指南 | 分支学习 |
| [11 Tips For AI Coding With Ralph Wiggum](E:/dev/projects/AIHero/content/source/tips-for-ai-coding-with-ralph-wiggum.md) | 操作或方法指南 | 分支学习 |
| [Tracer Bullets: Keeping AI Slop Under Control](E:/dev/projects/AIHero/content/source/tracer-bullets.md) | 操作或方法指南 | 分支学习 |
| [Why the Anthropic Ralph plugin sucks (use a bash loop instead)](E:/dev/projects/AIHero/content/source/why-the-anthropic-ralph-plugin-sucks.md) | 经验与观点 | 可选背景 |
| [AI Coding Crash Course](E:/dev/projects/AIHero/content/source/workshops/ai-coding-crash-course.md) | 课程销售介绍 | 可选背景 |

### Skills 与任务方法

| 原文 | 用途 | 学习位置 |
| --- | --- | --- |
| [5 Agent Skills I Use Every Day](E:/dev/projects/AIHero/content/source/5-agent-skills-i-use-every-day.md) | 操作或方法指南 | 分支学习 |
| [Grilling](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/grilling.md) | 词条 | 按需查阅 |
| [Progressive disclosure](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/progressive-disclosure.md) | 词条 | 按需查阅 |
| [Skill](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/skill.md) | 词条 | 按需查阅 |
| [triage: Turn Backlog Mess Into Agent-Ready Work](E:/dev/projects/AIHero/content/source/burn-through-your-backlog-with-my-triage-skill.md) | 功能参考 | 按需查阅 |
| [grill-with-docs: Align Before You Build](E:/dev/projects/AIHero/content/source/grill-with-docs.md) | 功能参考 | 按需查阅 |
| [Learn Anything With My /teach Skill](E:/dev/projects/AIHero/content/source/learn-anything-with-my-teach-skill.md) | 操作或方法指南 | 分支学习 |
| [My 'Grill Me' Skill Went Viral](E:/dev/projects/AIHero/content/source/my-grill-me-skill-has-gone-viral.md) | 操作或方法指南 | 分支学习 |
| [My Skill Makes Claude Code GREAT At TDD](E:/dev/projects/AIHero/content/source/skill-test-driven-development-claude-code.md) | 操作或方法指南 | 分支学习 |
| [AI Skills for Real Engineers](E:/dev/projects/AIHero/content/source/skills.md) | 资料索引 | 按需查阅 |
| [The /ask-matt Skill](E:/dev/projects/AIHero/content/source/skills-ask-matt.md) | 功能参考 | 按需查阅 |
| [AI Skills for Real Engineers](E:/dev/projects/AIHero/content/source/skills-catalog.md) | 资料索引 | 按需查阅 |
| [Skills Changelog: Ubiquitous Language -> /grill-with-docs](E:/dev/projects/AIHero/content/source/skills-changelog-ubiquitous-language-grill-with-docs.md) | 版本更新 | 可选背景 |
| [The /code-review Skill](E:/dev/projects/AIHero/content/source/skills-code-review.md) | 功能参考 | 按需查阅 |
| [The /codebase-design Skill](E:/dev/projects/AIHero/content/source/skills-codebase-design.md) | 功能参考 | 按需查阅 |
| [The /diagnosing-bugs Skill](E:/dev/projects/AIHero/content/source/skills-diagnosing-bugs.md) | 功能参考 | 按需查阅 |
| [The /domain-modeling Skill](E:/dev/projects/AIHero/content/source/skills-domain-modeling.md) | 功能参考 | 按需查阅 |
| [The /grill-me Skill](E:/dev/projects/AIHero/content/source/skills-grill-me.md) | 功能参考 | 按需查阅 |
| [The /grill-with-docs Skill](E:/dev/projects/AIHero/content/source/skills-grill-with-docs.md) | 功能参考 | 按需查阅 |
| [The /grilling Skill](E:/dev/projects/AIHero/content/source/skills-grilling.md) | 功能参考 | 按需查阅 |
| [The /handoff Skill](E:/dev/projects/AIHero/content/source/skills-handoff.md) | 功能参考 | 按需查阅 |
| [The /implement Skill](E:/dev/projects/AIHero/content/source/skills-implement.md) | 功能参考 | 按需查阅 |
| [The /improve-codebase-architecture Skill](E:/dev/projects/AIHero/content/source/skills-improve-codebase-architecture.md) | 功能参考 | 按需查阅 |
| [The /prototype Skill](E:/dev/projects/AIHero/content/source/skills-prototype.md) | 功能参考 | 按需查阅 |
| [The /research Skill](E:/dev/projects/AIHero/content/source/skills-research.md) | 功能参考 | 按需查阅 |
| [The /resolving-merge-conflicts Skill](E:/dev/projects/AIHero/content/source/skills-resolving-merge-conflicts.md) | 功能参考 | 按需查阅 |
| [The /setup-matt-pocock-skills Skill](E:/dev/projects/AIHero/content/source/skills-setup-matt-pocock-skills.md) | 功能参考 | 按需查阅 |
| [The /tdd Skill](E:/dev/projects/AIHero/content/source/skills-tdd.md) | 功能参考 | 按需查阅 |
| [The /teach Skill](E:/dev/projects/AIHero/content/source/skills-teach.md) | 功能参考 | 按需查阅 |
| [The /to-questionnaire Skill](E:/dev/projects/AIHero/content/source/skills-to-questionnaire.md) | 功能参考 | 按需查阅 |
| [The /to-spec Skill](E:/dev/projects/AIHero/content/source/skills-to-spec.md) | 功能参考 | 按需查阅 |
| [The /to-tickets Skill](E:/dev/projects/AIHero/content/source/skills-to-tickets.md) | 功能参考 | 按需查阅 |
| [The /triage Skill](E:/dev/projects/AIHero/content/source/skills-triage.md) | 功能参考 | 按需查阅 |
| [The /wait-what Skill](E:/dev/projects/AIHero/content/source/skills-wait-what.md) | 功能参考 | 按需查阅 |
| [The /wayfinder Skill](E:/dev/projects/AIHero/content/source/skills-wayfinder.md) | 功能参考 | 按需查阅 |
| [The /wizard Skill](E:/dev/projects/AIHero/content/source/skills-wizard.md) | 功能参考 | 按需查阅 |
| [The /writing-for-agents Skill](E:/dev/projects/AIHero/content/source/skills-writing-for-agents.md) | 功能参考 | 按需查阅 |
| [Skills Changelog: /handoff, /prototype, /review and /writing](E:/dev/projects/AIHero/content/source/skills/skills-changelog-handoff-prototype-review-and-writing.md) | 版本更新 | 可选背景 |
| [Skills Changelog: Ubiquitous Language -> /grill-with-docs](E:/dev/projects/AIHero/content/source/skills/skills-changelog-ubiquitous-language-grill-with-docs.md) | 版本更新 | 可选背景 |
| [v1.1: /wayfinder, /to-spec, /to-tickets, /grilling improvements, and much more](E:/dev/projects/AIHero/content/source/skills/skills-changelog-v1-1-wayfinder-to-spec-to-tickets-grilling-improvements.md) | 版本更新 | 可选背景 |
| [v1: 63% Token Reduction, /ask-matt, /writing-great-skills](E:/dev/projects/AIHero/content/source/skills/skills-changelog-v1-announcement.md) | 版本更新 | 可选背景 |
| [v1.2: /wait-what, /writing-for-agents, Claude Code Plugin, and more](E:/dev/projects/AIHero/content/source/skills/skills-changelog-v12-wait-what-writing-for-agents-claude-code-plugin-and-more.md) | 版本更新 | 可选背景 |
| [9 Things People Get Wrong With /grill-me and /grill-with-docs](E:/dev/projects/AIHero/content/source/things-people-get-wrong-with-grill-me-and-grill-with-docs.md) | 操作或方法指南 | 分支学习 |

### 用代码构建 AI 应用

| 原文 | 用途 | 学习位置 |
| --- | --- | --- |
| [Build Your First Agent With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/agents-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Create Embeddings With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/create-embeddings-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Build an Alt Text Generator With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/describe-images-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Generate Arrays With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/generate-arrays-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Generate Enums With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/generate-enums-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Generate Text With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/generate-text-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Implementing Anthropic's "think" Tool In TypeScript](E:/dev/projects/AIHero/content/source/implementing-anthropics-think-tool-in-typescript.md) | 操作或方法指南 | 分支学习 |
| [Securing your AI App with Guardrails](E:/dev/projects/AIHero/content/source/securing-your-ai-app-with-guardrails.md) | 操作或方法指南 | 分支学习 |
| [Streaming In 'Next Question Suggestions' With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/streaming-in-next-question-suggestions-with-the-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Streaming Objects With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/streaming-objects-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Streaming Text With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/streaming-text-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Extract Structured Data From PDF's With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/structured-data-from-pdfs-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Structured Outputs with Vercel's AI SDK](E:/dev/projects/AIHero/content/source/structured-outputs-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Hot-Swap AI Models With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/swap-ai-models-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Adding System Prompts With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/system-prompts-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Tool Calling With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/tool-calls-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Use Local Models With Vercel's AI SDK](E:/dev/projects/AIHero/content/source/use-local-models-with-vercel-ai-sdk.md) | 操作或方法指南 | 分支学习 |
| [Vercel's AI SDK Future-proofs Your AI Stack](E:/dev/projects/AIHero/content/source/vercel-ai-sdk.md) | 经验与观点 | 可选背景 |
| [Working With Message Histories In Vercel's AI SDK](E:/dev/projects/AIHero/content/source/vercel-ai-sdk-messages-array.md) | 操作或方法指南 | 分支学习 |
| [Vercel AI SDK Tutorial](E:/dev/projects/AIHero/content/source/vercel-ai-sdk-tutorial.md) | 系列介绍 | 主题入口 |
| [What Is Vercel's AI SDK?](E:/dev/projects/AIHero/content/source/what-is-the-ai-sdk.md) | 概念解释 | 主题入口 |
| [AI SDK v6 Crash Course](E:/dev/projects/AIHero/content/source/workshops/ai-sdk-v6-crash-course.md) | 课程销售介绍 | 可选背景 |
| [Generating Objects via Output](E:/dev/projects/AIHero/content/source/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k.md) | 课程练习 | 分支学习 |

### MCP 与外部能力连接

| 原文 | 用途 | 学习位置 |
| --- | --- | --- |
| [MCP](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/mcp.md) | 词条 | 按需查阅 |
| [Stateful](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/stateful.md) | 词条 | 按需查阅 |
| [Stateless](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/stateless.md) | 词条 | 按需查阅 |
| [Anthropic's new Model Context Protocol In 2 Minutes](E:/dev/projects/AIHero/content/source/anthropics-new-model-context-protocol-in-2-minutes~hc0tx.md) | 产品预告 | 可选背景 |
| [Connect Claude Code To A GitHub MCP Server](E:/dev/projects/AIHero/content/source/connect-claude-code-to-github.md) | 操作或方法指南 | 分支学习 |
| [How Does The Model Context Protocol Work?](E:/dev/projects/AIHero/content/source/how-does-the-model-context-protocol-work.md) | 概念解释 | 分支学习 |
| [Logging: A Huge MCP Footgun](E:/dev/projects/AIHero/content/source/logging-a-huge-mcp-footgun.md) | 操作或方法指南 | 分支学习 |
| [Serving MCP Servers Over stdout](E:/dev/projects/AIHero/content/source/mcp-server-from-a-single-typescript-file.md) | 操作或方法指南 | 分支学习 |
| [Model Context Protocol Tutorial](E:/dev/projects/AIHero/content/source/model-context-protocol-tutorial.md) | 系列介绍 | 主题入口 |
| [Publish Your MCP Server To NPM](E:/dev/projects/AIHero/content/source/publish-your-mcp-server-to-npm.md) | 操作或方法指南 | 分支学习 |
| [The Problem With MCP: Stateful Servers](E:/dev/projects/AIHero/content/source/the-problem-with-mcp-stateful-server.md) | 操作或方法指南 | 分支学习 |
| [Using MCP Prompts](E:/dev/projects/AIHero/content/source/using-mcp-prompts.md) | 操作或方法指南 | 分支学习 |

### 评估与改进

| 原文 | 用途 | 学习位置 |
| --- | --- | --- |
| [Evalite - an Early Preview](E:/dev/projects/AIHero/content/source/evalite-an-early-preview.md) | 产品预告 | 可选背景 |
| [Evalite v1 Preview: Fast Evals, Built-in Scorers](E:/dev/projects/AIHero/content/source/evalite-v1-preview.md) | 产品预告 | 可选背景 |
| [The Three Types Of Evals](E:/dev/projects/AIHero/content/source/three-types-of-evals.md) | 概念解释 | 分支学习 |
| [Your App Is Only As Good As Its Evals](E:/dev/projects/AIHero/content/source/what-are-evals.md) | 概念解释 | 分支学习 |

### 应用选择与经验

| 原文 | 用途 | 学习位置 |
| --- | --- | --- |
| [2025: The Year Building With GenAI's Gets Boring](E:/dev/projects/AIHero/content/source/2025-the-year-building-with-gen-ais-gets-boring~d53hd.md) | 经验与观点 | 可选背景 |
| [The AI Engineer Roadmap](E:/dev/projects/AIHero/content/source/ai-engineer-roadmap.md) | 系列介绍 | 主题入口 |
| [5 Questions To Ask Before Choosing An LLM](E:/dev/projects/AIHero/content/source/how-to-choose-an-llm.md) | 操作或方法指南 | 分支学习 |
| [17 Techniques For Improving Your LLM-Powered App](E:/dev/projects/AIHero/content/source/how-to-improve-your-llm-powered-app.md) | 操作或方法指南 | 分支学习 |
| [Personal software is INSANE in the age of AI](E:/dev/projects/AIHero/content/source/personal-software-is-insane-in-the-age-of-ai-u2hx2.md) | 经验与观点 | 可选背景 |
| [The AI Engineer Mindset](E:/dev/projects/AIHero/content/source/the-ai-engineer-mindset.md) | 经验与观点 | 可选背景 |
| [9 Ways AI Coding Has Rewired My Brain](E:/dev/projects/AIHero/content/source/ways-ai-coding-has-rewired-my-brain.md) | 经验与观点 | 可选背景 |
| [What Can You Use LLM's For?](E:/dev/projects/AIHero/content/source/what-are-llms-used-for.md) | 概念解释 | 主题入口 |
| [What Is An AI Engineer?](E:/dev/projects/AIHero/content/source/what-is-an-ai-engineer.md) | 概念解释 | 主题入口 |

### 导航与资料入口

| 原文 | 用途 | 学习位置 |
| --- | --- | --- |
| [AI Hero](E:/dev/projects/AIHero/content/source/index.md) | 资料索引 | 按需查阅 |
| [The vocabulary of AI coding, in plain English.](E:/dev/projects/AIHero/content/source/ai-coding-dictionary.md) | 资料索引 | 按需查阅 |

