---
title: Storefront calls
description: Call APIEase requests from your Shopify storefront through Shopify's app proxy while keeping credentials secure.
---
# Storefront calls

Run any APIEase request directly from your Shopify storefront using Shopify's app proxy. This lets you start workflows from theme code without exposing credentials or private logic in the browser.

For a reusable storefront component, put the JavaScript request call in an [APIEase widget](./widget-calls.md) and use `apiease.runRequest`. It uses Shopify's app proxy and the same Storefront App Proxy trigger requirement as the classic fetch call.

## Storefront access boundary

APIEase verifies that the call was routed through Shopify's app proxy and that the directly called request has a Storefront App Proxy trigger. That does not make the request customer-authenticated: anyone who can use the storefront route can call it unless you add [customer validation](../customer-authenticated-requests.md).

The same-origin app-proxy path lets theme code avoid a direct browser call to APIEase. This is the documented APIEase storefront route, but it is not a guarantee that arbitrary browser requests to external services will avoid CORS restrictions. Browser-origin and CORS behavior still depends on the route being called and the response headers returned by that service.

## How it works
- Your widget calls `apiease.runRequest` with the saved request handle, or your theme calls `/apps/apiease/integration/caller/call` directly with the handle as `requestId`.
- Shopify forwards the call through the app proxy. If the customer is logged in, Shopify passes the customer id to APIEase.
- APIEase executes the request on the server, injects any sensitive parameters you saved in the admin, and returns the request's final response to the storefront.

## Add Storefront Request
1. Go to the Requests page.
2. Click the plus icon at the top left of the page.
3. At a minimum, set your Address and Method.
4. If this exact request should be called directly from your storefront through Shopify's app proxy, add the `Storefront App Proxy` trigger.
5. Click **Save** at the top of the screen.

## Call from a storefront widget with runRequest

APIEase loads `apiease.runRequest` before the widget's inline and external JavaScript in App Block and App Embed placements:

```js
apiease.runRequest('status-message', {
  liquidParamsEmbedded: {sourcePage: 'homepage'},
})
  .then(function (response) {
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data);
    } else {
      console.error(response.errorMessage || 'Request returned ' + response.status);
    }
  })
  .catch(function (error) {
    console.error(error.message);
  });
```

Omit the second argument or pass `{}` when no runtime parameters are needed. Each call returns a Promise with `status`, `data`, and `errorMessage`; request failures can resolve with a failing status, so check `status`. See [Requests In Widgets](../../widgets/using-requests-in-widgets.md) for complete setup and error handling.

Use the classic fetch method below in theme code that does not load an APIEase widget. Both methods use the same [embedded parameter groups](../request-parameters/dynamic-embedded-parameters/dynamic-embedded-parameters-overview.md); `runRequest` accepts group objects directly.

## Classic fetch call from your theme

Use the copied snippet as-is to verify the integration, then extend it with any [dynamic embedded parameters](../request-parameters/dynamic-embedded-parameters/dynamic-embedded-parameters-overview.md) you need for runtime data.

```html
<script>
  const queryParams = new URLSearchParams({
    requestId: "status-message",
  });
  fetch('/apps/apiease/integration/caller/call?' + queryParams.toString(), {
    headers: { Accept: 'application/json' },
  }).
    then(function(response) {return response.json();}).
    then(function(jsonResponse) {console.log(jsonResponse);});
</script>
```

- `requestId` is an APIEase runtime query parameter that tells APIEase which request to run. Use the request handle as this value for new storefront code.
- Add `pathParamsEmbedded`, `queryParamsEmbedded`, `headersEmbedded`, `bodyEmbedded`, `flowParamsEmbedded`, `liquidParamsEmbedded`, or supported `systemParamsEmbedded` values as needed. For this URL-based call, JSON-stringify each group before adding it to `URLSearchParams`.
- For Liquid requests, `liquidParamsEmbedded` supplies parameter values for that execution. You do not need to declare those names on the saved request first. See [Dynamic embedded Liquid parameters](../request-parameters/dynamic-embedded-parameters/liquid-parameters.md) for parameter placeholders and examples.
- Keep confidential values stored in the APIEase request configuration; do not place secrets in storefront code.

Do not add a Storefront App Proxy trigger to helper requests that are only invoked by another APIEase request or by a Liquid `call` tag.

## Customer validation options
If the customer is logged in when the app proxy runs, Shopify includes their customer id in the call.

- Require a logged-in customer: add a system parameter named `validateCustomer` with value `true`.
- Restrict to selected customers: add one system parameter named `customerId` for each allowed Shopify customer ID.

For detailed setup and screenshots, see [Customer authenticated requests](../customer-authenticated-requests.md). If customer validation fails, APIEase blocks execution. With `runRequest`, inspect the returned `status` and `errorMessage` to handle the denial.
