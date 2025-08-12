const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  getSupplierMaterials,
  createSupplierMaterial,
  updateSupplierMaterial,
  deleteSupplierMaterial,
  getRequestsForSupplierMaterials,
} = require('../controllers/supplierMaterialController');

// All routes require authentication
router.use(authMiddleware);

// List all materials posted by supplier
router.get('/', getSupplierMaterials);

// Create new material post
router.post('/', createSupplierMaterial);

// Update existing material post
router.put('/:id', updateSupplierMaterial);

// Delete material post
router.delete('/:id', deleteSupplierMaterial);

// Get all requests for supplier's materials
router.get('/requests', getRequestsForSupplierMaterials);

module.exports = router;
