---
title: "Context window"
slug: "context-window"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Sessions, Context Windows & Turns

# Context window

Everything the model sees on each model provider request. Finite, model-specific, the only surface through which the model perceives.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Everything the [model](/ai-coding-dictionary/model) sees on each [model provider request](/ai-coding-dictionary/model-provider-request). Finite, model-specific, and the _only_ surface through which the model perceives anything.

It's a single sequence of [tokens](/ai-coding-dictionary/token): the [system prompt](/ai-coding-dictionary/system-prompt), the conversation so far, every [tool result](/ai-coding-dictionary/tool-result) the [harness](/ai-coding-dictionary/harness) has fed back in. If something is in that sequence, the model can use it; if it isn't, the model doesn't know it exists — not your codebase, not the file you edited yesterday, not the instruction you gave three sessions ago. Anything outside the window has to be brought in, usually via a [tool call](/ai-coding-dictionary/tool-call), before it can affect anything.

Finite means it fills up. Every turn appends more — your messages, the model's responses, tool results — and a long [session](/ai-coding-dictionary/session) will eventually hit the limit, forcing [compaction](/ai-coding-dictionary/compaction) or [clearing](/ai-coding-dictionary/clearing). It also means everything in the window competes: each token you load is one less available for the rest, and content you didn't need still occupies the model's [attention](/ai-coding-dictionary/attention-budget). The practical stance is to treat the window as a budget — load what the task needs, leave the rest out.

_Avoid:_ "memory" — the context window is working state and doesn't persist across sessions. [Memory](/ai-coding-dictionary/memory-system) is a separate concept layered on top.

_Usage:_

"Can I just paste the whole monorepo into the prompt?"

"The context window's 200k tokens — that's maybe a fifth of the repo. Pick the files the task touches, leave the rest behind a tool call."

[Previous term**Context**](/ai-coding-dictionary/context)[Next term**Stateful**](/ai-coding-dictionary/stateful)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontext-windowContext%20window%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Context%20window%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontext-window)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/context-window?author=Matt Pocock)

Copy URL
