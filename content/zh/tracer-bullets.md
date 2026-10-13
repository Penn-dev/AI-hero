---
title: "曳光弹：控制 AI 生成代码的质量"
slug: "tracer-bullets"
type: "post"
description: "通过小而完整的端到端功能尽早获得反馈，用曳光弹方法控制 AI 代码质量，避免一次生成臃肿的解决方案。"
tags:
  - level-up-your-workflow
  - ship-solid-code
updatedAt: "2026-01-22T13:21:37.803Z"
---

这篇文章会帮助你解决 AI 低质量代码堆积的问题。方法是让智能体按**曳光弹**思考，也就是每次构建一小块端到端贯通的功能。

这是经典的软件开发技巧，与 AI 协作时尤其有效。

## 问题：低质量代码太多

AI 天生倾向于迎合，在行为的各个方面都想讨人喜欢。“You're absolutely right!”（你说得完全对！）

体现在代码里，就是它想一次交出完整方案。它脑中已有一个完整文件或完整功能的样子，然后一步到位，把所需代码全部生成出来。

它不会停下来验证假设或获取反馈，而是不断往前做，孤立地构建整层代码，却从没检查关键路径究竟能不能跑通。

结果呢？你得到一大堆需要返工的代码，质量低、分量大。开发者还得承担沉重的审查负担，把这些烂摊子逐一看完。

### 实际会是什么样

例如，你让 AI 构建一个数据库服务，以及连接它的 API。

AI 先做了：

- 所有 API 端点：`GET`、`POST`、`PUT`、`DELETE`
- 完整的请求/响应模型
- 错误处理中间件
- 身份验证逻辑
- 速率限制
- 日志基础设施

做完这一切，它才试着连接数据库。然后才发现连接字符串格式错了，或者列类型用错了，又或者测试根本没有连到数据库。

《程序员修炼之道》把这叫作 “outrunning your headlights”，也就是车速快到超过车灯照亮的范围。AI 在黑暗中做得太多，却没有反馈循环来尽早验证假设，最后留下一大摊工作，等你这个开发者收拾。

## 解决办法：曳光弹

**曳光弹**这个概念来自《程序员修炼之道》（The Pragmatic Programmer）。它是一小片端到端的功能，同时贯穿系统各层。

不要孤立地构建水平分层，而是先做一条很窄的纵向切片：

1. 端到端完成一个小功能
2. 立即测试
3. 获取反馈
4. 换一个新的上下文窗口，处理下一片
5. 重复

这种方法直接解决了“跑得比车灯还远”的问题。反馈循环被放进流程中，而不是闭着眼睛不断堆功能。

一旦测试过这条小切片，你就能更有把握地交付确实能工作的功能，不必寄希望于最后所有大层次能自动拼起来。

### 强制 AI 从小处着手

Prompt 必须说得非常明确。AI 天生倾向于孤立地构建大层次，你需要让它做一条贯穿系统各层的端到端切片。

下面的 Prompt 可以加入 Ralph 循环，或 “build-feature” 技能，强制 AI 按曳光弹方式思考：

```
## Tracer Bullets

When building features, build a tiny, end-to-end slice of the feature first, seek feedback, then expand out from there.

Tracer bullets comes from the Pragmatic Programmer. When building systems, you want to write code that gets you feedback as quickly as possible. Tracer bullets are small slices of functionality that go through all layers of the system, allowing you to test and validate your approach early. This helps in identifying potential issues and ensures that the overall architecture is sound before investing significant time in development.
```

中文版 Prompt（学习辅助）：

```markdown
## 曳光弹

构建功能时，先完成一条极小的端到端功能切片，寻求反馈，再以它为基础逐步扩展。

曳光弹这个概念来自《程序员修炼之道》。构建系统时，应当编写能尽快带来反馈的代码。曳光弹是贯穿系统所有层的小功能切片，让你尽早测试并验证所采用的方法。它有助于发现潜在问题，并在投入大量开发时间前确认整体架构是否合理。
```

## 我使用这份 Prompt 的结果

下面是最近我与 AI 智能体用曳光弹方法处理的一个 Issue：

```
Looking at the issue, I need to implement a "Reveal in File System" feature for videos. Let me break this down:

## Task Breakdown for Issue #161

1. **Tracer bullet**: Create backend endpoint that executes the PowerShell command to reveal a file in Windows Explorer from WSL
2. Add "Reveal in File System" to standalone videos context menu
3. Add "Reveal in File System" to video editor actions dropdown
4. Add "Reveal in File System" to sidebar video context menu

I'll start with the **tracer bullet** - creating the backend endpoint and wiring it up to one location.
```

中文理解（学习辅助，完整对应原文智能体输出）：

```markdown
查看这个 Issue 后，我需要为视频实现“在文件系统中显示”功能。让我拆分一下：

## Issue #161 的任务拆分

1. **曳光弹**：创建后端端点，执行 PowerShell 命令，从 WSL 在 Windows 资源管理器中显示文件
2. 在独立视频的上下文菜单中加入“在文件系统中显示”
3. 在视频编辑器的操作下拉菜单中加入“在文件系统中显示”
4. 在侧边栏视频的上下文菜单中加入“在文件系统中显示”

我会先完成**曳光弹**：创建后端端点，并把它接到一个界面入口。
```

我没有让 AI 一次构建全部四个 UI 位置，而是让它只做一条端到端切片：把后端端点接到一个 UI 入口。这样就能先验证核心功能确实有效，再继续扩展。

> 译注：原文这一段说“四个 UI 位置”，但上面的清单实际是一个后端任务加三个 UI 位置，数量表述不一致，此处保留并注明。示例是作者已有工作记录，不是本次实现或测试结果。

## 经典方法里有答案

曳光弹并不新，测试驱动开发也不新。它们是老书里的老概念，是几十年来形成最佳实践的基础思想。

问题在于，新技术出现时，人们往往太兴奋，忘了回头看看经典，只顾追逐新鲜东西，而不是经过验证的方法。

但这些原则对 AI 比对人类更重要。上下文窗口的限制，让这种纪律变得不可妥协。你也许能让人类开发者忽视曳光弹，但对 AI 智能体这么做，后果会立刻显现。

[/prototype 技能中文页](/skills-prototype)自动化的正是这种曳光弹思路：用可丢弃的代码回答问题。也可前往[英文原站技能入口](https://www.aihero.dev/skills-prototype)。

> 译注：上段是原文技能提示框的静态呈现，没有运行技能。

## 最后的建议

下次和 AI 智能体一起工作时，问问自己：我是不是让它跑出了车灯能照亮的范围？有没有让它尽早验证假设，还是任由它在黑暗里构建？

用曳光弹。让智能体从小处着手，端到端打通，获得反馈，再有把握地向前推进。
