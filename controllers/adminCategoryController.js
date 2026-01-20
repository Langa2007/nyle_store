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

    // Check if table has image column, if not, logic might fail unless schema matches.
    // Assuming schema has 'image_url' or user will add it.
    // We will use 'image' or 'image_url'? Standardize on 'image_url'.

    // First, let's try to see if we can insert with image_url
    // If column doesn't exist, we might want to catch that error, but usually we just assume schema exists.

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


//  Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id ASC");
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

  try {
    let imageUrl = null;
    let query, values;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    if (imageUrl) {
      query = "UPDATE categories SET name = $1, image_url = $2 WHERE id = $3 RETURNING *";
      values = [name, imageUrl, id];
    } else {
      query = "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *";
      values = [name, id];
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(" Error updating category:", err.message);
    res.status(500).json({ error: "Failed to update category" });
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
