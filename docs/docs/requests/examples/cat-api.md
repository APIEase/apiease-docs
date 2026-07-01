---
title: Cat API example
description: Demo calling The Cat API through APIEase to show a random cat image.
---
# Cat API example

This demo calls The Cat API via APIEase and displays a random cat image.

- Demo: `https://apiease-demo.myshopify.com/pages/auth-api` (password `eacoht`)
- Endpoint: `https://api.thecatapi.com/v1/images/search`

## JavaScript
```javascript
function callApi() {
  const queryParamsCaller = new URLSearchParams({
    requestId: 'cat-random-image',
  });

  fetch('/apps/apiease/integration/caller/call?' + queryParamsCaller, {
    headers: { 'ngrok-skip-browser-warning': 'any' },
  })
    .then((response) => response.json())
    .then((jsonResponse) => {
      document.getElementById('catApiResponseImage').src = jsonResponse.data[0].url;
    });
}
```

## HTML
```html
<div id="demoHtml">
  <div id="catApiDemo">
    <div style="display: flex; align-items: center;">
      <p>The Cat API returns random images of cats.</p>
      <button onclick="callApi()">Get</button>
    </div>
    <div class="response-box">
      APIEase Response:<br>
      <img id="catApiResponseImage">
    </div>
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
