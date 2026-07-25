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

## Context: Semantic HTML / Accessible Section Landmarks
- **Mistake/Anti-Pattern:** Creating layout `<section>` landmark elements without an accessible name (`aria-labelledby` or `aria-label`), which prevents assistive technologies (like screen readers) from properly announcing them as navigable regions.
- **Corrected Behavior:** Ensure every `<section>` element contains a descriptive accessible name. Use `aria-labelledby` referencing the section's primary header element (e.g. `<h1>` or `<h2>` with a matching `id`), or apply an explicit `aria-label` when no visible heading exists.

## Context: Typography Layout Performance (TBT)
- **Mistake/Anti-Pattern:** Applying `text-wrap: balance;` or `text-wrap: pretty;` globally to headers (`h1, h2, h3`) and paragraphs (`p`), especially when combined with fluid responsive typography (e.g., `clamp()` with `vw` units). In headless CI runners simulating mobile devices, this forces an extremely expensive binary search for line-breaking during render, spiking "Style & Layout" time by ~470ms and destroying the Total Blocking Time (TBT) metric.
- **Corrected Behavior:** Never apply `text-wrap: balance` globally. Reserve it only for static, non-fluid titles where absolutely necessary, or omit it entirely if layout performance drops. 

## Context: Responsive Image Optimization (LCP)
- **Mistake/Anti-Pattern:** Using a `sizes` attribute like `sizes="(max-width: 768px) 800px, 100vw"` to serve smaller images to mobile. Since mobile screens often have a 3x Device Pixel Ratio (DPR), the browser calculates `800px (CSS width) * 3 (DPR) = 2400px`, completely defeating the responsive optimization and downloading the largest 1927px fallback anyway, wrecking the LCP.
- **Corrected Behavior:** Provide granular `widths` (e.g., `widths={[360, 720, 1080, 1440, 1927]}`) and use a straightforward `sizes="100vw"` attribute. The browser will automatically multiply `100vw` (e.g. 360 CSS pixels) by the screen's DPR (e.g. 3x = 1080px) and request the correctly optimized `1080w` variant, drastically improving LCP on mobile.

## Context: Client-Side Component Interactivity in Astro
- **Mistake/Anti-Pattern:** Using global selectors and event listeners in raw `<script>` tags, which requires manual initialization, manual de-duplication checks (`data-initialized` attributes), and explicit handlers for Astro view transitions (`astro:after-swap`).
- **Corrected Behavior:** Wrap interactive component templates inside a custom HTML element (e.g., `<layout-header>`) and define its behavior inside a class extending `HTMLElement` (Web Components) registered with `customElements.define`. Use `this.querySelector` within `connectedCallback` to query children. This scopes the logic, prevents namespace collision, and leverages native browser lifecycles to automatically initialize the element when mounted, avoiding transition listener duplicates.

## Context: Component Styling Integration
- **Mistake/Anti-Pattern:** Co-locating styles in a separate `.css` file next to the `.astro` component (e.g. `Hero.css` next to `Hero.astro`), forcing multiple file imports and separating styles from the component template.
- **Corrected Behavior:** Keep CSS styles inline inside a `<style>` block directly within the `.astro` component file itself to ensure proper encapsulation and leverage Astro's native component-scoped styling.

## Context: Asset Audit & Pre-existing Images
- **Mistake/Anti-Pattern:** Generating a new image asset or assuming a placeholder name without checking if a component asset with a different filename (e.g. `hero-image.png` instead of `hero-trophy.jpg`) is already present in the assets directory.
- **Corrected Behavior:** Audit the target assets folder before planning image integration. If an asset matching the layout intent is already present, import and utilize that file instead of generating a new one.

## Context: Static SVG Cluttering vs Vite Raw Imports
- **Mistake/Anti-Pattern:** Hardcoding raw SVG XML paths directly inside component templates (e.g., inside conditional loops). This bloats the template, reduces maintainability, and bypasses the project's static assets hierarchy.
- **Corrected Behavior:** Save SVG assets inside the assets folder (e.g., `@landing/assets/icons/`) and import them into the component frontmatter using Vite's `?raw` loader suffix (e.g., `import brainSvg from '@landing/assets/icons/brain.svg?raw';`). Render them in the template using `<Fragment set:html={svgString} />` and scope their styling using scoped `:global(svg)` selectors.

## Context: Footer Component Specification
- **Mistake/Anti-Pattern:** Attempting to wrap layout landmarks (like `<aside>`) in wrapper `<div>` tags, using absolute pathing imports (`/src/features/...`), and writing Tailwind utility classes inside component specifications instead of custom scoped Vanilla CSS.
- **Corrected Behavior:** Strictly enforce semantic HTML layouts with zero `div` wrappers, import local layout assets (like `logo.webp`) using relative pathing imports (e.g., `../assets/...`), and define all styles strictly via pure Vanilla CSS rules inside a scoped `<style>` block.

## Context: Media Query Range Syntax (CSS Level 4)
- **Mistake/Anti-Pattern:** Using legacy `min-width` or `max-width` syntax in CSS media queries.
- **Corrected Behavior:** Use the modern CSS Media Queries Level 4 range syntax (e.g., `width >= 768px`, `width <= 768px`, `width < 1024px`) for all `@media` conditions.

## Context: Card Layout & Border Radius
- **Mistake/Anti-Pattern:** Applying a border-radius or rounded corners to cards (containers/articles) on the landing page.
- **Corrected Behavior:** Ensure all cards on the landing page have straight corners (no `border-radius` / `border-radius: 0;`).

