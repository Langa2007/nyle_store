import pool from "../db/connect.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

import {
  createProduct,
  getAllProducts,
  updateProductById,
  getProductById,
  deleteProductById,
} from "../models/productsModel.js";

// ✅ Setup multer for temporary file handling
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// ✅ Create a new product (with optional image upload)
export const handleCreateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    let imageUrl = null;

    // ✅ If image is uploaded, upload it to Cloudinary
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload_stream(
        { folder: "nyle-products" },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            return res.status(500).json({ error: "Image upload failed" });
          }
          imageUrl = result.secure_url;
        }
      );

      // Required for upload_stream to complete
      uploadResult.end(req.file.buffer);
    }

    const newProduct = await createProduct(name, description, price, stock, category, imageUrl);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Product Creation Error:", err.message);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// ✅ Get all products
export const handleGetAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Fetch Products Error:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// ✅ Get a product by ID
export const handleGetProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    console.error("❌ Fetch Product Error:", err.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// ✅ Update a product (with optional new image)
export const handleUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category } = req.body;

  try {
    let imageUrl;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload_stream(
        { folder: "nyle-products" },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            return res.status(500).json({ error: "Image upload failed" });
          }
          imageUrl = result.secure_url;
        }
      );

      uploadResult.end(req.file.buffer);
    }

    const updated = await updateProductById(id, name, description, price, stock, category, imageUrl);
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Update Error:", err.message);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// ✅ Delete a product
export const handleDeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteProductById(id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Error:", err.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

// ✅ Update product stock
export const updateProductStock = async (req, res) => {
  const productId = req.params.id;
  const { stock } = req.body;

  try {
    await pool.query("UPDATE products SET stock = $1 WHERE id = $2", [stock, productId]);
    res.status(200).json({ message: "Stock updated successfully" });
  } catch (err) {
    console.error("❌ Stock update error:", err.message);
    res.status(500).json({ error: "Failed to update stock" });
  }
};

// ✅ Search and filter products
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
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Search/Filter error:", err.message);
    res.status(500).json({ error: "Failed to search/filter products" });
  }
};
