---
title: Custom access token
description: How to generate and use a custom Shopify access token with APIEase requests.
---
# Custom access token

If you decide that you need a custom access token rather than using the [shop access token](./shop-access-token.md) that can be [used automatically](./automatic-vs-overridden-shopify-access-tokens.md#automatic-shop-access-token-usage) follow these instructions to get a custom Shopify access token.

For how APIEase uses custom tokens in requests, see [Overridden custom access token usage](./automatic-vs-overridden-shopify-access-tokens.md#overridden-custom-access-token-usage).

1. In your store admin, go to **Settings**.
2. Go to **Apps and sales channels**.
3. Click **Develop apps**.
4. Click **Create an app** and give it a name.
5. Configure permissions: click **Configure Admin API scopes** or **Configure Storefront API scopes** and choose the permissions required. (You must set scopes before you can install and get a token.)
6. Click **Install app** (top right).
7. Click **Reveal token once**. Copy and save your access token—this is the only time it will be shown.
