---
title: Edit Storefront Widgets
description: Author a storefront widget's Liquid, inline JavaScript, external scripts, and JavaScript settings.
---
# Edit Storefront Widgets

Set **Widget type** to **Storefront** in the widget editor. See [Widgets Edit Page](./widget-edit-page.md) for shared fields and save/discard controls, or [Storefront Widgets](./storefront-widgets.md) for how storefront rendering works.

## Liquid

The **Liquid** field contains the markup rendered inside the widget container. Use it for HTML and Liquid expressions needed by the storefront. This field is required; even a JavaScript-focused widget needs markup such as `<div></div>`.

For a simple content widget, enter:

```liquid
<div class="apiease-welcome">
  <h2>Welcome to our store</h2>
  <p>Explore our latest products.</p>
</div>
```

Save the widget, copy its handle, and follow [Storefront Widgets](./storefront-widgets.md) to place it in the theme. No JavaScript is needed for this example.

## JavaScript

Inline JavaScript runs after the widget's HTML is inserted on the page. Use it for widget interactions and response handling. Keep the code appropriate for the placement: an App Embed loads the registered widget across the storefront.

Call saved requests with `apiease.runRequest('request-handle', {liquidParamsEmbedded: {reference: 'example'}})`. APIEase loads this helper before your widget's inline and external scripts in both App Block and App Embed placements. It returns a Promise containing the request's status, data, and error message. Pass values from your own JavaScript variables or form elements; the Admin widget's `inputs` form state is not required or supplied on the storefront.

See [Requests In Widgets](./using-requests-in-widgets.md) for setup, embedded parameters, response handling, and the classic fetch alternative. The directly called request needs a **Storefront App Proxy** trigger.

## External JavaScript URLs

Enter one URL per line for external scripts the widget needs. APIEase loads these scripts when the widget renders. Review which libraries are needed for each widget, especially when it will load globally.

## Disable JavaScript

When selected, the widget still renders its Liquid template but does not load either its inline JavaScript or its external JavaScript URLs.

The Widgets list reports the storefront JavaScript status as **None**, **Inline**, **External (#)**, or **Disabled**. Use the editor to review the corresponding fields.

## Review the result

Save changes and reload a storefront page where the widget is placed. Confirm the markup appears, interactions work, and the widget belongs on that page. If it appears on unintended pages, review its App Embed registration in [Storefront Widgets](./storefront-widgets.md).

Keep API keys, access tokens, and passwords in saved APIEase requests. Widget content and JavaScript are delivered to the browser and can be inspected.
