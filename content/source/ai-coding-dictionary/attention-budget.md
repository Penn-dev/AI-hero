---
title: "Attention budget"
slug: "attention-budget"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Failure Modes

# Attention budget

Each token has a finite amount of influence to distribute across the rest of the context. Per-token, doesn't grow when context does.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Each [token](/ai-coding-dictionary/token) has a finite amount of influence to distribute across the rest of the [context](/ai-coding-dictionary/context). Heavy influence on [one relationship](/ai-coding-dictionary/attention-relationship) leaves less for others. The budget is per-token and doesn't grow when the context does, which is why long [sessions](/ai-coding-dictionary/session) dilute.

Think of it as signal and noise. Your instruction is a signal at fixed volume; every other token in the [context window](/ai-coding-dictionary/context-window) is competing sound. The instruction never gets quieter — it's still there, character for character — but as the context grows, the room gets louder around it, and the signal-to-noise ratio drops. An instruction that was the loudest thing at 10k tokens of context is background hum at 150k. This is the mechanism behind [attention degradation](/ai-coding-dictionary/attention-degradation): the model doesn't forget; the signal gets lost in the noise.

The symptom reads as disobedience — the agent agreed to a constraint early on and then drifts from it, and re-pasting the constraint helps only briefly. The cause isn't the instruction; it's everything else in the window competing with it.

What you can control is what goes into the context. Content that doesn't serve the task isn't neutral — it's noise over everything that does. Keep the window small, [clear](/ai-coding-dictionary/clearing) when the accumulated context stops paying for itself, and restate the constraints that matter instead of trusting their early mention to hold.

_Usage:_

"Why does it keep ignoring the schema I pasted at the top?"

"We're well into the [dumb zone](/ai-coding-dictionary/smart-zone) — every token's attention budget is fixed, but the context kept growing. The signal on the schema is now competing with thousands of newer tokens."

[Previous term**Attention relationship**](/ai-coding-dictionary/attention-relationship)[Next term**Attention degradation**](/ai-coding-dictionary/attention-degradation)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fattention-budgetAttention%20budget%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Attention%20budget%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fattention-budget)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/attention-budget?author=Matt Pocock)

Copy URL
