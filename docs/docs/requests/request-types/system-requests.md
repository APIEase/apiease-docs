---
title: System Requests
description: Use internal system functions to set, get, and delete APIEase variables.
---
# System Requests

System requests run internal APIEase functions. Unlike HTTP requests, System requests do not call an external URL.

If you want to manage the same persisted values manually in the admin, see the [Variables page](../../variables/variables-page.md).

## When to use System requests

Use a System request when you need an internal, app-managed action (for example, managing shop variables) instead of calling an external service.

## How to define a System request

**System Request Fields**

- **Name**: Optional display name. Required if this request is called by name from a [chained request](../request-parameters/chained-requests.md).
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

- `name` (string, required)

## Supported functions

### setVariables

Each `arguments` entry supports:

- `name` (required)
- `value` (required to set a meaningful value; may be `null` if intentionally setting `null`)
- `sensitive` (optional boolean; APIEase may accept `"true"` / `"false"` but prefer a boolean)

Response `data` shape:

```json
{
  "<name>": { "set": true }
}
```

Example system parameters:

- `function`: `setVariables`
- `arguments` (JSON string):

```json
[
  { "name": "variable1", "value": "value1", "sensitive": true },
  { "name": "variable2", "value": "value2" }
]
```

Example response (`data`):

```json
{ "variable1": { "set": true }, "variable2": { "set": true } }
```

### getVariables

Each `arguments` entry supports:

- `name` (required)
- `defaultValue` (optional; used when the variable is missing or null/undefined)

Response `data` shape:

```json
{
  "<name>": "<value-or-default-or-null>"
}
```

Example `arguments` (JSON string):

```json
[
  { "name": "variable1" },
  { "name": "variable2", "defaultValue": "fallback2" }
]
```

Example response (`data`):

```json
{ "variable1": "persistedValue1", "variable2": "fallback2" }
```

### deleteVariables

Each `arguments` entry supports:

- `name` (required)

Response `data` shape:

```json
{
  "<name>": { "deleted": true }
}
```

Example `arguments` (JSON string):

```json
[
  { "name": "variable1" },
  { "name": "variable2" }
]
```

Example response (`data`):

```json
{ "variable1": { "deleted": true }, "variable2": { "deleted": false } }
```
