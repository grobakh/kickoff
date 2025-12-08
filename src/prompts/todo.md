---
name: todo
description: Plan and execute a task with a stateless, resumable checklist and log
---

You are working in a repository that may define additional rules in AGENTS.md.
After loading the project context, explicitly ask: **“What task should we work on?”**
Set `$TASK` to the user's answer, derive `$TASK-SLUG` as a concise snake_case alias, and use that slug for plan/log filenames and references.

Your goals are to:

- Understand general rules and per project rules.
- Understand project and load project context.
- Understand the task and scope.
- Create or reuse a detailed, **resumable** plan for `$TASK`.
- Persist concise task context in `.kickoff` so later agents can resume statelessly without redoing discovery.
- Execute the plan step by step.
- Log progress and optionally stage changes, but **never commit** without explicit instruction.

## 0. Meta directory and context

1. Use `.kickoff` as the meta directory; create it if missing.

2. Read all relevant `AGENTS.md` and then load, if present:
   - `.kickoff/PROJECT.md`
   - `.kickoff/CODESTYLE.md`
   - `.kickoff/STRUCTURE.md`
   - `.kickoff/CONFIG.md`
   - `.kickoff/DEPENDENCIES.md`
   - `.kickoff/ROLES.md`
   - `.kickoff/PLAN-{$TASK-SLUG}.md`
   - `.kickoff/LOG.md`

3. If `.kickoff/PROJECT.md` or `.kickoff/CODESTYLE.md` are missing:
   - EXECUTE a `kickoff` prompt before CONTINUE.

4. Load context from `.kickoff` files. Load context from other folders/files mentioned in them.
5. Load context from documentation mentioned in `.kickoff/PROJECT.md`; if not enough, recursively scan documentation directories if they exist (.doc/, .spec/).

Treat `.kickoff` as the persistent stateless memory for this task—keep it concise, current, and sufficient for an agent to resume without re-scanning the repo.

## 1. Clarify the task before planning

Before writing or modifying any plan for `$TASK`:

0. Ask the user clearly: **“What task should we work on?”** Capture the description as `$TASK`.

1. Define `$TASK-SLUG` before planning:
   - Derive a short snake_case slug from `$TASK` (drop filler words, keep it brief).
   - If the task description is long or ambiguous, propose or ask for a slug instead of using the full text.
   - Use `$TASK-SLUG` for plan filenames (`PLAN-{$TASK-SLUG}.md`), logs, and references.

2. Ask me targeted questions to clarify:
   - What exactly needs to be done for `$TASK`.
   - Success criteria / acceptance conditions.
   - Scope boundaries (what is in / out).
   - Constraints (performance, backwards compatibility, deadlines, tech limitations).
   - Any specific files, modules, or tickets/issues you should consider.

3. Do **not** generate or run a plan until you have this information or get YOLO signal(y).

## 2. Create or update a detailed, resumable plan

The plan for `$TASK` lives in `.kickoff/PLAN-{$TASK-SLUG}.md` as a checklist.
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

## 2.5 Validate plan with user!
- Print your Plan to user
- If on previous step user answered YOLO - skip clarification and go to 3. Execution immidately.
- In all other cases - ask user to validate plan
- If user is not satisfied, ask user to clarify
- If user is satisfied, continue

## 3. Execute the plan step by step (resumable)

1. Determine the current step as the first checklist item with [ ] in `.kickoff/PLAN-{$TASK-SLUG}.md`.

2. For the current step:

- Use the understanding in `.kickoff/PROJECT.md` and `.kickoff/CODESTYLE.md` to choose where to make changes and how to name things.

- Prefer existing patterns for:

- Folder structure.

- File naming.

- Code style (as implied by Prettier/ESLint/tsconfig/etc.).

- Make the necessary code changes for this step.

3. After completing a step:

- Update `.kickoff/PLAN-{$TASK-SLUG}.md` to mark that step as [x].

## 4. Log

0. Log file only append only! NEVER remove any existing record from it!

1. Log record to the `.kickoff/LOG.md` when PLAN is ready.
    - Date/time (if practical).
    - TASK-SLUG=`{$TASK-SLUG}`.
    - TASK=`$TASK`.
    - Short description of the plan.

2. After completing a stepAppend an entry to `.kickoff/LOG.md` including:
    - Date/time (if practical).
    - TASK-SLUG=`{$TASK-SLUG}`.
    - TASK=`$TASK`.
    - Step identifier or short description.
    - Files touched and a short summary of the change.
      Example:
   ```markdown
   - [YYYY-MM-DD] TASK={$TASK-SLUG} – Step 2: Implemented FooBarService in
     `src/services/fooBarService.ts`, updated `src/routes/foo.ts`.
   ```

## 5. Git behaviour:

- You may run git status, git diff, and git add to stage the changes related to the current step.
- Do not run git commit, git commit --amend, git rebase, git tag, or git push
  unless I explicitly ask you to.
- When staging, prefer to only stage files that actually belong to the step you just completed.

## 6. Repeat:

1.  - Move to the next [ ] step.
- Implement it, update the plan and log, and stage changes as above.
2.  If the session is interrupted and this prompt is invoked again with the same $TASK:

- Re-read `.kickoff/PLAN-{$TASK-SLUG}.md` and `.kickoff/LOG.md`.
- Identify the first [ ] step.
- Resume from that step rather than starting a new plan.

## 7. Finish

1. When all plan is executed print obvious message and report about execution.
2. Ask user to commit changes.
3. Ask clearly for the next task: **“What should we tackle next?”**
4. If a new task is provided, set `$TASK` to that description, derive a fresh `$TASK-SLUG`, and loop this prompt.

## 7. General rules

- Respect existing tools and configs (Prettier, ESLint, TypeScript, test frameworks).
- Keep changes and logical units of work small and focused.
- If something is unclear or risky, ask me before making large or breaking changes.
- Treat `.kickoff/PROJECT.md` and `.kickoff/CODESTYLE.md` as the source of truth
  for project meaning, architecture, and style once they exist.
