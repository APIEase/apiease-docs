---
title: Shopify GraphQL API - Product count
description: Example for counting products via the Shopify GraphQL Admin API.
---
# Shopify GraphQL API - Product count

Demonstration of calling the Shopify GraphQL API to get a count of products in your Shopify product inventory:

Demo store password: eacoht

[https://apiease-demo.myshopify.com/pages/shopify-graphql-api-products](https://apiease-demo.myshopify.com/pages/shopify-rest-api-products)

This example includes an explicit `X-Shopify-Access-Token` header. For automatic shop access token usage and overrides, see [Automatic vs overridden Shopify access tokens](./automatic-vs-overridden-shopify-access-tokens.md).

Example of APIEase Request for Shopify Product Count

- **Address**: [https://apiease-demo.myshopify.com/admin/api/2024-07/graphql.json](https://apiease-demo.myshopify.com/admin/api/2024-01/products/count.json)
- **Method**: `POST`
- **Header parameters:**
  - **Name**: `X-Shopify-Access-Token`  
    **Value**: `your-shopify-access-token` (see [Custom access token](./custom-access-token.md))
  - **Name**: `Content-Type`  
    **Value**: `application/json`
- **Body parameters:**
  - **Value**:

```json
{ "query": "query { productsCount { count } }" }
```
