---
title: Calling APIEase Requests Remotely
description: How to execute APIEase requests via API key and request handle from outside Shopify.
---
# Calling APIEase Requests Remotely

You can call any APIEase request from any http client by making a direct HTTP request to the APIEase platform. This allows you to run your configured requests from outside Shopify, such as from custom servers, external apps, or third-party platforms.

**Step 1**: Create an API Key

1. Navigate to the Settings page in the APIEase admin.
2. Click **Generate API Key**.
3. Copy and store the key securely. You will use this key to authenticate your external calls.

**Step 2**: Make the Remote Call

**Address**: `https://app-admin.apiease.com/api/remote/caller/call?requestId=<your-request-handle>`

**Headers:**
- `x-shop-myshopify-domain`: `yourstore.myshopify.com`
- `x-apiease-api-key`: `<your_generated_api_key>`

Replace `<your-request-handle>` with the handle of the request you want to call. The query parameter is still named `requestId`, but the value should be the request handle for new integrations.
