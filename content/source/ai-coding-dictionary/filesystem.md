---
title: "Filesystem"
slug: "filesystem"
type: "dictionary"
description: "A tree of files and directories the agent reads from, writes to, and executes within — the default environment for a coding agent."
updatedAt: "2026-07-01T08:46:18.000Z"
---
A tree of files and directories the [agent](/ai-coding-dictionary/agent) reads from, writes to, and executes within — the default kind of [environment](/ai-coding-dictionary/environment) for a coding agent. [AGENTS.md](/ai-coding-dictionary/agents-md), [skills](/ai-coding-dictionary/skill), source code, build scripts, and [tool](/ai-coding-dictionary/tool) configs all live in a filesystem. When a [harness](/ai-coding-dictionary/harness) "starts in your project," it's pointing the agent at a filesystem.

The agent touches it only through [tool calls](/ai-coding-dictionary/tool-call) — reading a file, writing one, running a shell command. Nothing on disk is in the [context window](/ai-coding-dictionary/context-window) until a tool call loads it, which is what lets the agent work in a repository far larger than the window: the filesystem holds everything, the context holds only what the current task has read. Some harnesses do load the current directory's filenames into the context window by default — not the contents, just the tree — which act as [context pointers](/ai-coding-dictionary/context-pointer): the agent sees what exists and reads the files it needs.

And it's shared with you. The files the agent edits are the same ones you open in your editor and diff in git — the filesystem is the common workspace where you review what the agent did.

_Usage:_

"Why isn't it picking up my AGENTS.md?"

"It's running against a different filesystem — the [sandbox](/ai-coding-dictionary/sandbox) mounted the parent dir, not the project root. Repoint the harness."
