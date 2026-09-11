---
title: System Parameters
description: Configure how APIEase executes requests, handles responses, and records runtime history.
---
# System Parameters

System Parameters are named settings that control how APIEase handles a request. Use them to adjust timeouts, choose response formats, return before processing finishes, or control other supported request behavior.

Add them using the **System** parameter type on the request. For example, an HTTP request can have a System parameter named `REQUEST_TIMEOUT_SECONDS` with value `30`.

System Parameters configure request behavior. [System Variables](../system-variables/overview.md) provide values you can reference during execution. Choosing the **System** parameter type also does not change the request's type: HTTP, Flow, and Liquid requests can all use their supported System Parameters.

## Add or change a parameter

1. Open the saved request in the APIEase request editor.
2. Click the **+** icon in the Parameter column.
3. Select **System**.
4. Enter the exact **Name** and **Value** shown in the relevant guide below.
5. Click **Save** at the top of the request editor.

Edit an existing parameter to change its value. Remove an optional parameter to restore its default behavior. Names are case-sensitive; for settings enabled by `true`, enter the lowercase text `true` without quotes in the editor.

## Parameter reference

| Guide | Parameters | Applies to |
| --- | --- | --- |
| [HTTP Parameters](./http-parameters.md) | `REQUEST_TIMEOUT_SECONDS`, `RESPONSE_BODY_MODE`, `VERIFY_SSL_CERT` | HTTP requests |
| [Flow Parameters](./flow-parameters.md) | `IMMEDIATE_FLOW_RESPONSE`, `FLOW_RESPONSE_WAIT_TIME` | Flow requests |
| [Liquid Parameters](./liquid-parameters.md) | `IMMEDIATE_LIQUID_RESPONSE` | Liquid requests |
| [Response Overrides](./response-overrides.md) | `APIEASE_RESPONSE_CODE_OVERRIDE`, `APIEASE_RESPONSE_MESSAGE_OVERRIDE`, `OVERRIDE_APIEASE_RESPONSE_CODE`, `OVERRIDE_APIEASE_RESPONSE_MESSAGE` | Completed responses; result-driven overrides are specific to Flow and Liquid |
| [Runtime History](./runtime-history.md) | `RECORD_RUNTIME_HISTORY` | Request execution and chains |
| [Customer-authenticated requests](../../../../requests/customer-authenticated-requests.md) | `validateCustomer`, `customerId` | Shopify storefront app-proxy calls |
| [System Requests](../../../../requests/request-types/system-requests.md) | `function`, `arguments` | System requests that manage shop variables |

A parameter only affects the request types and execution paths that support it. Adding an arbitrary System parameter does not create a new APIEase feature or change a service-wide limit.

## Saved settings and runtime values

Save these settings on the request for consistent behavior across calls. Some System parameters also accept dynamic values through supported request execution interfaces, but the usual dynamic-override rule has exceptions:

- `REQUEST_TIMEOUT_SECONDS` uses the saved request setting; runtime callers cannot override it.
- `IMMEDIATE_FLOW_RESPONSE` and `RECORD_RUNTIME_HISTORY` are read from the saved request parameters. Configure them in the editor.

See [in-app parameters vs dynamic embedded parameters](../../../../requests/request-parameters/in-app-vs-dynamic.md) for the general distinction. Follow each parameter's guide for defaults, supported values, and limits.
