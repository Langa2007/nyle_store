// controllers/adminProductApprovalController.js
import pool from "../db/connect.js";

// ✅ GET ALL PENDING PRODUCTS
export const getPendingProducts = async (req, res) => {
  try {
    const q = `
      SELECT 
        p.*,
        v.id as vendor_id,
        v.legal_name as vendor_name,
        v.email as vendor_email,
        v.plan_type,
        v.is_trusted_vendor
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      WHERE p.status = 'pending'
      ORDER BY p.submitted_at ASC
    `;
    
    const { rows } = await pool.query(q);
    res.json(rows);
  } catch (err) {
    console.error("❌ Get pending products error:", err.message);
    res.status(500).json({ error: "Failed to fetch pending products" });
  }
};

// ✅ APPROVE PRODUCT
export const approveProduct = async (req, res) => {
  const connection = await pool.connect();
  
  try {
    await connection.query('BEGIN');
    
    const { id } = req.params;
    const adminId = req.user?.id; // Assuming admin ID from auth middleware
    
    // Get product details
    const productQuery = `
      SELECT p.*, v.id as vendor_id, v.current_approved_count, v.max_products
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      WHERE p.id = $1
    `;
    
    const productResult = await connection.query(productQuery, [id]);
    
    if (productResult.rows.length === 0) {
      await connection.query('ROLLBACK');
      return res.status(404).json({ error: "Product not found" });
    }
    
    const product = productResult.rows[0];
    
    // Check vendor's product limit
    if (product.current_approved_count >= product.max_products) {
      await connection.query('ROLLBACK');
      return res.status(403).json({
        error: "Vendor product limit reached",
        message: `Vendor has reached their limit of ${product.max_products} approved products.`,
        vendor_id: product.vendor_id,
        current: product.current_approved_count,
        max: product.max_products
      });
    }
    
    // Update product status
    const updateProductQuery = `
      UPDATE products 
      SET status = 'approved', 
          approved_by = $1,
          approved_at = NOW()
      WHERE id = $2
      RETURNING *
    `;
    
    const updateResult = await connection.query(updateProductQuery, [adminId, id]);
    
    // Update vendor's approved product count
    const updateVendorQuery = `
      UPDATE vendors 
      SET current_approved_count = current_approved_count + 1
      WHERE id = $1
      RETURNING current_approved_count
    `;
    
    await connection.query(updateVendorQuery, [product.vendor_id]);
    
    await connection.query('COMMIT');
    
    res.json({
      message: "Product approved successfully",
      product: updateResult.rows[0],
      vendor_id: product.vendor_id
    });
    
  } catch (err) {
    await connection.query('ROLLBACK');
    console.error("❌ Approve product error:", err.message);
    res.status(500).json({ error: "Failed to approve product" });
  } finally {
    connection.release();
  }
};

// ✅ REJECT PRODUCT
export const rejectProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const adminId = req.user?.id;
    
    if (!reason || reason.trim().length < 10) {
      return res.status(400).json({ 
        error: "Rejection reason is required (minimum 10 characters)" 
      });
    }
    
    const q = `
      UPDATE products 
      SET status = 'rejected',
          approved_by = $1,
          rejection_reason = $2
      WHERE id = $3
      RETURNING *
    `;
    
    const { rows } = await pool.query(q, [adminId, reason.trim(), id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    res.json({
      message: "Product rejected",
      product: rows[0]
    });
    
  } catch (err) {
    console.error("❌ Reject product error:", err.message);
    res.status(500).json({ error: "Failed to reject product" });
  }
};

// ✅ BULK APPROVE PRODUCTS
export const bulkApproveProducts = async (req, res) => {
  const connection = await pool.connect();
  
  try {
    await connection.query('BEGIN');
    
    const { product_ids } = req.body; // Array of product IDs
    const adminId = req.user?.id;
    
    if (!Array.isArray(product_ids) || product_ids.length === 0) {
      await connection.query('ROLLBACK');
      return res.status(400).json({ error: "Product IDs array is required" });
    }
    
    // Get all pending products with vendor info
    const productsQuery = `
      SELECT p.id, p.vendor_id, v.current_approved_count, v.max_products
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      WHERE p.id = ANY($1) AND p.status = 'pending'
    `;
    
    const productsResult = await connection.query(productsQuery, [product_ids]);
    
    if (productsResult.rows.length === 0) {
      await connection.query('ROLLBACK');
      return res.status(404).json({ error: "No pending products found with given IDs" });
    }
    
    // Check vendor limits
    const vendorLimits = {};
    for (const product of productsResult.rows) {
      const vendorId = product.vendor_id;
      if (!vendorLimits[vendorId]) {
        vendorLimits[vendorId] = {
          current: product.current_approved_count,
          max: product.max_products,
          products: []
        };
      }
      vendorLimits[vendorId].products.push(product.id);
    }
    
    // Verify no vendor exceeds limit
    for (const [vendorId, data] of Object.entries(vendorLimits)) {
      const newCount = data.current + data.products.length;
      if (newCount > data.max) {
        await connection.query('ROLLBACK');
        return res.status(403).json({
          error: "Vendor product limit exceeded",
          message: `Vendor ${vendorId} would exceed their limit of ${data.max} products.`,
          vendor_id: vendorId,
          current: data.current,
          attempted: data.products.length,
          max: data.max
        });
      }
    }
    
    // Approve all products
    const updateProductsQuery = `
      UPDATE products 
      SET status = 'approved', 
          approved_by = $1,
          approved_at = NOW()
      WHERE id = ANY($2)
      RETURNING *
    `;
    
    const updateResult = await connection.query(updateProductsQuery, [adminId, product_ids]);
    
    // Update vendor counts
    for (const [vendorId, data] of Object.entries(vendorLimits)) {
      const updateVendorQuery = `
        UPDATE vendors 
        SET current_approved_count = current_approved_count + $1
        WHERE id = $2
      `;
      await connection.query(updateVendorQuery, [data.products.length, vendorId]);
    }
    
    await connection.query('COMMIT');
    
    res.json({
      message: `${updateResult.rows.length} products approved successfully`,
      approved_count: updateResult.rows.length,
      products: updateResult.rows
    });
    
  } catch (err) {
    await connection.query('ROLLBACK');
    console.error("❌ Bulk approve error:", err.message);
    res.status(500).json({ error: "Failed to bulk approve products" });
  } finally {
    connection.release();
  }
};