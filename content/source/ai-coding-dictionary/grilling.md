---
title: "Grilling"
slug: "grilling"
type: "dictionary"
description: "A technique for developing a design concept: the agent interviews the user Socratically, one decision at a time."
updatedAt: "2026-07-01T08:46:18.000Z"
---
A technique for developing a [design concept](/ai-coding-dictionary/design-concept) with an [agent](/ai-coding-dictionary/agent): the agent interviews the user Socratically, one decision at a time, proposing a recommended answer for each. Slows the rush to a finished plan — no [handoff artifact](/ai-coding-dictionary/handoff-artifact) is written until the concept stabilises.

The technique exists because agents fill gaps silently. Asked to write a [spec](/ai-coding-dictionary/spec) from a two-line prompt, the agent doesn't stop at the decisions you haven't made — it picks defaults and writes them in. The result looks complete, and the guesses are indistinguishable from the choices, so you discover them late: at review, or when the built feature handles an edge case in a way you never chose. Grilling inverts this — instead of guessing, the agent has to ask.

It's a [human-in-the-loop](/ai-coding-dictionary/human-in-the-loop) technique: your answers are the input. When a question can't be answered in conversation — you'd have to see the thing — switch to [prototyping](/ai-coding-dictionary/prototyping).

_Usage:_

"It went straight to writing the spec and got the cancellation logic wrong."

"Grill it first — make it ask you about partial cancels, refunds, and timing before it commits anything to the doc. Cheaper to resolve in conversation than in code."
