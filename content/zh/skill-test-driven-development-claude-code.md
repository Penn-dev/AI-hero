---
title: "我的技能让 Claude Code 更擅长 TDD"
slug: "skill-test-driven-development-claude-code"
type: "post"
description: "通过红—绿—重构与垂直切片，让 Claude 编写真正验证行为的测试和实际实现，这就是我的 TDD 技能。"
tags:
  - ship-solid-code
updatedAt: "2026-02-10T11:42:14.095Z"
---

过去几周，我一直用自己写的 TDD 技能完成大部分非前端工作。

它解决了此前我让 LLM 写测试时遇到的许多问题。

如果想试试，可以用这个命令：

```bash
npx skills add mattpocock/skills/tdd
```

下面展开讲讲。

## 问题：为什么 LLM 写不好测试

当你让 LLM “write a feature”（编写一项功能）时，它往往会按**水平切片**工作：先写完整功能，再补测试。问题是，你并没有真正验证这些测试是否测到了应该测试的行为。

中文版 Prompt（学习辅助，对应上面的任务示例）：

```text
编写一项功能。
```

实际情况如下：

| 水平切片（❌ 不好） | 垂直切片（✅ 好） |
| --- | --- |
| 红灯：一次写完所有测试 | 红→绿：测试 1→实现 1 |
| 绿灯：一次写完所有代码 | 红→绿：测试 2→实现 2 |
| 重构：清理代码 | 红→绿：测试 3→实现 3 |

核心问题是：**批量编写的测试验证的是想象中的行为，而不是观察到的行为**。

LLM 先生成 10 个测试，再写实现让它们全部通过时，可能发生几件坏事：

- 测试验证的是 mock，而不是真实代码路径
- 测试可能根本没有正确运行，或者内含短路逻辑
- 上下文快用完时，LLM 可能直接改测试，让它通过，而不去写真正的实现

糟糕的测试不只是审查负担，也是技术债。每个测试都和代码一样，需要长期维护。不对应实际行为，或与实现细节绑定太紧的测试，最终会成为昂贵的负担。

> 译注：原文开头说“先写实现再补测试”，表格又以“一次写完所有测试再写实现”为反例；二者都在批评批量水平推进，但顺序并不相同，此处保留原有表述。

## 解决办法：按垂直切片进行红—绿—重构

我的 TDD 技能用曳光弹方法，约束 Claude 按**垂直切片**工作：

```
ONE test → ONE implementation → repeat
```

中文理解（学习辅助）：

```text
一个测试 → 一份实现 → 重复
```

每轮都根据上一轮学到的东西调整。因为代码刚写出来，你清楚哪些行为重要，也知道怎样验证。

### 三个阶段

**红灯**：写一个会失败的测试。只写一个。

**绿灯**：只写让这一个测试通过所需的最少代码，不做推测性的实现。

**重构**：所有测试通过后，消除重复，简化代码。

这个约束能防止作弊。测试先失败，LLM 就没法糊弄过去，必须写真正的实现。

> 译注：这里保留作者对流程作用的强调。先看到失败能够验证测试确实触及目标行为，但它本身并不能绝对保证后续实现没有问题或测试不被错误修改；仍需审查和有效验收。本次未执行这些测试。

## 这个技能怎样改变 Claude 的产出

把这种方法用到真实功能上，会发生一件有趣的事：测试变成了 **Claude 与自己代码之间的一场对话**。

每个测试都向实现提出一个不同的问题：

- “Does this observable behavior work?”（这个可观察的行为能正常工作吗？）
- “How does the system handle edge cases?”（系统怎样处理边界情况？）
- “What happens when conditions change?”（条件变化时会发生什么？）

这种追问让 Claude 在工作过程中不断发现自己实现的特点，而不只是勾选清单。有时，新写的测试会立刻通过，不是它多余，而是实现本来就足够健壮，已经能处理这种情况。

## 什么样的测试好，什么样的不好

技能里包含了好测试和坏测试的具体说明，内容如下。

### 好测试

好测试通过**公开接口**触及真实代码路径，而不是依赖实现细节。它描述系统做什么，不是怎样做。

```typescript
// GOOD: Tests observable behavior through the interface
test("user can checkout with valid cart", async () => {
  const cart = createCart();
  cart.add(product);
  const result = await checkout(cart, paymentMethod);
  expect(result.status).toBe("confirmed");
});
```

