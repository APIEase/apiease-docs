---
title: apiease-template
description: Use apiease-template as the recommended repository foundation for versioned APIEase development and AI-assisted workflows.
---
# apiease-template

`apiease-template` is the starter repository that `apiease-cli` uses when you run `apiease init`.

GitHub repository: [APIEase/apiease-template](https://github.com/APIEase/apiease-template)

It is the recommended foundation for APIEase development because it gives you:

- a predictable repository layout for requests, widgets, variables, and functions
- starter JSON definitions you can adapt instead of inventing resource shapes from scratch
- template-owned guidance files for humans and coding agents
- a structure that works with `apiease-cli` upgrades and the [APIEase Public API](./apiease-public-api.md)

Most teams should start from the template through [apiease-cli](./apiease-cli.md) instead of cloning the template repository directly.

## What ships in the template

The current template includes:

- `apiease.config.js` as the source of truth for resource directory names
- `resources/requests`, `resources/widgets`, `resources/variables`, and `resources/functions` as the canonical resource folders
- `.gitkeep` files in each resource directory so the structure is committed even before you add project-specific definitions
- starter example JSON files under `docs/examples/resources`
- template guidance in `README.md`, `AGENTS.md`, `docs/shared-ongoing-ai-guidance.md`, and `docs/knowledgebase/apiEaseDocsConsolidated.md`
- user-owned customization files in `CUSTOM_README.md` and `CUSTOM_AGENT_GUIDANCE.md`

The example resources are intentionally lightweight. Use them as reference material or copy them into your working resource directories as you start defining your project.

Those examples use `handle` as the stable source-controlled identifier across requests, widgets, variables, and functions. Server-owned `id` values should not be stored in template resource files. See [Resource handles](./resource-handles.md) for the full identifier pattern.

Each resource definition can also carry a `description` explaining its purpose,
behavior, and important relationships. Descriptions round-trip through the CLI,
public API, export/import, and Git projection with the rest of the resource.
Legacy request, widget, or variable files may omit the field without acquiring an
empty value. In an update, omission preserves the saved description and an
explicit empty string clears it.

## Expected repository layout

This is the shape the template establishes today:

```text
your-project/
  .apiease/
    project.json
  apiease.config.js
  resources/
    requests/
    widgets/
    variables/
    functions/
  docs/
    examples/
      resources/
        requests/
        widgets/
        variables/
        functions/
    knowledgebase/
      apiEaseDocsConsolidated.md
    shared-ongoing-ai-guidance.md
  README.md
  AGENTS.md
  CUSTOM_README.md
  CUSTOM_AGENT_GUIDANCE.md
```

Important details:

- `apiease.config.js` currently sets `resources` as the root resource directory and defines the four resource subdirectories explicitly
- `.apiease/project.json` is written by `apiease init` and stores the template version plus the template-managed file manifest used by `apiease upgrade`
- the bundled examples live under `docs/examples/resources`, but the configured long-term project layout is the `resources/*` tree

## What belongs in source control

In a real project repository created from the template, commit:

- `apiease.config.js`
- `.apiease/project.json`
- your JSON resource definitions under `resources/*`
- any starter examples you choose to keep or adapt
- project documentation in `CUSTOM_README.md`
- project-specific agent instructions in `CUSTOM_AGENT_GUIDANCE.md`

Keeping these files in git gives you a versioned record of your saved APIEase configuration and preserves the metadata that `apiease upgrade` uses to apply safe template updates later.

## Template-managed and customer-owned files

`apiease-cli` treats most copied template files as template-managed. That means they are tracked in `.apiease/project.json` and may be refreshed by `apiease upgrade` when the template changes.

Two files are explicitly customer-owned:

- `CUSTOM_README.md`
- `CUSTOM_AGENT_GUIDANCE.md`

Those files are copied into the project, but they are excluded from the stored template manifest so upgrade operations do not treat them as template-managed content.

This split is the intended customization model:

- keep template defaults and shared guidance in the template-owned files
- keep project-specific decisions in the two custom files

## Intended developer workflow

The template is designed for a repository-first workflow:

1. initialize a repository with `apiease init`
2. configure APIEase authentication for the environment you want to target
3. create or adapt JSON resource definitions in your project
4. version those definitions and the project metadata in git
5. use [apiease-cli](./apiease-cli.md) to create or update, read, or delete the saved resources in APIEase
6. use the [APIEase Public API](./apiease-public-api.md) directly only when you need a lower-level integration than the CLI
7. run `apiease upgrade` later to adopt safe template updates without overwriting project-owned work

To initialize from an existing store using a particular authentication file:

```bash
apiease init my-project --from-existing-resources --environment staging
```

This reads `~/.apiease/.env.staging` for that invocation. It does not save an environment selection or change template upgrade behavior. Pass `--environment staging` again on subsequent API commands that should use that file. The file must exist and be readable; explicit connection flags and process variables take precedence over its values. Template-only `init` and `upgrade` do not use these API connection settings. See [apiease-cli](./apiease-cli.md) for configuration details.

The template does not replace the core APIEase documentation. It gives you a repository structure that makes those concepts easier to manage as code. For request behavior and request contracts, use the existing docs:

- [Requests Overview](../requests/requests-overview.md)
- [Request Types Overview](../requests/request-types/request-types-overview.md)
- [Request Parameters Overview](../requests/request-parameters/request-parameters-overview.md)
- [Triggers Overview](../requests/triggers/triggers-overview.md)
- [Widgets Overview](../widgets/widgets-overview.md)
- [Functions](../functions/functions-overview.md)
- [Variables](../variables/variables-overview.md)

## Why the template is the recommended start

Starting from the template keeps the human workflow and the AI-agent workflow aligned:

- the repository structure is explicit instead of ad hoc
- the CLI and upgrade flow understand where the project came from
- resource definitions can be reviewed and versioned like code
- agents can rely on bundled guidance and the local APIEase knowledge base instead of reconstructing platform behavior from scratch

That is why the template is the preferred starting point even if your end goal is to automate APIEase through the CLI or the public API.

## Read installed project and resource instructions

Resource instructions are developer-written Markdown explaining how to create and
edit requests, widgets, variables, and functions. `apiease init` installs a checked
copy in `docs/resource-instructions/`; `apiease upgrade` maintains it. A script
copies content from APIEase's authoritative instruction bundle; it does not author
the instructions. Resource JSON under `resources/*` is the project source you edit.

Project instructions in `AGENTS.md`, `README.md`, and
`docs/shared-ongoing-ai-guidance.md` explain project structure and the CLI workflow.
Start with `AGENTS.md` and `docs/resource-instructions/README.md`. Read the index's
small required core and adapter envelope, then modules for the resource family,
request type, and provider involved. Reading instructions requires neither store
authentication nor a sibling APIEase checkout. Keep customer intent in the
conversation and durable project decisions in `CUSTOM_*` files.

1. Initialize with `apiease init my-project --from-existing-resources` and enter it.
   Plain `apiease init my-project` installs the template without authentication;
   use `git init` if needed and `apiease pull` to establish synchronization before
   project validation or apply.
2. Read installed project instructions and applicable resource instructions.
3. Inspect relevant resource JSON and dependencies, then edit canonical files.
4. Run `apiease validate` for the complete project without executing resources.
5. Run `apiease apply` when authorized, or `apiease apply --require-approval` for
   deferred review. Git diffs present edits; they grant no mutation authority.
6. When notified, preview `apiease upgrade --dry-run` and upgrade template files.

Use `apiease design-context` when current project status is useful. See
[project status](./apiease-cli.md#retrieve-project-design-context) for baseline
checks and source selection, and [upgrades](./apiease-cli.md#upgrade-a-project)
for overwrite/ignore choices. Keep project-specific guidance in `CUSTOM_*` files.
