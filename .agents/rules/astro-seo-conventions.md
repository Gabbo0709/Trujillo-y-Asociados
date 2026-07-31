---
trigger: glob
description: Enforces Astro SSG best practices, zero-JS hydration rules, strict metadata typing, and semantic HTML structure.
globs: trujillo-y-asociados/src/**/*.{astro,ts,tsx}
---

Astro SEO & Component Architecture Rules

When writing or refactoring Astro components, pages, or SEO layouts for `Trujillo-y-Asociados`, strictly follow these conventions:

## 1. Metadata Props & Type Interfaces
All SEO metadata components (e.g., `BaseHead.astro`, `SeoLayout.astro`) in `src/features/seo` must use strict TypeScript interfaces.

- **Mandatory Props:** `title`, `description`, `canonicalUrl`.
- **Optional Props:** `image`, `article`, `noindex`.
- **Description Constraints:** Must be between 120 and 160 characters. Do not allow raw HTML or unescaped quotes.

```typescript
// Example interface in src/features/seo/types/index.ts
export interface SeoMetadataProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  image?: string;
  noindex?: boolean;
}

```

## 2. Canonical URL Resolution

Canonical URLs must be deterministically constructed using Astro's built-in `Astro.url` API to prevent duplicate content indexing across trailing slashes or local/production hostnames:

```astro
---
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<link rel="canonical" href={canonicalURL} />
<meta property="og:url" content={canonicalURL} />

```

## 3. Zero-JS Hydration Constraints

* **Default State:** All static text, headings, headers, and legal copy must render zero client-side JavaScript.
* **Forbidden:** Do NOT use `client:load`, `client:only`, or `client:idle` on static components (e.g., `Hero.astro`, `AdvisoryCard.astro`, `Footer.astro`).
* **Allowed Hydration:** Reserve client hydration directives exclusively for interactive components (e.g., contact forms in `src/features/contact` using `client:visible`).

## 4. Heading Hierarchy & HTML Semantics

* Every page route MUST render exactly **one** `<h1>` element inside the `<main>` tag representing the core service proposition.
* `<h2>` elements must represent major practice areas or sub-sections (e.g., *Asesoría Corporativa*, *Derecho Laboral*).
* Do not jump heading levels (e.g., `<h1>` directly to `<h3>`).

## 5. Image & Asset Optimization

* Always use `astro:assets` (`<Image />`) for local assets in `src/features/*/assets`.
* All `<img>` and `<Image />` instances must have descriptive, non-generic `alt` text explaining the content (never use `alt="image"` or empty `alt=""` unless decorative).
