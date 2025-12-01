# Code Style

## Languages and frameworks
- Planned: TypeScript for scripts and tooling.

## Formatting
- No formatter configuration yet; default to modern TS/JS style (semicolons optional, single quotes acceptable).

## Naming conventions
- Directories/files: kebab-case or lowercase for configs and scripts.
- Scripts/config variables: camelCase in code, uppercase snake for env vars.

# Project structure
- `src/prompts`: source prompt files.
- `dist/`: build output for prompts.
- `scripts/`: helper scripts if needed for build/deploy.

## Guidelines
- Keep scripts small and focused.
- Use configurable prefixes via npm config or environment variables rather than hard-coding.
