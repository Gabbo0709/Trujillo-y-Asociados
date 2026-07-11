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
---
interface StatMetric {
  value: string;
  label: string;
  description: string;
}

interface Props {
  metrics?: StatMetric[];
}

const defaultMetrics: StatMetric[] = [
  {
    value: "30+",
    label: "Años de experiencia",
    description: "Con los años, la firma evolucionó hasta ser un pilar del derecho laboral mexicano, reconocida por su asesoría preventiva, alta capacidad de litigio y trato humano con el cliente."
  },
  {
    value: "95%",
    label: "Casos de éxito",
    description: "Nuestra dedicación y enfoque estratégico garantizan la mejor defensa y soluciones favorables para los derechos de los trabajadores."
  },
  {
    value: "10k+",
    label: "Asesorías brindadas",
    description: "Ofrecemos orientación legal directa y honesta para guiar sus decisiones y construir un camino claro hacia la resolución de su caso."
  }
];

const { metrics = defaultMetrics } = Astro.props;
---

<section class="stats-section">
  <!-- Slogan Column -->
  <header class="stats-header">
    <h2 class="stats-title">
      Defensa digna, labor de herencia.
    </h2>
  </header>

  <!-- Metrics Grid -->
  <section class="stats-metrics-list" aria-label="Métricas de éxito de la firma">
    {metrics.map((metric) => (
      <article class="stat-card">
        <header class="stat-card-header">
          <span class="stat-value">{metric.value}</span>
          <h3 class="stat-label">{metric.label}</h3>
        </header>
        <p class="stat-description">{metric.description}</p>
      </article>
    ))}
  </section>
</section>

<style>
  .stats-section {
    background-color: hsl(var(--color-brand-primary));
    color: hsl(var(--color-brand-secondary));
    padding-inline: max(var(--space-6), calc((100% - var(--max-width-landing)) / 2 + var(--space-6)));
    padding-block: var(--space-16);
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  @media (min-width: 768px) {
    .stats-section {
      grid-template-columns: 1fr 3fr;
      gap: var(--space-12);
      align-items: start;
    }
  }

  /* Title Column */
  .stats-header {
    display: flex;
    flex-direction: column;
  }

  .stats-title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    line-height: 1.25;
    margin: 0;
    color: hsl(var(--color-brand-secondary));
  }

  @media (min-width: 768px) {
    .stats-title {
      font-size: var(--text-4xl);
    }
  }

  /* Metrics List Grid */
  .stats-metrics-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  @media (min-width: 768px) {
    .stats-metrics-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Card Styles */
  .stat-card {
    background-color: var(--color-bg-surface);
    color: var(--color-text-body);
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 250px;
    border-radius: var(--radius-brand);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  }

  .stat-card-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .stat-value {
    font-family: var(--font-sans);
    font-size: var(--text-4xl);
    font-weight: 300;
    color: hsl(var(--color-brand-primary));
    line-height: 1.1;
  }

  .stat-label {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: var(--font-weight-bold);
    color: hsl(var(--color-brand-primary));
    margin: 0;
  }

  .stat-description {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    line-height: 1.6;
    color: var(--color-text-body);
    margin: 0;
  }
</style>
````
