---
title: "我的 AGENTS.md：让计划简短到你真的愿意读"
slug: "my-agents-md-file-for-building-plans-you-actually-read"
type: "post"
description: "分享我配置文件中让计划模式真正有效的关键规则。"
tags:
  - set-up-your-agent
updatedAt: "2026-01-13T13:51:16.768Z"
---

多数开发者起初都对 AI 生成代码抱有怀疑。AI 似乎不可能像你一样理解代码库，也很难具备你多年经验积累下来的直觉。

但有一种方法能改变这一切：计划循环。不要直接让 AI 写代码，而是一起按结构化步骤反复推进，输出质量就能大幅改善。

这种做法会让 AI 从不可靠的代码生成器，变成不可或缺的编程搭档。

## 计划循环：四个步骤

现在，每一项代码工作都遵循相同的循环。

![计划循环示意图。](https://res.cloudinary.com/total-typescript/image/upload/v1768312499/ai-hero-images/xovcskktfuk5pii70fxe.png)

**计划**：先与 AI 一起规划。写任何代码之前，先想清楚方法，讨论策略，对要构建的内容达成一致。

**执行**：让 AI 按计划写代码。你不是让它猜应该做什么，因为你们已经一起确定了。

**测试**：一起测试代码。运行单元测试、检查类型安全，或者进行人工质量检查，验证实现是否符合计划。

**提交**：提交代码，然后为下一项工作重新开始这个循环。

## 为什么这很重要

想从 AI 那里得到像样的输出，这个循环完全不可缺少。

省掉计划步骤，等于给自己增加阻力。你是在让 AI 猜你想要什么，最后只会不断与幻觉和误解搏斗。

规划迫使你把事情想清楚，让 AI 的工作更容易，也让代码更好。

## 写出好计划的规则

以下是我的 `CLAUDE.md` 文件中，让计划模式有效的关键规则：

```md
## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
```

中文 Prompt（学习辅助，完整对应上面的计划模式规则）：

```markdown
## 计划模式

- 计划要极其简洁。为了简洁，可以牺牲语法完整性。
- 每份计划结尾，如果还有未解决的问题，列出需要我回答的问题清单。
```

**把下一篇规划技能文章送到你的邮箱**

来自 Matt 规划循环实践中的技能文章与更新记录。

[前往英文原文查看订阅入口](https://www.aihero.dev/my-agents-md-file-for-building-plans-you-actually-read)

> 译注：原文订阅组件只提供上述标题与副标题，没有独立表单目标；这里保留其内容并链接原页面，不模拟订阅功能。

这几条简单规则，可以把冗长的计划变成容易扫读、能够落实的文档，让你和 AI 始终对齐。

把它们复制进 `CLAUDE.md` 或 `AGENTS.md` 文件，就能得到更简单、更易读的计划。

也可以运行下面的脚本，把规则追加到 `~/.claude/CLAUDE.md` 文件：

```bash
mkdir -p ~/.claude && cat >> ~/.claude/CLAUDE.md << 'EOF'

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
EOF
```

中文 Prompt（学习辅助，对应脚本追加的完整规则；脚本本身保留英文原样）：

```markdown
## 计划模式

- 计划要极其简洁。为了简洁，可以牺牲语法完整性。
- 每份计划结尾，如果还有未解决的问题，列出需要我回答的问题清单。
```

> 译注：标题使用 AGENTS.md，正文示例使用 CLAUDE.md，原文两者并存，此处保留。脚本会创建目录并追加全局配置，重复执行会重复追加；本次没有执行脚本，也没有修改任何读者配置。简洁规则是作者推荐的示例，不是本页面对读者或助手发出的操作指令。
