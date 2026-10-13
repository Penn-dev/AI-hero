---
title: "黑灯工厂"
slug: "dark-factory"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# 黑灯工厂

整个代码库或其中一部分由软件工厂编写代码，并且从来没有人进行人工审查。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

整个代码库或其中一部分由[软件工厂](/ai-coding-dictionary/software-factory)编写代码，而没有人阅读。这里没有[人工审查](/ai-coding-dictionary/human-review)。人仍然可以撰写启动工作的 issue，但没人读产出的代码。名称来自“熄灯工厂”，生产现场没有人的工厂。

黑灯工厂是针对一片代码区域的 [vibe coding](/ai-coding-dictionary/vibe-coding)，而不只是针对一次改动。采用 vibe coding 时，你选择不阅读自己要求的那次修改，但你知道它存在。在黑灯工厂中，团队对整个区域一次性作出这个选择，此后没有人为每次改动发出要求，也没有人查看它。触发器多快启动新工作，改动就多快到来。

问题会在出故障时显现。因为没有人读过改动，你不知道什么变了。你必须调试团队里没人读过的代码。原因可能藏在许多改动中的任何一处，而每项改动都通过了检查。

[自动检查](/ai-coding-dictionary/automated-check)和[自动审查](/ai-coding-dictionary/automated-review)是唯一关卡。如果它们没有发现问题，问题就会进入代码。

_避免使用：_ 不要只因为工厂无人看管地运行，就称一个代码库为“黑灯”。如果[智能体](/ai-coding-dictionary/agent)[会话](/ai-coding-dictionary/session)以 [AFK](/ai-coding-dictionary/afk) 方式运行，而有人审查它们的 PR，那是软件工厂，不是黑灯工厂。

> **译注：区别在审查。** AFK 描述工作时人是否在场；黑灯工厂描述产出代码是否有人阅读。PR 是供审查的改动请求，CI 是自动验证流程。

_用法：_

**英文原例**

> Who changed the retry logic in the billing service? Nobody on the team remembers it.

**中文理解**

“谁改了计费服务的重试逻辑？团队里没人记得。”

**英文原例**

> The billing service is a dark factory. The agents merge all changes that pass CI. Nobody read that change.

**中文理解**

“计费服务是黑灯工厂。智能体会合并所有通过 CI 的改动，那次修改没有人读过。”

[上一个词条：软件工厂](/ai-coding-dictionary/software-factory)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/dark-factory)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fdark-factoryDark%20factory%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Dark%20factory%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fdark-factory) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/dark-factory?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/dark-factory)复制地址。
