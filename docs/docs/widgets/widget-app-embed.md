---
title: Widget App Embed
description: Run selected widgets across every Shopify storefront page.
---
# Widget App Embed

The APIEase Widget App Embed is optional. Enable it only for widgets that should run on every storefront page.

When the App Embed is enabled, APIEase loads the registered widgets on every storefront page. Their Liquid can render globally, and their JavaScript can run globally.

Globally registered widgets should be designed for site-wide use. They can be non-visual background widgets or self-positioned visual widgets, such as floating widgets, popups, or banners.

Do not register ordinary section or content widgets globally unless you intentionally want them to load on every storefront page.

## Before you start

- Create and save a widget in APIEase.
- Copy the widget handle from the widget editor.

## Register global widgets

1. Open Shopify admin and go to **Online Store** -> **Themes**.
2. Select **Customize** on the theme you want to update.
3. Open **App embeds**.
4. Enable the **APIEase Widget App Embed**.
5. Add one or more widget handles to **Global widget handles**.
6. Save the theme changes.

Use the **Global widget handles** setting to register one or more widget handles. Separate multiple handles with new lines or commas.

## Troubleshooting

- If a global widget does not run, confirm the App Embed is enabled and the theme changes are saved.
- If a widget does not render, confirm the handle matches exactly and the widget is saved in APIEase.
- If a visual widget appears on pages where it should not appear, remove it from **Global widget handles** and add it with the [Widget App Block](./widget-app-block.md) instead.

## Related pages

- Compare the App Embed with the App Block in [Widget App Extensions](./widget-app-extensions.md).
- Use the [Widget App Block](./widget-app-block.md) for ordinary page content or section-specific widgets.
