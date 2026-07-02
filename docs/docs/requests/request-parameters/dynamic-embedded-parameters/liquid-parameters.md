---
title: Dynamic embedded Liquid parameters
description: Pass per-call values into Liquid requests with liquidParamsEmbedded.
---
# Dynamic embedded Liquid parameters

Use `liquidParamsEmbedded` when a storefront call or widget call needs to pass per-call values into a Liquid request.

`requestId` and `liquidParamsEmbedded` are APIEase runtime query parameters. Set `requestId` to the request handle that should run. Set `liquidParamsEmbedded` to a JSON-stringified object. Inside the Liquid request, APIEase exposes that object at `apiEaseParameters.liquidParams`.

The keys inside `liquidParamsEmbedded` are user-defined. For example, if the caller sends `{ "visitorName": "Alex" }`, the Liquid request reads `apiEaseParameters.liquidParams.visitorName`.

JavaScript storefront/widget call:

```javascript
const liquidParams = {
  visitorName: "Alex",
  sourcePage: "homepage"
};

const queryParams = new URLSearchParams({
  requestId: "personalized-message",
  liquidParamsEmbedded: JSON.stringify(liquidParams)
});

fetch("/apps/apiease/integration/caller/call?" + queryParams.toString(), {
  headers: { Accept: "application/json" }
});
```

Liquid request:

```liquid
{% assign visitor_name = apiEaseParameters.liquidParams.visitorName | default: "there" | strip %}
{% assign source_page = apiEaseParameters.liquidParams.sourcePage | default: "unknown" | strip %}

{
  "message": "Hello, {{ visitor_name }}.",
  "sourcePage": {{ source_page | json }}
}
```

In this example:

- `requestId` is an APIEase runtime field. It selects which request runs, and its value should be the request handle.
- `liquidParamsEmbedded` is an APIEase runtime field. It passes a JSON object of values into a Liquid request.
- `apiEaseParameters.liquidParams` is the Liquid runtime object where those embedded Liquid parameters are exposed.
- `personalized-message` is only the example request handle.
- `visitorName` and `sourcePage` are only example-specific parameter names. Users can choose their own keys.
- `"Alex"` and `"homepage"` are only example values.

## Saved parameters vs embedded parameters

Saved Liquid parameters are configured on the request and can be substituted with `{parameterName}` before execution. Use saved Liquid parameters for stored defaults, sensitive values, or other server-side configured values.

Runtime embedded Liquid parameters are supplied by a caller with `liquidParamsEmbedded` and are read in Liquid through `apiEaseParameters.liquidParams.<parameterName>`. Use `liquidParamsEmbedded` for per-call values supplied at runtime.
