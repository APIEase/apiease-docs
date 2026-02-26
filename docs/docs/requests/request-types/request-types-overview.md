---
title: Request types overview
description: Choose between HTTP, Flow, Liquid, and System requests in APIEase.
---
# Request types overview

APIEase supports four request types. Pick the one that fits how you want to call external services, Shopify Flow, or internal system functions.

- **[HTTP requests](./http-requests.md)**: Standard API calls to external services. You define the endpoint, method, headers, and body content.
- **[Flow requests](./flow-requests.md)**: Start or continue a Shopify Flow automation, optionally including data pulled from other API calls or the storefront.
- **[Liquid requests](./liquid-requests.md)**: Run a Liquid template that can call other APIEase requests and shape the output—helpful for logic or combining multiple requests without a custom app.
- **[System requests](./system-requests.md)**: Run internal APIEase functions (for example, set/get/delete persisted variables) without calling an external URL.

Use HTTP requests when you need a direct API call, Flow requests when the action should occur inside Shopify Flow, Liquid requests when you need templating or conditional logic without a custom app, and System requests for internal app-managed actions.
