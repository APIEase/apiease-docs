---
title: Liquid Requests
description: Use Liquid to transform data before or between API calls.
---
# Liquid Requests

Liquid requests let you run a Liquid template that can call any APIEase request and shape the output. This is useful when you want logic, variable substitution, or to combine multiple requests into one response without building a custom app.

To create a Liquid request, choose **Liquid** as the request type and enter the Liquid template. Add saved parameters only for values you want to store on the request, and add triggers only for the ways this request should run.

**Liquid Request Fields**

**Name**: You can optionally give your request a name for your reference.

**Handle**: Stable identifier used by Liquid `call` tags, chained requests, storefront calls, `apiease-cli`, and the public API.

**Type**: Set this to **liquid** to create a request that renders a Liquid template.

**Liquid**: The Liquid code that will run when this request is triggered. Your template can:

- Use standard Liquid tags like assign, if, elsif, else, for, and capture.
- Call other APIEase requests using the custom call tag shown below.
- Call saved APIEase Functions using the custom function tag shown below.
- Read saved Liquid parameters and runtime values passed in with `liquidParamsEmbedded`.

**Parameters**: Parameters are optional for Liquid requests. Add a saved parameter when a value should be stored on the request, reused as a default, marked sensitive, or inserted with `{parameterName}` before execution.

- **Liquid**: Saved key value pairs you want available for `{parameterName}` substitution.
- **System**: System parameters used by APIEase in special cases such as Customer Authentication.

**Saved Liquid parameters**

Saved Liquid parameters are configured on the request. Use them for stored defaults, server-side configured values, sensitive values, or values you want APIEase to substitute with `{parameterName}` before execution. APIEase replaces `{parameterName}` with the saved value when the request runs.

Saved Liquid parameters are different from runtime embedded Liquid parameters. Runtime embedded Liquid parameters are supplied by a caller with `liquidParamsEmbedded` and are read inside Liquid through `apiEaseParameters.liquidParams.<parameterName>`.

Example:

- Liquid parameter name: `audience`
- Liquid parameter value: `general`

```liquid
{% call {
  "requestId": "content-summary",
  "queryParamsEmbedded": {
    "audience": "{audience}"
  }
} as response %}
{{ response.status }}
```

In this example, `{audience}` is replaced by the saved Liquid parameter value before the request is executed.

If your request includes confidential values such as API keys or credentials, check the Sensitive checkbox. These values are stored on the server and are never exposed to the storefront or even the admin screen. Once they have been submitted they are encrypted in our database and only decrypted for use at runtime.

**Runtime embedded Liquid parameters**

Use `liquidParamsEmbedded` for per-call values supplied at runtime by a storefront call, widget call, or another request. For storefront and widget calls, `liquidParamsEmbedded` is an APIEase runtime query parameter. Its value must be a JSON object string. Inside the Liquid request, APIEase exposes those values at `apiEaseParameters.liquidParams`.

JavaScript storefront/widget call:

```javascript
const liquidParams = {
  visitorName: "Alex",
  sourcePage: "homepage"
};

const queryParams = new URLSearchParams({
  requestId: "personalized-message",
  liquidParamsEmbedded: JSON.stringify(liquidParams)
});

fetch("/apps/apiease/integration/caller/call?" + queryParams.toString(), {
  headers: { Accept: "application/json" }
});
```

Liquid request:

```liquid
{% assign visitor_name = apiEaseParameters.liquidParams.visitorName | default: "there" | strip %}
{% assign source_page = apiEaseParameters.liquidParams.sourcePage | default: "unknown" | strip %}

{
  "message": "Hello, {{ visitor_name }}.",
  "sourcePage": {{ source_page | json }}
}
```

In this example, the APIEase runtime fields are `requestId`, `liquidParamsEmbedded`, and `apiEaseParameters.liquidParams`. The request handle, parameter keys, and values are example-specific:

- `requestId` is an APIEase runtime field. It selects which request runs, and its value should be the request handle.
- `liquidParamsEmbedded` is an APIEase runtime field. It passes a JSON object of values into a Liquid request.
- `apiEaseParameters.liquidParams` is the Liquid runtime object where those embedded Liquid parameters are exposed.
- `personalized-message` is only the example request handle.
- `visitorName` and `sourcePage` are only example-specific parameter names. Users can choose their own keys.
- `"Alex"` and `"homepage"` are only example values.

If the caller sends `{ "visitorName": "Alex" }` inside `liquidParamsEmbedded`, the Liquid request reads that value from `apiEaseParameters.liquidParams.visitorName`.

A Liquid request can also pass embedded Liquid parameters to another Liquid request with the `call` tag. In that case, provide `liquidParamsEmbedded` as an object in the call tag payload:

