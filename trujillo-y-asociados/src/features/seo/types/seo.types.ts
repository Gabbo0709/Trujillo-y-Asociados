export interface SchemaPostalAddress {
  '@type': 'PostalAddress';
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  streetAddress?: string;
  postalCode?: string;
}

export interface LegalServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'LegalService';
  name: string;
  url: string;
  logo: string;
  description: string;
  priceRange?: string;
  address: SchemaPostalAddress;
  [key: string]: unknown;
}

export type SchemaData = LegalServiceSchema | Record<string, unknown>;