---
title: Using APIEase with AI agents
description: Use apiease-template, apiease-cli, and the APIEase public API in a Codex-style repository workflow.
---
# Using APIEase with AI agents

This page is for coding agents such as Codex or Claude Code working in an `apiease-template` project repository.

Most agent-driven APIEase work should follow this path:

- start from [Quickstart with apiease-template](./quickstart-with-apiease-template.md)
- use [apiease-template](./apiease-template.md) as the repository structure
- sync saved resources through [apiease-cli](./apiease-cli.md)
- use the [APIEase Public API](./apiease-public-api.md) directly only when the CLI is not the right interface

## Start from the template

Agents should work inside a repository initialized with `apiease init`, not from a loose folder of one-off JSON files or ad hoc curl commands.

The template gives the agent:

- a stable repository layout under `resources/`
- starter examples under `docs/examples/resources/`
- default instructions in `AGENTS.md`
- a bundled APIEase knowledge base in `docs/knowledgebase/apiEaseDocsConsolidated.md`
- a shared guidance file in `docs/shared-ongoing-ai-guidance.md`
- project-owned customization files in `CUSTOM_README.md` and `CUSTOM_AGENT_GUIDANCE.md`

That structure is what makes Codex-style work repeatable instead of prompt-only.

## Read the local guidance first

In the current template, the intended reading order for an agent is:

1. `AGENTS.md`
2. `docs/shared-ongoing-ai-guidance.md`
3. `docs/knowledgebase/apiEaseDocsConsolidated.md`
4. `CUSTOM_AGENT_GUIDANCE.md`
5. `CUSTOM_README.md`
6. `README.md`

This order matters:

- the template-owned files explain the default APIEase workflow
- the custom files are where the project should override that default with team-specific goals, naming, and constraints

If `CUSTOM_AGENT_GUIDANCE.md` and `CUSTOM_README.md` are empty placeholders, the agent should leave them available for project-specific instructions instead of inventing hidden conventions elsewhere.

## Treat the repository as the source of truth

Inside a template-based project, the agent should treat local files as the canonical representation of saved APIEase resources.

Use `apiease.config.js` as the source of truth for resource directory names. In the current template, that means working primarily in:

- `resources/requests`
- `resources/widgets`
- `resources/variables`
- `resources/functions`

Use `docs/examples/resources/*` as copyable examples, not as the long-term home for project resources.

Resource files should use `handle` as the stable identifier across requests, widgets, variables, and functions. Do not copy server-owned `id` values into source files. For the full convention, see [Resource handles](./resource-handles.md).

When the task involves request behavior, do not re-invent request concepts from memory. Reuse the existing Requests documentation for detailed semantics:

- [Requests Overview](../requests/requests-overview.md)
- [Request Types Overview](../requests/request-types/request-types-overview.md)
- [Request Parameters Overview](../requests/request-parameters/request-parameters-overview.md)
- [Triggers Overview](../requests/triggers/triggers-overview.md)

## Keep authentication outside the repository

The normal agent workflow is to read APIEase authentication from `~/.apiease`, not from tracked project files.

Typical local setup:

```bash
mkdir -p ~/.apiease
printf 'local\n' > ~/.apiease/environment
printf 'APIEASE_API_KEY=your-local-api-key\nAPIEASE_BASE_URL=https://app-admin.apiease.com\nAPIEASE_SHOP_DOMAIN=yourstore.myshopify.com\n' > ~/.apiease/.env.local
```

This matters for agent work because:

- the repository can stay versioned without embedding environment-specific credentials
- the same local project can be synced against different APIEase environments
- the agent can use the CLI without repeating flags on every command

Do not commit real secrets, API keys, or environment files into the repository.

## Use a repository-first agent loop

For most Codex-style tasks, the working loop should be:

1. read the local guidance files
2. inspect the current resource files and examples
3. add or edit JSON definitions under `resources/*`
4. sync those definitions with `apiease-cli`
5. read the saved resource back when needed to confirm the change
6. review and commit the repository changes

Example flow for a request:

```bash
cp docs/examples/resources/requests/example-request.json resources/requests/product-details-proxy.json
apiease create request --file ./resources/requests/product-details-proxy.json
apiease read request --request-handle product-details-proxy
```

After editing the same file again:

```bash
apiease update request --request-handle product-details-proxy --file ./resources/requests/product-details-proxy.json
```

Use the same CRUD pattern for widgets, variables, and functions with the resource-specific handle flags documented in [apiease-cli](./apiease-cli.md).

## Prefer the CLI over direct HTTP

For agent work inside a template repository, `apiease-cli` should be the default interface.

That keeps the workflow aligned with:

- the repository layout created by the template
- the current auth resolution model from `~/.apiease`
- the saved-resource contract exposed by the public API

Use direct HTTP calls only when you need lower-level automation that the CLI does not already cover. When you do, use the headers and routes documented in [APIEase Public API](./apiease-public-api.md).

For direct remote execution of an existing saved request, the current route is:

```bash
curl -X POST 'https://app-admin.apiease.com/api/remote/caller/call?requestId=product-details-proxy' \
  -H 'x-apiease-api-key: your-apiease-api-key' \
  -H 'x-shop-myshopify-domain: yourstore.myshopify.com'
```

The remote caller parameter is still named `requestId`; pass the request handle as its value for new work.

## Keep source control in the loop

The intended AI-agent workflow is not "make API calls and hope the platform state is remembered later." The repository should capture the durable definition of what the project wants APIEase to contain.

In a template-based repository, agents should usually version:

- `apiease.config.js`
- `.apiease/project.json`
- resource definitions under `resources/*`
- project-specific notes in `CUSTOM_README.md`
- project-specific agent instructions in `CUSTOM_AGENT_GUIDANCE.md`

Use git review as part of the workflow:

- inspect diffs before syncing or committing
- keep commits focused on one resource or one related change set
- use `apiease upgrade --check` and `apiease upgrade --dry-run` when updating the template baseline

Keep project-specific decisions in the `CUSTOM_*` files so later template upgrades can refresh template-owned files without overwriting local operating guidance.

## What good agent tasks look like

AI agents work best when the task says:

- which resource type should change
- which file under `resources/*` should be created or updated
- which existing docs or examples should be used as the contract reference
- whether the agent should sync through the CLI or stop at a reviewed git diff

That gives the agent a repository-first workflow with clear boundaries:

- local files define the desired state
- `apiease-cli` applies that state to APIEase
- the public API stays available for lower-level integrations
- git preserves the change history
