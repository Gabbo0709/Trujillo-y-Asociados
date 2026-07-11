# Component Specification: Footer.astro

## Objective
Implement the comprehensive semantic webpage footer layout, embedding institutional mapping parameters, location markers, legal notices, and compliance tags.

## Architecture & Performance
- **Type**: Pure Astro Component.
- **SEO**: Explicit anchor linking structure mapping external networks (LinkedIn, Facebook). Include structured addresses formatted through standard microdata schema parameters if required.
- **Images**: Import the logo using relative pathing: `import logo from '../assets/images/logo.webp'`. Use Astro's `<Image />` component with `densities={[1, 1.5, 2]}`. Do not run any image generator; use the placeholder file provided by the user.
- **Styling**: Component-scoped Vanilla CSS stylesheet inside a `<style>` block. Strictly no Tailwind classes.

## Component Location
`src/features/landing/components/Footer.astro`

## Structural Schema (HTML)
```html
---
import { Image } from 'astro:assets';
import logo from '../assets/images/logo.webp';
---

<footer class="site-footer">
  <!-- First column - Logo and Copyright -->
  <aside class="footer-brand">
    <a href="/" class="footer-logo-link" aria-label="Inicio - Trujillo & Asociados">
      <Image 
        src={logo} 
        alt="Trujillo & Asociados Monograma" 
        class="footer-logo" 
        loading="lazy"
        densities={[1, 1.5, 2]}
      />
    </a>
    <small class="footer-copyright">© 2035 Fidem Valorem Legal. Powered and secured by Wix.</small>
  </aside>

  <!-- Second column - Description and Links -->
  <section class="footer-nav-section" aria-label="Información y Enlaces">
    <p class="footer-tagline">
      Asesoramiento legal experto para la compleja y exigente normativa <strong class="footer-highlight">Ley Federal del Trabajo</strong>
    </p>
    <nav class="footer-nav" aria-label="Enlaces del pie de página">
      <a href="#firma" class="footer-link">Nuestra Firma</a>
      <a href="#contacto" class="footer-link">Contacto</a>
      <a href="#faq" class="footer-link">FAQ</a>
      <a href="#privacy" class="footer-link">Privacy Policy</a>
      <a href="#accessibility" class="footer-link">Accessibility Statement</a>
    </nav>
  </section>

  <!-- Third column - Address and Socials -->
  <section class="footer-contact-section" aria-label="Contacto y Redes Sociales">
    <address class="footer-address">
      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" class="footer-map-link">
        C. Guaymas 8–Interior 401, Roma Nte.<br/>
        Cuauhtémoc, 06700 Ciudad de México, CDMX
      </a>
    </address>
    <a href="mailto:despachotrujilloyasociados@gmail.com" class="footer-email">
      despachotrujilloyasociados@gmail.com
    </a>
    <nav class="footer-social-nav" aria-label="Redes sociales">
      <a href="#linkedin" class="footer-social-link">LinkedIn</a>
      <a href="#facebook" class="footer-social-link">Facebook</a>
    </nav>
  </section>
</footer>

<style>
  .site-footer {
    background-color: hsl(var(--color-brand-primary));
    color: hsl(var(--color-brand-secondary));
    border-top: 1px solid hsla(var(--color-brand-secondary), 0.1);
    padding-inline: max(var(--space-6), calc((100% - var(--max-width-landing)) / 2 + var(--space-6)));
    padding-block: var(--space-16) var(--space-6);
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  @media (min-width: 768px) {
    .site-footer {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-12);
    }
  }

  /* Column 1: Brand */
  .footer-brand {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--space-6);
  }

  .footer-logo-link {
    display: inline-flex;
    align-items: center;
  }

  .footer-logo {
    display: block;
    height: auto;
    width: 64px;
  }

  .footer-copyright {
    font-size: var(--text-xs);
    opacity: 0.6;
  }

  /* Column 2: Nav Section */
  .footer-nav-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .footer-tagline {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    line-height: 1.4;
    margin: 0;
  }

  .footer-highlight {
    display: block;
    margin-top: var(--space-1);
    font-weight: var(--font-weight-bold);
  }

  .footer-nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2);
  }

  .footer-link {
    font-size: var(--text-xs);
    color: hsla(var(--color-brand-secondary), 0.8);
    text-decoration: none;
    transition: color var(--ease-smooth);
  }

  .footer-link:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  /* Column 3: Contact & Socials */
  .footer-contact-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--space-6);
  }

  @media (min-width: 768px) {
    .footer-contact-section {
      align-items: flex-end;
      text-align: right;
    }
  }

  .footer-address {
    font-style: normal;
    font-size: var(--text-xs);
    line-height: 1.6;
  }

  .footer-map-link {
    color: hsla(var(--color-brand-secondary), 0.9);
    text-decoration: none;
    transition: color var(--ease-smooth);
  }

  .footer-map-link:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  .footer-email {
    display: block;
    font-size: var(--text-xs);
    color: hsla(var(--color-brand-secondary), 0.9);
    text-decoration: none;
    margin-bottom: var(--space-3);
    transition: color var(--ease-smooth);
  }

  .footer-email:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  .footer-social-nav {
    display: flex;
    gap: var(--space-4);
  }

  .footer-social-link {
    font-size: var(--text-xs);
    color: hsla(var(--color-brand-secondary), 0.8);
    text-decoration: none;
    transition: color var(--ease-smooth);
  }

  .footer-social-link:hover {
    color: #ffffff;
    text-decoration: underline;
  }
</style>
````
