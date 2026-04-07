---
title: Mapping webhook parameters
description: Use values from a Shopify webhook payload inside your request.
---
# Mapping webhook parameters

When a Shopify webhook triggers a request in APIEase, the full webhook payload is forwarded as the request body. You can map any field from that payload into query parameters, headers, or body fields that your endpoint expects.

When you choose the webhook trigger in APIEase, use the uppercase webhook event constant, such as `PRODUCTS_DELETE`. Shopify documentation refers to the same event by its topic name, such as `products/delete`.

**How mapping works**

Add a parameter to your request with:
- **Type**: Query, Header, or Body
- **Name**: The name expected by the destination endpoint
- **Value**: A reference to the webhook payload field, wrapped in curly braces

## Example: simple payload value
For the APIEase event constant `PRODUCTS_DELETE` (Shopify topic `products/delete`), the payload includes:

```json
{
  "id": 788032119674292922
}
```

To send this value as a query parameter named `deleted_product_id`, add:
- Type: Query
- Name: `deleted_product_id`
- Value: `{id}`

This pulls the `id` field from the webhook and renders an address like `https://example.com?deleted_product_id=788032119674292922`.

![Mapping a webhook payload field to a query parameter](https://cdn.shopify.com/s/files/1/0733/1820/3680/files/mapping-webhook-parameter-query.png?v=1744666126)

## Example: nested payload value
If the value you need is nested, use dot notation. For the APIEase event constant `PRODUCT_LISTINGS_REMOVE` (Shopify topic `product_listings/remove`), the payload includes:

```json
{
  "product_listing": {
    "product_id": 788032119674292922
  }
}
```

To pass the nested `product_id` value to your endpoint, set the parameter value to `{product_listing.product_id}` (as a query, header, or body value depending on what the endpoint requires).

## Tips
- The webhook payload is already the request body; additional body parameters you add are merged into that body.
- Use descriptive parameter names so the rendered request matches what your downstream API expects.
