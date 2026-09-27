# Domain Docs

How the engineering skills should consume this project's domain documentation when exploring the codebase.

## Read when relevant to the current question

- **`CONTEXT.md`** at the project root.
- **`docs/adr/`** for architecture decisions that touch the area being changed.

If either location does not exist, proceed silently. Do not require domain documents upfront. Create them lazily through the domain-modeling workflow when terminology or a consequential decision actually needs to be recorded.

## File structure

This is a single-context project:

```text
/
├── CONTEXT.md
├── docs/adr/
└── app/
```

## Use the glossary's vocabulary

When output names a domain concept in an issue title, proposal, hypothesis, or test, use the term defined in `CONTEXT.md`. A missing glossary entry does not by itself require creating one.

## Flag ADR conflicts

If proposed work contradicts an existing ADR, surface the conflict explicitly rather than silently overriding it.
