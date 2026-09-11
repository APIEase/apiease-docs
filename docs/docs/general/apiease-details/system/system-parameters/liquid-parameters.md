---
title: Liquid Parameters
description: Return an acknowledgment while an APIEase Liquid request continues processing.
---
# Liquid Parameters

Use the `IMMEDIATE_LIQUID_RESPONSE` [System parameter](./overview.md) on a [Liquid request](../../../../requests/request-types/liquid-requests.md) when the caller can continue without waiting for the rendered result.

## Enable immediate response

Add a parameter with these editor values, then save the request:

| Field | Value |
| --- | --- |
| Type | **System** |
| Name | `IMMEDIATE_LIQUID_RESPONSE` |
| Value | `true` |

APIEase starts rendering the Liquid template and returns status `200` with the acknowledgment `Liquid request received and processing.` as its response data. The acknowledgment does not contain the rendered result or confirm that rendering or any requests invoked by the template succeeded.

Errors that occur during background processing cannot be returned through that already-sent response. Use immediate response when the caller does not need the final result.

## Restore waiting

Set `IMMEDIATE_LIQUID_RESPONSE` to `false` or remove it to wait for the rendered result. Waiting is the default. Only the lowercase text `true` enables immediate response.

[Response Overrides](./response-overrides.md) can customize a completed Liquid result, including values returned by the template. They do not change an immediate Liquid acknowledgment.
