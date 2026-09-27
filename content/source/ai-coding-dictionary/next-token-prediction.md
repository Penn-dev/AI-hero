---
title: "Next-token prediction"
slug: "next-token-prediction"
type: "dictionary"
description: "What the model actually does. Samples one next token from the context, appends it, and runs again. Its only mode of operation."
updatedAt: "2026-07-01T08:46:18.000Z"
---
What the [model](/ai-coding-dictionary/model) actually does. Given a [context](/ai-coding-dictionary/context), it samples one next [token](/ai-coding-dictionary/token), appends it, and runs again. Every output — a sentence, a [tool call](/ai-coding-dictionary/tool-call), a thousand-line file — is built one token at a time. The model has no other mode of operation.

Each step works the same way: the tokens in the [context window](/ai-coding-dictionary/context-window) are run through the [parameters](/ai-coding-dictionary/parameters), which produce a probability for every token in the vocabulary — this one is very likely next, that one less so. One token is sampled from those probabilities, appended, and the loop runs again with the slightly longer context. That sampling step is why the same prompt produces different output on different runs: [non-determinism](/ai-coding-dictionary/non-determinism) is built into the mechanism, not a bug layered on top.

Holding onto this mechanism explains behaviour that otherwise looks strange. The model never checks whether a token is _true_ before emitting it — only whether it's _likely_ — which is the root of [hallucination](/ai-coding-dictionary/hallucination). It commits to each token as it goes, so a confident-sounding opening sentence can steer the rest of the answer wrong. And because [output tokens](/ai-coding-dictionary/output-tokens) are produced strictly one at a time, generation speed puts a floor on how fast any [agent](/ai-coding-dictionary/agent) can work.

_Usage:_

"How does the agent 'decide' to call a tool?"

"It doesn't — it's next-token prediction all the way down. The tool call is just a structured string the [harness](/ai-coding-dictionary/harness) parses out of the output stream."
