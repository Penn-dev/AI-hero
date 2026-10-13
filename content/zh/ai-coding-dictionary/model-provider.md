---
title: "模型提供商"
slug: "model-provider"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

模型

# 模型提供商

提供模型推理服务的一方。通常是 Anthropic、OpenAI、Google 这样的远程服务，也可以是 Ollama、llama.cpp 这样的本地服务。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

提供[模型](/ai-coding-dictionary/model)[推理](/ai-coding-dictionary/inference)服务的一方。通常是远程服务，例如 Anthropic、OpenAI、Google；也可以是本地服务，例如在你自己电脑上运行的 Ollama、LM Studio、llama.cpp。[智能体执行框架](/ai-coding-dictionary/harness)不会亲自运行模型，而是请提供商运行。

提供商掌管运行设备：[参数](/ai-coding-dictionary/parameters)存放在它的硬件上，每次[模型提供商请求](/ai-coding-dictionary/model-provider-request)，都是执行框架通过网络发送 [Token](/ai-coding-dictionary/token)，再取得预测结果。因此，有一整类问题出在提供商这里，却常被误认为是模型或执行框架的问题：速率限制、服务能力下降、中断都属于这一层。[智能体](/ai-coding-dictionary/agent)在[会话](/ai-coding-dictionary/session)中途停滞，或者每个[工作轮次](/ai-coding-dictionary/turn)都报错时，值得先查看提供商的服务状态页面。

提供商也决定商业条款：[输入](/ai-coding-dictionary/input-tokens)和[输出 Token](/ai-coding-dictionary/output-tokens)的单价、[前缀缓存](/ai-coding-dictionary/prefix-cache)折扣，以及究竟提供哪些模型。注意，提供商与模型开发者可以是不同公司。Bedrock、Vertex 和 OpenRouter 都会提供其他公司开发的模型。

本地提供商用能力换取控制权：能装进你自己硬件里的模型，规模远小于最前沿模型，但数据不离开这台机器，也没有按 Token 收取的账单。

> **译注：本地与远程。** 本地提供商在自己的机器上运行模型，远程提供商在其服务端运行。这里保留作者对本地运行的比较；实际工作流是否另有外部工具、联网请求或硬件成本，需要另行看具体配置。速率限制是服务对一段时间内请求次数或用量的限制。

_用法：_

**英文原例**

> Can we run this offline for the air-gapped client?

**中文理解**

“我们能为那个隔离网络的客户离线运行这套东西吗？”

**英文原例**

> Swap the model provider to a local one — Ollama or llama.cpp on their box. The harness doesn't care, it just hits a different endpoint.

**中文理解**

“把模型提供商换成本地的，在他们的机器上运行 Ollama 或 llama.cpp。执行框架不用关心，它只是访问了另一个服务地址。”

> **译注：隔离网络与服务地址。** air-gapped 指与外部网络隔离；endpoint 是程序发送请求的服务地址。

[上一个词条：非确定性](/ai-coding-dictionary/non-determinism) · [下一个词条：智能体执行框架](/ai-coding-dictionary/harness)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/model-provider)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmodel-providerModel%20provider%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Model%20provider%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmodel-provider) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/model-provider?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/model-provider)复制地址。
