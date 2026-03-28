---
title: Using Functions in Liquid Requests
description: Call reusable APIEase Functions from Liquid Requests.
---
# Using Functions in Liquid Requests

APIEase Functions are reusable Liquid helpers that run inside a parent [Liquid Request](../requests/request-types/liquid-requests.md).

When a Liquid request calls a Function:

- The Function runs in process as part of the parent Liquid request
- The Function does not create a separate request execution
- The Function does not add separate request charges

## The function tag

Use the `function` tag to call a saved Function and assign its result to a variable.

Basic syntax:

```liquid
{% function build_summary(customer.firstName) as summary %}
{{ summary }}
```

`as <name>` is required. APIEase assigns the Function result to that alias and you can use it later in the template.

## Inline positional syntax

The simplest syntax is an inline function call by name:

```liquid
{% function format_price(product.price, cart.currency.iso_code) as formattedPrice %}
{{ formattedPrice }}
```

Arguments are matched to the saved parameter definitions in order.

If your Function defines these parameters:

1. `amount`
2. `currency`

Then the example above maps:

- `product.price` to `amount`
- `cart.currency.iso_code` to `currency`

Supported inline argument styles include:

- String literals
- Number literals
- Boolean literals
- `null`
- Liquid variables and simple Liquid expressions

Example:

```liquid
{% function build_summary("Kevin, Jr.", 42, true, null, customer.firstName | append: " Smith") as summary %}
{{ summary.message }}
```

## Object syntax

You can also call a Function with a JSON object. This is useful when you want named arguments or want to resolve the Function dynamically.

Example using `functionName`:

```liquid
{% function {
  "functionName": "build_summary",
  "args": {
    "firstName": "{{ customer.firstName }}",
    "lastName": "{{ customer.lastName }}"
  }
} as summary %}
{{ summary.message }}
```

Example using `functionId`:

```liquid
{% function {
  "functionId": "function-123",
  "args": {
    "amount": "{{ product.price }}",
    "currency": "{{ cart.currency.iso_code }}"
  }
} as result %}
{{ result }}
```

You can also pass a variable that already contains the invocation object:

```liquid
{% function functionInput as summary %}
{{ summary.message }}
```

This form is useful when your Liquid context already includes a prebuilt function input object.

## Accessing parameters inside the Function

Inside the saved Function body, each declared parameter is available as a Liquid variable by its parameter name.

If your Function declares:

- `firstName`
- `lastName`

Then the Function body can use:

```liquid
{{ firstName }}
{{ lastName }}
```

Important behavior:

- Only declared parameters are exposed inside the Function body.
- Missing arguments resolve to `null`.
- Extra positional arguments are rejected with an error.

## Return behavior

A Function returns whatever its Liquid body renders.

If the rendered output is valid JSON, APIEase parses it before assigning the alias. This lets a Function return:

- Objects
- Arrays
- Numbers
- Booleans
- `null`

If the rendered output is not valid JSON, APIEase returns trimmed text.

String example:

```liquid
Hello {{ firstName }}
```

Object example:

```liquid
{
  "message": "Hello {{ firstName }}",
  "name": "{{ firstName }}"
}
```

Then call it like this:

```liquid
{% function build_summary(customer.firstName, customer.lastName) as summary %}
{{ summary.message }}
```

## Example: reusable title builder

Saved Function:

```liquid
{{ prefix }} {{ title | strip }}
```

Declared parameters:

- `prefix`
- `title`

Liquid Request:

```liquid
{% function build_title("Sale:", product.title) as computedTitle %}

{% call {
  "requestId": "create-tagline",
  "bodyEmbedded": {
    "title": computedTitle
  }
} as response %}

{{ response.status }}
```

## Guardrails and errors

APIEase includes a few protections for Functions:

- Recursive Function calls are not allowed.
- Nested Function calls are limited to a maximum depth of 10.
- Calling a missing Function raises an error.
- Malformed inline invocation syntax raises an error.
- Omitting `as <name>` raises an error.

## When to use Functions vs. Requests

Use a Function when you need reusable Liquid logic.

Use a [Liquid Request](../requests/request-types/liquid-requests.md) when you need the overall executable workflow.

Use an [HTTP Request](../requests/request-types/http-requests.md), [Flow Request](../requests/request-types/flow-requests.md), or [System Request](../requests/request-types/system-requests.md) when you need to call an external or app-managed operation.
