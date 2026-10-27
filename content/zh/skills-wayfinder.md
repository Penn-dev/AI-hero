---
title: "/wayfinder Skill"
slug: "skills-wayfinder"
type: "post"
description: "把大型工作画成决策地图，逐项做出决定。"
updatedAt: "2026-08-24T09:14:47.195Z"
---

## 它能做什么

`wayfinder` 用来处理一次智能体[会话](https://www.aihero.dev/ai-coding-dictionary/session)装不下的工作：你说得清**目的地**，却还看不清路线。它在任务系统里建立一张共享**地图**，由一组**决策任务单**组成，再逐项解决，直到路线清楚。

它负责规划，不负责实现。每张任务单提出一个问题，答案是一项决定，不是一块待开发的功能。开始构建之前再没有需要决定的事，地图就完成了。这是 wayfinder 任务单与普通实现[任务单](https://www.aihero.dev/ai-coding-dictionary/ticket)的区别，也是智能体最常打破的规则。地图上的待决问题都厘清后，wayfinder 交接工作，不继续写代码。

## 什么时候该用它

输入 `/wayfinder` 调用；[智能体](https://www.aihero.dev/ai-coding-dictionary/agent)不会自行使用。

这是整套 Skills 中最重的流程，适用条件因此很窄：工作必须超过一次会话的容量，而且通往目的地的路线尚不清楚。分界是会话数量：单次会话规划用 `/grill-with-docs`，跨多次会话规划用 `/wayfinder`。

| 眼前是什么情况 | 运行什么 |
| --- | --- |
| 范围清楚、坐下来一次就能谈妥的功能 | [grill-me](https://aihero.dev/skills-grill-me)；有代码库时用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| 从零开始的项目，或需要多次会话才能完成、路线仍不清楚的构建工作 | `/wayfinder` |
| 对话中该决定的已经决定好了 | [to-spec](https://aihero.dev/skills-to-spec)，直接跳过地图 |
| 待决问题已全部厘清的 wayfinder 地图 | [to-spec](https://aihero.dev/skills-to-spec)，再到 [to-tickets](https://aihero.dev/skills-to-tickets) 和 [implement](https://aihero.dev/skills-implement) |
| 现有会话已经膨胀得太大 | 说“hand off to `/wayfinder`”；[handoff](https://aihero.dev/skills-handoff) 既能把工作交进地图，也能交出去 |

中文 Prompt（译注，对应上表的交接请求）：

```text
把当前工作交接给 /wayfinder。
```

不必是全新项目。人们也常在遗留或做了一半的代码库上用 wayfinder；那里可能更需要它，因为许多迷雾不是“应该做什么”，而是“这里现在到底是什么情况”。

## 使用前提

地图和任务单放在仓库的任务系统里，因此需要 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 完成任务系统设置。设置会写出“Wayfinding operations”一节，说明如何在 GitHub、GitLab 或本地 Markdown 中表达地图、子任务、阻塞关系和可领取任务查询。Wayfinder 通过 `CLAUDE.md` / `AGENTS.md` 中的指针找到文档，不依赖固定路径。没有配置任务系统时，退回本地 Markdown 文件。

任务系统本身承担实际工作：原生阻塞链接让你直接在其界面看见可领取任务。若系统没有原生依赖链接，例如自托管 Gitea，wayfinder 会从地图文字推断阻塞关系。可以这样用，但你需要更密切地监督。

## 地图、迷雾和前沿

**地图**是一条带 `wayfinder:map` 标签的 issue，其任务单是子 issue。它是**索引，不是内容仓库**。一项决定只存放在对应任务单这一处；地图只保留一句摘要和链接。会话先以低细节程度加载地图，需要时再打开具体任务单。因此地图可以不断增长，而不必每次加载全部历史。

地图有四个部分：

- **目的地。** 整张地图完成时是什么样。先确定它，再创建任何任务单，因为它划定了范围，每项任务都要据此衡量。
- **已有决定。** 每张已关闭任务单占一行，并链接到详细内容。
- **尚未明确。** 这就是**战争迷雾**：知道将来要做决定，但还不能把问题说准。区分迷雾与任务单的标准，是*现在*能否准确提出问题，不是能否回答。解决一项任务后，前方迷雾消散，现在能明确的问题就转成新任务单。
- **范围之外。** 超出目的地的工作。迷雾只沿着*通往目的地*的方向积聚，范围外的工作保持关闭，不会转成任务单。

**前沿**是尚未关闭、没有阻塞、也无人领取的任务集合，即已知范围的边缘。会话开始做任何工作前，先把任务分配给自己。受指派者*就是*领取标记，所以并发会话会跳过它。叙述中用名称指代任务，不只写一个 `#42`，因为满屏 issue 编号很难读。

## 四类决策任务单

每张任务单带 `wayfinder:<type>` 标签，模式为 [HITL](https://www.aihero.dev/ai-coding-dictionary/human-in-the-loop) 或 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk)：前者由人参与、亲自表达意见；后者由智能体独立推进。HITL 任务只能在实时交流中解决。智能体若自问自答[追问](https://www.aihero.dev/ai-coding-dictionary/grilling)，就破坏了这种模式。

| 类型 | 模式 | 什么时候用 | 如何解决 |
| --- | --- | --- | --- |
| `grilling` | HITL | 默认类型，讨论就能解决的问题 | 在新会话中结合 [grilling](https://aihero.dev/skills-grilling) 与 [domain-modeling](https://aihero.dev/skills-domain-modeling) |
| `prototype` | HITL | “应该长什么样”或“应该怎样运行”，光聊无法确定 | 用 [prototype](https://aihero.dev/skills-prototype)，并从任务单链接到做出的产物 |
| `research` | AFK | 工作目录之外的某项事实阻碍了决定 | 创建地图时启动 [research](https://aihero.dev/skills-research) [子智能体](https://www.aihero.dev/ai-coding-dictionary/subagent)，在 `research/<name>` 分支并行运行 |
| `task` | 两者均可 | 没有决定要做，但有手动工作挡住决定，例如开通访问、注册服务，或搬移数据以便看清结构 | 能由智能体做就独立做，否则给人一份明确的操作清单 |

`task` 是唯一重在*做事*而非做决定的类型。它进入地图，只因为能解除决策的阻碍，绝不能因为它能交付目的地的一部分。实践中这一类最容易出错：智能体把它理解为实现步骤，在地图里开始写产品代码。

研究任务是*每次会话只处理一张任务单*的唯一例外。

译注：这里的“前沿”指当前可领取的任务集合，不是技术前沿；“迷雾”借用游戏中的战争迷雾，表示尚未看清、还不能准确提问的决策空间。

## 常见问题

**与 `/grill-with-docs` 有什么不同？该从哪个开始？**

看会话数量，不看项目大小。`/grill-with-docs` 做单次会话规划，wayfinder 做跨会话规划。整个问题能装进一场对话，grilling 更便宜也更好；此时 wayfinder 更慢、更繁重。社区的简明说法是：工作装不进一次会话，wayfinder 才有意义。这是被问得最多的问题，远超其他问题。人们反复问，是因为 Skill 描述没告诉你自己的任务落在分界哪边，仍须自己估计会话数量。

**它问“目的地”，是指这次会话结束，还是全部工作结束？**

指整张地图的终点，不只第一次会话。问法有歧义，但 wayfinder 按定义就是跨会话工具，所以只针对单次会话回答并不合适。典型目的地包括一份可交接的[规格](https://www.aihero.dev/ai-coding-dictionary/spec)、规划开始前必须敲定的决定、概念验证，或数据迁移这类对现有系统的变更。

**地图上的待决问题都厘清了。Wayfinder 不是已经写好规格和任务了吗，为什么还需要 `/to-spec` 与 `/to-tickets`？**

没有。Wayfinder 的任务是决策任务，地图关闭时它们也全部关闭了。剩下的是一张链接各项决定的地图，不是构建计划。[to-spec](https://aihero.dev/skills-to-spec) 把这些链接起来的决定收拢成一份规格，调用方式是 `/to-spec #<map_issue>`；[to-tickets](https://aihero.dev/skills-to-tickets) 再把规格切成曳光弹式的实现任务。如果直接把地图交给 [implement](https://aihero.dev/skills-implement) 循环执行，就跳过了收拢，丢失链接中的细节。只有实际工作比预想小，才直接实现。有些人使用短流程并反馈有效。多出的两步给你一份审阅者或同事可以阅读的明确规格，不是独自工作时尤其重要。

译注：曳光弹式任务指一小片可端到端运行、验证方向的实现；上面的命令保留占位符，使用时填入地图 issue。

**我的智能体在 wayfinder 会话中途开始写生产代码。**

这是此 Skill 被报告最多的失败，原因确实是它的一个缺口。你可以在地图的 **Notes** 中覆盖“规划，不执行”的默认要求。但 Notes 也由智能体写，于是约束和豁免都放在受约束者能改的文件里。有用户看见智能体自行写下“this map carries execution”；后续会话把这句话读成许可，开始在真实服务器上构建。Skill 尚无硬性机制来挡住“我本来就是要默认行为”这种情况。在补上之前，仔细读不是你亲自制订的地图中的 Notes，把实现放在独立会话；凡看起来是在构建产品一部分的 `wayfinder:task`，都应视为类型标错。

中文理解：“this map carries execution”意为“这张地图也包含执行工作”。这是原文报告的失败案例，不是给智能体扩大权限的指令。

**我列了 27 张任务单，做到第十三张，剩下的已经不再合理。**

这个问题直接来自用户报告，其他人也遇到过。Wayfinder 默认全面规划，后面的任务若依赖被前面任务推翻的假设，地图就掉进批评者所说的瀑布式陷阱。有两种办法。第一，把地图限定到有明确边界的目的地，不是整个产品。用户反馈，围绕一个清楚的大功能单元规划，比庞大的“实现 V1”更好。目标是逐小步交付，不是规划一件巨大的事。第二，大量做[原型](https://www.aihero.dev/ai-coding-dictionary/prototyping)。低成本、具体可见的产物能在实现依赖这些假设之前暴露不确定性，使路线保持有效。Wayfinder 是“prototypemaxxing”，不是“planmaxxing”。

中文理解：这两个玩笑式说法强调尽量多用原型验证，而不是一味增加规划。

**能并行处理几张任务单吗？**

前沿告诉你哪些能领，阻塞关系在理论上保证并行安全。实践中，一次一张更稳妥。同时做两张 grilling 任务，一个会话可能又问你刚在另一会话答过的问题，因为它们不共享[上下文](https://www.aihero.dev/ai-coding-dictionary/context)。原型任务也有已知缺口：有人报告智能体做出三版 UI，自己选了一版并关闭任务。选择权属于你，但 Skill 尚未把这点说得足够清楚。真要并行，先亲自检查依赖图。

**必须用 GitHub Issues 吗？**

不必，任何任务系统都可以。GitHub 支持最好，因为原生子 issue 和阻塞关系让你不用打开地图就能看到前沿。也有人用 GitLab、Linear、Jira 或本地 Markdown。有两点要注意：没有原生阻塞关系时，wayfinder 从文字推断依赖图，需要你手动纠正；本地 Markdown 把产物放进仓库，通常不推荐，因为仓库里的材料容易被意外长期留下。开源维护者遇到相反的问题：公开任务系统堆满智能体生成的规划任务，因此他们仍常选择本地 Markdown。

**追问太累了，每个问题都长达三段。**

这是对 wayfinder 最尖锐、尚未解决的抱怨。一位用户分析：冗长本身导致决策疲劳，而且长度掩盖了智能体*为什么*问，让地图越长，决定之间的来龙去脉越难跟上。这似乎是当前[模型](https://www.aihero.dev/ai-coding-dictionary/model)的特性，而非 Skill 本身的特性。用户尝试两种缓解方式：降低[推理强度](https://www.aihero.dev/ai-coding-dictionary/effort)，以及在全局 `CLAUDE.md` 中加入通俗表达的要求。即便如此，也要准备认真思考。Wayfinder 需要你投入大量思考，这大体正是它的目的，不是缺陷。

**已经关闭的决定后来被证明错了，改旧任务，还是建新任务？**

没有官方指引，智能体的默认行为也帮不上忙。它倾向于围绕错误决定继续设计，而不是挑战它，因此要你主动引导。有效的做法是直说发生了什么变化。Wayfinder 会更新地图、修订受影响任务，并在已关闭任务上评论。地图进行到一半，仍能应对范围变化。但如果你*从设计之初*就打算让地图不断变动，则说明范围划错了。

**`decision-mapping` 去哪了？**

就是这个 Skill。v1.1 把它改名为 `wayfinder`，调用方式为 `/wayfinder`。“Decision map”既是术语，又不准确，因为四类任务里只有一种本身就是一个决定。新名称给了它统一词汇：目的地、战争迷雾、前沿、地图，不再额外叠加一个自造说法。任务单位仍保留“决策”二字：wayfinder 里的任务是**决策任务单**，免得被误读成实现任务。

## 出现这些迹象，就说明它在发挥作用

- 创建任何任务之前，先写下目的地并取得一致。
- 每张开放任务都像一个问题。写成“构建 X”的任务，要么类型错误，要么应该放在地图之后。
- 原生阻塞关系展示前沿，让你不用打开地图，就能在任务系统看到哪些可以领取。
- 一次会话解决一张任务，发出记录答案的解决评论，关闭任务，在地图的*已有决定*中加一行，然后停下。
- **尚未明确**逐渐缩小。迷雾变成任务后，从该节移除，不同时存在两处。
- 开场的广度优先追问若没发现任何迷雾，Skill 就停下，告诉你工作足够小，可以跳过地图。
- 完成地图的会话指向规格，而不是 PR。

## 它处在什么位置

`wayfinder` 是**特定情境下的入口**，不是默认起点。大多数工作仍从追问主导的“想法 → 交付”链条开始。只有想法太大、一次会话装不下时才用它。它在 [to-spec](https://aihero.dev/skills-to-spec) 处回到主流程，因为地图上的待决问题都厘清后，就该交接，而不是开始构建。

大部分工作在它调度的其他 Skills 中发生：[grilling](https://aihero.dev/skills-grilling) 和 [domain-modeling](https://aihero.dev/skills-domain-modeling) 解决默认类型任务；[prototype](https://aihero.dev/skills-prototype) 处理单靠讨论无法决定的任务；[research](https://aihero.dev/skills-research) 作为子智能体运行，让大量阅读留在主会话之外。[handoff](https://aihero.dev/skills-handoff) 双向搬运工作：对话太大时转进地图，会话中出现支线任务时从地图交出去。其他情况由 [ask-matt](https://aihero.dev/skills-ask-matt) 在整套 Skills 中指路。

译注：相关中文词条：[会话](/ai-coding-dictionary/session)、[任务单](/ai-coding-dictionary/ticket)、[人在回路中](/ai-coding-dictionary/human-in-the-loop)、[AFK](/ai-coding-dictionary/afk)、[上下文](/ai-coding-dictionary/context)、[推理强度](/ai-coding-dictionary/effort)。中文页未接入时会回到原站英文页。文中开放问题与版本状态均按冻结原文保留。
