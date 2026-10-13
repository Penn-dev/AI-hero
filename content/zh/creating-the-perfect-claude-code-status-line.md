---
title: "打造理想的 Claude Code 状态栏"
slug: "creating-the-perfect-claude-code-status-line"
type: "post"
description: "我做了一个显示 Git 信息与上下文用量的 Claude Code 状态栏，下面是逐步配置方法。"
tags:
  - set-up-your-agent
updatedAt: "2025-10-28T14:40:22.539Z"
---

我觉得自己做出了理想的 Claude Code 状态栏：

```
matt/course-video-manager | main | S: 0 | U: 1 | A: 0 | 17.3%
```

首先，它显示当前仓库相对于存放各个仓库的目录的路径，这里是 `matt/course-video-manager`。如果你和我一样，大概也会把所有仓库放在同一个目录下。

所以，我把状态栏设为只显示相对于 `~repos/` 目录的路径。

然后是 Git 信息：

```
main | S: 0 | U: 1 | A: 0
```

这里显示当前分支，以及已暂存、未暂存和新增的改动。这部分可有可无，但只用终端、不打开 IDE 时，我很喜欢随时能看到 Git 的状态。

最后，也是最重要的，是这次会话已经用掉的上下文窗口百分比：

```
17.3%
```

我总是在担心这件事。我希望上下文越少越好，因为往窗口里放的内容越多，AI 表现就越差。

这个数字随时都在眼前，我能一直留意它，心想“嗯，差不多到 60 就该停了”，感觉实在太好了。

> 译注：以上是作者的个人工作习惯与经验判断，60% 不是所有模型或任务通用的性能分界。原文这里写 ~repos/，后面的脚本实际使用用户主目录下的 repos，也就是 ~/repos/；此处保留原写法并明确差别。状态栏的 A 在脚本中统计未跟踪文件，而不是所有形式的“新增改动”。

## Claude Code 状态栏应该显示什么

有用的状态栏，应当显示你在决定下一步之前需要了解的事实。

对我来说，就是：

- 当前在哪个仓库
- 当前在哪个 Git 分支
- 有没有已暂存或未暂存的改动
- 这次会话用了多少上下文窗口

仓库和 Git 状态帮助我避免在错误位置工作。上下文百分比则帮助我判断，是继续、压缩上下文，还是交接给新会话。

具体格式没有那么重要，关键是这些信号随时可见，不必让 Claude Code 再花一轮去检查。

## 配置是怎样组成的

这套配置使用 `settings.json` 文件，它位于 `.claude` 目录中：

```json
{
  "hooks": {}
```

原文说，可以看到它会运行 `bash ~/.claude/statusline-wrapper.sh`。这个包装脚本会调用一个状态栏命令脚本。

此外，还会取得名为 `ccStatusLine` 的 CLI 输出，用它获取上下文百分比：

```json
{
  "version": 3,
  "lines": [
    [
      {
        "id": "1",
        "type": "context-percentage",
        "color": "yellow",
        "bold": true,
        "rawValue": true
      }
```

最后，把这些文件的输出组合起来。

> 译注：上面两段 JSON 在固定原文中就是不完整片段。第一段只含 hooks 开头，实际看不到正文提及的包装脚本配置；后文第 6 步才给出 statusLine 配置。此处不补造或静默修复这两段代码，不能直接当完整 JSON 使用。

## 自己试一试

如果想自行配置，可以按以下步骤操作。

### 第 1 步：安装 ccstatusline

先全局安装 ccstatusline 包：

```bash
npm install -g ccstatusline
```

### 第 2 步：配置 ccstatusline

在 `~/.config/ccstatusline/settings.json` 创建配置文件：

```json
{
  "version": 3,
  "lines": [
    [
      {
        "id": "1",
        "type": "context-percentage",
        "color": "yellow",
        "bold": true,
        "rawValue": true
      }
    ],
    [],
    []
  ],
  "flexMode": "full-minus-40",
  "compactThreshold": 60,
  "colorLevel": 2,
  "inheritSeparatorColors": false,
  "globalBold": false,
  "powerline": {
    "enabled": false,
    "separators": [""],
    "separatorInvertBackground": [
      false
    ],
    "startCaps": [],
    "endCaps": [],
    "autoAlign": false
  }
}
```

