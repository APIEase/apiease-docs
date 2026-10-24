---
title: Dynamic embedded flow parameters
description: Send runtime Flow input from the storefront to APIEase.
---
# Dynamic embedded flow parameters

You can pass dynamic values from your storefront into the input of a Shopify Flow request. This lets your Flow automation receive real-time data based on customer actions, session context, or storefront activity.

## Call with runRequest

In a storefront widget, pass a `flowParamsEmbedded` object to the automatically loaded helper:

```js
apiease.runRequest('start-order-flow', {
  flowParamsEmbedded: {orderId: 'gid://shopify/Order/1234567890'},
})
  .then(function (response) { console.log(response.status, response.data); })
  .catch(function (error) { console.error(error.message); });
```

The directly called request needs a **Storefront App Proxy** trigger. See [Requests In Widgets](../../../widgets/using-requests-in-widgets.md) for setup and response handling, and [Dynamic embedded parameters](./dynamic-embedded-parameters-overview.md) for the shared group format used by Storefront and Admin widgets.

## Classic fetch call

For a direct theme or widget fetch call, JSON-stringify the group and include it in `URLSearchParams`:

```html
<script>
  const flowParamsEmbeddedVar = JSON.stringify({
    exampleFlow1: "exampleFlowValue1",
    exampleFlow2: "exampleFlowValue2",
    exampleFlow3: "exampleFlowValue3",
  });
  const queryParams = new URLSearchParams({
    requestId: "start-order-flow",
    flowParamsEmbedded: flowParamsEmbeddedVar,
  });
  fetch('/apps/apiease/integration/caller/call?' + queryParams)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      console.log(jsonResponse);
    });
</script>
```

In the snippet above, `flowParamsEmbedded` is set to the stringified `flowParamsEmbeddedVar`. APIEase looks for a query parameter named `flowParamsEmbedded` to hold the dynamic embedded flow parameters.
