---
title: "Session"
slug: "session"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Sessions, Context Windows & Turns

# Session

One bounded run of interaction with an agent. Starts empty, accumulates, ends when cleared, closed, or compacted into a fresh session.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

One bounded run of interaction with an [agent](/ai-coding-dictionary/agent). Starts empty, accumulates messages, [tool results](/ai-coding-dictionary/tool-result), and files read, and ends when [cleared](/ai-coding-dictionary/clearing), closed, or [compacted](/ai-coding-dictionary/compaction) into a fresh session. The session is what _fills_ the [context window](/ai-coding-dictionary/context-window): if the context window is the box, the session is the stuff slowly filling it up. Work too large for a single context window must be split across sessions.

The session's message history is the agent's working memory. The [model](/ai-coding-dictionary/model) is [stateless](/ai-coding-dictionary/stateless), so everything it appears to remember — what you asked for, what the tests said, what it decided three turns ago — is in the message history, re-sent with every [model provider request](/ai-coding-dictionary/model-provider-request). Whatever isn't in the session doesn't exist for the agent.

That memory ends with the session. A new session starts from nothing: the agent that knew your codebase well at the end of yesterday's session knows none of it this morning. What survives is the [filesystem](/ai-coding-dictionary/filesystem) — files written during one session can be read by the next, which is what [handoffs](/ai-coding-dictionary/handoff), [memory systems](/ai-coding-dictionary/memory-system), and [AGENTS.md](/ai-coding-dictionary/agents-md) rely on.

You choose where a session ends. Everything in a session influences every later [turn](/ai-coding-dictionary/turn), so unrelated tasks done in one session leave residue that colours the next answer. One task per session keeps the context relevant; finishing a task is a natural point to clear.

_Usage:_

"How long can one session run before it falls apart?"

"Depends on the work — a focused refactor stays sharp longer than open-ended research. Once the session bloats, hand off or compact, don't push through."

[Previous term**System prompt**](/ai-coding-dictionary/system-prompt)[Next term**Turn**](/ai-coding-dictionary/turn)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FsessionSession%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Session%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsession)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/session?author=Matt Pocock>)

Copy URL
