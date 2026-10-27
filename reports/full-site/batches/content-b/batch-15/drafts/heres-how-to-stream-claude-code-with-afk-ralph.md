---
title: "用 AFK Ralph 实时查看 Claude Code 的流式输出"
slug: "heres-how-to-stream-claude-code-with-afk-ralph"
type: "post"
description: "运行 AFK Ralph 时实时查看 Claude Code 输出，使用 jq 过滤信息，不必再盯着空白终端。"
tags:
  - build-a-software-factory
updatedAt: "2026-01-22T09:55:51.743Z"
---

这份指南写给用 Claude Code 试过 Ralph，却遇到这种挫败感的人：AFK 脚本跑起来了，屏幕却一片空白。

如果从没听过 Ralph，先看：

- [Ralph 入门（中文）](/getting-started-with-ralph)（[英文原文](https://www.aihero.dev/getting-started-with-ralph/)）
- [用 Ralph 进行 AI 编程的 11 条建议（中文）](/tips-for-ai-coding-with-ralph-wiggum)（[英文原文](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum)）

## 问题：空白屏幕

想让 Ralph 在你离开键盘时运行，可能会用这样的脚本：

```bash
#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

for ((i=1; i<=$1; i++)); do
  result=$(docker sandbox run --credentials host claude \
    --print \
    "<your prompt here>")

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "Ralph complete after $i iterations."
    exit 0
  fi
done
```

问题令人烦躁：只用 `--print` 标志运行 Claude，没有流式输出，终端会一直空着。

你离开了，却完全不知道发生了什么。Claude 在工作吗？卡住了吗？哪里坏了吗？只有结束后才知道。

AFK Ralph 理想的状态是两者兼得：既能实时看到 Claude 正在做什么，又能在离开时让它继续运行。

> 译注：这是原文针对当时脚本行为的描述，不代表对当前所有 CLI 模式的测试结论。脚本中的 `<your prompt here>` 只是“在此填写你的 Prompt”的占位符，固定来源没有真正的任务提示，不补造其内容。本次未运行脚本或传入宿主机凭据。

## 解决办法：用 jq 处理流

Claude 可以输出 `stream-json` 格式，消息出现时就能收到。但这个输出非常冗长，不容易读。

把 `stream-json` 和 `jq` 过滤组合起来，就能提取有用信息，实时显示在终端中。同时仍保留最终结果，以便检查 `<promise>COMPLETE</promise>` 标记。

完整脚本如下：

```bash
#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

# jq filter to extract streaming text from assistant messages
stream_text='select(.type == "assistant").message.content[]? | select(.type == "text").text // empty | gsub("\n"; "\r\n") | . + "\r\n\n"'

# jq filter to extract final result
final_result='select(.type == "result").result // empty'

for ((i=1; i<=$1; i++)); do
  tmpfile=$(mktemp)
  trap "rm -f $tmpfile" EXIT

  docker sandbox run --credentials host claude \
    --verbose \
    --print \
    --output-format stream-json \
    "<your prompt here>" \
  | grep --line-buffered '^{' \
  | tee "$tmpfile" \
  | jq --unbuffered -rj "$stream_text"

  result=$(jq -r "$final_result" "$tmpfile")

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "Ralph complete after $i iterations."
    exit 0
  fi
done
```

这个脚本接收一个参数：运行多少轮。

> 译注：完整脚本里同样只有任务 Prompt 占位符，没有可替代的具体任务文本。它依赖 Docker Sandbox、Claude Code、Bash、jq、grep、tee 和 mktemp 等工具；版本、认证、项目输入均未完整给出，本次没有安装或执行。

## 逐步理解脚本结构

### 拆解流过滤器

流过滤器完成几件重要的事：

1. **选择助手消息**：`select(.type == "assistant")` 只取 Claude 的回答
2. **提取文本内容**：`.message.content[]? | select(.type == "text").text` 只保留文本部分
3. **修正换行**：`gsub("\n"; "\r\n")` 把换行替换为回车加换行
4. **增加间距**：`. + "\r\n\n"` 在消息之间留出更多空白

回车替换用来修复一个问题：光标原先没有正确回到每行第一个字符的位置。

### 数据管道

数据按以下路径经过脚本。

Docker 输出 `stream-json` 数据，但也夹杂一些非 JSON 的杂项行。原文说，`grep --line-buffered '^{'` 会确保只处理有效 JSON 行。

`tee "$tmpfile"` 把内容写入临时文件，同时不中断流。稍后判断 Claude 是否完成时，需要这个文件。

最后，`jq --unbuffered -rj "$stream_text"` 应用流过滤器，把文本实时显示在终端上。

> 译注：grep 在这里实际只筛选以左花括号开头的行，并不验证 JSON 合法性。原脚本没有启用 pipefail，管道前段失败不一定反映为整条管道失败；循环中重复设置 EXIT trap，也不能据此保证每轮临时文件都被清理。这些原代码细节保留，不静默修复。脚本中凭据选项和完成标记也需要在安全、受控的环境中自行验证。

## 结语

我希望很快就能删掉这篇文章，因为 Claude Code 届时也许会提供一种功能，让你既能流式读取回答，又能捕获最终输出。

OpenCode 已经有这个能力，所以不需要为它写这样的文章。在那之前，这是一种能在 AFK Ralph 运行时实时看到 Claude 流式输出的可行办法。

> 译注：最后一段保留作者写作时的产品比较与期望，没有核验当前版本，也不是本次实测可运行的保证。
