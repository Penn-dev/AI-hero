---
title: "智能体（Agent）"
slug: "agent"
type: "dictionary"
description: "配有工具、系统提示词和上下文窗口，并与用户一轮轮协作的模型。也就是配置好用途、实际运行起来的模型。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
把[模型](/ai-coding-dictionary/model)接入[执行框架](/ai-coding-dictionary/harness)，为它配上[工具](/ai-coding-dictionary/tool)、[系统提示词](/ai-coding-dictionary/system-prompt)和[上下文窗口](/ai-coding-dictionary/context-window)，再让它与用户一轮轮[协作](/ai-coding-dictionary/turn)，就形成了智能体（Agent）。_Claude Code 是智能体，Cursor 是智能体，Claude.ai 也是智能体。_你实际交谈的对象就是智能体：它是针对某种用途配置好、真正运行起来的模型。

和这本词典里的大多数术语不同，“智能体”不是某个可以单独拆出来的机械部件。模型本身是一组[参数](/ai-coding-dictionary/parameters)，执行框架则是一套可以连接模型的软件；智能体两者都不是，而是你正在与之交流的整个组合。人们经常把 [AI](/ai-coding-dictionary/ai) 当成人来描述，智能体就是这种人格化说法所指的对象：你把任务交给它，它读取你的消息并回答；“它又把构建弄坏了”中的“它”，指的也是它。说智能体做了某件事，其实是说模型和执行框架共同完成了这件事，只是我们把这个组合当成一个行动者来称呼。

这个概念早在当前这波 AI 热潮之前就已经存在。软件智能体——接受你交付的目标、代表你采取行动的程序——几乎从 AI 诞生之初就是一个概念。

_避免使用：_“the AI”“the bot”（这两个说法都太笼统，无法说明你指的是模型参数，还是接入执行框架后形成的整个智能体）。

_用法：_

“这次迁移你用的是哪个智能体？”

“本地用 Claude Code，界面工作用 Cursor——底层是同一个模型，但执行框架不同。”

## 中文学习辅助：术语小词典

- **Agent**：智能体，由模型和执行框架共同组成，能够接收任务、使用工具并与人持续协作。
- **model**：模型，根据收到的内容生成文字、代码或操作指令的核心部分。
- **harness**：智能体执行框架，为模型接入规则、工具和任务环境的软件。
