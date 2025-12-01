# Plan for create npm init. make a step to build to dist dir all prompt system. and deploy step to deploy it to agents promnts. for example codex global user prompts. it can have some nice prefix. like kickoff. prefix configurable

Status: in-progress

## Context

- TypeScript scripts needed to build prompts from `src/prompts` into `dist` with configurable prefix (default kickoff).
- Deploy script should copy built prompts to Codex user prompt directory; destination configurable.
- Existing prompt files: `kickoff.md`, `todo.md` belong to kickoff system.

## Steps

- [x] Step 1 – Initialize npm project with TypeScript tooling and npm scripts scaffold.
- [x] Step 2 – Organize prompt sources under `src/prompts` (include existing kickoff/todo) and ensure .gitignore covers outputs.
- [x] Step 3 – Implement build script to copy prompts to `dist` with configurable prefix handling.
- [x] Step 4 – Implement Codex deploy script to copy built prompts to configured Codex prompt directory.
- [x] Step 5 – Update README with build/deploy usage and configuration notes.
- [x] Step 6 – Stage changes for review (no commit).
