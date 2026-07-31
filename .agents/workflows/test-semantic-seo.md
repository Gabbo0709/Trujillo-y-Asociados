---
description: Orchestrates automated static type checking, HTML5 validation, link crawling, legal schema auditing, and LLM semantic evaluation for `Trujillo & Asociados`.
---

Semantic SEO & Architectural 

---

## Workspace Context
- **Target Project:** `trujillo-y-asociados`
- **Target Static Routes:** `/`, `/contacto`, `/corporate-advisory`, `/workers-advisory`, `/firm`
- **QA Stack:** `@astrojs/check`, `vitest`, `html-validate`, `linkinator`
- **Rules Enforced:** `.agents/rules/astro-seo-conventions.md`, `.agents/rules/schema-org-standards.md`

---

## Step 1: Pre-Audit Environment Check
Before invoking subagents, verify local project status.

1. Ensure the current working directory is or includes `trujillo-y-asociados/`.
2. Verify that `package.json` contains scripts for `check`, `test`, `build`, `test:html`, `test:links`, and `extract-seo-payload`.

---

## Step 2: Static Quality Assurance Gate
Delegate static verification to the dedicated `static-qa-agent` to avoid context window inflation.

1. Spawn the `static-qa-agent` (`.agents/agents/static-qa-agent.md`) using `invoke_subagent`.
2. Request execution of the full QA suite (`skills/run-qa-suite`).
3. **Decision Gate:**
   - Wait for `static-qa-agent` to finish.
   - **If Status === FAILED:** Stop workflow execution immediately. Output the critical errors (TypeScript errors, broken links, unclosed HTML tags, missing `<h1>`) to the user. Ask if they want to apply automated Astro component patches before proceeding.
   - **If Status === PASSED:** Proceed to Step 3.

---

## Step 3: Semantic SEO & Legal Schema Audit
Delegate deep LLM semantic and structured data analysis to `semantic-seo-agent`.

1. Spawn the `semantic-seo-agent` (`.agents/agents/semantic-seo-agent.md`) using `invoke_subagent`.
2. The subagent will execute `skills/parse-dist-html` to receive the clean JSON payload from `extract-seo-payload.ts`.
3. The subagent will evaluate:
   - **Legal Entity Gap Analysis:** Practice area coverage (*Asesoría Corporativa*, *Derecho Laboral*, *Cumplimiento*, *Litigio*).
   - **Schema.org Integrity:** Dynamic domain checks (`Astro.site` / `Astro.url`), required `LegalService` properties, and **Zero Mismatch Rule** (matching visible text to JSON-LD).
   - **AI Search Readiness:** Presence and quality of `public/llms.txt`.

---

## Step 4: Final Synthesis & Scorecard Generation
Combine findings from `static-qa-agent` and `semantic-seo-agent` into a unified Markdown scorecard outputted directly in the primary conversation thread:

```markdown
# 🛡️ SEO & Quality Assurance Audit Scorecard
**Target Project:** `Trujillo & Asociados` | **Status:** [PASSED / ACTION_REQUIRED]

## 1. Executive Summary
- **Overall Score:** [0–100]
- **Static QA Pipeline:** PASSED / FAILED
- **Semantic Coverage:** OPTIMAL / NEEDS_IMPROVEMENT

---

## 2. Static Analysis Matrix
| Audit Category | Engine | Status | Key Findings |
| :--- | :--- | :--- | :--- |
| **Type Safety** | `@astrojs/check` | ✅ / ❌ | X syntax/type errors |
| **Unit Logic** | `vitest` | ✅ / ❌ | X failing assertions |
| **HTML Semantics** | `html-validate` | ✅ / ❌ | X DOM tree errors |
| **Link Integrity** | `linkinator` | ✅ / ❌ | X broken 404 links |

---

## 3. Legal Entity & Search Intent Coverage
- **Corporate Advisory (`/corporate-advisory`):** [Coverage Score %]
  - *Missing Entities:* [e.g., "Cumplimiento Normativo", "Gobierno Corporativo"]
- **Workers Advisory (`/workers-advisory`):** [Coverage Score %]
  - *Missing Entities:* [e.g., "Seguridad Social", "Contratos Individuales"]

---

## 4. Schema.org JSON-LD Compliance
- **Dynamic Domain Resolution (`Astro.site`):** PASSED / FAILED
- **On-Page Synchronization (Zero Mismatch):** PASSED / FAILED
- **Missing Required Schema Properties:** [List if any]

---

## 5. Remediation Plan & Astro Code Patches
[If issues are detected, generate exact Astro code diffs for components in `src/features/seo/` or pages in `src/pages/`]
```