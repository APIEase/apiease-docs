---
title: apiease-cli
description: Install and use apiease-cli to initialize template projects and manage APIEase resources through the public API.
---
# apiease-cli

`apiease-cli` is the Node-based command-line tool for working with APIEase from a repository.

Use it when you want to:

- initialize a project from the APIEase template
- keep requests, widgets, variables, and functions under source control
- create, read, update, and delete saved APIEase resources from local JSON files
- apply template updates without overwriting local conflicts

In practice, `apiease-cli` is the thin layer between your repository and the [APIEase Public API](./apiease-public-api.md).

## How the CLI fits the workflow

The intended developer workflow is:

1. start from an APIEase project repository
2. use `apiease init` to copy in the current template structure
3. configure APIEase authentication for the target environment
4. store resource definitions in git as JSON files
5. use `apiease create`, `read`, `update`, and `delete` to sync those files with APIEase
6. use `apiease upgrade` to pull safe template updates later

This keeps your APIEase configuration versioned in git while still using the same public API contract that powers the CLI.

## Install

`apiease-cli` requires Node.js 20 or newer.

From the CLI repository:

```bash
npm install
npm link
```

After linking, run the installed command as:

```bash
apiease
```

If you are working directly inside the CLI repository without linking it globally, use `./bin/apiease-cli` instead.

## Configure authentication

Every CRUD command needs three values:

- an APIEase base URL
- an APIEase API key
- a Shopify shop domain

You can pass all three values explicitly on each command:

```bash
apiease create request \
  --file ./request-definition.json \
  --base-url https://your-apiease-host.example.com \
  --shop-domain yourstore.myshopify.com \
  --api-key your-apiease-api-key
```

If any of those values are omitted, the CLI reads your active APIEase environment from `~/.apiease`.

Create the home directory:

```bash
mkdir -p ~/.apiease
```

Declare the active environment in `~/.apiease/environment`. The supported values are:

- `local`
- `staging`
- `production`

Example local setup:

```bash
printf 'local\n' > ~/.apiease/environment
printf 'APIEASE_API_KEY=your-local-api-key\nAPIEASE_BASE_URL=https://your-local-apiease-host.example.com\nAPIEASE_SHOP_DOMAIN=yourstore.myshopify.com\n' > ~/.apiease/.env.local
```

Configuration precedence is:

1. explicit command flags
2. the selected `~/.apiease/.env.<environment>` file

Important details:

- if you provide all three explicit values, the CLI skips home configuration resolution
- if you provide only some values, the CLI merges them with the active home environment
- `APIEASE_API_KEY` is always required
- `APIEASE_BASE_URL` and `APIEASE_SHOP_DOMAIN` must resolve either from flags or from the active env file

## Command shape

The installed command is `apiease`, but the CLI help text still uses `apiease-cli` in usage output.

Supported top-level commands are:

- `init`
- `upgrade`
- `create`
- `read`
- `update`
- `delete`

CRUD commands always require a resource name immediately after the verb. Supported resources are:

- `request`
- `widget`
- `variable`
- `function`

Legacy bare command shapes such as `apiease read --request-id request-1` are not supported. Use the resource name explicitly:

```bash
apiease read request --request-id request-1
```

## Initialize a project

Use `init` to create or initialize a repository from the current template:

```bash
apiease init my-project
```

```bash
apiease init .
```

Current CLI behavior:

- the template source resolves from the local sibling repository `../apiease-template`
- the command writes project metadata to `.apiease/project.json`
- metadata includes the template version and a manifest of template-managed files
- `.git`, `.idea`, and `node_modules` are excluded from the copied template
- existing conflicting files are preserved and reported instead of overwritten

That makes `init` safe to use when you are starting a new repository or layering the template into an existing directory.

## Upgrade a project

Use `upgrade` to compare your project against the current template version:

```bash
apiease upgrade --check
apiease upgrade --dry-run
apiease upgrade
```

Current behavior:

- `--check` compares the stored template version in `.apiease/project.json` to the current template version
- `--dry-run` shows planned `Add`, `Update`, `Remove`, and `Skip conflict` paths without writing files
- `upgrade` applies safe template-managed changes and leaves conflicts in place
- `CUSTOM_README.md` and `CUSTOM_AGENT_GUIDANCE.md` are treated as customer-owned files instead of template-managed content
- the project metadata is updated after safe changes are applied

This is the CLI command that keeps a template-based repository current without blindly replacing local work.

## Manage resources

The CLI manages four saved APIEase resource types:

| Resource | Create or update file | Identifier flag |
| --- | --- | --- |
| Request | JSON object | `--request-id` |
| Widget | JSON object | `--widget-id` |
| Variable | JSON object | `--variable-name` |
| Function | JSON object | `--function-id` |

All definition files must contain valid JSON with an object at the root.

Typical commands:

```bash
apiease create request --file ./request-definition.json
apiease read request --request-id request-123
apiease update request --request-id request-123 --file ./request-definition.json
apiease delete request --request-id request-123
```

The same CRUD pattern applies to widgets, variables, and functions:

```bash
apiease create widget --file ./widget-definition.json
apiease read variable --variable-name sale_banner
apiease update function --function-id function-123 --file ./function-definition.json
apiease delete widget --widget-id widget-123
```

Inside a template-based repository, the example resource files currently live under:

- `docs/examples/resources/requests`
- `docs/examples/resources/widgets`
- `docs/examples/resources/variables`
- `docs/examples/resources/functions`

Those files are a starting point. Replace them with project-specific resources and commit the definitions to git.

## Request definitions and related docs

When you manage request resources through the CLI, the JSON file uses the same request concepts as the rest of APIEase. Use the existing docs for those details:

- [Requests Overview](../requests/requests-overview.md)
- [Request Types Overview](../requests/request-types/request-types-overview.md)
- [Request Parameters Overview](../requests/request-parameters/request-parameters-overview.md)
- [Triggers Overview](../requests/triggers/triggers-overview.md)
- [Widgets Overview](../widgets/widgets-overview.md)
- [Functions](../functions/functions-page.md)
- [Variables](../variables/variables-page.md)

For the underlying HTTP routes and authentication headers, see [APIEase Public API](./apiease-public-api.md).

## JSON output and failures

Add `--json` when you want the raw structured response:

```bash
apiease create request --file ./request-definition.json --json
```

Without `--json`, the CLI prints human-readable success and failure output.

Structured failures include the APIEase error code, message, optional HTTP status, and any field errors returned by the public API.
