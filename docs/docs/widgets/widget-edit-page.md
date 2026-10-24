---
title: Widgets Edit Page
description: Set shared widget fields, choose a widget type, and save or discard editor changes.
---
# Widgets Edit Page

Open a widget from the [Widgets Page](./widgets-page.md), or select **Add Widget** to create one. The editor has shared identity fields and content fields determined by **Widget type**.

## Shared fields

### Name

The display name used in the Widgets list and Admin widget picker. Choose a name that describes what the widget does.

### Handle

The stable identifier used to reference the widget in integrations. Storefront blocks and embeds also use it to load the widget. When creating a widget, leave **Handle** blank to generate it from the name; a number is added if needed.

If you change an existing handle, update theme settings and integrations that reference the old value. See [Resource handles](../developers/resource-handles.md).

### Description

Explain the widget's purpose, intended location, and request dependencies. The description travels with the widget through the public API, CLI, and project review, but does not appear as rendered widget content.

### Widget type

Choose **Storefront** for a Shopify theme or **Admin** for Shopify admin. The editor shows the content fields for that type:

- [Edit Storefront Widgets](./edit-storefront-widgets.md) covers Liquid, inline JavaScript, external scripts, and disabling JavaScript.
- [Edit Admin Widgets](./admin-widget-authoring.md) covers surface and location controls, Variables, Render JSX, and supported Shopify components.

Switching types preserves the other type's authored fields. Saving as **Storefront** releases an Admin location assignment; saving as **Admin** checks that the selected location is available.

## Save and discard

The save bar appears when you make changes. **Save** validates and applies the edits. Resolve any field errors before saving again. **Discard** returns an existing widget to its last saved version.

After saving, reload the storefront page or Shopify admin page, or reopen the admin action, to see the updated widget.

To duplicate or delete a widget, return to the [Widgets Page](./widgets-page.md).

## AI widget builder

Use the assistant panel to generate or refine a widget draft. Review the widget type, content, request handles, and any Admin location assignment before saving.
