---
title: APIEase integrated with Shopify Flow - Cat image inventory
description: Demo showing APIEase chained requests with Shopify Flow to adjust inventory based on cat image size.
---
# APIEase integrated with Shopify Flow - Cat image inventory

This demo shows how a storefront button triggers APIEase, Shopify Flow, and a chained GraphQL call to adjust inventory based on a cat image’s width.

![APIEase request chain](https://cdn.shopify.com/s/files/1/0733/1820/3680/files/flow-cat-image-inventory-requests.png?v=1743029544)

## How the demo works
1. A storefront button calls an APIEase proxy endpoint.
2. APIEase calls The Cat API to fetch a random image (includes width/height).
3. The Cat API response is passed to Shopify Flow via a chained Flow request.
4. Flow runs logic to classify the image size (small, medium, large).
5. Flow returns the matching location and inventory item to APIEase.
6. A final APIEase request calls Shopify GraphQL to increment the correct variant’s inventory.
7. The storefront shows success or error after the mutation completes (Shopify inventory updates may take a moment to appear).

## APIEase request chain
1. **Request #1: The Cat API**  
   - Name: `Flow - Cat Images - Get Cat`  
   - Type: `http`  
   - Address: `https://api.thecatapi.com/v1/images/search`  
   - Method: `GET`  
   - Next Request: `Flow - Cat Images - Add Cat`  
   - Sample response:
     ```json
     {
       "data": [
         {
           "id": "ced",
           "url": "https://cdn2.thecatapi.com/images/ced.jpg",
           "width": 720,
           "height": 960
         }
       ],
       "status": 200
     }
     ```
   The response is forwarded as `previousRequestResponse` into the Flow request.

2. **Request #2: Shopify Flow (APIEase Flow Trigger)**  
   - Name: `Flow - Cat Images - Add Cat`  
   - Type: `flow`  
   - Next Request: `Flow - Cat Images - Increment Inventory`  
   - Incoming Flow parameters:
     ```json
     {
       "requestFlowParameters": {},
       "previousRequestResponse": {
         "0": {
           "id": "ced",
           "url": "https://cdn2.thecatapi.com/images/ced.jpg",
           "width": 720,
           "height": 960
         }
       },
       "executionId": "99524b60-0b4d-11f0-8ea0-67506abcdec8"
     }
     ```
   - Flow adds `incrementInventoryParameter` (location and inventory item) and returns:
     ```json
     {
       "status": 200,
       "data": {
         "requestFlowParameters": {},
         "previousRequestResponse": {
           "0": {
             "id": "ced",
             "url": "https://cdn2.thecatapi.com/images/ced.jpg",
             "width": 720,
             "height": 960
           }
         },
         "executionId": "99524b60-0b4d-11f0-8ea0-67506abcdec8",
         "incrementInventoryParameter": {
           "location": "gid://shopify/Location/80446030117",
           "inventoryItemId": "gid://shopify/InventoryItem/52358268420389"
         }
       }
     }
     ```

This example uses an explicit `X-Shopify-Access-Token` header for the Shopify Admin API call. For automatic shop access token usage and overrides, see [Automatic vs overridden Shopify access tokens](../../general/shopify-api/automatic-vs-overridden-shopify-access-tokens.md).

3. **Request #3: Shopify GraphQL**  
   - Name: `Flow - Cat Images - Increment Inventory`  
   - Type: `http`  
   - Address: `https://store-apiease-admin-local.myshopify.com/admin/api/2025-01/graphql.json`  
   - Method: `POST`  
   - Headers:  
     - `X-Shopify-Access-Token`: `[access-token]`  
     - `Content-Type`: `application/json`  
   - GraphQL body (uses Flow output for replacements):
     ```json
     {
       "query": "mutation inventoryAdjustQuantities($input: InventoryAdjustQuantitiesInput!) {  inventoryAdjustQuantities(input: $input) {  userErrors { field message }  inventoryAdjustmentGroup {  createdAt reason changes { name delta }  }  }  }",
       "variables": {
         "input": {
           "reason": "correction",
           "name": "available",
           "changes": [
             {
               "delta": 1,
               "inventoryItemId": "{incrementInventoryParameter.inventoryItemId}",
               "locationId": "{incrementInventoryParameter.location}"
             }
           ]
         }
       }
     }
     ```

## Shopify Flow workflow
1. Trigger: **apiease-flow-trigger**.
2. Condition: Confirm the incoming `requestId` matches the Flow request.
3. Action: Shopify **Get location data** to retrieve variants and locations.
4. Action: **Run Code** to classify image size and select the matching inventory item.
5. Action: **apiease-flow-action** to return Flow parameters (including `incrementInventoryParameter`) to APIEase.

![Shopify Flow workflow](https://cdn.shopify.com/s/files/1/0733/1820/3680/files/flow-cat-image-inventory-workflow.png?v=1743029544)

### Run Code inputs
```graphql
query {
  getLocationData {
    id
    inventoryLevels {
      item {
        id
        sku
        variant {
          title
          sellableOnlineQuantity
        }
      }
    }
  }
  flowParameters
}
```

### Run Code script
```javascript
export default function main(input) {
  const { getLocationData, flowParameters } = input;
  const flowParametersObject = JSON.parse(flowParameters);
  const firstImage = flowParametersObject.previousRequestResponse['0'];
  const width = firstImage?.width;

  if (typeof width !== 'number') {
    return { message: 'Image width not found or invalid.', targetSize: null };
  }

  let targetSize;
  if (width < 400) {
    targetSize = 'Small';
  } else if (width < 800) {
    targetSize = 'Medium';
  } else {
    targetSize = 'Large';
  }

  if (!Array.isArray(getLocationData) || getLocationData.length === 0) {
    return { message: 'No location data found.' };
  }

  const incrementInventoryParameter = {};
  for (const location of getLocationData) {
    for (const level of location.inventoryLevels) {
      const item = level.item;
      const variant = item?.variant;
      if (variant?.title === targetSize) {
        incrementInventoryParameter.location = location.id;
        incrementInventoryParameter.inventoryItemId = item.id;
      }
    }
  }

  flowParametersObject.incrementInventoryParameter = incrementInventoryParameter;
  const flowParametersStringified = JSON.stringify(flowParametersObject);
  return { message: flowParametersStringified };
}
```

The Run Code step classifies the image size and attaches `incrementInventoryParameter` so APIEase can substitute those values in the GraphQL mutation.

![Run Code setup](https://cdn.shopify.com/s/files/1/0733/1820/3680/files/flow-cat-image-inventory-run-code.png?v=1743118558)

### APIEase Flow Action

![APIEase Flow Action variables](https://cdn.shopify.com/s/files/1/0733/1820/3680/files/flow-cat-image-inventory-action-variable.png?v=1743120408)

