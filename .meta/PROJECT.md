# Project overview
- Project name: Kickoff
- Project slug: kickoff

## What this project does
- Starter repository to host prompt systems and related automation (build/deploy).

## Description
- Simple scaffold for managing prompt files, with upcoming tooling to package them for agents.

## Applications and Domains
- ### Prompt toolkit
  - Path: project root
  - Description: Manages prompt content and scripts for building and deploying to agent-specific locations.
  - Domain/target: Developer tooling for agent prompt distribution.

## Architecture overview
- No application code yet. Planned structure:
  - `src/prompts`: source prompt definitions.
  - `dist/`: build output after packaging prompts.
  - NPM scripts to build and deploy.

## Key workflows
- Initialize npm project, add build/deploy scripts.
- Build will collect prompts into `dist`.
- Deploy will copy built prompts to agent-specific directories (e.g., Codex).

## Project documentation
- No dedicated docs directories yet.

## Important notes
- Keep credentials and secrets out of version control.
- Prefix for prompts should be configurable via npm config or build step variables.
