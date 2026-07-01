---
title: Path variables
description: How to inject dynamic values into request paths.
---
# Path variables

Portions of your address path can be set from variables at execution time. Variables in your path are replaced by in app path parameters or dynamic embedded path parameters.

You include variables in your path surrounded with double braces.

Example Address Path Containing a Variable:

`https://ex.com/{variable1}`

Any in app path parameter or pathParamsEmbedded with the name variable1 will replace the path variables value you place in your address path. Multiple path variables can be added.

In the example above we have:

Address:  `https://ex.com/{variable1}`

Path Parameter:  

   Name: variable1

   Value: inAppValue1

When the request is executed the address will resolve to:  https://ex.com/inAppValue1

![Path variable editing in APIEase](https://cdn.shopify.com/s/files/1/0733/1820/3680/files/path-variable-edit.png?v=1744137415)

The system replaces variables in the path within curly brackets `{}` with the value specified in a path parameter.

For storefront APIEase calls via app proxy you can also set the path variable via a dynamic embedded path parameter.

```javascript
const pathParamsEmbeddedVar = JSON.stringify({
  variable1: "dynamicEmbeddedPathValue1",
});
const queryParams = new URLSearchParams({
  requestId: "product-details-proxy",
  pathParamsEmbedded: pathParamsEmbeddedVar,
});
fetch('/apps/apiease/integration/caller/call?' + queryParams)
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```

The parameter named `variable1` in `pathParamsEmbedded` will replace `{variable1}` in your address path.

When the request is executed from your storefront via app proxy the address will resolve to: `https://ex.com/dynamicEmbeddedPathValue1`

In app path parameters act as the default parameter. Dynamic embedded parameters override the in app parameter values.

If you only have the in app `variable1=inAppValue1` then address  `https://ex.com/{variable1}` will resolve to `https://ex.com/inAppValue1`.

If you have the in app `variable1 = inAppValue1` and `pathParamsEmbedded = JSON.stringify({ variable1: "dynamicEmbeddedPathValue1" })` then address `https://ex.com/{variable1}` will resolve to `https://ex.com/dynamicEmbeddedPathValue1`. So dynamic embedded parameters override the default in app path parameters of the same name.
