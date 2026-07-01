---
title: Triggers overview
description: Summarize how APIEase requests can be invoked and where to learn each trigger.
---
# Triggers overview

Every APIEase request uses the same configuration but can be invoked in different ways depending on where the call originates. Choose the trigger that best matches your workflow and follow the linked guides for setup details.

## [Webhooks](./webhooks/trigger-requests-from-a-webhook.md)
- Start a request automatically when Shopify emits a webhook event.
- Ideal for reacting to store activity such as orders, carts, or customers.
- See also [Mapping webhook parameters](./webhooks/mapping-webhook-parameters.md) to pass webhook fields into your request.

## [Cron Schedule](./cron-schedule.md)
- Execute a request on a fixed schedule without any external event.
- Use for regular syncs, polling, or time-based jobs.

## [Proxy Endpoint](./proxy-endpoint.md)
- Expose a stable endpoint that forwards incoming HTTP calls to a configured request.
- Helpful when another system needs to call APIEase with a stable request handle instead of an internal id.

## [Manual Calls](./manual-calls.md)
- Run a request directly from the admin for testing or one-off actions.
- Best for validating configuration before exposing the request to any external source.

## [Storefont Calls](./storefont-calls.md)
- Let theme code call a request via Shopify's app proxy without exposing secrets.
- Great for customer-facing interactions that need server-side execution.
- Works with [Customer authenticated requests](../customer-authenticated-requests.md) to access customer context securely.

## [Widget Calls](./widget-calls.md)
- Trigger requests from APIEase widgets on the storefront.
- A reusable alternative to pasting request snippets into theme code.
- See [Using Requests in Widgets](../../widgets/using-requests-in-widgets.md) for the widget-side configuration.

## [Remote Calls](./calling-requests-remotely.md)
- Invoke a request from outside Shopify using APIEase's remote caller API.
- Use when automation or third-party systems must trigger requests directly.

## [Chained Request](../request-parameters/chained-requests.md)
- Trigger a follow-on request using the output of a previous one.
- Useful for multi-step flows such as authenticate-then-call or data enrichment.
