---
title: What It Does
description: Functional overview of what APIEase executes and manages.
---
# What It Does

APIEase defines and runs four types of requests: [HTTP Requests](../requests/request-types/http-requests.md), [Flow Requests](../requests/request-types/flow-requests.md), [Liquid Requests](../requests/request-types/liquid-requests.md), and [System Requests](../requests/request-types/system-requests.md). Each request type is executed inside APIEase's managed environment, keeping credentials secure and ensuring logic is processed server-side.

APIEase also includes [Functions](../functions/functions-overview.md) and [Widgets](../widgets/widgets-page.md). Functions are reusable Liquid helpers for Liquid Requests, while Widgets are designed for storefront UI instead of API execution.

## [HTTP Requests](../requests/request-types/http-requests.md)

HTTP Requests let you call external APIs using any method (GET, POST, PUT, PATCH, DELETE). You define the URL, headers, body, and parameters. APIEase executes the call on the server and returns the response to the system that triggered it.

## [Flow Requests](../requests/request-types/flow-requests.md)

Flow Requests allow Shopify Flow to trigger logic that APIEase runs. APIEase receives the Flow input, processes any parameters, executes the defined request or workflow, and returns output data that Flow can use in subsequent steps.

## [Liquid Requests](../requests/request-types/liquid-requests.md)

Liquid Requests run custom logic written in Liquid. They let you transform data, extract fields, perform simple conditionals, construct dynamic request bodies, and call reusable [Functions](../functions/using-functions-in-liquid-requests.md). The Liquid code executes within APIEase and can use inputs from any trigger source.

## [System Requests](../requests/request-types/system-requests.md)

System Requests run internal APIEase functions (they do not call an external URL). This is useful for app-managed actions such as setting, getting, or deleting persisted variables.

## [Widgets](../widgets/widgets-page.md)

Widgets are reusable storefront components that render Liquid templates with optional JavaScript. They are added to your theme through the APIEase app block and can be updated centrally in the APIEase admin.

## [Functions](../functions/functions-overview.md)

Functions are reusable Liquid helpers that run inside a parent Liquid Request. Use them to keep shared formatting, transformation, and response-shaping logic in one place instead of repeating the same Liquid across multiple requests.

## [Secure Parameter Storage](./why-you-need-it.md#why-secure-parameter-handling-matters)

APIEase stores confidential values -- such as API keys, tokens, and passwords -- on the server and never exposes them to the storefront or external clients. When a request is triggered, APIEase injects these secure parameters into the request at runtime so they are used during execution but never returned or made visible outside the managed environment.
