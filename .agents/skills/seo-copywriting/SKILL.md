---
name: seo-copywriting
description: Researches target keywords, plans semantic content hierarchies, and drafts high-conversion SEO copywriting for landing page modules before any code implementation begins.
---

# SEO Copywriting & Content Strategy Skill

This skill guides the agent through a structured methodology to analyze search intent, discover optimized keywords, and write high-converting copy tailored for single-page landing architectures.

## When to use this skill

- Use this skill when the user initiates a new landing page module or section (e.g., Hero, Features, Social Proof, CTA).
- Use this when planning content re-writes or optimization of existing on-page copy.
- Activate this skill at the beginning of the content planning phase, strictly before writing any Astro or HTML code.

## How to use it

You must execute this skill across three distinct internal sub-phases and present the consolidated results to the user for explicit verification.

### 1. Keyword Matrix Generation
Analyze the user's requested section theme and establish a definitive SEO footprint:
- **Primary Keyword:** Identify 1 high-intent core keyword that represents the primary search goal for this module.
- **Secondary Keywords:** Extract 2-3 secondary, semantically related long-tail keywords or entities to support the primary topic.
- **Search Intent Alignment:** Explicitly note whether the copy targets commercial, informational, or transactional intent.

### 2. Semantic Mapping & Content Hierarchy
Before drafting actual text, plan how the copy will map to semantic HTML tags to ensure search engines can parse the information perfectly:
- Map the core hook to an `<h1>` (if it's the Hero section) or an `<h2>` (for sub-modules).
- Map secondary selling points to `<h3>` elements.
- Plan supporting details or body descriptions using `<p>`, `<ul>`, or `<ol>` targets.

### 3. High-Conversion Drafting (AIDA/PAS Frameworks)
Draft the copy using established conversion marketing frameworks:
- **PAS (Problem-Agitation-Solution):** Great for features or pain-point sections.
- **AIDA (Attention-Interest-Desire-Action):** Perfect for above-the-fold Hero sections and absolute closing CTAs.
- Ensure all keywords flow naturally within the text. Avoid keyword stuffing. Copy must read as if written by a professional human copywriter.

## Output Format to the User
When presenting the result of this skill, format your response using this clean structure:

```text
### 🎯 SEO Strategy Matrix
- **Primary Keyword:** [Keyword]
- **Secondary Keywords:** [Keyword 1], [Keyword 2]
- **Intent:** [Intent Type]

### 🏗️ Semantic Architecture Plan
- `<h2>` -> [Intent of the heading]
- `<p>` -> [Intent of the body copy]

### 📝 Copywriting Draft
[Insert the actual written copy here, organized by the planned HTML tags]

Stop execution immediately after rendering this output and prompt the user for feedback or approval before proceeding to any code generation tasks.
```