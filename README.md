# Kickoff – Stateless Context Toolkit

Goal: speed up feature delivery by letting agents ship changes task-by-task like real contributors—matching project structure, style, and rules.

How it works: Kickoff’s prompts and helper scripts build a **stateless context pack** (PROJECT/CODESTYLE/PLAN/LOG) so agents can resume work without re-scanning the repo, then deploy the prompts to your agent runtime.

## Stateless context

- `src/prompts/kickoff.md` scans the repo and writes PROJECT/CODESTYLE/LOG into `.kickoff/`.
- `src/prompts/todo.md` drives tasks with resumable PLAN/LOG entries stored alongside the kickoff files.
- `.kickoff/` is the canonical context pack—keep it concise and current to enable stateless handoffs.

## Setup

- Install dependencies: `npm install` (uses TypeScript + tsx).
- Prompts live in `src/prompts/`; existing examples include `kickoff.md` and `todo.md`.

## Build

- Default prefix comes from `npm config get promptPrefix` (package config) or `PROMPT_PREFIX` env.
- Build prompts into `dist/` with prefix applied to filenames: `npm run build`.

## Deploy (Codex)

- Destination defaults to `~/.codex/prompts` from `npm config get codexPromptDir` or `CODEX_PROMPT_DIR`.
- Deploy built prompts: `npm run deploy:codex` (automatically runs build before copying).

## Configuration

- Prefix: `npm pkg set config.promptPrefix=<prefix>` or `PROMPT_PREFIX=<prefix> npm run build`.
- Codex prompt directory: `npm pkg set config.codexPromptDir=<path>` or `CODEX_PROMPT_DIR=<path> npm run deploy:codex`.

## Scripts

- `npm run build` – copy `src/prompts` to `dist` with optional prefixing.
- `npm run deploy:codex` – rebuild then copy `dist` contents to the configured Codex prompt directory.
- `npm run lint` – lint TypeScript sources with ESLint.
- `npm run lint:fix` – lint and auto-fix issues where possible.
- `npm run format` – format files with Prettier using repo settings.
