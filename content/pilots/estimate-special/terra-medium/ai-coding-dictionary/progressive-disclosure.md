---
title: "渐进式披露"
slug: "progressive-disclosure"
type: "dictionary"
description: "只加载智能体当前所需的上下文，其余内容通过上下文指针保留。这个思路借鉴自界面设计。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
只加载当前需要的[上下文](/ai-coding-dictionary/context)，供[智能体](/ai-coding-dictionary/agent)使用；其余内容通过[上下文指针](/ai-coding-dictionary/context-pointer)保留。这个思路借鉴自界面设计：界面只展示用户当前任务相关的控件，其他控件藏在点击之后。

这种做法存在，是因为上下文有两层成本。每个一开始就加载的 [Token](/ai-coding-dictionary/token)，都会在每个[对话轮次](/ai-coding-dictionary/turn)作为[输入 Token](/ai-coding-dictionary/input-tokens)计费；无论智能体是否需要，每个 Token 都会占用[注意力预算](/ai-coding-dictionary/attention-budget)。一份塞满完整风格指南、部署操作手册和数据库约定的 [AGENTS.md](/ai-coding-dictionary/agents-md)，会让智能体在所有这些任务上的表现都变差——当前任务真正重要的指令，会被无关指令稀释。一个明显信号是：智能体忽略了你明知在上下文中的规则；规则确实在那里，只是被埋没了。

渐进式披露会反过来安排这些内容。让始终加载的部分保持很小：每个主题只写一句话，并指向详细内容所在的位置。智能体写组件时再读风格指南，部署时再读部署操作手册，修复测试时两者都不读。[Skill](/ai-coding-dictionary/skill)是[执行框架](/ai-coding-dictionary/harness)内置的这种模式：每个[会话](/ai-coding-dictionary/session)都加载简短描述，只有被触发时才加载完整指令。

_用法：_

“我应该把整份风格指南都放进 AGENTS.md 吗？”

“不必——采用渐进式披露。把风格指南作为一个 Skill 引用，让智能体确实需要写组件时再加载。AGENTS.md 在每一轮都会产生 Token 成本。”

## 中文学习辅助：术语小词典

- **progressive disclosure**：渐进式披露，先只提供当前任务必需的信息，需要时再展开细节的组织方式。
- **context pointer**：上下文指针，告诉智能体详细资料在哪里、可在需要时读取的简短说明或链接。
- **Token**：模型处理文本时使用的计量单位，不完全等同于一个汉字或一个英文单词。
- **Skill**：一组按需加载的任务说明，让智能体只在适用时读取详细规则。
