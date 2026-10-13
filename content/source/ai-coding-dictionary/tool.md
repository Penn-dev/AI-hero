---
title: "Tool"
slug: "tool"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Tools & Environment

# Tool

A function the harness exposes for the agent to call — Read, Write, Bash, Search. How an agent perceives and acts on the environment.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

A function the [harness](/ai-coding-dictionary/harness) exposes for the [agent](/ai-coding-dictionary/agent) to call — Read, Write, Bash, Search. Tools are how an agent perceives and acts on the [environment](/ai-coding-dictionary/environment): it can't see the environment except through [tool results](/ai-coding-dictionary/tool-result), and can't change it except through [tool calls](/ai-coding-dictionary/tool-call). Each tool call costs an extra [model provider request](/ai-coding-dictionary/model-provider-request), since the result has to go back to the model before it can decide what to do next.

Tools most coding agents ship with:

| Tool | What it does |
| --- | --- |
| Read | Returns a file's contents as a tool result |
| Write | Creates or edits a file in the [filesystem](/ai-coding-dictionary/filesystem) |
| Bash | Runs a shell command and returns its output |
| Search | Finds files or text matching a pattern across the codebase |

View Table

A tool is defined by three things: a name, a description of what it does, and a schema for its parameters. The harness sends these definitions to the [model](/ai-coding-dictionary/model) with every request, and the model chooses a tool the same way it produces everything else — by writing [tokens](/ai-coding-dictionary/token), in this case a structured call with arguments. The model never executes anything itself; the harness reads the call, runs the function, and sends back the result.

The tool list sets what the agent can do. A capable model with a narrow tool set is a narrow agent: it will route everything through whatever it has, which is why agents lean so heavily on Bash — a shell is one tool that reaches most of the system. To give an agent a capability cleanly, add a tool for it; [MCP](/ai-coding-dictionary/mcp) is the standard for plugging in tools from outside the harness.

Tool definitions occupy [context](/ai-coding-dictionary/context) on every request, so a large tool set has a standing cost before any tool is called — and many similarly-described tools make the model worse at picking the right one.

_Usage:_

"Can the agent query staging directly?"

"Add a `psql` tool to the harness, scoped read-only on staging. Without a tool for it, the agent's blind to anything outside the filesystem."

[Previous term**Filesystem**](/ai-coding-dictionary/filesystem)[Next term**Tool call**](/ai-coding-dictionary/tool-call)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FtoolTool%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Tool%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ftool)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/tool?author=Matt Pocock>)

Copy URL
