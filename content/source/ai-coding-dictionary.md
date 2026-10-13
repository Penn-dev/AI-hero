---
title: "The vocabulary of AI coding, in plain English."
slug: "ai-coding-dictionary"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

AI Hero · Dictionary

# The vocabulary of AI coding,  
 in plain English.

Skimmable definitions for the terms that make agentic coding click. Search 71 entries below, or jump into a section.

[5,054·mattpocock/dictionary-of-ai-coding](https://github.com/mattpocock/dictionary-of-ai-coding)

- [#the-model](#the-model)
- [#sessions,-context-windows-&-turns](#sessions-context-windows-turns)
- [#tools-&-environment](#tools-environment)
- [#failure-modes](#failure-modes)
- [#handoffs](#handoffs)
- [#memory-and-steering](#memory-and-steering)
- [#patterns-of-work](#patterns-of-work)

Search the dictionary...

Search the dictionary...

Sections

- [#The Model16](#the-model)
- [#Sessions, Context Windows & Turns8](#sessions-context-windows-turns)
- [#Tools & Environment10](#tools-environment)
- [#Failure Modes9](#failure-modes)
- [#Handoffs9](#handoffs)
- [#Memory and Steering6](#memory-and-steering)
- [#Patterns of Work13](#patterns-of-work)

## The Model

16 terms

[AIA moving label, not a technology. Points at whatever computers can newly, impressively do — right now, large language models.](/ai-coding-dictionary/ai)[ModelThe parameters. Stateless — does next-token prediction and nothing else. Cannot do anything agentic on its own.](/ai-coding-dictionary/model)[ParametersThe numbers inside a model — often billions — tuned during training. Everything the model knows lives in them. Also called weights.](/ai-coding-dictionary/parameters)[TrainingThe process that sets a model's parameters by exposing it to vast amounts of text and adjusting to improve next-token prediction.](/ai-coding-dictionary/training)[InferenceRunning a trained model to generate output — what happens on every model provider request. Parameters stay fixed.](/ai-coding-dictionary/inference)[EffortA dial for how much reasoning the model does before it answers. More effort spends more output tokens for a better shot at hard problems.](/ai-coding-dictionary/effort)[TokenThe atomic unit a model reads and writes. Roughly word-sized but not exactly. Context window size, cost, and latency all count tokens.](/ai-coding-dictionary/token)[Next-token predictionWhat the model actually does. Samples one next token from the context, appends it, and runs again. Its only mode of operation.](/ai-coding-dictionary/next-token-prediction)[Non-determinismThe same input can produce different output. A property of how models generate text and how providers serve requests.](/ai-coding-dictionary/non-determinism)[Model providerWhatever serves a model for inference. Usually remote (Anthropic, OpenAI, Google), but can also be local (Ollama, llama.cpp).](/ai-coding-dictionary/model-provider)[HarnessEverything around the model that turns it into an agent: tools, system prompt, context-window management, permissions, hooks.](/ai-coding-dictionary/harness)[Model provider requestOne round-trip from the harness to the model provider. The harness sends context; the provider returns one response.](/ai-coding-dictionary/model-provider-request)[Input tokensTokens the harness sends on each model provider request. Billed at a lower rate than output tokens.](/ai-coding-dictionary/input-tokens)[Output tokensTokens the model generates back. Billed at a higher rate than input tokens, since they cost more compute to produce.](/ai-coding-dictionary/output-tokens)[Prefix cacheThe provider-side store that lets consecutive requests skip re-processing a shared prefix, billing those tokens at a lower rate.](/ai-coding-dictionary/prefix-cache)[Cache tokensInput tokens the provider has cached from a previous request via its prefix cache, billed at a much lower rate.](/ai-coding-dictionary/cache-tokens)

## Sessions, Context Windows & Turns

8 terms

[StatelessCarries no information forward. The model is stateless across requests; an agent is stateless across sessions by default.](/ai-coding-dictionary/stateless)[ContextThe relevant information the agent has access to right now — what the agent knows that's pertinent to the task.](/ai-coding-dictionary/context)[Context windowEverything the model sees on each model provider request. Finite, model-specific, the only surface through which the model perceives.](/ai-coding-dictionary/context-window)[StatefulCarries information forward. Sessions are stateful across turns; agents can be made stateful across sessions via a memory system.](/ai-coding-dictionary/stateful)[AgentA model harnessed with tools, a system prompt, and a context window, that takes turns with a user. The model in motion.](/ai-coding-dictionary/agent)[System promptThe instructions the harness prepends to every model provider request — the agent's standing brief. Usually stable across a session.](/ai-coding-dictionary/system-prompt)[SessionOne bounded run of interaction with an agent. Starts empty, accumulates, ends when cleared, closed, or compacted into a fresh session.](/ai-coding-dictionary/session)[TurnOne user message plus everything the agent does in response, up until it yields back to the user. Contains one or more provider requests.](/ai-coding-dictionary/turn)

## Tools & Environment

10 terms

[EnvironmentThe world the agent acts on — anything outside the harness that the agent perceives via tool results and changes via tool calls.](/ai-coding-dictionary/environment)[FilesystemA tree of files and directories the agent reads from, writes to, and executes within — the default environment for a coding agent.](/ai-coding-dictionary/filesystem)[ToolA function the harness exposes for the agent to call — Read, Write, Bash, Search. How an agent perceives and acts on the environment.](/ai-coding-dictionary/tool)[Tool callThe model's output naming a tool and its arguments — just structured text. The harness has to read it and execute.](/ai-coding-dictionary/tool-call)[Tool resultWhat the harness sends back after executing a tool call — file contents, output, or error. The agent's only view of the environment.](/ai-coding-dictionary/tool-result)[MCPA protocol for plugging external tool servers into a harness — how an agent gets tools beyond what the harness ships with.](/ai-coding-dictionary/mcp)[Permission requestWhat the harness shows the user before executing a tool call that isn't pre-approved. The mechanism for putting a human in the loop.](/ai-coding-dictionary/permission-request)[Permission modeThe permission-gating slice of an agent mode — which tool calls trigger a permission request and which run automatically.](/ai-coding-dictionary/permission-mode)[Agent modeA preset bundling a permission mode with behavioral instructions injected into the system prompt. Can flip mid-session.](/ai-coding-dictionary/agent-mode)[SandboxAn isolated environment the agent runs inside — container, VM, or restricted shell. Limits the blast radius of agent actions.](/ai-coding-dictionary/sandbox)

## Failure Modes

9 terms

[SycophancyConfidently agreeable model output. Caused by training that shaped the model to favor answers humans liked — including agreement.](/ai-coding-dictionary/sycophancy)[HallucinationConfidently-wrong model output. Two flavors: factuality (invented facts) and faithfulness (drift from loaded context).](/ai-coding-dictionary/hallucination)[Parametric knowledgeWhat the model knows from training, stored in its parameters. Frozen at training time. Counterpart to contextual knowledge.](/ai-coding-dictionary/parametric-knowledge)[Knowledge cutoffThe date past which a model has no parametric knowledge. Post-cutoff libraries and APIs are fabrication traps unless docs are loaded.](/ai-coding-dictionary/knowledge-cutoff)[Contextual knowledgeFacts the agent can read directly from the context right now. Counterpart to parametric knowledge.](/ai-coding-dictionary/contextual-knowledge)[Attention relationshipThe pairing between two tokens — meaningful pairs influence each other more than unrelated ones. A context of N tokens has ~N² of these.](/ai-coding-dictionary/attention-relationship)[Attention budgetEach token has a finite amount of influence to distribute across the rest of the context. Per-token, doesn't grow when context does.](/ai-coding-dictionary/attention-budget)[Attention degradationAs a session grows, each token's attention budget spreads across more competitors; signal on meaningful relationships shrinks.](/ai-coding-dictionary/attention-degradation)[Smart zoneEarly in a session the agent is sharp and focused. As the session grows it drifts into a dumb zone: sloppier, forgetful, more mistakes.](/ai-coding-dictionary/smart-zone)

## Handoffs

9 terms

[ClearingEnding the current session and starting a fresh one. The next message begins with an empty session and an empty context window.](/ai-coding-dictionary/clearing)[HandoffTransferring agent context from one session to another, with no return path. Carry mechanism varies — artifact, compaction, others.](/ai-coding-dictionary/handoff)[Primary sourceThe thing itself — code, transcripts, raw data. Complete and authoritative, but expensive to load into context.](/ai-coding-dictionary/primary-source)[Secondary sourceAn account of a primary source, one step removed — summaries, docs, compaction summaries. Cheap to load, lossy by construction.](/ai-coding-dictionary/secondary-source)[Handoff artifactA document used as the carry mechanism for a handoff — written by one session to be read by another.](/ai-coding-dictionary/handoff-artifact)[SpecA handoff artifact describing a multi-session piece of work — what's being built, not how each session does its share. Made of tickets.](/ai-coding-dictionary/spec)[TicketA handoff artifact scoping one session of work. Stands alone or hangs off a spec. Can block or be blocked by sibling tickets.](/ai-coding-dictionary/ticket)[CompactionA handoff done in-memory: the previous session's history is summarised and seeds a fresh session. Lossy — detail traded for headroom.](/ai-coding-dictionary/compaction)[AutocompactCompaction triggered automatically by the harness when the context window approaches full.](/ai-coding-dictionary/autocompact)

## Memory and Steering

6 terms

[Memory systemA system that attempts to make an agent stateful across sessions by persisting to the environment and reloading at session start.](/ai-coding-dictionary/memory-system)[AGENTS.mdA file in the environment that the harness loads into the context window at session start — the project's standing brief to the agent.](/ai-coding-dictionary/agents-md)[Progressive disclosureLoading only the context an agent needs right now, with context pointers to the rest. Borrowed from UI design.](/ai-coding-dictionary/progressive-disclosure)[Context pointerA mention in one document that points to another, so the agent can pull it into context only when the task calls for it.](/ai-coding-dictionary/context-pointer)[SkillA teachable capability bundled as a unit — kept out of the context window until a context pointer pulls it in for the task at hand.](/ai-coding-dictionary/skill)[SubagentAn agent spawned by another agent via a tool call. Runs in its own session, reports a single tool result. Cannot spawn further subagents.](/ai-coding-dictionary/subagent)

## Patterns of Work

13 terms

[Human-in-the-loopA working pattern where one or more humans pair with the agent during a session — reviewing, redirecting, or collaborating in real time.](/ai-coding-dictionary/human-in-the-loop)[AFKA working pattern where the user kicks off a session and leaves the agent to run unattended (away from keyboard).](/ai-coding-dictionary/afk)[Automated checkA deterministic verification that runs in the environment — tests, type checks, lints, build, pre-commit hooks. Pass/fail, no judgement.](/ai-coding-dictionary/automated-check)[Automated reviewAn agent reviewing another agent's work, often with a different model or system prompt. Non-deterministic: it forms a judgement.](/ai-coding-dictionary/automated-review)[Human reviewThe user reading the code the agent produced and forming a judgement on it. Reading the diff counts; reading the summary doesn't.](/ai-coding-dictionary/human-review)[Vibe codingA working pattern where the user accepts the agent's code without human review. The diff is treated as opaque.](/ai-coding-dictionary/vibe-coding)[Design conceptThe shared understanding of what's being built, held in common between user and agent but separate from any asset.](/ai-coding-dictionary/design-concept)[GrillingA technique for developing a design concept: the agent interviews the user Socratically, one decision at a time.](/ai-coding-dictionary/grilling)[PrototypingHaving the agent build a quick, rough version when conversation is too low-fidelity and you need a real artifact to talk about.](/ai-coding-dictionary/prototyping)[DXDeveloper experience: how easy a codebase and its toolchain make it for humans to do good work — docs, feedback speed, errors.](/ai-coding-dictionary/dx)[AXAgent experience: how well the environment is set up for an agent to do good work — checks, architecture, and free context.](/ai-coding-dictionary/ax)[Software factoryA system of work where triggers, not humans, start agent sessions, so more work runs AFK and HITL time is saved for what needs it.](/ai-coding-dictionary/software-factory)[Dark factoryA codebase, or part of one, where a software factory writes the code and no human ever reviews it.](/ai-coding-dictionary/dark-factory)

## Want more than vocabulary?

Join AI Hero for practical skills, thinking on AI engineering, and resources that keep you ahead of the curve.

First Name

Email*

Get AI Hero updates

No spam. Unsubscribe anytime.
