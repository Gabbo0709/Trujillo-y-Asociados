# Component Specification: FirmPhilosophy.astro

## Objective
Render the institutional philosophy section featuring the partners' corporate portrait on the left and core mission statement text on the right.

## Architecture & Performance
- **Type**: Pure Astro Component (Static SSR, Zero-JS client-side footprint).
- **SEO**: Wraps narrative in a semantic `<section>` block using an asynchronous layout layout engine.
- **Images**: Enforce `loading="lazy"` and explicit aspect-ratio handling to avoid cumulative layout shifts (CLS).

## Component Location
`src/features/firm/components/FirmPhilosophy.astro`

## Structural Schema (HTML + Scoped CSS)
```html
<section class="philosophy-section">
  <div class="container">
    <!-- Left Column: Partners Portrait Image -->
    <div class="image-container">
      <img 
        src="/assets/partners-portrait.jpg" 
        alt="Socios fundadores de Trujillo & Asociados" 
        class="portrait-img"
        loading="lazy"
        decoding="async"
      />
    </div>

    <!-- Right Column: Content Strategy Block -->
    <div class="content-container">
      <h2 class="section-title">Defensa digna, labor de herencia.</h2>
      
      <p class="philosophy-text">
        <strong>Nuestra filosofía</strong> es que el derecho laboral no solo trata del "empleo" actual, sino que protege la labor de una vida, que es la herencia económica y la dignidad que un trabajador crea para sí mismo y su familia. Creamos defensa de ese legado. <strong>No defendemos lo que se ha perdido sino lo que hasta ahora ha construido.</strong> Nuestro trato es humano y no solo transaccional, buscamos entender desde el minuto 1 la situación que transitan los interesados a nuestros servicios.
      </p>
    </div>
  </div>
</section>

<style>
  .philosophy-section {
    background-color: #C2BAAA;
    padding: 60px 24px;
    width: 100%;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .image-container {
    width: 100%;
    border: 8px solid #3D1411;
    box-sizing: border-box;
    overflow: hidden;
  }

  .portrait-img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #3D1411;
  }

  .section-title {
    font-family: serif;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 24px 0;
  }

  .philosophy-text {
    font-family: sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
  }

  /* Desktop Viewport Configuration */
  @media (min-width: 992px) {
    .container {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 48px;
      align-items: stretch;
    }

    .section-title {
      font-size: 2.5rem;
    }

    .content-container {
      padding-bottom: 24px;
    }
  }
</style>
