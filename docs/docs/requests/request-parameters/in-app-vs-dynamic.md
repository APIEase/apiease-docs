---
title: In-app parameters vs dynamic embedded parameters
description: Explain when to use in-app parameters versus dynamic embedded parameters from storefronts or Flows.
---
# In-app parameters vs dynamic embedded parameters

Use an **in-app parameter** for a value saved with the request. Examples include `Content-Type: application/json`, a stable provider setting, or a sensitive request credential that must stay server-side.

Use a **dynamic embedded parameter** for a runtime value that can change on each call. For example, storefront code can pass the ID of the product currently being viewed instead of saving one product ID on the request. Dynamic embedded parameters are also called runtime parameters or embedded parameters.

Both forms use the same locations: headers, query parameters, path parameters, body, Flow parameters, Liquid parameters, and supported System parameters. If a saved parameter and dynamic embedded parameter have the same name in the same location, the dynamic embedded value normally overrides the saved value for that execution. Some [System Parameters](../../general/apiease-details/system/system-parameters/overview.md), including `REQUEST_TIMEOUT_SECONDS`, `IMMEDIATE_FLOW_RESPONSE`, and `RECORD_RUNTIME_HISTORY`, use the saved request setting instead.

Start with the [request parameters overview](./request-parameters-overview.md), then use the [in-app parameter](./in-app-parameters/in-app-parameters-overview.md) or [dynamic embedded parameter](./dynamic-embedded-parameters/dynamic-embedded-parameters-overview.md) pages for setup details.
