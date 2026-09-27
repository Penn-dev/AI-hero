---
title: "Knowledge cutoff"
slug: "knowledge-cutoff"
type: "dictionary"
description: "The date past which a model has no parametric knowledge. Post-cutoff libraries and APIs are fabrication traps unless docs are loaded."
updatedAt: "2026-07-01T08:46:18.000Z"
---
The date past which a [model](/ai-coding-dictionary/model) has no [parametric knowledge](/ai-coding-dictionary/parametric-knowledge). Libraries, APIs, and events from after the cutoff are fabrication traps unless their docs are loaded as [contextual knowledge](/ai-coding-dictionary/contextual-knowledge). Each model release ships with its own cutoff.

The cutoff exists because of how models are made: [training](/ai-coding-dictionary/training) bakes a snapshot of text into the model's [parameters](/ai-coding-dictionary/parameters), and after that the parameters are frozen. The model doesn't know its knowledge has an edge — asked about something past the cutoff, it doesn't refuse, it extrapolates from the nearest thing it does know. That's what makes the trap quiet: code written against an old version of a library looks plausible, often compiles, and fails on the parts that changed.

The fix is always the same: get current information into [context](/ai-coding-dictionary/context). Load the changelog, point at the installed version's type definitions, or have the agent read the docs from the web. Anything in context outranks nothing-in-parameters.

_Usage:_

"It keeps writing the v3 SDK syntax — we're on v5."

"v5 shipped after the knowledge cutoff. Load the v5 changelog as contextual knowledge, otherwise it'll keep fabricating from the older parametric version."
