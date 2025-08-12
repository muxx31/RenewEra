const express = require('express');
const router = express.Router();

const {
  getRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
  getRequestsForStartup,
} = require('../controllers/requestController');

const protect = require('../middleware/authMiddleware');


// Public or admin routes
router.get('/', getRequests);

// Startup dashboard route to get requests related to logged-in startup
router.get('/mystartup', protect, getRequestsForStartup);

router.get('/:id', getRequestById);

// Supplier protected routes
router.post('/', protect, createRequest);
router.put('/:id/status', protect, updateRequestStatus);

module.exports = router;
