// controllers/vendorProductsController.js
import { pool } from "../db/connect.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import streamifier from "streamifier";

// ✅ Same multer setup as admin
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).fields([
  { name: 'main_image', maxCount: 1 },
  { name: 'gallery_images', maxCount: 10 }
]);

// ✅ Same Cloudinary uploader
const uploadToCloudinary = (fileBuffer, folder = "nyle-vendor-products") => {
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

/**
 * Vendor creates product with full features (similar to admin)
 */
export const addProduct = async (req, res) => {
  const connection = await pool.connect();
  
  try {
    await connection.query('BEGIN');
    
    const vendorId = req.vendorId;
    if (!vendorId) {
      await connection.query('ROLLBACK');
      return res.status(401).json({ error: "Vendor authentication failed" });
    }

    const {
      name,
      description,
      price,
      stock,
      category,
      sku,
      weight,
      dimensions,
      shipping_cost,
      free_shipping_threshold,
      product_type,
      attributes,
      variant_data,
      submit_for_approval = false
    } = req.body;

    // Validate required fields
    if (!name || !price) {
      await connection.query('ROLLBACK');
      return res.status(400).json({
        error: "Product name and price are required"
      });
    }

    // Check vendor product limit (if submitting for approval)
    if (submit_for_approval) {
      const vendorCheck = await connection.query(
        `SELECT plan_type, max_products, current_approved_count, 
                is_trusted_vendor, status as vendor_status
         FROM vendors WHERE id = $1`,
        [vendorId]
      );

      if (vendorCheck.rows.length === 0) {
        await connection.query('ROLLBACK');
        return res.status(404).json({ error: "Vendor not found" });
      }

      const vendor = vendorCheck.rows[0];
      
      // Check if vendor is approved
      if (vendor.vendor_status !== 'approved') {
        await connection.query('ROLLBACK');
        return res.status(403).json({ 
          error: "Vendor account not approved",
          message: "Your vendor account needs to be approved before submitting products"
        });
      }

      // Check product limit for non-trusted vendors
      if (!vendor.is_trusted_vendor && vendor.current_approved_count >= vendor.max_products) {
        await connection.query('ROLLBACK');
        return res.status(403).json({ 
          error: "Product limit reached",
          message: `You have reached your limit of ${vendor.max_products} approved products.`,
          current: vendor.current_approved_count,
          max: vendor.max_products
        });
      }
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

    // Determine initial status
    let initialStatus = 'draft';
    let submittedAt = null;
    let approvedBy = null;
    let approvedAt = null;

    if (submit_for_approval) {
      const vendor = (await connection.query(
        "SELECT is_trusted_vendor FROM vendors WHERE id = $1",
        [vendorId]
      )).rows[0];

      // Auto-approve for trusted vendors within limits
      if (vendor.is_trusted_vendor) {
        initialStatus = 'approved';
        approvedAt = new Date();
        // approvedBy would be system/auto (could be null or special value)
      } else {
        initialStatus = 'pending';
        submittedAt = new Date();
      }
    }

    // Create product
    const productQuery = `
      INSERT INTO products 
      (name, description, price, stock, category, image_url, vendor_id,
       sku, weight, dimensions, shipping_cost, free_shipping_threshold, 
       product_type, attributes, gallery_images, status, created_by,
       submitted_at, approved_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 'vendor', $17, $18)
      RETURNING *
    `;

    const productValues = [
      name,
      description,
      parseFloat(price),
      parseInt(stock) || 0,
      category,
      imageUrl,
      vendorId,
      sku || `VENDOR-${vendorId}-${Date.now()}`,
      weight,
      dimensions,
      shipping_cost ? parseFloat(shipping_cost) : 0,
      free_shipping_threshold ? parseFloat(free_shipping_threshold) : null,
      product_type || 'simple',
      attributes ? JSON.parse(attributes) : null,
      galleryUrls.length > 0 ? galleryUrls : null,
      initialStatus,
      submittedAt,
      approvedAt
    ];

    const productResult = await connection.query(productQuery, productValues);
    const productId = productResult.rows[0].id;

    // Handle product variants if provided
    if (variant_data && variant_data.length > 0) {
      try {
        const variants = JSON.parse(variant_data);
        for (const variant of variants) {
          // Upload variant image if provided
          let variantImageUrl = variant.image_url;
          
          const variantQuery = `
            INSERT INTO product_variants 
            (product_id, sku, price, stock, attributes, image_url)
            VALUES ($1, $2, $3, $4, $5, $6)
          `;

          await connection.query(variantQuery, [
            productId,
            variant.sku || `VAR-${productId}-${Date.now()}`,
            variant.price || price,
            variant.stock || stock,
            variant.attributes,
            variantImageUrl
          ]);
        }
      } catch (variantErr) {
        console.warn("⚠ Variant creation skipped:", variantErr.message);
      }
    }

    // Update vendor's approved count if auto-approved
    if (initialStatus === 'approved') {
      await connection.query(
        "UPDATE vendors SET current_approved_count = current_approved_count + 1 WHERE id = $1",
        [vendorId]
      );
    }

    await connection.query('COMMIT');

    res.status(201).json({
      message: `Product ${initialStatus === 'approved' ? 'created and approved' : 
                initialStatus === 'pending' ? 'submitted for approval' : 'saved as draft'}`,
      product: productResult.rows[0],
      status: initialStatus,
      next_steps: initialStatus === 'pending' ? 
        "Your product is awaiting admin approval" : 
        initialStatus === 'draft' ? 
        "Submit for approval when ready" : 
        "Product is live on the store"
    });

  } catch (err) {
    await connection.query('ROLLBACK');
    console.error("❌ Vendor create product error:", err.message);
    res.status(500).json({ error: "Failed to create product", details: err.message });
  } finally {
    connection.release();
  }
};

/**
 * Vendor updates product with full features
 */
export const updateProduct = async (req, res) => {
  const connection = await pool.connect();
  
  try {
    await connection.query('BEGIN');
    
    const vendorId = req.vendorId;
    const { id } = req.params;
    
    if (!vendorId) {
      await connection.query('ROLLBACK');
      return res.status(401).json({ error: "Vendor authentication failed" });
    }

    // Check product ownership and status
    const productCheck = await connection.query(
      `SELECT id, status FROM products 
       WHERE id = $1 AND vendor_id = $2`,
      [id, vendorId]
    );

    if (productCheck.rows.length === 0) {
      await connection.query('ROLLBACK');
      return res.status(404).json({ 
        error: "Product not found or not owned by you" 
      });
    }

    const currentProduct = productCheck.rows[0];
    
    // Prevent updates on approved products (or require re-approval)
    if (currentProduct.status === 'approved') {
      // For approved products, changes should create a new pending version
      // or require re-approval. Let's implement re-approval requirement.
      const { require_reapproval } = req.body;
      
      if (!require_reapproval) {
        await connection.query('ROLLBACK');
        return res.status(400).json({
          error: "Approved products require re-approval",
          message: "Set require_reapproval=true to update an approved product. This will change status to pending."
        });
      }
    }

    const {
      name,
      description,
      price,
      stock,
      category,
      sku,
      weight,
      dimensions,
      shipping_cost,
      free_shipping_threshold,
      product_type,
      attributes,
      variant_data,
      update_status // Optional: 'draft', 'pending'
    } = req.body;

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name) { updates.push(`name = $${paramCount}`); values.push(name); paramCount++; }
    if (description !== undefined) { updates.push(`description = $${paramCount}`); values.push(description); paramCount++; }
    if (price) { updates.push(`price = $${paramCount}`); values.push(parseFloat(price)); paramCount++; }
    if (stock !== undefined) { updates.push(`stock = $${paramCount}`); values.push(parseInt(stock)); paramCount++; }
    if (category) { updates.push(`category = $${paramCount}`); values.push(category); paramCount++; }
    if (sku) { updates.push(`sku = $${paramCount}`); values.push(sku); paramCount++; }
    if (weight) { updates.push(`weight = $${paramCount}`); values.push(weight); paramCount++; }
    if (dimensions) { updates.push(`dimensions = $${paramCount}`); values.push(dimensions); paramCount++; }
    if (shipping_cost !== undefined) { updates.push(`shipping_cost = $${paramCount}`); values.push(parseFloat(shipping_cost)); paramCount++; }
    if (free_shipping_threshold !== undefined) { 
      updates.push(`free_shipping_threshold = $${paramCount}`); 
      values.push(free_shipping_threshold ? parseFloat(free_shipping_threshold) : null); 
      paramCount++; 
    }
    if (product_type) { updates.push(`product_type = $${paramCount}`); values.push(product_type); paramCount++; }
    if (attributes) { updates.push(`attributes = $${paramCount}`); values.push(JSON.parse(attributes)); paramCount++; }

    // Handle image updates
    if (req.files) {
      if (req.files.main_image) {
        const uploadResult = await uploadToCloudinary(
          req.files.main_image[0].buffer
        );
        updates.push(`image_url = $${paramCount}`);
        values.push(uploadResult.secure_url);
        paramCount++;
      }
      
      if (req.files.gallery_images && req.files.gallery_images.length > 0) {
        const galleryUrls = [];
        for (const file of req.files.gallery_images) {
          const uploadResult = await uploadToCloudinary(file.buffer);
          galleryUrls.push(uploadResult.secure_url);
        }
        updates.push(`gallery_images = $${paramCount}`);
        values.push(galleryUrls);
        paramCount++;
      }
    }

    // Handle status update
    if (update_status) {
      if (!['draft', 'pending'].includes(update_status)) {
        await connection.query('ROLLBACK');
        return res.status(400).json({ error: "Invalid status update" });
      }
      
      updates.push(`status = $${paramCount}`);
      values.push(update_status);
      paramCount++;
      
      if (update_status === 'pending') {
        updates.push(`submitted_at = NOW()`);
        
        // If changing from approved to pending, decrement vendor count
        if (currentProduct.status === 'approved') {
          await connection.query(
            "UPDATE vendors SET current_approved_count = current_approved_count - 1 WHERE id = $1",
            [vendorId]
          );
        }
      }
    }
    
    // If approved product updated with re-approval, change to pending
    if (currentProduct.status === 'approved' && req.body.require_reapproval) {
      updates.push(`status = 'pending'`);
      updates.push(`submitted_at = NOW()`);
      // Already decremented count above
    }

    if (updates.length === 0) {
      await connection.query('ROLLBACK');
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id, vendorId);
    paramCount += 2;

    const q = `
      UPDATE products 
      SET ${updates.join(', ')}, updated_at = NOW()
      WHERE id = $${paramCount - 1} AND vendor_id = $${paramCount}
      RETURNING *
    `;

    const { rows } = await connection.query(q, values);

    if (rows.length === 0) {
      await connection.query('ROLLBACK');
      return res.status(404).json({ error: "Product not found" });
    }

    // Handle variant updates if provided
    if (variant_data) {
      try {
        // First delete existing variants
        await connection.query(
          "DELETE FROM product_variants WHERE product_id = $1",
          [id]
        );
        
        // Add new variants
        const variants = JSON.parse(variant_data);
        for (const variant of variants) {
          const variantQuery = `
            INSERT INTO product_variants 
            (product_id, sku, price, stock, attributes, image_url)
            VALUES ($1, $2, $3, $4, $5, $6)
          `;
          await connection.query(variantQuery, [
            id,
            variant.sku,
            variant.price || rows[0].price,
            variant.stock || rows[0].stock,
            variant.attributes,
            variant.image_url
          ]);
        }
      } catch (variantErr) {
        console.warn("⚠ Variant update error:", variantErr.message);
      }
    }

    await connection.query('COMMIT');
    
    res.json({
      message: "Product updated successfully",
      product: rows[0],
      status_change: update_status ? `Status changed to ${update_status}` : null
    });

  } catch (err) {
    await connection.query('ROLLBACK');
    console.error("❌ Vendor update product error:", err.message);
    res.status(500).json({ error: "Failed to update product", details: err.message });
  } finally {
    connection.release();
  }
};

// Keep other functions (getVendorProducts, deleteProduct, submitForApproval) 
// but update getVendorProducts to include variant counts, etc.

/**
 * Get vendor products with detailed info
 */
export const getVendorProducts = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    const { status, page = 1, limit = 20 } = req.query;
    
    if (!vendorId) {
      return res.status(401).json({ error: "Vendor authentication failed" });
    }

    const offset = (page - 1) * limit;
    
    let baseQuery = `
      SELECT 
        p.*,
        COUNT(pv.id) as variant_count,
        COALESCE(SUM(pv.stock), p.stock) as total_stock
      FROM products p
      LEFT JOIN product_variants pv ON p.id = pv.product_id
      WHERE p.vendor_id = $1
    `;
    
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM products 
      WHERE vendor_id = $1
    `;
    
    const params = [vendorId];
    const countParams = [vendorId];
    
    if (status) {
      baseQuery += ` AND p.status = $2`;
      countQuery += ` AND status = $2`;
      params.push(status);
      countParams.push(status);
    }
    
    baseQuery += ` 
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    
    params.push(limit, offset);
    
    const [productsResult, countResult] = await Promise.all([
      pool.query(baseQuery, params),
      pool.query(countQuery, countParams)
    ]);
    
    return res.json({
      products: productsResult.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        pages: Math.ceil(countResult.rows[0].total / limit)
      }
    });
    
  } catch (err) {
    console.error("❌ Vendor getVendorProducts error:", err.message);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};
