---
title: "人工审查"
slug: "human-review"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# 人工审查

用户阅读智能体生成的代码，并作出判断。读改动差异算，读摘要不算。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

用户阅读[智能体](/ai-coding-dictionary/agent)生成的代码，并作出判断。阅读改动差异或变更文件算，阅读智能体对自己做了什么的 _描述_ 不算，讲述并不是成果本身。描述是[二手来源](/ai-coding-dictionary/secondary-source)，而且由被审查的一方撰写；改动差异是[一手来源](/ai-coding-dictionary/primary-source)，审查意味着去读它。

智能体增加了代码产出量，因此审查变成瓶颈。一种有用的做法，是分层采用不同审查策略。[自动检查](/ai-coding-dictionary/automated-check)抓机械性错误，[自动审查](/ai-coding-dictionary/automated-review)抓可以描述出来的问题，人工审查则留给只有你能判断的事情：这是不是应该做的改动，方法是否适合代码库，这个东西究竟该不该存在。

审查越早，成本也越低。开工前阅读计划，或者中途阅读一小段改动，只需几分钟；[AFK](/ai-coding-dictionary/afk) 运行结束后，深入梳理整个完成分支，要花更久。把审查检查点放在哪里，是[人工参与](/ai-coding-dictionary/human-in-the-loop)的决定，不该等事后才想起。

 _避免使用：_ 只说“代码审查”，因为这无法区分人工和自动。

> **译注：改动差异与分支。** diff 展示修改前后有哪些变化；分支保存一条相对独立的代码修改线。读摘要能了解大意，实际改动仍需打开查看。

_用法：_

**英文原例**

> I human-reviewed the AFK output.

**中文理解**

“我已经人工审查了 AFK 的产出。”

**英文原例**

> You read the diff or just the summary?

**中文理解**

“你读的是改动差异，还是只读了摘要？”

**英文原例**

> Diff. The summary said it deleted dead code — turned out the function was called from a generated file.

**中文理解**

“改动差异。摘要说删掉了无用代码，结果发现那个函数还被一个自动生成的文件调用。”

[上一个词条：自动审查](/ai-coding-dictionary/automated-review) · [下一个词条：Vibe coding](/ai-coding-dictionary/vibe-coding)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/human-review)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhuman-reviewHuman%20review%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Human%20review%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhuman-review) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/human-review?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/human-review)复制地址。
