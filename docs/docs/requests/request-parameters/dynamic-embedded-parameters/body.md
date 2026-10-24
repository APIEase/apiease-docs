---
title: Dynamic embedded body
description: Provide request bodies at runtime from Flow or storefront inputs.
---
# Dynamic embedded body

You can pass dynamic values from the storefront into the body of a request using embedded parameters. This is useful when you want to include customer-specific or page-specific data inside a JSON body sent to an external API.

## Call with runRequest

In a storefront widget, pass a `bodyEmbedded` object to the automatically loaded helper:

```js
apiease.runRequest('newsletter-signup', {
  bodyEmbedded: {email: 'visitor@example.com', preferences: {newsletter: true}},
})
  .then(function (response) { console.log(response.status, response.data); })
  .catch(function (error) { console.error(error.message); });
```

The directly called request needs a **Storefront App Proxy** trigger. See [Requests In Widgets](../../../widgets/using-requests-in-widgets.md) for setup and response handling, and [Dynamic embedded parameters](./dynamic-embedded-parameters-overview.md) for the shared group format used by Storefront and Admin widgets.

## Classic fetch call

For a direct theme or widget fetch call, JSON-stringify the group and include it in `URLSearchParams`:

```javascript
const bodyEmbeddedVar = JSON.stringify({
  exampleBody1: "exampleBodyValue1",
  exampleBody2: "exampleBodyValue2",
  exampleBody3: "exampleBodyValue3",
});

const queryParams = new URLSearchParams({
  requestId: "newsletter-signup",
  bodyEmbedded: bodyEmbeddedVar,
});

fetch('/apps/apiease/integration/caller/call?' + queryParams)
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```

In the above javascript snippet we see that **bodyEmbedded**  is set to the stringified "bodyEmbeddedVar". APIEase looks for a query parameter named **bodyEmbedded**  to hold the dynamic embedded body parameters.
