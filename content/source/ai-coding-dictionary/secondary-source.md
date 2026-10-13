---
title: "Secondary source"
slug: "secondary-source"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Handoffs

# Secondary source

An account of a primary source, one step removed — summaries, docs, compaction summaries. Cheap to load, lossy by construction.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

An account of a [primary source](/ai-coding-dictionary/primary-source), one step removed — documentation describing code, a summary describing a transcript, a report describing search results. Cheaper to load into the [context window](/ai-coding-dictionary/context-window) than the source it describes, and lossy by construction: whoever wrote it decided what mattered, and whatever they dropped is invisible to a reader who only has the summary.

A lot of [context](/ai-coding-dictionary/context) engineering is the manufacture of secondary sources. [Compaction](/ai-coding-dictionary/compaction) turns the [session](/ai-coding-dictionary/session) history into a summary that seeds the next session. A [subagent](/ai-coding-dictionary/subagent) burns its own context on a noisy search and returns a short report. A [handoff artifact](/ai-coding-dictionary/handoff-artifact) condenses a session's decisions into a document the next session reads. [Memory systems](/ai-coding-dictionary/memory-system) distil what a session learned into notes. Each makes the same trade: fidelity for headroom.

Secondary sources fail in two ways. They're lossy — the compaction summary that lost the schema decision, the report that didn't mention the edge case. And they drift — the primary source changes and the account doesn't follow, so docs describe last quarter's architecture with this quarter's confidence. When an [agent](/ai-coding-dictionary/agent) acts on a secondary source that has failed either way, it works confidently from wrong information; the fix is sending it back to the primary source.

Neither failure makes secondary sources a mistake. The context window is finite, and primary sources are expensive; without summaries, reports, and handoff documents, nothing large fits. The skill is knowing which details can survive the loss — and verifying against the primary source when one can't. A well-made secondary source carries a [context pointer](/ai-coding-dictionary/context-pointer) back to its original — the summary that names the transcript it came from, the doc that names the file it describes — so when the account isn't enough, the reader can follow the pointer rather than work from the loss.

_Usage:_

"The handoff doc says auth is done, but the new session keeps finding broken token refresh."

"The doc's a secondary source — the last session wrote down what it believed, not what's true. Have the new session run the auth tests and trust the primary source."

[Previous term**Primary source**](/ai-coding-dictionary/primary-source)[Next term**Handoff artifact**](/ai-coding-dictionary/handoff-artifact)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsecondary-sourceSecondary%20source%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Secondary%20source%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsecondary-source)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/secondary-source?author=Matt Pocock>)

Copy URL
