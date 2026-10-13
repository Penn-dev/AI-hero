---
title: "Contextual knowledge"
slug: "contextual-knowledge"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Failure Modes

# Contextual knowledge

Facts the agent can read directly from the context right now. Counterpart to parametric knowledge.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Facts the [agent](/ai-coding-dictionary/agent) can read directly from the [context](/ai-coding-dictionary/context) right now — the user's task, files the agent has read in, [tool results](/ai-coding-dictionary/tool-result), [AGENTS.md](/ai-coding-dictionary/agents-md) content loaded at [session](/ai-coding-dictionary/session) start. Counterpart to [parametric knowledge](/ai-coding-dictionary/parametric-knowledge): parametric is _recalled_ from the parameters; contextual is _read_ from the [window](/ai-coding-dictionary/context-window). [Hallucinations](/ai-coding-dictionary/hallucination) are much less common when the agent works from contextual knowledge — the answer is right in front of it, not dredged up from a blurred memory.

Of the two kinds of knowledge, only contextual knowledge is in your control. The parameters are frozen, so the only way to give the [model](/ai-coding-dictionary/model) knowledge it lacks — an internal SDK, a library released after the [knowledge cutoff](/ai-coding-dictionary/knowledge-cutoff), a decision made yesterday — is to put it in the context. A lot of practical [AI](/ai-coding-dictionary/ai) coding work reduces to this: getting the right facts in front of the model at the moment it needs them.

When contextual and parametric knowledge conflict, the contextual usually wins. Paste the current API docs and the model follows them rather than its stale memory of the old API — though the old version can still bleed through, especially deep into a long session. If the agent keeps reverting to an outdated pattern despite the docs being loaded, that's parametric knowledge leaking past the contextual; restating the correction or moving it closer to the work helps.

Unlike parametric knowledge, contextual knowledge costs something to use. Everything loaded into the window spends [tokens](/ai-coding-dictionary/token) and competes for the model's [attention budget](/ai-coding-dictionary/attention-budget), so loading more is not automatically better — the aim is the relevant facts in the window, not all the facts.

_Reach for this term_ only when contrasting with parametric knowledge; otherwise just say **context**.

_Avoid:_ "working memory" — contextual knowledge is what's in the window _now_; a [memory system](/ai-coding-dictionary/memory-system) is what gets cross-session content into it. Different scales, don't conflate.

_Usage:_

"Why does it nail the API when I paste the docs and fabricate it when I don't?"

"With the docs in, it's contextual knowledge — reading off the page. Without, it's parametric and the rare endpoints blur."

[Previous term**Knowledge cutoff**](/ai-coding-dictionary/knowledge-cutoff)[Next term**Attention relationship**](/ai-coding-dictionary/attention-relationship)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontextual-knowledgeContextual%20knowledge%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Contextual%20knowledge%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fcontextual-knowledge)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/contextual-knowledge?author=Matt Pocock)

Copy URL
