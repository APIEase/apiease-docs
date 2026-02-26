---
title: Customer authenticated requests
description: Cover how APIEase supports customer-authenticated calls and what headers are required.
---
# Customer authenticated requests

You can authenticate request calls from your storefront.

Http calls from your storefront to APIEase are made using the [Shopify App Proxy](https://shopify.dev/docs/apps/online-store/app-proxies). If the customer is logged into your store then the customer id is sent to APIEase.

## Automatic customer ID injection

Need to inject the logged-in customer ID into request values? See [Automatic Shopify Customer ID Injection](../general/apiease-details/automatic-shopify-customer-id-injection.md).

## Customer Validation Options

You can restrict api calls to a particular request in APIEase by logged in customer in one of 2 ways:

1. Automatically validate all logged in customers.

Set "validateCustomer" to true as a System parameter.

![Validate customer system parameter toggle](https://tawk.link/65552a3acec6a91282103248/kb/attachments/zy4MAt-qUF.png)

With "validateCustomer" set to true the customer must be logged into your store in order for the api call to pass validation and return a response to your storefront.

2. Validate individual customer ids by associating requests with individual customer ids.

Include customer id as System parameter with name: "customerId" and value: "individual customer id".

![Customer id system parameter example](https://tawk.link/65552a3acec6a91282103248/kb/attachments/zFgy2rIovc.png)

If request parameters are owned by individual customer you will need to add a separate request with each particular customer's parameters and customer id as a System parameter.

If you add customer id to a request that customer must be logged into the store in order for the api call to pass validation and return a response to your storefront.
