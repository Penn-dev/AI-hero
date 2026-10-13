---
title: "Dark factory"
slug: "dark-factory"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Patterns of Work

# Dark factory

A codebase, or part of one, where a software factory writes the code and no human ever reviews it.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

A codebase, or part of one, where a [software factory](/ai-coding-dictionary/software-factory) writes the code and no human reads it. There is no [human review](/ai-coding-dictionary/human-review). Humans can still write the issues that start the work. But nobody reads the code that comes out. The name comes from "lights-out" factories, which make things with no people on the floor.

A dark factory is [vibe coding](/ai-coding-dictionary/vibe-coding) for an area of code, not for one change. When you vibe code, you choose not to read a change that you asked for. But you know that the change exists. In a dark factory, the team makes that choice one time, for the full area. After that, no person asks for each change or sees it. Changes arrive as fast as the triggers start new work.

The problem shows when something breaks. You do not know what changed, because nobody read the changes. You must debug code that nobody on the team has read. The cause can be in any of many changes, and each one passed the checks.

[Automated checks](/ai-coding-dictionary/automated-check) and [automated review](/ai-coding-dictionary/automated-review) are the only gates. If they do not find a problem, the problem goes into the code.

_Avoid:_ calling a codebase "dark" only because its factory runs with nobody watching. If [agent](/ai-coding-dictionary/agent) [sessions](/ai-coding-dictionary/session) run [AFK](/ai-coding-dictionary/afk) and a human reviews their PRs, that is a software factory. It is not a dark factory.

_Usage:_

"Who changed the retry logic in the billing service? Nobody on the team remembers it."

"The billing service is a dark factory. The agents merge all changes that pass CI. Nobody read that change."

[Previous term**Software factory**](/ai-coding-dictionary/software-factory)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fdark-factoryDark%20factory%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Dark%20factory%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fdark-factory)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/dark-factory?author=Matt Pocock>)

Copy URL
