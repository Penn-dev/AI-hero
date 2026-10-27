---
title: "为认真做工程的人准备的 AI Skills"
description: "一套实用的 Skill 体系，帮助工程师在使用 AI 时依然坚持自己的标准。"
url: "https://www.aihero.dev/skills"
rss: "https://www.aihero.dev/skills/rss.xml"
page: 1
totalPages: 1
totalChangelogEntries: 6
---

# 为认真做工程的人准备的 AI Skills

一套实用的 Skill 体系，帮助工程师在使用 AI 时依然坚持自己的标准。

译注：Skill 是提供给智能体的专门说明或可重复工作流程。下方保留原站的分类和资源入口；原站入口不代表相关内容已经提供中文版本。

## 安装 Skills

### 安装 Skills，推荐方式

选择你使用的 Skills 和智能体。安装程序会把可编辑的文件写入你的项目。

```bash
npx skills@latest add mattpocock/skills
```

更新命令：`npx skills update`。

### Claude Code 插件

从官方插件市场安装完整套装，作为受管理的只读插件使用。

```bash
claude plugins install mattpocock-skills
```

插件会自动更新。

源代码：[https://github.com/mattpocock/skills](https://github.com/mattpocock/skills)

译注：第一种方式让你直接编辑项目内的 Skill 文件；第二种由插件管理更新。命令按固定来源保留，本页没有执行安装，也没有验证你电脑上的 Node.js/npm 或 Claude Code 环境。

### 精选 Skills

- [`/grill-me`](https://www.aihero.dev/skills-grill-me)
- [`/grill-with-docs`](https://www.aihero.dev/grill-with-docs)
- [`/domain-model`](https://www.aihero.dev/skills-domain-model)
- [`/to-prd`](https://www.aihero.dev/skills-to-prd)
- [`/to-issues`](https://www.aihero.dev/skills-to-issues)
- [`/tdd`](https://www.aihero.dev/skills-tdd)
- [`/triage`](https://www.aihero.dev/burn-through-your-backlog-with-my-triage-skill)

译注：以上名称和去向沿用固定来源，其中有旧名称。本站同时收录了 domain-modeling、to-spec、to-tickets 等较新文档；这里没有擅自把原站入口替换成其他页面。

## Skills 分类

### [入门](https://www.aihero.dev/getting-started~svvtb)

先完成一次设置，再熟悉使用路线。

Markdown：https://www.aihero.dev/getting-started~svvtb.md

### [主要流程](https://www.aihero.dev/the-main-flow-jnjkc)

按顺序走完从想法到交付的主要步骤。

Markdown：https://www.aihero.dev/the-main-flow-jnjkc.md

### [梳理方向](https://www.aihero.dev/shaping-we1mv)

探索一个开放问题，得出决定或答案，再带回主要流程。

Markdown：https://www.aihero.dev/shaping-we1mv.md

### [工程维护](https://www.aihero.dev/upkeep~6heor)

维护代码库和问题清单的健康状态，为主要流程发现需要做的工作。

Markdown：https://www.aihero.dev/upkeep~6heor.md

### [效率 Skills](https://www.aihero.dev/productivity-skills~3cn9f)

由你运行、面向人的工作流程，不涉及代码。

Markdown：https://www.aihero.dev/productivity-skills~3cn9f.md

### [参考类 Skills](https://www.aihero.dev/reference-skills-fshcd)

可供其他 Skills 调用或引用的共享参考资料。

Markdown：https://www.aihero.dev/reference-skills-fshcd.md

## 熟悉这套方法

- **从这里开始**：[我每天使用的 5 个智能体 Skills](https://www.aihero.dev/5-agent-skills-i-use-every-day)
- **原则**：[构建 AI 智能体喜欢的代码库](https://www.aihero.dev/how-to-make-codebases-ai-agents-love)
- **实际使用**：[我的 Grill Me Skill 火了](https://www.aihero.dev/my-grill-me-skill-has-gone-viral)

## 更新日志，第 1 页，共 1 页

### [v1.3：/implement-spec、/pr、/retro，以及 GLOSSARY.md](https://www.aihero.dev/skills/skills-changelog-v13-implement-spec-pr-retro-and-glossary-md)

_2026 年 10 月 5 日_

Skills v1.3：/implement-spec 实现整份规格；/pr 撰写便于审阅的 PR 正文；/retro 改善智能体的工作环境；CONTEXT.md 改为 GLOSSARY.md。

### [v1.2：/wait-what、/writing-for-agents、Claude Code 插件，以及其他更新](https://www.aihero.dev/skills/skills-changelog-v12-wait-what-writing-for-agents-claude-code-plugin-and-more)

_2026 年 8 月 5 日_

了解 Matt Pocock 的 Skills v1.2.0：新文档、Claude Code 集成、用于应对 Opus 啰嗦表达的 Wait What Skill，以及其他更新。

### [v1.1：/wayfinder、/to-spec、/to-tickets、/grilling 改进，以及更多内容](https://www.aihero.dev/skills/skills-changelog-v1-1-wayfinder-to-spec-to-tickets-grilling-improvements)

_2026 年 7 月 8 日_

Skills v1.1 已发布：了解用于 AI 编程的新智能体 Skills，包括用于规划的 Wayfinder、规格改进，以及 TDD 重构。

### [v1：Token 减少 63%、/ask-matt、/writing-great-skills](https://www.aihero.dev/skills/skills-changelog-v1-announcement)

_2026 年 6 月 18 日_

Skills v1.0 更新：Token 减少 63%，新增流程选择 Skill、领域建模和代码库设计。现在即可通过 npx 安装。

### [Skills 更新日志：/handoff、/prototype、/review 和 /writing](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing)

_2026 年 5 月 11 日_

两个新的 AI 智能体 Skills：/handoff 用于在智能体之间传递上下文；/prototype 用于构建用完即可丢弃的原型，验证设计决定。

### [Skills 更新日志：从统一领域语言到 /grill-with-docs](https://www.aihero.dev/skills/skills-changelog-ubiquitous-language-grill-with-docs)

_2026 年 4 月 30 日_

Skills 仓库更新：/grill-with-docs、架构决策记录（ADR）、更清楚的架构语言、多个任务跟踪系统支持，以及新的调试 Skills。详情见正文。

译注：本页相关中文词条：[Skill](/ai-coding-dictionary/skill)、[智能体](/ai-coding-dictionary/agent)。链接优先打开已接入的中文页；尚未接入时会回到原站英文页。
