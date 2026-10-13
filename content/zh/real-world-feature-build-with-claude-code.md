---
title: "用 Claude Code 构建真实功能：逐步讲解全过程"
slug: "real-world-feature-build-with-claude-code"
type: "post"
description: "了解 Claude Code 的工作流程：深入追问、PRD、GitHub Issue、无人值守智能体和 QA 循环，学习怎样用 AI 高效开发功能。"
tags:
  - score-first-wins
  - code-with-ai-agents
updatedAt: "2026-03-20T09:48:53.260Z"
---

在这段视频中，我用自己的课程视频管理器演示怎样在真实项目里使用 Claude Code。这个 React Router 应用是我每天都会用的工具，用来创作内容、组织课程和管理视频。

我会展示完整工作流：先用 “grill me” 技能深入追问、讨论功能，再创建产品需求文档（PRD），拆成 Issue，最后运行自主 Ralph 循环，让它在我离开桌面时继续实现功能。

这不是一份精心修饰的教程，而是一次真实、没有脚本的工作记录。代码库已经有超过 1,200 次提交，以及 637 个已关闭的 Issue。你会看到混乱的部分、质量检查循环，以及我在过程中作出的决定。

这次要改进的功能，是应用中“虚拟课时”和“真实课时”的工作方式。虚拟课时只存在于数据库里，真实课时则在磁盘上有实际文件。目前创建或删除课时要经过多个步骤，流程很笨重。到这次工作结束时，我会把整套流程简化，并增加“虚拟课程”的支持。

如果想从基础开始学习这些技能，可以看看我的训练营 [Claude Code for Real Engineers（面向真正工程实践的 Claude Code）](https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04)。它教你怎样把真正的工程实践用到 AI 辅助开发中。

> 译注：固定来源只有以上视频介绍文字，没有视频文件、播放地址、逐字稿或项目实现代码。这里不补造视频中的操作步骤、完成结果或课堂材料；可前往[英文原文](https://www.aihero.dev/real-world-feature-build-with-claude-code)查看原页面。提交数、Issue 数与将完成的功能均属于作者对其演示项目的描述，不是本次运行或交付结果。训练营链接保留原文的 2026 年 4 月场次，未核验报名状态。
