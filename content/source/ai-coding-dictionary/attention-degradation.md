---
title: "Attention degradation"
slug: "attention-degradation"
type: "dictionary"
description: "As a session grows, each token's attention budget spreads across more competitors; signal on meaningful relationships shrinks."
updatedAt: "2026-07-01T08:46:18.000Z"
---
As a [session](/ai-coding-dictionary/session) grows, each [token](/ai-coding-dictionary/token)'s [attention budget](/ai-coding-dictionary/attention-budget) is spread across more competitors. The signal on any one [meaningful relationship](/ai-coding-dictionary/attention-relationship) shrinks; noise from irrelevant [context](/ai-coding-dictionary/context) crowds in. Same [model](/ai-coding-dictionary/model), same [parameters](/ai-coding-dictionary/parameters) — just more mouths to feed from the same plate. Cause of the smart zone / dumb [zone effect](/ai-coding-dictionary/smart-zone).

It presents as the model getting worse mid-session: constraints it followed for an hour start slipping, it re-asks things it was told, it writes code that ignores a file it read earlier. Nothing about the model changed — the only variable is how much context it's now attending over.

It's gradual, which is what makes it hard to catch from inside the session. There's no error and no threshold; each [turn](/ai-coding-dictionary/turn) is only slightly worse than the last, and by the time the slips are obvious you've been in the dumb zone for a while.

You recover by removing context, not adding more. Re-pasting the ignored instruction adds another competitor to the same crowded window and helps only briefly. What works: [clear](/ai-coding-dictionary/clearing) and reload only what the task needs, or [compact](/ai-coding-dictionary/compaction), or [hand off](/ai-coding-dictionary/handoff) to a fresh session. Treat declining instruction-following as a signal about context length, not about the model.

_Usage:_

"It's deep in the dumb zone — inventing generics that aren't in the type file."

"Attention degradation. The type definitions are still in context, but the signal on them is buried under everything we've added since. Clear and reload."
