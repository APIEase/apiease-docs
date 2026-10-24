---
title: Dynamic embedded parameters overview
description: Pass runtime values in shared embedded parameter groups with runRequest or classic storefront calls.
---
# Dynamic embedded parameters overview

Dynamic embedded parameters supply values for one request execution, such as a selected product, form entry, or cart contents. Storefront and Admin widgets use the same parameter groups with `apiease.runRequest`. Classic storefront calls and Liquid `call` tags also use these group names.

## Call from a widget

Pass the saved request handle first, then an object containing the groups the request needs:

```js
apiease.runRequest('discount-lookup', {
  liquidParamsEmbedded: {
    code: 'SAVE10',
    quantity: 2,
    preview: true,
    items: [{sku: 'example-sku', quantity: 2}],
    context: {source: 'product-page', note: null},
  },
})
  .then(function (response) { console.log(response.status, response.data); })
  .catch(function (error) { console.error(error.message); });
```

This is a storefront JavaScript example. APIEase loads the helper automatically for widget App Block and App Embed placements. Add a **Storefront App Proxy** trigger to the directly called request. In an Admin widget, use the same grouped argument in a button's `onClick` handler; see [Requests In Widgets](../../../widgets/using-requests-in-widgets.md) for both calling styles and response handling.

## Supported groups

| Group | Values supplied to the saved request |
| --- | --- |
| [`headersEmbedded`](./headers.md) | Header values |
| [`queryParamsEmbedded`](./query-parameters.md) | Query string values |
| [`pathParamsEmbedded`](./path-parameters.md) | Values for named path placeholders |
| [`bodyEmbedded`](./body.md) | Request body fields |
| [`flowParamsEmbedded`](./flow-parameters.md) | Flow parameters |
| [`liquidParamsEmbedded`](./liquid-parameters.md) | Liquid request parameters |
| [`systemParamsEmbedded`](../../../general/apiease-details/system/system-parameters/overview.md) | Supported runtime System settings |

With `runRequest`, each group must be an object of named parameters, or a JSON string encoding that object. Its values can contain nested objects, arrays, strings, numbers, booleans, and null. The group itself cannot be an array, null, or a scalar; this also applies to `bodyEmbedded`. Prefer passing objects directly so the helper handles serialization.

Use only supported group names at the top level. Put your own parameter names inside a group, for example `{liquidParamsEmbedded: {code: 'SAVE10'}}`. The flat `{code: 'SAVE10'}` form and an outer `inputs` or `parameters` wrapper are not supported. Names such as `response` and `session` are ordinary data when used inside a group.

An empty `{}` supplies no embedded groups. Storefront JavaScript also lets you omit the second argument; Admin button handlers require it.

## Read values and combine them with saved parameters

The example supplies `code`, `quantity`, `preview`, `items`, and `context` as Liquid parameters for this execution. Parameters do not need to be declared on the saved request first. See [Dynamic embedded Liquid parameters](./liquid-parameters.md) for using parameter placeholders such as `{code}` in the request's template.

Embedded values merge into the matching request parameter location. When a saved and embedded parameter have the same name in the same location, the embedded value normally takes precedence for that execution. Existing exceptions for saved-only [System settings](../../../general/apiease-details/system/system-parameters/overview.md) still apply. See [In-app parameters vs dynamic embedded parameters](../in-app-vs-dynamic.md).

For existing widget code that uses a flat request argument, follow the migration example in [Requests In Widgets](../../../widgets/using-requests-in-widgets.md). The Admin widget's `inputs` form state is a separate UI feature: it remembers editable field values and refreshes the display. A request call sends only the values explicitly included in its embedded parameter groups.

## Classic storefront calls

When calling `/apps/apiease/integration/caller/call` directly, set `requestId` to the saved request handle and JSON-stringify each group in `URLSearchParams`:

```js
const queryParams = new URLSearchParams({
  requestId: 'discount-lookup',
  liquidParamsEmbedded: JSON.stringify({code: 'SAVE10', quantity: 2}),
});

fetch('/apps/apiease/integration/caller/call?' + queryParams)
  .then(function (response) { return response.json(); })
  .then(function (jsonResponse) { console.log(jsonResponse); });
```

The classic call remains supported and uses the same embedded parameter locations. With `runRequest`, pass the handle as the first argument and pass group objects directly. See [Storefront calls](../../triggers/storefont-calls.md) for trigger setup and customer access controls.

## Why use dynamic embedded parameters?

Dynamic embedded parameters allow you to tailor each API request to the individual visitor, cart, or page context. Common use cases:

- Personalization: send a customer's name, email, or cart ID to an external service
- User input: capture form field values or product selections made on the page
- Session-based logic: include discount codes, location data, or referral info based on the current session
- Product data: pass information about the product being viewed or purchased
- Analytics or tracking: include context for tracking conversions, clicks, or customer actions

Without dynamic parameters, all values must be fixed in advance, which limits your ability to respond to customer behavior or use real-time data.

## Keep credentials server-side

Dynamic embedded parameters are useful for sending runtime information, but they should **never** be used to pass confidential credentials such as:

- Shopify access tokens
- API keys
- Usernames or passwords
- Secret authorization headers

The purpose of APIEase is to keep those credentials safe and hidden on the server side. If you include them in storefront JavaScript or Liquid, they become visible to anyone who visits your store.

If you need to authenticate with an external system and use a returned authentication code, you can use **APIEase chained requests**. In this setup, the first request performs the authentication, and the second request uses the returned token or session key. Keep the authentication request private, and ensure the final response does not return a token or other confidential data to the storefront.

You can read more about [chained requests here](../chained-requests.md) and view an [authentication example here](../../../general/apiease-details/authentication-example.md).

Always store confidential credentials in the APIEase admin. Use dynamic parameters only for data that is safe to expose and specific to the current customer or page context.

For Liquid requests, see [Dynamic embedded Liquid parameters](./liquid-parameters.md) for a complete calling example and parameter placeholders.
