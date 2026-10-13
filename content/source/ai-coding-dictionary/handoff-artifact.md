---
title: "Handoff artifact"
slug: "handoff-artifact"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Handoffs

# Handoff artifact

A document used as the carry mechanism for a handoff — written by one session to be read by another.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

A document used as the carry mechanism for a [handoff](/ai-coding-dictionary/handoff) — written to the [environment](/ai-coding-dictionary/environment) by one [session](/ai-coding-dictionary/session) to be read by another. [Specs](/ai-coding-dictionary/spec), [tickets](/ai-coding-dictionary/ticket), and plan docs are all handoff artifacts.

The reason to write one: the [model](/ai-coding-dictionary/model) is [stateless](/ai-coding-dictionary/stateless), so nothing in a session survives [clearing](/ai-coding-dictionary/clearing) it. Decisions, constraints, half-finished plans — all gone with the [context](/ai-coding-dictionary/context) that held them. The environment persists. Writing the important state into a file moves it somewhere the next session can read it back from.

The artifact is a [secondary source](/ai-coding-dictionary/secondary-source) — an account of the session's work, not the work itself. That's what makes it small enough to brief a fresh session, and also why it can mislead one: it records what the writing session believed, and anything it left out or got wrong is invisible to the reader. Where a claim matters, the next session should verify it against the [primary source](/ai-coding-dictionary/primary-source) — the code, the tests — rather than inherit it.

A good artifact is written to be read into a session that has zero context. Concrete file paths rather than "the file we discussed". What was decided and why, so the next session doesn't relitigate it. What's done and what's left. It helps to tell the writing session where the artifact is headed: "write a handoff doc for a fresh session that knows nothing about this work".

The alternative carry mechanism is [compaction](/ai-coding-dictionary/compaction), which summarises in-memory. The artifact has two advantages: it lives on disk where you can read and correct it before anything depends on it, and it can be reused — the same spec can brief five parallel sessions.

_Usage:_

"How do I split this between the planning [agent](/ai-coding-dictionary/agent) and the implementing one?"

"Have the planner write a handoff artifact — file paths, decisions, constraints. The implementer's session opens with a pointer to the artifact and works from it as its brief."

[Previous term**Secondary source**](/ai-coding-dictionary/secondary-source)[Next term**Spec**](/ai-coding-dictionary/spec)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhandoff-artifactHandoff%20artifact%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Handoff%20artifact%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhandoff-artifact)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/handoff-artifact?author=Matt Pocock>)

Copy URL
