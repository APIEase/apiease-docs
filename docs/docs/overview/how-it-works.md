---
title: How It Works
description: Outline the core flow for configuring and running APIEase in a Shopify store.
---
# How It Works

APIEase runs the requests and logic you define. Each request ([HTTP](../requests/request-types/http-requests.md), [Flow](../requests/request-types/flow-requests.md), or [Liquid](../requests/request-types/liquid-requests.md)) is configured in the APIEase admin and executed inside the APIEase runtime, where confidential parameters remain secure.

This page describes how requests are configured, how they are triggered, and how these elements combine to create custom functionality.

APIEase also includes storefront widgets. Widgets render Liquid and JavaScript through a theme app block and are managed in the same admin.

---

## Configuring Requests

When you create a request, you choose the type ([HTTP Request](../requests/request-types/http-requests.md), [Flow Request](../requests/request-types/flow-requests.md), or [Liquid Request](../requests/request-types/liquid-requests.md)) and define the parameters it needs. These parameters can include:
- values passed in at trigger time
- values extracted from earlier requests
- Liquid based transformations
- confidential parameters stored securely in APIEase (see [Why Secure Parameter Handling Matters](./why-you-need-it.md#why-secure-parameter-handling-matters))

Each request is saved as a reusable and callable unit of logic.

For setup steps, see [How to Add Requests](../requests/how-to-add-requests.md).

---

## Configuring Widgets

Create widgets in the APIEase admin by defining a name, handle, and Liquid template. You can add optional inline or external JavaScript that loads when the widget renders. See [Widgets page](../widgets/widgets-page.md) and [Widget edit page](../widgets/widget-edit-page.md) for the full workflow.

## Displaying Widgets

Add the **APIEase App Block (v2)** block to your theme and set the widget handle. The block loads the widget content and scripts automatically. See [Storefront block extension](../widgets/storefront-block-extension.md).

---

## Triggering Requests

A configured request can be invoked through several available trigger types. Each trigger activates the same underlying request definition, allowing the logic to run without duplication. Triggers are available in the following order:

### [Webhooks](../requests/triggers/webhooks/trigger-requests-from-a-webhook.md)

Run a request automatically when Shopify or an external system sends a webhook to APIEase.

### [Cron Schedule](../requests/triggers/cron-schedule.md)

Use a built in cron schedule to run a request at recurring intervals.

### [Proxy Endpoint](../requests/triggers/proxy-endpoint.md)

Expose a request as a public API endpoint with an optional shared secret. External systems call the endpoint and APIEase runs the associated request.

### [Manual Calls](../requests/triggers/manual-calls.md)

Invoke any request directly from the APIEase admin for testing or on demand execution.

### [Storefont Calls](../requests/triggers/storefont-calls.md)

Trigger a request from your storefront using Shopify's app proxy. The storefront sends only non confidential data and APIEase performs the execution on the server side.

### [Remote HTTP Client](../requests/triggers/calling-requests-remotely.md)

Send an HTTP call from any external system to APIEase to initiate a request, with optional authentication.

### [Chained Request](../requests/request-parameters/chained-requests.md)

Run a request from within another request. A request can call additional requests and pass outputs downstream, allowing multi step workflows.

---

## Combining Request Types and Triggers

Because each request is modular and can be triggered in any of these ways, users can create custom functionality by combining:
- the request type (HTTP, Flow, or Liquid)
- the trigger source
- any number of chained steps

This supports use cases ranging from simple API calls to multi step workflows that coordinate data across multiple systems, without building or hosting a backend.
