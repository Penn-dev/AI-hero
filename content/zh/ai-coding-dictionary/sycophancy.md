---
title: "迎合"
slug: "sycophancy"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

失败模式

# 迎合

模型自信地表示赞同。成因在于训练让模型偏向人类喜欢的回答，其中也包括同意人类。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[模型](/ai-coding-dictionary/model)自信地表示赞同。成因在于[训练](/ai-coding-dictionary/training)：模型被塑造成偏好人类喜欢的回答，而人类往往更喜欢被赞同，不喜欢被指出错误。因此，模型学到了赞同会得到奖励，即使赞同本身是错的。

_表现为：_

- _受到质疑就退让_：你问“are you sure?”，中文版 Prompt：“你确定吗？”，它就推翻原本正确的回答。
- _夸赞糟糕输入_：还没分析，就认同你有问题的计划很出色。
- _受提问方式影响的评价_：你暗示东西是自己写的，审查就偏正面；你暗示是别人写的，审查就偏负面。同一份成果，结论却不同。
- _模仿_：把你的错误重复回来，作为确认。

 _诊断测试：_ 如果没有你的引导，模型还会这么说吗？如果唯一变化的是你的语气或表达方式，那就是迎合，不是分析发生了真实变化。

 _解决办法：_ 隐藏自己的偏好。用中立方式写提示词，例如下面这句：

**英文 Prompt**

> review this code

**中文版 Prompt**

> 审查这段代码

而不是这样问：

**英文 Prompt（对比）**

> is this code good?

**中文版 Prompt（对比）**

> 这段代码好吗？

 _避免使用：_ 不要把恰好让你高兴的任何错误答案都叫“迎合”。如果不做上述诊断，这个词就与“错了”一样，没有更多价值。

_用法：_

**英文原例**

> It said my refactor plan looked great, then I asked 'are you sure?' and it walked the whole thing back.

**中文理解**

“它说我的重构计划看起来很好，后来我问“你确定吗？”，它又把整个说法都收回了。”

**英文原例**

> Classic sycophancy — it agreed first because you sounded confident, then caved because you sounded doubtful. The plan's quality didn't change, your tone did. [Clear](/ai-coding-dictionary/clearing) and re-ask without signalling either way.

**中文理解**

“典型的迎合。你听起来自信时，它先赞同；你听起来怀疑时，它又退让。计划的质量没变，变的是你的语气。[清空](/ai-coding-dictionary/clearing)后重新问，不要暗示你倾向哪一种答案。”

> **译注：重构。** 在尽量保持已有行为的前提下调整代码组织和实现。本文的诊断重点，是回答是否只随你的语气变化，而没有新的依据。

[上一个词条：沙箱](/ai-coding-dictionary/sandbox) · [下一个词条：幻觉](/ai-coding-dictionary/hallucination)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/sycophancy)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FsycophancySycophancy%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Sycophancy%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsycophancy) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/sycophancy?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/sycophancy)复制地址。
