---
title: Request Parameters Overview
description: Summary of how APIEase handles parameters across in-app, dynamic embedded, path variables, and chained requests.
---
# Request Parameters Overview

APIEase lets you pass data into requests in several ways so each run has the inputs it needs without exposing sensitive values.

- **[In-app parameters](./in-app-parameters/in-app-parameters-overview.md)**: Saved values configured on the request. Use these when the value rarely changes or when a sensitive request parameter must remain server-side.
- **[Dynamic embedded parameters](./dynamic-embedded-parameters/dynamic-embedded-parameters-overview.md)**: Values provided at runtime by a caller, such as storefront code, a widget, or another request. They can supply headers, query values, path values, a body, Flow values, or Liquid values for one execution.
- **Path variables**: Placeholders in the request URL (`/products/{id}`) that are filled by in-app or dynamic embedded parameters when the request executes.
- **Chained request parameters**: Data passed from the response of one request into the next request in a sequence.

Choose the parameter type based on where the value comes from and whether it must stay confidential. Combine these options to keep sensitive data secure while still letting each trigger supply the context it needs.

Choose the parameter location from the receiving API's contract:

- **[Headers](./in-app-parameters/in-app-header-parameters.md)** carry request metadata, content type, or authentication.
- **[Query parameters](./in-app-parameters/in-app-query-parameters.md)** become key-value pairs in the URL query string.
- **[Path parameters](./in-app-parameters/in-app-path-parameters.md)** replace named [path variables](./path-variables.md) in the address.
- **[Body](./in-app-parameters/in-app-body-parameters.md)** carries the request payload. Use [form URL-encoded bodies](./form-urlencoded-bodies.md) only when the receiving API requires that content type.

For Liquid requests, distinguish saved Liquid parameters from runtime embedded Liquid parameters:

- **Saved Liquid parameters** are configured on the request and can be substituted with `{parameterName}` before execution. Use saved Liquid parameters for stored defaults, sensitive values, or other server-side configured values.
- **Runtime embedded Liquid parameters** are supplied by a caller with `liquidParamsEmbedded`. Use them for values that change per call; they can fill the request's `{parameterName}` placeholders without adding a matching saved parameter first.

Storefront and Admin widgets pass these groups directly to `apiease.runRequest`, for example `apiease.runRequest('lookup', {liquidParamsEmbedded: {reference: 'example'}})`. Values inside a group can include nested objects and arrays as well as strings, numbers, booleans, and null. The Admin widget's `inputs` form state is optional and separate from request parameters. See [Requests In Widgets](../../widgets/using-requests-in-widgets.md) for the calling syntax on each surface.

See [In-app parameters vs dynamic embedded parameters](./in-app-vs-dynamic.md) for the saved-versus-runtime decision and override behavior. For quick request-building answers, see the [Building requests FAQ](../../general/faq/building-requests.md).
