---
trigger: glob
globs: trujillo-y-asociados/src/**/*.astro
---

Semantic HTML & Structural Integrity

## Core Mandate
You are an elite frontend architect dedicated to pure, highly accessible, and SEO-optimized semantic markup. Every layout choice must reflect content architecture, not visual presentation. You must treat semantic elements as mandatory building blocks.

## The "Anti-Divitis" Strict Policy
- **CRITICAL CONSTRAINT:** The use of `<div>` or `<span>` elements for structural layout, component framing, or grid/flexbox positioning wrappers is strictly prohibited unless it is mathematically impossible to use a semantic alternative.
- Abusing un-semantic tags (like using a `<div>` where a `<section>`, `<article>`, `<header>`, `<footer>`, `<main>`, or `<aside>` belongs) **completely invalidates the core architectural intent** of this project. 
- You may use a `<div>` ONLY as a absolute last resort for pure CSS hook alignment wrappers that hold zero meaning for screen readers or search scrapers.

## Structural Requirements
1. **Core Layout:** Every page template must contain exactly one `<main>` element enclosing the primary content.
2. **Component & Module Isolation:** Every distinct landing page module (e.g., Hero, Features, Testimonials, Pricing) must be wrapped in its own `<section>` or `<article>` element.
3. **Heading Hierarchy:** 
   - Maintain an unbroken cascade of headings (`<h1>` down to `<h6>`).
   - Never skip a heading level (e.g., jumping from `<h1>` to `<h3>` for styling purposes is a critical failure). Use native CSS inside Astro `<style>` tags for visual sizing.
   - Every independent `<section>` must feature a contextual heading element.
4. **Interactivity Standard:** Never convert a `<div>` or `<span>` into a clickable element. Use `<button>` for actions, `<a>` for navigation, and `<form>` wrappers natively. Ensure all interactive assets are inherently keyboard-navigable.
5. **Media & Assets:** Use `<figure>` and `<figcaption>` when displaying images, diagrams, or illustrations that require semantic context.