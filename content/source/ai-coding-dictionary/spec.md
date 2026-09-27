---
title: "Spec"
slug: "spec"
type: "dictionary"
description: "A handoff artifact describing a multi-session piece of work — what's being built, not how each session does its share. Made of tickets."
updatedAt: "2026-07-01T08:46:18.000Z"
---
A [handoff artifact](/ai-coding-dictionary/handoff-artifact) describing a multi-[session](/ai-coding-dictionary/session) piece of work — what's being built, not how each session does its share. Mutates as work progresses. Made of [tickets](/ai-coding-dictionary/ticket).

The spec exists because sessions are disposable and big work isn't. Anything that takes more than one [context window](/ai-coding-dictionary/context-window) of effort needs a home outside the [context](/ai-coding-dictionary/context) — somewhere in the agent's [environment](/ai-coding-dictionary/environment) that survives [clearing](/ai-coding-dictionary/clearing), whether that's a file in the repo, a GitHub issue, or an issue tracker the agent can reach. The spec is that home: the goal, the constraints, the decisions made so far, and the list of tickets with their status. Any fresh session can read it and know where the work stands without inheriting the previous session's accumulated noise.

Specs come in recognisable styles, mostly inherited from how teams already write things down. A _product requirements document_ (PRD) leans toward the user-facing what and why — features, behaviour, acceptance criteria. A _design doc_ or _RFC_ leans technical — the chosen approach, the alternatives rejected, the trade-offs. At the small end, a plain `plan.md` with a checklist of tickets does the same job for a multi-session feature. The style matters less than the role: for the [agent](/ai-coding-dictionary/agent), each of these is the same thing — the durable statement of intent it reads at the start of every session.

_Usage:_

"Should this all be one session?"

"No, write it up as a spec — break it into tickets, run each one in its own session. Trying to do the whole thing in a single context will hit the [dumb zone](/ai-coding-dictionary/smart-zone) before you're halfway."
