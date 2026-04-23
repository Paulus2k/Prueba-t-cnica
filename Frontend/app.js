// ── Configuracion ──
const API_BASE = "http://localhost:3000";

// ── Estado ──
let lang           = "es";
let activeCurrency = "USD";
let editingId      = null;
let cachedProducts = [];
let exchangeRates  = { USD: 1 };
let historyOpen    = false;


const CURRENCIES = ["USD", "GTQ", "EUR", "MXN", "GBP"];

// ── Traductor ──
const i18n = {
  es: {
    title:          "Gestor de <span>Productos</span>",
    formTitleAdd:   "Agregar Producto",
    formTitleEdit:  "Editar Producto",
    labelName:      "Nombre",
    labelDesc:      "Descripción",
    labelPrice:     "Precio (USD)",
    labelStock:     "Stock",
    labelCat:       "Categoría",
    labelCustomCat: "Nombre de categoría",
    submitAdd:      "Agregar Producto",
    submitEdit:     "Guardar Cambios",
    cancelBtn:      "Cancelar",
    listTitle:      "Productos",
    filterName:     "Buscar por nombre…",
    filterMinPrice: "Precio mín.",
    filterMaxPrice: "Precio máx.",
    filterCat:      "Todas las categorías",
    emptyState:     "Aún no hay productos. Agrega uno con el formulario.",
    emptySearch:    "Sin resultados para tu búsqueda.",
    deleteBtn:      "Eliminar",
    editBtn:        "Editar",
    catPlaceholder: "Selecciona una categoría…",
    catCustom:      "+ Nueva categoría",
    categories:     ["Electrónica","Ropa","Libros","Alimentos y Bebidas","Hogar y Jardín","Deportes","Juguetes"],
    countSingle:    "elemento",
    countPlural:    "elementos",
    stockLabel:     "en stock",
    stockLow:       "stock bajo",
    toastAdded:     (n) => `"${n}" agregado correctamente.`,
    toastUpdated:   (n) => `"${n}" actualizado.`,
    toastDeleted:   "Producto eliminado.",
    toastEmpty:     "Por favor completa todos los campos.",
    toastNoConn:    "No se pudo conectar a la API.",
    toastErrAdd:    "Error al agregar el producto.",
    toastErrEdit:   "Error al actualizar el producto.",
    toastErrDel:    "Error al eliminar el producto.",
    adding:         "Guardando…",
    historyTitle:   "Historial de Cambios",
    historyEmpty:   "No hay cambios registrados aún.",
    historyCreate:  (n) => `Producto "${n}" creado`,
    historyUpdate:  (n) => `Producto "${n}" editado`,
    historyDelete:  (n) => `Producto "${n}" eliminado`,
    catMgrTitle:    "Gestionar Categorías",
    catMgrEmpty:    "No hay categorías registradas.",
    catMgrInUse:    (n) => `En uso por ${n} producto(s) — no se puede eliminar`,
    catMgrDeleted:  (n) => `Categoría "" eliminada.`,
    catMgrProducts: "productos",
  },
  en: {
    title:          "Product <span>Manager</span>",
    formTitleAdd:   "Add Product",
    formTitleEdit:  "Edit Product",
    labelName:      "Name",
    labelDesc:      "Description",
    labelPrice:     "Price (USD)",
    labelStock:     "Stock",
    labelCat:       "Category",
    labelCustomCat: "Category name",
    submitAdd:      "Add Product",
    submitEdit:     "Save Changes",
    cancelBtn:      "Cancel",
    listTitle:      "Products",
    filterName:     "Search by name…",
    filterMinPrice: "Min price",
    filterMaxPrice: "Max price",
    filterCat:      "All categories",
    emptyState:     "No products yet. Add one using the form.",
    emptySearch:    "No results for your search.",
    deleteBtn:      "Delete",
    editBtn:        "Edit",
    catPlaceholder: "Select a category…",
    catCustom:      "+ New category",
    categories:     ["Electronics","Clothing","Books","Food & Beverage","Home & Garden","Sports","Toys"],
    countSingle:    "item",
    countPlural:    "items",
    stockLabel:     "in stock",
    stockLow:       "low stock",
    toastAdded:     (n) => `"${n}" added successfully!`,
    toastUpdated:   (n) => `"${n}" updated.`,
    toastDeleted:   "Product removed.",
    toastEmpty:     "Please fill in all fields.",
    toastNoConn:    "Could not connect to the API.",
    toastErrAdd:    "Error adding product.",
    toastErrEdit:   "Error updating product.",
    toastErrDel:    "Error deleting product.",
    adding:         "Saving…",
    historyTitle:   "Change History",
    historyEmpty:   "No changes recorded yet.",
    historyCreate:  (n) => `Product "${n}" created`,
    historyUpdate:  (n) => `Product "${n}" updated`,
    historyDelete:  (n) => `Product "${n}" deleted`,
    catMgrTitle:    "Manage Categories",
    catMgrEmpty:    "No categories registered.",
    catMgrInUse:    (n) => `Used by ${n} product(s) — cannot delete`,
    catMgrDeleted:  (n) => `Category "" deleted.`,
    catMgrProducts: "products",
  }
};

