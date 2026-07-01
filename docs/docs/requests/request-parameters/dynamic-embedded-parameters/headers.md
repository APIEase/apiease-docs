---
title: Dynamic embedded headers
description: Allow callers to provide headers at execution time.
---
# Dynamic embedded headers

You can pass dynamic values from the storefront into the headers of an APIEase request. This is useful when the external API you are calling expects information such as customer details, session context, or custom identifiers to be included in the headers.

Dynamic embedded parameters are added as query parameters to calls made to APIEase from custom liquid in your storefront.

**Example Javascript Snippet:**

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
