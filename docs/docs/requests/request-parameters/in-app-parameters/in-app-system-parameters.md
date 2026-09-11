---
title: In-app system parameters
description: Built-in system parameters available inside APIEase requests.
---
# In-app system parameters

System parameters are special values that control how a request is handled by APIEase. Unlike headers, query parameters, or body values that are sent to the destination endpoint, system parameters affect the behavior of the request itself.

These parameters are managed directly in the request editor.

See [System Parameters](../../../general/apiease-details/system/system-parameters/overview.md) for the complete reference, including HTTP, Flow, Liquid, response overrides, and runtime history settings.

**How to Add a System Parameter**  
While editing your request:
1. Click the plus icon in the Parameter column.
2. Select the **System** radio button.
3. Enter the system parameter name in the **Name** field.
4. Enter the desired value in the **Value** field.
5. Click **Save** at the top of the request editor.

**System Parameter Example:**  
To require logged-in customers for validation, set `validateCustomer` to `true`.
- **Name**: `validateCustomer`
- **Value**: `true`
With `validateCustomer` set to true, the customer must be logged in for the call to pass validation and return a response to the storefront.

![In-app system parameter configuration](https://cdn.shopify.com/s/files/1/0733/1820/3680/files/in-app-system-parameters.png?v=1744837315)
