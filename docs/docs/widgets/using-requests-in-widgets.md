---
title: Requests In Widgets
description: Call saved APIEase requests with runRequest from Storefront and Admin widgets, pass embedded parameters, and display responses.
---
# Requests In Widgets

Widgets provide the interface; saved APIEase requests perform server-side work. Choose the calling method that matches the widget type.

| Widget type | How it calls a request | Per-call values |
| --- | --- | --- |
| **Storefront** | JavaScript calls `apiease.runRequest` through Shopify's app proxy; the directly called request needs a **Storefront App Proxy** trigger. | Embedded parameter groups, such as `liquidParamsEmbedded` |
| **Admin** | A button calls `apiease.runRequest` inside the authenticated Shopify admin widget; no Storefront App Proxy trigger is required. | The same embedded parameter groups |

Start with [Edit Storefront Widgets](./edit-storefront-widgets.md) or [Edit Admin Widgets](./admin-widget-authoring.md) to configure the interface, then use the examples below to connect it to requests.

## Form values and request parameters

An Admin widget can remember editable form values in `inputs` and update them with `apiease.setInput`. This controls the widget's display, including field values, previews, and conditional controls. It does not send values to a saved request. See [Edit Admin Widgets](./admin-widget-authoring.md) for form state examples.

`runRequest` separately specifies the request handle and the embedded parameter groups to send. Values can come from form state, Shopify's selection, a JavaScript variable, or a literal value. You do not need an `inputs` object to call a request.

For example, this Admin button sends a fixed query parameter without using form state:

```jsx
<s-button onClick={() => apiease.runRequest("lookup-reference", {queryParamsEmbedded: {reference: "ABC123"}})}>
  Look up
</s-button>
```

## Storefront request calls

1. Create and save the request you want to run, and copy its handle.
2. Add the **Storefront App Proxy** trigger to that directly called request and save it.
3. In the Storefront widget, keep a nonempty **Liquid** template; `<div></div>` is sufficient for trying a JavaScript call.
4. Paste the `runRequest` example below into **JavaScript**, replacing `product-details-proxy` with your saved request handle. Ensure **Disable JavaScript** is not selected.

### Call with runRequest

APIEase loads `apiease.runRequest(requestHandle, parameters)` automatically before your widget's inline and external JavaScript in both App Block and App Embed placements. No extra library or script URL is needed.

```js
apiease.runRequest('product-details-proxy')
  .then(function (response) {
    if (response.status < 200 || response.status >= 300) {
      console.error(response.errorMessage || 'Request returned ' + response.status);
      return;
    }
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error.message);
  });
```

The first argument is the saved request handle. The optional second argument contains [embedded parameter groups](../requests/request-parameters/dynamic-embedded-parameters/dynamic-embedded-parameters-overview.md); omit it or pass `{}` when no runtime values are needed. The helper sends the call and parses the response for you.

Save and load the widget through [Storefront Widgets](./storefront-widgets.md). This example runs when the widget's JavaScript loads. Put the call in an event handler if it should run after a visitor clicks a button or submits a form.

### Classic fetch call

The existing app-proxy call remains supported, including in theme JavaScript that does not load an APIEase widget:

```js
const queryParams = new URLSearchParams({
  requestId: 'product-details-proxy',
});

fetch('/apps/apiease/integration/caller/call?' + queryParams)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonResponse) {
    console.log(jsonResponse);
  });
```

This example logs the JSON response. Replace the logging with your widget's display or interaction logic as needed.

### Pass values to a Liquid request

With `runRequest`, pass an object in `liquidParamsEmbedded`. For example, with a saved Liquid request whose handle is `storefront-reference`:

```js
apiease.runRequest('storefront-reference', {
  liquidParamsEmbedded: {reference: 'example-reference'},
})
  .then(function (response) { console.log(response.status, response.data); })
  .catch(function (error) { console.error(error.message); });
```

For the classic fetch call, use the handle as `requestId` and JSON-stringify the group before putting it in the URL:

```js
const queryParams = new URLSearchParams({
  requestId: 'storefront-reference',
  liquidParamsEmbedded: JSON.stringify({reference: 'example-reference'}),
});

fetch('/apps/apiease/integration/caller/call?' + queryParams)
  .then(function (response) { return response.json(); })
  .then(function (jsonResponse) { console.log(jsonResponse); });
```

Both call methods supply `reference` as a Liquid parameter for that execution. You do not need to add a matching saved parameter. See [Dynamic embedded Liquid parameters](../requests/request-parameters/dynamic-embedded-parameters/liquid-parameters.md) for using parameter placeholders in the request's template.

### Handle storefront results and errors

`runRequest` returns a Promise for one response object:

| Field | Meaning |
| --- | --- |
| `status` | Numeric request status. Check for a value from 200 through 299 for success. |
| `data` | The request's returned content. |
| `errorMessage` | Error text when supplied by the request result. |

A completed request with a failing status still resolves the Promise, including a storefront access denial. Check `response.status`; a `.catch` handler alone does not handle these results. You can also use `await apiease.runRequest(...)` inside an `async` event handler.

Endpoint validation or authentication failures reject with an `Error`; its `status` property contains the endpoint's HTTP status. Network failures or unreadable responses also reject, but the request may already have completed. Check the request's **Logs** before running it again. The helper does not retry automatically.

Each storefront call returns its own result. Manage loading, errors, and display state in your widget JavaScript; the Admin-only `apiease.response`, `apiease.loading`, and `apiease.error` values are not provided on the storefront.

### Storefront access

The app proxy does not by itself require a logged-in customer. Add [customer validation](../requests/customer-authenticated-requests.md) when the request should be limited to authenticated or selected customers.

## Admin request calls

