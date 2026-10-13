---
title: "参数"
slug: "parameters"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 参数

模型内部的数值，通常有数十亿个，在训练中调整。模型掌握的一切都保存在这些数值里，也叫权重。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[模型](/ai-coding-dictionary/model)内部的数值，通常有数十亿个，在[训练](/ai-coding-dictionary/training)中调整。模型“知道”的一切都保存在这些数值里。训练确定它们，[推理](/ai-coding-dictionary/inference)使用它们，但不改变它们。也叫 _权重_ 。

从运作机制看，参数把输入转换成输出。[下一个 Token 预测](/ai-coding-dictionary/next-token-prediction)是一次庞大的计算：[上下文窗口](/ai-coding-dictionary/context-window)中的 [Token](/ai-coding-dictionary/token) 进入计算，与参数相乘运算，最终得到对下一个 Token 的预测。模型内部没有事实数据库，也没有代码查询表，只有这些数值；它们经过安排，使计算倾向于产生有用的输出。模型能够凭训练背诵出的事实，例如标准库 API，属于[参数知识](/ai-coding-dictionary/parametric-knowledge)：保存在参数中，不是从其他地方检索来的。

值得真正理解的是：训练结束后，参数就固定了。你在[会话](/ai-coding-dictionary/session)中做的任何事，都不会改变它们。无论是你做出的纠正、给它看的代码库，还是它从中学到教训的错误，都不会。每个会话运行的都是同一组数值。这就是模型[无状态](/ai-coding-dictionary/stateless)、内置知识停在[知识截止时间](/ai-coding-dictionary/knowledge-cutoff)、项目特有信息必须通过[上下文](/ai-coding-dictionary/context)提供的原因。参数只能通过更多训练来改变，而这实际上会产生一个不同的模型。

> **译注：参数与普通输入不同。** 这里的参数是模型内部用于计算的数值，不是工具调用中传入的文件路径等参数。标准库是编程语言常用的基础功能集合，API 是这些功能对外提供的调用接口。

_用法：_

**英文原例**

> Can we fine-tune it on our codebase?

**中文理解**

“我们能用自己的代码库对它进行微调吗？”

**英文原例**

> That'd update the parameters — different model afterwards. For one project it's almost always cheaper to load the codebase as context than to retrain.

**中文理解**

“那会更新参数，之后就是不同的模型了。只针对一个项目，几乎总是把代码库加载成上下文比重新训练更便宜。”

> **译注：微调。** 在已有模型基础上，使用特定数据继续训练，从而调整参数。普通对话中提供资料不等于微调。

[上一个词条：模型](/ai-coding-dictionary/model) · [下一个词条：训练](/ai-coding-dictionary/training)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/parameters)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FparametersParameters%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Parameters%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fparameters) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/parameters?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/parameters)复制地址。
