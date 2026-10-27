---
title: "AFK"
slug: "afk"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Patterns of Work

# AFK

A working pattern where the user kicks off a session and leaves the agent to run unattended (away from keyboard).

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Away from keyboard. A working pattern where the user kicks off a [session](/ai-coding-dictionary/session) and leaves the [agent](/ai-coding-dictionary/agent) to run unattended. The throughput multiplier of [AI](/ai-coding-dictionary/ai) coding — many AFK sessions can run in parallel while you sleep, eat, or work on something else. Usually requires a permissive [permission mode](/ai-coding-dictionary/permission-mode) plus [sandboxing](/ai-coding-dictionary/sandbox) to be safe.

When you're not there, the agent handles ambiguity differently. While you're watching, an ambiguous decision surfaces as a question and you answer it; once you've walked away, the agent picks a default and keeps going, and every later decision builds on that guess. The characteristic failure is coming back to hours of finished, confident work built on a wrong call made in the first ten minutes. The work isn't sloppy — it's coherent, just coherent about the wrong thing.

Since you can't give input during the run, give it before and after instead. Before: resolve the ambiguity up front — a [grilling](/ai-coding-dictionary/grilling) session, a written [spec](/ai-coding-dictionary/spec) — so there are fewer gaps for the agent to fill alone. During: [automated checks](/ai-coding-dictionary/automated-check) and [automated review](/ai-coding-dictionary/automated-review) stand in for the attention you're not giving, failing fast on what can be caught mechanically. After: the run ends in something reviewable — a PR, not changes already merged. AFK doesn't remove [human review](/ai-coding-dictionary/human-review); it defers all of it to the end, which is why what arrives at the end has to be worth reviewing. This is also why [AX](/ai-coding-dictionary/ax) matters most in AFK runs — with no one watching, the environment is the only support the agent gets.

_Avoid:_ "background agent" — centers the machine ("running in the background") rather than the human pattern ("user has walked away"). AFK names the fact that matters: the user isn't watching.

_Usage:_

"I'm running this AFK — three sandboxed agents on the refactor, reviewing the PRs in the morning."

"[Bypass permissions](/ai-coding-dictionary/agent-mode)?"

"Yeah, read-only [filesystem](/ai-coding-dictionary/filesystem), no network."

[Previous term**Human-in-the-loop**](/ai-coding-dictionary/human-in-the-loop)[Next term**Automated check**](/ai-coding-dictionary/automated-check)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FafkAFK%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=AFK%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fafk)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/afk?author=Matt Pocock>)

Copy URL
