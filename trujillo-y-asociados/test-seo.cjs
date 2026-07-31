const fs = require('fs');
let payload = JSON.parse(fs.readFileSync('seo_payload.json', 'utf8'));
const analysis = { gaps: { corporate: { present: [], missing: [] }, workers: { present: [], missing: [] } }, schemaIssues: [] };
payload.forEach(page => {
  const text = (page.cleanText + ' ' + page.headings.map(h => h.text).join(' ')).toLowerCase();
  if (page.route === '/corporate-advisory') {
    ['asesoría corporativa', 'derecho mercantil', 'cumplimiento normativo', 'gobierno corporativo'].forEach(t => text.includes(t) ? analysis.gaps.corporate.present.push(t) : analysis.gaps.corporate.missing.push(t));
  }
  if (page.route === '/workers-advisory') {
    ['derecho laboral', 'asesoría a trabajadores', 'contratos individuales', 'seguridad social'].forEach(t => text.includes(t) ? analysis.gaps.workers.present.push(t) : analysis.gaps.workers.missing.push(t));
  }
  page.jsonLd.forEach(ld => {
    if (!ld['@type']) analysis.schemaIssues.push('Missing @type in ' + page.route);
    else if (!['LegalService', 'Attorney', 'ContactPage'].includes(ld['@type'])) analysis.schemaIssues.push('Unexpected @type ' + ld['@type'] + ' in ' + page.route);
    if (ld.name && !text.includes(ld.name.toLowerCase())) analysis.schemaIssues.push('Firm name mismatch in ' + page.route + ': ' + ld.name);
    if (ld.telephone && !text.includes(ld.telephone.replace('+', ''))) analysis.schemaIssues.push('Phone mismatch in ' + page.route + ': ' + ld.telephone);
    if (ld.address && ld.address.streetAddress && !text.includes(ld.address.streetAddress.split(',')[0].toLowerCase())) analysis.schemaIssues.push('Address mismatch in ' + page.route + ': ' + ld.address.streetAddress);
    if (ld.url && ld.url.includes('example.com')) analysis.schemaIssues.push('Static example.com url in ' + page.route);
  });
});
console.log(JSON.stringify(analysis, null, 2));
