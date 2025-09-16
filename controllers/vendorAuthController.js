const { pool } = require('../db/connect');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Vendor Signup
const vendorRegister = async (req, res) => {
  const { company_name, email, password, contact_person, phone } = req.body;

  try {
    // Check if vendor exists
    const existingVendor = await pool.query('SELECT * FROM vendors WHERE email = $1', [email]);
    if (existingVendor.rows.length > 0) {
      return res.status(400).json({ error: 'Vendor already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert vendor
    const result = await pool.query(
      'INSERT INTO vendors (company_name, email, password, contact_person, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, company_name, email',
      [company_name, email, hashedPassword, contact_person, phone]
    );

    res.status(201).json({ message: 'Vendor registered successfully', vendor: result.rows[0] });
  } catch (err) {
    console.error('❌ Vendor Register Error:', err.message);
    res.status(500).json({ error: 'Vendor registration failed' });
  }
};

// ✅ Vendor Login with Debug Logs
const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🟢 Login attempt with email:", email);

    // Find vendor
    const result = await pool.query("SELECT * FROM vendors WHERE email = $1", [email]);
    console.log("🔍 Query result:", result.rows);

    if (result.rows.length === 0) {
      console.log("❌ No vendor found with this email");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const vendor = result.rows[0];

    // Compare password
    console.log("🔑 Comparing provided password with hashed password in DB...");
    const isMatch = await bcrypt.compare(password, vendor.password);
    console.log("✅ Password match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Passwords did not match");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { vendor_id: vendor.id, role: "vendor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("🎉 Login successful for vendor:", vendor.email);

    res.json({
      message: "Login successful",
      token,
      vendor: {
        id: vendor.id,
        company_name: vendor.company_name,
        email: vendor.email,
      },
    });
  } catch (err) {
    console.error("❌ Vendor Login Error:", err.message);
    res.status(500).json({ error: "Vendor login failed" });
  }
};

module.exports = { vendorRegister, vendorLogin };
