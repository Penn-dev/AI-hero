---
title: "怎样给 Claude Code 的系统提示瘦身"
slug: "how-to-kill-the-bloat-in-claude-codes-system-prompt"
type: "post"
updatedAt: "2026-07-07T11:51:13.696Z"
---

你发给 Claude Code 的每条消息，都带着一份你看不到的请求内容。不是你写的 Prompt，而是包在它周围的东西：工具定义、技能目录，以及一些你可能从来不用的功能所附带的系统指令。每次请求都会发出去，每一轮都要为它付费。

其中大部分都可以移除。下面六步先教你看清请求里究竟有什么，再用 Claude Code 已有的两类设置精简它。我的配置每轮少了数万 Token。

> 译注：本文完整保留固定原文的工具、配置字段和作者测量，未核验其他版本是否支持，也未实际代理、修改设置或测量费用。原文的计费说法没有进一步区分缓存与套餐等情况，不能据此直接计算你的账单。代理日志可能包含完整消息、代码、工具信息或其他敏感内容；使用前应自行审查脚本与日志处理方式，妥善保管日志，不要公开提交或上传。

## 1. 用 `/context` 测量上下文

在任意 Claude Code 会话中输入 `/context`。它会按系统提示、系统工具、MCP 工具、记忆文件、消息等类别拆分上下文，列出每类的 Token 数与窗口占比。

先记下数字，再改任何设置。最后一步会与这些数字比较。

`/context` 把工具作为一组显示，不会告诉你哪个单独工具最大。它报告的是一个工具总数值，不是排名。下一步来解决这个问题。

## 2. 用日志代理找出占用最多的部分

Claude Code 通过 HTTP 与 Anthropic API 通信，因此可以在中间放一个代理：不改动请求，原样转发；把响应流直接传回来；同时记录经过的内容。CLI 不会察觉区别。

获取 [`proxy.mjs`](https://gist.github.com/mattpocock/5b3d76ea21f5f698aefded47a9cea3b1)。它只有一个文件，没有依赖，只用 Node 内置模块。运行：

```bash
node proxy.mjs
```

在另一个终端里让 Claude Code 连接这个代理，再发一条消息：

```bash
ANTHROPIC_BASE_URL=http://localhost:8787 claude
```

每个请求都会以可读的 Markdown 写入 `./logs/`，终端还会打印按大小排序的表：

```
[agent-proxy] 69 tools · 154,946 tool bytes · 65,538 real input tokens
  Workflow      21229 B  ~5307 tok
  DesignSync     8978 B  ~2245 tok
  Monitor        7767 B  ~1942 tok
  …
```

打开 Markdown 文件读一读：每个工具的完整 Schema、系统提示、消息历史，模型收到的整个请求都在里面。顶部的排序表就是精简清单，你可以准确移除自己不用的工具，而不是凭感觉猜。

现在，你知道了请求里有什么，以及哪些部分最大。接下来两步负责精简。两类设置都放在配置文件中：`~/.claude/settings.json` 对所有项目生效，`.claude/settings.json` 只对单个项目生效。

> 译注：固定来源只链接代理文件，没有提供其正文，本次未下载或审查该脚本，也无法确认“完全透明”等实现承诺。表中带波浪号的是估算 Token 数，real input tokens 则是原文示例标示的实际输入 Token；字节数不能直接当作 Token 数。上面的数字属于作者示例，不是本次测量。

## 3. 用 `disable*` 标志关闭整项功能

某些功能会带上一整组工具与指令。一个标志就能关闭该功能，以及它附带的内容：

- `disableBundledSkills`：一次移除 Anthropic 自带的全部技能，即 `dataviz`、`review`、`init` 目录，但仍可手动输入它们的斜杠命令。
- `disableWorkflows`：移除多智能体的 `Workflow` 工具，它是上表中占用最大的单项。

如果一整项功能没有发挥价值，就可以使用对应标志。

## 4. 用 `deny` 规则移除单个工具

要单独处理工具，可以在 `permissions.deny` 规则中填写不带范围条件的工具名称。这样会把该工具定义从请求内容中移除，Claude 就看不到它：

```json
{
  "permissions": {
    "deny": ["NotebookEdit", "CronCreate"]
  }
}
```

有个细节值得留意：单独的名称，例如 `"NotebookEdit"`，会移除工具；限定范围的规则，例如 `"Bash(rm *)"`、`"Skill(dataviz)"`，会阻止匹配的调用，但工具定义仍留在请求内容里。如果目标是缩小请求，就使用单独的工具名称。

上一步的标志适合先做大范围精简，这里的 deny 规则则处理标志没覆盖到的个别工具。

> 想保留部分技能、移除另一些？`disableBundledSkills` 是全有或全无的开关。要逐个处理，可以用 `skillOverrides` 把技能设为 `"off"`，从请求中移除；或设为 `"user-invocable-only"`，仍能手动输入，但 Claude 看不到它。

## 5. 应用完整配置

前面两步最终得到下面这份配置：把精简所需的标志和 deny 规则放在一起，可以加入 `~/.claude/settings.json`：

```json
{
  "permissions": {
    "deny": [
      "EnterPlanMode",
      "ExitPlanMode",
      "DesignSync",
      "NotebookEdit",
      "SendMessage",
      "PushNotification",
      "RemoteTrigger",
      "ReportFindings",
      "ScheduleWakeup",
      "AskUserQuestion",
      "CronCreate",
      "CronDelete",
      "CronList"
    ]
  },
  "disableBundledSkills": true,
  "disableWorkflows": true,
  "disableRemoteControl": true,
  "disableClaudeAiConnectors": true,
  "disableArtifact": true
}
```

把它当作一份可选菜单，不是必须照抄的处方。先查看自己的请求，就是为了只删掉不用的部分。你使用计划模式，就保留它；你编写 Notebook，就保留 `NotebookEdit`。上面只是我决定移除的清单。

还有一点需要注意：有些东西看起来多余，却是后台任务和多智能体运行所依赖的基础功能，比如任务工具、`Workflow` 和 worktree 工具。如果你用得到，就应保留。

想获得我整套 Claude Code 配置，包括精简系统提示？[/setup-matt-pocock-skills 技能中文页](/skills-setup-matt-pocock-skills)可以一次应用这套配置，也可前往[英文原站技能入口](https://www.aihero.dev/skills-setup-matt-pocock-skills)。

> 译注：这段内容来自原文技能提示框，现改为静态链接，并未运行技能。示例会禁用多项功能，包括计划与提问相关工具；应理解每项影响，并保留已有配置中仍需使用的字段。

## 6. 再用 `/context` 测量

重启 Claude Code，让它重新加载配置，再运行 `/context`。工具数量和 Token 总数应该都会减少。

两次测量的差值，就是此前每轮都发送、现在不再发送的 Token。请求更便宜，模型在读到你的问题前，也少了需要越过的内容。

> 译注：这是作者预期的改善方向，实际差值与费用变化需在自己的配置和计费条件下测量，本次未验证。
