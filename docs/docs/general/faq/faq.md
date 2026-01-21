---
title: FAQ
description: Quick answers to common APIEase questions.
---
# FAQ

## Do I need a Shopify access token or API Key to call the Shopify Admin API?
In many cases, no. APIEase can automatically inject the shop access token for Shopify Admin API calls when the request address triggers token injection.

Two common ways to trigger automatic injection:
1. Select the [Shopify Admin GraphQL address preset](../shopify-api/shopify-admin-graphql-address-preset.md) in the request address dropdown for an HTTP request. This fills the correct shop admin GraphQL address and triggers APIEase to inject the shop access token, so you do not need to add an `X-Shopify-Access-Token` header manually.
2. Use a Shopify Admin GraphQL request address that matches your shop domain and api path like this: `https://yourstore.myshopify.com/admin/api/2025-10/graphql.json` so the address pattern triggers APIEase token injection.

## What is my Shopify access token or API Key?
If you're using APIEase to call the Shopify Admin API, you usually do not need to find a token or API key yourself. APIEase will automatically inject the shop access token when the request address triggers using token injection as described here: [Shopify Admin GraphQL address preset](../shopify-api/shopify-admin-graphql-address-preset.md)).
If you still want to obtain and use a custom Shopify access token, follow the [Custom access token](../shopify-api/custom-access-token.md) instructions.
