---
title: "Token"
slug: "token"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# Token

模型读取和写出的最小单位。大小大致相当于一个词，但并不完全相同。上下文窗口大小、费用和延迟都与 Token 数量有关。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Token 是[模型](/ai-coding-dictionary/model)读取和写出的最小单位。它大致与一个词差不多大，但并不完全相同：常见单词往往是一个 Token，罕见词或长词则会拆成多个。[上下文窗口](/ai-coding-dictionary/context-window)大小、费用和延迟，都以 Token 为计量依据。

文本通过分词器变成 Token。分词器使用一份固定词表，包含在模型[训练](/ai-coding-dictionary/training)之前学到的数万个片段，将任何输入拆成一串词表条目。模型从不直接看到字符或单词。输入端的每段文本都会转换成 Token，输出端则通过[下一个 Token 预测](/ai-coding-dictionary/next-token-prediction)，每次生成一个 Token。

按经验估算，一个 Token 约等于四分之三个英文单词，所以一千个 Token 大约是 750 个英文单词。代码就没这么容易预测了：常见关键字和惯用写法可以紧凑地分成 Token，而自动生成的标识符、哈希值、base64 数据块和压缩过的输出，可能让一个“词”拆成许多个 Token。规律是：在分词器的原始材料里经常出现的文本，编码简短、高效；不常出现的文本，会被切成许多小片段。像 `a3f9c2e1` 这样的哈希值从未在材料中出现过，因此会拆成多个 Token；`function` 则是一个 Token。所以，一个看起来很小、却充满特殊字符串的文件，可能会占掉出乎意料的一大块上下文窗口。

Token 是衡量其他东西的单位。费用按 Token 计算，提供商分别对[输入 Token](/ai-coding-dictionary/input-tokens) 和[输出 Token](/ai-coding-dictionary/output-tokens)计费。速度用每秒 Token 数表示，因为输出一次只生成一个 Token。上下文窗口则容纳固定数量的 Token，所以文件的 Token 数决定了能放入多少内容。

> **译注：怎样理解这段估算。** 上面的单词比例针对英文，不能直接套到中文字数。标识符是代码里给变量等对象起的名字；哈希值是根据数据计算的一串标记；base64 是把数据表示成文本的一种编码。具体文本会拆成多少 Token，要以所用模型的分词器为准。

_避免使用：_“单词”。Token 的边界与单词边界并不一致，真正有用的单位是每秒 Token 数、每美元 Token 数。

_用法：_

**英文原例**

> How big is this prompt going to be?

**中文理解**

“这条提示词会占多少空间？”

**英文原例**

> Run it through the tokenizer — the schema's compact but the JSON keys are weird, so they'll split into more tokens than you think.

**中文理解**

“用分词器算一下。这个数据结构定义虽然简短，但 JSON 的字段名比较特殊，拆出来的 Token 会比你想的多。”

> **译注：示例里的两个名字。** schema 是对数据结构的约定；JSON 是常见的文本数据格式，其中的键，也就是这里说的字段名，用来标识每项数据。

[上一个词条：推理投入程度](/ai-coding-dictionary/effort) · [下一个词条：下一个 Token 预测](/ai-coding-dictionary/next-token-prediction)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/token)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FtokenToken%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Token%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ftoken) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/token?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/token)复制地址。
