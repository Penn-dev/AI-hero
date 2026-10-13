---
title: "人工参与"
slug: "human-in-the-loop"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# 人工参与

一种工作方式：一名或多名人类在会话中与智能体配合，实时审查、调整方向或协作。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

一种工作方式：一名或多名人类在[会话](/ai-coding-dictionary/session)中与[智能体](/ai-coding-dictionary/agent)配合，实时审查、调整方向或协作。人类在场并投入其中，不只是给单个动作把关。

它与 [AFK](/ai-coding-dictionary/afk) 工作相对，后者让智能体无人看管地运行，之后再判断结果。人工参与意味着在问题还容易修正时抓住它：看到智能体找错文件、误读要求，或者走向死胡同，你可以用一句话把它拉回来，不必二十分钟后才发现，整段自信的工作都建立在那个错误之上。智能体不能可靠地判断自己何时偏离方向；独自工作时，它们更倾向继续推进，而不是停下来询问。

选哪种方式，取决于工作本身。要求明确、风险低、容易验证的任务适合 AFK。含糊、不可逆，或者最终成果难以审查的任务，例如数据结构迁移、棘手的设计决定、任何涉及生产环境的工作，适合持续参与。判断的核心是：走错一步有多贵，又会在多晚的时候才发现？

有些工作天生需要人参与，因为你的反应就是输入。[追问](/ai-coding-dictionary/grilling)需要你在场回答问题，[原型制作](/ai-coding-dictionary/prototyping)需要你在场对成果作出反应。

持续参与会消耗你的注意力，而注意力是稀缺资源。更熟练地使用智能体，一部分就是安全地把更多工作移出实时参与范围：事先做计划，加入[自动检查](/ai-coding-dictionary/automated-check)，最后做[人工审查](/ai-coding-dictionary/human-review)，而不是全程监督。[软件工厂](/ai-coding-dictionary/software-factory)更进一步，通过触发器启动会话，连发起工作都不需要你。

> **译注：迁移与生产环境。** 数据结构迁移会改变数据的组织方式，可能影响既有数据；生产环境是真正为用户或业务提供服务的环境。这里判断的是需要多少人的参与，不代表任务已获执行授权。

_用法：_

**英文原例**

> Run this AFK overnight?

**中文理解**

“让它 AFK 跑一整夜？”

**英文原例**

> No, schema migration — keep it human-in-the-loop. I want to see each step and steer if it picks the wrong column to backfill from.

**中文理解**

“不行，这是数据结构迁移，要保持人工参与。我想看每一步，如果它选错了用来回填数据的列，就及时调整方向。”

[上一个词条：子智能体](/ai-coding-dictionary/subagent) · [下一个词条：AFK](/ai-coding-dictionary/afk)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/human-in-the-loop)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhuman-in-the-loopHuman-in-the-loop%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Human-in-the-loop%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhuman-in-the-loop) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/human-in-the-loop?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/human-in-the-loop)复制地址。
