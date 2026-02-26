---
title: Automatic Shopify Customer ID Injection
description: Automatically inject the logged-in Shopify customer ID into request values at runtime.
---
# Automatic Shopify Customer ID Injection

APIEase can replace `{SHOPIFY_LOGGED_IN_CUSTOMER_ID}` at runtime with the logged-in Shopify customer ID from the current storefront request.

You can use this placeholder in any value context where variable replacement is supported, including:

- Header parameter values
- Query parameter values
- Body parameter values
- Address values via path parameters
- System parameter values
- Liquid parameter values
- Liquid request values via Liquid parameters
- Flow parameter values

## Examples

### Header value

Set a header parameter like:

- Name: `X-Customer-Id`
- Value: `{SHOPIFY_LOGGED_IN_CUSTOMER_ID}`

At runtime, APIEase resolves it to the logged-in customer ID (for example `1234567890`).

### Query value

Set a query parameter like:

- Name: `customerId`
- Value: `{SHOPIFY_LOGGED_IN_CUSTOMER_ID}`

Resulting call example:

```text
https://api.example.com/orders?customerId=1234567890
```

### Body value

Use the placeholder inside JSON body values:

```json
{
  "customerId": "{SHOPIFY_LOGGED_IN_CUSTOMER_ID}",
  "action": "sync"
}
```

At runtime, `customerId` is replaced with the logged-in Shopify customer ID.

### Address value (via path parameter)

If your URL uses a path parameter, set that parameter value to the placeholder:

- URL template: `https://api.example.com/customers/{customerId}/orders`
- Path parameter `customerId` value: `{SHOPIFY_LOGGED_IN_CUSTOMER_ID}`

Resolved runtime URL example:

```text
https://api.example.com/customers/1234567890/orders
```

### System parameter value

You can also use the placeholder as a system parameter value. Example:

- Name: `customerId`
- Value: `{SHOPIFY_LOGGED_IN_CUSTOMER_ID}`

This is useful when downstream request logic expects customer ID as a system value.

### Liquid request values via Liquid parameters

Liquid request variables are always defined through Liquid parameters, then referenced in the template.

Set a Liquid parameter:

- Name: `customerId`
- Value: `{SHOPIFY_LOGGED_IN_CUSTOMER_ID}`

Then use it in the Liquid request:

```liquid
{% call {
  "requestId": "customer-orders",
  "queryParamsEmbedded": {
    "customerId": "{customerId}"
  }
} as response %}
{{ response.status }}
```

### Flow parameter value

In Flow request parameters, set a value such as:

- Name: `customerId`
- Value: `{SHOPIFY_LOGGED_IN_CUSTOMER_ID}`

At runtime, APIEase resolves this to the logged-in customer ID before executing the request.

## Prerequisite

This only works when the request runs in Shopify app proxy/storefront context where Shopify provides `logged_in_customer_id`.

## Recommended validation

Set system parameter `validateCustomer=true` so requests fail fast when no customer is logged in.

## Behavior when no logged-in customer is available

If no logged-in Shopify customer ID is available, `{SHOPIFY_LOGGED_IN_CUSTOMER_ID}` is not resolved.

With `validateCustomer=true`, APIEase blocks the request during validation. Without it, the unresolved placeholder may continue downstream as a literal value.
