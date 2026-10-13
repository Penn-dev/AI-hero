---
title: "我的 Grill Me 技能火了"
slug: "my-grill-me-skill-has-gone-viral"
type: "post"
description: "认识 Grill Me：通过结构化的 AI 对话，深入探讨编程计划、需求和想法的技能。"
tags:
  - get-better-results
updatedAt: "2026-03-23T13:35:30.437Z"
---

这篇文章专门介绍 `/grill-me` 技能，与[我最常用的五个技能原文](https://aihero.dev/5-agent-skills-i-use-every-day)那段视频分开，也可阅读[五个技能的中文文章](/5-agent-skills-i-use-every-day)。这是我做过最灵活的技能，编程之外也会用到。

## 这个技能

完整技能如下：

```md
---
name: grill-me
description: Interview the user relentlessly about a plan or design until reaching shared understanding, resolving each branch of the decision tree. Use when user wants to stress-test a plan, get grilled on their design, or mentions "grill me".
---

Interview me relentlessly about every aspect of this plan until
we reach a shared understanding. Walk down each branch of the design
tree resolving dependencies between decisions one by one.

If a question can be answered by exploring the codebase, explore
the codebase instead.

For each question, provide your recommended answer.
```

中文版 Prompt（学习辅助；name 保留技能标识，description 与正文完整翻译）：

```markdown
---
name: grill-me
description: 围绕计划或设计不断追问用户，直到形成共同理解，并逐一解决决策树的各个分支。当用户希望对计划做压力测试、接受关于设计的深入追问，或提到“grill me”时使用。
---

请不断追问这个计划的每一个方面，直到我们形成共同理解。沿着设计树的各个分支深入，逐一理清不同决策之间的依赖关系。

如果查看代码库就能回答某个问题，就直接查看代码库。

对每个问题，都提供你推荐的答案。
```

这个技能非常短，只有几行，却很有力量。

我最近加入了 “provide your recommended answer” 这一行。当一个问题明显有不错的答案时，AI 现在会主动推荐那个答案。

中文版 Prompt（学习辅助，对应刚提到的新增指令）：

```text
提供你推荐的答案。
```

这显著加快了对话。你不必解释所有细节，只需对推荐回答说 “yes”（好的）即可。

## 它会做什么

AI 会一个接一个地提问，直到双方达成共同理解，再总结讨论过的内容。

这对编程早期阶段非常有用，因为你需要通过讨论，逐步找出所有需求。

在 AI 出现之前，开发者把这称为**小黄鸭调试**：把想法说出来，直到理清各种可能情况。

它也适合非编程场景。我用它思考下一门课程该做什么，让 AI 采访我，展开有趣的讨论。

用于非编程任务时，我会稍作修改：

```
Interview me relentlessly about every aspect of this until
we reach a shared understanding. Walk down each branch of the design
tree resolving dependencies between decisions one by one.
For each question, provide your recommended answer.
```

中文版 Prompt（学习辅助）：

```text
请不断追问这件事的每一个方面，直到我们形成共同理解。沿着设计树的各个分支深入，逐一理清不同决策之间的依赖关系。
对每个问题，都提供你推荐的答案。
```

通常，这样就足以与 AI 展开详细、深入的对话。

## 效果如何

这些深入追问的会话常常持续约 45 分钟。结束时，你会得到一场内容丰富的对话，包含充足上下文、自己的真实想法，以及难题的答案。

这就是 `grill-me` 强大的原因：它是很多场景下都用得上的通用工具。

开始时，你可以有一个完整成形的想法，也可以只用几句模糊的话，说明想构建什么或想弄清什么。

**安装 /grill-me**

动手构建之前，先对计划做压力测试。一条命令即可安装，技能页面还记录每次更新。

原卡片标注：约 2 分钟设置。

[查看技能（中文）](/skills-grill-me) · [英文原站技能入口](https://www.aihero.dev/skills-grill-me)

> 译注：以上完整保留原推广卡片的标题、说明、按钮与时长信息，改为静态链接。时长和效果是作者描述，本次未安装或实际运行技能。

## 开始使用

使用以下命令安装：

```bash
npx skills@latest add mattpocock/skills
```

也可以访问 [GitHub 上的技能仓库](https://github.com/mattpocock/skills)开始了解。
