# Contributing Learning Packs

Thank you for improving the skill system.

## What To Submit

Submit structured learning packs under `community/incoming/`.

Good submissions include:

- tested workflows
- launch QA failures
- app-stack lessons
- social creative learnings
- failed tests with context
- platform policy changes
- reusable prompts or checklists

## What Not To Submit

Do not submit:

- `.env` files or tokens
- customer names, emails, phone numbers, or addresses
- order IDs or ad account IDs
- private screenshots
- copyrighted ads or course content
- fake reviews, fake scarcity, or deceptive tactics
- unsupported product claims

## Validation

Run:

```powershell
npm run validate:incoming
```

The repository checks structure, required fields, confidence labels, privacy flags, and common secret patterns.
