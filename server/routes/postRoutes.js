const express = require('express');

const router = express.Router();
const {
  getMaterialPosts,
  getMaterialPostById,
  createMaterialPost,
  updateMaterialPost,
  deleteMaterialPost,
} = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all material posts
router.get('/', getMaterialPosts);

// Get material post by ID
router.get('/:id', getMaterialPostById);

// Create material post (protected)
router.post('/', authMiddleware, createMaterialPost);

// Update material post (protected)
router.put('/:id', authMiddleware, updateMaterialPost);

// Delete material post (protected)
router.delete('/:id', authMiddleware, deleteMaterialPost);

module.exports = router;
