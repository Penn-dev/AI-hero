---
title: "/improve-codebase-architecture Skill"
slug: "skills-improve-codebase-architecture"
type: "post"
description: "找出值得重构的模块，形成可视化报告。"
tags:
  - ship-solid-code
updatedAt: "2026-08-24T09:14:47.195Z"
---

## 它能做什么

`improve-codebase-architecture` 调查代码库，寻找**加深模块的机会**：接口几乎与内部内容同样复杂的浅模块，在哪些地方能变成深模块。它写一份自包含 HTML 报告，再围绕你选中的候选进行[追问](https://www.aihero.dev/ai-coding-dictionary/grilling)。

它从不改代码。整个执行产出对话，以及操作系统临时目录中的一个 HTML 文件。真正重构稍后在独立[会话](https://www.aihero.dev/ai-coding-dictionary/session)里走正常开发流程。因此它是调查工具，不是重构工具，尚未准备修改的代码库也能用。

两道筛选避免报告变成泛泛的清理建议。第一，每个候选必须通过**删除测试**：移除这个模块后，复杂性会移到更小的接口后面，还是散落到调用方？只有第一种获得卡片。第二，除非你指定区域，否则先读最近提交历史，重点扫描经常变化的路径。没人碰的代码，即使加深，重构也收不回成本。

## 什么时候该用它

输入 `/improve-codebase-architecture`；[智能体](https://www.aihero.dev/ai-coding-dictionary/agent)不会自行调用。

它不是主要开发链的一步。定期运行，是为了排出后续改善代码库的工作。常见四种情况：

| 情况 | 用法 |
| --- | --- |
| 日常维护 | 每隔几天或有空时跑，避免功能开发间隙结构退化 |
| 大开发前 | 指向[规格](https://www.aihero.dev/ai-coding-dictionary/spec)，问“how can we make this change easy?”，这是最有效的提示 |
| 现有代码库审查 | 对大型、无结构或[凭感觉编写](https://www.aihero.dev/ai-coding-dictionary/vibe-coding)的仓库，查明整体状况 |
| 老代码补测试 | 在给难测代码写测试前，找出缺少的接缝 |

中文 Prompt（译注）：

```text
怎样才能让这次修改更容易？
```

与相邻 Skills 的区别：

- 已经选好一个模块，想设计它，用 [codebase-design](https://aihero.dev/skills-codebase-design)。本 Skill 找模块，`codebase-design` 负责设计。
- 工作大到一次会话装不下，用 [wayfinder](https://aihero.dev/skills-wayfinder)。
- 某个具体东西坏了，用 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)。如果真正发现的是没有好接缝把 bug 固定在测试里，它会把你带回这里。

## 使用前提

运行不需要前提。有 `GLOSSARY.md` 或 `docs/adr/` 下的 ADR 时，会读并采用领域名词。因此候选会写成“加深订单接收模块”，而非“重构 FooBarHandler”。

它写两类位置。报告放在仓库外的 `<tmpdir>/architecture-review-<timestamp>.html`。追问循环中，在 `GLOSSARY.md` 新增或精确定义术语，不存在就创建。也会提议把拒绝候选的理由记录为 ADR，免得未来反复建议。

译注：接缝是可以替换或观察行为的接口位置；ADR 记录重要决定的理由；临时目录不是长期保存位置。

## 深度，以及寻找深度的报告

核心是**深度**。深模块把大量行为放在小而稳定的接口后；浅模块的接口几乎与底层代码同样宽，把实现细节暴露出去。报告寻找三种浅层设计：

- 只为可测试性提取纯函数，而真实 bug 在调用方如何使用它，没有**局部性**。
- 模块内部内容跨越**接缝**泄漏。
- 一个概念必须打开五个文件才能理解。

针对每种，它建议能够解决问题的加深方式。

每个候选是一张卡片，包含涉及文件、使用困难、白话解决方案、**局部性**与**杠杆效应**收益、前后图示和建议强度标签。

| 标签 | 对你意味着什么 |
| --- | --- |
| `Strong` | 明确通过删除测试，困难也真实，值得认真考虑 |
| `Worth exploring` | 加深方案有道理，但收益取决于后续代码发展 |
| `Speculative` | 为完整性列出，大部分可以忽略 |

报告结尾给出**首选建议**，也就是它会先做的候选。然后停下，问你想探索哪个。此时尚未决定任何方案，也没改代码。

译注：局部性让改动和验证集中一处；杠杆效应指只学少量接口，就能使用较多能力。

## 选中一个之后

选择候选后，启动 [grilling](https://aihero.dev/skills-grilling) 会话，讨论限制、什么放到接缝后、哪些测试应保留，以及加深后的接口长什么样。结果是决定，不是 diff。接着走正常流程：交给 [to-spec](https://aihero.dev/skills-to-spec)，再 [to-tickets](https://aihero.dev/skills-to-tickets)，再 [implement](https://aihero.dev/skills-implement)。

## 常见问题

**它围绕一个想法问了一小时，却不给选项，能关掉吗？**

可以，调用时说“don't grill me, just show the report”。

中文 Prompt（译注）：

```text
不要向我追问，只展示报告。
```

这是最常见的抱怨。一位用户原本喜欢它，认为是“a convenient way to get a thorough analysis of improvements”；加了追问后，却觉得“borderline unusable”，会话中只提一个方案，再问“10's or 100's of questions”。

中文理解：原先是方便取得全面改进分析的办法，后来却近乎无法使用，只围绕一个方案问几十甚至上百题。

设计意图是先报告，你选择后才追问。但较弱[模型](https://www.aihero.dev/ai-coding-dictionary/model)会直接采访自己想到的第一个想法。讨论中不同模型表现差异很大。问题仍开放，尚无文档化的不追问模式。

**报告打开是没样式的原始 HTML，也没图，怎么了？**

报告从 CDN 加载 Tailwind 和 Mermaid，因此打开时需要网络。脚本被拦截，页面会悄悄坏掉。已报告案例中，安全 hook 要求 SRI 哈希。智能体加了哈希，但 CDN 发给浏览器的字节与计算哈希的 `curl` 得到的不同，浏览器就拦截了脚本。离线或严格管控环境也会如此。智能体自己看不到，因为它不渲染页面。可要求内联 CSS 和手写 SVG 图，替代 CDN。此问题仍开放。

译注：CDN 提供外部资源；SRI 是浏览器核对资源哈希的完整性机制。上述说明不是要求绕过浏览器安全检查。

**给了十二个候选，同会话全做还是另开？**

一次会话一个候选。多个一起做，会让[上下文窗口](https://www.aihero.dev/ai-coding-dictionary/context-window)同时塞满报告、追问、领域文档修改和代码变化。报告只是临时文件，应把候选带下去，而非依赖文件。选一个、问清楚、交给 `/to-spec`。剩下的变成[任务单](https://www.aihero.dev/ai-coding-dictionary/ticket)，以后分别领取。先把选中的改进写成规格，不要直接实现。大家常问，但 Skill 自己没有记载这套后续流程。

**怎样写提示词？**

告诉它接下来要做什么。大开发前，给规格，问“how can we make this change easy?”。

中文 Prompt（译注）：

```text
怎样才能让这次修改更容易？
```

不给提示，它会自己找经常改动的区域，适合日常维护；给方向，报告就更能用于行动。

**大型遗留代码库能用吗？**

部分能。对缺少一致结构的大型现有代码库效果好，也是一次性结构整理后的推荐维护工具。但失控项目的用户说“helped a little but still doesn't seem to cut it”。

中文理解：有点帮助，但似乎仍不够。

一个八年历史代码库的开发者报告，模型绕圈子；同一 Skill 在整洁仓库却能画出清楚图示。尚无专门 `/refactor` Skill 处理这种情况。没有共同词汇，先运行 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，通常能明显改善输出。

**与 `/codebase-design` 有何不同？**

`/codebase-design` 是参考资料，不驱动会话。它提供模块、接口、深度、接缝、适配器、杠杆效应、局部性等词汇，本 Skill 使用这些词。把 `/codebase-design` 单独当成新智能体任务，会发生已知失败：没有自己的流程，于是智能体发明流程，重新探索代码，跑很久才提问。应运行本 Skill，让它使用那份参考资料。

**它会说代码库已经很好吗？**

很少，开始前要知道。它存在的目的就是给发现，所以倾向于给候选，而非认定没问题。用强度标签校正。如果全部都是 `Speculative`，就等于没找到值得做的改进。

**Codex 或其他执行框架能用吗？**

部分能。探索步骤直接写 Claude Code 的 `Agent` 工具和 `subagent_type=Explore`。没有该工具的[执行框架](https://www.aihero.dev/ai-coding-dictionary/harness)可能跳过并行探索，而非改用自己的等价工具。Skill 仍能跑，但扫描不够深入。有人提议改成框架无关写法，尚未合入。

**怎样在 TypeScript 中真正实现深模块？**

Skill 没有好答案。人们常要求提供含具体文件和模块布局的 `TYPESCRIPT.md`，但不存在。它告诉你哪里该加深、接缝后放什么，怎样转成软件包或目录结构，得自己做。

## 出现这些迹象，就说明它在发挥作用

- 候选使用领域概念，例如订单接收模块，而非自创类名 FooBarHandler。
- 候选来自近期修改文件，而非没人碰的部分。
- 执行中没改代码，新增文件只有临时目录中的 HTML 报告。
- 报告后停下问你选哪个，不自行继续。
- 每张卡用局部性或杠杆效应解释收益，说明哪些测试会变简单，不只说更干净。
- 因长期理由拒绝候选时，它提议记录 ADR，避免下次重复。

译注：上面“新增文件只有报告”是原文的调查阶段检查项；前文同时明确，后续追问可能创建或更新词汇表、提议 ADR。不能把它理解成整个过程绝不写其他文档。

## 它处在什么位置

`improve-codebase-architecture` 是**定期维护**。每隔几天在主链之外运行，排出工作，不直接做。邻居是：

- [codebase-design](https://aihero.dev/skills-codebase-design)，掌管候选使用的深度与接缝词汇。
- [grilling](https://aihero.dev/skills-grilling)，选中后讨论决策树。
- [domain-modeling](https://aihero.dev/skills-domain-modeling)，在决定过程中更新 `GLOSSARY.md` 和 ADR。

产出是一个想法，从 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 或 [to-spec](https://aihero.dev/skills-to-spec) 回到主要开发流程。主要流程末端与它对应的是 [retro](https://aihero.dev/skills-retro)：本 Skill 改善智能体工作的代码结构，`retro` 则在开发后改善周围环境，包括检查、规范、引导文件。该选哪种，用 [ask-matt](https://aihero.dev/skills-ask-matt)。

译注：相关中文词条：[追问讨论](/ai-coding-dictionary/grilling)、[上下文窗口](/ai-coding-dictionary/context-window)、[智能体执行框架](/ai-coding-dictionary/harness)。中文页未接入时会回到原站英文页。
