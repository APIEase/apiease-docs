---
title: Dynamic embedded headers
description: Allow callers to provide headers at execution time.
---
# Dynamic embedded headers

You can pass dynamic values from the storefront into the headers of an APIEase request. This is useful when the external API you are calling expects information such as customer details, session context, or custom identifiers to be included in the headers.

## Call with runRequest

In a storefront widget, pass a `headersEmbedded` object to the automatically loaded helper:

```js
apiease.runRequest('customer-profile', {
  headersEmbedded: {'X-Storefront-Source': 'product-page'},
})
  .then(function (response) { console.log(response.status, response.data); })
  .catch(function (error) { console.error(error.message); });
```

The directly called request needs a **Storefront App Proxy** trigger. See [Requests In Widgets](../../../widgets/using-requests-in-widgets.md) for setup and response handling, and [Dynamic embedded parameters](./dynamic-embedded-parameters-overview.md) for the shared group format used by Storefront and Admin widgets.

## Classic fetch call

For a direct theme or widget fetch call, JSON-stringify the group and include it in `URLSearchParams`:

```javascript
const headerParamsEmbeddedVar = JSON.stringify({
  exampleHeader1: "exampleHeaderValue1",
  exampleHeader2: "exampleHeaderValue2",
  exampleHeader3: "exampleHeaderValue3",
});

const queryParams = new URLSearchParams({
  requestId: "customer-profile",
  headersEmbedded: headerParamsEmbeddedVar,
});

fetch('/apps/apiease/integration/caller/call?' + queryParams)
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```

In the above javascript snippet we see that **headersEmbedded**  is set to the stringified "headersEmbeddedVar". APIEase looks for a query parameter named **headersEmbedded**  to hold the dynamic embedded header parameters.
