// controllers/adminCategoryController.js
import { pool } from "../db/connect.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import streamifier from "streamifier";

// Multer setup
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).single("image");

// Cloudinary uploader
const uploadToCloudinary = (fileBuffer, folder = "nyle-categories") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

//  Create category
export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    let imageUrl = null;

    if (req.file) {
      console.log("Uploading category image...");
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    console.log("Creating category:", name, "Image:", imageUrl);
    try {
      await pool.query("SELECT setval(pg_get_serial_sequence('categories', 'id'), COALESCE(max(id), 0) + 1, false) FROM categories;");
    } catch (seqErr) {
      console.warn(" Warning: Could not reset sequence, it might already be correct or table name differs:", seqErr.message);
    }

    const query = imageUrl
      ? "INSERT INTO categories (name, image_url) VALUES ($1, $2) RETURNING *"
      : "INSERT INTO categories (name) VALUES ($1) RETURNING *";


    const values = imageUrl ? [name, imageUrl] : [name];

    const result = await pool.query(query, values);

    console.log(" Category created:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(" Error creating category:", err.message);
    res.status(500).json({ error: "Failed to create category", details: err.message });
  }
};


//  Get all categories with product count
export const getAllCategories = async (req, res) => {
  try {
    const query = `
      SELECT c.*, COUNT(p.id)::int as product_count
      FROM categories c
      LEFT JOIN products p ON c.name = p.category
      GROUP BY c.id
      ORDER BY c.id ASC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(" Error fetching categories:", err.message);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

//  Update category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  console.log(`[UpdateCategory] ID: ${id}, Name: ${name}, File: ${req.file ? 'Yes' : 'No'}`);

  if (!name) {
    console.error("[UpdateCategory] Error: Category name is required");
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    let imageUrl = null;
    let query, values;

    if (req.file) {
      try {
        console.log("[UpdateCategory] Uploading image to Cloudinary...");
        const uploadResult = await uploadToCloudinary(req.file.buffer);
        imageUrl = uploadResult.secure_url;
        console.log("[UpdateCategory] Image uploaded:", imageUrl);
      } catch (uploadError) {
        console.error("[UpdateCategory] Cloudinary upload failed:", uploadError);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    if (imageUrl) {
      query = "UPDATE categories SET name = $1, image_url = $2 WHERE id = $3 RETURNING *";
      values = [name, imageUrl, id];
    } else {
      query = "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *";
      values = [name, id];
    }

    console.log("[UpdateCategory] Executing query:", query, values);
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      console.warn("[UpdateCategory] Category not found with ID:", id);
      return res.status(404).json({ error: "Category not found" });
    }

    console.log("[UpdateCategory] Success:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`[UpdateCategory] Database Error updating category ${id}:`, err.message);
    res.status(500).json({ error: "Failed to update category", details: err.message });
  }
};

//  Delete category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(" Error deleting category:", err.message);
    res.status(500).json({ error: "Failed to delete category" });
  }
};
