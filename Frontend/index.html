<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gestor de Productos</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:      #0d0d0d;
      --surface: #161616;
      --border:  #2a2a2a;
      --accent:  #e8ff47;
      --text:    #f0f0f0;
      --muted:   #666;
      --danger:  #ff4545;
      --radius:  6px;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      min-height: 100vh;
      padding: 2rem 1rem;
    }

    .container { max-width: 900px; margin: 0 auto; }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    header h1 {
      font-family: 'Syne', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.03em;
    }

    header h1 span { color: var(--accent); }

    .header-controls { display: flex; gap: 0.5rem; align-items: center; }

    /* ── Shared pill button style ── */
    .pill-btn {
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--muted);
      padding: 0.3rem 0.8rem;
      border-radius: 100px;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
    }
    .pill-btn:hover { border-color: var(--accent); color: var(--accent); }
    .pill-btn.active { border-color: var(--accent); color: var(--accent); }

    .grid {
      display: grid;
      grid-template-columns: 340px 1fr;
      gap: 2rem;
      align-items: start;
    }

    @media (max-width: 700px) { .grid { grid-template-columns: 1fr; } }

    .panel {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.5rem;
    }

    .panel h2 {
      font-family: 'Syne', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 1.25rem;
    }

    .form-group { margin-bottom: 1rem; }

    label {
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 0.4rem;
    }

    input, select, textarea {
      width: 100%;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      padding: 0.65rem 0.85rem;
      transition: border-color 0.15s;
      outline: none;
    }

    input:focus, select:focus, textarea:focus { border-color: var(--accent); }
    textarea { resize: vertical; min-height: 80px; }
    select option { background: #1a1a1a; }

    .btn-primary {
      width: 100%;
      margin-top: 0.5rem;
      background: var(--accent);
      color: #000;
      border: none;
      border-radius: var(--radius);
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
      padding: 0.75rem;
      cursor: pointer;
      transition: opacity 0.15s, transform 0.1s;
    }

    .btn-primary:hover  { opacity: 0.88; }
    .btn-primary:active { transform: scale(0.98); }
    .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

    #toast {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent);
      color: var(--text);
      font-size: 0.85rem;
      padding: 0.75rem 1.1rem;
      border-radius: var(--radius);
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.25s, transform 0.25s;
      pointer-events: none;
      z-index: 999;
    }

    #toast.show { opacity: 1; transform: translateY(0); }
    #toast.error { border-left-color: var(--danger); }

    .products-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .products-header h2 {
      font-family: 'Syne', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
    }

    #product-count {
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--muted);
      padding: 0.2rem 0.6rem;
      border-radius: 100px;
    }

    #empty-state {
      text-align: center;
      color: var(--muted);
      font-size: 0.85rem;
      padding: 3rem 1rem;
      border: 1px dashed var(--border);
      border-radius: var(--radius);
    }

    .product-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1rem 1.1rem;
      margin-bottom: 0.75rem;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.5rem;
      align-items: start;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .product-name {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
      margin-bottom: 0.2rem;
    }

    .product-meta {
      font-size: 0.78rem;
      color: var(--muted);
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-top: 0.3rem;
    }

    .product-meta .price { font-family: 'DM Mono', monospace; color: var(--accent); }

    .product-meta .category {
      background: #1f1f1f;
      border: 1px solid var(--border);
      padding: 0.1rem 0.45rem;
      border-radius: 100px;
    }

    .product-desc { font-size: 0.82rem; color: #aaa; margin-top: 0.35rem; line-height: 1.5; }

    .btn-delete {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--muted);
      border-radius: var(--radius);
      cursor: pointer;
      padding: 0.35rem 0.6rem;
      font-size: 0.75rem;
      transition: border-color 0.15s, color 0.15s;
      white-space: nowrap;
    }

    .btn-delete:hover { border-color: var(--danger); color: var(--danger); }

    .spinner {
      display: inline-block;
      width: 14px; height: 14px;
      border: 2px solid #333;
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      vertical-align: middle;
      margin-right: 6px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>

<div class="container">
  <header>
    <h1 id="title">Gestor de <span>Productos</span></h1>
    <div class="header-controls">
      <button class="pill-btn active" id="currency-btn">USD → GTQ</button>
      <button class="pill-btn" id="lang-btn">EN</button>
    </div>
  </header>

  <div class="grid">

    <!-- FORM -->
    <div class="panel">
      <h2 id="form-title">Agregar Producto</h2>
      <form id="product-form" novalidate>

        <div class="form-group">
          <label for="name" id="label-name">Nombre</label>
          <input type="text" id="name" required/>
        </div>

        <div class="form-group">
          <label for="description" id="label-desc">Descripción</label>
          <textarea id="description" required></textarea>
        </div>

        <div class="form-group">
          <label for="price" id="label-price">Precio (USD)</label>
          <input type="number" id="price" placeholder="0.00" min="0" step="0.01" required/>
        </div>

        <div class="form-group">
          <label for="category" id="label-cat">Categoría</label>
          <select id="category" required></select>
        </div>

        <button class="btn-primary" type="submit" id="submit-btn">Agregar Producto</button>
      </form>
    </div>

    <!-- PRODUCTS LIST -->
    <div>
      <div class="products-header">
        <h2 id="list-title">Productos</h2>
        <span id="product-count">0 elementos</span>
      </div>

      <div id="product-list"></div>
      <div id="empty-state">Aún no hay productos. Agrega uno con el formulario.</div>
    </div>

  </div>
</div>

<div id="toast"></div>

<script>
  // ── CONFIG ──
  const API_BASE    = "http://localhost:3000";
  const GTQ_RATE    = 7.64; // Tipo de cambio USD → GTQ

  // ── State ──
  let lang     = "es";
  let showGTQ  = false;  // false = USD, true = GTQ

  // ── Translations ──
  const i18n = {
    es: {
      title:          "Gestor de <span>Productos</span>",
      formTitle:      "Agregar Producto",
      labelName:      "Nombre",
      labelDesc:      "Descripción",
      labelPrice:     "Precio (USD)",
      labelCat:       "Categoría",
      submitBtn:      "Agregar Producto",
      listTitle:      "Productos",
      emptyState:     "Aún no hay productos. Agrega uno con el formulario.",
      deleteBtn:      "Eliminar",
      catPlaceholder: "Selecciona una categoría…",
      categories:     ["Electrónica","Ropa","Libros","Alimentos y Bebidas","Hogar y Jardín","Deportes","Juguetes","Otro"],
      countSingle:    "elemento",
      countPlural:    "elementos",
      toastAdded:     (n) => `"${n}" agregado correctamente.`,
      toastDeleted:   "Producto eliminado.",
      toastEmpty:     "Por favor completa todos los campos.",
      toastNoConn:    "No se pudo conectar a la API.",
      toastErrAdd:    "Error al agregar el producto.",
      toastErrDel:    "Error al eliminar el producto.",
      adding:         "Agregando…",
      currencyUSD:    "USD → GTQ",
      currencyGTQ:    "GTQ → USD",
    },
    en: {
      title:          "Product <span>Manager</span>",
      formTitle:      "Add Product",
      labelName:      "Name",
      labelDesc:      "Description",
      labelPrice:     "Price (USD)",
      labelCat:       "Category",
      submitBtn:      "Add Product",
      listTitle:      "Products",
      emptyState:     "No products yet. Add one using the form.",
      deleteBtn:      "Delete",
      catPlaceholder: "Select a category…",
      categories:     ["Electronics","Clothing","Books","Food & Beverage","Home & Garden","Sports","Toys","Other"],
      countSingle:    "item",
      countPlural:    "items",
      toastAdded:     (n) => `"${n}" added successfully!`,
      toastDeleted:   "Product removed.",
      toastEmpty:     "Please fill in all fields.",
      toastNoConn:    "Could not connect to the API.",
      toastErrAdd:    "Error adding product.",
      toastErrDel:    "Error deleting product.",
      adding:         "Adding…",
      currencyUSD:    "USD → GTQ",
      currencyGTQ:    "GTQ → USD",
    }
  };

  let t = i18n[lang];

  // ── DOM refs ──
  const form        = document.getElementById("product-form");
  const list        = document.getElementById("product-list");
  const emptyState  = document.getElementById("empty-state");
  const countBadge  = document.getElementById("product-count");
  const submitBtn   = document.getElementById("submit-btn");
  const toastEl     = document.getElementById("toast");
  const langBtn     = document.getElementById("lang-btn");
  const currencyBtn = document.getElementById("currency-btn");
  const catSelect   = document.getElementById("category");

  let toastTimer;
  let cachedProducts = [];

  // ── Format price depending on current currency mode ──
  function formatPrice(usdPrice) {
    if (showGTQ) {
      return `Q${(usdPrice * GTQ_RATE).toFixed(2)}`;
    }
    return `$${usdPrice.toFixed(2)}`;
  }

  // ── Apply translations ──
  function applyLang() {
    t = i18n[lang];
    document.getElementById("title").innerHTML        = t.title;
    document.getElementById("form-title").textContent = t.formTitle;
    document.getElementById("label-name").textContent = t.labelName;
    document.getElementById("label-desc").textContent = t.labelDesc;
    document.getElementById("label-price").textContent = t.labelPrice;
    document.getElementById("label-cat").textContent  = t.labelCat;
    submitBtn.textContent     = t.submitBtn;
    document.getElementById("list-title").textContent = t.listTitle;
    emptyState.textContent    = t.emptyState;
    langBtn.textContent       = lang === "es" ? "EN" : "ES";
    currencyBtn.textContent   = showGTQ ? t.currencyGTQ : t.currencyUSD;

    catSelect.innerHTML = `<option value="" disabled selected>${t.catPlaceholder}</option>`;
    t.categories.forEach(c => {
      const opt = document.createElement("option");
      opt.textContent = c;
      catSelect.appendChild(opt);
    });

    renderProducts(cachedProducts);
  }

  // ── Language toggle ──
  langBtn.addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    applyLang();
  });

  // ── Currency toggle ──
  currencyBtn.addEventListener("click", () => {
    showGTQ = !showGTQ;
    currencyBtn.textContent = showGTQ ? t.currencyGTQ : t.currencyUSD;
    currencyBtn.classList.toggle("active", showGTQ);
    renderProducts(cachedProducts);
  });

  // ── Toast ──
  function showToast(msg, isError = false) {
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.className   = "show" + (isError ? " error" : "");
    toastTimer = setTimeout(() => { toastEl.className = ""; }, 3000);
  }

  // ── Load products ──
  async function loadProducts() {
    try {
      const res  = await fetch(`${API_BASE}/products`);
      const json = await res.json();
      cachedProducts = json.data;
      renderProducts(cachedProducts);
    } catch {
      showToast(t.toastNoConn, true);
    }
  }

  // ── Render products ──
  function renderProducts(products) {
    list.innerHTML = "";
    const count = products.length;
    countBadge.textContent   = `${count} ${count === 1 ? t.countSingle : t.countPlural}`;
    emptyState.style.display = count === 0 ? "block" : "none";

    products.forEach(p => {
      const card = document.createElement("div");
      card.className  = "product-card";
      card.dataset.id = p.id;
      card.innerHTML  = `
        <div>
          <div class="product-name">${escHtml(p.name)}</div>
          <div class="product-meta">
            <span class="price">${formatPrice(p.price)}</span>
            <span class="category">${escHtml(p.category)}</span>
          </div>
          <div class="product-desc">${escHtml(p.description)}</div>
        </div>
        <button class="btn-delete" data-id="${p.id}">${t.deleteBtn}</button>
      `;
      list.appendChild(card);
    });
  }

  // ── Submit form ──
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name        = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
    const price       = document.getElementById("price").value;
    const category    = catSelect.value;

    if (!name || !description || !price || !category) {
      showToast(t.toastEmpty, true);
      return;
    }

    submitBtn.disabled  = true;
    submitBtn.innerHTML = `<span class="spinner"></span>${t.adding}`;

    try {
      const res  = await fetch(`${API_BASE}/products`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, description, price: parseFloat(price), category }),
      });
      const json = await res.json();

      if (!res.ok) {
        showToast(json.message || t.toastErrAdd, true);
      } else {
        showToast(t.toastAdded(name));
        form.reset();
        catSelect.value = "";
        loadProducts();
      }
    } catch {
      showToast(t.toastNoConn, true);
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = t.submitBtn;
    }
  });

  // ── Delete button ──
  list.addEventListener("click", async (e) => {
    const btn = e.target.closest(".btn-delete");
    if (!btn) return;

    const id   = btn.dataset.id;
    const card = btn.closest(".product-card");

    btn.disabled    = true;
    btn.textContent = "…";

    try {
      const res  = await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
      const json = await res.json();

      if (!res.ok) {
        showToast(json.message || t.toastErrDel, true);
        btn.disabled    = false;
        btn.textContent = t.deleteBtn;
      } else {
        showToast(t.toastDeleted);
        card.style.transition = "opacity 0.2s";
        card.style.opacity    = "0";
        setTimeout(() => loadProducts(), 200);
      }
    } catch {
      showToast(t.toastNoConn, true);
      btn.disabled    = false;
      btn.textContent = t.deleteBtn;
    }
  });

  // ── Escape HTML ──
  function escHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ── Init ──
  applyLang();
  loadProducts();
</script>
</body>
</html>