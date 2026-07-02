# Component Specification: WorkProcess.astro

## Objective
Present the 3-step structured engagement lifecycle ("Nuestro proceso de trabajo") along with contextual imagery.

## Architecture & Performance
- **Type**: Pure Astro Component.
- **Image Optimization**: Use the native `<picture>` tag or Astro's `<Image />` component with fixed widths/heights to avoid layout shifts (CLS). Set `loading="lazy"` as this sits further down the viewport page-flow.

## Component Location
`src/features/landing/components/WorkProcess.astro`

## Structural Schema (HTML)
```html
<section class="bg-[#C2BAAA] text-[#3D1411] py-16 px-8">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-[#3D1411]/20 pb-6">
      <div>
        <h2 class="text-4xl font-serif">Nuestro proceso de trabajo</h2>
        <p class="text-lg italic opacity-80 mt-1">Método simple y claro.</p>
      </div>
      <a href="#nosotros" class="bg-[#3D1411] text-[#EADCC9] px-6 py-3 flex items-center gap-4 hover:bg-black transition-colors text-sm font-medium mt-4 md:mt-0">
        <span>Sobre Nosotros</span>
        <span>↗</span>
      </a>
    </div>

    <div class="flex flex-col gap-4">
      <div class="bg-[#FFFDFB] p-4 grid grid-cols-1 md:grid-cols-4 gap-6 items-center border border-gray-200">
        <div class="md:col-span-1 h-32 w-full overflow-hidden">
          <img src="/assets/process-diagnostico.jpg" alt="Diagnóstico stage representation" class="w-full h-full object-cover" loading="lazy" />
        </div>
        <div class="md:col-span-1">
          <h3 class="text-xl font-medium">Diagnóstico</h3>
          <p class="text-sm italic text-gray-500">Situación inicial</p>
        </div>
        <div class="md:col-span-2 text-sm text-gray-700 leading-relaxed">
          Revisamos su situación y documentación relevante para identificar riesgos y oportunidades con precisión.
        </div>
      </div>

      </div>
  </div>
</section>

```
