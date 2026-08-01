const fs = require('fs');
let data = fs.readFileSync('seo.json', 'utf-8');
data = data.substring(data.indexOf('['));
fs.writeFileSync('seo_clean.json', data);
