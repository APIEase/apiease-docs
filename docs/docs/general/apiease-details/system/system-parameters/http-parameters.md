---
title: HTTP Parameters
description: Set HTTP request timeouts, response body formats, and HTTPS certificate verification.
---
# HTTP Parameters

These [System Parameters](./overview.md) apply to saved [HTTP requests](../../../../requests/request-types/http-requests.md). Add each setting with the **System** parameter type and save the request.

| Name | Example value | Default |
| --- | --- | --- |
| `REQUEST_TIMEOUT_SECONDS` | `30` | 15 seconds |
| `RESPONSE_BODY_MODE` | `TEXT` | Normal automatic response handling |
| `VERIFY_SSL_CERT` | `true` | Certificate verification enabled |

## Set the request timeout

Set `REQUEST_TIMEOUT_SECONDS` to a positive number of seconds, such as `30` for a 30-second outbound HTTP timeout. Omitted, invalid, zero, or negative values use the 15-second default.

Configure this parameter on the saved request. Dynamic embedded values cannot override it. This timeout applies to the outbound HTTP call; it does not extend the calling application's connection timeout or the [Flow response wait time](./flow-parameters.md).

## Choose the response body format

Set `RESPONSE_BODY_MODE` to one of these values:

| Value | Behavior |
| --- | --- |
| `JSON` | Parse a JSON response into structured data. If text cannot be parsed as JSON, keep the original text. |
| `TEXT` | Return the response body as UTF-8 text, including when it contains JSON. |
| `BASE64` | Encode the response bytes as Base64, useful for binary content such as images or PDFs. |

With `BASE64`, the response contains `data.base64` and a top-level `mimeType`. The MIME type comes from the destination's Content-Type header, with `application/octet-stream` as the fallback.

Mode values are trimmed and normalized to uppercase. Omitting the parameter or entering an unsupported value restores normal automatic response handling. This setting changes how APIEase reads the response; it does not change the outbound request's Content-Type.

## Control HTTPS certificate verification

`VERIFY_SSL_CERT` defaults to `true`, which verifies the destination's HTTPS certificate. Keep this enabled for normal use.

Setting it to `false` disables certificate verification. This weakens HTTPS authentication and should only be used for a controlled endpoint whose certificate issue you understand. The current setting uses an exact text comparison: only `true` enables verification when the parameter is present. Use `true` or remove the parameter to restore verification.

To change the status or message APIEase returns after a completed HTTP response, see [Response Overrides](./response-overrides.md).
