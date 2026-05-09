# Learning Pack Schema

Use this markdown/frontmatter format for community contributions.

## Required Fields

```yaml
---
pack_id: "2026-05-10-store-name-random"
skill: "shopify-post-launch-growth-operator"
contributor_type: "merchant|operator|agency|developer|anonymous"
niche: "jewelry"
market: "US"
platform: "TikTok|Meta|Shopify|Google|YouTube|Pinterest|Other"
evidence_type: "official|operator-anecdote|case-study|creative-observation|own-data|failed-test"
learning_type: "design-pattern|store-build-issue|app-workflow|growth-idea|creative-pattern|failed-test|new-method|policy-update|tooling|skill-combo"
confidence: "high|medium|low"
date_observed: "2026-05-10"
source_url: ""
privacy_level: "public|redacted|private-summary"
permission_to_share: true
---
```

## Required Sections

```md
## Observation

## Context

## What Was Tried

## Result

## Transferable Pattern

## Design Or Workflow Details

## Skill Or Tool Combo

## Not Suitable When

## Compliance Risks

## Suggested Skill Update
```

## Redaction Rules

Remove by default:

- API keys and tokens
- emails and phone numbers
- customer names
- order IDs
- exact private revenue if the user did not opt in
- private screenshots
- copyrighted creative assets
- addresses
- ad account IDs

## Evidence Quality

High:

- own repeated data
- official platform rules
- well-documented case studies with context

Medium:

- multiple operator reports
- one case study with enough detail
- repeated creative observations

Low:

- one anecdote
- vague claim
- single influencer/agency post

## Promotion Rules

Promote to curated references only when:

- format is valid
- no secrets are found
- compliance scan passes
- source/context is clear
- lesson is reusable
- lesson does not depend on deception

Otherwise keep in rejected or needs-review.
