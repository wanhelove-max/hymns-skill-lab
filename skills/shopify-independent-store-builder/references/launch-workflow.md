# Shopify Independent Store Launch Workflow

## Required Store Layers

1. Acquisition
   - Search Console, sitemap, Merchant Center/feed, SEO metadata, schema, social profile consistency, UTM rules.

2. Homepage
   - Announcement, hero, featured collections, new arrivals/bestsellers, material/trust blocks, journal, newsletter, footer.

3. Collections
   - Category taxonomy, collection SEO copy, filters, sort, product cards, empty states, internal links.

4. Product Pages
   - Gallery, variants, price, ATC, material truth, care/size/shipping/returns accordions, reviews, complementary products, back-in-stock.

5. Cart And Checkout
   - Cart editing, empty cart, shipping/tax/returns reassurance, discount handling, express payments, checkout branding, policy links.

6. Post-Purchase
   - Order/shipping notifications, care guide, review request, abandoned checkout/cart, welcome, winback later.

7. Operations
   - Product metafields, SKU rules, inventory rules, app registry, material truth source, QA log, support macros, content publishing log.

## Mobile QA

Test 375px, 390px, 430px, tablet, and desktop:

- no horizontal scroll
- no clipped buttons/headings
- 44-48px tap targets
- filters open/close/clear correctly
- sticky bars do not cover checkout or add-to-cart
- PDP purchase information appears early
- widgets do not overlap
- image crops are controlled
- express checkout and address autofill work

## Compliance QA

Reject:

- fake reviews
- fake history
- fake donation
- fake certification
- fake scarcity
- misleading material claims
- unsupported jewelry claims
- health/supplement residue
- unclear returns/shipping/payment terms

## Performance QA

- Keep JavaScript as progressive enhancement.
- Avoid loading heavy widgets globally when they are only needed on PDP/cart.
- Compress and size images.
- Defer noncritical scripts.
- Run mobile checks after each app install.
- Keep an app registry and uninstall unused apps.

## Durable Memory

For every store, maintain:

- `PLANS.md`
- `PROGRESS.md`
- `HANDOFF.md`
- launch checklist
- app registry
- brand rules
- banned claims
- product metafield schema
- material truth source
- QA logs
- support/escalation docs
- `content/growth-handoff.md` after launch readiness

## Default Project Files

Create these when missing:

- `PLANS.md`
- `PROGRESS.md`
- `HANDOFF.md`
- `content/shopify-launch-checklist.md`
- `content/shopify-app-registry.md`
- `content/research/shopify-independent-store-app-stack.md`
- `content/research/independent-store-operating-workflow.md`

## Growth Handoff

When the store is launch-ready, create `content/growth-handoff.md` with:

- store URL and launch date/status
- brand positioning
- target customer
- ready traffic routes: homepage, collections, PDPs, journal, policies
- installed app stack and active automations
- product/category priorities
- allowed claims and banned claims
- top conversion proof points
- unresolved risks
- recommended next stage: post-launch growth/social/creative workflow

Do not expand this skill into full growth execution. Hand off to a separate growth skill.
