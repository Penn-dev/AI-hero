---
title: "沙箱"
slug: "sandbox"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工具与环境

# 沙箱

智能体在其中运行的隔离环境，例如容器、虚拟机或受限 shell。它限制智能体操作造成的影响范围。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[智能体](/ai-coding-dictionary/agent)在其中运行的隔离[环境](/ai-coding-dictionary/environment)，例如容器、虚拟机、临时[文件系统](/ai-coding-dictionary/filesystem)，或者权限受限的 shell。它限制智能体操作的影响范围：即使智能体运行破坏性命令，或者下载恶意内容，损害也会被限制住。这是让 [AFK](/ai-coding-dictionary/afk) 工作变得实际可行的安全基础。

沙箱与[权限模式](/ai-coding-dictionary/permission-mode)从两端解决同一个问题。权限在操作运行之前询问；沙箱限制操作真正运行时能触及什么。权限需要你参与[决策循环](/ai-coding-dictionary/human-in-the-loop)，每次询问都是一次打断，不断提问的会话几乎谈不上自主。沙箱用基础设施代替人的注意力：隔离越强，需要问的问题越少。

隔离有不同层次：

| 层次 | 是什么 | 限制什么 |
| --- | --- | --- |
| 受限 shell | 在每条命令周围施加操作系统级限制 | 项目之外的写入、网络访问 |
| 容器 | 全新文件系统，不挂载凭据，用完丢弃 | 智能体对自己机器做的任何事情 |
| 虚拟机 / 云端 | 完全独立的机器，通常由执行框架提供 | 所有事情，包括内核级逃逸 |

> **译注：隔离层次。** 原页面的“查看表格”控件用于展示上表，本页直接显示完整表格。容器和虚拟机提供不同方式的隔离；凭据是登录或访问服务所需的信息。表格保留作者的概括，实际安全边界仍取决于具体实现和配置，不能把它当作任何隔离都绝无漏洞的保证。

没有任何沙箱能限制这样一种操作：它本来就被允许离开沙箱。拿着你 Git 凭据的智能体能够推送代码，有网络访问权限的智能体能够调用生产环境 API。在决定把边界加厚到什么程度之前，先决定允许什么穿过边界。

_用法：_

**英文原例**

> I want to let it run [bypass-permissions](/ai-coding-dictionary/agent-mode) overnight but I'm not ready for that.

**中文理解**

“我想让它开着[跳过权限询问](/ai-coding-dictionary/agent-mode)运行一整夜，但还没准备好这么做。”

**英文原例**

> Put it in a sandbox — fresh container, no credentials mounted, no network out. Worst case it nukes its own filesystem and you discard the container.

**中文理解**

“把它放进沙箱。用全新容器，不挂载凭据，不允许外连网络。最坏的情况是它毁掉自己的文件系统，你再丢弃容器。”

> **译注：生产环境。** 实际为用户或业务提供服务的环境。示例中的无凭据、无外连网络，是限制条件，不能省略后仍套用其风险判断。

[上一个词条：智能体模式](/ai-coding-dictionary/agent-mode) · [下一个词条：迎合](/ai-coding-dictionary/sycophancy)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/sandbox)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FsandboxSandbox%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Sandbox%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsandbox) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/sandbox?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/sandbox)复制地址。
