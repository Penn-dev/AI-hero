---
title: "AX"
slug: "ax"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Patterns of Work

# AX

Agent experience: how well the environment is set up for an agent to do good work — checks, architecture, and free context.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Agent experience — how well the [environment](/ai-coding-dictionary/environment) is set up for an [agent](/ai-coding-dictionary/agent) to do good work in a codebase. The agent-facing counterpart to [DX](/ai-coding-dictionary/dx). When the same agent performs well in one repo and badly in another — same [model](/ai-coding-dictionary/model), same [harness](/ai-coding-dictionary/harness) — the difference is usually AX. The instinct is to blame the model or rewrite the prompt; the fix is more often in the repo.

Good AX has three main dimensions:

| Dimension | What good AX looks like |
| --- | --- |
| Automated checks | Fast, deterministic [automated checks](/ai-coding-dictionary/automated-check) — types, tests, lints — that the agent can self-correct from without a human |
| Architecture | A codebase the agent can navigate without reading everything: predictable structure, a lot of behaviour behind small interfaces, names that say what things do |
| Free context | [AGENTS.md](/ai-coding-dictionary/agents-md), [skills](/ai-coding-dictionary/skill), and [tools](/ai-coding-dictionary/tool) kept lean, so most of the [context window](/ai-coding-dictionary/context-window) is available for the task and the agent stays in the [smart zone](/ai-coding-dictionary/smart-zone) instead of drowning |

View Table

AX and DX overlap — good checks and clean architecture help both audiences — but they diverge. Humans tolerate tribal knowledge, slow CI, and "ask Sarah about the billing module"; agents can't. Agents don't benefit from IDE tooltips or pretty dashboards; they need failures as text in a [tool result](/ai-coding-dictionary/tool-result). A codebase can have good DX and poor AX.

_Avoid:_ treating AX as a synonym for DX — the audiences need different investments.

_Usage:_

"The agent writes great code in the API repo and garbage in the frontend."

"The API repo has strict types and a fast test suite; the frontend has neither and forty always-loaded skills. That's an AX gap, not a model problem."

[Previous term**DX**](/ai-coding-dictionary/dx)[Next term**Software factory**](/ai-coding-dictionary/software-factory)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FaxAX%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=AX%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fax)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/ax?author=Matt Pocock)

Copy URL
