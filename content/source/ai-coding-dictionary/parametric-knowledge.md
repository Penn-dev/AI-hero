---
title: "Parametric knowledge"
slug: "parametric-knowledge"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Failure Modes

# Parametric knowledge

What the model knows from training, stored in its parameters. Frozen at training time. Counterpart to contextual knowledge.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

What the [model](/ai-coding-dictionary/model) "knows" from [training](/ai-coding-dictionary/training), stored in its [parameters](/ai-coding-dictionary/parameters). Frozen at training time — the model can't see its own parameters or update them. Detail is lost in the squeeze: billions of facts cram into a fixed number of parameters, and the rare ones blur. Source of fluency on common topics, and of fabrication on uncommon ones. Counterpart to [contextual knowledge](/ai-coding-dictionary/contextual-knowledge).

Parametric knowledge is not stored as facts. Training never gives the model a database to look things up in; it adjusts parameters until the model predicts text well, and a model that predicts text about a topic well behaves as if it knows the topic. How reliable the knowledge is tracks how often something appeared in the training data: a topic with millions of examples is reproduced accurately, for a topic with only a handful, the model guesses based on what similar topics look like. Reproducing and guessing are the same process to the model, so it can't tell which one it's doing. A fabricated answer arrives with the same fluency as a correct one. [Hallucination](/ai-coding-dictionary/hallucination) is the model guessing wrong.

Parametric knowledge also ages. The parameters stop changing at the [knowledge cutoff](/ai-coding-dictionary/knowledge-cutoff), so a library released or renamed after that date doesn't exist in them, and an API that changed is remembered in its old form.

For both gaps — too rare and too recent — the remedy is the same: the knowledge can't be added to the parameters, so it has to be supplied as contextual knowledge instead.

_Usage:_

"It writes flawless React but invents methods on our internal SDK."

"React is dense in the parametric knowledge — millions of training examples. Your SDK isn't, so the model fills in plausible-looking shapes. Load the SDK docs into [context](/ai-coding-dictionary/context)."

[Previous term**Hallucination**](/ai-coding-dictionary/hallucination)[Next term**Knowledge cutoff**](/ai-coding-dictionary/knowledge-cutoff)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fparametric-knowledgeParametric%20knowledge%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Parametric%20knowledge%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fparametric-knowledge)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/parametric-knowledge?author=Matt Pocock>)

Copy URL
