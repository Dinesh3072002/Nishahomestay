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
const outdatedPatterns = [
  /6\.5/i,
  /7\.5/i,
  /10\s*–\s*12/i,
  /12\s*–\s*15/i,
  /10\s*to\s*12/i,
  /12\s*to\s*15/i
];

console.log('=== CHECKING FOR OUTDATED DISTANCES (6.5, 7.5, 10-12, 12-15) ===\n');

let outdatedFound = 0;
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    for (const p of outdatedPatterns) {
      if (p.test(line)) {
        console.log(`[OUTDATED] ${file}:${idx+1}: ${line.trim()}`);
        outdatedFound++;
        break;
      }
    }
  });
});

if (outdatedFound === 0) {
  console.log('\nSUCCESS: Zero outdated distance references found across all HTML, JS, and JSON files!');
} else {
  console.log(`\nWARNING: Found ${outdatedFound} outdated references that need attention.`);
}
