---
title: "Session"
slug: "session"
type: "dictionary"
description: "One bounded run of interaction with an agent. Starts empty, accumulates, ends when cleared, closed, or compacted into a fresh session."
updatedAt: "2026-07-01T08:46:18.000Z"
---
One bounded run of interaction with an [agent](/ai-coding-dictionary/agent). Starts empty, accumulates messages, [tool results](/ai-coding-dictionary/tool-result), and files read, and ends when [cleared](/ai-coding-dictionary/clearing), closed, or [compacted](/ai-coding-dictionary/compaction) into a fresh session. The session is what _fills_ the [context window](/ai-coding-dictionary/context-window): if the context window is the box, the session is the stuff slowly filling it up. Work too large for a single context window must be split across sessions.

The session's message history is the agent's working memory. The [model](/ai-coding-dictionary/model) is [stateless](/ai-coding-dictionary/stateless), so everything it appears to remember — what you asked for, what the tests said, what it decided three turns ago — is in the message history, re-sent with every [model provider request](/ai-coding-dictionary/model-provider-request). Whatever isn't in the session doesn't exist for the agent.

That memory ends with the session. A new session starts from nothing: the agent that knew your codebase well at the end of yesterday's session knows none of it this morning. What survives is the [filesystem](/ai-coding-dictionary/filesystem) — files written during one session can be read by the next, which is what [handoffs](/ai-coding-dictionary/handoff), [memory systems](/ai-coding-dictionary/memory-system), and [AGENTS.md](/ai-coding-dictionary/agents-md) rely on.

You choose where a session ends. Everything in a session influences every later [turn](/ai-coding-dictionary/turn), so unrelated tasks done in one session leave residue that colours the next answer. One task per session keeps the context relevant; finishing a task is a natural point to clear.

_Usage:_

"How long can one session run before it falls apart?"

"Depends on the work — a focused refactor stays sharp longer than open-ended research. Once the session bloats, hand off or compact, don't push through."
