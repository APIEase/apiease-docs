---
title: Running requests FAQ
description: Quick answers about manual runs, remote calls, proxy endpoints, webhooks, schedules, storefront calls, customer validation, Shopify Flow, widgets, and chaining.
---

# Running requests FAQ

## How should I run a request?

Choose the entry point that matches the caller: use a manual call in APIEase admin, a webhook for a Shopify event, cron for a recurring schedule, a remote call from a trusted external system, a proxy endpoint for a purpose-built HTTP route, or a storefront call from theme code or an APIEase widget's JavaScript. The [triggers overview](../../requests/triggers/triggers-overview.md) compares prerequisites for each option.

## How do I test or run a request once from APIEase admin?

Use a **Manual Call**. From the Requests page, choose **Copy and Execute**, then **Execute and Run**. Manual execution is useful for a one-off action or for checking the saved configuration before adding another entry point. Follow [Manual calls](../../requests/triggers/manual-calls.md) for the procedure and [Troubleshoot requests](../../requests/troubleshooting-requests.md) when the run fails or returns an unexpected result.

## What is the difference between a remote call and a proxy endpoint?

Use a **remote call** to run a saved request by handle through APIEase's shared caller URL; it requires an APIEase API key and shop-domain header. Use a **proxy endpoint** when you need a configured path and HTTP method that can be authenticated or unauthenticated. Neither is the Shopify app-proxy route used by storefront code. See [Calling APIEase requests remotely](../../requests/triggers/calling-requests-remotely.md) and [Proxy endpoint](../../requests/triggers/proxy-endpoint.md).

## How do I run a request when a Shopify event occurs?

Add a **Webhook** trigger and choose the APIEase event constant that corresponds to the Shopify topic, such as `ORDERS_CREATE`. APIEase passes the webhook payload as the body, and you can map payload fields into other request parameters. See [Trigger requests from a webhook](../../requests/triggers/webhooks/trigger-requests-from-a-webhook.md) and [Mapping webhook parameters](../../requests/triggers/webhooks/mapping-webhook-parameters.md).

## How do I run a request on a recurring schedule?

Add a **Cron** trigger with a five-field cron expression. APIEase evaluates cron schedules in UTC, so convert the intended local time and account for daylight-saving changes where applicable. See [Cron schedule](../../requests/triggers/cron-schedule.md).

## How should storefront theme code call an APIEase request?

Use a **Storefront App Proxy** trigger on the request that theme code calls directly, then call APIEase through Shopify's app-proxy path. This keeps saved credentials out of browser code, but the route is callable unless you add customer validation. It also does not promise that arbitrary browser calls to other services will avoid CORS restrictions. See [Storefront calls](../../requests/triggers/storefont-calls.md).

## How do I require a logged-in customer or allow only selected customers?

For a storefront call, add `validateCustomer=true` as a System parameter to require any logged-in customer. To allow selected customers, add one `customerId` System parameter for each allowed Shopify customer ID--not a JSON array in one value. Customer validation relies on the identity Shopify supplies through its app proxy; it is not authentication for remote calls or proxy endpoints. See [Customer-authenticated requests](../../requests/customer-authenticated-requests.md).

## What is the difference between a widget, an App Block, and an App Embed?

A **widget** is reusable storefront Liquid, CSS, and JavaScript. An **App Block** places a widget in a specific theme section or template, while an **App Embed** loads selected widgets across the storefront. See [Widgets overview](../../widgets/widgets-overview.md) and [Widget App Extensions](../../widgets/widget-app-extensions.md).

## How do I send APIEase data into Shopify Flow?

Create a **Flow request** and map the values Flow should receive. Add a trigger if the Flow request is the entry point, or set the Flow request as **Next Request** after an HTTP, Liquid, or other APIEase request. See [How to add a Flow request](../../requests/shopify-flow-integration/add-flow-request.md) and the [APIEase + Shopify Flow architecture](../../requests/shopify-flow-integration/architecture.md).

## How do I run several requests in sequence?

Set **Next Request** to the next request's handle and reference fields from the previous response in the next request's parameters. This creates a simple linear request chain; it is not an external trigger. For conditions, loops, response shaping, or several explicit calls, use a Liquid request instead. See [Chained requests](../../requests/request-parameters/chained-requests.md).
