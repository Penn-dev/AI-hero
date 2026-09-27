---
title: "Clearing"
slug: "clearing"
type: "dictionary"
description: "Ending the current session and starting a fresh one. The next message begins with an empty session and an empty context window."
updatedAt: "2026-07-01T08:46:18.000Z"
---
Ending the current [session](/ai-coding-dictionary/session) and starting a fresh one. The next message begins with an empty session and an empty [context window](/ai-coding-dictionary/context-window). Usually user-driven.

Clearing is the cure for a polluted context. A session accumulates everything: failed attempts, wrong turns, stale [tool results](/ai-coding-dictionary/tool-result), abandoned plans. The [model](/ai-coding-dictionary/model) re-reads all of it on every [turn](/ai-coding-dictionary/turn), and bad history drags on new work. Deep into a long session the [agent](/ai-coding-dictionary/agent) gets vaguer and less obedient — instructions you gave clearly get ignored, quality slips, and prodding it to do better doesn't help, because the noise it's wading through is still in its [context](/ai-coding-dictionary/context). Clearing removes the noise.

Clearing doesn't erase the conversation. Most [harnesses](/ai-coding-dictionary/harness) keep session history on your computer, so the transcript is still there to read or resume. What's gone is the agent's working state: the model is [stateless](/ai-coding-dictionary/stateless), so the new session knows nothing the old one knew. If the session holds decisions or progress the next one will need, have the agent write a [handoff artifact](/ai-coding-dictionary/handoff-artifact) first, then start the new session by pointing at it.

Compare [compaction](/ai-coding-dictionary/compaction), which summarises the session into the new context instead of starting empty. Clearing is the blunter tool: nothing carries over, including the junk.

_Usage:_

"It's stuck looping on the failing test."

"Just clear it — start a fresh session with the plan doc and the test file. No point fighting the existing context."
