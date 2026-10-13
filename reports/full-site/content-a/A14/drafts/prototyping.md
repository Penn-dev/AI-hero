---
title: "原型制作"
slug: "prototyping"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# 原型制作

让智能体快速做出一个粗略版本。对话不够具体时，需要真实成果作为讨论对象。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

让[智能体](/ai-coding-dictionary/agent)快速做出某个东西的粗略版本。适用于对话的表达精度不足，而你需要一个真实成果来讨论的时候。

[追问](/ai-coding-dictionary/grilling)在对话中解决设计决定。对话成本低，但还原度不高。有些问题无法只靠语言回答，例如一种交互用起来怎样，一个 API 形式在真实调用代码里是否方便，布局面对真实数据量时是否合适。访谈碰到某个问题，你诚实的回答是“我不知道，得看看才行”。过了这个点，讨论就会打转。不如让智能体把东西做出来，你看过，再带着答案回到对话。

智能体降低了构建成本，让这种方法变得实际可行。以前要一天才能做出的粗略模型，现在几分钟就能完成，所以值得经常采用。这也是[人工参与](/ai-coding-dictionary/human-in-the-loop)的方法，原型就是做出来让你作出反应的。

通常不会看一眼就结束。围绕原型迭代，给出反应、要求修改、再给反应，让每一轮都依据真实成果解决另一个决定，比单纯对话能表达得更具体。

原型不必每个部分都很粗糙。你可以把真正要评估的部分做到生产质量，这样一旦决定确定下来，你试过的组件或 API 就能移入真实代码库。这让原型成为[规格](/ai-coding-dictionary/spec)应该引用的重要材料。

> **译注：这里评估什么。** API 是软件调用接口；组件是一部分界面或功能；迭代是根据反馈反复调整。原文的一天、几分钟是对原型成本的描述，本页没有替你的具体任务测量工期。

_用法：_

**英文原例**

> We've spent half an hour arguing about whether the wizard should be one page or three steps.

**中文理解**

“我们已经争论半小时了，这个向导究竟应该是一页，还是分三步。”

**英文原例**

> Words won't settle it — have the agent prototype both. We'll click through them and know in five minutes.

**中文理解**

“光说解决不了。让智能体把两种都做成原型。我们点一遍，五分钟就知道了。”

> **译注：向导。** 把用户逐步带过一项操作的界面，例如分几步填写和确认信息。

[上一个词条：追问](/ai-coding-dictionary/grilling) · [下一个词条：DX](/ai-coding-dictionary/dx)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/prototyping)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FprototypingPrototyping%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Prototyping%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fprototyping) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/prototyping?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/prototyping)复制地址。
