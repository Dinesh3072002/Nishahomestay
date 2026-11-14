const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'scripts' && f !== 'docs') files = files.concat(walk(full));
    } else if (f.endsWith('.html') || f.endsWith('.json') || f.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

const allFiles = walk('.');
const patterns = [/1\.8\s*km/i, /2\.2\s*km/i, /8\s*min/i, /10\s*min/i];

console.log('=== VERIFYING NEW DISTANCES (1.8 km, 2.2 km) & TIMES (8 min, 10 min) ===\n');

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const matched = [];
  lines.forEach((line, idx) => {
    for (const p of patterns) {
      if (p.test(line)) {
        matched.push(`  L${idx+1}: ${line.trim()}`);
        break;
      }
    }
  });
  if (matched.length > 0) {
    console.log(`\n--- ${file} (${matched.length} references) ---`);
    matched.forEach(m => console.log(m));
  }
});

