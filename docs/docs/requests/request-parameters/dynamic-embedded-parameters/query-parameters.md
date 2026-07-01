---
title: Dynamic embedded query parameters
description: Supply query string values at runtime from Flow or storefront inputs.
---
# Dynamic embedded query parameters

Query parameters can be passed dynamically from the storefront using embedded values. This allows you to include real-time data in your request URLs, such as customer email addresses, cart information, or other storefront-specific details. Dynamic embedded query parameters are added directly to your request at execution time.

Dynamic embedded parameters are added as query parameters to calls made to APIEase from custom liquid in your storefront.

**Example Javascript Snippet:**

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
