---
title: Developer overview
description: Start here for the template-first APIEase developer workflow, including onboarding, CLI usage, public API usage, and AI-agent guidance.
---
# Developer overview

This section is the developer entry point for building with APIEase as code.

For most teams, the recommended path starts with `apiease-template`, uses `apiease-cli` for day-to-day operations, and reaches for the [APIEase Public API](./apiease-public-api.md) only when direct HTTP automation is the better fit.

If you are new to this workflow, start with [Quickstart with apiease-template](./quickstart-with-apiease-template.md).

## Recommended path

Use this reading order when you are getting started:

1. [Why use the template](./why-use-the-template.md) to understand why `apiease-template` is the recommended starting point
2. [Quickstart with apiease-template](./quickstart-with-apiease-template.md) to initialize the project, configure auth, and sync resources
3. [apiease-template](./apiease-template.md) to understand the repository layout and what belongs in source control
4. [apiease-cli](./apiease-cli.md) for the command-line workflow that manages saved resources
5. [APIEase Public API](./apiease-public-api.md) when you need lower-level HTTP integration
6. [Using APIEase with AI agents](./using-apiease-with-ai-agents.md) when Codex-style agents will work inside the repository

## Choose the right page

Use these pages based on the job you need to do:

- [Quickstart with apiease-template](./quickstart-with-apiease-template.md): the canonical start-here path for repository-based APIEase development
- [Why use the template](./why-use-the-template.md): why the template comes before the CLI or public API in most projects
- [apiease-template](./apiease-template.md): expected repository layout, template-managed files, and version-controlled artifacts
- [apiease-cli](./apiease-cli.md): installation, configuration, CRUD commands, and template upgrade workflow
- [APIEase Public API](./apiease-public-api.md): authentication, resource routes, remote request execution, and direct HTTP usage
- [Using APIEase with AI agents](./using-apiease-with-ai-agents.md): repository-first guidance for Codex-style agents

## How this fits the rest of the docs

The Developers section focuses on the developer workflow around repositories, the CLI, and the public API.

For request behavior, request contracts, and other platform concepts, use the existing docs instead of treating this section as a duplicate reference:

- [Requests Overview](../requests/requests-overview.md)
- [Request Types Overview](../requests/request-types/request-types-overview.md)
- [Request Parameters Overview](../requests/request-parameters/request-parameters-overview.md)
- [Triggers Overview](../requests/triggers/triggers-overview.md)
- [Widgets Overview](../widgets/widgets-overview.md)
- [Functions](../functions/functions-page.md)
- [Variables](../variables/variables-page.md)

## Practical workflow summary

In the intended workflow, you initialize a repository from the template, keep resource definitions in git, use `apiease-cli` to sync them with APIEase, and use the public API directly only when you need lower-level automation outside the normal CLI path.
