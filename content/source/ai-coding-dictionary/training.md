---
title: "Training"
slug: "training"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

The Model

# Training

The process that sets a model's parameters by exposing it to vast amounts of text and adjusting to improve next-token prediction.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

The process that sets a [model](/ai-coding-dictionary/model)'s [parameters](/ai-coding-dictionary/parameters), by exposing it to vast amounts of text and adjusting parameters to improve [next-token prediction](/ai-coding-dictionary/next-token-prediction). A one-time, expensive process done by the [model provider](/ai-coding-dictionary/model-provider). Encompasses both pre-training (the bulk run) and post-training (later refinements like instruction-following and safety); the distinction doesn't matter at this glossary's level.

The mechanism is repetition at scale: show the model a stretch of text, have it predict the next [token](/ai-coding-dictionary/token), nudge the parameters toward whatever the actual next token was, and repeat across trillions of tokens. Nothing is stored as facts or rules — everything the model "knows" is a side effect of getting better at prediction, compressed into the parameters as [parametric knowledge](/ai-coding-dictionary/parametric-knowledge).

Two consequences matter day to day. Training ends at a point in time, so the model has a [knowledge cutoff](/ai-coding-dictionary/knowledge-cutoff) — it hasn't seen the library version you upgraded to last month. And training is not something you can do: when the model doesn't know your codebase, your conventions, or your internal APIs, the fix is never "teach the model" — it's putting that material into [context](/ai-coding-dictionary/context), the one input you control.

_Usage:_

"Can we get it to know our internal API?"

"Not via training — that's a months-long process by the model provider. Load the API docs into context instead, that's the lever you actually have."

[Previous term**Parameters**](/ai-coding-dictionary/parameters)[Next term**Inference**](/ai-coding-dictionary/inference)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FtrainingTraining%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Training%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ftraining)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/training?author=Matt Pocock>)

Copy URL
