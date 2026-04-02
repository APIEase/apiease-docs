---
title: APIEase Public API
description: Use the APIEase public API to manage saved resources and execute saved requests from external tooling.
---
# APIEase Public API

The APIEase public API is the HTTP interface behind `apiease-cli` and other external automation.

Use it when you want to:

- manage saved APIEase resources from code or scripts
- keep request, widget, variable, and function definitions under source control
- execute an existing APIEase request from outside Shopify

Most developer workflows should use the public API through `apiease-cli` from an `apiease-template` repository, but the underlying HTTP interface is available when you need direct integration.

## What the public API covers

Today, the public API has two main jobs:

1. CRUD operations for saved resources under `/api/v1/resources`
2. Remote execution of an existing saved request through `/api/remote/caller/call`

This is important because the public API is not a generic one-off proxy for arbitrary outbound calls. You first create and store APIEase resources, then APIEase manages execution using those saved definitions.

## Authentication

Public API requests are authenticated with two headers:

- `x-apiease-api-key`: your APIEase API key
- `x-shop-myshopify-domain`: the target shop domain, for example `yourstore.myshopify.com`

When you send JSON bodies, also include:

- `content-type: application/json`

Example:

```bash
curl -X GET 'https://app-admin.apiease.com/api/v1/resources/requests' \
  -H 'x-apiease-api-key: your-apiease-api-key' \
  -H 'x-shop-myshopify-domain: yourstore.myshopify.com'
```

APIEase resolves the shop from the `x-shop-myshopify-domain` header. Do not rely on shop-identifying fields in the JSON body.

## Resource routes

The current resource base path is `/api/v1/resources`.

| Resource | Collection route | Item route |
| --- | --- | --- |
| Requests | `/api/v1/resources/requests` | `/api/v1/resources/requests/{requestId}` |
| Functions | `/api/v1/resources/functions` | `/api/v1/resources/functions/{functionId}` |
| Variables | `/api/v1/resources/variables` | `/api/v1/resources/variables/{variableName}` |
| Widgets | `/api/v1/resources/widgets` | `/api/v1/resources/widgets/{widgetId}` |

Collection routes support:

- `GET` to list resources
- `POST` to create a resource

Item routes support:

- `GET` to read one resource
- `PUT` to update one resource
- `DELETE` to delete one resource

In practice, `apiease-cli` is a thin wrapper around these routes.

## Request conventions

If you are working with request resources, keep these conventions in mind:

- `type` is required and currently supports `http`, `flow`, `liquid`, and `system`
- `method` and `address` are required for `http` requests
- `liquid` is required for `liquid` requests
- `parameters` are optional for many requests but required for `system` requests
- `triggers` are optional and describe how a saved request can run later

The public API accepts the same request concepts already documented in the Requests section. Use those pages as the source of truth for detailed behavior instead of duplicating that material here:

- [Requests Overview](../requests/requests-overview.md)
- [HTTP Requests](../requests/request-types/http-requests.md)
- [Flow Requests](../requests/request-types/flow-requests.md)
- [Liquid Requests](../requests/request-types/liquid-requests.md)
- [System Requests](../requests/request-types/system-requests.md)
- [Request Parameters Overview](../requests/request-parameters/request-parameters-overview.md)
- [Triggers Overview](../requests/triggers/triggers-overview.md)

## Create a request

This example matches the request shape used by the template examples and the current public request contract:

