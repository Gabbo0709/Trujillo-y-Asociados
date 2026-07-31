import { experimental_AstroContainer as Container } from 'astro/container';
import { expect, test } from 'vitest';
import BaseLayout from '@layouts/BaseLayout.astro';

test('BaseLayout renderiza metadatos SEO esenciales y SkipToContent', async () => {
  const container = await Container.create();
  
  const html = await container.renderToString(BaseLayout, {
    props: {
      title: 'Derecho Laboral',
      description: 'Especialistas en la defensa de trabajadores y empresas.',
      noIndex: false,
    },
  });

  // Validaciones del Head
  expect(html).toContain('<title>Derecho Laboral | Trujillo & Asociados</title>');
  expect(html).toContain('<meta name="description" content="Especialistas en la defensa de trabajadores y empresas."/>');
  expect(html).toContain('<meta name="robots" content="index, follow"/>');
  
  // Validacion de Accesibilidad A11y (Skip-link)
  expect(html).toContain('href="#main-content"');
  expect(html).toContain('Saltar al contenido principal');
});

test('BaseLayout aplica directiva noindex cuando noIndex prop es true', async () => {
  const container = await Container.create();
  
  const html = await container.renderToString(BaseLayout, {
    props: {
      title: 'Página Privada',
      description: 'Contenido no indexable.',
      noIndex: true,
    },
  });

  expect(html).toContain('<meta name="robots" content="noindex, nofollow"/>');
});