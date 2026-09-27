---
title: "Stateful"
slug: "stateful"
type: "dictionary"
description: "Carries information forward. Sessions are stateful across turns; agents can be made stateful across sessions via a memory system."
updatedAt: "2026-07-01T08:46:18.000Z"
---
Carries information forward. A [session](/ai-coding-dictionary/session) is stateful across [turns](/ai-coding-dictionary/turn) — [context](/ai-coding-dictionary/context) accumulates as the session runs, which is why long sessions drift into the [dumb zone](/ai-coding-dictionary/smart-zone). An [agent](/ai-coding-dictionary/agent) can be made stateful across **sessions** by adding a [memory system](/ai-coding-dictionary/memory-system) that persists information into the [environment](/ai-coding-dictionary/environment) and reloads it at the start of future sessions. The [model](/ai-coding-dictionary/model) is never stateful; any apparent continuity is the [harness](/ai-coding-dictionary/harness) re-feeding context. Counterpart to [stateless](/ai-coding-dictionary/stateless).

Where state lives at each layer:

| Layer | Stateful? | How |
| --- | --- | --- |
| Model | Never | [Parameters](/ai-coding-dictionary/parameters) are frozen; it sees only what's in each request |
| Session | Across turns | The harness appends every message and [tool result](/ai-coding-dictionary/tool-result) to the context |
| Harness | Across sessions | Memory files, [AGENTS.md](/ai-coding-dictionary/agents-md), [handoff artifacts](/ai-coding-dictionary/handoff-artifact) — written down, reloaded later |
| Environment | Always | Files persist whether or not any session is running |

Each layer's statefulness is built by re-reading something stored a layer below: the session feels continuous because the harness re-sends the message history to the stateless model, and the agent remembers across sessions because the harness re-loads files from the environment. No state is ever stored in the model itself.

State isn't always wanted. Everything carried forward influences what comes next, so a wrong assumption made early in a session is carried forward too. [Clearing](/ai-coding-dictionary/clearing) is the deliberate act of throwing session state away and starting from what's written down.

_Usage:_

"It remembered my preferences from yesterday — does that mean the model learned them?"

"No, the agent's stateful because the harness wrote them to a memory file and reloaded them at session start. The model itself saw nothing of yesterday."
