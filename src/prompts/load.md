---
name: load
description: Load context from .kickoff files
---
You are working in a repository that may define additional rules in AGENTS.md.

Your goals are to:

- Understand general rules and per project rules.
- Understand project and load project context.
- Understand scope.
- Verify execution by running possible verification steps for the project: typechecks, build, tests, etc.

## 1. Meta directory and context

1. Use `.kickoff` as the meta directory; create it if missing.

2. Read all relevant `AGENTS.md` and then load, if present:
   - `.kickoff/PROJECT.md`
   - load all other .md files from .kickoff folder (ignore TASKS subfolder for now)

3. If `.kickoff/PROJECT.md` are missing:
   - Recomend user to run a `kickoff` prompt before CONTINUE.

4. Load context from `.kickoff` files. Load context from other folders/files mentioned in them.
5. Load context from documentation mentioned in `.kickoff/PROJECT.md`; if not enough, recursively scan documentation directories if they exist (.doc/, .spec/).

## 2. General rules

- Respect existing tools and configs (Prettier, ESLint, TypeScript, test frameworks).
- If something is unclear or risky, ask me before making large or breaking changes.
- When task is given EVALUATE if task is clear to you and ask questions about the task.
- If not said OTHER - do NOT execute task immediately. PREFER to print the plan and ASK if CONTINUE. 

## 3. Non-default branch
if current branch is not `dev` | `master` then

- load full task from .kickoff/TASKS .md or .mhtml (with parsing of images) with the same task id as current branch
- briefly describe current task
- understand current work state by analyzing staged files

## Rules of coding (IMPORTANT!):
- Try to avoid `as`, write code without it, or use `satisfies`.
- For translations: Try to use instead of just `t` alias `t{LastSection}` if possible
- Try to run `npm run typecheck` after each task to test if types are ok
- When creating folder create/update barrel files if needed