关键是 `"rawValue": true`，它只显示百分比，不带 “Ctx:” 标签；以及 `"bold": true`，原文说它用来匹配 Git 数字的颜色。

> 译注：bold 字段表示加粗，颜色另由 color 字段控制。这里保留原文对颜色的说法并说明区别，不静默改写代码或其解释。

### 第 3 步：创建 Git 状态脚本

创建 `~/.claude/statusline-command.sh`：

```bash
#!/bin/bash

# Read JSON input
input=$(cat)

# Extract values from JSON (without jq)
cwd=$(echo "$input" | sed -n 's/.*"current_dir":"\([^"]*\)".*/\1/p')

# Git information (skip optional locks for performance)
if git -C "$cwd" rev-parse --git-dir > /dev/null 2>&1; then
  # Get repo name relative to ~/repos/
  repo_name=$(echo "$cwd" | sed "s|^$HOME/repos/||")

  # Get branch
  branch=$(git -C "$cwd" --no-optional-locks rev-parse --abbrev-ref HEAD 2>/dev/null)

  # Count staged files
  staged=$(git -C "$cwd" --no-optional-locks diff --cached --name-only 2>/dev/null | wc -l)

  # Count unstaged files (modified + deleted, not untracked)
  unstaged=$(git -C "$cwd" --no-optional-locks diff --name-only 2>/dev/null | wc -l)

  # Count untracked files
  untracked=$(git -C "$cwd" --no-optional-locks ls-files --others --exclude-standard 2>/dev/null | wc -l)

  printf '\033[01;36m%s\033[00m | \033[01;32m%s\033[00m | S: \033[01;33m%s\033[00m | U: \033[01;33m%s\033[00m | A: \033[01;33m%s\033[00m' \
    "$repo_name" "$branch" "$staged" "$unstaged" "$untracked"
else
  # Not a git repo
  printf '\033[01;36m%s\033[00m' "$cwd"
fi
```

**注意**：如果你的仓库放在其他目录，请相应修改原文所说第 12 行附近的 `~/repos/` 路径。

> 译注：脚本中实际参与路径替换的是 $HOME/repos/；原文用 ~/repos/ 描述同一个主目录路径。行号只是原文提示，修改时应以实际代码位置为准。脚本用 sed 从 JSON 文本提取字段，没有提供完整 JSON 解析方案。

### 第 4 步：创建包装脚本

创建 `~/.claude/statusline-wrapper.sh`：

```bash
#!/bin/bash

# Read JSON input once
input=$(cat)

# Get git info from existing script
git_info=$(echo "$input" | bash ~/.claude/statusline-command.sh)

# Get context percentage from ccstatusline
context_pct=$(echo "$input" | npx ccstatusline)

# Combine outputs
printf '%s | %s' "$git_info" "$context_pct"
```

### 第 5 步：为脚本添加执行权限

```bash
chmod +x ~/.claude/statusline-command.sh
chmod +x ~/.claude/statusline-wrapper.sh
```

### 第 6 步：更新 Claude 配置

把以下内容添加到 `~/.claude/settings.json`：

```json
{
  "statusLine": {
    "type": "command",
    "command": "bash ~/.claude/statusline-wrapper.sh"
  }
}
```

### 第 7 步：重启 Claude Code

重启 Claude Code，就能看到新状态栏了！

> 译注：这是原文描述的预期结果，不是本次运行结论。本文未安装包、写入配置、更改执行权限或验证状态栏。需要可用的 Node/npm、Git 和 Bash 环境；向已有配置加入字段时要保留其他设置，不能直接用示例覆盖整个文件。前文 ccStatusLine 与安装包 ccstatusline 的大小写按原文保留。
