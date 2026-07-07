# Component Specification: Footer.astro

## Objective
Implement the comprehensive semantic webpage footer layout, embedding institutional mapping parameters, location markers, legal notices, and compliance tags.

## Architecture & Performance
- **Type**: Pure Astro Component.
- **SEO**: Explicit anchor linking structure mapping external networks (LinkedIn, Facebook). Include structured addresses formatted through standard microdata schema parameters if required.

## Component Location
`src/features/landing/components/Footer.astro`

## Structural Schema (HTML)
```html
<footer class="bg-[#3D1411] text-[#EADCC9] pt-16 pb-6 px-8 border-t border-[#EADCC9]/10">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
    <div class="md:col-span-4 flex flex-col justify-between gap-6">
      <div class="text-5xl font-serif font-bold tracking-tight text-[#EADCC9]">
        Trujillo <br/> <span class="text-3xl font-light font-sans">& Asociados</span>
      </div>
      <div>
        <p class="text-xs opacity-60">© 2035 Fidem Valorem Legal. Powered and secured by Wix.</p>
      </div>
    </div>

    <div class="md:col-span-4 flex flex-col justify-between gap-4">
      <p class="text-lg font-serif leading-snug">
        Asesoramiento legal experto para la compleja y exigente normativa <strong class="block mt-1 font-bold">Ley Federal del Trabajo</strong>
      </p>
      <div class="grid grid-cols-2 gap-2 text-xs opacity-80 pt-4">
        <a href="#firma" class="hover:underline">Nuestra Firma</a>
        <a href="#contacto" class="hover:underline">Contacto</a>
        <a href="#faq" class="hover:underline">FAQ</a>
        <a href="#privacy" class="hover:underline">Privacy Policy</a>
        <a href="#accessibility" class="hover:underline">Accessibility Statement</a>
      </div>
    </div>

    <div class="md:col-span-4 flex flex-col justify-between items-start md:items-end text-left md:text-right gap-6">
      <address class="not-italic text-xs leading-relaxed opacity-90 max-w-xs">
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" class="hover:underline">
          C. Guaymas 8–Interior 401, Roma Nte.<br/>
          Cuauhtémoc, 06700 Ciudad de México, CDMX
        </a>
      </address>
      <div class="text-xs">
        <a href="mailto:despachotrujilloyasociados@gmail.com" class="hover:underline block mb-3">
          despachotrujilloyasociados@gmail.com
        </a>
        <div class="flex gap-4 md:justify-end opacity-80">
          <a href="#linkedin" class="hover:underline">LinkedIn</a>
          <a href="#facebook" class="hover:underline">Facebook</a>
        </div>
      </div>
    </div>
  </div>
</footer>

```
