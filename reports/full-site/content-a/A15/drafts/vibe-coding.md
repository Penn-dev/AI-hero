---
title: "Vibe coding"
slug: "vibe-coding"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# Vibe coding

用户不进行人工审查，就接受智能体代码的工作方式。代码改动差异被当作不打开查看的东西。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

用户不进行[人工审查](/ai-coding-dictionary/human-review)，就接受[智能体](/ai-coding-dictionary/agent)代码的工作方式。改动差异被当作黑箱，重要的是程序行为是否符合要求，而不是里面有什么。[自动审查](/ai-coding-dictionary/automated-review)和[自动检查](/ai-coding-dictionary/automated-check)仍然可能运行；vibe coding 这个词并不说明两者是否存在。

这个词来自 Andrej Karpathy，他在 [2025 年初创造了这个说法](https://x.com/karpathy/status/1886192184808149383)。你“fully give in to the vibes”，完全跟着感觉走，并且“forget that the code even exists”，忘记代码这回事还存在。描述你想要什么，接受返回的东西，再通过运行它来判断。

Vibe coding 用少做检查换取速度。阅读改动差异通常是智能体驱动工作中最慢的一步，舍去它，就去掉了主要瓶颈。对于失败代价低的代码，例如[原型](/ai-coding-dictionary/prototyping)、一次性脚本、内部工具，这是合理取舍。代码寿命越长、后果越重大，风险就越高。

成本会在后来出现。Vibe coding 的改动逐步积累成一个没人读过的代码库，而检查过的只有行为。行为没有暴露的东西，例如写进日志的秘密信息、遗漏的边缘情况、悄悄出错的数据处理，会在无人发现的情况下交付。第一次有人调试系统，也是第一次有人阅读代码。没有人工审查之后，仍然运行的自动验证，无论测试、类型检查还是自动审查，就是代码唯一经过的关卡。同样的立场，如果应用到整个代码库或其中一部分，且改动来自[软件工厂](/ai-coding-dictionary/software-factory)，那就是[黑灯工厂](/ai-coding-dictionary/dark-factory)。

_避免使用：_ 不要把“vibe coding”当成“低质量 AI 编程”的同义词。它命名的是审查立场，不是最终代码质量。

> **译注：代码黑箱。** 这里指接受代码时不阅读具体改动，只观察运行表现；并不是说代码无法打开。日志是程序记录运行情况的文字，也可能意外包含敏感信息。

_用法：_

**英文原例**

> Did you read what it changed in the auth flow?

**中文理解**

“你读过它对身份验证流程做了哪些修改吗？”

**英文原例**

> Vibe coded it — login still works, that's all I checked.

**中文理解**

“我采用了 vibe coding。登录还能用，这就是我检查的全部。”

**英文原例**

> Read the diff before you push, vibing on auth is how secrets leak into logs.

**中文理解**

“推送之前先读改动差异。身份验证上也只跟着感觉走，就容易把秘密信息泄露到日志里。”

[上一个词条：人工审查](/ai-coding-dictionary/human-review) · [下一个词条：设计构想](/ai-coding-dictionary/design-concept)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/vibe-coding)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fvibe-codingVibe%20coding%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Vibe%20coding%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fvibe-coding) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/vibe-coding?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/vibe-coding)复制地址。
