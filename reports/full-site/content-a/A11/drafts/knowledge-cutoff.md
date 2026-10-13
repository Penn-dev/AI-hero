---
title: "知识截止时间"
slug: "knowledge-cutoff"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

失败模式

# 知识截止时间

模型的参数知识所止于的日期。截止之后的库和 API，如果没有加载文档，就容易让模型编造内容。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[模型](/ai-coding-dictionary/model)的[参数知识](/ai-coding-dictionary/parametric-knowledge)所止于的日期。截止之后的库、API 和事件，都容易诱发编造，除非把相关文档作为[上下文知识](/ai-coding-dictionary/contextual-knowledge)加载。每个发布的模型都有自己的截止时间。

截止时间来自模型的制作方式：[训练](/ai-coding-dictionary/training)把某个时间点的文本快照融入模型[参数](/ai-coding-dictionary/parameters)，之后参数便固定下来。模型不知道自己的知识有边界。问到截止之后的事情时，它不会拒绝，而会根据自己知道的最相近内容推断。这让陷阱不容易察觉：按旧版库写的代码看起来合理，往往还可以编译，却会在发生变化的部分出错。

解决办法始终相同：把当前信息放进[上下文](/ai-coding-dictionary/context)。加载变更记录，指向已安装版本的类型定义，或者让智能体从网上读文档。上下文里有的信息，总比参数里完全没有的信息更有用。

> **译注：版本资料。** 库是项目复用的软件功能；API 是调用接口；类型定义说明数据和调用需要符合什么格式；变更记录列出不同版本的变化。本词条没有给所有模型指定一个统一截止日期。

_用法：_

**英文原例**

> It keeps writing the v3 SDK syntax — we're on v5.

**中文理解**

“它总在写 v3 版 SDK 的语法，可我们用的是 v5。”

**英文原例**

> v5 shipped after the knowledge cutoff. Load the v5 changelog as contextual knowledge, otherwise it'll keep fabricating from the older parametric version.

**中文理解**

“v5 是在知识截止时间之后发布的。把 v5 的变更记录加载成上下文知识，否则它会继续根据参数知识里的旧版本编造。”

[上一个词条：参数知识](/ai-coding-dictionary/parametric-knowledge) · [下一个词条：上下文知识](/ai-coding-dictionary/contextual-knowledge)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/knowledge-cutoff)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fknowledge-cutoffKnowledge%20cutoff%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Knowledge%20cutoff%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fknowledge-cutoff) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/knowledge-cutoff?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/knowledge-cutoff)复制地址。
