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
- codex-dev-bot does not need to create unit tests for documentation changes in this repository.
- codex-dev-bot should still verify documentation changes in a TDD-style workflow by using the project test runner and confirming the Docusaurus build passes.
- For documentation-only tasks, treat running `npm run build` from `docs/` as the primary verification step rather than adding new automated tests.
