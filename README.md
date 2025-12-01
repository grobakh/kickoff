# Kickoff

Prompt toolkit scaffold for building and deploying agent prompts.

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
