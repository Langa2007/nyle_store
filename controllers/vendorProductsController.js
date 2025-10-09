// controllers/vendorProductsController.js
import { pool } from "../db/connect.js";

/**
 * Add a product for the current vendor
 */
export const addProduct = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    if (!vendorId) {
      return res.status(401).json({ error: "Vendor authentication failed" });
    }

    const { name, description = null, price = 0, stock = 0 } = req.body;

    const q = `
      INSERT INTO products (name, description, price, stock, vendor_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(q, [
      name,
      description,
      price,
      stock,
      vendorId,
    ]);

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Vendor addProduct error:", err.message);
    return res.status(500).json({ error: "Failed to add product" });
  }
};

/**
 * Get all products belonging to the current vendor
 */
export const getVendorProducts = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    if (!vendorId) {
      return res.status(401).json({ error: "Vendor authentication failed" });
    }

    const q = "SELECT * FROM products WHERE vendor_id = $1 ORDER BY id DESC";
    const result = await pool.query(q, [vendorId]);

    return res.json(result.rows);
  } catch (err) {
    console.error("❌ Vendor getVendorProducts error:", err.message);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

/**
 * Update one of the vendor's products
 */
export const updateProduct = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    if (!vendorId) {
      return res.status(401).json({ error: "Vendor authentication failed" });
    }

    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    const q = `
      UPDATE products
      SET name = COALESCE($1, name),
          description = COALESCE($2, description),
          price = COALESCE($3, price),
          stock = COALESCE($4, stock)
      WHERE id = $5 AND vendor_id = $6
      RETURNING *;
    `;
    const result = await pool.query(q, [
      name,
      description,
      price,
      stock,
      id,
      vendorId,
    ]);

    if (!result.rows[0]) {
      return res
        .status(404)
        .json({ error: "Product not found or not owned by you" });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Vendor updateProduct error:", err.message);
    return res.status(500).json({ error: "Failed to update product" });
  }
};

/**
 * Delete a vendor product
 */
export const deleteProduct = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    if (!vendorId) {
      return res.status(401).json({ error: "Vendor authentication failed" });
    }

    const { id } = req.params;

    const q = "DELETE FROM products WHERE id = $1 AND vendor_id = $2 RETURNING *";
    const result = await pool.query(q, [id, vendorId]);

    if (!result.rows[0]) {
      return res
        .status(404)
        .json({ error: "Product not found or not owned by you" });
    }

    return res.json({ message: "Product deleted", product: result.rows[0] });
  } catch (err) {
    console.error("❌ Vendor deleteProduct error:", err.message);
    return res.status(500).json({ error: "Failed to delete product" });
  }
};
