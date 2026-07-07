# Component Specification: Testimonials.astro

## Objective
Render a clean, block-styled customer review slider or marquee showcase area ("Experiencia del cliente").

## Architecture & Performance
- **Type**: Pure Astro Component. 
- **Hydration Note**: If an active slider carousel animation is explicitly demanded later, swap to a lightweight native Swiper library or standard HTML Scroll-Snap CSS properties instead of heavy JS. Default to standard semantic static block layout rows.

## Component Location
`src/features/landing/components/Testimonials.astro`

## Structural Schema (HTML)
```html
<section class="bg-[#EADCC9] text-[#3D1411] py-16 px-8">
  <div class="max-w-7xl mx-auto">
    <div class="w-full h-16 bg-[url('/assets/pattern-interlocking.svg')] bg-repeat-x opacity-60 mb-10"></div>

    <h2 class="text-3xl font-serif mb-12">Experiencia del cliente</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Repeat this testimonial card block for each testimonial (3 total on desktop) -->
      <div class="flex flex-col justify-between">
        <blockquote class="text-sm italic font-light leading-relaxed mb-6">
          "(Testimonio placeholder) La asesoría de Trujillo &amp; Asociados fue decisiva para resolver nuestro caso con claridad y confianza."
        </blockquote>
        <cite class="not-italic text-xs font-medium tracking-wide opacity-80 block">
          Lenaic Duval / <span class="uppercase">CEO</span>
        </cite>
      </div>

      </div>
  </div>
</section>

```
