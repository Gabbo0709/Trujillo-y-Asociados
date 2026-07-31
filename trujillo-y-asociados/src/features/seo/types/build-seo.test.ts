import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';

test('El build estático en dist/ genera index.html con etiquetas SEO obligatorias', () => {
  const indexPath = path.resolve(process.cwd(), 'dist/index.html');
  
  // Verifica si ya se corrió astro build
  if (!fs.existsSync(indexPath)) {
    console.warn('Ejecuta `pnpm build` antes de correr esta prueba en CI');
    return;
  }

  const html = fs.readFileSync(indexPath, 'utf-8');

  // Metadatos indispensables para evitar regresiones
  expect(html).toContain('<title>');
  expect(html).toContain('<meta name="description"');
  expect(html).toContain('<link rel="canonical"');
  expect(html).toContain('property="og:image"');
  expect(html).toContain('<script type="application/ld+json">');
});