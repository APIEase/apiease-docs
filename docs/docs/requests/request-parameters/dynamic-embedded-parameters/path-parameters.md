---
title: Dynamic embedded path parameters
description: Inject runtime values into request paths.
---
# Dynamic embedded path parameters

Unlike query, header and body embedded parameters that are always added as parameters to your request, path parameters are used exclusively for replacing path variables.

## Call with runRequest

In a storefront widget, pass a `pathParamsEmbedded` object to the automatically loaded helper:

```js
apiease.runRequest('product-details-proxy', {
  pathParamsEmbedded: {productId: '1234567890'},
})
  .then(function (response) { console.log(response.status, response.data); })
  .catch(function (error) { console.error(error.message); });
```

For this example, the saved request address must contain a matching `{productId}` placeholder.

The directly called request needs a **Storefront App Proxy** trigger. See [Requests In Widgets](../../../widgets/using-requests-in-widgets.md) for setup and response handling, and [Dynamic embedded parameters](./dynamic-embedded-parameters-overview.md) for the shared group format used by Storefront and Admin widgets.

## Classic fetch call

For a direct theme or widget fetch call, JSON-stringify the group and include it in `URLSearchParams`:

```javascript
const pathParamsEmbeddedVar = JSON.stringify({
  exampleParameter1: "exampleParameterValue1",
  exampleParameter2: "exampleParameterValue2",
  exampleParameter3: "exampleParameterValue3",
});
const pathParams = new URLSearchParams({
  requestId: "product-details-proxy",
  pathParamsEmbedded: pathParamsEmbeddedVar,
});
fetch('/apps/apiease/integration/caller/call?' + pathParams)
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```

In the above javascript snippet we see that  "**pathParamsEmbedded**" is set to the stringified "pathParamsEmbeddedVar".   APIEase looks for a query parameter named **pathParamsEmbedded**  to hold the dynamic embedded path parameters.
