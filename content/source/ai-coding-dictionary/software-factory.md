---
title: "Software factory"
slug: "software-factory"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Patterns of Work

# Software factory

A system of work where triggers, not humans, start agent sessions, so more work runs AFK and HITL time is saved for what needs it.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

A system of work where [agent](/ai-coding-dictionary/agent) [sessions](/ai-coding-dictionary/session) are started by triggers — an issue being created, a schedule, a CI failure, another session finishing — rather than by a human, so more work runs [AFK](/ai-coding-dictionary/afk) and human attention is spent on the [human-in-the-loop](/ai-coding-dictionary/human-in-the-loop) decisions that remain.

Without a factory, every session starts because someone started it. Even fully AFK work waits on a person to open the session, point it at the [ticket](/ai-coding-dictionary/ticket), and set it going. Teams want to ship more than that allows. A factory takes the human out of starting sessions, and not necessarily out of anything else.

Common triggers and the sessions they start:

| Trigger | Session it starts | Example |
| --- | --- | --- |
| Issue created or labelled | Exploration, bug fix, implementation | An issue labelled `ready-for-agent` gets a session that opens a PR |
| Schedule (cron) | Recurring maintenance | One lint rule fixed per night |
| CI failure or monitoring alert | Diagnosis, fix attempt | A failing build on main gets a session that finds the breaking commit and proposes a fix |
| Another session finishing | Follow-on work | A PR opened by one agent triggers an [automated review](/ai-coding-dictionary/automated-review), whose comments trigger a fix-up session |

View Table

A factory doesn't have to cover the whole software process. One cron job that runs one kind of session and opens one reviewable PR is a factory. Starting that small is useful: a narrow loop produces small, similar PRs, and reviewing them shows how far the loop can be trusted before it's widened.

Humans can sit anywhere in a factory — writing and labelling the issues that trigger sessions, approving a plan before implementation starts, doing [human review](/ai-coding-dictionary/human-review) before merge. Deciding which of those decisions stay human is the main design question. A codebase, or part of one, where no human reviews the factory's output is a [dark factory](/ai-coding-dictionary/dark-factory).

_Usage:_

"Who fixed all the `no-floating-promises` violations?"

"The factory. Cron job picks one lint rule a night, opens a PR. I just review it in the morning."

[Previous term**AX**](/ai-coding-dictionary/ax)[Next term**Dark factory**](/ai-coding-dictionary/dark-factory)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsoftware-factorySoftware%20factory%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Software%20factory%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsoftware-factory)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/software-factory?author=Matt Pocock)

Copy URL
