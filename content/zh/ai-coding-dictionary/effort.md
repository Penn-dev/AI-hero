---
title: "推理投入程度"
slug: "effort"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 推理投入程度

控制模型回答前进行多少推理的设置。投入更多，会消耗更多输出 Token，以提高解决困难问题的机会。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

推理投入程度（effort）控制[模型](/ai-coding-dictionary/model)在回答之前进行多少推理。它按每次[模型提供商请求](/ai-coding-dictionary/model-provider-request)设置，决定模型在开始写出你看到的回答之前，会进行多长的思考。和其他输出一样，这些思考在[推理](/ai-coding-dictionary/inference)阶段生成。[智能体执行框架](/ai-coding-dictionary/harness)经常不显示它们，但模型确实在做这些工作。

投入越高，费用越多，速度越慢。推理过程以 [Token](/ai-coding-dictionary/token) 的形式生成，即使你看不到，也会按[输出 Token](/ai-coding-dictionary/output-tokens)计费；而且它们一次生成一个。因此，调高投入程度，会延长回答出现前的等待时间，也会增加账单。这里是在更充分的思考、速度和费用之间取舍。

多数执行框架把投入程度分成少数几个档次：

| 档次 | 适合什么 |
| --- | --- |
| Low，低 | 机械性编辑、查找、要求清楚而且路径唯一的修改。 |
| Medium，中 | 日常编程，通常是默认档。 |
| High，高 | 棘手的缺陷、设计决定、多步骤计划。 |
| Max，最高 | 最困难的问题，答错后纠正代价很大。 |

> **译注：档次和表格。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。保留英文档名便于对照产品界面；具体有哪些档次、怎样计费，取决于所用模型和服务。

设置不当，会向两个方向出问题。困难问题的投入设得太低，就会得到自信却浅薄的回答，跳过了问题真正需要的推理：读起来没问题，却错在以后会让你付出代价的地方。只改一行名字却设成最高档，你就得等它想很久，而结果与最低档能做到的没有区别。

让投入程度匹配任务，不要让它绑定整个[会话](/ai-coding-dictionary/session)。真正难以推敲的部分调高，周围的例行工作再调低。

_用法：_

**英文原例**

> It keeps botching this concurrency fix — I've re-explained it three times.

**中文理解**

“这个并发问题它总是修错，我已经重新解释三次了。”

**英文原例**

> Bump the effort up. That's a reasoning-heavy bug, and on the default setting it's not thinking long enough before it commits to an approach.

**中文理解**

“把推理投入程度调高。这类缺陷很需要推理，默认档下，它在选定方案之前想得还不够久。”

> **译注：并发。** 多个操作在同一时段推进，可能因先后顺序或共享数据而相互影响。

[上一个词条：推理](/ai-coding-dictionary/inference) · [下一个词条：Token](/ai-coding-dictionary/token)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/effort)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FeffortEffort%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Effort%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Feffort) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/effort?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/effort)复制地址。
