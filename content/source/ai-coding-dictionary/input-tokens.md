---
title: "Input tokens"
slug: "input-tokens"
type: "dictionary"
description: "Tokens the harness sends on each model provider request. Billed at a lower rate than output tokens."
updatedAt: "2026-07-01T08:46:18.000Z"
---
[Tokens](/ai-coding-dictionary/token) the [harness](/ai-coding-dictionary/harness) sends on each [model provider request](/ai-coding-dictionary/model-provider-request) — the [system prompt](/ai-coding-dictionary/system-prompt), the conversation history, [tool results](/ai-coding-dictionary/tool-result), everything the [model](/ai-coding-dictionary/model) reads before it writes. Billed at a lower rate than [output tokens](/ai-coding-dictionary/output-tokens), because they are less expensive to process than output tokens.

When doing [AI](/ai-coding-dictionary/ai) coding, input tokens make up most of your bill. The model is [stateless](/ai-coding-dictionary/stateless), so each [turn](/ai-coding-dictionary/turn) re-sends the entire [session](/ai-coding-dictionary/session) as input: your first message, every response, every tool result since. The input for turn fifty contains the previous forty-nine turns. A single model provider request might produce a few hundred output tokens but re-send a hundred thousand input tokens of accumulated history.

The [prefix cache](/ai-coding-dictionary/prefix-cache) reduces the cost: history that exactly matches a previous request is billed as cheap [cache tokens](/ai-coding-dictionary/cache-tokens) rather than full-price input. When input costs still hurt, the fix is to shrink what gets re-sent — [clearing](/ai-coding-dictionary/clearing) or [compacting](/ai-coding-dictionary/compaction) between tasks.

_Usage:_

"Bill's high but the [agent](/ai-coding-dictionary/agent)'s barely writing anything."

"It's the input tokens — every turn re-sends the whole session. Without the prefix cache you re-pay for the history each request."
