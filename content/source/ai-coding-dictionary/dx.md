---
title: "DX"
slug: "dx"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Patterns of Work

# DX

Developer experience: how easy a codebase and its toolchain make it for humans to do good work — docs, feedback speed, errors.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Developer experience — how easy a codebase and its toolchain make it for humans to do good work. Good DX is fast feedback, clear error messages, documentation that answers the question you actually have, and setup that works on the first try. The term long predates AI coding; it's in this dictionary mainly as the contrast for [AX](/ai-coding-dictionary/ax).

DX is the interaction between the human and the codebase — nothing more. The main difference between the two audiences is that humans are [stateful](/ai-coding-dictionary/stateful) and agents are [stateless](/ai-coding-dictionary/stateless). A human learns the codebase once and carries that knowledge into every day after, which is why poor DX is survivable: they route around slow CI by batching their pushes, around missing docs by asking in Slack once, around confusing structure by remembering where things live. The workarounds accumulate, and a team ends up productive in a codebase that fights them.

[Agents](/ai-coding-dictionary/agent) face the same codebase with none of that accumulation. Stateless across [sessions](/ai-coding-dictionary/session), an agent re-learns the codebase from scratch every time — it benefits from the fast test suite and the clear error messages, but anything it figured out yesterday is gone unless it was written into the [environment](/ai-coding-dictionary/environment), which the agent only perceives through [tool results](/ai-coding-dictionary/tool-result). That's the gap AX names: the parts of DX that survive when the developer is an agent, plus concerns humans don't have, like keeping the [context window](/ai-coding-dictionary/context-window) free.

The overlap means DX investment often improves AX for free — strict types, fast tests, and predictable structure help both. The divergence means it doesn't always: a beautiful onboarding doc helps a human for a week and an agent not at all unless it's reachable from [AGENTS.md](/ai-coding-dictionary/agents-md).

_Usage:_

"Our DX is fine — new hires are productive in a week."

"Productive because someone sits with them for that week. The agent doesn't get that week; check the AX separately."

[Previous term**Prototyping**](/ai-coding-dictionary/prototyping)[Next term**AX**](/ai-coding-dictionary/ax)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FdxDX%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=DX%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fdx)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/dx?author=Matt Pocock>)

Copy URL
