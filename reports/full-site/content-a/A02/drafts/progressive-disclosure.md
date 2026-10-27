---
title: "渐进式披露"
slug: "progressive-disclosure"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

记忆与行为引导

# 渐进式披露

只加载智能体眼下需要的上下文，其余内容用上下文指针标明位置。这个思路借鉴自界面设计。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

渐进式披露是指只加载[智能体](/ai-coding-dictionary/agent)眼下需要的[上下文](/ai-coding-dictionary/context)，其余内容则用[上下文指针](/ai-coding-dictionary/context-pointer)标明位置。这个思路借鉴自界面设计：界面只向用户显示当前任务需要的控件，其他控件要点击后才会出现。

之所以需要这种做法，是因为上下文会产生两重成本。首先，每个预先加载的 [Token](/ai-coding-dictionary/token) 都会作为[输入 Token](/ai-coding-dictionary/input-tokens)，在每个[工作轮次](/ai-coding-dictionary/turn)计费。其次，无论智能体是否需要，每个 Token 都会占用[注意力预算](/ai-coding-dictionary/attention-budget)。如果把完整的风格指南、部署操作手册和数据库约定全都塞进 [AGENTS.md](/ai-coding-dictionary/agents-md)，智能体处理这些任务时反而会样样都做得更差：当前任务真正重要的指令，会被大量无关指令冲淡。一个明显信号是，智能体忽略了你明知已经放进上下文的规则。规则确实在那里，只是被其他内容淹没了。

渐进式披露把这种安排倒过来：始终加载的部分尽量简短，每个主题只写一句说明，再附上详细内容的位置。智能体编写组件时才读取风格指南，进行部署时才读取部署操作手册，修复测试时则两者都不读。[Skill](/ai-coding-dictionary/skill) 就是[智能体执行框架](/ai-coding-dictionary/harness)内置的这种模式：每个[会话](/ai-coding-dictionary/session)加载简短说明，触发某个 Skill 后才加载它的完整指令。

> **译注：怎样理解这些名称。** 上下文指针是告诉智能体详细资料放在哪里的简短说明或链接；AGENTS.md 是支持这一约定的编程工具会读取的项目规则文件；Skill 是按任务需要加载的说明和资源。部署是把软件放到实际运行环境中。文中的计费描述说明反复加载有成本，具体请求次数、缓存和费用仍由所用服务决定。

_用法：_

**英文原例**

> Should I dump the entire style guide into AGENTS.md?

**中文理解**

“我应该把整份风格指南都放进 AGENTS.md 吗？”

**英文原例**

> No — progressive disclosure. Reference the style guide as a skill the agent loads when it actually needs to write a component. AGENTS.md pays the token cost every turn.

**中文理解**

“不用，采用渐进式披露。把风格指南作为一个 Skill 引用，让智能体真正需要编写组件时再加载。AGENTS.md 里的内容每个工作轮次都会产生 Token 成本。”

[上一个词条：AGENTS.md](/ai-coding-dictionary/agents-md) · [下一个词条：上下文指针](/ai-coding-dictionary/context-pointer)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/progressive-disclosure)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fprogressive-disclosureProgressive%20disclosure%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Progressive%20disclosure%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fprogressive-disclosure) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/progressive-disclosure?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/progressive-disclosure)复制地址。
