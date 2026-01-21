---
title: Shopify API calls and access tokens
description: Overview of how APIEase uses shop access tokens and how permissions affect Shopify Admin API calls.
---
# Shopify API calls and access tokens

APIEase can call the Shopify Admin API on your behalf. It uses the [shop access token](./shop-access-token.md) that was issued during Shopify OAuth and stored for the shop. If for some reason you need to use a [custom access token](./custom-access-token.md) you can override the system injected shop access token.

[Manage shop access token permissions](./manage-shop-access-token-permissions.md) controls which scopes are granted to the shop access token. When you request new scopes, Shopify reauthorizes the app and issues an updated shop access token with the new permissions.

## Key concepts
- [Automatic token usage](./automatic-vs-overridden-shopify-access-tokens.md#automatic-shop-access-token-usage): APIEase injects the shop access token when a request targets the Shopify Admin API and no override token is provided.
- [Override token usage](./automatic-vs-overridden-shopify-access-tokens.md#overridden-custom-access-token-usage): A request includes an explicit `X-Shopify-Access-Token` header and APIEase uses that token instead of the shop access token.
- [Shop access token](./shop-access-token.md): The Shopify OAuth token stored for the shop and used for Shopify Admin API calls.
- [Custom access token](./custom-access-token.md): A standalone token you generate and provide explicitly when a request must use a different Shopify Admin API token.
- [Scope and permissions](./manage-shop-access-token-permissions.md): The specific Shopify Admin API permissions granted to the shop access token, and the reauthorization flow that updates it after scope changes.

## Caution on write permissions
Write permissions allow APIEase to create, update, or delete store data when triggered by configured requests, flows, schedules, webhooks, or proxy endpoints. This capability is powerful and potentially destructive if used incorrectly, and some write operations cannot be reversed.

APIEase does not validate the business correctness of your requests. It executes requests exactly as configured using the permissions you approve.

We strongly recommend backing up relevant store data or testing write-enabled requests in a non-production environment before enabling write permissions. You are responsible for request correctness, safe testing, and any data changes or deletions caused by those requests.

## When to use what
- Use automatic token usage for most Shopify Admin API calls inside APIEase.
- Use an override token when a call must run with a different token for a different shop or with permissions that need to differ from the Shop access token.
- Update scopes on [Manage shop access token permissions](./manage-shop-access-token-permissions.md) when a request needs new Shopify Admin API access.
