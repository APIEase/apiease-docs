---
title: Admin Widgets
description: Understand Admin widgets, supported Shopify surfaces, placement, automatic assignments, and the manual picker.
---
# Admin Widgets

Admin widgets put information, editable inputs, and buttons that run APIEase requests inside Shopify admin. Use them for tasks such as looking up an order in another system, checking product information, or passing selected records to a saved request.

Create and manage them in **Resources > Widgets**. Choose **Admin** as the **Widget type**, author the content with Shopify components, and choose where it appears. For widgets in a customer-facing theme, use [Storefront Widgets](./storefront-widgets.md).

## Choose a surface and location

**Surface** determines how you open the widget. **Location** selects the Shopify resource page where it appears.

| Surface | How to open it | Supported locations |
| --- | --- | --- |
| **Block** | Add and pin **APIEase Admin Widget** under **App blocks** on a detail page. | Order, Product, Product variant, Customer, Collection, Draft order, Abandoned checkout, Gift card, Catalog, Company, Company location details |
| **Detail-page action** | Open **APIEase Admin Widget** from **More actions** on a detail page. | Order, Product, Product variant, Customer, Collection, Draft order, Abandoned checkout, Gift card, Catalog, Company, Discount details |
| **Bulk-selection action** | Select records on a list page, then open **APIEase Admin Widget** from the selection's **More actions** menu. | Orders, Products, Customers, Draft orders, Discounts |

Available resource pages depend on the shop's Shopify features. A bulk-selection action requires a selection; it does not run against the entire list automatically. Opening a widget or action does not run a request. A request runs when you click its button.

## Place a saved admin widget

First, create and save content using [Edit Admin Widgets](./admin-widget-authoring.md). Choose a **Surface** and **Location** in its editor, or leave it available through the manual picker as described below.

### Add a detail-page block

1. Open a resource at the saved location in Shopify admin, such as an order for **Block > Order details**.
2. Under **App blocks**, add **APIEase Admin Widget**.
3. Pin it using Shopify's controls.

The assigned widget appears directly. If the location has no assignment, select an eligible widget from the **Widget** dropdown.

### Open an action

For a **Detail-page action**, open **APIEase Admin Widget** from **More actions** on the selected resource's detail page.

For a **Bulk-selection action**, select records on the chosen list page and open **APIEase Admin Widget** from the selection's **More actions** menu.

Use **Close** to dismiss the dialog. After editing and saving content or an assignment, reload the Shopify page or reopen the action to load the changes.

## Automatic display and the manual picker

When you save a specific surface and location, that widget displays automatically there. The **Widget** dropdown is hidden at an assigned location.

Each shop can assign one Admin widget to each surface and location. Each widget can have one assignment. For example, **Block > Order details** and **Detail-page action > Order details** can display different widgets. An assignment applies across that resource type in the shop; the widget receives the current record or selection each time it opens.

Choose the **Manual picker** option under **Surface** to leave the widget unassigned and make it available across all supported surfaces. At a location without an assignment:

- The **Widget** dropdown lists unassigned Admin widgets and initially selects the first one.
- Widgets assigned to other locations do not appear in the dropdown.
- If there are no eligible widgets, the extension explains how to configure one.

To free a location, change its widget to the manual picker, assign it elsewhere, delete it, or save it as **Storefront**. A conflicting assignment cannot be saved over another widget. Duplicated widgets retain their location selection, so choose an available location or the manual picker before saving the duplicate. Imports follow the same assignment rules.

Changing an assignment takes effect when the extension next opens; you do not need to add or pin an existing block again. You still need to add and pin the block through Shopify when using a block location for the first time.

## Troubleshooting

| What you see | What to check |
| --- | --- |
| The block is not visible. | Confirm you are on a supported detail page, then add and pin **APIEase Admin Widget** through Shopify's **App blocks** controls. Saving a widget alone does not add the block. |
| A bulk action is not available. | Select records on a supported list page and use the selection's **More actions** menu. |
| A widget is missing from the picker. | Confirm it is saved as **Admin** with the manual picker selected. Widgets assigned elsewhere are excluded. |
| A location is already in use. | Edit the widget using that location to release it, or choose another surface/location or the manual picker. |
| You see old content or a button is no longer available. | Save in APIEase, then reload the Shopify page or reopen the action. |
| Content cannot be saved or rendered. | Check the error and the supported expressions and components in [Edit Admin Widgets](./admin-widget-authoring.md). Keep one `s-admin-block` root. |

For request errors, responses, and input limits, see [Requests In Widgets](./using-requests-in-widgets.md).

Keep blocks compact. Shopify collapses content taller than 300 pixels behind **Show more**. See Shopify's [Admin block limitations](https://shopify.dev/docs/api/admin-extensions/2026-07/web-components/settings-and-templates/admin-block#limitations).
