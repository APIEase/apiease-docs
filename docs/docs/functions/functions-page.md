---
title: Functions page
description: Create and manage reusable Liquid helper functions in APIEase.
---
# Functions page

The Functions page lets you create reusable Liquid helpers that can be called from [Liquid Requests](../requests/request-types/liquid-requests.md).

Functions run inside the parent Liquid request execution. They are not standalone requests, do not have their own triggers, and do not count as separate request executions.

## Open the Functions page

In the APIEase admin, select **Functions** from the main navigation.

## What you can do

- View all saved functions for the current shop
- Create a new function
- Open an existing function and update it
- Duplicate a function as a starting point for a variation
- Delete functions you no longer need

## Functions list

The Functions page shows a table with five columns:

- **Name**: The function name. Select the name or the edit action to open the function.
- **Type**: Currently `liquid`.
- **Description**: The saved description. If no description is set, APIEase shows a short Liquid preview instead.
- **Last updated**: The last saved date.
- **Actions**: Edit, duplicate, or delete the function.

Additional list behavior:

- Use the **Add function** button to create a new function.
- If a delete is in progress, the row is dimmed and marked **Will be deleted**.
- If no functions exist yet, the page shows `No functions yet.`

## Create or edit a function

Each function includes these fields:

- **Name**: Required. This is the function name you call from Liquid.
- **Description**: Optional. Use it to explain what the function returns or when to use it.
- **Type**: Currently fixed to `liquid`.
- **Parameters**: Optional parameter definitions for the function.
- **Liquid**: Required. The Liquid code that runs when the function is called.

The editor supports the same save bar behavior used elsewhere in APIEase:

- The save bar appears when you make changes.
- Use **Save** to persist the function.
- Use **Discard** to return to the last saved version.

## Function parameters

Each parameter row includes:

- **Name**: Required
- **Description**: Optional
- **Type**: Required metadata

Supported parameter types:

- `string`
- `number`
- `boolean`
- `object`
- `array`

Important behavior:

- Parameter types are descriptive metadata for this version of Functions. They help document expected inputs, but APIEase does not strictly enforce them at runtime.
- Parameter names must be unique within a function.
- Only declared parameters are exposed inside the function body.

## How Functions behave

Functions are intended to reduce repetition inside Liquid request logic.

Use a Function when you want to:

- Reuse the same Liquid transformation in multiple places
- Standardize formatting or response shaping
- Keep Liquid requests shorter and easier to maintain

Do not use a Function when you need:

- An external API call
- A webhook, schedule, or manual trigger
- A standalone execution target

For invocation syntax and runtime examples, see [Using Functions in Liquid Requests](./using-functions-in-liquid-requests.md).
