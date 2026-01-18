---
title: Using Requests in Widgets
description: Configure an APIEase request call inside a widget.
---
# Using Requests in Widgets

Widgets can call APIEase requests. The widget runs in the browser, but the request runs on the server. This separation keeps integrations secure by keeping credentials and private logic off the storefront.

## Configure a request call
1. Get the `requestId` for the request you want to run (from the request admin page).
2. In the widget edit page, the **Liquid** field is required; you can use a simple placeholder like `<div></div>`.
3. Paste the JavaScript below into the widget's **JavaScript** field to call the APIEase integration endpoint with `fetch` and read the JSON response:

```js
const queryParams = new URLSearchParams({
  requestId: 'YOUR_REQUEST_ID',
});

fetch('/apps/apiease/integration/caller/call?' + queryParams)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonResponse) {
    console.log(jsonResponse);
  });
```

## Security warning
Never place sensitive credentials (API keys, access tokens, passwords) in a widget. Widgets are delivered to the browser and are inspectable. Configure credentials inside the APIEase request so they are stored securely and only used on the server.
