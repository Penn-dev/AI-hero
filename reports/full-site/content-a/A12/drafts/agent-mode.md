---
title: "智能体模式"
slug: "agent-mode"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工具与环境

# 智能体模式

把权限模式和注入系统提示词的行为指令打包在一起的预设，可以在会话中途切换。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

影响[智能体](/ai-coding-dictionary/agent)运行方式的预设，把[权限模式](/ai-coding-dictionary/permission-mode)与注入[系统提示词](/ai-coding-dictionary/system-prompt)的行为指令打包在一起。例如：遇到高风险调用就询问的默认模式；阻止编辑、引导研究的 **plan mode，规划模式**；自动批准编辑的 **accept-edits，接受编辑模式**；自动批准所有操作的 **bypass permissions，跳过权限询问模式**，俗称 **YOLO mode**。它可以在[会话中途](/ai-coding-dictionary/session)切换。

这种打包让模式区别于单独的权限设置。权限模式只是一道门，决定哪些[工具调用](/ai-coding-dictionary/tool-call)可以通过。只有门，就会出现想编辑却做不到的智能体：它提出写入，被拦住，再尝试另一条路。注入的指令会消除这个意图。规划模式不仅阻止编辑，还会告诉智能体现在处于规划阶段，因此它会阅读、提问、提出方案，而不是不断试图越过那道门。限制和引导指向同一方向。

实际工作中，你会随着任务过程中信任程度的变化而切换模式。同一任务可以经过多种模式：方案尚在形成时用规划模式；开始做谨慎的修改时用需要询问的默认模式；智能体已经证明理解改动后用接受编辑模式；在[沙箱](/ai-coding-dictionary/sandbox)中进行 [AFK](/ai-coding-dictionary/afk) 工作时，使用跳过权限询问模式。切换模式无需付出代价，对话会从原位置继续，只是权限和指令变了。如果你发现自己每条询问都不看就批准，模式比实际信任程度更严格；如果你不断拒绝编辑，模式又设得太宽松了。

 _厂商用语：_ Claude Code 称它们为“permission modes”，权限模式；Codex 称它们为“approval modes”，批准模式。这两个名称都出现于行为指令打包之前。

> **译注：模式名称与范围。** 本文保留冻结来源中的产品用语。具体模式支持的操作和切换方式，须看所用工具的当前说明；文中例子没有为当前会话授予任何新权限。

_用法：_

**英文原例**

> It keeps editing files when I just want a plan.

**中文理解**

“我只想要个计划，它却总在编辑文件。”

**英文原例**

> Switch to plan mode — it'll block writes and stay in research.

**中文理解**

“切换到规划模式，它会阻止写入，停留在研究阶段。”

**英文原例**

> What about for the AFK run later?

**中文理解**

“那之后的 AFK 工作呢？”

**英文原例**

> Bypass mode, but only inside the sandbox.

**中文理解**

“用跳过权限询问模式，但只在沙箱里。”

[上一个词条：权限模式](/ai-coding-dictionary/permission-mode) · [下一个词条：沙箱](/ai-coding-dictionary/sandbox)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/agent-mode)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fagent-modeAgent%20mode%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Agent%20mode%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fagent-mode) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/agent-mode?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/agent-mode)复制地址。
