# Component Specification: ConsultationInfo.astro

## Objective
Render the upper informational contact block ("Initiate Your Consultation") displaying contextual copy on the left and a three-column card setup for location, lines, and availability on the right.

## Architecture & Performance
- **Type**: Pure Astro Component (Static SSR, Zero-JS footprint).
- **SEO & Semantics**: Use `<section>` as the root wrapper and semantic `<address>` tags inside the structural cards to optimize local SEO indexing.

## Component Location
`src/features/contact/components/ConsultationInfo.astro`

## Properties (TypeScript Interface)
```typescript
export interface InfoCard {
  title: string;
  lines: string[];
}

export interface Props {
  cards?: InfoCard[];
}

```

## Structural Schema (HTML + Scoped CSS)

```html
---
import type { InfoCard } from '../types';

const defaultCards: InfoCard[] = [
  {
    title: "Oficina (placeholder)",
    lines: ["C. Guaymas 8–Interior 401, Roma Nte.", "Cuauhtémoc, 06700 Ciudad de México, CDMX"]
  },
  {
    title: "Direct Lines",
    lines: ["123-45-6789", "info@mysite.com"]
  },
  {
    title: "Availability",
    lines: ["Monday — Friday", "09:00 — 18:00 GMT"]
  }
];

const { cards = defaultCards } = Astro.props;
---

<section class="consultation-info-section">
  <div class="section-container">
    
    <!-- Title Wrapper Layout Matrix -->
    <div class="title-row">
      <p class="sidebar-text">Reach out for confidential and comprehensive legal support.</p>
      <h2 class="main-title">Initiate Your Consultation</h2>
    </div>

    <!-- Cards Display Framework -->
    <div class="cards-grid">
      {cards.map((card) => (
        <div class="info-card">
          <h3 class="card-title">{card.title}</h3>
          <div class="card-content">
            {card.title === "Oficina (placeholder)" ? (
              <address class="address-block">
                {card.lines.map((line) => <span>{line}</span>)}
              </address>
            ) : (
              card.lines.map((line) => <span>{line}</span>)
            )}
          </div>
        </div>
      ))}
    </div>

  </div>
</section>

<style>
  .consultation-info-section {
    background-color: #C2BAAA;
    padding: 60px 24px;
    width: 100%;
    color: #3D1411;
    box-sizing: border-box;
  }

  .section-container {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .title-row {
    display: flex;
    flex-direction: column-reverse;
    gap: 16px;
  }

  .sidebar-text {
    font-family: sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    max-width: 280px;
    margin: 0;
  }

  .main-title {
    font-family: serif;
    font-size: 2.5rem;
    line-height: 1.1;
    margin: 0;
    font-weight: 400;
  }

  .cards-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .info-card {
    background-color: #FFFDFB;
    padding: 24px;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .card-title {
    font-family: sans-serif;
    font-size: 0.875rem;
    color: rgba(61, 20, 17, 0.7);
    margin: 0;
    font-weight: 400;
  }

  .card-content {
    font-family: sans-serif;
    font-size: 1.1rem;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
  }

  .address-block {
    font-style: normal;
    display: flex;
    flex-direction: column;
  }

  /* Desktop Responsive Configuration */
  @media (min-width: 768px) {
    .title-row {
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: 32px;
      align-items: flex-end;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: 16px;
    }

    .cards-grid > :nth-child(1) {
      grid-column: 2;
    }

    /* Target inner wrapper to achieve visual lining up with headers */
    .section-container {
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: 0px 32px;
    }

    .title-row {
      grid-column: span 2;
      display: grid;
      grid-template-columns: 1fr 3fr;
    }

    .cards-grid {
      grid-column: 2;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }
  }
</style>

```
