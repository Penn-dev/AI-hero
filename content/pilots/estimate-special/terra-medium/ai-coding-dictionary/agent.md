---
title: "智能体（Agent）"
slug: "agent"
type: "dictionary"
description: "配备工具、系统提示词和上下文窗口，并能与用户轮流互动的模型。也就是正在实际工作的模型。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
一个配有[工具](/ai-coding-dictionary/tool)、[系统提示词](/ai-coding-dictionary/system-prompt)和[上下文窗口](/ai-coding-dictionary/context-window)，能与用户一来一回进行[对话轮次](/ai-coding-dictionary/turn)的[模型](/ai-coding-dictionary/model)，就叫智能体（Agent）。_Claude Code 是智能体，Cursor 是智能体，Claude.ai 也是智能体。_你实际交谈的对象就是智能体：它是为特定用途配置好、正在工作的模型。

和这本词典里的大多数术语不同，“智能体”并不指某个机械部件。模型是一份[参数](/ai-coding-dictionary/parameters)文件；执行框架（[harness](/ai-coding-dictionary/harness)）是可以指向模型的软件。智能体则两者都不是——它是你正在对话的那个整体。人们总会把 [AI](/ai-coding-dictionary/ai) 当作一个人来描述，而智能体就是这个被人格化的单位：你把任务交给它，它读你的消息并回答；“它又把构建弄坏了”中的“它”指的就是它。说智能体完成了某件事时，你的意思是模型加执行框架完成了它，但你把这个组合当作一个行动者来沟通。

这个概念比这一波 AI 热潮更早。软件智能体——你交给它一个目标、由它代你行动的程序——几乎从 AI 诞生起就是一个概念。

_避免使用：_“the AI”“the bot”（都太笼统，无法看出你说的是模型参数，还是已经配好执行框架的整体）。

_用法：_

“这次迁移你用的是哪个智能体？”

“本地用 Claude Code，做界面用 Cursor——底层是同一个模型，但执行框架不同。”

## 中文学习辅助：术语小词典

- **Agent**：智能体，能读懂任务、调用工具并持续与人协作的 AI 工作单元。
- **model**：模型，负责根据已有内容生成下一段文字或指令的核心程序。
- **harness**：智能体执行框架，负责为模型接入规则、工具和任务环境。
- **AI**：人工智能，能够完成理解、生成或决策等任务的计算机技术统称。
