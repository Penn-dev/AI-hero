---
title: "Input tokens"
slug: "input-tokens"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

The Model

# Input tokens

Tokens the harness sends on each model provider request. Billed at a lower rate than output tokens.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[Tokens](/ai-coding-dictionary/token) the [harness](/ai-coding-dictionary/harness) sends on each [model provider request](/ai-coding-dictionary/model-provider-request) — the [system prompt](/ai-coding-dictionary/system-prompt), the conversation history, [tool results](/ai-coding-dictionary/tool-result), everything the [model](/ai-coding-dictionary/model) reads before it writes. Billed at a lower rate than [output tokens](/ai-coding-dictionary/output-tokens), because they are less expensive to process than output tokens.

When doing [AI](/ai-coding-dictionary/ai) coding, input tokens make up most of your bill. The model is [stateless](/ai-coding-dictionary/stateless), so each [turn](/ai-coding-dictionary/turn) re-sends the entire [session](/ai-coding-dictionary/session) as input: your first message, every response, every tool result since. The input for turn fifty contains the previous forty-nine turns. A single model provider request might produce a few hundred output tokens but re-send a hundred thousand input tokens of accumulated history.

The [prefix cache](/ai-coding-dictionary/prefix-cache) reduces the cost: history that exactly matches a previous request is billed as cheap [cache tokens](/ai-coding-dictionary/cache-tokens) rather than full-price input. When input costs still hurt, the fix is to shrink what gets re-sent — [clearing](/ai-coding-dictionary/clearing) or [compacting](/ai-coding-dictionary/compaction) between tasks.

_Usage:_

"Bill's high but the [agent](/ai-coding-dictionary/agent)'s barely writing anything."

"It's the input tokens — every turn re-sends the whole session. Without the prefix cache you re-pay for the history each request."

[Previous term**Model provider request**](/ai-coding-dictionary/model-provider-request)[Next term**Output tokens**](/ai-coding-dictionary/output-tokens)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Finput-tokensInput%20tokens%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Input%20tokens%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Finput-tokens)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/input-tokens?author=Matt Pocock)

Copy URL
