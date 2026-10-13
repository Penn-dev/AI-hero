---
title: "Autocompact"
slug: "autocompact"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Handoffs

# Autocompact

Compaction triggered automatically by the harness when the context window approaches full.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

[Compaction](/ai-coding-dictionary/compaction) triggered automatically by the [harness](/ai-coding-dictionary/harness) when the [context window](/ai-coding-dictionary/context-window) approaches full.

The harness watches how full the context window is. When it crosses a threshold — often around 80% — it pauses, asks the [model](/ai-coding-dictionary/model) to summarise the [session](/ai-coding-dictionary/session) so far, and seeds a fresh session with the summary. Work then continues as if nothing happened.

Except something did happen. Compaction is lossy, and autocompact is lossy at a moment you didn't choose. A manual compact happens at a phase boundary, when you can tell the model what to preserve. Autocompact fires mid-task, whenever the threshold is hit — possibly halfway through a refactor, with the summary deciding for itself which of your decisions were worth keeping. The classic symptom: the [agent](/ai-coding-dictionary/agent) carries on confidently but has quietly forgotten a constraint you established an hour ago, and you only notice when its work starts contradicting it.

The defence is to not let it fire. Watch the context indicator and compact manually at a natural boundary, or write decisions into a plan doc or [handoff artifact](/ai-coding-dictionary/handoff-artifact) on disk, where no summary can lose them. Most harnesses also let you customise the buffer — moving the threshold earlier or later, or turning autocompact off entirely — so you can tune how much headroom you keep before it fires.

_Usage:_

"It doesn't seem to remember what we decided about the schema earlier."

"Autocompact fired between [turns](/ai-coding-dictionary/turn) — the early decisions got summarised and we must have lost something. Reload the plan doc, or compact manually next time so you control what gets kept."

[Previous term**Compaction**](/ai-coding-dictionary/compaction)[Next term**Memory system**](/ai-coding-dictionary/memory-system)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FautocompactAutocompact%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Autocompact%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fautocompact)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/autocompact?author=Matt Pocock>)

Copy URL
