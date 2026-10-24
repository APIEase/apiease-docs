---
title: Dynamic embedded Liquid parameters
description: Pass per-call values into Liquid requests with liquidParamsEmbedded.
---
# Dynamic embedded Liquid parameters

Use `liquidParamsEmbedded` when calling a Liquid request to pass values for one execution. You do not need to add matching parameters to the saved request first.

Choose your own parameter names. For example, send `{visitorName: 'Alex'}` and use the `{visitorName}` parameter placeholder in the request's Liquid template.

## Call with runRequest

In a storefront widget, pass the saved request handle and a `liquidParamsEmbedded` object:

```js
apiease.runRequest('personalized-message', {
  liquidParamsEmbedded: {
    visitorName: 'Alex',
    sourcePage: 'homepage',
  },
})
  .then(function (response) { console.log(response.status, response.data); })
  .catch(function (error) { console.error(error.message); });
```

APIEase loads the helper for widget App Block and App Embed placements. The directly called storefront request needs a **Storefront App Proxy** trigger. In an Admin widget, pass the same group in a button's `onClick` handler; no storefront trigger is needed. See [Requests In Widgets](../../../widgets/using-requests-in-widgets.md) for setup and response handling.

Values inside the group can be nested objects, arrays, strings, numbers, booleans, or null. Pass the object directly; JSON-stringifying it is optional with `runRequest`. See [Dynamic embedded parameters](./dynamic-embedded-parameters-overview.md) for the full group format.

## Classic fetch call

For a direct theme or widget fetch call, set `requestId` to the saved request handle and JSON-stringify `liquidParamsEmbedded` in the URL:

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

## Read values in the Liquid request

Both calling methods can supply values for the same parameter placeholders. For a simple text response, save this Liquid template:

```liquid
Hello, {visitorName}. You are visiting the {sourcePage}.
```

APIEase substitutes the supplied parameter values before running the template. This example returns `Hello, Alex. You are visiting the homepage.`. With `runRequest`, the text is in `response.data`. Parameter placeholders perform text substitution; they do not automatically JSON-escape string values.

In this example:

- `requestId` selects the request in the classic URL. With `runRequest`, pass the handle as the first argument instead.
- `liquidParamsEmbedded` is an APIEase runtime field. It passes a JSON object of values into a Liquid request.
- `personalized-message` is only the example request handle.
- `visitorName` and `sourcePage` are only example-specific parameter names. Users can choose their own keys.
- `"Alex"` and `"homepage"` are only example values.

## Saved parameters vs embedded parameters

Saved Liquid parameters are configured on the request and can be substituted with `{parameterName}` before execution. Use saved Liquid parameters for stored defaults, sensitive values, or other server-side configured values.

Runtime embedded Liquid parameters are supplied by a caller with `liquidParamsEmbedded`. They can fill the same `{parameterName}` placeholders, including names that are not saved on the request. Embedded values normally override saved values with the same name for that execution.
