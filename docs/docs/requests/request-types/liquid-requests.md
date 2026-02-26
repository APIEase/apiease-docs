---
title: Liquid Requests
description: Use Liquid to transform data before or between API calls.
---
# Liquid Requests

Liquid requests let you run a Liquid template that can call any APIEase request and shape the output. This is useful when you want logic, variable substitution, or to combine multiple requests into one response without building a custom app.

**Liquid Request Fields**

**Name**: You can optionally give your request a name for your reference. If you plan to call this request from another request using a chained request, the name will be used by the calling request.

**Type**: Set this to **liquid** to create a request that renders a Liquid template.

**Liquid**: The Liquid code that will run when this request is triggered. Your template can:

- Use standard Liquid tags like assign, if, elsif, else, for, and capture.
- Call other APIEase requests using the custom call tag shown below.
- Read parameters passed in from the storefront or other triggers.

**Parameters**: You can provide in app parameters directly in the request configuration. If you need values that depend on customer activity or storefront context, you can pass dynamic embedded parameters from the storefront.

- **Liquid**: Key value pairs you want available to the template as variables.
- **System**: System parameters used by APIEase in special cases such as Customer Authentication.

**How Liquid parameters replace variables in Liquid requests**

Liquid parameters define variables for the Liquid template. Reference a Liquid parameter in request values using `{parameterName}` and APIEase replaces it at runtime.

Example:

- Liquid parameter name: `segment`
- Liquid parameter value: `vip`

```liquid
{% call {
  "requestId": "segment-offers",
  "queryParamsEmbedded": {
    "segment": "{segment}"
  }
} as response %}
{{ response.status }}
```

In this example, `{segment}` is replaced by the Liquid parameter value before the request is executed.

If your request includes confidential values such as API keys or credentials, check the Sensitive checkbox. These values are stored on the server and are never exposed to the storefront or even the admin screen. Once they have been submitted they are encrypted in our database and only decrypted for use at runtime.

**Supported Embedded Parameters**

When you invoke a request from a Liquid template using the call tag, you can include embedded parameters that override or add to the saved request configuration at runtime.

- `headersEmbedded`: Object of header key/value pairs to merge with saved request headers.
- `queryParamsEmbedded`: Object of query key/value pairs to merge with saved request query parameters.
- `pathParamsEmbedded`: Object of path key/value pairs to substitute into the saved request address path.
- `bodyEmbedded`: Object or raw string to use as the saved request body.
- `flowParamsEmbedded`: Object of key/value pairs passed into a Flow request.
- `liquidParamsEmbedded`: Object of key/value pairs made available to another Liquid request.
- `systemParamsEmbedded`: Object of key/value pairs used by APIEase for special features such as Customer Authentication.

At runtime, embedded parameters take precedence over in app parameters for the matching scope.

**The call tag**

Use the call tag to invoke any saved APIEase request from within your Liquid template. You can bind the response to a variable with `as`. You must provide `requestId` to the call tag.

Basic syntax with hard coded requestId:

```liquid
{% call { "requestId": "51bcee90-89ce-11f0-ac46-894599c37" } as response %}
{{ response.status }}
{{ response.data | json }}
```

Basic syntax with requestId that must be set as a Liquid Parameter:

```liquid
{% call { "requestId": "{requestId}" } as response %}
{{ response.status }}
{{ response.data | json }}
```

JSON style syntax:

You can also pass a single JSON object. This is convenient when you want to embed multiple parameter groups.

```liquid
{% call {
  "requestId": "",
  "headersEmbedded": { "Authorization": "Bearer {api_token}" },
  "queryParamsEmbedded": { "limit": 10 },
  "pathParamsEmbedded": { "productId": "product_id" },
  "bodyEmbedded": { "note": "from Liquid" }
} as response %}
  {{ response.status }}
```

Response fields:

- `response.status`: The numeric status returned by the request.
- `response.data`: The response payload. Use the json filter to print full objects.

**Using values from a previous response**

You can save values from one call and pass them into a second call using embedded parameters.

```liquid
{% call {"requestId": "51bcee90-89ce-11f0-ac46-894599c37"} as getCustomer %}

{% assign email = getCustomer.data.email %}

{% call {
  "requestId": "51bcee90-89ce-11f0-ac46-894599c38",
  "bodyEmbedded": { "email": email }
} as sendEmail %}

{{ sendEmail.status }}
```

**Control flow examples**

Conditional logic:

```liquid
{% call { "requestId": "51bcee90-89ce-11f0-ac46-894599c37" } as response %}
{% if response.status == 200 %}
  Success
{% else %}
  Error
{% endif %}
```

Looping:

```liquid
{% call { "requestId": "51bcee90-89ce-11f0-ac46-894599c37" } as response %}

{% for item in response.data.items %}
  {{ forloop.index }}. {{ item.title }}
{% endfor %}
```

Assign and capture:

```liquid
{% call { "requestId": "51bcee90-89ce-11f0-ac46-894599c37" } as response %}

{% if response.status == 200 %}
  Success
{% else %}
  Error
{% endif %}
```

**Rendering tips**

- To print a full JSON object, use `| json`.
- When you only need a specific field, access it directly (for example, `{{ response.data.id }}`).
- Use `assign` to store values you will reuse across calls.

**Triggers**

Choose how the request should be triggered:
  - Automatically via [webhook](../triggers/webhooks/trigger-requests-from-a-webhook.md)
  - On a recurring schedule using [cron](../triggers/cron-schedule.md)
  - As an endpoint served by APIEase via [Proxy Endpoints](../triggers/proxy-endpoint.md)
  - [Remote Calls](../triggers/calling-requests-remotely.md) from outside Shopify.
  - Manually via the "Copy and Execute" link on the requests admin page
  - From your storefront using Shopify's app proxy

**Next Request**

You can specify the name of another request to run after this request finishes. This allows you to build multi step workflows using chained requests.

**Examples**

Hello world:

```liquid
{% assign greeting = "Hello from Liquid" %}
{{ greeting }}
```

Call a saved HTTP request and show JSON:

```liquid
{% call { "requestId": "51bcee90-89ce-11f0-ac46-894599c37" } as r %}
{{ r.data | json }}
```

Call a Flow request with values from the template:

```liquid
{% assign orderId = params.order_id %}
{% call {
  "requestId": "start-order-flow",
  "flowParamsEmbedded": { "orderId": "{{orderId}}" }
} as flowRun %}
Run started: {{ flowRun.status }}
```

POST with a dynamic body:

```liquid
{% assign email = "test@example.com" %}
{% call {
  "requestId": "51bcee90-89ce-11f0-ac46-894599c37",
  "headersEmbedded": { "Content-Type": "application/json" },
  "bodyEmbedded": { "email": "{{email}}", "source": "storefront" }
} as sub %}
{{ sub.status }}
```
