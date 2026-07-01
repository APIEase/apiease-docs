---
title: Importing products from a third-party system
description: Example for importing external products into Shopify with APIEase.
---
# Importing products from a third-party system

You can use [Liquid requests](../../requests/request-types/liquid-requests.md) to automate the import of products and inventory data from third-party systems into your Shopify store. You can also import using [Shopify Flow Integration](../../requests/shopify-flow-integration/architecture.md). Liquid integration is recommended over Flow integration because it can be configured by the APIEase AI assistant. Whether syncing from a warehouse API, supplier feed, or internal catalog, APIEase enables this process without requiring custom app development or hosting.

**Recommended: Liquid integration**
Liquid requests let you fetch products, loop through the response, and post each product into Shopify. This keeps the entire import inside APIEase and makes it easier to adjust the logic with the AI assistant.

**Quick Liquid example**
1. Create an HTTP request that calls the third-party products API.
2. Create an HTTP request that calls the Shopify Admin API to create or update products.
3. Use a Liquid request to connect them:

```liquid
{% call { "requestId": "third-party-products" } as source %}

{% for product in source.data.products %}
  {% call {
    "requestId": "shopify-product-upsert",
    "bodyEmbedded": {
      "title": "{{ product.title }}",
      "vendor": "{{ product.vendor }}",
      "variants": [
        { "sku": "{{ product.sku }}", "price": "{{ product.price }}" }
      ]
    }
  } as upsert %}
  {{ upsert.status }}
{% endfor %}
```

More detailed examples of Liquid integrations are coming soon.

**Flow integration (alternative)**
1. **Start with an APIEase Request**: Create an APIEase request to fetch product and inventory data from the third-party system. Trigger it manually, on a schedule, or via a Shopify webhook event.
2. **Pass the Response to Shopify Flow**: Use a chained request to send the data to a Shopify Flow workflow configured by store administrators or developers.
3. **Process the Data in Flow**: Inside Flow, use a Run Code action to transform, validate, or filter the received data.
4. **Import into Shopify**: Use the Send Admin API request action in Flow to call Shopify's GraphQL Admin API to create or update products and inventory.

**Why Use APIEase**
While Shopify Flow provides native actions for updating product data, most real-world integrations require:
- Authenticated API calls to third-party systems
- The ability to schedule imports
- Access to response data from external APIs
- Dynamic control over how data flows into Shopify

APIEase handles these responsibilities, enabling you to build a complete product import pipeline within your Shopify environment.
