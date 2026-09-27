---
title: "Prefix cache"
slug: "prefix-cache"
type: "dictionary"
description: "The provider-side store that lets consecutive requests skip re-processing a shared prefix, billing those tokens at a lower rate."
updatedAt: "2026-07-01T08:46:18.000Z"
---
The [provider](/ai-coding-dictionary/model-provider)-side store that lets consecutive [model provider requests](/ai-coding-dictionary/model-provider-request) skip re-processing a shared prefix. When the start of a request matches the start of a recent one — same [system prompt](/ai-coding-dictionary/system-prompt), same history up to some point — the provider reuses its prior work and bills those [tokens](/ai-coding-dictionary/token) as [cache tokens](/ai-coding-dictionary/cache-tokens) at a much lower rate.

The cache pays off because sessions grow append-only. Every request re-sends the whole history as [input tokens](/ai-coding-dictionary/input-tokens) (see that entry for why), and in a normal [session](/ai-coding-dictionary/session) the history only changes at the end — each request is the previous one plus a few new messages. The provider processes the long shared beginning once, stores the result, and picks up from where the prefix ends. Without the cache, a 50-[turn](/ai-coding-dictionary/turn) session would pay to re-process turn one fifty times.

Caches also expire. How long an entry stays warm varies per model provider — typically minutes, not hours. Leave a session idle past the window and the next request rebuilds the prefix at full price once before caching resumes. This is mostly a [harness](/ai-coding-dictionary/harness) builder's concern; as a user, the visible effect is that requests after a long pause cost more than the ones before it.

_Usage:_

"Why did the bill spike halfway through the session?"

"Harness started injecting the current time into the system prompt every turn. Prefix cache breaks at the first changed token, so every request after that billed at full rate."