```liquid
{% call {
  "requestId": "personalized-message",
  "liquidParamsEmbedded": {
    "visitorName": "Alex",
    "sourcePage": "homepage"
  }
} as response %}
{{ response.data | json }}
```

**Supported Embedded Parameters**

When you invoke a request from a Liquid template using the call tag, you can include embedded parameters that override or add to the saved request configuration at runtime.

- `headersEmbedded`: Object of header key/value pairs to merge with saved request headers.
- `queryParamsEmbedded`: Object of query key/value pairs to merge with saved request query parameters.
- `pathParamsEmbedded`: Object of path key/value pairs to substitute into the saved request address path.
- `bodyEmbedded`: Object or raw string to use as the saved request body.
- `flowParamsEmbedded`: Object of key/value pairs passed into a Flow request.
- `liquidParamsEmbedded`: Object of key/value pairs made available to another Liquid request at `apiEaseParameters.liquidParams`.
- `systemParamsEmbedded`: Object of key/value pairs used by APIEase for special features such as Customer Authentication.

At runtime, embedded parameters take precedence over in app parameters for the matching scope.

**The call tag**

Use the call tag to invoke any saved APIEase request from within your Liquid template. You can bind the response to a variable with `as`. You must provide `requestId` to the call tag. For new work, pass the request handle as the `requestId` value.

Basic syntax with a hard coded request handle:

```liquid
{% call { "requestId": "product-details-proxy" } as response %}
{{ response.status }}
{{ response.data | json }}
```

Basic syntax with a request handle that must be set as a Liquid parameter:

```liquid
{% call { "requestId": "{requestHandle}" } as response %}
{{ response.status }}
{{ response.data | json }}
```

JSON style syntax:

You can also pass a single JSON object. This is convenient when you want to embed multiple parameter groups.

```liquid
{% call {
  "requestId": "product-details-proxy",
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

**The function tag**

Use the function tag to call a saved [Function](../../functions/functions-overview.md) from inside a Liquid Request. Functions are reusable Liquid helpers that run inside the current Liquid Request and do not create a separate request execution.

Inline syntax:

```liquid
{% function build_summary(customer.firstName, customer.lastName) as summary %}
{{ summary.message }}
```

Object syntax:

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

Important behavior:

- `as <name>` is required.
- Inline arguments are mapped to the Function's declared parameters in order.
- Object syntax supports `functionName` or legacy `functionId`. Prefer `functionName` in new Liquid templates.
- Missing arguments resolve to `null`.
- Extra positional arguments are rejected.

For full details and more examples, see [Using Functions in Liquid Requests](../../functions/using-functions-in-liquid-requests.md).

**Using values from a previous response**

You can save values from one call and pass them into a second call using embedded parameters.

```liquid
{% call {"requestId": "customer-lookup"} as getCustomer %}

{% assign email = getCustomer.data.email %}

{% call {
  "requestId": "send-customer-email",
  "bodyEmbedded": { "email": email }
} as sendEmail %}

{{ sendEmail.status }}
```

**Control flow examples**

Conditional logic:

```liquid
{% call { "requestId": "product-details-proxy" } as response %}
{% if response.status == 200 %}
  Success
{% else %}
  Error
{% endif %}
```

Looping:

```liquid
{% call { "requestId": "product-details-proxy" } as response %}

{% for item in response.data.items %}
  {{ forloop.index }}. {{ item.title }}
{% endfor %}
```

Assign and capture:

```liquid
{% call { "requestId": "product-details-proxy" } as response %}

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

Triggers are optional. Add a trigger only for the entry point that should run this request. Do not add the Storefront App Proxy trigger just because the request is a Liquid request; add that trigger only when storefront theme code calls this request directly through Shopify's app proxy. A Liquid request invoked by another APIEase request with the `call` tag does not need its own Storefront App Proxy trigger.

Choose how the request should be triggered:
  - Automatically via [webhook](../triggers/webhooks/trigger-requests-from-a-webhook.md)
  - On a recurring schedule using [cron](../triggers/cron-schedule.md)
  - As an endpoint served by APIEase via [Proxy Endpoints](../triggers/proxy-endpoint.md)
  - [Remote Calls](../triggers/calling-requests-remotely.md) from outside Shopify.
  - Manually via the "Copy and Execute" link on the requests admin page
  - From your storefront using Shopify's app proxy

**Next Request**

You can specify the handle of another request to run after this request finishes. This allows you to build multi step workflows using chained requests.

**Examples**

Hello world:

```liquid
{% assign greeting = "Hello from Liquid" %}
{{ greeting }}
```

Call a saved HTTP request and show JSON:

```liquid
{% call { "requestId": "product-details-proxy" } as r %}
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
  "requestId": "newsletter-signup",
  "headersEmbedded": { "Content-Type": "application/json" },
  "bodyEmbedded": { "email": "{{email}}", "source": "storefront" }
} as sub %}
{{ sub.status }}
```
