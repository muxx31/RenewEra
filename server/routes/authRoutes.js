const express = require('express');
const router = express.Router();
const {
  supplierSignup,
  startupSignup,
  login,
} = require('../controllers/authController');

// Signup for suppliers
router.post('/supplier/signup', supplierSignup);

// Signup for startups
router.post('/startup/signup', startupSignup);

// Login for both suppliers and startups
router.post('/login', login);

module.exports = router;
