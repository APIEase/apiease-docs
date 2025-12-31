---
title: Shopify REST API - Product count
description: Example for counting products via the Shopify REST Admin API.
---
# Shopify REST API - Product count

Demonstration of calling the Shopify REST API to get a count of products in your Shopify product inventory:

Demo store password: eacoht

[https://apiease-demo.myshopify.com/pages/shopify-rest-api-products](https://apiease-demo.myshopify.com/pages/shopify-rest-api-products)

This example includes an explicit `X-Shopify-Access-Token` header. For automatic shop access token usage and overrides, see [Automatic vs overridden Shopify access tokens](./automatic-vs-overridden-shopify-access-tokens.md).

Example of APIEase Request for Shopify Product Count

- **Address**: [https://apiease-demo.myshopify.com/admin/api/2024-01/products/count.json](https://apiease-demo.myshopify.com/admin/api/2024-01/products/count.json)
- **Method**: `GET`
- **Header**:
  - **Name**: `X-Shopify-Access-Token`
  - **Value**: your access token (see [Custom access token](./custom-access-token.md))
