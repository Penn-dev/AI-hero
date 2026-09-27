# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues in `Penn-dev/AI-hero`. Use the `gh` CLI for all operations.

Use the configured tracker within the authorization already given for the target and action. Request approval for additional external writes when needed; configuration or content approval alone is not publication permission. Read operations do not require per-step approval.

## Conventions

- **Create an issue**: write the multi-line body to a uniquely named UTF-8 temporary file using the available file-editing tool, run `gh issue create --title "..." --body-file <path>`, then remove the temporary file. This is PowerShell 7 compatible and avoids Bash heredoc syntax.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply or remove labels**: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repository from `git remote -v`; `gh` does this automatically when run inside this checkout.

## Pull requests as a triage surface

**PRs as a request surface: no.**

When changed to `yes`, external PRs run through the same labels and states as issues, using the corresponding `gh pr` commands. GitHub shares one number space across issues and PRs, so resolve an ambiguous `#42` with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue after confirming that the current authorization covers that external write.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Wayfinding operations

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes, Decisions-so-far, and Fog sections.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue. Where sub-issues are unavailable, add it to a task list in the map body and put `Part of #<map>` at the top of the child body. Use a `wayfinder:<type>` label (`research`, `prototype`, `grilling`, or `task`).
- **Blocking**: use GitHub's native issue dependencies. Where unavailable, use a `Blocked by: #<n>, #<n>` line at the top of the child body.
- **Frontier**: choose the first open child in map order that has no open blocker and no assignee.
- **Claim**: `gh issue edit <n> --add-assignee @me`.
- **Resolve**: comment with the answer, close the child issue, then append a context pointer to the map's Decisions-so-far section.
