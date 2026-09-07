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
  - **System**: Used by APIEase in cases such as [Customer Authentication](../customer-authenticated-requests.md).
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
