---
title: Agify API example
description: Demo calling Agify via APIEase to guess an age from a name.
---
# Agify API example

This demo calls the Agify API through APIEase to estimate age based on a name.

- Demo: `https://apiease-demo.myshopify.com/pages/open-api` (password `eacoht`)
- Endpoint: `https://api.agify.io?name=Jo`

## JavaScript
```javascript
function callApi() {
  const agifyInputName = document.getElementById('agifyInputName').value;
  const queryParamsEmbedded = JSON.stringify({ name: agifyInputName });
  const queryParamsCaller = new URLSearchParams({
    requestId: 'agify-age-lookup',
    queryParamsEmbedded,
  });

  fetch('/apps/apiease/integration/caller/call?' + queryParamsCaller)
    .then((response) => response.json())
    .then((jsonResponse) => {
      document.getElementById('ageifyResponseAge').innerHTML =
        'Agify thinks you are ' + jsonResponse.data.age + '.';
    });
}

document.getElementById('submitButton').addEventListener('click', callApi);
document.getElementById('agifyInputName').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    callApi();
  }
});
```

## HTML
```html
<div id="demoHtml">
  <p><a href="https://agify.io/" target="_blank">Agify</a> will guess your age based on your name.</p>
  <div>
    <label for="agifyInputName">Name:</label>
    <input type="text" id="agifyInputName">
    <button id="submitButton">Submit</button>
  </div>
  <div class="response-box">
    APIEase Response:
    <p id="ageifyResponseAge"></p>
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
