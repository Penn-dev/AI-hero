---
title: "Sandbox"
slug: "sandbox"
type: "dictionary"
description: "An isolated environment the agent runs inside — container, VM, or restricted shell. Limits the blast radius of agent actions."
updatedAt: "2026-07-01T08:46:18.000Z"
---
An isolated [environment](/ai-coding-dictionary/environment) the [agent](/ai-coding-dictionary/agent) runs inside — a container, VM, ephemeral [filesystem](/ai-coding-dictionary/filesystem), or restricted-permission shell. Limits the blast radius of agent actions: even if the agent runs destructive commands or fetches something malicious, the damage is contained. The safety substrate that makes [AFK](/ai-coding-dictionary/afk) practical.

The sandbox and the [permission mode](/ai-coding-dictionary/permission-mode) solve the same problem from opposite ends. Permissions ask before an action runs; a sandbox limits what the action can reach if it does run. Permissions need you running [in the loop](/ai-coding-dictionary/human-in-the-loop) — every prompt is an interruption — and a session that asks constantly is barely autonomous. A sandbox spends infrastructure instead of attention: the stronger the isolation, the fewer questions need asking.

Isolation comes in grades:

| Grade | What it is | What it contains |
| --- | --- | --- |
| Restricted shell | OS-level confinement around each command | Writes outside the project, network access |
| Container | Fresh filesystem, no credentials mounted, discarded after | Anything the agent does to its own machine |
| VM / cloud | A separate machine entirely, often provided by the harness | Everything, including kernel-level escapes |

What no sandbox contains: actions that leave it legitimately. An agent with your git credentials can push; one with network access can call production APIs. Decide what crosses the boundary before deciding how thick to make it.

_Usage:_

"I want to let it run [bypass-permissions](/ai-coding-dictionary/agent-mode) overnight but I'm not ready for that."

"Put it in a sandbox — fresh container, no credentials mounted, no network out. Worst case it nukes its own filesystem and you discard the container."