let t = i18n[lang];

// ── Referencias ──
const form           = document.getElementById("product-form");
const list           = document.getElementById("product-list");
const emptyState     = document.getElementById("empty-state");
const countBadge     = document.getElementById("product-count");
const submitBtn      = document.getElementById("submit-btn");
const cancelBtn      = document.getElementById("cancel-btn");
const toastEl        = document.getElementById("toast");
const langBtn        = document.getElementById("lang-btn");
const currencySelect = document.getElementById("currency-select");
const rateDisplay    = document.getElementById("rate-display");
const catSelect      = document.getElementById("category");
const customCatGroup = document.getElementById("custom-cat-group");
const customCatInput = document.getElementById("custom-category");
const historyToggle  = document.getElementById("history-toggle");
const historyPanel   = document.getElementById("history-panel");
const historyList    = document.getElementById("history-list");
const historyEmpty   = document.getElementById("history-empty");
const historyArrow   = document.getElementById("history-arrow");

// Filtrado de referencias
const filterName     = document.getElementById("filter-name");
const filterMinPrice = document.getElementById("filter-min-price");
const filterMaxPrice = document.getElementById("filter-max-price");
const filterCat      = document.getElementById("filter-cat");

let toastTimer;

// Obtener los tipos de cambio
async function fetchExchangeRates() {
  try {
    const res  = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    if (data && data.rates) {
      exchangeRates = { USD: 1, ...data.rates };
      updateRateDisplay();
    }
  } catch {
    // utilizar tarifas alternativas
    exchangeRates = { USD: 1, GTQ: 7.64, EUR: 0.93, MXN: 17.15, GBP: 0.79 };
    updateRateDisplay();
  }
}

function updateRateDisplay() {
  if (activeCurrency === "USD") {
    rateDisplay.textContent = "";
    rateDisplay.style.display = "none";
  } else {
    const rate = exchangeRates[activeCurrency] || 1;
    rateDisplay.textContent   = `1 USD = ${rate.toFixed(2)} ${activeCurrency}`;
    rateDisplay.style.display = "inline-block";
  }
}

function formatPrice(usdPrice) {
  const rate   = exchangeRates[activeCurrency] || 1;
  const amount = (usdPrice * rate).toFixed(2);
  const symbols = { USD: "$", GTQ: "Q", EUR: "€", MXN: "$", GBP: "£" };
  const symbol  = symbols[activeCurrency] || "";
  return `${symbol}${amount} ${activeCurrency !== "USD" ? activeCurrency : ""}`.trim();
}

// ── Selector de moneda ──
function buildCurrencySelector() {
  currencySelect.innerHTML = "";
  CURRENCIES.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    if (c === activeCurrency) opt.selected = true;
    currencySelect.appendChild(opt);
  });
}

currencySelect.addEventListener("change", () => {
  activeCurrency = currencySelect.value;
  updateRateDisplay();
  updatePriceLabel();
  renderProducts(cachedProducts);
});

