// controllers/adminProductController.js
import pool from "../db/connect.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import streamifier from "streamifier";

// ✅ Multer setup for multiple images
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// ✅ Cloudinary uploader
const uploadToCloudinary = (fileBuffer, folder = "nyle-products") => {
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

// ✅ ADMIN CREATE OR SELECT VENDOR
export const createOrSelectVendor = async (req, res) => {
  try {
    const {
      vendor_id,
      legal_name,
      business_email,
      phone,
      business_address,
      tax_id,
      business_type,
      shipping_policy,
      return_policy,
      company_logo
    } = req.body;

    let vendorId = vendor_id;

    // If vendor_id is provided, use existing vendor
    if (vendor_id) {
      const checkVendor = await pool.query(
        "SELECT id, legal_name FROM vendors WHERE id = $1",
        [vendor_id]
      );

      if (checkVendor.rows.length === 0) {
        return res.status(404).json({ error: "Vendor not found" });
      }

      return res.json({
        vendor_id: vendorId,
        vendor_name: checkVendor.rows[0].legal_name
      });
    }

    // Create new vendor
    if (!legal_name || !business_email) {
      return res.status(400).json({
        error: "Legal name and business email are required for new vendors"
      });
    }

    // Upload company logo if provided
    let logoUrl = null;
    if (req.files && req.files.company_logo) {
      const uploadResult = await uploadToCloudinary(
        req.files.company_logo[0].buffer,
        "nyle-vendors"
      );
      logoUrl = uploadResult.secure_url;
    }

    const vendorQuery = `
      INSERT INTO vendors 
      (legal_name, business_email, phone, business_address, tax_id, 
       business_type, shipping_policy, return_policy, company_logo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, legal_name
    `;

    const vendorValues = [
      legal_name,
      business_email,
      phone,
      business_address,
      tax_id,
      business_type,
      shipping_policy,
      return_policy,
      logoUrl
    ];

    const vendorResult = await pool.query(vendorQuery, vendorValues);
    vendorId = vendorResult.rows[0].id;

    res.status(201).json({
      vendor_id: vendorId,
      vendor_name: vendorResult.rows[0].legal_name
    });
  } catch (err) {
    console.error("❌ Vendor creation error:", err.message);
    res.status(500).json({ error: "Failed to create/select vendor" });
  }
};

// ✅ ADMIN CREATE PRODUCT WITH VENDOR & SHIPPING
export const adminCreateProduct = async (req, res) => {
  const connection = await pool.connect();

  try {
    await connection.query('BEGIN');

    const {
      name,
      description,
      price,
      stock,
      category,
      vendor_id,
      sku,
      weight,
      dimensions,
      shipping_cost,
      free_shipping_threshold,
      product_type,
      attributes,
      variant_data
    } = req.body;

    // Validate required fields
    if (!name || !price || !vendor_id) {
      await connection.query('ROLLBACK');
      return res.status(400).json({
        error: "Name, price, and vendor are required"
      });
    }

    // Validate vendor exists
    const vendorCheck = await connection.query(
      "SELECT id, legal_name FROM vendors WHERE id = $1",
      [vendor_id]
    );

    if (vendorCheck.rows.length === 0) {
      await connection.query('ROLLBACK');
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Upload main product image
    let imageUrl = null;
    if (req.files && req.files.main_image) {
      const uploadResult = await uploadToCloudinary(
        req.files.main_image[0].buffer
      );
      imageUrl = uploadResult.secure_url;
    }

    // Upload gallery images
    const galleryUrls = [];
    if (req.files && req.files.gallery_images) {
      for (const file of req.files.gallery_images) {
        const uploadResult = await uploadToCloudinary(file.buffer);
        galleryUrls.push(uploadResult.secure_url);
      }
    }

    // Create product
    const productQuery = `
      INSERT INTO products 
      (name, description, price, stock, category, image_url, vendor_id,
       sku, weight, dimensions, shipping_cost, free_shipping_threshold, 
       product_type, attributes, gallery_images)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `;

    const productValues = [
      name,
      description,
      parseFloat(price),
      parseInt(stock) || 0,
      category,
      imageUrl,
      vendor_id,
      sku || `SKU-${Date.now()}`,
      weight,
      dimensions,
      shipping_cost ? parseFloat(shipping_cost) : 0,
      free_shipping_threshold ? parseFloat(free_shipping_threshold) : null,
      product_type || 'simple',
      attributes ? JSON.parse(attributes) : null,
      galleryUrls.length > 0 ? galleryUrls : null,
      'approved', // Auto-approve admin-created products
      'admin'  // Created by admin
    ];

    const productResult = await connection.query(productQuery, productValues);
    const productId = productResult.rows[0].id;

    // Handle product variants if provided
    if (variant_data && variant_data.length > 0) {
      try {
        const variants = JSON.parse(variant_data);
        for (const variant of variants) {
          const variantQuery = `
            INSERT INTO product_variants 
            (product_id, sku, price, stock, attributes, image_url)
            VALUES ($1, $2, $3, $4, $5, $6)
          `;

          await connection.query(variantQuery, [
            productId,
            variant.sku,
            variant.price || price,
            variant.stock || stock,
            variant.attributes,
            variant.image_url
          ]);
        }
      } catch (variantErr) {
        console.warn("⚠ Variant creation skipped:", variantErr.message);
      }
    }

    // Create shipping zones for vendor if specified
    if (shipping_cost !== undefined) {
      const shippingQuery = `
        INSERT INTO vendor_shipping_zones 
        (vendor_id, product_id, cost, free_threshold, estimated_days)
        VALUES ($1, $2, $3, $4, $5)
      `;

      await connection.query(shippingQuery, [
        vendor_id,
        productId,
        shipping_cost || 0,
        free_shipping_threshold || null,
        3 // Default estimated days
      ]);
    }

    await connection.query('COMMIT');

    // Fetch complete product with vendor info
    const finalProduct = await connection.query(`
      SELECT p.*, v.legal_name as vendor_name, v.business_email, v.phone
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      WHERE p.id = $1
    `, [productId]);

    res.status(201).json(finalProduct.rows[0]);

  } catch (err) {
    await connection.query('ROLLBACK');
    console.error("❌ Admin create product error:", err.message);
    res.status(500).json({ error: "Failed to create product" });
  } finally {
    connection.release();
  }
};

// ✅ GET ALL VENDORS FOR DROPDOWN
export const getAllVendors = async (req, res) => {
  try {
    const query = `
      SELECT id, legal_name, business_email, business_type, 
             created_at, status
      FROM vendors 
      WHERE status = 'active'
      ORDER BY legal_name
    `;

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching vendors:", err.message);
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
};

// ✅ GET VENDOR DETAILS
export const getVendorDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT v.*, 
             COUNT(p.id) as product_count,
             COALESCE(AVG(r.rating), 0) as avg_rating
      FROM vendors v
      LEFT JOIN products p ON v.id = p.vendor_id
      LEFT JOIN reviews r ON p.id = r.product_id
      WHERE v.id = $1
      GROUP BY v.id
    `;

    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error fetching vendor:", err.message);
    res.status(500).json({ error: "Failed to fetch vendor details" });
  }
};

// ✅ ADMIN GET ALL PRODUCTS WITH VENDOR INFO
export const adminGetAllProducts = async (req, res) => {
  try {
    const q = `
      SELECT 
        p.*, 
        v.legal_name AS vendor_name,
        v.business_email,
        v.business_type,
        COUNT(DISTINCT pv.id) as variant_count,
        COALESCE(SUM(pv.stock), p.stock) as total_stock
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      LEFT JOIN product_variants pv ON p.id = pv.product_id
      GROUP BY p.id, v.id
      ORDER BY p.created_at DESC
    `;

    const { rows } = await pool.query(q);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// ✅ ADMIN UPDATE PRODUCT WITH VENDOR VALIDATION
export const adminUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const connection = await pool.connect();

  try {
    await connection.query('BEGIN');

    const {
      name, description, price, stock, category, vendor_id,
      sku, weight, dimensions, shipping_cost
    } = req.body;

    // Check if product exists and belongs to vendor if vendor_id is changed
    if (vendor_id) {
      const productCheck = await connection.query(
        "SELECT vendor_id FROM products WHERE id = $1",
        [id]
      );

      if (productCheck.rows.length === 0) {
        await connection.query('ROLLBACK');
        return res.status(404).json({ error: "Product not found" });
      }
    }

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name) { updates.push(`name = $${paramCount}`); values.push(name); paramCount++; }
    if (description !== undefined) { updates.push(`description = $${paramCount}`); values.push(description); paramCount++; }
    if (price) { updates.push(`price = $${paramCount}`); values.push(parseFloat(price)); paramCount++; }
    if (stock !== undefined) { updates.push(`stock = $${paramCount}`); values.push(parseInt(stock)); paramCount++; }
    if (category) { updates.push(`category = $${paramCount}`); values.push(category); paramCount++; }
    if (vendor_id) { updates.push(`vendor_id = $${paramCount}`); values.push(vendor_id); paramCount++; }
    if (sku) { updates.push(`sku = $${paramCount}`); values.push(sku); paramCount++; }
    if (weight) { updates.push(`weight = $${paramCount}`); values.push(weight); paramCount++; }
    if (dimensions) { updates.push(`dimensions = $${paramCount}`); values.push(dimensions); paramCount++; }
    if (shipping_cost !== undefined) { updates.push(`shipping_cost = $${paramCount}`); values.push(parseFloat(shipping_cost)); paramCount++; }

    // Handle image update if provided
    let imageUrl = null;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
      updates.push(`image_url = $${paramCount}`);
      values.push(imageUrl);
      paramCount++;
    }

    if (updates.length === 0) {
      await connection.query('ROLLBACK');
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id);

    const q = `
      UPDATE products 
      SET ${updates.join(', ')}, updated_at = NOW()
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const { rows } = await connection.query(q, values);

    await connection.query('COMMIT');
    res.json(rows[0]);
  } catch (err) {
    await connection.query('ROLLBACK');
    console.error("❌ Error updating product:", err.message);
    res.status(500).json({ error: "Failed to update product" });
  } finally {
    connection.release();
  }
};

// ✅ ADMIN DELETE PRODUCT (with cascade handling)
export const adminDeleteProduct = async (req, res) => {
  const { id } = req.params;
  const connection = await pool.connect();

  try {
    await connection.query('BEGIN');

    // First, delete variants if any
    await connection.query(
      "DELETE FROM product_variants WHERE product_id = $1",
      [id]
    );

    // Delete shipping info
    await connection.query(
      "DELETE FROM vendor_shipping_zones WHERE product_id = $1",
      [id]
    );

    // Then delete the product
    const q = "DELETE FROM products WHERE id = $1 RETURNING *";
    const { rows } = await connection.query(q, [id]);

    if (!rows.length) {
      await connection.query('ROLLBACK');
      return res.status(404).json({ error: "Product not found" });
    }

    await connection.query('COMMIT');
    res.json({
      message: "Product and associated data deleted successfully",
      product: rows[0]
    });
  } catch (err) {
    await connection.query('ROLLBACK');
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({ error: "Failed to delete product" });
  } finally {
    connection.release();
  }
};

// ✅ GET PRODUCTS BY VENDOR
export const getProductsByVendor = async (req, res) => {
  try {
    const { vendor_id } = req.params;

    const q = `
      SELECT p.*, COUNT(pv.id) as variant_count
      FROM products p
      LEFT JOIN product_variants pv ON p.id = pv.product_id
      WHERE p.vendor_id = $1
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;

    const { rows } = await pool.query(q, [vendor_id]);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching vendor products:", err.message);
    res.status(500).json({ error: "Failed to fetch vendor products" });
  }
};

// ✅ ADMIN UPDATE STOCK
export const adminUpdateStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const query = `
      UPDATE products 
      SET stock = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING id, stock, name
    `;

    const { rows } = await pool.query(query, [stock, id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error updating stock:", err.message);
    res.status(500).json({ error: "Failed to update stock" });
  }
};