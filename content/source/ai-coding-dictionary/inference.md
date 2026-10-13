---
title: "Inference"
slug: "inference"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

The Model

# Inference

Running a trained model to generate output — what happens on every model provider request. Parameters stay fixed.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Running a trained [model](/ai-coding-dictionary/model) to generate output — what happens on every [model provider request](/ai-coding-dictionary/model-provider-request). [Parameters](/ai-coding-dictionary/parameters) stay fixed; the model just does [next-token prediction](/ai-coding-dictionary/next-token-prediction) over the [context](/ai-coding-dictionary/context) it's given. Cheap relative to [training](/ai-coding-dictionary/training), but billed per [token](/ai-coding-dictionary/token) and the dominant cost of using a model.

A model's life splits into two phases:

| Phase | When it happens | What it does | Parameters |
| --- | --- | --- | --- |
| Training | Once, before release | Produces the parameters from a training corpus | Being written |
| Inference | Every time anyone uses the model | Runs the frozen parameters over your context to generate tokens | Read-only |

View Table

Nothing you do at inference time writes back to the parameters — that's the reason a correction you make today doesn't stick tomorrow. The model that makes the same mistake next [session](/ai-coding-dictionary/session), after you carefully explained the fix, hasn't ignored you; it's incapable of learning from the exchange. The model is [stateless](/ai-coding-dictionary/stateless) — continuity has to come from outside it — from the [context window](/ai-coding-dictionary/context-window) or a [memory system](/ai-coding-dictionary/memory-system).

This mechanism also explains how you're billed. Every request runs the model over the full context, so cost scales with [input tokens](/ai-coding-dictionary/input-tokens) and [output tokens](/ai-coding-dictionary/output-tokens), and an agent making dozens of [tool](/ai-coding-dictionary/tool) calls pays for inference on each round trip. This is why context size is a cost question as well as a quality one.

_Usage:_

"Why does the bill scale with usage instead of being a flat license?"

"You're paying for inference — every model provider request runs the model on the provider's hardware. Training already happened, but inference costs accrue per request, and a single [turn](/ai-coding-dictionary/turn) can expand into many requests when tools are called."

[Previous term**Training**](/ai-coding-dictionary/training)[Next term**Effort**](/ai-coding-dictionary/effort)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FinferenceInference%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Inference%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Finference)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/inference?author=Matt Pocock)

Copy URL
