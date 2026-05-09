# Dependency Manifest

This skill is portable, but it becomes stronger when paired with related skills. On a new machine/account, install or recreate the dependencies below when available. If a dependency is missing, continue with the fallback behavior instead of stopping.

## Core Dependencies

| Skill | Why it helps | Fallback if missing |
|---|---|---|
| `project-orchestrator` | Lead-engineer workflow, `PLANS.md` / `PROGRESS.md` / `HANDOFF.md`, milestones, validation loop | Manually create/update the three docs and follow the workflow in `execution-playbook.md`. |
| `shopify-development` | Shopify Admin API, Liquid/theme, Shopify CLI, GraphQL patterns | Use Shopify official docs and inspect local scripts/theme files directly. |
| `store-analyzer` | Public Shopify audit across trust, CRO, speed, SEO | Use the QA checklist in `launch-workflow.md`. |
| `store-fixer` | Authenticated Shopify implementation pattern with dry-run and rollback | Use local Shopify scripts with dry-run, snapshots, and explicit live-write approval. |

## SEO And Content Dependencies

| Skill | Why it helps | Fallback |
|---|---|---|
| `seo-audit` | Crawlability, indexation, technical SEO | Use Search Console/robots/sitemap/meta/schema checklist. |
| `technical-seo` | Robots, sitemap, canonicals, redirects | Manual crawl and Shopify admin checks. |
| `onpage-optimization` | Headings, keywords, internal links | Use content checklist and article templates. |
| `meta-data-optimization` | Titles/meta/OG/Twitter | Manual page-by-page review. |
| `seo-aeo-keyword-research` | Keyword and AEO topic planning | Use Google/Search Console/manual SERP notes. |
| `seo-aeo-internal-linking` | Internal link map | Build a spreadsheet or markdown link map. |
| `seo-aeo-schema-generator` | JSON-LD/schema planning | Use Google rich result docs and theme schema snippets. |
| `seo-images` | Alt text and image performance | Manual image audit. |
| `google-search-console` | GSC setup and interpretation | Use GSC UI manually. |
| `article`, `copywriting`, `avoid-ai-writing` | Blog/body copy and humanization | Draft/edit directly with brand and compliance rules. |

## UX, CRO, And Design Dependencies

| Skill | Why it helps | Fallback |
|---|---|---|
| `page-cro` | Page-level conversion review | Use funnel checklist in `launch-workflow.md`. |
| `conversion-rate-optimization` | Broader CRO analysis | Manual conversion checklist. |
| `homepage-generator`, `hero-generator`, `about-page-generator`, `faq-page-generator`, `cta-generator` | Page/component planning | Use store surface map and page requirements. |
| `navigation-menu-generator`, `footer-generator`, `newsletter-signup-generator` | Navigation/footer/email capture modules | Manual IA and component writing. |
| `trust-badges-generator`, `testimonials-generator` | Trust/review section planning | Use only real proof; otherwise use material/editor notes. |
| `brand-visual-generator`, `color-palette`, `frontend-skill`, `better-icons` | Visual identity and UI polish | Use existing brand system and theme CSS. |

## QA And Performance Dependencies

| Skill | Why it helps | Fallback |
|---|---|---|
| `gstack-qa` / `qa` | Systematic browser QA | Use Playwright/manual browser checks. |
| `gstack-design-review` / `design-review` | Visual QA | Manual screenshot review. |
| `gstack-benchmark` / `benchmark` | Performance regression checks | Lighthouse/PageSpeed/manual timing. |
| `playwright` / `browser-use` / `chrome` | Browser automation | Manual Chrome testing. |
| `mobile-optimization` | Mobile UX audit | Use mobile QA checklist. |
| `core-web-vitals`, `site-speed-optimization`, `shopify-theme-optimization`, `shopify-page-speed` | Performance and theme speed | Manual app/script/image audit. |
| `wcag-audit-patterns`, `accessibility` | Accessibility checks | Manual WCAG/tap-target/focus checks. |
| `visual-regression-testing` | Before/after screenshots | Manual screenshot comparison. |

## Optional Growth Dependencies

| Skill | Why it helps | Fallback |
|---|---|---|
| `ecommerce-content-marketing` | Editorial calendars and campaigns | Manual blog/content map. |
| `aes-landing-page-builder` | Landing page structure | Use homepage/PDP/collection patterns here. |
| `aes-cart-abandonment-analyzer` | Cart recovery flow planning | Use Shopify Email automation templates. |
| `ad-ready` | Ad creative and landing page alignment | Manual ad-to-page review. |
| `ab-test-setup` | Experiment planning | Record hypothesis, metric, split, duration manually. |

## Bootstrap Procedure On A New Machine

1. Copy the full `shopify-independent-store-builder` folder into the new `$CODEX_HOME/skills` or `%USERPROFILE%\.codex\skills`.
2. Run `scripts/check-dependencies.ps1` from this skill if PowerShell is available.
3. Install missing skills from the user's preferred source when available. If not available, proceed with fallbacks.
4. Create project docs: `PLANS.md`, `PROGRESS.md`, `HANDOFF.md`, and `content/shopify-launch-checklist.md`.
5. Do not copy Shopify secrets between machines unless the user explicitly handles secure transfer.
6. Recreate `.env.shopify.local` locally and keep it ignored.