```bash
curl -X POST 'https://app-admin.apiease.com/api/v1/resources/requests' \
  -H 'content-type: application/json' \
  -H 'x-apiease-api-key: your-apiease-api-key' \
  -H 'x-shop-myshopify-domain: yourstore.myshopify.com' \
  -d '{
    "id": "product-details-proxy",
    "name": "Product Details Proxy",
    "type": "http",
    "method": "POST",
    "address": "https://api.example.com/products/{productHandle}/details",
    "parameters": [
      {
        "type": "header",
        "name": "Accept",
        "value": "application/json"
      },
      {
        "type": "header",
        "name": "Authorization",
        "value": "Bearer {external_api_token}",
        "sensitive": true
      },
      {
        "type": "path",
        "name": "productHandle",
        "value": "sample-product"
      }
    ],
    "triggers": [
      {
        "type": "proxyEndpoint",
        "proxyEndpoint": {
          "path": "product-details",
          "method": "GET",
          "authenticated": true
        }
      }
    ]
  }'
```

When creating or updating a request:

- send only the fields that belong to the resource itself
- do not send `shop`, `shopId`, `shopDomain`, or `myshopifyDomain`
- mark confidential parameter values as `sensitive: true`

## Read, update, and delete

Use the collection route to list resources:

```bash
curl -X GET 'https://app-admin.apiease.com/api/v1/resources/requests' \
  -H 'x-apiease-api-key: your-apiease-api-key' \
  -H 'x-shop-myshopify-domain: yourstore.myshopify.com'
```

Use the item route to read, update, or delete one resource:

```bash
curl -X GET 'https://app-admin.apiease.com/api/v1/resources/requests/product-details-proxy' \
  -H 'x-apiease-api-key: your-apiease-api-key' \
  -H 'x-shop-myshopify-domain: yourstore.myshopify.com'
```

```bash
curl -X PUT 'https://app-admin.apiease.com/api/v1/resources/requests/product-details-proxy' \
  -H 'content-type: application/json' \
  -H 'x-apiease-api-key: your-apiease-api-key' \
  -H 'x-shop-myshopify-domain: yourstore.myshopify.com' \
  -d '{
    "name": "Product Details Proxy Updated",
    "type": "http",
    "method": "GET",
    "address": "https://api.example.com/products/{productHandle}/details"
  }'
```

```bash
curl -X DELETE 'https://app-admin.apiease.com/api/v1/resources/requests/product-details-proxy' \
  -H 'x-apiease-api-key: your-apiease-api-key' \
  -H 'x-shop-myshopify-domain: yourstore.myshopify.com'
```

The same CRUD pattern also applies to functions, variables, and widgets with their respective routes.

## Execute a saved request remotely

The public API also exposes a remote execution route for saved requests:

```bash
curl -X POST 'https://app-admin.apiease.com/api/remote/caller/call?requestId=product-details-proxy' \
  -H 'x-apiease-api-key: your-apiease-api-key' \
  -H 'x-shop-myshopify-domain: yourstore.myshopify.com'
```

Use that route when the request definition already exists in APIEase and you want to trigger it from another system. For more detail, see [Calling APIEase Requests Remotely](../requests/triggers/calling-requests-remotely.md).

## Response shape

Successful responses follow a simple pattern:

- collection reads return `{ ok: true, shopDomain, <resourcePlural> }`
- single-resource reads and writes return `{ ok: true, shopDomain, <resourceSingular> }`

Structured failures use this pattern:

```json
{
  "ok": false,
  "errorCode": "INVALID_REQUEST_CREATE_CONTRACT",
  "message": "Unable to create request",
  "fieldErrors": []
}
```

Common status codes across the public API include:

- `400` for invalid JSON, invalid shop context, or resource-specific bad input
- `401` for failed authentication
- `404` for missing resources on item routes
- `405` for unsupported methods
- `415` for non-JSON create or update bodies
- `422` for contract validation failures
- `500` for unexpected server failures

## Recommended workflow

For most teams, the practical workflow is:

1. keep resource definitions in a repository
2. manage them through `apiease-cli`
3. let the CLI call the public API using your configured base URL, API key, and shop domain
   In most cases, that base URL should be `https://app-admin.apiease.com`.
4. use direct HTTP calls only when you need custom automation outside the CLI

That keeps your APIEase resources versioned in git while still using the same public API contract that powers the CLI.