## Context: Layout Padding & Single Source of Truth
- **Mistake/Anti-Pattern:** Calculating layout padding inline (e.g., `padding-inline: max(...)`) in individual components.
- **Corrected Behavior:** Use the global `--layout-padding-inline` CSS variable defined in `variables.css` for all primary landing page sections and header/footer layout landmarks to maintain a Single Source of Truth (SSOT).

## Context: Contact Form WhatsApp Submission Mechanism
- **Mistake/Anti-Pattern:** Relying on default HTTP POST backend endpoints for forms intended to dispatch instant messaging consultations via WhatsApp.
- **Corrected Behavior:** Intercept form submit via a custom Web Component (`<contact-form>`), validate fields with native HTML5 validation, sanitize and structure inputs with strong TypeScript interfaces (`ContactFormData`), format the message body, and dispatch to `https://api.whatsapp.com/send?phone=<PHONE_NUMBER>&text=...` with proper URL encoding. Maintain a configurable placeholder constant for the target phone number.

## Context: Form Accessibility, ARIA & Input Autocomplete (a11y)
- **Mistake/Anti-Pattern:** Omitting `aria-required="true"` on required fields, leaving visual asterisks (`*`) un-hidden from screen readers, disabling `:focus` outlines without providing a visible focus indicator, or omitting HTML `autocomplete` attributes.
- **Corrected Behavior:** Always set `aria-required="true"` alongside `required` on mandatory form fields, wrap visual indicator asterisks in `<span aria-hidden="true">*</span>`, enforce WCAG 2.4.7 focus visibility via `:focus-visible`, and provide standard `autocomplete` attributes (`name`, `email`, `tel`) to enable seamless mobile autofill.

## Context: Form Control Containers & Landmark Semantics
- **Mistake/Anti-Pattern:** Wrapping individual form input controls in `<p>` tags (which represent textual prose) or nesting `<footer>` tags inside `<form>` elements (which litters screen reader landmark trees).
- **Corrected Behavior:** Use `<div>` elements for input control groups (`.input-group`) and form submission button rows (`.button-row`). Reserve `<fieldset>` and `<legend>` for logical field grouping, and keep `<footer>` reserved for page/section level landmark footers.

## Context: Feature-Driven Architecture & Domain Logic Isolation (SRP)
- **Mistake/Anti-Pattern:** Embedding pure data formatting, URL building, string sanitization, or DTO types inside client-side Astro Web Component `<script>` tags. This violates the Single Responsibility Principle (SRP) and prevents isolated unit testing.
- **Corrected Behavior:** Co-locate domain types in `src/features/<feature>/types/`, pure utility functions (e.g. `buildWhatsAppUrl`, `sanitizePhoneNumber`) in `src/features/<feature>/utils/`, and co-located unit tests in `src/features/<feature>/tests/`. Import utilities into the Astro Web Component script block to keep client bundles lightweight (Vite tree-shaking).

## Context: Web Component Event Listener Lifecycle & Memory Safety
- **Mistake/Anti-Pattern:** Attaching event listeners in `connectedCallback` using inline anonymous functions without cleaning them up in `disconnectedCallback`, leading to memory leaks during Astro View Transitions (Client Router) page swaps.
- **Corrected Behavior:** Bind event handler methods to class properties (e.g., `private handleSubmit = (e: SubmitEvent) => ...`) and detach them explicitly in `disconnectedCallback` using `removeEventListener`.

## Context: Emoji Unicode Escaping & Messaging URL Encoding
- **Mistake/Anti-Pattern:** Hardcoding literal UTF-8 emoji glyphs directly in string literals or calling `encodeURIComponent` inside the formatting function instead of at the URL construction boundary.
- **Corrected Behavior:** Define emojis using Unicode code point escape sequences (`\u{1F4CD}`, `\u{1F464}`, etc.) stored in a frozen dictionary constant (`const EMOJI = { ... } as const;`). Keep message formatting functions (`formatWhatsAppMessage`) returning clean raw multi-line strings, and apply `encodeURIComponent` strictly at the URL builder boundary (`buildWhatsAppUrl`) targeting `https://api.whatsapp.com/send?phone=...`.

## Context: Centralized Route & Anchor Constants (SSOT)
- **Mistake/Anti-Pattern:** Hardcoding repetitive URL routes and anchor hashes (e.g. `/contacto#formulario-contacto`) directly across template JSX/HTML elements.
- **Corrected Behavior:** Define centralized TypeScript constants in the component frontmatter (e.g., `const CONTACT_FORM_URL = '/contacto#formulario-contacto';`) and reference them in template attributes (`href={CONTACT_FORM_URL}`). This ensures Single Source of Truth (SSOT) and easy maintenance across multiple CTA triggers.

## Context: Sticky Header Anchor Scroll Offset (Native CSS)
- **Mistake/Anti-Pattern:** Modifying visual layout paddings or adding JavaScript scroll listeners to prevent sticky/fixed headers from obscuring section headings on anchor link navigation (`#hash`).
- **Corrected Behavior:** Apply native CSS `scroll-margin-top: var(--space-16);` (or calculated header offset) directly to the target landmark section. This informs the browser's native scroll engine to stop scrolling with exact offset clearance above the element.

## Context: Centralized Navigation Matrix (Routes + Copy Labels)
- **Mistake/Anti-Pattern:** Defining navigation link labels and hrefs independently inside Header and Footer components, causing copy drifts or route mismatches over time.
- **Corrected Behavior:** Export both a `ROUTES` constant dictionary and a `MAIN_NAV_ITEMS` array (containing `{ href, label }`) from `src/features/shared/constants/navigation.ts`. Consume `MAIN_NAV_ITEMS` across Header, Footer, and navigation drawers to guarantee 100% copy and route synchronization.












