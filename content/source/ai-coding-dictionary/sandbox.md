---
title: "Sandbox"
slug: "sandbox"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI Coding Dictionary](/ai-coding-dictionary)

Tools & Environment

# Sandbox

An isolated environment the agent runs inside — container, VM, or restricted shell. Limits the blast radius of agent actions.

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

An isolated [environment](/ai-coding-dictionary/environment) the [agent](/ai-coding-dictionary/agent) runs inside — a container, VM, ephemeral [filesystem](/ai-coding-dictionary/filesystem), or restricted-permission shell. Limits the blast radius of agent actions: even if the agent runs destructive commands or fetches something malicious, the damage is contained. The safety substrate that makes [AFK](/ai-coding-dictionary/afk) practical.

The sandbox and the [permission mode](/ai-coding-dictionary/permission-mode) solve the same problem from opposite ends. Permissions ask before an action runs; a sandbox limits what the action can reach if it does run. Permissions need you running [in the loop](/ai-coding-dictionary/human-in-the-loop) — every prompt is an interruption — and a session that asks constantly is barely autonomous. A sandbox spends infrastructure instead of attention: the stronger the isolation, the fewer questions need asking.

Isolation comes in grades:

| Grade | What it is | What it contains |
| --- | --- | --- |
| Restricted shell | OS-level confinement around each command | Writes outside the project, network access |
| Container | Fresh filesystem, no credentials mounted, discarded after | Anything the agent does to its own machine |
| VM / cloud | A separate machine entirely, often provided by the harness | Everything, including kernel-level escapes |

View Table

What no sandbox contains: actions that leave it legitimately. An agent with your git credentials can push; one with network access can call production APIs. Decide what crosses the boundary before deciding how thick to make it.

_Usage:_

"I want to let it run [bypass-permissions](/ai-coding-dictionary/agent-mode) overnight but I'm not ready for that."

"Put it in a sandbox — fresh container, no credentials mounted, no network out. Worst case it nukes its own filesystem and you discard the container."

[Previous term**Agent mode**](/ai-coding-dictionary/agent-mode)[Next term**Sycophancy**](/ai-coding-dictionary/sycophancy)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.

**Share**

[](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FsandboxSandbox%20%20by%20%40mattpocockuk)[](https://bsky.app/intent/compose?text=Sandbox%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Fsandbox)[](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/sandbox?author=Matt Pocock>)

Copy URL
