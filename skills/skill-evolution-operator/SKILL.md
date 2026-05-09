---
name: skill-evolution-operator
description: Design, implement, or run an automated GitHub-based evolution workflow for Codex skills. Use when the user wants skills to learn from many users, collect local experience, sync community learning packs, validate/redact submissions, synthesize improvements, create weekly candidate pull requests, version releases, or manage an open-source skill repository. Do not use for normal Shopify store setup or post-launch marketing execution.
---

# Skill Evolution Operator

Use this skill to turn local skill learnings into a controlled open-source improvement loop. The goal is automated learning without letting raw, unsafe, duplicate, or low-quality submissions corrupt the main skill.

## Core Principle

Automate collection, validation, synthesis, and candidate PR creation. Do not auto-merge unreviewed raw community learnings directly into the stable skill.

Preferred flow:

```text
local use -> learning pack -> redaction -> schema validation -> score/dedupe -> weekly synthesis -> candidate PR -> tests -> release
```

## Repository Model

Use a three-layer repository:

1. `skills/`
   - Stable skill folders used by Codex.
   - Keep `SKILL.md` concise.
   - Put large knowledge in `references/`.

2. `community/`
   - Raw or semi-raw contributed learning packs.
   - Must be structured, redacted, and validated.
   - Never directly loaded by production skills.

3. `curated/` or skill `references/`
   - Synthesized, deduped, evidence-labeled lessons.
   - Used to update skill references and templates.

## Automation Levels

Level 1: Assisted PR
- Users export learning packs manually.
- GitHub Actions validates.
- Maintainer/AI reviews and merges.

Level 2: Weekly candidate PR
- Scheduled workflow collects new packs.
- Bot redacts, validates, dedupes, and synthesizes.
- Bot opens or updates a PR against `candidate` branch.

Level 3: Auto-candidate branch
- Bot can push to `candidate`.
- Stable release still requires tests and approval.

Avoid Level 4 auto-main unless the repository is private and the user accepts the risk.

## Workflow

1. Define schemas.
   - Learning note.
   - Growth handoff.
   - Case study.
   - Failed test.
   - Source citation.

2. Add local export tooling.
   - Export only selected `content/growth-learning/` or project learning files.
   - Redact secrets, emails, phone numbers, order IDs, tokens, customer data, and store-private metrics unless explicitly allowed.
   - Produce a zip or folder called a learning pack.

3. Add repository validation.
   - JSON/Markdown frontmatter schema.
   - Secret scanning.
   - Compliance phrase scanning.
   - Required source/date/confidence fields.
   - Duplicate/similarity check.

4. Add weekly synthesis.
   - Group submissions by niche, platform, tactic, claim, and result.
   - Label evidence strength.
   - Promote repeated, compliant patterns.
   - Keep contradictory or failed tests with context.
   - Generate a candidate diff to skill references, not raw overwrite.

5. Create pull request.
   - PR title: `Weekly skill learning synthesis YYYY-MM-DD`.
   - Include summary, sources counted, promoted patterns, rejected patterns, risks, and tests run.
   - Assign labels: `automated`, `skill-learning`, `needs-review`.

6. Publish release.
   - After tests pass and candidate is accepted, tag a version.
   - Maintain changelog.
   - Keep rollback possible.

## Safety Rules

- Never upload `.env`, tokens, customer data, order data, private screenshots, or copyrighted creative assets by default.
- Never auto-publish fake reviews, fake social proof, fake scarcity, or unsupported claims into a skill.
- Keep source attribution URLs where possible.
- Label unofficial operator advice as anecdotal unless verified by own data or multiple sources.
- Prefer adding references over bloating `SKILL.md`.

## References

- For the full architecture, read `references/architecture.md`.
- For learning pack format, read `references/learning-pack-schema.md`.
- For weekly GitHub automation, read `references/github-automation.md`.
