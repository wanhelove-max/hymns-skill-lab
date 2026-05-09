#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

const REPLACEMENTS = [
  [/\bshpat_[A-Za-z0-9_]{8,}\b/g, '[REDACTED_SHOPIFY_TOKEN]'],
  [/\bshppa_[A-Za-z0-9_]{8,}\b/g, '[REDACTED_SHOPIFY_TOKEN]'],
  [/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[REDACTED_EMAIL]'],
  [/(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}/g, '[REDACTED_PHONE]'],
  [/\b(order|customer|account)[_-]?\d{4,}\b/gi, '[REDACTED_ID]'],
];

function walkMarkdown(dir) {
  const abs = path.resolve(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  const entries = fs.readdirSync(abs, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(abs, entry.name);
    if (entry.isDirectory()) files.push(...walkMarkdown(full));
    else if (entry.isFile() && /\.md$/i.test(entry.name)) files.push(full);
  }
  return files;
}

function redact(text) {
  return REPLACEMENTS.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text);
}

function main() {
  const target = process.argv[2] || 'community/incoming';
  const files = walkMarkdown(target);
  let changed = 0;
  for (const file of files) {
    const before = fs.readFileSync(file, 'utf8');
    const after = redact(before);
    if (before !== after) {
      fs.writeFileSync(file, after);
      changed += 1;
      console.log(`Redacted ${path.relative(ROOT, file)}`);
    }
  }
  console.log(`Redaction complete. Files changed: ${changed}`);
}

if (require.main === module) {
  main();
}
