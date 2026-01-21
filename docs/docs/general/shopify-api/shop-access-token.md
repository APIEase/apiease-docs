---
title: Shop access token
description: What the shop access token is, how APIEase gets it, and how it is used.
---
# Shop access token

The shop access token is the Shopify OAuth token issued when a shop installs APIEase. APIEase stores it per shop and uses it to call the Shopify Admin API on that shop's behalf.
If the shop access token does not have the permissions your request needs, you can adjust its permissions as described in [Manage shop access token permissions](./manage-shop-access-token-permissions.md).

## How APIEase uses it
- APIEase app usage: internal Shopify Admin API calls that APIEase makes for the shop use the shop access token.
- Automatic request usage: when a request targets a Shopify Admin API endpoint and you do not provide an override token, APIEase injects the shop access token automatically.


