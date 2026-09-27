---
title: "Tool result"
slug: "tool-result"
type: "dictionary"
description: "What the harness sends back after executing a tool call — file contents, output, or error. The agent's only view of the environment."
updatedAt: "2026-07-01T08:46:18.000Z"
---
What the [harness](/ai-coding-dictionary/harness) sends back after executing a [tool call](/ai-coding-dictionary/tool-call) — the file contents, the command output, the error. The [agent](/ai-coding-dictionary/agent)'s only view of the [environment](/ai-coding-dictionary/environment). Travels back to the [model](/ai-coding-dictionary/model) in the _next_ [model provider request](/ai-coding-dictionary/model-provider-request), where the model decides what to do with it. Tool call and tool result are two ends of the same exchange, both inside one [turn](/ai-coding-dictionary/turn).

The lifecycle of a tool result:

| Step | Who | What happens |
| --- | --- | --- |
| 1 | Harness | Executes the tool call — runs the command, reads the file |
| 2 | Harness | Captures the outcome: output, contents, or error |
| 3 | Harness | Appends it to the [context](/ai-coding-dictionary/context) as a message |
| 4 | Harness | Sends the whole context to the provider in the next model provider request |
| 5 | Model | Reads the result and decides: another tool call, or a final answer |

The result stays in the context for the rest of the [session](/ai-coding-dictionary/session). Tool results are usually the bulk of a coding session's context: every file read, every test run, every search lands in full and keeps occupying [tokens](/ai-coding-dictionary/token) long after it stopped being useful. A few large results — a verbose test log, a generated file read whole — can push a session toward the edge of the [context window](/ai-coding-dictionary/context-window) faster than the conversation itself does.

Because the result is all the model sees, the model has no way to check the environment behind it. If the output was truncated, the command silently failed, or the harness returned an error instead of the contents, the model reasons from what it was given. When the agent's picture of your system seems wrong, the tool results are where to look: somewhere in the transcript is a result that says something different from what you know to be true.

_Usage:_

"It's reasoning about the file like it's empty."

"The tool result came back as a permission denial, not the contents. The model only saw the error string — it has no other way to see the file."
