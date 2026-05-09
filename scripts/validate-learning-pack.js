#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

const REQUIRED_FIELDS = [
  'pack_id',
  'skill',
  'contributor_type',
  'niche',
  'market',
  'platform',
  'evidence_type',
  'learning_type',
  'confidence',
  'date_observed',
  'privacy_level',
  'permission_to_share',
];

const REQUIRED_SECTIONS = [
  'Observation',
  'Context',
  'What Was Tried',
  'Result',
  'Transferable Pattern',
  'Design Or Workflow Details',
  'Skill Or Tool Combo',
  'Not Suitable When',
  'Compliance Risks',
  'Suggested Skill Update',
];

const ENUMS = {
  skill: new Set([
    'shopify-independent-store-builder',
    'shopify-post-launch-growth-operator',
    'skill-evolution-operator',
    'other',
  ]),
  contributor_type: new Set(['merchant', 'operator', 'agency', 'developer', 'anonymous']),
  evidence_type: new Set([
    'official',
    'operator-anecdote',
    'case-study',
    'creative-observation',
    'own-data',
    'failed-test',
  ]),
  confidence: new Set(['high', 'medium', 'low']),
  learning_type: new Set([
    'design-pattern',
    'store-build-issue',
    'app-workflow',
    'growth-idea',
    'creative-pattern',
    'failed-test',
    'new-method',
    'policy-update',
    'tooling',
    'skill-combo',
  ]),
  privacy_level: new Set(['public', 'redacted', 'private-summary']),
};

const SECRET_PATTERNS = [
  { name: 'Shopify access token', pattern: /\bshpat_[A-Za-z0-9_]{16,}\b/ },
  { name: 'Shopify private app token', pattern: /\bshppa_[A-Za-z0-9_]{16,}\b/ },
  { name: 'Generic API key assignment', pattern: /\b(api[_-]?key|secret|token)\s*[:=]\s*['"]?[A-Za-z0-9_\-]{20,}/i },
  { name: 'Email address', pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i },
  { name: 'US phone-like number', pattern: /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}/ },
];

const RISK_PATTERNS = [
  { name: 'fake review tactic', pattern: /\b(fake reviews?|AI-generated reviews?|buy reviews?|review swap)\b/i },
  { name: 'fake scarcity tactic', pattern: /\b(fake scarcity|fake countdown|false low stock|fake sold out)\b/i },
  { name: 'unsupported material claim', pattern: /\b(real gold|solid gold|waterproof|tarnish-proof|hypoallergenic|nickel-free)\b/i },
];

function parseArgs(argv) {
  const args = {
    dirs: [],
    allowInvalidExamples: false,
    json: false,
  };

  for (const arg of argv) {
    if (arg === '--allow-invalid-examples') {
      args.allowInvalidExamples = true;
    } else if (arg === '--json') {
      args.json = true;
    } else {
      args.dirs.push(arg);
    }
  }

  if (args.dirs.length === 0) {
    args.dirs.push('community/incoming');
  }
  return args;
}

function walkMarkdown(dir) {
  const abs = path.resolve(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  const entries = fs.readdirSync(abs, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(abs, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdown(full));
    } else if (entry.isFile() && /\.md$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return { data: null, body: text };
  }
  return {
    data: parseSimpleYaml(match[1]),
    body: text.slice(match[0].length),
  };
}

function parseSimpleYaml(yaml) {
  const data = {};
  for (const rawLine of yaml.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const index = line.indexOf(':');
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }
    data[key] = value;
  }
  return data;
}

function validateFile(file, options) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const text = fs.readFileSync(file, 'utf8');
  const { data, body } = parseFrontmatter(text);
  const issues = [];

  if (!data) {
    issues.push(issue('error', rel, 'frontmatter', 'Missing YAML frontmatter.'));
    return issues;
  }

  for (const field of REQUIRED_FIELDS) {
    if (!(field in data) || data[field] === '') {
      issues.push(issue('error', rel, 'field', `Missing required field: ${field}`));
    }
  }

  for (const [field, allowed] of Object.entries(ENUMS)) {
    if (field in data && !allowed.has(String(data[field]))) {
      issues.push(issue('error', rel, 'enum', `Invalid ${field}: ${data[field]}`));
    }
  }

  if (data.permission_to_share !== true) {
    issues.push(issue('error', rel, 'permission', 'permission_to_share must be true.'));
  }

  if (data.date_observed && !/^\d{4}-\d{2}-\d{2}$/.test(String(data.date_observed))) {
    issues.push(issue('error', rel, 'date', 'date_observed must be YYYY-MM-DD.'));
  }

  for (const section of REQUIRED_SECTIONS) {
    const pattern = new RegExp(`^##\\s+${escapeRegExp(section)}\\s*$`, 'im');
    if (!pattern.test(body)) {
      issues.push(issue('error', rel, 'section', `Missing section: ${section}`));
    }
  }

  for (const secret of SECRET_PATTERNS) {
    if (secret.pattern.test(text)) {
      issues.push(issue('error', rel, 'secret', `Potential secret/private data: ${secret.name}`));
    }
  }

  for (const risk of RISK_PATTERNS) {
    if (risk.pattern.test(text)) {
      issues.push(issue('warning', rel, 'risk', `Risk phrase found: ${risk.name}`));
    }
  }

  if (options.allowInvalidExamples && rel.includes('examples/invalid-learning-pack/')) {
    return issues.map((entry) => ({ ...entry, expectedInvalid: true, level: 'expected' }));
  }

  return issues;
}

function issue(level, file, category, message) {
  return { level, file, category, message };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = args.dirs.flatMap(walkMarkdown).sort();
  const issues = files.flatMap((file) => validateFile(file, args));
  const report = {
    generatedBy: 'scripts/validate-learning-pack.js',
    filesScanned: files.map((file) => path.relative(ROOT, file).split(path.sep).join('/')),
    issues,
    errorCount: issues.filter((item) => item.level === 'error').length,
    warningCount: issues.filter((item) => item.level === 'warning').length,
    expectedInvalidCount: issues.filter((item) => item.level === 'expected').length,
  };

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printReport(report);
  }

  process.exit(report.errorCount > 0 ? 1 : 0);
}

function printReport(report) {
  console.log('Learning pack validation');
  console.log(`Files scanned: ${report.filesScanned.length}`);
  console.log(`Errors: ${report.errorCount}`);
  console.log(`Warnings: ${report.warningCount}`);
  console.log(`Expected invalid: ${report.expectedInvalidCount}`);
  for (const item of report.issues) {
    console.log(`[${item.level.toUpperCase()}] ${item.file} :: ${item.category} :: ${item.message}`);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  parseFrontmatter,
  parseSimpleYaml,
  validateFile,
};
