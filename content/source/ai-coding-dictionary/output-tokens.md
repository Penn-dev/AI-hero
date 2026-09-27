---
title: "Output tokens"
slug: "output-tokens"
type: "dictionary"
description: "Tokens the model generates back. Billed at a higher rate than input tokens, since they cost more compute to produce."
updatedAt: "2026-07-01T08:46:18.000Z"
---
[Tokens](/ai-coding-dictionary/token) the [model](/ai-coding-dictionary/model) generates back. Billed at a higher rate than [input tokens](/ai-coding-dictionary/input-tokens) — commonly around five times the rate — since they cost more compute to produce.

Everything the model writes counts: the prose you read, the code it emits, [tool calls](/ai-coding-dictionary/tool-call), and any extended thinking the model does before answering. That last one surprises people — reasoning tokens are billed as output even when the [harness](/ai-coding-dictionary/harness) often doesn't show them to you, and turning up [effort](/ai-coding-dictionary/effort) spends more of them.

Output tokens also set the pace of a [session](/ai-coding-dictionary/session). The model reads input quickly but generates output one token at a time, so when a [turn](/ai-coding-dictionary/turn) feels slow, it's almost always the output being written, not the input being read. A long wait usually means a long answer is coming.

_Usage:_

"The refactor session is burning through credit even though the inputs are small."

"Agent's rewriting whole files instead of patching. Output tokens cost roughly five times the input rate — get it emitting edits and the bill drops."
