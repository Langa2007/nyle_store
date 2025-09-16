module.exports = function vendorScope(req, res, next) {
  // Ensures vendor routes only see their own data
  if (req.user?.role?.startsWith('vendor') && req.user?.vendor_id) {
    req.vendorId = req.user.vendor_id;
    return next();
  }
  return res.status(403).json({ error: 'Vendor scope required' });
};