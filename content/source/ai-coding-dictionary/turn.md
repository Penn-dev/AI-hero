---
title: "Turn"
slug: "turn"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Sessions, Context Windows & Turns

# Turn

One user message plus everything the agent does in response, up until it yields back to the user. Contains one or more provider requests.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

One user message plus everything the [agent](/ai-coding-dictionary/agent) does in response, up until it yields back to the user. Contains one or more [model provider requests](/ai-coding-dictionary/model-provider-request) — many, if the agent calls [tools](/ai-coding-dictionary/tool). A clarifying question closes the turn; your reply opens the next one. The hierarchy is [session](/ai-coding-dictionary/session) **> Turn > Model provider request**.

What makes the turn worth naming is that its length is the agent's decision, not yours. You hand over one message; the agent decides how many tool calls to chain before yielding. A turn can be a one-sentence answer or twenty minutes of reading, editing, and running tests. That's the same property from two angles: long turns are what make [AFK](/ai-coding-dictionary/afk) work possible, and long turns are also where things go wrong unsupervised — by the time the agent yields, it may have drifted a long way from what you meant.

The turn is also the natural unit for steering. Everything inside a turn happens without you; the gaps between turns are where you redirect. Most [harnesses](/ai-coding-dictionary/harness) soften this: you can interrupt mid-turn to stop the agent and redirect it, or type a message while it works, which gets read once the turn completes. If you find yourself repeatedly unhappy with where turns end up, the fix is usually to ask for smaller ones — a plan first, one step at a time — trading autonomy for more frequent gaps to steer in.

_Usage:_

"One turn took two minutes?"

"It made fourteen [tool calls](/ai-coding-dictionary/tool-call) inside that turn — each one is a separate model provider request. Latency stacks up before the agent finally yields back to you."

[Previous term**Session**](/ai-coding-dictionary/session)[Next term**Environment**](/ai-coding-dictionary/environment)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FturnTurn%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Turn%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fturn)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/turn?author=Matt Pocock)

Copy URL
