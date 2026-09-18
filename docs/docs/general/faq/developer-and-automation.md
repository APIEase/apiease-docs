---
title: Developer tools and automation FAQ
description: Quick answers about the APIEase public API, API keys, handles, apiease-cli, apiease-template, remote execution, and AI-assisted workflows.
---
# Developer tools and automation FAQ

## Should I use the APIEase admin, Apex, the CLI, the template, or the public API?

Use the APIEase admin for interactive configuration and testing. Use Apex for conversational proposals covering requests, widgets, Variables, and Functions inside APIEase. For source-controlled work, start with [`apiease-template`](../../developers/why-use-the-template.md) and use [`apiease-cli`](../../developers/apiease-cli.md) to sync saved resources. Use the [public API](../../developers/apiease-public-api.md) directly for custom HTTP automation that the CLI does not cover.

A coding agent working in a template repository is a separate workflow from Apex. See the [developer overview](../../developers/developer-overview.md) for the complete comparison.

## Is the APIEase public API an arbitrary outbound API proxy?

No. The APIEase public API manages saved request, widget, Variable, and Function resources, and it can execute an existing saved request remotely. Create the saved resource first; you cannot send the remote caller an arbitrary destination URL and use APIEase as a one-off proxy. See the [public API contract](../../developers/apiease-public-api.md).

## How do I authenticate to the APIEase public API?

Send your APIEase API key in `x-apiease-api-key` and the target shop domain in `x-shop-myshopify-domain`. This key authenticates calls into APIEase; it is not a Shopify access token or an external provider credential. Learn how the key is stored and rotated on the [APIEase API Key](../settings/apiease-api-key.md) page.

## How do I run a saved request from another system?

Send a request to `/api/remote/caller/call?requestId={request-handle}` with the APIEase authentication headers. Although the query parameter is named `requestId`, use the saved request's handle as its value for new integrations. Follow [Calling APIEase Requests Remotely](../../requests/triggers/calling-requests-remotely.md) for the complete example and parameter behavior.

## What is a resource handle, and should I store an id in git?

A handle is the stable, user-controlled public identifier for a saved request, widget, Variable, or Function. Use it in source files, CLI commands, and public API item routes. Do not store server-owned `id` values in repository resource definitions. See [Resource handles](../../developers/resource-handles.md) for formats, legacy aliases, and execution surfaces that still call the value `requestId`.

## How do I keep APIEase resources in source control?

Initialize a repository with `apiease init`, store request, widget, Variable, and Function definitions under the directories configured by `apiease.config.js`, and commit those files to git. Use the [template quickstart](../../developers/quickstart-with-apiease-template.md) for setup and the [`apiease-template` reference](../../developers/apiease-template.md) for file ownership and upgrade behavior.

## Does `apiease create` create duplicates when I rerun it?

Not when a request, widget, Variable, or Function file has a valid `handle`. `apiease create <resource> --file <path>` reads the remote resource by handle, updates it when found, and creates it when missing. Lookup failures other than not found stop the command. See [`apiease-cli`](../../developers/apiease-cli.md) for supported resources, flags, and migration options.

## Can an AI agent manage APIEase resources for me?

Yes, but choose the workflow deliberately. Apex can propose creates, updates, and deletes for requests, widgets, Variables, and Functions, with an in-product review before approval. A coding agent in an `apiease-template` repository can manage the same families as files and sync them with `apiease-cli`, with git diffs providing a review boundary. Follow [Using APIEase with AI agents](../../developers/using-apiease-with-ai-agents.md).

## Does Apex preview or wait for approval before changing a resource?

Yes. Apex presents an immutable proposal with the exact resource operations and full before-and-after description changes for creates and updates. Approve it to apply those reviewed bytes, reject it to leave live resources unchanged, or request changes to begin a new proposal revision. Approval and application do not by themselves verify that an external integration works end to end.

Request execution safety is narrower: Apex may initially use an integration-specific dry-run setting or disabled `ALLOW_*` Variable where appropriate. Inspect and test the request before enabling live behavior. See [Using APIEase with AI agents](../../developers/using-apiease-with-ai-agents.md) for this distinction.
