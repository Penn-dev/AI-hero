---
title: "自动检查"
slug: "automated-check"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工作模式

# 自动检查

在环境中运行的确定性验证，例如测试、类型检查、静态检查、构建和提交前钩子。只有通过或失败，不作主观判断。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

在[环境](/ai-coding-dictionary/environment)中运行的确定性验证，例如测试、类型检查、静态检查、构建和提交前钩子。结果是通过或失败，不作主观判断。这是[智能体](/ai-coding-dictionary/agent)无需其他人参与，就能据以自行修正的信号。不稳定的测试是坏掉的检查，不是“不算检查”；自动检查 _在设计上_ 应该是确定性的。

自行修正通过循环实现。智能体修改代码，把检查作为[工具调用](/ai-coding-dictionary/tool-call)运行，失败输出进入[上下文窗口](/ai-coding-dictionary/context-window)，例如带文件名和行号的类型错误，或者列出期望值与实际值的失败断言。这足以让智能体修正问题，再次运行检查，如此循环直到通过，不需要人工参与。确定性让循环值得信任：相同代码总得到相同结论，所以通过才有意义。不稳定的检查会破坏这一点，智能体会“修复”原本没问题的代码，或者靠重试跳过真正的失败。

因此，好的检查构成代码库 [AX](/ai-coding-dictionary/ax) 的重要部分。代码库有严格类型、快速测试套件和静态检查工具时，智能体会在你看到之前抓住自己的多数错误；没有这些东西时，它就会把生成的东西直接交出去。这在 [AFK](/ai-coding-dictionary/afk) 工作中尤其重要，因为运行期间只有检查在做验证。但检查只能抓到断言覆盖的内容：检查全绿，说明所断言的性质成立，不代表代码正确。需要判断的缺口，由[自动审查](/ai-coding-dictionary/automated-review)和[人工审查](/ai-coding-dictionary/human-review)补上。

_避免使用：_“feedback loop”，反馈循环，或“backpressure”，背压。这两个词把检查与审查混在一起。也不要只说“测试”：测试是自动检查，但并非所有自动检查都是测试。

> **译注：几种检查。** 类型检查核对数据和调用是否符合类型约定；静态检查，也叫 lint，不运行完整程序就能检查规则；构建把代码处理成可运行成果；提交前钩子在保存版本提交前执行；断言写明结果应该满足什么。

_用法：_

**英文原例**

> The agent keeps shipping broken code in the AFK runs.

**中文理解**

“智能体在 AFK 工作里总交出有问题的代码。”

**英文原例**

> What automated checks are wired into the [sandbox](/ai-coding-dictionary/sandbox)?

**中文理解**

“[沙箱](/ai-coding-dictionary/sandbox)里接了哪些自动检查？”

**英文原例**

> Just the unit tests.

**中文理解**

“只有单元测试。”

**英文原例**

> Add typecheck and lint — it'll self-correct from those before the PR ever lands.

**中文理解**

“加上类型检查和 lint。这样 PR 还没交过来，它就能根据这些结果自行修正。”

> **译注：单元测试与 PR。** 单元测试检查某个较小的代码部分；PR 是提交给他人审查的改动请求。

[上一个词条：AFK](/ai-coding-dictionary/afk) · [下一个词条：自动审查](/ai-coding-dictionary/automated-review)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/automated-check)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fautomated-checkAutomated%20check%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Automated%20check%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fautomated-check) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/automated-check?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/automated-check)复制地址。
