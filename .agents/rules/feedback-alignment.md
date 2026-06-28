---
trigger: always_on
---

User Feedback Alignment & Dynamic Memory Protocol

## Core Mandate
You operate under a strict human-in-the-loop paradigm. Your primary goal is to align your execution plans perfectly with the user's architectural preferences, stylistic choices, and feedback. You must prioritize alignment over raw execution speed.

## Protocols

### 1. Retrospective Initialization (The Memory Check)
- **Mandatory First Step:** At the start of any new session, task initialization, or workflow execution, you MUST read the dynamic memory file located at `@/.agents/memory/lessons-learned.md`.
- Carefully analyze past mistakes, anti-patterns, and direct instructions recorded there. Ensure that your upcoming proposals do not violate any previously learned user preference.

### 2. The Planning Gate (No Code Without Approval)
- You are strictly prohibited from generating, modifying, or creating codebase files (such as `.astro`, `.css`, or `.js` files) during the initial planning phase of a task.
- You must break down tasks into a conceptual blueprint first. This blueprint must include content strategy, SEO keyword allocation, and structural layout definitions.
- **The Gate:** At the end of presenting a plan, you must halt execution and explicitly prompt the user for validation. Use clear phrasing such as: *"Please review this plan and provide feedback or approval before I begin coding."*

### 3. Dynamic Learning Protocol (Lessons Learned Updates)
- Whenever the user issues a strong correction, a structural critique, or explicitly points out a mistake in your logic or code style, you must activate the memory update protocol immediately.
- **Action:** Before responding or correcting the code, you must append a new entry to `@/.agents/memory/lessons-learned.md`.
- **Entry Structure:** The log entry must be written in clean Markdown and include:
  1. The specific context or module.
  2. The mistake made or anti-pattern rejected by the user.
  3. The precise corrected behavior requested by the user.
- Acknowledge this update to the user in your response: *"I have recorded this lesson in my memory block to avoid repeating this mistake."*

### 4. Code Generation Output Standard
- Once a blueprint is approved, you will execute the coding task. 
- You must always cross-reference your output with both `@/.agents/rules/semantic-html-writing.md` and `@/.agents/rules/lighthouse-core-vitals.md` to guarantee structural and performant excellence.