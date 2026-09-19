---
title: Troubleshooting requests FAQ
description: Quick answers about testing requests, reading failures, and isolating configuration, trigger, provider, and multi-step problems.
---

# Troubleshooting requests FAQ

## How do I test an APIEase request safely?

Check whether the request can change live data, then use a provider sandbox, test record, or provider-supported dry run when available. Run the smallest valid version as a [manual call](../../requests/triggers/manual-calls.md), change one setting at a time, and add the trigger only after the saved request works. Follow [Troubleshoot requests](../../requests/troubleshooting-requests.md) for the ordered workflow.

## Why is my request not working?

First test it manually, then verify the address and method, required parameters and body format, credentials and permissions, and the external provider's response. If the manual call works, isolate the trigger and its runtime values. The [request troubleshooting guide](../../requests/troubleshooting-requests.md) provides the complete sequence.

## What should I check when the response is unexpected?

Compare the returned status and body with the receiving API's current documentation, then reduce the request to its required fields. Confirm value types, identifiers, content type, and whether a dynamic embedded parameter overrode a saved value. APIEase cannot assign a universal meaning to an undocumented provider response.

## Why does a request work manually but fail from a webhook, schedule, remote call, proxy, storefront, or widget?

The saved request is probably not the first layer to change. Check the failing call's prerequisites and compare its runtime parameters with the successful manual run. For storefront calls from theme or widget JavaScript, the directly called request needs a **Storefront App Proxy** trigger. Missing input, a different name or parameter location, or a runtime override can change the result. Start with the [triggers overview](../../requests/triggers/triggers-overview.md).

## Why does my request return 401 or 403?

A `401` commonly means the receiving API rejected or did not receive the credential; a `403` commonly means the credential lacks permission for the operation. Providers can define these responses differently. Use the response body and provider documentation, then follow [Credentials, authentication, and security](./credentials-and-security.md) for external-provider and Shopify-specific checks.

## How do I troubleshoot a timeout or network error?

Recheck the address scheme, host, and path, then confirm that the provider endpoint is available and review its status information, rate limits, and expected response time. A timeout alone does not show which system caused the delay. Be careful with retries because repeating a write request can create duplicate side effects.

## How do I find which request in a chain failed?

Test each request independently before reconnecting **Next Request**. Confirm that the first response contains the exact field path and capitalization referenced by the next request, then test the completed chain. See [Chained requests](../../requests/request-parameters/chained-requests.md) and the [multi-step troubleshooting workflow](../../requests/troubleshooting-requests.md#8-test-a-chained-request-one-step-at-a-time).

## Can APIEase explain every error returned by an external API?

No. The external service controls its statuses and response bodies, and provider-specific behavior may not follow common HTTP conventions. APIEase can help you isolate the request configuration, but an undocumented provider response must be checked against that provider's documentation or support.
