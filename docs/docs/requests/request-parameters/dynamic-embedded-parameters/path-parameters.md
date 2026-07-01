---
title: Dynamic embedded path parameters
description: Inject runtime values into request paths.
---
# Dynamic embedded path parameters

Unlike query, header and body embedded parameters that are always added as parameters to your request, path parameters are used exclusively for replacing path variables.

Dynamic embedded parameters are added as query parameters to calls made to APIEase from custom liquid in your storefront.

**Example Javascript Snippet:**

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
