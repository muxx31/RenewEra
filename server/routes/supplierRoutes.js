const express = require('express');
const router = express.Router();

const {
  getSuppliers,
  searchSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} = require('../controllers/supplierController');

const protect = require('../middleware/authMiddleware');


// Public routes
router.get('/', getSuppliers);
router.get('/search', searchSuppliers);  // new search route
router.get('/:id', getSupplierById);

// Protected routes
router.put('/:id', protect, updateSupplier);
router.delete('/:id', protect, deleteSupplier);

module.exports = router;
