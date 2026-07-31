---
trigger: glob
globs: trujillo-y-asociados/src/**/*.{astro,ts}
---

# Legal Service JSON-LD & Schema.org Standards

When generating, validating, or modifying structured data inside `src/features/seo/components/SchemaOrg.astro` or page frontmatters for `Trujillo & Asociados`, strictly adhere to these legal niche entity rules.

## 1. Required Primary Schema Types by Page Route

Every page in `src/pages/` must supply or render valid JSON-LD representing the firm's legal entity:

- **Root & Firm Pages (`/`, `/firm`):** Must use `@type: "LegalService"` (or `@type: "Attorney"`).
- **Practice Area Pages (`/corporate-advisory`, `/workers-advisory`):** Must use `@type: "LegalService"` (or `@type: "Service"`) with explicit `hasOfferCatalog` or `serviceType`.
- **Contact Page (`/contacto`):** Must combine or extend schema with `@type: "ContactPage"` and explicit `PostalAddress` data.

## 2. Dynamic Domain Resolution & Mandatory Properties

* **Zero Hardcoded Domains:** Do NOT hardcode static production domain URLs (e.g., `https://example.com`). All `url` and `logo` properties MUST be constructed dynamically using `Astro.site` or `Astro.url` (e.g. `new URL('/logo.png', Astro.site ?? canonicalUrl).toString()`).

A `@type: "LegalService"` payload defined in `@seo/types/seo.types.ts` is considered **invalid** if any of the following mandatory fields are omitted:

```typescript
// Dynamic Schema Construction in SchemaOrg.astro
const siteUrl = Astro.site?.toString() ?? canonicalUrl.toString();
const logoUrl = new URL('/logo.png', Astro.site ?? canonicalUrl).toString();

const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Trujillo & Asociados",
  "url": siteUrl,
  "logo": logoUrl,
  "telephone": "+52-55-0000-0000",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Paseo de la Reforma",
    "addressLocality": "Ciudad de México",
    "addressRegion": "CDMX",
    "postalCode": "06600",
    "addressCountry": "MX"
  },
  "areaServed": ["México", "CDMX"],
  "knowsAbout": [
    "Derecho Laboral",
    "Asesoría Corporativa",
    "Compliance Legal",
    "Litigio Laboral"
  ]
};
```

## 3. Entity Mapping for Legal Practice Areas

The `knowsAbout` array and page metadata must include high-intent legal entity terms:

* **Corporate (`/corporate-advisory`):** `"Asesoría Corporativa"`, `"Derecho Mercantil"`, `"Cumplimiento Normativo"`, `"Gobierno Corporativo"`.
* **Labor / Workers (`/workers-advisory`):** `"Derecho Laboral"`, `"Asesoría a Trabajadores"`, `"Contratos Individuales de Trabajo"`, `"Seguridad Social"`.

## 4. On-Page Data Synchronization Rule (Zero Mismatch)

* **Zero Mismatch Rule:** Values in JSON-LD (such as phone numbers, practice areas, office address, or firm name) MUST match the visible copy rendered inside the HTML `<body>` exactly.
* Discrepancies between JSON-LD properties and visible UI copy are treated as **Critical Failures** due to search engine cloaking penalties.
