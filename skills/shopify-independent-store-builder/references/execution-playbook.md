# One-Command Execution Playbook

Use this when the user asks to run a Shopify independent-store build until launch readiness. This playbook stops at the launch/growth handoff; it does not run social media, creator, or ad campaign execution.

## Trigger Prompt

```text
Use shopify-independent-store-builder.
Act as lead engineer/operator. Inspect the project, create/update PLANS.md, split the work into milestones, use subagents where useful, implement with dry-run and rollback for Shopify writes, keep PROGRESS.md and HANDOFF.md current, and continue until the store is launch-ready or a real blocker requires user action. When launch-ready, create content/growth-handoff.md and recommend the post-launch growth skill as the next stage.
```

## Execution Loop

1. Inspect
   - Read project docs.
   - Check Shopify credentials state without printing secrets.
   - List theme override files and scripts.
   - Identify current live theme, pages, products, collections, apps, blockers.

2. Plan
   - Update `PLANS.md` with objective, assumptions, constraints, milestones, validation, and risks.
   - Create an app registry if missing.
   - Create a launch checklist if missing.

3. Dispatch
   - Use subagents for independent research, app-stack review, site module checklist, content QA, visual QA, and code review when available.
   - Keep write scopes separate.
   - Main thread owns integration and validation.

4. Implement
   - Content/page/theme changes in small batches.
   - Shopify live writes only after dry-run and snapshots.
   - App installs/configuration in the lean order: Search & Discovery, Judge.me, Inbox, Email/Automations, Google & YouTube, conditional STOQ.
   - Style app widgets after installation.

5. Validate
   - Run local tests and validators.
   - Run storefront QA on home, collection, PDP, cart, policies, blog.
   - Run mobile checks.
   - Run performance/app script checks.
   - Run compliance scan.

6. Record
   - Update `PROGRESS.md` after each milestone.
   - Update `HANDOFF.md` before stopping.
   - Add screenshots/reports under `qa/` when produced.
   - Add app install details to the app registry.

7. Handoff
   - Create `content/growth-handoff.md`.
   - State what is ready for traffic and what is not.
   - Recommend moving to `shopify-post-launch-growth-operator` or equivalent.
   - Do not create social calendars, ad scripts, creator briefs, or video production plans in this skill except as a short next-stage recommendation.

## Subagent Task Templates

Research app stack:

```text
Role: research-agent
Task: Research current Shopify app/operator recommendations for [store niche].
Return: sources, ranked app stack, app-vs-custom rules, risks, next action.
```

Site requirements:

```text
Role: site-architecture-agent
Task: Build a complete independent-store module checklist for [store niche].
Return: store module checklist, implementation owner, mobile notes, launch QA, durable workflow suggestions.
```

Theme worker:

```text
Role: frontend-agent
Task: Implement the bounded theme change in [files].
Do not touch unrelated files or live Shopify.
Return: files inspected, files changed, summary, commands, validation, risks.
```

QA worker:

```text
Role: qa-agent
Task: Validate [paths/pages/features] against the launch checklist.
Return: commands, passing/failing results, bugs found, recommended fixes.
```

## Stop Conditions

Stop only when:

- required milestones are complete and validation is recorded
- `content/growth-handoff.md` is created when the store is launch-ready
- a user-owned blocker exists, such as credentials, paid app approval, domain/DNS, payment setup, or Shopify Support cache purge
- continuing would require destructive or high-risk changes without explicit approval
