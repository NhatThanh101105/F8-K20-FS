import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3001);

function parsePrice(value) {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && !value.trim()) return null;
  const price = Number(value);
  return Number.isFinite(price) && price >= 0 ? price : null;
}

let products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
];

app.use(express.json());

app.get("/products/stats", (_req, res) => {
  const total = products.length;
  const averagePrice = total
    ? Math.round(products.reduce((sum, product) => sum + product.price, 0) / total)
    : 0;
  res.json({ total, averagePrice });
});

// GET /products?query=product&page=1&pageSize=5
app.get("/products", (req, res) => {
  const query = String(req.query.query ?? "").trim().toLocaleLowerCase("vi");
  const requestedPage = Number.parseInt(String(req.query.page ?? "1"), 10);
  const requestedPageSize = Number.parseInt(String(req.query.pageSize ?? "5"), 10);
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const pageSize =
    Number.isInteger(requestedPageSize) && requestedPageSize > 0
      ? Math.min(requestedPageSize, 100)
      : 5;

  const filtered = products.filter((product) =>
    product.name.toLocaleLowerCase("vi").includes(query),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const items = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  res.json({ items, total: filtered.length, totalPages, currentPage });
});

app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((item) => item.id === productId);

  if (!Number.isInteger(productId) || !product) {
    return res.status(404).json({ error: "Product not found" });
  }
  return res.json(product);
});

app.post("/products", (req, res) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const price = parsePrice(req.body?.price);

  if (!name || price === null) {
    return res.status(400).json({ error: "name and a non-negative price are required" });
  }

  const id = Math.max(0, ...products.map((product) => product.id)) + 1;
  const newProduct = { id, name, price };
  products.push(newProduct);
  return res.status(201).json(newProduct);
});

app.patch("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const productIndex = products.findIndex((product) => product.id === productId);

  if (!Number.isInteger(productId) || productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const updates = {};
  if (req.body?.name !== undefined) {
    if (typeof req.body.name !== "string" || !req.body.name.trim()) {
      return res.status(400).json({ error: "name must be a non-empty string" });
    }
    updates.name = req.body.name.trim();
  }
  if (req.body?.price !== undefined) {
    const price = parsePrice(req.body.price);
    if (price === null) {
      return res.status(400).json({ error: "price must be a non-negative number" });
    }
    updates.price = price;
  }
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "Provide name or price to update" });
  }

  products[productIndex] = { ...products[productIndex], ...updates };
  return res.json(products[productIndex]);
});

app.delete("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const exists = products.some((product) => product.id === productId);

  if (!Number.isInteger(productId) || !exists) {
    return res.status(404).json({ error: "Product not found" });
  }

  products = products.filter((product) => product.id !== productId);
  return res.json({ message: "Product deleted successfully" });
});

app.listen(port, () => {
  console.log(`Products API listening at http://localhost:${port}`);
});
