# Handoff: DOSE website (doseof.com)

## Overview
E-commerce site for DOSE, a nomad studio making handcrafted objects in different cities. Collection No. 01 is Jaipur (silver + stone jewellery). Future collections (No. 02 …) may be other crafts, so keep everything craft-neutral. Descriptor: "Nomad studio · Made by hand".

Target repo: `dose-of/dose` (currently empty).

## About the design files
`DOSE Website.dc.html` is a **design reference built in HTML**. It's a working prototype that shows the look and behaviour, not production code. Recreate it in a real stack. The repo is empty, so pick the framework. Recommended: **Next.js (App Router) + TypeScript + plain CSS modules or Tailwind**, with products in a typed data file for now, ready to swap to Shopify Storefront API (or Stripe Checkout) later.

To view the prototype, open `DOSE Website.dc.html` in a browser from this folder (it needs `support.js` next to it). Image paths inside point to `uploads/…` and `DOSE logo files/…`. In this bundle those files are in `assets/` (see Assets below).

## Fidelity
**High-fidelity** for layout, colour, type and interactions. The copy is mostly final. **Product data is placeholder** (names, prices, stones, codes, images). Product images are zoomed crops of the 4 lifestyle photos until real product shots exist.

## Brand rules (must follow)
- Black & white only. No colour or metallic logo treatments.
- Logo = "open" wordmark (`DOSE-open-*`). Symbol = the O letter (`DOSE-symbol-O-*`). Rule: if there's room to read, use the wordmark; if there's no room, use the O. Never both on the same object (the header uses the wordmark, the footer uses the O).
- The logo is small and quiet. Never put it over hero photos.
- Photography is documentary: full colour, never tinted, never covered by text.

## Design tokens
Colours
- Paper (background): `#f4f3f0`
- Ink (text, buttons, rules on focus): `#141414`
- Muted text: `#6b6b68`
- Secondary text: `#3a3a38`
- Hairline rule: `#d9d7d2`
- Image placeholder fill: `#e6e4df`
- Overlay (cart backdrop): `rgba(29,31,32,.25)`
- Selection: ink bg / paper text. Focus: `1px solid #141414`, offset 3px.

Type (Google Fonts, placeholders until the user picks final fonts)
- Headings: **Instrument Serif** 400, letter-spacing −0.01em, line-height 0.9–1
- Text/UI: **Instrument Sans** 400/500
- Scale:
  - Page title h1: `clamp(40px, 6vw, 72px)` on Shop; `clamp(40px, 6vw, 80px)` on Studio; `clamp(36px, 4vw, 52px)` on Product
  - h2: 32px (section heads), `clamp(32px, 4vw, 48px)` (story)
  - Body: 15–16px, line-height 1.65–1.7
  - Product card text: 13px / 1.4
  - Labels / nav / buttons: **12px, uppercase, letter-spacing .08em** (buttons .12em)
  - Product code: 11px, letter-spacing .08em, muted

Spacing
- Page gutter: `clamp(16px, 3vw, 40px)`
- Section gaps: `clamp(56px, 8vw, 112px)` and `clamp(72px, 10vw, 144px)`
- Card grid gap: 32–40px vertical, 16px horizontal
- No border radius anywhere. No shadows.

Lines
- 1px `#d9d7d2` hairlines separate the header, footer, table rows and the collection list.
- Text links use a 1px `currentColor` bottom border with 2px padding.

## Layout & screens

### Global header (sticky, paper bg, bottom hairline)
3-column grid `1fr auto 1fr`, padding 14px × gutter.
- Left: `SHOP`, `STUDIO` (12px uppercase, gap 24px)
- Centre: wordmark `DOSE-open-black.svg`, height 44px, links home
- Right: `CART (n)`, opens the cart drawer

### Home
1. **Hero**, full bleed: `uploads/…asmr.jpg` (two models in a street), height `min(86vh, 900px)`, object-fit cover, position center 30%. No text on it.
   - Tweak alternative "Framed pair": two 4:5 photos side by side inside the gutter.
2. **Caption row** under the photo: left "No. 01 — Jaipur" / muted "Photographed in the old city, 2026"; right link "SHOP THE COLLECTION".
3. **"New from Jaipur"**: h2 plus a "VIEW ALL 8" link, then a grid `repeat(auto-fill, minmax(280px, 1fr))` (dense: 200px) of 4 product cards.
4. **Story split**: a 4:3 workshop photo next to a text column (max 46ch): label "NOMAD STUDIO · MADE BY HAND", h2 "We don't make souvenirs. We make doses.", a paragraph, and a "THE STUDIO" link. Stacks under 840px.
5. **Collections index**: rows separated by hairlines, 4 columns `80px 1fr 1fr auto`: No. / City / Craft / Status.
   - No. 01 · Jaipur · Silver & stone · AVAILABLE
   - No. 02 · To be announced · Next city, next craft · SOON (45% opacity)

