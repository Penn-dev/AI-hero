---
title: "Memory system"
slug: "memory-system"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Memory and Steering

# Memory system

A system that attempts to make an agent stateful across sessions by persisting to the environment and reloading at session start.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

A system that attempts to make an [agent](/ai-coding-dictionary/agent) [stateful](/ai-coding-dictionary/stateful) across [sessions](/ai-coding-dictionary/session). Persists information into the [environment](/ai-coding-dictionary/environment) during a session and reloads it into the [context window](/ai-coding-dictionary/context-window) at the start of future ones, so the agent carries continuity beyond the user [clearing](/ai-coding-dictionary/clearing) the session.

A memory system has two halves. The write path: during a session, the agent records what it learned — a preference you stated, a fact about the project — as files in the environment. The read path: at session start, the [harness](/ai-coding-dictionary/harness) loads those files, or an index of them, back into the context window. Many harnesses ship their own memory system — Claude Code's `/memory` is one — but you can also build one yourself: a directory of notes plus an instruction in [AGENTS.md](/ai-coding-dictionary/agents-md) to consult it.

The same trade-offs as any always-loaded content apply. Memories accumulate, so most systems load a one-line index and leave the bodies behind [context pointers](/ai-coding-dictionary/context-pointer) rather than inlining everything. And memories are [secondary sources](/ai-coding-dictionary/secondary-source), so they drift: a fact recorded in March is loaded with equal confidence in June, after the project has moved on. A memory system needs pruning, the same way AGENTS.md does.

_Usage:_

"I keep having to re-tell it I'm on Postgres, not MySQL."

"Wire up a memory system — write what it learns to the [filesystem](/ai-coding-dictionary/filesystem) on the first [turn](/ai-coding-dictionary/turn), reload it at session start. The [model](/ai-coding-dictionary/model) itself is [stateless](/ai-coding-dictionary/stateless); the memory layer fakes continuity."

[Previous term**Autocompact**](/ai-coding-dictionary/autocompact)[Next term**AGENTS.md**](/ai-coding-dictionary/agents-md)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmemory-systemMemory%20system%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Memory%20system%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmemory-system)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/memory-system?author=Matt Pocock)

Copy URL
