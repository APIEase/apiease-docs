---
title: Trigger requests from a webhook
description: Run an APIEase request whenever Shopify sends a webhook event.
---
# Trigger requests from a webhook

This guide shows how to configure a webhook trigger in APIEase. In APIEase, use uppercase webhook event constants such as `ORDERS_CREATE` and `CARTS_UPDATE`. These correspond to Shopify webhook topics such as `orders/create` and `carts/update`. Shopify maintains the full list of [webhook topics](https://shopify.dev/docs/api/admin-graphql/2023-10/enums/WebhookSubscriptionTopic).

![Webhook trigger selection](https://cdn.shopify.com/s/files/1/0733/1820/3680/files/trigger-webhook-http.png?v=1744409941)

## Add a webhook trigger
1. In the APIEase admin, open the request (click the edit icon if needed).
2. In the **Trigger** column, click the plus icon.
3. Select **Webhook**.
4. Choose the APIEase webhook event constant (for example `ORDERS_CREATE`, `CUSTOMERS_UPDATE`, or `CARTS_UPDATE`).

After saving, APIEase will execute the request every time that event is received from Shopify.

![Webhook trigger for Flow](https://cdn.shopify.com/s/files/1/0733/1820/3680/files/trigger-webhook-flow.png?v=1744409941)

## Example: webhook-triggered Flow request
If you want to start a Shopify Flow automation whenever a cart updates:
1. Create a new request and select **Flow** as the request type.
2. Choose your Flow template and fill required parameters.
3. Add a webhook trigger and select `CARTS_UPDATE`.

Each cart update triggers the request and starts the Flow. Any webhook fields you need can also be mapped into Flow input parameters.

## Webhook payload as body
When the request is triggered, the webhook payload is passed as the body.

- Base body (example for the Shopify topic `discounts/create`, which APIEase represents as `DISCOUNTS_CREATE`):
```json
{
  "admin_graphql_api_id": "gid://shopify/DiscountAutomaticNode/1",
  "title": "Automatic free shipping",
  "status": "ACTIVE",
  "created_at": "2016-08-29T12:00:00-04:00",
  "updated_at": "2016-08-29T12:00:00-04:00"
}
```
- If you add body parameters, they are merged:
```json
{
  "admin_graphql_api_id": "gid://shopify/DiscountAutomaticNode/1",
  "title": "Automatic free shipping",
  "status": "ACTIVE",
  "created_at": "2016-08-29T12:00:00-04:00",
  "updated_at": "2016-08-29T12:00:00-04:00",
  "additional_body_parameter": "some_value"
}
```
- If your body parameters override a webhook field, the original is preserved with `_0` suffix:
```json
{
  "admin_graphql_api_id": "gid://shopify/DiscountAutomaticNode/1",
  "title": "Title that I prefer",
  "title_0": "Automatic free shipping",
  "status": "ACTIVE",
  "created_at": "2016-08-29T12:00:00-04:00",
  "updated_at": "2016-08-29T12:00:00-04:00"
}
```

To pull specific payload values into headers, query params, or body fields, see [Mapping webhook parameters](./mapping-webhook-parameters.md).