### Product card
- 4:5 image (placeholder fill `#e6e4df`)
- Row with the name on the left and `€price` on the right (13px)
- Optional product code below (11px muted), e.g. `D01·E01 · AG925+CIT`
- The whole card links to the product page

### Shop (`/shop`, later `/jaipur`)
- Label "NO. 01 — JAIPUR · SILVER & STONE", h1 "Shop"
- Filters on the right: ALL / EAR / NECK / FINGER / WRIST. The active filter gets a 1px ink underline.
- A hairline, then the full product grid.

### Product (`/products/[slug]`)
Two flex columns that wrap below about 760px.
- **Left (flex 1.4)**: gallery grid `auto-fit minmax(300px, 1fr)`, gap 12px, 4:5 images.
- **Right (flex 1, max 480px, sticky at top 96px)**:
  - Back link "← No. 01 — Jaipur"
  - h1 name, then price
  - Description paragraph
  - Spec table with hairline rows; muted label column at 36%: No. / Metal / Stone / Made / Code
  - Ring sizes (only when `sized`): 48×44 square buttons 50/52/54/56. Selected = ink fill and paper text; unselected = hairline border.
  - **Add to cart**: full width, 52px tall, ink bg, paper text, 12px uppercase; hover `#3a3a38`. After adding, the label reads "Added — add another" and the cart drawer opens.
  - Notes: "Each piece is cut and set by hand, so stones vary slightly." / "Ships from the studio in 5–10 days, worldwide."

### Studio (`/studio`)
- Label "STUDIO", h1 "A nomad studio. Each city gives a new dose."
- A 4:5 tea-house photo next to 3 paragraphs (max 52ch)
- Table: No. 01 Jaipur · Silver & stone / No. 02 To be announced / Write hello@doseof.com / Follow @doseof

### Footer (top hairline, 12px)
4 auto-fit columns:
1. O symbol (44px) + "Nomad studio · Made by hand"
2. Shop / Studio / Contact
3. Shipping & returns / Care / Instagram @doseof
4. "Letters from the next city": an email input with an underline and a "JOIN" button

### Cart drawer
- Fixed on the right, `min(420px, 100%)` wide, paper bg, left hairline. The backdrop closes it.
- Header: "CART (n)" and "CLOSE"
- Line items: 72px 4:5 thumbnail, name, "Size 52 · Qty 1", "REMOVE" link, and the line total
- Empty state: "Your cart is empty."
- Footer: Subtotal, then a CHECKOUT button styled like Add to cart

## Interactions & state
- Routes: home, shop, product/[id], studio. Scroll to top on navigation.
- Shop filter: local state, defaults to "All".
- Product size: defaults to 52.
- Cart: lines are keyed by product id + size, and qty increments when the same line is added again. Persist the cart in localStorage. Count = sum of qty.
- Checkout: not wired. Implement with Shopify (recommended) or Stripe Checkout.
- Newsletter: not wired. Hook it to your email provider.
- No animations in the prototype. If you add any, keep them subtle (opacity/translate ≤ 200ms).

## Product data (placeholder, replace with the user's list)
| id | name | € | part | stone | code | sized |
|---|---|---|---|---|---|---|
| 1 | Citrine Drop Earrings | 140 | Ear | Citrine | D01·E01 · AG925+CIT | |
| 2 | Pyrite Chain Necklace | 180 | Neck | Pyrite | D01·N01 · AG925+PYR | |
| 3 | Old City Signet | 160 | Finger | Fluorite | D01·F01 · AG925+FLU | ✓ |
| 4 | Bench Cuff | 210 | Wrist | None, raw silver | D01·W01 · AG925 | |
| 5 | Pearl & Silver Choker | 190 | Neck | Freshwater pearl | D01·N02 · AG925+PRL | |
| 6 | Stone Hoops | 120 | Ear | Citrine | D01·E02 · AG925+CIT | |
| 7 | Cutter's Ring | 110 | Finger | Pyrite | D01·F02 · AG925+PYR | ✓ |
| 8 | Fluorite Pendant | 150 | Neck | Fluorite | D01·N03 · AG925+FLU | |

Code format: `D{collection}·{part letter}{nn} · AG925+{STONE3}`.

## Assets
- `assets/logo/`: wordmark and O symbol, black and white (SVG)
- `assets/photos/`: 4 Jaipur campaign photos
  - `jaipur-street-two-models.jpg`: home hero
  - `jaipur-necklaces.jpg`
  - `jaipur-tea-house.jpg`: studio page
  - `jaipur-stone-cutting.jpg`: home story

## Files
- `DOSE Website.dc.html`: the prototype (template + logic in one file)
- `support.js`: the runtime that the prototype needs in order to open in a browser

## Suggested first prompt for Claude Code
> Read design_handoff_dose_website/README.md and the prototype. Scaffold a Next.js + TypeScript site in this repo that recreates it exactly: routes /, /shop, /products/[slug], /studio, a cart drawer with localStorage, and products in `data/products.ts`. Copy the assets into /public. Don't wire checkout yet.
