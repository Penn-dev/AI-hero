---
title: "/tdd Skill"
slug: "skills-tdd"
type: "post"
description: "红、绿、重构循环的规则。"
tags:
  - phase-6
  - test-and-evaluate
  - ship-solid-code
updatedAt: "2026-08-24T09:14:47.195Z"
---

## 它能做什么

`tdd` 用测试先行的方式开发功能或修 bug：先写一个失败测试，再写刚好足够让它通过的代码，然后处理下一个行为。它提供让循环产出值得保留的测试所需的标准：什么是好测试、放在哪里、mock 用来做什么，以及三种会让测试集失去价值的反模式。

它不会在你尚未确认的接缝上写测试。任何测试出现前，先说出准备测试的公开边界，停下等你确认。测试精力有限，这一步把精力放到关键路径，而非每个边角情况。`tdd` 也是**参考资料**，不是驱动流程。它包含循环规则，由你或 [implement](https://aihero.dev/skills-implement) 来运行实际采用这些规则的[会话](https://www.aihero.dev/ai-coding-dictionary/session)。

译注：TDD 是测试驱动开发；mock 是模拟依赖的替身。接缝是无需深入内部实现，就能观察行为的公开边界。

## 什么时候该用它

输入 `/tdd`；当你要求测试先行开发或修 bug，或说“red-green-refactor”时，[智能体](https://www.aihero.dev/ai-coding-dictionary/agent)也会自动调用。

中文理解：red-green-refactor 指先让测试失败、再通过，然后重构；本 Skill 实际删去了最后一步，后文解释这个差异。

有一个具体行为，输入和可观察输出明确，而且希望测试经得起重构时，使用它。

| 你的情况 | 去哪里 |
| --- | --- |
| 输入输出明确的行为，例如业务逻辑、请求响应约定、转换、校验 | `tdd` |
| 行为尚未确定 | [to-spec](https://aihero.dev/skills-to-spec)，它也会在写代码前确认测试接缝 |
| 真正的问题是接口形状，而非测试 | [codebase-design](https://aihero.dev/skills-codebase-design) |
| 已有[规格](https://www.aihero.dev/ai-coding-dictionary/spec)或[任务单](https://www.aihero.dev/ai-coding-dictionary/ticket)，希望整轮开发有人驱动 | [implement](https://aihero.dev/skills-implement)，逐张任务驱动 `tdd` |
| 配置、接线、胶水代码、类型注解、直接委派的增删改查 | 这里没有合适工具，见下方缺口 |

最后一行是真实缺口。Skill 决定接缝*在哪里*，却不判断修改*值不值得*走这个循环。没有独立事实依据可供断言时，得到的测试只会复述实现，这正是它警告的同义反复反模式，只是从另一条路走进来了。[issue #746](https://github.com/mattpocock/skills/issues/746) 仍开放。解决前，要自己判断，或把规则写进 `CLAUDE.md`。

## 使用前提

需要安装 [codebase-design](https://aihero.dev/skills-codebase-design)。`tdd` 以前自带深层模块和接口设计说明，v1.0 删除后改用共享 Skill，`tdd` 现在使用它的接口设计词汇。除此之外没有前提，它是[无状态的](https://www.aihero.dev/ai-coding-dictionary/stateless)，不写自己的状态文件。

## 循环，以及运行它的接缝

Skill 建立在三个词上。

**红绿循环。** 先写失败测试，再写刚好让它通过的代码。不为下下个测试提前写代码。没有重构阶段，2026 年 6 月已经移除，因为智能体几乎不做这一步，而且把实现与审阅拆成独立会话效果更好。重构属于 [code-review](https://aihero.dev/skills-code-review)。

**纵向切片。** 在一个接缝写一个测试，再写最少实现，重复。第一轮是一颗**曳光弹**，证明一条路径端到端能通。相反的水平拆分是先写全部测试，再写全部代码。批量写的测试验证的是*想象中的*行为，检查结构而非用户动作，还会在理解实现之前就把测试结构固定。

**预先确认的接缝。** 接缝是不用伸进内部就能观察行为的公开边界。规则没有例外，未经确认的接缝不写测试。完整流程中，更早的 [to-spec](https://aihero.dev/skills-to-spec) 会确认：“`/tdd` is told to only work at pre-agreed test seams, `/code-review` checks that only agreed-upon test seams were used.”

中文理解：/tdd 只在事先确认的测试接缝上工作；/code-review 检查是否只使用了约定接缝。

单独调用时，`tdd` 会直接问你。

它要防止的三种反模式：

| 反模式 | 迹象 |
| --- | --- |
| 与实现耦合 | 行为没变，只重命名内部函数，测试就坏。模拟内部协作者、断言调用次数、直接查数据库而非通过接口验证，都属此类 |
| 同义反复 | 预期值与代码用同一算法算出，测试天然就会通过。预期值必须来自别处，例如已知正确的字面值、算好的例子或规格 |
| 水平切片 | 任何实现出现前，先落下一大批测试 |

mock 只用于系统边界：外部 API、时间、随机性，有时也用于文件系统或数据库。绝不模拟自己写的模块。

## 常见问题

**为什么不重构？描述明明说红、绿、重构。**

因为重构步骤删了，描述却没改。删除是有意的，智能体几乎不做这一步，实现与审阅分会话也更好。是否还符合教科书定义，不如能否产出更好代码重要。触发词与正文不一致记录在 [issue #589](https://github.com/mattpocock/skills/issues/589)，仍开放，所以“red-green-refactor”仍能触发。实际得到的是红绿循环，重构由 [code-review](https://aihero.dev/skills-code-review) 负责。

**它让我选测试接缝，我根本不知道选哪个。**

这是反馈最多的使用阻碍，见 [issue #607](https://github.com/mattpocock/skills/issues/607)。提示只列候选名字，不解释各自能捕获或漏掉什么，你只能在标签之间选。尚无已发布修复。实用办法是回答前先问取舍：组件级接缝漏掉什么、集成接缝能查出什么、后者慢多少。这也是完整流程在 `to-spec` 阶段提前确认接缝的原因，当时能看到整个功能，不只眼前一条提示。

**虽然要求先红，它还是先实现再写测试。**

会发生。有用户追问[模型](https://www.aihero.dev/ai-coding-dictionary/model)，得到少见的坦白：“I knew the skill said 'one test at a time, watch it fail for the right reason'. I read it. I just defaulted to my normal habit.”

中文理解：我知道 Skill 说一次写一个测试，并观察它因正确原因失败。我读过，只是又默认回到了平常习惯。

Skill 接受这种情况。没有指令能保证百分之百遵从，更严厉的措辞会限制创造性，却收益有限。即使没严格遵守，整体结果仍更好，循环仍值得运行。某个切片确实必须严格执行时，请观察实际过程，别指望 Skill 自己强制保证。

**该先写浏览器或端到端测试吗？**

通常不该，但 Skill 不会阻止。有用户报告智能体先写 Playwright 测试，然后长时间反复跑，对尚未存在的功能，得出*测试*坏了的结论。浏览器测试太慢，红绿反馈循环不再划算。可在仓库 `CLAUDE.md` 说明，行为正常后再做浏览器测试。

**`/tdd` 替代 `/implement`，或课程里的 `/do-work` 吗？**

不。`/tdd` 记录方法；`/implement` 是简单的工作、反馈、提交循环，直接替代 `/do-work`。课程原先单一 `/do-work` 步骤，现在拆为 `/implement`、`/tdd` 和 `/code-review`。问该对一张任务运行哪个，几乎总是 `/implement`。

**深层模块和接口设计说明去哪了？**

v1.0 移进 [codebase-design](https://aihero.dev/skills-codebase-design)，经过泛化，让多个 Skills 共用词汇。`refactoring.md` 同时移除；重构现在属于 [code-review](https://aihero.dev/skills-code-review)，它带着 Fowler 的代码异味基线。

**它知道我的其他任务吗？**

不知道。对一张任务运行时，可能建议做另一张同级任务的工作，因为看不到完整依赖图，见 [issue #129](https://github.com/mattpocock/skills/issues/129)。这不是 `tdd` 的职责。任务旁附上规格有帮助，一开始就把任务大小拆合适更有帮助。

## 出现这些迹象，就说明它在发挥作用

- 任何测试文件出现前，停下列出准备测试的接缝，等待确认。
- 一个测试出现、失败、得到恰好足够通过的代码，之后才出现下一测试，不是批量测试后批量代码。
- 测试名描述能力，例如“user can checkout with valid cart”，而非内部动作“checkout calls paymentService.process”。
- 断言的预期值能追溯到规格中的字面值，不是按实现同样算法重算。
- 重命名内部函数，不会破坏测试集。
- mock 只在支付 API、时钟等外部边界，不围住自己的模块。

中文理解：好的名称是“用户能用有效购物车结账”；内部实现式名称是“checkout 调用了 paymentService.process”。

## 它处在什么位置

`tdd` 在主要流程的实现步骤内部运行，不是独立一步：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

[to-spec](https://aihero.dev/skills-to-spec) 事先确认接缝，[implement](https://aihero.dev/skills-implement) 逐任务驱动 `tdd`，[code-review](https://aihero.dev/skills-code-review) 事后检查只使用了已确认接缝，并负责 `tdd` 不再做的重构。另一个邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)，为 `tdd` 提供接缝和深层模块词汇。有具体行为要做、没有完整规格时，也能单独使用。不确定时，用 [ask-matt](https://aihero.dev/skills-ask-matt)。

译注：相关中文词条：[自动检查](/ai-coding-dictionary/automated-check)、[规格](/ai-coding-dictionary/spec)、[无状态](/ai-coding-dictionary/stateless)。中文页未接入时会回到原站英文页。这里未执行测试或验证模型遵循率。
