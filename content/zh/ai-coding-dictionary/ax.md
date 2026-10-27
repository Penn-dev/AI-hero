---
title: "AX：智能体体验"
slug: "ax"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# AX：智能体体验

Agent experience，环境对智能体做好工作的支持程度，体现在检查、架构和可用上下文空间等方面。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Agent experience，智能体体验，指[环境](/ai-coding-dictionary/environment)为[智能体](/ai-coding-dictionary/agent)在代码库中做好工作准备得怎样。它对应的是面向人的 [DX](/ai-coding-dictionary/dx)。同一个智能体在一个仓库表现好，在另一个仓库表现差，[模型](/ai-coding-dictionary/model)和[执行框架](/ai-coding-dictionary/harness)都相同，差别通常就在 AX。人的本能是责怪模型或重写提示词，实际更常需要修的是代码库。

好的 AX 有三个主要方面：

| 方面 | 好的 AX 是什么样 |
| --- | --- |
| 自动检查 | 快速、确定性的[自动检查](/ai-coding-dictionary/automated-check)，包括类型、测试、lint，让智能体无需人参与也能自行修正 |
| 架构 | 智能体无需读完所有东西就能找到方向：结构可预测，小接口背后有大量行为，名字说清功能 |
| 空余上下文 | [AGENTS.md](/ai-coding-dictionary/agents-md)、[Skill](/ai-coding-dictionary/skill) 和[工具](/ai-coding-dictionary/tool)保持精简，让[上下文窗口](/ai-coding-dictionary/context-window)的大部分空间留给任务，使智能体留在[高效区](/ai-coding-dictionary/smart-zone)，而不是被信息淹没 |

> **译注：表格与术语。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。架构是代码的组织方式；接口是其他代码使用它的约定；lint 是不运行完整程序就检查代码规则的工具。

AX 与 DX 有重叠，好的检查和清楚的架构对两者都有帮助，但它们也有差异。人能容忍只靠口耳相传的知识、缓慢的 CI，以及“去问 Sarah 计费模块的事情”，智能体不能。

**英文 Prompt（依赖口头知识的例子）**

> ask Sarah about the billing module

**中文版 Prompt**

> 去问 Sarah 关于计费模块的事情

智能体不会从 IDE 的悬浮提示或漂亮仪表盘中受益，它们需要失败信息以文字形式出现在[工具结果](/ai-coding-dictionary/tool-result)里。一个代码库可以 DX 很好，AX 却很差。

 _避免使用：_ 把 AX 当成 DX 的同义词，这两类使用者需要不同的投入。

> **译注：CI 与 IDE。** CI 是自动运行验证的持续集成流程；IDE 是编写代码所用的集成开发环境。上面的 Sarah 是原文例子中的人名。

_用法：_

**英文原例**

> The agent writes great code in the API repo and garbage in the frontend.

**中文理解**

“智能体在 API 仓库里写出的代码很好，到了前端就很糟。”

**英文原例**

> The API repo has strict types and a fast test suite; the frontend has neither and forty always-loaded skills. That's an AX gap, not a model problem.

**中文理解**

“API 仓库有严格类型和快速测试套件，前端两样都没有，还始终加载四十个 Skill。这是 AX 差距，不是模型问题。”

[上一个词条：DX](/ai-coding-dictionary/dx) · [下一个词条：软件工厂](/ai-coding-dictionary/software-factory)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/ax)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FaxAX%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=AX%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fax) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/ax?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/ax)复制地址。
