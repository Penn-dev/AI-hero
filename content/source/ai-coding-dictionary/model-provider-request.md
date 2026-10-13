---
title: "Model provider request"
slug: "model-provider-request"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

The Model

# Model provider request

One round-trip from the harness to the model provider. The harness sends context; the provider returns one response.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

One round-trip from the [harness](/ai-coding-dictionary/harness) to the [model provider](/ai-coding-dictionary/model-provider). The harness sends the current [context](/ai-coding-dictionary/context); the provider returns one response (a [tool call](/ai-coding-dictionary/tool-call) or a final answer). A single user message can spawn many model provider requests if the [agent](/ai-coding-dictionary/agent) calls [tools](/ai-coding-dictionary/tool) — each [tool result](/ai-coding-dictionary/tool-result) triggers another request.

Each request carries everything: the [system prompt](/ai-coding-dictionary/system-prompt), the full conversation so far, every tool result. The [model](/ai-coding-dictionary/model) is [stateless](/ai-coding-dictionary/stateless), so the provider keeps nothing between requests — request forty re-sends what request thirty-nine sent, plus one more tool result. The [prefix cache](/ai-coding-dictionary/prefix-cache) exists to make this repetition affordable.

The request is also the unit of billing. [Input tokens](/ai-coding-dictionary/input-tokens), [output tokens](/ai-coding-dictionary/output-tokens), and cache discounts are all counted per request, which is why an innocuous-looking question can cost a surprising amount: the cost isn't proportional to your message, it's proportional to the number of requests times the size of the context each one carries.

It's worth keeping the request distinct from the [turn](/ai-coding-dictionary/turn). A turn is one exchange with you, and a single turn — "fix the failing test" — plays out as a chain of requests:

| Request | Model returns | Harness then |
| --- | --- | --- |
| 1 | Tool call: run the tests | Runs them, appends the failure output |
| 2 | Tool call: read the test file | Appends the file contents |
| 3 | Tool call: read the source file | Appends the file contents |
| 4 | Tool call: edit the source file | Applies the edit, appends the result |
| 5 | Tool call: run the tests again | Runs them, appends the pass output |
| 6 | Final answer: "fixed, tests pass" | Shows it to you |

View Table

Six requests for one turn — each one re-sending the whole context. When you wonder where the [tokens](/ai-coding-dictionary/token) went, count the requests, not the turns.

_Usage:_

"One question burned forty thousand tokens?"

"Look at the tool calls — twelve grep, eight read, four edits. Each tool result spawns another model provider request, and the whole [session](/ai-coding-dictionary/session) prefix re-sends every time."

[Previous term**Harness**](/ai-coding-dictionary/harness)[Next term**Input tokens**](/ai-coding-dictionary/input-tokens)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmodel-provider-requestModel%20provider%20request%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Model%20provider%20request%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmodel-provider-request)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/model-provider-request?author=Matt Pocock)

Copy URL
