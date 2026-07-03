# Component Specification: SupportAreas.astro

## Objective
Render the distinct client tabular support index section containing localized headers and transactional practice areas detailed breakdown columns.

## Architecture & Performance
- **Type**: Pure Astro Component.
- **Accessibility**: Employs structural standard grid borders acting as horizontal rule breaks instead of extra presentation elements.

## Component Location
`src/features/firm/components/SupportAreas.astro`

## Structural Schema (HTML + Scoped CSS)
```html
<section class="support-areas-section">
  <div class="content-bounds">
    
    <!-- Top Component Grid Layout Header -->
    <div class="header-alignment">
      <h2 class="title-label">Nuestras Áreas de soporte a clientes.</h2>
    </div>

    <!-- Rows Stack Matrix -->
    <div class="tabular-stack">
      
      <!-- List Entry Block -->
      <div class="tabular-row">
        <div class="category-col">
          <h3 class="category-name">Asesoría laboral preventiva (placeholder)</h3>
        </div>
        <div class="description-col">
          <p class="description-text">
            We provide authoritative counsel on domestic and multinational corporate structuring, ensuring long-term tax efficiency while maintaining rigorous compliance with evolving regulatory frameworks and financial optimization mandates.
          </p>
        </div>
      </div>

      <!-- Entry Row: Litigio laboral (placeholder) -->
      <div class="tabular-row">
        <div class="category-col">
          <h3 class="category-name">Litigio laboral (placeholder)</h3>
        </div>
        <div class="description-col">
          <p class="description-text">
            Descripción (placeholder): representación y defensa en litigio laboral conforme a la legislación mexicana.
          </p>
        </div>
      </div>

      <!-- Entry Row: International Tax -->
      <div class="tabular-row">
        <div class="category-col">
          <h3 class="category-name">Asesoría laboral corporativa (placeholder)</h3>
        </div>
        <div class="description-col">
          <p class="description-text">
            Navigating the multifaceted jurisdictional landscape of cross-border transactions and global asset protection for high-net-worth individuals and multinational enterprises seeking expert clarity in complex jurisdictions.
          </p>
        </div>
      </div>

      <!-- Entry Row: Estate & Trust -->
      <div class="tabular-row">
        <div class="category-col">
          <h3 class="category-name">Estate & Trust Tax Strategy</h3>
        </div>
        <div class="description-col">
          <p class="description-text">
            Implementing sophisticated legal frameworks designed to mitigate tax exposure across generations. We specialize in the preservation of capital through intellectually rigorous trust architecture and estate governance.
          </p>
        </div>
      </div>

    </div>

    <!-- Footer Disclaimer Callout Segment -->
    <div class="disclaimer-block">
      <p class="disclaimer-text">
        Trujillo &amp; Asociados opera con estricta confidencialidad. Cada área de práctica es gestionada por counsel líder con amplia experiencia en litigio.
      </p>
    </div>

  </div>
</section>

<style>
  .support-areas-section {
    background-color: #C2BAAA;
    padding: 60px 24px;
    width: 100%;
    color: #3D1411;
  }

  .content-bounds {
    max-width: 1280px;
    margin: 0 auto;
  }

  .header-alignment {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 40px;
  }

  .title-label {
    font-family: serif;
    font-size: 2.5rem;
    line-height: 1.1;
    max-width: 600px;
    margin: 0;
    text-align: right;
  }

  .tabular-stack {
    border-top: 1px solid rgba(61, 20, 17, 0.3);
    margin-bottom: 40px;
  }

  .tabular-row {
    border-bottom: 1px solid rgba(61, 20, 17, 0.3);
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .category-name {
    font-family: serif;
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0;
  }

  .description-text {
    font-family: sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0;
    opacity: 0.9;
  }

  .disclaimer-block {
    background-color: #EADCC9;
    padding: 32px;
    display: flex;
    justify-content: flex-end;
  }

  .disclaimer-text {
    font-family: sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    max-width: 600px;
    margin: 0;
  }

  /* Desktop Fluid Realignment Matrix */
  @media (min-width: 768px) {
    .tabular-row {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 32px;
      padding: 32px 0;
    }
  }
</style>
