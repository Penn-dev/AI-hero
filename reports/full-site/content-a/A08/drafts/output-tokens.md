---
title: "输出 Token"
slug: "output-tokens"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 输出 Token

模型生成并返回的 Token。因为生成它们需要更多计算，所以单价高于输入 Token。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[模型](/ai-coding-dictionary/model)生成并返回的 [Token](/ai-coding-dictionary/token)。它们的计费单价高于[输入 Token](/ai-coding-dictionary/input-tokens)，通常大约是五倍，因为生成它们需要更多计算。

模型写出的所有东西都算在内：你阅读的文字、它生成的代码、[工具调用](/ai-coding-dictionary/tool-call)，以及它回答之前进行的任何扩展思考。最后一项经常让人意外。即使[智能体执行框架](/ai-coding-dictionary/harness)经常不向你显示推理 Token，它们仍按输出计费；提高[推理投入程度](/ai-coding-dictionary/effort)，就会消耗更多。

输出 Token 也决定[会话](/ai-coding-dictionary/session)的节奏。模型读取输入很快，但输出一次只生成一个 Token，所以一个[工作轮次](/ai-coding-dictionary/turn)让人感觉慢时，几乎总是在写输出，而不是在读输入。等待很久，通常意味着一个很长的回答正在生成。

> **译注：费率与等待。** “约五倍”是冻结原文中的概括，不是所有模型都适用的固定费率。具体费用以服务定价为准；真实工作流的等待也可能包括工具执行和网络时间。

_用法：_

**英文原例**

> The refactor session is burning through credit even though the inputs are small.

**中文理解**

“这次重构会话消耗额度很快，输入明明很少。”

**英文原例**

> Agent's rewriting whole files instead of patching. Output tokens cost roughly five times the input rate — get it emitting edits and the bill drops.

**中文理解**

“智能体在重写整个文件，而不是局部修改。输出 Token 的单价大约是输入的五倍，让它只生成修改，账单就会降下来。”

> **译注：重构与局部修改。** 重构是调整代码组织和实现；局部修改只写需要变化的部分，而不是重新输出完整文件。

[上一个词条：输入 Token](/ai-coding-dictionary/input-tokens) · [下一个词条：前缀缓存](/ai-coding-dictionary/prefix-cache)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/output-tokens)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Foutput-tokensOutput%20tokens%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Output%20tokens%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Foutput-tokens) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/output-tokens?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/output-tokens)复制地址。
