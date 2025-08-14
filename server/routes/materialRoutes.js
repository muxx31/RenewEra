const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getMaterials, addMaterial } = require('../controllers/supplierMaterialController');
const protect = require('../middleware/authMiddleware');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

// Routes
router.get('/', protect, getMaterials);
router.post('/', protect, upload.single('file'), addMaterial);

module.exports = router;
