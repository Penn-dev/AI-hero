---
title: "Harness"
slug: "harness"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

The Model

# Harness

Everything around the model that turns it into an agent: tools, system prompt, context-window management, permissions, hooks.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

Everything around the [model](/ai-coding-dictionary/model) that turns it into an [agent](/ai-coding-dictionary/agent): [tools](/ai-coding-dictionary/tool), [system prompt](/ai-coding-dictionary/system-prompt), [context-window management](/ai-coding-dictionary/context-window), permissions, hooks. **Claude.ai** and **Claude Code** run on the same model but behave differently because their harnesses differ.

The model itself only does one thing: take text in, produce text out. It can't read a file, run a command, or remember the last [turn](/ai-coding-dictionary/turn). The harness supplies all of that. It assembles the [context](/ai-coding-dictionary/context) for each [model provider request](/ai-coding-dictionary/model-provider-request), executes the [tool calls](/ai-coding-dictionary/tool-call) the model asks for, feeds the [tool results](/ai-coding-dictionary/tool-result) back in, stores the [session](/ai-coding-dictionary/session) history, asks you for permission before risky actions, and decides when to [compact](/ai-coding-dictionary/compaction). The agent loop — model proposes, harness executes, repeat — is run by the harness.

This matters for diagnosis. When behaviour differs between two products, or between yesterday and today, the model is often not the variable — the harness is. A different system prompt, a different set of tools, a changed permission default, or a new context-management strategy all change behaviour without any change to the model. It also means the harness is where most of your configuration lives: [AGENTS.md](/ai-coding-dictionary/agents-md) files, permission settings, and hooks are all instructions to the harness, not the model.

Examples: Claude Code, Cursor, Codex CLI — and Claude.ai, which is a chat harness rather than a coding one.

_Usage:_

"Same model, why is Claude Code editing files and Claude.ai just answering questions?"

"Different harnesses — Claude Code has [filesystem](/ai-coding-dictionary/filesystem) tools, a different system prompt, and a permission layer. The model isn't the variable here."

[Previous term**Model provider**](/ai-coding-dictionary/model-provider)[Next term**Model provider request**](/ai-coding-dictionary/model-provider-request)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FharnessHarness%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Harness%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fharness)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/harness?author=Matt Pocock)

Copy URL
