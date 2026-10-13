---
title: "智能体"
slug: "agent"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

会话、上下文窗口与工作轮次

# 智能体

把模型接入执行框架，配上工具、系统提示词和上下文窗口，让它与用户一轮轮协作。这就是实际运行起来的模型。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

把[模型](/ai-coding-dictionary/model)接入[智能体执行框架](/ai-coding-dictionary/harness)，为它配上[工具](/ai-coding-dictionary/tool)、[系统提示词](/ai-coding-dictionary/system-prompt)和[上下文窗口](/ai-coding-dictionary/context-window)，再让它与用户一轮轮[协作](/ai-coding-dictionary/turn)，就形成了智能体（Agent）。 _Claude Code 是智能体，Cursor 是智能体，Claude.ai 也是智能体。_ 你实际交谈的对象就是智能体：它是针对某种用途配置好、真正运行起来的模型。

和这本词典里的大多数术语不同，“智能体”不是某个可以单独拆出来的机械部件。模型是一个保存着[参数](/ai-coding-dictionary/parameters)的文件，执行框架则是一套可以具体指出来的软件。智能体两者都不是，而是你正在与之交流的整个组合。人们经常把 [AI](/ai-coding-dictionary/ai) 当成人来描述，智能体就是这种拟人化说法所指的对象：你把任务交给它，它读取你的消息并回答；“它又把构建弄坏了”中的“它”，指的也是它。说智能体做了某件事，其实是说模型和执行框架共同完成了这件事，只是我们把这个组合当成一个行动者来称呼。

这个概念早在当前这波 AI 热潮之前就已经存在。软件智能体，也就是接受你交付的目标、代表你采取行动的程序，作为概念，出现得与 AI 一样早。

> **译注：模型周围的几个部分。** 参数是模型训练得到、用于计算的数值；工具提供读取文件等具体功能；系统提示词提供基础工作指令；上下文窗口容纳模型在一次请求中收到的信息。执行框架负责把这些部分组织起来。“构建”是把项目代码处理成可运行或可发布成果的过程。

_避免使用：_“the AI”“the bot”。这两个说法都太笼统，无法说明你指的是模型参数，还是接入执行框架后形成的整个智能体。

_用法：_

**英文原例**

> Which agent are you using for the migration?

**中文理解**

“这次迁移你用的是哪个智能体？”

**英文原例**

> Claude Code locally, Cursor for the UI work — same model underneath, different harnesses.

**中文理解**

“本地用 Claude Code，界面工作用 Cursor。底层是同一个模型，但执行框架不同。”

> **译注：示例中的任务。** 迁移是把既有代码、数据或配置转到另一种版本或组织方式；UI 指用户看到和操作的界面。

[上一个词条：有状态](/ai-coding-dictionary/stateful) · [下一个词条：系统提示词](/ai-coding-dictionary/system-prompt)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/agent)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FagentAgent%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Agent%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fagent) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/agent?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/agent)复制地址。
