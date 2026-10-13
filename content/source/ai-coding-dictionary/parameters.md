---
title: "Parameters"
slug: "parameters"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

The Model

# Parameters

The numbers inside a model — often billions — tuned during training. Everything the model knows lives in them. Also called weights.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

The numbers inside a [model](/ai-coding-dictionary/model) — often billions of them — tuned during [training](/ai-coding-dictionary/training). Everything the model "knows" lives in them. Training sets them; [inference](/ai-coding-dictionary/inference) uses them unchanged. Also called _weights_.

Mechanically, the parameters are what turn input into output. [Next-token prediction](/ai-coding-dictionary/next-token-prediction) is a giant calculation: the [tokens](/ai-coding-dictionary/token) in the [context window](/ai-coding-dictionary/context-window) go in, get multiplied through the parameters, and a prediction for the next token comes out. There is no database of facts inside the model, no code lookup table — just these numbers, arranged so that the calculation tends to produce useful output. Facts the model can recite from training, like a standard library API, are [parametric knowledge](/ai-coding-dictionary/parametric-knowledge): stored in the parameters, not retrieved from anywhere.

The detail worth internalising is that parameters are frozen after training. Nothing you do in a [session](/ai-coding-dictionary/session) changes them — no correction you make, no codebase you show it, no mistake it learns from. Every session runs on the same numbers. This is why the model is [stateless](/ai-coding-dictionary/stateless), why its built-in knowledge stops at the [knowledge cutoff](/ai-coding-dictionary/knowledge-cutoff), and why anything project-specific has to arrive via [context](/ai-coding-dictionary/context) instead. The only way parameters change is more training — which produces, in effect, a different model.

_Usage:_

"Can we fine-tune it on our codebase?"

"That'd update the parameters — different model afterwards. For one project it's almost always cheaper to load the codebase as context than to retrain."

[Previous term**Model**](/ai-coding-dictionary/model)[Next term**Training**](/ai-coding-dictionary/training)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FparametersParameters%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Parameters%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fparameters)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/parameters?author=Matt Pocock>)

Copy URL
