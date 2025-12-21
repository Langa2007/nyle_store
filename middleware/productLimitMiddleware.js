// middleware/productLimitMiddleware.js
import pool from "../db/connect.js";

export const checkProductLimit = async (req, res, next) => {
  try {
    const vendorId = req.vendorId || req.user?.vendor_id;
    
    const vendorQuery = `
      SELECT plan_type, max_products, current_approved_count, is_trusted_vendor
      FROM vendors 
      WHERE id = $1
    `;
    
    const vendorResult = await pool.query(vendorQuery, [vendorId]);
    
    if (vendorResult.rows.length === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    
    const vendor = vendorResult.rows[0];
    
    // Trusted vendors bypass limit for draft/pending
    if (vendor.is_trusted_vendor && req.method === 'POST') {
      return next();
    }
    
    // Check if vendor has reached product limit
    if (vendor.current_approved_count >= vendor.max_products) {
      return res.status(403).json({ 
        error: "Product limit reached",
        message: `You have reached your limit of ${vendor.max_products} approved products. Upgrade your plan to add more.`,
        current: vendor.current_approved_count,
        max: vendor.max_products
      });
    }
    
    req.vendorData = vendor;
    next();
  } catch (err) {
    console.error("Product limit check error:", err);
    res.status(500).json({ error: "Server error checking product limits" });
  }
};