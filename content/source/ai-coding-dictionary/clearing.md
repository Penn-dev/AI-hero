---
title: "Clearing"
slug: "clearing"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Handoffs

# Clearing

Ending the current session and starting a fresh one. The next message begins with an empty session and an empty context window.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Ending the current [session](/ai-coding-dictionary/session) and starting a fresh one. The next message begins with an empty session and an empty [context window](/ai-coding-dictionary/context-window). Usually user-driven.

Clearing is the cure for a polluted context. A session accumulates everything: failed attempts, wrong turns, stale [tool results](/ai-coding-dictionary/tool-result), abandoned plans. The [model](/ai-coding-dictionary/model) re-reads all of it on every [turn](/ai-coding-dictionary/turn), and bad history drags on new work. Deep into a long session the [agent](/ai-coding-dictionary/agent) gets vaguer and less obedient — instructions you gave clearly get ignored, quality slips, and prodding it to do better doesn't help, because the noise it's wading through is still in its [context](/ai-coding-dictionary/context). Clearing removes the noise.

Clearing doesn't erase the conversation. Most [harnesses](/ai-coding-dictionary/harness) keep session history on your computer, so the transcript is still there to read or resume. What's gone is the agent's working state: the model is [stateless](/ai-coding-dictionary/stateless), so the new session knows nothing the old one knew. If the session holds decisions or progress the next one will need, have the agent write a [handoff artifact](/ai-coding-dictionary/handoff-artifact) first, then start the new session by pointing at it.

Compare [compaction](/ai-coding-dictionary/compaction), which summarises the session into the new context instead of starting empty. Clearing is the blunter tool: nothing carries over, including the junk.

_Usage:_

"It's stuck looping on the failing test."

"Just clear it — start a fresh session with the plan doc and the test file. No point fighting the existing context."

[Previous term**Smart zone**](/ai-coding-dictionary/smart-zone)[Next term**Handoff**](/ai-coding-dictionary/handoff)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FclearingClearing%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Clearing%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fclearing)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/clearing?author=Matt Pocock)

Copy URL
