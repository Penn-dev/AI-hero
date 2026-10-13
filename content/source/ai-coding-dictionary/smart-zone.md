---
title: "Smart zone"
slug: "smart-zone"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Failure Modes

# Smart zone

Early in a session the agent is sharp and focused. As the session grows it drifts into a dumb zone: sloppier, forgetful, more mistakes.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Early in a [session](/ai-coding-dictionary/session) the [agent](/ai-coding-dictionary/agent) is in a "smart zone" — sharp, focused, recall is good. As the session grows it drifts into a "dumb zone": sloppier, forgetful, more mistakes — and more faithfulness [hallucinations](/ai-coding-dictionary/hallucination). Same [model](/ai-coding-dictionary/model), same [harness](/ai-coding-dictionary/harness) — just more [context](/ai-coding-dictionary/context). The felt effect of [attention degradation](/ai-coding-dictionary/attention-degradation). On frontier models, the dumb zone commonly begins around 125K-150K [tokens](/ai-coding-dictionary/token) — though this is debated. [Clear](/ai-coding-dictionary/clearing) or [compact](/ai-coding-dictionary/compaction) when the session bloats; don't push through.

The decline is gradual, which makes it easy to miss. There's no error message and no visible boundary; the agent just starts performing slightly worse, then noticeably worse. Common signs: it forgets an instruction you gave twenty turns ago, repeats a mistake it had already corrected, or confidently asserts something the context contradicts. Because the slide is smooth, the usual response is to push through and re-explain — which adds more context and makes the problem worse.

The zones don't track the [context window](/ai-coding-dictionary/context-window) limit. A session can be deep in the dumb zone with most of the window still free: the limit is where the harness refuses to continue, but quality falls off long before that. Plan around the smart zone, not the window — the practical budget for a task is the tokens the agent works well within, not the tokens it can technically hold.

The smart zone is a budget, and unrelated work spends it. Every task done in a session uses up tokens, so starting a second task in the same session means starting it closer to the dumb zone. Doing one task per session gives each task the sharpest part of the session. When a single task is bigger than one smart zone, split it: [hand off](/ai-coding-dictionary/handoff) or compact at a natural boundary, and let a fresh session do the next piece.

_Usage:_

"It nailed the first three components and just butchered the fourth."

"You're out of the smart zone — same model, just deep into the dumb zone now. Compact and reload the plan, the next component will land."

[Previous term**Attention degradation**](/ai-coding-dictionary/attention-degradation)[Next term**Clearing**](/ai-coding-dictionary/clearing)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsmart-zoneSmart%20zone%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Smart%20zone%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsmart-zone)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/smart-zone?author=Matt Pocock)

Copy URL
