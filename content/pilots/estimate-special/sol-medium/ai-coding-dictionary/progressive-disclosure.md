---
title: "渐进式披露"
slug: "progressive-disclosure"
type: "dictionary"
description: "只加载智能体眼下需要的上下文，其余内容用上下文指针标明位置，需要时再读取。这个思路借鉴自界面设计。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
渐进式披露是指只加载[上下文](/ai-coding-dictionary/context)中[智能体](/ai-coding-dictionary/agent)眼下需要的部分，其余内容则用[上下文指针](/ai-coding-dictionary/context-pointer)标明位置，需要时再读取。这个思路借鉴自界面设计：界面只向用户显示当前任务需要的控件，其他控件要点击后才会出现。

之所以需要这种做法，是因为上下文会产生两重成本。首先，每个预先加载的 [Token](/ai-coding-dictionary/token) 都会作为[输入 Token](/ai-coding-dictionary/input-tokens)，在每个[工作轮次](/ai-coding-dictionary/turn)计费。其次，无论智能体是否需要，每个 Token 都会占用[注意力预算](/ai-coding-dictionary/attention-budget)。如果把完整的风格指南、部署操作手册和数据库约定全都塞进 [AGENTS.md](/ai-coding-dictionary/agents-md)，智能体处理这些任务时反而会样样都做得更差：当前任务真正重要的指令，会被大量无关指令冲淡。一个明显信号是，智能体忽略了你明知已经放进上下文的规则——规则确实在那里，只是被其他内容淹没了。

渐进式披露把这种安排倒过来：始终加载的部分尽量简短，每个主题只写一句说明，再附上详细内容的位置。智能体编写组件时才读取风格指南，进行部署时才读取部署操作手册，修复测试时则两者都不读。[Skill](/ai-coding-dictionary/skill)就是[执行框架](/ai-coding-dictionary/harness)内置的这种模式：每个[会话](/ai-coding-dictionary/session)只加载简短说明，触发某个 Skill 后才加载它的完整指令。

_用法：_

“我应该把整份风格指南都放进 AGENTS.md 吗？”

“不用，采用渐进式披露。把风格指南作为一个 Skill 引用，让智能体真正需要编写组件时再加载。AGENTS.md 里的内容每个工作轮次都会产生 Token 成本。”

## 中文学习辅助：术语小词典

- **progressive disclosure**：渐进式披露，只先提供当前任务必需的信息，需要时再读取详细内容的组织方式。
- **context pointer**：上下文指针，一段告诉智能体详细资料存放在哪里、需要时可以怎样读取的简短说明或链接。
- **attention budget**：注意力预算，模型在一次请求中有效关注和利用信息的有限能力。
- **Skill**：一组按需加载的任务说明，只有任务适用时，智能体才读取其中的详细规则。
