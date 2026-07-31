---
name: run-qa-suite
description: Executes static type checking, Vitest unit tests, SSG production build, HTML5 accessibility linting, and link integrity crawling for trujillo-y-asociados. Use when verifying code correctness, DOM tree semantics, or link health across the project.
---

# Run QA Suite Skill

This skill executes the full, deterministic static analysis pipeline for `trujillo-y-asociados`, catching syntax, type, accessibility, semantic HTML, and link errors before deployment.

## When to use this skill

- Use prior to running semantic LLM evaluations to ensure the build compiles cleanly.
- Use when verifying TypeScript interfaces in `.astro` components (`@astrojs/check`).
- Use when validating compiled HTML5 semantics, heading hierarchy, and ARIA landmarks (`html-validate`).
- Use when checking for dead internal links or broken image source paths (`linkinator`).

## How to use it

Execute the pipeline step-by-step to enforce fail-fast behavior:

### Step 1: Pre-Build Type & Logic Verification
Verify Astro components and unit test logic before compiling:

```bash
cd trujillo-y-asociados && pnpm run check && pnpm run test

```

*If this command fails, halt execution immediately. Do not attempt a production build.*

### Step 2: Distribution Build

Compile static production artifacts into `./dist`:

```bash
cd trujillo-y-asociados && rm -rf dist && pnpm run build

```

### Step 3: Post-Build Semantics & Link Integrity

Lint compiled HTML files and crawl internal references:

```bash
cd trujillo-y-asociados && pnpm run test:html && pnpm run test:links

```

## Failure Categorization & Decision Tree

When evaluating tool execution logs, categorize findings according to this decision tree:

* **Critical Failures (Must Block Pipeline):**
* `@astrojs/check`: Any TypeScript syntax or type error in `.astro` files.
* `html-validate`: Missing or multiple `<h1>` elements, unclosed HTML tags, duplicate IDs.
* `linkinator`: Any `404` status on internal links (`/contacto`, `/corporate-advisory`, etc.) or local assets.
* **Environment Errors**: Command not found (`pnpm`), syntax errors in scripts, or execution timeouts.


* **Warnings (Non-blocking, Report to User):**
* External link rate-limiting or network timeouts during `linkinator` execution.
* Missing secondary ARIA landmark region labels.