---
title: Widget Request Calls
description: Trigger APIEase requests from widgets on the storefront.
---
# Widget Request Calls

Widgets are reusable storefront components managed inside APIEase. They can render UI and call requests. If you have not used widgets before, start with [Widgets overview](../../widgets/widgets-overview.md).

To call a request from a widget, use JavaScript to send a [storefront call](./storefont-calls.md) through Shopify's app proxy. Add the **Storefront App Proxy** trigger to the directly called request and save it.

## How it works
- The widget's JavaScript runs in the browser.
- The JavaScript calls the request through Shopify's app proxy.
- The request executes on the server and returns a response.

To configure the widget-side request call, see [Using Requests in Widgets](../../widgets/using-requests-in-widgets.md).

A widget is the reusable Liquid, CSS, and JavaScript component. The request remains a separate server-side resource. Choose a [Widget App Block](../../widgets/widget-app-block.md) to place the widget on a specific page or section, or a [Widget App Embed](../../widgets/widget-app-embed.md) for a widget that should load across the storefront.

## Passing values to Liquid requests
Widget JavaScript uses the same APIEase integration endpoint as storefront calls. For Liquid requests, set `requestId` to the request handle and pass per-call values with `liquidParamsEmbedded`.

`liquidParamsEmbedded` should contain a JSON object string. Inside the Liquid request, read those values from `apiEaseParameters.liquidParams.<parameterName>`.

## Security warning
Widgets run in the browser and are inspectable. Sensitive credentials must not be placed in widgets. Configure credentials inside the APIEase request where they are stored securely. Treat all widget inputs as untrusted.
