# Component Specification: TeamSection.astro

## Objective
Render the professional directory/team showcase grid mapping individual cards for each partner.

## Architecture & Performance
- **Type**: Pure Astro Component.
- **Data-Driven**: Content maps iteratively through strict TypeScript interfaces.
- **SEO**: Uses `<article>` tags for each staff card profile to encapsulate identity context cleanly.

## Component Location
`src/features/firm/components/TeamSection.astro`

## Properties (TypeScript Interface)
```typescript
export interface TeamMember {
  name: string;
  photoSrc: string;
  biography: string;
}

export interface Props {
  members?: TeamMember[];
}
```

## Structural Schema (HTML + Scoped CSS)
---
import type { TeamMember } from '../types';

const defaultMembers: TeamMember[] = [
  {
    name: "Marco A. Trujillo González",
    photoSrc: "/assets/team-marco-a.jpg",
    biography: "Como auxiliar administrativo ofrece una experiencia inigualable en el seguimiento de asuntos y agilización en nuestra línea de servicios."
  },
  {
    name: "Marco Antonio Trujillo Arguello",
    photoSrc: "/assets/team-marco-antonio.jpg",
    biography: "Se especializa en la resolución de disputas complejas en materia civil y mercantil con la asesoría para empresas, dirigido a personas con responsabilidad operativa y resguardo de trabajadores familiares."
  },
  {
    name: "Rafael Trujillo González",
    photoSrc: "/assets/team-rafael.jpg",
    biography: "Se centra en una estrategia laboral meticulosa para despidos injustificados y liquidaciones, garantizando una preservación patrimonial intergeneracional impecable y el cumplimiento de la normativa."
  }
];

const { members = defaultMembers } = Astro.props;
---

<section class="team-section">
  <div class="wrapper">
    <h2 class="main-heading">Nuestro Equipo</h2>
    
    <div class="team-grid">
      {members.map((member) => (
        <article class="member-card">
          <div class="card-header-row">
            <div class="avatar-box">
              <img src={member.photoSrc} alt={member.name} class="avatar-img" loading="lazy" />
            </div>
            <h3 class="member-name">{member.name}</h3>
          </div>
          <p class="member-bio">{member.biography}</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .team-section {
    background-color: #C2BAAA;
    padding: 40px 24px 80px 24px;
    width: 100%;
  }

  .wrapper {
    max-width: 1280px;
    margin: 0 auto;
  }

  .main-heading {
    font-family: sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #3D1411;
    margin: 0 0 32px 0;
  }

  .team-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .member-card {
    background-color: #FFFDFB;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .card-header-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .avatar-box {
    width: 120px;
    height: 140px;
    flex-shrink: 0;
    background-color: #111827;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .member-name {
    font-family: serif;
    font-size: 1.5rem;
    color: #3D1411;
    line-height: 1.2;
    margin: 0;
  }

  .member-bio {
    font-family: sans-serif;
    font-size: 0.875rem;
    color: #3D1411;
    line-height: 1.5;
    margin: 0;
  }

  /* Grid Layout for Desktop Displays */
  @media (min-width: 768px) {
    .team-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }
    
    .member-card {
      min-height: 380px;
    }
  }
</style>