/**
 * Submit draft product for approval
 */
export const submitForApproval = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    const { id } = req.params;
    
    if (!vendorId) {
      return res.status(401).json({ error: "Vendor authentication failed" });
    }
    
    // Check if product exists and belongs to vendor
    const checkQuery = `
      SELECT id, status FROM products 
      WHERE id = $1 AND vendor_id = $2
    `;
    
    const checkResult = await pool.query(checkQuery, [id, vendorId]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ 
        error: "Product not found or not owned by you" 
      });
    }
    
    const product = checkResult.rows[0];
    
    if (product.status !== 'draft') {
      return res.status(400).json({ 
        error: `Product cannot be submitted. Current status: ${product.status}` 
      });
    }
    
    // Update product status to pending
    const updateQuery = `
      UPDATE products 
      SET status = 'pending', submitted_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    
    const updateResult = await pool.query(updateQuery, [id]);
    
    return res.json({
      message: "Product submitted for admin approval",
      product: updateResult.rows[0]
    });
    
  } catch (err) {
    console.error("❌ Submit for approval error:", err.message);
    return res.status(500).json({ error: "Failed to submit product for approval" });
  }
};

/**
 * Update one of the vendor's products
 */

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
/**
 * Get product statistics for vendor dashboard
 */
export const getProductStats = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    
    const query = `
      SELECT 
        status,
        COUNT(*) as count,
        SUM(stock) as total_stock,
        AVG(price) as avg_price
      FROM products 
      WHERE vendor_id = $1
      GROUP BY status
    `;
    
    const { rows } = await pool.query(query, [vendorId]);
    
    // Get vendor limit info
    const vendorQuery = `
      SELECT plan_type, max_products, current_approved_count, is_trusted_vendor
      FROM vendors WHERE id = $1
    `;
    
    const vendorResult = await pool.query(vendorQuery, [vendorId]);
    
    res.json({
      stats: rows,
      vendor: vendorResult.rows[0],
      limits: {
        used: vendorResult.rows[0]?.current_approved_count || 0,
        max: vendorResult.rows[0]?.max_products || 0,
        remaining: (vendorResult.rows[0]?.max_products || 0) - 
                  (vendorResult.rows[0]?.current_approved_count || 0)
      }
    });
    
  } catch (err) {
    console.error("❌ Get product stats error:", err.message);
    return res.status(500).json({ error: "Failed to fetch product stats" });
  }
};

/**
 * Duplicate a product (useful for creating similar products)
 */
export const duplicateProduct = async (req, res) => {
  const connection = await pool.connect();
  
  try {
    await connection.query('BEGIN');
    
    const vendorId = req.vendorId;
    const { id } = req.params;
    const { name_suffix = "Copy", submit_for_approval = false } = req.body;
    
    // Get original product
    const originalQuery = `
      SELECT * FROM products 
      WHERE id = $1 AND vendor_id = $2
    `;
    
    const originalResult = await connection.query(originalQuery, [id, vendorId]);
    
    if (originalResult.rows.length === 0) {
      await connection.query('ROLLBACK');
      return res.status(404).json({ error: "Product not found" });
    }
    
    const original = originalResult.rows[0];
    
    // Create duplicate with draft status
    const duplicateQuery = `
      INSERT INTO products 
      (name, description, price, stock, category, image_url, vendor_id,
       sku, weight, dimensions, shipping_cost, free_shipping_threshold, 
       product_type, attributes, gallery_images, status, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'draft', 'vendor')
      RETURNING *
    `;
    
    const duplicateValues = [
      `${original.name} - ${name_suffix}`,
      original.description,
      original.price,
      original.stock,
      original.category,
      original.image_url,
      vendorId,
      `COPY-${original.sku}-${Date.now()}`,
      original.weight,
      original.dimensions,
      original.shipping_cost,
      original.free_shipping_threshold,
      original.product_type,
      original.attributes,
      original.gallery_images
    ];
    
    const duplicateResult = await connection.query(duplicateQuery, duplicateValues);
    const newProductId = duplicateResult.rows[0].id;
    
    // Duplicate variants if any
    const variantsQuery = `
      SELECT * FROM product_variants 
      WHERE product_id = $1
    `;
    
    const variantsResult = await connection.query(variantsQuery, [id]);
    
    for (const variant of variantsResult.rows) {
      const variantQuery = `
        INSERT INTO product_variants 
        (product_id, sku, price, stock, attributes, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      await connection.query(variantQuery, [
        newProductId,
        `COPY-${variant.sku}`,
        variant.price,
        variant.stock,
        variant.attributes,
        variant.image_url
      ]);
    }
    
    await connection.query('COMMIT');
    
    res.json({
      message: "Product duplicated successfully",
      product: duplicateResult.rows[0],
      variants_copied: variantsResult.rows.length
    });
    
  } catch (err) {
    await connection.query('ROLLBACK');
    console.error("❌ Duplicate product error:", err.message);
    return res.status(500).json({ error: "Failed to duplicate product" });
  } finally {
    connection.release();
  }
};