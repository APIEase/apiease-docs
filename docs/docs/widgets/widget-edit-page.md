---
title: Widget edit page
description: Configure Liquid, JavaScript, and handles for a widget.
---
# Widget edit page

The widget editor is where you define how a widget renders and behaves. Use it to set the widget name, handle, Liquid template, and optional JavaScript.

## Widget fields

### Widget name

The display name used in the Widgets list. When you create a new widget, the handle is auto generated from the name until you manually edit the handle.

### Widget handle

The identifier used by the storefront block to load the widget. Keep this stable if the widget is already used in a theme, and update the theme block if you change it.

### Liquid template

The Liquid markup that renders inside the widget container. Use it to output HTML and Liquid variables needed by the storefront.

### External JavaScript URLs

One URL per line. APIEase loads these scripts when the widget renders.

### JavaScript

Inline JavaScript that runs after the widget HTML is inserted on the page. Use it for widget specific behavior.

### Disable JavaScript

When checked, the widget renders its Liquid template but does not load any JavaScript from the inline or external fields.

## Save and delete

- The save bar appears when you make changes.
- **Save** applies your edits.
- **Discard** reverts to the last saved version.
- Delete widgets from the Widgets page (deletions are staged and saved there).

## AI widget builder

Use the assistant panel to generate or refine a widget draft. When you accept a draft, the editor updates the Liquid and JavaScript fields so you can review and save.
