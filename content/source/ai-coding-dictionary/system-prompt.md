---
title: "System prompt"
slug: "system-prompt"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Sessions, Context Windows & Turns

# System prompt

The instructions the harness prepends to every model provider request — the agent's standing brief. Usually stable across a session.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

The instructions the [harness](/ai-coding-dictionary/harness) prepends to every [model provider request](/ai-coding-dictionary/model-provider-request) — the [agent](/ai-coding-dictionary/agent)'s standing brief: who it is, how to behave, which [tools](/ai-coding-dictionary/tool) it can call, what conventions to follow. Usually stable across a [session](/ai-coding-dictionary/session).

The system prompt is written by the harness vendor, not by you, and in coding harnesses it's big — often tens of thousands of [tokens](/ai-coding-dictionary/token) of behavioural rules, tool descriptions, and edge-case handling, all paid as [input tokens](/ai-coding-dictionary/input-tokens) on every [turn](/ai-coding-dictionary/turn). Your own standing instructions ride along with it: files like [AGENTS.md](/ai-coding-dictionary/agents-md) are loaded next to the system prompt at the start of the session, so the [model](/ai-coding-dictionary/model) reads the vendor's brief and yours together before it ever sees your message.

Because it's identical on every request, it forms the start of the [prefix cache](/ai-coding-dictionary/prefix-cache) — which is part of why harnesses keep it fixed for a whole session rather than editing it as they go.

Models are trained to prioritise the system prompt over user messages. So when an agent insists on a convention you never asked for, or formats output in a way you can't shake, it's usually obeying its system prompt — and your message is losing the argument. Some harnesses are customisable: they give you full access to the system prompt, so you can read what the agent is actually being told and change it.

_Usage:_

"Two harnesses, same model, totally different behavior on the same prompt."

"Different system prompts. One's tuned for terse code edits, the other for explaining — that's where the divergence lives, before your message even arrives."

[Previous term**Agent**](/ai-coding-dictionary/agent)[Next term**Session**](/ai-coding-dictionary/session)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsystem-promptSystem%20prompt%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=System%20prompt%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsystem-prompt)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/system-prompt?author=Matt Pocock>)

Copy URL
