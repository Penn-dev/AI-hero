---
title: "Prefix cache"
slug: "prefix-cache"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

The Model

# Prefix cache

The provider-side store that lets consecutive requests skip re-processing a shared prefix, billing those tokens at a lower rate.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

The [provider](/ai-coding-dictionary/model-provider)-side store that lets consecutive [model provider requests](/ai-coding-dictionary/model-provider-request) skip re-processing a shared prefix. When the start of a request matches the start of a recent one — same [system prompt](/ai-coding-dictionary/system-prompt), same history up to some point — the provider reuses its prior work and bills those [tokens](/ai-coding-dictionary/token) as [cache tokens](/ai-coding-dictionary/cache-tokens) at a much lower rate.

The cache pays off because sessions grow append-only. Every request re-sends the whole history as [input tokens](/ai-coding-dictionary/input-tokens) (see that entry for why), and in a normal [session](/ai-coding-dictionary/session) the history only changes at the end — each request is the previous one plus a few new messages. The provider processes the long shared beginning once, stores the result, and picks up from where the prefix ends. Without the cache, a 50-[turn](/ai-coding-dictionary/turn) session would pay to re-process turn one fifty times.

Caches also expire. How long an entry stays warm varies per model provider — typically minutes, not hours. Leave a session idle past the window and the next request rebuilds the prefix at full price once before caching resumes. This is mostly a [harness](/ai-coding-dictionary/harness) builder's concern; as a user, the visible effect is that requests after a long pause cost more than the ones before it.

_Usage:_

"Why did the bill spike halfway through the session?"

"Harness started injecting the current time into the system prompt every turn. Prefix cache breaks at the first changed token, so every request after that billed at full rate."

[Previous term**Output tokens**](/ai-coding-dictionary/output-tokens)[Next term**Cache tokens**](/ai-coding-dictionary/cache-tokens)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fprefix-cachePrefix%20cache%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Prefix%20cache%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fprefix-cache)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/prefix-cache?author=Matt Pocock>)

Copy URL
