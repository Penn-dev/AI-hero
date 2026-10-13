---
title: "Handoff"
slug: "handoff"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Handoffs

# Handoff

Transferring agent context from one session to another, with no return path. Carry mechanism varies — artifact, compaction, others.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Transferring [agent](/ai-coding-dictionary/agent) [context](/ai-coding-dictionary/context) from one [session](/ai-coding-dictionary/session) to another. The carry mechanism varies — a written [handoff artifact](/ai-coding-dictionary/handoff-artifact), an in-memory summary ([compaction](/ai-coding-dictionary/compaction)), and others. Distinct from [clearing](/ai-coding-dictionary/clearing) (no transfer at all). Reasons vary: switching roles (planner → implementer), kicking off an [AFK](/ai-coding-dictionary/afk) run, fanning out to parallel sessions, or freeing up [context window](/ai-coding-dictionary/context-window) room.

The receiving session starts with zero context — the [model](/ai-coding-dictionary/model) is [stateless](/ai-coding-dictionary/stateless), and nothing from the old session is visible to the new one. Whatever the next session needs has to be carried explicitly; everything else is gone. "No return path" is the constraint that shapes the carry: the new session can't ask the old one what it meant, so the carried material has to stand on its own.

| Mechanism | Form | Properties |
| --- | --- | --- |
| Handoff artifact | File in the [environment](/ai-coding-dictionary/environment) | You can read and correct it before anything depends on it; reusable across many sessions |
| Compaction | Summary in the context window | Automatic and cheap; harder to inspect; feeds one successor |

View Table

The visible failure of a bad handoff is relitigation: the new session re-opens decisions the old one had settled, because the carry recorded what was decided but not why. Judge a handoff by what a session with zero context could do with it.

_Usage:_

"Planning session is getting heavy — should I just keep going?"

"Do a handoff. Write the decisions to a doc, clear, start the implementation in a fresh session reading from it."

[Previous term**Clearing**](/ai-coding-dictionary/clearing)[Next term**Primary source**](/ai-coding-dictionary/primary-source)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FhandoffHandoff%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Handoff%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhandoff)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/handoff?author=Matt Pocock)

Copy URL
