---
title: "三种评估方式"
slug: "three-types-of-evals"
type: "post"
description: "了解确定性评估、人工反馈，以及让 LLM 充当评委的方法。"
tags:
  - test-and-evaluate
updatedAt: "2024-11-26T15:54:16.049Z"
---

## 确定性评估

- 确定性评估返回通过或失败的结果，目的是从概率系统中找出可以确定检查的部分。
- [Ian Webster](https://www.youtube.com/watch?v=OrtBEBLMXdM) 认为，这是“最有用的一类评估”。它们应该运行快速，并面向开发者。
- Discord 的 [Ian Webster](https://www.youtube.com/watch?v=OrtBEBLMXdM) 举过一个很好的例子：他们检查 AI 机器人 Clyde 的消息是否始终以小写字母开头，让它模仿 Z 世代用户的表达习惯。

译注：确定性检查使用明确规则，例如首字母是否小写。它不能单独说明整段回答的内容是否正确。

## 让 LLM 当评委

- 有些评估可以由 LLM 完成。
- [autoevals 模板](https://github.com/braintrustdata/autoevals/tree/main/templates)展示了多种例子。[Humor](https://github.com/braintrustdata/autoevals/blob/main/templates/humor.yaml) 判断内容是否有趣，[Battle](https://github.com/braintrustdata/autoevals/blob/main/templates/battle.yaml) 则比较两个回复，判断哪个更好。
- 你甚至可以提供一份正确的参考陈述，让 LLM 据此检查回复是否符合事实。
- 没通过 LLM 评委的检查，往往是一个应该请人查看的信号。所以在我看来，它更像冒烟测试，而不是真正完备的测试。这是我的个人看法。

译注：冒烟测试是先快速检查有没有明显问题。这里强调模型评分可以帮助筛选需要关注的结果，不代表它能替代人的判断。

## 人工反馈

- 有些评估只有交给人来做才有意义，例如长篇文本生成，以及某些事实准确性问题。
- 任何类型的 LLM 应用都需要人的监督。
