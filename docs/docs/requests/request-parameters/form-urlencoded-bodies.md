---
title: Form URL-encoded bodies
description: Send raw text request bodies for application/x-www-form-urlencoded content types.
---
# Form URL-encoded bodies

APIEase supports raw text request bodies when the request Content-Type is `application/x-www-form-urlencoded`. In this mode, the body is treated as a plain string instead of JSON, so form-style payloads like `productId=sku-123&quantity=2` are sent exactly as written.

## When to use this

Use form URL-encoded bodies when the receiving API expects classic HTML form submissions or legacy form payloads.

## How it works

- The request **Content-Type** header must be set to `application/x-www-form-urlencoded`.
- The **Body** parameter value is stored and sent as raw text.
- Embedded body parameters from the storefront (`bodyEmbedded`) are appended as additional form fields.
- Previous response data (when present) is appended as additional form fields.

## Example

**Headers**

- `Content-Type`: `application/x-www-form-urlencoded`

**Body**

```
productId=sku-123&quantity=2
```

**Embedded body parameters (from storefront)**

```json
{
  "warehouse": "north-2",
  "priority": "high"
}
```

**Previous response data (optional)**

```json
{
  "receiptId": "rcpt-789"
}
```

**Final request body sent**

```
productId=sku-123&quantity=2&warehouse=north-2&priority=high&receiptId=rcpt-789
```

## Notes

- If you need to encode special characters, URL-encode them in the body or embedded values.
- For JSON request bodies, keep using the standard JSON body parameter flow described in [In-app body parameters](./in-app-parameters/in-app-body-parameters.md).
