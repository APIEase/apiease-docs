# Repository Guidelines

This repository hosts APIEase product documentation built with Docusaurus. Use this guide to navigate the structure, run the site locally, and keep contributions consistent.

## Project Structure & Module Organization
- `docs/`: Docusaurus project root (package.json, config, scripts).
- `docs/docs/`: Markdown/MDX content organized by topic (overview, requests, request-types, request-parameters, dynamic-embedded-parameters, etc.).
- `docs/static/`: Static assets (images, downloads).
- `docs/src/`: Theme overrides and custom components.
- `docs/sidebars.js`: Sidebar and navigation definitions; add new docs here to surface them in the left nav.

## Build, Test, and Development Commands
Run all commands from `docs/` unless noted.
- `npm install`: Install dependencies (Node >= 20).
- `npm run start`: Launch local dev server with hot reload.
- `npm run build`: Production build to verify content compiles.
- `npm run serve`: Serve the production build locally for smoke testing.
- `npm run clear`: Reset Docusaurus caches if builds act stale.

## Coding Style & Naming Conventions
- Markdown/MDX only; keep frontmatter (`title`, `description`) accurate.
- Prefer sentence-case headings; keep sections short and scannable.
- Use relative links within `docs/docs` (e.g., `../requests/manual-trigger.md`).
- Keep ASCII in new files; match existing quote style (single quotes in JS configs).
- Add brief, purposeful comments only when needed in JS/TS.

## Testing Guidelines
- Execute `npm run build` before changes to ensure no build errors.
- Execute `npm run build` after changes to ensure no build errors.
- For new sidebar entries, confirm the page appears in the left nav and links resolve.
- For documentation-only changes, do not create new unit tests or test fixtures. Verification should focus on the docs project functioning correctly, primarily by running `npm run build`.

## Commit & Pull Request Guidelines
- Commits: concise, imperative subject (e.g., `Add manual trigger doc`, `Link request types`). Group related doc edits together.
- Pull requests: include a short summary of changes, impacted paths, and any screenshots for visual/layout adjustments. Link to issues/tasks when available.

## Security & Configuration Tips
- Do not embed real secrets or tokens in docs or examples.
- Use placeholders for domains, keys, and shop names (e.g., `yourstore.myshopify.com`).

## Agent-Specific Instructions
- When adding a new doc, update `docs/sidebars.js` so navigation renders.
- Keep cross-links current by preferring dedicated pages over in-page anchors.
- Write public docs from the APIEase user's point of view. APIEase is a technical product, so user-facing docs can and should use technical terms when those terms are part of using the admin UI, public API, storefront calls, other request execution options, `apiease-template`, or `apiease-cli`.
- Distinguish user-facing technical explanations from internal implementation details. Prefer product and UI language on help pages (for example, "choose Liquid as the request type") unless the page is specifically documenting a public API field or CLI/template contract.
- Do not expose internal APIEase runtime objects, private implementation paths, supporting-project internals, or codebase-only field names in public docs unless they are documented public API, template, or CLI surface area. Put agent-only or developer-internal guidance in `AGENTS.md` or internal docs in the APIEase implementation project instead.
- `apiEaseParameters` is an internal backend execution-context object. Do not expose or explain it in public articles or examples. Document backend context, resolution, and transport details in `../apiease/docs/`; use verified user-facing parameter syntax in this repository.
- Keep Admin widget form state separate from request parameters. `inputs` and `apiease.setInput` remember editable values and update the widget display. `apiease.runRequest` sends explicit embedded parameter groups. Form state is optional, is not a query parameter or request-input namespace, and must not be presented as a prerequisite for calling requests.
- codex-dev-bot does not need to create unit tests for documentation changes in this repository.
- codex-dev-bot should still verify documentation changes in a TDD-style workflow by using the project test runner and confirming the Docusaurus build passes.
- For documentation-only tasks, treat running `npm run build` from `docs/` as the primary verification step rather than adding new automated tests.

## Generated Knowledge Bundle

- Agents must never directly edit or patch any `apiEaseDocsConsolidated.md` file, including this repository's generated bundle and imported copies in consuming repositories. Update the source articles under `docs/docs/` instead.
- After updating public documentation, run `npm run knowledge:build` and `npm run knowledge:check` from `docs/`. Then run `npm run knowledge:pull-local` from each available sibling repository: `../apiease`, `../apiease-template`, and `../apiease-cli`. Verify each import with `npm run knowledge:pull-local -- --check`.
- Scripted generation and imports are the preferred follow-up to documentation updates and do not require a separate user request. If a consuming repository is unavailable or a command fails, report the remaining refresh step; never compensate by editing a consolidated file directly.
- `npm run knowledge:test` validates generation in memory without updating the bundle. Generator changes may need behavioral tests under `test/`; documentation wording changes do not need new tests. Do not make validators require public docs to explain internal execution objects.
