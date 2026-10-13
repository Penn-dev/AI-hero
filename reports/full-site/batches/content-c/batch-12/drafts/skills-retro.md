---
title: "/retro Skill"
slug: "skills-retro"
type: "post"
description: "回顾一次会话，提出仓库改进建议。"
updatedAt: "2026-10-05T08:28:16.169Z"
---

## 它能做什么

`retro` 回顾一次编码[会话](https://www.aihero.dev/ai-coding-dictionary/session)，建议如何改善智能体的[环境](https://www.aihero.dev/ai-coding-dictionary/environment)，让下一次执行更顺利。它读取会话自身的记录，默认当前会话，也可以是你在会话日志中指定的一次，找出智能体遇到困难的时刻，按严重程度从高到低给出候选改进。

它改进的是环境，不是代码。比如智能体交付了一个 bug，找文件花了二十次[工具调用](https://www.aihero.dev/ai-coding-dictionary/tool-call)，或审阅者漏掉一条规则，`retro` 不直接修这些问题。它问的是仓库中什么因素让问题发生，再建议能防止重犯的检查、入口或规范。而且它只提建议；你没选中候选项前，不改任何东西。

## 什么时候该用它

输入 `/retro`；智能体不会自行选用。

一次会话比本应需要的更艰难时，在结束后使用。例如找资料太久、犯了工具本可发现的错误，或拿不到需要的信息。顺利的会话没多少可学，发现来自困难的会话。如果要评判这次产出的代码，请用 [code-review](https://aihero.dev/skills-code-review)。

## 改进落在哪里

每个候选项属于一类，类别决定修法放在哪里：

| 会话中出了什么问题 | 怎样改善 |
| --- | --- |
| 找文件或事实花很久 | 从本来就会读的文件加入**导航入口** |
| 犯了工具本可发现的错误 | 加[自动检查](https://www.aihero.dev/ai-coding-dictionary/automated-check)，例如 lint 规则、类型、测试、提交前 hook、CI 任务 |
| 审阅者漏掉需要判断的错误 | 在 `CODING_STANDARDS.md` 给审阅智能体加规则 |
| `AGENTS.md` 或 `CLAUDE.md` 很大 | 把行为要求移到规范或自动检查中 |
| 工具调用成本相对返回结果太高 | 精简工具，或替换它 |
| 引导文件充满不改变任何行为的句子 | 删除这些 **no-op，无效指令** |
| 智能体需要但无法取得信息 | 扩大可访问范围，例如把开发服务器日志同时写文件，或给服务只读访问 |

核心观念是，规范属于**审阅者**，不是实现者。实现智能体要探索、写代码、调试，上下文压力最大；审阅智能体只拿到 diff。因此新规则要放在有空间运用它的位置，也就是审阅阶段，绝不放进 [AGENTS.md](https://www.aihero.dev/ai-coding-dictionary/agents-md)，因为它不论相关与否，都会进入每次会话的[上下文窗口](https://www.aihero.dev/ai-coding-dictionary/context-window)。

写规则前，`retro` 先给违规分类。**机械性违规**，例如禁用 API、导入形式或文件位置，应该用确定性检查，因为检查可以失败，规范中的一句话不会。只有 linter 无法判断、确实需要判断力的事项，才写成文字。如果仓库完全没有保护措施，没有提交前 hook，也没有运行 lint、类型检查和测试的 CI，`retro` 会把这本身作为发现。

译注：hook 是在提交等操作前自动运行的脚本；CI 是持续集成中的自动检查。扩大访问或新增检查仍是候选方案，需要按所在环境的权限确认。

## 常见问题

**它会自己写 lint 规则，还是等我同意？能每次会话后自动跑吗？**

它会等。`retro` 只提建议，选中候选项前不改文件，也不自动安装 hook。这是有意的。一位用户被“burned by auto-hooks that blocked good changes”之后，明确要求这种行为。

中文理解：自动 hook 把正常修改也拦住了，让用户吃了苦头。

判断什么值得变成永久检查，需要人的判断，所以 Skill 保持[人工参与](https://www.aihero.dev/ai-coding-dictionary/human-in-the-loop)，由用户调用。有些用户确实每轮实现后都跑，但顺利会话没多少可学，因此每次都跑，主要会得到没人需要的规则。没有 dry-run 模式。建议的检查也是代码，真正让它阻挡合并前，先在仓库中试过。

**lint 规则不会越积越多吗？会建议删掉吗？**

只解决一部分，这也是最薄弱处。它能删文字：引导文件中的无效指令，以及 `AGENTS.md`、`CLAUDE.md` 中本该放在规范或检查里的行为要求。文件过大时会提出删除。它只依据读到的这一次会话判断，所以每项只是待做删除测试的候选，不是定论。它不审计上个月建议的 lint、hook 或 CI，无法判断规则是否过于频繁触发，或背后的 bug 是否已经消失。仍需要你自己精简检查。经常拦住正常代码，就是该删规则的信号。

**它会不会只编些通用建议，填满所有分类？**

这是最强烈的批评。一位用户发现：“once the job is finished, the AI tends to forget the struggles from the middle of the session and invents generic advice to satisfy the retro categories.”

中文理解：工作结束后，AI 往往忘了会话中间的困难，编出通用建议来填复盘分类。

每个候选项都必须来自会话记录，因此建议应具体对应那次执行。这有好处，也有代价：很少编无关建议，却可能过分重视单次会话的主题。无法追溯到具体时刻的候选项，直接舍弃。严重程度排序也只当初稿，因为不显眼但昂贵的错误，可能排在吵闹却便宜的错误后面。

**会话已经很长，现在跑，还是新开会话？**

默认回顾当前会话，这是最好情况，因为困难仍在上下文窗口。如果已经离开[高效区](https://www.aihero.dev/ai-coding-dictionary/smart-zone)，就[清空](https://www.aihero.dev/ai-coding-dictionary/clearing)，从新会话运行 `/retro`，指向日志中的先前会话。

译注：能否取得历史会话记录，取决于实际宿主提供的访问能力。

**智能体总犯同样错误，要不要在 `CLAUDE.md` 加一行？**

通常不要，这是 `retro` 最常反对的做法。`CLAUDE.md` 的一行会加载到每个会话，稀释文件中其他内容的分量，还会随代码变化过时。机械错误，用能失败的检查解决；判断性错误，放进审阅者读取的编码规范。`AGENTS.md`、`CLAUDE.md` 主要应保留导航入口，别的越少越好。同理，`retro` 不是[记忆系统](https://www.aihero.dev/ai-coding-dictionary/memory-system)：它不保存发生了什么，而是改变环境，防止同类错误重现。

**设置提到 `CODING_STANDARDS.md`，但我没有，哪里来？**

没有 Skill 自带这个文件。会话第一次发现需要交给审阅者的判断性规则时，`retro` 会建议创建。你接受后，[code-review](https://aihero.dev/skills-code-review) 就会读取。已有的其他规范文档，例如 `CONTRIBUTING.md`，也同样有效。

**它与 `improve-codebase-architecture` 有何不同？**

输入不同。[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 只需代码，寻找结构改进；`retro` 需要会话历史，改进智能体工作环境，不改代码。两者都可以用，互不替代。

## 出现这些迹象，就说明它在发挥作用

- 每个候选项都指向会话中的具体时刻，不是泛泛的最佳实践。
- 重复错误变成会失败的检查，而 `AGENTS.md` 越来越短，不是越来越长。
- 已有检查只是没接入时，建议是接入它，不是再造一个。
- 下一次同类任务更快找到所需信息。

## 它处在什么位置

`retro` 是主要流程的最后一步，回顾整条流程执行得怎样：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

做完一次值得学习的开发后，在同一会话中运行，或指向那次会话的日志。过程顺利，可以跳过。

- [code-review](https://aihero.dev/skills-code-review) 是 `retro` 最常改进的审阅智能体。新编码规范放在 Standards 维度会读取的位置。
- [writing-for-agents](https://aihero.dev/skills-writing-for-agents) 决定 `retro` 提议的引导文件和 Skills 的写作方式，`retro` 开始前会先加载它。

不确定选哪个时，[ask-matt](https://aihero.dev/skills-ask-matt) 可以帮你选择。

译注：相关中文词条：[环境](/ai-coding-dictionary/environment)、[自动检查](/ai-coding-dictionary/automated-check)、[人工参与](/ai-coding-dictionary/human-in-the-loop)。中文页未接入时会回到原站英文页。
