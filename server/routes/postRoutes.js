const express = require('express');
const router = express.Router();
const { getMaterials, getRequests, addMaterial } = require('../controllers/supplierMaterialController');
const authMiddleware = require('../middleware/authMiddleware'); // to get req.user

// Get all materials for logged-in supplier
router.get('/', authMiddleware, getMaterials);

// Get requests received for supplier's materials
router.get('/requests', authMiddleware, getRequests);

// Post a new material
router.post('/', authMiddleware, addMaterial);

module.exports = router;
