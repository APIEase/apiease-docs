---
title: Dynamic embedded parameters overview
description: How to pass parameters from storefronts, Flow, or webhooks at runtime.
---
# Dynamic embedded parameters overview

**Dynamic Embedded Parameters From Storefront Overview**  
In some cases, it's not enough to define your request parameters statically in the APIEase admin. You may need to send information from your storefront that is only available at runtime, based on the customer's session, selections, or activity.

This is where dynamic embedded parameters come in.

With APIEase, you can pass query parameters, headers, body content, path values, Flow values, or Liquid request values dynamically from your storefront using embedded placeholders. These dynamic values are injected into the request at the moment it is triggered from the storefront.

**Why Use Dynamic Embedded Parameters?**

Dynamic embedded parameters allow you to tailor each API request to the individual visitor, cart, or page context. Common use cases:
- Personalization: send a customer's name, email, or cart ID to an external service
- User input: capture form field values or product selections made on the page
- Session-based logic: include discount codes, location data, or referral info based on the current session
- Product data: pass information about the product being viewed or purchased
- Analytics or tracking: include context for tracking conversions, clicks, or customer actions

Without dynamic parameters, all values must be fixed in advance, which limits your ability to respond to customer behavior or use real-time data.

**Important Security Reminder**

Dynamic embedded parameters are useful for sending runtime information, but they should **never** be used to pass confidential credentials such as:

- Shopify access tokens
- API keys
- Usernames or passwords
- Secret authorization headers

The purpose of APIEase is to keep those credentials safe and hidden on the server side. If you include them in storefront JavaScript or Liquid, they become visible to anyone who visits your store.

If you need to authenticate with an external system and use a returned authentication code, you can use **APIEase chained requests**. In this setup, the first request performs the authentication, and the second request uses the returned token or session key. This keeps all confidential steps on the server and completely out of the storefront.

You can read more about [chained requests here](../chained-requests.md) and view an [authentication example here](../../../general/apiease-details/authentication-example.md).

Always store confidential credentials in the APIEase admin. Use dynamic parameters only for data that is safe to expose and specific to the current customer or page context.

**Flexible Placement**

You can embed dynamic values into:

- Query parameters
- Headers
- Request body
- Path segments
- Flow parameters
- Liquid request parameters

Each of these can be populated using JavaScript embedded in your storefront snippet. The data you pass is merged into the request structure when it is triggered, ensuring both flexibility and security.

For Liquid requests, use `liquidParamsEmbedded` to pass a JSON object of per-call values. Inside the Liquid request, read those values from `apiEaseParameters.liquidParams.<parameterName>`. See [Dynamic embedded Liquid parameters](./liquid-parameters.md) for a complete example.
