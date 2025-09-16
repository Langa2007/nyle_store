const express = require('express');
const router = express.Router();
const { vendorRegister, vendorLogin } = require('../controllers/vendorAuthController');

// Register vendor
router.post('/register', vendorRegister);

// Login vendor
router.post('/login', vendorLogin);

module.exports = router;
