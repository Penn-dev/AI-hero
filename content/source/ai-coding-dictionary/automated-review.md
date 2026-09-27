---
title: "Automated review"
slug: "automated-review"
type: "dictionary"
description: "An agent reviewing another agent's work, often with a different model or system prompt. Non-deterministic: it forms a judgement."
updatedAt: "2026-07-01T08:46:18.000Z"
---
An [agent](/ai-coding-dictionary/agent) reviewing another agent's work, often with a different [model](/ai-coding-dictionary/model) or [system prompt](/ai-coding-dictionary/system-prompt). Non-deterministic: it forms a judgement. Runs anywhere — pre-merge on a PR, post-hoc on commit history, mid-session as a [subagent](/ai-coding-dictionary/subagent). An LLM-as-judge in CI is automated review, not an [automated check](/ai-coding-dictionary/automated-check); what the assertion _does_ decides the category, not where it runs.

The separation from the working agent is what makes it work. Asking the agent that wrote the code to review its own work gets you very little — the [session](/ai-coding-dictionary/session) that produced the bug also contains the reasoning that produced it, and the agent reads its own conclusions back as confirmation. A reviewer with a fresh [context window](/ai-coding-dictionary/context-window) has none of that attachment: it sees the diff the way a stranger would, which is what review depends on. A different model or a review-specific system prompt sharpens this further — different blind spots, and a system prompt scoped to what you actually care about (security, API contracts, performance) rather than a vague "look for problems".

It slots between the other review layers. Automated checks are deterministic and catch what can be asserted mechanically; [human review](/ai-coding-dictionary/human-review) is expensive and scales worst. Automated review sits in the middle: it catches judgement-shaped problems — a misleading function name, a missed edge case — at machine cost. Because it's non-deterministic, it can miss things and flag non-issues; treat it as a filter that raises the floor before a human looks, not a gate that replaces one.

_Avoid:_ "AI review" / "agent review" — too vague to distinguish from the working agent itself.

_Usage:_

"We're getting too many bad PRs from the [AFK](/ai-coding-dictionary/afk) runs."

"Add an automated review step before merge — different model, separate system prompt, scoped to security and contract changes."
