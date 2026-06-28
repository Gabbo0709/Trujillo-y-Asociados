---
description: A 6-phase iterative workflow to receive mockup text, plan SEO keyword integration, validate structure, generate Astro v6.3.7 components, and enforce brand tokens.
---

# Workflow: Build Landing Page Module from Mockup
Command: /build-module

## Step 1: Retrospective & Style Initialization
- Before analyzing any layout, read the dynamic memory file located at `@/.agents/memory/lessons-learned.md`.
- Read the brand tokens and design guidelines inside `@/.agents/context/visual-identity.md` to keep colors and typography (Gambetta and Roboto Serif) fresh in context.

## Step 2: Input & SEO Keyword Mapping
- Ask the user to provide the curated text and structural breakdown of the mockup module if they haven't pasted it yet.
- Activate the `seo-copywriting` skill.
- Analyze the provided text from the mockup to define 1 primary keyword and 2-3 secondary semantic keywords that match the section's intent without changing the core messaging.
- Create a markdown layout plan mapping the mockup text directly to semantic HTML elements (`<section>`, `<article>`, `<h2>`, etc.).

## Step 3: Blueprint Presentation (Feedback Gate 1)
- Present the keyword strategy and the structural HTML mapping to the user.
- **HALT EXECUTION.** Explicitly ask the user for feedback or confirmation.
- **DO NOT** generate any code or create `.astro` files until the user gives explicit authorization to proceed.

## Step 4: Critique & Memory Update (Conditional)
- If the user rejects the layout plan or introduces heavy corrections to how the text or style should be managed:
  1. Update the implementation plan immediately.
  2. Write the rejected pattern and the new rule to `@/.agents/memory/lessons-learned.md` to ensure the mistake is not repeated.
  3. Re-submit the plan for approval.

## Step 5: Semantic Coding (Astro v6.3.7 Execution)
- Once the blueprint is approved, activate the `astro-component-builder` skill.
- Generate the isolated component inside `src/components/`.
- Apply pure CSS inside scoped `<style>` tags using the exact variables from `@/.agents/context/visual-identity.md` (e.g., `--color-terracota-legal`, `--color-capuchino-white`).
- Strictly enforce the `@/.agents/rules/semantic-html-writing.md` constraint (zero un-semantic `<div>` layout wrappers).

## Step 6: Code Quality & Lighthouse Checklist
- Cross-reference the generated code against `@/.agents/rules/lighthouse-core-vitals.md` and `@/.agents/rules/clean-code-conventions.md`.
- Ensure all images use Astro's `<Image />` component with fixed dimensions, and all text scales respect the typography hierarchy.
- Present the final component code to the user.