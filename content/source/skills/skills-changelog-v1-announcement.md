---
title: "v1: 63% Token Reduction, /ask-matt, /writing-great-skills"
slug: "skills-changelog-v1-announcement"
type: "page"
updatedAt: "2026-06-18T11:43:30.135Z"
---

[AI Skills Changelog](/skills)

# v1: 63% Token Reduction, /ask-matt, /writing-great-skills

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Share

The [skills directory](https://github.com/mattpocock/skills) has reached a major milestone with v1. Over 4.2 million downloads and 135,000 GitHub stars later, this release represents crucial changes that radically reduce token consumption, reorganize skills by invocation type, and unlock powerful new abilities.

## [Getting Started with the Latest Skills](#getting-started-with-the-latest-skills)

Installing or updating to the new skills is straightforward. Use the following command:

```shellscript
npx skills add mattpocock/skills
```

![Terminal showing the interactive skill selection dialogue with Matt Pocock Skills and other categories](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_3840/f_auto/q_auto/v1781782533/ai-hero-images/kqe2yzwxhsx1gtkcqki6?_a=BAVMn6DY0)

Whether you're new to these skills or upgrading from an earlier version, now is the perfect time to take advantage of the improvements.

## [The Changes](#the-changes)

### [`disable-model-invocation`: A 63% Token Reduction](#disable-model-invocation-a-63-token-reduction)

The biggest structural change in v1 is the widespread use of `disable-model-invocation: true` across skills. When you set this flag on a skill, its description no longer gets included in the context window that the model reviews when deciding which skill to invoke.

This simple change achieves a **63% reduction in token cost** for skill descriptions - a massive improvement for anyone working with context-limited models.

#### How This Reorganizes Your Skills

Previously, skills like `/grill-with-docs` contained shared code that duplicated information across multiple places. Now that code has been extracted:

The `/grilling` skill contains the core interview loop that was previously embedded in other skills:

```txt
Interview me relentlessly about every aspect of this plan
until we reach a shared understanding.
```

Since the `/grilling` skill is **not** disabled from the model, it remains invokable by the agent itself. This means you can share it freely across other skills without bloating their descriptions.

`/grill-with-docs` now has much simpler frontmatter and content:

```markdown
---
name: grill-with-docs
description: A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.
disable-model-invocation: true
---

Run a `/grilling` session, using the `/domain-modeling` skill.
```

The same principle applies to other refactored skills:

- **`/domain-modeling`** - moved into its own skill, decoupled from `/grill-with-docs`
- **`/codebase-design`** - extracted into a standalone skill with deep-module vocabulary
- **`/diagnosing-bugs`** (formerly `/diagnose`) - now references design principles without duplicating them

### [User-Invoked vs Model-Invoked Skills](#user-invoked-vs-model-invoked-skills)

v1 introduces a clearer taxonomy: **user-invoked** and **model-invoked** skills.

| Type | Purpose | When You Use It |
| --- | --- | --- |
| **User-invoked** | Orchestrate workflows; only run when you explicitly type them | You explicitly request them |
| **Model-invoked** | Focused tasks the model can reach for automatically | Model chooses to use them |

View Table

This split means the model can occasionally reach for specific skills when needed - diagnosing difficult bugs, applying test-driven development, or modeling domain concepts - without cluttering the interface with unnecessary options.

Looking at the engineering readme, there are only a handful of model-invoked skills:

- `/diagnosing-bugs` - for complex debugging scenarios
- `/tdd` - when test-driven development makes sense
- `/domain-modeling` - for domain-model work
- `/codebase-design` - for architectural guidance
- `/grilling` - the reusable interview loop

User-invoked skills remain the primary way you orchestrate work.

## [New Skills and Major Rewrites](#new-skills-and-major-rewrites)

### [Writing Great Skills: A Deep Dive](#writing-great-skills-a-deep-dive)

One of the marquee new skills is `/writing-great-skills`. Matt spent six to seven hours crafting this skill, including an extensive `GLOSSARY.md` with entries for every piece of terminology.

The glossary covers concepts like:

- **No-op** - no-operation sections that should be removed
- **Sprawl** - unnecessary expansion or duplication
- **Sediment** - accumulated cruft that's settled in the skill
- **Premature completion** - finishing too early before full understanding
- **Leading words** - compact concepts already in the model's pre-training

When you invoke `/writing-great-skills`, it hunts for opportunities to refactor skills and use leading words - terminology that's efficient and already familiar to language models.

This skill alone contains enough useful patterns that a dedicated video will soon explore its full depth.

### [/ask-matt: A Router Skill for Navigation](#ask-matt-a-router-skill-for-navigation)

As the number of user-invoked skills grows, keeping track of them all creates cognitive load. The new `/ask-matt` skill solves this by acting as a router - a single entry point that names all other skills and explains when to use each one.

`/ask-matt` documents:

- How to use all other skills in the directory
- The main workflow and how to orchestrate it
- Handoff patterns and prototyping during handoffs
- How to determine if you need a PRD for multi-session builds
- Context hygiene practices
- Different on-ramps for starting work
- Codebase health improvements via `/improve-codebase-architecture`

Instead of asking in Discord or hunting through documentation, the skill itself teaches you how to use your entire skill set. This is the comprehensive guide you've been asking for.

### [New and Renamed Skills](#new-and-renamed-skills)

The v1 release includes several other changes:

- **`/writing-great-skills`** - replaces `/write-a-skill` with a much deeper reference
- **`/diagnosing-bugs`** - formerly `/diagnose`, now with a clearer name
- **`/resolving-merge-conflicts`** - a new standalone skill for git merge and rebase conflicts
- **`/codebase-design`** - new shared skill with deep-module vocabulary
- **`/domain-modeling`** - new shared skill for building project domain models
- **Removed** - `/caveman` and `/zoom-out` skills have been deprecated

## [Why I Made These Changes](#why-i-made-these-changes)

These improvements reflect a core principle: **the user stays in control, not the agent**. The model is a tool you orchestrate, not the other way around.

Yes, this means you carry more cognitive load when navigating which skill to use. But that's why `/ask-matt` exists - to guide you without friction.

By dramatically reducing token consumption and splitting user-invoked from model-invoked skills, you unlock better capabilities: designing better codebases, fixing harder bugs, and writing better skills - all without wasting context on unnecessary descriptions.

AI Hero · Free email course

### AI Skills for Real Engineers

Build a repeatable workflow for coding agents without giving up your engineering standards.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-v1-announcementv1%3A%2063%25%20Token%20Reduction%2C%20%2Fask-matt%2C%20%2Fwriting-great-skills%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=v1%3A%2063%25%20Token%20Reduction%2C%20%2Fask-matt%2C%20%2Fwriting-great-skills%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fskills%2Fskills-changelog-v1-announcement)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/skills/skills-changelog-v1-announcement?author=Matt Pocock>)

Copy URL
