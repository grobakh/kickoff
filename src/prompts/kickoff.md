---
name: kickoff
description: Analyze the repository and produce a stateless context pack in the meta dir
---

You are working in a repository that may define additional rules in AGENTS.md.

Your goal is to:

- Discover how this project works and how it is structured.
- Build or update documentation in the project’s meta directory.
- Capture a **compressed but comprehensive** context pack in `.kickoff` so later agents can resume statelessly without re-scanning the repo.
- Surface the project’s coding rules and structure so downstream tasks mirror how real contributors work.

## 0. Meta directory and files

1. Use `.kickoff` as the meta directory; create it if it does not exist.

2. Within `.kickoff`, treat the following as canonical files (stateless context pack):
   - `.kickoff/PROJECT.md` – project purpose and architecture overview.
   - `.kickoff/CODESTYLE.md` – code style, conventions, and structure. Catch contributor's vibe. Contributor's Manifest.
   - `.kickoff/LOG.md` – high-level history of agent work.
   - `.kickoff/STRUCTURE.md` – compact directory map (depth 2–3) with brief roles; skip generated/third-party folders.
   - `.kickoff/CONFIG.md` – key configuration knobs (tooling settings, env vars, defaults, important config file locations).
   - `.kickoff/DEPENDENCIES.md` – notable external/business dependencies and where they come from (dependency manifests, external services, unusual packages).
   - `.kickoff/ROLES.md` – business actors/roles and access expectations (project-wide and per application).

3. Read all `AGENTS.md` files that apply (global and in the current repo path), then read any existing:
   - `.kickoff/PROJECT.md`
   - `.kickoff/CODESTYLE.md`
   - `.kickoff/LOG.md`
   - `.kickoff/STRUCTURE.md`
   - `.kickoff/CONFIG.md`
   - `.kickoff/DEPENDENCIES.md`
   - `.kickoff/ROLES.md`

Do not delete useful existing content; update and extend instead. Prefer concise bullet points that let a future agent load context quickly.

## 1. Understand docs and existing meta

1. Recursively scan documentation directories if they exist:
   - `.doc/`, `.spec/`
   - you can try to read from `doc/`, `spec/` but be carefull - it can be source code, not documentation folders.
2. From these, infer (and record in `.kickoff` in corresponding meta files):
   - What the project does (domain, main use cases).
   - Any explicit architecture or process descriptions.
   - Important workflows and commands.
   - External/business dependencies or integrations (APIs, services, SDKs) and where defined (dependency manifests, configs).
   - Business actors, role definitions, and access rules (who can do what).
   - Catch how contributor "thinks" and paradigma of workin in project. Extract Manifest of contributor.

3. Update `.kickoff/PROJECT.md`:
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
   - Add a short pointer to other meta files (STRUCTURE/WORKFLOWS/CONFIG/DEPENDENCIES) so future agents know where to look.

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
   - For other stacks, inspect common requirement manifests

4. Update `.kickoff/CODESTYLE.md`:
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
     
     ## Contributor's Manifest 
     - catch vibe of the project.
     - is the code transparent, universal, or not?
     - is it generalized or specialized.
     - do we use complex approaches like IOC, DI, patterns of coding.
     - what can other say about project looking and contributing to it from the glance.

     ## Enforced rules
     ```

   - If it exists, merge new insights non-destructively.

   - In Code style force rules part update how to enforce formatting utils,
     like prettier, lint fix, etc so new written code by agent will be aligned with existing code base.

   - Capture repo-specific naming/placement patterns that help agents generate code indistinguishable from project contributors.
   - If there are stack-specific formatters/linters (e.g., Black, gofmt, rubocop), note how to run them and defaults.

5. Update additional meta files:
   - `.kickoff/STRUCTURE.md`: compact tree (depth 2–3), annotate key folders; exclude `node_modules`, `.git`, build outputs.
   - `.kickoff/CONFIG.md`: highlight important config files and key settings (language targets, strictness, path aliases, ignore patterns, env variables, default paths).
   - `.kickoff/DEPENDENCIES.md`: summarize notable external dependencies and their sources:
     - Dependency manifests (any ecosystem) and where to find them.
     - External services/APIs/SDKs, credentials required, and purpose.
     - Unusual or business-critical packages or tooling that shape behavior.
   - `.kickoff/ROLES.md`: Business actors, role definitions, and access rules (who can do what). 

## 3. Log the kickoff

0. Log file only append only! NEVER remove any existing record from it!

1. Append a brief entry to `.kickoff/LOG.md` describing:
   - That the kickoff scan was executed.
   - What you updated (`PROJECT.md`, `CODESTYLE.md`, etc.).
2. Example entry:

   ```markdown
   - [YYYY-MM-DD] kickoff – scanned docs and code, updated PROJECT.md and CODESTYLE.md.
   ```

## 4. Rerun

1. It is possible to rerun kickoff on the project again someday. It means you need to scan project and important files and update all documentation and log rerun.

## ON FINISH

User can forget to run `/prompts:kickoff-todo` prompt to start the task.

1.  Prompt user to run `/prompts:kickoff-todo` prompt to start working on his the task.
2.  If he just inputs something - ask him if it is a task and if yes run this task with `/prompts:kickoff-todo` prompt.
