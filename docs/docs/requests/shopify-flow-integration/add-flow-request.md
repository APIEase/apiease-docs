---
title: How to add a Flow request in APIEase
description: Create a Flow request that triggers a Shopify Flow workflow from APIEase.
---
# How to add a Flow request in APIEase

Follow these steps to create a Flow request and send data into Shopify Flow.

1. Go to **Requests** in APIEase.
2. Click the **Add Request** plus button in the upper-left corner.
3. (Optional) Name the request (for example, `Flow - Inventory Update`).
4. Set **Request type** to **Flow** so the request triggers a Shopify Flow workflow.
5. (Optional) Add **Flow** parameters with any JSON you want to send into the workflow.
6. (Optional) Chain this Flow request from another request by setting it as the **Next Request** of the prior step.
7. Save the request.

To pass the initiating APIEase API key's friendly name to your workflow, see [Pass metadata to Shopify Flow](../../general/apiease-details/system/system-variables/apiease-metadata.md#pass-metadata-to-shopify-flow). The example shows how to send a whole metadata object or just its name and read it from the trigger's `flowParameters` JSON text.