Admin widgets run active saved requests in the current shop using a literal request handle in a button's `onClick` handler. Opening a widget or action does not run the request; clicking the button does.

The examples below use the Variables/Render editor described in [Edit Admin Widgets](./admin-widget-authoring.md).

### Example: send an editable reference to a request

First, [create a request](../requests/how-to-add-requests.md) with **Liquid** as its type and `echo-reference` as its handle. Leave its request parameters empty and save this Liquid code:

```liquid
Reference: {reference}
```

In your Admin widget, click **Add content** if needed and replace **Variables** with:

```js
const resourceId = shopify.data.selected?.[0]?.id ?? "";
const reference = inputs.reference ?? resourceId;
```

Replace **Render (JSX)** with:

```jsx
<s-admin-block heading="Reference lookup">
  <s-stack direction="block" gap="base">
    <s-text>Resource ID: {resourceId}</s-text>
    <s-text-field
      label="Reference"
      value={reference}
      onInput={event => apiease.setInput("reference", event.currentTarget.value)}
    />
    <s-button
      loading={apiease.loading}
      onClick={() => apiease.runRequest("echo-reference", {liquidParamsEmbedded: {reference}})}
    >Run request</s-button>
    <s-text-area
      label="Response"
      readOnly
      rows={6}
      value={JSON.stringify(apiease.response, null, 2) ?? ""}
    />
  </s-stack>
</s-admin-block>
```

Choose a surface and location, save, and open the widget in Shopify admin. The reference starts with the current resource ID. Edit it and click **Run request** to see the echoed value in the response.

`inputs.reference` remembers the edited field value. The button sends it only when clicked, through `liquidParamsEmbedded`. The saved Liquid template uses the `{reference}` parameter placeholder and returns text in the response's `data` property.

This button runs the saved request in the current shop through the authenticated Admin widget. It does not require a **Storefront App Proxy** trigger or a storefront JavaScript call.

### Button handlers

Button handlers must use a literal request handle and an embedded parameter groups object:

```jsx
onClick={() => apiease.runRequest("echo-reference", {liquidParamsEmbedded: {reference}})}
```

To call an Admin request without runtime parameters, pass `{}`. The built-in cat example uses `apiease.runRequest("sampleRequest1", {})`; this sample is available without creating a saved request. For your own requests, use the handle from the saved request editor.

### Choose the request parameter location

Use `liquidParamsEmbedded` for Liquid request parameters, such as `reference` in the example. You can supply a parameter for one execution without adding it to the saved request first.

Use `queryParamsEmbedded`, `headersEmbedded`, `pathParamsEmbedded`, `bodyEmbedded`, `flowParamsEmbedded`, or `systemParamsEmbedded` for values intended for those locations. Each group is an object, and its values can include nested objects, arrays, strings, numbers, booleans, and null. See [Dynamic embedded parameters](../requests/request-parameters/dynamic-embedded-parameters/dynamic-embedded-parameters-overview.md) for the shared format and override rules.

### Update older widget calls

Replace flat calls such as `apiease.runRequest("echo-reference", {reference})` with `apiease.runRequest("echo-reference", {liquidParamsEmbedded: {reference}})`. Choose the group that matches the receiving request's parameter location. Saved widget code is not rewritten automatically.

Keep `inputs.reference` and `apiease.setInput` where they manage editable form values. The change to request arguments does not change how Admin form state works.

### Example: pass the whole bulk selection

Create a saved **Liquid** request with the handle `echo-selection`, no request parameters, and this code:

```liquid
{"resourceIds": {resourceIds}}
```

In the widget's **Variables**, use:

```js
const resourceIds = apiease.selectedResourceIds;
```

In **Render (JSX)**, use:

```jsx
<s-admin-block heading="Selected resources">
  <s-stack direction="block" gap="base">
    <s-text>Selected resources: {resourceIds.length}</s-text>
    <s-button
      disabled={resourceIds.length === 0}
      loading={apiease.loading}
      onClick={() => apiease.runRequest("echo-selection", {liquidParamsEmbedded: {resourceIds}})}
    >Send selection</s-button>
    <s-text-area
      label="Response"
      readOnly
      rows={6}
      value={JSON.stringify(apiease.response, null, 2) ?? ""}
    />
  </s-stack>
</s-admin-block>
```

Set **Surface** to **Bulk-selection action**, choose **Products**, and save. Select products on Shopify's Products list and open **APIEase Admin Widget** from the selection's **More actions** menu. Click **Send selection** to see the selected IDs in the response.

One click makes one request call with the complete array under `liquidParamsEmbedded.resourceIds`. APIEase replaces the `{resourceIds}` placeholder with the array as JSON. This example uses the Shopify selection directly, so no `inputs` form state is needed. The saved request owns any looping or work for individual records. Opening the action alone does not run the request.

### Admin results and refresh behavior

`apiease.response` holds the APIEase response wrapper, so inspect its `data` property for the request's returned content. Display a result as text or bind selected values to supported components. Returned HTML and JavaScript are not executed as widget content.

Request buttons are disabled while another button is running in the same widget. Inputs and results are local to the open widget; reopening it or choosing another widget resets them. After editing and saving a button's request binding, reload the Shopify page or reopen the action before running it again.

### Troubleshoot Admin request calls

- If a saved request cannot be found, confirm the button uses its exact handle and the request is saved and active in the same shop.
- If a button or input is no longer available, reload the Shopify page or reopen the action after saving the widget.
- If the result cannot be confirmed, check the request's **Logs** before running it again. A network failure can happen after the request completes; these failures are not retried automatically.

## Credentials and input validation

Never place API keys, access tokens, passwords, or other credentials in widget content or JavaScript. Configure them inside the saved APIEase request. Treat widget inputs and submitted resource IDs as input data that the request must validate.
