---
title: "Permission mode"
slug: "permission-mode"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Tools & Environment

# Permission mode

The permission-gating slice of an agent mode — which tool calls trigger a permission request and which run automatically.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

The permission-gating slice of an [agent mode](/ai-coding-dictionary/agent-mode) — which [tool calls](/ai-coding-dictionary/tool-call) trigger a [permission request](/ai-coding-dictionary/permission-request) and which run automatically. The original purpose of mode systems before [harnesses](/ai-coding-dictionary/harness) started bundling behavioral instructions on top.

Harnesses ship a ladder of these modes:

| Mode | Reads | Writes & shell | Typical use |
| --- | --- | --- | --- |
| Read-only / plan | Auto | Blocked | Research, planning, reviewing |
| Default | Auto | Ask | Day-to-day supervised work |
| Auto-edit | Auto | Edits auto, shell asks | Trusted repos, mechanical changes |
| "Yolo" / full-auto | Auto | Auto | [Sandboxes](/ai-coding-dictionary/sandbox), [AFK](/ai-coding-dictionary/afk) runs |

View Table

Choosing a rung is a trade between safety and interruption, and both failure modes are felt. Too tight, and you become the bottleneck: the [agent](/ai-coding-dictionary/agent) stops every few seconds for harmless reads, you click approve on autopilot, and the approvals stop meaning anything — rubber-stamping is the worst of both worlds, all the interruption with none of the protection. Too loose, and the agent edits files and runs commands you'd have wanted to see first.

The loose end is most defensible inside a sandbox, where the blast radius of a bad [tool](/ai-coding-dictionary/tool) call is contained. Outside one, most people settle on auto-approving reads and keeping a [human in the loop](/ai-coding-dictionary/human-in-the-loop) for anything irreversible.

_Usage:_

"It paused on every grep — totally killed the AFK run."

"Loosen the permission mode for read-only tools, keep prompting on writes and shell. Most permission requests on a research [session](/ai-coding-dictionary/session) are noise."

[Previous term**Permission request**](/ai-coding-dictionary/permission-request)[Next term**Agent mode**](/ai-coding-dictionary/agent-mode)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fpermission-modePermission%20mode%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Permission%20mode%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fpermission-mode)[](https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/permission-mode?author=Matt Pocock)

Copy URL
