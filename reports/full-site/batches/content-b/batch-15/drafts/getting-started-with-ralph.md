---
title: "Ralph 入门"
slug: "getting-started-with-ralph"
type: "post"
description: "让 AI 编程智能体循环工作：配置 Claude Code、创建 PRD，并在离开键盘时继续构建功能。包含逐步指南。"
tags:
  - build-a-software-factory
updatedAt: "2026-01-08T14:32:16.298Z"
---

[Ralph](https://ghuntley.com/ralph/) 是一种让 AI 编程智能体循环运行的方法。反复执行同一个 Prompt，AI 从 PRD 中自行选择任务，每完成一个功能就提交代码。过一段时间回来，你就能看到完成的代码。

这份指南带你建立第一个 Ralph 循环，使用 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 和 [Docker Desktop](https://docs.docker.com/desktop/)。

我假设你使用 Linux，但也可以把这篇文章交给 AI，让它针对你的操作系统或 AI 编程 CLI 调整步骤。

更多使用技巧，请看[用 Ralph 进行 AI 编程的 11 条建议（中文）](/tips-for-ai-coding-with-ralph-wiggum)（[英文原文](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum)）。

> 译注：本文保留原文时点的安装命令、版本、认证与配置流程，没有运行脚本、登录账户、保存凭据或让模型执行循环。示例会产生文件修改和 Git 提交，并消耗模型用量；需要自行确认权限、任务范围、依赖和费用上限。原文没有附可复现的完整项目或真实运行日志，不能把预期结果视为本次验证结果。

## 1. 安装 Claude Code

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) 是 Anthropic 的智能体编程 CLI。可以安装原生二进制程序：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

安装后如果看到 “command not found: claude”（找不到 claude 命令），把安装位置加入 PATH：

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

也可以通过 [npm](https://www.npmjs.com/package/@anthropic-ai/claude-code) 安装：

```bash
npm i -g @anthropic-ai/claude-code
```

运行 `claude`，使用自己的 Anthropic 账户认证。

## 2. 安装 Docker Desktop

[Docker Desktop](https://docs.docker.com/desktop/) 让 Claude Code 在隔离沙盒中运行。AI 可以执行命令、安装包和修改文件，而不会触碰本机其他部分。

安装 [Docker Desktop 4.50 或更新版本](https://docs.docker.com/desktop/install)，然后运行：

```bash
docker sandbox run claude
```

第一次运行时，需要向 Anthropic 认证。凭据保存在一个 Docker 卷中。

沙盒的主要好处：

- 工作目录在容器内以相同路径挂载
- Git 配置会自动注入，以便正确记录提交作者
- 每个工作区对应一个沙盒，多次运行之间保留状态

更多内容见 [Docker Sandboxes 文档](https://docs.docker.com/ai/sandboxes/)。

> 译注：以上是原文描述的隔离和凭据处理方式，不代表所有当前版本与配置都相同。挂载的项目文件仍会被修改，沙盒也不自动保证 Git 操作安全；实际文件、网络与凭据边界需要单独确认。

## 3. 创建计划文件

Ralph 需要从产品需求文档（PRD）中选择任务。可以手写，但使用 Claude 的[计划模式](https://docs.anthropic.com/en/docs/claude-code/plan-mode)更快。

启动 Claude：

```bash
claude
```

按 `shift-tab` 进入计划模式，反复修改计划，直到满意。

满意后，让 Claude 把计划保存到 `PRD.md`。

再创建一个空进度文件：

```bash
touch progress.txt
```

PRD 定义最终状态，进度文件记录已完成的内容。Claude 每轮都读取两者，找到下一个未完成事项，实现它，再更新进度。

PRD 可以采用任何格式：Markdown 待办列表、JSON 或普通文字。重要的是范围清晰，智能体能够提取出独立任务。写 PRD 的更多建议，见[用 Ralph 进行 AI 编程的 11 条建议](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum)。

## 4. 创建 `ralph-once.sh` 脚本

完全离开键盘之前，先从有人参与的 Ralph 开始。运行脚本，观察，再运行一次。这样能逐渐理解循环怎样工作。

创建 `ralph-once.sh`：

```bash
#!/bin/bash

claude --permission-mode acceptEdits "@PRD.md @progress.txt \
1. Read the PRD and progress file. \
2. Find the next incomplete task and implement it. \
3. Commit your changes. \
4. Update progress.txt with what you did. \
ONLY DO ONE TASK AT A TIME."
```

中文版 Prompt（学习辅助，完整对应脚本中的英文提示，引用路径保留）：

```text
@PRD.md @progress.txt
1. 阅读 PRD 和进度文件。
2. 找到下一项未完成任务，并实现它。
3. 提交你的改动。
4. 在 progress.txt 中记录你做了什么。
一次只做一项任务。
```

关键元素：

| 元素 | 用途 |
| --- | --- |
| `--permission-mode acceptEdits` | 自动接受文件编辑，避免循环停住 |
| `@PRD.md` | 向 Claude 指明需求文档 |
| `@progress.txt` | 在多次运行之间跟踪已完成工作 |
| `ONLY DO ONE TASK` | 要求以小步增量方式提交 |

让脚本可以执行：

```bash
chmod +x ralph-once.sh
```

用 `./ralph-once.sh` 运行，观察 Claude 做了什么，检查提交，再运行一次。

> 译注：原脚本先要求提交，再更新进度文件，没有单独给进度更新安排后续提交；这里保留原步骤，不擅自重排。acceptEdits 的具体权限边界需以所用版本和设置为准，不等于所有操作都已获准。

## 5. 创建 `afk-ralph.sh` 脚本

熟悉有人参与的 Ralph 后，再把它包进循环：

```bash
#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

for ((i=1; i<=$1; i++)); do
  result=$(docker sandbox run claude --permission-mode acceptEdits -p "@PRD.md @progress.txt \
  1. Find the highest-priority task and implement it. \
  2. Run your tests and type checks. \
  3. Update the PRD with what was done. \
  4. Append your progress to progress.txt. \
  5. Commit your changes. \
  ONLY WORK ON A SINGLE TASK. \
  If the PRD is complete, output <promise>COMPLETE</promise>.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "PRD complete after $i iterations."
    exit 0
  fi
done
```

中文版 Prompt（学习辅助，完整对应循环脚本中的英文提示）：

```text
@PRD.md @progress.txt
1. 找到优先级最高的任务，并实现它。
2. 运行测试和类型检查。
3. 更新 PRD，记录已完成的内容。
4. 把进度追加到 progress.txt。
5. 提交你的改动。
只处理一项任务。
如果 PRD 已全部完成，输出 <promise>COMPLETE</promise>。
```

`-p` 标志以打印模式运行 Claude：非交互式，把输出写到标准输出。这样就能捕获结果，检查完成标记。

```bash
./afk-ralph.sh 20
```

去冲杯咖啡，回来看看提交。

| 元素 | 用途 |
| --- | --- |
| `set -e` | 遇到错误时退出 |
| `$1`，即迭代次数 | 限制循环轮数，防止费用失控 |
| `-p` | 打印模式，输出非交互式结果 |
| `<promise>COMPLETE</promise>` | Claude 完成后输出的标记 |

> 译注：迭代上限限制的是次数，并不等于确定的金额或运行时长上限；完成标记是模型输出的信号，也不能代替测试与验收。Shell 的 set -e 行为受语法上下文影响，不能一概视为捕获所有失败的机制。

**Ralph 是循环，技能是里面运行的内容**

看看我在每个 Ralph 循环中使用的斜杠命令和钩子。

[查看技能组合：前往英文原文入口](https://www.aihero.dev/getting-started-with-ralph)

> 译注：这里完整保留原技能推广组件的可见内容，固定来源没有独立按钮目标，故回到原页面。

## 6. 按自己的需要改造

Ralph 只是循环。正因为简单，才有几乎无限的定制空间。

可以替换任务来源。不用本地 PRD，改从 GitHub Issue、[Linear](https://linear.app) 或 [beads](https://github.com/steveyegge/beads) 获取任务。智能体仍然自己决定做什么，只是清单换了位置。

也可以改变输出。每轮不直接提交到 main，而是创建分支、开启 PR，很适合处理积压 Issue。

甚至可以运行完全不同的循环：

| 循环类型 | 做什么 |
| --- | --- |
| 测试覆盖率 | 找出未覆盖的代码行，编写测试，直到达到覆盖率目标 |
| Lint | 逐一修复 lint 错误 |
| 重复代码 | 接入 [jscpd](https://github.com/kucherenko/jscpd)，把重复片段重构成共享工具 |
| 熵 | 扫描代码坏味道并清理 |

凡是符合 “look at repo, improve something, commit” 的任务，都能使用 Ralph。

中文版 Prompt（学习辅助，完整对应上面的任务模式）：

```text
查看仓库，改进某件事，然后提交。
```

想进一步了解反馈循环、任务大小和优先级等内容，请阅读[用 Ralph 进行 AI 编程的 11 条建议](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum)。

想了解更多自主 AI 编程内容？订阅我的[邮件通讯（中文）](/newsletter)（[英文原文](https://aihero.dev/newsletter)），新文章发布时就能收到通知。

**Ralph 在演进，这套工具也一样**

Matt 发布下一项技能或钩子时，第一时间在邮箱里收到。

[前往英文原文查看订阅入口](https://www.aihero.dev/getting-started-with-ralph)

> 译注：原订阅组件的标题、副标题完整保留，没有模拟表单。
