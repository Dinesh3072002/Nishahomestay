const https = require('https');
const querystring = require('querystring');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
const jsonld = scriptMatch[1];
const testHtml = `<!DOCTYPE html><html><head><title>Test</title><script type="application/ld+json">${jsonld}</script></head><body></body></html>`;
const postData = querystring.stringify({ html: testHtml });

const req = https.request('https://validator.schema.org/validate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const cleanBody = body.replace(/^\)\]\}'/, '').trim();
      const data = JSON.parse(cleanBody);
      console.log('Schema.org Validator HTTP Status:', res.statusCode);
      if (data.tripleGroups) {
        console.log(`Detected Top-Level Entities (${data.tripleGroups.length}):`);
        data.tripleGroups.forEach((g, idx) => {
          console.log(`  [${idx + 1}] Type: ${g.type} | Errors: ${g.numErrors || 0} | Warnings: ${g.numWarnings || 0}`);
        });
      } else {
        console.log('Data keys:', Object.keys(data));
      }
    } catch (e) {
      console.log('Parse error or rate limit:', e.message);
      console.log(body.substring(0, 200));
    }
  });
});

req.on('error', (e) => console.error('Request error:', e.message));
req.write(postData);
req.end();
