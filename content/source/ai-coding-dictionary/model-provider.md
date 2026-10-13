---
title: "Model provider"
slug: "model-provider"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

The Model

# Model provider

Whatever serves a model for inference. Usually remote (Anthropic, OpenAI, Google), but can also be local (Ollama, llama.cpp).

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Whatever serves a [model](/ai-coding-dictionary/model) for [inference](/ai-coding-dictionary/inference). Usually a remote service (Anthropic, OpenAI, Google), but can also be local — Ollama, LM Studio, llama.cpp running on your own machine. The [harness](/ai-coding-dictionary/harness) doesn't run the model itself; it asks a provider to.

The provider owns the machinery: the [parameters](/ai-coding-dictionary/parameters) live on its hardware, and every [model provider request](/ai-coding-dictionary/model-provider-request) is the harness sending [tokens](/ai-coding-dictionary/token) over the network and getting predictions back. That makes the provider the source of a whole category of problems that get misattributed to the model or the harness — rate limits, degraded capacity, and outages all live here. When the [agent](/ai-coding-dictionary/agent) stalls mid-[session](/ai-coding-dictionary/session) or errors on every [turn](/ai-coding-dictionary/turn), the provider's status page is worth checking before anything else.

The provider also sets the commercial terms: per-token pricing for [input](/ai-coding-dictionary/input-tokens) and [output tokens](/ai-coding-dictionary/output-tokens), [prefix cache](/ai-coding-dictionary/prefix-cache) discounts, and which models are available at all. Note that the provider and the model's maker can be different companies — Bedrock, Vertex, and OpenRouter serve other people's models.

Local providers trade capability for control: the models that fit on your own hardware are far smaller than the frontier ones, but nothing leaves the machine and there's no bill per token.

_Usage:_

"Can we run this offline for the air-gapped client?"

"Swap the model provider to a local one — Ollama or llama.cpp on their box. The harness doesn't care, it just hits a different endpoint."

[Previous term**Non-determinism**](/ai-coding-dictionary/non-determinism)[Next term**Harness**](/ai-coding-dictionary/harness)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmodel-providerModel%20provider%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Model%20provider%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fmodel-provider)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/model-provider?author=Matt Pocock>)

Copy URL