function updatePriceLabel() {
  const label = lang === "es" ? `Precio (${activeCurrency})` : `Price (${activeCurrency})`;
  document.getElementById("label-price").textContent = label;
}

// ─────────────────────────────────────────────
// Aplicacion de traducciones
// ─────────────────────────────────────────────
function applyLang() {
  t = i18n[lang];
  document.getElementById("title").innerHTML           = t.title;
  document.getElementById("form-title").textContent    = editingId ? t.formTitleEdit : t.formTitleAdd;
  document.getElementById("label-name").textContent    = t.labelName;
  document.getElementById("label-desc").textContent    = t.labelDesc;
  document.getElementById("label-price").textContent   = t.labelPrice;
  document.getElementById("label-stock").textContent   = t.labelStock;
  document.getElementById("label-cat").textContent     = t.labelCat;
  document.getElementById("label-custom-cat").textContent = t.labelCustomCat;
  submitBtn.textContent  = editingId ? t.submitEdit : t.submitAdd;
  cancelBtn.textContent  = t.cancelBtn;
  document.getElementById("list-title").textContent    = t.listTitle;
  document.getElementById("history-btn-label").textContent = t.historyTitle;
  document.getElementById("catmgr-btn-label").textContent  = t.catMgrTitle;
  langBtn.textContent    = lang === "es" ? "EN" : "ES";

  // Filter placeholders
  filterName.placeholder     = t.filterName;
  filterMinPrice.placeholder = t.filterMinPrice;
  filterMaxPrice.placeholder = t.filterMaxPrice;

  rebuildCategories();
  rebuildFilterCategories();
  updatePriceLabel();
  renderProducts(cachedProducts);
}

// Marcadores de posición del filtro
// ─────────────────────────────────────────────
function rebuildCategories(selectedValue = "") {
  catSelect.innerHTML = `<option value="" disabled selected>${t.catPlaceholder}</option>`;
  t.categories.forEach(c => {
    const opt = document.createElement("option");
    opt.value = opt.textContent = c;
    if (c === selectedValue) opt.selected = true;
    catSelect.appendChild(opt);
  });
  const custom = document.createElement("option");
  custom.value = "__custom__";
  custom.textContent = t.catCustom;
  if (selectedValue === "__custom__") custom.selected = true;
  catSelect.appendChild(custom);
}

function rebuildFilterCategories() {
  const current = filterCat.value;
  filterCat.innerHTML = `<option value="">${t.filterCat}</option>`;

  // Build unique list from cached products + default categories
  const allCats = new Set([...t.categories]);
  cachedProducts.forEach(p => allCats.add(p.category));

  allCats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = opt.textContent = c;
    if (c === current) opt.selected = true;
    filterCat.appendChild(opt);
  });
}

catSelect.addEventListener("change", () => {
  const isCustom = catSelect.value === "__custom__";
  customCatGroup.style.display = isCustom ? "block" : "none";
  if (!isCustom) customCatInput.value = "";
});

function getCategoryValue() {
  return catSelect.value === "__custom__" ? customCatInput.value.trim() : catSelect.value;
}

// Filtros
// ─────────────────────────────────────────────
[filterName, filterMinPrice, filterMaxPrice, filterCat].forEach(el => {
  el.addEventListener("input",  () => renderProducts(cachedProducts));
  el.addEventListener("change", () => renderProducts(cachedProducts));
});

function filterProducts(products) {
  const name  = filterName.value.trim().toLowerCase();
  const minP  = parseFloat(filterMinPrice.value);
  const maxP  = parseFloat(filterMaxPrice.value);
  const cat   = filterCat.value;

  return products.filter(p => {
    if (name && !p.name.toLowerCase().includes(name)) return false;
    if (!isNaN(minP) && p.price < minP) return false;
    if (!isNaN(maxP) && p.price > maxP) return false;
    if (cat  && p.category !== cat) return false;
    return true;
  });
}

// Seleccionar idioma
// ─────────────────────────────────────────────
langBtn.addEventListener("click", () => {
  lang = lang === "es" ? "en" : "es";
  applyLang();
});

