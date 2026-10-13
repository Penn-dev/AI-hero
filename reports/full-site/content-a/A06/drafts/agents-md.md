---
title: "AGENTS.md"
slug: "agents-md"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

记忆与行为引导

# AGENTS.md

保存在环境中的文件，执行框架在会话开始时把它加载到上下文窗口。它是项目交给智能体的长期工作说明。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

保存在[环境](/ai-coding-dictionary/environment)中的文件，[智能体执行框架](/ai-coding-dictionary/harness)在[会话](/ai-coding-dictionary/session)开始时把它加载到[上下文窗口](/ai-coding-dictionary/context-window)。它是项目交给[智能体](/ai-coding-dictionary/agent)的长期工作说明。这是跨执行框架使用的约定；有些框架也有自己的变体，例如 Claude Code 使用 CLAUDE.md。

它会自动加载，因此能帮助你避免在不同会话中反复说同一件事。[模型](/ai-coding-dictionary/model)是[无状态的](/ai-coding-dictionary/stateless)：你在一个会话里给出的纠正，到下个会话就没了。结果，你不得不在每个新会话中重新说明：项目使用 pnpm，测试要带某个特定参数运行，某个目录是自动生成的，不该修改。如果你已经为同一件事纠正过智能体两次，这条纠正就可以考虑写进 AGENTS.md。

适合写进去的，是智能体无法从代码中推导出的内容：构建和测试命令、代码库没有明确体现的约定、不可违反的限制。限制的例子如下。

**英文 Prompt**

> never edit the generated client

**中文版 Prompt**

> 绝不要编辑自动生成的客户端代码

写得简短、直接。它是一份工作说明，不是整套文档。

代价是，其中的所有内容都会始终加载。指令会越积越多，而对于任一具体任务，大部分指令都不相关。很长的 AGENTS.md 既消耗 Token，又会冲淡自身的效果：上下文中的指令越多，模型对任意一条指令的遵循就越不可靠。

> **译注：项目文件与命令。** pnpm 是安装和管理项目依赖的工具；命令参数会改变命令的运行方式。自动生成的客户端代码由其他工具产出，手动修改可能在下次生成时被覆盖。各框架对项目规则的加载方式可能不同，这里保留作者描述的工作方式。

 _避免使用：_ 不要把应该[渐进式披露](/ai-coding-dictionary/progressive-disclosure)的内容塞进 AGENTS.md。里面的任何内容，在每个会话的每个[工作轮次](/ai-coding-dictionary/turn)都会产生 [Token](/ai-coding-dictionary/token) 成本，无论那个会话是否需要它。风格指南可以放在 [Skill](/ai-coding-dictionary/skill) 或[上下文指针](/ai-coding-dictionary/context-pointer)后面；AGENTS.md 只保留到处都适用的规则。

_用法：_

**英文原例**

> Why is every session starting with 4k tokens already burned?

**中文理解**

“为什么每个会话一开始就已经用了四千个 Token？”

**英文原例**

> Check AGENTS.md — someone pasted the entire style guide in there instead of putting it behind a skill.

**中文理解**

“检查一下 AGENTS.md。有人把整份风格指南都粘贴进去了，而不是通过 Skill 按需加载。”

[上一个词条：记忆系统](/ai-coding-dictionary/memory-system) · [下一个词条：渐进式披露](/ai-coding-dictionary/progressive-disclosure)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/agents-md)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fagents-mdAGENTS.md%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=AGENTS.md%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fagents-md) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/agents-md?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/agents-md)复制地址。
