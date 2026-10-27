---
title: "把 Claude Code 连接到 GitHub MCP 服务器"
slug: "connect-claude-code-to-github"
type: "post"
description: "通过 GitHub MCP 扩展 Claude Code，了解开发者怎样借助终端应用中的这项集成修改代码库。"
tags:
  - set-up-your-agent
  - connect-tools-mcp
updatedAt: "2025-03-13T11:45:07.526Z"
---

在抽象地解释 MCP 是什么之前，先来看看它实际工作时是什么样。

我是一名开发者，读者也大多是开发者，所以就选一个开发场景。

我们来把 GitHub MCP 服务器连接到 Claude Code。Claude Code 是一款很强大的终端应用，可以用 LLM 修改代码库。

我在原页面上方的视频里演示了完整过程。下面是当时的操作步骤：

> 译注：固定来源没有提供视频文件或可嵌入播放地址，可前往[英文原文](https://www.aihero.dev/connect-claude-code-to-github)查找。以下保留原文时点的命令、包名与交互流程，未重新验证当前版本，也未实际安装、创建令牌或连接 GitHub。文中的令牌值是占位符；访问令牌属于敏感凭据，应自行按最小所需权限创建并妥善保管，不要写入公开仓库或聊天记录。

1. 安装 [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview)。

2. 获取 [GitHub API Key](https://github.com/settings/personal-access-tokens)，并复制到自己的剪贴板。

3. 运行以下命令：

```bash
claude mcp add
```

4. 把 MCP 服务器名称设为 `github-server`。

5. 将作用域设为当前项目。

6. 命令填写 `npx`。

7. 参数填写 `-y @modelcontextprotocol/server-github@latest`。

8. 环境变量填写 `GITHUB_PERSONAL_ACCESS_TOKEN=your-token-here`，其中占位值应由你在自己的环境中替换。

9. 按原文的演示，到这里 MCP 服务器应该就可以使用了。
