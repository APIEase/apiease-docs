---
title: System Requests
description: Use internal system functions to set, get, and delete APIEase variables.
---
# System Requests

System requests run internal APIEase functions. Unlike HTTP requests, System requests do not call an external URL.

If you want to manage the same persisted values manually in the admin, see [Variables Overview](../../variables/variables-overview.md).

## When to use System requests

Use a System request when you need an internal, app-managed action (for example, managing shop variables) instead of calling an external service.

## How to define a System request

**System Request Fields**

- **Name**: Optional display name.
- **Handle**: Stable identifier used when another request calls this one via a [chained request](../request-parameters/chained-requests.md).
- **Type**: Set to `system`.
- **Address**: Unused for System requests (leave blank).
- **Parameters ([?](../request-parameters/in-app-vs-dynamic.md))**:
  - **System**: Provide the system parameters listed below.

System request behavior is controlled by two in-app system parameters:

- `function`: One of `setVariables`, `getVariables`, or `deleteVariables`
- `arguments`: Either:
  - a JSON string representing the arguments array (recommended for persisted request definitions), or
  - an actual array at runtime (for example via `httpParameters.system.arguments`)

`arguments` must be an array (or a JSON string that parses to an array) of objects. Each array entry must include:

- `handle` (string, recommended), or
- `name` (string, legacy compatibility fallback)

Use `handle` for new System Request variable operations. Variable names are display text and can become ambiguous; handles are the stable public identifiers used by the CLI and public API.

## Supported functions

### setVariables

Each `arguments` entry supports:

- `handle` (recommended)
- `name` (legacy fallback)
- `value` (required to set a meaningful value; may be `null` if intentionally setting `null`)
- `sensitive` (optional boolean; APIEase may accept `"true"` / `"false"` but prefer a boolean)

Response `data` shape:

```json
{
  "<handle-or-name>": { "set": true }
}
```

Example system parameters:

- `function`: `setVariables`
- `arguments` (JSON string):

```json
[
  { "handle": "support-api-key", "value": "value1", "sensitive": true },
  { "handle": "support-email", "value": "help@example.com" }
]
```

Example response (`data`):

```json
{ "support-api-key": { "set": true }, "support-email": { "set": true } }
```

### getVariables

Each `arguments` entry supports:

- `handle` (recommended)
- `name` (legacy fallback)
- `defaultValue` (optional; used when the variable is missing or null/undefined)

Response `data` shape:

```json
{
  "<handle-or-name>": "<value-or-default-or-null>"
}
```

Example `arguments` (JSON string):

```json
[
  { "handle": "support-api-key" },
  { "handle": "support-email", "defaultValue": "help@example.com" }
]
```

Example response (`data`):

```json
{ "support-api-key": "persistedValue1", "support-email": "help@example.com" }
```

### deleteVariables

Each `arguments` entry supports:

- `handle` (recommended)
- `name` (legacy fallback)

Response `data` shape:

```json
{
  "<handle-or-name>": { "deleted": true }
}
```

Example `arguments` (JSON string):

```json
[
  { "handle": "support-api-key" },
  { "handle": "support-email" }
]
```

Example response (`data`):

```json
{ "support-api-key": { "deleted": true }, "support-email": { "deleted": false } }
```
