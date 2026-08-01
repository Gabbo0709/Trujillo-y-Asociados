import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';
import { COMPANY_CONFIG } from '@shared/constants/company.config';

test('dist/index.html renderiza metadatos SEO esenciales y SkipToContent', () => {
  const indexPath = path.resolve(process.cwd(), 'dist/index.html');
  if (!fs.existsSync(indexPath)) return;

  const html = fs.readFileSync(indexPath, 'utf-8');
  expect(html).toContain('<title>Inicio | Trujillo &amp; Asociados</title>');
  expect(html).toContain('<meta name="description"');
  expect(html).toContain('content="index, follow"');
  expect(html).toContain('href="#main-content"');
  expect(html).toContain('Saltar al contenido principal');
});