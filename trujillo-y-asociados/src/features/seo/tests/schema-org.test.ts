import { experimental_AstroContainer as Container } from 'astro/container';
import { expect, test } from 'vitest';
import SchemaOrg from '@seo/components/SchemaOrg.astro';

test('SchemaOrg genera JSON-LD estructurado de LegalService por defecto', async () => {
  const container = await Container.create();
  const canonicalUrl = new URL('https://trujilloasociados.com/contacto');

  const html = await container.renderToString(SchemaOrg, {
    props: {
      description: 'Contacto despacho legal',
      canonicalUrl,
    },
  });

  // Extracción del bloque <script type="application/ld+json">
  const scriptMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  expect(scriptMatch).not.toBeNull();

  if (scriptMatch) {
    const jsonLd = JSON.parse(scriptMatch[1]);
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('LegalService');
    expect(jsonLd.name).toBe('Trujillo & Asociados Abogados');
    expect(jsonLd.address['@type']).toBe('PostalAddress');
    expect(jsonLd.address.addressCountry).toBe('MX');
  }
});

test('SchemaOrg sobreescribe los valores cuando se pasa la prop schema personalizada', async () => {
  const container = await Container.create();
  const canonicalUrl = new URL('https://trujilloasociados.com/blog/caso-exito');

  const customSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Resolución de demanda laboral',
    author: {
      '@type': 'Organization',
      name: 'Trujillo & Asociados',
    },
  };

  const html = await container.renderToString(SchemaOrg, {
    props: {
      schema: customSchema,
      description: 'Articulo del blog',
      canonicalUrl,
    },
  });

  const scriptMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  expect(scriptMatch).not.toBeNull();

  if (scriptMatch) {
    const jsonLd = JSON.parse(scriptMatch[1]);
    expect(jsonLd['@type']).toBe('Article');
    expect(jsonLd.headline).toBe('Resolución de demanda laboral');
  }
});