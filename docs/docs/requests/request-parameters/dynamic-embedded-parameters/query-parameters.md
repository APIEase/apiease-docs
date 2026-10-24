---
title: Dynamic embedded query parameters
description: Supply query string values at runtime from Flow or storefront inputs.
---
# Dynamic embedded query parameters

Query parameters can be passed dynamically from the storefront using embedded values. This allows you to include real-time data in your request URLs, such as customer email addresses, cart information, or other storefront-specific details. Dynamic embedded query parameters are added directly to your request at execution time.

## Call with runRequest

In a storefront widget, pass a `queryParamsEmbedded` object to the automatically loaded helper:

```js
apiease.runRequest('product-search', {
  queryParamsEmbedded: {query: 'shirt', limit: 10},
})
  .then(function (response) { console.log(response.status, response.data); })
  .catch(function (error) { console.error(error.message); });
```

The directly called request needs a **Storefront App Proxy** trigger. See [Requests In Widgets](../../../widgets/using-requests-in-widgets.md) for setup and response handling, and [Dynamic embedded parameters](./dynamic-embedded-parameters-overview.md) for the shared group format used by Storefront and Admin widgets.

## Classic fetch call

For a direct theme or widget fetch call, JSON-stringify the group and include it in `URLSearchParams`:

```javascript
const queryParamsEmbeddedVar = JSON.stringify({
  exampleParameter1: "exampleParameterValue1",
  exampleParameter2: "exampleParameterValue2",
  exampleParameter3: "exampleParameterValue3",
});

const queryParams = new URLSearchParams({
  requestId: "product-search",
  queryParamsEmbedded: queryParamsEmbeddedVar,
});

fetch('/apps/apiease/integration/caller/call?' + queryParams)
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```

In the above javascript snippet we see that **queryParamsEmbedded**  is set to the stringified "queryParamsEmbeddedVar".  APIEase looks for a query parameter named **queryParamsEmbedded**  to hold the dynamic embedded query parameters.
