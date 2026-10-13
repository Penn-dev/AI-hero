---
title: "Stateless"
slug: "stateless"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Sessions, Context Windows & Turns

# Stateless

Carries no information forward. The model is stateless across requests; an agent is stateless across sessions by default.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Carries no information forward. The [model](/ai-coding-dictionary/model) is stateless across [model provider requests](/ai-coding-dictionary/model-provider-request) — each request resends the full [context window](/ai-coding-dictionary/context-window), because the model has no way to see anything else. An [agent](/ai-coding-dictionary/agent) is stateless across [sessions](/ai-coding-dictionary/session) by default: a new session starts empty, with no trace of prior ones. Counterpart to [stateful](/ai-coding-dictionary/stateful).

The model itself is permanently stateless: its [parameters](/ai-coding-dictionary/parameters) are frozen after [training](/ai-coding-dictionary/training), and nothing you do at [inference](/ai-coding-dictionary/inference) changes them. The model doesn't learn from your corrections, doesn't remember being told the same thing yesterday, and isn't getting to know you — however much the conversation feels otherwise. The feeling of continuity within a session is manufactured by the [harness](/ai-coding-dictionary/harness), which keeps the transcript and re-sends it with every request. The model isn't remembering the conversation; it's re-reading it.

The practical consequence: if you want something remembered across sessions, you have to write it down somewhere the agent will read it back. That's what [AGENTS.md](/ai-coding-dictionary/agents-md) files, [memory systems](/ai-coding-dictionary/memory-system), and [handoff artifacts](/ai-coding-dictionary/handoff-artifact) are — files that get loaded into the [context](/ai-coding-dictionary/context) of future sessions, standing in for the memory the model doesn't have. When the agent keeps making a mistake you've corrected before, the question isn't why it didn't learn — it can't — but where that correction should be written down so every future session reads it.

_Usage:_

"Why does it forget the convention every time I [clear](/ai-coding-dictionary/clearing)?"

"The model's stateless — the new session starts empty. If you want it carried, write it to AGENTS.md or a memory file the harness loads at session start."

[Previous term**Cache tokens**](/ai-coding-dictionary/cache-tokens)[Next term**Context**](/ai-coding-dictionary/context)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FstatelessStateless%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Stateless%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fstateless)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/stateless?author=Matt Pocock>)

Copy URL
