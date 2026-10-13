---
title: "Skills 更新日志：/handoff、/prototype、/review 和 /writing"
slug: "skills-changelog-handoff-prototype-review-and-writing"
type: "page"
updatedAt: "2026-05-11T10:38:47.822Z"
---

[AI Skills 更新日志](/skills)

# Skills 更新日志：/handoff、/prototype、/review 和 /writing

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

分享

我在 [Skills 仓库](https://github.com/mattpocock/skills)中新增了两个 Skill：`/handoff` 和 `/prototype`。它们都明显改善了我与智能体协作的方式，尤其是在规划阶段。

仓库增长得非常快，大家的反响好得惊人。

![GitHub 星标数量快速增长的图表](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_3840/f_auto/q_auto/v1778496092/ai-hero-images/lawlzqfblajwx3p0ugu7?_a=BAVMn6DY0)

我还修复了 `/grill-with-docs`、`/to-prd` 和 `/to-issues` 中的一些问题。这次也会提前展示正在制作的写作和代码审阅 Skills。

## [`/handoff`](#handoff)

新的 [`/handoff`](https://github.com/mattpocock/skills) Skill 会把当前对话压缩成一份交接文档，让另一个智能体接手。它生成一个临时文件，总结上下文，记录会话的氛围和意图，并建议下一个智能体使用哪些 Skills。

它解决了一个常见问题：追问讨论已经深入到 60K Token，此时却需要做原型或修一个 bug。你不必把这些工作硬塞进剩余的上下文窗口，可以把完整背景交给一个新智能体。之后，还能把新发现交回原会话。

译注：60K 指约六万个 Token，是原文描述的使用场景，不是固定的交接阈值。上下文窗口是模型一次能处理的信息容量。

主要有两种模式：**发出去就不再跟进**，例如在会话中途启动一个智能体修 bug；以及**自己动手充当子智能体**，即规划时交出任务，完成一些工作后，再交回结果。这个 Skill 放在效率分类中，因为工程之外也能用。

## [`/prototype`](#prototype)

新的 [`/prototype`](https://github.com/mattpocock/skills) Skill 会制作可丢弃的原型，在正式确定方案前把设计决定弄清楚。这对 AI 工程很重要：原型和短期技术探索可以作为研究手段，回答那些只有看见代码后才知道自己还没想到的问题。

界面原型是最显而易见的用途，但它也能做业务逻辑原型。面对复杂状态机或会随时间变化的实体，可以做一个小型交互式终端程序，让状态走过各种难以仅凭纸面推演的边界情况。

译注：状态机描述事物有哪些状态、在什么条件下切换；例如订单从待付款变为已付款，再变为已发货。

做界面时，它会生成几种差异很大的方案，用一个悬浮按钮切换。你可以沿着设计分支逐步比较，组合不同方案里的元素，舍弃其他部分。想让 AFK 智能体做好前端，这一点不可缺少：人必须参与其中，作出审美判断，因为 AI 往往看不到自己正在构建的东西。

译注：AFK 指离开键盘后让智能体自行工作；这里强调界面设计仍需要人的判断。

## [问题修复](#bug-fixes)

[`/grill-with-docs`](https://github.com/mattpocock/skills) 有时太急着实现，而不是继续提问。修复方法是把辅助信息包在 XML 标签里，让它相较核心指令不那么抢眼。这会向 LLM 表明，`<supporting-info>` 内的内容优先级应稍低一些。

[`/to-prd`](https://github.com/mattpocock/skills) 和 [`/to-issues`](https://github.com/mattpocock/skills) 现在都会添加 `ready-for-agent-triage` 标签，而非 `needs-triage`。用它们创建的 issue 已经准备好交给智能体，不需要再进行一次分流处理。

## [开发中预览](#in-progress-preview)

我正在开发一套由三部分组成的写作 Skill：**fragments，素材片段**；**beats，叙事节拍**；**shape，成文打磨**。它借鉴作家记录灵感、再逐渐将这些想法写进故事的做法。你先口述 fragments，也就是想法；再写 beats，也就是故事展开的路线；最后做一次 shaping，确保成文不像 AI 生成的。

还有一个即将推出的 **review** Skill。它会并行启动两个子智能体：一个检查 diff 是否符合仓库编码规范，另一个检查是否忠实实现了原 issue 或 PRD。另一个独立 Skill 会从仓库提取编码规范，让规范检查更有效。

译注：diff 是修改前后的差异；PRD 是产品需求文档。这些“正在开发”“即将推出”的描述均沿用本文发布时的语境。

AI Hero · 免费邮件课程

### 为认真做工程的人准备的 AI Skills

建立可重复使用的编码智能体工作流程，同时坚持你的工程标准。

译注：固定来源保留了课程推广文案，但这处没有提供可点击的课程入口。

**分享**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-handoff-prototype-review-and-writingSkills%20Changelog%3A%20%2Fhandoff%2C%20%2Fprototype%2C%20%2Freview%20and%20%2Fwriting%20%20by%20%40mattpocockuk)[分享到 Bluesky](https://bsky.app/intent/compose?text=Skills%20Changelog%3A%20%2Fhandoff%2C%20%2Fprototype%2C%20%2Freview%20and%20%2Fwriting%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-handoff-prototype-review-and-writing)[分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing?author=Matt Pocock>)

复制网址：[原站文章地址](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing)

译注：本页相关中文词条：[交接](/ai-coding-dictionary/handoff)、[上下文](/ai-coding-dictionary/context)、[Token](/ai-coding-dictionary/token)、[AFK](/ai-coding-dictionary/afk)。链接优先打开已接入的中文页；尚未接入时会回到原站英文页。
