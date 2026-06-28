# Lessons Learned

## Context: Navigation Header / Brand Color Alignment
- **Mistake/Anti-Pattern:** Attempting to introduce custom scoped color variables (`#2B0C0A` for Dark Burgundy/Wine) instead of adhering strictly to the established brand color palette.
- **Corrected Behavior:** Map the requested Wine color to the existing `--color-chocolate-alto` (`#3F1F13`) variable from the visual identity system. Do not introduce new color variables that are not part of the core brand palette.

## Context: Interactive Scripts & Astro Lifecycle
- **Mistake/Anti-Pattern:** Registering event listeners inside setup functions (like `initHeader`) that trigger on both initial page load and after page transitions (e.g., `astro:after-swap`) without a guard, leading to duplicated handlers and memory leaks. Also, failing to handle state-related ARIA labels (e.g., updating `aria-label` when `aria-expanded` changes) and neglecting CTA/anchor links inside the mobile drawer.
- **Corrected Behavior:** Guard component script initializations by checking if they are already initialized (e.g., using a `data-initialized` attribute on the target elements). Ensure all close-on-click links (including CTAs) inside a mobile navigation drawer are properly targeted. Synchronize `aria-label` dynamically to reflect the toggle's open/close status.

## Context: Button Attribute Semantics
- **Mistake/Anti-Pattern:** Omitting the `type` attribute on navigation triggers or other non-submit `<button>` elements, which defaults to `type="submit"` and can trigger accidental form submissions if the component is ever placed within a `<form>` block.
- **Corrected Behavior:** Explicitly specify `type="button"` on all interactive toggle buttons, hamburger triggers, close buttons, and custom controls.

## Context: Asset Optimization Pipeline & LCP
- **Mistake/Anti-Pattern:** Keeping static images (like brand logos) inside the `/public` folder and using raw strings for the `src` attribute. This completely bypasses Astro's build-time image optimization pipeline, preventing AVIF/WebP conversion, automatic sizing, and unique content hashing, which harms Largest Contentful Paint (LCP) and technical SEO.
- **Corrected Behavior:** Place components' static assets inside the feature domain directory (e.g., `src/features/layout/assets/images/`), sanitize the file name, and import them via ESM modules (e.g., `import logo from './assets/...'`). Pass the imported object to the `<Image>` component to enable automatic caching, compression, and format optimization. For static display sizes, always define `densities={[1, 1.5, 2]}` to output responsive srcset files for high-DPI (Retina) screens, resolving the `image-size-responsive` audit.

## Context: DOM Tree Flattening & CSS Layout Math
- **Mistake/Anti-Pattern:** Using redundant inner `div` tags solely to serve as max-width centering wrappers, increasing DOM tree depth unnecessarily.
- **Corrected Behavior:** Remove redundant structural containers completely. Consolidate layout, alignment, and maximum width constraints directly onto the parent semantic landmark element (e.g., `<header>`) using modern CSS padding math (`padding-inline: max(var(--space-6), calc((100% - var(--max-width-landing)) / 2 + var(--space-6)))`).

## Context: Strict TypeScript Adoption in Components
- **Mistake/Anti-Pattern:** Leaving data matrices (like navigation links) loosely typed and script helper functions without explicit return signatures.
- **Corrected Behavior:** Enforce strict compilation safety inside Astro components by defining explicit interfaces (e.g., `interface NavLink`) and specifying explicit return types (e.g., `void` / `initHeader(): void`) on all client-side script blocks.

## Context: Path Aliases Import Conventions
- **Mistake/Anti-Pattern:** Using relative import paths (e.g., `../layouts/BaseLayout.astro`) for core directories that have configured path aliases.
- **Corrected Behavior:** Use the configured path aliases (e.g., `@layouts/BaseLayout.astro`, `@styles/...`, `@components/...`) defined in `tsconfig.json` for all imports from those directories.

## Context: CSS Rendering Optimization
- **Mistake/Anti-Pattern 1 (render-blocking):** Leaving Astro to load compiled stylesheets as separate files in the `<head>` of single-page landing architectures, causing Lighthouse to flag them as render-blocking resources.
- **Mistake/Anti-Pattern 2 (inlineStylesheets regression):** Setting `build: { inlineStylesheets: 'always' }` in `astro.config.mjs`. This inlines **all** CSS — including every scoped component style — into the HTML document. This forces the browser to parse the entire CSSOM synchronously during HTML parsing, blocking the main thread far longer. In one test run, TBT spiked from 442ms → 1,176ms and total task time jumped 66%, dropping the Lighthouse score from 87 → 74.
- **Corrected Behavior:** Use `build: { inlineStylesheets: 'auto' }` (Astro's smart default). This only inlines CSS payloads under 4KB. Our global CSS (~3.6KB) gets inlined. Larger scoped component CSS remains as non-blocking external files. This is the correct balance and avoids both the render-blocking and the parse-overload problems.

## Context: Software Rendering Optimization in Headless CI
- **Mistake/Anti-Pattern:** Using GPU/CPU-heavy graphical CSS properties like `backdrop-filter: blur(...)` or complex `filter` effects. In headless CI runners (e.g., GitHub Actions), these effects are rendered via software emulation, causing massive CPU main-thread blocks, long layout tasks, and high Total Blocking Time (TBT) / Render Delay.
- **Corrected Behavior:** Avoid `backdrop-filter` or complex CSS filters on sticky headers or large layout elements. Rely on solid or flat opacity colors to ensure lightning-fast software rasterization and low TBT.

## Context: CSS Transition Property Scope
- **Mistake/Anti-Pattern:** Using `transition: all .3s cubic-bezier(…)` (via a `--transition-smooth` custom property) on multiple selectors across the codebase. The `all` keyword forces the browser to compute transition eligibility for **every** CSS property on every state recalculation, creating massive Style & Layout overhead (~879ms) on slow CI runners (benchmarkIndex ~1911). Combined with 12+ selectors using it, TBT spiked to 1,090ms.
- **Corrected Behavior:** Define only a timing variable (`--ease-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1)`) and compose it in each selector with explicit property names: e.g. `transition: color var(--ease-smooth);` or `transition: background-color var(--ease-smooth), color var(--ease-smooth), border-color var(--ease-smooth);`. Never use `all` in transition shorthand.

## Context: inlineStylesheets Configuration (Reconfirmed)
- **Mistake/Anti-Pattern:** Proposing `build: { inlineStylesheets: 'always' }` even when the total CSS payload is small (~8KB). The user has explicitly rejected this approach twice — the CSSOM synchronous parse overhead it causes on headless CI runners consistently degrades TBT regardless of CSS size.
- **Corrected Behavior:** Always use `build: { inlineStylesheets: 'auto' }`. Do not propose `'always'` under any circumstance. If the CSS exceeds the 4KB auto threshold and causes a render-blocking audit, address the root cause of CSS size instead.
