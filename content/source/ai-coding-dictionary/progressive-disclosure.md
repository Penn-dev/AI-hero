---
title: "Progressive disclosure"
slug: "progressive-disclosure"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Memory and Steering

# Progressive disclosure

Loading only the context an agent needs right now, with context pointers to the rest. Borrowed from UI design.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Loading only the [context](/ai-coding-dictionary/context) an [agent](/ai-coding-dictionary/agent) needs right now, with [context pointers](/ai-coding-dictionary/context-pointer) to the rest. Borrowed from UI design, where it means showing users only the controls relevant to their current task and hiding the rest behind a click.

The technique exists because context is a cost twice over. Every [token](/ai-coding-dictionary/token) loaded up front is billed as [input tokens](/ai-coding-dictionary/input-tokens) on every [turn](/ai-coding-dictionary/turn), and every token spends [attention budget](/ai-coding-dictionary/attention-budget) whether the agent needs it or not. An [AGENTS.md](/ai-coding-dictionary/agents-md) stuffed with the full style guide, deployment runbook, and database conventions makes the agent worse at all of them — the instructions that matter for the current task are diluted by the ones that don't. The tell is an agent that ignores rules you know are in its context: they're in there, but buried.

Progressive disclosure inverts this. Keep the always-loaded layer small — a sentence per topic and a pointer to where the detail lives. The agent reads the style guide when it's writing a component, the deployment runbook when it's deploying, and neither when it's fixing a test. [Skills](/ai-coding-dictionary/skill) are the pattern built into the [harness](/ai-coding-dictionary/harness): a short description loaded every [session](/ai-coding-dictionary/session), the full instructions only when triggered.

_Usage:_

"Should I dump the entire style guide into AGENTS.md?"

"No — progressive disclosure. Reference the style guide as a skill the agent loads when it actually needs to write a component. AGENTS.md pays the token cost every turn."

[Previous term**AGENTS.md**](/ai-coding-dictionary/agents-md)[Next term**Context pointer**](/ai-coding-dictionary/context-pointer)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fprogressive-disclosureProgressive%20disclosure%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Progressive%20disclosure%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fprogressive-disclosure)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/progressive-disclosure?author=Matt Pocock>)

Copy URL
