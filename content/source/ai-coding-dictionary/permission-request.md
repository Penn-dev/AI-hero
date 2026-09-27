---
title: "Permission request"
slug: "permission-request"
type: "dictionary"
description: "What the harness shows the user before executing a tool call that isn't pre-approved. The mechanism for putting a human in the loop."
updatedAt: "2026-07-01T08:46:18.000Z"
---
What the [harness](/ai-coding-dictionary/harness) shows the user before executing a [tool call](/ai-coding-dictionary/tool-call) that isn't pre-approved. The [model](/ai-coding-dictionary/model) produces a tool call; instead of running it immediately, the harness pauses and asks. Approve and it runs; deny and the harness reports the denial back to the model as a [tool result](/ai-coding-dictionary/tool-result). The mechanism by which a harness puts a human in the [loop](/ai-coding-dictionary/human-in-the-loop) for risky or sensitive actions.

The lifecycle of a permission request:

| Step | Who | What happens |
| --- | --- | --- |
| 1 | Model | Produces a tool call |
| 2 | Harness | Checks it against the [permission mode](/ai-coding-dictionary/permission-mode) and any saved approvals |
| 3 | Harness | Pre-approved: executes immediately. Otherwise: pauses and shows the request |
| 4 | User | Approves once, approves for the rest of the [session](/ai-coding-dictionary/session), or denies |
| 5 | Harness | Executes the call, or sends the denial back as a tool result |

Denying a request steers the agent. The model reads the denial like any other tool result and reacts to it — it tries a different approach, or asks what you'd prefer. Most harnesses let you attach a message to the denial, which turns the request into a steering point: "not like that, use the migration script instead" lands exactly when the model is deciding what to do next.

The cost is that every request is a synchronous wait on you. The [agent](/ai-coding-dictionary/agent) sits blocked until you answer, which is fine while you're watching and a problem when you're not — an agent that triggers requests constantly can't be left to work [AFK](/ai-coding-dictionary/afk). The permission mode is the dial: which calls run freely, which ask first, ideally with a [sandbox](/ai-coding-dictionary/sandbox) making it safe to widen the free set.

_Usage:_

"It's been blocked on a permission request for ten minutes — I was in a meeting."

"That's the cost of human-in-the-loop. Pre-approve the safe [tools](/ai-coding-dictionary/tool) so the request only fires on the actually-risky calls."
