---
title: Requests Overview
description: Explain what requests are and how they behave inside APIEase.
---
# Requests Overview

Everything that you can accomplish with APIEase starts with a request.

A request is a configuration that defines how APIEase should securely call an external API, trigger a Shopify Flow workflow, run Liquid logic, or execute internal system functions. Each request contains the destination (when applicable), any necessary parameters, and optional logic to determine when and how it should run.

Each request has a handle. Use the handle as the stable identifier when another request calls it, storefront code triggers it, or `apiease-cli` and the public API manage it.

Requests can be used for a wide variety of purposes, including:

- Calling third-party APIs from your Shopify storefront
- Receiving webhook events and responding with external actions
- Scheduling recurring data syncs with external systems
- Triggering Shopify Flow automations
- Executing multiple requests in sequence based on API responses

There are four [Request types](./request-types/request-types-overview.md) in APIEase: [HTTP requests](./request-types/http-requests.md), [Flow requests](./request-types/flow-requests.md), [Liquid requests](./request-types/liquid-requests.md), and [System requests](./request-types/system-requests.md).

Every request you create can include embedded parameters, dynamic storefront values, or confidential credentials stored securely on the server.

Once created, each request can be triggered in several ways. You can run it manually from the admin, trigger it automatically using a webhook, start it from the storefront using Shopify's app proxy, or schedule it to run on a repeating interval using the built in cron system.

Requests are the core building blocks of APIEase. They give you a simple and secure way to create integrations, automate tasks, and connect your storefront with external services without the need to host your own app.
