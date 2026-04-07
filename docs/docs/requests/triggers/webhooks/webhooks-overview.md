---
title: Webhooks overview
description: Understand how to start APIEase requests from Shopify webhooks and map payload data.
---
# Webhooks overview

Use Shopify webhooks to start APIEase requests automatically when store events occur. This is ideal for reacting in real time to orders, carts, customers, and other updates without polling.

In APIEase, use uppercase webhook event constants such as `ORDERS_CREATE`, `CARTS_UPDATE`, and `CUSTOMERS_UPDATE`. These correspond to Shopify topic names such as `orders/create`, `carts/update`, and `customers/update`.

You can add a webhook trigger to any request. See the [Shopify webhook topics](https://shopify.dev/docs/api/admin-graphql/2023-10/enums/WebhookSubscriptionTopic) for the underlying Shopify event list.

## [Trigger requests from a webhook](./trigger-requests-from-a-webhook.md)
- Configure how to start requests from webhook events.

## [Mapping webhook parameters](./mapping-webhook-parameters.md)
- Map webhook payload fields into your request parameters.
