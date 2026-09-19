---
title: Triggers overview
description: Summarize how APIEase requests can be invoked and where to learn each trigger.
---
# Triggers overview

Choose the execution mechanism that matches where the run starts and what the caller can provide.

| Objective | Use | Main prerequisite |
| --- | --- | --- |
| Test or run a one-off action in APIEase admin | [Manual call](./manual-calls.md) | A saved request |
| React to a Shopify event | [Shopify webhook](./webhooks/trigger-requests-from-a-webhook.md) | A webhook trigger for the required event |
| Run at recurring times | [Cron schedule](./cron-schedule.md) | A valid five-field cron expression; schedules use UTC |
| Call a saved request from a server or external automation | [Remote call](./calling-requests-remotely.md) | The request handle, shop domain, and an APIEase API key |
| Publish a purpose-built HTTP route | [Proxy endpoint](./proxy-endpoint.md) | A unique path and method; choose whether authentication is required |
| Call from Shopify theme code | [Storefront call](./storefont-calls.md) | A Storefront App Proxy trigger on the directly called request |
| Call from reusable storefront UI | [Widget request call](./widget-calls.md) | A saved widget with JavaScript that makes a storefront call, and a Storefront App Proxy trigger on the directly called request |

Customer-authenticated calls are a restricted form of storefront call, not a separate general-purpose API. Use [customer validation](../customer-authenticated-requests.md) when a storefront request must require a logged-in customer or allow only selected customer IDs.

After an entry request runs, **Next Request** can continue a simple linear workflow. This is [request chaining](../request-parameters/chained-requests.md), not an external trigger. A [Flow request](../request-types/flow-requests.md) can similarly hand data to Shopify Flow after starting from any suitable entry point.

For quick comparisons and prerequisites, see the [Running requests FAQ](../../general/faq/running-requests.md).
