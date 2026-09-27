---
title: "前缀缓存"
slug: "prefix-cache"
type: "dictionary"
description: "模型提供商一侧的缓存：连续请求可以跳过对相同开头的重复处理，这部分 Token 也会按较低费率计费。"
updatedAt: "2026-07-01T08:46:18.000Z"
---
前缀缓存是[模型提供商](/ai-coding-dictionary/model-provider)一侧的存储机制，可以让连续的[模型提供商请求](/ai-coding-dictionary/model-provider-request)跳过对相同开头的重复处理。如果一项请求的开头与近期请求相同——例如[系统提示词](/ai-coding-dictionary/system-prompt)相同，并且此前的对话记录在某个位置之前也完全相同——提供商就会复用上次的处理结果，并把这部分 [Token](/ai-coding-dictionary/token)作为[缓存 Token](/ai-coding-dictionary/cache-tokens)，按低得多的费率计费。

缓存之所以能节省费用，是因为会话记录通常只在末尾增加新内容。每次请求都会把完整记录作为[输入 Token](/ai-coding-dictionary/input-tokens)重新发送（具体原因见“输入 Token”词条）。在普通[会话](/ai-coding-dictionary/session)中，只有记录末尾发生变化：每次请求都是在上一次请求后面再加几条新消息。提供商只需处理一次前面大段相同的内容，保存处理结果，下次再从相同前缀的结尾继续。没有缓存的话，一个包含 50 个[工作轮次](/ai-coding-dictionary/turn)的会话，就要为第一轮内容被重复处理 50 次付费。

缓存也会过期。一份缓存能保持可用多久，取决于模型提供商——通常是几分钟，而不是几小时。如果会话闲置时间超过了有效期，下一次请求就需要按全价重新处理一次相同前缀，之后缓存才会继续生效。这主要是[执行框架](/ai-coding-dictionary/harness)开发者需要关心的问题。对普通用户来说，最直接的表现是：长时间暂停后的第一项请求，可能比暂停前的请求更贵。

_用法：_

“为什么会话进行到一半，账单突然增加了？”

“执行框架开始在每个工作轮次的系统提示词中插入当前时间。只要有一个 Token 发生变化，从那里开始就无法再使用前缀缓存，所以之后的每项请求都按全价计费了。”

## 中文学习辅助：术语小词典

- **prefix cache**：前缀缓存，复用多次请求中相同开头的处理结果，从而减少费用和等待时间的机制。
- **Token**：模型读取和生成文本时使用的计量单位，并不严格等于一个汉字或一个英文单词。
- **input tokens**：输入 Token，发送给模型读取和处理的内容所占的 Token，通常会影响费用。
- **cache tokens**：缓存 Token，能够复用已有处理结果的输入内容，通常按较低费率计费。
