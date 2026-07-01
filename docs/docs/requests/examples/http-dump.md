---
title: HTTP Dump example
description: Demo showing how to send embedded params to HTTP Dump via APIEase.
---
# HTTP Dump example

This demo uses HTTP Dump to inspect requests sent from APIEase.

- Demo: `https://apiease-demo.myshopify.com/pages/http-dump` (password `eacoht`)
- Endpoints used: `https://httpdump.app/create-dump` and `https://httpdump.app/dumps`

## JavaScript
```javascript
let dumpId = null;

async function callApi() {
  if (dumpId === null) {
    const createDumpQueryParams = new URLSearchParams({
      requestId: 'http-dump-create',
    });

    const res = await fetch(
      '/apps/apiease/integration/caller/call?' + createDumpQueryParams,
      { headers: { 'ngrok-skip-browser-warning': 'any' } },
    );

    if (res.ok) {
      const json = await res.json();
      const temp = document.createElement('div');
      temp.innerHTML = json.data;
      const titleText = temp.querySelector('title')?.textContent;
      dumpId = titleText?.split(' - ')[1];

      document.getElementById('apiEaseResponse').innerHTML =
        'See that a POST was made to HTTP Dump here: ' +
        `<a href="https://httpdump.app/inspect/${dumpId}" target="_blank">` +
        `https://httpdump.app/inspect/${dumpId}</a>`;
    } else {
      console.error('Failed to fetch the data. Status code: ' + res.status);
    }
  }

  const queryParamsEmbeddedVar = document.getElementById('queryParameter').value;
  const headersEmbeddedVar = document.getElementById('headerParameter').value;
  const bodyEmbeddedVar = document.getElementById('bodyParameter').value;
  const pathParamsEmbeddedVar = JSON.stringify({ dumpId });

  const callDumpQueryParams = new URLSearchParams({
    requestId: 'http-dump-inspect',
    queryParamsEmbedded: queryParamsEmbeddedVar,
    headersEmbedded: headersEmbeddedVar,
    bodyEmbedded: bodyEmbeddedVar,
    pathParamsEmbedded: pathParamsEmbeddedVar,
  });

  const res = await fetch(
    '/apps/apiease/integration/caller/call?' + callDumpQueryParams,
    { headers: { 'ngrok-skip-browser-warning': 'any' } },
  );

  if (res.ok) {
    await res.json(); // response logged in HTTP Dump
  }
}

document.getElementById('submitButton').addEventListener('click', callApi);
document.getElementById('queryParameter').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    callApi();
  }
});
```

## HTML
```html
<div id="demoHtml">
  <div>
    HTTP Dump is an excellent resource for testing your APIEase requests.<br>
    Submit the following form to see APIEase call an HTTP Dump address.
  </div>
  <div style="display: flex;">
    <div style="flex: 1; padding-right: 10px;">
      <label for="queryParameter">Query Parameter:</label>
      <input type="text" id="queryParameter" style="width: 100%;" value='{"queryParam1": "queryValue1"}'>
      <label for="headerParameter">Header:</label>
      <input type="text" id="headerParameter" style="width: 100%;" value='{"queryParam1": "queryValue1"}'>
      <label for="bodyParameter">Body:</label>
      <input type="text" id="bodyParameter" style="width: 100%;" value='{"bodyParam1": "bodyValue1"}'>
    </div>
  </div>
  <button id="submitButton">Submit</button>

  <div class="response-box">
    APIEase Response:
    <div id="apiEaseResponse"></div>
  </div>
</div>
```

## CSS
```css
#demoHtml * {
  font-family: 'Helvetica Neue', sans-serif;
}
#demoHtml button {
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.response-box {
  position: relative;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #e6ecff;
  margin-top: 10px;
}
```
