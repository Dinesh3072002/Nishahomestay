const fs = require('fs');
const path = require('path');

const lodgingPages = [
  'index.html',
  'homestay-near-isha-yoga-center/index.html',
  'budget-stay-isha/index.html',
  'rooms-near-adiyogi/index.html',
  'rooms/index.html',
  'location/index.html'
];

const blogPages = [
  'blog/index.html',
  'blog/budget-stay-near-isha-yoga-center/index.html',
  'blog/where-to-stay-near-adiyogi/index.html',
  'blog/rooms-near-isha-yoga-center/index.html',
  'blog/family-stay-near-isha-yoga-center/index.html',
  'blog/semmedu-travel-guide/index.html',
  'blog/isha-yoga-center-visitor-accommodation-guide/index.html'
];

console.log('--- SCHEMA MARKUP VALIDATION ACROSS ALL PAGES ---\n');

let allPassed = true;

// Validate Lodging Pages
lodgingPages.forEach(f => {
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

// Validate Blog Hub and Articles
console.log('\n--- BLOG SCHEMA VALIDATION ---\n');

blogPages.forEach(f => {
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
  const bc = graph.find(e => e['@type'] === 'BreadcrumbList');
  const blog = graph.find(e => e['@type'] === 'Blog');
  const post = graph.find(e => e['@type'] === 'BlogPosting');

  const errors = [];
  if (!lb) errors.push('Missing LodgingBusiness');
  if (!bc) errors.push('Missing BreadcrumbList');

  if (f === 'blog/index.html') {
    if (!blog) errors.push('Missing Blog entity on blog hub');
    else if (!blog.name) errors.push('Blog missing name');
  } else {
    if (!post) errors.push('Missing BlogPosting entity on blog article');
    else {
      if (!post.headline) errors.push('BlogPosting missing headline');
      if (!post.datePublished) errors.push('BlogPosting missing datePublished');
      if (!post.author) errors.push('BlogPosting missing author');
      if (!post.publisher) errors.push('BlogPosting missing publisher');
    }
  }

  if (errors.length > 0) {
    console.error(`[FAIL] ${f}:\n  - ${errors.join('\n  - ')}`);
    allPassed = false;
  } else {
    console.log(`[PASS] ${f}:`);
    console.log(`  - Entity: ${post ? `BlogPosting ("${post.headline}")` : `Blog ("${blog.name}")`}`);
    console.log(`  - BreadcrumbList: ${bc.itemListElement?.length} items`);
  }
});

if (allPassed) {
  console.log('\nAll pages (6 commercial + 7 blog) have valid, complete, and connected schemas!');
} else {
  process.exit(1);
}
