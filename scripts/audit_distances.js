const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'scripts') files = files.concat(walk(full));
    } else if (f.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = walk('.');
const patterns = [
  /6\.5/i,
  /7\.5/i,
  /10\s*min/i,
  /12\s*min/i,
  /\b\d+(?:\.\d+)?\s*(?:km|kilometers|kilometres)\b/i,
  /distance/i
];

console.log('=== SCANNING ALL HTML FILES FOR DISTANCE / LOCATION REFERENCES ===\n');

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  console.log(`\n--- ${file} ---`);
  lines.forEach((line, idx) => {
    for (const p of patterns) {
      if (p.test(line)) {
        console.log(`  Line ${idx+1}: ${line.trim().substring(0, 160)}`);
        break;
      }
    }
  });
});

