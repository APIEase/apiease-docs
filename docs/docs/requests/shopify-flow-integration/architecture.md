---
title: APIEase + Shopify Flow integration architecture
description: How to pair APIEase with Shopify Flow, when to start in APIEase, and common patterns for chained workflows.
---
# APIEase + Shopify Flow integration architecture

APIEase and Shopify Flow play different roles. Use Flow for logic and native Shopify actions, and use APIEase to call external APIs, handle credentials, and pass responses into Flow.

## Core philosophy
- Shopify Flow is the logic engine: branching, conditions, and Shopify-native actions.
- APIEase is the API execution layer: authenticated API calls, scheduling, response handling, and triggering Flow when needed.

## Starting in Shopify Flow

A workflow with a Shopify Flow trigger can invoke an existing APIEase request using [APIEase Flow Action](./run-saved-request-from-flow.md). Set its required Flow Parameters JSON to include `requestId` with the saved request handle. That request can remain HTTP, Liquid, or another type appropriate to its operation. No prior APIEase Flow execution is needed.

## Why start in APIEase
- You need to call external APIs (ERP, warehouse, AI, CRM, etc.).
- You need to store or use credentials that Flow should not handle.
- You need the API response available inside Flow (Flow’s native HTTP action does not return a response).
- You want flexible triggers: schedules, webhooks, storefront actions, or manual runs.

## Example architecture
1. Start in APIEase: fetch or receive data from an external system.
2. Chain a Flow request: send the response into Shopify Flow via the APIEase Flow trigger.
3. Use Flow logic: run conditions, evaluate the data, or transform it with Run Code.
4. Optional follow-up call: chain another APIEase request to update an external system based on Flow output.

## When to call Shopify APIs
- Use Flow’s native Send Admin API Request when it is simple and credential-free.
- Prefer APIEase when the call needs credentials, depends on another API’s response, or is part of a larger chained workflow.

## Common use cases
- Import products or inventory from external systems.
- Push Shopify order data to ERPs or 3PLs.
- Sync inventory with a warehouse.
- Call third-party AI or recommendation engines.
- React to webhooks with chained logic plus outbound API calls.
- Build backend workflows without a custom app.

## Summary
Put APIEase at the edges (inbound/outbound APIs, credentials, chaining) and Flow in the middle as the logic engine. If a workflow touches external services or credentialed calls, start or end in APIEase and run the logic in Flow.

