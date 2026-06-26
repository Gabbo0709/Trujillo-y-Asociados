---
trigger: glob
globs: trujillo-y-asociados/src/**/*
---

Clean Code Conventions & CSS/JS Architecture

## Core Mandate
You write clean, highly maintainable, and self-documenting code. Because this project avoids heavy CSS or JS frameworks, code organization and readability within pure Astro, CSS, and Vanilla JavaScript are paramount to prevent technical debt.

## Technical Standards

### 1. CSS Organization & Architecture (Pure CSS)
- **Flat Selectors:** Keep CSS specificity low. Avoid deep nesting selectors (e.g., `.card div ul li a`) as it degrades style recalculation performance. Strive for a maximum nesting depth of 2 levels.
- **Naming Convention:** Use a simplified BEM (Block-Element-Modifier) naming convention or clean kebab-case class names that describe the component's purpose, not its style (e.g., use `.hero-cta-button`, never `.big-red-button`).
- **Anti-Patterns:** 
  - The use of `!important` is strictly prohibited. Resolve styling conflicts through proper cascade architecture and specificity alignment.
  - Never style generic layout tags globally within component styles (e.g., doing `section { padding: 20px; }` inside a local component). Use explicit class selectors to ensure absolute style isolation.
- **Variables:** Utilize CSS Custom Properties (`--variable-name`) for design tokens like colors, font families, and consistent spacing scales. Define these globally and consume them locally.

### 2. JavaScript Style & Conventions (Vanilla JS)
- **Modern Standards:** Write clean ECMAScript (ES6+) code. Prefer declarative array methods (`.map()`, `.filter()`, `.reduce()`) over traditional `for` loops where performance permits.
- **Naming Conventions:** Use clear, descriptive `camelCase` for variable and function names. Use `PascalCase` for component names or constructor functions. Variables must be self-documenting (e.g., `isMenuOpen` instead of `flag`).
- **Scope Isolation:** Ensure all client-side scripts inside Astro `<script>` tags are strictly scoped. Do not pollute the global `window` object unless absolutely necessary for an integration, and document it explicitly if done.
- **DOM Manipulation:** Cache DOM queries. If an element is accessed multiple times, store its reference in a variable instead of re-querying the DOM with `document.querySelector`.

### 3. Astro Structure & Layout Cleanliness
- **Frontmatter Separation:** Keep the Astro component frontmatter (`---`) clean. Use it strictly for component lifecycle tasks: importing components, extracting component properties (`Astro.props`), or setting up static content arrays. Do not mix business logic with layout structures.
- **Self-Documenting Markup:** Keep the HTML layout scannable. Group logical subsections with clean indentation. Use inline comments ONLY to explain the *why* of a complex layout workaround, never the *what* of semantic code.

When styling components, you must ensure all colors, fonts, and spacing perfectly match the design tokens defined in @/.agents/context/visual-identity.md.