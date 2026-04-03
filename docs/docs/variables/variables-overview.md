---
title: Variables Overview
description: Manage persisted shop variables from the APIEase admin.
---
# Variables Overview

The Variables page lets you manage persisted shop variables for the current store directly from the APIEase admin.

These are the same variables used by [System Requests](../requests/request-types/system-requests.md), so you can manage values manually in the admin or read and write them programmatically in request flows.

## Open the Variables page

In the APIEase admin, select **Variables** from the main navigation.

## What you can do

- View all saved variables for the current shop
- Create a new variable
- Open an existing variable and update its value
- Mark a variable as sensitive so its value stays masked in the UI
- Delete variables you no longer need

## Variables list

The Variables page shows a table with four columns:

- **Name**: The variable name. Select the name or the edit action to open the variable.
- **Value**: The current value summary. Non-sensitive values are shown directly. Sensitive values are masked.
- **Sensitive**: Shows `Yes` or `No`.
- **Actions**: Edit or delete the variable.

Additional list behavior:

- Use the **Add variable** button to create a new variable.
- If a value is long, the list truncates it for display.
- If a delete is in progress, the row is dimmed and marked **Will be deleted**.
- If no variables exist yet, the page shows `No variables yet.`

## Create a variable

To create a variable:

1. Open the **Variables** page.
2. Select **Add variable**.
3. Enter a **Name**.
4. Enter a **Value**.
5. Turn on **Sensitive** if the value should stay hidden after it is saved.
6. Use the save bar to save the variable.

Notes:

- `Name` is required when creating a variable.
- The save bar appears when you make changes.
- You can use **Discard** in the save bar to abandon unsaved edits.

## Edit a variable

To edit a variable:

1. Open the variable from the list.
2. Update the **Value** and, if needed, the **Sensitive** checkbox.
3. Save from the save bar.

Important behavior:

- After a variable is created, its **Name** is read-only.
- Existing sensitive values stay masked in the editor. If you leave the masked value as-is and save, APIEase keeps the stored value.
- If you want to replace a sensitive value, type a new value before saving.
- If you turn off **Sensitive** for an existing masked variable, enter the replacement plain-text value before saving because APIEase does not reveal the stored secret back into the form.

## Delete a variable

Use the delete action in the list to remove a variable.

Delete applies immediately. Unlike staged changes on some other pages, there is no separate bulk save step for deletions on the Variables page.

## When to use the Variables page vs. System Requests

Use the Variables page when you want to manage values manually in the admin.

Use [System Requests](../requests/request-types/system-requests.md) when you want to set, get, or delete variables as part of an automated flow.
