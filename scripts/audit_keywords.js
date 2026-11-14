const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'homestay-near-isha-yoga-center/index.html',
  'budget-stay-isha/index.html',
  'rooms-near-adiyogi/index.html',
  'rooms/index.html',
  'location/index.html',
  '404.html'
];

const keywords = [
  'budget stay near Adiyogi',
  'budget stay near Isha Yoga Center',
  'budget rooms near Isha Yoga Center',
  'stay near Isha Yoga Center Coimbatore',
  'homestay near Isha Yoga Center',
  'rooms near Isha Yoga Center',
  'stay near Adiyogi'
];

console.log('--- EXACT KEYWORD MATCH AUDIT ---');
keywords.forEach(kw => {
  const regex = new RegExp(kw.replace(/\s+/g, '\\s+'), 'gi');
  let total = 0;
  console.log(`\nKeyword: "${kw}"`);
  files.forEach(f => {
    if (fs.existsSync(f)) {
      const content = fs.readFileSync(f, 'utf8');
      const matches = content.match(regex);
      const count = matches ? matches.length : 0;
      total += count;
      if (count > 0) {
        console.log(`  - ${f}: ${count} matches`);
      }
    }
  });
  console.log(`  Total exact occurrences: ${total}`);
});

console.log('\n--- CURRENT PAGE SEO METADATA AUDIT ---');
files.forEach(f => {
  if (fs.existsSync(f)) {
    const html = fs.readFileSync(f, 'utf8');
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                          html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
    const alts = [...html.matchAll(/<img[^>]*alt=["']([^"']*)["'][^>]*>/gi)].map(m => m[1]);

    console.log(`\n========================================`);
    console.log(`Page: ${f}`);
    console.log(`  Title: ${titleMatch ? titleMatch[1].trim() : 'NONE'}`);
    console.log(`  Meta Description: ${metaDescMatch ? metaDescMatch[1].trim() : 'NONE'}`);
    console.log(`  H1: ${h1Match ? h1Match[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : 'NONE'}`);
    console.log(`  H2s:`);
    h2Matches.forEach(h2 => console.log(`    - ${h2}`));
    console.log(`  Image Alts (${alts.length}):`);
    alts.forEach(alt => console.log(`    - "${alt}"`));
  }
});
