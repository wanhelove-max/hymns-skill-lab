#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const INCOMING = path.join(ROOT, 'community', 'incoming');
const ACCEPTED = path.join(ROOT, 'community', 'accepted');

function walkMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdown(full));
    } else if (entry.isFile() && /\.md$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function uniqueDestination(file) {
  const relative = path.relative(INCOMING, file);
  let destination = path.join(ACCEPTED, relative);
  if (!fs.existsSync(destination)) return destination;

  const parsed = path.parse(destination);
  let index = 2;
  while (fs.existsSync(destination)) {
    destination = path.join(parsed.dir, `${parsed.name}-${index}${parsed.ext}`);
    index += 1;
  }
  return destination;
}

function main() {
  fs.mkdirSync(ACCEPTED, { recursive: true });
  const files = walkMarkdown(INCOMING);
  let promoted = 0;
  for (const file of files) {
    const destination = uniqueDestination(file);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(file, destination);
    promoted += 1;
    console.log(`Promoted ${path.relative(ROOT, file)} -> ${path.relative(ROOT, destination)}`);
  }
  console.log(`Promoted ${promoted} incoming learning pack(s).`);
}

if (require.main === module) {
  main();
}
