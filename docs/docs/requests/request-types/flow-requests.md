---
title: Flow Requests
description: Configure APIEase Flow trigger/action requests and parameter mappings.
---
# Flow Requests

Flow requests hand data from APIEase to a Shopify Flow workflow. A Flow request is a request type, not an execution mechanism: add a suitable trigger when it is the entry request, or select its handle as **Next Request** when another APIEase request should continue into Flow.

To run a saved APIEase request from a Shopify Flow workflow, use [APIEase Flow Action](../shopify-flow-integration/run-saved-request-from-flow.md). For the APIEase-to-Flow setup, follow [Minimal Flow integration](../shopify-flow-integration/minimal-flow-integration.md).

![Flow request editor](https://cdn.shopify.com/s/files/1/0733/1820/3680/files/add-http-api-requests.png?v=1744748372)

**Flow Request Fields**

- **Name**: Optional display name.
- **Handle**: Stable identifier used when another request calls this one via a [chained request](../request-parameters/chained-requests.md).
- **Type**: Set to `flow` to trigger a Shopify Flow workflow.
- **Parameters ([?](../request-parameters/in-app-vs-dynamic.md))**:
  - **Flow**: JSON key/value pairs passed to your workflow.
  - **System**: Control [immediate responses and Flow response wait times](../../general/apiease-details/system/system-parameters/flow-parameters.md), or configure behavior such as [Customer Authentication](../customer-authenticated-requests.md).
  - Supply [in app parameters](../request-parameters/in-app-vs-dynamic.md) or [dynamic embedded parameters](../request-parameters/dynamic-embedded-parameters/dynamic-embedded-parameters-overview.md) from the storefront.
  - Mark credentials or secrets as **Sensitive** so they are encrypted and never exposed in the storefront or admin UI.

**Triggers ([?](../triggers/webhooks/trigger-requests-from-a-webhook.md))**: Choose how the request should be triggered:

- Automatically via [webhook](../triggers/webhooks/trigger-requests-from-a-webhook.md)
- On a recurring schedule using [cron](../triggers/cron-schedule.md)
- As an endpoint served by APIEase via [Proxy Endpoints](../triggers/proxy-endpoint.md)
- [Remote Calls](../triggers/calling-requests-remotely.md) from outside Shopify.
- Manually via the "Copy and Execute" link on the requests admin page
- From your storefront using Shopify's app proxy

See [Triggers overview](../triggers/triggers-overview.md) to choose an entry point and understand its prerequisite.

**Next Request**: You can specify the handle of another request to run after this request finishes. This allows you to build multi-step workflows using [chained requests](../request-parameters/chained-requests.md).

## Return a result from the workflow

APIEase receives the result when your workflow runs **APIEase Flow Action** with the original `executionId` in its **Flow Parameters** JSON. Follow [Minimal Flow integration](../shopify-flow-integration/minimal-flow-integration.md) to configure that callback.

Place the callback after the steps whose results the caller needs. Steps after the callback may still be running when the caller receives its response. Without a resolving callback, a waiting request can reach its wait limit.

## Concurrent calls and queued responses

Two simultaneous calls to the same request ID can each wait for their own Flow result. The current default allows up to 10 concurrent executions per request ID, per shop.

When the concurrency limit is reached, an additional call is queued and immediately returns **Request queued** with an execution ID. That response confirms the call was queued, not that its workflow has completed. The queued work is processed in the background when capacity becomes available.

Neither disabling immediate response nor increasing the response wait time changes this queue behavior. See [Flow Parameters](../../general/apiease-details/system/system-parameters/flow-parameters.md) to configure those settings.
