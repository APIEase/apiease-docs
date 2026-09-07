---
title: What It Does
description: Functional overview of what APIEase executes and manages.
---
# What It Does

APIEase defines and runs four types of requests: [HTTP Requests](../requests/request-types/http-requests.md), [Flow Requests](../requests/request-types/flow-requests.md), [Liquid Requests](../requests/request-types/liquid-requests.md), and [System Requests](../requests/request-types/system-requests.md). Each request type is executed inside APIEase's managed environment, keeping credentials secure and ensuring logic is processed server-side.

APIEase also includes [Functions](../functions/functions-overview.md) and [Widgets](../widgets/widgets-page.md). Functions are reusable Liquid helpers for Liquid Requests, while Widgets are designed for storefront UI instead of API execution.

You can combine these building blocks to connect an [external API](../requests/connect-external-api.md) or [synchronize data with another system](../requests/synchronize-external-data.md). APIEase executes the saved workflow, while each API provider remains the authority for its endpoints, credentials, permissions, payloads, and usage limits.

## [HTTP Requests](../requests/request-types/http-requests.md)

HTTP Requests let you call external APIs using any method (GET, POST, PUT, PATCH, DELETE). You define the URL, headers, body, and parameters. APIEase executes the call on the server and returns the response to the system that triggered it.

## [Flow Requests](../requests/request-types/flow-requests.md)

Flow requests send data from APIEase into a Shopify Flow workflow through the APIEase Flow Trigger. To run a saved APIEase request from a workflow that starts in Shopify Flow, use the [APIEase Flow Action](../requests/shopify-flow-integration/run-saved-request-from-flow.md); the saved request keeps the type needed for its operation, such as HTTP.

## [Liquid Requests](../requests/request-types/liquid-requests.md)

Liquid Requests run custom logic written in Liquid. They let you transform data, extract fields, perform simple conditionals, construct dynamic request bodies, and call reusable [Functions](../functions/using-functions-in-liquid-requests.md). The Liquid code executes within APIEase and can use inputs from any trigger source.

## [System Requests](../requests/request-types/system-requests.md)

System Requests run internal APIEase functions (they do not call an external URL). This is useful for app-managed actions such as setting, getting, or deleting persisted variables.

## [Widgets](../widgets/widgets-page.md)

Widgets are reusable storefront components that render Liquid templates with optional JavaScript. They are added to your theme through the APIEase app block and can be updated centrally in the APIEase admin.

## [Functions](../functions/functions-overview.md)

Functions are reusable Liquid helpers that run inside a parent Liquid Request. Use them to keep shared formatting, transformation, and response-shaping logic in one place instead of repeating the same Liquid across multiple requests.

## What APIEase does not supply

APIEase does not provide another company's private API documentation or credentials, bypass provider permissions, or decide how records from different systems should be matched. Before building an integration, obtain the provider's current API contract and define the workflow's business rules. See [Connect to an external API](../requests/connect-external-api.md) for the required information.

## [Secure Parameter Storage](./why-you-need-it.md#why-secure-parameter-handling-matters)

Sensitive request parameters -- such as API keys, tokens, and passwords -- are masked after saving, omitted from normal read interfaces, and decrypted when APIEase executes the request. This protects the saved request configuration, but it does not filter private data from an external API's response. Sensitive Variables and APIEase API keys have different visibility rules. See [Credentials, authentication, and security](../general/faq/credentials-and-security.md).
