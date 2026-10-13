---
title: "非确定性"
slug: "non-determinism"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 非确定性

相同输入也可能产生不同输出。这是模型生成文本和提供商处理请求的方式所带来的性质。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

相同输入也可能产生不同输出。给[模型](/ai-coding-dictionary/model)完全相同的[上下文](/ai-coding-dictionary/context)，运行两次，可能得到两个不同答案。有时只是一个词不同，有时却是完全不同的方案。你的代码无需发生任何变化，这种情况也会出现。

这是模型生成文本，以及[模型提供商](/ai-coding-dictionary/model-provider)处理[请求](/ai-coding-dictionary/model-provider-request)的方式所带来的性质。[推理](/ai-coding-dictionary/inference)时，模型为可能的下一个 [Token](/ai-coding-dictionary/token) 生成概率分布，再从中抽取一个。通常会有意加入一些随机性，因为每次都选概率最高的 Token，会产生重复、质量较低的文本。回答开头只要抽到一个不同的 Token，之后所有 Token 都会受影响，一个不同的词就这样变成了完全不同的方案。提供商的服务过程还会带来更多变化：请求在共享硬件上成批处理，不同批次之间微小的浮点数差异，可能在两个概率接近的 Token 之间改变选择。没有一个设置能让这一切都消失。

要预期[智能体](/ai-coding-dictionary/agent)对同一任务会给出一系列不同结果。多数回答的质量落在合理的钟形分布范围内，这也是非确定性还能被接受的原因；但两端的情况确实存在：有些时候模型显得很敏锐，有些时候又像完全跑偏了。同一个任务，掷出了不同的结果。这有两个实际影响。重试是合理策略：一次失败只是从分布中抽到的一个结果，同样的任务重新做一次，可能恰好会做得更好。而且，验证比使用确定性工具时更加重要。你不能只测试一次智能体行为，就指望它每次都能重复，所以需要[自动检查](/ai-coding-dictionary/automated-check)识别不好的结果。

别过度为这些波动编故事。人类擅长寻找模式，一连串糟糕的运行结果，会让人觉得足以证明“模型这周变差了”。通常，那只是分布带来的波动。

> **译注：浮点数和分布。** 浮点数是计算机表示带小数数值的一种方式，计算可能有微小误差。这里的钟形分布描述作者对结果波动的概括，两端指少见的特别好或特别差的结果；本页没有提供统计测量。

_用法：_

**英文原例**

> Claude has been awful today. Did they ship a worse version?

**中文理解**

“Claude 今天糟透了。他们发布了更差的版本吗？”

**英文原例**

> Probably not — model output is non-deterministic. You're going to have good days and bad days on the same task. Try again tomorrow before you go looking for a cause.

**中文理解**

“大概没有，模型输出有非确定性。同一任务也会有状态好和状态差的时候。先等到明天再试，再去寻找原因。”

[上一个词条：下一个 Token 预测](/ai-coding-dictionary/next-token-prediction) · [下一个词条：模型提供商](/ai-coding-dictionary/model-provider)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/non-determinism)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fnon-determinismNon-determinism%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Non-determinism%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fnon-determinism) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/non-determinism?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/non-determinism)复制地址。
