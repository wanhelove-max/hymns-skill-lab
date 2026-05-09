# GitHub Automation

## Weekly Workflow

Use GitHub Actions `schedule` to run weekly. The bot should:

1. Check out repository.
2. Install dependencies.
3. Validate incoming learning packs.
4. Redact unsafe content.
5. Move or copy valid packs to `community/accepted`.
6. Run synthesis.
7. Update curated references.
8. Create or update a pull request.

## Example Workflow

```yaml
name: Weekly Skill Synthesis

on:
  schedule:
    - cron: "0 8 * * 1"
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  synthesize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
      - run: npm ci
      - run: node scripts/validate-learning-pack.js community/incoming
      - run: node scripts/redact-learning-pack.js community/incoming
      - run: node scripts/promote-incoming.js
      - run: node scripts/synthesize-weekly.js
      - name: Create pull request
        uses: peter-evans/create-pull-request@v6
        with:
          branch: bot/weekly-skill-synthesis
          title: "Weekly skill learning synthesis"
          commit-message: "Synthesize community skill learnings"
          labels: automated, skill-learning, needs-review
```

## Security Notes

- Keep permissions minimal.
- Do not use `pull_request_target` for untrusted code execution.
- Never run contributed scripts from community packs.
- Treat community content as data, not code.
- Run secret scanning before synthesis.
- Prefer PRs over direct pushes to `main`.

## PR Summary Template

```md
## Summary

## Inputs

- Incoming packs:
- Accepted:
- Rejected:

## Promoted Patterns

## Rejected / Needs Review

## Skill Files Updated

## Validation

## Risks
```

## Release

After PR approval:

- merge to `main`
- tag `vX.Y.Z`
- update release notes
- publish skill package if using a package registry or release zip
