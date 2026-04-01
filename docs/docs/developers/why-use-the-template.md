---
title: Why use the template
description: Learn why apiease-template is the recommended starting point for repository-based APIEase development.
---
# Why use the template

If you plan to build with APIEase as code, start from `apiease-template`.

It is the recommended starting point because it gives you a real project structure, a supported CLI workflow, and a safer way to keep APIEase resources under source control. The template is how APIEase turns requests, widgets, variables, and functions into repository-managed assets instead of one-off platform state.

If you want the full setup steps, start with [Quickstart with apiease-template](./quickstart-with-apiease-template.md).

## Start here when

Use the template if you want to:

- keep APIEase resources in git instead of only in the APIEase UI
- initialize a project with `apiease init` and manage it with [apiease-cli](./apiease-cli.md)
- give humans and AI agents the same repository layout and operating guidance
- adopt future template improvements through `apiease upgrade`

For most developer workflows, the template should come first, the CLI should be the normal operating tool, and the [APIEase Public API](./apiease-public-api.md) should stay available for lower-level integrations.

## What the template gives you

### A real repository shape

The template creates a defined project layout instead of asking each team to invent one.

Today that means:

- `apiease.config.js` as the source of truth for resource directories
- `resources/requests`
- `resources/widgets`
- `resources/variables`
- `resources/functions`
- `.apiease/project.json` for project metadata

That structure matters because the resource model in the repository matches the resource model in APIEase and the public API. Teams are not left guessing where files should live or how to organize saved definitions.

### Valid starting examples

The template includes example JSON files under `docs/examples/resources` that already follow the current public API shapes.

That means you can copy and adapt real starting points instead of reverse-engineering request or widget contracts from scratch. When you need the detailed request semantics behind those files, use the existing Requests docs:

- [Requests Overview](../requests/requests-overview.md)
- [Request Types Overview](../requests/request-types/request-types-overview.md)
- [Request Parameters Overview](../requests/request-parameters/request-parameters-overview.md)
- [Triggers Overview](../requests/triggers/triggers-overview.md)

### A safer upgrade path

The template is not just a folder snapshot. When you initialize a project through the CLI, APIEase stores template metadata in `.apiease/project.json`, including the template version and a manifest of template-managed files.

That gives `apiease upgrade` enough information to:

- add safe new template files later
- refresh template-managed files when they still match the previous template baseline
- skip conflicts instead of overwriting local work
- keep `CUSTOM_README.md` and `CUSTOM_AGENT_GUIDANCE.md` as customer-owned files

Without the template, you can still call the API or use the CLI, but you lose the supported upgrade model that keeps repository structure and guidance current over time.

### Better human and agent handoff

The template bundles more than empty directories. It also includes:

- `AGENTS.md` for default operating guidance
- `docs/shared-ongoing-ai-guidance.md` for shared implementation lessons
- `docs/knowledgebase/apiEaseDocsConsolidated.md` for local product reference material
- `CUSTOM_README.md` for project-specific human documentation
- `CUSTOM_AGENT_GUIDANCE.md` for project-specific agent instructions

This is one of the biggest reasons to start from the template. Humans, Codex-style agents, and the CLI all work from the same repository instead of relying on hidden conventions or repeated prompt context.

For more on that workflow, see [Using APIEase with AI agents](./using-apiease-with-ai-agents.md).

## Why not start with the CLI or public API alone

You can use the CLI or the public API without fully adopting the template, but that usually pushes important project decisions back onto the team.

If you skip the template, you need to decide for yourself:

- where resource files belong
- which files should be committed
- how project-specific guidance should be separated from shared guidance
- how to keep future template changes aligned with the repository

The CLI is best understood as the tool that operates on a template-based repository. The public API is the lower-level interface behind that workflow. The template is what makes those interfaces practical for long-term team use.

## Recommended path

For most teams, the practical path is:

1. start with [Quickstart with apiease-template](./quickstart-with-apiease-template.md)
2. learn the project structure in [apiease-template](./apiease-template.md)
3. use [apiease-cli](./apiease-cli.md) for day-to-day sync operations
4. use the [APIEase Public API](./apiease-public-api.md) directly only when you need lower-level automation

That path keeps the template as the entry point while still making the CLI and public API available for the jobs they are best at.
