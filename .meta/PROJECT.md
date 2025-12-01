# Project overview

- Project name: Kickoff
- Project slug: kickoff

## What this project does

- Starter repository to host prompt systems and related automation (build/deploy) using Node.js + TypeScript scripts to package markdown prompts with configurable filename prefixes and deploy them to agent prompt directories.

## Description

- Prompt toolkit scaffold that packages markdown prompt files and deploys them to agent-specific locations. The repository ships TypeScript helper scripts (`scripts/build.ts`, `scripts/deploy-codex.ts`) executed with `tsx` to build prompts with a configurable filename prefix and to deploy them to a Codex prompt directory. Strict TypeScript settings, ESLint, and Prettier keep the small automation codebase consistent. Prompts live in `src/prompts` (markdown with YAML frontmatter) and the build copies them into `dist/`, optionally prefixing filenames to avoid collisions.

## Applications and Domains

- ### Prompt toolkit
  - Path: project root
  - Description: Hosts prompt content under `src/prompts` (e.g., `kickoff.md`, `todo.md`) and automation scripts for building (`scripts/build.ts`) and deploying (`scripts/deploy-codex.ts`) those prompts. Build applies a configurable prefix to prompt filenames and writes to `dist/`; deploy copies built prompts to the configured Codex prompt directory after ensuring a build exists. Repository config (`package.json` `config.*` keys or env vars) controls prefixes and destination paths.
  - Domain/target: Developer tooling for agent prompt distribution and local prompt management.

## Architecture overview

- Tooling-first layout built with Node.js + TypeScript (ES modules via `tsx`):
  - `src/prompts/`: markdown prompt sources.
  - `scripts/build.ts`: builds prompts into `dist/` applying optional filename prefix from `PROMPT_PREFIX` or npm config `promptPrefix`; cleans `dist/` before copying.
  - `scripts/deploy-codex.ts`: deploys built prompts to Codex directory from `CODEX_PROMPT_DIR` or npm config `codexPromptDir` (default `~/.codex/prompts`); expands `~` and copies recursively.
  - `dist/`: generated build output; safe to clean/regenerate and not meant for manual edits.
  - `package.json` + `tsconfig.json`: ESM setup with strict TypeScript, `tsx` runner, npm scripts for build/deploy/lint/format; ESLint and Prettier configs live at repo root.

## Key workflows

- Install dependencies: `npm install`.
- Build prompts with prefixing: `npm run build` (uses `tsx` to execute `scripts/build.ts`; cleans `dist/`).
- Deploy to Codex: `npm run deploy:codex` (runs build first, then copies `dist` to target path).
- Lint TypeScript: `npm run lint` (ESLint with TypeScript plugin and Prettier integration); auto-fix with `npm run lint:fix`.
- Format files: `npm run format` (Prettier).
- Tests: `npm test` currently placeholder (`No tests yet`); rely on build/lint as validation.
- Configuration knobs (via env or npm config):
  - `PROMPT_PREFIX` / `npm pkg get config.promptPrefix` to change filename prefixes.
  - `CODEX_PROMPT_DIR` / `npm pkg get config.codexPromptDir` to change Codex destination.
  - Scripts respect `type: "module"` and `tsconfig.json` strict settings.

## Project documentation

- No dedicated `.doc/`, `.spec/`, `doc/`, or `spec/` directories present.
- Reference docs: `README.md` describes setup, build/deploy, lint/format scripts, and configuration.

## Important notes

- Keep credentials and secrets out of version control.
- `dist/` is generated—do not hand-edit; regenerate via build.
- Prompts use markdown frontmatter for metadata (name, description, argument hints).
- Deployment currently targets Codex; other agent targets would need additional scripts.
- Prefix for prompts is configurable via environment or npm config to avoid collisions across prompt sets.
- ESLint/Prettier configs live at repo root and ignore `dist/` and `node_modules/`.
- Repository uses ESM (`type: "module"`) and `tsconfig.json` enforces strict typing; keep new scripts aligned.
