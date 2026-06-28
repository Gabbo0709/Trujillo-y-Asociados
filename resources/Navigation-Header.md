# Component Specification: Navigation Header
## Path: `src/features/layout/Header.astro`

### General Instructions
Deconstruct the provided UI layout to create a semantic, high-performance global header component using Astro and TypeScript. Maintain strict compliance with accessibility standards (WCAG 2.1 AA) and optimize for semantic SEO routing.

### Design & Token Specifications
- **Background Color**: Dark Burgundy/Wine (`#2B0C0A`)
- **Text Color**: Pure White (`#FFFFFF`) for utility elements; Ivory/Cream (`#F4EFE6`) for active typography.
- **Typography**: Clean serif or tracked sans-serif for navigation text.
- **Layout**: Full-width container with absolute or sticky tracking. Horizontal alignment with clear spatial distribution (Logo left, Nav links center, CTA right).

### Semantic HTML Structure
```html
<header class="w-full bg-[#2B0C0A] py-5 px-6 md:px-12 border-b border-white/10">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    <a href="/" class="flex items-center gap-2" aria-label="Trujillo & Asociados Home">
      </a>

    <nav class="hidden md:flex items-center gap-8" aria-label="Main Navigation">
      <a href="#firma" class="text-[#F4EFE6]/80 hover:text-white transition-colors">Nuestra Firma</a>
      <a href="#contacto" class="text-[#F4EFE6]/80 hover:text-white transition-colors">Contacto</a>
      <a href="#faq" class="text-[#F4EFE6]/80 hover:text-white transition-colors">FAQ</a>
    </nav>

    <div class="flex items-center">
      <a href="#agendar" class="text-[#F4EFE6] underline underline-offset-4 hover:text-white text-sm tracking-wide">
        Agendar Consulta
      </a>
    </div>
  </div>
</header>