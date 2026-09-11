---
title: apieaseMetaData
description: Access execution metadata, including the APIEase API key friendly name, and pass it to Shopify Flow.
---
# apieaseMetaData

`apieaseMetaData` is an automatically available [System Variable](./overview.md) object containing supported information about the current execution. You do not create it on the Variables page or enable it with a System parameter.

## Reference the object or a child

| Reference | Value |
| --- | --- |
| `{apieaseMetaData}` | The whole metadata object |
| `{apieaseMetaData.apieaseApiKeyName}` | The authenticating APIEase API key's friendly name, when available |

The spelling is case-sensitive. A bare `apieaseMetaData` value without braces is literal text.

When `{apieaseMetaData}` is the entire value, Flow, Liquid, System, and JSON body parameter values preserve the object. Text destinations, such as headers and query parameters, receive serialized JSON text for the object.

Metadata is available where APIEase performs runtime substitution or Liquid rendering. Arbitrary widget JavaScript is not automatically rewritten.

## apieaseMetaData.apieaseApiKeyName

`apieaseApiKeyName` contains the friendly name of the [APIEase API key](../../../settings/apiease-api-key.md) used to authenticate the initiating request. It contains the name, never the secret key.

It is currently the only supported metadata child. For a fictional API key named `Example integration`, the object is:

```json
{"apieaseApiKeyName": "Example integration"}
```

If execution did not authenticate with a named APIEase API key, `apieaseMetaData` is `{}` and `apieaseApiKeyName` is absent. Referencing that absent child with single braces can produce an [unresolved-variable warning](./overview.md#unresolved-references).

The initiating request's authentication information remains available through [chained requests](../../../../requests/request-parameters/chained-requests.md) and nested Liquid calls.

## Pass metadata to Shopify Flow

Create a [Flow request](../../../../requests/shopify-flow-integration/add-flow-request.md), then add a Flow-type parameter:

| Setting | Value |
| --- | --- |
| Type | `flow` |
| Name | `myMetadata` |
| Value | `{apieaseMetaData}` |

You choose the output parameter name: `myMetadata` is an example, not a required name. For this example, initiate the request with an APIEase API key named `Example integration`, either directly or through a request chain.

In Shopify Flow, use the **APIEase Flow Trigger** as described in the [minimal Flow integration](../../../../requests/shopify-flow-integration/minimal-flow-integration.md). Its `flowParameters` field is JSON text. After parsing it, the payload includes:

```json
{
  "requestFlowParameters": {
    "myMetadata": {
      "apieaseApiKeyName": "Example integration"
    }
  },
  "executionId": "example-execution-id"
}
```

APIEase generates the actual `executionId`. The metadata object is under `requestFlowParameters.myMetadata`; its friendly name is at `requestFlowParameters.myMetadata.apieaseApiKeyName` after parsing `flowParameters`.

For a **Run code** step, include the trigger field in the input query:

```graphql
query {
  flowParameters
}
```

Then read the child in the workflow's JavaScript:

```javascript
export default function main(input) {
  const parameters = JSON.parse(input.flowParameters);
  return {
    callingIntegration:
      parameters.requestFlowParameters.myMetadata.apieaseApiKeyName ?? ""
  };
}
```

Define the Run code output so later workflow steps can select `callingIntegration`:

```graphql
type Output {
  callingIntegration: String!
}
```

The output is `Example integration` for this example, or an empty string when the metadata child is absent. If your workflow returns a result to APIEase, follow the minimal integration's instructions to preserve `executionId` in the callback.

### Pass only the name

To send only the friendly name instead of the object, configure:

| Setting | Value |
| --- | --- |
| Type | `flow` |
| Name | `callingIntegration` |
| Value | `{apieaseMetaData.apieaseApiKeyName}` |

After parsing the trigger's `flowParameters`, `requestFlowParameters.callingIntegration` is `"Example integration"`. If the child is absent, the single-brace reference stays unchanged and can produce an unresolved-variable warning.

## Use native Liquid

In an APIEase Liquid template, access the friendly name directly:

```liquid
{{ apieaseMetaData.apieaseApiKeyName }}
```

For the fictional key above, this renders `Example integration`. Native Liquid expressions follow Liquid rendering behavior, not APIEase's single-brace unresolved-reference warning rules.
