const express = require('express');
const router = express.Router();

const {
  getStartups,
  getStartupById,
  updateStartup,
  deleteStartup,
  getStartupProfile,
} = require('../controllers/startupController');

const protect = require('../middleware/authMiddleware');

// Public routes
router.get('/', getStartups);

// Protected routes (require login)
router.get('/profile', protect, getStartupProfile);
router.get('/:id', getStartupById);
router.put('/:id', protect, updateStartup);
router.delete('/:id', protect, deleteStartup);

module.exports = router;
