---
title: "Permission request"
slug: "permission-request"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Tools & Environment

# Permission request

What the harness shows the user before executing a tool call that isn't pre-approved. The mechanism for putting a human in the loop.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

What the [harness](/ai-coding-dictionary/harness) shows the user before executing a [tool call](/ai-coding-dictionary/tool-call) that isn't pre-approved. The [model](/ai-coding-dictionary/model) produces a tool call; instead of running it immediately, the harness pauses and asks. Approve and it runs; deny and the harness reports the denial back to the model as a [tool result](/ai-coding-dictionary/tool-result). The mechanism by which a harness puts a human in the [loop](/ai-coding-dictionary/human-in-the-loop) for risky or sensitive actions.

The lifecycle of a permission request:

| Step | Who | What happens |
| --- | --- | --- |
| 1 | Model | Produces a tool call |
| 2 | Harness | Checks it against the [permission mode](/ai-coding-dictionary/permission-mode) and any saved approvals |
| 3 | Harness | Pre-approved: executes immediately. Otherwise: pauses and shows the request |
| 4 | User | Approves once, approves for the rest of the [session](/ai-coding-dictionary/session), or denies |
| 5 | Harness | Executes the call, or sends the denial back as a tool result |

View Table

Denying a request steers the agent. The model reads the denial like any other tool result and reacts to it — it tries a different approach, or asks what you'd prefer. Most harnesses let you attach a message to the denial, which turns the request into a steering point: "not like that, use the migration script instead" lands exactly when the model is deciding what to do next.

The cost is that every request is a synchronous wait on you. The [agent](/ai-coding-dictionary/agent) sits blocked until you answer, which is fine while you're watching and a problem when you're not — an agent that triggers requests constantly can't be left to work [AFK](/ai-coding-dictionary/afk). The permission mode is the dial: which calls run freely, which ask first, ideally with a [sandbox](/ai-coding-dictionary/sandbox) making it safe to widen the free set.

_Usage:_

"It's been blocked on a permission request for ten minutes — I was in a meeting."

"That's the cost of human-in-the-loop. Pre-approve the safe [tools](/ai-coding-dictionary/tool) so the request only fires on the actually-risky calls."

[Previous term**MCP**](/ai-coding-dictionary/mcp)[Next term**Permission mode**](/ai-coding-dictionary/permission-mode)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fpermission-requestPermission%20request%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Permission%20request%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fpermission-request)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/permission-request?author=Matt Pocock>)

Copy URL
