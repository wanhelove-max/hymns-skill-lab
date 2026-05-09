# Shopify Independent Store App Stack

Use a small app-first stack. Mature apps should provide infrastructure-heavy functions; theme code should provide brand control and mobile UX.

## Stage 1

| Function | Recommended tool | Notes |
|---|---|---|
| Reviews | Judge.me | Verified real reviews only; honest empty state before first reviews. |
| Search/filter/recommendations | Shopify Search & Discovery | Use product options/metafields/tags for filters; configure synonyms and boosts. |
| Chat | Shopify Inbox | Add realistic support availability; prepare macros. |
| Email | Shopify Email / Automations | Welcome, abandoned checkout/cart, post-purchase care, review request. |
| Feed | Google & YouTube | Install after products, policies, shipping, returns, and material claims are consistent. |
| Back in stock | STOQ | Only when SKUs have real sold-out/restock behavior. |

## Install Order

1. Shopify Search & Discovery.
2. Judge.me.
3. Shopify Inbox.
4. Shopify Email / Automations.
5. Google & YouTube after products and policies are stable.
6. STOQ only after real sold-out/restock behavior exists.

## Stage 2

| Function | Options | Trigger |
|---|---|---|
| Wishlist | Swym Wishlist Plus, Wishlist King | Larger catalog or meaningful repeat browsing. |
| Advanced email/SMS | Klaviyo, Omnisend | Segmentation and revenue justify complexity. |
| Loyalty/referrals | Smile, Rivo, Growave, ReferralCandy | Repeat customers and margin support rewards. |
| Tracking | AfterShip | WISMO support volume justifies a portal. |
| Returns | Shopify native first, Loop/AfterShip Returns later | Return volume and exchanges justify cost. |
| Upsell/bundles | Search & Discovery first, upsell apps later | Product pairings are proven. |

## Decision Rules

- Prefer Shopify native for products, collections, checkout, policies, payments, taxes, shipping, discounts, menus, and basic analytics.
- Use apps for customer data, delivery infrastructure, review storage, email deliverability, feed sync, and event-triggered workflows.
- Use theme code for placement, visual quality, copy, responsive behavior, structured-data gating, and performance hygiene.
- Delay anything that needs real order/traffic data.

## App Styling

- Match the store visual system.
- Avoid app widgets that add fake countdowns, fake review counts, fake purchases, fake low-stock claims, or intrusive first-paint popups.
- Test mobile home, collection, PDP, and cart after every app install.
- Remove apps that duplicate functionality or inject scripts without measurable value.

## Useful Source Links

- Shopify App Store: https://apps.shopify.com/
- Judge.me: https://apps.shopify.com/judgeme
- Search & Discovery: https://apps.shopify.com/search-and-discovery
- Shopify Inbox: https://help.shopify.com/en/manual/inbox
- Shopify Email pricing: https://help.shopify.com/en/manual/promoting-marketing/create-marketing/shopify-messaging/email/pricing
- Google & YouTube: https://apps.shopify.com/google
- Swym Wishlist Plus: https://apps.shopify.com/swym-relay
- STOQ Back In Stock: https://apps.shopify.com/back-in-stock-restock-alerts
- Klaviyo: https://apps.shopify.com/klaviyo-email-marketing
- Omnisend: https://apps.shopify.com/omnisend
