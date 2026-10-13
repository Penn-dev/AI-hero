---
title: "训练"
slug: "training"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 训练

让模型接触大量文本，调整参数来改善下一个 Token 预测，并由此确定模型参数的过程。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

确定[模型](/ai-coding-dictionary/model)[参数](/ai-coding-dictionary/parameters)的过程：让模型接触大量文本，调整参数以改善[下一个 Token 预测](/ai-coding-dictionary/next-token-prediction)。这是由[模型提供商](/ai-coding-dictionary/model-provider)完成的一次性、费用高昂的过程。它既包括预训练，也就是主要的大规模训练，也包括后训练，例如后来对遵循指令和安全性的改进；在本词典的讲解层级，无需区分两者。

机制就是大规模重复：给模型看一段文本，让它预测下一个 [Token](/ai-coding-dictionary/token)，朝着实际下一个 Token 的方向微调参数，然后在数万亿个 Token 上重复这个过程。没有什么内容被直接存成事实或规则。模型“知道”的一切，都是预测能力改善所带来的副产物，以[参数知识](/ai-coding-dictionary/parametric-knowledge)的形式压缩进参数。

日常使用中，有两个重要结果。训练会在某个时间点结束，因此模型有[知识截止时间](/ai-coding-dictionary/knowledge-cutoff)，它没有见过你上个月刚升级到的库版本。而且，训练不是你能做的事情：模型不了解你的代码库、约定或内部 API 时，解决办法从来不是“教会模型”，而是把那些材料放进[上下文](/ai-coding-dictionary/context)，这是你能够控制的输入。

> **译注：这里的使用场景。** 本段面向使用现成模型完成项目任务的读者，强调普通对话不会修改模型参数。另行微调属于额外训练，相关区别见[参数](/ai-coding-dictionary/parameters)词条。库是项目复用的软件功能，内部 API 是组织自己的程序接口。

_用法：_

**英文原例**

> Can we get it to know our internal API?

**中文理解**

“我们能让它了解内部 API 吗？”

**英文原例**

> Not via training — that's a months-long process by the model provider. Load the API docs into context instead, that's the lever you actually have.

**中文理解**

“不能靠训练，那是模型提供商花数月完成的过程。把 API 文档加载进上下文，这是你真正能控制的做法。”

[上一个词条：参数](/ai-coding-dictionary/parameters) · [下一个词条：推理](/ai-coding-dictionary/inference)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/training)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FtrainingTraining%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Training%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ftraining) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/training?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/training)复制地址。
