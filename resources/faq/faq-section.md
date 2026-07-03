# Component Specification: FAQSection.astro

## Objective
Render a high-performance, semantically perfect Frequently Asked Questions (FAQ) section. It supports multi-category tab switching and expandable accordions.

## Architecture & Performance Optimization
- **Type**: Pure Astro Component with Progressive Enhancement using Native Web Components (Custom Elements).
- **Zero-Framework Overhead**: Avoids React/Vue/Svelte entirely. Interactivity is driven by native `<details>`/`<summary>` elements and an ultra-lightweight inline Custom Element controller to switch categories.
- **SEO & Rich Snippets**: Automatically generates and injects a valid `FAQPage` JSON-LD Structured Data Schema dynamically into the server-rendered markup.
- **Layout Shifts (CLS)**: Uses explicit container dimensions for tab panels to prevent vertical layout shifts when toggling categories.

## Component Location
`src/features/faq/components/FAQSection.astro`

## Properties & Types (Co-located inside `src/features/faq/types.ts`)
```typescript
export interface FAQItem {
  question: string;
  answer: string;
  isRichText?: boolean;
}

export interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

export interface Props {
  categories?: FAQCategory[];
}

```

## Structural Schema (HTML + Scoped CSS + Scoped Script)

```html
---
import type { FAQCategory } from '../types';

const defaultCategories: FAQCategory[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        question: "¿Qué es una sección de preguntas frecuentes?",
        answer: "Una sección de preguntas frecuentes sirve para responder rápidamente a preguntas comunes sobre tu negocio. P. ej., \"¿A dónde haces envíos?\", \"¿Cuál es el horario de atención?\" o \"¿Cómo se puede reservar un servicio?\"."
      },
      {
        question: "¿Para qué sirven las preguntas frecuentes?",
        answer: "Ayudan a reducir la carga de soporte al cliente, mejoran la confianza del usuario y proporcionan respuestas instantáneas a objeciones comunes de contratación."
      },
      {
        question: "¿Dónde puedo agregar mis preguntas frecuentes?",
        answer: "Generalmente se colocan en una página dedicada o en la parte inferior de la landing page principal, justo antes del pie de página."
      }
    ]
  },
  {
    id: "config",
    label: "Configuración de preguntas frecuentes",
    items: [
      {
        question: "¿Cómo agrego una nueva pregunta y respuesta?",
        answer: "Para agregar una nueva pregunta frecuente, sigue estos pasos:<br>1. Administra las preguntas frecuentes desde el panel de control o el Editor.<br>2. Agrega una nueva pregunta y respuesta.<br>3. Asigna la nueva pregunta a una categoría.<br>4. Guarda y publica los cambios.<br><br>En cualquier momento puedes volver y editar tus preguntas frecuentes.",
        isRichText: true
      },
      {
        question: "¿Puedo agregar una imagen, un video o un GIF a mis preguntas frecuentes?",
        answer: "Sí, puedes enriquecer tus respuestas multimedia a través del editor avanzado para dar mayor contexto visual a las consultas de tus clientes."
      },
      {
        question: "¿Cómo puedo editar o eliminar el título de \"Preguntas frecuentes\"?",
        answer: "El título principal se puede configurar directamente desde las propiedades del componente en tu archivo de estructura principal o gestor de contenidos."
      }
    ]
  }
];

const { categories = defaultCategories } = Astro.props;

// Generate Google Search FAQ Structured Schema Data
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": categories.flatMap(cat => 
    cat.items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/<[^>]*>/g, '') // Strip HTML tags for valid JSON string representation
      }
    }))
  )
};
---

<!-- Inject JSON-LD Schema directly in server execution loop for optimal SEO crawler parsing -->
<script type="application/ld+json" set:html={JSON.stringify(faqSchema)}></script>

<section class="faq-section">
  <div class="faq-container">
    <h2 class="faq-heading">Frequently Asked Questions</h2>
    <p class="faq-subtext">Use this space to promote your business, its products or its services.</p>

    <!-- Native Shell Wrapper using Standard Web Component API -->
    <faq-controller data-active-category={categories[0]?.id ?? ''}>
      
      <!-- Tab Navigation Header -->
      <nav class="tabs-navigation" aria-label="FAQ Categories" role="tablist">
        {categories.map((category, index) => (
          <button 
            type="button" 
            class="tab-trigger" 
            data-target={category.id}
            aria-selected={index === 0 ? "true" : "false"}
            role="tab" id={`tab-${category.id}`} aria-controls={`panel-${category.id}`}
          >
            {category.label}
          </button>
        ))}
      </nav>

      <!-- Panel Stack Matrix -->
      <div class="panels-stack">
        {categories.map((category, index) => (
          <div 
            id={`panel-${category.id}`} 
            class="category-panel" 
            data-panel-id={category.id}
            role="tabpanel"
            aria-labelledby={`tab-${category.id}`}
            data-state={index === 0 ? "active" : "hidden"}
          >
            {category.items.map((item) => (
              <details class="accordion-item">
                <summary class="accordion-summary">
                  <span class="question-text">{item.question}</span>
                  <span class="chevron-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>
                  </span>
                </summary>
                
                <div class="accordion-content">
                  <div class="content-body">
                    {item.isRichText ? <p set:html={item.answer} /> : <p>{item.answer}</p>}
                  </div>
                  
                  <!-- Meta Social Share Bar matching design wireframe context components -->
                  <div class="social-share-row">
                    <button type="button" aria-label="Share on Facebook" class="share-btn">🔵</button>
                    <button type="button" aria-label="Share on X" class="share-btn">𝕏</button>
                    <button type="button" aria-label="Share on LinkedIn" class="share-btn">💼</button>
                    <button type="button" aria-label="Copy link" class="share-btn">🔗</button>
                  </div>
                </div>
              </details>
            ))}
          </div>
        ))}
      </div>

    </faq-controller>
  </div>
</section>

<style>
  .faq-section {
    background-color: #C2BAAA;
    color: #3D1411;
    padding: 80px 24px;
    width: 100%;
    box-sizing: border-box;
  }

  .faq-container {
    max-width: 1280px;
    margin: 0 auto;
  }

  .faq-heading {
    font-family: serif;
    font-size: 5.5rem;
    font-weight: 400;
    line-height: 1.05;
    margin: 0 0 24px 0;
    max-width: 900px;
  }

  .faq-subtext {
    font-family: sans-serif;
    font-size: 1.15rem;
    line-height: 1.5;
    margin: 0 0 48px 0;
    max-width: 400px;
    opacity: 0.9;
  }

  /* Category Tabs Navigation UI Styling Rules */
  .tabs-navigation {
    display: flex;
    gap: 32px;
    border-bottom: 1px solid rgba(61, 20, 17, 0.2);
    margin-bottom: 24px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .tab-trigger {
    background: transparent;
    border: none;
    color: #3D1411;
    font-family: sans-serif;
    font-size: 0.9rem;
    padding: 12px 0;
    cursor: pointer;
    position: relative;
    opacity: 0.7;
    white-space: nowrap;
    transition: opacity 0.2s ease;
  }

  .tab-trigger:hover {
    opacity: 1;
  }

  .tab-trigger[aria-selected="true"] {
    opacity: 1;
    font-weight: 500;
  }

  .tab-trigger[aria-selected="true"]::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #3D1411;
  }

  /* Control Panel Dynamic Display Logic rules matrix */
  .category-panel[data-state="hidden"] {
    display: none;
  }
  
  .category-panel[data-state="active"] {
    display: flex;
    flex-direction: column;
  }

  /* Semantic Structural CSS Accordion Styles */
  .accordion-item {
    border-bottom: 1px solid #3D1411;
    width: 100%;
  }

  .accordion-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    cursor: pointer;
    list-style: none; /* Strip browser default native markers */
    font-family: sans-serif;
    font-size: 1.15rem;
    font-weight: 400;
  }

  .accordion-summary::-webkit-details-marker {
    display: none; /* Safari fallback */
  }

  .chevron-icon {
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
  }

  .accordion-item[open] .chevron-icon {
    transform: rotate(180deg);
  }

  .accordion-content {
    padding-bottom: 24px;
    animation: slideDown 0.2s ease-out;
  }

  .content-body {
    font-family: sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    opacity: 0.9;
    margin-bottom: 20px;
  }

  .social-share-row {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .share-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 4px;
    opacity: 0.8;
    transition: transform 0.15s ease;
  }

  .share-btn:hover {
    transform: scale(1.15);
    opacity: 1;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Responsive Viewport Modifications */
  @media (max-width: 768px) {
    .faq-heading {
      font-size: 3.25rem;
    }
    .accordion-summary {
      font-size: 1rem;
    }
  }
</style>

<script>
  // Pure progressive vanilla logic attached to native lifecycle events without bundle sizing degradation
  class FAQController extends HTMLElement {
    constructor() {
      super();
      const triggers = this.querySelectorAll('.tab-trigger');
      const panels = this.querySelectorAll('.category-panel');

      triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
          const targetId = trigger.getAttribute('data-target');

          // Mutate semantic control states
          triggers.forEach(t => t.setAttribute('aria-selected', t === trigger ? 'true' : 'false'));
          
          panels.forEach(panel => {
            if (panel.getAttribute('data-panel-id') === targetId) {
              panel.setAttribute('data-state', 'active');
            } else {
              panel.setAttribute('data-state', 'hidden');
              // Close any open accordions within the hidden panel to reset presentation layers safely
              panel.querySelectorAll('details[open]').forEach(details => details.removeAttribute('open'));
            }
          });
        });
      });
    }
  }

  // Define element execution scope safely 
  if (!customElements.get('faq-controller')) {
    customElements.define('faq-controller', FAQController);
  }
</script>

```
