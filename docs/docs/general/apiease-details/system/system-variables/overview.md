---
title: System Variables overview
description: Use built-in APIEase values during request execution and understand unresolved references.
---
# System Variables overview

System Variables are built-in values provided by APIEase during request execution. Reference them wherever APIEase supports runtime variable substitution or Liquid rendering.

They are distinct from [persisted shop variables](../../../../variables/variables-overview.md), which you create and manage on the Variables page. They are also distinct from [System-type request parameters](../../../../requests/request-parameters/in-app-parameters/in-app-system-parameters.md), which control request behavior. You do not need to create or configure a System parameter to enable System Variables.

## Reference a System Variable

Names are case-sensitive. Use single braces, such as `{variableName}`, for APIEase runtime substitution. Use dot notation to access a child of an object.

For example, [apieaseMetaData](./apiease-metadata.md) provides supported information about the current execution:

- Whole object: `{apieaseMetaData}`
- API key friendly name: `{apieaseMetaData.apieaseApiKeyName}`

A bare `apieaseMetaData` value without braces is literal text. In native Liquid expressions, use Liquid syntax instead, such as `{{ apieaseMetaData.apieaseApiKeyName }}`.

Availability depends on where APIEase performs runtime substitution or Liquid rendering. Arbitrary widget JavaScript is not automatically rewritten to replace System Variable references.

## Unresolved references

If APIEase cannot resolve a single-brace reference, such as `{apieaseMetaDataFFFFF}`, it leaves the reference unchanged and execution continues.

APIEase reports an `UNRESOLVED_VARIABLE` warning in backend logs, the response's `warnings` array, and call history. The warning identifies the variable and the parameter's type and name, includes the request ID when available, and explains that execution continued. Parameter values are not included in the warning.

Referencing an absent object child can also produce this warning. For example, `{apieaseMetaData.apieaseApiKeyName}` is unresolved when the initiating request did not authenticate with a named APIEase API key. Check the spelling and case of the reference and whether the child is available for that execution.

These unchanged-reference and warning rules apply to APIEase single-brace substitution. They do not apply to native Liquid expressions such as `{{ apieaseMetaData.apieaseApiKeyName }}`, which are handled by Liquid rendering.
