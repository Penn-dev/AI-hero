---
title: "幻觉"
slug: "hallucination"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

失败模式

# 幻觉

模型以肯定语气给出的错误内容。分为两类：事实准确性问题，也就是编造事实；忠实性问题，也就是偏离已加载的上下文。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

“幻觉”是指[模型](/ai-coding-dictionary/model)以肯定语气给出的错误内容。它可以分为两类，两者的成因和处理方法并不相同：

| 类型 | 出了什么问题 | 原因 | 处理方法 |
| --- | --- | --- | --- |
| _事实准确性（Factuality）_ | 编造或弄错了现实世界中的事实，例如不存在的函数、错误的 API 签名或虚假的引用来源 | [参数知识](/ai-coding-dictionary/parametric-knowledge)存在空缺，尤其容易发生在[知识截止时间](/ai-coding-dictionary/knowledge-cutoff)之后的信息上 | 加载正确的[上下文知识](/ai-coding-dictionary/contextual-knowledge) |
| _忠实性（Faithfulness）_ | 输出偏离了已经加载的上下文知识、用户指令，或模型自己此前的推理 | [注意力衰减](/ai-coding-dictionary/attention-degradation)；进入[低效区](/ai-coding-dictionary/smart-zone)后会更加严重 | [清空](/ai-coding-dictionary/clearing)或[压缩](/ai-coding-dictionary/compaction) |

> **译注：表格与代码术语。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。API 签名说明如何调用一个软件接口，包括需要哪些参数。参数知识是模型通过训练形成的知识；上下文知识是本次提供给它的信息。

[下一个 Token 预测](/ai-coding-dictionary/next-token-prediction)无论依据的事实是否真实，都能生成流畅的内容。模型内部没有一个信号能明确告诉它“我不知道”，所以编造出来的方法名也会和正确的方法名一样，以十分肯定的语气出现。出现幻觉的代码之所以看起来可信，正是因为它通常很像“如果这个 API 真的存在，本来应该有的样子”。这类错误很容易躲过匆匆浏览式的审查，直到代码实际运行时才暴露。

必须先判断遇到的是哪一类幻觉，因为解决一类问题的方法，会加重另一类问题。事实准确性问题说明模型缺少知识，应该补充上下文，例如文档、类型定义或相关文件。忠实性问题则说明正确知识已经在上下文中，只是在争夺模型注意力时被忽略了，此时应该减少上下文。如果把忠实性问题误判成事实准确性问题，继续粘贴更多文档，只会让上下文更长、偏离得更严重。智能体答错时，应先检查正确信息是否已经在上下文中，再判断是哪种问题。

 _避免使用：_ 不要笼统地把所有“错误”都称为“幻觉”，如果不说明是哪一类，这个词就无法帮助你诊断原因。

_用法：_

**英文原例**

> It hallucinated a `parseAsync` method on the schema.

**中文理解**

“它凭空说这个数据结构有一个 `parseAsync` 方法。”

**英文原例**

> Factuality or faithfulness?

**中文理解**

“是事实准确性问题，还是忠实性问题？”

**英文原例**

> The method exists in the docs I pasted — it just stopped reading them after [turn](/ai-coding-dictionary/turn) forty.

**中文理解**

“这个方法就在我粘贴的文档里，只是到了第 40 个[工作轮次](/ai-coding-dictionary/turn)，它就不再参考那些文档了。”

**英文原例**

> Faithfulness then. Compact and reload, don't bother adding more docs.

**中文理解**

“那就是忠实性问题。先压缩上下文，再重新加载，不用继续添加文档。”

> **译注：示例中的方法。** schema 是数据结构的定义，`parseAsync` 是对话提到的方法名。这里保留“方法明明在文档里”的后续澄清，用来说明应先确认错误属于哪一类。

[上一个词条：迎合](/ai-coding-dictionary/sycophancy) · [下一个词条：参数知识](/ai-coding-dictionary/parametric-knowledge)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/hallucination)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FhallucinationHallucination%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Hallucination%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhallucination) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/hallucination?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/hallucination)复制地址。
