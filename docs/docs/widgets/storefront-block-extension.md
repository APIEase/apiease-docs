---
title: Storefront block extension
description: Add widgets to your Shopify theme using the APIEase app block or app embed.
---
# Storefront block extension

Widgets can render in your storefront through the APIEase Widget App Block or the APIEase Widget App Embed. Use the Widget App Block when a widget belongs on a specific page or template.

## Before you start

- Create and save a widget in APIEase.
- Copy the widget handle from the widget editor.

## Add the widget to your theme

1. Open Shopify admin and go to **Online Store** -> **Themes**.
2. Select **Customize** on the theme you want to update.
3. Navigate to the page or template where the widget should appear.
4. Add the **APIEase Widget App Block** block to the section.
5. Paste the widget handle into the **Widget handle** setting.
6. Save the theme changes.

## Run widgets globally with the App embed

The **APIEase Widget App Embed** is optional. Enable it only for widgets that should run on every storefront page.

Use the **Global widget handles** setting to register one or more widget handles. Separate multiple handles with new lines or commas.

When the App embed is enabled, APIEase loads the registered widgets on every storefront page. Their Liquid can render globally, and their JavaScript can run globally.

Globally registered widgets should be designed for site-wide use. They can be non-visual background widgets or self-positioned visual widgets, such as floating widgets, popups, or banners.

Do not register ordinary section or content widgets globally unless you intentionally want them to load on every storefront page.

## Choosing between App Block and App Embed

Use the **Widget App Block** for the normal placement-specific path. Choose it when a widget belongs in one theme section, page, or template.

Use the **Widget App Embed** only for site-wide widgets that should load on every storefront page. Good fits include non-visual background widgets, tracking, floating widgets, popups, and banners that position themselves.

If a widget is ordinary page content, use the Widget App Block. Do not add ordinary section or content widgets to **Global widget handles** unless you intentionally want them to load across the entire storefront.

## Update or move a widget

- If you change the widget handle, update the block setting to match.
- To move the widget, remove the block from the current section and add it to the new location.

## Troubleshooting

- If the block shows "Widget handle not configured", confirm the handle value is set and saved.
- If the widget does not render, confirm the handle matches exactly and the widget is saved in APIEase.
