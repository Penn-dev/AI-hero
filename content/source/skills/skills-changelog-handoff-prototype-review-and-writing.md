---
title: "Skills Changelog: /handoff, /prototype, /review and /writing"
slug: "skills-changelog-handoff-prototype-review-and-writing"
type: "page"
updatedAt: "2026-05-11T10:38:47.822Z"
---

[AI Skills Changelog](/skills)

# Skills Changelog: /handoff, /prototype, /review and /writing

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Share

I've added two brand new skills to my [skills repo](https://github.com/mattpocock/skills): `/handoff` and `/prototype`. Both have been great upgrades to how I work with agents, especially during planning.

The repo has been growing like crazy - the response has been incredible.

![GitHub stars chart showing rapid growth](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_3840/f_auto/q_auto/v1778496092/ai-hero-images/lawlzqfblajwx3p0ugu7?_a=BAVMn6DY0)

I've also fixed some bugs in `/grill-with-docs`, `/to-prd`, and `/to-issues`. And I'm sharing a sneak peek at some in-progress skills for writing and code review.

## [`/handoff`](#handoff)

The new [`/handoff`](https://github.com/mattpocock/skills) skill compacts your current conversation into a handoff document for another agent to pick up. It creates a temporary file that summarizes the context, captures the vibe and intent of the session, and suggests which skills the next agent should use.

This solves a common problem: you're deep into a grilling session at 60K tokens, and you need to prototype something or fix a bug. Instead of cramming that work into your remaining context window, you can hand off to a fresh agent with full context. You can even hand back to the original session afterward with what you learned.

There are two main patterns: **fire and forget** (spin up an agent to fix a bug mid-session) and **DIY sub-agent** (hand off during planning, do some work, then hand back). The skill lives in the productivity section because it's useful beyond just engineering work.

## [`/prototype`](#prototype)

The new [`/prototype`](https://github.com/mattpocock/skills) skill builds throwaway prototypes to flush out design decisions before committing to them. It's critical for AI engineering because you need to use prototypes as research and spikes to answer unknown unknowns that you can only figure out by looking at code.

While UI prototypes are the obvious use case, the skill also handles business logic prototypes. When you have complex state machines or entities that change over time, you can build a tiny interactive terminal app that pushes the state through edge cases that are hard to reason about on paper.

For UI work, it generates several radically different variations with a floating button to toggle between them. You can walk down the design tree, combining elements from different variations and discarding others. This is essential for making AFK agents good at front-end - you need a human in the loop to apply taste, because AI often can't see what it's building.

## [Bug Fixes](#bug-fixes)

The [`/grill-with-docs`](https://github.com/mattpocock/skills) skill was sometimes too eager to implement instead of asking questions. The fix was wrapping the supporting information in XML tags to reduce its "loudness" compared to the core instructions. This signals to the LLM that the content inside `<supporting-info>` should be slightly less prioritized.

Both [`/to-prd`](https://github.com/mattpocock/skills) and [`/to-issues`](https://github.com/mattpocock/skills) now apply the `ready-for-agent-triage` label instead of `needs-triage`. Once you've created issues with these skills, they're ready for agents - no additional triage needed.

## [In-Progress Preview](#in-progress-preview)

There's a tri-part writing skill in development: **fragments**, **beats**, and **shape**. The theory is based on how authors keep journals of ideas that eventually work their way into stories. You dictate fragments (ideas), then write beats (a path through the story), then do a final shaping pass to make sure it doesn't sound AI-generated.

There's also a **review** skill coming that will kick off two parallel sub-agents: one checking if the diff follows the repo's coding standards, and another checking if it faithfully implements the original issue or PRD. A separate skill will extract coding standards from your repo to make the standards check more effective.

AI Hero · Free email course

### AI Skills for Real Engineers

Build a repeatable workflow for coding agents without giving up your engineering standards.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-handoff-prototype-review-and-writingSkills%20Changelog%3A%20%2Fhandoff%2C%20%2Fprototype%2C%20%2Freview%20and%20%2Fwriting%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Skills%20Changelog%3A%20%2Fhandoff%2C%20%2Fprototype%2C%20%2Freview%20and%20%2Fwriting%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-handoff-prototype-review-and-writing)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing?author=Matt Pocock>)

Copy URL
