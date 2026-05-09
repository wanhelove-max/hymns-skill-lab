---
name: shopify-independent-store-builder
description: Build, rebuild, audit, or launch a Shopify independent store until it is launch-ready. Use when Codex is asked to set up or implement a Shopify/DTC store with theme UX, pages, product-page structure, app stack, reviews, wishlist, email setup, chat, SEO, Merchant Center readiness, trust pages, mobile QA, compliance, launch checklists, or durable workflow memory. Do not use for post-launch social media growth, ad creative production, influencer operations, or ongoing campaign management; hand off to a growth/activation skill after launch readiness.
---

# Shopify Independent Store Builder

Use this skill to act as the lead operator for a Shopify independent-store build until the store is launch-ready. Prefer a small app-first stack for mature ecommerce functions, with custom theme work for brand, UX, copy, compliance, and performance.

## Core Rule

Do not make the store look mature by fabricating trust. Never create fake reviews, fake operating history, fake charity, fake certifications, fake scarcity, fake discounts, fake solid-gold claims, or unsupported jewelry/health claims.

## Workflow

1. Inspect current store/project state.
   - Read `PLANS.md`, `PROGRESS.md`, `HANDOFF.md`, launch checklists, app setup docs, and theme override folders if present.
   - Identify old category residue, risky claims, unpublished/draft state, current theme, app credentials, and current blocker.

2. Define the store surface map.
   - Acquisition: SEO, sitemap, Search Console, Merchant Center/feed, social consistency, UTM rules.
   - Home: hero, collections, material/trust blocks, journal, newsletter, footer.
   - Collection: taxonomy, filters, sort, collection copy, product cards, empty states.
   - PDP: gallery, variants, material truth, care/size/shipping/returns, reviews, recommendations, back-in-stock.
   - Cart/checkout-adjacent: cart UX, checkout branding, payment/shipping/tax/policy consistency.
   - Post-purchase: notifications, care guide, review requests, abandoned flows.
   - Operations: metafields, SKU rules, app registry, QA log, support macros.

3. Choose native vs app vs theme.
   - Shopify native: products, collections, variants, inventory, menus, pages, policies, checkout, discounts, shipping, taxes, notifications, analytics basics.
   - Apps: reviews, Search & Discovery, email/SMS, chat, back-in-stock, wishlist persistence, loyalty/referrals, feeds, returns portal, tracking portal.
   - Theme/custom: homepage, PDP, PLP, cart UX, content modules, app widget placement/styling, structured-data gating, mobile performance.
   - Later: loyalty, referral, quizzes, subscriptions, post-purchase upsell, advanced attribution, enterprise helpdesk.

4. Install apps in stages.
   - Stage 1: Judge.me, Shopify Search & Discovery, Shopify Inbox, Shopify Email/Automations, Google & YouTube after product/policy readiness.
   - Stage 1 conditional: STOQ Back In Stock only when real inventory/restock behavior exists.
   - Stage 2: Swym Wishlist Plus, Klaviyo/Omnisend, Smile/Rivo/Growave, AfterShip, Loop/returns, upsell/bundle apps only when data justifies them.
   - Keep an app registry: app, purpose, owner, cost, storefront scripts, pages affected, data access, uninstall plan.

5. Implement with dry-run and rollback.
   - Run local validators before live writes.
   - Use dry-run for Shopify Admin/theme publishing scripts.
   - Snapshot live content/assets before updates.
   - Make small reversible theme edits.
   - Do not expose `.env` secrets.

6. QA before claiming completion.
   - Compliance: no fake trust, unsupported materials, or old niche residue.
   - Mobile: 375/390/430/tablet/desktop, no overlap, no horizontal scroll, tap targets OK.
   - Ecommerce: home, collection, PDP, cart, checkout-adjacent, policies, contact.
   - SEO: titles, metas, canonicals, sitemap, robots, schema, internal links.
   - Performance: app script budget, image sizes, deferred noncritical JS, Core Web Vitals risk.
   - Google: Merchant Center product/feed/policy consistency and misrepresentation risk.

7. Write durable memory.
   - Update project docs: `PLANS.md`, `PROGRESS.md`, `HANDOFF.md`, launch checklist.
   - Create or update research docs under `content/research/`.
   - Preserve decisions, app stack, QA results, blockers, and next steps.

8. Hand off to post-launch growth.
   - When launch readiness is reached, produce `content/growth-handoff.md`.
   - Include brand position, target customer, best-selling/category routes, material claims allowed, banned claims, app stack, pages ready, products ready, open risks, and recommended next growth skill.
   - Do not run social/ad/content campaign execution from this skill.

## Portability

On a new account or computer, first read `references/dependency-manifest.md`. If PowerShell is available, run `scripts/check-dependencies.ps1` to see which companion skills are installed. Missing skills are not fatal; use the manifest fallbacks.

For a one-prompt project kickoff, read `references/execution-playbook.md` and follow its trigger prompt, execution loop, subagent task templates, stop conditions, and post-launch handoff.

## Shopify Jewelry Rules

Use transparent material language:

- `gold-tone`
- `gold-look`
- `gold plated` only when true for the SKU
- `stainless steel` only when true for the SKU
- `PVD coating` only when true for the SKU
- `not solid gold`

Require proof before publishing:

- hypoallergenic
- nickel-free
- waterproof
- tarnish-proof
- vermeil
- gold-filled
- solid gold
- charitable donation
- artisan/handmade claims
- certifications

## References

- For portability and companion skills, read `references/dependency-manifest.md`.
- For the one-command project execution workflow, read `references/execution-playbook.md`.
- For detailed app-stack recommendations, read `references/app-stack.md`.
- For full launch workflow and QA, read `references/launch-workflow.md`.
