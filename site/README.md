# DOSE website

Plain HTML, CSS and JavaScript. No build step, nothing to install.

## See it
Double-click `index.html`, or from the `Dose` folder run:

    python3 -m http.server 4321 --directory site

then open http://localhost:4321

## Pages
- `#/` home
- `#/shop` shop with filters
- `#/products/<slug>` product page
- `#/studio` studio

## Files
- `index.html` header, footer, cart drawer
- `styles.css` all styling (brand colours and fonts at the top)
- `app.js` pages, routing and the cart (saved in the browser)
- `data/products.js` **the product list — edit names, prices, stones here**
- `assets/` logo and web-sized photos (originals are in `/photos`)

## Not done yet
- Checkout (Shopify or Stripe)
- Newsletter sign-up (email provider)
- Real product photos and product list (current ones are placeholders)
