---
title: APIEase IP address for whitelisting
description: IP address details if upstream services require allowlists.
---
# APIEase IP address for whitelisting

APIEase makes API calls from a fixed IP address. This is useful if the external system you are calling requires IP whitelisting for security purposes.

The IP address used by APIEase for all outgoing requests is **34.45.199.142**.

This address is static and does not change.

Use Case ExampleSome systems, like ERP or warehouse management platforms, require incoming API calls to originate from a known IP address. Shopify does not provide a fixed IP address range for native webhook or Flow executions, but APIEase gives you a reliable, fixed IP for secure integration.

By using APIEase to make your API calls, you can meet the IP whitelisting requirements of your external systems while still reacting to events in Shopify such as new orders, inventory changes, or customer updates.

