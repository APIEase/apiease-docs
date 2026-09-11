---
title: Response Overrides
description: Customize APIEase response status codes and messages using System parameters or completed Flow and Liquid results.
---
# Response Overrides

Use these [System Parameters](./overview.md) to customize the status code or message APIEase returns after a request completes. For example, a workflow can complete successfully but return a business result such as `409` with the message `Item unavailable`.

## Set a response code or message

Add either or both parameters to the saved request with type **System**:

| Name | Example value | Effect |
| --- | --- | --- |
| `APIEASE_RESPONSE_CODE_OVERRIDE` | `409` | Set the response status code. |
| `APIEASE_RESPONSE_MESSAGE_OVERRIDE` | `Item unavailable` | Set the response's `message` field. |

The code must be an integer from **200 through 599**, or its three-digit text representation. The message must be text; an empty string is allowed. Unresolved variable references are not accepted as override values.

Direct overrides do not require either of the flags below. Their values can also use normal request variable substitution, such as `{responseCode}` or `{responseMessage}` from a previous request's response. The resolved values must meet the same code and message rules.

These direct overrides apply to completed HTTP responses and successful System, Liquid, or Flow results. An HTTP destination's error status, such as `404`, can be overridden when APIEase received a normal HTTP response; a transport failure cannot.

Overrides change the APIEase response, not the destination API or the work already performed. The message is a response field, not an HTTP reason phrase. Response data remains unchanged by the override, although HTTP statuses **204**, **205**, and **304**, and HEAD responses, are sent without a body.

## Read overrides from a Flow or Liquid result

For a result-dependent status or message, add either or both flags to the saved request with type **System**:

| Name | Value | Field read from the result |
| --- | --- | --- |
| `OVERRIDE_APIEASE_RESPONSE_CODE` | `true` | `apieaseSystemData.apieaseResponseCodeOverride` |
| `OVERRIDE_APIEASE_RESPONSE_MESSAGE` | `true` | `apieaseSystemData.apieaseResponseMessageOverride` |

The flags default to disabled. Enter lowercase `true` as the parameter value to enable each one independently. These flags read completed **Flow or Liquid** output; HTTP and System results do not supply output-based overrides.

The returned `apieaseSystemData` object is separate from the [apieaseMetaData System Variable](../system-variables/apiease-metadata.md). It must be at the top level of the current result, not nested inside another result property.

### Set overrides in a Liquid result

Make the rendered result a JSON object with `apieaseSystemData` at its top level:

```json
{
  "available": false,
  "apieaseSystemData": {
    "apieaseResponseCodeOverride": 409,
    "apieaseResponseMessageOverride": "Item unavailable"
  }
}
```

### Set overrides in a Shopify Flow result

Set `apieaseSystemData.apieaseResponseCodeOverride` in the JSON sent through **APIEase Flow Action → Flow Parameters**. A **Run code** step can add the override while preserving the original `executionId` that APIEase needs to resolve the waiting call.

Start with a workflow using the **APIEase Flow Trigger**, as described in [Minimal Flow integration](../../../../requests/shopify-flow-integration/minimal-flow-integration.md).

1. On the saved APIEase Flow request, add a **System** parameter named `OVERRIDE_APIEASE_RESPONSE_CODE` with value `true`, then save. Keep `IMMEDIATE_FLOW_RESPONSE` set to `false` or remove it so APIEase waits for the result.
2. In Shopify Flow, add a **Run code** step after the workflow steps that determine the result. Configure its **Input** to include the trigger's `flowParameters`:

   ```graphql
   {
     flowParameters
   }
   ```

3. Define the Run code **Output** schema:

   ```graphql
   type Output {
     message: String!
   }
   ```

4. Use this **Code** to return a `409` response:

   ```javascript
   export default function main(input) {
     const parameters = JSON.parse(input.flowParameters);

     parameters.apieaseSystemData = {
       ...parameters.apieaseSystemData,
       apieaseResponseCodeOverride: 409
     };

     return { message: JSON.stringify(parameters) };
   }
   ```

   Replace `409` with the code appropriate to your workflow result. Codes must be integers from **200 through 599**.

5. Add **APIEase Flow Action** after Run code. In its **Flow Parameters** field, use the variable picker to select that **Run code → message** output. This passes the serialized JSON back to APIEase. The Run code output named `message` carries the entire callback JSON; it does not itself override the APIEase response message.

The returned JSON has this shape, alongside any other preserved input or result fields:

```json
{
  "executionId": "<original execution ID from the APIEase trigger>",
  "apieaseSystemData": {
    "apieaseResponseCodeOverride": 409
  }
}
```

Preserve the trigger's actual `executionId`; do not replace it with the placeholder above. Keep `apieaseSystemData` at the top level, without an extra `data` wrapper.

To also override the response message, add `apieaseResponseMessageOverride: "Item unavailable"` to the same `apieaseSystemData` object and enable the **System** parameter `OVERRIDE_APIEASE_RESPONSE_MESSAGE` with value `true` on the saved request.

The override applies to the original caller's response when the callback arrives while APIEase is still waiting. The Flow action's callback acknowledgment is independent of that response code. A late callback cannot change an immediate, queued, or timed-out response already returned to the caller. See [Flow Parameters](./flow-parameters.md) for response wait settings.

## Precedence and invalid values

APIEase resolves the code and message independently, using this order:

1. A valid value from the Flow or Liquid result, when its corresponding flag is `true`.
2. A valid direct System parameter value.
3. The normal response code or message.

Invalid override values are ignored and reported with an `INVALID_RESPONSE_OVERRIDE` warning. An invalid output override can therefore fall back to a valid direct setting. Removing the parameters restores normal response behavior.

## Responses that are not overridden

Overrides do not replace authentication or validation failures, concurrency rejections, transport errors, failed execution, or incomplete Flow results. In particular, queued Flow acknowledgments, immediate Flow responses, Flow wait timeouts, and immediate Liquid acknowledgments keep their normal responses.

To use a Flow or Liquid result to determine the response, keep immediate response disabled. See [Flow Parameters](./flow-parameters.md) and [Liquid Parameters](./liquid-parameters.md).

In a request chain, these settings apply to the current request's result. A later request can supply the final response returned by the chain; configure overrides on the request whose response you intend to return.
