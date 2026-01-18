---
title: Widgets page
description: Manage storefront widgets from the APIEase admin.
---
# Widgets page

The Widgets page is where you manage reusable storefront widgets. Each widget has a handle, Liquid template, and optional JavaScript that can be rendered in a theme app block.

## What you can do

- View every widget by name and handle
- See JavaScript status (None, Inline, External (#), or Disabled)
- Add a new widget
- Edit widgets
- Duplicate or delete widgets and save or discard staged changes

## Widget list table

The table shows each widget with the name, handle, JavaScript status, and actions for edit, duplicate, and delete. Use it to confirm which widgets have JavaScript enabled before you place them in a theme.

When you duplicate or delete a widget, the change is staged in the table:

- Staged duplicates appear as new rows labeled **Staged duplicate**.
- Deletes dim the row and show **Will be deleted**.
- Actions for staged rows are disabled until you save or discard.

## Staged changes and save bar

Duplicate and delete actions do not apply immediately. They are staged and collected until you choose what to do:

- **Save** applies all staged duplicates and deletions.
- **Discard** cancels staged changes and returns to the last saved list.

## Create a widget

Select **Add Widget** (the plus button) to open the widget editor. This is where you define the Liquid template, optional JavaScript, and handle you will reference in your theme.
