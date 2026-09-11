---
title: Flow Parameters
description: Configure immediate responses and response wait times for APIEase Flow requests.
---
# Flow Parameters

Use System parameters on a saved [Flow request](../../../../requests/request-types/flow-requests.md) to control whether APIEase waits for the workflow's response and how long it waits.

Add these settings with the **System** parameter type. The **Flow** parameter type is for values you pass into the workflow.

For settings shared with other request types, see [Response Overrides](./response-overrides.md) and [Runtime History](./runtime-history.md).

## Add a setting

1. Open your saved Flow request in the APIEase request editor.
2. Click the **+** icon in the Parameter column.
3. Select **System**.
4. Enter the **Name** and **Value** from the table below, using the exact capitalization shown.
5. Click **Save** at the top of the request editor.

| Name | Example value | Effect |
| --- | --- | --- |
| `IMMEDIATE_FLOW_RESPONSE` | `true` | Return without waiting for the Flow result. |
| `FLOW_RESPONSE_WAIT_TIME` | `60` | Wait up to 60 seconds for the Flow result when immediate response is disabled. |

## Enable immediate response

Set `IMMEDIATE_FLOW_RESPONSE` to `true` to let the caller continue while the workflow runs in the background. The immediate response does not contain the final Flow result or confirm that the workflow has completed.

To restore waiting, set `IMMEDIATE_FLOW_RESPONSE` to `false` or remove the parameter. Waiting is the default.

If both parameters are present and immediate response is enabled, `FLOW_RESPONSE_WAIT_TIME` does not make the caller wait.

For how concurrent requests are handled, see [Concurrent calls and queued responses](../../../../requests/request-types/flow-requests.md#concurrent-calls-and-queued-responses).

## Adjust the response wait time

Set `FLOW_RESPONSE_WAIT_TIME` to the number of **seconds** APIEase should wait for the Flow response. For example, use `60` to allow up to one minute. Keep `IMMEDIATE_FLOW_RESPONSE` disabled when you want the caller to wait.

- **Default:** 25 seconds when the parameter is omitted.
- **Minimum:** 10 seconds. Lower values are raised to 10.
- **Maximum:** 86,400 seconds (24 hours). Higher values are capped at 86,400.

Use a whole number without a unit suffix. This setting controls APIEase's Flow response wait; it does not extend timeouts imposed by the calling application or the connection. Reaching the wait limit does not mean the Shopify workflow has completed or been canceled.

See [Return a result from the workflow](../../../../requests/request-types/flow-requests.md#return-a-result-from-the-workflow) for how APIEase receives the response it is waiting for.
