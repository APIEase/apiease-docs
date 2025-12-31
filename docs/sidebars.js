// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Overview',
      items: [
        'overview/apiease',
        'overview/what-it-does',
        'overview/how-it-works',
        'overview/why-you-need-it',
      ],
    },
    {
      type: 'category',
      label: 'Requests',
      items: [
        'requests/requests-overview',
        'requests/how-to-add-requests',
        'requests/import-from-postman',
        'requests/export-to-postman',
        {
          type: 'category',
          label: 'Request types',
          items: [
            'requests/request-types/request-types-overview',
            {
              type: 'doc',
              id: 'requests/request-types/http-requests',
              label: 'HTTP Requests',
            },
            {
              type: 'doc',
              id: 'requests/request-types/flow-requests',
              label: 'Flow Requests',
            },
            {
              type: 'doc',
              id: 'requests/request-types/liquid-requests',
              label: 'Liquid Requests',
            },
          ],
        },
        {
          type: 'category',
          label: 'Request parameters',
          items: [
            'requests/request-parameters/request-parameters-overview',
            'requests/request-parameters/in-app-vs-dynamic',
            {
              type: 'category',
              label: 'In-app parameters',
              items: [
                'requests/request-parameters/in-app-parameters/in-app-parameters-overview',
                'requests/request-parameters/in-app-parameters/in-app-header-parameters',
                'requests/request-parameters/in-app-parameters/in-app-body-parameters',
                'requests/request-parameters/in-app-parameters/in-app-path-parameters',
                'requests/request-parameters/in-app-parameters/in-app-query-parameters',
                'requests/request-parameters/in-app-parameters/in-app-system-parameters',
                'requests/request-parameters/in-app-parameters/in-app-flow-parameters',
              ],
            },
            {
              type: 'category',
              label: 'Dynamic embedded parameters from storefront',
              items: [
                'requests/request-parameters/dynamic-embedded-parameters/dynamic-embedded-parameters-overview',
                'requests/request-parameters/dynamic-embedded-parameters/path-parameters',
                'requests/request-parameters/dynamic-embedded-parameters/body',
                'requests/request-parameters/dynamic-embedded-parameters/headers',
                'requests/request-parameters/dynamic-embedded-parameters/query-parameters',
                'requests/request-parameters/dynamic-embedded-parameters/flow-parameters',
              ],
            },
            'requests/request-parameters/form-urlencoded-bodies',
            'requests/request-parameters/path-variables',
          ],
        },
        {
          type: 'category',
          label: 'Triggers',
          items: [
            {
              type: 'doc',
              id: 'requests/triggers/triggers-overview',
              label: 'Triggers Overview',
            },
            {
              type: 'category',
              label: 'Webhooks',
              items: [
                'requests/triggers/webhooks/webhooks-overview',
                'requests/triggers/webhooks/trigger-requests-from-a-webhook',
                'requests/triggers/webhooks/mapping-webhook-parameters',
              ],
            },
            {
              type: 'doc',
              id: 'requests/triggers/cron-schedule',
              label: 'Cron Schedule',
            },
            {
              type: 'doc',
              id: 'requests/triggers/proxy-endpoint',
              label: 'Proxy Endpoint',
            },
            {
              type: 'doc',
              id: 'requests/triggers/manual-calls',
              label: 'Manual Calls',
            },
            {
              type: 'doc',
              id: 'requests/triggers/storefont-calls',
              label: 'Storefont Calls',
            },
            {
              type: 'doc',
              id: 'requests/triggers/calling-requests-remotely',
              label: 'Remote HTTP Client',
            },
            {
              type: 'doc',
              id: 'requests/request-parameters/chained-requests',
              label: 'Chained Request',
            },
          ],
        },
            {
              type: 'category',
              label: 'Shopify Flow integration',
          items: [
            'requests/shopify-flow-integration/architecture',
            'requests/shopify-flow-integration/add-flow-request',
            'requests/shopify-flow-integration/minimal-flow-integration',
            'requests/shopify-flow-integration/cat-image-inventory',
          ],
        },
        {
          type: 'category',
          label: 'Examples',
          items: [
            'requests/examples/facebook-graph-api',
            'requests/examples/http-dump',
            'requests/examples/cat-api',
            'requests/examples/agify-api',
          ],
        },
        'requests/customer-authenticated-requests',
      ],
    },
    {
      type: 'category',
      label: 'General',
      items: [
        {
          type: 'category',
          label: 'APIEase details',
          items: [
            'general/apiease-details/ip-address-whitelisting',
            'general/apiease-details/importing-third-party-products',
            'general/apiease-details/authentication-example',
          ],
        },
        {
          type: 'category',
          label: 'Shopify API',
          items: [
            'general/shopify-api/shopify-api-calls-and-access-tokens',
            'general/shopify-api/automatic-vs-overridden-shopify-access-tokens',
            'general/shopify-api/shopify-admin-graphql-address-preset',
            'general/shopify-api/shop-access-token',
            'general/shopify-api/custom-access-token',
            'general/shopify-api/manage-shop-access-token-permissions',
            'general/shopify-api/shopify-graphql-product-count',
            'general/shopify-api/shopify-rest-product-count',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
