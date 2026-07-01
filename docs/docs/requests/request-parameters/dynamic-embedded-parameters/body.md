---
title: Dynamic embedded body
description: Provide request bodies at runtime from Flow or storefront inputs.
---
# Dynamic embedded body

You can pass dynamic values from the storefront into the body of a request using embedded parameters. This is useful when you want to include customer-specific or page-specific data inside a JSON body sent to an external API.

Dynamic embedded parameters are added as query parameters to calls made to APIEase from custom liquid in your storefront.

**Example Javascript Snippet:**

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
