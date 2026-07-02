### 3. `PracticeAreas.astro.md`

```markdown
# Component Specification: PracticeAreas.astro

## Objective
Render the core services/conflict resolution list under the header "Areas de resolución y prevención de conflictos".

## Architecture & Performance
- **Type**: Pure Astro Component.
- **SEO**: Use an `<article>` or ordered `<section>` elements with semantic `<h2>` and `<h3>` tags to map out the legal services hierarchically.
- **Lazy Loading**: Set `loading="lazy"` on the accent coin icon decoration.

## Component Location
`src/features/landing/components/PracticeAreas.astro`

## Properties (TypeScript Interface)
```typescript
export interface AreaItem {
  title: string;
  description: string;
}
```

Structural Schema (HTML)


```html

<section class="bg-[#C2BAAA] text-[#3D1411] py-16 px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
  <div class="md:col-span-1 flex flex-col gap-4">
    <img src="/assets/coin-icon.png" alt="T&A Emblem" class="w-24 h-24 object-contain" loading="lazy" />
    <h2 class="text-3xl font-serif leading-tight">
      Areas de resolución y prevención de conflictos
    </h2>
    <p class="text-sm opacity-80">Soluciones prácticas para trabajadores y empleadores</p>
  </div>

  <div class="md:col-span-3 divide-y divide-[#3D1411]/30">
    <div class="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
      <div class="md:col-span-1 flex gap-2 items-center">
        <span class="w-2 h-2 bg-[#3D1411] block"></span>
        <h3 class="text-lg font-medium">Demandas por despido injustificado</h3>
      </div>
      <p class="md:col-span-2 text-sm leading-relaxed opacity-90">
        Asesoría para exigir la indemnización constitucional (3 meses de salario), prima de antigüedad y salarios vencidos.
      </p>
    </div>
    
    </div>
</section>

```
