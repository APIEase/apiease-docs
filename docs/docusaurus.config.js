// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'APIEase',
  tagline: 'The API Integration And Automation Runtime',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.apiease.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'APIEase', // Usually your GitHub org/user name.
  projectName: 'apiease', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          exclude: ['tutorial-basics/**', 'tutorial-extras/**'],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/APIEase/apiease/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'APIEase',
        logo: {
          alt: 'APIEase Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/APIEase',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'APIEase',
                to: '/docs/overview/apiease',
              },
              {
                label: 'What It Does',
                to: '/docs/overview/what-it-does',
              },
              {
                label: 'How It Works',
                to: '/docs/overview/how-it-works',
              },
              {
                label: 'Why You Need It',
                to: '/docs/overview/why-you-need-it',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Shopify App Store',
                href: 'https://apps.shopify.com/apiease-admin',
              },
              {
                label: 'Product Site',
                href: 'https://apiease.com',
              },
              {
                label: 'Documentation',
                href: 'https://docs.apiease.com',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'APIEase CLI',
                href: 'https://github.com/APIEase/apiease-cli',
              },
              {
                label: 'APIEase Template',
                href: 'https://github.com/APIEase/apiease-template',
              },
              {
                label: 'APIEase Examples',
                href: 'https://github.com/APIEase/apiease-examples',
              },
              {
                label: 'Support',
                href: 'mailto:support@apiease.com',
              },
              {
                html: `
                  <div class="footer-icon-row">
                    <a class="footer-icon footer-icon--linkedin" href="https://www.linkedin.com/company/apiease" aria-label="LinkedIn" target="_blank" rel="noreferrer noopener"><span class="sr-only">LinkedIn</span></a>
                    <a class="footer-icon footer-icon--facebook" href="https://www.facebook.com/APIEasePlatform" aria-label="Facebook" target="_blank" rel="noreferrer noopener"><span class="sr-only">Facebook</span></a>
                  </div>
                `,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} APIEase.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
