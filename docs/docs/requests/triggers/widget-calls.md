---
title: Widget Calls
description: Trigger APIEase requests from widgets on the storefront.
---
# Widget Calls

Widgets are reusable storefront components managed inside APIEase. They can render UI and call requests. If you have not used widgets before, start with [Widgets overview](../../widgets/widgets-overview.md).

Widget Calls are a trigger type for APIEase requests. They are a more convenient, reusable way to make [Storefront Calls](./storefont-calls.md), and they replace manually pasting request snippets into theme Liquid.

## How it works
- The widget runs in the browser.
- The widget triggers the request.
- The request executes on the server and returns a response.

To configure the widget-side request call, see [Using Requests in Widgets](../../widgets/using-requests-in-widgets.md).

## Passing values to Liquid requests
Widget JavaScript uses the same APIEase integration endpoint as storefront calls. For Liquid requests, set `requestId` to the request handle and pass per-call values with `liquidParamsEmbedded`.

`liquidParamsEmbedded` should contain a JSON object string. Inside the Liquid request, read those values from `apiEaseParameters.liquidParams.<parameterName>`.

## Security warning
Widgets run in the browser and are inspectable. Sensitive credentials must not be placed in widgets. Configure credentials inside the APIEase request where they are stored securely. Treat all widget inputs as untrusted.
