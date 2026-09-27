---
title: "Handoff"
slug: "handoff"
type: "dictionary"
description: "Transferring agent context from one session to another, with no return path. Carry mechanism varies — artifact, compaction, others."
updatedAt: "2026-07-01T08:46:18.000Z"
---
Transferring [agent](/ai-coding-dictionary/agent) [context](/ai-coding-dictionary/context) from one [session](/ai-coding-dictionary/session) to another. The carry mechanism varies — a written [handoff artifact](/ai-coding-dictionary/handoff-artifact), an in-memory summary ([compaction](/ai-coding-dictionary/compaction)), and others. Distinct from [clearing](/ai-coding-dictionary/clearing) (no transfer at all). Reasons vary: switching roles (planner → implementer), kicking off an [AFK](/ai-coding-dictionary/afk) run, fanning out to parallel sessions, or freeing up [context window](/ai-coding-dictionary/context-window) room.

The receiving session starts with zero context — the [model](/ai-coding-dictionary/model) is [stateless](/ai-coding-dictionary/stateless), and nothing from the old session is visible to the new one. Whatever the next session needs has to be carried explicitly; everything else is gone. "No return path" is the constraint that shapes the carry: the new session can't ask the old one what it meant, so the carried material has to stand on its own.

| Mechanism | Form | Properties |
| --- | --- | --- |
| Handoff artifact | File in the [environment](/ai-coding-dictionary/environment) | You can read and correct it before anything depends on it; reusable across many sessions |
| Compaction | Summary in the context window | Automatic and cheap; harder to inspect; feeds one successor |

The visible failure of a bad handoff is relitigation: the new session re-opens decisions the old one had settled, because the carry recorded what was decided but not why. Judge a handoff by what a session with zero context could do with it.

_Usage:_

"Planning session is getting heavy — should I just keep going?"

"Do a handoff. Write the decisions to a doc, clear, start the implementation in a fresh session reading from it."
