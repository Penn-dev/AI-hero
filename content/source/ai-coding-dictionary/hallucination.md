---
title: "Hallucination"
slug: "hallucination"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Failure Modes

# Hallucination

Confidently-wrong model output. Two flavors: factuality (invented facts) and faithfulness (drift from loaded context).

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Confidently-wrong [model](/ai-coding-dictionary/model) output. Two flavors with different causes and fixes:

| Flavor | What goes wrong | Cause | Fix |
| --- | --- | --- | --- |
| _Factuality_ | Invented or wrong facts about the world — a function that doesn't exist, a wrong API signature, a fake citation | [Parametric knowledge](/ai-coding-dictionary/parametric-knowledge) gaps, often past the [knowledge cutoff](/ai-coding-dictionary/knowledge-cutoff) | Load the right [contextual knowledge](/ai-coding-dictionary/contextual-knowledge) |
| _Faithfulness_ | Output drifts from the contextual knowledge that's loaded, the user's instructions, or the model's own prior reasoning | [Attention degradation](/ai-coding-dictionary/attention-degradation); worsens in the [dumb zone](/ai-coding-dictionary/smart-zone) | [Clear](/ai-coding-dictionary/clearing) or [compact](/ai-coding-dictionary/compaction) |

View Table

[Next-token prediction](/ai-coding-dictionary/next-token-prediction) produces fluent output whether or not the underlying fact is real — the model has no internal signal that it doesn't know something, so an invented method arrives in the same assured register as a correct one. Hallucinated code is plausible by construction: it's what the API _would_ look like if it existed, which is exactly what makes it slip past a skim-level review and fail only when run.

You need to know which flavor you're looking at, because the fix for one makes the other worse. Factuality means missing knowledge: the fix is adding context — the docs, the type definitions, the file. Faithfulness means the knowledge is present but losing the competition for attention: the fix is removing context. Misdiagnose faithfulness as factuality and you paste in more docs, which grows the context and makes the drift worse. When the agent gets something wrong, check whether the correct information was already in context before deciding which problem you have.

_Avoid:_ "hallucination" as a bare synonym for "wrong" — without naming the flavor, the term has no diagnostic value.

_Usage:_

"It hallucinated a `parseAsync` method on the schema."

"Factuality or faithfulness?"

"The method exists in the docs I pasted — it just stopped reading them after [turn](/ai-coding-dictionary/turn) forty."

"Faithfulness then. Compact and reload, don't bother adding more docs."

[Previous term**Sycophancy**](/ai-coding-dictionary/sycophancy)[Next term**Parametric knowledge**](/ai-coding-dictionary/parametric-knowledge)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FhallucinationHallucination%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Hallucination%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fhallucination)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/hallucination?author=Matt Pocock>)

Copy URL
