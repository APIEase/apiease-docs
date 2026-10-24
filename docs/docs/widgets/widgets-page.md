---
title: Widgets Page
description: Manage storefront and Shopify admin widgets from the APIEase Widgets page.
---
# Widgets Page

Open **Resources > Widgets** to manage reusable Storefront and Admin widgets. Each widget has a name and handle. Its **Widget type** in the editor determines whether it renders in a Shopify theme or inside Shopify admin.

## What you can do

- View every widget by name and handle
- See JavaScript status (None, Inline, External (#), or Disabled)
- Add a new widget
- Edit widgets
- Duplicate widgets into a new editable draft
- Delete widgets after confirmation

## Widget list table

The table shows each widget with the name, handle, JavaScript status, and actions for edit, duplicate, and delete. JavaScript status describes the storefront JavaScript fields; it does not indicate whether an Admin widget has interactive content. Open the editor to check the widget type and Admin location.

## Duplicate a widget

Select **Duplicate** to open a new draft in the widget editor. Review the copied content, name, and handle, then save the new widget.

When duplicating an assigned Admin widget, its location selection is retained. Choose an available surface and location, or the manual picker, before saving the duplicate.

## Delete a widget

Select **Delete** and confirm the widget in the dialog. Confirmation submits the deletion; there is no separate list-save step. Deleting an assigned Admin widget releases its location. Update any theme settings or integrations that reference a deleted widget.

If the widget changed since the list loaded, reload the list and review it before trying again.

## Create a widget

Select **Add Widget** (the plus button) to open the [Widgets Edit Page](./widget-edit-page.md). Choose **Storefront** for Liquid and JavaScript in a theme, or **Admin** for Shopify admin components and request buttons. Continue with [Edit Storefront Widgets](./edit-storefront-widgets.md) or [Edit Admin Widgets](./admin-widget-authoring.md) for the content fields.