// Notificaciones (toasts)
// ─────────────────────────────────────────────
function showToast(msg, isError = false) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.className   = "show" + (isError ? " error" : "");
  toastTimer = setTimeout(() => { toastEl.className = ""; }, 3000);
}

// Cargar y mostrar productos
// ─────────────────────────────────────────────
async function loadProducts() {
  try {
    const res  = await fetch(`${API_BASE}/products`);
    const json = await res.json();
    cachedProducts = json.data;
    rebuildFilterCategories();
    renderProducts(cachedProducts);
  } catch {
    showToast(t.toastNoConn, true);
  }
}

function renderProducts(products) {
  const filtered = filterProducts(products);
  list.innerHTML  = "";
  const count     = filtered.length;

  countBadge.textContent   = `${count} ${count === 1 ? t.countSingle : t.countPlural}`;
  const hasFilter = filterName.value || filterMinPrice.value || filterMaxPrice.value || filterCat.value;
  emptyState.style.display = count === 0 ? "block" : "none";
  emptyState.textContent   = hasFilter ? t.emptySearch : t.emptyState;

  filtered.forEach(p => {
    const isLow = p.stock !== undefined && p.stock <= 5;
    const card  = document.createElement("div");
    card.className  = "product-card" + (editingId === p.id ? " editing" : "");
    card.dataset.id = p.id;
    card.innerHTML  = `
      <div>
        <div class="product-name">${escHtml(p.name)}</div>
        <div class="product-meta">
          <span class="price">${formatPrice(p.price)}</span>
          <span class="category">${escHtml(p.category)}</span>
          <span class="stock ${isLow ? "low" : ""}">
            ${p.stock} ${isLow ? t.stockLow : t.stockLabel}
          </span>
        </div>
        <div class="product-desc">${escHtml(p.description)}</div>
      </div>
      <div class="card-actions">
        <button class="btn-edit"   data-id="${p.id}">${t.editBtn}</button>
        <button class="btn-delete" data-id="${p.id}">${t.deleteBtn}</button>
      </div>
    `;
    list.appendChild(card);
  });
}

