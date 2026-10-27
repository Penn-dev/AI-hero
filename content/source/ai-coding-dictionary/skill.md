---
title: "Skill"
slug: "skill"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Memory and Steering

# Skill

A teachable capability bundled as a unit — kept out of the context window until a context pointer pulls it in for the task at hand.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

A teachable capability bundled as a unit — instructions and resources for doing one task well, kept in the [environment](/ai-coding-dictionary/environment) until a [context pointer](/ai-coding-dictionary/context-pointer) pulls it into the [context window](/ai-coding-dictionary/context-window) for the task at hand. The unit of [progressive disclosure](/ai-coding-dictionary/progressive-disclosure) in a [harness](/ai-coding-dictionary/harness).

Skills are an open standard, defined at [agentskills.io](https://agentskills.io) — originally developed by Anthropic and since adopted by most major harnesses, so a skill written once works across them. The format is a folder containing:

- A `SKILL.md` file — metadata (a name and description, at minimum) plus the instructions themselves
- Optionally, scripts the [agent](/ai-coding-dictionary/agent) can run
- Optionally, templates and reference material the instructions point to

Only the name and description sit in [context](/ai-coding-dictionary/context) by default. When the agent's task matches, it loads the rest. Until then, the skill takes up almost no room — a sentence or two of [tokens](/ai-coding-dictionary/token), however large its full instructions are.

This distinguishes skills from [AGENTS.md](/ai-coding-dictionary/agents-md), which is loaded into every [session](/ai-coding-dictionary/session) regardless of the task. A skill is read when a particular kind of work comes up — releasing, scaffolding a new service, writing a migration — and ignored the rest of the time.

_Avoid:_ "[tool](/ai-coding-dictionary/tool)" — a tool is what the agent _calls_; a skill is instructions it _reads_.

_Usage:_

"Where should I put the deploy runbook?"

"As a skill — the agent loads it only when the task involves deploys. In AGENTS.md it'd burn tokens on every [turn](/ai-coding-dictionary/turn) for something we use weekly."

[Previous term**Context pointer**](/ai-coding-dictionary/context-pointer)[Next term**Subagent**](/ai-coding-dictionary/subagent)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FskillSkill%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Skill%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fskill)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/skill?author=Matt Pocock>)

Copy URL
