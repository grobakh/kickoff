---
name: todo
description: Plan and execute a task with a resumable checklist and log
argument-hint: TASK=<short-name> $META_DIR=".meta"
---

You are working in a repository that may define additional rules in AGENTS.md.
The current task identifier is `$TASK`.

Your goals are to:
- Understand general rules and per project rules.
- Understand project and load project context.
- Understand the task and scope.
- Create or reuse a detailed, **resumable** plan for `$TASK`.
- Execute the plan step by step.
- Log progress and optionally stage changes, but **never commit** without explicit instruction.

## 0. Meta directory and context

1. Determine the meta directory as in kickoff:
   - Prefer `.meta/` if it exists, else create `.meta/`.
   - Call it `$META_DIR`.

2. Read all relevant `AGENTS.md` and then load, if present:
   - `$META_DIR/PROJECT.md`
   - `$META_DIR/CODESTYLE.md`
   - `$META_DIR/PLAN-$TASK.md`
   - `$META_DIR/LOG.md`

3. If `$META_DIR/PROJECT.md` or `$META_DIR/CODESTYLE.md` are missing:
   - EXECUTE a `kickoff` prompt before CONTINUE.

4. Load context from `$META_DIR` files. Load context from other folders/files mentioned in them.
5. load context from documentiion mentioned in `$META_DIR/PROJECT.md`, and if not enough Recursively scan documentation directories if they exist (.doc/, .spec/)

## 1. Clarify the task before planning

Before writing or modifying any plan for `$TASK`:

1. Ask me targeted questions to clarify:
   - What exactly needs to be done for `$TASK`.
   - Success criteria / acceptance conditions.
   - Scope boundaries (what is in / out).
   - Constraints (performance, backwards compatibility, deadlines, tech limitations).
   - Any specific files, modules, or tickets/issues you should consider.

2. Do **not** generate or run a plan until you have this information or get YOLO signal(y).

## 2. Create or update a detailed, resumable plan

The plan for `$TASK` lives in `$META_DIR/PLAN-$TASK.md` as a checklist.
Scan for the almost the similar names of the Task.

1. If the file does not exist, create it with at least this structure:

   ```markdown
   # Plan for $TASK

   Status: in-progress

   ## Context
   - Short description of the task, constraints, and any references.

   ## Steps

   - [ ] Step 1 – …
   - [ ] Step 2 – …
   - [ ] Step 3 – …
   ```
2. If the file exists:
  - Read its current content.
  - Preserve completed steps (marked [x]).
  - Refine or extend steps if needed, but avoid destroying useful history.
  - Ensure each step is:
    - Small enough to be completed in a focused chunk.
    - Concrete and testable.
    - Ordered.
3. At any time, the plan must allow you to resume work simply by:
  - Finding the first [ ] step and continuing from there.

## 3. Execute the plan step by step (resumable)

1. Determine the current step as the first checklist item with [ ] in `$META_DIR/PLAN-$TASK.md`.

2. For the current step:

  - Use the understanding in `$META_DIR/PROJECT.md` and `$META_DIR/CODESTYLE.md` to choose where to make changes and how to name things.

  - Prefer existing patterns for:

   - Folder structure.

   - File naming.

   - Code style (as implied by Prettier/ESLint/tsconfig/etc.).

  - Make the necessary code changes for this step.

3. After completing a step:
  - Update `$META_DIR/PLAN-$TASK.md` to mark that step as [x].
  - Append an entry to `$META_DIR/LOG.md` including:
   - Date/time (if practical).
   - TASK=$TASK.
   - Step identifier or short description.
   - Files touched and a short summary of the change.
     Example:
   ```markdown

- [YYYY-MM-DD] TASK=$TASK – Step 2: Implemented FooBarService in
  `src/services/fooBarService.ts`, updated `src/routes/foo.ts`.
   ```

4. Git behaviour:
  -  You may run git status, git diff, and git add to stage the changes related to the current step.
  -  Do not run git commit, git commit --amend, git rebase, git tag, or git push
unless I explicitly ask you to.
  - When staging, prefer to only stage files that actually belong to the step you just completed.

5. Repeat:
  - Move to the next [ ] step.
  - Implement it, update the plan and log, and stage changes as above.
6. If the session is interrupted and this prompt is invoked again with the same $TASK:
  - Re-read `$META_DIR/PLAN-$TASK.md` and `$META_DIR/LOG.md`.
  - Identify the first [ ] step.
  - Resume from that step rather than starting a new plan.

## 4. General rules
  - Respect existing tools and configs (Prettier, ESLint, TypeScript, test frameworks).
  - Keep changes and logical units of work small and focused.
  - If something is unclear or risky, ask me before making large or breaking changes.
  - Treat `$META_DIR/PROJECT.md` and `$META_DIR/CODESTYLE.md` as the source of truth
for project meaning, architecture, and style once they exist.

