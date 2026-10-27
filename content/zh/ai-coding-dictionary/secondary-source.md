---
title: "二手来源"
slug: "secondary-source"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

交接

# 二手来源

对一手来源的描述，隔了一层，例如摘要、文档和压缩摘要。加载便宜，但必然丢失部分信息。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

对[一手来源](/ai-coding-dictionary/primary-source)的描述，隔了一层。例如描述代码的文档、描述对话记录的摘要、描述搜索结果的报告。它比原材料更便宜地加载进[上下文窗口](/ai-coding-dictionary/context-window)，但必然丢失部分信息：撰写者已经决定了什么重要，而被舍弃的部分，对于手里只有摘要的读者来说不可见。

[上下文](/ai-coding-dictionary/context)工程的很多工作，都是制造二手来源。[压缩](/ai-coding-dictionary/compaction)把[会话](/ai-coding-dictionary/session)历史变成摘要，用它开启下一会话；[子智能体](/ai-coding-dictionary/subagent)用自己的上下文处理嘈杂的搜索，只返回一份短报告；[交接材料](/ai-coding-dictionary/handoff-artifact)把会话中的决定浓缩成下一会话要读的文档；[记忆系统](/ai-coding-dictionary/memory-system)把会话学到的东西提炼成笔记。它们都在做相同的取舍：用保真度换取空间。

二手来源会以两种方式出问题。一是有损，例如压缩摘要漏掉了关于数据结构的决定，报告没提到边缘情况。二是过时，一手来源变了，描述却没跟着变，于是文档仍以本季度的肯定语气，描述上季度的架构。[智能体](/ai-coding-dictionary/agent)依据这两类失效的二手来源行动时，就会自信地使用错误信息。解决办法是让它回到一手来源。

这两种问题都不意味着二手来源本身是错误做法。上下文窗口有限，一手来源又昂贵；没有摘要、报告和交接文档，大型工作根本装不进去。关键是判断哪些细节经得起这种损失，哪些经不起；经不起时，就要对照一手来源验证。好的二手来源会带上回到原始材料的[上下文指针](/ai-coding-dictionary/context-pointer)，例如摘要写明原对话在哪里，文档写明它描述的是哪个文件。这样，描述不够用时，读者可以顺着指针找原文，而不是只能依据已经损失过的信息工作。

> **译注：边缘情况。** 不常发生、但可能影响正确性的特殊输入或使用方式。保真度指描述保留原材料信息的程度。

_用法：_

**英文原例**

> The handoff doc says auth is done, but the new session keeps finding broken token refresh.

**中文理解**

“交接文档说身份验证已经做完了，可新会话一直发现令牌刷新有问题。”

**英文原例**

> The doc's a secondary source — the last session wrote down what it believed, not what's true. Have the new session run the auth tests and trust the primary source.

**中文理解**

“文档是二手来源。上一会话写的是它当时相信的情况，不一定是真实情况。让新会话运行身份验证测试，以一手来源为准。”

> **译注：这里的令牌。** 身份验证令牌用于证明登录或访问资格，与模型计量文本所用的 Token 不同；令牌刷新是更新这类访问凭据的过程。

[上一个词条：一手来源](/ai-coding-dictionary/primary-source) · [下一个词条：交接材料](/ai-coding-dictionary/handoff-artifact)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/secondary-source)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsecondary-sourceSecondary%20source%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Secondary%20source%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsecondary-source) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/secondary-source?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/secondary-source)复制地址。
