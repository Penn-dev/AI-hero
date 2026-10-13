---
title: "Human review"
slug: "human-review"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Patterns of Work

# Human review

The user reading the code the agent produced and forming a judgement on it. Reading the diff counts; reading the summary doesn't.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

The user reading the code the [agent](/ai-coding-dictionary/agent) produced and forming a judgement on it. Reading the diff or the changed files counts; reading the agent's _description_ of what it did does not — narration is not the artifact. The description is a [secondary source](/ai-coding-dictionary/secondary-source), written by the party being reviewed; the diff is the [primary source](/ai-coding-dictionary/primary-source), and review means reading it.

Agents raise the volume of code produced, so review becomes the bottleneck. One useful idea is layering different review strategies. [Automated checks](/ai-coding-dictionary/automated-check) catch the mechanical failures, [automated review](/ai-coding-dictionary/automated-review) catches the describable ones, and human review is reserved for what only you can judge — whether the change is the right change, whether the approach fits the codebase, whether this should exist at all.

Review is also cheaper earlier. Reading a plan before work starts, or a small diff mid-flight, takes minutes; excavating a finished branch after an [AFK](/ai-coding-dictionary/afk) run takes longer. Where you place the review checkpoint is a [human-in-the-loop](/ai-coding-dictionary/human-in-the-loop) decision, not an afterthought.

_Avoid:_ "code review" alone — ambiguous between human and automated.

_Usage:_

"I human-reviewed the AFK output."

"You read the diff or just the summary?"

"Diff. The summary said it deleted dead code — turned out the function was called from a generated file."

[Previous term**Automated review**](/ai-coding-dictionary/automated-review)[Next term**Vibe coding**](/ai-coding-dictionary/vibe-coding)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhuman-reviewHuman%20review%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Human%20review%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhuman-review)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/human-review?author=Matt Pocock>)

Copy URL
