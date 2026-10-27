---
title: "用这个钩子阻止 Claude Code 执行危险的 Git 命令"
slug: "this-hook-stops-claude-code-running-dangerous-git-commands"
type: "post"
description: "了解如何在 Claude Code 中用 PreToolUse 钩子拦截危险的 Git 命令，减少意外丢失数据的风险。"
tags:
  - set-up-your-agent
updatedAt: "2026-02-10T14:25:36.457Z"
---

我整理了一个技能，用来防止 Claude Code 执行危险的 Git 命令。可以通过 `npx skills add` 添加：

```bash
npx skills add mattpocock/skills/skills/misc/git-guardrails-claude-code
```

Claude 会引导你完成设置：选择只为当前项目安装，还是全局安装、覆盖所有项目，然后自定义要阻止哪些 Git 命令。

> 译注：本文保留作者对技能效果的介绍和原有代码，没有安装技能或测试安全效果。它是一种命令模式拦截措施，不是对所有危险操作的完备防护；安装范围与实际拦截行为需要自行确认。

## 为什么要做这个技能

### 从 Docker Sandbox 说起

最近我一直在试验 [Ralph 风格的工作流（原文）](https://www.aihero.dev/getting-started-with-ralph)，也可阅读[中文入门](/getting-started-with-ralph)。目前我找到的、让 Claude 自主运行最有效的办法，是 [Docker Sandbox](https://docs.docker.com/ai/sandboxes/)。

它允许 Claude Code 在 YOLO 模式下运行，不必每条命令都请求许可，同时通过在 microVM 中运行来保护系统。你可以让智能体无人值守地工作，每隔几分钟回来看看。

代价是什么？Docker Sandbox 并不限制 Claude 能运行什么命令，只隔离命令在哪里运行。

### Docker Sandbox 留下的缺口

问题在于：Git 历史就在那个沙盒文件夹里面。

Docker Sandbox 阻止 Claude 访问项目目录之外的内容，却不能阻止它在目录内部运行破坏性的 Git 命令。一次 `git reset --hard` 或 `git push --force` 就可能毁掉几周的工作。

这个技能用明确的拦截措施补上缺口，阻止 Claude Code 运行危险命令。

> 译注：这里保留原文对沙盒的概述，不代表对任意版本、挂载与网络配置的隔离保证。两条 Git 命令影响范围不同：前者会重置本地索引和工作区，后者可能改写远端分支历史；是否丢失及能否恢复取决于实际状态，原文用“几周工作”强调风险。

## 默认阻止哪些命令

这个技能默认拦截以下危险模式：

- `git push`，包括 `--force` 在内的所有变体
- `git reset --hard`
- `git clean -f` / `git clean -fd`
- `git branch -D`
- `git checkout .` / `git restore .`

这些规则不是说永远不允许执行，而是默认采取安全做法。

安装时可以自定义拦截模式，之后也可以随时编辑。如果你的工作流确实需要 Claude 向远端 PR 推送，可以允许这项操作。

## 工作原理：钩子系统

这个技能使用 `PreToolUse` 钩子，在 Claude 执行 Bash 命令之前进行拦截。

下面是过滤脚本：

```bash
#!/bin/bash

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')

DANGEROUS_PATTERNS=(
  "git push"
  "git reset --hard"
  "git clean -fd"
  "git clean -f"
  "git branch -D"
  "git checkout \."
  "git restore \."
  "push --force"
  "reset --hard"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    echo "BLOCKED: '$COMMAND' matches dangerous pattern '$pattern'. The user has prevented you from doing this." >&2
    exit 2
  fi
done

exit 0
```

脚本读取传入的命令，将其与危险模式列表比对；匹配就阻止执行。

### Claude 会看到什么

Claude 尝试执行被禁止的命令时，会看到清晰的消息：

```
BLOCKED: 'git push origin main' matches dangerous pattern 'git push'.
The user has prevented you from doing this.
```

中文理解（学习辅助，对应完整错误消息）：

```text
已阻止：'git push origin main' 匹配危险模式 'git push'。
用户已禁止你执行此操作。
```

Claude 会理解这个限制，并调整做法。这是强制拦截，不是藏在一段文字里的建议。

## 验证是否生效

安装后，按原文步骤测试：

1. 清空当前对话上下文
2. 要求 Claude 执行 `git push`
3. 观察操作失败，并查看拦截消息

作者认为，这可以确认钩子已启用，Claude 也无法意外绕过它。

> 译注：原文测试会尝试真实的推送命令，不能在有重要远端的仓库里盲目照做。应先确认测试环境与权限，再进行不会影响重要数据的验证。一次命中测试仅证明这次调用被拦截，无法证明所有命令写法和所有执行渠道都被覆盖；这里的 grep 模式匹配并不等同于完整的 Git/Shell 语义分析。原脚本依赖 bash、jq 与 grep，本次没有运行此测试。

## 结语

希望你用得开心！做这类技能很有趣。如果你还想了解更多，欢迎订阅我的邮件通讯。

[前往英文原文查看订阅入口](https://www.aihero.dev/this-hook-stops-claude-code-running-dangerous-git-commands)
