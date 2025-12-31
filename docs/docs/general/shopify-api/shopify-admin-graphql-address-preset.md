---
title: Shopify Admin GraphQL address preset
description: Select the prepopulated Shopify Admin GraphQL address to enable automatic shop access token usage.
---
# Shopify Admin GraphQL address preset

You can take advantage of [automatic shop access token usage](./automatic-vs-overridden-shopify-access-tokens.md#automatic-shop-access-token-usage) by selecting the prepopulated Shopify Admin GraphQL option in the request address dropdown for HTTP requests.

## Why this helps
The preset fills in a Shopify Admin API address that matches your shop domain and `/admin/api/.../graphql.json` path. That address pattern triggers APIEase to inject the shop access token automatically, so you do not need to add an `X-Shopify-Access-Token` header manually.

## How to use it
1. Open your HTTP request in the request editor.
2. Open the request address dropdown.
3. Select **Shopify Admin GraphQL**.
4. Save the request.