---
title: Storefront Widgets
description: Understand storefront widgets and configure, place, and troubleshoot them with the Widget App Block or Widget App Embed.
---
# Storefront Widgets

Storefront widgets are reusable components for your Shopify theme. Use them for page content, interactive tools backed by APIEase requests, or site-wide features such as floating widgets, popups, and banners.

Choose **Storefront** as the **Widget type** in the [Widgets Edit Page](./widget-edit-page.md). For tools used by staff inside Shopify admin, see [Admin Widgets](./admin-widgets.md).

## How storefront widgets render

A widget's **Liquid** template provides its markup. Its optional **JavaScript** runs after the widget's HTML is inserted into the page. You can also configure external JavaScript URLs for libraries the widget needs.

The widget is saved in APIEase and referenced by its handle in the theme. Theme placement and widget content are configured separately: edit the content in APIEase, and choose its location in Shopify's theme editor.

See [Edit Storefront Widgets](./edit-storefront-widgets.md) for the authoring fields and a simple example.

## Connect to requests

Widget JavaScript can call saved APIEase requests through Shopify's app proxy. The request executes on the server and returns data that the widget can use in its interface.

Keep credentials and integration logic in the saved request. See [Requests In Widgets](./using-requests-in-widgets.md) for the Storefront App Proxy trigger, JavaScript call, embedded parameters, and responses.

## Choose App Block or App Embed

| Extension | Placement | Typical use |
| --- | --- | --- |
| **Widget App Block** | A specific theme section, page, or template | Ordinary page content or a tool that belongs in a particular part of a page |
| **Widget App Embed** | Every storefront page while enabled | Background behavior, tracking, floating widgets, popups, or banners designed for site-wide use |

The App Embed is optional. Globally registered widgets can render Liquid and run JavaScript on every storefront page. Use an App Block for ordinary section content; add it to **Global widget handles** only when that global placement is intentional.

## Before you start

- Create and save a widget with **Widget type** set to **Storefront**. See [Edit Storefront Widgets](./edit-storefront-widgets.md).
- Copy its handle from the widget editor.
- Choose the theme and, for an App Block, the page or template where it should appear.

## Widget App Block

### Add the widget to your theme

1. Open Shopify admin and go to **Online Store > Themes**.
2. Select **Customize** on the theme you want to update.
3. Navigate to the page or template where the widget should appear.
4. Add the **APIEase Widget App Block** to the section.
5. Paste the saved widget's handle into **Widget handle**.
6. Save the theme changes.

### Update or move a block {#update-or-move-a-widget}

Edit and save the widget's content in APIEase, then reload the storefront page to see the result. If you change the widget handle, update the block's **Widget handle** setting to match.

To move the widget, remove the block from its current section and add it to the new location with the same handle.

## Widget App Embed

### Register global widgets

1. Open Shopify admin and go to **Online Store > Themes**.
2. Select **Customize** on the theme you want to update.
3. Open **App embeds**.
4. Enable **APIEase Widget App Embed**.
5. Add one or more saved widget handles to **Global widget handles**.
6. Save the theme changes.

Separate multiple handles with new lines or commas. Each registered widget loads on every storefront page while the embed is enabled.

### Update or remove global widgets

If a widget handle changes, update **Global widget handles** to match. Remove a handle to stop loading that widget globally, or disable the App Embed to stop loading all registered global widgets. Save the theme changes.

If visual content belongs on a specific page or in a section, remove it from the global list and place it with an App Block.

## Troubleshooting

| What you see | What to check |
| --- | --- |
| "Widget handle not configured" in an App Block | Enter the handle in **Widget handle** and save the theme. |
| A widget does not render | Check the handle matches exactly, the widget is saved in APIEase, and its type is **Storefront**. |
| A global widget does not run | Check that the App Embed is enabled, the handle is in **Global widget handles**, and theme changes are saved. |
| A visual widget appears on unintended pages | Remove it from **Global widget handles** and use an App Block in the intended section or template. |
| Markup renders but JavaScript does not run | Review the widget's JavaScript fields and **Disable JavaScript** setting in [Edit Storefront Widgets](./edit-storefront-widgets.md). |
