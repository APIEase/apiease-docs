---
title: Manage shop access token permissions
description: How to manage Shopify Admin API permissions and reauthorize the shop access token in APIEase.
---
# Manage shop access token permissions

The Permissions page manages Shopify Admin API permissions for the [shop access token](./shop-access-token.md) that APIEase stores for each shop. Use it to review current permissions, request new scopes, and reauthorize the shop token when access needs change.

## What the Permissions page is for
- Manage OAuth scopes for the stored shop access token.
- Enable future Shopify Admin API calls that require new scopes.
- Keep a clear view of which permissions are granted to APIEase.

## Workflow
1. Open **Settings**, then **Permissions**.
2. Review the current granted scopes.
3. Select the additional scopes you need.
4. Save changes.
5. Complete the Shopify approval flow.
6. Return to the Permissions page and verify the scopes are granted.

## Notes and edge cases
- If you remove scopes, APIEase requests a scope revocation. Shopify may keep a scope if it is required by the app or by Shopify. The Permissions page will show that the scope remains granted.
- If Shopify keeps a scope that you attempted to remove, you may need to reinstall or reauthorize to fully reset the token.
- Existing requests that depend on removed scopes can fail with 403 responses until scopes are restored.
- Changing scopes does not alter request logic. APIEase executes requests exactly as configured.

## Safety note
Write scopes can create, update, or delete store data. Test requests in a non production environment before using them in live flows.
