---
title: "Cache tokens"
slug: "cache-tokens"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

The Model

# Cache tokens

Input tokens the provider has cached from a previous request via its prefix cache, billed at a much lower rate.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[Input tokens](/ai-coding-dictionary/input-tokens) the [provider](/ai-coding-dictionary/model-provider) has cached from a previous [model provider request](/ai-coding-dictionary/model-provider-request) so it doesn't have to re-process them. When consecutive requests share a prefix, the provider reuses the work via its [prefix cache](/ai-coding-dictionary/prefix-cache) and bills the cached portion at a much lower rate. The lever that makes long [sessions](/ai-coding-dictionary/session) affordable — without it, every [turn](/ai-coding-dictionary/turn) re-pays for the whole history.

The reason this matters is how sessions are billed. The [model](/ai-coding-dictionary/model) is [stateless](/ai-coding-dictionary/stateless), so every request resends the entire conversation — [system prompt](/ai-coding-dictionary/system-prompt), every message, every [tool result](/ai-coding-dictionary/tool-result) — as input tokens. By turn fifty, each request carries fifty turns of history, and you'd pay full rate on all of it, every time. The cache changes the maths: tokens the provider has already processed in an identical prefix are billed as cache tokens, often at a tenth of the input rate or less. On a long session, most of what you send is cache tokens, and the bill stays sane.

An example shows when tokens are cached and when they're not. Each letter stands for a block of conversation content; each request sends the conversation so far:

| Request sends | Cached | Billed at full rate | Why |
| --- | --- | --- | --- |
| `AB` | nothing | `AB` | First request — nothing to match against |
| `ABC` | `AB` | `C` | `AB` is an exact prefix of the previous request |
| `ABCD` | `ABC` | `D` | Prefix still intact |
| `AXCD` | `A` | `XCD` | An edit changed `B` to `X`; the match fails there |

View Table

The cache is fragile in a specific way: it matches exact prefixes. If anything changes earlier in the conversation — the [harness](/ai-coding-dictionary/harness) reorders content, a timestamp updates, a file's representation shifts — the cache misses from that point onward and everything after it is billed at full input rate. Caches also expire after a few minutes of inactivity, so a session resumed after a long pause re-pays its history once. When a session's cost jumps without an obvious cause, compare cache tokens to input tokens in the usage report — a broken cache shows up there first.

_Usage:_

"Cost on long sessions is brutal — eight bucks for a refactor."

"Check the cache tokens. If the harness is reordering the system prompt or files between turns, the prefix breaks and you re-pay full input rate every request."

[Previous term**Prefix cache**](/ai-coding-dictionary/prefix-cache)[Next term**Stateless**](/ai-coding-dictionary/stateless)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcache-tokensCache%20tokens%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Cache%20tokens%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcache-tokens)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/cache-tokens?author=Matt Pocock)

Copy URL
