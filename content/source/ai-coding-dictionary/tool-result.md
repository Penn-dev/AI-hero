---
title: "Tool result"
slug: "tool-result"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Tools & Environment

# Tool result

What the harness sends back after executing a tool call — file contents, output, or error. The agent's only view of the environment.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

What the [harness](/ai-coding-dictionary/harness) sends back after executing a [tool call](/ai-coding-dictionary/tool-call) — the file contents, the command output, the error. The [agent](/ai-coding-dictionary/agent)'s only view of the [environment](/ai-coding-dictionary/environment). Travels back to the [model](/ai-coding-dictionary/model) in the _next_ [model provider request](/ai-coding-dictionary/model-provider-request), where the model decides what to do with it. Tool call and tool result are two ends of the same exchange, both inside one [turn](/ai-coding-dictionary/turn).

The lifecycle of a tool result:

| Step | Who | What happens |
| --- | --- | --- |
| 1 | Harness | Executes the tool call — runs the command, reads the file |
| 2 | Harness | Captures the outcome: output, contents, or error |
| 3 | Harness | Appends it to the [context](/ai-coding-dictionary/context) as a message |
| 4 | Harness | Sends the whole context to the provider in the next model provider request |
| 5 | Model | Reads the result and decides: another tool call, or a final answer |

View Table

The result stays in the context for the rest of the [session](/ai-coding-dictionary/session). Tool results are usually the bulk of a coding session's context: every file read, every test run, every search lands in full and keeps occupying [tokens](/ai-coding-dictionary/token) long after it stopped being useful. A few large results — a verbose test log, a generated file read whole — can push a session toward the edge of the [context window](/ai-coding-dictionary/context-window) faster than the conversation itself does.

Because the result is all the model sees, the model has no way to check the environment behind it. If the output was truncated, the command silently failed, or the harness returned an error instead of the contents, the model reasons from what it was given. When the agent's picture of your system seems wrong, the tool results are where to look: somewhere in the transcript is a result that says something different from what you know to be true.

_Usage:_

"It's reasoning about the file like it's empty."

"The tool result came back as a permission denial, not the contents. The model only saw the error string — it has no other way to see the file."

[Previous term**Tool call**](/ai-coding-dictionary/tool-call)[Next term**MCP**](/ai-coding-dictionary/mcp)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ftool-resultTool%20result%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Tool%20result%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ftool-result)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/tool-result?author=Matt Pocock>)

Copy URL
