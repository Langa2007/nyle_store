import pool from "../db/connect.js";

// ✅ PUBLIC: LIST PRODUCTS
export const listProducts = async (req, res) => {
  try {
    const q = `
      SELECT p.*, v.legal_name AS vendor_name, v.company_name
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      ORDER BY p.created_at DESC
      LIMIT 200
    `;

    const { rows } = await pool.query(q);
    res.json(rows);
  } catch (err) {
    console.error("❌ List products error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ PUBLIC: GET PRODUCT BY ID (WITH VENDOR)
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const q = `
      SELECT p.*, 
        v.id AS vendor_id,
        v.legal_name AS vendor_name,
        v.company_name,
        v.shipping_profile,
        v.shipping_rate,
        v.email AS vendor_email
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      WHERE p.id = $1
    `;

    const { rows } = await pool.query(q, [id]);

    if (!rows.length) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Fetch product error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ PUBLIC: SEARCH & FILTER
export const searchAndFilterProducts = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  let query = "SELECT * FROM products WHERE 1=1";
  const values = [];
  let count = 1;

  if (name) {
    query += ` AND LOWER(name) LIKE $${count++}`;
    values.push(`%${name.toLowerCase()}%`);
  }

  if (category) {
    query += ` AND LOWER(category) = $${count++}`;
    values.push(category.toLowerCase());
  }

  if (minPrice) {
    query += ` AND price >= $${count++}`;
    values.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND price <= $${count++}`;
    values.push(maxPrice);
  }

  try {
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error("❌ Search error:", err.message);
    res.status(500).json({ error: "Failed to search/filter" });
  }
};
