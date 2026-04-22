const express = require("express");
const cors    = require("cors");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ── In-memory store ──
let products = [];
let history  = [];
let nextId   = 1;

function logHistory(action, data) {
  history.unshift({
    id:        history.length + 1,
    action,
    data,
    timestamp: new Date().toISOString(),
  });
  if (history.length > 100) history.pop(); // max 100 entries
}

// ─────────────────────────────────────────────
// GET /products
// ─────────────────────────────────────────────
app.get("/products", (req, res) => {
  res.status(200).json({ success: true, data: products });
});

// ─────────────────────────────────────────────
// POST /products
// ─────────────────────────────────────────────
app.post("/products", (req, res) => {
  const { name, description, price, category, stock } = req.body;

  if (!name || !description || price === undefined || !category) {
    return res.status(400).json({ success: false, message: "Faltan campos requeridos: name, description, price, category" });
  }
  if (isNaN(price) || Number(price) < 0) {
    return res.status(400).json({ success: false, message: "El precio debe ser un número positivo" });
  }

  const newProduct = {
    id:          nextId++,
    name:        name.trim(),
    description: description.trim(),
    price:       parseFloat(Number(price).toFixed(2)),
    category:    category.trim(),
    stock:       stock !== undefined ? parseInt(stock) : 0,
    createdAt:   new Date().toISOString(),
    updatedAt:   new Date().toISOString(),
  };

  products.push(newProduct);
  logHistory("CREATE", newProduct);

  res.status(201).json({ success: true, message: "Producto creado", data: newProduct });
});

// ─────────────────────────────────────────────
// PUT /products/:id  →  Edit a product
// ─────────────────────────────────────────────
app.put("/products/:id", (req, res) => {
  const id    = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (isNaN(id) || index === -1) {
    return res.status(404).json({ success: false, message: `Producto con id ${id} no encontrado` });
  }

  const { name, description, price, category, stock } = req.body;
  const before = { ...products[index] };

  if (name        !== undefined) products[index].name        = name.trim();
  if (description !== undefined) products[index].description = description.trim();
  if (price       !== undefined) products[index].price       = parseFloat(Number(price).toFixed(2));
  if (category    !== undefined) products[index].category    = category.trim();
  if (stock       !== undefined) products[index].stock       = parseInt(stock);
  products[index].updatedAt = new Date().toISOString();

  logHistory("UPDATE", { before, after: products[index] });

  res.status(200).json({ success: true, message: "Producto actualizado", data: products[index] });
});

// ─────────────────────────────────────────────
// DELETE /products/:id
// ─────────────────────────────────────────────
app.delete("/products/:id", (req, res) => {
  const id    = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (isNaN(id) || index === -1) {
    return res.status(404).json({ success: false, message: `Producto con id ${id} no encontrado` });
  }

  const deleted = products.splice(index, 1)[0];
  logHistory("DELETE", deleted);

  res.status(200).json({ success: true, message: "Producto eliminado", data: deleted });
});

// ─────────────────────────────────────────────
// GET /history
// ─────────────────────────────────────────────
app.get("/history", (req, res) => {
  res.status(200).json({ success: true, data: history });
});

// ── 404 ──
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Ruta ${req.method} ${req.path} no encontrada` });
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));