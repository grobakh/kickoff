# Code Style

## Languages and frameworks
- TypeScript for scripts and automation (ES modules executed via `tsx`).
- Node.js standard libraries (fs, path, os) handle filesystem and path utilities.
- Prompts are markdown files with YAML frontmatter metadata.

## Formatting
- No Prettier/ESLint config in repo; mirror current style:
  - Semicolons at line ends.
  - Single quotes for strings.
  - Arrow functions and async/await for IO flows.
  - Imports ordered with built-ins first.
- TypeScript is `strict`; add explicit types where inference is unclear.

## Naming conventions
- Directories/files: kebab-case for scripts (`deploy-codex.ts`), lowercase for configs (`package.json`, `tsconfig.json`), kebab-case prompt filenames (`kickoff.md`, `todo.md`).
- Code: camelCase for functions/variables; PascalCase reserved for classes (rare); UPPER_SNAKE_CASE for environment variables.
- Prompt frontmatter: concise `name`, short `description`, `argument-hint` for quick usage guidance.
- Avoid hardcoding prefixes in source prompt filenames; build step applies prefixes.

# Project structure
- `src/prompts`: source prompt files.
- `dist/`: generated build output for prompts.
- `scripts/`: TypeScript helper scripts for build/deploy automation.
- Root configs (`package.json`, `tsconfig.json`) define tooling and defaults.

## Guidelines
- Keep scripts small and focused; prefer pure helpers plus a thin `main`.
- New function: place alongside related logic in the relevant script; handle errors with clear messages.
- New class (if needed): uncommon; introduce only when encapsulating reusable operations (e.g., deployment targets). Keep under `scripts/`.
- New component: not applicable (no UI). For prompt content, add markdown files under `src/prompts`.
- New feature: add prompt definitions in `src/prompts` or new automation scripts in `scripts/`; wire into `package.json` scripts if runnable.
- New module: create additional `.ts` helpers under `scripts/` for shared logic; export typed functions.
- Configuration: prefer npm package `config.*` entries or environment variables instead of hard-coding paths or prefixes.

## Enforced rules
- Formatting is informal; keep consistent with existing files. If adding a formatter, document it and extend npm scripts.
- TypeScript strict mode is enabled via `tsconfig.json`; code should remain type-safe.
- Use `npm run build` to validate prompt packaging; `npm run deploy:codex` rebuilds before copying artifacts.
