const fs = require('fs');

const payload = JSON.parse(fs.readFileSync('seo_payload.json', 'utf-8'));

const results = {
  entityGapAnalysis: {},
  schemaIntegrity: {},
};

const firmName = "Trujillo & Asociados";
const firmPhone = "+525573408674"; 
const firmAddress = {
  streetAddress: "C. Guaymas 8–Interior 401, Roma Nte.",
  addressLocality: "Cuauhtémoc",
  addressRegion: "CDMX",
  postalCode: "06700",
  addressCountry: "MX"
};

payload.forEach(page => {
  const route = page.route;
  const cleanText = page.cleanText;
  const jsonLd = page.jsonLd;
  
  if (route === '/corporate-advisory') {
    const requiredEntities = ['Asesoría Corporativa', 'Derecho Mercantil', 'Cumplimiento Normativo', 'Gobierno Corporativo'];
    const missing = requiredEntities.filter(e => !cleanText.toLowerCase().includes(e.toLowerCase()));
    results.entityGapAnalysis[route] = { missing };
  }
  
  if (route === '/workers-advisory') {
    const requiredEntities = ['Derecho Laboral', 'Asesoría a Trabajadores', 'Contratos Individuales', 'Seguridad Social'];
    const missing = requiredEntities.filter(e => !cleanText.toLowerCase().includes(e.toLowerCase()));
    results.entityGapAnalysis[route] = { missing };
  }
  
  results.schemaIntegrity[route] = [];
  
  jsonLd.forEach(schema => {
    // Check type
    if (!['LegalService', 'Attorney', 'ContactPage', 'WebSite', 'WebPage'].includes(schema['@type'])) {
      results.schemaIntegrity[route].push(`Unexpected @type: ${schema['@type']}`);
    }
    
    // Check domain usage (It should be using the domain, in payload it's evaluated to https://trujillo-demo.netlify.app/ but I need to check if the generated ones are consistent)
    if (schema.url && !schema.url.includes('trujillo-demo.netlify.app')) {
      results.schemaIntegrity[route].push(`URL mismatch: ${schema.url}`);
    }
    
    // Zero Mismatch Rule
    if (schema.telephone && schema.telephone !== firmPhone) {
      if (!cleanText.includes(schema.telephone)) {
          results.schemaIntegrity[route].push(`Phone mismatch in body text: ${schema.telephone}`);
      }
    }
    if (schema.name && schema.name !== firmName) {
      if (!cleanText.includes(schema.name)) {
          results.schemaIntegrity[route].push(`Name mismatch in body text: ${schema.name}`);
      }
    }
    if (schema.address && schema.address.streetAddress) {
       // just rough check
       const addr = schema.address.streetAddress.split(',')[0];
       if (!cleanText.includes(addr)) {
          // It's possible the address is not printed on all pages in body text.
          results.schemaIntegrity[route].push(`Address mismatch in body text: ${schema.address.streetAddress}`);
       }
    }
  });
});

console.log(JSON.stringify(results, null, 2));
