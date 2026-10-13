---
title: "Context"
slug: "context"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Sessions, Context Windows & Turns

# Context

The relevant information the agent has access to right now — what the agent knows that's pertinent to the task.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

The relevant information the [agent](/ai-coding-dictionary/agent) has access to right now. The abstract noun — not the raw input the model sees (that's the [context window](/ai-coding-dictionary/context-window)), not the running history (that's the [session](/ai-coding-dictionary/session)), but _what the agent knows that's pertinent to the task_. "Loading something into context" means making it part of this set; "context engineering" is the discipline of curating it.

The three terms separate cleanly:

| Term | What it names |
| --- | --- |
| Context | The task-relevant information the agent currently has |
| Context window | The literal [token](/ai-coding-dictionary/token) sequence the model sees per request |
| Session | The running conversation the [harness](/ai-coding-dictionary/harness) stores |

View Table

The separation matters because context is a measure of quality, not quantity. A context window can be nearly full and the context still poor — thousands of tokens of stale tool output, none of it about the task at hand. It can also be nearly empty and the context excellent: the one type definition the task turns on.

Most day-to-day failures trace back to context. When the agent invents an API, contradicts a decision, or guesses at a schema, the first question is what was in context when it did — usually the relevant fact was never loaded, or was buried under [attention degradation](/ai-coding-dictionary/attention-degradation). The fix is curation: load what the task needs, keep out what it doesn't.

_Usage:_

"It keeps inventing fields that aren't in the type."

"The type file isn't in context — it's reading the call sites and guessing. Read the definition in first."

[Previous term**Stateless**](/ai-coding-dictionary/stateless)[Next term**Context window**](/ai-coding-dictionary/context-window)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FcontextContext%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Context%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontext)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/context?author=Matt Pocock>)

Copy URL
