---
title: "v1.2: /wait-what, /writing-for-agents, Claude Code Plugin, and more"
slug: "skills-changelog-v12-wait-what-writing-for-agents-claude-code-plugin-and-more"
type: "post"
description: "Explore Matt Pocock's Skills v1.2.0: new documentation, Claude Code integration, the Wait What skill for Opus verbosity, and more."
updatedAt: "2026-08-05T15:43:10.190Z"
---
Version 1.2 of my skills is out. It ships the skills as a Claude Code plugin, adds Codex metadata to every skill, and puts the whole set behind a documentation site at [aihero.dev/skills](/skills). Three skills are new to the plugin, one is renamed, and six are gone.

The full changeset is in the [v1.2.0 release](https://github.com/mattpocock/skills/releases/tag/v1.2.0). This page covers what changes for you.

## [Codex metadata on every skill](#codex-metadata-on-every-skill)

Each `SKILL.md` now has an `agents/openai.yaml` beside it. The sidecar carries the Codex UI metadata (`interface.display_name`, `interface.short_description`), so the set works in both harnesses without generated copies.

The important line in that file is `policy.allow_implicit_invocation: false`. It is the Codex analog of `disable-model-invocation: true`. Every user-invoked skill now carries it, so Codex keeps that skill out of the agent's context until you type `$skill`. Before this release, the user-invoked / model-invoked split held in Claude Code but not in Codex.

`AGENTS.md` is a symlink to `CLAUDE.md`, so Codex reads the same repo instructions.

## [Documentation at aihero.dev/skills](#documentation-at-aiherodevskills)

![The new documentation site at aihero.dev/skills](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_3840/f_auto/q_auto/v1785944102/ai-hero-images/dj54xx1bhly29e6vwibz?_a=BAVMn6DY0)

Start at `/skills` and read the groupings. The main flow runs `/grill-with-docs` → `/to-spec` → `/to-tickets` → `/implement` → `/code-review`. The left panel is a full reference of every skill.

Each page holds a **Common questions** section, sourced from the wiki of questions people actually ask me, and an **It's working if** section. First use of a term links to the AI Coding Dictionary, the ticket link, for example, goes to my definition of a ticket. You can read the docs to learn the skills, or to learn how AI coding works.

## [Breaking: `/writing-great-skills` → `/writing-for-agents`](#breaking-writing-great-skills-writing-for-agents)

Reinstall under the new name. There is no alias, and the old name is gone.

The rename follows the scope. The reference now covers any document an agent consumes, skills, `AGENTS.md`, `CLAUDE.md`, and docs reached by a pointer, not just skills. Use it to pull an overloaded `AGENTS.md` apart into skills, which stops the front-loading.

Three structural changes come with it:

- `GLOSSARY.md` is merged into `SKILL.md`. One authoritative treatment per term.
- The skill-only mechanics (frontmatter, model- vs user-invoked, router skills, the invocation cut) move to `SKILL-MECHANICS.md`.
- The skill is model-invoked. It fires when you create or edit a skill, or modify `AGENTS.md` / `CLAUDE.md`.

The pruning section gains one new term, **cache**. The environment is a source of truth: `package.json` scripts, config files, the directory layout, `--help` output. A document that restates them is a cache of a lookup, and it earns its load only when the lookup is expensive. Cache what the agent cannot find by looking, the unwritten convention, the reason behind a choice, the edge case no config confesses. Leave the one-file, one-command lookups to the environment, where they cannot go stale.

## [New: `/wait-what`](#new-wait-what)

A one-word corrective for model verbosity. Type it the moment a message fails to land. The agent re-pitches: a little context, ASD-STE100 Simplified Technical English, and the ubiquitous language from your `CONTEXT.md`. User-invoked, three lines long.

The mechanism is the name. Concision skills fail by growing — a 400-line skill still leaves the model verbose — so this one is a single precise leading word and nothing else. Names that describe the _output_ (`/tldr`, `/no-fluff`) make the model clip words and lose you further. Naming the _listener's_ state asks for both halves at once: fewer words, **and** the context you were missing.

It repairs one message. It does not prevent the next one. The cure for jargon is a shared language built upfront with `/grill-with-docs`. Reach for `/wait-what` when you do not have one yet.

## [New: `/wizard`](#new-wizard)

![Interactive bash wizard running in terminal with 'ready to start' prompt](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_3840/f_auto/q_auto/v1785944103/ai-hero-images/tjf1n5eaksf50ujr3smh?_a=BAVMn6DY0)

`/wizard` graduates out of `in-progress/` into the **Engineering** bucket, and is model-invoked.

It generates an interactive bash script that walks a human through a manual procedure, third-party setup, a one-off migration, an A→B state transition. The script opens each URL, says what to click, captures the values you paste in, and writes them into `.env` files and GitHub Actions secrets. It is a deterministic script, so no secret you type reaches an agent.

The UX is pre-solved by the bundled `template.sh`: progress with time remaining, confirmation gates, cross-platform URL opening (including WSL), hidden secret entry, idempotent `.env` upserts, `gh secret` / `gh variable` writes with graceful degradation, and a closing skip summary. Everything above the `STAGES` marker is a fixed library and is never hand-edited. The skill's job is to scope the procedure and author its stages.

Model-invocation means the agent reaches for `/wizard` the moment it hits a step only a human can perform, instead of dumping numbered instructions into the chat. Typing `/wizard` works exactly as before. The description names four trigger branches (provisioning infrastructure, setting up credentials or CI secrets, walking an unfamiliar third-party dashboard, a one-off migration or cutover) and one explicit non-trigger: do not invoke it for steps the agent can perform itself. Work an agent can do, an agent should do. `/wizard` is for the clicks, approvals and dashboard trips you would not hand to one.

## [New: `/to-questionnaire`](#new-to-questionnaire)

`/to-questionnaire` graduates out of `in-progress/` into the **Productivity** bucket.

It turns a decision you cannot answer alone into a Markdown questionnaire for the one person who can. Fill it in async, or work through it together in a meeting. I built it during a `/wayfinder` session on a garden office: the agent was grilling me, but the person to ask was my wife. The questionnaire went into a Google Doc, we worked through it, and the answers came back to the agent.

Its defining move is that it grills you about the **send**, not the subject. A normal grilling session interrogates the topic, which is exactly what you cannot answer here. So the interview asks only who the questionnaire goes to and what you need back, then aims every question at the gap between the two.

`/ask-matt` frames it as the inverse of `/grill-me`: mine someone else, not yourself.

## [Changed: `/grilling` asks in rounds](#changed-grilling-asks-in-rounds)

`/grilling` moves from one question at a time to round by round. The same 13 questions land in about 3 rounds instead of 13 turns.

The skill maps the work as a **design tree**: every decision branches into the decisions that hang off it. The **frontier** is every decision whose prerequisites are already settled, the questions it can ask now without guessing at answers it has not heard. It asks the whole frontier as one numbered round, then recomputes the frontier from your answers and asks the next round. A question whose answer depends on another question still open belongs to a later round. The session ends when the frontier is empty.

Facts the environment can answer go to sub-agents, so research never blocks a round. A running exploration is an unsettled prerequisite: only the questions downstream of it wait, and the rest of the frontier is asked now. The decisions stay yours.

Every question in a round uses one fixed shape:

```txt
❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

A round reads as a scannable numbered list, with each recommendation separated from its question. You answer by number ("Q1 agree, Q2 agree, Q3 change this"), which suits dictation.

`/grill-me`, `/grill-with-docs` and `/triage` run the frontier a round at a time too. The opt-out for one question at a time is unchanged: add a line to your global `CLAUDE.md`.

`/grilling` is also reworded for general use. "This plan" becomes "this", "enact the plan" becomes "act on it", and "exploring the codebase" becomes "exploring the environment". The technique is unchanged. It now reads as a stress-test of any plan, decision, or idea.

## [Changed: `/prototype` produces one shareable HTML file](#changed-prototype-produces-one-shareable-html-file)

The logic branch now produces a single self-contained file, plain HTML, CSS and JS, no build and no server, instead of a terminal app. A non-developer opens it by double-click and drives it in their own domain language: a labelled state panel, free-play buttons that are always available, and tabbed **guided walkthroughs**, each a scenario with its ordered buttons underneath. The portable pure-logic module still lifts into the real code. The HTML shell is the throwaway.

Throwaway no longer means deleted. The `/prototype` output is captured as runnable evidence on a `prototype/<name>` branch off main, with a context pointer to it on the implementation issue. Main keeps only the validated decision, and the exploration stays findable. The answer (verdict plus question) is still captured in an issue, ADR or commit.

## [Changed: `/wayfinder` tickets are decision tickets](#changed-wayfinder-tickets-are-decision-tickets)

People read a `/wayfinder` ticket as an ordinary implementation ticket, a slice of a build to execute. `/wayfinder` uses them as **decision tickets**: questions whose resolution is a decision. The skill description, its opening line, the README blurbs and the docs page all introduce the term now. "Ticket" stays the everyday word once the term is established, and `CONTEXT.md` records **Decision ticket** as a domain term.

Research tickets are no longer parked for a separate session. Research stays a real ticket type, because it is a genuine shared blocker that downstream decisions hang on. What changes is how it resolves. Research is AFK, so charting does not stop to read it: after creating the tickets, the charting session fires a `/research` subagent for each research ticket and burns them down in parallel, capturing findings on a `research/<name>` branch with a context pointer. Research tickets are the one exception to one ticket per session.

## [Changed: `/ask-matt` routing](#changed-ask-matt-routing)

The router gains **phase boundaries**. A phase is a chunk of work inside a session (the grilling, the implementation, the QA), and the boundary between two of them is where you decide what to do with the context you built. The old two-bullet section is now a decision tree with all five options in order: **continue**, `/clear`, `/handoff`, **subagent**, `/compact`. The reasoning is disclosed in `PHASE-BOUNDARIES.md`. Three fixes come with it:

- **`/handoff` was oversold.** It is narrow. You need it only when something has to _travel_, a new harness, a new directory, a colleague, or a side task forked mid-phase.
- **`/compact` is the default, not the first reach.** It sits at the bottom of the tree. Starting there gives you a session that is confidently wrong about whatever the summary flattened.
- **Two branches were missing.** Rule out **continue** first, it is the only move that keeps the conversation as a primary source rather than a summary of one. A **subagent** handles anything scoped tightly enough to run AFK.

Context hygiene's escape hatch now says `/compact` rather than `/handoff`, and the smart zone figure moves from ~120k to ~150k tokens.

`/wayfinder` routing fixes the two mistakes people make most with the heaviest flow. **Over-reaching for it**: `/wayfinder` is slower and denser than a single grill, so it is reserved for the idea that genuinely will not fit one session. A well-scoped feature belongs on `/grill-with-docs`. **Losing the way at the handoff**: when the map clears, `/wayfinder` hands off, it does not build. Merge onto the main flow at `/to-spec`, which collapses the map's linked decisions into a buildable plan. Go straight to `/implement` only when the effort turned out genuinely small.

`/grilling` and `/resolving-merge-conflicts` were absent from the router and are now in it. `/grill-me` splits from `/grill-with-docs` on whether you are in a working directory.

## [Changed: smaller items](#changed-smaller-items)

- **`/improve-codebase-architecture`** gains a YAGNI scoping filter on its Explore step. It no longer scans the repo evenly. Name a direction and it takes it; otherwise it reads the last ~20 commit messages and biases exploration toward actively-developed paths. A deepening opportunity in code nobody touches is a refactor you never cash in, so the report stops tidying dormant corners.
- **`/setup-matt-pocock-skills`** is friendlier. Triage labels are asked about only when `/triage` is installed, and then as one recommended-yes question. External PRs as a request surface is no longer a question, the flag ships defaulted off. Domain docs default to single-context unless the repo shows monorepo signals. Local-markdown tickets are one file per ticket under `.scratch/<feature>/issues/<NN>-<slug>.md`, and the spec file is `spec.md`.
- **The `/to-prd` → `/to-spec` rename is finished.** "Spec" is the only term in the shipped text. `/to-spec` drops the "you may know this as a PRD" opener, `/code-review` talks about the originating issue/spec, and the GitHub and GitLab tracker templates stop writing "PRDs" into every repo they touch.

## [Removed: six skills](#removed-six-skills)

None of the six was in the Claude Code plugin, but all six were installable through [skills.sh](https://skills.sh/mattpocock/skills), which serves every skill in the repo. Four are absorbed by a skill that does the job better:

- **`/ubiquitous-language`** → **`/domain-modeling`**, which maintains the whole domain model rather than dumping a glossary from one conversation.
- **`/design-an-interface`** → **`/codebase-design`**. Nothing is lost: the design-it-twice technique ships inside that skill as `DESIGN-IT-TWICE.md`.
- **`/qa`** → **`/triage`** and **`/to-tickets`**.
- **`/request-refactor-plan`** → **`/to-spec`** and **`/improve-codebase-architecture`**.

Two were only ever mine, tied to my own machine. The `personal/` bucket goes with them: **`/edit-article`** and **`/obsidian-vault`**.

`skills/deprecated/` stays as an empty bucket. `skills/in-progress/` is unchanged, and is now described for what it is: a beta channel, published on purpose, installable one skill at a time through skills.sh.
