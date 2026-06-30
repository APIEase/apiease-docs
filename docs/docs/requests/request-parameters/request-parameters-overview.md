---
title: Request Parameters Overview
description: Summary of how APIEase handles parameters across in-app, dynamic embedded, path variables, and chained requests.
---
# Request Parameters Overview

APIEase lets you pass data into requests in several ways so each run has the inputs it needs without exposing sensitive values.

- **In-app parameters**: Static or confidential values stored securely in APIEase. Use these when the value rarely changes or must stay server-side.
- **Dynamic embedded parameters**: Values provided at runtime from the storefront, webhooks, or other triggers (headers, query, path, body, or flow). Use these for request-specific data like customer ids or product handles.
- **Path variables**: Placeholders in the request URL (`/products/{id}`) that are filled by in-app or dynamic embedded parameters when the request executes.
- **Chained request parameters**: Data passed from the response of one request into the next request in a sequence.

Choose the parameter type based on where the value comes from and whether it must stay confidential. Combine these options to keep sensitive data secure while still letting each trigger supply the context it needs.

For Liquid requests, add a saved Liquid parameter only when you want a stored default, a sensitive saved value, or to insert a value with `{parameterName}`.
