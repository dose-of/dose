// DOSE site — a small single-page app with hash routes:
//   #/                 home
//   #/shop             shop (optional ?filter=Neck)
//   #/products/<slug>  product page
//   #/studio           studio
// Cart is stored in localStorage. Checkout and newsletter are not wired yet.

(function () {
  "use strict";

  const app = document.getElementById("app");
  const CART_KEY = "dose-cart";

  const state = {
    filter: "All",
    size: "52",
    added: false,
    cart: loadCart(),
  };

  // ---------- helpers ----------

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function euro(n) {
    return "€" + n;
  }

  function productBySlug(slug) {
    return PRODUCTS.find((p) => p.slug === slug);
  }

  function productById(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  function media(img, alt, pos, zoom) {
    const style = "object-position:" + (pos || "center") + ";transform:scale(" + (zoom || 1) + ")";
    return '<div class="media"><img src="' + esc(img) + '" alt="' + esc(alt) + '" style="' + style + '" loading="lazy"></div>';
  }

  function card(p) {
    return (
      '<a class="card" href="#/products/' + esc(p.slug) + '">' +
        media(p.img, p.name, p.pos, p.zoom) +
        '<div class="card-row"><span class="card-name">' + esc(p.name) + "</span><span>" + euro(p.price) + "</span></div>" +
        '<span class="code">' + esc(p.code) + "</span>" +
      "</a>"
    );
  }

  // ---------- pages ----------

  function homePage() {
    const featured = PRODUCTS.slice(0, 4).map(card).join("");
    const collections = COLLECTIONS.map(
      (c) =>
        '<div class="collection-row' + (c.soon ? " soon" : "") + '">' +
          '<span class="serif">' + esc(c.no) + "</span>" +
          '<span class="serif">' + esc(c.city) + "</span>" +
          '<span class="craft">' + esc(c.craft) + "</span>" +
          '<span class="label">' + esc(c.status) + "</span>" +
        "</div>"
    ).join("");

    return (
      '<section data-screen-label="Home">' +
        '<div class="hero"><img src="' + PHOTOS.street + '" alt="Two models in a Jaipur street wearing DOSE silver and stone"></div>' +
        '<div class="caption-row">' +
          '<span class="caption">No. 01 — Jaipur<br><span class="muted">Photographed in the old city, 2026</span></span>' +
          '<a class="label link-underline" href="#/shop">Shop the collection</a>' +
        "</div>" +
        '<div class="section-head">' +
          '<h2 class="serif">New from Jaipur</h2>' +
          '<a class="label" href="#/shop">View all ' + PRODUCTS.length + "</a>" +
        "</div>" +
        '<div class="grid">' + featured + "</div>" +
        '<div class="story">' +
          '<div class="story-photo"><img src="' + PHOTOS.stoneCutting + '" alt="Stone cutting at a Jaipur workshop" loading="lazy"></div>' +
          '<div class="story-text">' +
            '<span class="label muted">Nomad studio · Made by hand</span>' +
            "<h2 class=\"serif\">We don't make souvenirs. We make doses.</h2>" +
            "<p>DOSE moves from city to city and makes objects by hand with the people who live there. The first collection was made at the bench with the stone cutters and silversmiths of Jaipur, then photographed in the streets where it was made.</p>" +
            '<a class="label link-underline" href="#/studio">The studio</a>' +
          "</div>" +
        "</div>" +
        '<div class="collections">' +
          '<h6 class="label muted">Collections</h6>' +
          collections +
        "</div>" +
      "</section>"
    );
  }

  function shopPage() {
    const list = PRODUCTS.filter((p) => state.filter === "All" || p.part === state.filter);
    const filters = PARTS.map(
      (f) =>
        '<button type="button" class="filter" data-filter="' + esc(f) + '" aria-pressed="' + (f === state.filter) + '">' + esc(f) + "</button>"
    ).join("");

    return (
      '<section class="page" data-screen-label="Shop">' +
        '<div class="shop-head">' +
          '<div class="title-block">' +
            '<span class="label muted">No. 01 — Jaipur · Silver &amp; stone</span>' +
            '<h1 class="serif">Shop</h1>' +
          "</div>" +
          '<div class="filters">' + filters + "</div>" +
        "</div>" +
        '<div class="grid">' +
          (list.length ? list.map(card).join("") : '<p class="empty">Nothing here yet.</p>') +
        "</div>" +
      "</section>"
    );
  }

  function productPage(p) {
    const others = Object.values(PHOTOS).filter((src) => src !== p.img).slice(0, 3);
    const gallery =
      media(p.img, p.name, p.pos, p.zoom) +
      others.map((src) => media(src, p.name + " worn in Jaipur")).join("");

    const sizes = p.sized
      ? '<div class="sizes">' +
          '<span class="label">Size</span>' +
          '<div class="size-options">' +
            SIZES.map(
              (z) => '<button type="button" class="size" data-size="' + z + '" aria-pressed="' + (z === state.size) + '">' + z + "</button>"
            ).join("") +
          "</div>" +
        "</div>"
      : "";

    const row = (label, value, cls) =>
      "<tr><th>" + label + '</th><td' + (cls ? ' class="' + cls + '"' : "") + ">" + value + "</td></tr>";

    return (
      '<section class="product" data-screen-label="Product">' +
        '<div class="gallery">' + gallery + "</div>" +
        '<div class="product-info">' +
          '<div class="title-block">' +
            '<a class="label muted" href="#/shop">← No. 01 — Jaipur</a>' +
            '<h1 class="serif">' + esc(p.name) + "</h1>" +
            '<span class="price">' + euro(p.price) + "</span>" +
          "</div>" +
          "<p>" + esc(PRODUCT_DESCRIPTION) + "</p>" +
          '<table class="spec"><tbody>' +
            row("No.", "01 — Jaipur") +
            row("Metal", "Sterling silver, Ag 925") +
            row("Stone", esc(p.stone)) +
            row("Made", "By hand, Jaipur old city") +
            row("Code", esc(p.code), "tracked") +
          "</tbody></table>" +
          sizes +
          '<button type="button" class="btn-primary" data-action="add-to-cart" data-id="' + p.id + '">' +
            (state.added ? "Added — add another" : "Add to cart") +
          "</button>" +
          '<div class="notes">' +
            "<span>Each piece is cut and set by hand, so stones vary slightly.</span>" +
            "<span>Ships from the studio in 5–10 days, worldwide.</span>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function studioPage() {
    return (
      '<section class="page studio" data-screen-label="Studio">' +
        '<div class="studio-head">' +
          '<span class="label muted">Studio</span>' +
          '<h1 class="serif">A nomad studio. Each city gives a new dose.</h1>' +
        "</div>" +
        '<div class="studio-body">' +
          '<div class="studio-photo"><img src="' + PHOTOS.teaHouse + '" alt="Model in a Jaipur tea house wearing DOSE"></div>' +
          '<div class="studio-text">' +
            "<p>It started with a few months in Jaipur. I went to learn jewellery making and gemology, at the bench with the stone cutters and silversmiths of the old city. I stayed for the people.</p>" +
            "<p>DOSE is what came out of it: objects made by hand, in the place they come from, with the people who know how. The first collection is silver and stone. The next may be cloth, or something else. The city decides.</p>" +
            "<p>Every collection gets a number. No. 01 is Jaipur. No. 02 is on its way.</p>" +
            '<table class="spec"><tbody>' +
              "<tr><th>No. 01</th><td>Jaipur · Silver &amp; stone</td></tr>" +
              "<tr><th>No. 02</th><td>To be announced</td></tr>" +
              '<tr><th>Write</th><td><a href="mailto:hello@doseof.com">hello@doseof.com</a></td></tr>' +
              '<tr><th>Follow</th><td><a href="https://instagram.com/doseof" target="_blank" rel="noopener">@doseof</a></td></tr>' +
            "</tbody></table>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  // ---------- router ----------

  function parseRoute() {
    const hash = location.hash.replace(/^#/, "") || "/";
    const parts = hash.split("/").filter(Boolean);
    return { page: parts[0] || "home", slug: parts[1] };
  }

  function render(scrollTop) {
    const route = parseRoute();
    let html;
    let title = "DOSE — Nomad studio · Made by hand";

    if (route.page === "shop") {
      html = shopPage();
      title = "Shop — DOSE";
    } else if (route.page === "studio") {
      html = studioPage();
      title = "Studio — DOSE";
    } else if (route.page === "products" && productBySlug(route.slug)) {
      const p = productBySlug(route.slug);
      html = productPage(p);
      title = p.name + " — DOSE";
    } else {
      html = homePage();
    }

    app.innerHTML = html;
    document.title = title;
    if (scrollTop) window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", () => {
    state.added = false;
    state.size = "52";
    closeCart();
    render(true);
  });

  // ---------- cart ----------

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((c) => productById(c.id)) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    } catch (e) {
      /* storage unavailable — cart still works for this visit */
    }
  }

  function addToCart(id) {
    const p = productById(id);
    if (!p) return;
    const size = p.sized ? state.size : null;
    const key = p.id + "-" + (size || "");
    const existing = state.cart.find((c) => c.key === key);
    if (existing) existing.qty += 1;
    else state.cart.push({ key: key, id: p.id, size: size, qty: 1 });
    state.added = true;
    saveCart();
    renderCart();
    render(false);
    openCart();
  }

  function removeFromCart(key) {
    state.cart = state.cart.filter((c) => c.key !== key);
    saveCart();
    renderCart();
  }

  function renderCart() {
    const count = state.cart.reduce((n, c) => n + c.qty, 0);
    let subtotal = 0;

    const lines = state.cart.map((c) => {
      const p = productById(c.id);
      const total = p.price * c.qty;
      subtotal += total;
      const meta = (c.size ? "Size " + c.size + " · " : "") + "Qty " + c.qty;
      return (
        '<div class="cart-line">' +
          media(p.img, p.name, p.pos, p.zoom) +
          '<div class="cart-line-info">' +
            "<span>" + esc(p.name) + "</span>" +
            '<span class="muted">' + esc(meta) + "</span>" +
            '<button type="button" class="cart-remove" data-remove="' + esc(c.key) + '">Remove</button>' +
          "</div>" +
          "<span>" + euro(total) + "</span>" +
        "</div>"
      );
    });

    document.querySelectorAll("[data-cart-count]").forEach((el) => (el.textContent = count));
    document.querySelector("[data-cart-subtotal]").textContent = euro(subtotal);
    document.querySelector("[data-cart-items]").innerHTML = lines.length
      ? lines.join("")
      : '<p class="cart-empty">Your cart is empty.</p>';
  }

  const cartEl = document.querySelector(".cart");
  const backdropEl = document.querySelector(".cart-backdrop");

  function openCart() {
    cartEl.hidden = false;
    backdropEl.hidden = false;
    document.body.classList.add("cart-open");
  }

  function closeCart() {
    cartEl.hidden = true;
    backdropEl.hidden = true;
    document.body.classList.remove("cart-open");
  }

  // ---------- events ----------

  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-action], [data-filter], [data-size], [data-remove]");
    if (!target) return;

    if (target.dataset.filter) {
      state.filter = target.dataset.filter;
      render(false);
    } else if (target.dataset.size) {
      state.size = target.dataset.size;
      render(false);
    } else if (target.dataset.remove) {
      removeFromCart(target.dataset.remove);
    } else {
      const action = target.dataset.action;
      if (action === "open-cart") openCart();
      else if (action === "close-cart") closeCart();
      else if (action === "add-to-cart") addToCart(Number(target.dataset.id));
      else if (action === "checkout") alert("Checkout is coming soon.");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  const newsletter = document.querySelector("[data-newsletter]");
  newsletter.addEventListener("submit", (e) => {
    e.preventDefault();
    newsletter.querySelector(".newsletter-note").hidden = false;
    newsletter.reset();
  });

  // ---------- start ----------

  renderCart();
  render(false);
})();
