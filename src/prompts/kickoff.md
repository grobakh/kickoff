---
name: kickoff
description: Analyze the repository and prepare project + codestyle context
argument-hint: $META_DIR=".meta"
---

You are working in a repository that may define additional rules in AGENTS.md.

Your goal is to:

- Discover how this project works and how it is structured.
- Build or update documentation in the project’s meta directory.
- Load this context into the current session so future tasks follow the project’s way.

## 0. Meta directory and files

1. Determine the meta directory, preferring this order:
   - If `.meta/` exists, use it as `$META_DIR`.
   - Otherwise, create `.meta/` and use it as `$META_DIR`.

2. Within `$META_DIR`, treat the following as canonical files:
   - `$META_DIR/PROJECT.md` – project purpose and architecture overview.
   - `$META_DIR/CODESTYLE.md` – code style, conventions, and structure.
   - `$META_DIR/LOG.md` – high-level history of agent work.

3. Read all `AGENTS.md` files that apply (global and in the current repo path), then read any existing:
   - `$META_DIR/PROJECT.md`
   - `$META_DIR/CODESTYLE.md`
   - `$META_DIR/LOG.md`

Do not delete useful existing content; update and extend instead.

## 1. Understand docs and existing meta

1. Recursively scan documentation directories if they exist:
   - `.doc/`, `.spec/`
   - you can try to read from `doc/`, `spec/` but be carefull - it can be source code, not documentation folders.
2. From these, infer:
   - What the project does (domain, main use cases).
   - Any explicit architecture or process descriptions.
   - Important workflows and commands.

3. Update `$META_DIR/PROJECT.md`:
   - Create the file if it does not exist.
   - Structure it roughly as:

     ```markdown
     # Project overview

     - Project name.
     - Project slug.

     ## What this project does

     - Short description…

     ## Description

     - Long and comprehensive description of the project.

     ## Applications and Domains

     - Enumerate application found in project.
     - give app name with ### section
     - display app path to find it quickly
     - comprehensive description each application separately.
     - give app domain and business target

     ## Architecture overview

     - Main modules / services and their responsibilities.
     - Main frameworks that are used and how they are used.

     ## Key workflows

     - How to run the project.
     - How to test.
     - Any important scripts or CI flows.

     ## Project documentation

     - Enumerate found .doc and .spec folders and general idea of each.

     ## Important notes

     - anything that is important to know about the project.
     ```

   - If the file already exists, refine and append information without destroying existing sections.

## 2. Understand code structure and conventions

1. Inspect the repository’s top-level and common code locations, for example:
   - `src/`, `app/`, `packages/`, `services/`, `lib/`, `components/`, etc.
   - Inspect general Folder structure, module and feature layouts in source code.
2. Identify:
   - How features / modules are grouped.
   - Where domain logic vs. UI vs. infrastructure lives.
   - Typical file and folder naming conventions (kebab-case, PascalCase, etc.).
   - Any obvious layering or boundaries (e.g. `domain/`, `application/`, `infrastructure/`).
   - File naming, component common file structure and naming.
   - Size and count of files, modules, and when it is better to extract or join func, components, utils.

3. Detect formatting and linting rules by reading (if present):
   - `package.json` (scripts and config blocks).
   - `.prettierrc*`, `.eslintrc*`, `tsconfig.json`, other tool config files.

4. Update `$META_DIR/CODESTYLE.md`:
   - Create it if it does not exist.
   - Summarise at least:

     ```markdown
     # Code Style

     ## Languages and frameworks

     - …

     ## Formatting

     - Prettier/ESLint settings as inferred (semicolons, quotes, trailing commas, etc.).

     ## Naming conventions

     - Files, folders.
     - Components, hooks, services, types, utilities.

     # Project structure

     - Key directories and their responsibilities.
     - Typical patterns for adding new features or modules.

     ## Guidelines

     - How and where to create
     - new function
     - new class
     - new component
     - new feature
     - new module

     ## Enforced rules
     ```

   - If it exists, merge new insights non-destructively.

   - In Code style force rules part update how to enforce formatting utils,
     like prettier, lint fix, etc so new written code by agent will be aligned with existing code base.

## 3. Log the kickoff

0. Log file only append only! NEVER remove any existing record from it!

1. Append a brief entry to `$META_DIR/LOG.md` describing:
   - That the kickoff scan was executed.
   - What you updated (`PROJECT.md`, `CODESTYLE.md`, etc.).
2. Example entry:

   ```markdown
   - [YYYY-MM-DD] kickoff – scanned docs and code, updated PROJECT.md and CODESTYLE.md.
   ```

## 4. Rerun

1. It is possible to rerun kickoff on the project again someday. It means you need to scan project and important files and update all documentation and log rerun.

## ON FINISH

User can forget to run `/prompt/kickoff-todo` prompt to start the task.

1.  Prompt user to run `/prompt/kickoff-todo` prompt to start working on his the task.
2.  If he just inputs something - ask him if it is a task and if yes run this task with `/prompt/kickoff-todo` prompt.
