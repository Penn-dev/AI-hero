---
title: "Subagent"
slug: "subagent"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Memory and Steering

# Subagent

An agent spawned by another agent via a tool call. Runs in its own session, reports a single tool result. Cannot spawn further subagents.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

An [agent](/ai-coding-dictionary/agent) spawned by another agent via a [tool call](/ai-coding-dictionary/tool-call). Runs in its own [session](/ai-coding-dictionary/session) with its own [context window](/ai-coding-dictionary/context-window), and reports a single [tool result](/ai-coding-dictionary/tool-result) back. Distinct from a [handoff](/ai-coding-dictionary/handoff) — the parent specifically expects a return; a handoff has no return path. **Cannot spawn further subagents** — the tree is one level deep. Subagents exist to isolate [context](/ai-coding-dictionary/context), not to compose hierarchies.

The point is to keep noisy work out of the parent's context. A broad search or a long file-reading expedition produces pages of tool results, most of which matter only long enough to find the answer. Run inside the parent and all of it stays in the parent's context for the rest of the session. Run inside a subagent and the noise fills a disposable window instead — only the final report lands in the parent's context. The report is a [secondary source](/ai-coding-dictionary/secondary-source): the parent gets the subagent's account of what it found, not the raw results, so anything the report leaves out is invisible to the parent.

Subagents also run concurrently — a parent can fan several out at once over independent pieces of work.

_Usage:_

"The grep results are blowing out my context."

"Spawn a subagent to do the search — it'll burn its own context window on the noise and report back the two file paths you actually need."

[Previous term**Skill**](/ai-coding-dictionary/skill)[Next term**Human-in-the-loop**](/ai-coding-dictionary/human-in-the-loop)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FsubagentSubagent%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Subagent%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsubagent)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/subagent?author=Matt Pocock>)

Copy URL
