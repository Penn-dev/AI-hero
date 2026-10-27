---
title: "Skill"
slug: "skill"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

记忆与行为引导

# Skill

把一种可传授的能力打包成一个整体。在当前任务需要、由上下文指针引入之前，它留在上下文窗口之外。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

把一种可传授的能力打包成一个整体，也就是把做好某项任务所需的说明和资源放在一起，保存在[环境](/ai-coding-dictionary/environment)中。等当前任务需要时，再由[上下文指针](/ai-coding-dictionary/context-pointer)把它引入[上下文窗口](/ai-coding-dictionary/context-window)。Skill 是[智能体执行框架](/ai-coding-dictionary/harness)中实施[渐进式披露](/ai-coding-dictionary/progressive-disclosure)的单位。

Skill 是一项开放标准，定义见 [agentskills.io](https://agentskills.io)。它最初由 Anthropic 开发，之后被多数主流执行框架采用，因此一份 Skill 写好后，可以跨框架使用。其格式是一个文件夹，包含：

- 一个 `SKILL.md` 文件，其中有元数据，至少包括名称和描述，以及具体指令
- 可选的脚本，供[智能体](/ai-coding-dictionary/agent)运行
- 可选的模板和参考资料，由指令指向它们

默认情况下，只有名称和描述会进入[上下文](/ai-coding-dictionary/context)。智能体的任务符合时，才会加载其余内容。在那之前，无论完整指令有多长，Skill 都几乎不占空间，只占一两句话的 [Token](/ai-coding-dictionary/token)。

这让 Skill 区别于 [AGENTS.md](/ai-coding-dictionary/agents-md)：后者无论任务是什么，都会加载进每个[会话](/ai-coding-dictionary/session)。Skill 则在某一类工作出现时才会读取，例如发布、搭建新服务的初始结构、编写迁移程序；其他时候会忽略它。

> **译注：文件夹里的几种材料。** 元数据是名称、描述等说明信息；脚本是可以运行的一段程序；模板是可复用的起始文件。迁移程序用于把已有数据或代码结构调整到新的版本。Skill 提供如何做事的说明，实际操作仍要通过工具完成。

_避免使用：_“[工具](/ai-coding-dictionary/tool)”。工具是智能体 _调用_ 的功能，Skill 是它 _读取_ 的指令。

_用法：_

**英文原例**

> Where should I put the deploy runbook?

**中文理解**

“我应该把部署操作手册放在哪里？”

**英文原例**

> As a skill — the agent loads it only when the task involves deploys. In AGENTS.md it'd burn tokens on every [turn](/ai-coding-dictionary/turn) for something we use weekly.

**中文理解**

“做成 Skill。只有任务涉及部署时，智能体才会加载它。放在 AGENTS.md 里，就会为了每周才用一次的东西，在每个[工作轮次](/ai-coding-dictionary/turn)消耗 Token。”

[上一个词条：上下文指针](/ai-coding-dictionary/context-pointer) · [下一个词条：子智能体](/ai-coding-dictionary/subagent)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/skill)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FskillSkill%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Skill%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fskill) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/skill?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/skill)复制地址。
