---
title: "用 Claude Code 钩子强制使用正确的 CLI"
slug: "how-to-use-claude-code-hooks-to-enforce-the-right-cli"
type: "post"
description: "了解怎样用 Claude Code 钩子拦截不希望执行的 CLI 命令，引导 AI 编程智能体使用正确工具，而不只依赖 CLAUDE.md。"
tags:
  - set-up-your-agent
updatedAt: "2026-02-25T10:51:12.741Z"
---

关于 Claude Code，我最常被问到的问题之一是：怎样强制它使用正确的 CLI 命令？

怎样让它用 `pnpm`，而不是 `npm`？怎样让它调用我封装的脚本，而不是直接用 `npx`？又怎样彻底阻止某些命令？

## CLAUDE.md 的问题

最直观的答案，是在 `CLAUDE.md` 文件里加一条指令：

```
Use pnpm instead of npm for all package management tasks.
```

中文 Prompt（学习辅助）：

```text
所有包管理任务都使用 pnpm，不要使用 npm。
```

大多数时候有效，但有两个问题。

**占用指令预算**。只有 Claude 运行包管理命令时，这条指令才相关。放进 `CLAUDE.md`，它却会成为仓库中每项任务的全局上下文。LLM 能有效遵循的指令数量有限，作者估计大约到 500 条就会开始混乱。你应该把这份预算留给规划、实现和架构这些难题，而不是提醒它用哪个包管理器。

**无法保证执行结果**。把 “don't use `git push`”（中文：不要使用 git push）加入 `CLAUDE.md`，会降低发生强制推送的概率，却不能阻止它。你消耗了指令预算，仍然得不到保证。

中文版 Prompt（学习辅助，对应上面这条示例指令）：

```text
不要使用 git push。
```

> 译注：“约 500 条”是原文的经验性说法，不是统一的模型硬上限；原文此处以禁止 push 来讨论强制推送，两种操作并不完全等同。

## Claude Code 钩子：确定性执行的办法

钩子让你能在 Claude Code 执行周期中的特定时间点，运行确定性的代码。它们配置在 `.claude/settings.json` 文件里。

这里要用的是 `PreToolUse`。它在工具调用执行前触发，可以阻止调用。钩子如果以退出码 `2` 结束，操作就会被阻止，错误信息也会反馈给 Claude，让它调整。

下面是一个拦截 Bash 命令的 `PreToolUse` 钩子配置结构：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/enforce-pnpm.sh"
          }
        ]
      }
    ]
  }
}
```

钩子脚本从标准输入接收包含工具名称与参数的 JSON，检查命令，再以退出码 `0` 放行，或以 `2` 阻止：

```sh
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')

if echo "$COMMAND" | grep -qE "^npm "; then
  echo "Blocked: use pnpm instead of npm" >&2
  exit 2
fi

exit 0
```

Claude 看到 “use pnpm instead of npm”（中文：使用 pnpm，不要使用 npm）的消息后，就会改用正确命令重试。这样不需要消耗指令预算，错误命令也无法执行。

> 译注：上句保留作者对效果的表述。原脚本实际只匹配以 npm 加空格开头的字符串，并非完整的 Shell 命令解析器，不能保证阻止所有语法形式或所有执行途径。脚本还依赖 bash、jq 和 grep；需要在自己的环境中验证钩子确实生效，不能仅凭这段示例视为安全隔离。

## Prompt

这些钩子不必手写，Claude Code 已经知道怎样创建。下面的 Prompt 可以直接粘贴给 Claude Code，把 `CLAUDE.md` 中的指令转换成确定性的钩子：

````markdown
Take the instructions in your @CLAUDE.md file and turn them into
deterministic Claude Code hooks in this project directory.

Not all the instructions will be deterministic: only do the ones you can,
such as instructions to use one CLI command over another, or disallowing
certain CLI commands.

Hooks should be added to `.claude/settings.json` under the `hooks` key,
using the `PreToolUse` event with a `Bash` matcher.

Use separate bash scripts in `.claude/hooks/` for running the hooks:

```sh
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')

if echo "$COMMAND" | grep -q "drop table"; then
  echo "Blocked: dropping tables is not allowed" >&2
  exit 2
fi

exit 0
```

First, confirm with the user which hooks will be created.

Second, implement the hooks.

Third, provide the user with instructions to test the newly created hooks
(by restarting Claude Code).
````

中文 Prompt（学习辅助；路径、事件、匹配器以及嵌套示例脚本保持原样）：

````markdown
读取 @CLAUDE.md 文件中的指令，把它们转换成当前项目目录中的确定性 Claude Code 钩子。

不是所有指令都能确定性地执行：只处理能够做到的部分，例如要求使用某个 CLI 命令而不是另一个，或禁止某些 CLI 命令。

把钩子添加到 `.claude/settings.json` 的 `hooks` 键下，使用 `PreToolUse` 事件和 `Bash` 匹配器。

在 `.claude/hooks/` 中使用独立的 bash 脚本来运行钩子：

```sh
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')

if echo "$COMMAND" | grep -q "drop table"; then
  echo "Blocked: dropping tables is not allowed" >&2
  exit 2
fi

exit 0
```

第一，先与用户确认要创建哪些钩子。

第二，实现这些钩子。

第三，告诉用户如何通过重启 Claude Code 来测试新创建的钩子。
````

这份 Prompt 会让 Claude 读取已有的 `CLAUDE.md`，识别哪些指令能够确定性地执行，再把它们转换成 `PreToolUse` 钩子脚本。它要求在创建任何内容前先取得确认，然后引导你完成测试。

> 译注：嵌套脚本的英文错误消息意为“已阻止：不允许删除表”。全文命令与配置只作原文示例展示，本次没有安装钩子、修改权限或测试命令拦截。
