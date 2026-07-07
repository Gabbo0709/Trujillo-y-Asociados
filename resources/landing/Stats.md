# Component Specification: Stats.astro

## Objective
Render a high-impact statistics panel ("Defensa digna, labor de herencia") showcasing the firm's track record with grid cards.

## Architecture & Performance
- **Type**: Pure Astro Component (Static layout, no hydration required).
- **SEO**: Wrap numerical data in semantic text tags. Avoid canvas/JS-based counter animations unless triggered via CSS transitions to preserve Core Web Vitals.

## Component Location
`src/features/landing/components/Stats.astro`

## Properties (TypeScript Interface)
```typescript
export interface StatMetric {
  value: string;
  label: string;
  description: string;
}

export interface Props {
  metrics?: StatMetric[];
}

```

## Structural Schema (HTML)

```html
<section class="bg-[#3D1411] text-[#EADCC9] py-16 px-8">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    <div class="md:col-span-1">
      <h2 class="text-3xl md:text-4xl font-serif leading-tight">
        Defensa digna, labor de herencia.
      </h2>
    </div>

    <!-- Render one card per metric (e.g., `metrics.map(...)`) -->
    <div class="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-[#FFFDFB] text-[#3D1411] p-6 flex flex-col justify-between min-h-[250px]">
        <div>
          <span class="text-4xl font-light block mb-4 font-sans">30+</span>
          <h3 class="text-lg font-medium leading-snug mb-2">Años de experiencia</h3>
        </div>
        <p class="text-xs text-gray-700 leading-relaxed">
          Con los años, la firma evolucionó hasta ser un pilar del derecho laboral mexicano, reconocida por su asesoría preventiva, alta capacidad de litigio y trato humano con el cliente.
        </p>
      </div>
      
      </div>
  </div>
</section>

```
