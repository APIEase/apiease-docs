---
title: Runtime History
description: Control whether APIEase retains runtime parameter values and response data in request-chain history.
---
# Runtime History

`RECORD_RUNTIME_HISTORY` is a [System parameter](./overview.md) that controls the detail retained in a request's runtime history entry. This is the execution history carried through a request chain, including when that chain passes history into a Shopify Flow workflow.

## Retain runtime values

On the saved request whose values you want to retain, add:

| Field | Value |
| --- | --- |
| Type | **System** |
| Name | `RECORD_RUNTIME_HISTORY` |
| Value | `true` |

With `true`, APIEase includes runtime parameter values and response data in that request's history entry. Saved parameters explicitly marked **Sensitive** remain redacted. Response bodies and other runtime values can still contain confidential data, so enable this only when the chain needs those details.

## Default behavior

The default is `false`. Remove the parameter or set it to `false` to redact response data and runtime parameter values from the history entry. APIEase still records the history entry; this setting controls its detail rather than turning history collection on or off.

Configure this on each saved request whose history should include runtime detail. A setting on one request does not enable it for every request in the chain, and dynamic embedded values do not override this saved setting.

This parameter does not control the ordinary response sent to the caller or the previous-response data passed to the next request. It is not required for normal [chained request](../../../../requests/request-parameters/chained-requests.md) parameter substitution, and it does not configure persistent log retention.
