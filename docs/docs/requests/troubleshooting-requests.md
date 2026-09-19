---
title: Troubleshoot requests
description: Test an APIEase request safely and isolate request, credential, trigger, provider-response, and chained-request problems.
---

# Troubleshoot requests

Troubleshoot one layer at a time. First confirm that the saved request is safe to run and works with a manual call. Then test the trigger or the next request in a chain. This separates APIEase configuration problems from authentication, permission, and external-provider failures.

## 1. Protect live data before testing

Before executing a request, check whether its method or body can create, update, or delete data. Use a provider sandbox, test store, test record, or provider-supported dry-run option when one is available. APIEase does not add a universal dry-run mode to every external API.

Avoid repeatedly testing a write request against production while changing several settings at once. Start with the smallest input that the receiving API documents as valid, and change one part of the request between runs.

## 2. Test the saved request manually

Use a [manual call](./triggers/manual-calls.md) to test the request from APIEase admin before invoking it through a webhook, schedule, remote call, proxy endpoint, or storefront call from theme or widget JavaScript.

Review the returned status, body, and execution details. Record which configuration produced the result, but do not copy credentials or private response data into support messages or shared logs.

- If the manual call fails, continue with the address, method, parameters, and credentials below.
- If the manual call works but another entry point fails, keep the working request configuration and skip to [isolate the trigger](#7-isolate-the-trigger).
- If a chain fails, test each request separately before reconnecting the chain.

## 3. Verify the address and method

Compare the saved **Address** and **Method** with the receiving API's current documentation.

- Use the complete endpoint address, including the documented API version and path.
- Confirm the host belongs to the intended environment and account.
- Confirm the operation expects GET, POST, PUT, PATCH, DELETE, or OPTIONS.
- Keep query values, body fields, and path replacements in their matching [parameter locations](./request-parameters/request-parameters-overview.md).

For Shopify Admin GraphQL, the [address preset](../general/shopify-api/shopify-admin-graphql-address-preset.md) is the safest way to select the current shop endpoint. A `404` or `405` can indicate a wrong path or method, but providers define their own responses; verify the response body and provider documentation before drawing that conclusion.

## 4. Reduce and verify parameters

Start with only the fields the receiving API requires, then add optional fields back one at a time.

Check each value against the provider's contract:

- Put authentication and content-type metadata in headers.
- Put URL filters and options in query parameters.
- Match every path parameter to a placeholder in the address.
- Send the documented body format and content type. Do not send form URL-encoded data when the API expects JSON, or JSON when it expects form data.
- Check value types, capitalization, date formats, identifiers, and required fields.

Also confirm where the value comes from. [In-app parameters](./request-parameters/in-app-vs-dynamic.md) are saved with the request; dynamic embedded parameters are supplied for one execution and can override a saved parameter with the same name and location. A working saved value can therefore produce a different result when a trigger supplies an override.

## 5. Isolate credentials and permissions

An authentication failure is different from an address, body, or trigger failure. Confirm that the request uses the correct kind of credential and that it is sent exactly where the receiving API requires it.

For `401` and `403` responses, follow [Credentials, authentication, and security](../general/faq/credentials-and-security.md). That page distinguishes rejected credentials from permission problems and links to the Shopify automatic-token and scope checks. External providers can use status codes differently, so their response body and documentation remain authoritative.

Do not replace or expose a sensitive value merely to debug another part of the request. If the original credential is unavailable or no longer valid, create or rotate it at the issuing provider and save the replacement as a sensitive request parameter.

## 6. Separate the provider response from APIEase configuration

Once APIEase reaches the configured endpoint, the external service decides the HTTP status and response body. APIEase cannot reliably diagnose an undocumented provider response or promise that the provider uses a status code in the usual way.

Use the response safely:

1. Read the response body for a provider error code, field name, or request requirement.
2. Compare the status and body with the provider's current documentation.
3. Confirm the credential's account, environment, scopes, and access to the requested resource.
4. Reproduce the smallest documented request, changing one field at a time.
5. Contact the provider when its documentation does not explain a response from its service.

For a network error or timeout, first recheck the scheme, host, and path and confirm that the provider endpoint is available from a server-side client. Then check the provider's status information, rate limits, and expected response time. A timeout alone does not identify which system is at fault, and retrying a write operation can duplicate side effects.

## 7. Isolate the trigger

If the request works manually, test only the entry point that fails. The [triggers overview](./triggers/triggers-overview.md) links to the prerequisites for each execution mechanism.

- **Webhook:** confirm the intended event is selected and map fields from the actual webhook payload.
- **Cron:** confirm the five-field expression and remember that schedules use UTC.
- **Remote call:** confirm the request handle, shop-domain header, and APIEase API key.
- **Proxy endpoint:** confirm the configured path, HTTP method, and authentication choice.
- **Storefront call from theme or widget JavaScript:** confirm the directly called request has a **Storefront App Proxy** trigger and that the browser call supplies the expected runtime parameters.

Compare the failing trigger's runtime parameters with the values used by the successful manual call. Missing input, a different parameter name or location, or a dynamic override can explain why the same saved request behaves differently.

## 8. Test a chained request one step at a time

For a multi-step workflow, remove or temporarily clear **Next Request**, then run the first request by itself. Confirm that its response contains the exact field the next request references. Test the next request independently with a safe representative value before restoring the chain.

When the individual requests work, reconnect them and check:

- **Next Request** contains the intended request handle.
- Response placeholders match the previous response's object path and capitalization.
- The placeholder is in the correct header, query, path, or body field.
- The first response uses the format the next request expects.

See [Chained requests](./request-parameters/chained-requests.md) for response placeholder syntax. For conditions, loops, or several explicit calls, use a [Liquid request](./request-types/liquid-requests.md) instead of making a linear chain carry workflow logic it was not designed for.

## 9. Re-test the complete path

After the smallest manual request succeeds, add optional parameters back one at a time, reconnect the chain, and test the real trigger. Repeat the live test only after confirming its inputs and side effects.

When asking for help, share the request type, trigger type, sanitized address shape, method, status code, and a redacted provider error. Never share API keys, access tokens, passwords, customer data, or an unredacted private response.

For concise answers to common failure patterns, see the [Troubleshooting requests FAQ](../general/faq/troubleshooting-requests.md).
