---
title: "上下文指针"
slug: "context-pointer"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

记忆与行为引导

# 上下文指针

一份文档中指向另一份文档的说明，让智能体只在任务需要时才把后者加载进上下文。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

一份文档中指向另一份文档的说明，让[智能体](/ai-coding-dictionary/agent)只在任务需要时才把后者加载进[上下文窗口](/ai-coding-dictionary/context-window)。它是构成[渐进式披露](/ai-coding-dictionary/progressive-disclosure)的基本单位。

使用指针，而不是直接嵌入完整内容，是为了降低成本。指针在上下文窗口里只占一行；它指向的文档可能有数千个 [Token](/ai-coding-dictionary/token)，但智能体真正顺着指针读取之前，这些 Token 不会产生费用。把一份两千 Token 的操作手册直接放进 [AGENTS.md](/ai-coding-dictionary/agents-md)，每个[会话](/ai-coding-dictionary/session)都要为它付费；换成下面这句，就只有执行部署的会话会加载它。任务符合时，智能体通过[工具调用](/ai-coding-dictionary/tool-call)顺着指针读取。

**英文 Prompt**

> deploy process: see `internal/deploy.md`

**中文版 Prompt**

> 部署流程：请查看 `internal/deploy.md`

一个指针要发挥作用，需要两部分：稳定的路径，以及足够让智能体判断何时值得读取的描述。只有路径，智能体就没有理由顺着它读取；下面这句没有提示里面是什么内容，需要它的会话也会略过它。

**英文 Prompt（反例）**

> see `internal/deploy.md`

**中文版 Prompt（反例）**

> 请查看 `internal/deploy.md`

这一行应该与实际任务的说法对应：

**英文 Prompt**

> release, deploy, or rollback — read `internal/deploy.md` first

**中文版 Prompt**

> 发布、部署或回滚时，先阅读 `internal/deploy.md`

留意之后，你会发现指针到处都是：AGENTS.md 里的说明、[Skill](/ai-coding-dictionary/skill) 描述，执行框架先加载描述，完整内容留到后面再读；目录列表中的文件名；文档之间的链接。

指针还能把[二手来源](/ai-coding-dictionary/secondary-source)关联回它所依据的[一手来源](/ai-coding-dictionary/primary-source)，例如压缩摘要写明原始对话记录在哪里，文档写明它描述的是哪个源文件。这样，二手来源丢失的信息就有机会找回来：当摘要不够用时，智能体可以顺着指针读取原文，而不是只靠摘要留下的内容工作。

> **译注：路径与操作。** `internal/deploy.md` 是原文举出的文件路径，需要对应项目真的有这个文件才可读取。部署是把软件放到运行环境；回滚是退回之前的版本；一手来源是原始材料，二手来源是对它的整理或转述。

_避免使用：_“reference”，也就是“引用”，这个词太平淡，没体现顺着它可以读入更多上下文。“Portal”，也就是“传送门”，又太花哨。

_用法：_

**英文原例**

> AGENTS.md is getting huge.

**中文理解**

“AGENTS.md 越来越大了。”

**英文原例**

> Most of it should be context pointers, not content. Keep the always-on rules inline; turn the deploy runbook and the style guide into skills and leave a context pointer behind.

**中文理解**

“其中大部分应该是上下文指针，而不是内容本身。把始终生效的规则直接写在里面；部署操作手册和风格指南改成 Skill，只留下对应的上下文指针。”

[上一个词条：渐进式披露](/ai-coding-dictionary/progressive-disclosure) · [下一个词条：Skill](/ai-coding-dictionary/skill)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/context-pointer)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontext-pointerContext%20pointer%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Context%20pointer%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontext-pointer) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/context-pointer?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/context-pointer)复制地址。
