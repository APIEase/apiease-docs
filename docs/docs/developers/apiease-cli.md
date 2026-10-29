---
title: apiease-cli
description: Install and use apiease-cli to initialize template projects and manage APIEase resources through the public API.
---
# apiease-cli

`apiease-cli` is the Node-based command-line tool for working with APIEase from a repository.

GitHub repository: [APIEase/apiease-cli](https://github.com/APIEase/apiease-cli)

Use it when you want to:

- initialize a project from the APIEase template
- keep requests, widgets, variables, and functions under source control
- create or update, read, and delete saved APIEase resources from local JSON files
- apply template updates without overwriting local conflicts

In practice, `apiease-cli` is the thin layer between your repository and the [APIEase Public API](./apiease-public-api.md).

## How the CLI fits the workflow

The intended developer workflow is:

1. start from an APIEase project repository
2. use `apiease init` to copy in the current template structure
3. configure APIEase authentication for the target environment
4. store resource definitions in git as JSON files
5. use idempotent `apiease create` commands to sync those files with APIEase, then `read` or `delete` resources when needed
6. use `apiease upgrade` to pull safe template updates later

This keeps your APIEase configuration versioned in git while still using the same public API contract that powers the CLI.

## Install

`apiease-cli` requires Node.js 20 or newer.

Install the published package from npm:

```bash
npm install -g apiease
```

The installed command is:

```bash
apiease
```

If you are developing the CLI itself from its repository, install its dependencies and link the local package:

```bash
npm install
npm link
```

If you are working directly inside the CLI repository without linking it globally, use `./bin/apiease-cli` instead.

## Configure authentication

CRUD and project context commands need three values:

- an APIEase base URL, which normally should be `https://app-admin.apiease.com`
- an APIEase API key
- a Shopify shop domain

You can pass all three values explicitly on each command:

```bash
apiease create request \
  --file ./request-definition.json \
  --base-url https://app-admin.apiease.com \
  --shop-domain yourstore.myshopify.com \
  --api-key your-apiease-api-key
```

If any of those values are omitted, the CLI reads your active APIEase environment from `~/.apiease`.

Create the home directory:

```bash
mkdir -p ~/.apiease
```

Declare the active environment in `~/.apiease/environment`. Common values are:

- `local`
- `staging`
- `production`

Custom environment names such as `qa` are also supported when the matching `~/.apiease/.env.qa` file exists.

Example local setup:

```bash
printf 'local\n' > ~/.apiease/environment
printf 'APIEASE_API_KEY=your-local-api-key\nAPIEASE_BASE_URL=https://app-admin.apiease.com\nAPIEASE_SHOP_DOMAIN=yourstore.myshopify.com\n' > ~/.apiease/.env.local
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

The installed command and CLI help use `apiease`.

Supported top-level commands are:

- `init`
- `upgrade`
- `pull`
- `design-context`
- `validate`
- `apply`
- `rename`
- `create`
- `read`
- `update`
- `delete`

CRUD commands always require a resource name immediately after the verb. Supported resources are:

- `request`
- `widget`
- `variable`
- `function`

Legacy bare command shapes such as `apiease read --request-handle product-details-proxy` are not supported. Use the resource name explicitly:

```bash
apiease read request --request-handle product-details-proxy
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

- the installed CLI retrieves the current `apiease-template`; local CLI development can use a sibling template checkout
- the command writes project metadata to `.apiease/project.json`
- metadata includes the template version and a manifest of template-managed files
- `.git`, `.idea`, and `node_modules` are excluded from the copied template
- existing conflicting files are preserved and reported instead of overwritten

That makes `init` safe to use when you are starting a new repository or layering the template into an existing directory.

## Retrieve project design context

With authentication configured, run this from an initialized project checkout:

```bash
apiease design-context
```

The command returns the verified APIEase Project Design Protocol instructions and Codex execution envelope, server resources, server and local baselines, local edits, deletion intent, protected-value selectors, limits, and diagnostics. Context retrieval does not apply resource changes or rewrite canonical resource files. Authentication, project identity, protocol verification, and baseline conflict checks still apply. Initialize a new checkout with `apiease init` or `apiease init --from-existing-resources`; use `apiease pull` to establish or deliberately refresh its baseline.

Requirements are optional and unnecessary when the coding agent already has the task in its conversation. When omitted, `projectRequirements` is absent from the request and returned context. The command does not infer requirements from documentation or create empty requirements. Supplied requirements are validated and returned; they do not filter the resources or instruction modules.

To include explicit requirements:

```bash
apiease design-context --project-requirements '{"projectName":"Order status","customerRequirements":[{"id":"status","text":"Show order status."}],"confirmedDecisions":[]}'
```

The JSON object must contain exactly `projectName`, `customerRequirements`, and `confirmedDecisions`. Use a nonempty project name, an array of `{id, text}` objects with nonempty strings, and an array of nonempty decision strings. Both arrays may be empty. Names and requirement IDs allow up to 1,024 characters; requirement text and decisions allow up to 65,536 characters; each array allows up to 1,000 entries. Malformed JSON, invalid shapes, unknown fields, and explicit `null` fail.

`design-context` emits one JSON result on stdout, including on failure. Corrective argument guidance goes to stderr. Existing exit codes distinguish usage/configuration (2), authentication/authorization (3), contract/validation (4), baseline conflicts (5), checkout integrity (6), and service/transport failures (7).

### Save context as local reference files

If `apiease --help` lists `--output-dir`, use it to keep large contexts out of the
terminal output:

```bash
apiease design-context --output-dir /tmp/apiease-context-1
```

The destination must be new and its parent must exist. Relative paths resolve from
the directory where you run the command. Choose a location outside `resources/`.
The JSON briefing contains project baselines, change counts, reading guidance, and
file paths with byte sizes and SHA-256 digests.

Read `instructions.md` and `codex-envelope.md` before authoring. Inspect
`inventory.json` and `local-changes.json`, then read the relevant entries from
`server-resources.json`. The complete original context remains in `context.json`,
including limits, diagnostics, resource bindings, and requirements when supplied.
Instruction bytes are preserved exactly; authentication, verification, and conflict
checks still run before files are written.

Existing files, directories, and symlink destinations are never overwritten.
An existing destination or write failure returns exit code 6; incomplete files
created by this invocation are removed on write failure. Canonical resources and
project operational state are unchanged. Without the option, output stays inline.

This export is a point-in-time reference, not an automatically refreshed cache or
approval. Retrieve fresh context for new work. `apiease upgrade` separately updates
template-owned files; retrieving context does not upgrade the template or edit
your custom guidance. File delivery preserves the current instruction set and
server retrieval while reducing terminal output.

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

| Resource | Definition file | Preferred identifier flag |
| --- | --- | --- |
| Request | JSON object | `--request-handle` |
| Widget | JSON object | `--widget-handle` |
| Variable | JSON object | `--variable-handle` |
| Function | JSON object | `--function-handle` |

All definition files must contain valid JSON with an object at the root. Use `handle` as the stable source-controlled identifier. Server-owned `id` values are metadata returned by APIEase and should not be stored in request, widget, variable, or function source files.

All four resource types support a `description` that records purpose, behavior,
and important relationships. Keep it in the JSON file so pull, review, and Git
history preserve the same text as APIEase. Omit the field from an update to keep
the saved description, or set it to an empty string to clear it. Do not use
`null`, and do not put credentials or temporary lifecycle status in descriptions.

Widget files use `handle` for the stable identifier and `name` for display text. Older widget files that use `widgetHandle` or `widgetName` can be migrated with `apiease create widget --file ./widget-definition.json --auto-update-source-identifier` before the create-or-update operation.

Handles should be lowercase slug values using letters, numbers, and hyphens, for example:

```json
{
  "handle": "product-details-proxy",
  "name": "Product Details Proxy",
  "description": "Fetch product details from the external catalog service.",
  "type": "http",
  "method": "GET",
  "address": "https://api.example.com/products"
}
```

Create or update a resource from a JSON file:

```bash
apiease create request --file ./request-definition.json
```

For requests, widgets, variables, and functions, `apiease create <resource>` is idempotent when the file has a valid `handle`. The CLI looks up the remote resource by handle, updates it when found, and creates it when missing.

Lookup failures other than not found stop the command instead of falling back to create. Human output reports either `<Resource> created successfully.` or `<Resource> updated successfully.`, and JSON output includes `operation` as `created` or `updated`. For example, rerunning `apiease create widget --file ./widget-definition.json` updates the existing widget instead of creating a duplicate.

Read, update explicitly, and delete by handle:

```bash
apiease read request --request-handle product-details-proxy
apiease update request --request-handle product-details-proxy --file ./request-definition.json
apiease delete request --request-handle product-details-proxy
```

The same handle-based command pattern applies to widgets, variables, and functions:

```bash
apiease create widget --file ./widget-definition.json
apiease read widget --widget-handle promo-banner
apiease update widget --widget-handle promo-banner --file ./widget-definition.json
apiease delete widget --widget-handle promo-banner

apiease create variable --file ./variable-definition.json
apiease read variable --variable-handle support-api-key
apiease update variable --variable-handle support-api-key --file ./variable-definition.json
apiease delete variable --variable-handle support-api-key

apiease create function --file ./function-definition.json
apiease read function --function-handle format-price
apiease update function --function-handle format-price --file ./function-definition.json
apiease delete function --function-handle format-price
```

Legacy flags remain available as compatibility aliases:

- `--request-id`
- `--widget-id`
- `--variable-name`
- `--function-id`

Prefer the handle-named flags in new docs, scripts, and agent instructions. If you use a legacy alias during migration, pass the resource handle as the value.

For older request files that still contain `id` metadata or no `handle`, you can migrate only the local identifier metadata:

```bash
apiease create request --file ./request-definition.json --auto-update-source-identifier
```

For older widget files that still contain `widgetHandle` or `widgetName`, you can migrate the local source fields before the create-or-update operation:

```bash
apiease create widget --file ./widget-definition.json --auto-update-source-identifier
```

The widget migration writes `handle` from `widgetHandle` only when `handle` is missing, writes `name` from `widgetName` only when `name` is missing, preserves unrelated widget fields, and uses the resulting `handle` for create-or-update behavior.

Inside a template-based repository, the example resource files currently live under:

- `docs/examples/resources/requests`
- `docs/examples/resources/widgets`
- `docs/examples/resources/variables`
- `docs/examples/resources/functions`

Those files are a starting point. Replace them with project-specific resources and commit the definitions to git.

For the broader identifier model, see [Resource handles](./resource-handles.md).

## Request definitions and related docs

When you manage request resources through the CLI, the JSON file uses the same request concepts as the rest of APIEase. Use the existing docs for those details:

- [Requests Overview](../requests/requests-overview.md)
- [Request Types Overview](../requests/request-types/request-types-overview.md)
- [Request Parameters Overview](../requests/request-parameters/request-parameters-overview.md)
- [Triggers Overview](../requests/triggers/triggers-overview.md)
- [Widgets Overview](../widgets/widgets-overview.md)
- [Functions](../functions/functions-overview.md)
- [Variables](../variables/variables-overview.md)

For the underlying HTTP routes and authentication headers, see [APIEase Public API](./apiease-public-api.md).

## JSON output and failures

Add `--json` when you want the raw structured response:

```bash
apiease create request --file ./request-definition.json --json
```

Without `--json`, the CLI prints human-readable success and failure output.

For create-or-update commands, JSON output includes `operation: "created"` when the CLI created a missing resource and `operation: "updated"` when it updated an existing resource.

Structured failures include the APIEase error code, message, optional HTTP status, and any field errors returned by the public API.
