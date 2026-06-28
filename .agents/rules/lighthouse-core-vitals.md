---
trigger: always_on
---

Lighthouse 100% & Core Web Vitals Optimization

## Core Mandate
You are an expert performance engineer. Every line of code, style block, or asset optimization you implement must strictly aim for a perfect 100% score across all Lighthouse categories: Performance, Accessibility, Best Practices, and SEO. 

## Technical Constraints & Standards

### 1. Media & Image Optimization (LCP & CLS Prevention)
- **Component Mandate:** You MUST use Astro's native `<Image />` component from `astro:assets` for all local and remote images. Never use raw `<img>` tags unless explicitly instructed for specific edge cases.
- **Dimensional Integrity:** Every image and video element MUST have explicit `width` and `height` attributes to reserve layout space and prevent Cumulative Layout Shift (CLS).
- **Loading Strategy:** - For above-the-fold assets (e.g., Hero section images/logos contributing to Largest Contentful Paint), you MUST apply `loading="eager"` and `fetchpriority="high"`.
  - For below-the-fold assets, default to `loading="lazy"` and `decoding="async"`.

### 2. CSS & Styling Performance
- **Scoped Styles:** Prefer writing vanilla CSS natively inside Astro `<style>` tags. This ensures Astro automatically minifies, bundles, and inlines critical CSS per component while eliminating unused styles.
- **Render Blocking:** Do not inject massive external CSS frameworks or un-optimized font files that cause Flash of Unstyled Text (FOUT) or block the main thread.
- **Typography:** Ensure all custom `@font-face` rules utilize `font-display: swap;` to maintain immediate content readability.

### 3. JavaScript Minimization (INP & TBT Prevention)
- **Zero-JS Default:** Leverage Astro's "Island Architecture" to its maximum potential. Keep client-side JavaScript at zero unless explicitly needed for interactivity.
- **Script Handling:** If client-side JS is necessary, use native Astro `<script>` tags (which default to `type="module"` and are deferred automatically). To protect Total Blocking Time (TBT) and Interaction to Next Paint (INP), keep scripts lightweight, break up long tasks, and offload third-party scripts to Web Workers.

### 4. Accessibility (A11y) & Best Practices
- **Contrast Ratios:** Text and interactive elements must satisfy a minimum contrast ratio of 4.5:1 (WCAG AA standard), striving for 7:1 (AAA) where possible.
- **Interactive Targets:** Ensure all buttons, links, and form elements have a minimum touch target size of 48x48px with appropriate spacing to pass mobile usability audits.
- **Labels & Alt Attributes:** Every single visual element requires a descriptive `alt` string (or `alt=""` explicitly for purely decorative elements). Every interactive component or icon-only button must have an explicit `aria-label` or descriptive text.
- **Document Lang:** Ensure the root `<html>` element always specifies the correct language attribute (e.g., `lang="es"` or `lang="en"`).
