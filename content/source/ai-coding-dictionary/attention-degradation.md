---
title: "Attention degradation"
slug: "attention-degradation"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Failure Modes

# Attention degradation

As a session grows, each token's attention budget spreads across more competitors; signal on meaningful relationships shrinks.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

As a [session](/ai-coding-dictionary/session) grows, each [token](/ai-coding-dictionary/token)'s [attention budget](/ai-coding-dictionary/attention-budget) is spread across more competitors. The signal on any one [meaningful relationship](/ai-coding-dictionary/attention-relationship) shrinks; noise from irrelevant [context](/ai-coding-dictionary/context) crowds in. Same [model](/ai-coding-dictionary/model), same [parameters](/ai-coding-dictionary/parameters) — just more mouths to feed from the same plate. Cause of the smart zone / dumb [zone effect](/ai-coding-dictionary/smart-zone).

It presents as the model getting worse mid-session: constraints it followed for an hour start slipping, it re-asks things it was told, it writes code that ignores a file it read earlier. Nothing about the model changed — the only variable is how much context it's now attending over.

It's gradual, which is what makes it hard to catch from inside the session. There's no error and no threshold; each [turn](/ai-coding-dictionary/turn) is only slightly worse than the last, and by the time the slips are obvious you've been in the dumb zone for a while.

You recover by removing context, not adding more. Re-pasting the ignored instruction adds another competitor to the same crowded window and helps only briefly. What works: [clear](/ai-coding-dictionary/clearing) and reload only what the task needs, or [compact](/ai-coding-dictionary/compaction), or [hand off](/ai-coding-dictionary/handoff) to a fresh session. Treat declining instruction-following as a signal about context length, not about the model.

_Usage:_

"It's deep in the dumb zone — inventing generics that aren't in the type file."

"Attention degradation. The type definitions are still in context, but the signal on them is buried under everything we've added since. Clear and reload."

[Previous term**Attention budget**](/ai-coding-dictionary/attention-budget)[Next term**Smart zone**](/ai-coding-dictionary/smart-zone)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fattention-degradationAttention%20degradation%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Attention%20degradation%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fattention-degradation)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/attention-degradation?author=Matt Pocock)

Copy URL
