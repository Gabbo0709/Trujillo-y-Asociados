import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';
import { COMPANY_CONFIG } from '@shared/constants/company.config';

test('dist/index.html genera JSON-LD estructurado de LegalService alineado a COMPANY_CONFIG SSoT', () => {
  const indexPath = path.resolve(process.cwd(), 'dist/index.html');
  if (!fs.existsSync(indexPath)) return;

  const html = fs.readFileSync(indexPath, 'utf-8');
  const scriptMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  expect(scriptMatch).not.toBeNull();

  if (scriptMatch) {
    const jsonLd = JSON.parse(scriptMatch[1]);
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('LegalService');
    expect(jsonLd.name).toBe(COMPANY_CONFIG.name);
    expect(jsonLd.legalName).toBe(COMPANY_CONFIG.legalName);
    expect(jsonLd.taxID).toBe(COMPANY_CONFIG.taxId);
    expect(jsonLd.address['@type']).toBe('PostalAddress');
    expect(jsonLd.address.addressCountry).toBe(COMPANY_CONFIG.address.addressCountry);
    expect(jsonLd.address.streetAddress).toBe(COMPANY_CONFIG.address.streetAddress);
  }
});

test('dist/index.html incluye areaServed para Ciudad de México y Estado de México', () => {
  const indexPath = path.resolve(process.cwd(), 'dist/index.html');
  if (!fs.existsSync(indexPath)) return;

  const html = fs.readFileSync(indexPath, 'utf-8');
  const scriptMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  expect(scriptMatch).not.toBeNull();

  if (scriptMatch) {
    const jsonLd = JSON.parse(scriptMatch[1]);
    expect(jsonLd.areaServed).toBeDefined();
    expect(Array.isArray(jsonLd.areaServed)).toBe(true);

    const areaNames = jsonLd.areaServed.map((area: { name: string }) => area.name);
    expect(areaNames).toContain('Ciudad de México');
    expect(areaNames).toContain('Estado de México');
  }
});