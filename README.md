# APIEase documentation

This repository hosts the documentation for APIEase.

- Shopify app: https://apps.shopify.com/apiease-admin
- Product site: https://www.apiease.com/
- Documentation: https://docs.apiease.com/

Public articles live in `docs/docs/`. Backend implementation details belong in
the application repository's `../apiease/docs/`, including the internal
`apiEaseParameters` execution context. Admin widget `inputs` form state and the
embedded parameters sent by `runRequest` have separate purposes; explain them
separately in user-facing examples.

The Apex knowledge bundle, `knowledgebase/apiEaseDocsConsolidated.md`, is produced
by the established generation process using `knowledgebase/buildApiEaseDocsKnowledgeBase.js`.
Agents must never directly edit any `apiEaseDocsConsolidated.md` file, including
imported copies. Update the source articles instead, then refresh the bundle and
its consumers through the supported scripts as part of documentation work.

From `docs/`, use `npm run build` to verify the site and `npm run knowledge:test`
to exercise generation in memory without changing the bundle. Run
`npm run knowledge:build` followed by `npm run knowledge:check` from that same
directory. Then run `npm run knowledge:pull-local` from each sibling repository
root: `../apiease`, `../apiease-template`, and `../apiease-cli`. Verify each copy
with `npm run knowledge:pull-local -- --check`. See [AGENTS.md](AGENTS.md) for the
editing and import boundaries.

Keep relative Markdown links in the documentation source. The bundle generator
resolves article links against the emitted SOURCE URL map, including custom
routes, and emits exact article URLs without query or fragment suffixes. It
preserves code examples, images, and external links. An unresolved relative
article link fails generation rather than supplying Apex with an invented URL.
