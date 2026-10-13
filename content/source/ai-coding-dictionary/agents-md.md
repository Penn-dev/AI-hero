---
title: "AGENTS.md"
slug: "agents-md"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Memory and Steering

# AGENTS.md

A file in the environment that the harness loads into the context window at session start — the project's standing brief to the agent.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

A file in the [environment](/ai-coding-dictionary/environment) that the [harness](/ai-coding-dictionary/harness) loads into the [context window](/ai-coding-dictionary/context-window) at [session](/ai-coding-dictionary/session) start — the project's standing brief to the [agent](/ai-coding-dictionary/agent). Cross-harness convention; some harnesses also have their own variant (Claude Code's is CLAUDE.md).

Because it loads automatically, it's one way to avoid repeating yourself across sessions. The [model](/ai-coding-dictionary/model) is [stateless](/ai-coding-dictionary/stateless) — a correction you give in one session is gone in the next, and you end up telling every fresh session that the project uses pnpm, that tests run with a particular flag, that a directory is generated and shouldn't be touched. When you've corrected the agent for the same thing twice, that correction is a candidate line for AGENTS.md.

Suitable content is whatever the agent can't derive from the code: build and test commands, conventions the codebase doesn't make obvious, hard constraints ("never edit the generated client"). Short and declarative — it's a brief, not documentation.

The trade-off is that everything in it is always loaded. Instructions accumulate, most of them irrelevant to any given task, and a long AGENTS.md both costs tokens and dilutes itself — the more instructions in context, the less reliably the model follows any one of them.

_Avoid:_ using AGENTS.md for content that should be [progressively disclosed](/ai-coding-dictionary/progressive-disclosure) — anything in it pays a [token](/ai-coding-dictionary/token) cost every [turn](/ai-coding-dictionary/turn), in every session, whether or not that session needs it. A style guide can go behind a [skill](/ai-coding-dictionary/skill) or a [context pointer](/ai-coding-dictionary/context-pointer) instead; keep AGENTS.md for the lines that apply everywhere.

_Usage:_

"Why is every session starting with 4k tokens already burned?"

"Check AGENTS.md — someone pasted the entire style guide in there instead of putting it behind a skill."

[Previous term**Memory system**](/ai-coding-dictionary/memory-system)[Next term**Progressive disclosure**](/ai-coding-dictionary/progressive-disclosure)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fagents-mdAGENTS.md%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=AGENTS.md%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fagents-md)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/agents-md?author=Matt Pocock)

Copy URL
