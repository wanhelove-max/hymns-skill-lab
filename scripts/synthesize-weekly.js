#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('./validate-learning-pack');

const ROOT = process.cwd();
const ACCEPTED_DIRS = ['community/accepted', 'examples/valid-learning-pack'];
const OUT_DIR = path.join(ROOT, 'curated');

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

function extractSection(body, section) {
  const pattern = new RegExp(`^##\\s+${escapeRegExp(section)}\\s*\\r?\\n([\\s\\S]*?)(?=^##\\s+|\\s*$)`, 'im');
  const match = body.match(pattern);
  return match ? match[1].trim() : '';
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function loadPacks() {
  return ACCEPTED_DIRS.flatMap(walkMarkdown)
    .sort()
    .map((file) => {
      const text = fs.readFileSync(file, 'utf8');
      const parsed = parseFrontmatter(text);
      return {
        file: path.relative(ROOT, file).split(path.sep).join('/'),
        meta: parsed.data || {},
        observation: extractSection(parsed.body, 'Observation'),
        pattern: extractSection(parsed.body, 'Transferable Pattern'),
        details: extractSection(parsed.body, 'Design Or Workflow Details'),
        combo: extractSection(parsed.body, 'Skill Or Tool Combo'),
        risks: extractSection(parsed.body, 'Compliance Risks'),
        update: extractSection(parsed.body, 'Suggested Skill Update'),
      };
    });
}

function groupBy(packs, key) {
  const groups = new Map();
  for (const pack of packs) {
    const value = pack.meta[key] || 'unknown';
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(pack);
  }
  return [...groups.entries()].sort(([a], [b]) => String(a).localeCompare(String(b)));
}

function writeSocialPatterns(packs) {
  const socialPacks = packs.filter((pack) => /tiktok|meta|instagram|youtube|pinterest|social/i.test(pack.meta.platform || ''));
  const lines = [
    '# Curated Social Growth Patterns',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    'These patterns are synthesized from accepted learning packs. Treat low-confidence items as hypotheses.',
    '',
  ];

  if (socialPacks.length === 0) {
    lines.push('No accepted social growth packs yet.');
  } else {
    for (const [platform, items] of groupBy(socialPacks, 'platform')) {
      lines.push(`## ${platform}`);
      lines.push('');
      for (const item of items) {
        lines.push(`### ${item.meta.pack_id || item.file}`);
        lines.push('');
        lines.push(`- Evidence: ${item.meta.evidence_type || 'unknown'} / ${item.meta.confidence || 'unknown'}`);
        lines.push(`- Learning type: ${item.meta.learning_type || 'unknown'}`);
        lines.push(`- Source: ${item.meta.source_url || item.file}`);
        lines.push(`- Pattern: ${item.pattern || item.observation || 'No pattern supplied.'}`);
        if (item.details) lines.push(`- Details: ${item.details}`);
        if (item.risks) lines.push(`- Compliance: ${item.risks}`);
        lines.push('');
      }
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'social-growth-patterns.md'), `${lines.join('\n')}\n`);
}

function writeSourceIndex(packs) {
  const lines = [
    '# Source Index',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '| Pack | Skill | Platform | Learning Type | Evidence | Confidence | Source |',
    '|---|---|---|---|---|---|---|',
  ];

  for (const pack of packs) {
    lines.push(`| ${pack.meta.pack_id || pack.file} | ${pack.meta.skill || ''} | ${pack.meta.platform || ''} | ${pack.meta.learning_type || ''} | ${pack.meta.evidence_type || ''} | ${pack.meta.confidence || ''} | ${pack.meta.source_url || pack.file} |`);
  }

  fs.writeFileSync(path.join(OUT_DIR, 'source-index.md'), `${lines.join('\n')}\n`);
}

function writeDesignPatterns(packs) {
  const designPacks = packs.filter((pack) => [
    'design-pattern',
    'store-build-issue',
    'new-method',
    'tooling',
  ].includes(pack.meta.learning_type));
  const lines = [
    '# Curated Design Patterns',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    'These patterns are synthesized from accepted learning packs. Extract reusable principles; do not copy external assets.',
    '',
  ];

  if (designPacks.length === 0) {
    lines.push('No accepted design/build/tooling packs yet.');
  } else {
    for (const [type, items] of groupBy(designPacks, 'learning_type')) {
      lines.push(`## ${type}`);
      lines.push('');
      for (const item of items) {
        lines.push(`### ${item.meta.pack_id || item.file}`);
        lines.push('');
        lines.push(`- Evidence: ${item.meta.evidence_type || 'unknown'} / ${item.meta.confidence || 'unknown'}`);
        lines.push(`- Source: ${item.meta.source_url || item.file}`);
        lines.push(`- Pattern: ${item.pattern || item.observation || 'No pattern supplied.'}`);
        if (item.details) lines.push(`- Details: ${item.details}`);
        if (item.risks) lines.push(`- Compliance: ${item.risks}`);
        lines.push('');
      }
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'design-patterns.md'), `${lines.join('\n')}\n`);
}

function writeSkillCombos(packs) {
  const comboPacks = packs.filter((pack) => (
    pack.meta.learning_type === 'skill-combo' ||
    (pack.combo && !/^no new skill/i.test(pack.combo))
  ));
  const lines = [
    '# Curated Skill And Tool Combos',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    'These combos are candidates for future dependency manifests. Verify availability and licensing before adding them to a skill.',
    '',
  ];

  if (comboPacks.length === 0) {
    lines.push('No accepted skill/tool combo packs yet.');
  } else {
    for (const item of comboPacks) {
      lines.push(`## ${item.meta.pack_id || item.file}`);
      lines.push('');
      lines.push(`- Skill affected: ${item.meta.skill || 'unknown'}`);
      lines.push(`- Evidence: ${item.meta.evidence_type || 'unknown'} / ${item.meta.confidence || 'unknown'}`);
      lines.push(`- Combo: ${item.combo || item.pattern || item.observation || 'No combo supplied.'}`);
      if (item.update) lines.push(`- Suggested update: ${item.update}`);
      if (item.risks) lines.push(`- Risks: ${item.risks}`);
      lines.push('');
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'skill-combos.md'), `${lines.join('\n')}\n`);
}

function writeFailedTests(packs) {
  const failed = packs.filter((pack) => pack.meta.evidence_type === 'failed-test');
  const lines = [
    '# Curated Failed Tests',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
  ];

  if (failed.length === 0) {
    lines.push('No failed tests yet.');
  } else {
    for (const item of failed) {
      lines.push(`## ${item.meta.pack_id || item.file}`);
      lines.push('');
      lines.push(`- Context: ${item.observation || 'No context supplied.'}`);
      lines.push(`- Lesson: ${item.pattern || 'No transferable lesson supplied.'}`);
      if (item.risks) lines.push(`- Compliance: ${item.risks}`);
      lines.push('');
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'failed-tests.md'), `${lines.join('\n')}\n`);
}

function writeAppPatterns(packs) {
  const appPacks = packs.filter((pack) => /shopify|app|search|judge|klaviyo|email|merchant/i.test(`${pack.meta.platform || ''} ${pack.pattern || ''} ${pack.observation || ''}`));
  const lines = [
    '# Curated Shopify App Patterns',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
  ];

  if (appPacks.length === 0) {
    lines.push('No accepted Shopify app packs yet.');
  } else {
    for (const item of appPacks) {
      lines.push(`## ${item.meta.pack_id || item.file}`);
      lines.push('');
      lines.push(`- Evidence: ${item.meta.evidence_type || 'unknown'} / ${item.meta.confidence || 'unknown'}`);
      lines.push(`- Pattern: ${item.pattern || item.observation || 'No pattern supplied.'}`);
      if (item.risks) lines.push(`- Compliance: ${item.risks}`);
      lines.push('');
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'shopify-app-patterns.md'), `${lines.join('\n')}\n`);
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const packs = loadPacks();
  writeSocialPatterns(packs);
  writeSourceIndex(packs);
  writeFailedTests(packs);
  writeAppPatterns(packs);
  writeDesignPatterns(packs);
  writeSkillCombos(packs);
  console.log(`Synthesized ${packs.length} learning pack(s).`);
}

if (require.main === module) {
  main();
}
