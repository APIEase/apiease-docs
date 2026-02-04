---
title: APIEase API Key
description: What the APIEase API key is and when to use it.
---

# APIEase API Key

The APIEase API Key shown on the **Settings** page is strictly for authenticating remote API calls into APIEase.
It is not a Shopify access token and cannot be used to call Shopify APIs directly.

## When to use it

Use this key when calling APIEase Requests remotely from an external HTTP client.

See: [Calling Requests remotely](../../requests/triggers/calling-requests-remotely.md)

## Add an API key

1. In APIEase, open the **Settings** page.
2. In **API Key Name**, enter a descriptive name (for example, `production`, `staging`, or `ci`).
3. Click **Add**.
4. Copy the generated key and store it securely (for example, in a password manager or secret manager).

If you lose a key, create a new one and update any systems that use it.

## What it is not

This is different from the shop access token APIEase uses to call the Shopify Admin API:
[Shop access token](../shopify-api/shop-access-token.md)

## Security

Treat this key like a secret (store securely, create separate keys per system, rotate by deleting/creating keys).
