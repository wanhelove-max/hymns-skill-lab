# Dependency Manifest

This growth skill is portable. It can run alone from the handoff file, but it improves when companion skills are installed.

## Core Dependencies

| Skill | Why it helps | Fallback |
|---|---|---|
| `shopify-independent-store-builder` | Produces `content/growth-handoff.md` and launch readiness facts | Build a minimal handoff from `HANDOFF.md`, `PROGRESS.md`, and store docs. |
| `copywriting` | Captions, hooks, landing copy, ad copy | Use the formulas in `short-video-playbook.md`. |
| `article` | Long-form educational content and blog repurposing | Draft directly from the growth plan. |
| `avoid-ai-writing` | Removes generic AI patterns from public copy | Manual humanization pass. |
| `ecommerce-content-marketing` | Content calendar and ecommerce content pillars | Use `growth-workflow.md`. |

## Recommended Dependencies

| Skill | Why it helps | Fallback |
|---|---|---|
| `ad-ready` | Align creative assets with ads and landing pages | Manual ad-to-page review. |
| `aes-landing-page-builder` | Landing angle structure | Route to existing collection/PDP/material pages. |
| `page-cro` / `conversion-rate-optimization` | Conversion feedback from landing pages | Use the conversion checklist in this skill. |
| `ab-test-setup` | Test design and measurement | Record hypothesis, variant, metric, and decision rule manually. |
| `brand-visual` / `frontend-skill` | Visual direction and creative polish | Use existing brand system and creative brief. |
| `google-search-console` | SEO feedback and query-driven content | Use Search Console UI manually. |
| `seo-aeo-keyword-research` | Organic/social search query ideas | Use platform search suggestions manually. |

## External Sources To Recheck

Use web/current sources because social tactics change quickly:

- TikTok Creative Center and TikTok Ads Help.
- Meta Ad Library and Meta Business creative guidance.
- YouTube Shorts / Google Ads guidance.
- Shopify social commerce docs.
- Reddit/operator communities.
- Creator/agency posts and newsletters.
- Competitor and adjacent-brand ad libraries.
- Own store analytics after launch.

## Bootstrap

1. Copy this skill folder into `$CODEX_HOME/skills` or `%USERPROFILE%\.codex\skills`.
2. Ensure the project has `content/growth-handoff.md`.
3. Run `scripts/check-growth-handoff.ps1`.
4. If learning from external sources, create notes with `scripts/new-learning-note.ps1`.
5. Save real outputs under `content/growth-plan.md`, `content/social-calendar.md`, `content/creative-briefs/`, `content/ad-scripts/`, and `content/growth-learning/`.
