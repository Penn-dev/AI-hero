---
title: "System prompt"
slug: "system-prompt"
type: "dictionary"
description: "The instructions the harness prepends to every model provider request — the agent's standing brief. Usually stable across a session."
updatedAt: "2026-07-01T08:46:18.000Z"
---
The instructions the [harness](/ai-coding-dictionary/harness) prepends to every [model provider request](/ai-coding-dictionary/model-provider-request) — the [agent](/ai-coding-dictionary/agent)'s standing brief: who it is, how to behave, which [tools](/ai-coding-dictionary/tool) it can call, what conventions to follow. Usually stable across a [session](/ai-coding-dictionary/session).

The system prompt is written by the harness vendor, not by you, and in coding harnesses it's big — often tens of thousands of [tokens](/ai-coding-dictionary/token) of behavioural rules, tool descriptions, and edge-case handling, all paid as [input tokens](/ai-coding-dictionary/input-tokens) on every [turn](/ai-coding-dictionary/turn). Your own standing instructions ride along with it: files like [AGENTS.md](/ai-coding-dictionary/agents-md) are loaded next to the system prompt at the start of the session, so the [model](/ai-coding-dictionary/model) reads the vendor's brief and yours together before it ever sees your message.

Because it's identical on every request, it forms the start of the [prefix cache](/ai-coding-dictionary/prefix-cache) — which is part of why harnesses keep it fixed for a whole session rather than editing it as they go.

Models are trained to prioritise the system prompt over user messages. So when an agent insists on a convention you never asked for, or formats output in a way you can't shake, it's usually obeying its system prompt — and your message is losing the argument. Some harnesses are customisable: they give you full access to the system prompt, so you can read what the agent is actually being told and change it.

_Usage:_

"Two harnesses, same model, totally different behavior on the same prompt."

"Different system prompts. One's tuned for terse code edits, the other for explaining — that's where the divergence lives, before your message even arrives."
