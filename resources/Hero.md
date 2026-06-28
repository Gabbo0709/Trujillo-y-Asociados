# Component Specification: Hero.astro

## Objective
Render the primary hero section comprising the branding imagery, Latin motto box, and core value proposition ("Asesoría en Derecho Laboral").

## Architecture & Performance
- **Type**: Pure Astro Component.
- **LCP Optimization**: The main coin graphic and background library images are critical for Largest Contentful Paint. Use `loading="eager"` and `fetchpriority="high"` for these assets. Do not lazy-load.

## Component Location
`src/features/landing/components/Hero.astro`

## Structural Schema (HTML)
```html
<section class="w-full">
  <div class="relative min-h-[400px] bg-cover bg-center" style="background-image: url('/assets/library-bg.jpg');">
    <div class="absolute inset-0 flex justify-center items-end pb-8">
      <div class="bg-amber-100/10 backdrop-blur-sm p-4 border border-amber-900/30 text-center rounded">
        <p class="font-serif italic text-lg text-amber-900">DIGNITAS VIRI IN OPERE EIUS APPARET</p>
      </div>
    </div>
  </div>

  <div class="bg-[#3D1411] text-[#EADCC9] grid grid-cols-1 md:grid-cols-4 px-8 py-12 border-t border-[#EADCC9]/20">
    <div class="md:col-span-3">
      <div class="flex items-center gap-3 mb-2">
        <h1 class="text-4xl md:text-6xl font-sans font-light tracking-tight">
          Asesoría en Derecho Laboral
        </h1>
        <span class="bg-[#EADCC9] text-[#3D1411] text-xs font-bold px-2 py-1 uppercase tracking-widest rounded">
          CDMX
        </span>
      </div>
    </div>
    
    <div class="border-l border-[#EADCC9]/20 pl-6 flex flex-col justify-between">
      <p class="italic text-sm font-light mb-4">Evaluación gratuita a su caso.</p>
      <a href="#consulta" class="flex items-center justify-between group bg-[#EADCC9] text-[#3D1411] p-4 font-medium transition-all hover:bg-white">
        <span>Agendar una Consulta</span>
        <span class="text-xl group-hover:translate-x-1 transition-transform">↗</span>
      </a>
    </div>
  </div>
</section>
```