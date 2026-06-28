# Brand Visual Identity & Design Tokens

## Brand Identity & Assets
- **Firm Name:** Trujillo & Asociados[cite: 1]
- **Official Slogan:** "DEFENSA DIGNA, LABOR DE HERENCIA."[cite: 1]
- **Logo Style:** Circular legal seal/stamp with an interlocking stylized "T" and "A" monogram in the center[cite: 1].

---

## Color Palette (Mandatory CSS Variables)
Map these exact hex codes to your global CSS stylesheet variables (`:root`) and use them strictly throughout the layout. Do not introduce external color values.

- `--color-capuchino-white`: `#EAE2CC`[cite: 1]  
  *Usage:* Primary background color, light section containers, and clean layouts. Soft on the eyes compared to pure `#FFF`.
  
- `--color-espresso-leve`: `#B6AB91`[cite: 1]  
  *Usage:* Muted secondary accent. Ideal for borders, sub-headings, subtle card strokes, and decorative visual anchors.
  
- `--color-terracota-legal`: `#3F120C`[cite: 1]  
  *Usage:* Primary corporate identity color. Use for key structural headers, accents, strong statements, and primary high-priority boundaries.
  
- `--color-chocolate-alto`: `#3F1F13`[cite: 1]  
  *Usage:* Primary typography color, deep body text, and heavy structural blocks. **CRITICAL:** Use this instead of pure black (`#000`) for all main text to preserve brand harmony and premium contrast.

---

## Typography & Font Hierarchy
To maximize performance and keep Lighthouse metrics at 100%, load fonts efficiently without thread-blocking imports.

- **Title/Heading Font:** `Gambetta` (Serif family)[cite: 1]
  - *Weights available:* Regular, Semibold, Bold[cite: 1].
  - *Application:* `<h1>`, `<h2>`, `<h3>`, and primary hero taglines.
- **Body Font:** `Roboto Serif` (Serif family)
  - *Weights available:* Regular, Medium.
  - *Application:* `<p>`, `<li>`, form labels, and all long-form legal text to maintain a cohesive, prestigious editorial look across the entire page.

---

## Visual & Editorial Tone
- **Atmosphere:** Traditional, prestigious, authoritative, yet structurally modern and transparent.
- **Contrast Check:** When overlaying elements, ensure `--color-chocolate-alto` or `--color-terracota-legal` text sits atop `--color-capuchino-white` backgrounds to guarantee premium AAA accessibility and contrast compliance.