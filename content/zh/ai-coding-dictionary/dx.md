---
title: "DX：开发者体验"
slug: "dx"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# DX：开发者体验

Developer experience，代码库和工具链让人做好工作有多容易，包括文档、反馈速度和错误信息。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Developer experience，开发者体验，指代码库和工具链让人做好工作有多容易。好的 DX 是快速反馈、清楚的错误信息、能回答你实际问题的文档，以及第一次尝试就能成功的环境设置。这个词远早于 AI 编程出现，放进本词典主要是为了与 [AX](/ai-coding-dictionary/ax) 对比。

DX 就是人与代码库之间的交互，没有更多含义。两类使用者的主要区别是：人是[有状态的](/ai-coding-dictionary/stateful)，智能体是[无状态的](/ai-coding-dictionary/stateless)。人学一次代码库，就能在之后每天继续使用这些知识，所以差 DX 也能凑合：CI 太慢，就攒一批改动再推送；文档缺失，就在 Slack 里问一次；结构混乱，就记住东西在哪里。应对办法不断积累，团队最后即使在处处不顺的代码库里，也能高效工作。

[智能体](/ai-coding-dictionary/agent)面对同一代码库时，没有这些积累。它在[会话](/ai-coding-dictionary/session)之间无状态，每次都要从头了解代码库。快速测试套件和清楚错误信息对它有帮助，但昨天弄明白的东西，除非写进[环境](/ai-coding-dictionary/environment)，否则都没了；智能体又只能通过[工具结果](/ai-coding-dictionary/tool-result)感知环境。这就是 AX 所指出的差距：当开发者换成智能体后，DX 中仍然有效的部分，再加上人类没有的顾虑，例如保持[上下文窗口](/ai-coding-dictionary/context-window)空余。

两者重叠，意味着投入 DX 往往顺便改善 AX：严格类型、快速测试和可预测结构，对双方都有帮助。两者不同，则意味着这种改善不总会发生。一份精美的入职文档能帮助人类一周，但如果不能从 [AGENTS.md](/ai-coding-dictionary/agents-md) 找到它，对智能体就毫无帮助。

> **译注：工具链与入口。** 工具链是项目开发中配合使用的一组工具；CI 是自动验证流程。这里强调资料不仅要存在，还要能被智能体发现和读取。

_用法：_

**英文原例**

> Our DX is fine — new hires are productive in a week.

**中文理解**

“我们的 DX 没问题，新员工一周就能开始高效工作。”

**英文原例**

> Productive because someone sits with them for that week. The agent doesn't get that week; check the AX separately.

**中文理解**

“那是因为那一周有人坐在旁边带他们。智能体没有这一周，要单独检查 AX。”

[上一个词条：原型制作](/ai-coding-dictionary/prototyping) · [下一个词条：AX](/ai-coding-dictionary/ax)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/dx)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FdxDX%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=DX%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fdx) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/dx?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/dx)复制地址。
