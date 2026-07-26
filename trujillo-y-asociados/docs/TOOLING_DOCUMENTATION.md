# Architectural Tooling & Quality Assurance Suite

This document outlines the testing, validation, and static analysis tooling recently integrated into the project. Each tool is selected to enforce clean architecture, strict type safety, HTML5 semantics, accessibility compliance, and crawlability across our static site generation (SSG) pipeline.

---

## 1. Unit Testing & DOM Simulation: Vitest & Happy-DOM

- **Packages**: `vitest` (`^3.2.7`), `happy-dom` (`^20.11.1`)
- **Official Documentation**: 
  - [Vitest Official Docs](https://vitest.dev/)
  - [Happy-DOM GitHub Repository](https://github.com/capricorn86/happy-dom)

### Architectural Purpose
Vitest serves as our core unit testing runner for domain logic, utility functions, data transformers, and client-side web component behaviors. `happy-dom` acts as the lightweight, headless browser environment simulating DOM APIs (such as `window`, `document`, `customElements`, and `SubmitEvent`).

### Why it is the Recommended Alternative
- **Vite Integration**: Unlike **Jest**, which requires a redundant transpilation pipeline via Babel or `ts-jest` and duplicates module resolution, Vitest shares Vite's native transformation pipeline, configuration, and resolution strategy.
- **Performance**: `happy-dom` provides significantly faster execution speeds and a smaller memory footprint compared to `jsdom`, making unit test runs nearly instantaneous in both local development (`watch` mode) and CI execution.
- **Native ESM & TypeScript**: Out-of-the-box support for ES modules and modern TypeScript syntax without additional pre-compilation steps.

### Integration Trade-offs
- **Pros**: Blazing fast execution times, zero configuration duplication, native Vite support, and instant HMR feedback.
- **Cons**: `happy-dom` is a synthetic DOM implementation. Advanced browser APIs (e.g., complex layout geometry, computed canvas rendering, or visual layout tree calculations) are not fully emulated. Full end-to-end (E2E) testing with real browser engines (e.g., Playwright) is recommended for complex UI interactions.

---

## 2. HTML Semantics & Accessibility Validation: HTML-Validate

- **Package**: `html-validate` (`^11.5.6`)
- **Official Documentation**: [HTML-Validate Documentation](https://html-validate.org/)

### Architectural Purpose
`html-validate` performs static analysis and accessibility linting directly against the rendered HTML build artifacts (`dist/**/*.html`). It guarantees that compiled Astro pages output valid HTML5 structures, proper ARIA landmarks, and compliant element relationships before deployment.

### Why it is the Recommended Alternative
- **Post-Build Inspection**: Traditional linters (such as ESLint) only inspect uncompiled template source code. `html-validate` inspects the final output delivered to end users and search engine crawlers, catching DOM structural defects resulting from component composition or dynamic slot injection.
- **A11y & SEO Safeguard**: Automatically flags unclosed tags, invalid attribute nesting, duplicated IDs, missing landmark headings, and accessibility violations before code hits production.

### Integration Trade-offs
- **Pros**: Guarantees 100% standard-compliant HTML5 output and prevents hidden DOM tree errors from degrading accessibility or SEO ranking.
- **Cons**: Requires executing post-build (`pnpm run build` prior to `pnpm run test:html`). Custom Web Components or framework-specific hydration attributes may require custom rules to avoid false positives.

---

## 3. Link Crawling & Path Validation: Linkinator

- **Package**: `linkinator` (`^8.0.2`)
- **Official Documentation**: [Linkinator Repository](https://github.com/JustinBeckwith/linkinator)

### Architectural Purpose
`linkinator` recursively crawls the local build distribution directory (`./dist`) to verify all internal anchors, image sources, stylesheet links, and external HTTP references, ensuring zero broken links or dead crawler paths exist on the deployed site.

### Why it is the Recommended Alternative
- **Automated CI Safeguard**: Replaces manual verification and third-party online crawlers with a fast, offline-first local build crawler integrated into our npm scripts (`pnpm run test:links`).
- **Domain Skipping**: Supports configurable regex filtering (`--skip`) to bypass rate-limited or auth-gated third-party platforms (e.g., LinkedIn, Facebook, Twitter) while maintaining rigorous checks on critical assets and domain routes.

### Integration Trade-offs
- **Pros**: Eliminates `404` dead links and broken asset paths that negatively impact domain authority, crawl budget, and user experience.
- **Cons**: Outbound network requests for unskipped external links depend on external server availability. Transient network latency or external downtime can trigger CI failures if third-party links are not properly filtered.

---

## 4. Astro Component Type Safety: @astrojs/check

- **Package**: `@astrojs/check` (`^0.9.9`)
- **Official Documentation**: [Astro CLI Reference — astro check](https://docs.astro.build/en/reference/cli-reference/#astro-check)

### Architectural Purpose
`@astrojs/check` provides static type checking across `.astro` component files. It analyzes component frontmatter scripts, props interface contracts, and JSX-like template expressions for type correctness.

### Why it is the Recommended Alternative
- **Extends Standard `tsc`**: The standard TypeScript compiler (`tsc`) only checks standalone `.ts` files and ignores `.astro` template markup. `@astrojs/check` bridges this gap, enforcing strict end-to-end type safety across both TypeScript source files and Astro component templates.

### Integration Trade-offs
- **Pros**: Catches missing props, invalid prop types, and syntax errors inside `.astro` files prior to build execution.
- **Cons**: Introduces a dedicated type-checking step (`pnpm run check`) in the CI pipeline.

---

## Command Reference Summary

| Script Command | Tool Involved | Purpose |
| :--- | :--- | :--- |
| `pnpm run check` | `@astrojs/check` | Validates TypeScript types and syntax in `.astro` components. |
| `pnpm run test` | `vitest` | Executes unit tests for domain logic and utilities. |
| `pnpm run test:html` | `html-validate` | Lints compiled HTML files in `./dist` for accessibility and semantics. |
| `pnpm run test:links` | `linkinator` | Crawls `./dist` to verify all internal anchors and asset links. |
| `pnpm run ci:validate` | All tools | Runs full verification suite in CI (check + test + build + html + links). |
