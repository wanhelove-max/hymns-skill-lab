# Skill Evolution Architecture

## Goal

Allow many users to improve a skill by contributing structured experience, while preventing low-quality or unsafe data from corrupting the stable skill.

## Repository Layout

```text
skills/
  shopify-independent-store-builder/
  shopify-post-launch-growth-operator/
  skill-evolution-operator/

schemas/
  learning-note.schema.json
  growth-handoff.schema.json
  case-study.schema.json

templates/
  learning-note.md
  case-study.md
  pr-summary.md

community/
  incoming/
  accepted/
  rejected/

curated/
  social-growth-patterns.md
  shopify-app-patterns.md
  failed-tests.md
  source-index.md

scripts/
  export-learning-pack.ps1
  validate-learning-pack.js
  redact-learning-pack.js
  synthesize-weekly.js
  create-pr.js

.github/workflows/
  validate-learning-pack.yml
  weekly-skill-synthesis.yml
```

## Data Flow

1. Local user creates learning notes while using a skill.
2. User opts in to export selected notes.
3. Export script redacts sensitive information.
4. User submits a PR or uploads to `community/incoming`.
5. GitHub Actions validates structure and safety.
6. Weekly synthesis job reads accepted submissions.
7. Bot writes curated summaries and updates skill references.
8. Bot opens a candidate PR.
9. Tests and review decide whether to release.

## Branch Model

- `main`: stable release.
- `candidate`: AI-synthesized candidate updates.
- `community/*`: user contributions.
- `release/*`: versioned release preparation.

## What Gets Learned

Accept:

- reusable workflows
- design patterns and interaction ideas
- store-build problems and fixes
- tested creative angles
- app-stack lessons
- newly useful skill/plugin/app/tool combinations
- launch QA failures
- platform policy changes
- failed tests with context
- conversion patterns with metrics ranges

Reject:

- secrets
- private customer data
- unsupported claims
- fake review/social proof tactics
- copied paid course content
- copyrighted creative assets
- vague advice without context

## Synthesis Strategy

Do not concatenate submissions. Synthesize:

- Pattern:
- Evidence:
- Applies when:
- Avoid when:
- Compliance notes:
- Example prompt/use:
- Source IDs:

Keep contradictory findings instead of forcing false consensus.
