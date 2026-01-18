---
title: Storefront calls
description: Call APIEase requests from your Shopify storefront through Shopify's app proxy while keeping credentials secure.
---
# Storefront calls

Run any APIEase request directly from your Shopify storefront using Shopify's app proxy. This lets you start workflows from theme code without exposing credentials or private logic in the browser.

If you want a more convenient and reusable way to make storefront calls, use [Widget Calls](./widget-calls.md) and trigger the request from an APIEase widget instead of pasting snippets into theme Liquid.

## How it works
- Your theme calls the APIEase app proxy path (for example `/apps/apiease/integration/caller/call`) and includes the `requestId` for the request to run.
- Shopify forwards the call through the app proxy. If the customer is logged in, Shopify passes the customer id to APIEase.
- APIEase executes the request on the server, injects any sensitive parameters you saved in the admin, and returns the request's final response to the storefront.

## Configure a storefront call
1. In the APIEase admin, open the request you want to run from the storefront.
2. In the **Actions** column, click the **Copy and Execute** icon to open the manual call screen.
3. In the manual call dialog, click **Copy** to grab the storefront snippet shown there. It contains the request's `requestId` and the correct app proxy path.
4. Paste the snippet into your custom Liquid or theme code where you want the request to run.

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

## Customer validation options
If the customer is logged in when the app proxy runs, Shopify includes their customer id in the call.

- Require a logged-in customer: add a system parameter named `validateCustomer` with value `true`.
- Restrict to a specific customer: add a system parameter named `customerId` set to the allowed Shopify customer id.

For detailed setup and screenshots, see [Customer authenticated requests](../customer-authenticated-requests.md). If validation fails, APIEase blocks the call and no response is returned to the storefront.