// Enviar (añadir o editar)
// ─────────────────────────────────────────────
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name        = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const price       = document.getElementById("price").value;
  const stock       = document.getElementById("stock").value;
  const category    = getCategoryValue();

  if (!name || !description || !price || !category) {
    showToast(t.toastEmpty, true);
    return;
  }

  submitBtn.disabled  = true;
  submitBtn.innerHTML = `<span class="spinner"></span>${t.adding}`;

  const body = JSON.stringify({ name, description, price: parseFloat(price), category, stock: parseInt(stock) || 0 });

  try {
    let res, json;
    if (editingId) {
      res  = await fetch(`${API_BASE}/products/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body });
      json = await res.json();
      if (!res.ok) { showToast(json.message || t.toastErrEdit, true); }
      else {
        // Persist custom category on edit too
        if (!t.categories.includes(category) && !customCategories.includes(category)) {
          customCategories.push(category);
        }
        showToast(t.toastUpdated(name)); cancelEdit(); loadProducts();
      }
    } else {
      res  = await fetch(`${API_BASE}/products`, { method: "POST", headers: { "Content-Type": "application/json" }, body });
      json = await res.json();
      if (!res.ok) { showToast(json.message || t.toastErrAdd, true); }
      else {
        // If custom category, persist it so it survives product deletion
        if (!t.categories.includes(category) && !customCategories.includes(category)) {
          customCategories.push(category);
        }
        showToast(t.toastAdded(name));
        form.reset();
        catSelect.value = "";
        customCatGroup.style.display = "none";
        loadProducts();
      }
    }
  } catch {
    showToast(t.toastNoConn, true);
  } finally {
    submitBtn.disabled    = false;
    submitBtn.textContent = editingId ? t.submitEdit : t.submitAdd;
  }
});

// Editar y eliminar productos
// ─────────────────────────────────────────────
list.addEventListener("click", async (e) => {
  const editBtn = e.target.closest(".btn-edit");
  if (editBtn) {
    const id = parseInt(editBtn.dataset.id);
    const p  = cachedProducts.find(p => p.id === id);
    if (!p) return;

    editingId = id;
    document.getElementById("name").value        = p.name;
    document.getElementById("description").value = p.description;
    document.getElementById("price").value       = p.price;
    document.getElementById("stock").value       = p.stock;

    const knownCat = t.categories.includes(p.category);
    rebuildCategories(knownCat ? p.category : "__custom__");
    if (!knownCat) { customCatGroup.style.display = "block"; customCatInput.value = p.category; }

    document.getElementById("form-title").textContent = t.formTitleEdit;
    submitBtn.textContent   = t.submitEdit;
    cancelBtn.style.display = "inline-block";
    renderProducts(cachedProducts);
    document.querySelector(".panel").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const delBtn = e.target.closest(".btn-delete");
  if (!delBtn) return;

  const id   = delBtn.dataset.id;
  const card = delBtn.closest(".product-card");
  delBtn.disabled    = true;
  delBtn.textContent = "…";

  try {
    const res  = await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok) {
      showToast(json.message || t.toastErrDel, true);
      delBtn.disabled    = false;
      delBtn.textContent = t.deleteBtn;
    } else {
      showToast(t.toastDeleted);
      card.style.transition = "opacity 0.2s";
      card.style.opacity    = "0";
      setTimeout(() => loadProducts(), 200);
    }
  } catch {
    showToast(t.toastNoConn, true);
    delBtn.disabled    = false;
    delBtn.textContent = t.deleteBtn;
  }
});

// Cacelar edición
// ─────────────────────────────────────────────
function cancelEdit() {
  editingId = null;
  form.reset();
  rebuildCategories();
  customCatGroup.style.display    = "none";
  cancelBtn.style.display         = "none";
  submitBtn.textContent           = t.submitAdd;
  document.getElementById("form-title").textContent = t.formTitleAdd;
  renderProducts(cachedProducts);
}
cancelBtn.addEventListener("click", cancelEdit);

// Hitorial de cambios
// ─────────────────────────────────────────────
historyToggle.addEventListener("click", () => {
  historyOpen = !historyOpen;
  historyPanel.style.display = historyOpen ? "block" : "none";
  historyArrow.classList.toggle("open", historyOpen);
  if (historyOpen) loadHistory();
});

async function loadHistory() {
  try {
    const res  = await fetch(`${API_BASE}/history`);
    const json = await res.json();
    renderHistory(json.data);
  } catch {
    historyEmpty.style.display = "block";
    historyList.innerHTML = "";
  }
}

function renderHistory(items) {
  historyList.innerHTML = "";
  historyEmpty.style.display = items.length === 0 ? "block" : "none";

  const fieldLabels = {
    es: { name: "Nombre", description: "Descripción", price: "Precio", category: "Categoría", stock: "Stock" },
    en: { name: "Name",   description: "Description",  price: "Price",  category: "Category",  stock: "Stock" },
  };

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "history-item";
    const time = new Date(item.timestamp).toLocaleString(lang === "es" ? "es-GT" : "en-US");

    let mainText = "";
    let detailHTML = "";

    if (item.action === "CREATE") {
      const p = item.data;
      mainText = t.historyCreate(escHtml(p.name));
      detailHTML = `
        <div class="history-detail">
          <span>${fieldLabels[lang].name}: <b>${escHtml(p.name)}</b></span>
          <span>${fieldLabels[lang].price}: <b>$${p.price}</b></span>
          <span>${fieldLabels[lang].category}: <b>${escHtml(p.category)}</b></span>
          <span>${fieldLabels[lang].stock}: <b>${p.stock}</b></span>
        </div>`;

    } else if (item.action === "UPDATE") {
      const before = item.data.before;
      const after  = item.data.after;
      mainText = t.historyUpdate(escHtml(after.name));

      const fields  = ["name", "description", "price", "category", "stock"];
      const changes = fields.filter(f => String(before[f]) !== String(after[f]));

      if (changes.length > 0) {
        const rows = changes.map(f => `
          <div class="history-diff-row">
            <span class="diff-field">${fieldLabels[lang][f]}</span>
            <span class="diff-before">${escHtml(String(before[f]))}</span>
            <span class="diff-arrow">→</span>
            <span class="diff-after">${escHtml(String(after[f]))}</span>
          </div>`).join("");
        detailHTML = `<div class="history-diff">${rows}</div>`;
      }

    } else {
      const p = item.data;
      mainText = t.historyDelete(escHtml(p.name));
      detailHTML = `
        <div class="history-detail">
          <span>${fieldLabels[lang].price}: <b>$${p.price}</b></span>
          <span>${fieldLabels[lang].category}: <b>${escHtml(p.category)}</b></span>
        </div>`;
    }

    div.innerHTML = `
      <span class="history-badge badge-${item.action}">${item.action}</span>
      <div style="flex:1">
        <div class="history-text">${mainText}</div>
        ${detailHTML}
        <div class="history-time">${time}</div>
      </div>
    `;
    historyList.appendChild(div);
  });
}

// Escape HTML
// ─────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Inicio ──
buildCurrencySelector();
fetchExchangeRates().then(() => {
  applyLang();
  loadProducts();
});

// Categorías personalizadas
// ─────────────────────────────────────────────

// Estado: categorías personalizadas añadidas por el usuario 
let customCategories = [];
let catMgrOpen = false;

const catMgrToggle = document.getElementById("catmgr-toggle");
const catMgrPanel  = document.getElementById("catmgr-panel");
const catMgrList   = document.getElementById("catmgr-list");
const catMgrEmpty  = document.getElementById("catmgr-empty");
const catMgrArrow  = document.getElementById("catmgr-arrow");

catMgrToggle.addEventListener("click", () => {
  catMgrOpen = !catMgrOpen;
  catMgrPanel.style.display = catMgrOpen ? "block" : "none";
  catMgrArrow.classList.toggle("open", catMgrOpen);
  if (catMgrOpen) renderCatManager();
});

function getAllCategories() {
  const all = new Set([...t.categories, ...customCategories]);
  cachedProducts.forEach(p => {
    if (!i18n.es.categories.includes(p.category) &&
        !i18n.en.categories.includes(p.category) &&
        !customCategories.includes(p.category)) {
      all.add(p.category);
    }
  });
  return [...all].sort();
}

function renderCatManager() {
  catMgrList.innerHTML = "";
  const all = getAllCategories();
  catMgrEmpty.style.display = all.length === 0 ? "block" : "none";

  all.forEach(cat => {
    const usedBy = cachedProducts.filter(p => p.category === cat).length;
    const canDelete = usedBy === 0;

    const row = document.createElement("div");
    row.className = "catmgr-row";
    row.innerHTML = `
      <div class="catmgr-info">
        <span class="catmgr-name">${escHtml(cat)}</span>
        <span class="catmgr-count ${canDelete ? "" : "in-use"}">
          ${usedBy} ${t.catMgrProducts}
        </span>
      </div>
      <button
        class="btn-cat-delete ${canDelete ? "" : "disabled"}"
        data-cat="${escHtml(cat)}"
        ${canDelete ? "" : "disabled"}
        title="${canDelete ? "" : t.catMgrInUse(usedBy)}"
      >✕</button>
    `;
    catMgrList.appendChild(row);
  });
}

catMgrList.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-cat-delete");
  if (!btn || btn.disabled) return;

  const cat = btn.dataset.cat;

  // Eliminar de la lista predeterminada
  const esIdx = i18n.es.categories.indexOf(cat);
  if (esIdx !== -1) i18n.es.categories.splice(esIdx, 1);
  const enIdx = i18n.en.categories.indexOf(cat);
  if (enIdx !== -1) i18n.en.categories.splice(enIdx, 1);

  customCategories = customCategories.filter(c => c !== cat);

  showToast(t.catMgrDeleted(cat));
  rebuildCategories();
  rebuildFilterCategories();
  renderCatManager();
});

const _origLoadProducts = loadProducts;
async function loadProductsAndSync() {
  await _origLoadProducts();
  if (catMgrOpen) renderCatManager();
}

const origGetCategoryValue = getCategoryValue;