好的测试读起来像规格说明。“user can checkout with valid cart”（用户可以用有效购物车完成结账）准确表达了系统具备的能力。因为不关心内部结构，这样的测试能经受彻底的内部重构。

### 坏测试

坏测试与**实现绑定**：模拟内部协作者，测试私有方法，或者绕过接口，从外部手段验证。

```typescript
// BAD: Tests implementation detail (mocking internals)
test("checkout calls paymentService.process", async () => {
  const mockPayment = jest.mock(paymentService);
  await checkout(cart, payment);
  expect(mockPayment.process).toHaveBeenCalledWith(cart.total);
});

// BAD: Bypasses interface to verify (queries DB directly)
test("createUser saves to database", async () => {
  await createUser({ name: "Alice" });
  const row = await db.query("SELECT * FROM users WHERE name = ?", ["Alice"]);
  expect(row).toBeDefined();
});
```

一个警告信号是：行为没有变化，重构却让测试失败。如果只是给内部函数改名，测试就坏了，说明测的是实现，不是行为。

> 译注：原代码中的三个英文测试标题分别表示“用户可以用有效购物车结账”“结账会调用 paymentService.process”“createUser 会保存到数据库”。示例代码按原样保留，其中的测试框架、变量和依赖并不完整；例如 mock 片段不能视为已验证的可运行 Jest 配置。这里讨论的是作者选择的测试边界，并不表示所有数据库查询断言都天然无效。

### 关键区别

| 好测试 | 坏测试 |
| --- | --- |
| 通过公开接口运行真实代码 | 模拟内部协作者 |
| 描述系统做什么 | 测试怎样实现 |
| 内部重构后不必修改 | 行为不变，重构也会导致失败 |
| 读起来像规格说明 | 测试数据结构的形状 |
| 关注用户可见行为 | 通过外部手段验证，如数据库查询、调用次数 |

## 规划阶段：写任何代码之前

我发现，在技能里加入编码前的规划阶段非常重要，所以用以下问题来实现：

> - **What interface changes are needed?** What functions, methods, or APIs are being added or modified?
> - **Which behaviors matter most?** You can't test everything. Prioritize critical paths and complex logic over edge cases.
> - **Can we design for deep modules?** A deep module has a small interface but handles complex logic internally. This makes testing simpler and the API cleaner.
> - **Can we design for testability?** Functions should accept dependencies rather than create them. They should return results instead of producing side effects.

中文版 Prompt（学习辅助，完整对应四组规划提问及补充句）：

```markdown
- **需要怎样改动接口？** 哪些函数、方法或 API 会新增或修改？
- **哪些行为最重要？** 不可能测试所有东西。与边界情况相比，先关注关键路径和复杂逻辑。
- **能否采用深模块设计？** 深模块接口小，内部处理复杂逻辑，让测试更简单、API 更清晰。
- **能否为可测试性设计？** 函数应接收依赖，而不是自行创建；应返回结果，而不是产生副作用。
```

用户回答这些问题越好，代码质量就越高。

**TDD 只是其中之一，还有更多技能**

这就是我每天和 Claude Code 一起使用的完整技能组合。

[查看技能组合：前往英文原文入口](https://www.aihero.dev/skill-test-driven-development-claude-code)

> 译注：原文 SkillsCta 只有上述标题、副标题和按钮文案，没有独立按钮目标，故链接原页面，不猜测实际落点。

## 为什么这对 Claude Code 用户重要

这个技能追求的不是完美测试，而是**通过约束，让测试真实有效**。

把 Claude 的工作组织成“一个测试、一份实现、不断重复”，可以防止它：

- 编写想象中的行为，而不是观察到的行为
- 模拟内部实现，制造虚假的测试通过
- 一开始就过度设计方案
- 编写与实现细节紧密绑定的测试

测试会变得可信。你可以把大块工作交给 Claude，不只是代码审查，也包括实际构建功能，因为你知道这些测试确实在验证行为。

当你能信任测试时，也就能信任代码。

> 译注：结语保留作者的概括性判断；实际可信范围仍取决于测试质量、覆盖内容与审查。本次没有安装技能、生成实际功能或验证正确率。
