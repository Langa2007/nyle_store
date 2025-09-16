
const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth'); // platform admin
const auth = require('../middleware/auth'); // generic JWT parser sets req.user
const requireRole = require('../middleware/requireRole');
const { createVendor, listVendors, approveVendor, myVendor } = require('../controllers/vendorController');

router.post('/apply', auth, createVendor); // a user applies to create a vendor
router.get('/', adminAuth, listVendors);   // platform admin sees all vendors
router.post('/:id/approve', adminAuth, approveVendor); // activate after payment/manual review
router.get('/me', auth, requireRole('vendor_admin','vendor_staff'), myVendor);

module.exports = router;

