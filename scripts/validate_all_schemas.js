const fs = require('fs');
const path = require('path');
const https = require('https');
const querystring = require('querystring');

const files = [
  'index.html',
  'homestay-near-isha-yoga-center/index.html',
  'rooms-near-adiyogi/index.html',
  'rooms/index.html',
  'location/index.html'
];

console.log('--- SCHEMA MARKUP VALIDATION ACROSS ALL PAGES ---\n');

let allPassed = true;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const match = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (!match) {
    console.error(`[FAIL] ${f}: No JSON-LD script found!`);
    allPassed = false;
    return;
  }

  let data;
  try {
    data = JSON.parse(match[1]);
  } catch (e) {
    console.error(`[FAIL] ${f}: Invalid JSON! ${e.message}`);
    allPassed = false;
    return;
  }

  const graph = data['@graph'];
  if (!Array.isArray(graph)) {
    console.error(`[FAIL] ${f}: @graph is not an array!`);
    allPassed = false;
    return;
  }

  const lb = graph.find(e => e['@type'] === 'LodgingBusiness');
  const wp = graph.find(e => e['@type'] === 'WebPage');
  const bc = graph.find(e => e['@type'] === 'BreadcrumbList');
  const faq = graph.find(e => e['@type'] === 'FAQPage');

  const errors = [];
  if (!lb) errors.push('Missing LodgingBusiness');
  else {
    if (lb['@id'] !== 'https://www.nishahomestay.com/#business') errors.push(`LodgingBusiness @id is ${lb['@id']}, expected https://www.nishahomestay.com/#business`);
    if (lb.telephone !== '+916381397636') errors.push(`Telephone is ${lb.telephone}, expected +916381397636`);
    if (lb.name !== 'Nisha Home Stay') errors.push(`Name is ${lb.name}, expected Nisha Home Stay`);
    if (!lb.geo || lb.geo.latitude !== 10.9548572 || lb.geo.longitude !== 76.7594586) errors.push('Invalid GeoCoordinates');
    if (!lb.hasMap || !lb.hasMap.includes('maps.app.goo.gl')) errors.push('Missing/invalid hasMap');
  }

  if (!wp) errors.push('Missing WebPage');
  else {
    if (wp.mainEntity !== 'https://www.nishahomestay.com/#business' && wp.mainEntity?.['@id'] !== 'https://www.nishahomestay.com/#business') {
      errors.push('WebPage mainEntity not pointing to #business');
    }
  }

  if (!bc) errors.push('Missing BreadcrumbList');
  if (!faq) errors.push('Missing FAQPage');
  else {
    if (!Array.isArray(faq.mainEntity) || faq.mainEntity.length === 0) {
      errors.push('FAQPage has no questions');
    }
  }

  if (errors.length > 0) {
    console.error(`[FAIL] ${f}:\n  - ${errors.join('\n  - ')}`);
    allPassed = false;
  } else {
    console.log(`[PASS] ${f}:`);
    console.log(`  - LodgingBusiness: ${lb.name} (@id: ${lb['@id']})`);
    console.log(`  - WebPage: ${wp.name}`);
    console.log(`  - BreadcrumbList: ${bc.itemListElement?.length} items`);
    console.log(`  - FAQPage: ${faq.mainEntity?.length} questions`);
  }
});

if (allPassed) {
  console.log('\nAll 5 pages have valid, complete, and connected LodgingBusiness schema!');
} else {
  process.exit(1);
}

