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

For each omitted value, the CLI checks the corresponding process environment variable, then the selected env file in `~/.apiease`.

Create the home directory:

```bash
mkdir -p ~/.apiease
```

For commands without `--environment`, declare the default environment in `~/.apiease/environment`. Common values are:

- `local`
- `staging`
- `production`

Custom environment names such as `qa` are also supported when the matching `~/.apiease/.env.qa` file exists.

Example local setup:

```bash
printf 'local\n' > ~/.apiease/environment
printf 'APIEASE_API_KEY=your-local-api-key\nAPIEASE_BASE_URL=https://app-admin.apiease.com\nAPIEASE_SHOP_DOMAIN=yourstore.myshopify.com\n' > ~/.apiease/.env.local
```

### Select an environment for one command

Use `--environment <name>` to read `~/.apiease/.env.<name>` for that invocation:

```bash
apiease read request --request-handle my-request --environment staging
apiease validate --environment staging --json
apiease init my-project --from-existing-resources --environment production
```

Create the matching env file before using it. For example:

```bash
printf 'APIEASE_API_KEY=your-staging-api-key\nAPIEASE_BASE_URL=https://app-admin.apiease.com\nAPIEASE_SHOP_DOMAIN=your-staging-store.myshopify.com\n' > ~/.apiease/.env.staging
```

With `--environment staging`, the CLI reads `.env.staging` directly. It neither reads nor changes `~/.apiease/environment`, and that declaration file need not exist. The flag does not save an environment selection or change project metadata or template upgrade behavior. Supply it again on each command that should use that file.

The name must start with a letter or digit and contain only letters, digits, dots, underscores, or hyphens, such as `staging` or `qa-us_2.1`. Empty names and paths are invalid.

The selected file must exist and be readable even when flags or process variables provide all three connection values. An invalid name, missing file, or unreadable file fails the command without falling back to the default environment:

| Problem | Error code |
| --- | --- |
| Invalid explicit environment name | `APIEASE_HOME_ENVIRONMENT_INVALID` |
| Selected env file does not exist | `APIEASE_HOME_ENV_FILE_NOT_FOUND` |
| Selected env file cannot be read | `APIEASE_HOME_ENV_FILE_READ_FAILED` |

### Configuration precedence

Each setting uses the first non-empty value in this order:

1. Explicit command flags: `--api-key`, `--base-url`, and `--shop-domain`.
2. Corresponding process variables: `APIEASE_API_KEY`, `APIEASE_BASE_URL`, and `APIEASE_SHOP_DOMAIN`.
3. The same variables in `~/.apiease/.env.<name>`, selected by `--environment <name>` or, when omitted, by `~/.apiease/environment`.

`--environment` selects the fallback file; it does not override process variables. For example, an exported `APIEASE_SHOP_DOMAIN` takes precedence over the shop domain in `.env.staging` even with `--environment staging`.

Without `--environment`, complete configuration from flags and process variables bypasses home configuration. Otherwise, the CLI fills missing settings from the file selected by `~/.apiease/environment`. All three connection values must resolve for API calls.

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

Place `--environment <name>` after the command, alongside its other options. Use the full option name; there is no `--env` alias.

| Command | Environment selection |
| --- | --- |
| `create`, `read`, `update`, `delete` | Supports `--environment` for all four resource types |
| `pull`, `design-context`, `validate`, `apply` | Supports `--environment` for API connection settings |
| `init --from-existing-resources` | Supports `--environment` when initializing from saved resources |
| Template-only `init`, `upgrade`, local `rename` | Does not use API connection settings |

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

## Read installed instructions

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

## Retrieve project design context

Use `apiease design-context` for current **project status**: resource inventory,
dependencies, local changes, and a **baseline check**. It requires authentication
and an initialized checkout, but is optional for reading instructions.

```bash
apiease design-context
apiease design-context --resource-path resources/requests/read-product-page.json
```

The **synchronization baseline** is the server state recorded after successful
synchronization or apply. A baseline check compares that recorded state with
current server state to detect intervening changes. It is separate from detecting
local edits and does not use Git commits as authority.

The command returns one JSON result on stdout. `result.inventory`, `dependencies`,
and `dependencyDiagnostics` cover the whole project. `localEdits.hasManagedEdits`
compares local content with the synchronization baseline; `differencesFromServer`
contains creates and updates relative to current server resources.
`baselineCheck.status` is `current` or `changed`, with details in `conflicts`.
A successful status read returns exit code 0 even when the baseline changed.
Reconcile deliberately before apply; validation and apply still enforce server
concurrency checks. Status does not synchronize or authorize changes.

`canonicalBodies` contains only sources selected with repeated `--resource-path`;
it is empty by default. Selection does not narrow inventory, dependencies,
validation, or apply. The command writes no instruction cache or context files.
Authentication and transport failures have no stale-state fallback.

Migration: instruction downloads, `--inline`, `--output-dir`, and
`--project-requirements` are retired. Read installed instructions after `init` or
`upgrade`; keep requirements in the conversation or `CUSTOM_*` files. Scripts must
consume the status fields above instead of `protocol`, `readFirst`, `files`, or
`cache`. CLI and server require design-context contract version 3; deploy them
together. Versions 1 and 2 fail explicitly. Other Project API and CLI JSON envelope
versions are unchanged. Invalid options exit 2; authentication/authorization,
contract, checkout-integrity, and service errors retain their existing exit codes.

## Upgrade a project

`apiease upgrade` updates project instructions, installed resource instructions,
and other template-managed files. It preserves `CUSTOM_*` guidance, resource JSON,
and operational bindings and synchronization state.

```bash
apiease upgrade --check
apiease upgrade --dry-run
apiease upgrade
apiease upgrade --on-conflict ignore
apiease upgrade --on-conflict overwrite
```

`--check` and `--dry-run` compare actual files and manifests as well as the recorded
template version; neither writes files. Exit code 0 means current; 1 means changes,
conflicts, or a failed check. `--dry-run --on-conflict overwrite` previews which
conflicting files would be replaced.

Unchanged managed files update normally. Differing local content is a conflict.
If the installed instruction manifest declares a higher protocol version, the CLI
reports it as newer; differing hashes and modification times do not establish age.
Interactive upgrades offer **Overwrite** or **Ignore**, defaulting to Ignore.
Scripts and agents use `--on-conflict overwrite|ignore`. Without an explicit
overwrite choice, noninteractive upgrades preserve and report conflicts without
prompting. Overwrite applies only to template-managed paths.

Resource instructions and their project entry points resolve as one set, so
ignoring a conflict preserves a coherent instruction set. Ignored paths remain
pending in template metadata and are not marked updated. An upgrade with unresolved
conflicts exits 1. Move custom guidance to `CUSTOM_*` before choosing overwrite.
Unrelated files remain untouched. The bundled product knowledge file retains its
existing always-refresh policy.

Template provenance lives in `.apiease/template.json` for operational checkouts,
and in `.apiease/project.json` before first synchronization. Older operational
checkouts without provenance treat differing existing files as conflicts; they do
not silently adopt those bytes as an unmodified template baseline.

`pull`, `validate`, `apply`, and `design-context` perform a shared, inexpensive
update check. Public templates use a commit feed without downloading the full
template; local development also compares template content. Available updates and
unavailable checks are reported on stderr, leaving JSON stdout unchanged. An
unavailable check does not mean current and does not block the requested command.
Checks never install updates. Use `upgrade --check` for a full file comparison.

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
