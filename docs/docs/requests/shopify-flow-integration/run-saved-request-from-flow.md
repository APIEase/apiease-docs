---
title: Run a saved request from Shopify Flow
description: Use APIEase Flow Action to invoke a saved APIEase request from a Shopify Flow workflow.
---
# Run a saved request from Shopify Flow

Use **APIEase Flow Action** when a Shopify Flow workflow needs to run a request already saved in APIEase.

1. Save the request in APIEase in the same store. Keep its type appropriate to the work: for an external API call, use **HTTP** with the required URL, method, parameters, and credentials. Mark credentials **Sensitive**. Copy the request's **Handle**.
2. Create or open your Shopify Flow workflow with the trigger you need, such as an order event.
3. Add the **APIEase Flow Action** (`apiease-flow-action`).
4. Set the required **Flow Parameters** field to valid JSON containing `requestId` with your saved request handle:

```json
{"requestId":"inventory-sync"}
```

5. Supply any additional values the saved request needs, then turn on the workflow. When the action runs, APIEase invokes the saved request through normal request execution.

The JSON key is `requestId` even when its value is a handle. The saved request's internal ID also works. Use the handle, not its display name, a full request URL, or a separate `requestHandle` field. You do not need a proxy endpoint, remote API key, storefront trigger, or conversion to the **Flow** request type for this action. Normal request configuration and usage limits still apply.

For requests using workflow data, include fields alongside `requestId` in the JSON and configure the saved request to consume those values through its previous-response parameter mappings. Ensure the final text remains valid JSON when inserting Shopify Flow variables. Keep API credentials saved as Sensitive request parameters rather than including them in the workflow JSON.

## When executionId is needed

For a workflow that starts in Shopify Flow, `executionId` is not required:

```json
{"requestId":"inventory-sync","orderId":"123456789"}
```

`executionId` is relevant when APIEase has already started a Shopify Flow workflow and is waiting for its result. Preserve the execution ID supplied in that trigger's `flowParameters` when returning output through APIEase Flow Action. Including both `executionId` and `requestId` resolves the earlier execution and then runs the selected saved request.

The action has one required input field, **Flow Parameters**. It does not declare structured output fields for later Shopify Flow steps. If you need an external API response available inside Flow, start the request in APIEase and pass its response into a chained Flow request; see [Minimal Flow integration](./minimal-flow-integration.md).
