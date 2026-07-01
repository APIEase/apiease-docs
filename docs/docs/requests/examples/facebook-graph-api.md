---
title: Facebook Graph API example
description: Demo storefront page calling Facebook Graph API via APIEase.
---
# Facebook Graph API example

This demo page calls the Facebook Graph API through APIEase to fetch album photos and render them on a Shopify storefront.

- Demo: `https://apiease-demo.myshopify.com/pages/facebook-album-1` (password `eacoht`)
- Endpoints used:
  - Photo: `https://developers.facebook.com/docs/graph-api/reference/photo/`
  - Album photos: `https://developers.facebook.com/docs/graph-api/reference/album/photos/`

## JavaScript
```javascript
let dumpId = null;

async function getPhoto(photoId) {
  const pathParamsEmbeddedVar = JSON.stringify({ photoId });
  const getPicturesQueryParams = new URLSearchParams({
    pathParamsEmbedded: pathParamsEmbeddedVar,
    requestId: 'facebook-photo',
  });

  const res = await fetch(
    '/apps/apiease/integration/caller/call?' + getPicturesQueryParams,
    { headers: { 'ngrok-skip-browser-warning': 'any' } },
  );

  if (!res.ok) {
    console.error('Failed to fetch the data. Status code: ' + res.status);
    return;
  }

  const json = await res.json();
  const imageData = json.data.images;
  const imageByHeight = imageData.find((image) => image.height === 130);
  if (!imageByHeight) return;

  const imageUrl = imageByHeight.source;
  document.getElementById('facebookResponseDisplay').innerHTML +=
    `<img class="fbPhotos" src="${imageUrl}">`;
}

async function callApi() {
  const pathParamsEmbeddedVar = JSON.stringify({ albumId: '122103599360059617' });
  const getAlbumQueryParams = new URLSearchParams({
    pathParamsEmbedded: pathParamsEmbeddedVar,
    requestId: 'facebook-album-photos',
  });

  const res = await fetch(
    '/apps/apiease/integration/caller/call?' + getAlbumQueryParams,
    { headers: { 'ngrok-skip-browser-warning': 'any' } },
  );

  if (!res.ok) {
    console.error('Failed to fetch the data. Status code: ' + res.status);
    return;
  }

  const json = await res.json();
  const albumData = json.data.data;
  for (const item of albumData) {
    await getPhoto(item.id);
  }
}

callApi();
```

## HTML
```html
<div id="demoHtml">
  <div>
    You can call <a target="_blank" href="https://developers.facebook.com/docs/graph-api">Facebook Graph API</a>
    to retrieve content from Facebook.
  </div>
  <div>
    The following images from the
    <a target="_blank" href="https://www.facebook.com/media/set/?set=a.122103599360059617&type=3">APIEase Facebook Page</a>
    are being retrieved from the Facebook Graph API via APIEase.<br>
  </div>

  <div class="response-box">
    APIEase Response:
    <div id="facebookResponseDisplay"></div>
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
.fbPhotos {
  outline: 1px solid #000;
  margin: 20px;
}
```
