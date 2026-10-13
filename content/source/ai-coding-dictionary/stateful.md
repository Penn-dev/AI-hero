---
title: "Stateful"
slug: "stateful"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Sessions, Context Windows & Turns

# Stateful

Carries information forward. Sessions are stateful across turns; agents can be made stateful across sessions via a memory system.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Carries information forward. A [session](/ai-coding-dictionary/session) is stateful across [turns](/ai-coding-dictionary/turn) — [context](/ai-coding-dictionary/context) accumulates as the session runs, which is why long sessions drift into the [dumb zone](/ai-coding-dictionary/smart-zone). An [agent](/ai-coding-dictionary/agent) can be made stateful across **sessions** by adding a [memory system](/ai-coding-dictionary/memory-system) that persists information into the [environment](/ai-coding-dictionary/environment) and reloads it at the start of future sessions. The [model](/ai-coding-dictionary/model) is never stateful; any apparent continuity is the [harness](/ai-coding-dictionary/harness) re-feeding context. Counterpart to [stateless](/ai-coding-dictionary/stateless).

Where state lives at each layer:

| Layer | Stateful? | How |
| --- | --- | --- |
| Model | Never | [Parameters](/ai-coding-dictionary/parameters) are frozen; it sees only what's in each request |
| Session | Across turns | The harness appends every message and [tool result](/ai-coding-dictionary/tool-result) to the context |
| Harness | Across sessions | Memory files, [AGENTS.md](/ai-coding-dictionary/agents-md), [handoff artifacts](/ai-coding-dictionary/handoff-artifact) — written down, reloaded later |
| Environment | Always | Files persist whether or not any session is running |

View Table

Each layer's statefulness is built by re-reading something stored a layer below: the session feels continuous because the harness re-sends the message history to the stateless model, and the agent remembers across sessions because the harness re-loads files from the environment. No state is ever stored in the model itself.

State isn't always wanted. Everything carried forward influences what comes next, so a wrong assumption made early in a session is carried forward too. [Clearing](/ai-coding-dictionary/clearing) is the deliberate act of throwing session state away and starting from what's written down.

_Usage:_

"It remembered my preferences from yesterday — does that mean the model learned them?"

"No, the agent's stateful because the harness wrote them to a memory file and reloaded them at session start. The model itself saw nothing of yesterday."

[Previous term**Context window**](/ai-coding-dictionary/context-window)[Next term**Agent**](/ai-coding-dictionary/agent)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FstatefulStateful%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Stateful%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fstateful)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/stateful?author=Matt Pocock)

Copy URL
