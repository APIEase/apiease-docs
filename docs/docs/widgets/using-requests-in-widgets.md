---
title: Requests In Widgets
description: Call saved APIEase requests from Storefront and Admin widgets, pass inputs, display responses, and handle bulk selections.
---
# Requests In Widgets

Widgets provide the interface; saved APIEase requests perform server-side work. Choose the calling method that matches the widget type.

| Widget type | How it calls a request | Per-call values |
| --- | --- | --- |
| **Storefront** | Browser JavaScript calls Shopify's app proxy; the directly called request needs a **Storefront App Proxy** trigger. | Embedded parameters, such as `liquidParamsEmbedded` for Liquid requests |
| **Admin** | A button calls `apiease.runRequest` inside the authenticated Shopify admin widget; no Storefront App Proxy trigger is required. | Named `inputs`, read as `{inputs.reference}` in request parameters or `apiEaseParameters.body.inputs.reference` in Liquid |

Start with [Edit Storefront Widgets](./edit-storefront-widgets.md) or [Edit Admin Widgets](./admin-widget-authoring.md) to configure the interface, then use the examples below to connect it to requests.

## Storefront request calls

1. Create and save the request you want to run, and copy its handle.
2. Add the **Storefront App Proxy** trigger to that directly called request and save it.
3. In the Storefront widget, keep a nonempty **Liquid** template; `<div></div>` is sufficient for trying a JavaScript call.
4. Paste the following into **JavaScript**, replacing `product-details-proxy` with your saved request handle. Ensure **Disable JavaScript** is not selected.

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

Save and load the widget through [Storefront Widgets](./storefront-widgets.md). The example logs the JSON response; replace the logging with your widget's display or interaction logic as needed.

This code runs when the widget's JavaScript loads. Attach the call to your own event handler if it should run only after a visitor interacts with the widget.

### Pass values to a Liquid request

Use the request handle as `requestId` and pass a JSON object string in `liquidParamsEmbedded`. For example, with a saved Liquid request whose handle is `storefront-reference`:

```js
const queryParams = new URLSearchParams({
  requestId: 'storefront-reference',
  liquidParamsEmbedded: JSON.stringify({reference: 'example-reference'}),
});

fetch('/apps/apiease/integration/caller/call?' + queryParams)
  .then(function (response) { return response.json(); })
  .then(function (jsonResponse) { console.log(jsonResponse); });
```

The Liquid request can return the supplied value with:

```liquid
{"reference": {{ apiEaseParameters.liquidParams.reference | json }}}
```

Runtime embedded Liquid values are available under `apiEaseParameters.liquidParams`. See [Storefront calls](../requests/triggers/storefont-calls.md) for other embedded parameter types and trigger details.

### Storefront access

The app proxy does not by itself require a logged-in customer. Add [customer validation](../requests/customer-authenticated-requests.md) when the request should be limited to authenticated or selected customers.

## Admin request calls

Admin widgets run active saved requests in the current shop using a literal request handle in a button's `onClick` handler. Opening a widget or action does not run the request; clicking the button does.

The examples below use the Variables/Render editor described in [Edit Admin Widgets](./admin-widget-authoring.md).

### Example: send an editable reference to a request

First, [create a request](../requests/how-to-add-requests.md) with **Liquid** as its type and `echo-reference` as its handle. Leave its request parameters empty and save this Liquid code:

```liquid
{"reference": {{ apiEaseParameters.body.inputs.reference | json }}, "message": "Hello from APIEase"}
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
      onClick={() => apiease.runRequest("echo-reference", {reference})}
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

This button runs the saved request in the current shop through the authenticated Admin widget. It does not require a **Storefront App Proxy** trigger or a storefront JavaScript call.

### Button handlers

Button handlers must use a literal request handle and a named inputs object:

```jsx
onClick={() => apiease.runRequest("echo-reference", {reference})}
```

To call a request without inputs, pass `{}`. The built-in cat example uses `apiease.runRequest("sampleRequest1", {})`; this sample is available without creating a saved request. For your own requests, use the handle from the saved request editor.

### Read inputs in the saved request

Use `{inputs.reference}` as a request parameter value to read the button's `reference` input. A Liquid request can read it directly as `{{ apiEaseParameters.body.inputs.reference }}`. Use the `json` filter when inserting values into JSON, as in the example above.

The values sent by a button must be strings or flat arrays of strings. Each string can contain up to 4,000 characters, and each array can contain up to 250 strings. Nested arrays, objects, numbers, and booleans are not accepted as request input values. Use a template string if you need to send a number as text.

### Example: pass the whole bulk selection

Create a saved **Liquid** request with the handle `echo-selection`, no request parameters, and this code:

```liquid
{"resourceIds": {{ apiEaseParameters.body.inputs.resourceIds | json }}}
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
      onClick={() => apiease.runRequest("echo-selection", {resourceIds})}
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

One click makes one request call with the complete array under `inputs.resourceIds`. The saved request owns any looping or work for individual records. Selections over the 250-value input limit are rejected rather than silently shortened; select a smaller batch. Opening the action alone does not run the request.

### Admin results and refresh behavior

`apiease.response` holds the APIEase response wrapper, so inspect its `data` property for the request's returned content. Display a result as text or bind selected values to supported components. Returned HTML and JavaScript are not executed as widget content.

Request buttons are disabled while another button is running in the same widget. Inputs and results are local to the open widget; reopening it or choosing another widget resets them. After editing and saving a button's request binding, reload the Shopify page or reopen the action before running it again.

### Troubleshoot Admin request calls

- If a saved request cannot be found, confirm the button uses its exact handle and the request is saved and active in the same shop.
- If a button or input is no longer available, reload the Shopify page or reopen the action after saving the widget.
- If the result cannot be confirmed, check the request's **Logs** before running it again. A network failure can happen after the request completes; these failures are not retried automatically.

## Credentials and input validation

Never place API keys, access tokens, passwords, or other credentials in widget content or JavaScript. Configure them inside the saved APIEase request. Treat widget inputs and submitted resource IDs as input data that the request must validate.
