---
title: Concurrency Limit Response
description: Reject new work with HTTP 429 when a saved request exceeds its existing concurrency limit.
---
# Concurrency limit response

Add the System parameter `CONCURRENCY_LIMIT_EXCEEDED_RESPONSE` with value `429`
to reject a new call immediately when its existing concurrency limit is exceeded.
Rejected work will not execute later.

## Configure a request

1. Open the request in the APIEase editor and add a parameter.
2. Choose **System** as the parameter type.
3. Enter **Name** `CONCURRENCY_LIMIT_EXCEEDED_RESPONSE` and **Value** `429`.
4. Save the request.

For programmatic request configuration, add this entry to `parameters`:

```json
{
  "type": "system",
  "name": "CONCURRENCY_LIMIT_EXCEEDED_RESPONSE",
  "value": "429",
  "sensitive": false
}
```

Use exactly `429`, without quotes in the editor. Empty values, other codes,
whitespace-padded values, and dynamic expressions such as `{responseCode}` are
invalid. Runtime embedded parameters cannot override this saved setting.
Remove the parameter to restore the request type's normal overflow behavior.

## Behavior by request type

| Type | When its existing concurrency limit is exceeded |
| --- | --- |
| HTTP | Reject before sending the outbound call. |
| Flow | Reject before triggering Shopify Flow, without adding the call to the queue. |
| Liquid and System | The parameter is accepted, but these types currently have no concurrency limit for it to change. |

This setting does not change any limit, threshold, or counting scope. HTTP keeps
its existing approximate overload protection; Flow keeps its existing shared
request limit. When capacity is available, execution proceeds normally.

## HTTP status and result status

With the setting enabled, a direct API caller still waiting for the result gets
actual **HTTP 429** and a result containing:

```json
{
  "status": 429,
  "error": "rate_limit_exceeded",
  "message": "The concurrency limit was exceeded. This request was rejected and will not execute later."
}
```

The result may also include execution metadata. No `Retry-After` header is sent.
Response-code or message overrides cannot turn this rejection into success.
`IMMEDIATE_FLOW_RESPONSE=true` cannot turn a rejected Flow submission into a
successful or queued acknowledgment.

Without the setting, HTTP keeps its existing direct API response of **HTTP 200**
with JSON `status: 429` on concurrency overflow. That JSON field alone is not the
HTTP transport status. Flow keeps its existing queueing behavior without the
setting. Request types that do not queue will not start queueing.

## Chains and background calls

Each chain member uses its own setting. For `A -> B -> C`, if B has the parameter
and exceeds its limit, B is rejected and C does not execute. A's parameter does
not enable the setting for B. Without the parameter, B keeps its existing
overflow and chain behavior.

A may already have performed its work. APIEase does not roll back or
automatically retry earlier members. **Retrying the entire chain can repeat
those earlier effects.** A waiting caller receives the rejection as HTTP 429.

An asynchronous acknowledgment already sent cannot be changed retroactively.
The later execution result and existing history mechanisms retain the rejection.
Background calls without a waiting HTTP client retain the equivalent rejected
result. The behavior is consistent across local and standalone execution.

Rejected submissions are not queued, triggered, dispatched, or recovered for
later execution. The setting applies to new submissions and does not cancel
previously accepted or queued work.
