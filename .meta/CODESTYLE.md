# Code Style

## Languages and frameworks

- TypeScript for scripts and automation (ES modules executed via `tsx`; repo `type` is `module`).
- Node.js standard libraries (fs, path, os) handle filesystem and path utilities.
- Prompts are markdown files with YAML frontmatter metadata.
- ESLint + Prettier manage consistency across TypeScript and Markdown-adjacent tooling.

## Formatting

- Prettier config (`.prettierrc.json`): no semicolons, double quotes (singleQuote false), no trailing commas, print width 100, 2-space indents. `dist/` and `node_modules/` are ignored via `.prettierignore`.
- ESLint config (`.eslintrc.json`): extends `eslint:recommended`, `plugin:@typescript-eslint/recommended`, and `prettier`; uses `@typescript-eslint/parser`. Custom rule: `semi` disabled (Prettier handles). Ignores `dist/` and `node_modules/` via `.eslintignore`.
- Use `npm run lint` / `npm run lint:fix` for TypeScript checks; `npm run format` for Prettier (uses `--ignore-unknown` to avoid formatting binaries). Keep code formatting aligned with these commands.
- TypeScript runs in `strict` mode; add explicit types when inference is ambiguous and prefer async/await for IO.

## Naming conventions

- Directories/files: kebab-case for scripts (`deploy-codex.ts`), lowercase for configs (`package.json`, `tsconfig.json`), kebab-case prompt filenames (`kickoff.md`, `todo.md`).
- Code: camelCase for functions/variables; PascalCase reserved for classes (rare); UPPER_SNAKE_CASE for environment variables.
- Prompt frontmatter: concise `name`, short `description`, `argument-hint` for quick usage guidance.
- Avoid hardcoding prefixes in source prompt filenames; build step applies prefixes.

# Project structure

- `src/prompts`: source prompt files (markdown with YAML frontmatter).
- `dist/`: generated build output for prompts; cleaned and recreated by `npm run build`.
- `scripts/`: TypeScript helper scripts for build/deploy automation, executed with `tsx`.
- Root configs (`package.json`, `tsconfig.json`) define tooling and defaults; ESLint/Prettier configs live at repo root and ignore generated output.

## Guidelines

- Keep scripts small and focused; prefer pure helpers plus a thin `main` function that coordinates IO.
- New function: place alongside related logic in the relevant script; validate inputs early and throw typed errors with actionable messages.
- New class (if needed): uncommon; introduce only when encapsulating reusable operations (e.g., a new deploy target). Keep under `scripts/` and keep constructor params typed.
- New component: not applicable (no UI). For prompt content, add markdown files under `src/prompts` with frontmatter metadata; avoid embedding prefixes directly in filenames.
- New feature: add prompt definitions in `src/prompts` or new automation scripts in `scripts/`; wire runnable scripts into `package.json` and document env/config keys.
- New module: create additional `.ts` helpers under `scripts/` for shared logic; export typed functions and reuse across scripts instead of duplicating logic.
- Configuration: prefer npm package `config.*` entries or environment variables instead of hard-coding paths or prefixes.
- Run `npm run lint` and `npm run format` after changes to align with enforced rules before committing.

## Enforced rules

- Prettier controls formatting; do not hand-format differently—use `npm run format`.
- ESLint enforces recommended + TypeScript rules; fix findings or justify with minimal disables.
- TypeScript strict mode is enabled via `tsconfig.json`; code should remain type-safe.
- Use `npm run build` to validate prompt packaging; `npm run deploy:codex` rebuilds before copying artifacts.
