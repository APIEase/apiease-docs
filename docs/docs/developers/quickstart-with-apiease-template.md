---
title: Quickstart with apiease-template
description: Start from apiease-template, configure APIEase authentication, version your resource definitions in git, and sync them through apiease-cli.
---
# Quickstart with apiease-template

This is the recommended way to start building with APIEase.

Use this quickstart when you want to:

- start from the APIEase template instead of inventing a repository layout
- configure APIEase authentication once and reuse it from the CLI
- keep requests, widgets, variables, and functions under source control
- sync those saved resources to APIEase through `apiease-cli`, which calls the [APIEase Public API](./apiease-public-api.md)

If you are new to the developer workflow, start here before the deeper pages for [apiease-template](./apiease-template.md), [apiease-cli](./apiease-cli.md), and the [APIEase Public API](./apiease-public-api.md).

## Before you start

You need:

- Node.js 20 or newer
- a working `apiease` command from [apiease-cli](./apiease-cli.md)
- the APIEase base URL `https://app-admin.apiease.com`
- an APIEase API key
- a Shopify shop domain such as `yourstore.myshopify.com`

If you have not installed the CLI yet, use the install steps in [apiease-cli](./apiease-cli.md).

## Initialize the project from the template

Start in a new repository directory or in an existing directory that you want to turn into an APIEase project.

For a new project:

```bash
mkdir my-apiease-project
cd my-apiease-project
apiease init .
```

For an existing repository:

```bash
cd your-existing-repo
apiease init .
```

`apiease init` creates the template-based project structure and writes `.apiease/project.json`, which stores the template version and the template-managed file manifest used later by `apiease upgrade`.

After initialization, the important files and directories are:

- `apiease.config.js`
- `.apiease/project.json`
- `resources/requests`
- `resources/widgets`
- `resources/variables`
- `resources/functions`
- `docs/examples/resources`
- `CUSTOM_README.md`
- `CUSTOM_AGENT_GUIDANCE.md`

Use `resources/*` as the long-term home for the resource definitions you want to keep and version. The files under `docs/examples/resources` are starter examples you can copy and adapt.

## Configure APIEase authentication

The CLI can read authentication and environment settings from `~/.apiease`, so you do not need to repeat them on every command.

Create the home directory:

```bash
mkdir -p ~/.apiease
```

Select the active environment:

```bash
printf 'local\n' > ~/.apiease/environment
```

Create the matching env file:

```bash
printf 'APIEASE_API_KEY=your-local-api-key\nAPIEASE_BASE_URL=https://app-admin.apiease.com\nAPIEASE_SHOP_DOMAIN=yourstore.myshopify.com\n' > ~/.apiease/.env.local
```

Supported environment names are:

- `local`
- `staging`
- `production`

You can still override any value per command with `--api-key`, `--base-url`, or `--shop-domain`, but most teams should keep the shared defaults in `~/.apiease`.

## Copy the starter resources into your project

The template ships with example JSON files under `docs/examples/resources`. Copy the examples you want into the configured `resources/*` directories and then edit them for your project.

For example:

```bash
cp docs/examples/resources/requests/example-request.json resources/requests/product-details-proxy.json
cp docs/examples/resources/variables/example-variable.json resources/variables/support_api_key.json
```

Then update the copied files with your real identifiers, endpoints, parameter values, and secrets.

The request example already uses the real public API request shape, including:

- `id`
- `name`
- `type`
- `method`
- `address`
- `parameters`
- `triggers`

Keep the detailed request behavior in the existing Requests docs instead of re-documenting it in your repository:

- [Requests Overview](../requests/requests-overview.md)
- [Request Types Overview](../requests/request-types/request-types-overview.md)
- [Request Parameters Overview](../requests/request-parameters/request-parameters-overview.md)
- [Triggers Overview](../requests/triggers/triggers-overview.md)

## Sync resources with APIEase through the CLI

Once your JSON files are ready, use `apiease-cli` to create the saved resources in APIEase.

Create a variable first if your request depends on one:

```bash
apiease create variable --file ./resources/variables/support_api_key.json
```

Create a request from your project file:

```bash
apiease create request --file ./resources/requests/product-details-proxy.json
```

Read it back from APIEase:

```bash
apiease read request --request-id product-details-proxy
```

Update it after you change the JSON file:

```bash
apiease update request --request-id product-details-proxy --file ./resources/requests/product-details-proxy.json
```

The same CRUD pattern applies to widgets, variables, and functions. The CLI is the normal path here: it reads your local JSON file, resolves auth, and calls the underlying [APIEase Public API](./apiease-public-api.md) for you.

Use direct HTTP calls only when you need lower-level automation outside the CLI workflow.

## Commit the project artifacts to git

The template workflow is repository-first. Commit the files that define your saved APIEase setup so changes can be reviewed and versioned like code.

In most projects, commit:

- `apiease.config.js`
- `.apiease/project.json`
- your JSON resource files under `resources/*`
- any examples you intentionally keep
- `CUSTOM_README.md`
- `CUSTOM_AGENT_GUIDANCE.md`

Typical initial commit flow:

```bash
git init
git add .
git commit -m "Initialize APIEase project"
```

Keep project-specific human guidance in `CUSTOM_README.md` and project-specific agent guidance in `CUSTOM_AGENT_GUIDANCE.md`. That keeps your custom instructions separate from the template-owned files that may later be refreshed by `apiease upgrade`.

## Keep the template current

Later, when the template changes, check whether your project can adopt the newer template version:

```bash
apiease upgrade --check
apiease upgrade --dry-run
```

If the plan looks correct, apply the safe template-managed updates:

```bash
apiease upgrade
```

This lets you pull in template improvements while preserving project-owned customization files and skipping managed conflicts instead of overwriting them.

## What this quickstart gives you

After these steps, you have:

- a template-based APIEase project repository
- reusable CLI authentication configuration
- versioned resource definitions under source control
- a repeatable path for syncing those definitions into APIEase through the CLI and public API

From here, use the deeper docs as needed:

- [apiease-template](./apiease-template.md)
- [apiease-cli](./apiease-cli.md)
- [APIEase Public API](./apiease-public-api.md)
