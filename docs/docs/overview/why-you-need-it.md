---
title: Why You Need It
description: Why APIEase exists and what problems it solves.
---
# Why You Need It

Connecting APIs, running custom logic, and coordinating workflows usually requires a backend. Most stores solve this by building and hosting a custom app, creating one off server functions, or chaining together several single purpose tools. Each project introduces new infrastructure to build, deploy, and maintain, and each client or use case often requires a separate implementation.

APIEase provides a central place for all API calls, logic, and automation to run. Instead of building a backend for each project, you define requests in APIEase and use them wherever they are needed: in the storefront, in Flow, from webhooks, on a schedule, or from external systems. This removes the need to manage separate servers, reduces infrastructure tasks for every new integration, and makes it possible to reuse the same request definitions across multiple workflows and use cases.

APIEase also handles the related operational concerns that a backend normally carries, such as concurrency control, safe parameter handling, execution tracking, and request chaining. As a result, you can create fully functional integrations that behave like a custom app without actually building and operating the app itself.

Widgets extend that same model to storefront UI. You can build reusable Liquid and JavaScript components in APIEase and place them in a theme through the app block, without maintaining a separate widget service or front-end app.

---

## Why Secure Parameter Handling Matters

API calls and external services often require confidential values such as API keys, tokens, or account credentials. These values cannot be placed in the storefront because anything delivered to a browser is visible through developer tools. Liquid code, JavaScript, and JSON embedded in a theme can all be inspected by anyone who loads the page.

If confidential parameters are exposed in the storefront, they can be used to access external systems, submit unauthorized requests, or retrieve private data. This creates a clear risk for the store, the merchant, and the systems being connected.

APIEase prevents this exposure by storing all confidential parameters securely on the server. When a request runs, APIEase injects sensitive values at execution time so they are never sent to the storefront or to any external caller. Even when a request is triggered from the storefront, the sensitive parts of the request remain inside the APIEase environment.

By keeping credentials server side at all times, APIEase ensures that API keys, tokens, and other sensitive values remain protected while still allowing the request to be triggered from any allowed source.
