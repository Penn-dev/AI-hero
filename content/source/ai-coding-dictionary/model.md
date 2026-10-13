---
title: "Model"
slug: "model"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

The Model

# Model

The parameters. Stateless — does next-token prediction and nothing else. Cannot do anything agentic on its own.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

The [parameters](/ai-coding-dictionary/parameters). [Stateless](/ai-coding-dictionary/stateless) — does [next-token prediction](/ai-coding-dictionary/next-token-prediction) and nothing else. "Claude Opus 4.x" and "GPT-5.x" are models. On its own a model can't do anything agentic; it has to be [harnessed](/ai-coding-dictionary/harness).

Models can't read files, run commands, browse the web, or remember yesterday — it takes [tokens](/ai-coding-dictionary/token) in and predicts tokens out, once per [model provider request](/ai-coding-dictionary/model-provider-request). Everything that feels like an [agent](/ai-coding-dictionary/agent) working — choosing [tools](/ai-coding-dictionary/tool), reading results, looping until the task is done — is the harness orchestrating many of those predictions in a row.

[Model providers](/ai-coding-dictionary/model-provider) ship models in tiers: a large one that's smartest but slow and expensive, and smaller ones that are faster and cheaper but less capable. Picking a tier is a real decision — heavyweight for planning and hard debugging, lightweight for mechanical changes — and harnesses let you switch mid-[session](/ai-coding-dictionary/session).

Being strict about the word also sharpens diagnosis. "The model is bad at this" is a specific claim — the same model in a different harness, or with a different [context](/ai-coding-dictionary/context), often behaves completely differently. Before blaming the model, check what it was given: most disappointing output traces back to context or harness, not parameters.

_Usage:_

"Should we switch the model from Sonnet to Opus for the planning step?"

"Try it — but the harness is doing most of the lifting on this task. The model swap won't help if the [system prompt](/ai-coding-dictionary/system-prompt) and tools are wrong."

[Previous term**AI**](/ai-coding-dictionary/ai)[Next term**Parameters**](/ai-coding-dictionary/parameters)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FmodelModel%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Model%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmodel)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/model?author=Matt Pocock>)

Copy URL
