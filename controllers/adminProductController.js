import pool from "../db/connect.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import streamifier from "streamifier";

// ✅ Multer setup
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// ✅ Cloudinary uploader
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "nyle-products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// ✅ ADMIN CREATE PRODUCT WITH VENDOR
export const adminCreateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, vendor_id } = req.body;

    if (!vendor_id) {
      return res.status(400).json({ error: "vendor_id is required" });
    }

    let imageUrl = null;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const q = `
      INSERT INTO products
      (name, description, price, stock, category, image_url, vendor_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
    `;

    const values = [
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
      vendor_id,
    ];

    const { rows } = await pool.query(q, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("❌ Admin create product error:", err.message);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// ✅ ADMIN GET ALL PRODUCTS
export const adminGetAllProducts = async (req, res) => {
  try {
    const q = `
      SELECT p.*, v.legal_name AS vendor_name
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      ORDER BY p.created_at DESC
    `;

    const { rows } = await pool.query(q);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// ✅ ADMIN UPDATE STOCK
export const adminUpdateStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const q = `
      UPDATE products SET stock = $1
      WHERE id = $2
      RETURNING *
    `;

    const { rows } = await pool.query(q, [stock, id]);

    if (!rows.length) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error updating stock:", err.message);
    res.status(500).json({ error: "Failed to update stock" });
  }
};

// ✅ ADMIN DELETE PRODUCT
export const adminDeleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const q = "DELETE FROM products WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(q, [id]);

    if (!rows.length) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", product: rows[0] });
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
