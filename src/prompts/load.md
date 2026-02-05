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

## 2. General rules (IMPORTANT, NEVER IGNORE THEM)
- When task is given EVALUATE if task is clear to you and ask questions about the task.
- If not said OTHER - do NOT execute task immediately. Build the plan.
- PLAN should not contain "search, evaluate, determine, identify, determine" - do your rearch, every step should be determined and very specific.
- YOU SHOULD print the plan and ASK if CONTINUE to execute the plan or refine it. 

## 3. Non-default branch
if current branch is not `dev` | `master` then

- load full task from .kickoff/TASKS .md or .mhtml (with parsing of images) with the same task id as current branch
- if there is no task corresponding branch
  - understand and print pure task id in JIRA (XXX-#### for example)- 
  - try to connect with JIRA MCP and look for the task there
- briefly describe current task
- understand current work state by analyzing staged files

## Rules of coding (IMPORTANT!):
- Respect existing tools and configs (Prettier, ESLint, TypeScript, test frameworks).
- Try to avoid `as`, write code without it, or use `satisfies`.
- For translations: Try to use instead of just `t` alias `t{LastSection}` if possible
- Never use margins in css ever! (VERY IMPORTANT)!
- Avoid using padding to separate objects instead of gaps. Whenever possible use gaps. Paddings are to define client area of the box.
- Try to run `typecheck` and (`lint` or `eslint`) scripts after each task to test if types are ok
- When creating folder create/update barrel files if needed