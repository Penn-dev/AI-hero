---
title: "Vibe coding"
slug: "vibe-coding"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Patterns of Work

# Vibe coding

A working pattern where the user accepts the agent's code without human review. The diff is treated as opaque.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

A working pattern where the user accepts the [agent](/ai-coding-dictionary/agent)'s code without [human review](/ai-coding-dictionary/human-review). The diff is treated as opaque — what matters is whether the program behaves, not what's inside. [Automated review](/ai-coding-dictionary/automated-review) and [automated checks](/ai-coding-dictionary/automated-check) may still run; vibe coding is silent on both.

The term comes from Andrej Karpathy, who [coined it in early 2025](https://x.com/karpathy/status/1886192184808149383): you "fully give in to the vibes" and "forget that the code even exists" — describe what you want, accept what comes back, and judge it by running it.

Vibe coding trades inspection for speed. Reading diffs is usually the slowest step in agent-driven work, so dropping it removes the main bottleneck. For code whose failures are cheap — [prototypes](/ai-coding-dictionary/prototyping), one-off scripts, internal tools — that's a reasonable trade. The risk scales with the code's lifespan and stakes.

The cost arrives later. Vibe-coded changes accumulate into a codebase nobody has read, and behaviour was the only thing checked — so anything behaviour doesn't surface, like a secret written to logs, a missing edge case, or quietly wrong data handling, ships unseen. The first time someone debugs the system is the first time anyone reads the code. With human review gone, whatever automated verification still runs — tests, types, automated review — is the only gate the code passes through. The same stance applied to a whole codebase, or part of one, whose changes come from a [software factory](/ai-coding-dictionary/software-factory) is a [dark factory](/ai-coding-dictionary/dark-factory).

_Avoid:_ "vibe coding" as a synonym for "low-quality AI coding" — the term names the review stance, not the resulting code.

_Usage:_

"Did you read what it changed in the auth flow?"

"Vibe coded it — login still works, that's all I checked."

"Read the diff before you push, vibing on auth is how secrets leak into logs."

[Previous term**Human review**](/ai-coding-dictionary/human-review)[Next term**Design concept**](/ai-coding-dictionary/design-concept)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fvibe-codingVibe%20coding%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Vibe%20coding%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fvibe-coding)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/vibe-coding?author=Matt Pocock)

Copy URL
