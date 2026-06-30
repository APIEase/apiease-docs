---
title: Storefront calls
description: Call APIEase requests from your Shopify storefront through Shopify's app proxy while keeping credentials secure.
---
# Storefront calls

Run any APIEase request directly from your Shopify storefront using Shopify's app proxy. This lets you start workflows from theme code without exposing credentials or private logic in the browser.

If you want a more convenient and reusable way to make storefront calls, use [Widget Calls](./widget-calls.md) and trigger the request from an APIEase widget instead of pasting snippets into theme Liquid.

## Caution
Use caution with Storefront App Proxy requests. Anyone from anywhere can call Storefront App Proxy requests. APIEase verifies that Storefront App Proxy requests have been routed through the Shopify App Proxy and that a Storefront App Proxy trigger has been added to the directly called request. However, anyone can call this request via the Shopify App Proxy just as you can from your storefront.

## How it works
- Your theme calls the APIEase app proxy path (for example `/apps/apiease/integration/caller/call`) and includes the `requestId` for the request to run.
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
    requestId: "e4234d0-5b0a-11ee-9e5d-195679c7ea93b",
  });
  fetch('/apps/apiease/integration/caller/call?' + queryParams).
    then(function(response) {return response.json();}).
    then(function(jsonResponse) {console.log(jsonResponse);});
</script>
```

- `requestId` tells APIEase which request to run; this value is filled in when you click **Copy**.
- Add `pathParamsEmbedded`, `queryParamsEmbedded`, `headersEmbedded`, `bodyEmbedded`, or `flowParamsEmbedded` as needed to pass dynamic embedded parameters from the storefront.
- Keep confidential values stored in the APIEase request configuration; do not place secrets in storefront code.

Do not add a Storefront App Proxy trigger to helper requests that are only invoked by another APIEase request or by a Liquid `call` tag.

## Customer validation options
If the customer is logged in when the app proxy runs, Shopify includes their customer id in the call.

- Require a logged-in customer: add a system parameter named `validateCustomer` with value `true`.
- Restrict to a specific customer: add a system parameter named `customerId` set to the allowed Shopify customer id.

For detailed setup and screenshots, see [Customer authenticated requests](../customer-authenticated-requests.md). If validation fails, APIEase blocks the call and no response is returned to the storefront.
