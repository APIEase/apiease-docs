---
title: Automatic vs overridden Shopify access tokens
description: How APIEase chooses between automatic shop access tokens and explicit override tokens.
---
# Automatic vs overridden Shopify access tokens

APIEase determines how to authenticate Shopify Admin API requests based on the request address and headers. It does not validate business correctness. It executes requests exactly as configured.

## Automatic shop access token usage
APIEase injects the [shop access token](./shop-access-token.md) when a request targets the Shopify Admin API and no override token is provided. This is useful because you do not need to generate a token manually, you do not need to configure a token header in each request, and you can update its permissions quickly on [Manage shop access token permissions](./manage-shop-access-token-permissions.md).

## Overridden custom access token usage
APIEase uses an explicit `X-Shopify-Access-Token` header instead of the shop access token when you provide a [custom access token](./custom-access-token.md). This is useful when a call must run under a different Shopify token, such as testing a separate app, using a token from another shop, or matching permissions that differ from the stored shop access token.

## Decision rules
1. If the request targets a Shopify Admin API endpoint and no explicit override token is provided, APIEase injects the shop access token automatically.
2. If the request includes an `X-Shopify-Access-Token` header, APIEase treats it as an explicit override and uses that token instead of the shop access token.
3. If the request does not target a Shopify Admin API endpoint, APIEase does not inject the shop access token. The request behaves like any other outbound HTTP call.

## What counts as a Shopify Admin API endpoint
APIEase treats an address as a Shopify Admin API endpoint when:
- The address path starts with `/admin/api`.
- The address host matches the shop domain for the current shop.

Common Admin API patterns include:
- `https://yourstore.myshopify.com/admin/api/2024-07/graphql.json`
- `https://yourstore.myshopify.com/admin/api/2024-07/products/count.json`

## Examples

### GraphQL request with automatic token usage
This request targets the Shopify Admin API and does not include an override token. APIEase adds the shop access token automatically.

- Address: `https://yourstore.myshopify.com/admin/api/2024-07/graphql.json`
- Method: `POST`
- Headers:
  - `Content-Type`: `application/json`
- Body:

```json
{
  "query": "query { shop { name } }"
}
```

### GraphQL request with an override token
This request includes an `X-Shopify-Access-Token` header. APIEase uses the override token instead of the shop access token.

- Address: `https://yourstore.myshopify.com/admin/api/2024-07/graphql.json`
- Method: `POST`
- Headers:
  - `X-Shopify-Access-Token`: `your-override-token`
  - `Content-Type`: `application/json`
- Body:

```json
{
  "query": "query { shop { name } }"
}
```

### REST request example
The Shopify REST Admin API is deprecated. Only use REST if you understand the impact and you have a specific need.

- Address: `https://yourstore.myshopify.com/admin/api/2024-07/products/count.json`
- Method: `GET`
- Headers:
  - `X-Shopify-Access-Token`: `your-override-token`

## What the UI communicates
When a request targets the Shopify Admin API, the request editor uses labels to show which token is used:
- Automatically using shop access token.
- Overriding shop access token.

## Troubleshooting
- 401 Unauthorized usually means the token is missing or invalid.
- 403 Forbidden usually means the token is valid but missing the required scope.
- Missing scope symptoms include access denied errors or empty data where the Admin API expects permissions.
- Token override mistakes include using the wrong shop domain, using an expired token, or entering the header name or value incorrectly.
- Confirm granted scopes on [Manage shop access token permissions](./manage-shop-access-token-permissions.md) and reauthorize if you need more access.
