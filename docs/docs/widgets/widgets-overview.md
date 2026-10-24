---
title: Widgets Overview
description: Compare Storefront and Admin widgets and find the guides for managing, editing, placing, and connecting them to requests.
---
# Widgets Overview

APIEase widgets are reusable UI components that you build and manage in **Resources > Widgets**. They connect interfaces to saved APIEase requests while keeping credentials and integration logic in the request.

## Choose a widget type

| Widget type | Content | Where it appears |
| --- | --- | --- |
| **Storefront** | Liquid markup and optional JavaScript | Your Shopify theme, through a Widget App Block or Widget App Embed |
| **Admin** | Variables and Render (JSX) using supported Shopify components | Shopify admin detail-page blocks, detail-page action dialogs, or bulk-selection action dialogs |

Use [Storefront Widgets](./storefront-widgets.md) for customer-facing content and site-wide storefront behavior. Use [Admin Widgets](./admin-widgets.md) for information and tools alongside the records you manage in Shopify admin.

## Shared concepts

Every widget has a name, handle, description, and widget type. The name identifies it to people; the handle is its stable integration identifier. The description explains its purpose and dependencies without appearing as rendered content.

A widget provides the interface. A saved request performs the server-side work. Both widget types can call requests, with different calling methods and input formats. See [Requests In Widgets](./using-requests-in-widgets.md).

## Find the right guide

| Task | Guide |
| --- | --- |
| List, create, duplicate, or delete widgets | [Widgets Page](./widgets-page.md) |
| Set shared fields, switch types, save, or discard | [Widgets Edit Page](./widget-edit-page.md) |
| Author Liquid and JavaScript | [Edit Storefront Widgets](./edit-storefront-widgets.md) |
| Author Variables and Shopify component JSX | [Edit Admin Widgets](./admin-widget-authoring.md) |
| Call requests, pass inputs, and display responses | [Requests In Widgets](./using-requests-in-widgets.md) |
| Add storefront widgets through an App Block or App Embed | [Storefront Widgets](./storefront-widgets.md) |
| Place admin blocks and actions or manage assignments | [Admin Widgets](./admin-widgets.md) |
