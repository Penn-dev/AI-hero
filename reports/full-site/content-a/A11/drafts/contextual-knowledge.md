---
title: "上下文知识"
slug: "contextual-knowledge"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

失败模式

# 上下文知识

智能体眼下能直接从上下文中读取的事实，与参数知识相对。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[智能体](/ai-coding-dictionary/agent)眼下能直接从[上下文](/ai-coding-dictionary/context)中读取的事实，包括用户任务、已经读入的文件、[工具结果](/ai-coding-dictionary/tool-result)，以及[会话](/ai-coding-dictionary/session)开始时加载的 [AGENTS.md](/ai-coding-dictionary/agents-md) 内容。它与[参数知识](/ai-coding-dictionary/parametric-knowledge)相对：参数知识从参数中 _回想_ ，上下文知识则从[窗口](/ai-coding-dictionary/context-window)中 _读取_ 。智能体依据上下文知识工作时，[幻觉](/ai-coding-dictionary/hallucination)少得多，因为答案就在眼前，不必从模糊的记忆中翻找。

这两种知识中，只有上下文知识由你控制。参数已经固定，所以要给[模型](/ai-coding-dictionary/model)补上它缺少的知识，例如内部 SDK、[知识截止时间](/ai-coding-dictionary/knowledge-cutoff)之后发布的库、昨天做出的决定，唯一办法就是把它放进上下文。很多实际的 [AI](/ai-coding-dictionary/ai) 编程工作，归根结底就是这件事：在模型需要的时候，把正确事实放到它面前。

上下文知识与参数知识冲突时，通常是上下文知识胜出。粘贴当前 API 文档，模型就会遵循它，而不是关于旧 API 的过时记忆。不过，旧版本仍可能混进来，尤其是在长会话的后期。如果文档已经加载，智能体却不停退回旧写法，那就是参数知识越过了上下文知识。重新说明纠正，或者把它放得更靠近当前工作，会有帮助。

与参数知识不同，使用上下文知识是有成本的。任何加载进窗口的内容，都会消耗 [Token](/ai-coding-dictionary/token)，并争夺模型的[注意力预算](/ai-coding-dictionary/attention-budget)。所以，加载更多并不自动等于更好，目标是把相关事实放进窗口，而不是把所有事实都放进去。

 _什么时候用这个词：_ 只有在与参数知识对比时才用，其他时候直接说**上下文**。

_避免使用：_“工作记忆”。上下文知识是窗口里 _现在_ 有什么；[记忆系统](/ai-coding-dictionary/memory-system)则负责把跨会话内容放进窗口。层次不同，不要混为一谈。

> **译注：接口材料。** API 是软件调用接口，SDK 是开发工具包；把对应版本的实际文档放进上下文，是向当前请求提供资料，并不修改模型参数。

_用法：_

**英文原例**

> Why does it nail the API when I paste the docs and fabricate it when I don't?

**中文理解**

“为什么我粘贴文档时，它就能把 API 用对，不贴时就开始编造？”

**英文原例**

> With the docs in, it's contextual knowledge — reading off the page. Without, it's parametric and the rare endpoints blur.

**中文理解**

“有文档时，用的是上下文知识，直接照着页面读。没有文档时，用的是参数知识，不常见的接口就会模糊。”

[上一个词条：知识截止时间](/ai-coding-dictionary/knowledge-cutoff) · [下一个词条：注意力关系](/ai-coding-dictionary/attention-relationship)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/contextual-knowledge)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontextual-knowledgeContextual%20knowledge%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Contextual%20knowledge%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontextual-knowledge) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/contextual-knowledge?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/contextual-knowledge)复制地址。
