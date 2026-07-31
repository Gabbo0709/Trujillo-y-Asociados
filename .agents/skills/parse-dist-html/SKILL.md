---
name: parse-dist-html
description: Parses compiled static HTML build artifacts in trujillo-y-asociados/dist into a clean, token-efficient JSON payload containing metadata, heading hierarchies, JSON-LD schemas, and body text. Use when evaluating SEO, checking rendered DOM structure, or validating schemas without reading raw HTML files directly into prompt context.
---

# Parse Dist HTML Payload Skill

This skill extracts pre-processed SEO data from compiled static routes in `./dist`, preventing context window inflation by filtering out raw HTML, CSS, inline scripts, and DOM boilerplate.

## When to use this skill

- Use when auditing on-page SEO (titles, descriptions, canonical links) for target routes.
- Use when evaluating heading hierarchies (`H1`-`H3`) and body text for entity density and search intent.
- Use when inspecting structured data (`<script type="application/ld+json">`) generated in production output.
- Do NOT use for static code linting or checking uncompiled `.astro` source files.

## How to use it

### Step 1: Execute Payload Extraction
Run the TypeScript extractor script from the workspace directory:

```bash
cd trujillo-y-asociados && pnpm run extract-seo-payload

```

### Step 2: Parse stdout Output

The script outputs a compact JSON array directly to `stdout`. Do not read raw files in `./dist/*.html` manually; treat the script output as the single source of truth for rendered DOM state.

> [!WARNING]
> If the `extract-seo-payload.ts` script crashes (e.g. throws a TypeScript error, malformed HTML error, or returns a non-zero exit code), you MUST catch the crash and report it back to the parent agent as a schema parse failure. Do not halt silently or hallucinate results.

### Step 3: Verified Output Contract

The returned JSON payload conforms to the following schema per route (`/`, `/contacto`, `/corporate-advisory`, `/workers-advisory`, `/firm`):

```typescript
interface RouteSeoPayload {
  route: string;            // e.g. "/corporate-advisory"
  filePath: string;         // Absolute path in dist/
  title: string;            // Document <title>
  description: string;      // Meta description content
  canonical: string;        // Canonical URL target
  headings: {
    level: "H1" | "H2" | "H3";
    text: string;
  }[];
  jsonLd: Record<string, unknown>[]; // Parsed JSON-LD schemas
  cleanText: string;        // Main body copy (capped for token economy)
}

```