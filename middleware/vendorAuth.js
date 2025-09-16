// middleware/vendorAuth.js
const jwt = require('jsonwebtoken');

const vendorAuth = (req, res, next) => {
  // Accept header from many clients
  const authHeader = req.headers.authorization || req.headers.Authorization || '';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('❌ vendorAuth - missing or invalid Authorization header:', authHeader);
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  // Extract, clean token (strip quotes if copy/paste added them)
  let token = authHeader.split(' ')[1] || '';
  token = token.trim().replace(/^"+|"+$/g, '').replace(/^'+|'+$/g, '');

  console.log('🔐 vendorAuth - token received:', token.length ? '✔ token present' : '❌ empty token');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Make vendor info available to controllers
    req.vendor = decoded;
    req.vendorId = decoded.vendor_id || decoded.id || null;
    console.log('✅ vendorAuth - decoded token:', decoded);
    if (!req.vendorId) {
      console.error('❌ vendorAuth - token decoded but vendor id missing in payload');
      return res.status(401).json({ error: 'Vendor authentication failed' });
    }
    return next();
  } catch (err) {
    console.error('❌ vendorAuth - token verification failed:', err.message);
    return res.status(401).json({ error: 'Vendor authentication failed' });
  }
};

module.exports = vendorAuth;
