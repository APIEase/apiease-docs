---
title: Edit Admin Widgets
description: Configure an Admin widget's location, Variables, Render JSX, supported components, and editable content.
---
# Edit Admin Widgets

Set **Widget type** to **Admin** in the widget editor. See [Widgets Edit Page](./widget-edit-page.md) for name, handle, description, and save/discard controls. [Admin Widgets](./admin-widgets.md) explains supported locations and how to open the saved widget in Shopify.

## Surface and location

Choose **Block**, **Detail-page action**, or **Bulk-selection action**, then a **Location**. Choose the **Manual picker** option to make the widget available at unassigned locations. The full location list and assignment rules are in [Admin Widgets](./admin-widgets.md).

## Add content and try the cat example

1. Click **Add content** to create editable **Variables** and **Render (JSX)** fields.
2. Click **Replace with cat example** for a working starting point. This replaces both content fields in the draft and uses the built-in Cat API sample; no request setup or handle replacement is needed.
3. Choose a surface and location, then **Save**.
4. Follow [Admin Widgets](./admin-widgets.md) to add the block or open the action.
5. Click **Load cat** to display the returned image, then **Load another cat** to make another request. The button shows loading progress; failures or responses without an image show a message.

Use **Replace with cat example** only when you want to replace the current draft. Save to apply the replacement, or discard the draft to retain the previous saved content.

## Variables and Render

**Variables** accepts named `const` declarations. Values are recalculated from the current inputs and request result when the widget renders.

**Render (JSX)** accepts one `s-admin-block` root containing supported Shopify components. Keep that root even for action widgets: APIEase displays its heading and children in an action dialog and supplies **Close** automatically.

The editor supports a limited set of JavaScript expressions. It does not support imports, React hooks, loops, assignments, custom functions, arbitrary function calls, direct `fetch`, browser DOM access, HTML elements, or CSS. Put integration work in saved APIEase requests and call them from buttons.

Supported expressions include literals, arrays, named objects, property reads, optional chaining, template strings, arithmetic, comparisons, logical operators, ternaries, and `JSON.stringify(value, null, 2)`. Ternaries can choose which JSX to display. Computed property reads need a literal key or index, such as `response[0]`.

Variable and input names must start with a letter and contain only letters, digits, or underscores, up to 64 characters. The complete UI definition is limited to 65,536 characters; very large or deeply nested expressions can also fail validation.

## Values and helpers

| Value or helper | Use |
| --- | --- |
| `shopify.data.selected` | Current Shopify selection. Read a selected resource ID with `shopify.data.selected?.[0]?.id`. |
| `shopify.extension.target` | Exact current Shopify location, such as `admin.order-details.block.render`. Use it when content needs to distinguish locations. |
| `apiease.selectedResourceIds` | Array of all selected resource IDs in Shopify order, or an empty array when nothing is selected. |
| `inputs` | Local editable values set by your input handlers. Use defaults such as `inputs.reference ?? ""`. |
| `apiease.setInput("reference", value)` | Update a local input from an `onInput` or `onChange` handler. |
| `apiease.runRequest("request-handle", {reference})` | Run a saved request from an `onClick` handler, passing named inputs. The handle must be a literal string. |
| `apiease.response` | Most recent request response, including APIEase's status/data wrapper. Use optional chaining before the first result arrives. |
| `apiease.loading` | Whether a request is running. Bind it to a button's `loading` property. |
| `apiease.error` | Current widget execution error message. APIEase also displays execution errors in a banner. |

The available Shopify context is the selection and target. It does not include complete order or product data or the full Shopify extension API. Pass an ID to a saved request when you need to retrieve additional information.

## Example: display and edit a reference

This example displays the current resource ID and an editable local reference. It does not run a request.

**Variables**:

```js
const resourceId = shopify.data.selected?.[0]?.id ?? "";
const reference = inputs.reference ?? resourceId;
```

**Render (JSX)**:

```jsx
<s-admin-block heading="Resource reference">
  <s-stack direction="block" gap="base">
    <s-text>Resource ID: {resourceId}</s-text>
    <s-text-field
      label="Reference"
      value={reference}
      onInput={event => apiease.setInput("reference", event.currentTarget.value)}
    />
    <s-text>Current reference: {reference}</s-text>
  </s-stack>
</s-admin-block>
```

Input handlers use `event => apiease.setInput("name", expression)`. The event exposes `currentTarget.value`. Use `onChange` in the same form where supported, such as on `s-select`.

To send this reference to a saved request, use the complete example in [Requests In Widgets](./using-requests-in-widgets.md). That guide also covers button handlers, input limits, request responses, and bulk selections.

## Supported components and properties

Use the components and properties below in **Render (JSX)**. Other components, properties, JSX spreads, and nested `s-admin-block` elements are rejected when you save.

| Component | Supported properties |
| --- | --- |
| `s-admin-block` | `heading` (Render root only) |
| `s-stack` | `direction`, `gap`, `alignItems`, `justifyContent` |
| `s-box` | `padding`, `background`, `border`, `borderRadius`, `inlineSize`, `maxInlineSize`, `maxBlockSize` |
| `s-section` | `heading` |
| `s-heading`, `s-paragraph`, `s-divider` | No properties |
| `s-text` | `tone`, `type`, `color` |
| `s-badge` | `tone` |
| `s-banner` | `heading`, `tone` |
| `s-text-field` | `label`, `name`, `value`, `placeholder`, `details`, `error`, `disabled`, `readOnly`, `onInput`, `onChange` |
| `s-text-area` | Text-field properties, plus `rows` |
| `s-select` | `label`, `name`, `value`, `details`, `error`, `disabled`, `onChange` |
| `s-option` | `value`, `disabled` |
| `s-button` | `variant`, `tone`, `disabled`, `loading`, `onClick` |
| `s-image` | `src`, `alt`, `aspectRatio`, `objectFit`, `inlineSize`, `loading` |

For images, use descriptive `alt` text and a compact display area. The cat example reads `apiease.response?.data?.[0]?.url` and uses `aspectRatio="16/9"` with `objectFit="contain"` to keep the whole image visible. Its surrounding `s-box` uses `inlineSize="100%"`, `maxInlineSize="320px"`, and `maxBlockSize="180px"` to limit the image area. Existing saved examples keep their source; use **Replace with cat example** and save to adopt the current example.

## Existing content and validation

**Save** validates the Variables and Render fields. Resolve reported syntax or component errors before saving again. After saving, reload the Shopify page or reopen the action to load the new content.

Older widgets may open in a **UI definition (JSON)** editor. You can keep editing that definition or choose **Replace content** to start a new Variables/Render draft. Discard the draft to keep the previous saved content.

Older message-only widgets open as equivalent editable text content. The conversion is saved only when you save the widget.
