---
title: "参数知识"
slug: "parametric-knowledge"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

失败模式

# 参数知识

模型从训练中获得、保存在参数里的知识，在训练时固定。与上下文知识相对。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[模型](/ai-coding-dictionary/model)从[训练](/ai-coding-dictionary/training)中“知道”的东西，保存在[参数](/ai-coding-dictionary/parameters)里。它在训练时固定，模型不能查看或更新自己的参数。压缩过程会丢掉细节：数十亿条事实挤进固定数量的参数，罕见事实会变模糊。它让模型能流畅地谈论常见主题，也会让模型在不常见的主题上编造内容。与[上下文知识](/ai-coding-dictionary/contextual-knowledge)相对。

参数知识并不是以一条条事实存储的。训练从未给模型一个可查资料的数据库，而是不断调整参数，直到模型能较好地预测文本。一个善于预测某主题文本的模型，表现起来就像了解这个主题。知识的可靠程度，与某件事在训练数据中出现得多频繁有关：有数百万个例子的主题，可以准确复现；只有少数例子的主题，模型则根据相似主题的样子猜测。对模型来说，复现和猜测是同一个过程，所以它无法区分自己正在做哪一种。编造的回答与正确回答同样流畅。[幻觉](/ai-coding-dictionary/hallucination)就是模型猜错了。

参数知识也会老化。参数在[知识截止时间](/ai-coding-dictionary/knowledge-cutoff)停止变化，所以在那之后发布或改名的库不在其中；已经改变的 API，也仍以旧形式被记住。

对于这两种缺口，也就是太罕见和太新，补救相同：既然不能把知识加入参数，就必须改用上下文知识来提供。

> **译注：两种知识的区别。** 参数知识来自模型已有训练；上下文知识是本次提供给模型的材料。这里讨论使用现成模型时补充信息，不是另行训练模型。

_用法：_

**英文原例**

> It writes flawless React but invents methods on our internal SDK.

**中文理解**

“它写 React 几乎没有错误，却在我们的内部 SDK 上编造方法。”

**英文原例**

> React is dense in the parametric knowledge — millions of training examples. Your SDK isn't, so the model fills in plausible-looking shapes. Load the SDK docs into [context](/ai-coding-dictionary/context).

**中文理解**

“React 在参数知识里很丰富，有数百万个训练例子。你们的 SDK 没有，所以模型会补出看似合理的样子。把 SDK 文档加载进[上下文](/ai-coding-dictionary/context)。”

> **译注：React 和 SDK。** React 是构建用户界面的软件库；SDK 是软件开发工具包，包含调用某项服务或功能所需的代码和工具。

[上一个词条：幻觉](/ai-coding-dictionary/hallucination) · [下一个词条：知识截止时间](/ai-coding-dictionary/knowledge-cutoff)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/parametric-knowledge)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fparametric-knowledgeParametric%20knowledge%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Parametric%20knowledge%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fparametric-knowledge) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/parametric-knowledge?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/parametric-knowledge)复制地址。
