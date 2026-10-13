---
title: "Effort"
slug: "effort"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

The Model

# Effort

A dial for how much reasoning the model does before it answers. More effort spends more output tokens for a better shot at hard problems.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Effort is a dial for how much reasoning a [model](/ai-coding-dictionary/model) does before it answers. Set per [model provider request](/ai-coding-dictionary/model-provider-request), it controls the length of the thinking the model works through before it starts writing the response you see. That thinking is generated at [inference](/ai-coding-dictionary/inference) time like everything else; the [harness](/ai-coding-dictionary/harness) often hides it, but it's real work the model is doing.

Higher effort costs more and runs slower. The reasoning is emitted as [tokens](/ai-coding-dictionary/token), billed as [output tokens](/ai-coding-dictionary/output-tokens) even when you never see them, and produced one token at a time — so turning effort up lengthens the wait before the answer arrives and adds to the bill. The trade is more deliberation against speed and cost.

Most harnesses expose effort as a small ladder:

| Level | What it's for |
| --- | --- |
| Low | Mechanical edits, lookups, well-specified changes with one clear path. |
| Medium | Everyday coding — the usual default. |
| High | Tricky bugs, design decisions, multi-step plans. |
| Max | The hardest problems, where a wrong answer is expensive to unwind. |

View Table

The symptom of getting it wrong cuts both ways. Set effort too low on a hard problem and you get a confident, shallow answer that skipped the reasoning the problem needed — it reads fine and is wrong in a way that costs you later. Set it to max for a one-line rename and you sit through a long think that produces nothing the lowest setting wouldn't have.

Match effort to the task, not the [session](/ai-coding-dictionary/session). Turn it up for the part that's genuinely hard to reason about, and back down for the rote work around it.

_Usage:_

"It keeps botching this concurrency fix — I've re-explained it three times."

"Bump the effort up. That's a reasoning-heavy bug, and on the default setting it's not thinking long enough before it commits to an approach."

[Previous term**Inference**](/ai-coding-dictionary/inference)[Next term**Token**](/ai-coding-dictionary/token)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FeffortEffort%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Effort%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Feffort)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/effort?author=Matt Pocock)

Copy URL
