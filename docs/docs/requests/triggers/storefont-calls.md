---
title: Storefront calls
description: Call APIEase requests from your Shopify storefront through Shopify's app proxy while keeping credentials secure.
---
# Storefront calls

Run any APIEase request directly from your Shopify storefront using Shopify's app proxy. This lets you start workflows from theme code without exposing credentials or private logic in the browser.

For a reusable storefront component, put the JavaScript request call in an [APIEase widget](./widget-calls.md). The widget uses the same storefront route and Storefront App Proxy trigger described below.

## Storefront access boundary

APIEase verifies that the call was routed through Shopify's app proxy and that the directly called request has a Storefront App Proxy trigger. That does not make the request customer-authenticated: anyone who can use the storefront route can call it unless you add [customer validation](../customer-authenticated-requests.md).

The same-origin app-proxy path lets theme code avoid a direct browser call to APIEase. This is the documented APIEase storefront route, but it is not a guarantee that arbitrary browser requests to external services will avoid CORS restrictions. Browser-origin and CORS behavior still depends on the route being called and the response headers returned by that service.

## How it works
- Your theme calls the APIEase app proxy path (for example `/apps/apiease/integration/caller/call`) and includes the request handle as the `requestId` value for the request to run.
- Shopify forwards the call through the app proxy. If the customer is logged in, Shopify passes the customer id to APIEase.
- APIEase executes the request on the server, injects any sensitive parameters you saved in the admin, and returns the request's final response to the storefront.

## Add Storefront Request
1. Go to the Requests page.
2. Click the plus icon at the top left of the page.
3. At a minimum, set your Address and Method.
4. If this exact request should be called directly from your storefront through Shopify's app proxy, add the `Storefront App Proxy` trigger.
5. Click **Save** at the top of the screen.

## Call from your theme
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
- Add `pathParamsEmbedded`, `queryParamsEmbedded`, `headersEmbedded`, `bodyEmbedded`, `flowParamsEmbedded`, or `liquidParamsEmbedded` as needed to pass dynamic embedded parameters from the storefront.
- For Liquid requests, `liquidParamsEmbedded` passes a JSON object of runtime values. Inside the Liquid request, read those values from `apiEaseParameters.liquidParams.<parameterName>`.
- Keep confidential values stored in the APIEase request configuration; do not place secrets in storefront code.

Do not add a Storefront App Proxy trigger to helper requests that are only invoked by another APIEase request or by a Liquid `call` tag.

## Customer validation options
If the customer is logged in when the app proxy runs, Shopify includes their customer id in the call.

- Require a logged-in customer: add a system parameter named `validateCustomer` with value `true`.
- Restrict to selected customers: add one system parameter named `customerId` for each allowed Shopify customer ID.

For detailed setup and screenshots, see [Customer authenticated requests](../customer-authenticated-requests.md). If validation fails, APIEase blocks the call and no response is returned to the storefront.
