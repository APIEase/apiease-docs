---
title: Widget Request Calls
description: Choose the request execution path for a Storefront or Admin widget.
---
# Widget Request Calls

Both [Storefront and Admin widgets](../../widgets/widgets-overview.md) can call saved APIEase requests. The widget type determines the entry point and trigger requirements.

| Widget type | Request execution path | Trigger requirement |
| --- | --- | --- |
| **Storefront** | Widget JavaScript calls `apiease.runRequest` through Shopify's app proxy; classic fetch calls remain supported. | Add **Storefront App Proxy** to the directly called request. |
| **Admin** | A widget button calls `apiease.runRequest` in the authenticated Shopify admin interface. | A Storefront App Proxy trigger is not required. |

Both widget types pass runtime values in the same embedded parameter groups, such as `{liquidParamsEmbedded: {reference: 'example'}}`. The Admin widget's `inputs` object only remembers editable form values; it is not part of the request calling format. Follow [Requests In Widgets](../../widgets/using-requests-in-widgets.md) for the complete examples, parameter formats, response handling, and bulk selections.

For the storefront route and customer access controls, see [Storefront calls](./storefont-calls.md). For widget placement, use [Storefront Widgets](../../widgets/storefront-widgets.md) or [Admin Widgets](../../widgets/admin-widgets.md).
