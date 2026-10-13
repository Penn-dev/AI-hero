---
title: "一手来源"
slug: "primary-source"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

交接

# 一手来源

对象本身，例如代码、对话记录和原始数据。完整、权威，但加载进上下文的成本较高。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

原始形式的事实依据，例如代码、对话记录、原始日志、实际 API 响应。不是对某个东西的描述，而是那个东西本身。与[二手来源](/ai-coding-dictionary/secondary-source)相对。

如果你想知道代码库做了什么，代码就是一手来源。文档、架构图和 README 都是在描述它：写下时准确，此后各自按不同节奏更新。[智能体](/ai-coding-dictionary/agent)非常肯定地说错了项目的某件事时，该问的是它依据哪一种来源工作。读文档的智能体，会继承文档的过时信息；读代码的智能体，读到的是当前事实。

成本让一手来源难以成为默认选择。把它加载到[上下文窗口](/ai-coding-dictionary/context-window)很贵，要加载完整文件、完整对话，每个 [Token](/ai-coding-dictionary/token) 都按[输入](/ai-coding-dictionary/input-tokens)计费，还会争夺[注意力预算](/ai-coding-dictionary/attention-budget)。这笔成本换来的是完整性：没有人事先凭自己的判断，替你筛掉他们认为不重要的内容。上个月写的摘要，不可能包含今天才发现重要的那个细节；一手来源仍然保留着它。

精确性重要时，就去读一手来源，例如准确的函数签名、实际错误、抛出异常的那一行。管理[上下文](/ai-coding-dictionary/context)的很大一部分工作，就是判断何时值得为一手来源付出成本，何时二手来源已经够用。

> **译注：几个证据名称。** API 响应是软件接口实际返回的信息；日志记录运行过程；函数签名说明函数如何调用；抛出异常是程序报告错误的一种方式。README 通常是项目的介绍和使用说明文件。

_用法：_

**英文原例**

> The agent says the retry logic backs off exponentially, but I'm watching it hammer the endpoint.

**中文理解**

“智能体说重试逻辑会指数退避，可我看它一直在猛烈请求那个服务地址。”

**英文原例**

> It read that out of the design doc. Point it at the actual retry module — work from the primary source when the behaviour matters.

**中文理解**

“它是从设计文档里读到的。让它看实际的重试模块。行为本身重要时，要依据一手来源。”

> **译注：指数退避。** 重试失败后，逐渐大幅增加下一次重试前的等待时间，以减少连续请求。

[上一个词条：交接](/ai-coding-dictionary/handoff) · [下一个词条：二手来源](/ai-coding-dictionary/secondary-source)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/primary-source)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fprimary-sourcePrimary%20source%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Primary%20source%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fprimary-source) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/primary-source?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/primary-source)复制地址。
