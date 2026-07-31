export interface CompanyAddress {
  readonly streetAddress: string;
  readonly addressLocality: string;
  readonly addressRegion: string;
  readonly postalCode: string;
  readonly addressCountry: string;
  readonly neighborhood: string;
  readonly formatted: string;
}

export interface CompanyConfig {
  readonly name: string;
  readonly legalName: string;
  readonly capitalRegime?: string;
  readonly taxId: string;
  readonly foundationDate?: string;
  readonly address: CompanyAddress;
  readonly geo: {
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly contact: {
    readonly phoneLandline: string;
    readonly phoneWhatsApp: string;
    readonly email: string;
  };
  readonly openingHours: readonly string[];
}

export const COMPANY_CONFIG: CompanyConfig = {
  name: "Trujillo & Asociados",
  legalName: "TRUJILLO Y ASOCIADOS",
  capitalRegime: "ASOCIACIÓN EN PARTICIPACIÓN",
  taxId: "TAS820114HF4",
  foundationDate: "1982-01-14",
  address: {
    streetAddress: "C. Guaymas 8, Interior 401",
    neighborhood: "Roma Norte",
    addressLocality: "Cuauhtémoc",
    addressRegion: "CDMX",
    postalCode: "06700",
    addressCountry: "MX",
    formatted: "C. Guaymas 8, Interior 401, Roma Nte., Cuauhtémoc, 06700 Ciudad de México, CDMX",
  },
  geo: {
    latitude: 19.424960371304817,
    longitude: -99.15489273900886,
  },
  contact: {
    phoneLandline: "+525552087631",
    phoneWhatsApp: "+525512345678",
    email: "contacto@trujilloasociados.mx",
  },
  openingHours: ["Mo-Fr 09:00-18:00"],
} as const;