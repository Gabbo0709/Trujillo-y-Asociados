const fs = require('fs');

const seo = JSON.parse(fs.readFileSync('seo_clean.json', 'utf-8'));
const analysis = {
  entityGapAnalysis: {},
  schemaIntegrity: {},
  aiSearchReadiness: {}
};

// 1. Legal Entity Gap Analysis
const checkEntities = (route, requiredEntities) => {
  const page = seo.find(s => s.route === route);
  if (!page) return { found: [], missing: [], score: 0 };
  
  const text = (page.cleanText + ' ' + page.headings.map(h => h.text).join(' ')).toLowerCase();
  const found = [];
  const missing = [];
  
  requiredEntities.forEach(entity => {
    if (text.includes(entity.toLowerCase())) {
      found.push(entity);
    } else {
      missing.push(entity);
    }
  });
  
  return {
    found,
    missing,
    score: (found.length / requiredEntities.length) * 100
  };
};

analysis.entityGapAnalysis['/corporate-advisory'] = checkEntities('/corporate-advisory', [
  'Asesoría Corporativa', 'Derecho Mercantil', 'Cumplimiento Normativo', 'Gobierno Corporativo'
]);

analysis.entityGapAnalysis['/workers-advisory'] = checkEntities('/workers-advisory', [
  'Derecho Laboral', 'Asesoría a Trabajadores', 'Contratos Individuales', 'Seguridad Social'
]);

// 2. Schema.org Integrity
seo.forEach(page => {
  const issues = [];
  page.jsonLd.forEach(schema => {
    if (!['LegalService', 'Attorney', 'ContactPage'].includes(schema['@type'])) {
      issues.push(`Unexpected @type: ${schema['@type']}`);
    }
    if (schema.url && !schema.url.includes('trujillo-demo.netlify.app')) {
       issues.push(`URL does not match dynamic domain usage (found ${schema.url})`);
    }
    if (schema.name && schema.name !== 'Trujillo & Asociados') {
       issues.push(`Schema name mismatch: "${schema.name}" vs COMPANY_CONFIG "Trujillo & Asociados"`);
    }
    if (schema.address) {
       if (!schema.address.streetAddress || !schema.address.postalCode) {
          issues.push(`Address is incomplete (missing streetAddress or postalCode)`);
       } else if (!page.cleanText.includes(schema.address.streetAddress) && !page.cleanText.includes('Guaymas')) {
          issues.push(`Address mismatch: JSON-LD address not visible in body copy`);
       }
    } else {
       issues.push(`Missing address in JSON-LD`);
    }
    if (schema.telephone && !page.cleanText.includes(schema.telephone)) {
       issues.push(`Phone mismatch: JSON-LD phone not visible in body copy`);
    }
  });
  if (issues.length > 0) {
    analysis.schemaIntegrity[page.route] = issues;
  } else {
    analysis.schemaIntegrity[page.route] = ["Valid"];
  }
});

// 3. AI Search Readiness
const llmsTxtPath = 'public/llms.txt';
if (fs.existsSync(llmsTxtPath)) {
  const content = fs.readFileSync(llmsTxtPath, 'utf-8');
  analysis.aiSearchReadiness = {
    exists: true,
    hasServices: content.includes('Asesoría a Empresas') && content.includes('Asesoría a Trabajadores'),
    hasEntities: content.includes('Entidades Legales y Palabras Clave')
  };
} else {
  analysis.aiSearchReadiness = { exists: false };
}

console.log(JSON.stringify(analysis, null, 2));
