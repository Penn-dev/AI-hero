---
title: "前缀缓存"
slug: "prefix-cache"
type: "dictionary"
description: "模型提供商一侧的存储机制：连续请求可跳过对相同开头内容的重复处理，并以较低费率计费这些 Token。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
位于[模型提供商](/ai-coding-dictionary/model-provider)一侧的存储机制，让连续的[模型提供商请求](/ai-coding-dictionary/model-provider-request)可以跳过对相同开头内容的重复处理。当一次请求的开头与最近一次请求的开头相同——例如[系统提示词](/ai-coding-dictionary/system-prompt)相同，历史记录直到某个位置都相同——提供商就会复用之前的处理结果，并把这些 [Token](/ai-coding-dictionary/token)作为[缓存 Token](/ai-coding-dictionary/cache-tokens)按低得多的费率计费。

缓存之所以有用，是因为会话的内容通常只会在末尾不断追加。每次请求都会把完整历史重新发送为[输入 Token](/ai-coding-dictionary/input-tokens)（原因见该词条），而在普通[会话](/ai-coding-dictionary/session)中，历史只会在末尾变化：每次请求都是上一次请求再加几条新消息。提供商会处理一次较长且相同的开头，保存结果，然后从前缀结束的位置继续处理。没有缓存的话，一个有 50 个[对话轮次](/ai-coding-dictionary/turn)的会话，要为第一轮被重复处理 50 次付费。

缓存也会过期。缓存条目能保持可用多久因模型提供商而异——通常按分钟计算，而不是按小时。会话闲置超过这段时间后，下一次请求会先以全价重新建立前缀；之后缓存才会再次生效。这主要是[执行框架](/ai-coding-dictionary/harness)开发者需要关心的问题；对用户来说，直观表现是长时间暂停后的请求，会比暂停前的请求更贵。

_用法：_

“为什么会话进行到一半，账单突然上涨了？”

“执行框架开始在每一轮的系统提示词里插入当前时间。前缀缓存会在第一个变动的 Token 处失效，因此之后每次请求都会按全价计费。”

## 中文学习辅助：术语小词典

- **prefix cache**：前缀缓存，复用多次请求中相同开头内容的处理结果，以减少成本和等待时间的机制。
- **Token**：模型处理文本时使用的计量单位，不完全等同于一个汉字或一个英文单词。
- **input tokens**：输入 Token，发送给模型、供它读取和处理的文本计量单位，通常会影响费用。
- **cache tokens**：缓存 Token，已被缓存复用的输入内容，通常按更低费率计费。
